# QuizArena — Battle Modes Synchronization, Mechanics & Professor View Implementation Plan

## Purpose

This document is an implementation specification for the AI coding assistant working on the existing QuizArena repository.

The implementation MUST first inspect the existing codebase and then make only the changes explicitly authorized by this document.

The repository was reviewed from the packed codebase. The current implementation already contains Redis-backed battle handlers for several modes, but Boss Raid and Endless still contain important client-authoritative mechanics that can produce desynchronization.

Examples found during review:

- `StudentBossRaid.tsx` calculates boss damage in the browser using `activeStudentsCount`, `timeLeft`, and local `localBossHp`.
- `ProfBossRaid.tsx` maintains its own local boss HP, class HP, energy, and timer state.
- `StudentBossRaid.tsx` contains a local countdown and local power-up behavior.
- Boss Raid server state exists in `BossRaid.ts`, including an authoritative server timeout map, but the state model does not yet make every Boss Raid attribute authoritative.
- `StudentEndlessMode.tsx` maintains local lives, score, stage, question timer, question selection, and localStorage state.
- The existing `endless_mode.md` explicitly describes frontend-controlled dynamic countdown behavior, which conflicts with the new requirement that Endless mechanics and timers be server-authoritative.
- `SolutionAnalyzer.tsx` currently acts as a mockup launcher for professor/student game-mode previews and currently exposes only some modes.
- Battle Royale is a useful architectural reference because its implementation already follows a stronger server-authoritative pattern: Redis room state, server-owned timers, synchronized question progression, state sync on join, and client UI reacting to server events.

Relevant repository structure and existing mode files were confirmed in the packed repository. The packed file is explicitly intended for code review and AI analysis and should be treated as read-only; actual changes must be made only to original repository files.

---

# 1. NON-NEGOTIABLE SAFETY RULES

## 1.1 DO NOT TOUCH PRISMA

**NEVER run Prisma commands.**

Do not run:

- `npx prisma migrate`
- `npx prisma db push`
- `npx prisma generate`
- `npx prisma migrate dev`
- `npx prisma migrate deploy`
- any Prisma schema synchronization command
- any command that modifies or regenerates the Prisma schema/client
- any database reset command

The current Prisma schema is known to be outdated relative to the actual database and using it can cause data loss.

Do not modify `prisma/schema.prisma`.

Do not infer that a Prisma change is required just because a TypeScript type is inconvenient.

If a database change is genuinely required, **DO NOT RUN IT**.

Instead:

1. Explain exactly why it is required.
2. Provide a standalone SQL migration script only.
3. Stop there for the database portion.
4. Do not execute the SQL automatically.

## 1.2 NO DATABASE COMMANDS

Do not run database tests, migrations, resets, seeders, destructive scripts, or schema synchronization.

Do not run:

- `run_sql.js`
- database reset scripts
- migration runners
- Prisma commands
- schema push commands

If validation requires database access, explain the SQL/query that should be run manually instead.

## 1.3 NO UNAUTHORIZED FILE CHANGES

Do not modify unrelated files.

Do not refactor the entire application.

Do not replace existing battle systems wholesale.

Do not remove existing mechanics unless this document explicitly says to replace them.

Preserve existing behavior outside the requested areas.

---

# 2. IMPLEMENTATION STRATEGY

Work in this order:

1. Inspect all relevant existing code.
2. Map the existing event flow.
3. Identify duplicated client/server state.
4. Define the authoritative Redis state.
5. Implement server-side mechanics.
6. Implement synchronized websocket events.
7. Convert clients into presentation-only consumers of authoritative state.
8. Implement the hardcoded professor mockup views in `SolutionAnalyzer.tsx`.
9. Add tests/checklists without changing unrelated application behavior.
10. Run only safe non-database validation if available.
11. Report every modified file.

Do not start coding before understanding the current handlers and socket event flow.

---

# 3. CORE ARCHITECTURE RULE

## SERVER = SOURCE OF TRUTH

For Boss Raid and Endless:

**Redis/server state is authoritative.**

The browser must never decide:

- remaining authoritative time
- damage
- HP
- boss HP
- class/player HP
- score
- stage
- current question
- question progression
- power-up ownership
- power-up cooldown
- power-up activation
- power-up duration
- power-up availability
- override availability
- game completion
- timeout damage

The client may calculate only visual interpolation/presentation.

Example:

```text
SERVER:
startedAt = 1234567890000
endsAt = 1234567920000

CLIENT:
remaining = max(0, endsAt - Date.now())
```

The client may display the timer using server timestamps, but the client does NOT decide when the round ends.

---

# 4. BOSS RAID — REQUIRED FINAL DESIGN

## 4.1 Boss Raid Objective

Boss Raid is a cooperative class-vs-boss battle.

The professor controls the boss.

Students attack the boss by correctly answering the professor's questions.

The boss can damage the class through unanswered/wrong questions and professor power-ups.

---

# 5. BOSS RAID DAMAGE MODEL

## 5.1 More Students = Less Damage Per Student

The required rule is:

> The more students participating, the less damage each successful answer contributes.

Use a deterministic server-side formula.

Recommended baseline:

```text
BASE_DAMAGE = 100

damagePerCorrectAnswer =
    max(1, round(BASE_DAMAGE / activeStudentCount))
```

Examples:

| Active Students | Damage per Correct Answer |
|---:|---:|
| 1 | 100 |
| 2 | 50 |
| 4 | 25 |
| 5 | 20 |
| 10 | 10 |
| 20 | 5 |
| 50 | 2 |
| 100 | 1 |

Do not trust `activeStudentsCount` sent by the client.

The server must calculate the number of active participating students from its authoritative room state.

---

# 6. BOSS RAID — 80% QUESTION DAMAGE CAP

## 6.1 Critical Requirement

The total damage obtainable from the normal question pool must be limited to:

```text
80% of Boss Max HP
```

The remaining:

```text
20% of Boss Max HP
```

is reserved for professor power-ups, specifically the professor's Override/power-up mechanic.

Therefore:

```text
QUESTION_DAMAGE_BUDGET = bossMaxHealth * 0.80
POWERUP_DAMAGE_BUDGET = bossMaxHealth * 0.20
```

Example with:

```text
bossMaxHealth = 1000
```

Then:

```text
normal question damage budget = 800
power-up damage budget = 200
```

The question system must never allow normal successful answers to consume more than the 800 damage budget.

---

# 7. BOSS RAID — TOTAL QUESTION COUNT

The total number of normal questions must be derived from the damage model.

Do NOT simply hardcode:

```text
10 questions
```

Instead calculate:

```text
requiredQuestionCount =
    ceil(questionDamageBudget / effectiveDamagePerQuestion)
```

where:

```text
questionDamageBudget = bossMaxHealth * 0.80
```

and:

```text
effectiveDamagePerQuestion
```

must be based on the server-authoritative participant count.

Important:

If the design permits the participant count to change before the battle starts, calculate the question count when the battle is initialized.

Once the battle begins, the question damage schedule must not change unpredictably just because someone reconnects.

A late joiner may affect the active player count for future participation, but must not retroactively rewrite already committed damage budget or question count.

---

# 8. BOSS RAID — DAMAGE MUST NOT BE CLIENT-CALCULATED

Current code contains logic equivalent to:

```text
maxDamagePerRound = 100
baseHit = maxDamagePerRound / activeStudentsCount
speedMultiplier = ...
finalDmg = ...
localBossHp -= finalDmg
```

This must be removed from the authoritative gameplay path.

The client may still display:

- damage numbers
- hit animation
- slash effect
- boss shake
- screen shake

But the client must send only an action such as:

```json
{
  "type": "SUBMIT_BOSS_RAID_ANSWER",
  "battleId": "...",
  "questionIndex": 3,
  "answer": "..."
}
```

The server determines:

```text
correctness
damage
remaining boss HP
class HP consequences
streak
stagger
power-up rewards
next state
```

---

# 9. BOSS RAID — TIMER SYNCHRONIZATION

## 9.1 Required Server State

Boss Raid room state must contain enough information to reconstruct the exact current state after reconnect.

Recommended Redis fields:

```text
battle:{battleId}:state

mode
status
phase
currentIndex
currentQuestionId
questionStartedAt
questionEndsAt
questionTimeLimit
bossHp
bossMaxHp
classHp
classMaxHp
questionDamageBudget
questionDamageDealt
powerupDamageDealt
bossEnergy
bossMaxEnergy
overrideUnlocked
overrideUsed
activePowerup
powerupStartedAt
powerupEndsAt
staggerProgress
staggeredUntil
activeStudentCount
totalQuestions
version
updatedAt
```

Do not blindly use all of these if the current architecture already has equivalent fields. Reuse existing state names when practical.

---

# 10. BOSS RAID — TIMER EVENT MODEL

Use absolute timestamps.

Server emits:

```json
{
  "type": "BOSSRAID_STATE_SYNC",
  "battleId": "...",
  "currentIndex": 3,
  "questionStartedAt": 1750000000000,
  "questionEndsAt": 1750000030000,
  "timeLimit": 30,
  "bossHp": 750,
  "classHp": 925,
  "bossEnergy": 35,
  "phase": "QUESTION",
  "version": 42
}
```

The client displays:

```text
remainingMs = questionEndsAt - Date.now()
```

If the websocket disconnects, reconnecting the client requests the current room state.

The server responds with the same authoritative timestamps.

Therefore:

```text
disconnect
    ↓
reconnect
    ↓
JOIN_BATTLE
    ↓
BOSSRAID_STATE_SYNC
    ↓
client reconstructs remaining time
```

No timer reset.

No fresh 30 seconds.

No client-side "resume from where I left off."

---

# 11. BOSS RAID — QUESTION PROGRESSION

The server owns progression.

A question ends when:

1. all required answer processing is complete, or
2. the authoritative `questionEndsAt` is reached.

The server must prevent:

- duplicate answers
- answers to old questions
- answers after timeout
- duplicate damage
- duplicate question advancement
- duplicate power-up activation

Use a per-question answer/processed key in Redis.

Example:

```text
battle:{battleId}:q:{questionIndex}:answered
```

A submission should be idempotent.

---

# 12. BOSS RAID — TRUE/FALSE OVERRIDE RULE

This is mandatory.

## Normal state

The professor cannot throw True/False Override questions.

The UI may not expose the True/False throw control as usable.

## Unlock state

The professor obtains the `OVERRIDE` power-up.

Only after the server confirms:

```text
overrideUnlocked = true
```

can the professor activate Override.

## Override activation

When activated:

```text
overrideUnlocked = false
overrideActive = true
overrideStartedAt = server timestamp
overrideEndsAt = server timestamp
```

The server then permits the professor to launch a True/False question.

## Important security rule

Do NOT implement:

```text
if (overrideActive) ...
```

only in React.

The server must reject:

```text
PROF_THROW_TRUE_FALSE
```

unless the authoritative Redis state says Override is active.

If a client manually sends the event without the power-up:

```json
{
  "type": "ERROR",
  "code": "OVERRIDE_NOT_AVAILABLE"
}
```

No question should be created.

No damage should be applied.

---

# 13. BOSS RAID — POWER-UP SYSTEM

The current implementation contains client-side power-up state and professor card activation. This must become synchronized.

## 13.1 Professor power-ups

Inspect the existing `PROF_CARDS` / power card definitions and preserve their intended identities.

At minimum the current implementation indicates these professor effects:

### OVERRIDE

Purpose:

- unlock/activate special True/False attack
- consumes the Override resource when used
- enables professor-specific question type

State:

```text
overrideUnlocked
overrideActive
overrideStartedAt
overrideEndsAt
```

### TIME_SQUEEZE

Current UI behavior subtracts 6 seconds locally.

New behavior:

The server modifies the authoritative `questionEndsAt`.

Do not:

```text
setTimeLeft(prev => prev - 6)
```

as the gameplay source of truth.

Instead:

```text
questionEndsAt = questionEndsAt - 6000
```

on the server.

