# QuizArena — Updated Dynamic Battle Modes, Async Endless, Multi-Team Mode & Professor Monitoring Specification

## 0. Purpose

This specification updates the existing QuizArena battle architecture and professor monitoring experience.

The implementation must be **incremental**. The coding assistant must preserve working functionality and modify only the behavior explicitly authorized below.

The most important goals are:

1. **Do NOT remove or redesign the existing Boss Raid Professor View.**
2. **Battle Royale has NO Safe Zone/Hazard Zone mechanic.**
3. **Endless is NOT a truly live/shared-question quiz.** It is an asynchronous individual progression experience whose authoritative state and timer are synchronized through the server/Redis.
4. **Endless owns the Safe Zone → Hazard Zone mechanic.**
5. **Team Mode must support any practical number of teams**, determined dynamically from participant count/team size, rather than assuming exactly two teams.
6. **Individual Mode remains functionally unchanged unless needed for synchronization/monitoring consistency.**
7. **Battle Royale Professor View must be redesigned around student monitoring**, not around displaying a shared/current question.
8. **Professor monitoring views must not assume that every student is answering the same question**, because the adaptive algorithm can give different students different questions.
9. **All dynamic views must scale automatically when students join, leave, reconnect, become eliminated, or change state.**
10. **Timers, damage, HP, score, progression, eliminations, team standings, and hazard damage must be server-authoritative where applicable.**
11. Redis/server state must be treated as the authoritative synchronization layer for battle state. The existing Socket/WebSocket infrastructure should be reused rather than replaced.

This document is a specification for an AI coding assistant. **Do not implement these changes until the user explicitly approves this specification.**

---

# 1. Existing Codebase Context

The packed repository shows that QuizArena already contains separate implementations for the major modes and a Redis/WebSocket architecture.

Relevant existing files include:

```text
frontend/handlers/BattleRoyale.ts
frontend/handlers/BingoBattle.ts
frontend/handlers/BossRaid.ts
frontend/handlers/EndlessBattle.ts
frontend/handlers/LiveBattle.ts
frontend/handlers/OwnPace.ts
frontend/handlers/RoomPresence.ts
frontend/handlers/TeamBattle.ts
frontend/handlers/TeamPowerUpActions.ts

frontend/src/components/gamemodes/ProfBossRaid.tsx
frontend/src/components/gamemodes/ProfEndlessMode.tsx
frontend/src/components/gamemodes/StudentBossRaid.tsx
frontend/src/components/gamemodes/StudentEndlessMode.tsx

frontend/src/components/profonly/SolutionAnalyzer.tsx
frontend/src/components/profonly/ProfessorDashboard.tsx
frontend/src/components/profonly/ProfessorLiveLobby.tsx

frontend/src/lib/student/battle/battleSync.ts
frontend/src/lib/student/battle/useBattleConnection.ts
frontend/src/lib/student/battle/useBattleSocketProvider.tsx
```

The repository already contains Redis-backed state patterns and server-side timers in multiple battle handlers. Battle Royale should be treated as an architectural reference for authoritative synchronization where appropriate.

The packed codebase explicitly indicates that Redis state is intended to contain shared battle state such as scores, questions, and timers, and that clients should not become the gameplay authority.

---

# 2. NON-NEGOTIABLE PRESERVATION RULES

## 2.1 Boss Raid Professor View MUST NOT be discarded

The existing:

```text
frontend/src/components/gamemodes/ProfBossRaid.tsx
```

must remain.

Do NOT:

- delete it
- replace it with a new generic professor component
- redesign it into the Battle Royale monitoring layout
- remove its Boss Raid-specific UI
- remove cinematic Boss Raid presentation
- remove boss HP
- remove class HP
- remove energy
- remove Override
- remove stagger
- remove Boss Raid damage feed
- remove Boss Raid attack animations
- remove existing Boss Raid professor controls unless explicitly required by the already-approved Boss Raid synchronization specification

The existing Boss Raid Professor View is considered an **approved existing view**.

If it needs to consume more authoritative state, adapt its data source rather than replacing the UI.

The repository already contains a Boss Raid professor component with boss/class HP, energy, question and timer concepts. Preserve that experience.

---

# 3. MODE OWNERSHIP

The final mechanics must be clearly separated.

| Mode | Shared/live battle? | Safe/Hazard Zone? | Adaptive questions can differ per student? | Primary Professor Monitoring |
|---|---|---|---|---|
| Individual | No | No | Yes | Individual progress/performance |
| Team Mode | Yes/shared battle | No | Potentially yes, if existing adaptive architecture supports it | Multiple-team standings |
| Battle Royale | Yes/shared battle | **NO** | Yes/possible | Survivor/elimination monitoring |
| Boss Raid | Yes/cooperative | No | Preserve existing Boss Raid behavior | Existing Boss Raid Professor View |
| Endless | Async progression | **YES** | **Yes** | Survival/progression monitoring |

Important:

> Safe Zone and Hazard Zone belong to **Endless**. They must NOT leak into Battle Royale.

---

# 4. GLOBAL ARCHITECTURE RULE

## 4.1 Server/Redis = authoritative state

The client may render state, animate state, and calculate purely visual countdown interpolation.

The client must NOT be authoritative for:

- authoritative timer expiration
- damage
- HP
- eliminations
- score
- stage
- team score
- team membership
- question progression
- answer validity
- hazard damage
- checkpoint completion
- power-up ownership
- power-up cooldown
- battle completion

The server must validate all gameplay actions.

## 4.2 Timestamps instead of countdown authority

Store:

```text
serverTime
startedAt
endsAt
```

rather than relying only on:

```text
timeLeft: 17
```

A client may render:

```text
remaining = max(0, endsAt - adjustedClientNow)
```

but the client must never decide that the game has actually ended.

