# QuizArenaRemastered — RAG Generation Performance, Persistence, Adaptive Generation & UI Recovery Master Plan

> **Purpose:** This is the single implementation specification for the AI coding assistant working on `QuizArenaRemastered`.
>
> **Primary goals:** make the existing RAG/LLM generation pipeline substantially faster, preserve **every existing stage**, require **no billing**, fix the current Supabase persistence failure, preserve all question types and source metadata, support future adaptive question pools through an explicit `isAdaptive` parameter, and integrate the existing `ui_state_recovery_plan.md`.
>
> **Current runtime evidence:** The authoritative performance evidence for this revision is the **user-supplied September 3, 2026 runtime log in the conversation**. Do **NOT** treat historical Celery log files in the repository as current runtime evidence.

---

# 1. NON-NEGOTIABLE RULES

## 1.1 Never remove an existing pipeline stage

The existing RAG pipeline must remain conceptually intact.

Preserve all logical stages:

1. PDF/document → Markdown/content representation
2. Structure-aware chunking
3. Retrieval + reranking
4. Batch structured question generation
5. Critic / grounding validation
6. Semantic similarity / cosine verification
7. Persistence + Redis/result state + generation-run completion

The implementation may optimize *inside* these stages.

It must NOT turn the system into:

```text
retrieve → generate → save
```

Do not delete Stage 5 or Stage 6 simply because they consume API calls.

---

## 1.2 No billing requirement

The solution must work with the currently configured providers and free/on-demand limits as far as possible.

Do NOT:

- require paid OpenAI credits
- require a paid embedding provider
- require a new paid service
- require upgrading Groq
- remove validation just to make the system faster
- replace working providers without evidence

When a provider reaches a quota/rate limit:

```text
detect → mark provider unavailable for this run → use available fallback
```

Do not repeatedly hammer an exhausted provider.

---

## 1.3 Current log is the source of truth

The latest supplied runtime is:

```text
2026-09-03 12:20:44 → pipeline start
2026-09-03 12:21:11 → Gemini embedding HTTP 200
2026-09-03 12:21:13 → Supabase hybrid retrieval HTTP 200
2026-09-03 12:21:15 → Stage 4 generation
2026-09-03 12:22:14 → Groq 429 during batch 3
2026-09-03 12:24:12 → batch 3 finally generated
2026-09-03 12:24:12 → 15 raw questions
2026-09-03 12:24:15–12:24:55 → critic validation
2026-09-03 12:24:55 → 14/15 critic passed
2026-09-03 12:24:55–12:26:07 → semantic validation
2026-09-03 12:26:07 → 8 final valid
2026-09-03 12:26:10 → DB save error
2026-09-03 12:26:10 → misleading SUCCESS
2026-09-03 12:26:16 → Celery task succeeded
```

Do not inspect old `celerylogs` files and assume they describe this run.

Historical logs may be useful for historical context only, never as the primary diagnosis of the current run.

---

# 2. CURRENT PERFORMANCE DIAGNOSIS

The latest run took:

```text
331.833 seconds
≈ 5 minutes 32 seconds
```

The pipeline is functioning, but expensive work is unnecessarily serialized/repeated.

## 2.1 Retrieval is working

Current evidence:

```text
gemini-embedding-2:batchEmbedContents → HTTP 200
match_document_chunks_v2 → HTTP 200
```

Therefore:

**DO NOT replace `gemini-embedding-2` merely because of an old embedding failure.**

The optimization target is how often embedding calls are made and how their results are reused.

---

# 3. MAIN PERFORMANCE BOTTLENECKS

## 3.1 Groq generation truncation is incorrectly triggering Gemini

Current log:

```text
POST Groq → HTTP 200
WARNING: Groq failed, trying Gemini fallback:
The output is incomplete due to a max_tokens length limit.
```

This is important.

The HTTP request succeeded, but the application considers the response a failure because the output was truncated.

That causes an unnecessary provider switch:

```text
Groq
  ↓
output truncated
  ↓
Gemini fallback
```

### Required behavior

Inspect the current generation response handling.

Distinguish:

```text
provider/network/API failure
```

from:

```text
valid provider response whose output was truncated
```

For truncation:

1. do NOT blindly invoke Gemini immediately
2. determine whether the partial structured response can be safely parsed
3. if not safely recoverable, retry the **same provider** with an output-aware smaller batch
4. only fallback to another provider when the current provider genuinely cannot complete the request
5. never accept malformed/incomplete questions as valid

The optimization must preserve structured-output correctness.

---

# 4. GROQ TPM RATE-LIMIT HANDLING

Current log:

```text
Limit: 8000 TPM
Used: 5352
Requested: 6330
429 Too Many Requests
Retry after ≈ 27.6 seconds
```

This is not a reason to remove batch generation.

It means the batch/output budget is too large for the current TPM window.

## Required implementation

Create provider-aware token budgeting.

Before a generation request:

```text
estimated_request_tokens
+
estimated_output_tokens
```

must be considered against the provider's known/requested budget.

