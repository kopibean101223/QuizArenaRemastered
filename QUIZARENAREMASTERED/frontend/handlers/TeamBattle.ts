import { WebSocket } from 'ws';
import Redis from 'ioredis';
import { finalizeAndSaveBattle, PlayerResult } from '../src/lib/student/battle/battleSync';

const COMPLETED_ROOM_TTL_SECONDS = 3600;
const ACTIVE_ROOM_TTL_SECONDS = 4 * 60 * 60;

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
// which student picked which team, kept separate from in-battle answer
// state since team picking happens during the lobby, before a battle exists.
function teamsKey(battleId: string): string {
  return `battle:team:${battleId}:teams`;
}
// NEW: mirrors LiveBattle's `battle:{battleId}:questions` key — this was
// missing entirely, which is why TeamBattle had no way to receive or relay
// the professor's question set.
function questionsKey(battleId: string): string {
  return `battle:team:${battleId}:questions`;
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
  // for JOIN_TEAM_LOBBY / TEAM_ASSIGNMENT_UPDATE
  userId?: string;
  teamId?: number | string | null;
  // NEW: carries the professor's question bank when starting the match,
  // exactly like BattlePayload.questions does in LiveBattle.ts.
  questions?: unknown[];
  forceReset?: boolean;
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

  // shared by JOIN_TEAM_BATTLE, JOIN_TEAM_LOBBY, and (defensively)
  // TEAM_ASSIGNMENT_UPDATE — registers this socket as a member of the room
  // so it receives future broadcasts on `channel`, and subscribes the Redis
  // channel the first time anyone joins.
  private registerClient(
    ws: WebSocket,
    battleId: string,
    channel: string,
    redisSubscriber: Redis
  ): void {
    if (!this.activeRooms.has(battleId)) {
      this.activeRooms.set(battleId, new Set<WebSocket>());
      redisSubscriber.subscribe(channel, (err) => {
        if (err) console.error(`Failed to subscribe to ${channel}`, err);
      });
    }

    this.activeRooms.get(battleId)!.add(ws);
    this.clientRoomMap.set(ws, battleId);
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
    const { type, battleId, roomCode, questionIndex = 0, answer, isLastQuestion, userId, teamId } = payload;

    if (!battleId) {
      ws.send(JSON.stringify({ error: 'battleId is required for Team operations' }));
      return;
    }

    const channel = roomChannel(battleId);
    const sKey = stateKey(battleId);
    const ansKey = teamAnswersKey(battleId, questionIndex);
    const lKey = leaderboardKey(battleId);
    const tKey = teamsKey(battleId);
    const qKey = questionsKey(battleId);

    // ── JOIN TEAM LOBBY (pre-battle team picking, sent from Lobby_TeamMode) ──
    if (type === 'JOIN_TEAM_LOBBY') {
      this.registerClient(ws, battleId, channel, redisSubscriber);

      const rawTeams = await redisPublisher.hgetall(tKey);

      ws.send(
        JSON.stringify({
          type: 'TEAM_LOBBY_STATE_SYNC',
          battleId,
          teams: rawTeams, // { [userId]: "teamId" } — current picks so far
        })
      );
      return;
    }

    // ── TEAM ASSIGNMENT UPDATE (student joins/leaves a team in the lobby) ──
    if (type === 'TEAM_ASSIGNMENT_UPDATE') {
      // Defensive: register even if JOIN_TEAM_LOBBY was somehow missed, so
      // this client still gets included in the broadcast below.
      this.registerClient(ws, battleId, channel, redisSubscriber);

      if (!userId) return;

      if (teamId === null || teamId === undefined) {
        await redisPublisher.hdel(tKey, userId);
      } else {
        await redisPublisher.hset(tKey, userId, String(teamId));
      }
      await redisPublisher.expire(tKey, COMPLETED_ROOM_TTL_SECONDS);

      await redisPublisher.publish(
        channel,
        JSON.stringify({
          type: 'TEAM_ASSIGNMENT_UPDATE',
          battleId,
          userId,
          teamId: teamId ?? null,
        })
      );
      return;
    }

    // ── JOIN TEAM BATTLE ──
    if (type === 'JOIN_TEAM_BATTLE') {
      this.registerClient(ws, battleId, channel, redisSubscriber);

      const rawAnswers = await redisPublisher.hgetall(ansKey);
      const teamAnswers = Object.values(rawAnswers || {}).map((item) => JSON.parse(item));

      // NEW: hand back whatever question set the professor already started
      // this match with, same as LiveBattle's JOIN_BATTLE does. Without
      // this, a student who joins/reconnects after PROF_START_TEAM never
      // gets the questions at all.
      const rawQuestions = await redisPublisher.get(qKey);
      const questions = rawQuestions ? JSON.parse(rawQuestions) : [];

      ws.send(
        JSON.stringify({
          type: 'TEAM_STATE_SYNC',
          battleId,
          questionIndex,
          teamAnswers,
          questions,
        })
      );
      return;
    }

    // ── PROFESSOR STARTS THE TEAM BATTLE ── (NEW — mirrors LiveBattle's
    // PROF_START_BATTLE; this case did not exist before, which is the root
    // cause of Team clients being stuck on "Waiting for questions to load…")
    if (type === 'PROF_START_TEAM') {
      await redisPublisher.hset(sKey, { status: 'active', roomCode: roomCode || '' });
      await redisPublisher.expire(sKey, ACTIVE_ROOM_TTL_SECONDS);

      if (payload.forceReset) {
        await redisPublisher.del(ansKey);
        await redisPublisher.del(lKey);
      }

      if (payload.questions && Array.isArray(payload.questions)) {
        await redisPublisher.set(qKey, JSON.stringify(payload.questions));
      }

      const rawQuestions = await redisPublisher.get(qKey);
      const questions = rawQuestions ? JSON.parse(rawQuestions) : [];

      await redisPublisher.publish(
        channel,
        JSON.stringify({
          type: 'TEAM_STATE_SYNC',
          battleId,
          questionIndex: 0,
          teamAnswers: [],
          questions,
        })
      );

      // FIX: the pre-battle lobby screen (useLobbySocket) only ever joins
      // via JOIN_BATTLE, which subscribes it to the generic `battle:{battleId}`
      // channel through liveBattleHandler — it is NEVER registered with this
      // handler's own `battle:team:{battleId}` channel, so the broadcast
      // above can never reach it no matter what message type it's looking
      // for. Without this second publish, students stay stuck on the lobby
      // screen forever even though the match has actually started.
      await redisPublisher.publish(
        `battle:${battleId}`,
        JSON.stringify({
          type: 'TEAM_STATE_SYNC',
          battleId,
          questions,
        })
      );

      console.log(`Professor started Team Battle Room ${battleId} with ${questions.length} synchronized questions.`);
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