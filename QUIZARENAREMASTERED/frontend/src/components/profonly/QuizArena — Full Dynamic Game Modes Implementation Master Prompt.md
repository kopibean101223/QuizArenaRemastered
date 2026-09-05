# QUIZARENA — FULL DYNAMIC GAME MODES IMPLEMENTATION MASTER PROMPT

## ROLE

You are the primary senior full-stack engineer responsible for implementing the QuizArena game-mode synchronization and professor-monitoring system directly into the existing repository.

The previous specification has already been approved.

**DO NOT create another mockup.  
DO NOT create a prototype.  
DO NOT simulate the game with hardcoded arrays.  
DO NOT leave demo data in production game-mode views.**

Your task now is to **IMPLEMENT THE ACTUAL DYNAMIC SYSTEM** using the existing frontend, backend, WebSocket/Socket.IO, Redis, and battle handlers already present in the repository.

The final system must work with real students joining real rooms.

---

# 1. FIRST: INSPECT THE EXISTING CODEBASE

Before modifying anything:

1. Inspect the complete repository structure.
2. Inspect all existing game-mode handlers.
3. Inspect all student game-mode components.
4. Inspect all professor game-mode components.
5. Inspect all Socket.IO/WebSocket connection utilities.
6. Inspect Redis state management.
7. Inspect room/lobby/join logic.
8. Inspect answer submission logic.
9. Inspect timer logic.
10. Inspect adaptive question logic.
11. Inspect power-up/power-card logic.
12. Inspect existing professor dashboard routing.
13. Identify every mockup/demo/prototype data source.

Important existing files include, but are not limited to:

```text
handlers/
├── BattleRoyale.ts
├── TeamBattle.ts
├── BossRaid.ts
├── RoomPresence.ts
└── LiveBattle.ts

src/components/gamemodes/
├── ProfBossRaid.tsx
├── ProfEndlessMode.tsx
├── StudentBossRaid.tsx
├── StudentEndlessMode.tsx
└── ...

src/components/profonly/
├── ProfessorDashboard.tsx
├── ProfessorLiveLobby.tsx
└── ...

src/components/studentONLY/
├── Battle_BattleRoyale.tsx
├── Battle_TeamMode.tsx
└── ...

src/lib/student/battle/
├── battleSync.ts
├── useBattleConnection.ts
└── useBattleSocketProvider.tsx
```

The packed `repomix-output.xml` is READ-ONLY reference material. Modify the actual repository files, not the packed file.

---

# 2. CRITICAL: REMOVE THE MOCKUP SYSTEM

The existing professor dashboard contains a prototype/mockup experience such as:

```text
Game Modes & Synchronized Views Command Center
Prototype:
Individual
Team (Bracket)
Battle Royale
Boss Raid
Endless
```

and other mockup/demo launchers.

The current repository contains mockup-oriented professor/student previews and prototype mode switching. These must no longer be the source of gameplay data.

## REMOVE/REPLACE

Remove the mockup behavior from the actual application.

Do NOT simply hide it with CSS.

Do NOT leave:

```typescript
const mockStudents = [...]
const mockTeams = [...]
const mockPlayers = [...]
const mockBattleState = {...}
const demoPlayers = [...]
const sampleEvents = [...]
```

inside production game-mode views.

Do NOT generate fake timers using:

```typescript
setInterval(...)
Math.random()
fakePlayers
demoData
hardcoded HP
hardcoded score
hardcoded rankings
```

for actual gameplay.

Instead, connect the UI to the actual server/Redis game state.

---

# 3. IMPORTANT — DO NOT DELETE THE EXISTING BOSS RAID PROFESSOR VIEW

THIS IS NON-NEGOTIABLE.

The existing:

```text
ProfBossRaid.tsx
```

is already an established professor view.

**KEEP IT.**

Do not replace it with the mockup system.

Do not redesign it into Battle Royale.

Do not remove its existing professor controls.

Do not break its existing behavior.

Only modify Boss Raid if absolutely necessary for synchronization with the server.

The previous requirement explicitly protects the existing Boss Raid Professor View.

---