Do not intentionally send a request that is obviously larger than the remaining TPM budget.

### On 429

Use:

```text
Retry-After / provider-provided retry timing
```

when available.

Do not use arbitrary fixed sleeps.

If the provider is known to be rate-limited for the remainder of the useful window:

```text
mark Groq unavailable temporarily for this run
↓
route to fallback
```

Do not repeatedly retry Groq.

---

# 5. REMOVE FIXED SLEEPS

Do not use:

```python
time.sleep(10)
time.sleep(12)
time.sleep(20)
```

after successful API calls merely to "be safe".

Rate limiting should be centralized.

Use:

```text
request
↓
success → continue immediately
failure/429 → provider-aware retry/backoff
```

The current critic stage should not spend unnecessary time sleeping between successful requests.

---

# 6. STAGE 4 — BATCH QUESTION GENERATION

Keep batch generation.

Do not generate one question per LLM request.

However, batch size must be **output-aware**.

## Required approach

The generator should calculate:

```text
requested question count
+
validation buffer
+
expected tokens per question
```

and choose a safe batch size.

Example:

```text
5 questions
→ one controlled batch if output fits

10 questions
→ split into safe batches if output would exceed provider limits

large adaptive pool
→ controlled batches
```

Do not blindly use a fixed batch size if the expected output can exceed provider limits.

---

# 7. EXACT COUNT VS ADAPTIVE POOL

This is a critical new API contract.

Add:

```text
isAdaptive: boolean
```

to the generation request.

## 7.1 Default

The default MUST be:

```text
isAdaptive = true
```

This should be applied safely at the API/request-schema boundary so omitted values behave as `true`.

Example conceptually:

```python
is_adaptive: bool = True
```

or the project's existing naming convention equivalent.

Do not break existing callers that do not yet send the parameter.

---

# 8. `isAdaptive = false`

When:

```text
isAdaptive === false
```

the generator should behave as a normal requested-count generator.

Example:

```json
{
  "count": 10,
  "isAdaptive": false
}
```

means:

```text
Generate approximately/exactly the requested 10-question set,
subject to existing validation and quality behavior.
```

The system must not silently create a large adaptive surplus pool.

The user-requested count remains the target.

Still preserve:

- RAG retrieval
- question types
- critic
- grounding
- semantic validation
- citations
- persistence

---

# 9. `isAdaptive = true`

When:

```text
isAdaptive === true
```

the generation request becomes an **adaptive-ready question-pool generation request**.

The important distinction is:

```text
requested quiz count
≠
adaptive question pool size
```

The adaptive system needs enough candidate questions to choose from later.

## 9.1 Default adaptive pool size

Use the existing adaptive requirement of a surplus pool.

Default target:

```text
pool multiplier = 3x requested count
```

Allow configuration for:

```text
3x–5x
```

depending on project constraints.

Example:

```text
User requests 10 questions

isAdaptive=false
→ target = 10

isAdaptive=true
→ target pool ≈ 30
```

For a future repeated-attempt system, the multiplier may be increased.

Do not make pool generation depend on real-time student answering.

The pool should be generated before the student starts the quiz.

---

# 10. ADAPTIVE DIFFICULTY PERCENTAGES

When `isAdaptive=true`, generated questions should be distributed using **percentage-based difficulty targets**.

The professor should NOT manually choose Easy/Medium/Hard.

The generator should automatically create a balanced difficulty distribution.

## 10.1 Default distribution

Use this default:

```text
Easy:   30%
Medium: 40%
Hard:   30%
```

These are generation targets, not guarantees that the source can always support.

For a 30-question adaptive pool:

```text
Easy   ≈ 9
Medium ≈ 12
Hard   ≈ 9
```

For a 10-question pool:

```text
Easy   ≈ 3
Medium ≈ 4
Hard   ≈ 3
```

The implementation must use deterministic integer allocation so totals equal the target pool size.

---

# 11. CONTINUOUS DIFFICULTY METADATA

Do not store only:

```text
Easy
Medium
Hard
```

as the actual adaptive signal.

Every generated question should retain:

```text
estimatedDifficulty: number
```

with:

```text
0.00 <= estimatedDifficulty <= 1.00
```

Example:

```text
0.18
0.31
0.44
0.58
0.67
0.82
0.91
```

The percentage bands may guide generation, while the continuous value becomes the future adaptive-selection signal.

Conceptually:

```text
0.00–0.39 → Easy target band
0.40–0.69 → Medium target band
0.70–1.00 → Hard target band
```

These ranges are implementation defaults and may be tuned after evaluating actual generated distributions.

---

# 12. IMPORTANT: DIFFICULTY IS NOT USER INPUT

The frontend should not provide:

```text
difficulty = Easy
difficulty = Medium
difficulty = Hard
```

The generation request should contain:

```text
count
question types
topics/sections
isAdaptive
other existing generation configuration
```

Difficulty becomes an **output property**.

This preserves the existing requirement that the generator automatically produces mixed difficulty.

---

# 13. ADAPTIVE PERCENTAGE PROMPT CONTRACT

