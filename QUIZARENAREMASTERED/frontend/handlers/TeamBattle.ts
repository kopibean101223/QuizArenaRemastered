import { WebSocket } from 'ws';
import Redis from 'ioredis';
import { finalizeAndSaveBattle, PlayerResult } from '../src/lib/student/battle/battleSync';

const COMPLETED_ROOM_TTL_SECONDS = 3600;

function roomChannel(battleId: string): string {
  return `battle:team:${battleId}`;
}
function stateKey(battleId: string): string {
  return `battle:team:${battleId}:state`;
}
function teamAnswersKey(battleId: string, questionIndex: number): string {
  return `battle:team:${battleId}:q:${questionIndex}:answers`;
}
function leaderboardKey(battleId: string): string {
  return `battle:team:${battleId}:leaderboard`;
}

export interface TeamMemberAnswerPayload {
  memberId: string;
  memberName: string;
  selectedOption: string;
  submittedAt: number;
}

export interface TeamBattlePayload {
  type: string;
  battleId: string;
  roomCode?: string;
  questionIndex?: number;
  answer?: TeamMemberAnswerPayload;
  isLastQuestion?: boolean;
}

class TeamBattleHandler {
  private activeRooms: Map<string, Set<WebSocket>>;
  private clientRoomMap: Map<WebSocket, string>;

  constructor() {
    this.activeRooms = new Map<string, Set<WebSocket>>();
    this.clientRoomMap = new Map<WebSocket, string>();
  }

  public initSubscriber(redisSubscriber: Redis): void {
    redisSubscriber.on('message', (channel: string, message: string) => {
      if (!channel.startsWith('battle:team:')) return;
      const battleId = channel.replace('battle:team:', '');
      const clientsInRoom = this.activeRooms.get(battleId);

      if (clientsInRoom) {
        clientsInRoom.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
      }
    });
  }

  public async syncBattleToSupabase(
    redisPublisher: Redis,
    battleId: string,
    roomCode?: string
  ): Promise<void> {
    try {
      const lKey = leaderboardKey(battleId);
      const sKey = stateKey(battleId);

      const rawScores = await redisPublisher.hgetall(lKey);
      const roomState = await redisPublisher.hgetall(sKey);

      const players: PlayerResult[] = Object.values(rawScores || {}).map((item) => {
        const parsed = JSON.parse(item);
        return {
          userId: parsed.id || parsed.userId,
          score: parsed.score || 0,
          correctAnswers: parsed.correctAnswers || 0,
          totalQuestions: parsed.totalQuestions || 0,
          accuracy: parsed.accuracy || 0,
        };
      });

      await finalizeAndSaveBattle({
        battleId,
        roomCode: roomCode || roomState.roomCode || 'TEAM_ROOM',
        battleMode: 'TEAM',
        players,
      });

      console.log(`[TeamBattle] Saved battle ${battleId} results to Supabase (${players.length} players)`);
    } catch (err) {
      console.error(`[TeamBattle] Failed to sync battle ${battleId} to Supabase:`, err);
    }
  }

  public async handleMessage(
    ws: WebSocket,
    payload: TeamBattlePayload,
    redisPublisher: Redis,
    redisSubscriber: Redis
  ): Promise<void> {
    const { type, battleId, roomCode, questionIndex = 0, answer, isLastQuestion } = payload;

    if (!battleId) {
      ws.send(JSON.stringify({ error: 'battleId is required for Team operations' }));
      return;
    }

    const channel = roomChannel(battleId);
    const sKey = stateKey(battleId);
    const ansKey = teamAnswersKey(battleId, questionIndex);
    const lKey = leaderboardKey(battleId);

    // ── JOIN TEAM BATTLE ──
    if (type === 'JOIN_TEAM_BATTLE') {
      if (!this.activeRooms.has(battleId)) {
        this.activeRooms.set(battleId, new Set<WebSocket>());
        redisSubscriber.subscribe(channel, (err) => {
          if (err) console.error(`Failed to subscribe to ${channel}`, err);
        });
      }

      this.activeRooms.get(battleId)!.add(ws);
      this.clientRoomMap.set(ws, battleId);

      const rawAnswers = await redisPublisher.hgetall(ansKey);
      const teamAnswers = Object.values(rawAnswers || {}).map((item) => JSON.parse(item));

      ws.send(
        JSON.stringify({
          type: 'TEAM_STATE_SYNC',
          battleId,
          questionIndex,
          teamAnswers,
        })
      );
      return;
    }

    // ── SUBMIT MEMBER ANSWER & BROADCAST ALL TEAM ANSWERS ──

    if (type === 'SUBMIT_TEAM_MEMBER_ANSWER') {
      if (!answer || !answer.memberId) return;

      await redisPublisher.hset(ansKey, answer.memberId, JSON.stringify(answer));
      await redisPublisher.expire(ansKey, COMPLETED_ROOM_TTL_SECONDS);

      const rawAnswers = await redisPublisher.hgetall(ansKey);
      const teamAnswers: TeamMemberAnswerPayload[] = Object.values(rawAnswers).map((item) => JSON.parse(item));

      const voteCounts: Record<string, number> = {};
      let leaderVote = '';

      teamAnswers.forEach(ans => {
        voteCounts[ans.selectedOption] = (voteCounts[ans.selectedOption] || 0) + 1;
        if ((ans as any).isDesignatedLeader) leaderVote = ans.selectedOption;
      });

     
      let maxVotes = 0;
      let winningOption = '';
      let isTie = false;

      Object.entries(voteCounts).forEach(([option, count]) => {
        if (count > maxVotes) {
          maxVotes = count;
          winningOption = option;
          isTie = false;
        } else if (count === maxVotes) {
          isTie = true;
        }
      });

      if (isTie && leaderVote) {
        winningOption = leaderVote;
      }

      await redisPublisher.publish(
        channel,
        JSON.stringify({
          type: 'TEAM_ANSWERS_UPDATED',
          battleId,
          questionIndex,
          teamAnswers,
          currentWinningOption: winningOption,
          isTieResolvedByLeader: isTie
        })
      );
      return;
    }

    // ── END BATTLE ──
    if (type === 'END_TEAM_BATTLE' || (type === 'ADVANCE_QUESTION' && isLastQuestion)) {
      await redisPublisher.hset(sKey, { status: 'completed' });
      await redisPublisher.expire(sKey, COMPLETED_ROOM_TTL_SECONDS);

      await this.syncBattleToSupabase(redisPublisher, battleId, roomCode);

      const rawScores = await redisPublisher.hgetall(lKey);
      const leaderboard = Object.values(rawScores || {}).map((item) => JSON.parse(item));

      await redisPublisher.publish(
        channel,
        JSON.stringify({
          type: 'TEAM_BATTLE_COMPLETED',
          battleId,
          leaderboard,
        })
      );
      return;
    }
  }

  public handleLeave(ws: WebSocket, redisSubscriber: Redis): void {
    const battleId = this.clientRoomMap.get(ws);
    if (!battleId) return;

    const roomClients = this.activeRooms.get(battleId);
    if (roomClients) {
      roomClients.delete(ws);
      if (roomClients.size === 0) {
        this.activeRooms.delete(battleId);
        redisSubscriber.unsubscribe(roomChannel(battleId));
      }
    }
    this.clientRoomMap.delete(ws);
  }
}

export default new TeamBattleHandler();
