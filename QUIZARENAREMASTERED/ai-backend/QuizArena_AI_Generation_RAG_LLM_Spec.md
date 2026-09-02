# QuizArena AI Quiz Generation — RAG/LLM Production Fix Specification

## 0. Purpose

This specification is for the coding assistant implementing the next revision of QuizArena's AI quiz-generation pipeline.

The implementation must fix four core problems:

1. **Generation is too slow**, especially during critic and embedding validation.
2. **The pipeline can appear to restart/reprocess the document** after questions were already generated.
3. **All supported question types must be first-class structured outputs**, not merely strings:
   - Multiple Choice
   - Step-by-step Solution
   - Numerical Input
   - Graphing/Plotting
4. **Validated questions, choices, structured answers, difficulty/Bloom metadata, and citations must be persisted to Supabase and immediately reviewable in the professor frontend.**

This specification is grounded in the attached repository snapshot and the supplied Supabase schema.

---

# 1. Evidence From the Current Codebase

## 1.1 Current pipeline

The repository describes a seven-stage pipeline:

1. PDF → Markdown
2. Structure-aware chunking
3. Cross-encoder reranking
4. Batch question generation
5. Batch critic validation
6. Cosine similarity verification
7. Redis result storage

The worker explicitly advertises batch generation, batch critic validation, and cosine similarity verification. `BATCH_SIZE` is intended to reduce LLM calls. See the repository's worker description. 

The current worker implementation uses the supplied chunks, takes up to 10 chunks, batches them, calls `generate_batch_questions`, then sleeps between batches. The code currently asks for **two questions per chunk**, not the requested total count. fileciteturn2file0L37-L81

## 1.2 The observed 360-second run is genuinely slow

The supplied Celery log shows:

- 18 raw questions generated.
- Critic validation began.
- Groq returned HTTP 429 and requested a ~16 second delay.
- Another Groq request returned HTTP 429 and requested ~22 seconds.
- The worker also intentionally sleeps 12 seconds between critic batches.
- 17/18 questions eventually passed.
- Semantic similarity then attempted embedding calls repeatedly.
- Gemini's old `embedding-001` endpoint returned 404.
- OpenAI embeddings repeatedly returned 429 because the account had no credits.
- The system nevertheless accepted the questions on critic merit.
- The task ultimately reported **360.0245918 seconds**. fileciteturn5file2L323-L365

### Diagnosis

The largest performance defect is not Celery itself.

The expensive sequence is:

`generation → many critic LLM calls + deliberate sleeps → per-question embedding calls → failed provider fallback/retries`

The semantic stage performs **two embeddings per accepted question** (`question_text` and `context_text`). It is inside a loop over every critic-passed question. fileciteturn5file0L39-L80

With 17 questions, that is up to 34 embedding operations before considering provider fallback/retry overhead.

The log confirms that those embedding calls are failing anyway, so the current implementation spends substantial time attempting an unavailable/incorrect Gemini embedding endpoint and an exhausted OpenAI account before falling back to critic merit. fileciteturn5file2L323-L340

**Required conclusion:** do not run an expensive embedding call per question in the final validation loop.

---

# 2. Critical Bug: Why It Can Look Like It Goes Back to Processing

Yes, seeing the worker return to retrieval/generation can be normal **only when a new Celery task was actually submitted or when the worker deliberately invokes regeneration**. It should not happen after a successful run.

The current code contains a real regeneration path:

```text
if not valid_questions and attempt < 2:
    config['_attempt'] = 2
    config['types'] = ['Multiple Choice']
    return process_and_generate_quiz(...)
```

That recursively starts the whole pipeline again and, worse, changes the requested question types to Multiple Choice. fileciteturn5file1L243-L249

This must be removed.

A failed quality gate should regenerate **only the rejected items**, with the same requested type contract, rather than rerunning the entire document.

There is also a frontend/backend orchestration problem: `/generate` starts a Celery task and returns `202`, while subsequent calls check Redis for completion. The frontend currently reacts to a processing response by recursively calling `handleGenerate(config)` every five seconds. fileciteturn6file0L31-L72 fileciteturn3file9L936-L958

This is fragile because the frontend is effectively using the generation endpoint as both:

- "start generation"
- "poll generation"
- "fetch results"

That must be separated.

---

# 3. Target Architecture

## 3.1 Correct responsibility split

### Next.js frontend

Responsible for:

- starting a generation run
- displaying generation progress
- polling/subscribing to generation status
- displaying generated questions
- allowing professor review/edit/approve/reject

### FastAPI

Responsible for:

- validating generation requests
- creating a generation run identifier
- enqueueing Celery
- returning immediately

### Celery

Responsible for:

- retrieval
- generation
- validation
- persistence
- generation-run status updates

### Redis

Use Redis for:

- short-lived generation progress/state
- Celery coordination
- realtime progress events if desired

Do **not** treat Redis as the permanent question database.

### Supabase/PostgreSQL

Source of truth for:

- GeneratedQuestion
- QuestionChoice
- QuestionCitation
- structured answer metadata
- generation audit information

The current worker only stores final questions in Redis. fileciteturn5file0L82-L114

That is insufficient for permanent storage.

---

# 4. Generation Run Model

Add a persistent generation-run concept.

## Recommended table