When `isAdaptive=true`, the existing generation prompt should be extended, not replaced.

The prompt should communicate conceptually:

```text
Generate an adaptive-ready question pool from the supplied source.

Target the requested difficulty distribution using percentage targets.

Default target:
- approximately 30% easy
- approximately 40% medium
- approximately 30% hard

Return a continuous normalized estimatedDifficulty value from 0.00 to 1.00 for every question.

Use Bloom's Taxonomy to vary cognitive demand.

Do not force a difficulty level that the source material cannot support.

Do not add outside facts.

Do not make questions artificially difficult through confusing wording.

Preserve the requested question-type distribution.

Difficulty is metadata for future adaptive selection, not a user-selected constraint.
```

When `isAdaptive=false`:

```text
Generate only the requested question count.

Do not generate an adaptive surplus pool.

Still produce estimatedDifficulty and Bloom metadata for every question.
```

---

# 14. SOURCE LIMITATION RULE

Adaptive percentages must never override grounding.

If the PDF cannot support enough genuinely difficult questions:

```text
DO NOT fabricate hard questions.
```

Instead:

```text
grounded question quality
>
perfect percentage distribution
```

The system may record the achieved distribution.

Example:

```json
{
  "requestedDistribution": {
    "easy": 0.30,
    "medium": 0.40,
    "hard": 0.30
  },
  "achievedDistribution": {
    "easy": 0.40,
    "medium": 0.50,
    "hard": 0.10
  }
}
```

This is preferable to generating unsupported questions.

---

# 15. QUESTION-TYPE DISTRIBUTION MUST REMAIN SEPARATE

Adaptive difficulty must NOT replace question-type selection.

Preserve all supported first-class types:

1. Multiple Choice
2. Step-by-step Solution
3. Numerical Input
4. Graphing/Plotting

The system must not convert everything to MCQ simply because adaptive generation is enabled.

For example:

```text
Step-by-step + estimatedDifficulty 0.78
Numerical Input + estimatedDifficulty 0.61
MCQ + estimatedDifficulty 0.33
Graphing + estimatedDifficulty 0.49
```

Question type and difficulty are separate dimensions.

---

# 16. BLOOM TAXONOMY

Preserve Bloom metadata.

Supported conceptual levels:

```text
Remember
Understand
Apply
Analyze
Evaluate
Create
```

Do not require every pool to contain every Bloom level.

The source material determines what is defensible.

Do not mechanically assume:

```text
Remember = Easy
Analyze = Hard
```

Difficulty should represent overall cognitive demand.

---

# 17. STAGE 5 — CRITIC VALIDATION

The critic stage remains mandatory.

Optimize it through batching.

Preferred:

```text
questions[]
↓
one structured critic request
↓
verdict per question
```

Avoid:

```text
question 1 → API
question 2 → API
question 3 → API
...
```

unless provider output limits make controlled sub-batches necessary.

Perform cheap deterministic checks before the critic.

Examples:

- required fields
- supported question type
- valid choices
- exactly one MCQ correct answer
- difficulty range
- Bloom enum
- answer presence
- answerData shape
- graph data requirements
- step structure requirements

Invalid questions should be rejected before spending another LLM call.

---

# 18. STAGE 5.5 — GROUNDING

Keep deterministic grounding.

A question that fails grounding must not be accepted merely because its critic score is good.

Preserve:

```text
question → source evidence
```

and ensure source evidence is traceable to the retrieved chunks.

---

# 19. STAGE 6 — SEMANTIC SIMILARITY

## 19.1 DO NOT REMOVE STAGE 6

This stage must remain.

The problem is excessive remote round trips.

Current run demonstrates repeated:

```text
gemini-embedding-2:batchEmbedContents
```

during semantic validation.

Even though the endpoint supports batching, the implementation is effectively processing questions individually or in tiny repeated groups.

---

# 20. BATCH SEMANTIC EMBEDDINGS

Replace the repeated pattern:

```text
for question:
    embed(question)
    embed(context)
    cosine()
```

with:

```text
accepted questions
      ↓
build all semantic texts
      ↓
ONE/Few batch embedding requests
      ↓
local cosine calculations
      ↓
per-question scores
```

Where possible, embed all question texts in one batch and all corresponding evidence texts in one batch.

Do not repeatedly embed identical source chunks.

---

# 21. REUSE EMBEDDINGS

If retrieval already produced an embedding for a chunk and that embedding is compatible with the semantic comparison, reuse it.

Do not re-embed the same source text unnecessarily.

Maintain a clear distinction between:

```text
retrieval embedding
```

and:

```text
semantic validation embedding
```

Only reuse when the model/vector representation is actually compatible.

Do not trade correctness for fewer calls.

---

# 22. LOCAL COSINE CALCULATION

After embeddings are obtained:

```text
cosine_similarity(question_embedding, source_embedding)
```

must be calculated locally.

Do not call an LLM to calculate similarity.

Do not send each pair to another remote service.

---

# 23. SEMANTIC THRESHOLD

Do not blindly lower the threshold simply to increase the final count.

Current examples show:

```text
0.738 → failed
0.711 → failed
0.780 → passed
0.760 → passed
0.818 → passed
...
```

Before changing thresholds, evaluate why valid mathematical questions are receiving lower similarity.

Potential issue:

```text
question wording
≠
literal source wording
```

A semantically correct generated question can have lower cosine similarity despite being grounded.

If tuning is needed:

1. collect scores
2. inspect false negatives
3. compare against critic + deterministic grounding
4. choose threshold using validation data
5. document the chosen threshold

Do not simply set the threshold extremely low.

---

# 24. STAGE 7 — CURRENT DATABASE FAILURE

Current authoritative error:

```text
Failed to save questions to DB:
name 'topic' is not defined
```

This is a real implementation bug.

The more serious problem is that the pipeline then logs:

```text
SUCCESS: 8 questions saved
```

even though the save failed.

That MUST be fixed.

---

# 25. NO FAKE SUCCESS

This is non-negotiable.

Never do:

```python
try:
    save()
except Exception:
    logger.error(...)

logger.info("SUCCESS")
```

Instead:

```text
validate
↓
persist
↓
verify persisted count/records
↓
only then COMPLETED
```

If persistence fails:

```text
generation_runs.status = FAILED or PARTIAL
```

according to the existing state model.

Return the actual saved count.

---

# 26. FIX `topic` VARIABLE ERROR

Trace the current Stage 7 save function.

The current runtime indicates a reference to:

```python
topic
```

where that variable is not defined in the relevant scope.

Do NOT simply declare a random empty variable to silence the exception.

Determine the correct source of topic:

```text
generation request
or
retrieved chunk metadata
or
generated question metadata
```

Then explicitly pass it through the save layer.

Every accepted question must have a deterministic topic value or a valid nullable representation if the database permits it.

---

# 27. SUPABASE PERSISTENCE CONTRACT

For every accepted question, verify:

## GeneratedQuestion

- [ ] userId
- [ ] docId
- [ ] text
- [ ] type
- [ ] difficulty compatibility with existing schema
- [ ] estimatedDifficulty
- [ ] bloomLevel
- [ ] topic
- [ ] answer
- [ ] answerData
- [ ] request_id
- [ ] status
- [ ] timeLimit where applicable
- [ ] testCases only where applicable

Do not invent fields if the actual current schema does not contain them.

Inspect the current Prisma/Supabase schema first.

---

# 28. QUESTION CHOICE PERSISTENCE

For MCQ:

- [ ] exactly four choices where the current contract requires four
- [ ] A/B/C/D preserved
- [ ] exactly one correct answer
- [ ] QuestionChoice rows linked to GeneratedQuestion
- [ ] correct answer survives reload

For non-MCQ:

Do not manufacture MCQ choice rows.

---

# 29. QUESTION CITATION PERSISTENCE

Every accepted question must have source citation data when supported.

Preserve:

```text
docName
section
pageRange
excerpt
confidence
```

The values must originate from retrieval/source metadata.

Never let the LLM invent page numbers.

If page metadata genuinely does not exist:

```text
pageRange = null
```

not a guessed number.

---

# 30. ANSWER DATA BY QUESTION TYPE

Do not flatten structured questions into plain text.

## Step-by-step

Preserve structured steps/solution data.

Example concept:

```json
{
  "steps": [
    "...",
    "...",
    "..."
  ]
}
```

Use the project's actual schema rather than blindly introducing this exact shape.

## Numerical Input

Preserve:

- expected numeric answer
- tolerance/precision if supported
- unit if supported
- explanation

## Graphing/Plotting

Preserve:

- mathematical expression
- graph metadata
- plotting instructions/data
- expected graph properties

Do NOT generate arbitrary executable code merely to draw a graph unless the existing system explicitly requires it.

## MCQ

Preserve choices and correct answer.

---

# 31. DATABASE TRANSACTION / IDEMPOTENCY

The save operation must be safe against duplicate Celery execution.

Use:

```text
request_id
```

as the generation-run identity.

Before inserting duplicates, determine whether the request has already persisted questions.

Possible safe behavior:

```text
same request_id + already completed
→ do not duplicate records
```

Do not invent a new idempotency strategy without inspecting the existing schema/constraints.

---

# 32. SAVE VERIFICATION

After insertion:

```text
expected accepted count
        ↓
query/count persisted questions for request_id
        ↓
verify dependent choices/citations
        ↓
set saved_count
```

Example:

```text
Final validated: 8
DB persisted: 8
```

Only then:

```text
generation_runs = COMPLETED
```

If:

```text
Final validated: 8
DB persisted: 0
```

the task must NOT report success.

---

# 33. GENERATION RUN STATE

Recommended state flow:

```text
QUEUED
  ↓
RETRIEVING
  ↓
GENERATING
  ↓
VALIDATING
  ↓
SAVING
  ↓
COMPLETED
```

Alternative terminal states:

```text
PARTIAL
FAILED
```

The exact enum must follow the existing database schema.

The `saved_count` must represent actual persisted records.

---