Recommended synchronization:

```text
serverOffset = serverTime - Date.now()

displayRemaining =
    max(0, endsAt - (Date.now() + serverOffset))
```

## 4.3 Versioned state

Every authoritative state transition should increment:

```text
version
```

Example:

```text
version 20
→ student answers

version 21
→ answer accepted

version 22
→ hazard damage tick

version 23
→ student eliminated
```

Clients must ignore stale state versions.

---

# 5. DYNAMIC PARTICIPANT MODEL

The system must never assume a fixed number of students.

Examples that must work:

```text
1 student
2 students
5 students
10 students
25 students
50 students
100 students
```

subject to the existing application's practical room limits.

The server must derive active participation from authoritative room state.

Do not trust:

```json
{
  "activeStudentsCount": 20
}
```

when sent by the browser.

Instead:

```text
activeStudentCount =
    count(authoritative connected/participating player records)
```

The definition of "active" must be explicit and consistent:

- joined
- participating
- not removed from the battle
- not permanently eliminated, where applicable

Disconnected players should not be silently destroyed. Preserve their server state so reconnection can recover it.

---

# 6. BATTLE ROYALE — UPDATED DESIGN

## 6.1 Core rule

Battle Royale remains a competitive survival/elimination mode.

It DOES NOT use:

```text
Safe Zone
Hazard Zone
Storm
Storm damage
```

Those mechanics belong exclusively to Endless.

If Battle Royale currently contains any Safe/Hazard/Storm logic that came from an earlier implementation, remove only the Battle Royale-specific references after confirming that they are not shared with Endless.

Do not copy Endless zone logic into Battle Royale.

---

# 7. BATTLE ROYALE — PROFESSOR VIEW

## 7.1 Design goal

The Professor View should be:

> **Interactive enough to monitor and understand the battle, but informative enough to avoid becoming a giant copy of the student screen.**

The professor does not need to see the current question because adaptive questioning means different students may be answering different questions.

Therefore the Professor View should NOT have a large:

```text
CURRENT QUESTION
```

panel.

Instead, it should focus on **battle state and student behavior**.

---

## 7.2 Recommended Battle Royale Professor layout

```text
┌─────────────────────────────────────────────────────────────┐
│ BATTLE ROYALE                         LIVE • ROUND 7         │
│ 24 Participants     13 Alive     11 Eliminated              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ SURVIVAL OVERVIEW                                           │
│                                                             │
│ 13 ALIVE       11 ELIMINATED       AVG ACCURACY 78%         │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ LIVE PARTICIPANTS                                           │
│                                                             │
│ #1 Alice       ██████████ 92 HP   1st   86%   7 answered   │
│ #2 Mark        ████████░░ 74 HP   2nd   81%   7 answered   │
│ #3 Jenny       ██████░░░░ 58 HP   3rd   77%   6 answered   │
│ ...                                                         │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ RECENT EVENTS                                               │
│                                                             │
│ ⚔ Alice gained a streak                                     │
│ 💥 Mark lost HP                                             │
│ ☠ Carlos eliminated                                         │
│ ⚡ Jenny activated power-up                                 │
│                                                             │
├───────────────────────────────┬─────────────────────────────┤
│ SELECTED STUDENT              │ BATTLE HEALTH               │
│ Alice                         │ HP 92/100                   │
│ Accuracy 86%                  │ Streak 4                    │
│ Score 840                     │ Answers 7/8                 │
│ Current difficulty: Hard      │ Status: ALIVE               │
│                               │                             │
│ [View Performance]            │ [View Event History]        │
└───────────────────────────────┴─────────────────────────────┘
```

The selected-student panel is optional and should be implemented only if it fits the existing professor dashboard architecture.

---

# 8. BATTLE ROYALE — WHAT THE PROFESSOR SHOULD SEE

Use aggregated and per-student telemetry instead of current question text.

Recommended fields:

### Battle summary

- total participants
- alive count
- eliminated count
- average accuracy
- average score
- current round/phase
- round timer
- battle status
- power-up activity
- recent eliminations

### Per student

- name
- avatar/initials
- alive/eliminated
- HP
- score
- accuracy
- answer count
- correct answer count
- streak
- current adaptive difficulty
- response activity
- power-up state
- last activity timestamp

### Events

Examples:

```text
PLAYER_JOINED
PLAYER_RECONNECTED
PLAYER_ANSWERED
PLAYER_CORRECT
PLAYER_WRONG
PLAYER_DAMAGED
PLAYER_ELIMINATED
POWERUP_USED
ROUND_STARTED
ROUND_ENDED
BATTLE_COMPLETED
```

Do not expose question text as the main monitoring surface.

---

# 9. BATTLE ROYALE — DYNAMIC UI RULES

The UI must react to room size.

For 5 students:

```text
show 5 player cards
```

For 50 students:

```text
show a compact virtualized/table-style list
```

Do not create a fixed 10-player layout.

Use:

- responsive grid
- table/list
- virtualization if necessary
- sorting
- filtering

Recommended filters:

```text
All
Alive
Eliminated
High Score
Low HP
Recent Activity
```

Sorting:

```text
Rank
HP
Score
Accuracy
Streak
Recent Activity
```

---

# 10. BATTLE ROYALE — TIMER

The battle timer must remain server-authoritative.

Use:

```text
phaseStartedAt
phaseEndsAt
serverTime
version
```

The professor timer is presentation-only.

The server determines:

```text
round ended
power-up phase ended
battle completed
```

The professor UI must update from server state/events.

---

# 11. ENDLESS — CORE CORRECTION

## 11.1 Endless is NOT truly live

Endless should NOT be treated like a shared live quiz where every student receives the same question at the same time.

Instead:

> Endless is an asynchronous, individually progressing quiz experience.

Students may be in different:

```text
question indexes
stages
difficulty levels
timers
HP states
checkpoints
```

at the same real-world moment.

However, the server remains authoritative so that a student's state is consistent across:

- browser refresh
- reconnect
- multiple tabs
- network delay
- server instances

Redis provides synchronization/persistence for active session state.

---

# 12. ENDLESS — SAFE ZONE / HAZARD ZONE

Safe/Hazard is an Endless-only mechanic.

Each question cycle has:

```text
SAFE
→ HAZARD
→ QUESTION COMPLETE
→ NEXT QUESTION
```

Example:

```text
Question starts
│
├── SAFE ZONE
│   Student can answer without storm damage.
│
├── HAZARD ZONE
│   Unanswered student receives server-authoritative damage.
│
└── Question expires
    Server evaluates timeout and advances state.
```

---

# 13. ENDLESS — HAZARD ZONE DAMAGE

Hazard damage must be server-authoritative.

The browser must never perform:

```text
hp -= 1
```

as authoritative gameplay.

Instead the server determines damage ticks.

Recommended conceptual state:

```text
hazardStartedAt
questionEndsAt
hazardDamagePerSecond
lastDamageTickAt
```

Example:

```text
hazardStartedAt = T
questionEndsAt = T + 30 seconds
hazardDamagePerSecond = 2
```

If the student has not answered:

```text
server applies 2 HP/sec
```

until:

- answer accepted
- question expires
- student dies
- battle/session completes

Use a server-side/idempotent mechanism so reconnecting cannot cause duplicate damage.

---

# 14. ENDLESS — SHRINKING SAFE ZONE

The Safe Zone should become shorter as stages increase.

Use a deterministic function.

Example conceptual configuration:

```text
Stage 1–5:
Safe = 20 sec

Stage 6–10:
Safe = 18 sec

Stage 11–15:
Safe = 16 sec

Stage 16–20:
Safe = 14 sec

Stage 21+:
Safe = 12 sec
```

Do not hardcode these exact numbers if the existing product configuration already contains a better progression.

The important requirement is:

```text
higher stage → shorter safe period
```

The exact values should be centralized in a configuration/helper rather than duplicated in React components.

---

# 15. ENDLESS — REDIS STATE

Use the existing Endless Redis key architecture where practical.

The state must contain enough information to reconstruct a student session.

Recommended state:

```text
battle:endless:{battleId}:state

mode
status
version
stage
questionIndex
questionId
questionStartedAt
safeZoneStartedAt
safeZoneEndsAt
hazardStartedAt
questionEndsAt
timeLimit
safeZoneDuration
hazardDamagePerSecond
checkpoint
score
combo
hp
maxHp
isAlive
gameOverReason
powerupState
updatedAt
```

Per-player state may remain under:

```text
battle:endless:{battleId}:players
```

or the existing equivalent.

Do not create duplicate Redis state if an equivalent structure already exists.

---

# 16. ENDLESS — ADAPTIVE QUESTION COMPATIBILITY

This is critical.

The professor must NOT assume:

```text
all students are on question 8
```

or:

```text
all students are answering the same question
```

because the adaptive algorithm can select different questions.

For example:

```text
Alice → Question A → Hard
Bob   → Question B → Medium
Cara  → Question C → Easy
```

Therefore the professor view should display:

```text
Alice — Stage 12 — Hard — 82% accuracy
Bob   — Stage 9  — Medium — 74% accuracy
Cara  — Stage 6  — Easy — 68% accuracy
```

rather than displaying the question text.

---

# 17. ENDLESS — PROFESSOR VIEW

The existing:

```text
frontend/src/components/gamemodes/ProfEndlessMode.tsx
```

should be preserved conceptually, but updated to correctly represent the Endless design.

The professor view should emphasize:

- stage
- Safe/Hazard state
- HP
- score
- combo
- checkpoint
- power-ups
- alive/dead
- time remaining
- damage received
- survival progression
- recent events

Do NOT show:

```text
CURRENT QUESTION
```

as a shared room-level question.

Instead use:

```text
STUDENT PROGRESS
```

---

# 18. ENDLESS — RECOMMENDED PROFESSOR VIEW

```text
┌─────────────────────────────────────────────────────────────┐
│ ENDLESS MONITOR                          ASYNC SESSION       │
│ 32 Active Students                                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ SESSION STATUS                                               │
│                                                             │
│ 32 ACTIVE   4 ELIMINATED   AVG STAGE 11   AVG HP 67%       │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ STUDENT SURVIVAL                                            │
│                                                             │
│ Alice   Stage 17  SAFE  ████████░░ 82 HP   Score 1240      │
│ Bob     Stage 14  HAZARD ██████░░░ 61 HP   Score 1010      │
│ Cara    Stage 11  SAFE  ████░░░░░░ 44 HP   Score 820       │
│ Dana    Stage 7   DEAD  ░░░░░░░░░░  0 HP   Score 430       │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ LIVE EVENTS                                                 │
│                                                             │
│ ⚠ Bob entered Hazard Zone                                   │
│ 💥 Bob received 2 hazard damage                             │
│ 🏆 Alice reached Stage 17                                   │
│ ☠ Dana was eliminated                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

# 19. ENDLESS — PROFESSOR INTERACTION

Useful interactions:

### Student selection

Clicking a student opens:

```text
Student Details
- Stage
- HP
- Score
- Accuracy
- Combo
- Correct / Total
- Current adaptive difficulty
- Checkpoint
- Power-ups
- Recent events
- Last activity
```

Again, do not require the professor to see the student's question text.

### Filters

```text
All
Alive
Hazard
Safe
Low HP
Highest Stage
Recently Active
Eliminated
```

### Sort

```text
Stage
HP
Score
Accuracy
Last Activity
```

This makes the view useful even when there are dozens of students.

---

# 20. ENDLESS — TIMER SYNCHRONIZATION

A student may disconnect for 10 seconds and reconnect.

The server must return:

```text
stage
hp
score
questionIndex
safeZoneEndsAt
questionEndsAt
zone
version
```

The student UI reconstructs the remaining time.

Example:

```text
serverTime = 12:00:10
questionEndsAt = 12:00:25

