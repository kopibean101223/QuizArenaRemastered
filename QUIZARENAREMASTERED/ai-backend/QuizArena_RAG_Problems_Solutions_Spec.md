# QuizArena RAG â€” Enterprise 10/10 Problem, Solution, and Implementation Specification

## Purpose

This document is a **single specification for the coding assistant**. It describes what the current RAG system is intended to do, what problems must be solved, why each problem matters, and what the final system must achieve.

**Important:** Do not treat this document as a request to blindly rewrite the whole project. First inspect the existing implementation, identify where each problem exists, preserve working functionality, and then apply the required improvements.

The target system is the QuizArena AI Engine using a stack centered around:

- PDF syllabus/document uploads
- PyMuPDF4LLM for PDF-to-Markdown extraction
- Markdown-aware chunking
- Supabase PostgreSQL + pgvector
- Dense semantic retrieval
- Sparse keyword/full-text retrieval
- Reciprocal Rank Fusion (RRF)
- FastAPI
- Celery background processing
- Redis task state
- LLM-based question generation
- Structured output validation
- Critic/LLM-as-a-judge validation
- Semantic grounding checks
- Prisma relational persistence
- Automated RAG evaluation using RAGAS

The goal is not merely to make the system work. The goal is to make the RAG pipeline **reliable, traceable, grounded, testable, maintainable, and resistant to hallucination**.

---

# 1. Current RAG Pipeline

The intended high-level flow is:

PDF Upload
â†’ PDF-to-Markdown Extraction
â†’ Structure-Aware Chunking
â†’ Chunk Context Injection
â†’ Store and Embed All Useful Chunks
â†’ Dynamic Retrieval Based on Requested Topic
â†’ Hybrid Dense + Sparse Search
â†’ RRF Ranking
â†’ Top Relevant Context
â†’ Background Generation
â†’ Structured LLM Output
â†’ Critic Validation
â†’ Semantic Grounding Gate
â†’ Citation/Traceability
â†’ Relational Database Storage
â†’ RAGAS Evaluation
â†’ Continuous Quality Monitoring

The source material identifies the target architecture as a pipeline where the complete document is indexed, retrieval happens dynamically at generation time, hybrid search combines pgvector and text search through RRF, generated questions pass structured-output and validation gates, and only validated results are persisted. îˆ€fileciteîˆ‚turn1file7îˆ‚L565-L569îˆ

---

# 2. Main Problems in the Current/Previous Approach

## Problem 1 â€” Static Truncation During Ingestion

### Problem

The previous ingestion approach applies ranking/filtering too early and can discard document chunks during upload.

This creates a serious RAG problem:

- Information is permanently removed before the user asks a question.
- A topic that was discarded during upload cannot be retrieved later.
- Retrieval is no longer truly dynamic.
- The system may appear accurate for common topics while silently failing for less prominent topics.
- Missing source information can force the LLM to rely on its pretrained knowledge.

### Required Solution

Do not permanently reduce the syllabus to a small subset during ingestion.

Instead:

1. Extract the complete readable document.
2. Convert it to structured Markdown.
3. Split the Markdown according to document structure.
4. Preserve all meaningful chunks.
5. Embed and index all usable chunks.
6. Perform relevance filtering/ranking when the user actually requests a topic.

### Expected Result

The database becomes the complete searchable knowledge base for each uploaded document.

Retrieval becomes:

> Store everything useful â†’ retrieve only what is relevant at generation time.

---

# 3. PDF Extraction Problems

## Problem

PDFs are not naturally structured databases. Important information may appear as:

- headings
- paragraphs
- definitions
- formulas
- equations
- examples
- lists
- tables
- page-specific content

Poor extraction can damage the meaning before retrieval even begins.

### Required Solution

Use PyMuPDF4LLM as the document extraction stage because the existing architecture uses structure-aware Markdown extraction.

The extracted Markdown must preserve document structure as much as reasonably possible.

The system must:

- detect whether the PDF contains readable text
- reject empty/unreadable documents clearly
- preserve headings
- preserve meaningful mathematical/textual content
- avoid indexing meaningless fragments
- retain useful metadata for traceability

