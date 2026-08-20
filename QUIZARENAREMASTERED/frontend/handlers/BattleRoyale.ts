import { WebSocket } from 'ws';
import Redis from 'ioredis';
import { finalizeAndSaveBattle, PlayerResult } from '../src/lib/student/battle/battleSync';

const COMPLETED_ROOM_TTL_SECONDS = 3600;
const ACTIVE_ROOM_TTL_SECONDS = 4 * 60 * 60;

function roomChannel(battleId: string): string {
  return `battle:royale:${battleId}`;
}
function stateKey(battleId: string): string {
  return `battle:royale:${battleId}:state`;
}
function playersKey(battleId: string): string {
  return `battle:royale:${battleId}:players`;
}
// NEW: mirrors LiveBattle's `battle:{battleId}:questions` key — this is what
// was missing. Without it there was nowhere to store the professor's
// question set, and nothing for JOIN_ROYALE to hand back to late joiners.
function questionsKey(battleId: string): string {
  return `battle:royale:${battleId}:questions`;
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
  // NEW: carries the professor's question bank when starting the match,
  // exactly like BattlePayload.questions does in LiveBattle.ts.
  questions?: unknown[];
  forceReset?: boolean;
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
    const qKey = questionsKey(battleId);

    // ── JOIN ROYALE BATTLE ──
    if (type === 'JOIN_ROYALE') {
      if (!this.activeRooms.has(battleId)) {
        this.activeRooms.set(battleId, new Set<WebSocket>());
        redisSubscriber.subscribe(channel, (err) => {
          if (err) console.error(`Failed to subscribe to ${channel}`, err);
          else console.log(`Subscribed to Redis channel: ${channel}`);
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
      await redisPublisher.expire(sKey, ACTIVE_ROOM_TTL_SECONDS);

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

      // NEW: hand back whatever question set the professor already started
      // this match with, same as LiveBattle's JOIN_BATTLE does. Without
      // this, a student who joins after PROF_START_ROYALE never gets the
      // questions — they only ever saw the (unrelated) broadcast below.
      const rawQuestions = await redisPublisher.get(qKey);
      const questions = rawQuestions ? JSON.parse(rawQuestions) : [];

      // Direct reply to the joining client (not a broadcast) so it gets
      // state immediately, without waiting on another client's action.
      ws.send(
        JSON.stringify({
          type: 'ROYALE_STATE_SYNC',
          battleId,
          startingHp: Number(roomState.startingHp),
          status: roomState.status,
          players,
          questions,
        })
      );

      // Still broadcast to the room so everyone else's player list updates
      // to include the new joiner.
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

      console.log(`Client joined Battle Royale Room ${battleId}`);
      return;
    }

    // ── PROFESSOR STARTS THE ROYALE MATCH ── (NEW — mirrors LiveBattle's
    // PROF_START_BATTLE; this case did not exist before, which is the root
    // cause of Royale clients being stuck on "Waiting for questions to load…")
    if (type === 'PROF_START_ROYALE') {
      await redisPublisher.hset(sKey, { status: 'active' });
      await redisPublisher.expire(sKey, ACTIVE_ROOM_TTL_SECONDS);

      if (payload.forceReset) {
        await redisPublisher.del(pKey);
      }

      if (payload.questions && Array.isArray(payload.questions)) {
        await redisPublisher.set(qKey, JSON.stringify(payload.questions));
      }

      const rawQuestions = await redisPublisher.get(qKey);
      const questions = rawQuestions ? JSON.parse(rawQuestions) : [];

      const rawPlayers = await redisPublisher.hgetall(pKey);
      const players = Object.values(rawPlayers || {}).map((item) => JSON.parse(item));

      await redisPublisher.publish(
        channel,
        JSON.stringify({
          type: 'ROYALE_STATE_SYNC',
          battleId,
          startingHp: Number(startingHp),
          status: 'active',
          players,
          questions,
        })
      );

      // FIX: the pre-battle lobby screen (useLobbySocket) only ever joins
      // via JOIN_BATTLE, which subscribes it to the generic `battle:{battleId}`
      // channel through liveBattleHandler — it is NEVER registered with this
      // handler's own `battle:royale:{battleId}` channel, so the broadcast
      // above can never reach it no matter what message type it's looking
      // for. Without this second publish, students stay stuck on the lobby
      // screen forever even though the match has actually started.
      await redisPublisher.publish(
        `battle:${battleId}`,
        JSON.stringify({
          type: 'ROYALE_STATE_SYNC',
          battleId,
          status: 'active',
        })
      );

      console.log(`Professor started Battle Royale Room ${battleId} with ${questions.length} synchronized questions.`);
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