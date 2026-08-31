import { WebSocket } from 'ws';
import Redis from 'ioredis';

const MAX_HISTORY_LIMIT = 100;
const ACTIVE_ROOM_TTL_SECONDS = 4 * 60 * 60;
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

export interface PresencePayload {
  type: string;
  battleId: string;
  roomCode?: string;
  userId?: string;
  sender?: string;
  message?: string;
  isJoinEvent?: boolean;
  role?: 'host' | 'student';
  totalQuestions?: number;
  timeLimit?: number;
  forceReset?: boolean;
}

/**
 * Owns the mode-agnostic lobby: connection registry on `battle:{battleId}`,
 * JOIN_BATTLE, BATTLE_ACTION (roster/chat broadcast), and the
 * host-disconnect grace period. LiveBattleHandler, TeamBattleHandler, and
 * BattleRoyaleHandler all sit on top of this instead of each maintaining
 * (or, previously, one of them silently owning on everyone else's behalf)
 * their own copy of "who's connected."
 *
 * handleMessage returns `true` if it consumed the message (JOIN_BATTLE /
 * BATTLE_ACTION) and `false` otherwise, so server.ts can still route
 * anything else to the right mode handler.
 */
class RoomPresenceHandler {
  private activeRooms = new Map<string, Set<WebSocket>>();
  private clientRoomMap = new Map<WebSocket, string>();
  private hostSockets = new Map<string, Set<WebSocket>>();
  private hostDisconnectTimers = new Map<string, NodeJS.Timeout>();
  private battleModes = new Map<string, 'LIVE' | 'TEAM' | 'ROYALE' | 'BINGO'>();  
  private onHostAbandoned?: (battleId: string) => Promise<void>;

  /** LiveBattleHandler (or whoever cares) plugs in what "abandoned room" means for it. */
  public setAbandonHook(hook: (battleId: string) => Promise<void>): void {
    this.onHostAbandoned = hook;
  }

  public getPlayerCount(battleId: string): number {
    const clients = this.activeRooms.get(battleId);
    return clients ? clients.size : 0;
  }

  public setBattleMode(battleId: string, mode: 'LIVE' | 'TEAM' | 'ROYALE' | 'BINGO' | 'BOSSRAID' | 'ENDLESS'): void {
    this.battleModes.set(battleId, mode);
  }
  public getBattleMode(battleId: string): 'LIVE' | 'TEAM' | 'ROYALE'| 'BINGO' | 'BOSSRAID' | 'ENDLESS' {
    return this.battleModes.get(battleId) || 'LIVE';
  }
  public initSubscriber(redisSubscriber: Redis): void {
    redisSubscriber.on('message', (channel: string, message: string) => {
      // Only the base battle:{battleId} channel — battle:team:{...} and
      // battle:royale:{...} are owned by their own handlers' subscribers.
      if (!channel.startsWith('battle:') || channel.split(':').length > 2) return;

      const battleId = channel.replace('battle:', '');
      const clientsInRoom = this.activeRooms.get(battleId);
      console.log(`[Presence][Redis->WS] Battle ${battleId}: broadcasting to ${clientsInRoom?.size ?? 0} clients`);
      clientsInRoom?.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) client.send(message);
      });
    });
  }

  public async handleMessage(
    ws: WebSocket,
    payload: PresencePayload,
    redisPublisher: Redis,
    redisSubscriber: Redis
  ): Promise<boolean> {
    const { type, battleId, roomCode, userId, sender, message, isJoinEvent, totalQuestions, timeLimit } = payload;
    if (!battleId) return false;

    const channel = roomChannel(battleId);
    const sKey = stateKey(battleId);
    const hKey = historyKey(battleId);

    if (type === 'JOIN_BATTLE') {
      if (!this.activeRooms.has(battleId)) {
        this.activeRooms.set(battleId, new Set<WebSocket>());
        redisSubscriber.subscribe(channel, (err) => {
          if (err) console.error(`[Presence] Failed to subscribe to ${channel}`, err);
          else console.log(`[Presence] Subscribed to Redis channel: ${channel}`);
        });
      }

      this.activeRooms.get(battleId)!.add(ws);
      this.clientRoomMap.set(ws, battleId);

      if (payload.role === 'host') {
        if (!this.hostSockets.has(battleId)) this.hostSockets.set(battleId, new Set<WebSocket>());
        this.hostSockets.get(battleId)!.add(ws);

        const pendingTimer = this.hostDisconnectTimers.get(battleId);
        if (pendingTimer) {
          clearTimeout(pendingTimer);
          this.hostDisconnectTimers.delete(battleId);
          console.log(`[Presence] Host reconnected to ${battleId} — cancelled scheduled auto-completion.`);
        }
      }

      // Seed room state if it doesn't exist yet — mode handlers (Live/Team/
      // Royale) each read/extend this same state key for their own sync
      // payloads, so presence has to make sure it exists first.
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
      await redisPublisher.expire(sKey, ACTIVE_ROOM_TTL_SECONDS);

      console.log(`[Presence] Client joined room ${battleId} (userId=${userId ?? 'n/a'}, role=${payload.role ?? 'student'})`);
      return true;
    }

    if (type === 'BATTLE_ACTION') {
      console.log('[Presence] relaying BATTLE_ACTION', { battleId, userId, sender, isJoinEvent });

      const eventData = JSON.stringify({
        type: 'BATTLE_ACTION',
        battleId,
        userId: userId ?? null,
        sender: sender || 'Anonymous',
        message,
        isJoinEvent: isJoinEvent ?? false,
        timestamp: new Date().toISOString(),
      });

      await redisPublisher.rpush(hKey, eventData);
      await redisPublisher.ltrim(hKey, -MAX_HISTORY_LIMIT, -1);
      await redisPublisher.publish(channel, eventData);
      return true;
    }

    return false;
  }

  public handleLeave(ws: WebSocket, redisSubscriber: Redis): void {
    const battleId = this.clientRoomMap.get(ws);
    if (!battleId) return;

    const roomClients = this.activeRooms.get(battleId);
    if (roomClients) {
      roomClients.delete(ws);
      if (roomClients.size === 0) {
        this.activeRooms.delete(battleId);
        this.battleModes.delete(battleId);
        const channel = roomChannel(battleId);
        redisSubscriber.unsubscribe(channel, (err) => {
          if (err) console.error(`[Presence] Failed to unsubscribe from ${channel}`, err);
        });
      }
    }

    const hostsInRoom = this.hostSockets.get(battleId);
    if (hostsInRoom?.has(ws)) {
      hostsInRoom.delete(ws);
      if (hostsInRoom.size === 0 && !this.hostDisconnectTimers.has(battleId)) {
        const timer = setTimeout(() => {
          this.hostDisconnectTimers.delete(battleId);
          this.onHostAbandoned?.(battleId).catch((err) =>
            console.error(`[Presence] abandon-hook failed for ${battleId}:`, err)
          );
        }, HOST_DISCONNECT_GRACE_MS);
        this.hostDisconnectTimers.set(battleId, timer);
        console.log(`[Presence] Host left ${battleId}. Auto-completing in ${HOST_DISCONNECT_GRACE_MS / 1000}s unless they reconnect.`);
      }
    }

    this.clientRoomMap.delete(ws);
    console.log(`[Presence] Client left room ${battleId}`);
  }
}

export default new RoomPresenceHandler();