# 34. REDIS RESPONSIBILITY

Redis is transient progress/result infrastructure.

Supabase is the persistent source of truth.

Do not make the frontend dependent on Redis for already-completed generated questions.

Correct architecture:

```text
Celery
  ↓
Supabase persistence
  ↓
Redis progress/completion signal
  ↓
Frontend refreshes persisted data
```

---

# 35. UI STATE RECOVERY

Integrate the existing:

```text
ai-backend/ui_state_recovery_plan.md
```

Do not replace its concept.

The existing strategy is:

```text
generation starts
↓
save request_id to localStorage
↓
page refresh/navigation
↓
read request_id
↓
check status endpoint
↓
if active, restore UI and polling
↓
if terminal, clear localStorage and refresh generated data
```

---

# 36. LOCALSTORAGE CONTRACT

On successful generation start:

```typescript
localStorage.setItem(
  "activeGenerationTask",
  requestId
);
```

On:

```text
COMPLETED
PARTIAL
FAILED
```

clear:

```typescript
localStorage.removeItem("activeGenerationTask");
```

Do not leave stale tasks indefinitely.

---

# 37. SINGLE POLLING LOOP

Do not create multiple polling intervals.

Use one reusable concept:

```typescript
startPolling(requestId)
```

It should be usable by:

- normal generation flow
- page-load recovery

Clean it up on component unmount.

Avoid:

```text
handleGenerate → interval A
useEffect → interval B
```

for the same request.

---

# 38. STATUS API

The status endpoint should expose enough information for recovery and progress UI.

Conceptually:

```json
{
  "requestId": "...",
  "status": "GENERATING",
  "stage": "Batch generation",
  "progress": 47,
  "requestedCount": 10,
  "rawGenerated": 12,
  "validated": 9,
  "saved": 0,
  "isAdaptive": true,
  "targetPoolSize": 30
}
```

Only expose fields that match the actual API architecture.

For non-adaptive generation:

```text
targetPoolSize = requestedCount
```

For adaptive generation:

```text
targetPoolSize >= requestedCount
```

---

# 39. FRONTEND DATA REFRESH

After terminal status:

```text
COMPLETED
or
PARTIAL
```

refresh generated questions from Supabase-backed API.

Do not assume Redis contains the full persistent question set.

Verify:

```text
GeneratedQuestion
QuestionChoice
QuestionCitation
```

are all returned correctly.

---

# 40. FRONTEND GENERATION CONTRACT

The frontend request should look conceptually like:

```json
{
  "document_id": 148,
  "count": 5,
  "types": [
    "Step-by-step Solution",
    "Numerical Input"
  ],
  "isAdaptive": true
}
```

Do NOT send a user-selected difficulty.

When omitted:

```text
isAdaptive = true
```

must be the backend default.

---

# 41. BACKWARD COMPATIBILITY

Existing calls without:

```text
isAdaptive
```

must continue working.

Default:

```text
true
```

is required.

If an existing caller explicitly sends:

```json
"isAdaptive": false
```

the backend must honor it.

Do not silently force adaptive behavior when the caller explicitly disables it.

---

# 42. ADAPTIVE METADATA TO PERSIST

For every generated question, preserve enough metadata for future adaptive selection:

```text
estimatedDifficulty
bloomLevel
topic
question type
source document/chunk
```

Later adaptive selection can use:

```text
estimated difficulty
+
observed student performance
+
topic mastery
+
question type
+
Bloom level
```

Do NOT implement the full student-adaptation algorithm in this performance patch unless it already exists.

This task prepares the generated pool for it.

---

# 43. ESTIMATED VS OBSERVED DIFFICULTY

Keep these concepts separate:

```text
estimatedDifficulty
actualObservedDifficulty
```

The LLM-generated value is an estimate.

Later student data can calibrate it using:

- correctness
- response time
- attempts
- answer changes
- historical performance

Do not claim:

```text
difficulty = 0.90
```

means exactly 90% of students will fail.

---

# 44. ADAPTIVE POOL GENERATION RULES

For:

```text
isAdaptive=true
```

use:

```text
requestedCount
× poolMultiplier
→ targetPoolSize
```

Default:

```text
poolMultiplier = 3
```

The pool may be expanded toward 5x where justified.

### Manual question interaction

If professors already have manually created questions:

```text
existing eligible pool
+
AI-generated gap
=
target adaptive pool
```

Do not regenerate a full pool unnecessarily.

Example:

```text
target = 30
existing = 22
missing = 8
→ generate approximately 8 new candidates
```

---

# 45. DO NOT GENERATE A SURPLUS FOR NON-ADAPTIVE MODE

For:

```text
isAdaptive=false
```

the system should target:

```text
requestedCount
```

not:

```text
requestedCount × 3
```

This keeps the normal generation path fast.

---

# 46. PROVIDER-AWARE ADAPTIVE GENERATION

Adaptive mode can generate a larger pool, but it must not cause a single enormous LLM request.

Example:

```text
30-question pool
↓
safe batches
↓
critic batches
↓
semantic batches
↓
persistence batches
```

