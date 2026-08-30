import { WebSocket } from 'ws';
import Redis from 'ioredis';
import { finalizeAndSaveBattle, PlayerResult } from '../src/lib/student/battle/battleSync';
import roomPresenceHandler from './RoomPresence';

const ACTIVE_TTL = 4 * 60 * 60;
const COMPLETED_TTL = 3600;
const STEAL_SECONDS = 10;
const QUESTION_SECONDS = 30;
const RETAKE_SECONDS = 20;
const BOARD_SIZE = 25;

function channelFor(id: string) { return `battle:bingo:${id}`; }
function stateKey(id: string) { return `battle:bingo:${id}:state`; }
function playersKey(id: string) { return `battle:bingo:${id}:players`; }
function questionsKey(id: string) { return `battle:bingo:${id}:questions`; }

export interface BingoPlayerData {
  id: string;
  name: string;
  initials: string;
  color: string;
  card?: BingoCell[];
  score?: number;
  wins?: number;
  stealBuffs?: number;
  retakeBuffs?: number;
  bingo?: boolean;
}

type CellStatus = 'unanswered' | 'correct' | 'wrong';
type BingoCell = { value: number; status: CellStatus };
type BingoQuestion = { text?: string; question?: string; answer?: string; choices?: string[]; options?: string[]; [key: string]: unknown };

export interface BingoPayload {
  type: string;
  battleId: string;
  roomCode?: string;
  playerData?: BingoPlayerData;
  questions?: BingoQuestion[];
  forceReset?: boolean;
  sender?: string;
  userId?: string;
  answer?: string;
  targetUserId?: string;
  discardValue?: number;
  retakeValue?: number;
  message?: string;
}

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function createCard(): BingoCell[] {
  const columns = Array.from({ length: 5 }, (_, columnIndex) => {
    const start = columnIndex * 15 + 1;
    return shuffle(Array.from({ length: 15 }, (_, index) => start + index)).slice(0, 5);
  });
  const values = Array.from({ length: 5 }, (_, rowIndex) => columns.map((column) => column[rowIndex])).flat();
  return values.map((value) => ({ value, status: 'unanswered' }));
}

function hasValidColumnRanges(card: BingoCell[] | undefined): boolean {
  if (!card || card.length !== BOARD_SIZE) return false;
  return card.every((cell, index) => {
    const column = index % 5;
    const minimum = column * 15 + 1;
    return cell.value >= minimum && cell.value <= minimum + 14;
  });
}

