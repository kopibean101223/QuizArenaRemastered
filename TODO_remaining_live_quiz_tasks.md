# Remaining tasks for the Live Quiz adaptive/uniform logic

## Goal
Finish the professor-controlled live quiz flow so there are two clear behaviors:

1. Adaptive mode: each student receives a personalized next question based on their mastery/ability.
2. Uniform mode: all students in the same room receive the same randomized question list.

The implementation should be easy to trace and should not rely on hidden UI-only toggles.

---

## 1) Finish the room start contract for adaptive vs uniform mode

### Required work
- Ensure the professor lobby always sends a single canonical mode value when starting a live room.
- Use the same field everywhere for the runtime decision, e.g. `distributionMode: 'adaptive' | 'uniform'`.
- Persist that value in Redis room state and make sure students receive it in `PROF_START_BATTLE` and `ROOM_STATE_SYNC` messages.
- Remove any ambiguity where a room may behave as uniform in one place and adaptive in another.

### Acceptance criteria
- A room started with adaptive mode must include `distributionMode: 'adaptive'` in its broadcast payload.
- A room started with uniform mode must include `distributionMode: 'uniform'`.
- Every client path reading that payload should use the same condition.

### Files to check
- [QUIZARENAREMASTERED/frontend/handlers/LiveBattle.ts](QUIZARENAREMASTERED/frontend/handlers/LiveBattle.ts)
- [QUIZARENAREMASTERED/frontend/src/components/profonly/ProfessorLiveLobby.tsx](QUIZARENAREMASTERED/frontend/src/components/profonly/ProfessorLiveLobby.tsx)
- [QUIZARENAREMASTERED/frontend/src/lib/battle/questionDistribution.ts](QUIZARENAREMASTERED/frontend/src/lib/battle/questionDistribution.ts)

---

## 2) Keep uniform mode truly shared across all students

### Required work
- In uniform mode, all students should get the same shuffled question list from the same question bank.
- The professor should generate a single shared deck once for the room, then broadcast that deck to everyone.
- The student client should not call the adaptive API when the room is in uniform mode.
- Avoid any per-student fallback logic that accidentally reintroduces adaptive behavior in uniform mode.

### Acceptance criteria
- When `distributionMode === 'uniform'`, each student receives the same `questions` array for the same battle.
- Question order is randomized once and remains consistent across the room.
- Student answer tracking still works normally without triggering adaptive selection.

### Files to check
- [QUIZARENAREMASTERED/frontend/src/components/profonly/ProfessorLiveLobby.tsx](QUIZARENAREMASTERED/frontend/src/components/profonly/ProfessorLiveLobby.tsx)
- [QUIZARENAREMASTERED/frontend/src/lib/student/battle/useBattleSocketProvider.tsx](QUIZARENAREMASTERED/frontend/src/lib/student/battle/useBattleSocketProvider.tsx)

---

## 3) Keep adaptive mode truly individualized per student

### Required work
- In adaptive mode, each student should request their own next question using `/api/adaptive/next-question`.
- The request should include the student ID and battle ID, and the response should be the selected question object.
- The student’s answered question IDs should be used to compute the next question so progression differs by ability/mastery.
- The student should not be forced to use the uniform deck when adaptive mode is enabled.

### Acceptance criteria
- `distributionMode === 'adaptive'` triggers a per-student request for the next question.
- Two students with different mastery histories receive different next questions when appropriate.
- The adaptive flow gracefully falls back to a shared question only if the adaptive selection fails.

### Files to check
- [QUIZARENAREMASTERED/frontend/src/app/api/adaptive/next-question/route.ts](QUIZARENAREMASTERED/frontend/src/app/api/adaptive/next-question/route.ts)
- [QUIZARENAREMASTERED/frontend/src/app/api/adaptive/submit-answer/route.ts](QUIZARENAREMASTERED/frontend/src/app/api/adaptive/submit-answer/route.ts)
- [QUIZARENAREMASTERED/frontend/handlers/LiveBattle.ts](QUIZARENAREMASTERED/frontend/handlers/LiveBattle.ts)
- [QUIZARENAREMASTERED/frontend/src/lib/battle/questionDistribution.ts](QUIZARENAREMASTERED/frontend/src/lib/battle/questionDistribution.ts)

