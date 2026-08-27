# Feature Brief: Real-Time & Historical Leaderboards (Multi-Mode)

## 1. Context & Architecture Rules
* **Database as Cold Storage:** The PostgreSQL database (`quiz_results`, `quiz_sessions`) is treated strictly as cold storage[cite: 1]. It is only written to once a match fully concludes via `finalizeAndSaveBattle` or `syncBattleToSupabase`[cite: 1].
* **Live Engine:** During live gameplay, all state mutations are handled in-memory using Redis and WebSockets[cite: 1].
* **Asynchronous Flow:** In Endless Mode, students progress at their own pace without a global room timer[cite: 1]. The backend tracks individual progress in Redis and broadcasts `PLAYER_SCORE_UPDATED` payloads to the WebSocket channel[cite: 1].

## 2. Problem: Handling the Two States of a Match
The professor's dashboards must seamlessly handle two entirely different temporal states without bottlenecking the database:
1. **Live State:** Monitoring active asynchronous progress in real-time.
2. **Historical State:** Viewing immutable results after the match ends, where Redis data has expired and Endless Mode risks losing its thematic "flavor" (displaying generic "Correct Answers" instead of "Stages Reached")[cite: 1].

## 3. Solution: Conditional Fetching & The "Game Dev Hack"
Update the monitoring components to conditionally handle data mapping based on the session's `status` and `mode`.

### Phase A: Live State (Status === 'ACTIVE')
1. **Hook into WebSockets:** Initialize `useBattleSocketContext` to listen for the `PLAYER_SCORE_UPDATED` broadcast[cite: 1].
2. **Mutate in Memory:** Map the incoming `playerId`, `score`, and `currentIndex` to a local `liveLeaderboard` React state[cite: 1]. Re-sort the array descending by score on every update to simulate a live ranking[cite: 1].

### Phase B: Historical State (Status === 'COMPLETED')
1. **Fetch from DB:** Bypass the WebSocket and execute a standard Supabase query to pull from the `quiz_results` table using the `session_id`.
2. **Apply the UX Hack (No Schema Changes):** Map the universal database metrics to the UI based on the specific game mode.
   * **If `mode === 'LIVE'` or `'TEAM'`:** Render standard columns for **Score**, **Accuracy**, and **Correct Answers**[cite: 1].
   * **If `mode === 'ENDLESS'`:** Render the exact same data payload, but visually rename the **Correct Answers** UI column to **Max Stage Reached**[cite: 1]. Because progression is 1:1, a student with 24 correct answers reached Stage 24[cite: 1]. This preserves the survival-mode prestige without requiring a custom `max_stage` column in PostgreSQL[cite: 1].