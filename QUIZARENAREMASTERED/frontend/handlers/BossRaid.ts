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

export interface BossBattlePayload {
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
  // Boss Raid Sync Fields
  bossHp?: number;
  classHp?: number;
  bossEnergy?: number;
  addBossEnergy?: number;
  bossCardEffect?: string;
}

/**
 * Individual Live Quiz mode ONLY. Connection registry, JOIN_BATTLE,
 * BATTLE_ACTION, and host-disconnect handling now live in
 * RoomPresenceHandler (shared by every mode) — this class only owns
 * quiz-progression mechanics: starting, advancing, scoring, ending.
 */
class BossRaidHandler {
  private redisPublisherRef: Redis | null = null;
  private questionTimers = new Map<string, NodeJS.Timeout>();
  private advancingBattles = new Set<string>();

  public initSubscriber(_redisSubscriber: Redis): void {
    // No-op now — RoomPresenceHandler owns the battle:{battleId} subscription
    // and fan-out. Kept as a method so server.ts's init loop doesn't need
    // special-casing.
  }

  /** Wires this handler's completion logic into RoomPresenceHandler's grace-period timer. */
  public registerAbandonHook(): void {
    roomPresenceHandler.setAbandonHook((battleId) => this.completeAbandonedRoom(battleId));
  }

  private clearQuestionTimer(battleId: string): void {
    const existing = this.questionTimers.get(battleId);
    if (existing) {
      clearTimeout(existing);
      this.questionTimers.delete(battleId);
    }
  }

  private async triggerAdvance(
    battleId: string,
    redisPublisher: Redis,
    roomCode: string | undefined
  ): Promise<void> {
    if (this.advancingBattles.has(battleId)) return;
    this.advancingBattles.add(battleId);
    try {
      this.clearQuestionTimer(battleId);
      const sKey = stateKey(battleId);
      const channel = roomChannel(battleId);
      const lKey = leaderboardKey(battleId);
      const hKey = historyKey(battleId);

      const [rawQuestions, roomState] = await Promise.all([
        redisPublisher.get(`battle:${battleId}:questions`),
        redisPublisher.hgetall(sKey),
      ]);
      const questions = rawQuestions ? JSON.parse(rawQuestions) : [];
      const currentIndex = parseInt(roomState.currentIndex || '0', 10);
      const nextIndex = currentIndex + 1;

      if (nextIndex >= questions.length) {
        await redisPublisher.hset(sKey, { status: 'completed' });
        await redisPublisher.expire(sKey, COMPLETED_ROOM_TTL_SECONDS);
        await redisPublisher.expire(hKey, COMPLETED_ROOM_TTL_SECONDS);
        await this.syncBattleToSupabase(redisPublisher, battleId, roomCode);
        const rawScores = await redisPublisher.hgetall(lKey);
        const leaderboard = Object.values(rawScores || {}).map((item) => JSON.parse(item));
        await redisPublisher.publish(
          channel,
          JSON.stringify({ type: 'QUIZ_COMPLETED', battleId, leaderboard })
        );
        return;
      }

      const startedAt = Date.now();
      const timeLimit = 60;

      await redisPublisher.hset(sKey, {
        currentIndex: String(nextIndex),
        startedAt: String(startedAt),
        timeLimit: String(timeLimit),
        customQuestion: "",
      });
      await redisPublisher.expire(sKey, ACTIVE_ROOM_TTL_SECONDS);

      await redisPublisher.publish(
        channel,
        JSON.stringify({
          type: 'QUESTION_ADVANCED',
          battleId,
          currentIndex: nextIndex,
          startedAt,
          timeLimit,
          customQuestion: undefined,
        })
      );
      this.scheduleTimeUp(battleId, timeLimit, redisPublisher, roomCode);
    } finally {
      this.advancingBattles.delete(battleId);
    }
  }

