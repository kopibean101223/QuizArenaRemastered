import { WebSocket } from 'ws';
import Redis from 'ioredis';
import { finalizeAndSaveBattle, PlayerResult } from '../src/lib/student/battle/battleSync';

const MAX_HISTORY_LIMIT = 100;
const COMPLETED_ROOM_TTL_SECONDS = 3600; // Retain room state for 1 hour so results linger
// FIX (2.3): waiting/active room state previously had NO expiry at all, so an
// abandoned lobby sat in Redis forever. Give it a generous TTL, refreshed on
// activity, so it self-cleans if nothing else catches it.
const ACTIVE_ROOM_TTL_SECONDS = 4 * 60 * 60; // 4 hours
// FIX (2.2): grace period before a host disconnect is treated as "gone for
// good" — covers brief refreshes/network drops instead of instantly killing
// the room the moment the professor's socket blips.
const HOST_DISCONNECT_GRACE_MS = 20_000;

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
  userId?: string;
  cardId?: string;
  targetId?: string;
  questionIndex?: number;
  mode?: string; // ADDED: required for mode validation
  distributionMode?: 'adaptive' | 'uniform';
  adaptive?: boolean;
  // FIX (2.2): lets a client identify itself as the professor/host on join.
  role?: 'host' | 'student';
  // ADAPTIVE: additional fields for adaptive algorithm
  currentIndex?: number;
  studentId?: string;
  docId?: string;
}

class LiveBattleHandler {
  private activeRooms: Map<string, Set<WebSocket>>;
  private clientRoomMap: Map<WebSocket, string>;
  // FIX (2.2): tracks which socket(s) in a room are the host, and any pending
  // "host disconnected, waiting to see if they reconnect" timers.
  private hostSockets: Map<string, Set<WebSocket>>;
  private hostDisconnectTimers: Map<string, NodeJS.Timeout>;
  // FIX (2.2): the grace-period timer in handleLeave() fires later, outside
  // of any handleMessage() call, so it needs its own reference to Redis.
  private redisPublisherRef: Redis | null = null;
  private questionTimers: Map<string, NodeJS.Timeout>;
  private advancingBattles: Set<string>;

  constructor() {
    this.activeRooms = new Map<string, Set<WebSocket>>();
    this.clientRoomMap = new Map<WebSocket, string>();
    this.hostSockets = new Map<string, Set<WebSocket>>();
    this.hostDisconnectTimers = new Map<string, NodeJS.Timeout>();
    this.questionTimers = new Map<string, NodeJS.Timeout>();
    this.advancingBattles = new Set<string>();
  }

