import { WebSocket } from 'ws';
import Redis from 'ioredis';
import { finalizeAndSaveBattle, PlayerResult } from '../src/lib/student/battle/battleSync';

const MAX_HISTORY_LIMIT = 100;
const COMPLETED_ROOM_TTL_SECONDS = 3600; // Retain room state for 1 hour so results linger

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
  isLastQuestion?: boolean;
  totalQuestions?: number;
  nextTimeLimit?: number;
  timeLimit?: number;
  forceReset?: boolean;
  questions?: unknown[];
  playerData?: PlayerData;
}

class LiveBattleHandler {
  private activeRooms: Map<string, Set<WebSocket>>;
  private clientRoomMap: Map<WebSocket, string>;

  constructor() {
    this.activeRooms = new Map<string, Set<WebSocket>>();
    this.clientRoomMap = new Map<WebSocket, string>();
  }

  public initSubscriber(redisSubscriber: Redis): void {
    redisSubscriber.on('message', (channel: string, message: string) => {
      const battleId = channel.replace('battle:', '');
      const clientsInRoom = this.activeRooms.get(battleId);

      if (clientsInRoom) {
        console.log(`[Redis -> WS] [Battle ${battleId}] Broadcasting to ${clientsInRoom.size} clients`);
        clientsInRoom.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
      }
    });
  }

