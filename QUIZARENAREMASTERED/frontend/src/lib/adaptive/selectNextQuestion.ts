/**
 * ============================================================================
 * ADAPTIVE LOOP ORCHESTRATOR
 * ============================================================================
 * This is the "Algorithm Process" from the thesis doc, implemented step by
 * step in order:
 *   1. Load BKT mastery state
 *   2. Load IRT ability estimate (theta)
 *   3. Pull available questions from the bank
 *   4. Filter out already-answered
 *   5. Compute W(q) per candidate            -> scoring.ts
 *   6. Compute I(q, theta) per candidate      -> scoring.ts / irt.ts
 *   7. Compute D(q) per candidate             -> scoring.ts / irt.ts
 *   8. Compute R(q) per candidate             -> scoring.ts / redundancy.ts
 *   9. Apply topic/content coverage constraints
 *   10. Combine into Score(q) and rank
 *   11. Select highest-scoring question
 *
 * Cold-start / calibration-phase branch happens BEFORE step 5 — see
 * coldStart.ts. This file decides which branch to take and delegates.
 */

import { checkColdStart, selectCalibrationQuestion } from './coldStart';
import { scoreAllCandidates, ScoreQuestionInput } from './scoring';
import {
  BKTState,
  ColdStartConfig,
  DEFAULT_COLD_START_CONFIG,
  DEFAULT_SCORING_WEIGHTS,
  ItemParams,
  QuestionMeta,
  ScoredCandidate,
  ScoringWeights,
  SessionState,
  StudentAbility,
} from './types';

const TAG = '[AdaptiveLoop]';

/** Max fraction of the quiz any single topic is allowed to dominate. */
const MAX_TOPIC_COVERAGE_RATIO = 0.4;

export interface SelectNextQuestionInput {
  session: SessionState;
  questionBank: QuestionMeta[];
  studentAbility: StudentAbility | null;
  bktStates: Map<string, BKTState>; // key = knowledgeComponentId
  itemParamsByQuestionId: Map<string | number, ItemParams>;
  hasStudentHistory: boolean;
  hasItemResponseData: boolean;
  coldStartConfig?: ColdStartConfig;
  scoringWeights?: ScoringWeights;
  quizLength?: number; // used for coverage-ratio calculation
}

export interface SelectNextQuestionResult {
  selected: QuestionMeta | null;
  mode: 'calibration' | 'adaptive';
  ranked?: ScoredCandidate[]; // full ranking, only populated in adaptive mode
  reason: string;
}

export function selectNextQuestion(input: SelectNextQuestionInput): SelectNextQuestionResult {
  const {
    session,
    questionBank,
    studentAbility,
    bktStates,
    itemParamsByQuestionId,
    hasStudentHistory,
    hasItemResponseData,
    quizLength = 10,
  } = input;
  const coldStartConfig = input.coldStartConfig ?? DEFAULT_COLD_START_CONFIG;
  const scoringWeights = input.scoringWeights ?? DEFAULT_SCORING_WEIGHTS;

  console.log('='.repeat(80));
  console.log(`${TAG} ── STEP 0: selectNextQuestion() invoked ──`, {
    studentId: session.studentId,
    battleId: session.battleId,
    bankSize: questionBank.length,
    alreadyAnswered: session.answeredQuestionIds.size,
  });

  // ── STEP 3 + 4: pull bank, filter already-answered ──────────────────────
  console.log(`${TAG} STEP 3/4: filtering already-answered questions`);
  const unanswered = questionBank.filter((q) => !session.answeredQuestionIds.has(q.questionId));
  console.log(`${TAG} unanswered candidates remaining: ${unanswered.length} / ${questionBank.length}`);

  if (unanswered.length === 0) {
    console.warn(`${TAG} no unanswered questions left — bank exhausted`);
    return { selected: null, mode: 'adaptive', reason: 'question bank exhausted' };
  }

  // ── COLD-START CHECK ─────────────────────────────────────────────────────
  const coldStart = checkColdStart(hasStudentHistory, hasItemResponseData, session, coldStartConfig);

  if (coldStart.shouldUseCalibrationPhase) {
    console.log(`${TAG} branching into CALIBRATION mode: ${coldStart.reason}`);
    const picked = selectCalibrationQuestion(unanswered, session);
    return {
      selected: picked,
      mode: 'calibration',
      reason: coldStart.reason,
    };
  }

  console.log(`${TAG} branching into FULL ADAPTIVE mode`);

  // ── STEP 1: load BKT mastery state ──────────────────────────────────────
  console.log(`${TAG} STEP 1: loading BKT mastery states`, {
    knownComponents: Array.from(bktStates.keys()),
  });

  // ── STEP 2: load IRT ability estimate ───────────────────────────────────
  const theta = studentAbility?.theta ?? 0;
  console.log(`${TAG} STEP 2: loaded theta = ${theta.toFixed(4)}`, {
    hadExistingAbility: !!studentAbility,
  });

  // ── STEP 9 (pre-filter half): apply topic coverage constraint BEFORE scoring ──
  console.log(`${TAG} STEP 9: applying topic/content coverage constraints`);
  const coverageFiltered = applyCoverageConstraint(unanswered, session, quizLength);

  if (coverageFiltered.length === 0) {
    console.warn(`${TAG} coverage constraint eliminated all candidates — falling back to unfiltered set`);
  }
  const finalCandidates = coverageFiltered.length > 0 ? coverageFiltered : unanswered;

  // ── STEPS 5-8 + 10: score every remaining candidate ─────────────────────
  const scoreInputs: ScoreQuestionInput[] = finalCandidates.map((q) => {
    const itemParams: ItemParams =
      itemParamsByQuestionId.get(q.questionId) ??
      fallbackItemParams(q);

    const bkt = bktStates.get(q.topic);
    const masteryForTopic = bkt?.pLt ?? null;

    if (!itemParamsByQuestionId.has(q.questionId)) {
      console.log(`${TAG} no calibrated ItemParams for question ${q.questionId} — using LLM-difficulty fallback`, {
        llmDifficulty: q.llmDifficulty,
        fallbackBI: itemParams.bI,
      });
    }
    if (!bkt) {
      console.log(`${TAG} no BKT state yet for topic "${q.topic}" — scoring.ts will assume neutral mastery`);
    }

    return {
      question: q,
      theta,
      itemParams,
      masteryForTopic,
      recentQuestions: session.recentQuestions,
      weights: scoringWeights,
    };
  });

  const ranked = scoreAllCandidates(scoreInputs);
  const selected = ranked[0]?.question ?? null;

  console.log(`${TAG} STEP 11: SELECTED question`, {
    questionId: selected?.questionId,
    topic: selected?.topic,
    topScore: ranked[0]?.score.toFixed(4),
  });
  console.log('='.repeat(80));

  return {
    selected,
    mode: 'adaptive',
    ranked,
    reason: 'highest Score(q) in full adaptive mode',
  };
}

