import { WebSocket } from 'ws';
import Redis from 'ioredis';
import { finalizeAndSaveBattle, PlayerResult } from '../src/lib/student/battle/battleSync';
import roomPresenceHandler from './RoomPresence'; // <--- import this

const COMPLETED_ROOM_TTL_SECONDS = 3600;
const ACTIVE_ROOM_TTL_SECONDS = 4 * 60 * 60;
const DEFAULT_TIME_LIMIT_SECONDS = 30;

function roomChannel(battleId: string): string {
  return `battle:bingo:${battleId}`;
}
function stateKey(battleId: string): string {
  return `battle:bingo:${battleId}:state`;
}
function playersKey(battleId: string): string {
  return `battle:bingo:${battleId}:players`;
}
function questionsKey(battleId: string): string {
  return `battle:bingo:${battleId}:questions`;
}

export interface BingoPlayerData {
  id: string;
  name: string;
  initials: string;
  color: string;
  cardState?: number[]; // Matrix or clicked states for Bingo
  score?: number;
  completedLines?: number;
}

export interface BingoPayload {
  type: string;
  battleId: string;
  roomCode?: string;
  playerData?: BingoPlayerData;
  questions?: unknown[];
  forceReset?: boolean;
  sender?: string;
  message?: string;
  userId?: string;
}

class BingoBattleHandler {
  private activeRooms: Map<string, Set<WebSocket>>;
  private clientRoomMap: Map<WebSocket, string>;
  private questionTimers: Map<string, NodeJS.Timeout>;

  constructor() {
    this.activeRooms = new Map<string, Set<WebSocket>>();
    this.clientRoomMap = new Map<WebSocket, string>();
    this.questionTimers = new Map<string, NodeJS.Timeout>();
  }

  public initSubscriber(redisSubscriber: Redis): void {
    redisSubscriber.on('message', (channel: string, message: string) => {
      if (!channel.startsWith('battle:bingo:')) return;
      const battleId = channel.replace('battle:bingo:', '');
      const clientsInRoom = this.activeRooms.get(battleId);
      console.log('[BINGO][server] redis message on', channel, '-> forwarding to', clientsInRoom?.size ?? 0, 'clients');

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
    }
  }

  public async syncBattleToSupabase(redisPublisher: Redis, battleId: string, roomCode?: string): Promise<void> {
    try {
      const pKey = playersKey(battleId);
      const sKey = stateKey(battleId);
      const rawPlayers = await redisPublisher.hgetall(pKey);
      const roomState = await redisPublisher.hgetall(sKey);

      const players: PlayerResult[] = Object.values(rawPlayers || {}).map((item) => {
        const parsed = JSON.parse(item) as BingoPlayerData;
        return {
          userId: parsed.id,
          score: parsed.score || 0,
          correctAnswers: parsed.completedLines || 0,
          totalQuestions: 0,
          accuracy: 100,
        };
      });

      await finalizeAndSaveBattle({
        battleId,
        roomCode: roomCode || roomState.roomCode || 'BINGO_ROOM',
        battleMode: 'BINGO',
        players,
      });
      console.log(`[BingoBattle] Saved battle ${battleId} results to Supabase.`);
    } catch (err) {
      console.error(`[BingoBattle] Failed to sync battle ${battleId}:`, err);
    }
  }

  public async handleMessage(
    ws: WebSocket,
    payload: BingoPayload,
    redisPublisher: Redis,
    redisSubscriber: Redis
  ): Promise<void> {
    const { type, battleId, roomCode, playerData, questions, forceReset } = payload;
    if (!battleId) {
      ws.send(JSON.stringify({ error: 'battleId is required for Bingo operations' }));
      return;
    }

    const channel = roomChannel(battleId);
    const sKey = stateKey(battleId);
    const pKey = playersKey(battleId);
    const qKey = questionsKey(battleId);

    if (type === 'JOIN_BINGO') {
        roomPresenceHandler.setBattleMode(battleId, 'BINGO'); // <--- register mode here
      if (!this.activeRooms.has(battleId)) {
        this.activeRooms.set(battleId, new Set<WebSocket>());
        redisSubscriber.subscribe(channel, (err) => {
          if (err) console.error(`Failed to subscribe to ${channel}`, err);
        });
      }

      this.activeRooms.get(battleId)!.add(ws);
      this.clientRoomMap.set(ws, battleId);

      let roomState = await redisPublisher.hgetall(sKey);
      if (!roomState || !roomState.status) {
        roomState = { status: 'waiting', roomCode: roomCode || '' };
        await redisPublisher.hset(sKey, roomState);
      }
      await redisPublisher.expire(sKey, ACTIVE_ROOM_TTL_SECONDS);

      if (playerData && playerData.id) {
        await redisPublisher.hset(pKey, playerData.id, JSON.stringify(playerData));
      }

      const rawPlayers = await redisPublisher.hgetall(pKey);
      const players = Object.values(rawPlayers || {}).map((item) => JSON.parse(item));
      const rawQuestions = await redisPublisher.get(qKey);
      const parsedQuestions = rawQuestions ? JSON.parse(rawQuestions) : [];

      const stateSync = JSON.stringify({
        type: 'BINGO_STATE_SYNC',
        battleId,
        status: roomState.status,
        players,
        questions: parsedQuestions,
      });

      // Notify the professor and any other connected players when a new
      // participant joins after the initial state sync.
      await redisPublisher.publish(channel, stateSync);
      return;
    }

    if (type === 'PROF_START_BINGO') {
      if (forceReset) {
        await redisPublisher.del(pKey);
      }
      if (questions && Array.isArray(questions)) {
        await redisPublisher.set(qKey, JSON.stringify(questions));
      }

      await redisPublisher.hset(sKey, { status: 'active' });
      await redisPublisher.expire(sKey, ACTIVE_ROOM_TTL_SECONDS);

      const rawPlayers = await redisPublisher.hgetall(pKey);
      const players = Object.values(rawPlayers || {}).map((item) => JSON.parse(item));
      const rawQuestions = await redisPublisher.get(qKey);
      const parsedQuestions = rawQuestions ? JSON.parse(rawQuestions) : [];

      await redisPublisher.publish(channel, JSON.stringify({
        type: 'BINGO_STATE_SYNC',
        battleId,
        status: 'active',
        players,
        questions: parsedQuestions,
      }));
      return;
    }

    if (type === 'END_BINGO_BATTLE') {
      await redisPublisher.hset(sKey, { status: 'completed' });
      await this.syncBattleToSupabase(redisPublisher, battleId, roomCode);

      await redisPublisher.publish(channel, JSON.stringify({
        type: 'BINGO_MATCH_ENDED',
        battleId,
      }));
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

export default new BingoBattleHandler();