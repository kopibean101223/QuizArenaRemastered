/**
 * ============================================================================
 * COMBINED SCORING — Score(q) = λ1·I(q,θ) + λ2·W(q) + λ3·D(q) − λ4·R(q)
 * ============================================================================
 */

import { itemInformation, difficultySuitability } from './irt';
import { redundancyScore } from './redundancy';
import {
  BKTState,
  ItemParams,
  QuestionMeta,
  ScoredCandidate,
  ScoringWeights,
  DEFAULT_SCORING_WEIGHTS,
} from './types';

const TAG = '[Scoring]';

export interface ScoreQuestionInput {
  question: QuestionMeta;
  theta: number;
  itemParams: ItemParams;
  masteryForTopic: number | null; // P(K_k) for this question's knowledge component, or null if unknown
  recentQuestions: QuestionMeta[];
  weights?: ScoringWeights;
}

/**
 * Score a single candidate question. This is the per-candidate inner loop
 * that gets run over every eligible question in the bank each turn.
 */
export function scoreQuestion(input: ScoreQuestionInput): ScoredCandidate {
  const { question, theta, itemParams, masteryForTopic, recentQuestions } = input;
  const weights = input.weights ?? DEFAULT_SCORING_WEIGHTS;

  console.log(`${TAG} scoreQuestion() — evaluating candidate ${question.questionId}`, {
    topic: question.topic,
    theta,
    bI: itemParams.bI,
    masteryForTopic,
  });

  // I(q, theta) — IRT information value
  const I = itemInformation(theta, itemParams.bI);

  // W(q) = 1 - P(K_k) — knowledge weakness. Cold start (no mastery data) => assume moderate weakness (0.5).
  const effectiveMastery = masteryForTopic ?? 0.5;
  const W = 1 - effectiveMastery;
  console.log(`${TAG} W(q) computed`, {
    questionId: question.questionId,
    masteryForTopic,
    usedMastery: effectiveMastery,
    W: W.toFixed(4),
  });

  // D(q) — difficulty/ability suitability
  const D = difficultySuitability(theta, itemParams.bI);

  // R(q) — redundancy penalty
  const R = redundancyScore(question, recentQuestions);

  const score =
    weights.lambda1 * I +
    weights.lambda2 * W +
    weights.lambda3 * D -
    weights.lambda4 * R;

  const result: ScoredCandidate = { question, I, W, D, R, score };

  console.log(`${TAG} final Score(q)`, {
    questionId: question.questionId,
    topic: question.topic,
    I: I.toFixed(4),
    W: W.toFixed(4),
    D: D.toFixed(4),
    R: R.toFixed(4),
    weights,
    score: score.toFixed(4),
  });

  return result;
}

/**
 * Score every candidate and return them sorted best-first.
 * Logs a full leaderboard-style table at the end for easy debugging.
 */
export function scoreAllCandidates(
  candidates: ScoreQuestionInput[]
): ScoredCandidate[] {
  console.log(`${TAG} scoreAllCandidates() — scoring ${candidates.length} candidate(s)`);

  const scored = candidates.map(scoreQuestion);
  const sorted = [...scored].sort((a, b) => b.score - a.score);

  console.table(
    sorted.map((c) => ({
      questionId: c.question.questionId,
      topic: c.question.topic,
      I: c.I.toFixed(3),
      W: c.W.toFixed(3),
      D: c.D.toFixed(3),
      R: c.R.toFixed(3),
      score: c.score.toFixed(3),
    }))
  );

  return sorted;
}
