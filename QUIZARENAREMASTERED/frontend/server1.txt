  const { WebSocketServer, WebSocket } = require('ws');
  const Redis = require('ioredis');

  const PORT = process.env.PORT || 8080;
  const MAX_HISTORY_LIMIT = 100;

  // 1. Initialize WebSocket Server
  const wss = new WebSocketServer({ port: PORT });

  // 2. Initialize Main Redis Publisher & Dedicated Subscriber Client
  const redisPublisher = new Redis({ host: '127.0.0.1', port: 6379 });
  const redisSubscriber = new Redis({ host: '127.0.0.1', port: 6379 });

  // Tracking active rooms and client dynamic subscriptions
  const activeRooms = new Map(); // Map<battleId, Set<WebSocket>>
  const clientRoomMap = new Map(); // Map<WebSocket, battleId>

  // 3. Handle messages received from ANY subscribed Redis battle channel
  redisSubscriber.on('message', (channel, message) => {
    const battleId = channel.replace('battle:', '');
    const clientsInRoom = activeRooms.get(battleId);

    if (clientsInRoom) {
      console.log(`[Redis -> WS] [Battle ${battleId}] Broadcasting to ${clientsInRoom.size} clients`);
      clientsInRoom.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    }
  });

  // 4. WebSocket Client Connection Logic
  wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', async (rawData) => {
      try {
        const payload = JSON.parse(rawData.toString());
        const { type, battleId, message, sender } = payload;

        if (!battleId) {
          ws.send(JSON.stringify({ error: 'battleId is required for all operations' }));
          return;
        }

        // ── ACTION A: JOIN A SPECIFIC BATTLE ROOM & SYNC STATE ──
        if (type === 'JOIN_BATTLE') {
          const roomChannel = `battle:${battleId}`;

          // Track client in room state
          if (!activeRooms.has(battleId)) {
            activeRooms.set(battleId, new Set());
            redisSubscriber.subscribe(roomChannel, (err) => {
              if (err) console.error(`Failed to subscribe to ${roomChannel}`, err);
              else console.log(`Subscribed to Redis channel: ${roomChannel}`);
            });
          }

          activeRooms.get(battleId).add(ws);
          clientRoomMap.set(ws, battleId);

          // Fetch current game state for this room
          const stateKey = `battle:${battleId}:state`;
          let roomState = await redisPublisher.hgetall(stateKey);

          if (!roomState.currentIndex) {
            await redisPublisher.hset(stateKey, {
              currentIndex: 0,
              startTime: Date.now(),
            });
            roomState = { currentIndex: '0' };
          }

          // Fetch Chat/Event History
          const historyKey = `battle:${battleId}:history`;
          const history = await redisPublisher.lrange(historyKey, 0, -1);

          // Send synced room state back to reconnecting/joining client
          ws.send(
            JSON.stringify({
              type: 'ROOM_STATE_SYNC',
              battleId,
              currentIndex: parseInt(roomState.currentIndex, 10),
              history: history.map((item) => JSON.parse(item)),
            })
          );

          console.log(`Client joined Battle Room ${battleId} at question index ${roomState.currentIndex}`);
          return;
        }

            // ── ACTION B: ADVANCE QUESTION INDEX ──
            // Add a room reset event or clear Redis keys when ADVANCE_QUESTION reaches the end
    if (data.type === "ADVANCE_QUESTION") {
      const nextIndex = await redis.incr(`battle:${battleId}:currentIndex`);
      const newStartedAt = Date.now();
      await redis.set(`battle:${battleId}:startedAt`, newStartedAt);

      // If the match reaches the final question, set TTL so room auto-expires in 5 minutes
      if (data.isLastQuestion) {
        await redis.expire(`battle:${battleId}:currentIndex`, 5);
        await redis.expire(`battle:${battleId}:startedAt`, 5);
        await redis.expire(`battle:${battleId}:players`, 5);
        await redis.expire(`battle:${battleId}:chat`, 5);
      }

      await redis.publish(
        "BATTLE_CHANNEL",
        JSON.stringify({
          type: "QUESTION_ADVANCED",
          battleId,
          currentIndex: Number(nextIndex),
          startedAt: newStartedAt,
        })
      );
    }

// Optional: Reset room data on demand when starting fresh
if (data.type === "RESET_ROOM") {
  await redis.del(
    `battle:${battleId}:currentIndex`,
    `battle:${battleId}:startedAt`,
    `battle:${battleId}:players`,
    `battle:${battleId}:chat`
  );
}

        // ── ACTION C: CHAT / GAME ACTIONS ──
        if (type === 'BATTLE_ACTION') {
          const historyKey = `battle:${battleId}:history`;
          const channelName = `battle:${battleId}`;

          const eventData = JSON.stringify({
            type: 'BATTLE_ACTION',
            battleId,
            sender: sender || 'Anonymous',
            message,
            timestamp: new Date().toISOString(),
          });

          // Store event in Redis history List and trim
          await redisPublisher.rpush(historyKey, eventData);
          await redisPublisher.ltrim(historyKey, -MAX_HISTORY_LIMIT, -1);

          // Broadcast event to battle Redis Channel
          await redisPublisher.publish(channelName, eventData);
        }
      } catch (err) {
        console.error('Failed to parse or process WebSocket message:', err);
      }
    });

    ws.on('close', () => handleLeave(ws));
    ws.on('error', (err) => console.error('WebSocket error:', err));
  });

  // Clean up room subscriptions when clients disconnect
  function handleLeave(ws) {
    const battleId = clientRoomMap.get(ws);
    if (!battleId) return;

    const roomClients = activeRooms.get(battleId);
    if (roomClients) {
      roomClients.delete(ws);

      if (roomClients.size === 0) {
        activeRooms.delete(battleId);
        const roomChannel = `battle:${battleId}`;

        redisSubscriber.unsubscribe(roomChannel, (err) => {
          if (err) console.error(`Failed to unsubscribe from ${roomChannel}`, err);
          else console.log(`Unsubscribed from empty channel: ${roomChannel}`);
        });
      }
    }

    clientRoomMap.delete(ws);
    console.log(`Client left Battle Room ${battleId}`);
  }

  console.log(`Dynamic Battle WS Server running on ws://localhost:${PORT}`);  