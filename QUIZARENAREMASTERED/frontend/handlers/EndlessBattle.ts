import { WebSocket } from 'ws';
import Redis from 'ioredis';
import { finalizeAndSaveBattle, PlayerResult } from '../src/lib/student/battle/battleSync';
import roomPresenceHandler from './RoomPresence';

const COMPLETED_ROOM_TTL_SECONDS = 7 * 24 * 3600;
const ACTIVE_ROOM_TTL_SECONDS = 7 * 24 * 3600;

const INITIAL_SAFE_ZONE_SECONDS = 20;
const SHRINK_PER_STAGE = 1;
const MIN_SAFE_ZONE_SECONDS = 5;
const TOTAL_ROUND_TIME_SECONDS = 30;
const HAZARD_DAMAGE_PER_SECOND = 2;
const CHECKPOINT_INTERVAL = 5;
const INITIAL_HP = 100;
const MAX_HP = 100;

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
function playersKey(battleId: string): string {
  return `battle:${battleId}:players`;
}
function questionsKey(battleId: string): string {
  return `battle:${battleId}:questions`;
}
function eventsKey(battleId: string): string {
  return `battle:${battleId}:events`;
}
function answeredKey(battleId: string, questionIndex: number): string {
  return `battle:${battleId}:q:${questionIndex}:answered`;
}

export interface EndlessPlayer {
  id: string;
  userId?: string;
  name: string;
  initials?: string;
  avatarColor?: string;
  hp: number;
  maxHp: number;
  isAlive: boolean;
  score: number;
  combo: number;
  stage: number;
  correctAnswers?: number;
  totalQuestions?: number;
  accuracy?: number;
  powerups: string[];
  activePowerup?: string | null;
  powerupEndsAt?: number;
  lastHazardDamageAt?: number;
}

export interface PlayerData {
  id?: string;
  userId?: string;
  name?: string;
  score?: number;
  correctAnswers?: number;
  totalQuestions?: number;
  accuracy?: number;
  hp?: number;
  maxHp?: number;
  isAlive?: boolean;
  stage?: number;
  combo?: number;
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
  questionIndex?: number;
  answer?: string;
  powerupId?: string;
}

/**
 * Endless Mode ONLY.
 */
class EndlessBattleHandler {
  private redisPublisherRef: Redis | null = null;
  private questionTimers = new Map<string, NodeJS.Timeout>();
  private advancingBattles = new Set<string>();

  public initSubscriber(_redisSubscriber: Redis): void {
  }

  /** Wires this handler's completion logic into RoomPresenceHandler's grace-period timer. */
  public registerAbandonHook(): void {
    roomPresenceHandler.setAbandonHook((battleId) => this.completeAbandonedRoom(battleId));
  }

  private hazardIntervals = new Map<string, NodeJS.Timeout>();
  private zoneTimeoutTimers = new Map<string, NodeJS.Timeout>();

  private clearTimers(battleId: string): void {
    const qTimer = this.questionTimers.get(battleId);
    if (qTimer) {
      clearTimeout(qTimer);
      this.questionTimers.delete(battleId);
    }
    const zTimer = this.zoneTimeoutTimers.get(battleId);
    if (zTimer) {
      clearTimeout(zTimer);
      this.zoneTimeoutTimers.delete(battleId);
    }
    const hInterval = this.hazardIntervals.get(battleId);
    if (hInterval) {
      clearInterval(hInterval);
      this.hazardIntervals.delete(battleId);
    }
  }

  private calculateSafeZoneSeconds(stage: number): number {
    return Math.max(MIN_SAFE_ZONE_SECONDS, INITIAL_SAFE_ZONE_SECONDS - SHRINK_PER_STAGE * (stage - 1));
  }

  private async incrementVersion(redisPublisher: Redis, sKey: string): Promise<number> {
    return await redisPublisher.hincrby(sKey, 'version', 1);
  }

  private async recordEvent(redisPublisher: Redis, battleId: string, eventText: string): Promise<void> {
    const entry = JSON.stringify({
      text: eventText,
      timestamp: Date.now(),
    });
    await redisPublisher.rpush(eventsKey(battleId), entry);
    await redisPublisher.ltrim(eventsKey(battleId), -40, -1);
  }

