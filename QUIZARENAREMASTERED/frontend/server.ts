import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { WebSocketServer, WebSocket, RawData } from 'ws';
import Redis, { RedisOptions } from 'ioredis';

import roomPresenceHandler, { PresencePayload } from './handlers/RoomPresence';
import liveBattleHandler, { BattlePayload } from './handlers/LiveBattle';
import BossRaidHandler, { BossBattlePayload } from './handlers/BossRaid';
import BattleRoyaleHandler, { RoyalePayload } from './handlers/BattleRoyale';
import TeamBattleHandler, { TeamBattlePayload } from './handlers/TeamBattle';
import selfPacedBattleHandler, { SelfPacedPayload } from './handlers/OwnPace';
import bingoBattleHandler, { BingoPayload } from './handlers/BingoBattle';


const PORT = Number(process.env.PORT) || 8080;
const wss = new WebSocketServer({ port: PORT });

const redisUrl = process.env.REDIS_URL;

const redisPublisher = redisUrl ? new Redis(redisUrl, { family: 4 }) : new Redis({ host: process.env.REDIS_HOST || '127.0.0.1', port: Number(process.env.REDIS_PORT) || 6379, family: 4 });
const redisSubscriber = redisUrl ? new Redis(redisUrl, { family: 4 }) : new Redis({ host: process.env.REDIS_HOST || '127.0.0.1', port: Number(process.env.REDIS_PORT) || 6379, family: 4 });
const AMBIGUOUS_TYPES: Record<string, { TEAM?: string; ROYALE?: string; BINGO?: string }> = {
  PROF_START_BATTLE: { TEAM: 'PROF_START_TEAM', ROYALE: 'PROF_START_ROYALE', BINGO: 'PROF_START_BINGO' },
  PROF_END_BATTLE: { TEAM: 'END_TEAM_BATTLE', ROYALE: 'PROF_END_ROYALE', BINGO: 'END_BINGO_BATTLE' },
  ADVANCE_QUESTION: {},
  CHAT_MESSAGE: {},
  JOIN_BATTLE: {},
};
// RoomPresenceHandler owns battle:{battleId} — the shared join/roster
// channel every mode rides on. Init this FIRST.
roomPresenceHandler.initSubscriber(redisSubscriber);
liveBattleHandler.initSubscriber(redisSubscriber); // wires LiveBattle's Supabase close-out into presence's grace-period timer
bingoBattleHandler.initSubscriber(redisSubscriber);
BossRaidHandler.initSubscriber(redisSubscriber);
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


      if (!payload.mode && payload.battleId && AMBIGUOUS_TYPES[payload.type]) {
            const resolvedMode = roomPresenceHandler.getBattleMode(payload.battleId);
              if (resolvedMode !== 'LIVE') {
                const alias = AMBIGUOUS_TYPES[payload.type][resolvedMode];
                if (alias) payload.type = alias;
                payload.mode = resolvedMode;
            }
      }
      // ── MODE-SPECIFIC ROUTING for everything else ──
      if (payload.mode === 'SELF_PACED' || payload.type?.includes('SELF_PACED')) {
        await selfPacedBattleHandler.handleMessage(ws, payload as SelfPacedPayload, redisPublisher, redisSubscriber);
      } else if (payload.mode === 'ROYALE' || payload.type?.includes('ROYALE')) {
        await BattleRoyaleHandler.handleMessage(ws, payload as RoyalePayload, redisPublisher, redisSubscriber);
      } else if (payload.mode === 'TEAM' || payload.type?.includes('TEAM')) {
        await TeamBattleHandler.handleMessage(ws, payload as TeamBattlePayload, redisPublisher, redisSubscriber);
      } else if (payload.mode === 'BINGO' || payload.type?.includes('BINGO')) { // <--- ADD THIS BLOCK
        await bingoBattleHandler.handleMessage(ws, payload as BingoPayload, redisPublisher, redisSubscriber);
      } else if (payload.mode === "BOSSRAID" || payload.mode === "BOSS_RAID" || payload.type?.includes('BOSS')) {
        await BossRaidHandler.handleMessage(ws, payload as BossBattlePayload, redisPublisher, redisSubscriber);

      }else {
        await liveBattleHandler.handleMessage(ws, payload as BattlePayload, redisPublisher, redisSubscriber);
      }  
    } catch (err) {
      console.error('Failed to parse WS message:', err);
    }
  });

  ws.on('close', (code, reason) => {
    console.log('[WS] CLIENT CLOSED:', { code, reason: reason.toString() });
    bingoBattleHandler.handleLeave(ws, redisSubscriber);
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