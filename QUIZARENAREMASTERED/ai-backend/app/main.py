import socketio
import uvicorn
from app.config import REDIS_HOST, REDIS_PORT

sio = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins='*',
    client_manager=socketio.AsyncRedisManager(f'redis://{REDIS_HOST}:{REDIS_PORT}')
)

app = socketio.ASGIApp(sio)

@sio.event
async def connect(sid, environ):
    print(f"Client connected: {sid}")

@sio.event
async def disconnect(sid):
    print(f"Client disconnected: {sid}")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