Never:

```text
30 questions → one massive request
```

if that request exceeds provider output/token limits.

---

# 47. PERFORMANCE TARGETS

Do not promise an exact runtime before benchmarking.

Instead measure:

```text
retrieval latency
generation latency
critic latency
grounding latency
semantic latency
persistence latency
total latency
```

For every run log:

```text
stage
start
end
duration
remote_calls
retry_count
provider
```

The goal is to remove wasted waiting and redundant network calls.

---

# 48. EXPECTED OPTIMIZED FLOW

```text
PDF
 ↓
Stage 1: Markdown
 ↓
Stage 2: structure-aware chunks
 ↓
Stage 3: hybrid retrieval + reranking
 ↓
Stage 4: controlled batch generation
      ├── isAdaptive=false → requested count
      └── isAdaptive=true  → adaptive surplus pool
                               ↓
                         30/40/30 targets
 ↓
cheap deterministic validation
 ↓
Stage 5: batch critic
 ↓
Stage 5.5: deterministic grounding
 ↓
Stage 6: batch embeddings
      ↓
local cosine calculations
 ↓
Stage 7: transactional persistence
      ↓
GeneratedQuestion
QuestionChoice
QuestionCitation
generation_runs
 ↓
Redis progress/completion
 ↓
frontend refresh
 ↓
Generated section
```

All stages remain.

---

# 49. CURRENT LOG-SPECIFIC CHECKLIST

Use the September 3, 2026 log supplied by the user.

## Retrieval

- [ ] Gemini embedding request succeeds
- [ ] hybrid RPC succeeds
- [ ] no unnecessary repeated retrieval
- [ ] retrieved metadata retained

## Generation

- [ ] Groq HTTP 200 is not automatically treated as provider failure
- [ ] truncation is distinguished from transport/provider failure
- [ ] output-aware batching implemented
- [ ] Groq TPM budget respected
- [ ] no unnecessary Gemini fallback
- [ ] provider health tracked per run

## Rate limits

- [ ] no arbitrary fixed sleeps
- [ ] Retry-After honored
- [ ] exhausted provider skipped for appropriate period
- [ ] fallback does not immediately cause another rate-limit storm

## Critic

- [ ] batch critic retained
- [ ] no unnecessary per-question API calls
- [ ] no unnecessary successful-request sleeps

## Semantic

- [ ] Stage 6 retained
- [ ] embeddings batched
- [ ] source embeddings reused where compatible
- [ ] question embeddings batched
- [ ] cosine calculated locally
- [ ] semantic threshold not blindly lowered

## Persistence

- [ ] `topic` scope bug fixed
- [ ] GeneratedQuestion actually inserted
- [ ] QuestionChoice actually inserted
- [ ] QuestionCitation actually inserted
- [ ] answerData persisted
- [ ] saved_count verified
- [ ] DB exception cannot produce SUCCESS
- [ ] COMPLETED only after persistence verification

---

# 50. CODING-ASSISTANT MASTER PROMPT

> You are the senior RAG/LLM/backend engineer responsible for optimizing QuizArenaRemastered.
>
> Work directly from the existing repository. Do not redesign unrelated features.
>
> **HARD CONSTRAINT 1:** Do NOT remove any of the existing RAG/generation stages.
>
> **HARD CONSTRAINT 2:** Do NOT require billing or paid providers.
>
> **HARD CONSTRAINT 3:** Do NOT weaken critic, grounding, semantic validation, citations, or structured question support merely to improve latency.
>
> **HARD CONSTRAINT 4:** The September 3, 2026 log supplied directly by the user is the authoritative current runtime evidence. Do NOT use old Celery log files as the current diagnosis.
>
> First inspect the current source files and actual schema before modifying code.
>
> Then produce a concise file-by-file implementation plan.
>
> Implement the following:
>
> 1. Keep every pipeline stage.
> 2. Preserve PDF/Markdown processing and structure-aware chunking.
> 3. Preserve retrieval and reranking.
> 4. Preserve batch generation.
> 5. Fix Groq truncation handling so a successful HTTP 200 with incomplete output does not automatically trigger an expensive Gemini fallback.
> 6. Use output-aware generation batch sizes.
> 7. Implement provider-aware token budgeting.
> 8. Detect and avoid repeated provider rate-limit failures.
> 9. Remove unnecessary fixed sleeps.
> 10. Honor provider Retry-After information.
> 11. Keep critic validation but batch it.
> 12. Keep deterministic grounding.
> 13. Keep Stage 6 semantic similarity.
> 14. Batch semantic embeddings.
> 15. Calculate cosine similarity locally.
> 16. Reuse compatible embeddings instead of re-embedding identical source content.
> 17. Fix the Stage 7 `topic is not defined` error using the correct existing data flow.
> 18. Never swallow a Supabase persistence exception.
> 19. Never report SUCCESS if persistence failed.
> 20. Verify actual persisted counts before marking the run COMPLETED.
> 21. Preserve GeneratedQuestion, QuestionChoice, QuestionCitation and answerData.
> 22. Preserve citation metadata from retrieved source metadata.
> 23. Never fabricate page numbers.
> 24. Preserve Multiple Choice, Step-by-step Solution, Numerical Input, and Graphing/Plotting.
> 25. Preserve estimatedDifficulty and Bloom metadata.
> 26. Add `isAdaptive: boolean` to the generation API contract.
> 27. Default `isAdaptive` to `true`.
> 28. When `isAdaptive=false`, target only the requested question count.
> 29. When `isAdaptive=true`, generate an adaptive-ready surplus pool.
> 30. Default adaptive pool multiplier to 3x, with controlled support for 3x–5x.
> 31. Use default difficulty generation targets of 30% Easy, 40% Medium, 30% Hard.
> 32. Store continuous estimatedDifficulty from 0.00 to 1.00.
> 33. Do not add a manual difficulty selector.
> 34. Do not force unsupported difficulty when the source cannot support it.
> 35. Keep question-type distribution separate from difficulty distribution.
> 36. Preserve Bloom taxonomy metadata.
> 37. Integrate `ui_state_recovery_plan.md`.
> 38. Store request_id in localStorage on generation start.
> 39. Clear it on COMPLETED/PARTIAL/FAILED.
> 40. Restore active generation after page refresh.
> 41. Use one polling implementation instead of multiple intervals.
> 42. Refresh generated questions from persistent backend data after completion.
> 43. Keep Redis as transient state and Supabase as persistent source of truth.
> 44. Make Celery persistence idempotent.
>
> Do not blindly rewrite working architecture.
>
> Before changing provider/model names, inspect current configuration and current runtime evidence.
>
> Do not claim the implementation is complete until:
>
> - generated questions are actually retrievable from Supabase
> - choices are retrievable
> - citations are retrievable
> - generation_runs is correct
> - frontend Generated data is visible
> - refresh recovery works
> - both adaptive and non-adaptive generation work
> - all four question types remain supported
> - no fake SUCCESS occurs after DB failure.