function normalizeAnswer(value: unknown): string {
  return String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function hasBingo(card: BingoCell[]): boolean {
  const green = new Set(card.filter((cell) => cell.status === 'correct').map((cell) => cell.value));
  const lines = [
    [0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14], [15, 16, 17, 18, 19], [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20], [1, 6, 11, 16, 21], [2, 7, 12, 17, 22], [3, 8, 13, 18, 23], [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24], [4, 8, 12, 16, 20],
  ];
  return lines.some((line) => line.every((index) => card[index]?.status === 'correct'));
}

function publicPlayer(player: BingoPlayerData) {
  const { card: _card, ...safePlayer } = player;
  return safePlayer;
}

class BingoBattleHandler {
  private activeRooms = new Map<string, Set<WebSocket>>();
  private clientRoomMap = new Map<WebSocket, string>();
  private clientUserMap = new Map<WebSocket, string>();
  private timers = new Map<string, NodeJS.Timeout>();

  public initSubscriber(redisSubscriber: Redis) {
    redisSubscriber.on('message', async (channel: string, message: string) => {
      if (!channel.startsWith('battle:bingo:')) return;
      const battleId = channel.replace('battle:bingo:', '');
      const clients = this.activeRooms.get(battleId);
      if (!clients) return;
      let parsed: any;
      try { parsed = JSON.parse(message); } catch { return; }
      await Promise.all([...clients].map(async (client) => {
        if (client.readyState !== WebSocket.OPEN) return;
        const userId = this.clientUserMap.get(client);
        if (parsed.type === 'BINGO_STATE_SYNC' && userId) {
          const raw = await redisSubscriber.hget(playersKey(battleId), userId);
          parsed.self = raw ? JSON.parse(raw) : undefined;
        }
        client.send(JSON.stringify(parsed));
      }));
    });
  }

  private clearTimer(battleId: string) {
    const timer = this.timers.get(battleId);
    if (timer) clearTimeout(timer);
    this.timers.delete(battleId);
  }

  private async publishState(redis: Redis, battleId: string) {
    const state = await redis.hgetall(stateKey(battleId));
    const rawPlayers = await redis.hgetall(playersKey(battleId));
    const rawQuestions = await redis.get(questionsKey(battleId));
    const players = Object.values(rawPlayers || {}).map((item) => JSON.parse(item) as BingoPlayerData);
    const questions = rawQuestions ? JSON.parse(rawQuestions) as BingoQuestion[] : [];
    const questionIndex = Number(state.questionIndex || 0);
    const question = questions[questionIndex % Math.max(questions.length, 1)] || null;
    await redis.publish(channelFor(battleId), JSON.stringify({
      type: 'BINGO_STATE_SYNC',
      battleId,
      status: state.status || 'waiting',
      phase: state.phase || 'rolling',
      phaseEndsAt: Number(state.phaseEndsAt || 0),
      serverTime: Date.now(),
      phaseSeconds: Number(state.phaseEndsAt || 0) > 0 ? Math.max(0, Math.ceil((Number(state.phaseEndsAt) - Date.now()) / 1000)) : 0,
      round: Number(state.round || 0),
      rolledNumber: state.rolledNumber ? Number(state.rolledNumber) : null,
      calledNumbers: JSON.parse(state.calledNumbers || '[]'),
      eligiblePlayerIds: JSON.parse(state.eligiblePlayerIds || '[]'),
      answeredPlayerIds: JSON.parse(state.answeredPlayerIds || '[]'),
      question,
      players: players.map(publicPlayer),
    }));
  }

  private async finish(redis: Redis, battleId: string, winner: BingoPlayerData | null) {
    this.clearTimer(battleId);
    const sKey = stateKey(battleId);
    const pKey = playersKey(battleId);
    const rawPlayers = await redis.hgetall(pKey);
    const players = Object.values(rawPlayers || {}).map((item) => JSON.parse(item) as BingoPlayerData);
    await redis.hset(sKey, { status: 'completed', phase: 'finished' });
    await redis.expire(sKey, COMPLETED_TTL);
    await redis.expire(pKey, COMPLETED_TTL);
    const results: PlayerResult[] = players.map((player) => ({ userId: player.id, score: player.wins || 0, correctAnswers: player.wins || 0, totalQuestions: 0, accuracy: 0 }));
    await finalizeAndSaveBattle({ battleId, battleMode: 'BINGO', players: results });
    await redis.publish(channelFor(battleId), JSON.stringify({ type: 'BINGO_MATCH_ENDED', battleId, winner: winner ? publicPlayer(winner) : null, players: players.map(publicPlayer) }));
  }

  private schedulePhase(redis: Redis, battleId: string, seconds: number, callback: () => Promise<void>) {
    this.clearTimer(battleId);
    this.timers.set(battleId, setTimeout(() => callback().catch((error) => console.error('[BINGO] phase error', error)), seconds * 1000));
  }

  private async beginQuestion(redis: Redis, battleId: string) {
    const sKey = stateKey(battleId);
    const pKey = playersKey(battleId);
    const state = await redis.hgetall(sKey);
    const rolledNumber = Number(state.rolledNumber);
    const rawPlayers = await redis.hgetall(pKey);
    const players = Object.values(rawPlayers || {}).map((item) => JSON.parse(item) as BingoPlayerData);
    const eligiblePlayerIds = players.filter((player) => player.card?.some((cell) => cell.value === rolledNumber)).map((player) => player.id);
    await redis.hset(sKey, { phase: 'question', phaseEndsAt: String(Date.now() + QUESTION_SECONDS * 1000), eligiblePlayerIds: JSON.stringify(eligiblePlayerIds), answeredPlayerIds: '[]' });
    await this.publishState(redis, battleId);
    this.schedulePhase(redis, battleId, QUESTION_SECONDS, () => this.endQuestion(redis, battleId));
  }

  private async beginRound(redis: Redis, battleId: string) {
    const sKey = stateKey(battleId);
    const state = await redis.hgetall(sKey);
    const calledNumbers: number[] = JSON.parse(state.calledNumbers || '[]');
    const available = Array.from({ length: 75 }, (_, index) => index + 1).filter((number) => !calledNumbers.includes(number));
    if (!available.length) return this.finish(redis, battleId, null);
    const rolledNumber = available[Math.floor(Math.random() * available.length)];
    const round = Number(state.round || 0) + 1;
    calledNumbers.push(rolledNumber);
    await redis.hset(sKey, { round: String(round), questionIndex: String(round - 1), rolledNumber: String(rolledNumber), calledNumbers: JSON.stringify(calledNumbers), phase: 'stealing', phaseEndsAt: String(Date.now() + STEAL_SECONDS * 1000), eligiblePlayerIds: '[]', answeredPlayerIds: '[]' });
    await this.publishState(redis, battleId);
    this.schedulePhase(redis, battleId, STEAL_SECONDS, () => this.beginQuestion(redis, battleId));
  }

  private async endQuestion(redis: Redis, battleId: string) {
    const state = await redis.hgetall(stateKey(battleId));
    if (state.phase !== 'question') return;
    const rolledNumber = Number(state.rolledNumber);
    const eligiblePlayerIds: string[] = JSON.parse(state.eligiblePlayerIds || '[]');
    const answeredPlayerIds: string[] = JSON.parse(state.answeredPlayerIds || '[]');
    const unansweredPlayerIds = eligiblePlayerIds.filter((id) => !answeredPlayerIds.includes(id));
    if (unansweredPlayerIds.length > 0) {
      const rawPlayers = await redis.hgetall(playersKey(battleId));
      await Promise.all(unansweredPlayerIds.map(async (playerId) => {
        const rawPlayer = rawPlayers[playerId];
        if (!rawPlayer) return;
        const player = JSON.parse(rawPlayer) as BingoPlayerData;
        const cell = player.card?.find((item) => item.value === rolledNumber);
        if (cell && cell.status === 'unanswered') {
          cell.status = 'wrong';
          await redis.hset(playersKey(battleId), playerId, JSON.stringify(player));
        }
      }));
    }
    if (Number(state.round || 0) % 3 === 0) {
      await redis.hset(stateKey(battleId), { phase: 'retake', phaseEndsAt: String(Date.now() + RETAKE_SECONDS * 1000) });
      await this.publishState(redis, battleId);
      this.schedulePhase(redis, battleId, RETAKE_SECONDS, () => this.beginRound(redis, battleId));
    } else {
      await this.beginRound(redis, battleId);
    }
  }

  public async handleMessage(ws: WebSocket, payload: BingoPayload, redis: Redis, redisSubscriber: Redis) {
    const { type, battleId } = payload;
    if (!battleId) return;
    const sKey = stateKey(battleId);
    const pKey = playersKey(battleId);
    const qKey = questionsKey(battleId);

    if (type === 'JOIN_BINGO') {
      roomPresenceHandler.setBattleMode(battleId, 'BINGO');
      if (!this.activeRooms.has(battleId)) {
        this.activeRooms.set(battleId, new Set());
        redisSubscriber.subscribe(channelFor(battleId));
      }
      this.activeRooms.get(battleId)!.add(ws);
      this.clientRoomMap.set(ws, battleId);
      const player = payload.playerData;
      if (player?.id) {
        this.clientUserMap.set(ws, player.id);
        const existing = await redis.hget(pKey, player.id);
        const stored: BingoPlayerData = existing ? JSON.parse(existing) : { ...player, card: createCard(), wins: 0, stealBuffs: 0, retakeBuffs: 0, bingo: false };
        if (!hasValidColumnRanges(stored.card)) stored.card = createCard();
        await redis.hset(pKey, player.id, JSON.stringify(stored));
      }
      if (!(await redis.hget(sKey, 'status'))) await redis.hset(sKey, { status: 'waiting', phase: 'rolling', round: '0', calledNumbers: '[]', eligiblePlayerIds: '[]' });
      await redis.expire(sKey, ACTIVE_TTL);
      if (player?.id) {
        const state = await redis.hgetall(sKey);
        const rawQuestions = await redis.get(qKey);
        ws.send(JSON.stringify({
          type: 'BINGO_STATE_SYNC',
          battleId,
          status: state.status || 'waiting',
          phase: state.phase || 'rolling',
          phaseEndsAt: Number(state.phaseEndsAt || 0),
          serverTime: Date.now(),
          phaseSeconds: Number(state.phaseEndsAt || 0) > 0 ? Math.max(0, Math.ceil((Number(state.phaseEndsAt) - Date.now()) / 1000)) : 0,
          round: Number(state.round || 0),
          rolledNumber: state.rolledNumber ? Number(state.rolledNumber) : null,
          calledNumbers: JSON.parse(state.calledNumbers || '[]'),
          eligiblePlayerIds: JSON.parse(state.eligiblePlayerIds || '[]'),
          answeredPlayerIds: JSON.parse(state.answeredPlayerIds || '[]'),
          question: rawQuestions ? (JSON.parse(rawQuestions) as BingoQuestion[])[Number(state.questionIndex || 0)] || null : null,
          players: Object.values(await redis.hgetall(pKey)).map((item) => publicPlayer(JSON.parse(item) as BingoPlayerData)),
          self: JSON.parse(await redis.hget(pKey, player.id) || '{}'),
        }));
      }
      await this.publishState(redis, battleId);
      return;
    }

    if (type === 'PROF_START_BINGO') {
      if (payload.questions?.length) await redis.set(qKey, JSON.stringify(payload.questions));
      await redis.hset(sKey, { status: 'active', phase: 'rolling', round: '0', calledNumbers: '[]' });
      await redis.expire(sKey, ACTIVE_TTL);
      await this.beginRound(redis, battleId);
      return;
    }

    const userId = this.clientUserMap.get(ws) || payload.userId || payload.playerData?.id;
    if (type === 'USE_BINGO_STEAL' && userId) {
      const state = await redis.hgetall(sKey);
      if (state.phase !== 'stealing') return;
      const rawThief = await redis.hget(pKey, userId);
      const rawTarget = payload.targetUserId ? await redis.hget(pKey, payload.targetUserId) : null;
      if (!rawThief || !rawTarget) return;
      const thief = JSON.parse(rawThief) as BingoPlayerData;
      const target = JSON.parse(rawTarget) as BingoPlayerData;
      if ((thief.stealBuffs || 0) < 1 || !thief.card || !target.card) return;
      thief.stealBuffs = (thief.stealBuffs || 0) - 1;
      const rolled = Number(state.rolledNumber);
      const targetIndex = target.card.findIndex((cell) => cell.value === rolled);
      const discardIndex = thief.card.findIndex((cell) => cell.value === Number(payload.discardValue));
      if (targetIndex >= 0 && discardIndex >= 0) {
        const discarded = thief.card[discardIndex];
        thief.card[discardIndex] = { value: rolled, status: 'unanswered' };
        target.card[targetIndex] = { ...discarded, status: 'unanswered' };
      }
      await redis.hset(pKey, thief.id, JSON.stringify(thief));
      await redis.hset(pKey, target.id, JSON.stringify(target));
      await this.publishState(redis, battleId);
      return;
    }

    if ((type === 'SUBMIT_BINGO_ANSWER' || type === 'USE_BINGO_RETAKE') && userId) {
      const state = await redis.hgetall(sKey);
      const allowedPhase = type === 'SUBMIT_BINGO_ANSWER' ? 'question' : 'retake';
      if (state.phase !== allowedPhase) return;
      const rawPlayer = await redis.hget(pKey, userId);
      const rawQuestions = await redis.get(qKey);
      if (!rawPlayer || !rawQuestions) return;
      const player = JSON.parse(rawPlayer) as BingoPlayerData;
      const questions = JSON.parse(rawQuestions) as BingoQuestion[];
      const questionIndex = Number(state.questionIndex || 0);
      const question = questions[questionIndex % Math.max(questions.length, 1)];
      const isCorrect = normalizeAnswer(payload.answer) === normalizeAnswer(question?.answer);
      const value = type === 'USE_BINGO_RETAKE' ? Number(payload.retakeValue) : Number(state.rolledNumber);
      const cell = player.card?.find((item) => item.value === value);
      if (!cell) return;
      if (type === 'USE_BINGO_RETAKE') {
        if ((player.retakeBuffs || 0) < 1 || cell.status !== 'wrong') return;
        player.retakeBuffs = (player.retakeBuffs || 0) - 1;
      }
      cell.status = isCorrect ? 'correct' : 'wrong';
      if (isCorrect) {
        player.wins = (player.wins || 0) + 1;
        const awarded = Math.floor((player.wins || 0) / 2);
        const held = (player.stealBuffs || 0) + (player.retakeBuffs || 0);
        if (awarded > held) Math.random() < 0.5 ? player.stealBuffs = (player.stealBuffs || 0) + 1 : player.retakeBuffs = (player.retakeBuffs || 0) + 1;
      }
      player.bingo = hasBingo(player.card || []);
      await redis.hset(pKey, player.id, JSON.stringify(player));
      await redis.publish(channelFor(battleId), JSON.stringify({ type: 'BINGO_ANSWER_RESULT', battleId, playerId: userId, isCorrect, card: player.card }));
      if (player.bingo) return this.finish(redis, battleId, player);
      const answered: string[] = JSON.parse(state.answeredPlayerIds || '[]');
      if (!answered.includes(userId)) answered.push(userId);
      await redis.hset(sKey, { answeredPlayerIds: JSON.stringify(answered) });
      await this.publishState(redis, battleId);
      const eligible: string[] = JSON.parse(state.eligiblePlayerIds || '[]');
      if (eligible.every((id) => answered.includes(id))) await this.endQuestion(redis, battleId);
      return;
    }

    if (type === 'BINGO_CHAT' && payload.message) {
      await redis.publish(channelFor(battleId), JSON.stringify({ type: 'BINGO_CHAT', battleId, sender: payload.sender || 'Player', userId, message: payload.message, timestamp: Date.now() }));
      return;
    }

    if (type === 'END_BINGO_BATTLE' || type === 'PROF_END_BATTLE') {
      await this.finish(redis, battleId, null);
    }
  }

  public handleLeave(ws: WebSocket, redisSubscriber: Redis) {
    const battleId = this.clientRoomMap.get(ws);
    if (!battleId) return;
    const clients = this.activeRooms.get(battleId);
    clients?.delete(ws);
    this.clientRoomMap.delete(ws);
    this.clientUserMap.delete(ws);
    if (clients?.size === 0) {
      this.activeRooms.delete(battleId);
      this.clearTimer(battleId);
      redisSubscriber.unsubscribe(channelFor(battleId));
    }
  }
}

export default new BingoBattleHandler();
