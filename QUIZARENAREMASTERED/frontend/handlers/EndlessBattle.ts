import { WebSocket } from 'ws';
import Redis from 'ioredis';
import { finalizeAndSaveBattle, PlayerResult } from '../src/lib/student/battle/battleSync';
import roomPresenceHandler from './RoomPresence';

const COMPLETED_ROOM_TTL_SECONDS = 7 * 24 * 3600;
const ACTIVE_ROOM_TTL_SECONDS = 7 * 24 * 3600;

function roomChannel(battleId: string): string {
  return `battle:${battleId}`;
}
function stateKey(battleId: string): string {
  return `battle:${battleId}:state`;
}
function historyKey(battleId: string): string {
  return `battle:${battleId}:history`;
}
function leaderboardKey(battleId: string): string {
  return `battle:${battleId}:leaderboard`;
}

export interface PlayerData {
  id?: string;
  userId?: string;
  score?: number;
  correctAnswers?: number;
  totalQuestions?: number;
  accuracy?: number;
  [key: string]: unknown;
}

export interface BattlePayload {
  type: string;
  battleId: string;
  roomCode?: string;
  message?: string;
  sender?: string;
  userId?: string;
  isJoinEvent?: boolean;
  isLastQuestion?: boolean;
  totalQuestions?: number;
  nextTimeLimit?: number;
  timeLimit?: number;
  forceReset?: boolean;
  questions?: unknown[];
  playerData?: PlayerData;
  role?: 'host' | 'student';
  mode?: string;
  customQuestion?: unknown;
  currentIndex?: number;
}

/**
 * Endless Mode ONLY.
 */
class EndlessBattleHandler {
  private redisPublisherRef: Redis | null = null;

  public initSubscriber(_redisSubscriber: Redis): void {
  }

