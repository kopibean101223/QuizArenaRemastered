import { WebSocket } from 'ws';
import Redis from 'ioredis';
import { finalizeAndSaveBattle, PlayerResult } from '../src/lib/student/battle/battleSync';

const COMPLETED_ROOM_TTL_SECONDS = 3600;

function roomChannel(battleId: string): string {
  return `battle:royale:${battleId}`;
}
function stateKey(battleId: string): string {
  return `battle:royale:${battleId}:state`;
}
function playersKey(battleId: string): string {
  return `battle:royale:${battleId}:players`;
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
}

class BattleRoyaleHandler {
  private activeRooms: Map<string, Set<WebSocket>>;
  private clientRoomMap: Map<WebSocket, string>;

  constructor() {
    this.activeRooms = new Map<string, Set<WebSocket>>();
    this.clientRoomMap = new Map<WebSocket, string>();
  }

  public initSubscriber(redisSubscriber: Redis): void {
    redisSubscriber.on('message', (channel: string, message: string) => {
      if (!channel.startsWith('battle:royale:')) return;
      const battleId = channel.replace('battle:royale:', '');
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
    const { type, battleId, roomCode, startingHp = 3, playerData, optionKey, correctAnswer } = payload;

    if (!battleId) {
      ws.send(JSON.stringify({ error: 'battleId is required for Royale operations' }));
      return;
    }

    const channel = roomChannel(battleId);
    const sKey = stateKey(battleId);
    const pKey = playersKey(battleId);

    // ── JOIN ROYALE BATTLE ──
    if (type === 'JOIN_ROYALE') {
      if (!this.activeRooms.has(battleId)) {
        this.activeRooms.set(battleId, new Set<WebSocket>());
        redisSubscriber.subscribe(channel, (err) => {
          if (err) console.error(`Failed to subscribe to ${channel}`, err);
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
        };
        await redisPublisher.hset(sKey, roomState);
      }

      if (playerData && playerData.id) {
        const initialPlayer: RoyalePlayerData = {
          ...playerData,
          lives: Number(roomState.startingHp),
          isAlive: true,
        };
        await redisPublisher.hset(pKey, playerData.id, JSON.stringify(initialPlayer));
      }

      const rawPlayers = await redisPublisher.hgetall(pKey);
      const players = Object.values(rawPlayers || {}).map((item) => JSON.parse(item));

      await redisPublisher.publish(
        channel,
        JSON.stringify({
          type: 'ROYALE_STATE_SYNC',
          battleId,
          startingHp: Number(roomState.startingHp),
          status: roomState.status,
          players,
        })
      );
      return;
    }

    // ── SUBMIT ANSWER & PROCESS DAMAGE ──
    if (type === 'SUBMIT_ROYALE_ANSWER') {
      if (!playerData || !playerData.id) return;

      const rawPlayer = await redisPublisher.hget(pKey, playerData.id);
      if (!rawPlayer) return;

      let player: RoyalePlayerData = JSON.parse(rawPlayer);
      if (!player.isAlive) return;

      const isCorrect = optionKey === correctAnswer;
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

      // Publish damage / status update
      await redisPublisher.publish(
        channel,
        JSON.stringify({
          type: 'ROYALE_HP_UPDATED',
          battleId,
          playerId: player.id,
          lives: player.lives,
          isAlive: player.isAlive,
          players,
        })
      );

      // Check for Match End (1 or 0 survivors left)
      if (activePlayers.length <= 1 && players.length > 1) {
        await redisPublisher.hset(sKey, { status: 'completed' });
        await redisPublisher.expire(sKey, COMPLETED_ROOM_TTL_SECONDS);
        await redisPublisher.expire(pKey, COMPLETED_ROOM_TTL_SECONDS);

        await this.syncBattleToSupabase(redisPublisher, battleId, roomCode);

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
  }

  public handleLeave(ws: WebSocket, redisSubscriber: Redis): void {
    const battleId = this.clientRoomMap.get(ws);
    if (!battleId) return;

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

export default new BattleRoyaleHandler();