```sql
CREATE TABLE public.generation_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id text NOT NULL UNIQUE,
  user_id uuid NOT NULL REFERENCES public.profiles(user_id),
  doc_id integer NOT NULL REFERENCES public."SyllabusDoc"(id) ON DELETE CASCADE,

  requested_count integer NOT NULL,
  requested_types jsonb NOT NULL,

  status text NOT NULL DEFAULT 'QUEUED',
  stage text,
  progress integer NOT NULL DEFAULT 0,

  raw_count integer DEFAULT 0,
  validated_count integer DEFAULT 0,
  saved_count integer DEFAULT 0,

  retrieval_latency_ms double precision,
  generation_latency_ms double precision,
  validation_latency_ms double precision,
  persistence_latency_ms double precision,
  total_latency_ms double precision,

  error_message text,
  created_at timestamptz NOT NULL DEFAULT now(),
  started_at timestamptz,
  finished_at timestamptz
);
```

### Status values

Use:

```text
QUEUED
RETRIEVING
GENERATING
VALIDATING
SAVING
COMPLETED
PARTIAL
FAILED
```

### Why this matters

The frontend should no longer infer state from whether `/generate` returns 202/404.

It should query:

```text
GET /api/rag/generate/status?request_id=...
```

and receive:

```json
{
  "requestId": "...",
  "status": "GENERATING",
  "stage": "Batch 2/3",
  "progress": 55,
  "generated": 6,
  "validated": 0,
  "saved": 0
}
```

---

# 5. Generation Flow

## Target flow

```text
Professor clicks Generate
        |
        v
Next.js POST /api/rag/generate
        |
        v
FastAPI POST /generate
        |
        +--> create request_id
        +--> create generation_runs row
        +--> Celery.delay(request_id, doc_id, config)
        |
        v
Return 202 immediately
        |
        v
Frontend polls /api/rag/generate/status
        |
        +-----------------------------+
        |                             |
        v                             v
Redis progress                  Supabase generation_runs
        |                             |
        +-------------+---------------+
                      |
                      v
              COMPLETED
                      |
                      v
Frontend fetches saved questions
                      |
                      v
Professor review
```

Never make `/generate` recursively call the generation task.

Never make the frontend call `/generate` every five seconds.

---

# 6. Retrieval Must Not Be Repeated Unnecessarily

The worker currently has two architectural variants in the repository:

- one version uses the chunks passed from the frontend directly;
- another version performs dynamic hybrid retrieval inside Celery.

The dynamic retrieval path creates an embedding query, calls `match_document_chunks_v2`, reranks candidates, and takes the top 10 chunks. fileciteturn6file3L306-L351

This is useful, but it should happen **once per generation run**.

## Target

```text
Generation run
  -> retrieve once
  -> cache retrieved chunks in memory for the run
  -> generate
  -> validate against those exact chunks
```

Do not retrieve again for every question.

Do not re-embed the document for every question.

Do not rerun retrieval during regeneration of rejected questions.

---

# 7. Question Count Bug — FIX THIS FIRST

The current generator asks for:

```text
len(chunks) * 2
```

questions.

For example, 3 chunks produces 6 questions.

The log confirms:

```text
Batch 3 -> Generated 6 questions
Total raw questions generated: 18
```

even though a later request had `count=3`. fileciteturn5file2L365-L379

This is incorrect.

## Required behavior

If professor requests:

```json
{
  "count": 10
}
```

the system should target:

```text
10 final questions
```

not:

```text
10 chunks × 2
```

or:

```text
18 raw questions then slice to 10
```

## Recommended generation strategy

Calculate:

```text
target_count = requested_count
```

Then allocate types.

Example:

```text
10 questions
MCQ                 3
Step-by-step        3
Numerical Input     2
Graphing/Plotting   2
```

If the professor selected only two types:

```text
10 questions
MCQ                 5
Numerical Input     5
```

Use deterministic round-robin allocation so every selected type is represented.

---

# 8. Difficulty Must Be Generated, Not Selected

The current codebase still contains `difficulty` in the request and generation prompt, even though the newer frontend direction removes professor-selected difficulty.

The current worker logs `difficulty=None` in one run, while the generator still constructs prompts around a target difficulty. fileciteturn5file2L369-L372

## Required behavior

Remove difficulty selection from the professor generation UI.

The LLM must estimate:

```json
"estimated_difficulty": 0.82
```

and:

```json
"bloom_level": "ANALYZE"
```

Difficulty is metadata generated by the system.

## Difficulty normalization

Require:

```text
0.00 <= estimated_difficulty <= 1.00
```

Suggested labels only for backward compatibility:

```text
0.00–0.32 = Easy
0.33–0.66 = Medium
0.67–1.00 = Hard
```

The repository already contains this numeric-to-label normalization logic. fileciteturn5file1L200-L229

Do not ask the LLM to return only "Easy/Medium/Hard".

---

# 9. Universal Question Contract

The LLM must return structured JSON.

Use a discriminated structure based on `type`.

```json
{
  "text": "...",
  "type": "Multiple Choice",
  "topic": "Differentiation",
  "estimated_difficulty": 0.58,
  "bloom_level": "APPLY",
  "answer": "...",
  "answer_data": {},
  "citation": {
    "docId": 133,
    "docName": "sample_math_quiz_material.pdf",
    "section": "Basic Differentiation Rules",
    "pageRange": "4-5",
    "excerpt": "...",
    "confidence": 0.94
  }
}
```

---

# 10. Multiple Choice Contract

```json
{
  "type": "Multiple Choice",
  "text": "What is the derivative of ...?",
  "answer": "3x^2",
  "answer_data": {
    "correctLabel": "B"
  },
  "choices": [
    {
      "label": "A",
      "text": "3x",
      "isCorrect": false
    },
    {
      "label": "B",
      "text": "3x^2",
      "isCorrect": true
    },
    {
      "label": "C",
      "text": "x^3",
      "isCorrect": false
    },
    {
      "label": "D",
      "text": "2x",
      "isCorrect": false
    }
  ]
}
```