Broadcast the new authoritative timestamp.

### EVASION

Preserve its current intended gameplay effect after inspecting the existing implementation.

Its gameplay effect must be stored server-side and broadcast.

---

# 14. BOSS RAID — STUDENT POWER-UPS

Inspect all existing student power-up definitions before modifying behavior.

The current Boss Raid UI contains six power-up slots and cooldown state.

Do not assume that an icon/cooldown means a power-up is actually implemented.

For every student power-up, document and implement:

| Attribute | Required |
|---|---|
| id | Yes |
| display name | Yes |
| owner | Student |
| trigger condition | Yes |
| target | Self / Class / Boss |
| effect | Yes |
| duration | If applicable |
| cooldown | If applicable |
| stackable | Yes/No |
| consumed on use | Yes/No |
| server state | Yes |
| Redis event | Yes |
| client animation | Yes |
| reconnect persistence | Yes |
| invalid-use behavior | Yes |

Do not invent a completely new power-up catalog if an existing catalog already defines the intended six.

The AI assistant must inspect:

- `PowerCardActions.ts`
- `TeamPowerUpActions.ts`
- `src/components/studentONLY/PowerCards/*`
- Boss Raid-specific power-up definitions
- professor card definitions
- any shared card processor

before finalizing the mapping.

---

# 15. BOSS RAID — POWER-UP SYNCHRONIZATION CONTRACT

Every power-up activation should follow:

```text
CLIENT REQUEST
      ↓
SERVER VALIDATES OWNERSHIP
      ↓
SERVER VALIDATES AVAILABILITY
      ↓
SERVER VALIDATES COOLDOWN
      ↓
SERVER APPLIES EFFECT
      ↓
SERVER UPDATES REDIS
      ↓
SERVER INCREMENTS VERSION
      ↓
SERVER BROADCASTS POWERUP_ACTIVATED
      ↓
ALL CLIENTS UPDATE UI
```

Recommended event:

```json
{
  "type": "BOSSRAID_POWERUP_ACTIVATED",
  "battleId": "...",
  "owner": "PROFESSOR",
  "powerupId": "OVERRIDE",
  "startedAt": 1750000000000,
  "endsAt": 1750000005000,
  "version": 50
}
```

For instant effects:

```json
{
  "type": "BOSSRAID_POWERUP_RESOLVED",
  "powerupId": "TIME_SQUEEZE",
  "bossHp": 800,
  "classHp": 950,
  "questionEndsAt": 1750000024000,
  "version": 51
}
```

---

# 16. BOSS RAID — ENERGY

The current professor component has a local interval that increases energy every second.

This must not remain authoritative.

Current behavior includes a local interval effectively doing:

```text
energy += 5
```

every second.

Move energy progression to the server.

Recommended:

```text
bossEnergy
bossMaxEnergy = 100
```

Energy changes only through server-authorized events.

For example:

- correct/incorrect student action
- timeout
- professor power-up rules
- battle progression

Do not let every browser independently increment energy.

---

# 17. BOSS RAID — STAGGER

Current client logic maintains stagger progress and a local 10-second stagger timer.

Make the server authoritative.

Redis should store:

```text
staggerProgress
staggerThreshold
staggeredUntil
```

The client only renders:

```text
isStaggered = Date.now() < staggeredUntil
```

The server rejects invalid boss attacks while the boss is staggered if that is part of the existing intended mechanic.

---

# 18. BOSS RAID — RECONNECT / LATE JOIN

When a student reconnects:

1. identify the battle
2. read Redis state
3. send full `BOSSRAID_STATE_SYNC`
4. send current question if the question is still active
5. send current boss/class HP
6. send current power-up state
7. send current energy
8. send timestamps
9. send player count
10. send authoritative version

The reconnecting student must not start from default values such as:

```text
bossHp = 1000
classHp = 1000
timeLeft = 30
```

Those values are UI defaults only and must not overwrite synchronized state.

---

# 19. ENDLESS BATTLE — COMPLETE MECHANIC REPLACEMENT

The old Endless mechanic must be replaced by the new Safe Zone / Hazard Zone model.

Do not preserve conflicting timer mechanics from the old `endless_mode.md`.

---

# 20. ENDLESS — SAFE ZONE

Each question has a total server-controlled round duration.

Example:

```text
Total = 30 seconds
Safe Zone = first 20 seconds
Hazard Zone = final 10 seconds
```

During Safe Zone:

- answering correctly is safe
- full points may be awarded
- no passive timer damage occurs

The exact initial numbers may be constants, but they must be server-defined.

---

# 21. ENDLESS — HAZARD ZONE / STORM

When the safe zone ends:

```text
currentTime >= safeZoneEndsAt
```

the player enters Hazard Zone.

If the player has not answered:

```text
damage per second
```

is applied to the player's health.

Example:

```text
10 seconds in hazard
× 1 HP/sec
= 10 HP damage
```

The damage must be calculated by the server.

Do not run:

```text
setInterval(() => setLives(...))
```

as the authoritative mechanic.

---

# 22. ENDLESS — SHRINKING SAFE ZONE

As the player advances through rounds:

```text
safeZoneDuration decreases
```

This represents the shrinking zone.

Recommended model:

```text
safeZoneDuration =
    max(MIN_SAFE_ZONE_SECONDS,
        INITIAL_SAFE_ZONE_SECONDS - SHRINK_PER_STAGE * (stage - 1))
```

Example:

```text
Stage 1: 20s safe
Stage 2: 19s safe
Stage 3: 18s safe
...
```

Use constants rather than hardcoding scattered values.

The server calculates the safe/hazard boundaries.

---

# 23. ENDLESS — SERVER TIMER MODEL

For each question, store:

```text
questionStartedAt
questionEndsAt
safeZoneEndsAt
totalTimeLimitMs
safeZoneDurationMs
hazardDamagePerSecond
lastHazardDamageAt
```

The client displays:

```text
remaining = questionEndsAt - Date.now()
```

and:

```text
zone =
  now < safeZoneEndsAt
    ? SAFE
    : HAZARD
```

But only the server can:

- submit an answer
- apply damage
- end the question
- advance the stage
- eliminate the player
- grant points

---

# 24. ENDLESS — HEALTH MODEL

Use an explicit server-authoritative health representation.

If the existing game uses lives rather than continuous HP, introduce a runtime HP abstraction without requiring a Prisma schema change.

Example:

```text
hp = 100
maxHp = 100
```

Then:

```text
hazardDamage = 1 HP/sec
```

Wrong answer can use the existing intended penalty after inspection.

The important requirement is that all mutations happen in Redis/server memory backed by Redis state.

The browser cannot award itself HP.

---

# 25. ENDLESS — ANSWER FLOW

Client:

```json
{
  "type": "SUBMIT_ENDLESS_ANSWER",
  "battleId": "...",
  "questionIndex": 14,
  "answer": "..."
}
```

Server:

1. Load Redis state.
2. Confirm player exists.
3. Confirm player is alive.
4. Confirm question index matches.
5. Confirm question has not already been answered.
6. Compute authoritative current time.
7. Determine whether the answer arrived in Safe Zone or Hazard Zone.
8. Validate answer.
9. Apply score.
10. Apply combo.
11. Apply any applicable hazard consequences.
12. Mark question answered.
13. Broadcast result.
14. Advance to next question if appropriate.

---

# 26. ENDLESS — CONNECTION DROP

Redis must preserve the current state.

When the websocket drops:

```text
Redis state remains
```

When the student reconnects:

```text
JOIN_ENDLESS
    ↓
SERVER LOADS REDIS
    ↓
ENDLESS_STATE_SYNC
```

The sync must include:

```text
stage
hp
maxHp
score
combo
currentQuestion
questionIndex
questionStartedAt
questionEndsAt
safeZoneEndsAt
zone
powerups
activePowerup
powerupEndsAt
checkpoint state
status
version
```

The client reconstructs its display from these fields.

---

# 27. ENDLESS — REMOVE CLIENT AUTHORITATIVE STATE

The following existing patterns must no longer be gameplay authority:

```text
internalLives
internalScore
internalStage
questionStartTime
timeLeft
maxTime
localStorage gameplay state
frontend random question selection
frontend random question shuffling
frontend timer-driven progression
```

They may remain temporarily as display state only if necessary for UI compatibility, but they must always be overwritten by server state and cannot mutate authoritative gameplay.

In particular, do not use localStorage as a source of truth for battle state.

---

# 28. ENDLESS — QUESTION SELECTION

The current student component fetches questions directly and shuffles them locally.

Replace the gameplay path with server-owned question selection.

The server should maintain:

```text
battle:{battleId}:questions
battle:{battleId}:state
```

or the equivalent existing keys.

Question index progression must be server-controlled.

The student receives the current question from the server.

---

# 29. ENDLESS — CHECKPOINTS

Preserve the existing checkpoint concept, but make the checkpoint state authoritative.

The current implementation has:

```text
CHECKPOINT_INTERVAL = 5
```

and existing documentation describes checkpoint/surge behavior.

Do not silently delete checkpoint mechanics.

Instead:

- determine checkpoint eligibility on the server
- store checkpoint state in Redis
- send checkpoint event to client
- let student choose a power-up
- validate the selection on server
- store the selected power-up server-side
- resume the next round only through server state

---

# 30. PROFESSOR VIEWS — GOAL

Create an engaging professor spectator/control experience for:

1. Individual / Live mode
2. Team Mode
3. Battle Royale
4. Boss Raid
5. Endless Battle

The professor should not simply see a static leaderboard.

The professor UI should communicate the state of the game immediately.

Use:

- animations
- impact effects
- transitions
- screen shake
- boss hit reactions
- danger warnings
- rank movement
- player elimination effects
- progress indicators
- live event feed
- question state
- timer state
- power-up state

Animations must be presentation-only and must never control game state.

---

# 31. PROFESSOR VIEW — INDIVIDUAL MODE

Monitor:

- current question
- question number
- timer
- class/student accuracy
- correct/incorrect distribution
- response speed
- score
- current streak
- current leader
- active power-ups
- recent answer feed
- completion state

Visuals:

- large central question card
- live timer ring
- correct answer burst
- incorrect answer shake
- leaderboard movement
- answer-rate chart
- recent activity stream
- screen shake on major events

---

# 32. PROFESSOR VIEW — TEAM MODE

Team Mode must emphasize team-level competition.

Monitor:

- team standings
- team score
- team accuracy
- team member contributions
- current question
- response completion
- team advantage
- team elimination/status if applicable
- bracket/progression where applicable
- power-ups
- team streaks

Required visualization:

## Bracket

If Team Mode has bracket progression in the existing system, display it prominently.

Example:

```text
SEMIFINALS
Team A ─────┐
            ├── Team A
Team D ─────┘

Team B ─────┐
            ├── Team B
Team C ─────┘

FINAL
Team A ─────┐
            ├── CHAMPION
Team B ─────┘
```

Do not fabricate tournament rules. Inspect the existing Team Mode implementation and display the actual state supported by it.

---

# 33. PROFESSOR VIEW — BATTLE ROYALE

Battle Royale already has a stronger server-authoritative architecture.

Use it as the synchronization/reference model.

The existing implementation stores:

- room state
- starting HP
- status
- question index
- startedAt
- timeLimit
- player records
- answered sets
- questions

and has server-owned round timers.

Preserve that architecture.

Professor view should emphasize:

- remaining players
- eliminated players
- HP/lives
- current ranking
- current question
- time remaining
- answer completion
- elimination events
- power-up phase
- feedback phase
- final winner

Visual effects:

- elimination animation
- rank swap animation
- danger pulse for low HP
- final-player spotlight
- winner celebration
- round transition
- power-up reveal animation

---

# 34. PROFESSOR VIEW — BOSS RAID

Boss Raid should be the most cinematic professor view.

Main areas:

## Boss Arena

Show:

- boss entity
- boss HP
- boss max HP
- boss damage
- class HP
- current question
- timer
- stagger meter
- boss energy
- power-up state

