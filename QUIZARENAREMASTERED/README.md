# QuizArena (Thesis Project)

A full-stack, game-show style quiz battle platform: students compete in
live quizzes, professors manage sections/questions and get AI-assisted
tools for content generation and answer analysis.

## Tech Stack
- **Next.js** — primary web application framework
- **Python 3.x** — AI backend microservice
- **PostgreSQL** — local data storage
- **Prisma ORM** — manages PostgreSQL queries
- **LangChain** — RAG pipeline + LLM capabilities (AI Question Generator, Solution Analyzer)
- **Socket.IO + Redis** — real-time state sync for matchmaking & live battles
- **Tailwind CSS** — UI styling and responsiveness

## Folder Structure
```
thesis-project/
├── frontend/            Next.js + Tailwind + Prisma client
│   ├── prisma/schema.prisma
│   └── src/
│       ├── app/          layout.tsx, page.tsx, globals.css
│       ├── components/   feature screens + shadcn/radix ui/
│       ├── context/      AppContext.tsx (auth + page state)
│       └── lib/          prisma.ts, socket.ts
├── ai-backend/           Python microservice
│   └── app/
│       ├── main.py       Socket.IO server entrypoint
│       ├── config.py
│       ├── rag/          LangChain chains + vectorstore (AI features)
│       └── realtime/     Socket.IO event handlers + Redis client
└── docs/                 original thesis drafts (project charter, chapters)
```

## Setup

### 1. Database & Cache
- Ensure local **PostgreSQL** is running on `localhost:5432`.
- Ensure local **Redis** is running on `localhost:6379`.

### 2. Frontend (Next.js)
```bash
cd frontend
npm install
cp .env.example .env      # set DATABASE_URL
npx prisma db push
npm run dev
```
Runs at http://localhost:3000

### 3. AI Backend (Python)
```bash
cd ai-backend
python -m venv venv
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env      # set OPENAI_API_KEY
python -m app.main
```
Runs at http://localhost:8000

## Notes on this conversion
This project started as a **Vite + React** prototype (from a Figma Make
export) with fully mocked data and no backend. It has been restructured
into the Next.js + Python stack above:

- All feature screens (`AuthScreen`, `BattleLobby`, `LiveBattle`,
  `ProfessorDashboard`, `AIQuestionGenerator`, `SolutionAnalyzer`, etc.)
  and the shadcn/radix `ui/` kit were moved as-is into
  `frontend/src/components/`.
- The app still renders as a single client page (`src/app/page.tsx`)
  that switches "pages" via `AppContext`, matching its original
  behavior. This can later be split into real Next.js routes
  (`/lobby`, `/dashboard`, etc.) if desired.
- Tailwind v4 (CSS-first config) was kept, since that's what the
  original theme/`shadcn` tokens were written for.
- `prisma/schema.prisma` was newly written, modeled on the mock data
  shapes already used in the components (`Question`, `Section`,
  `Player`/`BattleResult`, etc.) — a starting point, not final.
- `ai-backend/` is new: FastAPI + Socket.IO (Redis-backed) for
  matchmaking/live battle events, and LangChain stubs for the two AI
  features. All backend logic is stubbed with `TODO`s — no LLM calls
  or DB queries are wired up yet, since the original project had none.