Validation:

- exactly 4 choices
- labels A/B/C/D
- exactly one `isCorrect=true`
- `answer` must agree with the correct choice
- choices must not be duplicates
- no "all of the above" unless explicitly supported
- no choice may reveal the answer through wording

---

# 11. Step-by-Step Solution Contract

This must be a real step-answer question, not an MCQ disguised as a solution.

The repository already expects `stepWeights` and `partialCreditRules` for this type. fileciteturn2file4L410-L423

Use:

```json
{
  "type": "Step-by-step Solution",
  "text": "Differentiate f(x) = ... showing all steps.",
  "answer": "Final derivative: ...",
  "answer_data": {
    "steps": [
      {
        "order": 1,
        "expected": "Identify the power rule...",
        "points": 2,
        "commonMistake": "Incorrect exponent reduction"
      },
      {
        "order": 2,
        "expected": "...",
        "points": 2,
        "commonMistake": "Incorrect coefficient"
      }
    ],
    "totalPoints": 4,
    "partialCreditRules": [
      {
        "condition": "Correct setup but arithmetic error",
        "points": 1
      }
    ]
  }
}
```

### Important

The answer may be:

- mathematical equation lines
- algebraic transformations
- ordered derivation steps
- symbolic expressions

Do not force these into a plain one-line text answer.

The frontend must render steps line-by-line.

---

# 12. Numerical Input Contract

Numerical Input must support numeric answers and tolerance.

Example:

```json
{
  "type": "Numerical Input",
  "text": "Find the discriminant of ...",
  "answer": "64",
  "answer_data": {
    "numericAnswer": 64,
    "tolerance": 0,
    "unit": null,
    "acceptedValues": [64]
  }
}
```

For approximate problems:

```json
{
  "numericAnswer": 3.14159,
  "tolerance": 0.01,
  "unit": null
}
```

For numeric input, never rely only on string equality.

The evaluator should compare:

```text
abs(studentValue - numericAnswer) <= tolerance
```

---

# 13. Graphing/Plotting Contract

Graphing is fundamentally different from MCQ and numerical input.

Do not ask the student to "choose a graph" unless that is explicitly the selected interaction.

The generated question should describe a graphing task.

Example:

```json
{
  "type": "Graphing/Plotting",
  "text": "Plot y = x^2 - 4x + 3 and identify the vertex and x-intercepts.",
  "answer": "Parabola opening upward; vertex (2,-1); x-intercepts (1,0) and (3,0).",
  "answer_data": {
    "graphType": "cartesian",
    "expression": "y = x^2 - 4x + 3",
    "expectedGraph": {
      "shape": "parabola",
      "opens": "up",
      "vertex": {
        "x": 2,
        "y": -1
      },
      "xIntercepts": [
        {"x": 1, "y": 0},
        {"x": 3, "y": 0}
      ]
    },
    "requiredFeatures": [
      "vertex",
      "xIntercepts"
    ],
    "axis": {
      "xMin": -2,
      "xMax": 6,
      "yMin": -4,
      "yMax": 8
    }
  }
}
```

## Important

The LLM should generate the **mathematical graph specification**, not an image.

The frontend should render the graph using the existing web stack/charting capability.

For mathematical plots, prefer a deterministic renderer such as a client-side math plotting library already compatible with the project.

The LLM must not generate arbitrary SVG/HTML and have the frontend blindly execute it.

---

# 14. Citation Contract

The current worker constructs a citation with:

```text
docId
docName
excerpt
confidence
```

after validation. fileciteturn5file0L70-L80

The Supabase schema additionally supports:

```text
docName
section
pageRange
excerpt
confidence
```

The frontend/schema work already added `pageRange`, `excerpt`, and `confidence`. fileciteturn2file5L897-L911

## Required citation

Every saved generated question must have:

```json
{
  "docName": "...",
  "section": "...",
  "pageRange": "...",
  "excerpt": "...",
  "confidence": "0.94"
}
```

Do not fabricate page numbers.

If page metadata is unavailable:

```text
pageRange = null
```

not a guessed value.

---

# 15. Supabase Persistence

## Current problem

The Celery worker's final persistence is Redis-only. fileciteturn5file0L84-L114

Meanwhile, the Next.js API has a separate persistence path that creates `GeneratedQuestion` records from returned raw questions. fileciteturn3file0L22-L41

This creates an awkward split:

```text
Celery -> Redis
Next.js -> Prisma -> Supabase
```

and means the permanent database write is dependent on the frontend/API asking for the results after generation.

## Required architecture

Make Celery the authoritative persistence step:

```text
retrieve
→ generate
→ validate
→ save Supabase
→ publish Redis completion
```

The frontend only reads the saved database records.

Do not depend on the professor browser being open at the exact time generation finishes.

---

# 16. Database Mapping

For every valid question:

## GeneratedQuestion

Save:

```text
userId
docId
text
type
difficulty
topic
answer
timeLimit
bloomLevel
status = PENDING
testCases / answer_data
```

The supplied schema already has:

- `text`
- `type`
- `difficulty`
- `topic`
- `answer`
- `docId`
- `status`
- `testCases`
- `timeLimit`
- `bloomLevel`

so these should be reused where possible.

## QuestionChoice

Only create rows for Multiple Choice.

The supplied table has:

```text
questionId
label
text
isCorrect
```

and cascades from `GeneratedQuestion`. fileciteturn2file5L897-L904

## QuestionCitation

Create exactly one citation row per generated question.

The table has a unique `questionId`, so one-to-one behavior is already encoded. fileciteturn2file5L906-L911

---

# 17. Recommended Schema Improvement