## Student Attack Feed

Show:

```text
Alice — CORRECT — 25 DAMAGE
Bob — CORRECT — 25 DAMAGE
Charlie — WRONG — CLASS -25 HP
Dana — TIMEOUT — CLASS -25 HP
```

## Cinematic Events

Trigger presentation effects on server events:

- boss hit → boss shake
- critical hit → stronger shake
- wrong answer → class damage animation
- timeout → warning pulse
- stagger → boss stun animation
- Override → full-screen protocol animation
- Time Squeeze → timer compression animation
- Evasion → boss dodge animation
- boss near defeat → danger mode
- victory → boss defeat animation

Screen shake must be client-only visual feedback triggered by server events.

---

# 35. PROFESSOR VIEW — ENDLESS

Professor view should focus on survival rather than competition.

Monitor:

- active students
- alive/dead state
- HP
- stage
- score
- combo
- current question
- safe zone
- hazard zone
- time remaining
- damage taken
- checkpoint progression
- power-up state
- eliminated students

Recommended layout:

```text
┌───────────────────────────────────────────────┐
│ ENDLESS BATTLE                                │
│ Stage 17             SAFE 08s → STORM 10s   │
├───────────────────────────────────────────────┤
│                                               │
│             CURRENT QUESTION                  │
│                                               │
├───────────────────────────────────────────────┤
│ STUDENT SURVIVAL                              │
│                                               │
│ Alice   ████████████ 82 HP   Stage 17        │
│ Bob     ████████░░░░ 61 HP   Stage 16        │
│ Cara    ███░░░░░░░░░ 22 HP   Stage 15        │
│                                               │
├───────────────────────────────────────────────┤
│ LIVE EVENTS                                   │
│ ⚡ Alice entered Hazard Zone                  │
│ 💥 Bob took 3 HP storm damage                 │
│ 🏆 Cara reached checkpoint                    │
└───────────────────────────────────────────────┘
```

---

# 36. SOLUTION ANALYZER — HARDCODED PROFESSOR MOCKUP FIRST

The user specifically wants to review the professor views before dynamic integration.

Therefore implement the first version as a **hardcoded visual prototype** inside the existing `SolutionAnalyzer.tsx`.

Do not immediately connect the new mockup professor views to real battle state.

The purpose is review.

The mockup should provide buttons/tabs for:

- Individual
- Team
- Battle Royale
- Boss Raid
- Endless

Each mode should have realistic mock data.

The data must be clearly isolated as mock data.

Example:

```ts
const MOCK_PROFESSOR_STATE = {
  individual: {...},
  team: {...},
  royale: {...},
  bossRaid: {...},
  endless: {...}
};
```

Do not create a database dependency for the mockup.

Do not fetch live data for the prototype.

---

# 37. SOLUTION ANALYZER — DO NOT DESTROY ITS EXISTING PURPOSE

The existing `SolutionAnalyzer.tsx` currently acts as a game-mode mockup selector and renders professor/student mode previews.

Keep that purpose.

Improve the professor-side preview instead of deleting it.

The current file contains mappings similar to:

```text
prof_endless
prof_normal
prof_bingo
prof_chaos
student_endless
student_normal
student_bingo
student_chaos
```

Extend the mockup carefully to support the requested four professor battle modes without removing existing preview functionality unless it is demonstrably redundant.

Do not convert the entire component into a production battle dashboard yet.

---

# 38. EVENT CONTRACT STANDARD

Use consistent server event payloads.

Every authoritative event should ideally include:

```text
type
battleId
mode
version
serverTime
```

State-bearing events should include the relevant authoritative state.

Recommended:

```json
{
  "type": "BOSSRAID_STATE_SYNC",
  "battleId": "...",
  "mode": "BOSSRAID",
  "version": 42,
  "serverTime": 1750000000000,
  "state": {}
}
```

This helps clients detect stale/out-of-order messages.

---

# 39. VERSIONING

Add a monotonically increasing state version to Redis room state.

Example:

```text
version = 42
```

Every authoritative mutation increments it.

Clients should ignore a state update with:

```text
incomingVersion < currentVersion
```

This prevents old websocket messages from overwriting newer state.

---

# 40. IDEMPOTENCY

Answer submissions and power-up activations must be idempotent.

Use a Redis key such as:

```text
battle:{battleId}:q:{questionIndex}:answer:{userId}
```

or an equivalent existing structure.

A repeated websocket submission must not:

- deal damage twice
- grant points twice
- consume a power-up twice
- increment counters twice
- advance the question twice

---

# 41. MULTI-SERVER CONSIDERATIONS

The codebase already uses Redis channels and room state.

Do not introduce process-local gameplay state as the source of truth.

Existing maps such as:

```text
questionTimers
activeRooms
advancingBattles
```

may be useful for local scheduling, but Redis must remain authoritative.

If multiple Node server processes can handle the same battle, ensure only one logical transition wins.

Use:

- Redis locks
- atomic state/version checks
- or an equivalent existing concurrency mechanism

where necessary.

Do not assume a Node `Map` is globally shared.

---

# 42. TIMER IMPLEMENTATION REQUIREMENTS

Do not rely on:

```text
setInterval countdown
```

for gameplay.

A server may use:

```text
setTimeout(...)
```

to schedule a transition, but the actual truth is:

```text
endsAt
```

stored in Redis.

If the Node process restarts, the state must still be reconstructable from Redis.

A robust implementation should be able to inspect:

```text
endsAt - Date.now()
```

and recover the correct remaining duration.

---

# 43. CLIENT TIMER REQUIREMENTS

Client timer rendering may use:

```ts
const remainingMs = Math.max(0, endsAt - Date.now());
```

and refresh at an appropriate visual interval.

The timer reaching zero in the browser must NOT itself:

- apply damage
- submit timeout
- advance question
- award points
- change HP
- change stage

The server handles all those transitions.

---

# 44. DISCONNECT RECOVERY TESTS

Every requested mode must pass these scenarios conceptually:

### Test A — Disconnect during Safe Zone