# 4. FINAL GAME MODE ARCHITECTURE

The application must have these real modes:

| Mode | Behavior |
|---|---|
| Individual | Individual progression |
| Team | Multiple competing teams |
| Battle Royale | Live individual survival/elimination |
| Boss Raid | Existing Boss Raid implementation preserved |
| Endless | Asynchronous survival/progression |

Each mode must have its own mechanics.

Do NOT make all modes behave identically.

---

# 5. GLOBAL RULE — SERVER IS THE AUTHORITY

The browser must NEVER be the authoritative source for gameplay state.

The following must be controlled by the server/Redis:

```text
timer
question progression
score
accuracy
HP
damage
elimination
alive/dead state
team membership
team score
team ranking
checkpoint
stage
safe zone
hazard zone
hazard damage
power-up effects
power-up availability
answer validation
answer result
battle completion
winner
```

The frontend only renders server state.

---

# 6. TIMER SYNCHRONIZATION

Do NOT rely on:

```typescript
setInterval(() => setTimeLeft(...))
```

as the source of truth.

Every timer must originate from server timestamps.

Use a model similar to:

```typescript
{
  serverTime,
  startedAt,
  endsAt,
  duration
}
```

The frontend may calculate display time using:

```text
remaining = endsAt - synchronizedServerTime
```

but it must NOT control the authoritative timer.

When a student reconnects:

1. Server reads Redis state.
2. Server sends current state.
3. Client calculates remaining time from server timestamps.
4. Client resumes exactly where it should be.

A refresh must NOT reset the timer.

---

# 7. BATTLE ROYALE — IMPLEMENT FOR REAL

## 7.1 No Safe Zone

Battle Royale MUST NOT have:

```text
Safe Zone
Hazard Zone
Storm
Shrinking Zone
Zone Damage
```

Those mechanics belong to Endless.

Do not accidentally copy Endless mechanics into Battle Royale.

---

# 8. BATTLE ROYALE STUDENT STATE

Each real student must have independently tracked state.

Example:

```typescript
interface RoyalePlayerState {
  id: string;
  name: string;

  isAlive: boolean;
  hp: number;

  score: number;
  correctAnswers: number;
  totalQuestions: number;
  accuracy: number;

  streak: number;

  currentQuestionIndex: number;

  difficulty: "easy" | "medium" | "hard";

  answeredCurrentQuestion: boolean;

  powerUps: PowerUpState[];

  lastAnswerAt?: number;
}
```

Do not assume all players have the same question.

The adaptive algorithm can cause students to receive different questions.

---

# 9. BATTLE ROYALE — ANSWER FLOW

When a student submits an answer:

```text
Student
   ↓
Server
   ↓
Validate battle/player/question
   ↓
Validate timer
   ↓
Validate player is alive
   ↓
Validate answer has not already been processed
   ↓
Evaluate answer
   ↓
Update score
   ↓
Update accuracy
   ↓
Update streak
   ↓
Update HP/elimination if applicable
   ↓
Update adaptive difficulty
   ↓
Persist Redis state
   ↓
Broadcast relevant state/event
```

Never trust:

```text
client score
client HP
client accuracy
client timer
client question result
client alive state
```

---

# 10. BATTLE ROYALE — PROFESSOR VIEW

The professor view must now monitor the REAL students.

It must NOT display a fake global current question.

Because adaptive questioning exists, different students may be answering different questions.

Therefore:

## DO NOT SHOW

```text
Current Question: ...
```

as a single room-wide value.

Instead show:

```text
Active Students
Alive
Eliminated
HP
Score
Accuracy
Streak
Difficulty
Progress
Response Status
Response Time
Power-Up Status
Recent Events
```

The professor should be able to:

```text
search student
filter alive/eliminated
sort by score
sort by HP
sort by accuracy
sort by response activity
select a student
inspect detailed student state
```

---

# 11. BATTLE ROYALE — DYNAMIC PARTICIPANTS

The UI must work dynamically for:

```text
1 student
2 students
5 students
10 students
25 students
50 students
100 students
```

or whatever the configured room capacity allows.

Do NOT hardcode:

```text
Player 1
Player 2
Player 3
...
Player 10
```

Render from actual server state:

```typescript
players.map(...)
```

When a student joins:

```text
server detects join
→ Redis updates participant state
→ broadcast participant update
→ professor UI updates
→ student UI updates
```

When a student disconnects:

```text
server detects disconnect
→ update presence
→ preserve gameplay state
→ broadcast presence
```

Do not immediately destroy the student's gameplay state merely because the WebSocket disconnected.

---

# 12. BATTLE ROYALE — PROFESSOR UI SCALING

For small rooms:

```text
student cards
```

For medium rooms:

```text
responsive grid
```

For large rooms:

```text
dense monitoring table/list
```

The same real data source must power all layouts.

Example:

```text
1–8 players
→ detailed cards

9–30 players
→ compact cards/grid

31+ players
→ monitoring table + filters
```

This is a UI scaling strategy only.

The underlying state must remain identical.

---

# 13. ENDLESS MODE — IMPLEMENT FOR REAL

ENDLESS IS ASYNCHRONOUS.

This is extremely important.

Do NOT turn Endless into a synchronized live quiz.

Students are allowed to be at completely different points.

Example:

```text
Student A
Stage 3
Question 7
18 seconds remaining
HP 72

Student B
Stage 1
Question 2
4 seconds remaining
HP 100

Student C
Stage 5
Question 10
Hazard phase
HP 35
```

All three can exist simultaneously.

---

# 14. ENDLESS — SERVER STATE

Store authoritative Endless state in Redis.

Example:

```typescript
interface EndlessPlayerState {
  studentId: string;

  stage: number;
  questionIndex: number;
  questionId: string;

  difficulty: "easy" | "medium" | "hard";

  hp: number;
  maxHp: number;

  score: number;
  combo: number;

  checkpoint: number;

  alive: boolean;
  completed: boolean;

  questionStartedAt: number;
  questionEndsAt: number;

  safeZoneStartedAt?: number;
  safeZoneEndsAt?: number;

  hazardStartedAt?: number;

  safeZoneDuration?: number;
  hazardDamagePerSecond?: number;

  powerUps: PowerUpState[];
}
```

The exact structure may be adapted to the existing code.

Do NOT blindly duplicate this interface if an equivalent structure already exists.

Reuse existing architecture where possible.

---

# 15. ENDLESS — SAFE ZONE

Safe Zone belongs ONLY to Endless.

The flow should be:

```text
QUESTION / SAFE PHASE
        ↓
SAFE ZONE TIMER
        ↓
HAZARD PHASE
        ↓
HAZARD DAMAGE
        ↓
QUESTION/STAGE PROGRESSION
        ↓
NEXT SAFE PHASE
```

The server determines when the phase changes.

The frontend only renders it.

---

# 16. ENDLESS — HAZARD DAMAGE

Hazard damage MUST be server-authoritative.

Never allow:

```typescript
useEffect(() => {
  setHp(hp - damage);
}, [timer]);
```

to determine actual HP.

Instead:

```text
Redis/server timer
        ↓
Hazard begins
        ↓
Server calculates damage
        ↓
Server updates HP
        ↓
Redis persists HP
        ↓
Server emits state
        ↓
Student UI renders HP
        ↓
Professor UI renders HP
```

If the student refreshes:

```text
HP remains correct.
```

If the professor refreshes:

```text
HP remains correct.
```

If the student reconnects:

```text
Hazard state remains correct.
```

---

# 17. ENDLESS — SHRINKING SAFE ZONE

Safe Zone duration/difficulty may scale by stage.

Example configuration:

```typescript
ENDLESS_CONFIG = {
  baseSafeDuration: ...,
  minimumSafeDuration: ...,
  hazardDamagePerSecond: ...,
  stageScaling: ...
}
```

Do NOT scatter magic numbers throughout the code.

Centralize configuration.

The exact values should follow the existing Endless design where available.

---

# 18. ENDLESS — PROFESSOR VIEW

The existing:

```text
ProfEndlessMode.tsx
```

must be converted from mockup/static data into a real monitoring interface.

