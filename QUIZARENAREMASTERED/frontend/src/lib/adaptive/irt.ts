/**
 * ============================================================================
 * ITEM RESPONSE THEORY (IRT) — 1PL / Rasch model
 * ============================================================================
 * Uses the 1-parameter logistic (Rasch) model by default since that's what
 * the thesis doc's variable list treats as the baseline (a_i, c_i marked
 * optional/2PL-3PL extension). Swap probabilityCorrect() for the 2PL/3PL
 * formula later without touching the rest of the pipeline.
 */

import { ItemParams, StudentAbility } from './types';

const TAG = '[IRT]';

const THETA_LEARNING_RATE = 0.1; // step size for the simple online theta update
const MAX_NEWTON_ITERATIONS = 25;

/**
 * 1PL probability a student of ability theta answers item of difficulty b_i correctly.
 * P(correct) = 1 / (1 + e^(-(theta - b_i)))
 */
export function probabilityCorrect(theta: number, bI: number, aI = 1): number {
  const p = 1 / (1 + Math.exp(-aI * (theta - bI)));
  console.log(`${TAG} probabilityCorrect()`, { theta, bI, aI, p: p.toFixed(4) });
  return p;
}

/**
 * Fisher information of an item at a given theta — how much this item would
 * help pin down the student's ability. Peaks when theta ≈ b_i.
 * I(theta) = P(theta)(1 - P(theta)) for 1PL (a_i folded in as scale).
 */
export function itemInformation(theta: number, bI: number, aI = 1): number {
  const p = probabilityCorrect(theta, bI, aI);
  const info = aI * aI * p * (1 - p);
  console.log(`${TAG} itemInformation()`, { theta, bI, aI, p: p.toFixed(4), info: info.toFixed(4) });
  return info;
}

/**
 * Difficulty/ability suitability score D(q). Not the same as raw information —
 * this rewards "well-matched challenge" specifically (close to theta), used as
 * an explicit pedagogical term separate from I(q,theta) in the final score.
 * D(q) = 1 - |theta - b_i| / maxSpread   (clamped to [0,1])
 */
export function difficultySuitability(theta: number, bI: number, maxSpread = 4): number {
  const raw = 1 - Math.abs(theta - bI) / maxSpread;
  const D = Math.min(1, Math.max(0, raw));
  console.log(`${TAG} difficultySuitability()`, { theta, bI, maxSpread, raw: raw.toFixed(4), D: D.toFixed(4) });
  return D;
}

/**
 * Simple online ability update (gradient-style, not full MLE — good enough for
 * live adaptive serving where you need theta after every single answer).
 * theta_new = theta_old + lr * (observed - expected)
 * For a full offline re-calibration pass (e.g. nightly job), swap in a proper
 * Newton-Raphson MLE using accumulated response history instead.
 */
export function updateTheta(
  priorTheta: number,
  bI: number,
  isCorrect: boolean,
  learningRate = THETA_LEARNING_RATE
): number {
  const expected = probabilityCorrect(priorTheta, bI);
  const observed = isCorrect ? 1 : 0;
  const newTheta = priorTheta + learningRate * (observed - expected);

  console.log(`${TAG} updateTheta()`, {
    priorTheta: priorTheta.toFixed(4),
    bI,
    isCorrect,
    expected: expected.toFixed(4),
    observed,
    newTheta: newTheta.toFixed(4),
    delta: (newTheta - priorTheta).toFixed(4),
  });

  return newTheta;
}

export function applyIRTAbilityUpdate(
  existing: StudentAbility | null,
  studentId: string,
  bI: number,
  isCorrect: boolean
): StudentAbility {
  const priorTheta = existing?.theta ?? 0; // theta=0 is the standard cold-start prior
  const priorCount = existing?.responseCount ?? 0;

  console.log(`${TAG} applyIRTAbilityUpdate()`, {
    studentId,
    hadExistingAbility: !!existing,
    priorTheta,
    priorCount,
  });

  const newTheta = updateTheta(priorTheta, bI, isCorrect);

  const result: StudentAbility = {
    studentId,
    theta: newTheta,
    responseCount: priorCount + 1,
    updatedAt: new Date().toISOString(),
  };

  console.log(`${TAG} ability updated`, {
    studentId,
    before: priorTheta.toFixed(4),
    after: newTheta.toFixed(4),
    responseCount: result.responseCount,
  });

  return result;
}

/**
 * Empirical difficulty re-calibration for an item, using accumulated
 * correct/incorrect counts. Simple MLE-lite: b_i moves toward the average
 * theta of respondents, offset by how often they got it right.
 * This is what eventually REPLACES llmDifficulty once responseCount crosses
 * min_responses_threshold (see coldStart.ts).
 */
export function recalibrateItemDifficulty(
  item: ItemParams,
  respondentThetas: number[],
  correctFlags: boolean[]
): ItemParams {
  console.log(`${TAG} recalibrateItemDifficulty() called`, {
    questionId: item.questionId,
    currentBI: item.bI,
    llmDifficultyLabel: item.llmDifficultyLabel,
    numRespondents: respondentThetas.length,
  });

  if (respondentThetas.length !== correctFlags.length || respondentThetas.length === 0) {
    console.warn(`${TAG} insufficient/mismatched data — skipping recalibration`, {
      questionId: item.questionId,
    });
    return item;
  }

  // Newton-Raphson on b_i holding thetas fixed: maximize likelihood of observed responses.
  let bEstimate = item.bI;
  for (let iter = 0; iter < MAX_NEWTON_ITERATIONS; iter++) {
    let gradient = 0;
    let hessian = 0;
    for (let i = 0; i < respondentThetas.length; i++) {
      const theta = respondentThetas[i];
      const p = probabilityCorrect(theta, bEstimate);
      const y = correctFlags[i] ? 1 : 0;
      gradient += (y - p) * -1; // d(logL)/db_i
      hessian += -p * (1 - p) * -1;
    }
    if (hessian === 0) break;
    const step = gradient / hessian;
    bEstimate -= step;
    if (Math.abs(step) < 1e-4) {
      console.log(`${TAG} Newton-Raphson converged at iteration ${iter}`, { bEstimate: bEstimate.toFixed(4) });
      break;
    }
  }

  const responseCount = item.responseCount + respondentThetas.length;

  const updated: ItemParams = {
    ...item,
    bI: bEstimate,
    responseCount,
  };

  console.log(`${TAG} recalibration complete`, {
    questionId: item.questionId,
    oldBI: item.bI.toFixed(4),
    newBI: bEstimate.toFixed(4),
    responseCount,
  });

  return updated;
}
