const { WebSocketServer } = require('ws');
const Redis = require('ioredis');

const liveBattleHandler = require('./handlers/LiveBattle');
const selfPacedBattleHandler = require('./handlers/SelfPacedBattle');

const PORT = process.env.PORT || 8080;
const wss = new WebSocketServer({ port: PORT });

const redisPublisher = new Redis({ host: process.env.REDIS_HOST || '127.0.0.1', port: process.env.REDIS_PORT || 6379 });
const redisSubscriber = new Redis({ host: process.env.REDIS_HOST || '127.0.0.1', port: process.env.REDIS_PORT || 6379 });

// Initialize subscriber listeners for both handlers
liveBattleHandler.initSubscriber(redisSubscriber);
selfPacedBattleHandler.initSubscriber(redisSubscriber);

wss.on('connection', (ws) => {
  ws.on('message', async (rawData) => {
    try {
      const payload = JSON.parse(rawData.toString());

      // Route based on mode or message type
      if (payload.mode === 'SELF_PACED' || payload.type?.includes('SELF_PACED')) {
        await selfPacedBattleHandler.handleMessage(ws, payload, redisPublisher, redisSubscriber);
      } else {
        await liveBattleHandler.handleMessage(ws, payload, redisPublisher, redisSubscriber);
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

console.log(`Battle WS Server with Self-Paced support running on ws://localhost:${PORT}`);