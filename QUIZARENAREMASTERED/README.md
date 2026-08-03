# Thesis Project

A full-stack multiplayer application with Next.js, Prisma, Python, LangChain, Socket.IO, and Redis.

## Setup Instructions

### 1. Database & Cache
- Ensure local **PostgreSQL** is running on `localhost:5432`.
- Ensure local **Redis** is running on `localhost:6379`.

### 2. Frontend (Next.js)
```bash
cd frontend
npm install
npx prisma db push
npm run dev
```

### 3. AI Backend (Python)
```bash
cd ai-backend
python -m venv venv
# On Windows: venv\Scripts\activate
# On Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
python app/main.py
```
