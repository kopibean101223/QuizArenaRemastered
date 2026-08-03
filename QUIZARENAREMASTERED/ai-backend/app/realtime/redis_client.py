import redis

from app.config import REDIS_HOST, REDIS_PORT

# Shared Redis connection, used for:
# - Socket.IO's AsyncRedisManager (pub/sub across server instances)
# - matchmaking queue state
# - live battle room state (scores, current question, timers)
redis_client = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0, decode_responses=True)