### Failure Behavior

If the document contains no usable text, ingestion must fail clearly rather than silently creating an empty knowledge base.

---

# 4. Chunking Problems

## Problem

Chunking is one of the most important parts of RAG.

If chunks are too large:

- retrieval becomes less precise
- irrelevant information enters the generation context
- token usage increases
- multiple unrelated concepts may be mixed

If chunks are too small:

- definitions lose their context
- formulas become detached from explanations
- examples become separated from the concepts they demonstrate
- headings and topic relationships disappear

The source architecture specifically proposes Markdown-header-based splitting using document hierarchy. îˆ€fileciteîˆ‚turn1file4îˆ‚L323-L337îˆ

## Required Solution

Use structure-aware chunking rather than blindly splitting the PDF by character count alone.

The preferred hierarchy is:

- `#` â†’ major section
- `##` â†’ subsection
- `###` â†’ deeper subsection

Each chunk should retain its section identity.

### Chunk Quality Requirements

A valid chunk should:

- contain meaningful content
- have enough text to be useful
- retain its document/section relationship
- not be an isolated meaningless fragment
- remain traceable to the source document

Very small or empty fragments may be excluded, but the system must not aggressively discard useful educational content.

---

# 5. Context Loss Inside Chunks

## Problem

A chunk may contain a definition or formula without the heading that explains what it is about.

For example, a chunk may say:

> The resulting matrix has dimensions m Ã— p.

Without the section context, the retrieval model may not know that the text is about matrix multiplication.

This can reduce retrieval quality.

## Required Solution â€” Chunk-Level Context Injection

Before embedding a chunk, prepend lightweight contextual metadata such as:

- document name
- section
- relevant hierarchy information

Conceptually:

> Document: [document]  
> Section: [section]  
> [original chunk]

The source specifically recommends prepending document and section information before embedding so that chunks retain their meaning during retrieval. îˆ€fileciteîˆ‚turn1file2îˆ‚L183-L187îˆ

### Important

Context injection is for retrieval quality. The original/raw chunk content should still be retained separately for citations and traceability.

---

# 6. Incomplete Knowledge Base Problem

## Problem

The RAG system cannot retrieve information that was never indexed.

Therefore:

> Upload-time filtering must not become permanent knowledge loss.

### Required Solution

The uploaded document should become the source-of-truth knowledge base for that document.

All meaningful chunks should be:

- stored
- embedded
- associated with the document ID
- associated with section metadata
- available for future retrieval

The architecture calls for a dedicated `document_chunks` storage layer containing content, metadata, embeddings, and full-text search information. îˆ€fileciteîˆ‚turn1file7îˆ‚L571-L591îˆ

---

# 7. Pure Vector Search Problem

## Problem

Dense vector search is strong at semantic similarity but can struggle with exact technical terms.

Examples include:

- Dijkstra's Algorithm
- specific theorem names
- formulas
- abbreviations
- exact terminology
- named concepts
- uncommon academic keywords

A semantically similar chunk is not always the chunk containing the exact requested term.

## Required Solution â€” Hybrid Retrieval

Use two retrieval signals:

### Dense Retrieval

Use embeddings and pgvector to find semantically related content.

### Sparse Retrieval

Use PostgreSQL full-text search to find exact or keyword-relevant content.

### Combine Them

Use Reciprocal Rank Fusion (RRF) to combine the ranking signals.

The target design explicitly combines pgvector retrieval and sparse text search using RRF. îˆ€fileciteîˆ‚turn1file1îˆ‚L133-L141îˆ

### Expected Benefit

Hybrid retrieval should improve both:

- semantic understanding
- exact terminology retrieval

---

# 8. Retrieval Must Be Dynamic

## Problem

Retrieval should not be decided once when the document is uploaded.

A professor may later request:

- Matrix Multiplication
- Sorting Algorithms
- Database Normalization
- CPU Architecture
- a specific theorem
- an easy question
- a hard question

The relevant context changes according to the request.

## Required Solution

At generation time:

1. Read the requested topic/category.
2. Convert the request into a retrieval query.
3. Generate the query embedding.
4. Search the selected document.
5. Run dense + sparse retrieval.
6. Combine rankings with RRF.
7. Return the highest-ranked relevant chunks.
8. Pass only those chunks to generation.

The source architecture recommends dynamic retrieval of roughly the top 8â€“10 topic-specific chunks. îˆ€fileciteîˆ‚turn1file1îˆ‚L134-L141îˆ

---

# 9. Document Isolation / Cross-Document Contamination

## Problem

A user's request must not retrieve content from another syllabus or another user's document.

Cross-document retrieval can create severe hallucination-like behavior because the generated question may be factually correct but unsupported by the selected document.

## Required Solution

Every retrieval operation must be scoped to the requested document ID.

The retrieval layer must enforce:

> Requested document ID â†’ only chunks belonging to that document.

The database design therefore associates each document chunk with a document identifier and filters retrieval by that identifier. îˆ€fileciteîˆ‚turn1file7îˆ‚L578-L587îˆ

---

# 10. Retrieval Failure Must Be Explicit

## Problem

If the requested topic does not exist in the selected document, the system should not invent questions from general model knowledge.

Bad behavior:

> User asks for Topic X â†’ no relevant chunks â†’ LLM generates Topic X anyway.

This defeats the purpose of document-grounded RAG.

## Required Solution

If no sufficiently relevant source context is found:

- do not generate the question
- return a clear "no relevant content found" result
- explain that the requested topic is not sufficiently supported by the uploaded document

The existing specification explicitly requires generation to stop when no relevant document context is found. îˆ€fileciteîˆ‚turn1file2îˆ‚L197-L208îˆ

---

# 11. LLM Hallucination Problem

## Problem

Even with retrieval, an LLM can:

- add facts not present in the document
- modify a formula
- invent an example
- combine unrelated concepts
- use its pretrained knowledge instead of the supplied source

Therefore:

> Retrieval alone is not sufficient for hallucination prevention.

## Required Solution

Use multiple independent grounding layers:

1. Strong retrieval
2. Explicit grounding instructions
3. Structured output validation
4. Critic/LLM-as-a-judge validation
5. Semantic similarity validation
6. Citation/traceability
7. Automated evaluation

No single gate should be considered sufficient by itself.

---

# 12. Generation Prompt Problem

## Problem

A generic prompt such as:

> Generate questions about this topic.

does not guarantee that the question is grounded in the source.

## Required Solution

The generation stage must explicitly require:

- use only retrieved source context
- do not introduce unsupported facts
- do not rely on outside knowledge
- follow requested difficulty
- follow requested question type
- produce the requested number of questions
- maintain academic correctness
- provide source citation information
- reject or avoid unsupported questions

The source architecture describes the Actor LLM as generating questions strictly and exclusively from supplied formulas, definitions, and concepts. îˆ€fileciteîˆ‚turn1file2îˆ‚L216-L224îˆ

---

# 13. Regex JSON Parsing Problem

## Problem

Parsing LLM responses using regular expressions is brittle.

Possible failures include:

- malformed JSON
- missing fields
- extra text
- invalid choices
- incorrect field types
- incomplete citations
- inconsistent output structures

## Required Solution â€” Native Structured Outputs

Use a strict schema-based output mechanism.

The output model should explicitly define:

- question text
- question type
- difficulty
- answer
- choices
- correctness of choices
- optional partial-credit rules
- citation

The source specifically calls for replacing the regex-based `clean_and_parse_json` approach with Pydantic Structured Outputs. îˆ€fileciteîˆ‚turn1file1îˆ‚L146-L153îˆ

### Expected Result

The generation layer should reject schema-invalid output instead of trying to repair arbitrary text.

---

# 14. Question Quality Problem

A question can be technically valid JSON but still be bad.

Examples:

- answer is not supported by the source
- choices are ambiguous
- more than one choice is correct
- no choice is correct
- difficulty does not match the request
- question does not actually test the requested topic
- question contains unsupported information

## Required Solution

Separate:

### Format Validation

Checks whether the output follows the schema.

### Academic/Grounding Validation

Checks whether the content is actually supported by the retrieved source.

Both are required.

---