The current `testCases jsonb` can technically hold structured data, but its name is too narrow for:

- step-by-step solutions
- numeric tolerance
- graph specifications
- structured answer metadata

Prefer adding:

```sql
ALTER TABLE public."GeneratedQuestion"
ADD COLUMN IF NOT EXISTS "answerData" jsonb;
```

Use:

```text
answerData
```

for type-specific answer information.

Keep `testCases` for code/programming questions if the project later supports them.

This gives a clean semantic separation:

```text
answer      -> human-readable final answer
answerData  -> machine-readable evaluation structure
testCases   -> programming/code test cases
```

---

# 18. Transactional Save

A question must not exist in the database without its required dependent records.

For each generated question:

```text
BEGIN
  INSERT GeneratedQuestion
  INSERT QuestionChoice (if MCQ)
  INSERT QuestionCitation
COMMIT
```

For the entire generation run, use a database transaction where practical.

If one question fails persistence:

- do not silently report success
- mark that question as failed
- continue saving independent valid questions
- mark generation run `PARTIAL` if at least one valid question was saved
- mark `FAILED` if none were saved

---

# 19. Idempotency

This is essential because Celery tasks can be retried.

Every generation request must have:

```text
request_id
```

Use it as a unique generation-run key.

The worker must be safe if the same task is accidentally executed twice.

Recommended:

```text
generation_runs.request_id UNIQUE
```

and a deterministic question-generation run identifier.

Before inserting final questions, check whether that request has already reached `COMPLETED`.

Do not create duplicate questions.

---

# 20. Quality Pipeline — Faster Design

The current pipeline is over-validating in an expensive way.

## Target pipeline

```text
1. Retrieve
2. Generate
3. Deterministic structural validation
4. Batch critic validation
5. Lightweight grounding verification
6. Persist
```

Remove mandatory per-question embedding verification.

---

# 21. Structural Validation First

Before calling another LLM:

### MCQ

Check:

- 4 choices
- one correct
- labels valid
- answer matches choice
- no duplicates

### Step-by-step

Check:

- steps exists
- at least 2 steps
- every step has order/description/points
- total points > 0
- final answer exists

### Numerical

Check:

- numericAnswer is numeric
- tolerance is numeric and >= 0
- unit is valid/null

### Graphing

Check:

- expression/problem exists
- graph type exists
- expected graph metadata exists
- no executable code
- graph specification is valid JSON

Reject malformed outputs locally.

This is essentially free compared with an LLM call.

---

# 22. Critic Optimization

Current critic validation is batch-based but still intentionally sleeps between batches. The repository shows a 12-second delay between critic batches. fileciteturn5file0L11-L22

Do not use a fixed 12-second sleep unless the provider's actual rate limit requires it.

## Required strategy

Use a provider-aware rate limiter:

```text
request
↓
rate limiter
↓
LLM
```

If the provider accepts the request:

```text
continue immediately
```

If 429:

```text
honor Retry-After / provider delay
```

Do not:

```text
sleep 12 seconds
```

after every successful request.

The repository already claims to have token-bucket rate limiting and provider health tracking. Consolidate that logic so all LLM calls actually use the same limiter. fileciteturn1file1L102-L123

---

# 23. Provider Cascade

Current intended priority:

```text
Groq
→ Gemini
→ OpenAI
```

The repository documents this as the free-tier throughput strategy. fileciteturn1file1L119-L123

Keep the cascade, but fix the policy.

## Critical rule

Do not retry an exhausted provider repeatedly.

For OpenAI:

```text
429 + insufficient_quota
```

means:

```text
provider unhealthy/exhausted
→ mark provider unavailable for this run
→ immediately use next available provider
```

Do not perform multiple retries on an account with zero credits.

---

# 24. Embedding Provider Fix

The log shows:

```text
gemini embedding-001 -> 404
```

The source code separately shows a newer Gemini embedding configuration using:

```text
text-embedding-004
```

and OpenAI:

```text
text-embedding-3-small
```

as fallback. fileciteturn2file4L368-L385

Do not leave multiple inconsistent embedding implementations in the repository.

Create one:

```text
EmbeddingService
```

with:

```text
embed_query()
embed_documents()
```

and provider health.

For generation validation, prefer:

```text
one batched embedding call
```

over:

```text
2 × N individual embedding calls
```

But the embedding stage should be **optional**, not a hard dependency for successful generation.

---

# 25. Recommended Grounding Strategy

For a thesis/free-tier system, the best trade-off is:

```text
RAG retrieval
+
source citation
+
batch LLM critic
+
deterministic structural checks
```

Use embedding similarity as an auxiliary metric rather than a mandatory gate.

If embedding service is unavailable:

```text
critic + citation + deterministic checks
```

can still produce a `VALIDATED_WITH_DEGRADED_GROUNDING` result.

Do not repeatedly call dead providers.

---

# 26. Citation Grounding

The question must be generated from the retrieved source context.

Each question should retain its source chunk identity internally:

```json
{
  "source_chunk_id": "...",
  "source_rank": 1
}
```

Do not discard this until the database citation is constructed.

The current code removes `chunk_index` before final storage. fileciteturn5file0L70-L80

Instead, preserve a useful source identifier in the citation/audit data.

---

# 27. Frontend Review Requirements

The repository already has:

- `AIQuestionGenerator`
- question state
- status filtering
- approve/reject handling
- bulk status handling
- edit handling

The component already calls `/api/rag/data` for initial data. fileciteturn2file6L636-L650

It also already supports question status changes and an edit endpoint. fileciteturn3file7L750-L814

Do not throw this UI away.

Extend it to render the new structured types.