1. Start question.
2. Disconnect at 12 seconds.
3. Wait 5 seconds.
4. Reconnect.
5. Client receives state.
6. Timer shows approximately the correct remaining time.
7. No timer reset.

### Test B — Disconnect during Hazard Zone

1. Enter Hazard Zone.
2. Disconnect.
3. Server continues damage.
4. Reconnect.
5. HP reflects server-side damage.
6. Client does not regain lost HP.

### Test C — Disconnect Boss Raid

1. Boss at 600 HP.
2. Student disconnects.
3. Boss remains at 600 HP.
4. Reconnect.
5. Student sees 600 HP.

### Test D — Duplicate Answer

Send the same answer twice.

Expected:

```text
one score mutation
one damage mutation
one answer record
```

### Test E — Invalid Override

Send True/False professor question before Override.

Expected:

```text
rejected
no question
no damage
```

### Test F — Valid Override

Acquire Override.

Activate Override.

Send True/False question.

Expected:

```text
accepted
state synchronized
all clients see Override state
```

---

# 45. BOSS RAID ACCEPTANCE CRITERIA

Boss Raid is not complete until:

- [ ] Server owns Boss Raid state.
- [ ] Redis contains authoritative boss HP.
- [ ] Redis contains authoritative class HP.
- [ ] Redis contains authoritative timer timestamps.
- [ ] Redis contains authoritative current question index.
- [ ] Redis contains authoritative question count.
- [ ] More students produce lower per-answer damage.
- [ ] Normal question damage cannot exceed 80% of boss max HP.
- [ ] Remaining 20% is reserved for power-ups.
- [ ] Question count is derived from the normal damage budget.
- [ ] Student cannot directly set boss HP.
- [ ] Student cannot directly set class HP.
- [ ] Professor cannot directly set energy.
- [ ] Client cannot advance the battle independently.
- [ ] True/False Override is unavailable without Override.
- [ ] Server rejects unauthorized Override usage.
- [ ] All power-ups are validated server-side.
- [ ] Power-up effects are synchronized.
- [ ] Power-up timers use server timestamps.
- [ ] Reconnect restores the exact current state.
- [ ] Duplicate answers do not double-apply.
- [ ] Duplicate power-up activation does not double-apply.
- [ ] State version prevents stale updates.
- [ ] Existing animations remain available as presentation effects.

---

# 46. ENDLESS ACCEPTANCE CRITERIA

- [ ] Server owns all gameplay timers.
- [ ] Redis stores question start/end timestamps.
- [ ] Redis stores Safe Zone end timestamp.
- [ ] Safe Zone exists.
- [ ] Hazard Zone exists.
- [ ] Hazard damage is server-side.
- [ ] Safe Zone shrinks as stage increases.
- [ ] Client timer cannot mutate HP.
- [ ] Client timer cannot advance question.
- [ ] Client timer cannot award points.
- [ ] Client cannot select the next question independently.
- [ ] Reconnect restores exact stage.
- [ ] Reconnect restores exact HP.
- [ ] Reconnect restores exact score.
- [ ] Reconnect restores exact question.
- [ ] Reconnect restores exact timer position.
- [ ] Reconnect restores Safe/Hazard phase.
- [ ] Checkpoint progression is server-authoritative.
- [ ] Power-up state is server-authoritative.
- [ ] Duplicate answers are idempotent.
- [ ] Dead players cannot submit answers.
- [ ] No localStorage gameplay authority remains.

---

# 47. PROFESSOR VIEW ACCEPTANCE CRITERIA

## Individual

- [ ] Current question
- [ ] Timer
- [ ] Accuracy
- [ ] Response activity
- [ ] Score
- [ ] Streak
- [ ] Live event feed
- [ ] Animations

## Team

- [ ] Team standings
- [ ] Team score
- [ ] Team accuracy
- [ ] Team members
- [ ] Bracket/progression where supported
- [ ] Live event feed
- [ ] Animations

## Battle Royale

- [ ] Remaining players
- [ ] Eliminated players
- [ ] HP
- [ ] Ranking
- [ ] Current question
- [ ] Timer
- [ ] Power-up phase
- [ ] Winner state
- [ ] Elimination animations

## Boss Raid

- [ ] Boss HP
- [ ] Class HP
- [ ] Damage feed
- [ ] Current question
- [ ] Timer
- [ ] Energy
- [ ] Override
- [ ] Stagger
- [ ] Cinematic attacks
- [ ] Screen shake

## Endless

- [ ] Stage
- [ ] Safe Zone
- [ ] Hazard Zone
- [ ] HP
- [ ] Score
- [ ] Combo
- [ ] Checkpoint
- [ ] Power-ups
- [ ] Eliminations
- [ ] Live events

---

# 48. FILES TO INSPECT BEFORE IMPLEMENTATION

The AI assistant MUST inspect the relevant existing implementation before changing anything.

Primary files:

```text
frontend/handlers/BossRaid.ts
frontend/handlers/EndlessBattle.ts
frontend/handlers/BattleRoyale.ts
frontend/handlers/TeamBattle.ts
frontend/handlers/TeamPowerUpActions.ts
frontend/handlers/PowerCardActions.ts
frontend/handlers/RoomPresence.ts
frontend/server.ts

frontend/src/components/gamemodes/BossEntity.tsx
frontend/src/components/gamemodes/ProfBossRaid.tsx
frontend/src/components/gamemodes/StudentBossRaid.tsx
frontend/src/components/gamemodes/ProfEndlessMode.tsx
frontend/src/components/gamemodes/StudentEndlessMode.tsx
frontend/src/components/gamemodes/endless_mode.md

frontend/src/components/profonly/SolutionAnalyzer.tsx
frontend/src/components/profonly/ProfessorDashboard.tsx
frontend/src/components/profonly/ProfessorLiveLobby.tsx
frontend/src/components/profonly/ProfBingoMonitor.tsx

frontend/src/components/studentONLY/PowerCards/CardCatalog.tsx
frontend/src/components/studentONLY/PowerCards/PowerCard.tsx
frontend/src/components/studentONLY/PowerCards/PowerCardGallery.tsx
frontend/src/components/studentONLY/PowerCards/PowerCardOverlay.tsx
frontend/src/components/studentONLY/PowerCards/PowerCardTray.tsx
frontend/src/components/studentONLY/PowerCards/types.ts
frontend/src/components/studentONLY/PowerCards/UsePowerDeck.tsx

frontend/src/lib/student/battle/battleSync.ts
frontend/src/lib/student/battle/useBattleConnection.ts
frontend/src/lib/student/battle/useBattleSocketProvider.tsx
```