# 15. Batch Critic Validation

## Problem

The Actor LLM can generate a structurally valid question that is still unsupported.

## Required Solution

Use a second validation stage â€” the Critic.

The Critic must inspect:

- source context
- generated question
- generated answer
- grounding relationship

It should classify each question as:

- PASS
- FAIL

Only questions that pass the grounding audit should continue.

The source pipeline explicitly retains a Batch Critic validation stage before the semantic gate. îˆ€fileciteîˆ‚turn1file2îˆ‚L216-L224îˆ

---

# 16. Semantic Similarity Gate

## Problem

A Critic can still make an imperfect judgment.

An additional independent semantic check provides another safety layer.

## Required Solution

Compare the embedding of the generated question against the embedding of the retrieved source context.

The supplied architecture proposes increasing the previous threshold from approximately `0.45` to `0.75`. îˆ€fileciteîˆ‚turn1file1îˆ‚L149-L150îˆ

### Important

The threshold is a quality gate, not proof of truth.

A similarity score alone cannot establish factual correctness.

Therefore it must remain one component of the multi-stage validation pipeline.

---

# 17. Citation and Traceability Problem

## Problem

A generated question should not merely say it came from a document.

The system should be able to identify where the supporting content came from.

## Required Solution

Every accepted generated question should retain citation metadata such as:

- document name
- section
- page range when available
- source excerpt
- confidence

The proposed relational model includes these citation fields. îˆ€fileciteîˆ‚turn1file0îˆ‚L80-L89îˆ

### Goal

A professor or administrator should be able to trace a generated question back to the source material used to support it.

---

# 18. Database JSON Problem

## Problem

Storing complex question information as loose JSON makes validation and querying harder.

For example:

- choices are difficult to query individually
- correct-answer flags are less enforceable
- citations are difficult to manage
- relationships are unclear
- data integrity becomes dependent on application code

## Required Solution

Normalize question-related data into relational entities.

At minimum:

### GeneratedQuestion

Stores:

- question
- type
- difficulty
- topic
- answer
- status
- document relationship

### QuestionChoice

Stores:

- question ID
- label
- text
- whether it is correct

### QuestionCitation

Stores:

- question ID
- document name
- section
- page range
- excerpt
- confidence

The source explicitly recommends replacing loose JSON fields with relational `QuestionChoice` and `QuestionCitation` models. îˆ€fileciteîˆ‚turn1file0îˆ‚L52-L89îˆ

---

# 19. Async Generation Problem

## Problem

Question generation may involve:

- retrieval
- embedding calls
- LLM generation
- critic validation
- semantic validation
- database operations

This can take longer than a normal synchronous HTTP request.

Using an HTTP error such as `404` to indicate that generation is still processing is semantically incorrect.

## Required Solution

Use asynchronous task processing.

### Expected Flow

1. Frontend requests generation.
2. FastAPI validates the request.
3. FastAPI performs retrieval.
4. FastAPI creates a task ID.
5. Task state is stored in Redis.
6. Celery processes generation.
7. Frontend polls the status endpoint.
8. Status becomes PROCESSING, COMPLETED, or FAILED.
9. Completed questions are returned.
10. Verified questions are persisted.

The supplied architecture specifies HTTP `202 Accepted` for queued generation and a dedicated status endpoint. îˆ€fileciteîˆ‚turn1file1îˆ‚L142-L145îˆ

---

# 20. Redis Task State Problem

## Problem

The frontend needs to know whether a background generation task is:

- processing
- completed
- failed
- expired

## Required Solution

Maintain task state in Redis with a temporary expiration.

At minimum, task state should communicate:

- task ID
- current status
- result when complete
- error information when failed

Expired tasks should return an explicit not-found/expired response.

The source architecture uses a Redis key pattern similar to `rag:task:{task_id}` and returns explicit PROCESSING, COMPLETED, and FAILED states. îˆ€fileciteîˆ‚turn1file5îˆ‚L461-L489îˆ

---

# 21. Frontend Polling Problem

## Problem

The frontend must not assume that the first generation request contains the final questions.

## Required Solution

The frontend API layer should:

1. send the generation request
2. receive the queued task ID
3. poll the status endpoint
4. stop when completed
5. handle failure
6. handle timeout
7. avoid infinite polling
8. persist only successfully validated questions

The supplied implementation concept uses bounded polling rather than an infinite wait. îˆ€fileciteîˆ‚turn1file3îˆ‚L256-L285îˆ

---

# 22. Quality Gate Problem

## Problem

A RAG pipeline should not be considered successful simply because an API request returned HTTP 200.

Success must mean:

- useful source context was retrieved
- generated content is grounded
- output follows the requested format
- output passes validation
- quality metrics remain within acceptable limits

## Required Solution

Implement explicit quality gates at multiple stages.

### Gate 1 â€” Retrieval

Did we find relevant source content?

### Gate 2 â€” Structured Output

Is the generated result valid according to the required schema?

### Gate 3 â€” Critic

Does the source support the generated question?

### Gate 4 â€” Semantic Similarity

Does the generated content sufficiently align with the retrieved context?

### Gate 5 â€” Evaluation

Does the overall RAG system meet its measured quality thresholds?

---

# 23. RAG Evaluation Problem

## Problem

Human "eyeballing" is insufficient to prove RAG quality.

A system can look good in a few manual examples while failing systematically.

The source recommends moving toward an automated evaluation framework using RAGAS and an LLM-as-a-judge approach. îˆ€fileciteîˆ‚turn0file0îˆ‚L5-L10îˆ

## Required Solution â€” RAGAS

Measure at least four dimensions:

### 1. Context Precision

Measures whether retrieved chunks are relevant and appropriately ranked.

Low score indicates:

- irrelevant chunks are being retrieved
- useful chunks are ranked poorly
- retrieval ranking needs improvement

### 2. Context Recall

Measures whether the retrieved context contains the necessary information.

Low score indicates:

- relevant information was missed
- retrieval is incomplete
- chunking or retrieval strategy may need improvement

### 3. Faithfulness

Measures whether the generated answer/question is supported by the retrieved context.

Low score indicates increased hallucination risk.

### 4. Answer Relevancy

Measures whether the generated output actually satisfies the requested task.

Low score can indicate:

- wrong topic
- wrong question type
- wrong difficulty
- failure to follow the request

The supplied evaluation design explicitly measures these four metrics. îˆ€fileciteîˆ‚turn1file8îˆ‚L673-L735îˆ

---

# 24. Target Quality Thresholds

The supplied material proposes the following quality targets:

| Metric | Target |
|---|---:|
| Faithfulness | > 0.90 |
| Answer Relevancy | > 0.85 |
| Context Precision | > 0.80 |
| Context Recall | > 0.80 |

The earlier evaluation guidance gives these targets and associates low scores with specific retrieval or generation problems. îˆ€fileciteîˆ‚turn0file0îˆ‚L106-L113îˆ

These values should be treated as **quality targets rather than a mathematical guarantee of perfect correctness**.

---

# 25. CI/CD Quality Gates

## Problem

Evaluation is useless if developers can ignore failing results.

## Required Solution

RAG evaluation must be integrated into the development/testing workflow.

At minimum:

- run representative RAG evaluation cases
- calculate the four RAGAS metrics
- compare against defined thresholds
- fail the evaluation when critical thresholds are violated
- prevent deployment of a clearly degraded RAG implementation

The supplied test design includes hard gates, including Faithfulness below `0.90` and Context Precision below `0.80`. îˆ€fileciteîˆ‚turn1file8îˆ‚L728-L735îˆ

---

# 26. Testing Strategy

Do not test only whether the API returns a response.

Test the complete pipeline.

## A. Ingestion Tests

Verify:

- valid PDF is accepted
- readable text is extracted
- headings are preserved
- meaningful chunks are produced
- empty documents are rejected
- all meaningful chunks are indexed
- document IDs are correct
- metadata is preserved

## B. Chunking Tests

Test documents containing:

- multiple heading levels
- short sections
- long sections
- formulas
- definitions
- examples
- lists
- repeated terminology

Check that important content is not silently lost.

## C. Retrieval Tests

For each test topic, verify:

- expected topic is retrieved
- correct document is used
- irrelevant documents are excluded
- exact keywords can be found
- semantically related wording can be found
- hybrid search improves retrieval over a single method where appropriate

## D. No-Context Tests

Ask for a topic that clearly does not exist.

Expected:

- no unsupported question generation
- clear failure response
- no hallucinated fallback

## E. Generation Tests

Verify:

- requested number of questions
- requested difficulty
- requested question type
- valid structure
- correct answer field
- valid choices
- citation information

## F. Grounding Tests

Create cases where the LLM is tempted to use general knowledge.

Expected:

- unsupported questions are rejected
- supported questions pass
- source citations correspond to actual retrieved content

## G. Critic Tests

Include:

- clearly grounded question
- partially grounded question
- unsupported question
- question with unrelated external knowledge

Expected:

- only adequately grounded questions pass

## H. Semantic Gate Tests

Test:

- strongly related question
- weakly related question
- unrelated question

Verify that the similarity gate behaves consistently.

## I. Async Tests

Verify:

- task is queued
- PROCESSING state is visible
- COMPLETED state is returned
- FAILED state is handled
- expired tasks are handled
- frontend stops polling after completion/failure/timeout

## J. Database Tests

Verify:

- generated questions reference the correct user
- generated questions reference the correct document
- choices reference the correct question
- citation references the correct question
- deletion behavior is correct
- invalid relational states are prevented where possible

---

# 27. RAG Evaluation Dataset

A serious evaluation suite should not contain only one matrix-multiplication example.

Build a representative benchmark containing different educational cases.

Include:

- definitions
- formulas
- conceptual questions
- numerical problems
- multi-step problems
- terminology-heavy topics
- exact named algorithms
- topics with similar terminology
- topics absent from the document
- difficult questions
- easy questions
- questions requiring information from multiple chunks

Each evaluation case should contain:

1. user request
2. expected relevant context
3. generated answer/question
4. reference/ground truth where applicable

The source material demonstrates this pattern using a matrix multiplication request, retrieved contexts, generated output, and ground truth. îˆ€fileciteîˆ‚turn1file9îˆ‚L767-L801îˆ

---

# 28. Failure Diagnosis Matrix

When a metric or stage fails, do not randomly modify the LLM prompt.

Use the failure type to determine the likely component.

| Failure | Likely Cause | Primary Area to Inspect |
|---|---|---|
| Low Context Precision | Too many irrelevant chunks | Retrieval/RRF/chunking |
| Low Context Recall | Relevant information missing | Ingestion/chunking/retrieval |
| Low Faithfulness | Unsupported generation | Prompt/critic/grounding |
| Low Answer Relevancy | Wrong output/task adherence | Prompt/schema/generation |
| Empty retrieval | Topic not found or retrieval failure | Query/retrieval/document filter |
| Correct facts but wrong source | Cross-document contamination | Document filtering |
| Valid JSON but bad question | Schema is not enough | Critic/quality validation |
| Frequent malformed output | Weak output enforcement | Structured outputs |
| Timeout | Synchronous/slow generation | Celery/Redis/async flow |
| Citation missing | Weak traceability model | Citation generation/persistence |

---

# 29. What Must NOT Be Done

The coding assistant must avoid the following:

### Do not permanently discard most document chunks during ingestion.

### Do not rely exclusively on vector similarity.

### Do not rely exclusively on keyword search.

### Do not let the LLM answer from general knowledge when source context is missing.

### Do not use regex as the primary mechanism for parsing structured LLM output.

### Do not treat a valid JSON response as proof of correctness.

### Do not treat cosine similarity as proof of factual correctness.

### Do not use HTTP 404 to represent a background task that is still processing.

### Do not allow retrieval across unrelated documents.

### Do not save questions before validation is complete.

### Do not claim the system is "hallucination-free."

The correct goal is **measurable hallucination reduction and strong source grounding**.

---

# 30. Final Target Architecture

The completed architecture should conceptually operate as follows:

## Stage 1 â€” Upload

User uploads PDF.

## Stage 2 â€” Extraction

PDF is converted into structured Markdown.

## Stage 3 â€” Structure-Aware Chunking

