"""
Socket.IO event handlers for QuizArena's real-time features:
- Matchmaking (queueing students into a battle room)
- Live Battle (broadcasting questions, collecting answers, scoring)

This is a thesis-scope skeleton: state is kept in Redis so it can be
extended later without changing the event contract the frontend expects.
"""

from app.realtime.redis_client import redis_client

MATCHMAKING_QUEUE_KEY = "matchmaking:queue"


def register_game_events(sio):
    # ── Matchmaking ─────────────────────────────────────────────────────
    @sio.event
    async def join_matchmaking(sid, data):
        # data: { studentId, sectionId }
        redis_client.rpush(MATCHMAKING_QUEUE_KEY, sid)
        await sio.emit("matchmaking_status", {"status": "queued"}, to=sid)
        # TODO: once enough players are queued, create a Battle (see
        # prisma schema `Battle`), assign a room, and emit `match_found`.

    @sio.event
    async def leave_matchmaking(sid, data):
        redis_client.lrem(MATCHMAKING_QUEUE_KEY, 0, sid)
        await sio.emit("matchmaking_status", {"status": "cancelled"}, to=sid)

    # ── Live Battle ─────────────────────────────────────────────────────
    @sio.event
    async def join_battle(sid, data):
        # data: { battleId }
        room = f"battle:{data.get('battleId')}"
        await sio.enter_room(sid, room)
        await sio.emit("player_joined", {"sid": sid}, room=room)

    @sio.event
    async def submit_answer(sid, data):
        # data: { battleId, questionId, answer, timeTakenMs }
        room = f"battle:{data.get('battleId')}"
        # TODO: validate answer against Question.answer, compute score +
        # speed bonus, persist a BattleResult, then broadcast the update.
        await sio.emit("answer_received", {"sid": sid}, room=room)

    @sio.event
    async def next_question(sid, data):
        # data: { battleId }
        room = f"battle:{data.get('battleId')}"
        # TODO: pull the next Question for this battle's section and
        # broadcast it to the room.
        await sio.emit("question_broadcast", {}, room=room)
