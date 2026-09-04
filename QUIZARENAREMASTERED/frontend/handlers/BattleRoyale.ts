import { WebSocket } from 'ws';
import Redis from 'ioredis';
import { finalizeAndSaveBattle, PlayerResult } from '../src/lib/student/battle/battleSync';
import roomPresenceHandler from './RoomPresence';


const COMPLETED_ROOM_TTL_SECONDS = 3600;
const ACTIVE_ROOM_TTL_SECONDS = 4 * 60 * 60;
const DEFAULT_TIME_LIMIT_SECONDS = 20;

function roomChannel(battleId: string): string {
  return `battle:royale:${battleId}`;
}
function stateKey(battleId: string): string {
  return `battle:royale:${battleId}:state`;
}
function playersKey(battleId: string): string {
  return `battle:royale:${battleId}:players`;
}
function questionsKey(battleId: string): string {
  return `battle:royale:${battleId}:questions`;
}
// NEW: tracks who has already answered the CURRENT question, so the
// timeout handler knows who to auto-eliminate for not answering in time.
function answeredKey(battleId: string, questionIndex: number): string {
  return `battle:royale:${battleId}:q:${questionIndex}:answered`;
}

export interface RoyalePlayerData {
  id: string;
  name: string;
  initials: string;
  color: string;
  lives: number;
  isAlive: boolean;
  score?: number;
  correctAnswers?: number;
  totalQuestions?: number;
  accuracy?: number;
}

export interface RoyalePayload {
  type: string;
  battleId: string;
  roomCode?: string;
  startingHp?: number;
  playerData?: RoyalePlayerData;
  optionKey?: string;
  correctAnswer?: string;
  isLastQuestion?: boolean;
  questions?: unknown[];
  forceReset?: boolean;
  // NEW: global, preset-only chat (see CHAT_MESSAGE below).
  sender?: string;
  message?: string;
  userId?: string;
}

class BattleRoyaleHandler {
  private activeRooms: Map<string, Set<WebSocket>>;
  private clientRoomMap: Map<WebSocket, string>;
  // NEW: authoritative per-battle advance timer, same pattern as TeamBattle.
  private questionTimers: Map<string, NodeJS.Timeout>;

  constructor() {
    this.activeRooms = new Map<string, Set<WebSocket>>();
    this.clientRoomMap = new Map<WebSocket, string>();
    this.questionTimers = new Map<string, NodeJS.Timeout>();
  }

