import socketio
import uvicorn

from app.config import REDIS_HOST, REDIS_PORT, FRONTEND_ORIGIN
from app.realtime.events import register_game_events

# Socket.IO server, backed by Redis so state stays in sync across
# multiple backend instances (needed for the live battle / matchmaking
# real-time features).
sio = socketio.AsyncServer(
    async_mode="asgi",
    cors_allowed_origins=[FRONTEND_ORIGIN],
    client_manager=socketio.AsyncRedisManager(f"redis://{REDIS_HOST}:{REDIS_PORT}"),
)

app = socketio.ASGIApp(sio)

register_game_events(sio)


@sio.event
async def connect(sid, environ):
    print(f"Client connected: {sid}")


@sio.event
async def disconnect(sid):
    print(f"Client disconnected: {sid}")


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