  private scheduleTimeUp(battleId: string, timeLimit: number, redisPublisher: Redis, roomCode?: string): void {
    this.clearQuestionTimer(battleId);
    const timer = setTimeout(async () => {
      const numStudents = Math.max(1, roomPresenceHandler.getPlayerCount(battleId) - 1);
      // "the fewer the more damage"
      const damage = numStudents === 1 ? 150 : numStudents <= 5 ? 100 : 50;

      const sKey = `battle:${battleId}:state`;
      const roomState = await redisPublisher.hgetall(sKey);
      if (!roomState || roomState.status === 'completed') return;

      let currentHp = parseInt(roomState.classHp || '1000', 10);
      currentHp = Math.max(0, currentHp - damage);
      await redisPublisher.hset(sKey, 'classHp', String(currentHp));

      await redisPublisher.publish(`battle:${battleId}`, JSON.stringify({
        type: 'BOSSRAID_TIME_UP',
        battleId,
        classHp: currentHp,
        damageTaken: damage,
        message: "Time's up! BRACE FOR IMPACT!"
      }));
      
      // Auto-advance after showing damage
      setTimeout(() => {
        this.triggerAdvance(battleId, redisPublisher, roomCode).catch(console.error);
      }, 2000);
    }, timeLimit * 1000);
    this.questionTimers.set(battleId, timer);
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
    payload: BossBattlePayload,
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

    if (payload.mode && payload.mode !== 'BOSSRAID') {
      console.warn(`[BossRaid] Ignoring payload for mode: ${payload.mode}`);
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
          bossHp: roomState.bossHp ? parseInt(roomState.bossHp, 10) : undefined,
          classHp: roomState.classHp ? parseInt(roomState.classHp, 10) : undefined,
          bossEnergy: roomState.bossEnergy ? parseInt(roomState.bossEnergy, 10) : undefined,
          mode: roomState.mode || 'LIVE',
          customQuestion: roomState.customQuestion ? JSON.parse(roomState.customQuestion) : undefined,
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
      roomPresenceHandler.setBattleMode(battleId, 'BOSSRAID');
      const startedAt = Date.now();
      const mode = payload.mode || 'LIVE';
      const initialIndex = mode === 'BOSSRAID' ? -1 : 0;
      const timeLimit = 60; // Enforce 60s

      await redisPublisher.hset(sKey, {
        currentIndex: String(initialIndex),
        status: 'active',
        startedAt: String(startedAt),
        timeLimit: String(timeLimit),
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
          timeLimit,
          questions: parsedQuestions,
        })
      );

      console.log(`[LiveBattle] Started ${battleId} with ${parsedQuestions.length} synchronized questions.`);
      this.scheduleTimeUp(battleId, timeLimit, redisPublisher, roomCode);
      return;
    }

    if (type === 'ADVANCE_QUESTION') {
      if (isLastQuestion) {
        this.clearQuestionTimer(battleId);
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
        const startedAt = Date.now();
        const newLimit = 60; // Enforce 60s
        const nextIndex = await redisPublisher.hincrby(sKey, 'currentIndex', 1);
        const updateData: Record<string, string> = {
          startedAt: String(startedAt),
          timeLimit: String(newLimit),
        };
        if (payload.customQuestion) {
          updateData.customQuestion = JSON.stringify(payload.customQuestion);
          
          // Remove the dragged question from the Redis bank so it doesn't reappear on refresh
          const qKey = `battle:${battleId}:questions`;
          const rawBank = await redisPublisher.get(qKey);
          if (rawBank) {
            let bank = JSON.parse(rawBank);
            const customQ = payload.customQuestion as any;
            bank = bank.filter((q: any) => {
              const qText = q.text || q.question;
              const customText = customQ.text || customQ.question;
              return qText !== customText;
            });
            await redisPublisher.set(qKey, JSON.stringify(bank));
            await redisPublisher.expire(qKey, ACTIVE_ROOM_TTL_SECONDS);
          }
        } else {
          updateData.customQuestion = ""; // clear it if not provided
        }
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
            customQuestion: payload.customQuestion,
          })
        );
        this.scheduleTimeUp(battleId, newLimit, redisPublisher, roomCode);
      }
      return;
    }

    if (type === 'END_BATTLE' || type === 'PROF_END_BATTLE') {
      this.clearQuestionTimer(battleId);
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
      this.clearQuestionTimer(battleId);
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

    if (type === 'BOSS_ACTION') {
      const updates: Record<string, string> = {};
      if (payload.bossHp !== undefined) updates.bossHp = String(payload.bossHp);
      if (payload.classHp !== undefined) updates.classHp = String(payload.classHp);
      if (payload.bossEnergy !== undefined) updates.bossEnergy = String(payload.bossEnergy);
      
      if (Object.keys(updates).length > 0) {
        await redisPublisher.hset(sKey, updates);
      }

      await redisPublisher.publish(
        channel,
        JSON.stringify(payload)
      );
      return;
    }
  }

  private async completeAbandonedRoom(battleId: string): Promise<void> {
    this.clearQuestionTimer(battleId);
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

export default new BossRaidHandler();