const { WebSocket } = require('ws');

const MAX_HISTORY_LIMIT = 100;
const COMPLETED_ROOM_TTL_SECONDS = 10;

// Helper key generators
function roomChannel(battleId) {
  return `battle:${battleId}`;
}
function stateKey(battleId) {
  return `battle:${battleId}:state`;
}
function historyKey(battleId) {
  return `battle:${battleId}:history`;
}

class LiveBattleHandler {
  constructor() {
    this.activeRooms = new Map();   // Map<battleId, Set<WebSocket>>
    this.clientRoomMap = new Map(); // Map<WebSocket, battleId>
  }

  // Bind subscriber listener to dispatch broadcasts to connected WS clients
  initSubscriber(redisSubscriber) {
    redisSubscriber.on('message', (channel, message) => {
      const battleId = channel.replace('battle:', '');
      const clientsInRoom = this.activeRooms.get(battleId);

      if (clientsInRoom) {
        console.log(`[Redis -> WS] [Battle ${battleId}] Broadcasting to ${clientsInRoom.size} clients`);
        clientsInRoom.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
      }
    });
  }

  // Handle incoming message actions
  async handleMessage(ws, payload, redisPublisher, redisSubscriber) {
    const { type, battleId, message, sender, isLastQuestion, totalQuestions, nextTimeLimit, timeLimit } = payload;

    if (!battleId) {
      ws.send(JSON.stringify({ error: 'battleId is required for all operations' }));
      return;
    }

    const channel = roomChannel(battleId);
    const sKey = stateKey(battleId);
    const hKey = historyKey(battleId);

    // ── ACTION A: JOIN A SPECIFIC BATTLE ROOM & SYNC STATE ──
    if (type === 'JOIN_BATTLE') {
      if (!this.activeRooms.has(battleId)) {
        this.activeRooms.set(battleId, new Set());
        redisSubscriber.subscribe(channel, (err) => {
          if (err) console.error(`Failed to subscribe to ${channel}`, err);
          else console.log(`Subscribed to Redis channel: ${channel}`);
        });
      }

      this.activeRooms.get(battleId).add(ws);
      this.clientRoomMap.set(ws, battleId);

      let roomState = await redisPublisher.hgetall(sKey);

      if (!roomState || !roomState.currentIndex || roomState.status === 'completed') {
        roomState = {
          currentIndex: '0',
          startedAt: String(Date.now()),
          status: 'active',
          totalQuestions: String(totalQuestions || 0),
          timeLimit: String(timeLimit || 15),
        };
        await redisPublisher.hset(sKey, roomState);
        await redisPublisher.persist(sKey).catch(() => {});
        await redisPublisher.del(hKey);
      }

      const history = await redisPublisher.lrange(hKey, 0, -1);

      ws.send(
        JSON.stringify({
          type: 'ROOM_STATE_SYNC',
          battleId,
          currentIndex: parseInt(roomState.currentIndex, 10),
          startedAt: parseInt(roomState.startedAt, 10),
          timeLimit: parseInt(roomState.timeLimit || '15', 10),
          status: roomState.status || 'active',
          history: history.map((item) => JSON.parse(item)),
        })
      );

      console.log(`Client joined Battle Room ${battleId} at question index ${roomState.currentIndex}`);
      return;
    }

    // ── ACTION B: ADVANCE QUESTION INDEX ──
    if (type === 'ADVANCE_QUESTION') {
      const nextIndex = await redisPublisher.hincrby(sKey, 'currentIndex', 1);
      const startedAt = Date.now();
      const newLimit = nextTimeLimit || 15;

      await redisPublisher.hset(sKey, { 
        startedAt, 
        timeLimit: String(newLimit) 
      });

      if (isLastQuestion) {
        await redisPublisher.hset(sKey, { status: 'completed' });
        await redisPublisher.expire(sKey, COMPLETED_ROOM_TTL_SECONDS);
        await redisPublisher.expire(hKey, COMPLETED_ROOM_TTL_SECONDS);

        await redisPublisher.publish(
          channel,
          JSON.stringify({ type: 'QUIZ_COMPLETED', battleId })
        );
      } else {
        await redisPublisher.publish(
          channel,
          JSON.stringify({
            type: 'QUESTION_ADVANCED',
            battleId,
            currentIndex: Number(nextIndex),
            startedAt,
            timeLimit: Number(newLimit),
          })
        );
      }
      return;
    }

    // ── ACTION C: RESET ROOM BACK TO QUESTION 1 ──
    if (type === 'RESET_ROOM') {
      const startedAt = Date.now();
      await redisPublisher.hset(sKey, {
        currentIndex: 0,
        startedAt,
        status: 'active',
      });
      await redisPublisher.persist(sKey).catch(() => {});
      await redisPublisher.del(hKey);

      await redisPublisher.publish(
        channel,
        JSON.stringify({ type: 'ROOM_RESET', battleId, currentIndex: 0, startedAt })
      );
      return;
    }

    // ── ACTION D: CHAT / GAME ACTIONS ──
    if (type === 'BATTLE_ACTION') {
      const eventData = JSON.stringify({
        type: 'BATTLE_ACTION',
        battleId,
        sender: sender || 'Anonymous',
        message,
        timestamp: new Date().toISOString(),
      });

      await redisPublisher.rpush(hKey, eventData);
      await redisPublisher.ltrim(hKey, -MAX_HISTORY_LIMIT, -1);
      await redisPublisher.publish(channel, eventData);
      return;
    }
  }

  // Handle client disconnection
  handleLeave(ws, redisSubscriber) {
    const battleId = this.clientRoomMap.get(ws);
    if (!battleId) return;

    const roomClients = this.activeRooms.get(battleId);
    if (roomClients) {
      roomClients.delete(ws);

      if (roomClients.size === 0) {
        this.activeRooms.delete(battleId);
        const channel = roomChannel(battleId);

        redisSubscriber.unsubscribe(channel, (err) => {
          if (err) console.error(`Failed to unsubscribe from ${channel}`, err);
          else console.log(`Unsubscribed from empty channel: ${channel}`);
        });
      }
    }

    this.clientRoomMap.delete(ws);
    console.log(`Client left Battle Room ${battleId}`);
  }
}

module.exports = new LiveBattleHandler();