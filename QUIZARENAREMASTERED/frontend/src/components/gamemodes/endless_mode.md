# ENDLESS MODE: MECHANICS, UX, & DATA FLOW
**Objective:** Survive an infinite series of questions while maximizing score through a balance of rapid recall and risk management.

---

## 1. DATA PIPELINE & QUESTION ARCHITECTURE
To make this mode work without altering the database schema, the backend and frontend must decouple the data's raw format from its mechanical execution.

### The Standard Fetch (Stages 1-4)
*   **Validation Lock:** The system verifies the selected `docId` or question bank contains a minimum of 20 unique questions. If it fails, Endless Mode cannot be initialized.
*   **The Pull:** The backend queries the `GeneratedQuestion` table, returning the standard payload (`text`, `answer`, and the full 4-item `choices` JSONB array). 
*   **The Timer Override:** The frontend completely ignores the database's static `timeLimit` (default 60s) and forces dynamic countdowns dictated by the current stage.

### The Payload Mutation (Checkpoint / Surge Data)
You do not change the database string; you manipulate the payload in transit. 
*   When fetching 10 recycled questions for a Stage 5 Checkpoint, the server-side logic intercepts the `choices` JSONB array. 
*   It isolates the correct `answer` string, randomly selects exactly *one* incorrect string from the array, and deletes the rest. 
*   The frontend receives a pristine 2-choice binary payload, ensuring zero client-side latency during the rapid-fire event.

---

## 2. THE CORE LOOP (Stages 1-4)
The baseline flow scales difficulty via mechanical pressure, testing cognitive recall under stress.

### The Adrenaline Combo System
*   **The Hook:** Score scales with speed. Answering correctly within 2 seconds builds a Combo Stack (1.1x, 1.2x, up to a hard cap of 2.0x).
*   **The Penalty:** Taking longer than 3 seconds to answer instantly resets the combo to 1.0x, even if correct. This penalizes hesitation.

### Mechanical Degradation (The Squeeze)
Introduce mechanical friction to the UX as stages progress.
*   **Time Compression:** Every stage cleared permanently reduces the base timer by 5%.
*   **Memory Check:** During the final 30% of a question's timer, the `text` prompt disappears, leaving only the answer choices. 
*   **Position Scramble:** The `choices` array elements swap positions once randomly during the countdown to prevent muscle-memory clicking.

---

## 3. THE CHECKPOINTS (Stage 5, 10, 15 Gauntlets)
Every 5th stage acts as a mechanical bottleneck using the mutated binary data.

### The Surge (Binary Rapid-Fire)
*   **Format Shift:** The UX shifts from a 4-choice format to a strict 2-choice format based on the server's mutated payload.
*   **The Payload:** 10 recycled questions the player has already seen.
*   **Sudden Death:** The frontend hard-locks the timer to 2.5 seconds per question. A single incorrect answer instantly ends the run.
*   **The Payout:** Surviving grants a massive flat point bonus and triggers the Powerup Phase.

---

## 4. ROGUELIKE PROGRESSION (Powerups)
Surviving a Checkpoint forces a strategic decision. Players select one of three powerups:
1.  **Time Dilation (Safety Net):** Once per stage, if the timer hits exactly 1 second, it freezes for 3 seconds.
2.  **Data Scrub (Clutch):** Once per stage, the system automatically removes one incorrect answer from the standard 4-choice array.
3.  **Overclock (High Risk/Reward):** Permanent 1.5x score multiplier, but permanently reduces the base timer by 1 full second for the rest of the run.

---

## 5. GAME OVER UX
*   **End State:** Failing a Checkpoint, answering a standard question incorrectly, or letting the timer hit zero ends the run.
*   **The Leaderboard Hook:** The post-game screen skips the generic "Game Over" and displays the exact point deficit between the player's final score and the player directly above them on the global leaderboard, accompanied by an immediate "Restart" action.
