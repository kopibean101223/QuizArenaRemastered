import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { WebSocketServer, WebSocket, RawData } from 'ws';
import Redis, { RedisOptions } from 'ioredis';

import roomPresenceHandler, { PresencePayload } from './handlers/RoomPresence';
import liveBattleHandler, { BattlePayload } from './handlers/LiveBattle';
import BattleRoyaleHandler, { RoyalePayload } from './handlers/BattleRoyale';
import TeamBattleHandler, { TeamBattlePayload } from './handlers/TeamBattle';
import selfPacedBattleHandler, { SelfPacedPayload } from './handlers/OwnPace';

const PORT = Number(process.env.PORT) || 8080;
const wss = new WebSocketServer({ port: PORT });

const redisConfig: string | RedisOptions = process.env.REDIS_URL
  ? process.env.REDIS_URL
  : {
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: Number(process.env.REDIS_PORT) || 6379,
    };

const redisPublisher = new Redis(redisConfig);
const redisSubscriber = new Redis(redisConfig);

// RoomPresenceHandler owns battle:{battleId} — the shared join/roster
// channel every mode rides on. Init this FIRST.
roomPresenceHandler.initSubscriber(redisSubscriber);
liveBattleHandler.registerAbandonHook(); // wires LiveBattle's Supabase close-out into presence's grace-period timer

selfPacedBattleHandler.initSubscriber(redisSubscriber);
TeamBattleHandler.initSubscriber(redisSubscriber);
BattleRoyaleHandler.initSubscriber(redisSubscriber);

wss.on('connection', (ws: WebSocket) => {
  console.log('[WS] CLIENT CONNECTED');

  ws.on('message', async (rawData: RawData) => {
    try {
      const payload = JSON.parse(rawData.toString());

      // ── PRESENCE FIRST — mode-agnostic, applies regardless of payload.mode ──
      // JOIN_BATTLE / BATTLE_ACTION are handled here for every mode. If this
      // returns false, the message wasn't a presence message and falls
      // through to whichever mode handler matches below.
      const presenceHandled = await roomPresenceHandler.handleMessage(
        ws,
        payload as PresencePayload,
        redisPublisher,
        redisSubscriber
      );
      if (presenceHandled && payload.type !== 'JOIN_BATTLE') return;

      // ── MODE-SPECIFIC ROUTING for everything else ──
      if (payload.mode === 'SELF_PACED' || payload.type?.includes('SELF_PACED')) {
        await selfPacedBattleHandler.handleMessage(
          ws,
          payload as SelfPacedPayload,
          redisPublisher,
          redisSubscriber
        );
      } else if (payload.mode === 'ROYALE' || payload.type?.includes('ROYALE')) {
        await BattleRoyaleHandler.handleMessage(
          ws,
          payload as RoyalePayload,
          redisPublisher,
          redisSubscriber
        );
      } else if (payload.mode === 'TEAM' || payload.type?.includes('TEAM')) {
        await TeamBattleHandler.handleMessage(
          ws,
          payload as TeamBattlePayload,
          redisPublisher,
          redisSubscriber
        );
      } else {
        await liveBattleHandler.handleMessage(
          ws,
          payload as BattlePayload,
          redisPublisher,
          redisSubscriber
        );
      }
    } catch (err) {
      console.error('Failed to parse WS message:', err);
    }
  });

  ws.on('close', (code, reason) => {
    console.log('[WS] CLIENT CLOSED:', { code, reason: reason.toString() });

    roomPresenceHandler.handleLeave(ws, redisSubscriber);
    selfPacedBattleHandler.handleLeave(ws, redisSubscriber);
    TeamBattleHandler.handleLeave(ws, redisSubscriber);
    BattleRoyaleHandler.handleLeave(ws, redisSubscriber);
  });

  ws.on('error', (error) => {
    console.error('[WS] CLIENT SOCKET ERROR:', error);
  });
});

console.log(`Battle WS Server running on ws://localhost:${PORT}`);