---

# 28. Professor Review Card

Every generated question card should display:

```text
┌─────────────────────────────────────────┐
│ Question #3              PENDING        │
│                                         │
│ Step-by-step Solution                   │
│ Difficulty: 0.72  | Bloom: ANALYZE      │
│                                         │
│ Solve: ...                               │
│                                         │
│ Expected Solution                       │
│ 1. ...                                   │
│ 2. ...                                   │
│ 3. ...                                   │
│                                         │
│ Source                                  │
│ sample_math_quiz_material.pdf           │
│ Section: Basic Differentiation Rules    │
│ Pages: 4-5                              │
│ Confidence: 0.94                        │
│                                         │
│ [Edit] [Approve] [Reject]               │
└─────────────────────────────────────────┘
```

---

# 29. Type-Specific Frontend Rendering

## Multiple Choice

Show:

```text
A. ...
B. ...
C. ...
D. ...
```

Highlight the correct answer only in professor review mode.

Do not expose correct answers to students.

## Step-by-step

Show ordered steps:

```text
Step 1
Step 2
Step 3
```

Show point allocation and partial-credit rules to professor.

## Numerical Input

Show:

```text
Expected: 64
Tolerance: ±0
```

## Graphing

Render the generated mathematical graph specification.

Show:

- expression
- expected shape
- important points
- axis range
- required features

---

# 30. API Requirements

## Start generation

```http
POST /api/rag/generate
```

Request:

```json
{
  "document_id": 133,
  "count": 10,
  "types": [
    "Multiple Choice",
    "Step-by-step Solution",
    "Numerical Input",
    "Graphing/Plotting"
  ]
}
```

Do not send difficulty.

Response:

```http
202 Accepted
```

```json
{
  "requestId": "...",
  "status": "QUEUED"
}
```

---

## Generation status

```http
GET /api/rag/generate/status?request_id=...
```

Response:

```json
{
  "requestId": "...",
  "status": "VALIDATING",
  "stage": "Critic batch 2/4",
  "progress": 74,
  "rawGenerated": 10,
  "validated": 8,
  "saved": 0
}
```

---

## Generated questions

```http
GET /api/rag/data?docId=133
```

Return:

```json
[
  {
    "id": 1,
    "text": "...",
    "type": "Graphing/Plotting",
    "difficulty": "Hard",
    "estimatedDifficulty": 0.82,
    "bloomLevel": "ANALYZE",
    "answer": "...",
    "answerData": {},
    "choices": [],
    "citation": {}
  }
]
```

---

# 31. Persistence Must Happen Before COMPLETED

Correct order:

```text
validation
↓
database transaction
↓
questions saved
↓
generation_runs.saved_count updated
↓
generation_runs.status = COMPLETED
↓
Redis completion event
```

Never:

```text
Redis COMPLETED
↓
frontend saves database
```

because that makes persistence dependent on the browser.

---

# 32. Redis Progress Events

Publish:

```text
generation:{request_id}
```

Example:

```json
{
  "status": "GENERATING",
  "stage": "Generation",
  "progress": 45,
  "generated": 5
}
```

Then:

```json
{
  "status": "COMPLETED",
  "progress": 100,
  "saved": 10
}
```

The existing project already uses Redis for transient/realtime state, so this fits the current architecture. fileciteturn1file3L290-L299

---

# 33. Generation Logging

The existing `generation_logs` table is useful and should be retained.

Populate:

```text
request_id
document_id
model
provider
attempt_number
dense_candidate_count
fts_candidate_count
reranked_count
generation_latency_ms
retrieval_latency_ms
total_latency_ms
raw_generated_count
critic_passed_count
grounding_passed_count
final_valid_count
critic_result
grounding_score
final_status
abstain_reason
retry_count
fallback_used
error_message
token_usage_input
token_usage_output
```

The supplied schema already contains these fields.

## Add stage-level logs

Log each major transition:

```text
[RUN abc] RETRIEVAL start
[RUN abc] RETRIEVAL complete 1420ms candidates=30 reranked=10

[RUN abc] GENERATION start target=10
[RUN abc] GENERATION batch=1/2 generated=5 provider=groq latency=...
[RUN abc] GENERATION complete raw=10

[RUN abc] VALIDATION start
[RUN abc] VALIDATION structural=10/10
[RUN abc] VALIDATION critic=9/10

[RUN abc] PERSIST start
[RUN abc] PERSIST complete saved=9

[RUN abc] COMPLETED total=...
```

Do not log the same event twice from two logging handlers.

The current log visibly duplicates many lines, e.g. the same generated-question and stage messages appear twice. fileciteturn5file2L339-L364

Fix duplicate logger propagation/handler configuration.

---

# 34. Target Performance

For a normal 10-question generation run on free-tier providers, target:

```text
Retrieval:        < 5 sec
Generation:       < 30 sec where provider permits
Structural check: < 1 sec
Critic:           < 30–45 sec
Persistence:      < 3 sec
```

Total target:

```text
~45–90 seconds
```

The exact time depends on provider rate limits, but **360 seconds should not be accepted as normal** for a 10-question run.

---

# 35. Concurrency Strategy

Do not create uncontrolled parallel calls against Groq/Gemini.

Use:

```text
Celery task
    |
    +-- retrieval
    |
    +-- generation batches
    |
    +-- critic batches
```

Provider rate limiter controls concurrency.

If multiple professors generate simultaneously:

```text
shared provider limiter
```

must protect the free-tier quotas.

---

# 36. Regeneration Strategy

Do NOT do this:

```python
return process_and_generate_quiz(...)
```

for the whole document.

Instead:

```text
10 generated
→ 8 valid
→ regenerate only 2 rejected slots
→ validate 2
→ merge
```

If regeneration still fails:

```text
save 8
generation status = PARTIAL
```

Do not throw away valid questions just because the target count was not reached.

---

# 37. Question Type Distribution

If all four types are selected:

```text
count=4
```

generate:

```text
1 MCQ
1 Step-by-step
1 Numerical
1 Graphing
```

For:

```text
count=10
```

use:

```text
3 MCQ
3 Step-by-step
2 Numerical
2 Graphing
```

For small counts, use round-robin:

```text
MCQ
Step-by-step
Numerical
Graphing
MCQ
Step-by-step
...
```

The distribution must be deterministic and recorded in the generation-run metadata.

---

# 38. Source-Aware Type Selection

Do not force graphing questions if the source contains no suitable graphable concept.

Instead:

```text
requested type = Graphing
↓
retrieved context inspected
↓
graphable content?
    YES → generate
    NO  → mark slot unavailable
```

Then either:

1. retrieve another relevant chunk;
2. generate a graphable problem from a mathematically equivalent concept explicitly supported by the source;
3. if impossible, mark the run partial.

Never invent unrelated material merely to satisfy the requested type.

---

# 39. Free-Tier Resilience Rules

## Rule 1

No provider should be retried after a definitive quota-exhausted error.

## Rule 2

Honor server retry delays for temporary 429s.

## Rule 3

Use exponential backoff only for transient failures.

## Rule 4

Use one shared provider health registry.

## Rule 5

Embedding failure must not stall the whole run.

## Rule 6

Generation failure for one batch should not discard successful previous batches.

---

# 40. Security

The worker receives document chunks and must not trust arbitrary client-provided user IDs.

The backend should resolve:

```text
authenticated user
→ document ownership
→ generation request
```

The frontend currently checks document ownership before forwarding the generation request in the Next.js route. Preserve this behavior. fileciteturn3file4L430-L455

Celery should receive a validated document ID and user ID from the trusted backend.

---

# 41. Status and Review Semantics

Use:

```text
PENDING
APPROVED
REJECTED
```

for professor review.

Do not delete a question merely because it is rejected.

The current status route deletes rejected questions immediately in one version. fileciteturn3file1L191-L213

This is bad for auditability.

Required:

```text
REJECTED
```

should remain in the database with:

```text
reject_reason
reject_note
rejected_by
```

The supplied schema already has these fields.

Deletion should be an explicit professor action.

---

# 42. Validation Matrix

| Type | Required | Optional | Invalid if |
|---|---|---|---|
| MCQ | 4 choices, 1 correct | explanation | missing/duplicate choices |
| Step-by-step | >=2 steps, points, final answer | common mistakes | no ordered steps |
| Numerical | numeric answer | tolerance/unit | nonnumeric answer |
| Graphing | graph specification | axis range, points | no valid graph specification |

---

# 43. Acceptance Tests

## Generation

- [ ] Request count=5 produces at most 5 final questions.
- [ ] Request count=10 produces at most 10 final questions.
- [ ] No `len(chunks) * 2` behavior remains.
- [ ] Difficulty is not supplied by frontend.
- [ ] Every question receives numeric estimated difficulty.
- [ ] Every question receives a valid Bloom level.

## Question types

- [ ] MCQ generates four choices.
- [ ] MCQ has exactly one correct choice.
- [ ] Step-by-step contains ordered steps.
- [ ] Step-by-step contains partial-credit data.
- [ ] Numerical contains numeric answer and tolerance.
- [ ] Graphing contains a deterministic graph specification.
- [ ] Frontend can render all four types.

## RAG

- [ ] Retrieval runs once per generation run.
- [ ] Every question has source citation.
- [ ] No fabricated page number.
- [ ] Source excerpt comes from retrieved document context.
- [ ] Critic validates grounding.
- [ ] Embedding failure does not kill the run.

## Performance

- [ ] No fixed 12-second sleep after every successful critic batch.
- [ ] No per-question two-call embedding loop.
- [ ] Exhausted OpenAI quota is detected once.
- [ ] Gemini embedding endpoint is valid/configurable.
- [ ] Provider rate limiter controls actual calls.
- [ ] 10-question test does not take ~6 minutes under normal provider conditions.

## Persistence

- [ ] Celery writes GeneratedQuestion.
- [ ] Celery writes QuestionChoice where applicable.
- [ ] Celery writes QuestionCitation.
- [ ] Structured answer data is saved.
- [ ] Generation run is updated.
- [ ] Database save completes before COMPLETED status.
- [ ] Duplicate task execution does not duplicate questions.

## Frontend

- [ ] Generate button receives requestId.
- [ ] UI shows live stage/progress.
- [ ] UI does not recursively POST `/generate`.
- [ ] Completed questions automatically appear.
- [ ] Professor can edit.
- [ ] Professor can approve.
- [ ] Professor can reject with reason/note.
- [ ] Professor can review citations.
- [ ] All four question types have review renderers.

---

# 44. Files the Coding Assistant Should Inspect/Modify

Primary backend:

```text
QUIZARENAREMASTERED/ai-backend/app/celery_worker.py
QUIZARENAREMASTERED/ai-backend/app/main.py
QUIZARENAREMASTERED/ai-backend/app/config.py
QUIZARENAREMASTERED/ai-backend/app/rag/chains.py
QUIZARENAREMASTERED/ai-backend/app/rag/vectorstore.py
```

Frontend generation/API:

```text
QUIZARENAREMASTERED/frontend/src/app/api/rag/generate/route.ts
QUIZARENAREMASTERED/frontend/src/app/api/rag/status/route.ts
QUIZARENAREMASTERED/frontend/src/app/api/rag/status/bulk/route.ts
QUIZARENAREMASTERED/frontend/src/app/api/rag/data/route.ts
QUIZARENAREMASTERED/frontend/src/components/profonly/AIQuestionGenerator.tsx
QUIZARENAREMASTERED/frontend/src/components/profonly/QuestionBank.tsx
```

Schema/migrations:

```text
QUIZARENAREMASTERED/frontend/prisma/schema.prisma
QUIZARENAREMASTERED/ai-backend/supabase/migrations/
```

Do not modify the generated Repomix file as the implementation source.

---

# 45. Implementation Order

Do the work in this exact order.

## Phase 1 — Stop the performance leak

- [ ] Remove per-question embedding verification from the critical path.
- [ ] Fix Gemini embedding model configuration.
- [ ] Stop retrying exhausted OpenAI.
- [ ] Replace fixed critic sleeps with provider-aware throttling.
- [ ] Remove duplicate logger handlers.

## Phase 2 — Fix generation semantics

- [ ] Generate exactly requested count.
- [ ] Implement deterministic type distribution.
- [ ] Remove difficulty from frontend request.
- [ ] Return numeric difficulty + Bloom level.
- [ ] Preserve source chunk identity.

## Phase 3 — Structured question schema

- [ ] Add/standardize `answerData`.
- [ ] Implement discriminated type validation.
- [ ] Implement MCQ validator.
- [ ] Implement step validator.
- [ ] Implement numeric validator.
- [ ] Implement graph validator.

## Phase 4 — Persistence

- [ ] Add generation_runs.
- [ ] Add answerData column.
- [ ] Move permanent persistence into Celery.
- [ ] Add transaction.
- [ ] Add idempotency.
- [ ] Persist citations.
- [ ] Persist MCQ choices.

## Phase 5 — Frontend

- [ ] Start-run API.
- [ ] Status API.
- [ ] Progress UI.
- [ ] Automatic result refresh.
- [ ] Type-specific review UI.
- [ ] Citation display.
- [ ] Edit/approve/reject persistence.

## Phase 6 — Testing

- [ ] Run 3-question test.
- [ ] Run 10-question all-type test.
- [ ] Run MCQ-only test.
- [ ] Run step-only test.
- [ ] Run numeric-only test.
- [ ] Run graph-only test.
- [ ] Kill/restart worker during generation.
- [ ] Simulate Groq 429.
- [ ] Simulate OpenAI quota exhausted.
- [ ] Simulate Gemini embedding failure.
- [ ] Verify no duplicate questions.
- [ ] Verify DB persistence after browser closes.

---

# 46. Coding Assistant Prompt

Use the following prompt directly with the coding assistant:

> You are the senior backend/RAG/LLM engineer responsible for fixing QuizArena's AI quiz-generation system.
>
> Work directly from the existing repository. Do not redesign unrelated features.
>
> First inspect:
>
> - `ai-backend/app/celery_worker.py`
> - `ai-backend/app/main.py`
> - `ai-backend/app/config.py`
> - `ai-backend/app/rag/chains.py`
> - `ai-backend/app/rag/vectorstore.py`
> - `frontend/src/app/api/rag/generate/route.ts`
> - `frontend/src/app/api/rag/status/route.ts`
> - `frontend/src/app/api/rag/status/bulk/route.ts`
> - `frontend/src/app/api/rag/data/route.ts`
> - `frontend/src/components/profonly/AIQuestionGenerator.tsx`
> - `frontend/src/components/profonly/QuestionBank.tsx`
> - `frontend/prisma/schema.prisma`
> - Supabase migrations
>
> Also inspect the existing Celery logs and existing generation implementation before changing anything.
>
> ## Main bugs to fix
>
> 1. Generation currently takes several minutes because critic validation uses fixed delays and semantic validation performs repeated embedding calls. The logs show Gemini embedding 404s and OpenAI 429 insufficient-quota errors. Do not repeatedly retry unavailable providers.
>
> 2. The current generator asks for two questions per chunk rather than exactly the requested count. Fix this. `count=10` means a target of 10 final questions, not 20 or 18 intermediate questions.
>
> 3. Do not recursively rerun the entire pipeline when validation produces zero/few valid questions. Regenerate only failed slots.
>
> 4. Do not make the frontend repeatedly POST `/generate` to check progress. Introduce a generation request ID and a separate status endpoint.
>
> 5. Celery must permanently save validated questions to Supabase before reporting COMPLETED.
>
> ## Required question types
>
> Support all four:
>
> - `Multiple Choice`
> - `Step-by-step Solution`
> - `Numerical Input`
> - `Graphing/Plotting`
>
> Do not treat these as simple labels. Each type must have a structured answer contract.
>
> ### Multiple Choice
>
> Require exactly four choices A-D and exactly one correct choice.
>
> ### Step-by-step Solution
>
> Require ordered mathematical solution steps, point weights, common mistakes, total points, and partial-credit rules. The answer may contain equations or equation lines.
>
> ### Numerical Input
>
> Require numeric answer, tolerance, and optional unit. Evaluation must use numeric tolerance rather than string equality.
>
> ### Graphing/Plotting
>
> Generate a mathematical graph specification, not arbitrary SVG or executable frontend code. Include expression, graph type, expected shape, important points, and optional axis ranges. The frontend renders the graph deterministically.
>
> ## Difficulty
>
> Remove professor-selected difficulty from the generation UI/API.
>
> Every question must receive:
>
> - `estimated_difficulty`: number from 0.00 to 1.00
> - `bloom_level`: one of REMEMBER, UNDERSTAND, APPLY, ANALYZE, EVALUATE, CREATE
>
> Keep the existing Easy/Medium/Hard mapping only for backward compatibility.
>
> ## RAG
>
> Retrieval should run once per generation run.
>
> Preserve source chunk identity through generation and validation.
>
> Every accepted question must have a citation containing:
>
> - docName
> - section
> - pageRange when known
> - excerpt
> - confidence
>
> Never fabricate page numbers.
>
> ## Validation
>
> Perform cheap deterministic validation before LLM critic validation.
>
> Use batch critic validation.
>
> Remove fixed sleeps after successful requests. Use the existing provider rate limiter/health architecture properly. Honor Retry-After/server delays for temporary 429s.
>
> If a provider reports exhausted quota, mark it unavailable for the run rather than retrying it repeatedly.
>
> Embedding similarity must not be a hard dependency for successful generation. If embedding validation is retained, batch it and make it optional/degraded when unavailable.
>
> ## Persistence
>
> Add a persistent `generation_runs` table if it does not already exist.
>
> Add:
>
> `GeneratedQuestion.answerData jsonb`
>
> Use:
>
> - `answer` for human-readable final answer
> - `answerData` for machine-readable type-specific evaluation data
> - `testCases` only for programming/code test cases
>
> Celery must save:
>
> 1. GeneratedQuestion
> 2. QuestionChoice for MCQ
> 3. QuestionCitation
> 4. generation_runs
> 5. generation_logs
>
> Use transactions where appropriate.
>
> Make the task idempotent so retries cannot duplicate questions.
>
> Do not depend on the browser being open for persistence.
>
> ## Frontend
>
> Preserve the existing professor question-bank UI and extend it.
>
> Show:
>
> - question
> - type
> - numeric difficulty
> - Bloom level
> - structured answer
> - citations
> - review status
>
> Render all four question types correctly.
>
> The professor must be able to edit, approve, reject, and inspect the citation.
>
> Rejected questions should remain in the database for auditability rather than being automatically deleted.
>
> ## API
>
> Implement:
>
> `POST /api/rag/generate`
>
> returning:
>
> ```json
> {
>   "requestId": "...",
>   "status": "QUEUED"
> }
> ```
>
> Implement:
>
> `GET /api/rag/generate/status?request_id=...`
>
> returning stage/progress/generated/validated/saved counts.
>
> The frontend should poll the status endpoint, not recursively call the start endpoint.
>
> ## Performance target
>
> Optimize for free-tier providers.
>
> The current ~360 second run is unacceptable.
>
> Aim for approximately 45-90 seconds for a normal 10-question run when providers are healthy and not rate limited.
>
> Do not compromise grounding simply to make it fast.
>
> ## Important implementation rules
>
> - Do not modify unrelated game modes.
> - Do not remove existing Supabase relationships.
> - Do not break existing question-bank approval/rejection behavior.
> - Do not trust arbitrary client user IDs.
> - Preserve document ownership checks.
> - Do not store only Redis results.
> - Do not invent citations.
> - Do not execute arbitrary LLM-generated code.
> - Do not use arbitrary HTML/SVG generated by the LLM for graph rendering.
> - Prefer small, testable services over one enormous Celery function.
>
> ## Before coding
>
> Produce a short implementation plan listing:
>
> 1. files to modify
> 2. schema changes
> 3. API changes
> 4. worker changes
> 5. frontend changes
> 6. tests
>
> Then implement.
>
> After implementation, run/type-check/lint the affected backend/frontend files where possible and report:
>
> - files changed
> - migrations created
> - tests executed
> - expected generation flow
> - any remaining provider-specific limitation
>
> Do not claim success unless the generated data is actually persisted and retrievable from the database.

---

# 47. Definition of Done

The implementation is complete only when this flow works:

```text
Professor
  |
  | Select document
  | Select question types
  | Set count
  | Click Generate
  v
POST /generate
  |
  v
202 + requestId
  |
  v
Celery
  |
  +--> retrieve once
  |
  +--> generate exact target count
  |       |
  |       +--> MCQ
  |       +--> Step-by-step
  |       +--> Numerical
  |       +--> Graphing
  |
  +--> structural validation
  |
  +--> batch critic
  |
  +--> optional/lightweight grounding
  |
  +--> Supabase transaction
  |       |
  |       +--> GeneratedQuestion
  |       +--> QuestionChoice
  |       +--> QuestionCitation
  |
  +--> generation_runs = COMPLETED
  |
  v
Frontend sees COMPLETED
  |
  v
Questions automatically appear
  |
  v
Professor reviews
  |
  +--> Edit
  +--> Approve
  +--> Reject
```

No browser-dependent database save.

No recursive full-pipeline regeneration.

No per-question embedding storm.

No repeated retry of exhausted providers.

No forced Multiple Choice fallback.

No loss of structured step/numeric/graph data.

---

# 48. Final Engineering Position

The current system already has the right high-level idea — RAG retrieval, batch generation, critic validation, and Redis/Celery asynchronous execution. The problem is that the implementation currently puts too much expensive work in the critical path and has an unclear boundary between Celery, Redis, Next.js, and Supabase.

The strongest fix is therefore **not** "use a faster model."

It is:

```text
Exact-count structured generation
+
single retrieval pass
+
cheap deterministic validation
+
batched critic
+
provider-aware rate limiting
+
optional embedding validation
+
Celery-owned persistence
+
generation-run state
+
type-aware frontend review
```

That architecture is faster, more reliable on free-tier APIs, easier to debug, and substantially more appropriate for a thesis-grade RAG/LLM system.