  /** Wires this handler's completion logic into RoomPresenceHandler's grace-period timer. */
  public registerAbandonHook(): void {
    roomPresenceHandler.setAbandonHook((battleId) => this.completeAbandonedRoom(battleId));
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
        const parsed = JSON.parse(item) as PlayerData;
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
        roomCode: roomCode || roomState.roomCode || 'LIVE_ROOM',
        battleMode: 'ENDLESS',
        players,
      });

      console.log(`[LiveBattle] Saved battle ${battleId} results to Supabase (${players.length} players)`);
    } catch (err) {
      console.error(`[LiveBattle] Failed to sync battle ${battleId} to Supabase:`, err);
    }
  }

  public async handleMessage(
    ws: WebSocket,
    payload: BattlePayload,
    redisPublisher: Redis,
    redisSubscriber: Redis
  ): Promise<void> {
    const {
      type,
      battleId,
      roomCode,
      isLastQuestion,
      nextTimeLimit,
      playerData,
    } = payload;

    if (!battleId) {
      ws.send(JSON.stringify({ error: 'battleId is required for all operations' }));
      return;
    }

    if (payload.mode && payload.mode !== 'ENDLESS') {
      console.warn(`[EndlessBattle] Ignoring payload for mode: ${payload.mode}`);
      return;
    }
    this.redisPublisherRef = redisPublisher;

    const channel = roomChannel(battleId);
    const sKey = stateKey(battleId);
    const hKey = historyKey(battleId);
    const lKey = leaderboardKey(battleId);

    // JOIN_BATTLE additionally sends back ROOM_STATE_SYNC (mode-specific
    // payload shape: leaderboard + questions) on top of what
    // RoomPresenceHandler already registered/seeded for this socket.
    if (type === 'JOIN_BATTLE') {
      const roomState = await redisPublisher.hgetall(sKey);
      const history = await redisPublisher.lrange(hKey, 0, -1);
      const rawScores = await redisPublisher.hgetall(lKey);
      const leaderboard = Object.values(rawScores || {}).map((item) => JSON.parse(item));

      ws.send(
        JSON.stringify({
          type: 'ROOM_STATE_SYNC',
          battleId,
          currentIndex: parseInt(roomState.currentIndex || roomState.questionIndex || '0', 10),
          startedAt: parseInt(roomState.startedAt || String(Date.now()), 10),
          timeLimit: parseInt(roomState.timeLimit || '60', 10),
          status: roomState.status || 'waiting',
          history: history.map((item) => JSON.parse(item)),
          leaderboard,
          questions: JSON.parse((await redisPublisher.get(`battle:${battleId}:questions`)) || '[]'),
          mode: roomState.mode || 'ENDLESS',
        })
      );

      console.log(`[LiveBattle] Sent ROOM_STATE_SYNC for ${battleId} at question index ${roomState.currentIndex || roomState.questionIndex}, mode: ${roomState.mode}`);
      return;
    }

    if (type === 'SUBMIT_SCORE' || type === 'UPDATE_PLAYER_PROGRESS') {
      if (!playerData || (!playerData.id && !playerData.userId)) return;

      const playerId = playerData.id || playerData.userId;
      if (playerId) {
        await redisPublisher.hset(lKey, playerId, JSON.stringify(playerData));
      }
      await redisPublisher.expire(lKey, COMPLETED_ROOM_TTL_SECONDS);

      const rawScores = await redisPublisher.hgetall(lKey);
      const leaderboard = Object.values(rawScores).map((item) => JSON.parse(item));

      await redisPublisher.publish(
        channel,
        JSON.stringify({ type: 'SCORE_UPDATED', battleId, leaderboard })
      );
      return;
    }

    if (type === 'PROF_START_BATTLE') {
      const startedAt = Date.now();
      const mode = payload.mode || 'ENDLESS';
      const initialIndex = 0;

      await redisPublisher.hset(sKey, {
        currentIndex: String(initialIndex),
        status: 'active',
        startedAt: String(startedAt),
        roomCode: roomCode || '',
        mode,
      });
      await redisPublisher.expire(sKey, ACTIVE_ROOM_TTL_SECONDS);

      if (payload.forceReset) {
        await redisPublisher.del(hKey);
        await redisPublisher.del(lKey);
      }

      if (payload.questions && Array.isArray(payload.questions)) {
        await redisPublisher.set(`battle:${battleId}:questions`, JSON.stringify(payload.questions));
      }

      const rawQuestions = await redisPublisher.get(`battle:${battleId}:questions`);
      const parsedQuestions = rawQuestions ? JSON.parse(rawQuestions) : [];

      await redisPublisher.publish(
        channel,
        JSON.stringify({
          type: 'PROF_START_BATTLE',
          battleId,
          mode,
          currentIndex: initialIndex,
          startedAt,
          questions: parsedQuestions,
        })
      );

      console.log(`[LiveBattle] Started ${battleId} with ${parsedQuestions.length} synchronized questions.`);
      return;
    }

    if (type === 'ADVANCE_QUESTION') {
      const startedAt = Date.now();
      const newLimit = nextTimeLimit || 15;

      if (isLastQuestion) {
        await redisPublisher.hset(sKey, { status: 'completed' });
        await redisPublisher.expire(sKey, COMPLETED_ROOM_TTL_SECONDS);
        await redisPublisher.expire(hKey, COMPLETED_ROOM_TTL_SECONDS);

        const rawScores = await redisPublisher.hgetall(lKey);
        const leaderboard = Object.values(rawScores).map((item) => JSON.parse(item));

        await this.syncBattleToSupabase(redisPublisher, battleId, roomCode);

        await redisPublisher.publish(
          channel,
          JSON.stringify({ type: 'QUIZ_COMPLETED', battleId, leaderboard })
        );
      } else {
        const nextIndex = await redisPublisher.hincrby(sKey, 'currentIndex', 1);
        const updateData: Record<string, string> = {
          startedAt: String(startedAt),
          timeLimit: String(newLimit),
        };
        await redisPublisher.hset(sKey, updateData);
        await redisPublisher.expire(sKey, ACTIVE_ROOM_TTL_SECONDS);
        await redisPublisher.publish(
          channel,
          JSON.stringify({
            type: 'QUESTION_ADVANCED',
            battleId,
            currentIndex: Number(nextIndex),
            startedAt,
            timeLimit: Number(newLimit),
          })
        );
      }
      return;
    }

    if (type === 'END_BATTLE' || type === 'PROF_END_BATTLE') {
      await redisPublisher.hset(sKey, { status: 'completed' });
      await redisPublisher.expire(sKey, COMPLETED_ROOM_TTL_SECONDS);
      await redisPublisher.expire(hKey, COMPLETED_ROOM_TTL_SECONDS);

      const rawScores = await redisPublisher.hgetall(lKey);
      const leaderboard = Object.values(rawScores).map((item) => JSON.parse(item));

      await this.syncBattleToSupabase(redisPublisher, battleId, roomCode);

      await redisPublisher.publish(
        channel,
        JSON.stringify({
          type: 'ROOM_COMPLETED',
          battleId,
          leaderboard,
          message: 'The session has finished and results are saved.',
        })
      );
      return;
    }

    if (type === 'RESET_ROOM') {
      const startedAt = Date.now();
      await redisPublisher.hset(sKey, {
        currentIndex: '0',
        startedAt: String(startedAt),
        status: 'waiting',
      });
      await redisPublisher.persist(sKey).catch(() => {});
      await redisPublisher.del(hKey);
      await redisPublisher.del(lKey);

      await redisPublisher.publish(
        channel,
        JSON.stringify({ type: 'ROOM_RESET', battleId, currentIndex: 0, startedAt })
      );
      return;
    }

    // (Endless specific actions if any go here)
  }

  private async completeAbandonedRoom(battleId: string): Promise<void> {
    if (!this.redisPublisherRef) return;
    const redisPublisher = this.redisPublisherRef;

    const sKey = stateKey(battleId);
    const hKey = historyKey(battleId);
    const lKey = leaderboardKey(battleId);
    const channel = roomChannel(battleId);

    const roomState = await redisPublisher.hgetall(sKey);
    if (!roomState || roomState.status === 'completed') return;

    await redisPublisher.hset(sKey, { status: 'completed' });
    await redisPublisher.expire(sKey, COMPLETED_ROOM_TTL_SECONDS);
    await redisPublisher.expire(hKey, COMPLETED_ROOM_TTL_SECONDS);

    const rawScores = await redisPublisher.hgetall(lKey);
    const leaderboard = Object.values(rawScores || {}).map((item) => JSON.parse(item));

    await this.syncBattleToSupabase(redisPublisher, battleId, roomState.roomCode);

    await redisPublisher.publish(
      channel,
      JSON.stringify({
        type: 'ROOM_COMPLETED',
        battleId,
        leaderboard,
        message: 'The host disconnected and the session was automatically closed.',
      })
    );
  }
}

export default new EndlessBattleHandler();