client reconnects at 12:00:18

remaining = approximately 7 seconds
```

The client must NOT reset the timer to 30 seconds.

---

# 21. ENDLESS — RECONNECTION

On:

```text
JOIN_BATTLE
RECONNECT
```

the server must restore:

```text
stage
HP
score
combo
question index
question assignment
zone
safe timer
hazard timer
checkpoint
power-ups
alive/dead state
version
```

The existing Endless implementation already contains Redis state synchronization concepts; extend the existing flow instead of creating a second state system.

---

# 22. ENDLESS — DUPLICATE ANSWERS

Each answer submission must have an idempotency mechanism.

Recommended:

```text
battle:endless:{battleId}:q:{questionIndex}:answered:{studentId}
```

or an equivalent existing key.

The same answer must not:

- award score twice
- apply damage twice
- advance twice
- grant a checkpoint twice
- trigger power-up rewards twice

---

# 23. ENDLESS — DEAD STUDENTS

Once:

```text
isAlive = false
```

the server must reject further gameplay submissions.

A dead student may still:

- reconnect
- view results
- view history

but cannot continue answering unless the existing product explicitly supports a revival mechanic.

---

# 24. TEAM MODE — MULTIPLE TEAMS

## 24.1 Core correction

Team Mode must NOT assume:

```text
Team A vs Team B
```

The number of teams must be dynamic.

Example with team size = 4:

```text
8 students
→ 2 teams

12 students
→ 3 teams

16 students
→ 4 teams

20 students
→ 5 teams
```

The exact balancing policy must account for the actual number of participants.

---

# 25. TEAM MODE — TEAM FORMATION

Team formation should use:

```text
participantCount
configuredTeamSize
```

Conceptually:

```text
teamCount = ceil(participantCount / configuredTeamSize)
```

with safeguards for:

- minimum 2 teams for a competitive battle
- maximum room/team limits already supported by the application
- balancing team sizes as evenly as possible

Example:

```text
10 students
team size target = 4

Team 1 = 4
Team 2 = 3
Team 3 = 3
```

Do NOT create:

```text
Team 1 = 4
Team 2 = 4
Team 3 = 2
```

if a more balanced assignment is possible.

The exact assignment strategy can use deterministic round-robin/shuffle logic, but it must be server-authoritative.

---

# 26. TEAM MODE — DYNAMIC TEAM STATE

The existing TeamBattle implementation already has Redis concepts such as:

```text
battle:team:{battleId}:teams
battle:team:{battleId}:groups
battle:team:{battleId}:teamSize
battle:team:{battleId}:leaderboard
```

Reuse these structures where possible.

The server should maintain:

```text
teams[]
```

where every team contains:

```text
teamId
teamName
members[]
score
accuracy
correctAnswers
totalAnswers
alive/active state
rank
```

Do not use fixed variables such as:

```text
teamA
teamB
```

as the authoritative model.

---

# 27. TEAM MODE — PROFESSOR VIEW

The professor view must automatically render N teams.

Example:

```text
┌─────────────────────────────────────────────────────────────┐
│ TEAM BATTLE                             5 TEAMS • 20 PLAYERS │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ 1. TEAM PHOENIX      820 pts   84%   4/4 active             │
│ 2. TEAM TITANS       780 pts   81%   4/4 active             │
│ 3. TEAM NOVA         710 pts   76%   4/4 active             │
│ 4. TEAM ECHO         650 pts   72%   4/4 active             │
│ 5. TEAM ORBIT        590 pts   69%   4/4 active             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ TEAM ACTIVITY                                               │
│                                                             │
│ Phoenix answered correctly                                   │
│ Titans gained a streak                                       │
│ Nova lost a member connection                                │
│ Echo activated power-up                                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

For 3 teams:

```text
render 3
```

For 8 teams:

```text
render 8
```

No hardcoded two-team UI.

---

# 28. TEAM MODE — MULTI-TEAM RANKING

Rank teams by the existing scoring system.

Do not calculate final standings solely in React.

Server sends:

```text
rank
score
accuracy
memberCount
activeMemberCount
```

The client only renders.

Ties must use the existing scoring/tie-breaking policy where one exists. If no policy exists, do not silently invent a competitive rule; document it for approval.

---

# 29. TEAM MODE — DYNAMIC JOIN/LEAVE

If students join before the battle starts:

```text
recalculate team allocation
```

if the existing lobby permits dynamic team formation.

After battle start:

> Do not reshuffle active teams merely because someone reconnects or disconnects.

A reconnecting student must return to the same team.

A disconnect must not create a new team.

A late joiner should follow the existing late-join policy. If none exists, implement the safest behavior without rewriting already-started team assignments and document the behavior.

---

# 30. INDIVIDUAL MODE

Individual Mode is considered good and should not receive unnecessary redesign.

Preserve:

- individual progression
- individual scoring
- adaptive question behavior
- existing student UX

Only make changes required for:

- shared synchronization infrastructure
- professor monitoring compatibility
- bug fixes caused by the updated architecture

Do not add Team Mode mechanics to Individual Mode.

---

# 31. PROFESSOR MONITORING — ADAPTIVE QUESTION PRINCIPLE

This is a global rule.

Because the adaptive algorithm may assign different questions to different students, professor monitoring must not rely on a single shared question.

Bad:

```text
CURRENT QUESTION
What is a loop?
```

when:

```text
Alice → loops question
Bob → arrays question
Cara → functions question
```