Markdown is split using document headings and meaningful boundaries.

## Stage 4 â€” Context Injection

Each chunk receives document and section context.

## Stage 5 â€” Complete Indexing

All meaningful chunks are embedded and stored.

Each chunk contains:

- document association
- original content
- contextual content
- metadata
- embedding
- searchable text representation

## Stage 6 â€” User Generation Request

User specifies:

- document
- topic/category
- question count
- difficulty
- question type

## Stage 7 â€” Dynamic Retrieval

The requested topic becomes the retrieval query.

## Stage 8 â€” Hybrid Search

Dense vector retrieval + sparse keyword/full-text retrieval.

## Stage 9 â€” RRF Ranking

Results from both retrieval methods are combined into a unified ranking.

## Stage 10 â€” Context Selection

Top relevant chunks are passed to the generation system.

## Stage 11 â€” Async Processing

Generation is handled through Celery with Redis task tracking.

## Stage 12 â€” Structured Generation

The LLM generates a strict structured question object.

## Stage 13 â€” Critic Validation

A separate validation stage checks grounding.

## Stage 14 â€” Semantic Grounding Gate

Generated content is compared semantically against the retrieved context.

## Stage 15 â€” Citation

The accepted question retains its source information.

## Stage 16 â€” Persistence

Only validated questions are saved through the relational Prisma model.

## Stage 17 â€” Evaluation

RAGAS measures:

- Context Precision
- Context Recall
- Faithfulness
- Answer Relevancy

## Stage 18 â€” Quality Gate

If critical evaluation thresholds are not met, the build/test process should flag the implementation for investigation.

---

# 31. Expected Database Responsibility

The database layer should provide two different purposes.

## Knowledge Retrieval Storage

`document_chunks`

Responsible for:

- document content
- chunk metadata
- embeddings
- full-text search
- document filtering

## Application Question Storage

`GeneratedQuestion`

Responsible for:

- generated question
- answer
- difficulty
- topic
- status
- document relationship

## Question Choices

`QuestionChoice`

Responsible for:

- choice label
- choice text
- correct/incorrect state

## Citation

`QuestionCitation`

Responsible for:

- document
- section
- page range
- source excerpt
- confidence

The supplied Prisma design separates these entities instead of keeping the entire question structure as a single unstructured JSON object. îˆ€fileciteîˆ‚turn1file0îˆ‚L52-L89îˆ

---

# 32. Security and Data Isolation Requirements

The coding assistant should also verify:

- authenticated users can only access their own syllabus documents
- retrieval is scoped to the authorized document
- document IDs cannot be manipulated to retrieve another user's content
- server-side authentication is enforced
- sensitive server credentials remain server-side
- generated results are associated with the authenticated user
- database relations enforce ownership where appropriate

This is especially important because a technically accurate RAG response can still be a security failure if it retrieves another user's document.

---

# 33. Reliability Requirements

The system should handle failures gracefully.

### PDF failure

Return a clear ingestion error.

### Extraction failure

Do not create an apparently successful empty document.

### Embedding failure

Do not mark indexing as complete.

### Retrieval failure

Do not generate unsupported content.

### LLM failure

Return a controlled generation failure.

### Critic failure

Do not automatically approve the question.

### Semantic validation failure

Reject the question.

### Redis/Celery failure

Return a clear task-processing failure.

### Database failure

Do not report successful persistence when the database transaction failed.

---

# 34. Observability Requirements

The system should make it possible to diagnose where quality is being lost.

Track, where appropriate:

- document ID
- ingestion success/failure
- number of extracted chunks
- number of indexed chunks
- retrieval query
- number of retrieved chunks
- retrieval scores/ranks
- generation task ID
- generation duration
- critic pass/fail counts
- semantic similarity scores
- number of rejected questions
- number of persisted questions
- RAGAS evaluation scores

Do not expose sensitive API keys or private document content in ordinary logs.

---

# 35. Quality Philosophy

The target "10/10" architecture should not mean:

> "The LLM will never make a mistake."

Instead, it should mean:

> The system has multiple mechanisms for preventing unsupported generation, detecting retrieval failures, rejecting low-quality outputs, tracing answers to sources, measuring performance objectively, and preventing regressions.

A high-quality RAG system is therefore a **pipeline of controlled stages**, not simply an LLM connected to a vector database.

---

# 36. Definition of Done

The implementation should not be considered complete until all of the following are true.

## Ingestion

- [x] Full useful PDF content is processed.
- [x] Structure-aware Markdown extraction is used.
- [x] Meaningful chunks are retained.
- [x] Chunk context is injected.
- [x] All useful chunks are indexed.
- [x] Every chunk is associated with the correct document.

## Retrieval

- [x] Retrieval happens dynamically at generation time.
- [x] Retrieval is document-scoped.
- [x] Dense retrieval is implemented. (Needs Supabase RPC)
- [x] Sparse retrieval is implemented. (Needs PostgreSQL FTS setup)
- [x] RRF combines retrieval signals. (Needs DB function)
- [x] Relevant top-K context is selected.
- [x] No-context cases stop generation.

## Generation

- [x] Generation uses only supplied retrieved context.
- [x] Requested topic is respected.
- [x] Difficulty is respected.
- [x] Question type is respected.
- [x] Structured outputs are enforced.
- [x] Invalid structured output is rejected.

## Validation

- [x] Batch Critic validation exists.
- [x] Semantic grounding validation exists.
- [x] Unsupported questions are rejected.
- [x] Valid questions retain citation information.

## Persistence

- [x] Question data is relationally modeled.
- [x] Choices are relational.
- [x] Citations are relational.
- [x] User/document ownership is enforced.
- [x] Only validated results are persisted.

## Async Processing

- [x] Generation uses background processing.
- [x] HTTP 202 is used for queued generation.
- [x] Redis tracks task state.
- [x] Frontend polling is bounded and fault-tolerant.
- [x] Processing, completion, failure, and expiration are handled.

## Evaluation

- [x] RAGAS evaluation exists.
- [x] Context Precision is measured.
- [x] Context Recall is measured.
- [x] Faithfulness is measured.
- [x] Answer Relevancy is measured.
- [x] Representative benchmark cases exist.
- [x] Quality thresholds are enforced.
- [x] Regressions can be detected automatically.

---

# 37. Final Instruction to the Coding Assistant

Treat this document as the **requirements specification for the RAG refactor**.

Before changing code:

1. Inspect the current repository.
2. Map every requirement above to the existing implementation.
3. Identify which requirements already work.
4. Identify which requirements are partially implemented.
5. Identify which requirements are missing.
6. Do not unnecessarily rewrite functioning components.
7. Preserve existing QuizArena functionality outside the RAG improvements.
8. Implement the improvements in a staged, testable manner.
9. Verify each stage before moving to the next.
10. Run the complete test suite after implementation.
11. Run the RAGAS evaluation against a representative dataset.
12. Investigate failures rather than simply lowering thresholds.
13. Do not declare the system perfect merely because tests pass.
14. Clearly report any requirement that cannot be implemented because the current architecture lacks the necessary information or infrastructure.

## Most Important Principles

**1. Never throw away useful source knowledge before retrieval.**

**2. Retrieve dynamically based on the actual user request.**

**3. Use both semantic and exact-term retrieval.**

**4. Never allow missing context to silently become hallucinated knowledge.**

**5. Structured output validates format, not truth.**

**6. Critic validation and semantic gates provide additional grounding protection.**

**7. Every generated question should be traceable to its source.**

**8. Only validated content should reach permanent storage.**

**9. Measure RAG quality continuously instead of relying on visual inspection.**

**10. Treat failures as signals for improving the specific pipeline stage that caused them.**

---

# 38. Target Outcome

The final QuizArena RAG system should behave like this:

**Upload a syllabus â†’ preserve its useful knowledge â†’ understand its structure â†’ index it completely â†’ retrieve only the relevant parts when asked â†’ generate strictly from those parts â†’ validate the generated question through multiple gates â†’ attach its source â†’ save only verified content â†’ continuously measure whether retrieval and generation quality remain high.**

That is the intended enterprise-level RAG direction described by the source material.