  private async broadcastState(
    redisPublisher: Redis,
    battleId: string,
    extra: Record<string, unknown> = {}
  ): Promise<void> {
    const sKey = stateKey(battleId);
    const lKey = leaderboardKey(battleId);
    const pKey = playersKey(battleId);
    const [roomState, rawScores, rawPlayers, rawQuestions, rawEvents] = await Promise.all([
      redisPublisher.hgetall(sKey),
      redisPublisher.hgetall(lKey),
      redisPublisher.hgetall(pKey),
      redisPublisher.get(questionsKey(battleId)),
      redisPublisher.lrange(eventsKey(battleId), -20, -1),
    ]);

    const leaderboard = Object.values(rawScores || {}).map((item) => JSON.parse(item));
    const players = Object.values(rawPlayers || {}).map((item) => JSON.parse(item));
    const questions = rawQuestions ? JSON.parse(rawQuestions) : [];
    const events = (rawEvents || []).map((item) => JSON.parse(item));

    const currentIndex = parseInt(roomState.currentIndex || '0', 10);
    const stage = parseInt(roomState.stage || '1', 10);
    const questionStartedAt = parseInt(roomState.questionStartedAt || String(Date.now()), 10);
    const safeZoneEndsAt = parseInt(roomState.safeZoneEndsAt || String(questionStartedAt + 20_000), 10);
    const questionEndsAt = parseInt(roomState.questionEndsAt || String(questionStartedAt + 30_000), 10);

    const now = Date.now();
    const zone = now < safeZoneEndsAt ? 'SAFE' : 'HAZARD';

    const syncPayload = {
      type: 'ENDLESS_STATE_SYNC',
      battleId,
      mode: 'ENDLESS',
      status: roomState.status || 'waiting',
      stage,
      currentIndex,
      version: parseInt(roomState.version || '1', 10),
      serverTime: now,
      questionStartedAt,
      safeZoneEndsAt,
      questionEndsAt,
      timeLimit: parseInt(roomState.timeLimit || String(TOTAL_ROUND_TIME_SECONDS), 10),
      safeZoneDuration: parseInt(roomState.safeZoneDuration || '20', 10),
      hazardDamagePerSecond: HAZARD_DAMAGE_PER_SECOND,
      zone,
      currentQuestion: questions[currentIndex] || null,
      totalQuestions: questions.length,
      players,
      leaderboard,
      events,
      ...extra,
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
      this.clearTimers(battleId);

      const sKey = stateKey(battleId);
      const [rawQuestions, roomState] = await Promise.all([
        redisPublisher.get(questionsKey(battleId)),
        redisPublisher.hgetall(sKey),
      ]);
      const questions = rawQuestions ? JSON.parse(rawQuestions) : [];
      const currentIndex = parseInt(roomState.currentIndex || '0', 10);
      const currentStage = parseInt(roomState.stage || '1', 10);

      // Check checkpoint eligibility: at every 5 stages
      if (currentStage % CHECKPOINT_INTERVAL === 0 && roomState.status !== 'checkpoint') {
        await redisPublisher.hset(sKey, { status: 'checkpoint' });
        const v = await this.incrementVersion(redisPublisher, sKey);
        await this.recordEvent(redisPublisher, battleId, `🏆 Checkpoint reached at Stage ${currentStage}! Choose your reward.`);

        await redisPublisher.publish(
          roomChannel(battleId),
          JSON.stringify({
            type: 'ENDLESS_CHECKPOINT_REACHED',
            battleId,
            stage: currentStage,
            availablePowerups: ['shield', 'double', 'freeze', 'heal'],
            version: v,
          })
        );
        return;
      }

      const nextIndex = currentIndex + 1;
      const nextStage = currentStage + 1;

      // Wrap questions or complete if empty
      const effectiveIndex = questions.length > 0 ? nextIndex % questions.length : 0;

      await this.startQuestion(battleId, effectiveIndex, nextStage, redisPublisher, roomCode);
    } finally {
      this.advancingBattles.delete(battleId);
    }
  }