Better:

```text
RESPONSE ACTIVITY

Alice — Answered — Correct — Hard
Bob   — Answered — Wrong   — Medium
Cara  — Thinking — Easy
```

or:

```text
STUDENT PERFORMANCE

Alice
Stage 12
Difficulty: Hard
Accuracy: 88%
Last response: 3s ago

Bob
Stage 9
Difficulty: Medium
Accuracy: 74%
Last response: 8s ago
```

---

# 32. WHAT TO DISPLAY INSTEAD OF CURRENT QUESTIONS

Use these monitoring abstractions:

## A. Response Activity

```text
Answered
Correct
Incorrect
Timed out
Pending
```

## B. Difficulty Distribution

```text
Easy: 8
Medium: 14
Hard: 10
```

## C. Performance Distribution

```text
Accuracy
Score
Streak
Response speed
```

## D. Progress Distribution

```text
Stage 1–5: 4 students
Stage 6–10: 12 students
Stage 11–15: 10 students
Stage 16+: 6 students
```

## E. Risk Indicators

```text
Low HP
Repeated wrong answers
Long inactivity
Hazard exposure
Recent elimination
```

This is more useful for the professor than seeing question text.

---

# 33. PROFESSOR VIEW — DYNAMIC DATA CONTRACT

Prefer a normalized monitoring payload.

Example:

```ts
interface ProfessorPlayerSnapshot {
  id: string;
  name: string;
  avatar?: string;

  status: 'ACTIVE' | 'ELIMINATED' | 'DISCONNECTED' | 'COMPLETED';

  score: number;
  accuracy: number;

  correctAnswers: number;
  totalAnswers: number;

  streak: number;

  hp?: number;
  maxHp?: number;

  stage?: number;

  difficulty?: 'Easy' | 'Medium' | 'Hard';

  zone?: 'SAFE' | 'HAZARD';

  teamId?: string | number;

  lastActivityAt?: number;

  powerUps?: unknown[];
}
```

Do not force every mode to populate every property.

---

# 34. PROFESSOR EVENT STREAM

A normalized event stream makes monitoring scalable.

Example:

```ts
interface ProfessorBattleEvent {
  id: string;
  type:
    | 'PLAYER_JOINED'
    | 'PLAYER_RECONNECTED'
    | 'PLAYER_ANSWERED'
    | 'PLAYER_CORRECT'
    | 'PLAYER_WRONG'
    | 'PLAYER_TIMEOUT'
    | 'PLAYER_DAMAGED'
    | 'PLAYER_ELIMINATED'
    | 'TEAM_SCORE_CHANGED'
    | 'POWERUP_USED'
    | 'ZONE_CHANGED'
    | 'CHECKPOINT_REACHED'
    | 'BATTLE_STARTED'
    | 'BATTLE_COMPLETED';

  battleId: string;
  playerId?: string;
  teamId?: string | number;

  timestamp: number;

  metadata?: Record<string, unknown>;
}
```

Professor UI can consume the event feed without needing the question itself.

---

# 35. DYNAMIC SCALING REQUIREMENTS

The implementation must work dynamically when:

```text
1 student joins
→ view updates

5 students join
→ view updates

20 students join
→ view updates

50 students join
→ view remains usable

student disconnects
→ status updates

student reconnects
→ exact state restored

student eliminated
→ moved to eliminated state

student changes stage
→ professor updates

team count changes before battle start
→ team layout updates
```

Never rely on:

```text
DEFAULT_STUDENTS
```

for production state.

Demo/default data may remain only where it is explicitly used as a visual prototype and is not used as gameplay authority.

---

# 36. SOCKET/REDIS EVENT PRINCIPLES

Use the existing Socket/WebSocket event system.

Every authoritative update should conceptually follow:

```text
Student Action
      ↓
Server validates
      ↓
Redis transaction/state update
      ↓
version++
      ↓
Publish event
      ↓
All relevant clients receive update
      ↓
Professor/student UI renders state
```

Never:

```text
Student
 ↓
local React state
 ↓
Professor somehow guesses state
```

---

# 37. REDIS CONCURRENCY

When multiple students answer at nearly the same time, the server must handle concurrency safely.

Example:

```text
Alice submits at T
Bob submits at T+1ms
Cara submits at T+2ms
```

The server must prevent:

- duplicate score
- duplicate damage
- duplicate elimination
- double question advancement
- lost updates

Use atomic Redis operations, transactions, locks, or another existing safe mechanism where required.

Do not introduce a global process-local lock as the only synchronization mechanism if the app may run multiple server instances.

---

# 38. QUESTION OWNERSHIP

For adaptive modes:

```text
studentId → question assignment
```

must be respected.

Do not assume:

```text
battleId → one current question
```

for Endless or other adaptive individual progression.

If a shared question exists in a specific mode, retain that mode's semantics.

The professor monitoring layer should be mode-aware.

---

# 39. BOSS RAID — DO NOT REGRESS

The existing Boss Raid design must remain.

Where the existing approved Boss Raid architecture already requires:

- server-authoritative boss HP
- class HP
- damage scaling
- question damage budget
- professor power-ups
- Override
- stagger
- server timer
- reconnect state
- duplicate-answer protection

those mechanics remain.

Do not rewrite Boss Raid simply to make it look like the other modes.

The existing Boss Raid Professor View remains the canonical Boss Raid professor experience.

---

# 40. FILE AUDIT BEFORE IMPLEMENTATION

Before changing code, the AI assistant MUST inspect:

```text
frontend/handlers/BattleRoyale.ts
frontend/handlers/BossRaid.ts
frontend/handlers/EndlessBattle.ts
frontend/handlers/TeamBattle.ts
frontend/handlers/TeamPowerUpActions.ts
frontend/handlers/PowerCardActions.ts
frontend/handlers/RoomPresence.ts
frontend/server.ts

frontend/src/components/gamemodes/ProfBossRaid.tsx
frontend/src/components/gamemodes/ProfEndlessMode.tsx
frontend/src/components/gamemodes/StudentBossRaid.tsx
frontend/src/components/gamemodes/StudentEndlessMode.tsx
frontend/src/components/gamemodes/endless_mode.md

frontend/src/components/profonly/SolutionAnalyzer.tsx
frontend/src/components/profonly/ProfessorDashboard.tsx
frontend/src/components/profonly/ProfessorLiveLobby.tsx

frontend/src/components/studentONLY/Battle_BattleRoyale.tsx
frontend/src/components/studentONLY/Battle_TeamMode.tsx

frontend/src/lib/student/battle/battleSync.ts
frontend/src/lib/student/battle/useBattleConnection.ts
frontend/src/lib/student/battle/useBattleSocketProvider.tsx
```

Also inspect all imports/references before modifying shared contracts.

---

# 41. IMPLEMENTATION PHASES

## Phase 0 — Approval

Do not modify production code before this specification is approved.

---

## Phase 1 — Audit

Create an internal audit:

```text
Mode
Current handler
Redis keys
WebSocket events
Timer authority
Question authority
Damage authority
Professor component
Student component
Known client-authoritative state
```

Do not code yet during this audit.

---

## Phase 2 — Battle Royale cleanup

Implement:

- no Safe Zone
- no Hazard Zone
- no storm damage
- server-authoritative round/timer behavior
- dynamic participant monitoring
- professor monitoring view
- no shared current-question dependency
- responsive student list
- event feed
- selected-student monitoring if feasible

Do not modify Boss Raid.

---

## Phase 3 — Endless architecture

Implement:

- async semantics
- per-student progression
- Redis-authoritative state
- absolute timestamps
- Safe Zone
- Hazard Zone
- server hazard damage
- shrinking Safe Zone
- timeout handling
- reconnect restoration
- duplicate-answer protection
- dead-player rejection
- checkpoint persistence
- power-up persistence

Do not turn Endless into a shared live quiz.

---

## Phase 4 — Endless student UI

Update:

- timer rendering
- Safe/Hazard visuals
- HP
- stage
- score
- checkpoint
- reconnect behavior

The UI must render server state.

---

## Phase 5 — Endless professor monitoring

Implement:

- async session label
- active students
- stage distribution
- Safe/Hazard status
- HP
- score
- combo
- checkpoints
- power-ups
- damage events
- eliminations
- selected-student detail
- filters/sorting

Do not display a room-level current question.

---

## Phase 6 — Multi-team Team Mode

Implement:

- dynamic team count
- balanced assignment
- server-authoritative team membership
- N-team leaderboard
- N-team professor monitoring
- dynamic team cards/list
- team member counts
- team accuracy
- team score
- team events

Do not hardcode:

```text
Team A
Team B
```

as the only teams.

---

## Phase 7 — Professor monitoring integration

Connect professor views to authoritative state.

Do not create a second gameplay state.

Recommended:

```text
Redis state
     ↓
server event
     ↓
Professor monitoring state
     ↓
React rendering
```

---

# 42. TEST MATRIX

Tests should use mocked Redis/server state where possible.

## Battle Royale

### Participants

```text
1 student
5 students
10 students
25 students
50 students
```

Verify the professor view scales correctly.

### State

Verify:

```text
join
leave
disconnect
reconnect
elimination
power-up
score
HP
round timer
```

### Safe/Hazard isolation

Explicitly verify:

```text
Battle Royale has no Safe Zone
Battle Royale has no Hazard Zone
Battle Royale has no storm damage
```

---

# 43. ENDLESS TEST MATRIX

## Timer

Test:

```text
Safe Zone
→ Hazard Zone
→ timeout
→ next question
```

Verify server transitions.

## Reconnect

Disconnect during:

```text
Safe Zone
Hazard Zone
near timeout
```

Reconnect and verify:

```text
same stage
same HP
same score
same question assignment
same zone
same timer position
same checkpoint
same power-up state
```

## Hazard damage

Verify:

```text
hazard starts
↓
server applies damage
↓
answer submitted
↓
damage stops
```

Verify no duplicate damage from reconnect.

## Death

Verify:

```text
HP reaches 0
→ isAlive=false
→ player eliminated
→ further answer rejected
```

## Adaptive independence

Simulate:

```text
Alice → Question 10
Bob → Question 7
Cara → Question 13
```

Professor monitoring must continue to work without a shared current question.

---

# 44. TEAM MODE TEST MATRIX

Test:

```text
4 students, team size 2
6 students, team size 2
8 students, team size 3
10 students, team size 4
20 students, team size 4
```

Verify:

```text
2+ teams
balanced assignment
correct member counts
correct team IDs
correct scores
correct rankings
reconnect preserves team
```

Test simultaneous answers from multiple teams.

Verify no team's score overwrites another team's score.

---

# 45. PROFESSOR VIEW ACCEPTANCE CRITERIA

## Battle Royale

- [ ] No Safe Zone
- [ ] No Hazard Zone
- [ ] No storm damage
- [ ] Participant count dynamic
- [ ] Alive count
- [ ] Eliminated count
- [ ] HP
- [ ] Ranking
- [ ] Score
- [ ] Accuracy
- [ ] Streak
- [ ] Adaptive difficulty
- [ ] Recent events
- [ ] Responsive for many students
- [ ] No shared current-question dependency
- [ ] Timer comes from server state

## Endless