Also inspect any imports/references to the above before changing their contracts.

---

# 49. FILES AUTHORIZED TO MODIFY

The initial implementation should be restricted to the smallest possible set of existing files required for the requested behavior.

Likely allowed files:

```text
frontend/handlers/BossRaid.ts
frontend/handlers/EndlessBattle.ts

frontend/src/components/gamemodes/ProfBossRaid.tsx
frontend/src/components/gamemodes/StudentBossRaid.tsx
frontend/src/components/gamemodes/ProfEndlessMode.tsx
frontend/src/components/gamemodes/StudentEndlessMode.tsx

frontend/src/components/profonly/SolutionAnalyzer.tsx
```

Additional files may only be modified if inspection proves they are strictly necessary to complete the requested event/state integration.

If an additional file is needed:

1. Stop before editing it.
2. Explain why.
3. Include it in the final modified-file proposal.

Do not modify unrelated files.

---

# 50. FILES THAT MUST NOT BE MODIFIED

Unless explicitly approved later:

```text
frontend/src/lib/prisma.ts
prisma/schema.prisma
frontend/alter_tables.sql
frontend/create_missing_tables.sql
frontend/run_sql.js

AI/RAG pipeline files
Celery files
RAG migration files
authentication files
unrelated game modes
unrelated UI components
database schema files
```

Do not alter the AI/RAG pipeline as part of this task.

Do not alter quiz generation.

Do not alter Solution Analyzer AI logic.

The `SolutionAnalyzer.tsx` file is only being used as the requested hardcoded professor-view prototype surface.

---

# 51. DATABASE POLICY

Prefer Redis runtime state over database schema changes.

The requested battle mechanics should be implementable without Prisma schema modification.

If persistent historical battle data requires a database field that does not currently exist:

**DO NOT IMPLEMENT A DATABASE CHANGE AUTOMATICALLY.**

Provide SQL only.

Example format:

```sql
-- MANUAL REVIEW ONLY
-- Do not execute automatically.
...
```

---

# 52. SAFE VALIDATION

Allowed:

- TypeScript static inspection
- ESLint if it does not access/mutate the database
- unit tests that mock Redis
- pure utility tests
- event-payload tests
- timer calculation tests using fake clocks
- code formatting
- type checking if it does not trigger Prisma generation

Before running any command, verify that it cannot:

- generate Prisma
- connect to the database
- mutate database data
- run migrations
- reset data

---

# 53. REQUIRED TEST MATRIX

Create or update tests only if the existing project has a safe testing structure.

## Boss Raid

```text
1 student → 100 damage
2 students → 50 damage
4 students → 25 damage
10 students → 10 damage
```

Verify the normal question damage budget never exceeds:

```text
bossMaxHp * 0.80
```

Verify the power-up budget is:

```text
bossMaxHp * 0.20
```

Verify:

```text
Override unavailable → True/False rejected
Override available → True/False accepted
```

Verify duplicate answer:

```text
damage applied exactly once
```

Verify reconnect:

```text
same bossHp
same classHp
same questionIndex
same remaining time
same power-up state
```

## Endless

Test:

```text
Safe Zone
Hazard Zone
Hazard damage
Shrinking safe zone
Question timeout
Reconnect
Duplicate answer
Dead player submission
Checkpoint
Power-up
```

---

# 54. IMPORTANT IMPLEMENTATION DETAIL — TIME

Use server epoch timestamps.

Do not synchronize countdowns by sending:

```text
timeLeft = 27
```

as the only timing value.

Prefer:

```text
serverTime
startedAt
endsAt
```

The client can compensate for network latency using the latest server timestamp.

If practical, calculate:

```text
serverOffset = serverTime - Date.now()
```

and render:

```text
remaining = endsAt - (Date.now() + serverOffset)
```

This is optional for display precision, but authoritative transitions remain server-side.

---

# 55. IMPORTANT IMPLEMENTATION DETAIL — STATE VERSION

Every server state transition should increment a version.

Example:

```text
version 10
→ answer accepted
version 11
→ power-up activated
version 12
→ timer expired
version 13
```

The professor and students should use the latest version.

This makes reconnect and out-of-order event handling much safer.

---

# 56. IMPLEMENTATION PHASES

## Phase 1 — Audit

- [ ] Read all authorized files.
- [ ] Map existing Redis keys.
- [ ] Map websocket events.
- [ ] Map existing power-ups.
- [ ] Map current timers.
- [ ] Identify duplicate state.
- [ ] Identify client-authoritative behavior.

## Phase 2 — Boss Raid Server Authority

- [ ] Redis state model
- [ ] question count
- [ ] 80/20 damage budget
- [ ] participant scaling
- [ ] server timer
- [ ] answer validation
- [ ] Override gate
- [ ] power-up state
- [ ] energy
- [ ] stagger
- [ ] reconnect
- [ ] idempotency

## Phase 3 — Boss Raid Clients

- [ ] Remove gameplay authority from local state.
- [ ] Render server state.
- [ ] Render server timestamps.
- [ ] Trigger animations from events.
- [ ] Preserve cinematic UI.

## Phase 4 — Endless Server Authority

- [ ] Redis state
- [ ] server timer
- [ ] Safe Zone
- [ ] Hazard Zone
- [ ] storm damage
- [ ] shrinking safe zone
- [ ] question progression
- [ ] checkpoints
- [ ] power-ups
- [ ] reconnect

## Phase 5 — Endless Clients

- [ ] presentation-only timer
- [ ] Safe/Hazard visual state
- [ ] HP display
- [ ] stage display
- [ ] reconnect
- [ ] remove local gameplay authority