---

# 51. IMPLEMENTATION ORDER

## Phase 0 — Baseline

- [ ] Inspect current code
- [ ] Inspect current database schema
- [ ] Inspect current API contracts
- [ ] Inspect current `ui_state_recovery_plan.md`
- [ ] Use the September 3 user-supplied log as current performance evidence
- [ ] Do not use old Celery logs as current evidence
- [ ] Record baseline runtime

## Phase 1 — Provider optimization

- [ ] Centralized provider calls
- [ ] Provider health state
- [ ] TPM-aware batching
- [ ] Retry-After support
- [ ] No fixed successful-request sleeps
- [ ] Truncation handled separately from provider failure
- [ ] No unnecessary fallback

## Phase 2 — Generation

- [ ] Controlled batching
- [ ] Output-aware batch size
- [ ] Exact-count non-adaptive mode
- [ ] Adaptive pool mode
- [ ] 30/40/30 default difficulty targets
- [ ] Continuous difficulty values
- [ ] Question-type preservation
- [ ] Bloom preservation

## Phase 3 — Validation

- [ ] Deterministic structural validation first
- [ ] Batch critic
- [ ] Grounding retained
- [ ] Batched semantic embeddings
- [ ] Local cosine
- [ ] Compatible embedding reuse
- [ ] No Stage 6 removal

## Phase 4 — Persistence

- [ ] Fix undefined `topic`
- [ ] GeneratedQuestion insert
- [ ] QuestionChoice insert
- [ ] QuestionCitation insert
- [ ] answerData insert
- [ ] request_id association
- [ ] idempotency
- [ ] persistence verification
- [ ] accurate saved_count
- [ ] COMPLETED only after successful save

## Phase 5 — Frontend

- [ ] `isAdaptive` request parameter
- [ ] default true
- [ ] no manual difficulty selector
- [ ] localStorage request_id
- [ ] recovery on page load
- [ ] single polling loop
- [ ] stale state cleanup
- [ ] refresh persisted questions
- [ ] all four question types render

## Phase 6 — Testing

- [ ] 3-question non-adaptive test
- [ ] 5-question non-adaptive test
- [ ] 10-question non-adaptive test
- [ ] 5-question adaptive test
- [ ] adaptive pool count verified
- [ ] difficulty distribution verified
- [ ] mixed question types verified
- [ ] MCQ choices verified
- [ ] step-by-step structure verified
- [ ] numerical answerData verified
- [ ] graphing data verified
- [ ] citations verified
- [ ] DB rows verified
- [ ] page refresh during generation
- [ ] duplicate task execution
- [ ] provider 429 simulation/handling
- [ ] Groq truncation handling
- [ ] DB failure handling

---

# 52. FINAL MASTER CHECKLIST

## Architecture

- [ ] All seven logical stages preserved
- [ ] No unrelated features modified
- [ ] No billing requirement
- [ ] Celery remains asynchronous
- [ ] Redis remains transient
- [ ] Supabase remains source of truth

## Speed