- [ ] Async semantics
- [ ] Safe Zone
- [ ] Hazard Zone
- [ ] Shrinking Safe Zone
- [ ] Server timer
- [ ] Server hazard damage
- [ ] Stage
- [ ] HP
- [ ] Score
- [ ] Combo
- [ ] Checkpoint
- [ ] Power-ups
- [ ] Eliminations
- [ ] Live event feed
- [ ] No shared current-question dependency
- [ ] Student-specific monitoring
- [ ] Reconnect works

## Team Mode

- [ ] More than two teams supported
- [ ] Dynamic team count
- [ ] Balanced teams
- [ ] Dynamic professor layout
- [ ] Team score
- [ ] Team accuracy
- [ ] Team members
- [ ] Team ranking
- [ ] Team events
- [ ] Reconnect preserves team

## Boss Raid

- [ ] Existing Professor View preserved
- [ ] Existing Boss Raid presentation preserved
- [ ] Existing Boss Raid mechanics preserved
- [ ] No accidental Endless mechanics added
- [ ] No accidental Battle Royale redesign

## Individual

- [ ] Existing functionality preserved
- [ ] Adaptive behavior preserved
- [ ] No unnecessary redesign

---

# 46. SAFETY / SCOPE RULES

The coding assistant MUST NOT:

- delete existing working mode handlers
- replace Boss Raid Professor View
- introduce Safe/Hazard into Battle Royale
- turn Endless into a shared live quiz
- assume two teams
- assume one shared adaptive question
- make React state authoritative
- trust client participant counts
- trust client damage
- trust client timers
- trust client team assignments
- run database migrations
- alter Prisma schema without explicit approval
- run Prisma commands
- make unrelated UI changes

---

# 47. DATABASE / PRISMA RESTRICTION

For this implementation pass:

```text
Prisma schema: DO NOT MODIFY
Database schema: DO NOT MODIFY
Migrations: DO NOT RUN
Prisma generate: DO NOT RUN
Prisma db push: DO NOT RUN
Prisma migrate: DO NOT RUN
Database reset: DO NOT RUN
```

Prefer Redis/server state for the requested synchronization changes.

If a database/schema change is genuinely unavoidable:

1. Stop.
2. Explain why.
3. Provide the proposed SQL/schema change for manual review.
4. Do not execute it.

---

# 48. VALIDATION COMMAND SAFETY

Allowed where safe:

```text
TypeScript type checking
ESLint
unit tests with mocked Redis
pure utility tests
event payload tests
timer tests with fake clocks
formatting
static inspection
```

Before running any command, inspect the package scripts and verify the command does not:

- generate Prisma
- connect to production database
- mutate database
- run migrations
- reset database

---

# 49. FINAL IMPLEMENTATION REPORT REQUIRED

After implementation, the coding assistant must report:

## Changed Files

```text
/path/to/file
  - what changed
  - why
```

## Preserved Files

Explicitly state:

```text
Boss Raid Professor View: PRESERVED
Individual Mode: PRESERVED
Existing Boss Raid mechanics: PRESERVED
```

## Mechanics Verified

```text
Battle Royale:
- no Safe Zone: PASS/FAIL
- no Hazard Zone: PASS/FAIL
- dynamic participants: PASS/FAIL
- professor monitoring: PASS/FAIL
- no shared-question dependency: PASS/FAIL
- timer synchronization: PASS/FAIL
- reconnect: PASS/FAIL

Endless:
- async semantics: PASS/FAIL
- Safe Zone: PASS/FAIL
- Hazard Zone: PASS/FAIL
- shrinking Safe Zone: PASS/FAIL
- hazard damage: PASS/FAIL
- server timer: PASS/FAIL
- adaptive per-student progression: PASS/FAIL
- reconnect: PASS/FAIL
- duplicate answer protection: PASS/FAIL

Team:
- multiple teams: PASS/FAIL
- dynamic team count: PASS/FAIL
- balanced assignment: PASS/FAIL
- dynamic professor view: PASS/FAIL
- reconnect preserves team: PASS/FAIL

Boss Raid:
- existing professor view preserved: PASS/FAIL
- no regression: PASS/FAIL
```

## Database Safety

Explicitly state:

```text
Prisma schema: NOT MODIFIED
Database: NOT TOUCHED
Migrations: NOT RUN
RAG pipeline: NOT MODIFIED
Unrelated modes: NOT MODIFIED
```

## Remaining Blockers

List anything that could not be completed safely.

---

# 50. MASTER AI CODING PROMPT

Use the following prompt when giving this specification to the coding assistant:

> You are modifying an existing QuizArena repository.
>
> This is an existing production-like thesis codebase. Do not rewrite it from scratch.
>
> FIRST perform a complete implementation audit of the relevant battle handlers, Redis state, WebSocket events, student components, professor components, adaptive question flow, timers, power-ups, and team assignment logic.
>
> Do not begin coding until you understand the actual implementation.
>
> ## ABSOLUTE PRESERVATION RULE
>
> DO NOT DELETE, REPLACE, OR REDESIGN the existing Boss Raid Professor View.
>
> `frontend/src/components/gamemodes/ProfBossRaid.tsx` is already approved by the user.
>
> Preserve its existing Boss Raid-specific experience. If it needs a new authoritative data source, adapt its state integration without replacing its UI.
>
> ## BATTLE ROYALE
>
> Battle Royale must NOT have Safe Zone, Hazard Zone, Storm, or Storm damage.
>
> Design the professor view around monitoring students rather than showing a shared current question.
>
> Because adaptive questioning may assign different questions to different students, never make a shared `currentQuestion` the professor monitoring dependency.
>
> Instead show:
>
> - participant count
> - alive/eliminated
> - HP
> - ranking
> - score
> - accuracy
> - streak
> - adaptive difficulty
> - answer/response activity
> - recent events
> - power-up activity
> - round timer
> - selected student details
>
> The professor view must dynamically scale from a few students to many students.
>
> ## ENDLESS
>
> Endless is NOT a truly live/shared-question quiz.
>
> It is an asynchronous individual progression experience.
>
> Different students can be at different:
>
> - questions
> - stages
> - difficulties
> - timers
> - checkpoints
> - HP states
>
> Redis/server state is still authoritative so that the session survives reconnects, refreshes, and server synchronization.
>
> Endless owns Safe Zone and Hazard Zone.
>
> Each question has:
>
> `SAFE → HAZARD → COMPLETE`
>
> The Safe Zone becomes shorter at higher stages.
>
> During Hazard Zone, unanswered students receive server-authoritative damage.
>
> The browser must never authoritatively decrement HP or decide timeout.
>
> Store absolute timestamps such as:
>
> `serverTime`
> `questionStartedAt`
> `safeZoneEndsAt`
> `questionEndsAt`
>
> The client renders a countdown from those timestamps.
>
> Reconnect must restore exact state from Redis.
>
> Duplicate answers must be idempotent.
>
> Dead students cannot continue answering.
>
> ## ENDLESS PROFESSOR VIEW
>
> Preserve the existing Endless professor concept but make it accurately reflect asynchronous progression.
>
> Show:
>
> - active students
> - stage
> - HP
> - Safe/Hazard state
> - score
> - combo
> - checkpoint
> - power-ups
> - damage
> - eliminations
> - recent events
>
> Do NOT show a shared current question.
>
> Student-specific details are preferred.
>
> ## TEAM MODE
>
> Team Mode must support multiple teams.
>
> Never assume only two teams.
>
> Determine team count dynamically from participant count and configured target team size.
>
> Conceptually:
>
> `teamCount = ceil(participantCount / configuredTeamSize)`
>
> with at least two teams for a competitive match when enough participants exist.
>
> Balance team sizes as evenly as practical.
>
> Store team membership server-side and preserve it through reconnects.
>
> Professor monitoring must render N teams dynamically.
>
> Do not hardcode Team A and Team B.
>
> ## INDIVIDUAL
>
> Preserve existing Individual Mode.
>
> Do not redesign it unnecessarily.
>
> Preserve adaptive question behavior.
>
> ## ADAPTIVE QUESTION RULE
>
> Never assume that all students are answering the same question.
>
> For professor monitoring, prefer:
>
> `response activity + performance + difficulty + progress`
>
> instead of:
>
> `shared current question`.
>
> ## SERVER AUTHORITY
>
> Redis/server is the source of truth for authoritative battle state.
>
> The client must never authoritatively decide:
>
> - timer expiration
> - damage
> - HP
> - score
> - stage
> - team membership
> - question progression
> - elimination
> - hazard damage
> - power-up state
>
> Use state versions to reject stale events.
>
> Handle concurrent submissions safely.
>
> ## DYNAMIC REQUIREMENT
>
> If 3 students join, the professor view must show 3.
>
> If 30 join, it must show 30.
>
> If 100 are within supported room limits, the UI must remain structurally correct and use a scalable list/grid rather than fixed cards.
>
> Never rely on hardcoded demo students for production state.
>
> ## DATABASE SAFETY
>
> NEVER run Prisma commands.
>
> NEVER modify `prisma/schema.prisma`.
>
> NEVER run migrations.
>
> NEVER run database reset/push scripts.
>
> If a database change is genuinely required, STOP and report it for manual review.
>
> Prefer Redis/server state for these changes.
>
> ## IMPLEMENTATION PROCESS
>
> 1. Audit relevant files.
> 2. Map current Redis keys.
> 3. Map WebSocket events.
> 4. Map timer ownership.
> 5. Map question ownership.
> 6. Map team assignment.
> 7. Identify client-authoritative logic.
> 8. Implement Battle Royale monitoring changes.
> 9. Implement Endless async + Safe/Hazard architecture.
> 10. Implement dynamic multi-team support.
> 11. Integrate professor monitoring.
> 12. Preserve Boss Raid Professor View.
> 13. Preserve Individual Mode.
> 14. Run only safe static/unit tests.
> 15. Inspect the final diff.
>
> Do not modify unrelated files.
>
> ## FINAL RESPONSE
>
> Report:
>
> - changed files
> - preserved files
> - Redis/state changes
> - WebSocket/event changes
> - timer changes
> - Battle Royale changes
> - Endless changes
> - Team changes
> - professor monitoring changes
> - tests performed
> - database safety status
> - remaining blockers
>
> Explicitly confirm:
>
> `Boss Raid Professor View: PRESERVED`
>
> `Battle Royale Safe/Hazard: NOT PRESENT`
>
> `Endless Safe/Hazard: IMPLEMENTED`
>
> `Endless: ASYNC, NOT SHARED LIVE QUESTION`
>
> `Team Mode: MULTI-TEAM, DYNAMIC`
>
> `Professor Views: NO SHARED CURRENT-QUESTION DEPENDENCY`
>
> `Prisma schema: NOT MODIFIED`
>
> `Database: NOT TOUCHED`
>
> `Migrations: NOT RUN`

---

# 51. IMPORTANT IMPLEMENTATION PHILOSOPHY

Do not optimize for the smallest amount of code.

Optimize for:

```text
correct state ownership
+
dynamic behavior
+
reconnect safety
+
adaptive-question compatibility
+
clear professor observability
+
preservation of existing functionality
```

The goal is not to make every mode look identical.

Each mode should retain its identity:

```text
Individual
→ individual progression

Team
→ multi-team competition

Battle Royale
→ survival/elimination monitoring

Boss Raid
→ existing cooperative boss experience

Endless
→ asynchronous survival/progression with Safe/Hazard
```

The shared architecture should be:

```text
server-authoritative
Redis-synchronized
versioned
reconnect-safe
idempotent
dynamic
adaptive-question compatible
```

but the gameplay and professor UX should remain mode-specific.