It must show actual students.

Professor should see:

```text
Active Students
Completed
Eliminated
Current Stage
Question Progress
Safe/Hazard Status
HP
Score
Combo
Checkpoint
Difficulty
Power-Ups
Recent Damage
Recent Events
```

Do NOT show a shared:

```text
Current Question
```

because students can have different questions.

Instead show per-student progress.

---

# 19. ENDLESS — PROFESSOR MONITORING

Example:

```text
ENDLESS MONITOR

Active: 18
Completed: 3
Eliminated: 2

------------------------------------------------

Student       Stage   Progress   HP   Zone     Score
------------------------------------------------
Alice         5       8/10       72   SAFE     850
Mark          2       4/10      100   SAFE     310
John          7       2/10       35   HAZARD   1200
Jane          3       9/10       0   DEAD     500
```

All values must come from real server state.

---

# 20. TEAM MODE — MULTIPLE TEAMS

Team Mode must NOT be limited to:

```text
Team A
Team B
```

It must support:

```text
Team 1
Team 2
Team 3
Team 4
...
Team N
```

depending on participant count and configured team size.

---

# 21. TEAM ASSIGNMENT

Use the configured participant/team size to dynamically determine team count.

Conceptually:

```typescript
teamCount = Math.ceil(participantCount / configuredTeamSize)
```

while maintaining sensible competitive behavior.

Example:

```text
10 students
target team size = 4

Team 1 = 4
Team 2 = 3
Team 3 = 3
```

Another example:

```text
20 students
target = 5

Team 1 = 5
Team 2 = 5
Team 3 = 5
Team 4 = 5
```

Do NOT hardcode two teams.

---

# 22. TEAM MEMBERSHIP

Team membership must be authoritative.

Once the match starts:

```text
do not randomly reshuffle students
```

Reconnect must preserve:

```text
studentId → teamId
```

Late join behavior must follow the existing room policy.

Do not invent a new conflicting lobby system.

---

# 23. TEAM MODE — PROFESSOR VIEW

Professor must see:

```text
Team standings
Team score
Team accuracy
Team rank
Team members
Members alive/active
Team progress
Recent events
```

Render N teams dynamically.

Example:

```text
TEAM 1
Score: 1200
Accuracy: 88%

Alice
Mark
John

TEAM 2
Score: 1100
Accuracy: 84%

Jane
Chris
Paul

TEAM 3
Score: 900
Accuracy: 79%

...
```

Do not assume exactly two teams.

---

# 24. INDIVIDUAL MODE

Individual Mode is already acceptable conceptually.

Keep its behavior.

Do not unnecessarily rewrite it.

Only replace mockup/static professor data with actual battle state where necessary.

Professor should monitor:

```text
Student
Score
Accuracy
Streak
Progress
Response activity
Status
```

Again:

**Do not assume one shared current question.**

---

# 25. BOSS RAID

Boss Raid is protected.

KEEP:

```text
ProfBossRaid.tsx
StudentBossRaid.tsx
BossEntity.tsx
existing Boss Raid controls
existing Boss Raid professor experience
```

Do not replace Boss Raid with the generic professor mockup.

If synchronization improvements are required:

```text
server
→ Redis/state
→ professor
→ students
```

But preserve the Boss Raid identity and UI.

---

# 26. MOCKUP REMOVAL RULE

Search the entire project for:

```text
mock
mockup
prototype
demo
sample
fake
dummy
hardcoded player
hardcoded team
hardcoded score
hardcoded HP
setInterval
setTimeout
Math.random
```

For every occurrence:

1. Determine whether it belongs to a genuine test/demo-only utility.
2. If it powers production game UI, replace it with real state.
3. If it is genuinely required for development/testing, isolate it clearly.
4. Never allow demo data to appear in production game mode screens.

The final professor dashboard must open real game modes.

---

# 27. REAL DATA FLOW

The intended architecture is:

```text
                    ┌─────────────────┐
                    │    Student      │
                    │   Game Client   │
                    └────────┬────────┘
                             │
                             │ answer / join / action
                             ▼
                    ┌─────────────────┐
                    │ WebSocket /     │
                    │ Socket.IO       │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Game Handler    │
                    │ Server Logic    │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │      Redis      │
                    │ Authoritative   │
                    │ Game State      │
                    └────────┬────────┘
                             │
                    broadcast state/event
                             │
              ┌──────────────┴──────────────┐
              ▼                             ▼
       Student Clients              Professor Client
```

The professor is a monitor.

The professor UI does not invent state.

---

# 28. EVENT DESIGN

Use explicit server events.

Examples:

```text
battle_state
player_joined
player_left
player_updated
answer_processed
player_eliminated
score_updated
hp_updated
timer_sync
question_started
question_completed
stage_changed
safe_zone_started
hazard_started
hazard_damage
checkpoint_reached
powerup_updated
team_updated
team_score_updated
battle_completed
```

Reuse existing event names where already established.

Do not create duplicate event systems if an existing equivalent exists.

---

# 29. STATE VERSIONING

Use state versions/revisions where appropriate.

Example:

```typescript
{
  version: 42,
  serverTime: ...,
  ...
}
```

Reject or ignore stale client updates.

Professor and student clients must never overwrite authoritative state with an older snapshot.

---

# 30. REDIS CONCURRENCY

Protect against:

```text
duplicate answers
double damage
double elimination
timer race conditions
multiple simultaneous submissions
multiple advance operations
reconnect races
```

Existing locks/maps/Redis mechanisms should be reused or improved.

If two requests arrive simultaneously:

```text
Request A
Request B
```

only one should successfully mutate a one-time state transition.

---

# 31. DUPLICATE ANSWER PROTECTION

An answer must be idempotent.

If a student submits twice because of:

```text
double click
network retry
reconnect
browser retry
```

the answer must not:

```text
double score
double damage
double progress
double elimination
```

Track processed answer/action IDs or use equivalent Redis guards.

---

# 32. DEAD PLAYER PROTECTION

If:

```typescript
alive === false
```

the student must not be able to:

```text
answer
gain score
deal damage
use gameplay powerups
advance questions
```

The server must reject these operations.

---

# 33. RECONNECT BEHAVIOR

Test:

```text
student joins
student starts question
student disconnects
student reconnects
```

Expected:

```text
same player
same score
same HP
same stage
same question
same difficulty
same timer position
same team
same powerups
same alive/dead state
```

For Endless:

```text
same Safe/Hazard phase
same hazard timing
same checkpoint
```

---

# 34. ADAPTIVE QUESTION COMPATIBILITY

The professor interface must never depend on:

```text
one global current question
```

because the adaptive algorithm can assign different questions/difficulties.

Professor monitoring should instead use:

```text
question index
progress
difficulty
answer status
response time
correct/incorrect result
performance
```

If the professor selects one student, the system may show that student's specific question/progress if the existing security and architecture permit it.

But never expose a fake room-wide question.

---

# 35. PERFORMANCE REQUIREMENTS

The implementation must remain functional with many connected users.

Do not broadcast enormous unnecessary payloads every few milliseconds.

Avoid:

```text
100 players × full state × every animation frame
```

Prefer:

```text
state snapshots
targeted events
delta updates where appropriate
```

Timers should be reconstructed from timestamps instead of continuously broadcasting every second.

---

# 36. PROFESSOR UI REQUIREMENTS

The professor UI should dynamically react to:

```text
student joins
student leaves
student answers
student loses HP
student is eliminated
student advances
student changes difficulty
student reaches checkpoint
student uses powerup
team score changes
battle ends
```

No page refresh should be required.

---

# 37. RESPONSIVE PROFESSOR MONITORING

The professor monitor should work on:

```text
small screen
laptop
desktop
large classroom display
```

Use responsive layouts.

For many participants:

```text
filters
search
sorting
compact rows
virtualized/list-friendly rendering where necessary
```

Do not create 100 giant cards that make the dashboard unusable.

---

# 38. REMOVE MOCKUP ROUTING

If the existing application has a route/component whose only purpose is:

```text
prototype_views
```

or:

```text
mock game modes
```

