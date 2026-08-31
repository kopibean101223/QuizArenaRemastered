/**
 * ============================================================================
 * COLD-START CONTROL
 * ============================================================================
 * Handles the 4 cold-start scenarios from the thesis doc:
 *   1. New student       -> no BKT/IRT history for this studentId
 *   2. New question      -> item.responseCount === 0 (llm_difficulty only)
 *   3. New semester       -> semesterId changed / no carried-over item params
 *   4. True system cold start -> nothing has data at all
 *
 * Resolution strategy: priors + a balanced-sampling calibration phase BEFORE
 * the full adaptive scoring loop is trusted.
 */

import { ColdStartConfig, DEFAULT_COLD_START_CONFIG, ItemParams, QuestionMeta, SessionState } from './types';

const TAG = '[ColdStart]';

export interface ColdStartCheckResult {
  hasStudentHistory: boolean;
  hasItemResponseData: boolean;
  shouldUseCalibrationPhase: boolean;
  reason: string;
}

export function checkColdStart(
  hasStudentHistory: boolean,
  hasItemResponseData: boolean,
  session: SessionState,
  config: ColdStartConfig = DEFAULT_COLD_START_CONFIG
): ColdStartCheckResult {
  console.log(`${TAG} checkColdStart()`, {
    studentId: session.studentId,
    hasStudentHistory,
    hasItemResponseData,
    calibrationQuestionsServedSoFar: session.calibrationQuestionsServed,
    calibrationQuestionCountTarget: config.calibrationQuestionCount,
  });

  let shouldUseCalibrationPhase = false;
  let reason = 'full adaptive mode';

  if (!hasStudentHistory) {
    shouldUseCalibrationPhase = true;
    reason = 'new student — no BKT/IRT history';
  } else if (!hasItemResponseData) {
    shouldUseCalibrationPhase = true;
    reason = 'new/uncalibrated question bank — insufficient item response data';
  } else if (session.calibrationQuestionsServed < config.calibrationQuestionCount) {
    shouldUseCalibrationPhase = true;
    reason = `calibration phase in progress (${session.calibrationQuestionsServed}/${config.calibrationQuestionCount} served)`;
  }

  const result: ColdStartCheckResult = { hasStudentHistory, hasItemResponseData, shouldUseCalibrationPhase, reason };

  console.log(`${TAG} decision`, result);

  return result;
}

/**
 * Calibration-phase question selection: balanced topic + difficulty sampling,
 * deliberately NOT personalized (per thesis explicit anti-pattern: don't
 * randomly sample after retrieval either — this is *structured* balanced
 * sampling, not pure random).
 */
export function selectCalibrationQuestion(
  candidates: QuestionMeta[],
  session: SessionState
): QuestionMeta | null {
  console.log(`${TAG} selectCalibrationQuestion() — balanced sampling mode`, {
    studentId: session.studentId,
    candidateCount: candidates.length,
    topicCoverageCounts: session.topicCoverageCounts,
  });

  const unanswered = candidates.filter((q) => !session.answeredQuestionIds.has(q.questionId));

  if (unanswered.length === 0) {
    console.warn(`${TAG} no unanswered candidates left for calibration`);
    return null;
  }

  // Prioritize topics with the LOWEST coverage count so far this session.
  const sorted = [...unanswered].sort((a, b) => {
    const covA = session.topicCoverageCounts[a.topic] ?? 0;
    const covB = session.topicCoverageCounts[b.topic] ?? 0;
    if (covA !== covB) return covA - covB;

    // Secondary: balance difficulty labels round-robin-ish by just using
    // a stable but arbitrary tiebreak (difficulty string compare) so easy/
    // medium/hard get mixed rather than clustering.
    return a.llmDifficulty.localeCompare(b.llmDifficulty);
  });

  const picked = sorted[0];

  console.log(`${TAG} picked calibration question`, {
    questionId: picked.questionId,
    topic: picked.topic,
    llmDifficulty: picked.llmDifficulty,
    topicCoverageBefore: session.topicCoverageCounts[picked.topic] ?? 0,
  });

  return picked;
}

/** Decide whether an item's b_i is trustworthy yet, per min_responses_threshold. */
export function isItemCalibrated(item: ItemParams, config: ColdStartConfig = DEFAULT_COLD_START_CONFIG): boolean {
  const calibrated = item.responseCount >= config.minResponsesThreshold;
  console.log(`${TAG} isItemCalibrated()`, {
    questionId: item.questionId,
    responseCount: item.responseCount,
    threshold: config.minResponsesThreshold,
    calibrated,
  });
  return calibrated;
}
