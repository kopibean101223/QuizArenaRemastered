import { WebSocket } from 'ws';
import Redis from 'ioredis';

const MAX_HISTORY_LIMIT = 100;
const COMPLETED_ROOM_TTL_SECONDS = 300;

function roomChannel(battleId: string): string {
  return `battle:${battleId}`;
}
function stateKey(battleId: string): string {
  return `battle:${battleId}:state`;
}
function playerKey(battleId: string, playerId: string): string {
  return `battle:${battleId}:player:${playerId}`;
}
function historyKey(battleId: string): string {
  return `battle:${battleId}:history`;
}

export interface SelfPacedPayload {
  type: string;
  battleId: string;
  playerId: string;
  message?: string;
  sender?: string;
  score?: number;
  currentIndex?: number;
}

export interface ClientData {
  battleId: string;
  playerId: string;
}

class SelfPacedBattleHandler {
  private activeRooms: Map<string, Set<WebSocket>>;
  private clientRoomMap: Map<WebSocket, ClientData>;

  constructor() {
    this.activeRooms = new Map<string, Set<WebSocket>>();
    this.clientRoomMap = new Map<WebSocket, ClientData>();
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

  public async handleMessage(
    ws: WebSocket,
    payload: SelfPacedPayload,
    redisPublisher: Redis,
    redisSubscriber: Redis
  ): Promise<void> {
    const { type, battleId, playerId, message, sender, score, currentIndex } = payload;

    if (!battleId || !playerId) {
      ws.send(JSON.stringify({ error: 'battleId and playerId are required' }));
      return;
    }

    const channel = roomChannel(battleId);
    const sKey = stateKey(battleId);
    const pKey = playerKey(battleId, playerId);
    const hKey = historyKey(battleId);

    // ── ACTION A: JOIN SELF-PACED BATTLE ──
    if (type === 'JOIN_SELF_PACED_BATTLE') {
      if (!this.activeRooms.has(battleId)) {
        this.activeRooms.set(battleId, new Set<WebSocket>());
        redisSubscriber.subscribe(channel);
      }

      this.activeRooms.get(battleId)!.add(ws);
      this.clientRoomMap.set(ws, { battleId, playerId });

      // Fetch or initialize player state
      let pState = await redisPublisher.hgetall(pKey);

      if (!pState || !pState.startedAt) {
        pState = {
          currentIndex: '0',
          startedAt: String(Date.now()),
          score: '0',
          status: 'active',
        };
        await redisPublisher.hset(pKey, pState);
      }

      const history = await redisPublisher.lrange(hKey, 0, -1);

      // Return player-specific state (personal startedAt + index)
      ws.send(
        JSON.stringify({
          type: 'SELF_PACED_STATE_SYNC',
          battleId,
          playerId,
          currentIndex: parseInt(pState.currentIndex, 10),
          startedAt: parseInt(pState.startedAt, 10),
          score: parseInt(pState.score, 10),
          history: history.map((item) => JSON.parse(item)),
        })
      );
      return;
    }

    // ── ACTION B: ADVANCE INDIVIDUAL QUESTION ──
    if (type === 'ADVANCE_SELF_PACED_QUESTION') {
      const newStartedAt = Date.now();
      const newIndex = typeof currentIndex === 'number' ? currentIndex : 0;
      const newScore = typeof score === 'number' ? score : 0;

      await redisPublisher.hset(pKey, {
        currentIndex: String(newIndex),
        startedAt: String(newStartedAt),
        score: String(newScore),
      });

      // Notify the joining client of their new personal start time
      ws.send(
        JSON.stringify({
          type: 'PLAYER_QUESTION_STARTED',
          currentIndex: newIndex,
          startedAt: newStartedAt,
        })
      );

      // Broadcast updated score to all clients so room leaderboard updates live
      await redisPublisher.publish(
        channel,
        JSON.stringify({
          type: 'PLAYER_SCORE_UPDATED',
          playerId,
          sender: sender || playerId,
          score: newScore,
          currentIndex: newIndex,
        })
      );
      return;
    }

    // ── ACTION C: CHAT ──
    if (type === 'BATTLE_ACTION') {
      const eventData = JSON.stringify({
        type: 'BATTLE_ACTION',
        battleId,
        sender: sender || playerId,
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
    const clientData = this.clientRoomMap.get(ws);
    if (!clientData) return;

    const { battleId } = clientData;
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

export default new SelfPacedBattleHandler();