  public initSubscriber(redisSubscriber: Redis): void {
    redisSubscriber.on('message', (channel: string, message: string) => {
      const battleId = channel.replace('battle:', '');
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

  private clearQuestionTimer(battleId: string): void {
    const existing = this.questionTimers.get(battleId);
    if (existing) {
      clearTimeout(existing);
      this.questionTimers.delete(battleId);
      console.log(`[LIVE][TIMER] cleared existing timer for ${battleId}`);
    }
  }

  private scheduleQuestionTimeout(
    battleId: string,
    delayMs: number,
    redisPublisher: Redis,
    roomCode?: string
  ): void {
    this.clearQuestionTimer(battleId);
    console.log(`[LIVE][TIMER] scheduling auto-advance for ${battleId} in ${delayMs}ms`);
    const handle = setTimeout(() => {
      console.log(`[LIVE][TIMER] timer FIRED for ${battleId}`);
      this.triggerAdvance(battleId, redisPublisher, roomCode).catch((err) =>
        console.error(`[LIVE][TIMER] advanceOrEnd failed for ${battleId}:`, err)
      );
    }, delayMs);
    this.questionTimers.set(battleId, handle);
  }

  private async triggerAdvance(
    battleId: string,
    redisPublisher: Redis,
    roomCode: string | undefined
  ): Promise<void> {
    if (this.advancingBattles.has(battleId)) return;
    this.advancingBattles.add(battleId);
    try {
      await this.advanceOrEnd(battleId, redisPublisher, roomCode);
    } finally {
      this.advancingBattles.delete(battleId);
    }
  }

  private async advanceOrEnd(
    battleId: string,
    redisPublisher: Redis,
    roomCode: string | undefined
  ): Promise<void> {
    console.log(`[LIVE][ADVANCE] triggered for ${battleId}`);
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
    const distributionMode = roomState.distributionMode || 'uniform';

    console.log(`[LIVE][ADVANCE] ${battleId} currentIndex=${currentIndex} nextIndex=${nextIndex}`);

    if (nextIndex >= questions.length && distributionMode === 'uniform') {
      await redisPublisher.hset(sKey, { status: 'completed' });
      await redisPublisher.expire(sKey, COMPLETED_ROOM_TTL_SECONDS);
      await redisPublisher.expire(hKey, COMPLETED_ROOM_TTL_SECONDS);

      await this.syncBattleToSupabase(redisPublisher, battleId, roomCode);

      const rawScores = await redisPublisher.hgetall(lKey);
      const leaderboard = Object.values(rawScores || {}).map((item) => JSON.parse(item));

      console.log(`[LIVE][END] ${battleId} out of questions -> ROOM_COMPLETED`);
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

    const startedAt = Date.now();
    const timeLimit = 60; // Enforce 60s

    await redisPublisher.hset(sKey, {
      currentIndex: String(nextIndex),
      startedAt: String(startedAt),
      timeLimit: String(timeLimit),
      distributionMode,
    });
    await redisPublisher.expire(sKey, ACTIVE_ROOM_TTL_SECONDS);

    await redisPublisher.publish(
      channel,
      JSON.stringify({
        type: 'QUESTION_ADVANCED',
        battleId,
        distributionMode,
        adaptive: distributionMode === 'adaptive',
        currentIndex: nextIndex,
        startedAt,
        timeLimit,
        isLastQuestion: nextIndex === questions.length - 1,
        questions: distributionMode === 'uniform' ? questions : [],
      })
    );

    this.scheduleQuestionTimeout(battleId, timeLimit * 1000, redisPublisher, roomCode);
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

    // NEW VALIDATION: Drop any packets not intended for LIVE mode
    if (payload.mode && payload.mode !== 'LIVE' && payload.mode !== 'INDIVIDUAL') {
      console.warn(`[LiveBattle] Ignoring payload for mode: ${payload.mode}`);
      return;
    }

    // FIX (2.2): keep a live reference so handleLeave()'s grace-period timer
    // can talk to Redis after this call has already returned.
    this.redisPublisherRef = redisPublisher;

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

      // FIX (2.2): remember host sockets so handleLeave() can tell a professor
      // disconnecting apart from a student disconnecting. Reconnecting also
      // cancels any pending "host is gone" grace-period timer for this room.
      if (payload.role === 'host') {
        if (!this.hostSockets.has(battleId)) this.hostSockets.set(battleId, new Set<WebSocket>());
        this.hostSockets.get(battleId)!.add(ws);

        const pendingTimer = this.hostDisconnectTimers.get(battleId);
        if (pendingTimer) {
          clearTimeout(pendingTimer);
          this.hostDisconnectTimers.delete(battleId);
          console.log(`Host reconnected to Battle Room ${battleId} — cancelled scheduled auto-completion.`);
        }
      }

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
        await redisPublisher.del(hKey);
      }
      // FIX (2.3): give the room state a TTL while it's waiting/active too,
      // refreshed on every join, so an abandoned lobby eventually expires
      // instead of sitting in Redis forever.
      await redisPublisher.expire(sKey, ACTIVE_ROOM_TTL_SECONDS);

      const history = await redisPublisher.lrange(hKey, 0, -1);
      const rawScores = await redisPublisher.hgetall(lKey);

      const leaderboard = Object.values(rawScores || {}).map((item) => JSON.parse(item));
      const questionsStr = await redisPublisher.get(`battle:${battleId}:questions`);

      ws.send(
        JSON.stringify({
          type: 'ROOM_STATE_SYNC',
          battleId,
          currentIndex: parseInt(roomState.currentIndex, 10),
          startedAt: parseInt(roomState.startedAt, 10),
          timeLimit: parseInt(roomState.timeLimit || '60', 10),
          status: roomState.status || 'waiting',
          distributionMode: roomState.distributionMode || 'uniform',
          adaptive: roomState.distributionMode === 'adaptive',
          history: history.map((item) => JSON.parse(item)),
          leaderboard,
          questions: JSON.parse(questionsStr || '[]'),
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
      const timeLimit = 60; // Enforce 60s per question

      const distributionMode = payload.distributionMode || (payload.adaptive ? 'adaptive' : 'uniform');

      await redisPublisher.hset(sKey, {
        currentIndex: '0',
        status: 'active',
        startedAt: String(startedAt),
        timeLimit: String(timeLimit),
        roomCode: roomCode || '',
        distributionMode,
      });
      // FIX (2.3): refresh the TTL on activity so an active room doesn't expire mid-battle.
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
          mode: 'LIVE',
          distributionMode: payload.distributionMode || 'uniform',
          adaptive: payload.adaptive ?? (payload.distributionMode === 'adaptive'),
          currentIndex: 0,
          startedAt,
          timeLimit: 60,
          questions: parsedQuestions,
        })
      );

      this.scheduleQuestionTimeout(battleId, timeLimit * 1000, redisPublisher, roomCode);
      console.log(`Professor started Battle Room ${battleId} with ${parsedQuestions.length} synchronized questions.`);
      return;
    }

    // ── ACTION B: PROFESSOR ADVANCES QUESTION (synchronous for all students) ──
    if (type === 'ADVANCE_QUESTION') {
      console.log(`[LIVE][server] manual ADVANCE_QUESTION received for ${battleId}`);
      if (payload.isLastQuestion) {
        this.clearQuestionTimer(battleId);
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
      } else {
        await this.triggerAdvance(battleId, redisPublisher, roomCode);
      }
      return;
    }

    // ── ACTION B2: REQUEST NEXT ADAPTIVE QUESTION (per-student) ──
    if (type === 'REQUEST_NEXT_ADAPTIVE_QUESTION') {
      const { studentId } = payload as any;
      console.log(`[LiveBattle] REQUEST_NEXT_ADAPTIVE_QUESTION`, { battleId, studentId });

      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/adaptive/next-question`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, battleId, docId: payload.docId }),
      });
      const data = await res.json();

      console.log(`[LiveBattle] adaptive selection result`, {
        studentId,
        mode: data.mode,
        selectedQuestionId: data.selected?.questionId,
      });

      ws.send(JSON.stringify({
        type: 'ADAPTIVE_QUESTION_SERVED',
        battleId,
        question: data.selected,
        mode: data.mode,
      }));
      return;
    }

    // ── ACTION C: PROFESSOR MANUALLY ENDS BATTLE ──
    if (type === 'END_BATTLE' || type === 'PROF_END_BATTLE') {
      this.clearQuestionTimer(battleId);
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
        this.clearQuestionTimer(battleId);
        const channel = roomChannel(battleId);

        redisSubscriber.unsubscribe(channel, (err) => {
          if (err) console.error(`Failed to unsubscribe from ${channel}`, err);
          else console.log(`Unsubscribed from empty channel: ${channel}`);
        });
      }
    }

    // FIX (2.2): if the socket that just left was the host, don't treat it
    // like an ordinary student disconnect (which the old code did — nothing
    // about the room changed). Start a short grace period in case it's just a
    // refresh/network blip; if the host hasn't reconnected by the time it
    // fires, mark the room completed the same way END_BATTLE does.
    const hostsInRoom = this.hostSockets.get(battleId);
    if (hostsInRoom?.has(ws)) {
      hostsInRoom.delete(ws);

      if (hostsInRoom.size === 0 && !this.hostDisconnectTimers.has(battleId)) {
        const timer = setTimeout(() => {
          this.hostDisconnectTimers.delete(battleId);
          this.completeAbandonedRoom(battleId).catch((err) =>
            console.error(`[LiveBattle] Failed to auto-complete abandoned room ${battleId}:`, err)
          );
        }, HOST_DISCONNECT_GRACE_MS);
        this.hostDisconnectTimers.set(battleId, timer);
        console.log(`Host left Battle Room ${battleId}. Auto-completing in ${HOST_DISCONNECT_GRACE_MS / 1000}s unless they reconnect.`);
      }
    }

    this.clientRoomMap.delete(ws);
    console.log(`Client left Battle Room ${battleId}`);
  }

  /**
   * FIX (2.1 + 2.2): best-effort close-out for a room the host walked away
   * from (closed the tab, navigated off Matchmaking without clicking "End
   * Session") instead of leaving it stuck in "waiting"/"active" forever.
   * Needs its own Redis connection references, so callers pass them in via
   * the same redisPublisher/redisSubscriber the rest of the handler uses —
   * see the note in server.ts wiring below.
   */
  private async completeAbandonedRoom(battleId: string): Promise<void> {
    this.clearQuestionTimer(battleId);
    if (!this.redisPublisherRef) return;
    const redisPublisher = this.redisPublisherRef;

    const sKey = stateKey(battleId);
    const hKey = historyKey(battleId);
    const lKey = leaderboardKey(battleId);
    const channel = roomChannel(battleId);

    const roomState = await redisPublisher.hgetall(sKey);
    if (!roomState || roomState.status === 'completed') return; // already handled

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

export default new LiveBattleHandler();