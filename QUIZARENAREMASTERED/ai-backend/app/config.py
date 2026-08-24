import os
from dotenv import load_dotenv

load_dotenv()

REDIS_URL = os.getenv("REDIS_URL")
REDIS_HOST = os.getenv("REDIS_HOST", "127.0.0.1")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
if not REDIS_URL:
    REDIS_URL = f"redis://{REDIS_HOST}:{REDIS_PORT}/0"

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")
