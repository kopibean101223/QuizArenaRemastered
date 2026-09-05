import { WebSocket } from 'ws';
import Redis from 'ioredis';
import { finalizeAndSaveBattle, PlayerResult } from '../src/lib/student/battle/battleSync';
import roomPresenceHandler from './RoomPresence';

const COMPLETED_ROOM_TTL_SECONDS = 7 * 24 * 3600;
const ACTIVE_ROOM_TTL_SECONDS = 7 * 24 * 3600;

const DEFAULT_BOSS_MAX_HP = 1000;
const DEFAULT_CLASS_MAX_HP = 1000;
const BASE_DAMAGE = 100;
const TIME_LIMIT_SECONDS = 60;

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
function questionsKey(battleId: string): string {
  return `battle:${battleId}:questions`;
}
function answeredKey(battleId: string, questionIndex: number): string {
  return `battle:${battleId}:q:${questionIndex}:answered`;
}
function damageLogKey(battleId: string): string {
  return `battle:${battleId}:damagelog`;
}

export interface PlayerData {
  id?: string;
  userId?: string;
  name?: string;
  score?: number;
  correctAnswers?: number;
  totalQuestions?: number;
  accuracy?: number;
  streak?: number;
  isLeader?: boolean;
  powerups?: string[];
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
  question?: unknown;
  currentIndex?: number;
  questionIndex?: number;
  answer?: string;
  powerupId?: string;
  cardId?: string;
  action?: string;
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

  private getActiveStudentCount(battleId: string): number {
    const totalCount = roomPresenceHandler.getPlayerCount(battleId);
    return Math.max(1, totalCount - 1); // host is 1
  }

  private calculateDamagePerStudent(studentCount: number): number {
    return Math.max(1, Math.round(BASE_DAMAGE / Math.max(1, studentCount)));
  }

  private deriveQuestionCount(bossMaxHp: number, studentCount: number, availableQuestionsCount: number): number {
    const questionBudget = bossMaxHp * 0.8;
    const damagePerStudent = this.calculateDamagePerStudent(studentCount);
    const effectiveDamagePerRound = Math.max(1, damagePerStudent * studentCount);
    const calculatedRounds = Math.ceil(questionBudget / effectiveDamagePerRound);
    return Math.max(1, Math.min(availableQuestionsCount > 0 ? availableQuestionsCount : calculatedRounds, calculatedRounds));
  }

  private async incrementVersion(redisPublisher: Redis, sKey: string): Promise<number> {
    return await redisPublisher.hincrby(sKey, 'version', 1);
  }