---

## 4) Fix the live battle advance flow to honor the chosen distribution mode

### Required work
- When the professor advances the question, the server should decide whether to advance the room generically or request a new adaptive question for the current student.
- The question advance event should be consistent with the room mode, not mixed between fixed deck progression and adaptive per-student progression.
- If adaptive mode is active, the next question should be resolved for the current student before it is presented.

### Acceptance criteria
- The next question event knows whether the room is adaptive or uniform.
- Uniform mode advances all students together on the same shared deck.
- Adaptive mode advances each student using their own personalized path.

### Files to check
- [QUIZARENAREMASTERED/frontend/handlers/LiveBattle.ts](QUIZARENAREMASTERED/frontend/handlers/LiveBattle.ts)
- [QUIZARENAREMASTERED/frontend/src/lib/student/battle/useBattleSocketProvider.tsx](QUIZARENAREMASTERED/frontend/src/lib/student/battle/useBattleSocketProvider.tsx)

---

## 5) Verify with a real lobby scenario

### Required work
- Test both flow states in the UI:
  - adaptive on
  - adaptive off
- Confirm the server payloads, room state, and each student’s question stream match the selected mode.
- Validate that the battle still starts correctly and the professor can end the session without leaving stale state behind.

### Acceptance criteria
- In adaptive mode, student A and student B can receive different questions.
- In uniform mode, both students see the same order.
- No stale question deck or invalid mode value remains in Redis state after session completion.

---

## 6) Clean up the build issues after the logic fix

### Current known blockers
The last build check failed because of unrelated TypeScript issues in other parts of the project. These should be fixed or isolated before the final verification can pass.

Known failing files from the latest build:
- [QUIZARENAREMASTERED/frontend/handlers/EndlessBattle.ts](QUIZARENAREMASTERED/frontend/handlers/EndlessBattle.ts)
- [QUIZARENAREMASTERED/frontend/handlers/RoomPresence.ts](QUIZARENAREMASTERED/frontend/handlers/RoomPresence.ts)
- [QUIZARENAREMASTERED/frontend/src/app/api/rag/data/route.ts](QUIZARENAREMASTERED/frontend/src/app/api/rag/data/route.ts)
- [QUIZARENAREMASTERED/frontend/src/app/api/rag/generate/route.ts](QUIZARENAREMASTERED/frontend/src/app/api/rag/generate/route.ts)
- [QUIZARENAREMASTERED/frontend/src/components/gamemodes/ProfBossRaid.tsx](QUIZARENAREMASTERED/frontend/src/components/gamemodes/ProfBossRaid.tsx)
- [QUIZARENAREMASTERED/frontend/src/components/studentONLY/BattleLobby.tsx](QUIZARENAREMASTERED/frontend/src/components/studentONLY/BattleLobby.tsx)
- [QUIZARENAREMASTERED/frontend/src/components/studentONLY/Lobby/Lobby_LiveQuiz.tsx](QUIZARENAREMASTERED/frontend/src/components/studentONLY/Lobby/Lobby_LiveQuiz.tsx)

### Acceptance criteria
- `npm run build` exits successfully in the frontend directory.
- No TypeScript errors remain for the changed live battle flow or the unrelated blockers above.

---

## 7) Final definition of done

The feature is complete only when all of the following are true:

- Professor toggle drives room behavior, not just UI state.
- Adaptive mode creates individualized progression per student.
- Uniform mode creates a single shared randomized question stream for the room.
- The live battle server and student socket agree on the same distribution mode.
- The frontend build passes cleanly.

This is the remaining work to finish the live quiz logic correctly and keep the code maintainable.
