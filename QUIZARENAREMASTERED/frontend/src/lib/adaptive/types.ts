/**
 * ============================================================================
 * ADAPTIVE ENGINE — SHARED TYPES
 * ============================================================================
 * Every field here maps 1:1 to a variable named in the thesis design doc's
 * "Variable Inventory" (BKT, IRT, scoring, question metadata, session state,
 * cold-start control). Keeping this centralized so nothing drifts.
 */

// ─── 1. BKT (Bayesian Knowledge Tracing) ────────────────────────────────────

/** Global or per-topic tunable priors. Start global, override per-topic once you have data. */
export interface BKTParams {
  pL0: number; // P(L0) — initial probability of knowing the skill
  pT: number;  // P(T)  — probability of learning after one attempt
  pS: number;  // P(S)  — probability of slipping (wrong despite knowing)
  pG: number;  // P(G)  — probability of guessing correctly despite not knowing
}

/** Per-student, per-knowledge-component mastery state. */
export interface BKTState {
  studentId: string;
  knowledgeComponentId: string; // topic/skill id, e.g. "algebra", "probability"
  pLt: number;                  // P(L_t) — current mastery probability
  updatedAt: string;            // ISO timestamp of last update
  responseCount: number;        // how many responses have updated this KC for this student
}

// ─── 2. IRT (Item Response Theory) ──────────────────────────────────────────

export interface StudentAbility {
  studentId: string;
  theta: number;          // θ — estimated ability
  responseCount: number;  // number of responses used to estimate theta
  updatedAt: string;
}

export interface ItemParams {
  questionId: string | number;
  bI: number;             // b_i — difficulty (starts as LLM label, calibrated over time)
  aI?: number;            // a_i — discrimination (optional, 2PL/3PL only)
  cI?: number;            // c_i — guessing param (optional, 3PL only)
  responseCount: number;  // needed to know when it's "calibrated enough"
  llmDifficultyLabel: 'Easy' | 'Medium' | 'Hard';
  isCalibrated: boolean;  // responseCount >= min_responses_threshold
}

// ─── 3. Question / Item metadata (from RAG side) ────────────────────────────

export interface QuestionMeta {
  questionId: string | number;
  topic: string;                 // links question -> BKT knowledge_component
  questionType: string;          // MCQ, short answer, etc.
  llmDifficulty: 'Easy' | 'Medium' | 'Hard';
  choices?: string[];
  correctAnswer: string;
  explanation?: string;
  sourceChunkId?: string | number;
  pageNumber?: number;
  embeddingVector: number[];      // for redundancy/similarity checks
  documentId?: string | number;
  courseId?: string;
  professorId?: string;
}

// ─── 4. Student / session tracking ──────────────────────────────────────────

export interface SessionState {
  studentId: string;
  battleId: string;
  answeredQuestionIds: Set<string | number>;
  recentQuestions: QuestionMeta[];        // sliding window of last N answered, for R(q)
  topicCoverageCounts: Record<string, number>; // topic -> count already asked this quiz
  isCalibrationPhase: boolean;
  calibrationQuestionsServed: number;
  semesterId?: string;
}

// ─── 5. Cold-start control ───────────────────────────────────────────────────

export interface ColdStartConfig {
  minResponsesThreshold: number;     // trust empirical b_i over llm_difficulty after this many responses
  calibrationQuestionCount: number;  // how many questions calibration phase serves
}

// ─── 6. Scoring weights (experimentally tuned, not fixed) ──────────────────

export interface ScoringWeights {
  lambda1: number; // weight on I(q, theta)  — IRT information
  lambda2: number; // weight on W(q)         — knowledge weakness
  lambda3: number; // weight on D(q)         — difficulty/ability suitability
  lambda4: number; // weight on R(q)         — redundancy penalty (subtracted)
}

export interface ScoredCandidate {
  question: QuestionMeta;
  I: number;
  W: number;
  D: number;
  R: number;
  score: number;
}

/** Default starting priors — tune empirically per the thesis's stated caveat. */
export const DEFAULT_BKT_PARAMS: BKTParams = {
  pL0: 0.5,
  pT: 0.15,
  pS: 0.1,
  pG: 0.2,
};

export const DEFAULT_SCORING_WEIGHTS: ScoringWeights = {
  lambda1: 0.3,
  lambda2: 0.3,
  lambda3: 0.25,
  lambda4: 0.25,
};

export const DEFAULT_COLD_START_CONFIG: ColdStartConfig = {
  minResponsesThreshold: 15,
  calibrationQuestionCount: 5,
};