  private async startQuestion(
    battleId: string,
    questionIndex: number,
    stage: number,
    redisPublisher: Redis,
    roomCode?: string
  ): Promise<void> {
    this.clearTimers(battleId);
    const sKey = stateKey(battleId);
    const channel = roomChannel(battleId);

    const safeDurationSeconds = this.calculateSafeZoneSeconds(stage);
    const now = Date.now();
    const safeZoneEndsAt = now + safeDurationSeconds * 1000;
    const questionEndsAt = now + TOTAL_ROUND_TIME_SECONDS * 1000;

    await redisPublisher.hset(sKey, {
      currentIndex: String(questionIndex),
      stage: String(stage),
      status: 'active',
      questionStartedAt: String(now),
      safeZoneEndsAt: String(safeZoneEndsAt),
      questionEndsAt: String(questionEndsAt),
      timeLimit: String(TOTAL_ROUND_TIME_SECONDS),
      safeZoneDuration: String(safeDurationSeconds),
    });
    const v = await this.incrementVersion(redisPublisher, sKey);
    await redisPublisher.expire(sKey, ACTIVE_ROOM_TTL_SECONDS);

    const rawQuestions = await redisPublisher.get(questionsKey(battleId));
    const questions = rawQuestions ? JSON.parse(rawQuestions) : [];
    const currentQuestion = questions[questionIndex] || null;

    await redisPublisher.publish(
      channel,
      JSON.stringify({
        type: 'QUESTION_ADVANCED',
        battleId,
        mode: 'ENDLESS',
        stage,
        currentIndex: questionIndex,
        questionStartedAt: now,
        safeZoneEndsAt,
        questionEndsAt,
        timeLimit: TOTAL_ROUND_TIME_SECONDS,
        safeZoneDuration: safeDurationSeconds,
        currentQuestion,
        version: v,
      })
    );

    // 1. Schedule Zone Transition to HAZARD
    const zoneTimer = setTimeout(async () => {
      const currentRS = await redisPublisher.hgetall(sKey);
      if (currentRS.status !== 'active' || parseInt(currentRS.stage || '1', 10) !== stage) return;

      await this.recordEvent(redisPublisher, battleId, `⚡ Stage ${stage} entered Hazard Zone / Storm!`);
      const vTrans = await this.incrementVersion(redisPublisher, sKey);

      await redisPublisher.publish(
        channel,
        JSON.stringify({
          type: 'ENDLESS_ZONE_TRANSITION',
          battleId,
          stage,
          zone: 'HAZARD',
          message: 'The Storm has arrived! Answering in the Hazard Zone deals damage over time.',
          version: vTrans,
        })
      );

      // Start periodic hazard ticks every 1 second
      const hInterval = setInterval(async () => {
        const stateNow = await redisPublisher.hgetall(sKey);
        if (stateNow.status !== 'active' || parseInt(stateNow.stage || '1', 10) !== stage) {
          clearInterval(hInterval);
          return;
        }

        const qAnsKey = answeredKey(battleId, questionIndex);
        const [answeredUsers, rawPlayers] = await Promise.all([
          redisPublisher.smembers(qAnsKey),
          redisPublisher.hgetall(playersKey(battleId)),
        ]);
        const answeredSet = new Set(answeredUsers);

        let anyDamageApplied = false;
        const updatedPlayers: EndlessPlayer[] = [];

        for (const [pId, pJson] of Object.entries(rawPlayers || {})) {
          const p: EndlessPlayer = JSON.parse(pJson);
          if (p.isAlive && !answeredSet.has(pId)) {
            // Apply storm damage
            p.hp = Math.max(0, p.hp - HAZARD_DAMAGE_PER_SECOND);
            anyDamageApplied = true;
            if (p.hp <= 0) {
              p.isAlive = false;
              await this.recordEvent(redisPublisher, battleId, `💀 ${p.name} was eliminated by the Storm on Stage ${stage}!`);
              await redisPublisher.publish(
                channel,
                JSON.stringify({
                  type: 'ENDLESS_PLAYER_ELIMINATED',
                  battleId,
                  userId: p.id,
                  name: p.name,
                  stage,
                  reason: 'STORM_DAMAGE',
                })
              );
            }
            await redisPublisher.hset(playersKey(battleId), pId, JSON.stringify(p));
            updatedPlayers.push(p);
          }
        }

        if (anyDamageApplied) {
          await redisPublisher.publish(
            channel,
            JSON.stringify({
              type: 'ENDLESS_HAZARD_TICK',
              battleId,
              stage,
              updatedPlayers,
            })
          );
        }
      }, 1000);
      this.hazardIntervals.set(battleId, hInterval);
    }, safeDurationSeconds * 1000);
    this.zoneTimeoutTimers.set(battleId, zoneTimer);

    // 2. Schedule Round Timeout
    const roundTimer = setTimeout(async () => {
      this.clearTimers(battleId);
      const currentRS = await redisPublisher.hgetall(sKey);
      if (currentRS.status !== 'active' || parseInt(currentRS.stage || '1', 10) !== stage) return;

      const qAnsKey = answeredKey(battleId, questionIndex);
      const [answeredUsers, rawPlayers] = await Promise.all([
        redisPublisher.smembers(qAnsKey),
        redisPublisher.hgetall(playersKey(battleId)),
      ]);
      const answeredSet = new Set(answeredUsers);

      for (const [pId, pJson] of Object.entries(rawPlayers || {})) {
        const p: EndlessPlayer = JSON.parse(pJson);
        if (p.isAlive && !answeredSet.has(pId)) {
          p.hp = Math.max(0, p.hp - 20); // timeout penalty
          if (p.hp <= 0) {
            p.isAlive = false;
            await this.recordEvent(redisPublisher, battleId, `💀 ${p.name} timed out and was eliminated!`);
            await redisPublisher.publish(
              channel,
              JSON.stringify({
                type: 'ENDLESS_PLAYER_ELIMINATED',
                battleId,
                userId: p.id,
                name: p.name,
                stage,
                reason: 'TIMEOUT',
              })
            );
          }
          await redisPublisher.hset(playersKey(battleId), pId, JSON.stringify(p));
        }
      }

      await redisPublisher.publish(
        channel,
        JSON.stringify({
          type: 'ENDLESS_ROUND_TIMEOUT',
          battleId,
          stage,
          message: "Time's up for this stage!",
        })
      );

      // Auto advance
      setTimeout(() => {
        this.triggerAdvance(battleId, redisPublisher, roomCode).catch(console.error);
      }, 2000);
    }, TOTAL_ROUND_TIME_SECONDS * 1000);
    this.questionTimers.set(battleId, roundTimer);
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

      console.log(`[EndlessBattle] Saved battle ${battleId} results to Supabase (${players.length} players)`);
    } catch (err) {
      console.error(`[EndlessBattle] Failed to sync battle ${battleId} to Supabase:`, err);
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
      playerData,
      userId,
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
    const pKey = playersKey(battleId);

    // ──────────────────────────────────────────
    // 1. JOIN_BATTLE: Authoritative State Reconnect
    // ──────────────────────────────────────────
    if (type === 'JOIN_BATTLE') {
      const [roomState, rawScores, rawPlayers, rawQuestions, rawEvents] = await Promise.all([
        redisPublisher.hgetall(sKey),
        redisPublisher.hgetall(lKey),
        redisPublisher.hgetall(pKey),
        redisPublisher.get(questionsKey(battleId)),
        redisPublisher.lrange(eventsKey(battleId), -20, -1),
      ]);

      const studentId = userId || payload.sender || ws.toString();

      // Ensure player entry exists in Redis
      let player: EndlessPlayer | null = null;
      if (rawPlayers && rawPlayers[studentId]) {
        player = JSON.parse(rawPlayers[studentId]);
      } else {
        player = {
          id: studentId,
          userId: studentId,
          name: payload.sender || `Student ${studentId.substring(0, 4)}`,
          initials: (payload.sender || 'ST').substring(0, 2).toUpperCase(),
          hp: INITIAL_HP,
          maxHp: MAX_HP,
          isAlive: true,
          score: 0,
          combo: 0,
          stage: parseInt(roomState.stage || '1', 10),
          correctAnswers: 0,
          totalQuestions: 0,
          accuracy: 0,
          powerups: [],
        };
        await redisPublisher.hset(pKey, studentId, JSON.stringify(player));
      }

      const leaderboard = Object.values(rawScores || {}).map((item) => JSON.parse(item));
      const playersList = Object.values(rawPlayers || {}).map((item) => JSON.parse(item));
      const questions = rawQuestions ? JSON.parse(rawQuestions) : [];
      const events = (rawEvents || []).map((item) => JSON.parse(item));

      const currentIndex = parseInt(roomState.currentIndex || '0', 10);
      const stage = parseInt(roomState.stage || '1', 10);
      const questionStartedAt = parseInt(roomState.questionStartedAt || String(Date.now()), 10);
      const safeZoneEndsAt = parseInt(roomState.safeZoneEndsAt || String(questionStartedAt + 20_000), 10);
      const questionEndsAt = parseInt(roomState.questionEndsAt || String(questionStartedAt + 30_000), 10);
      const now = Date.now();
      const zone = now < safeZoneEndsAt ? 'SAFE' : 'HAZARD';

      ws.send(
        JSON.stringify({
          type: 'ENDLESS_STATE_SYNC',
          battleId,
          mode: 'ENDLESS',
          currentIndex,
          stage,
          questionStartedAt,
          safeZoneEndsAt,
          questionEndsAt,
          timeLimit: parseInt(roomState.timeLimit || String(TOTAL_ROUND_TIME_SECONDS), 10),
          safeZoneDuration: parseInt(roomState.safeZoneDuration || '20', 10),
          hazardDamagePerSecond: HAZARD_DAMAGE_PER_SECOND,
          zone,
          status: roomState.status || 'waiting',
          player,
          players: playersList,
          leaderboard,
          questions,
          currentQuestion: questions[currentIndex] || null,
          events,
          version: parseInt(roomState.version || '1', 10),
          serverTime: now,
        })
      );

      console.log(`[EndlessBattle] Sent ENDLESS_STATE_SYNC for ${battleId} to user ${studentId}`);
      return;
    }

    // ──────────────────────────────────────────
    // 2. PROF_START_BATTLE: Init Endless Mode
    // ──────────────────────────────────────────
    if (type === 'PROF_START_BATTLE') {
      roomPresenceHandler.setBattleMode(battleId, 'ENDLESS');
      const startedAt = Date.now();
      const initialIndex = 0;
      const initialStage = 1;
      const safeSec = this.calculateSafeZoneSeconds(initialStage);
      const safeZoneEndsAt = startedAt + safeSec * 1000;
      const questionEndsAt = startedAt + TOTAL_ROUND_TIME_SECONDS * 1000;

      if (payload.questions && Array.isArray(payload.questions)) {
        await redisPublisher.set(questionsKey(battleId), JSON.stringify(payload.questions));
      }

      const initialRoomState: Record<string, string> = {
        currentIndex: String(initialIndex),
        stage: String(initialStage),
        status: 'active',
        startedAt: String(startedAt),
        questionStartedAt: String(startedAt),
        safeZoneEndsAt: String(safeZoneEndsAt),
        questionEndsAt: String(questionEndsAt),
        timeLimit: String(TOTAL_ROUND_TIME_SECONDS),
        safeZoneDuration: String(safeSec),
        roomCode: roomCode || '',
        mode: 'ENDLESS',
        version: '1',
      };

      await redisPublisher.hset(sKey, initialRoomState);
      await redisPublisher.expire(sKey, ACTIVE_ROOM_TTL_SECONDS);

      if (payload.forceReset) {
        await redisPublisher.del(hKey);
        await redisPublisher.del(lKey);
        await redisPublisher.del(pKey);
        await redisPublisher.del(eventsKey(battleId));
      }

      await this.recordEvent(redisPublisher, battleId, `🚀 Endless Battle commenced! Safe zone is ${safeSec}s.`);

      const rawQuestions = await redisPublisher.get(questionsKey(battleId));
      const parsedQuestions = rawQuestions ? JSON.parse(rawQuestions) : [];

      await redisPublisher.publish(
        channel,
        JSON.stringify({
          type: 'PROF_START_BATTLE',
          battleId,
          mode: 'ENDLESS',
          stage: initialStage,
          currentIndex: initialIndex,
          questionStartedAt: startedAt,
          safeZoneEndsAt,
          questionEndsAt,
          timeLimit: TOTAL_ROUND_TIME_SECONDS,
          safeZoneDuration: safeSec,
          questions: parsedQuestions,
          currentQuestion: parsedQuestions[initialIndex] || null,
          version: 1,
        })
      );

      console.log(`[EndlessBattle] Started ${battleId} at Stage 1`);
      await this.startQuestion(battleId, initialIndex, initialStage, redisPublisher, roomCode);
      return;
    }

    // ──────────────────────────────────────────
    // 3. SUBMIT_ENDLESS_ANSWER: Server Authoritative
    // ──────────────────────────────────────────
    if (type === 'SUBMIT_ENDLESS_ANSWER' || type === 'SUBMIT_ANSWER') {
      const studentId = userId || payload.sender || ws.toString();
      const questionIndex = payload.questionIndex ?? payload.currentIndex;
      const answer = payload.answer;

      if (questionIndex === undefined || answer === undefined) return;

      const roomState = await redisPublisher.hgetall(sKey);
      if (!roomState || roomState.status !== 'active') return;

      const currentQIdx = parseInt(roomState.currentIndex || '0', 10);
      const stage = parseInt(roomState.stage || '1', 10);

      // Verify student is alive
      const rawPlayerData = await redisPublisher.hget(pKey, studentId);
      if (!rawPlayerData) return;
      const player: EndlessPlayer = JSON.parse(rawPlayerData);
      if (!player.isAlive) {
        ws.send(JSON.stringify({ type: 'ERROR', code: 'PLAYER_ELIMINATED', message: 'You have been eliminated from Endless Battle.' }));
        return;
      }

      // Idempotency: ensure student only answers once per question
      const qAnsKey = answeredKey(battleId, currentQIdx);
      const added = await redisPublisher.sadd(qAnsKey, studentId);
      if (added === 0) {
        console.log(`[Endless] Duplicate answer ignored for user ${studentId} on question ${currentQIdx}`);
        return;
      }
      await redisPublisher.expire(qAnsKey, ACTIVE_ROOM_TTL_SECONDS);

      const now = Date.now();
      const safeZoneEndsAt = parseInt(roomState.safeZoneEndsAt || '0', 10);
      const isSafe = now < safeZoneEndsAt;

      // Validate answer
      const rawQuestions = await redisPublisher.get(questionsKey(battleId));
      const questions = rawQuestions ? JSON.parse(rawQuestions) : [];
      const activeQ = questions[currentQIdx];
      const correctChoice = activeQ?.answer || activeQ?.choices?.[0] || activeQ?.options?.[0] || '';

      const isCorrect = String(answer).trim().toLowerCase() === String(correctChoice).trim().toLowerCase();

      player.totalQuestions = (player.totalQuestions || 0) + 1;

      if (isCorrect) {
        player.correctAnswers = (player.correctAnswers || 0) + 1;
        player.combo = (player.combo || 0) + 1;
        const multiplier = player.combo >= 6 ? 8 : player.combo >= 4 ? 4 : player.combo >= 2 ? 2 : 1;
        player.score = (player.score || 0) + 100 * multiplier;
      } else {
        player.combo = 0;
        player.hp = Math.max(0, player.hp - 20); // 20 HP mistake penalty
        if (player.hp <= 0) {
          player.isAlive = false;
          await this.recordEvent(redisPublisher, battleId, `💀 ${player.name} answered incorrectly and was eliminated on Stage ${stage}!`);
          await redisPublisher.publish(
            channel,
            JSON.stringify({
              type: 'ENDLESS_PLAYER_ELIMINATED',
              battleId,
              userId: studentId,
              name: player.name,
              stage,
              reason: 'WRONG_ANSWER',
            })
          );
        }
      }

      player.stage = stage;
      player.accuracy = Math.round(((player.correctAnswers || 0) / player.totalQuestions) * 100);

      // Save player state in Redis
      await redisPublisher.hset(pKey, studentId, JSON.stringify(player));

      // Update leaderboard
      await redisPublisher.hset(lKey, studentId, JSON.stringify({
        id: studentId,
        userId: studentId,
        name: player.name,
        score: player.score,
        correctAnswers: player.correctAnswers,
        totalQuestions: player.totalQuestions,
        accuracy: player.accuracy,
        maxStage: stage,
        hp: player.hp,
        isAlive: player.isAlive,
        isActive: player.isAlive,
      }));

      // Broadcast answer result
      await redisPublisher.publish(
        channel,
        JSON.stringify({
          type: 'ENDLESS_ANSWER_RESULT',
          battleId,
          userId: studentId,
          isCorrect,
          score: player.score,
          combo: player.combo,
          hp: player.hp,
          isAlive: player.isAlive,
          isSafe,
          stage,
        })
      );

      // Check if all alive players have answered
      const [answeredList, allPlayers] = await Promise.all([
        redisPublisher.smembers(qAnsKey),
        redisPublisher.hgetall(pKey),
      ]);
      const answeredCount = answeredList.length;
      const alivePlayers = Object.values(allPlayers || {}).map((item) => JSON.parse(item) as EndlessPlayer).filter((p) => p.isAlive);

      if (alivePlayers.length === 0) {
        // All dead -> complete match
        await redisPublisher.hset(sKey, { status: 'completed' });
        await redisPublisher.publish(
          channel,
          JSON.stringify({
            type: 'ROOM_COMPLETED',
            battleId,
            mode: 'ENDLESS',
            message: 'All players have succumbed to the endless hazard.',
          })
        );
        return;
      }

      if (answeredCount >= alivePlayers.length) {
        // All alive answered -> advance to next stage quickly
        setTimeout(() => {
          this.triggerAdvance(battleId, redisPublisher, roomCode).catch(console.error);
        }, 1200);
      }
      return;
    }

    // ──────────────────────────────────────────
    // 4. CHECKPOINTS: SUBMIT_CHECKPOINT_SELECTION
    // ──────────────────────────────────────────
    if (type === 'SUBMIT_CHECKPOINT_SELECTION') {
      const studentId = userId || payload.sender || ws.toString();
      const powerup = payload.powerupId || 'shield';

      const rawP = await redisPublisher.hget(pKey, studentId);
      if (rawP) {
        const player: EndlessPlayer = JSON.parse(rawP);
        player.hp = Math.min(MAX_HP, player.hp + 25); // Checkpoint heals 25 HP
        player.powerups = player.powerups || [];
        player.powerups.push(powerup);
        await redisPublisher.hset(pKey, studentId, JSON.stringify(player));
      }

      await this.recordEvent(redisPublisher, battleId, `🎁 Student acquired powerup '${powerup}' and healed 25 HP!`);

      await redisPublisher.publish(
        channel,
        JSON.stringify({
          type: 'ENDLESS_CHECKPOINT_RESOLVED',
          battleId,
          userId: studentId,
          powerup,
        })
      );

      // Advance to next stage after checkpoint
      setTimeout(() => {
        this.triggerAdvance(battleId, redisPublisher, roomCode).catch(console.error);
      }, 1500);
      return;
    }

    // ──────────────────────────────────────────
    // 5. ADVANCE_QUESTION
    // ──────────────────────────────────────────
    if (type === 'ADVANCE_QUESTION') {
      await this.triggerAdvance(battleId, redisPublisher, roomCode);
      return;
    }

    // ──────────────────────────────────────────
    // 6. END_BATTLE / RESET_ROOM
    // ──────────────────────────────────────────
    if (type === 'END_BATTLE' || type === 'PROF_END_BATTLE') {
      this.clearTimers(battleId);
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
          mode: 'ENDLESS',
          leaderboard,
          message: 'The Endless session has finished and results are saved.',
        })
      );
      return;
    }

    if (type === 'RESET_ROOM') {
      this.clearTimers(battleId);
      const startedAt = Date.now();
      await redisPublisher.hset(sKey, {
        currentIndex: '0',
        stage: '1',
        startedAt: String(startedAt),
        status: 'waiting',
      });
      await redisPublisher.del(hKey);
      await redisPublisher.del(lKey);
      await redisPublisher.del(pKey);
      await redisPublisher.del(eventsKey(battleId));

      await redisPublisher.publish(
        channel,
        JSON.stringify({ type: 'ROOM_RESET', battleId, currentIndex: 0, stage: 1, startedAt })
      );
      return;
    }
  }

  private async completeAbandonedRoom(battleId: string): Promise<void> {
    this.clearTimers(battleId);
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