- [ ] Retrieval performed only as necessary
- [ ] Retrieved context reused
- [ ] Generation batched
- [ ] Output-aware generation batch size
- [ ] Groq truncation does not cause unnecessary Gemini fallback
- [ ] TPM-aware provider routing
- [ ] No fixed successful-request sleeps
- [ ] Retry-After honored
- [ ] Provider health tracked
- [ ] Exhausted providers skipped
- [ ] Critic batched
- [ ] Semantic embeddings batched
- [ ] Cosine calculated locally
- [ ] Duplicate embeddings avoided
- [ ] Stage timings logged

## Quality

- [ ] Structural validation preserved
- [ ] Critic preserved
- [ ] Grounding preserved
- [ ] Semantic stage preserved
- [ ] MCQ preserved
- [ ] Step-by-step preserved
- [ ] Numerical Input preserved
- [ ] Graphing/Plotting preserved
- [ ] Difficulty preserved
- [ ] Bloom preserved
- [ ] No fabricated citations
- [ ] Graph safety preserved

## Adaptive

- [ ] `isAdaptive` added
- [ ] Default is `true`
- [ ] Explicit `false` respected
- [ ] Non-adaptive mode targets requested count
- [ ] Adaptive mode creates surplus pool
- [ ] Default pool multiplier = 3x
- [ ] 3x–5x support is controlled/configurable
- [ ] Default 30/40/30 difficulty target
- [ ] Integer distribution sums exactly to pool target
- [ ] Continuous estimatedDifficulty stored
- [ ] No manual difficulty selector
- [ ] Difficulty never overrides grounding
- [ ] Existing manual questions can fill pool gaps
- [ ] Adaptive pool generated before student quiz
- [ ] No real-time LLM generation required during exam

## Database

- [ ] `topic` undefined-variable bug fixed
- [ ] GeneratedQuestion inserted
- [ ] QuestionChoice inserted
- [ ] QuestionCitation inserted
- [ ] answerData inserted
- [ ] estimatedDifficulty inserted
- [ ] bloomLevel inserted
- [ ] request_id inserted
- [ ] generation_runs updated
- [ ] saved_count accurate
- [ ] persistence verified
- [ ] duplicate execution idempotent
- [ ] DB failure cannot produce fake SUCCESS
- [ ] COMPLETED only after persistence

## Citations

- [ ] docName
- [ ] section
- [ ] pageRange when known
- [ ] excerpt
- [ ] confidence
- [ ] source metadata preserved
- [ ] no fabricated page numbers

## UI Recovery

- [ ] requestId returned
- [ ] requestId saved to localStorage
- [ ] active generation restored after refresh
- [ ] status endpoint queried
- [ ] one polling loop
- [ ] stale localStorage cleared
- [ ] terminal state handled
- [ ] generated data refreshed
- [ ] no browser dependency for persistence
- [ ] all question types visible
- [ ] citations visible

---

# 53. DEFINITION OF DONE

The system is complete only when this works:

```text
Professor requests generation
        ↓
isAdaptive defaults to true
        ↓
request_id created
        ↓
request_id stored in frontend localStorage
        ↓
Celery starts
        ↓
Stage 1
PDF → Markdown
        ↓
Stage 2
Structure-aware chunking
        ↓
Stage 3
Hybrid retrieval + reranking
        ↓
Stage 4
Controlled batch generation
        ↓
if isAdaptive=true:
    generate adaptive-ready surplus pool
    target 30/40/30 difficulty distribution
else:
    generate requested count
        ↓
Structural validation
        ↓
Stage 5
Batch critic
        ↓
Grounding verification
        ↓
Stage 6
Batch semantic embeddings
        ↓
Local cosine verification
        ↓
Stage 7
Transactional/idempotent persistence
        ↓
GeneratedQuestion
        ↓
QuestionChoice where applicable
        ↓
QuestionCitation
        ↓
generation_runs saved_count verified
        ↓
COMPLETED
        ↓
Redis completion/progress
        ↓
frontend refresh
        ↓
Generated questions visible
        ↓
Professor reviews
        ↓
Future adaptive engine selects questions
```

The implementation is **NOT DONE** if:

```text
DB save failed
but SUCCESS was logged
```

or:

```text
isAdaptive is ignored
```

or:

```text
adaptive=true generates only the requested five questions
```

or:

```text
adaptive=true removes question-type diversity
```

or:

```text
Stage 5/Stage 6 is removed
```

or:

```text
old Celery logs are used to justify current provider changes
```

---

# 54. FINAL ENGINEERING PRINCIPLE

Do not make QuizArenaRemastered faster by deleting intelligence.

Make it faster by eliminating:

```text
unnecessary API calls
unnecessary retries
unnecessary fallback
unnecessary sleeps
unnecessary embeddings
unnecessary regeneration
unnecessary database writes
```

while preserving:

```text
RAG
+
retrieval
+
reranking
+
structured generation
+
critic
+
grounding
+
semantic verification
+
citation traceability
+
adaptive-ready metadata
+
transactional persistence
+
Celery
+
Redis progress
+
UI recovery
```

**Optimize the pipeline. Do not amputate the pipeline.**