/**
 * Prevents one weak topic from dominating the whole quiz: once a topic has
 * been asked >= MAX_TOPIC_COVERAGE_RATIO * quizLength times, exclude it from
 * the candidate pool (unless that would empty the pool — caller handles that
 * fallback).
 */
function applyCoverageConstraint(
  candidates: QuestionMeta[],
  session: SessionState,
  quizLength: number
): QuestionMeta[] {
  const maxPerTopic = Math.max(1, Math.ceil(quizLength * MAX_TOPIC_COVERAGE_RATIO));

  console.log(`${TAG} coverage constraint: max ${maxPerTopic} questions per topic (quizLength=${quizLength})`, {
    currentCoverage: session.topicCoverageCounts,
  });

  const filtered = candidates.filter((q) => {
    const covered = session.topicCoverageCounts[q.topic] ?? 0;
    const allowed = covered < maxPerTopic;
    if (!allowed) {
      console.log(`${TAG}   excluding question ${q.questionId} — topic "${q.topic}" already at cap (${covered}/${maxPerTopic})`);
    }
    return allowed;
  });

  console.log(`${TAG} coverage constraint result: ${filtered.length}/${candidates.length} candidates survive`);

  return filtered;
}

/** When an item has no calibrated params yet, derive a provisional b_i straight from the LLM label. */
function fallbackItemParams(question: QuestionMeta): ItemParams {
  const labelToB: Record<string, number> = { Easy: -1, Medium: 0, Hard: 1 };
  return {
    questionId: question.questionId,
    bI: labelToB[question.llmDifficulty] ?? 0,
    responseCount: 0,
    llmDifficultyLabel: question.llmDifficulty,
    isCalibrated: false,
  };
}

/**
 * Call this after a student answers, BEFORE the next selectNextQuestion() call,
 * to advance session bookkeeping (steps between "12. Student answers" and
 * "16. Select the next question" in the algorithm process).
 */
export function recordAnswerInSession(
  session: SessionState,
  answeredQuestion: QuestionMeta,
  windowSize = 5
): SessionState {
  console.log(`${TAG} recordAnswerInSession()`, {
    studentId: session.studentId,
    questionId: answeredQuestion.questionId,
    topic: answeredQuestion.topic,
  });

  const newAnswered = new Set(session.answeredQuestionIds);
  newAnswered.add(answeredQuestion.questionId);

  const newRecent = [answeredQuestion, ...session.recentQuestions].slice(0, windowSize);

  const newCoverage = {
    ...session.topicCoverageCounts,
    [answeredQuestion.topic]: (session.topicCoverageCounts[answeredQuestion.topic] ?? 0) + 1,
  };

  const newCalibCount = session.isCalibrationPhase
    ? session.calibrationQuestionsServed + 1
    : session.calibrationQuestionsServed;

  const updated: SessionState = {
    ...session,
    answeredQuestionIds: newAnswered,
    recentQuestions: newRecent,
    topicCoverageCounts: newCoverage,
    calibrationQuestionsServed: newCalibCount,
  };

  console.log(`${TAG} session updated`, {
    totalAnswered: updated.answeredQuestionIds.size,
    recentWindowSize: updated.recentQuestions.length,
    topicCoverageCounts: updated.topicCoverageCounts,
    calibrationQuestionsServed: updated.calibrationQuestionsServed,
  });

  return updated;
}