  /**
   * Helper function to extract players from Redis and trigger Supabase sync
   */
  public async syncBattleToSupabase(
    redisPublisher: Redis,
    battleId: string,
    roomCode?: string
  ): Promise<void> {
    try {
      const lKey = leaderboardKey(battleId);
      const sKey = stateKey(battleId);

      // 1. Fetch raw leaderboard data from Redis
      const rawScores = await redisPublisher.hgetall(lKey);
      const roomState = await redisPublisher.hgetall(sKey);

      // 2. Format players for finalizeAndSaveBattle
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

      // 3. Commit to database via helper
      await finalizeAndSaveBattle({
        battleId,
        roomCode: roomCode || roomState.roomCode || 'LIVE_ROOM',
        battleMode: 'LIVE',
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
      message,
      sender,
      isLastQuestion,
      totalQuestions,
      nextTimeLimit,
      timeLimit,
      playerData,
    } = payload;

    if (!battleId) {
      ws.send(JSON.stringify({ error: 'battleId is required for all operations' }));
      return;
    }

    const channel = roomChannel(battleId);
    const sKey = stateKey(battleId);
    const hKey = historyKey(battleId);
    const lKey = leaderboardKey(battleId);

    // ── ACTION A: JOIN A SPECIFIC BATTLE ROOM & SYNC STATE ──
    if (type === 'JOIN_BATTLE') {
      if (!this.activeRooms.has(battleId)) {
        this.activeRooms.set(battleId, new Set<WebSocket>());
        redisSubscriber.subscribe(channel, (err) => {
          if (err) console.error(`Failed to subscribe to ${channel}`, err);
          else console.log(`Subscribed to Redis channel: ${channel}`);
        });
      }

      this.activeRooms.get(battleId)!.add(ws);
      this.clientRoomMap.set(ws, battleId);

      let roomState = await redisPublisher.hgetall(sKey);

      if (!roomState || !roomState.currentIndex || payload.forceReset) {
        roomState = {
          currentIndex: '0',
          startedAt: String(Date.now()),
          status: 'waiting',
          totalQuestions: String(totalQuestions || 10),
          timeLimit: String(timeLimit || 60),
          roomCode: roomCode || '',
        };
        await redisPublisher.hset(sKey, roomState);
        await redisPublisher.persist(sKey).catch(() => {});
        await redisPublisher.del(hKey);
      }

      const history = await redisPublisher.lrange(hKey, 0, -1);
      const rawScores = await redisPublisher.hgetall(lKey);

      const leaderboard = Object.values(rawScores || {}).map((item) => JSON.parse(item));

      ws.send(
        JSON.stringify({
          type: 'ROOM_STATE_SYNC',
          battleId,
          currentIndex: parseInt(roomState.currentIndex, 10),
          startedAt: parseInt(roomState.startedAt, 10),
          timeLimit: parseInt(roomState.timeLimit || '60', 10),
          status: roomState.status || 'waiting',
          history: history.map((item) => JSON.parse(item)),
          leaderboard,
        })
      );

      console.log(`Client joined Battle Room ${battleId} at question index ${roomState.currentIndex}`);
      return;
    }

    // ── ACTION: SUBMIT SCORE & BROADCAST LEADERBOARD UPDATE ──
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
        JSON.stringify({
          type: 'SCORE_UPDATED',
          battleId,
          leaderboard,
        })
      );
      return;
    }

    // ── ACTION: PROFESSOR STARTS THE BATTLE ──
    if (type === 'PROF_START_BATTLE') {
      const startedAt = Date.now();

      await redisPublisher.hset(sKey, {
        currentIndex: '0',
        status: 'active',
        startedAt: String(startedAt),
        roomCode: roomCode || '',
      });

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
          currentIndex: 0,
          startedAt,
          questions: parsedQuestions,
        })
      );

      console.log(`Professor started Battle Room ${battleId} with ${parsedQuestions.length} synchronized questions.`);
      return;
    }

    // ── ACTION B: ADVANCE QUESTION INDEX ──
    if (type === 'ADVANCE_QUESTION') {
      const nextIndex = await redisPublisher.hincrby(sKey, 'currentIndex', 1);
      const startedAt = Date.now();
      const newLimit = nextTimeLimit || 15;

      await redisPublisher.hset(sKey, {
        startedAt: String(startedAt),
        timeLimit: String(newLimit),
      });

      if (isLastQuestion) {
        await redisPublisher.hset(sKey, { status: 'completed' });
        await redisPublisher.expire(sKey, COMPLETED_ROOM_TTL_SECONDS);
        await redisPublisher.expire(hKey, COMPLETED_ROOM_TTL_SECONDS);

        const rawScores = await redisPublisher.hgetall(lKey);
        const leaderboard = Object.values(rawScores).map((item) => JSON.parse(item));

        // 1. Trigger Supabase Sync
        await this.syncBattleToSupabase(redisPublisher, battleId, roomCode);

        // 2. Notify Clients
        await redisPublisher.publish(
          channel,
          JSON.stringify({ type: 'QUIZ_COMPLETED', battleId, leaderboard })
        );
      } else {
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

    // ── ACTION C: PROFESSOR MANUALLY ENDS BATTLE ──
    if (type === 'END_BATTLE' || type === 'PROF_END_BATTLE') {
      await redisPublisher.hset(sKey, { status: 'completed' });
      await redisPublisher.expire(sKey, COMPLETED_ROOM_TTL_SECONDS);
      await redisPublisher.expire(hKey, COMPLETED_ROOM_TTL_SECONDS);

      const rawScores = await redisPublisher.hgetall(lKey);
      const leaderboard = Object.values(rawScores).map((item) => JSON.parse(item));

      // 1. Sync to Supabase
      await this.syncBattleToSupabase(redisPublisher, battleId, roomCode);

      // 2. Notify Room
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

    // ── ACTION D: RESET ROOM BACK TO QUESTION 1 ──
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

    // ── ACTION E: CHAT / GAME ACTIONS ──
    if (type === 'BATTLE_ACTION') {
      const eventData = JSON.stringify({
        type: 'BATTLE_ACTION',
        battleId,
        sender: sender || 'Anonymous',
        message,
        timestamp: new Date().toISOString(),
      });

      await redisPublisher.rpush(hKey, eventData);
      await redisPublisher.ltrim(hKey, -MAX_HISTORY_LIMIT, -1);
      await redisPublisher.publish(channel, eventData);
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
        const channel = roomChannel(battleId);

        redisSubscriber.unsubscribe(channel, (err) => {
          if (err) console.error(`Failed to unsubscribe from ${channel}`, err);
          else console.log(`Unsubscribed from empty channel: ${channel}`);
        });
      }
    }

    this.clientRoomMap.delete(ws);
    console.log(`Client left Battle Room ${battleId}`);
  }
}

export default new LiveBattleHandler();