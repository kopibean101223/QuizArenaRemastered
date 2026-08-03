const { WebSocketServer, WebSocket } = require('ws');
const Redis = require('ioredis');

const PORT = process.env.PORT || 8080;
const CHANNEL_NAME = 'global_chat';

// 1. Initialize WebSocket Server
const wss = new WebSocketServer({ port: PORT });

// 2. Initialize Redis Clients (Publisher & Subscriber)
// Connects to your native Windows Redis / Memurai running on localhost:6379
const redisPublisher = new Redis({ host: '127.0.0.1', port: 6379 });
const redisSubscriber = new Redis({ host: '127.0.0.1', port: 6379 });

// 3. Subscribe to the shared Redis channel
redisSubscriber.subscribe(CHANNEL_NAME, (err, count) => {
  if (err) {
    console.error('Failed to subscribe to Redis channel:', err);
  } else {
    console.log(`Subscribed to Redis channel '${CHANNEL_NAME}'. Active subscriptions: ${count}`);
  }
});

// 4. Handle incoming messages from Redis and broadcast to local WS clients
redisSubscriber.on('message', (channel, message) => {
  if (channel === CHANNEL_NAME) {
    console.log(`[Redis -> WS] Broadcasting: ${message}`);

    // Loop through all active WebSocket connections on this instance
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
});

// 5. Handle WebSocket Client Connections
wss.on('connection', (ws) => {
  console.log('Client connected to WebSocket server');

  // Receive message from WebSocket client
  ws.on('message', (data) => {
    const payload = data.toString();
    console.log(`[WS -> Redis] Publishing: ${payload}`);

    // Publish incoming client message to Redis Pub/Sub
    redisPublisher.publish(CHANNEL_NAME, payload);
  });

  ws.on('close', () => console.log('Client disconnected'));
  ws.on('error', (err) => console.error('WebSocket error:', err));
});

console.log(`WebSocket Server listening on ws://localhost:${PORT}`);