import dotenv from 'dotenv';
// Load environment variables immediately at process start
dotenv.config({ path: '.env.local' }); // Or '.env' depending on your config file name

import { WebSocketServer, WebSocket, RawData } from 'ws';
import Redis, { RedisOptions } from 'ioredis';

import liveBattleHandler, { BattlePayload } from './handlers/LiveBattle';
import selfPacedBattleHandler, { SelfPacedPayload } from './handlers/OwnPace';

const PORT = Number(process.env.PORT) || 8080;
const wss = new WebSocketServer({ port: PORT });

// Configure Redis options or connection string
const redisConfig: string | RedisOptions = process.env.REDIS_URL
  ? process.env.REDIS_URL
  : {
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: Number(process.env.REDIS_PORT) || 6379,
    };

const redisPublisher = new Redis(redisConfig);
const redisSubscriber = new Redis(redisConfig);

// Initialize subscriber listeners for both handlers
liveBattleHandler.initSubscriber(redisSubscriber);
selfPacedBattleHandler.initSubscriber(redisSubscriber);

wss.on('connection', (ws: WebSocket) => {
  ws.on('message', async (rawData: RawData) => {
    try {
      const payload = JSON.parse(rawData.toString());

      // Route based on mode or message type
      if (payload.mode === 'SELF_PACED' || payload.type?.includes('SELF_PACED')) {
        await selfPacedBattleHandler.handleMessage(
          ws,
          payload as SelfPacedPayload,
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

  ws.on('close', () => {
    liveBattleHandler.handleLeave(ws, redisSubscriber);
    selfPacedBattleHandler.handleLeave(ws, redisSubscriber);
  });
});

console.log(`Battle WS Server running on ws://localhost:${PORT}`);