  public initSubscriber(redisSubscriber: Redis): void {
    redisSubscriber.on('message', (channel: string, message: string) => {
      if (!channel.startsWith('battle:royale:')) return;
      const battleId = channel.replace('battle:royale:', '');
      const clientsInRoom = this.activeRooms.get(battleId);
      console.log('[ROYALE][server] redis message on', channel, '-> forwarding to', clientsInRoom?.size ?? 0, 'clients');

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
      console.log(`[ROYALE][TIMER] cleared existing timer for ${battleId}`);
    }
  }

  private scheduleQuestionTimeout(
    battleId: string,
    delayMs: number,
    redisPublisher: Redis,
    roomCode?: string
  ): void {
    this.clearQuestionTimer(battleId);
    console.log(`[ROYALE][TIMER] scheduling auto-advance for ${battleId} in ${delayMs}ms`);
    const handle = setTimeout(() => {
      console.log(`[ROYALE][TIMER] timer FIRED for ${battleId}`);
      this.advanceOrEnd(battleId, redisPublisher, roomCode).catch((err) =>
        console.error(`[ROYALE][TIMER] advanceOrEnd failed for ${battleId}:`, err)
      );
    }, delayMs);
    this.questionTimers.set(battleId, handle);
  }

  // NEW: single authoritative path for moving the whole room to the next
  // question. Previously each surviving player's browser advanced its OWN
  // questionIndex 2.5s after IT answered — two players could easily end up
  // looking at two different questions, and a slow/absent player was never
  // penalized or synced at all.
  private async advanceOrEnd(
    battleId: string,
    redisPublisher: Redis,
    roomCode: string | undefined
  ): Promise<void> {
    console.log(`[ROYALE][ADVANCE] triggered for ${battleId}`);
    this.clearQuestionTimer(battleId);

    const sKey = stateKey(battleId);
    const pKey = playersKey(battleId);
    const qKey = questionsKey(battleId);
    const channel = roomChannel(battleId);

    const [rawQuestions, roomState] = await Promise.all([
      redisPublisher.get(qKey),
      redisPublisher.hgetall(sKey),
    ]);
    const questions = rawQuestions ? JSON.parse(rawQuestions) : [];
    const currentIndex = parseInt(roomState.questionIndex || '0', 10);

    // Anyone who never submitted an answer for the question that just timed
    // out loses a life, same as answering wrong — otherwise AFK players
    // would sit at full HP forever while everyone else takes damage.
    const answeredIdsRaw = await redisPublisher.smembers(answeredKey(battleId, currentIndex));
    const rawPlayers = await redisPublisher.hgetall(pKey);
    let players: RoyalePlayerData[] = Object.values(rawPlayers || {}).map((item) => JSON.parse(item));

    const notAnswered = players.filter((p) => p.isAlive && !answeredIdsRaw.includes(p.id));
    if (notAnswered.length > 0) {
      console.log(
        `[ROYALE][ADVANCE] ${battleId} auto-eliminating-on-timeout for: ${notAnswered.map((p) => p.id).join(', ')}`
      );
      for (const p of notAnswered) {
        p.lives = Math.max(0, p.lives - 1);
        if (p.lives === 0) p.isAlive = false;
        p.totalQuestions = (p.totalQuestions || 0) + 1;
        await redisPublisher.hset(pKey, p.id, JSON.stringify(p));
      }
      players = Object.values(await redisPublisher.hgetall(pKey)).map((item) => JSON.parse(item));

      await redisPublisher.publish(
        channel,
        JSON.stringify({
          type: 'ROYALE_HP_UPDATED',
          battleId,
          players,
          reason: 'timeout',
        })
      );
    }

    const activePlayers = players.filter((p) => p.isAlive);
    if (activePlayers.length <= 1 && players.length > 1) {
      await redisPublisher.hset(sKey, { status: 'completed' });
      await redisPublisher.expire(sKey, COMPLETED_ROOM_TTL_SECONDS);
      await redisPublisher.expire(pKey, COMPLETED_ROOM_TTL_SECONDS);

      await this.syncBattleToSupabase(redisPublisher, battleId, roomCode);

      console.log(`[ROYALE][END] ${battleId} match ended after timeout, winner=${activePlayers[0]?.id ?? 'none'}`);

      await redisPublisher.publish(
        channel,
        JSON.stringify({
          type: 'ROYALE_MATCH_ENDED',
          battleId,
          winner: activePlayers[0] || null,
          players,
        })
      );
      return;
    }

    const nextIndex = currentIndex + 1;
    if (nextIndex >= questions.length) {
      await redisPublisher.hset(sKey, { status: 'completed' });
      await redisPublisher.expire(sKey, COMPLETED_ROOM_TTL_SECONDS);

      await this.syncBattleToSupabase(redisPublisher, battleId, roomCode);

      console.log(`[ROYALE][END] ${battleId} ran out of questions -> ROYALE_MATCH_ENDED`);

      await redisPublisher.publish(
        channel,
        JSON.stringify({
          type: 'ROYALE_MATCH_ENDED',
          battleId,
          winner: activePlayers[0] || null,
          players,
        })
      );
      return;
    }

    const startedAt = Date.now();
    const timeLimit = Number(questions[nextIndex]?.timeLimit) || DEFAULT_TIME_LIMIT_SECONDS;

    await redisPublisher.hset(sKey, {
      questionIndex: String(nextIndex),
      startedAt: String(startedAt),
      timeLimit: String(timeLimit),
    });
    await redisPublisher.expire(sKey, ACTIVE_ROOM_TTL_SECONDS);
    await redisPublisher.del(answeredKey(battleId, currentIndex));

    console.log(
      `[ROYALE][ADVANCE] ${battleId} -> question ${nextIndex}, timeLimit=${timeLimit}s, broadcasting ROYALE_QUESTION_ADVANCED`
    );

    await redisPublisher.publish(
      channel,
      JSON.stringify({
        type: 'ROYALE_QUESTION_ADVANCED',
        battleId,
        questionIndex: nextIndex,
        startedAt,
        timeLimit,
        players,
      })
    );

    this.scheduleQuestionTimeout(battleId, timeLimit * 1000, redisPublisher, roomCode);
  }

  public async syncBattleToSupabase(
    redisPublisher: Redis,
    battleId: string,
    roomCode?: string
  ): Promise<void> {
    try {
      const pKey = playersKey(battleId);
      const sKey = stateKey(battleId);

      const rawPlayers = await redisPublisher.hgetall(pKey);
      const roomState = await redisPublisher.hgetall(sKey);

      const players: PlayerResult[] = Object.values(rawPlayers || {}).map((item) => {
        const parsed = JSON.parse(item) as RoyalePlayerData;
        return {
          userId: parsed.id,
          score: parsed.score || (parsed.isAlive ? 1000 : 0),
          correctAnswers: parsed.correctAnswers || 0,
          totalQuestions: parsed.totalQuestions || 0,
          accuracy: parsed.accuracy || 0,
        };
      });

      await finalizeAndSaveBattle({
        battleId,
        roomCode: roomCode || roomState.roomCode || 'ROYALE_ROOM',
        battleMode: 'ROYALE',
        players,
      });

      console.log(`[BattleRoyale] Saved battle ${battleId} results to Supabase (${players.length} players)`);
    } catch (err) {
      console.error(`[BattleRoyale] Failed to sync battle ${battleId} to Supabase:`, err);
    }
  }

  public async handleMessage(
    ws: WebSocket,
    payload: RoyalePayload,
    redisPublisher: Redis,
    redisSubscriber: Redis
  ): Promise<void> {
    const { type, battleId, roomCode, startingHp = 100, playerData, optionKey, correctAnswer, isLastQuestion, sender, message, userId } = payload;
    console.log(`[ROYALE][server] handleMessage type=${type} battleId=${battleId}`);

    if (!battleId) {
      ws.send(JSON.stringify({ error: 'battleId is required for Royale operations' }));
      return;
    }

    const channel = roomChannel(battleId);
    const sKey = stateKey(battleId);
    const pKey = playersKey(battleId);
    const qKey = questionsKey(battleId);

    // ── JOIN ROYALE BATTLE ──
    if (type === 'JOIN_ROYALE') {
      roomPresenceHandler.setBattleMode(battleId, 'ROYALE');
      
      if (!this.activeRooms.has(battleId)) {
        this.activeRooms.set(battleId, new Set<WebSocket>());
        redisSubscriber.subscribe(channel, (err) => {
          if (err) console.error(`Failed to subscribe to ${channel}`, err);
          else console.log(`[ROYALE] Subscribed to Redis channel: ${channel}`);
        });
      }

      this.activeRooms.get(battleId)!.add(ws);
      this.clientRoomMap.set(ws, battleId);

      let roomState = await redisPublisher.hgetall(sKey);
      if (!roomState || !roomState.startingHp) {
        roomState = {
          startingHp: String(startingHp),
          status: 'waiting',
          roomCode: roomCode || '',
          questionIndex: '0',
        };
        await redisPublisher.hset(sKey, roomState);
      } else if (roomState.status === 'waiting' && Number(roomState.startingHp) !== 100) {
        roomState.startingHp = '100';
        await redisPublisher.hset(sKey, { startingHp: '100' });
      }
      await redisPublisher.expire(sKey, ACTIVE_ROOM_TTL_SECONDS);

      if (playerData && playerData.id && playerData.id !== 'professor') {
        const initialPlayer: RoyalePlayerData = {
          ...playerData,
          lives: Number(roomState.startingHp),
          isAlive: true,
        };
        await redisPublisher.hset(pKey, playerData.id, JSON.stringify(initialPlayer));
      }

      const rawPlayers = await redisPublisher.hgetall(pKey);
      const players = Object.values(rawPlayers || {}).map((item) => JSON.parse(item));

      const rawQuestions = await redisPublisher.get(qKey);
      const questions = rawQuestions ? JSON.parse(rawQuestions) : [];
      const questionIndex = parseInt(roomState.questionIndex || '0', 10);
      const startedAt = parseInt(roomState.startedAt || String(Date.now()), 10);
      const timeLimit = parseInt(roomState.timeLimit || String(DEFAULT_TIME_LIMIT_SECONDS), 10);
      const stateSync = JSON.stringify({
        type: 'ROYALE_STATE_SYNC',
        battleId,
        startingHp: Number(roomState.startingHp),
        status: roomState.status,
        questionIndex,
        startedAt,
        timeLimit,
        players,
        questions,
      });

      console.log(`[ROYALE][JOIN] ${battleId} client joined at server questionIndex=${questionIndex}`);

      ws.send(stateSync);

      // Keep both the shared lobby connection and Royale subscribers in sync.
      await redisPublisher.publish(`battle:${battleId}`, stateSync);
      await redisPublisher.publish(channel, stateSync);

      console.log(`Client joined Battle Royale Room ${battleId}`);
      return;
    }

    // ── PROFESSOR STARTS THE ROYALE MATCH ──
    // FIX: now seeds questionIndex/startedAt/timeLimit and schedules the
    // first auto-advance timer, so the whole room moves together instead of
    // each browser timing itself out independently.
    if (type === 'PROF_START_ROYALE') {
      if (payload.questions && Array.isArray(payload.questions)) {
        await redisPublisher.set(qKey, JSON.stringify(payload.questions));
      }

      const rawQuestions = await redisPublisher.get(qKey);
      const questions = rawQuestions ? JSON.parse(rawQuestions) : [];
      const startedAt = Date.now();
      const timeLimit = Number(questions[0]?.timeLimit) || DEFAULT_TIME_LIMIT_SECONDS;

      await redisPublisher.hset(sKey, {
        status: 'active',
        questionIndex: '0',
        startedAt: String(startedAt),
        timeLimit: String(timeLimit),
      });
      await redisPublisher.expire(sKey, ACTIVE_ROOM_TTL_SECONDS);

      const rawPlayers = await redisPublisher.hgetall(pKey);
      const players = Object.values(rawPlayers || {}).map((item) => JSON.parse(item));

      console.log(`[ROYALE][START] ${battleId} starting with ${questions.length} questions, timeLimit=${timeLimit}s`);

      await redisPublisher.publish(
        channel,
        JSON.stringify({
          type: 'ROYALE_STATE_SYNC',
          battleId,
          startingHp: Number(startingHp),
          status: 'active',
          questionIndex: 0,
          startedAt,
          timeLimit,
          players,
          questions,
        })
      );

            await redisPublisher.publish(
        `battle:${battleId}`,
        JSON.stringify({
          type: 'ROYALE_STATE_SYNC',
          battleId,
          startingHp: Number(startingHp),
          status: 'active',
          questionIndex: 0,
          startedAt,
          timeLimit,
          players,
          questions,
        })
      );

      this.scheduleQuestionTimeout(battleId, timeLimit * 1000, redisPublisher, roomCode);

      console.log(`Professor started Battle Royale Room ${battleId} with ${questions.length} synchronized questions.`);
      return;
    }

    if (type === 'ADVANCE_QUESTION') {
      // Royale progression is server-timed. A generic professor-side advance
      // must not skip the configured question timer.
      console.log(`[ROYALE][ADVANCE] ignoring manual advance for ${battleId}; server timer owns progression`);
      return;
    }

    if (type === 'PROF_END_ROYALE' || type === 'PROF_END_BATTLE') {
      const rawPlayers = await redisPublisher.hgetall(pKey);
      const players = Object.values(rawPlayers || {}).map((item) => JSON.parse(item));
      const winner = players.find((player: RoyalePlayerData) => player.isAlive) || null;

      await redisPublisher.hset(sKey, { status: 'completed' });
      await redisPublisher.expire(sKey, COMPLETED_ROOM_TTL_SECONDS);
      await redisPublisher.expire(pKey, COMPLETED_ROOM_TTL_SECONDS);
      this.clearQuestionTimer(battleId);
      await this.syncBattleToSupabase(redisPublisher, battleId, roomCode);
      await redisPublisher.publish(channel, JSON.stringify({
        type: 'ROYALE_MATCH_ENDED',
        battleId,
        winner,
        players,
      }));
      return;
    }

    // ── SUBMIT ANSWER & PROCESS DAMAGE ──
    // NOTE: no longer decides locally whether to move to the next question.
    // It just records the answer/damage; the server's shared timer (started
    // in PROF_START_ROYALE / advanceOrEnd) is what moves everyone forward.
    if (type === 'SUBMIT_ROYALE_ANSWER') {
      if (!playerData || !playerData.id) return;

      const rawPlayer = await redisPublisher.hget(pKey, playerData.id);
      if (!rawPlayer) return;

      let player: RoyalePlayerData = JSON.parse(rawPlayer);
      if (!player.isAlive) return;

      const roomState = await redisPublisher.hgetall(sKey);
      const questionIndex = parseInt(roomState.questionIndex || '0', 10);
      await redisPublisher.sadd(answeredKey(battleId, questionIndex), player.id);
      await redisPublisher.expire(answeredKey(battleId, questionIndex), COMPLETED_ROOM_TTL_SECONDS);

      const isCorrect = optionKey === correctAnswer;
      console.log(
        `[ROYALE][ANSWER] ${battleId} player=${player.id} correct=${isCorrect} at questionIndex=${questionIndex}`
      );

      if (!isCorrect) {
        player.lives = Math.max(0, player.lives - 1);
        if (player.lives === 0) {
          player.isAlive = false;
        }
      } else {
        player.correctAnswers = (player.correctAnswers || 0) + 1;
      }
      player.totalQuestions = (player.totalQuestions || 0) + 1;

      await redisPublisher.hset(pKey, player.id, JSON.stringify(player));

      const rawPlayers = await redisPublisher.hgetall(pKey);
      const players: RoyalePlayerData[] = Object.values(rawPlayers).map((item) => JSON.parse(item));
      const activePlayers = players.filter((p) => p.isAlive);

      await redisPublisher.publish(
        channel,
        JSON.stringify({
          type: 'ROYALE_HP_UPDATED',
          battleId,
          playerId: player.id,
          isCorrect,
          lives: player.lives,
          isAlive: player.isAlive,
          players,
        })
      );

      // Keep the question open until the authoritative server timer expires.
      // This gives every player the full configured time, even when everyone
      // currently alive has already submitted an answer.
      const answeredIds = await redisPublisher.smembers(answeredKey(battleId, questionIndex));
      const stillWaitingOn = activePlayers.filter((p) => !answeredIds.includes(p.id));
      console.log(
        `[ROYALE][ANSWER] ${battleId} ${answeredIds.length} answered, still waiting on ${stillWaitingOn.length} alive player(s)`
      );

      if (activePlayers.length <= 1 && players.length > 1) {
        await redisPublisher.hset(sKey, { status: 'completed' });
        await redisPublisher.expire(sKey, COMPLETED_ROOM_TTL_SECONDS);
        await redisPublisher.expire(pKey, COMPLETED_ROOM_TTL_SECONDS);

        await this.syncBattleToSupabase(redisPublisher, battleId, roomCode);

        this.clearQuestionTimer(battleId);
        console.log(`[ROYALE][END] ${battleId} only ${activePlayers.length} survivor(s) left -> ROYALE_MATCH_ENDED`);

        await redisPublisher.publish(
          channel,
          JSON.stringify({
            type: 'ROYALE_MATCH_ENDED',
            battleId,
            winner: activePlayers[0] || null,
            players,
          })
        );
      }
      return;
    }

    // ── GLOBAL CHAT (preset messages only, seen by the whole match) ──
    if (type === 'CHAT_MESSAGE') {
      if (!message) return;
      console.log(`[ROYALE][CHAT] ${battleId} ${sender || 'Anonymous'}: ${message}`);

      await redisPublisher.publish(
        channel,
        JSON.stringify({
          type: 'CHAT_MESSAGE',
          battleId,
          sender: sender || 'Anonymous',
          userId: userId || null,
          message,
          timestamp: new Date().toISOString(),
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
        this.clearQuestionTimer(battleId);
        redisSubscriber.unsubscribe(roomChannel(battleId));
      }
    }
    this.clientRoomMap.delete(ws);
  }
}

export default new BattleRoyaleHandler();