replace its production behavior with the actual game-mode routing.

Do NOT remove legitimate professor navigation.

The professor should still be able to access:

```text
Individual
Team
Battle Royale
Boss Raid
Endless
```

but these must now open the actual implementations.

---

# 39. DO NOT BREAK EXISTING FEATURES

Before changing a component, determine whether it is shared.

Do not break:

```text
authentication
lobby
matchmaking
student navigation
professor navigation
RAG
question generation
adaptive difficulty
power cards
battle results
chat
notifications
existing Boss Raid
```

Only modify what is necessary.

---

# 40. DATABASE / PRISMA SAFETY

DO NOT modify:

```text
prisma/schema.prisma
```

unless there is an absolutely unavoidable architectural requirement.

DO NOT run:

```text
npx prisma migrate
npx prisma db push
npx prisma generate
npx prisma migrate reset
```

Do not reset the database.

Prefer Redis/server state for transient battle mechanics.

If a database change is genuinely unavoidable:

**STOP and report it before making the change.**

---

# 41. IMPLEMENTATION ORDER

Implement in this order:

## PHASE 1 — CODEBASE AUDIT

Find:

```text
mock state
prototype views
hardcoded players
fake timers
local gameplay authority
existing server state
existing Redis keys
existing Socket events
```

Do not modify anything yet.

---

## PHASE 2 — COMMON SYNCHRONIZATION

Create/reuse shared utilities for:

```text
server timestamp
state synchronization
reconnect
event subscription
player snapshots
professor monitoring
```

Do not duplicate synchronization logic in every component.

---

## PHASE 3 — BATTLE ROYALE

Implement:

```text
real participants
real HP
real score
real accuracy
real elimination
real timer
real adaptive state
real professor monitoring
```

Remove Battle Royale mockup data.

---

## PHASE 4 — ENDLESS

Implement:

```text
async player state
server timer
Safe Zone
Hazard Zone
hazard damage
stage progression
checkpoint
HP
score
combo
powerups
reconnect
professor monitoring
```

Remove Endless mockup data.

---

## PHASE 5 — TEAM

Implement:

```text
dynamic N teams
dynamic membership
team scores
team ranking
team accuracy
professor monitoring
reconnect
```

Remove Team mockup assumptions.

---

## PHASE 6 — INDIVIDUAL

Connect professor monitoring to actual state.

Do not unnecessarily redesign the student experience.

---

## PHASE 7 — BOSS RAID VERIFICATION

Verify that the existing Boss Raid professor view still works.

Do not replace it.

Only fix synchronization if required.

---

## PHASE 8 — REMOVE MOCKUP SYSTEM

After the real implementations work:

```text
remove mock data
remove prototype-only launchers
remove demo-only production UI
remove fake timers
remove fake participant arrays
```

Do this LAST so existing UI can be used as a reference during implementation.

---

# 42. TESTING

Test with:

```text
1 student
2 students
5 students
10 students
25 students
50+ students if room capacity allows
```

## Battle Royale

Test:

```text
join
leave
reconnect
answer
wrong answer
correct answer
timeout
elimination
last player
battle completion
professor refresh
student refresh
multiple simultaneous answers
duplicate answer
```

Verify:

```text
no Safe Zone
no Hazard Zone
no Storm
```

---

# 43. ENDLESS TESTING

Test students at different states:

```text
Student A → Stage 1
Student B → Stage 3
Student C → Stage 7
```

Verify they can progress independently.

Test:

```text
Safe Zone
Hazard Zone
hazard damage
timer expiration
HP reaches zero
checkpoint
reconnect
refresh
multiple students progressing simultaneously
```

Verify that damage is not client-authoritative.

---

# 44. TEAM TESTING

Test:

```text
2 teams
3 teams
4 teams
N teams
```

Verify:

```text
team assignment
team score
team ranking
member list
reconnect
simultaneous answers
```

---

# 45. PROFESSOR TESTING

Open professor monitor while students are actively playing.

Verify that professor sees changes immediately:

```text
student joins
↓
student appears

student answers
↓
score/accuracy updates

student loses HP
↓
HP updates

student is eliminated
↓
status changes

student advances
↓
progress updates

student changes difficulty
↓
difficulty updates
```

No page refresh.

---

# 46. TIMER TEST

Open:

```text
Student A
Student B
Professor
```

at the same time.

Compare displayed timer against server time.

Small rendering differences are acceptable.

Gameplay state must not diverge.

Refreshing any client must not reset the timer.

---

# 47. MOCKUP ACCEPTANCE TEST

After implementation, search again for:

```text
mock
mockup
prototype
demoPlayers
mockPlayers
samplePlayers
fakePlayers
Math.random
hardcoded score
hardcoded HP
```

For every production occurrence, explain why it remains.

The final production professor views must use actual game state.

---

# 48. IMPORTANT UI RULE

Do not make the interface look like a technical debugging dashboard.

It should remain a polished QuizArena professor experience.

Use:

```text
cards
tables
progress bars
badges
status indicators
charts where useful
animations where useful
```

but all values must be real.

---

# 49. DO NOT OVERENGINEER

Do not introduce a completely new architecture if the existing architecture already solves the problem.

Prefer:

```text
existing handlers
existing Redis
existing Socket.IO/WebSocket
existing battle synchronization
existing React components
existing hooks
```

Extend them.

Refactor only when necessary.

---

# 50. FINAL IMPLEMENTATION REQUIREMENT

When you finish, the following must be true:

### INDIVIDUAL

Real students → real state → professor sees real state.

### TEAM

Real students → dynamically assigned N teams → real team state → professor sees real teams.

### BATTLE ROYALE

Real students → real elimination/HP/score/timer → professor sees real participants.

NO Safe Zone.

NO Hazard Zone.

### BOSS RAID

Existing Boss Raid experience remains intact.

### ENDLESS

Real students → independent asynchronous progression → Safe/Hazard mechanics → server-authoritative damage/timers → professor sees all students independently.

---

# 51. FINAL REPORT

After implementation, provide a concise engineering report containing:

## Files Modified

```text
file
reason
```

## Files Added

```text
file
purpose
```

## Mockups Removed

List exactly which mockup/demo systems were removed.

## Server Authority

Explain which mechanics are now server/Redis authoritative.

## Battle Royale

Explain:

```text
HP
score
elimination
timer
professor monitoring
```

## Endless

Explain:

```text
async progression
Safe Zone
Hazard Zone
damage
timer
checkpoint
professor monitoring
```

## Team

Explain:

```text
dynamic team count
team assignment
team scoring
professor monitoring
```

## Boss Raid

Explicitly confirm:

```text
Existing Boss Raid Professor View preserved.
```

## Testing

Report:

```text
typecheck
lint
build
manual tests
multi-client synchronization tests
reconnect tests
duplicate-answer tests
```

If a command cannot safely be run, state why.

---

# 52. ABSOLUTE FINAL RULE

Do not stop after creating interfaces.

Do not stop after creating Redis keys.

Do not stop after connecting one event.

Do not stop after making the UI look dynamic.

The requirement is:

**THE ENTIRE GAME LOOP MUST BE REAL.**

That means:

```text
STUDENT JOINS
      ↓
REAL SERVER STATE
      ↓
REAL REDIS STATE
      ↓
REAL GAMEPLAY
      ↓
REAL TIMER
      ↓
REAL ANSWER VALIDATION
      ↓
REAL SCORE / HP / DAMAGE
      ↓
REAL ADAPTIVE PROGRESSION
      ↓
REAL SOCKET EVENTS
      ↓
REAL STUDENT UI
      ↓
REAL PROFESSOR MONITOR
```

No mock data.

No fake gameplay.

No simulated synchronization.

No room-wide current-question assumption.

No client-authoritative timers.

No client-authoritative damage.

No hardcoded participant counts.

No two-team-only assumption.

No Safe/Hazard mechanics in Battle Royale.

No removal of the existing Boss Raid Professor View.

ENDLESS remains asynchronous.

TEAM supports multiple teams.

INDIVIDUAL remains functional.

Implement this directly into the existing QuizArena codebase.