  private async broadcastState(
    redisPublisher: Redis,
    battleId: string,
    additionalData: Record<string, unknown> = {}
  ): Promise<void> {
    const sKey = stateKey(battleId);
    const lKey = leaderboardKey(battleId);
    const [roomState, rawScores, rawQuestions, rawDamageLog] = await Promise.all([
      redisPublisher.hgetall(sKey),
      redisPublisher.hgetall(lKey),
      redisPublisher.get(questionsKey(battleId)),
      redisPublisher.lrange(damageLogKey(battleId), -20, -1),
    ]);

    const leaderboard = Object.values(rawScores || {}).map((item) => JSON.parse(item));
    const questions = rawQuestions ? JSON.parse(rawQuestions) : [];
    const damageLog = (rawDamageLog || []).map((item) => JSON.parse(item));

    const syncPayload = {
      type: 'BOSSRAID_STATE_SYNC',
      battleId,
      mode: 'BOSSRAID',
      status: roomState.status || 'waiting',
      phase: roomState.phase || 'QUESTION',
      version: parseInt(roomState.version || '1', 10),
      serverTime: Date.now(),
      currentIndex: parseInt(roomState.currentIndex || '0', 10),
      totalQuestions: parseInt(roomState.totalQuestions || '10', 10),
      questionStartedAt: parseInt(roomState.questionStartedAt || '0', 10),
      questionEndsAt: parseInt(roomState.questionEndsAt || '0', 10),
      timeLimit: parseInt(roomState.timeLimit || String(TIME_LIMIT_SECONDS), 10),
      bossHp: parseInt(roomState.bossHp || String(DEFAULT_BOSS_MAX_HP), 10),
      bossMaxHp: parseInt(roomState.bossMaxHp || String(DEFAULT_BOSS_MAX_HP), 10),
      classHp: parseInt(roomState.classHp || String(DEFAULT_CLASS_MAX_HP), 10),
      classMaxHp: parseInt(roomState.classMaxHp || String(DEFAULT_CLASS_MAX_HP), 10),
      questionDamageBudget: parseInt(roomState.questionDamageBudget || '800', 10),
      questionDamageDealt: parseInt(roomState.questionDamageDealt || '0', 10),
      powerupDamageDealt: parseInt(roomState.powerupDamageDealt || '0', 10),
      bossEnergy: parseInt(roomState.bossEnergy || '0', 10),
      bossMaxEnergy: parseInt(roomState.bossMaxEnergy || '100', 10),
      overrideUnlocked: roomState.overrideUnlocked === 'true',
      overrideActive: roomState.overrideActive === 'true',
      overrideStartedAt: parseInt(roomState.overrideStartedAt || '0', 10),
      overrideEndsAt: parseInt(roomState.overrideEndsAt || '0', 10),
      activePowerup: roomState.activePowerup || null,
      powerupStartedAt: parseInt(roomState.powerupStartedAt || '0', 10),
      powerupEndsAt: parseInt(roomState.powerupEndsAt || '0', 10),
      staggerProgress: parseInt(roomState.staggerProgress || '0', 10),
      staggerThreshold: parseInt(roomState.staggerThreshold || '3', 10),
      staggeredUntil: parseInt(roomState.staggeredUntil || '0', 10),
      activeStudentCount: parseInt(roomState.activeStudentCount || '1', 10),
      customQuestion: roomState.customQuestion ? JSON.parse(roomState.customQuestion) : undefined,
      currentQuestion: roomState.customQuestion
        ? JSON.parse(roomState.customQuestion)
        : (parseInt(roomState.currentIndex || '-1', 10) >= 0 ? questions[parseInt(roomState.currentIndex || '-1', 10)] : null),
      leaderboard,
      damageLog,
      ...additionalData,
    };

    await redisPublisher.publish(roomChannel(battleId), JSON.stringify(syncPayload));
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

      const [rawQuestions, roomState] = await Promise.all([
        redisPublisher.get(questionsKey(battleId)),
        redisPublisher.hgetall(sKey),
      ]);
      const questions = rawQuestions ? JSON.parse(rawQuestions) : [];
      const currentIndex = parseInt(roomState.currentIndex || '0', 10);
      const totalQuestions = parseInt(roomState.totalQuestions || '10', 10);
      const nextIndex = currentIndex + 1;

      const bossHp = parseInt(roomState.bossHp || String(DEFAULT_BOSS_MAX_HP), 10);
      const classHp = parseInt(roomState.classHp || String(DEFAULT_CLASS_MAX_HP), 10);

      if (nextIndex >= totalQuestions || nextIndex >= questions.length || bossHp <= 0 || classHp <= 0) {
        const v = await this.incrementVersion(redisPublisher, sKey);
        await redisPublisher.hset(sKey, { status: 'completed', phase: 'COMPLETED' });
        await redisPublisher.expire(sKey, COMPLETED_ROOM_TTL_SECONDS);
        await redisPublisher.expire(historyKey(battleId), COMPLETED_ROOM_TTL_SECONDS);
        await this.syncBattleToSupabase(redisPublisher, battleId, roomCode);

        const lKey = leaderboardKey(battleId);
        const rawScores = await redisPublisher.hgetall(lKey);
        const leaderboard = Object.values(rawScores || {}).map((item) => JSON.parse(item));

        await redisPublisher.publish(
          channel,
          JSON.stringify({
            type: 'QUIZ_COMPLETED',
            battleId,
            mode: 'BOSSRAID',
            leaderboard,
            bossHp,
            classHp,
            version: v,
            winner: bossHp <= 0 ? 'CLASS' : 'BOSS',
          })
        );
        return;
      }

      const startedAt = Date.now();
      const timeLimit = TIME_LIMIT_SECONDS;
      const endsAt = startedAt + timeLimit * 1000;

      await redisPublisher.hset(sKey, {
        currentIndex: String(nextIndex),
        questionStartedAt: String(startedAt),
        questionEndsAt: String(endsAt),
        startedAt: String(startedAt),
        timeLimit: String(timeLimit),
        phase: 'QUESTION',
        customQuestion: '',
        activePowerup: '',
        powerupEndsAt: '0',
      });
      const v = await this.incrementVersion(redisPublisher, sKey);
      await redisPublisher.expire(sKey, ACTIVE_ROOM_TTL_SECONDS);

      await redisPublisher.publish(
        channel,
        JSON.stringify({
          type: 'QUESTION_ADVANCED',
          battleId,
          mode: 'BOSSRAID',
          currentIndex: nextIndex,
          questionStartedAt: startedAt,
          questionEndsAt: endsAt,
          startedAt,
          timeLimit,
          version: v,
        })
      );
      this.scheduleTimeUp(battleId, timeLimit, redisPublisher, roomCode);
    } finally {
      this.advancingBattles.delete(battleId);
    }
  }

  private scheduleTimeUp(
    battleId: string,
    timeLimitSeconds: number,
    redisPublisher: Redis,
    roomCode?: string
  ): void {
    this.clearQuestionTimer(battleId);
    const timer = setTimeout(async () => {
      const sKey = stateKey(battleId);
      const roomState = await redisPublisher.hgetall(sKey);
      if (!roomState || roomState.status === 'completed') return;

      const numStudents = Math.max(1, roomPresenceHandler.getPlayerCount(battleId) - 1);
      const damage = numStudents === 1 ? 150 : numStudents <= 5 ? 100 : 50;

      let currentClassHp = parseInt(roomState.classHp || String(DEFAULT_CLASS_MAX_HP), 10);
      currentClassHp = Math.max(0, currentClassHp - damage);

      let bossEnergy = parseInt(roomState.bossEnergy || '0', 10) + 5;
      let overrideUnlocked = roomState.overrideUnlocked === 'true';
      if (bossEnergy >= 100) {
        bossEnergy = 100;
        overrideUnlocked = true;
      }

      await redisPublisher.hset(sKey, {
        classHp: String(currentClassHp),
        bossEnergy: String(bossEnergy),
        overrideUnlocked: String(overrideUnlocked),
      });
      const v = await this.incrementVersion(redisPublisher, sKey);

      await redisPublisher.rpush(
        damageLogKey(battleId),
        JSON.stringify({
          player: 'BOSS',
          action: 'TIME_OUT_STRIKE',
          value: damage,
          timestamp: Date.now(),
        })
      );

      await redisPublisher.publish(
        roomChannel(battleId),
        JSON.stringify({
          type: 'BOSSRAID_TIME_UP',
          battleId,
          classHp: currentClassHp,
          damageTaken: damage,
          bossEnergy,
          overrideUnlocked,
          version: v,
          message: "Time's up! BRACE FOR IMPACT!",
        })
      );

      if (currentClassHp <= 0) {
        setTimeout(() => {
          this.triggerAdvance(battleId, redisPublisher, roomCode).catch(console.error);
        }, 1500);
      } else {
        setTimeout(() => {
          this.triggerAdvance(battleId, redisPublisher, roomCode).catch(console.error);
        }, 2000);
      }
    }, timeLimitSeconds * 1000);
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

      console.log(`[BossRaid] Saved battle ${battleId} results to Supabase (${players.length} players)`);
    } catch (err) {
      console.error(`[BossRaid] Failed to sync battle ${battleId} to Supabase:`, err);
    }
  }

  public async handleMessage(
    ws: WebSocket,
    payload: BossBattlePayload,
    redisPublisher: Redis,
    redisSubscriber: Redis
  ): Promise<void> {
    const { type, battleId, roomCode, playerData, userId } = payload;

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

    // ──────────────────────────────────────────
    // 1. JOIN_BATTLE: Authoritative State Recovery
    // ──────────────────────────────────────────
    if (type === 'JOIN_BATTLE') {
      const [roomState, rawScores, rawQuestions, rawDamageLog] = await Promise.all([
        redisPublisher.hgetall(sKey),
        redisPublisher.hgetall(lKey),
        redisPublisher.get(questionsKey(battleId)),
        redisPublisher.lrange(damageLogKey(battleId), -20, -1),
      ]);

      const leaderboard = Object.values(rawScores || {}).map((item) => JSON.parse(item));
      const questions = rawQuestions ? JSON.parse(rawQuestions) : [];
      const damageLog = (rawDamageLog || []).map((item) => JSON.parse(item));

      const currentIndex = parseInt(roomState.currentIndex || '0', 10);
      const startedAt = parseInt(roomState.questionStartedAt || roomState.startedAt || String(Date.now()), 10);
      const endsAt = parseInt(roomState.questionEndsAt || String(startedAt + TIME_LIMIT_SECONDS * 1000), 10);
      const timeLimit = parseInt(roomState.timeLimit || String(TIME_LIMIT_SECONDS), 10);

      ws.send(
        JSON.stringify({
          type: 'BOSSRAID_STATE_SYNC',
          battleId,
          mode: 'BOSSRAID',
          currentIndex,
          totalQuestions: parseInt(roomState.totalQuestions || '10', 10),
          questionStartedAt: startedAt,
          questionEndsAt: endsAt,
          startedAt,
          timeLimit,
          status: roomState.status || 'waiting',
          phase: roomState.phase || 'QUESTION',
          bossHp: parseInt(roomState.bossHp || String(DEFAULT_BOSS_MAX_HP), 10),
          bossMaxHp: parseInt(roomState.bossMaxHp || String(DEFAULT_BOSS_MAX_HP), 10),
          classHp: parseInt(roomState.classHp || String(DEFAULT_CLASS_MAX_HP), 10),
          classMaxHp: parseInt(roomState.classMaxHp || String(DEFAULT_CLASS_MAX_HP), 10),
          questionDamageBudget: parseInt(roomState.questionDamageBudget || '800', 10),
          questionDamageDealt: parseInt(roomState.questionDamageDealt || '0', 10),
          powerupDamageDealt: parseInt(roomState.powerupDamageDealt || '0', 10),
          bossEnergy: parseInt(roomState.bossEnergy || '0', 10),
          bossMaxEnergy: parseInt(roomState.bossMaxEnergy || '100', 10),
          overrideUnlocked: roomState.overrideUnlocked === 'true',
          overrideActive: roomState.overrideActive === 'true',
          overrideStartedAt: parseInt(roomState.overrideStartedAt || '0', 10),
          overrideEndsAt: parseInt(roomState.overrideEndsAt || '0', 10),
          activePowerup: roomState.activePowerup || null,
          powerupStartedAt: parseInt(roomState.powerupStartedAt || '0', 10),
          powerupEndsAt: parseInt(roomState.powerupEndsAt || '0', 10),
          staggerProgress: parseInt(roomState.staggerProgress || '0', 10),
          staggerThreshold: parseInt(roomState.staggerThreshold || '3', 10),
          staggeredUntil: parseInt(roomState.staggeredUntil || '0', 10),
          activeStudentCount: parseInt(roomState.activeStudentCount || '1', 10),
          leaderboard,
          questions,
          currentQuestion: roomState.customQuestion
            ? JSON.parse(roomState.customQuestion)
            : (currentIndex >= 0 ? questions[currentIndex] : null),
          customQuestion: roomState.customQuestion ? JSON.parse(roomState.customQuestion) : undefined,
          damageLog,
          version: parseInt(roomState.version || '1', 10),
          serverTime: Date.now(),
        })
      );

      console.log(`[BossRaid] Client joined & synchronized battle ${battleId}`);
      return;
    }

    // ──────────────────────────────────────────
    // 2. PROF_START_BATTLE: Calculate Budget & Init
    // ──────────────────────────────────────────
    if (type === 'PROF_START_BATTLE') {
      roomPresenceHandler.setBattleMode(battleId, 'BOSSRAID');
      const startedAt = Date.now();
      const timeLimit = TIME_LIMIT_SECONDS;
      const endsAt = startedAt + timeLimit * 1000;

      if (payload.questions && Array.isArray(payload.questions)) {
        await redisPublisher.set(questionsKey(battleId), JSON.stringify(payload.questions));
      }

      const rawQuestions = await redisPublisher.get(questionsKey(battleId));
      const parsedQuestions = rawQuestions ? JSON.parse(rawQuestions) : [];

      const studentCount = this.getActiveStudentCount(battleId);
      const bossMaxHp = DEFAULT_BOSS_MAX_HP;
      const classMaxHp = DEFAULT_CLASS_MAX_HP;
      const questionDamageBudget = Math.round(bossMaxHp * 0.8);
      const powerupDamageBudget = Math.round(bossMaxHp * 0.2);
      const totalQuestions = this.deriveQuestionCount(bossMaxHp, studentCount, parsedQuestions.length);

      const initialRoomState: Record<string, string> = {
        currentIndex: '-1',
        status: 'active',
        phase: 'WAITING',
        startedAt: String(startedAt),
        questionStartedAt: '0',
        questionEndsAt: '0',
        timeLimit: String(timeLimit),
        roomCode: roomCode || '',
        mode: 'BOSSRAID',
        bossHp: String(bossMaxHp),
        bossMaxHp: String(bossMaxHp),
        classHp: String(classMaxHp),
        classMaxHp: String(classMaxHp),
        questionDamageBudget: String(questionDamageBudget),
        questionDamageDealt: '0',
        powerupDamageDealt: '0',
        powerupDamageBudget: String(powerupDamageBudget),
        bossEnergy: '0',
        bossMaxEnergy: '100',
        overrideUnlocked: 'false',
        overrideActive: 'false',
        overrideStartedAt: '0',
        overrideEndsAt: '0',
        activePowerup: '',
        powerupStartedAt: '0',
        powerupEndsAt: '0',
        staggerProgress: '0',
        staggerThreshold: '3',
        staggeredUntil: '0',
        activeStudentCount: String(studentCount),
        totalQuestions: String(totalQuestions),
        customQuestion: '',
        version: '1',
      };

      await redisPublisher.hset(sKey, initialRoomState);
      await redisPublisher.expire(sKey, ACTIVE_ROOM_TTL_SECONDS);

      if (payload.forceReset) {
        await redisPublisher.del(hKey);
        await redisPublisher.del(lKey);
        await redisPublisher.del(damageLogKey(battleId));
      }

      await this.broadcastState(redisPublisher, battleId, {
        type: 'PROF_START_BATTLE',
        phase: 'WAITING',
        currentIndex: -1,
        currentQuestion: null,
        questions: parsedQuestions,
      });

      console.log(`[BossRaid] Started battle ${battleId} in WAITING mode (awaiting professor attack): studentCount=${studentCount}, questions=${totalQuestions}`);
      return;
    }

    // ──────────────────────────────────────────
    // 2.5. BOSS_ACTION_LAUNCH_QUESTION / ADVANCE_QUESTION: Drag-and-Drop / Advance Question
    // ──────────────────────────────────────────
    if (type === 'BOSS_ACTION_LAUNCH_QUESTION' || type === 'ADVANCE_QUESTION') {
      const roomState = await redisPublisher.hgetall(sKey);
      if (!roomState || roomState.status !== 'active') return;

      const rawQuestions = await redisPublisher.get(questionsKey(battleId));
      const questions = rawQuestions ? JSON.parse(rawQuestions) : [];

      let nextIndex = typeof payload.currentIndex === 'number'
        ? payload.currentIndex
        : parseInt(roomState.currentIndex || '-1', 10) + 1;
      
      if (nextIndex < 0) nextIndex = 0;

      const launchedQuestion = payload.question || payload.customQuestion || questions[nextIndex] || null;
      const timeLimit = payload.nextTimeLimit || payload.timeLimit || TIME_LIMIT_SECONDS;
      const startedAt = Date.now();
      const endsAt = startedAt + timeLimit * 1000;

      let bossEnergy = parseInt(roomState.bossEnergy || '0', 10);
      let overrideUnlocked = roomState.overrideUnlocked === 'true';

      // Boss gains +15 energy upon launching an attack question
      bossEnergy = Math.min(100, bossEnergy + 15);
      if (bossEnergy >= 100) {
        overrideUnlocked = true;
      }

      const updates: Record<string, string> = {
        currentIndex: String(nextIndex),
        phase: 'QUESTION',
        questionStartedAt: String(startedAt),
        questionEndsAt: String(endsAt),
        startedAt: String(startedAt),
        timeLimit: String(timeLimit),
        bossEnergy: String(bossEnergy),
        overrideUnlocked: String(overrideUnlocked),
      };

      if (launchedQuestion) {
        updates.customQuestion = JSON.stringify(launchedQuestion);
      } else {
        updates.customQuestion = '';
      }

      await redisPublisher.hset(sKey, updates);
      const v = await this.incrementVersion(redisPublisher, sKey);
      await redisPublisher.expire(sKey, ACTIVE_ROOM_TTL_SECONDS);

      this.clearQuestionTimer(battleId);
      this.scheduleTimeUp(battleId, timeLimit, redisPublisher, roomCode);

      await this.broadcastState(redisPublisher, battleId, {
        type: 'BOSSRAID_STATE_SYNC',
        currentQuestion: launchedQuestion,
        customQuestion: launchedQuestion || undefined,
        currentIndex: nextIndex,
        phase: 'QUESTION',
        questionStartedAt: startedAt,
        questionEndsAt: endsAt,
        timeLimit,
        bossEnergy,
        overrideUnlocked,
        version: v,
      });

      // Also emit QUESTION_ADVANCED for student hooks listening to that event
      await redisPublisher.publish(
        roomChannel(battleId),
        JSON.stringify({
          type: 'QUESTION_ADVANCED',
          battleId,
          mode: 'BOSSRAID',
          currentIndex: nextIndex,
          questionStartedAt: startedAt,
          questionEndsAt: endsAt,
          startedAt,
          timeLimit,
          currentQuestion: launchedQuestion,
          customQuestion: launchedQuestion || undefined,
          bossEnergy,
          overrideUnlocked,
          version: v,
        })
      );

      console.log(`[BossRaid] Boss launched attack question index ${nextIndex} for battle ${battleId}, Energy: ${bossEnergy}%`);
      return;
    }

    // ──────────────────────────────────────────
    // 3. SUBMIT_BOSS_RAID_ANSWER: Authoritative Mechanics
    // ──────────────────────────────────────────
    if (type === 'SUBMIT_BOSS_RAID_ANSWER' || type === 'SUBMIT_ANSWER') {
      const studentId = userId || payload.sender || ws.toString();
      const questionIndex = payload.questionIndex ?? payload.currentIndex;
      const answer = payload.answer;

      if (questionIndex === undefined || answer === undefined) return;

      // Idempotency: ensure student only answers once per question
      const qAnsKey = answeredKey(battleId, questionIndex);
      const added = await redisPublisher.sadd(qAnsKey, studentId);
      if (added === 0) {
        console.log(`[BossRaid] Duplicate answer ignored for user ${studentId} on question ${questionIndex}`);
        return;
      }
      await redisPublisher.expire(qAnsKey, ACTIVE_ROOM_TTL_SECONDS);

      const roomState = await redisPublisher.hgetall(sKey);
      if (!roomState || roomState.status !== 'active') return;

      const currentQIdx = parseInt(roomState.currentIndex || '0', 10);
      if (questionIndex !== currentQIdx) {
        console.warn(`[BossRaid] Answer submitted for outdated question index ${questionIndex} vs current ${currentQIdx}`);
        return;
      }

      const now = Date.now();
      const questionEndsAt = parseInt(roomState.questionEndsAt || '0', 10);
      const isExpired = questionEndsAt > 0 && now > questionEndsAt;

      let correctChoice = '';
      if (roomState.phase === 'OVERRIDE' && roomState.customQuestion) {
        const customQ = JSON.parse(roomState.customQuestion);
        correctChoice = customQ.answer || customQ.choices?.[0] || '';
      } else {
        const rawQ = await redisPublisher.get(questionsKey(battleId));
        const questionsList = rawQ ? JSON.parse(rawQ) : [];
        const activeQ = questionsList[currentQIdx];
        correctChoice = activeQ?.answer || activeQ?.choices?.[0] || activeQ?.options?.[0] || '';
      }

      const isCorrect = !isExpired && String(answer).trim().toLowerCase() === String(correctChoice).trim().toLowerCase();

      let bossHp = parseInt(roomState.bossHp || String(DEFAULT_BOSS_MAX_HP), 10);
      let classHp = parseInt(roomState.classHp || String(DEFAULT_CLASS_MAX_HP), 10);
      let bossEnergy = parseInt(roomState.bossEnergy || '0', 10);
      let overrideUnlocked = roomState.overrideUnlocked === 'true';
      let staggerProgress = parseInt(roomState.staggerProgress || '0', 10);
      let staggeredUntil = parseInt(roomState.staggeredUntil || '0', 10);
      let questionDamageBudget = parseInt(roomState.questionDamageBudget || '800', 10);
      let questionDamageDealt = parseInt(roomState.questionDamageDealt || '0', 10);
      let powerupDamageDealt = parseInt(roomState.powerupDamageDealt || '0', 10);

      const isStaggeredNow = now < staggeredUntil;
      const isEvasionActive = roomState.activePowerup === 'EVASION' && now < parseInt(roomState.powerupEndsAt || '0', 10);

      let damageApplied = 0;
      const studentCount = Math.max(1, parseInt(roomState.activeStudentCount || '1', 10));

      if (isCorrect) {
        let baseHit = this.calculateDamagePerStudent(studentCount);
        if (isEvasionActive) {
          baseHit = Math.max(1, Math.round(baseHit * 0.5));
        }

        if (roomState.phase === 'OVERRIDE') {
          damageApplied = Math.min(baseHit, Math.max(0, parseInt(roomState.bossMaxHp || '1000', 10) * 0.2 - powerupDamageDealt));
          powerupDamageDealt += damageApplied;
        } else {
          const remainingBudget = Math.max(0, questionDamageBudget - questionDamageDealt);
          damageApplied = Math.min(baseHit, remainingBudget);
          questionDamageDealt += damageApplied;
        }

        bossHp = Math.max(0, bossHp - damageApplied);

        if (!isStaggeredNow) {
          staggerProgress += 1;
          if (staggerProgress >= 3) {
            staggeredUntil = now + 10_000;
            staggerProgress = 0;
          }
          bossEnergy = Math.min(100, bossEnergy + 2);
          if (bossEnergy >= 100) {
            overrideUnlocked = true;
          }
        }
      } else {
        const classPenalty = 25;
        classHp = Math.max(0, classHp - classPenalty);
        staggerProgress = 0;

        if (!isStaggeredNow) {
          bossEnergy = Math.min(100, bossEnergy + 5);
          if (bossEnergy >= 100) {
            overrideUnlocked = true;
          }
        }
      }

      const rawUserScore = await redisPublisher.hget(lKey, studentId);
      const studentScoreData: PlayerData = rawUserScore ? JSON.parse(rawUserScore) : { id: studentId, score: 0, correctAnswers: 0, totalQuestions: 0, streak: 0 };
      studentScoreData.totalQuestions = (studentScoreData.totalQuestions || 0) + 1;
      if (isCorrect) {
        studentScoreData.score = (studentScoreData.score || 0) + 100;
        studentScoreData.correctAnswers = (studentScoreData.correctAnswers || 0) + 1;
        studentScoreData.streak = (studentScoreData.streak || 0) + 1;
      } else {
        studentScoreData.streak = 0;
      }
      studentScoreData.accuracy = Math.round(((studentScoreData.correctAnswers || 0) / studentScoreData.totalQuestions) * 100);
      await redisPublisher.hset(lKey, studentId, JSON.stringify(studentScoreData));

      const logEntry = {
        player: payload.sender || `Student ${studentId.substring(0, 4)}`,
        action: isCorrect ? 'DEALT_DAMAGE' : 'CLASS_HIT',
        value: isCorrect ? damageApplied : 25,
        timestamp: now,
      };
      await redisPublisher.rpush(damageLogKey(battleId), JSON.stringify(logEntry));
      await redisPublisher.ltrim(damageLogKey(battleId), -50, -1);

      await redisPublisher.hset(sKey, {
        bossHp: String(bossHp),
        classHp: String(classHp),
        bossEnergy: String(bossEnergy),
        overrideUnlocked: String(overrideUnlocked),
        staggerProgress: String(staggerProgress),
        staggeredUntil: String(staggeredUntil),
        questionDamageDealt: String(questionDamageDealt),
        powerupDamageDealt: String(powerupDamageDealt),
      });
      const v = await this.incrementVersion(redisPublisher, sKey);

      await redisPublisher.publish(
        channel,
        JSON.stringify({
          type: 'BOSSRAID_ANSWER_RESULT',
          battleId,
          userId: studentId,
          sender: payload.sender,
          isCorrect,
          damage: damageApplied,
          bossHp,
          classHp,
          bossEnergy,
          overrideUnlocked,
          isStaggered: now < staggeredUntil,
          staggerProgress,
          staggeredUntil,
          version: v,
        })
      );

      if (bossHp <= 0 || classHp <= 0) {
        setTimeout(() => {
          this.triggerAdvance(battleId, redisPublisher, roomCode).catch(console.error);
        }, 1500);
      }
      return;
    }

    // ──────────────────────────────────────────
    // 4. OVERRIDE & TRUE/FALSE LAUNCH
    // ──────────────────────────────────────────
    if (type === 'PROF_ACTIVATE_OVERRIDE') {
      const roomState = await redisPublisher.hgetall(sKey);
      if (!roomState || (roomState.overrideUnlocked !== 'true' && parseInt(roomState.bossEnergy || '0', 10) < 100)) {
        ws.send(JSON.stringify({ type: 'ERROR', code: 'OVERRIDE_NOT_AVAILABLE', message: 'Override is not unlocked.' }));
        return;
      }

      const now = Date.now();
      const overrideDurationMs = 20_000;
      await redisPublisher.hset(sKey, {
        overrideUnlocked: 'false',
        overrideActive: 'true',
        overrideStartedAt: String(now),
        overrideEndsAt: String(now + overrideDurationMs),
        bossEnergy: '0',
      });
      const v = await this.incrementVersion(redisPublisher, sKey);

      await redisPublisher.publish(
        channel,
        JSON.stringify({
          type: 'BOSSRAID_POWERUP_ACTIVATED',
          battleId,
          owner: 'PROFESSOR',
          powerupId: 'OVERRIDE',
          startedAt: now,
          endsAt: now + overrideDurationMs,
          version: v,
        })
      );
      return;
    }

    if (type === 'PROF_THROW_TRUE_FALSE') {
      const roomState = await redisPublisher.hgetall(sKey);
      const now = Date.now();
      const isOverrideActive = roomState.overrideActive === 'true' && now <= parseInt(roomState.overrideEndsAt || '0', 10);

      if (!isOverrideActive) {
        ws.send(JSON.stringify({ type: 'ERROR', code: 'OVERRIDE_NOT_AVAILABLE', message: 'True/False question rejected: Override protocol is inactive.' }));
        return;
      }

      const timeLimit = 30;
      const startedAt = now;
      const endsAt = now + timeLimit * 1000;

      const tfQuestion = payload.customQuestion || {
        text: payload.message || 'True or False: Override Attack Protocol',
        choices: ['True', 'False'],
        answer: 'True',
      };

      await redisPublisher.hset(sKey, {
        overrideActive: 'false',
        phase: 'OVERRIDE',
        customQuestion: JSON.stringify(tfQuestion),
        questionStartedAt: String(startedAt),
        questionEndsAt: String(endsAt),
        startedAt: String(startedAt),
        timeLimit: String(timeLimit),
      });
      const v = await this.incrementVersion(redisPublisher, sKey);

      this.clearQuestionTimer(battleId);
      this.scheduleTimeUp(battleId, timeLimit, redisPublisher, roomCode);

      await redisPublisher.publish(
        channel,
        JSON.stringify({
          type: 'BOSSRAID_OVERRIDE_QUESTION_LAUNCHED',
          battleId,
          customQuestion: tfQuestion,
          startedAt,
          endsAt,
          timeLimit,
          version: v,
        })
      );
      return;
    }

    // ──────────────────────────────────────────
    // 5. PROFESSOR POWER-UPS (TIME_SQUEEZE, EVASION, OVERRIDE)
    // ──────────────────────────────────────────
    if (type === 'PROF_USE_CARD' || type === 'USE_PROF_CARD') {
      const cardId = payload.cardId || payload.powerupId;
      const roomState = await redisPublisher.hgetall(sKey);
      const now = Date.now();

      if (cardId === 'prof-time-drain' || cardId === 'TIME_SQUEEZE') {
        let currentEndsAt = parseInt(roomState.questionEndsAt || String(now + 30_000), 10);
        currentEndsAt = Math.max(now + 3000, currentEndsAt - 6000);
        await redisPublisher.hset(sKey, 'questionEndsAt', String(currentEndsAt));
        const v = await this.incrementVersion(redisPublisher, sKey);

        this.scheduleTimeUp(battleId, Math.max(1, Math.round((currentEndsAt - now) / 1000)), redisPublisher, roomCode);

        await redisPublisher.publish(
          channel,
          JSON.stringify({
            type: 'BOSSRAID_POWERUP_RESOLVED',
            battleId,
            powerupId: 'TIME_SQUEEZE',
            questionEndsAt: currentEndsAt,
            version: v,
          })
        );
        return;
      }

      if (cardId === 'prof-evasion' || cardId === 'EVASION') {
        const duration = 15_000;
        await redisPublisher.hset(sKey, {
          activePowerup: 'EVASION',
          powerupStartedAt: String(now),
          powerupEndsAt: String(now + duration),
        });
        const v = await this.incrementVersion(redisPublisher, sKey);

        await redisPublisher.publish(
          channel,
          JSON.stringify({
            type: 'BOSSRAID_POWERUP_ACTIVATED',
            battleId,
            owner: 'PROFESSOR',
            powerupId: 'EVASION',
            startedAt: now,
            endsAt: now + duration,
            version: v,
          })
        );
        return;
      }

      if (cardId === 'prof-override' || cardId === 'OVERRIDE') {
        await redisPublisher.hset(sKey, {
          overrideUnlocked: 'true',
        });
        const v = await this.incrementVersion(redisPublisher, sKey);
        await redisPublisher.publish(
          channel,
          JSON.stringify({
            type: 'BOSSRAID_POWERUP_RESOLVED',
            battleId,
            powerupId: 'OVERRIDE_UNLOCKED',
            overrideUnlocked: true,
            version: v,
          })
        );
        return;
      }
    }

    // ──────────────────────────────────────────
    // 6. STUDENT POWER-UPS
    // ──────────────────────────────────────────
    if (type === 'USE_BOSS_POWERUP') {
      const pId = payload.powerupId;
      const roomState = await redisPublisher.hgetall(sKey);
      const now = Date.now();

      if (pId === 'heal') {
        let classHp = parseInt(roomState.classHp || String(DEFAULT_CLASS_MAX_HP), 10);
        classHp = Math.min(DEFAULT_CLASS_MAX_HP, classHp + 50);
        await redisPublisher.hset(sKey, 'classHp', String(classHp));
        const v = await this.incrementVersion(redisPublisher, sKey);

        await redisPublisher.publish(
          channel,
          JSON.stringify({
            type: 'BOSSRAID_POWERUP_RESOLVED',
            battleId,
            userId,
            powerupId: 'heal',
            classHp,
            version: v,
          })
        );
        return;
      }

      if (pId === 'time-boost') {
        let currentEndsAt = parseInt(roomState.questionEndsAt || String(now + 30_000), 10);
        currentEndsAt += 10_000;
        await redisPublisher.hset(sKey, 'questionEndsAt', String(currentEndsAt));
        const v = await this.incrementVersion(redisPublisher, sKey);

        this.scheduleTimeUp(battleId, Math.max(1, Math.round((currentEndsAt - now) / 1000)), redisPublisher, roomCode);

        await redisPublisher.publish(
          channel,
          JSON.stringify({
            type: 'BOSSRAID_POWERUP_RESOLVED',
            battleId,
            userId,
            powerupId: 'time-boost',
            questionEndsAt: currentEndsAt,
            version: v,
          })
        );
        return;
      }

      await redisPublisher.publish(
        channel,
        JSON.stringify({
          type: 'BOSSRAID_POWERUP_ACTIVATED',
          battleId,
          userId,
          powerupId: pId,
          version: parseInt(roomState.version || '1', 10),
        })
      );
      return;
    }

    // ──────────────────────────────────────────
    // 7. ADVANCE_QUESTION
    // ──────────────────────────────────────────
    if (type === 'ADVANCE_QUESTION') {
      await this.triggerAdvance(battleId, redisPublisher, roomCode);
      return;
    }

    // ──────────────────────────────────────────
    // 8. END_BATTLE / RESET_ROOM / BOSS_ACTION
    // ──────────────────────────────────────────
    if (type === 'END_BATTLE' || type === 'PROF_END_BATTLE') {
      this.clearQuestionTimer(battleId);
      const v = await this.incrementVersion(redisPublisher, sKey);
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
          mode: 'BOSSRAID',
          leaderboard,
          version: v,
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
        questionStartedAt: String(startedAt),
        questionEndsAt: String(startedAt + TIME_LIMIT_SECONDS * 1000),
        status: 'waiting',
        bossHp: String(DEFAULT_BOSS_MAX_HP),
        classHp: String(DEFAULT_CLASS_MAX_HP),
        version: '1',
      });
      await redisPublisher.del(hKey);
      await redisPublisher.del(lKey);
      await redisPublisher.del(damageLogKey(battleId));

      await redisPublisher.publish(
        channel,
        JSON.stringify({ type: 'ROOM_RESET', battleId, currentIndex: 0, startedAt, version: 1 })
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
        const v = await this.incrementVersion(redisPublisher, sKey);
        await redisPublisher.publish(
          channel,
          JSON.stringify({ ...payload, version: v })
        );
      }
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