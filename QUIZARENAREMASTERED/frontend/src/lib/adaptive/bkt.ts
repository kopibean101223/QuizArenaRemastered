/**
 * ============================================================================
 * BAYESIAN KNOWLEDGE TRACING (BKT)
 * ============================================================================
 * Standard 4-parameter BKT: P(L0), P(T), P(S), P(G).
 * NOT an original formula — this is the textbook Corbett & Anderson (1994)
 * update, exactly as the thesis doc requires ("don't claim BKT as an
 * original invention").
 */

import { BKTParams, BKTState, DEFAULT_BKT_PARAMS } from './types';

const TAG = '[BKT]';

/**
 * Bayesian posterior update of P(L_t) given an observed response.
 * Step 1: compute P(L_t | evidence) using Bayes' rule with slip/guess.
 * Step 2: project forward through the learning transition P(T).
 */
export function updateMastery(
  priorPLt: number,
  isCorrect: boolean,
  params: BKTParams = DEFAULT_BKT_PARAMS
): number {
  const { pT, pS, pG } = params;

  console.log(`${TAG} updateMastery() called`, {
    priorPLt,
    isCorrect,
    params,
  });

  let posterior: number;

  if (isCorrect) {
    // P(L_t | correct) = P(L_t)(1-P(S)) / [P(L_t)(1-P(S)) + (1-P(L_t))P(G)]
    const numerator = priorPLt * (1 - pS);
    const denominator = numerator + (1 - priorPLt) * pG;
    posterior = denominator === 0 ? priorPLt : numerator / denominator;
    console.log(`${TAG} correct-response branch`, { numerator, denominator, posterior });
  } else {
    // P(L_t | incorrect) = P(L_t)*P(S) / [P(L_t)*P(S) + (1-P(L_t))(1-P(G))]
    const numerator = priorPLt * pS;
    const denominator = numerator + (1 - priorPLt) * (1 - pG);
    posterior = denominator === 0 ? priorPLt : numerator / denominator;
    console.log(`${TAG} incorrect-response branch`, { numerator, denominator, posterior });
  }

  // Project forward: P(L_{t+1}) = P(L_t|evidence) + (1 - P(L_t|evidence)) * P(T)
  const projected = posterior + (1 - posterior) * pT;

  console.log(`${TAG} projected forward with P(T)=${pT}`, {
    posteriorBeforeLearning: posterior,
    projectedAfterLearning: projected,
  });

  const clamped = clamp01(projected);
  if (clamped !== projected) {
    console.warn(`${TAG} clamped mastery from ${projected} to ${clamped}`);
  }

  return clamped;
}

/**
 * Full state-object wrapper: takes existing BKTState (or none, for cold start),
 * returns updated BKTState. This is the function the adaptive loop calls after
 * every student answer.
 */
export function applyBKTUpdate(
  existing: BKTState | null,
  studentId: string,
  knowledgeComponentId: string,
  isCorrect: boolean,
  params: BKTParams = DEFAULT_BKT_PARAMS
): BKTState {
  const priorPLt = existing?.pLt ?? params.pL0;
  const priorResponseCount = existing?.responseCount ?? 0;

  console.log(`${TAG} applyBKTUpdate()`, {
    studentId,
    knowledgeComponentId,
    hadExistingState: !!existing,
    priorPLt,
    priorResponseCount,
    isCorrect,
  });

  const newPLt = updateMastery(priorPLt, isCorrect, params);

  const newState: BKTState = {
    studentId,
    knowledgeComponentId,
    pLt: newPLt,
    updatedAt: new Date().toISOString(),
    responseCount: priorResponseCount + 1,
  };

  console.log(`${TAG} mastery updated`, {
    studentId,
    knowledgeComponentId,
    before: priorPLt.toFixed(4),
    after: newPLt.toFixed(4),
    delta: (newPLt - priorPLt).toFixed(4),
    responseCount: newState.responseCount,
  });

  return newState;
}

/** Cold start: no state yet for this student+KC. Returns the prior as a fresh state. */
export function coldStartMastery(
  studentId: string,
  knowledgeComponentId: string,
  params: BKTParams = DEFAULT_BKT_PARAMS
): BKTState {
  console.log(`${TAG} coldStartMastery() — no prior data, seeding with P(L0)=${params.pL0}`, {
    studentId,
    knowledgeComponentId,
  });
  return {
    studentId,
    knowledgeComponentId,
    pLt: params.pL0,
    updatedAt: new Date().toISOString(),
    responseCount: 0,
  };
}

function clamp01(x: number): number {
  return Math.min(1, Math.max(0, x));
}