## Phase 6 — Professor Mockups

- [ ] Individual view
- [ ] Team view
- [ ] Battle Royale view
- [ ] Boss Raid view
- [ ] Endless view
- [ ] animations
- [ ] screen shake
- [ ] event feed
- [ ] hardcoded mock state

## Phase 7 — Validation

- [ ] Type check
- [ ] safe tests
- [ ] inspect git diff
- [ ] verify only authorized files changed
- [ ] verify no Prisma commands ran
- [ ] verify no database commands ran

---

# 57. FINAL REPORT REQUIRED FROM AI ASSISTANT

After implementation, report:

## Changed Files

```text
- path/to/file
  - what changed
  - why
```

## Not Changed

Explicitly state:

```text
Prisma schema: NOT MODIFIED
Database: NOT TOUCHED
Migrations: NOT RUN
RAG pipeline: NOT MODIFIED
Unrelated modes: NOT MODIFIED
```

## Mechanics Verified

```text
Boss Raid:
- 80/20 budget: PASS/FAIL
- student scaling: PASS/FAIL
- Override gate: PASS/FAIL
- timer synchronization: PASS/FAIL
- reconnect: PASS/FAIL
- power-ups: PASS/FAIL

Endless:
- Safe Zone: PASS/FAIL
- Hazard Zone: PASS/FAIL
- shrinking zone: PASS/FAIL
- server timer: PASS/FAIL
- reconnect: PASS/FAIL
```

## Remaining Issues

List anything that could not safely be completed without database/schema changes or additional approval.

---

# 58. MASTER AI CODING PROMPT

Use the following prompt when giving this specification to the coding assistant:

> You are modifying an existing QuizArena repository.
>
> First, thoroughly inspect the existing codebase. Do not assume that the architecture described in this document is already implemented. Find the actual event flow, Redis state, websocket handlers, timers, power-up definitions, and professor/student components.
>
> Implement the requirements in this document without deleting unrelated functionality.
>
> **CRITICAL SAFETY RULE:** NEVER run Prisma commands and NEVER touch `prisma/schema.prisma`. The Prisma schema is outdated and database synchronization can cause data loss. Do not run migrations, `prisma generate`, `prisma db push`, `prisma migrate`, database reset scripts, or database mutation scripts. If a database change is genuinely required, stop and provide SQL only for manual review. Do not execute it.
>
> Do not modify unrelated files. Start with the smallest set of files necessary.
>
> The primary objective is to make Boss Raid and Endless server-authoritative using Redis and synchronized websocket events.
>
> For Boss Raid:
>
> 1. Make Redis/server the source of truth for boss HP, class HP, question index, question count, timers, energy, stagger, power-ups, Override, and battle status.
> 2. The more active students there are, the lower the damage contributed by each successful answer.
> 3. Use a server-side damage formula based on active student count.
> 4. Normal questions may consume only 80% of boss max HP.
> 5. Reserve 20% of boss max HP for professor power-ups.
> 6. Derive the normal question count from the 80% damage budget rather than hardcoding an arbitrary number.
> 7. Do not allow normal questions to exceed the 80% damage budget.
> 8. True/False questions are forbidden unless the professor has obtained and activated the Override power-up.
> 9. The server must reject unauthorized True/False Override requests.
> 10. All professor and student power-ups must be server-validated and synchronized.
> 11. All power-up durations/cooldowns must use authoritative server timestamps.
> 12. The client must not calculate authoritative damage, HP, energy, or progression.
> 13. Client timers are visual only and must derive from server timestamps.
> 14. Reconnection must restore the exact battle state from Redis.
> 15. Prevent duplicate answers and duplicate power-up activation.
>
> For Endless:
>
> 1. Replace the current timer mechanic with Safe Zone / Hazard Zone.
> 2. The first part of each question is Safe Zone.
> 3. The final part is Hazard Zone.
> 4. During Hazard Zone, unanswered players take server-authoritative damage per second.
> 5. The Safe Zone becomes shorter as stages increase.
> 6. All timers must be server-authoritative.
> 7. Store absolute timestamps in Redis rather than relying on client countdown state.
> 8. The client must never decide timeout, damage, question progression, score, HP, or stage.
> 9. Reconnect must restore stage, HP, score, question, timer, zone, checkpoint, and power-up state.
> 10. Preserve checkpoint concepts unless they conflict directly with the new server-authoritative mechanics.
> 11. Remove localStorage and local React state as sources of gameplay authority.
>
> For professor views:
>
> 1. First create a hardcoded prototype in `SolutionAnalyzer.tsx` so the professor UI can be reviewed before dynamic integration.
> 2. Provide professor mockups for Individual, Team, Battle Royale, Boss Raid, and Endless.
> 3. Make each view mode-specific.
> 4. Team Mode should emphasize team standings and bracket/progression when supported by the existing implementation.
> 5. Battle Royale should emphasize survivors, eliminations, HP, ranking, round timer, and winner.
> 6. Boss Raid should be cinematic: boss HP, class HP, damage feed, question, timer, energy, Override, stagger, animations, and screen shake.
> 7. Endless should emphasize stage, Safe/Hazard Zone, HP, score, combo, checkpoints, power-ups, and survival events.
> 8. Animations and screen shake are presentation-only and must never control gameplay.
>
> Use Battle Royale's existing server-authoritative architecture as a reference where appropriate because it already stores shared state in Redis and owns round timing.
>
> Do not blindly copy Battle Royale mechanics into Boss Raid or Endless; adapt the architecture to the required mechanics.
>
> Before editing, produce an internal file/flow audit.
>
> After editing, inspect the diff and ensure no unrelated files were changed.
>
> Do not run anything related to Prisma or database mutation.
>
> Final response must include:
>
> - files modified
> - mechanics implemented
> - event/state changes
> - tests/validation performed
> - explicit statement that Prisma/database/schema were not touched
> - any remaining blockers
>
> Most importantly: **do not remove existing functionality merely to make the new implementation easier. Enhance and synchronize the existing system.**
