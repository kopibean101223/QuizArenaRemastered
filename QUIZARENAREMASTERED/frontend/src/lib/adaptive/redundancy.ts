/**
 * ============================================================================
 * SEMANTIC REDUNDANCY CONTROL
 * ============================================================================
 * R(q) = max Similarity(q, r) over recently-answered questions r.
 * Uses cosine similarity on embedding vectors (already produced by your RAG
 * pipeline / pgvector). This does NOT re-embed anything — it assumes
 * embeddingVector is already attached to QuestionMeta.
 */

import { QuestionMeta } from './types';

const TAG = '[Redundancy]';

export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    console.warn(`${TAG} cosineSimilarity() dimension mismatch`, { aLen: a.length, bLen: b.length });
    return 0;
  }

  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  if (normA === 0 || normB === 0) return 0;

  const sim = dot / (Math.sqrt(normA) * Math.sqrt(normB));
  return sim;
}

/**
 * R(q) — redundancy penalty for a candidate question against the student's
 * sliding window of recently-answered questions this session.
 */
export function redundancyScore(
  candidate: QuestionMeta,
  recentQuestions: QuestionMeta[]
): number {
  console.log(`${TAG} redundancyScore() checking candidate`, {
    questionId: candidate.questionId,
    windowSize: recentQuestions.length,
  });

  if (recentQuestions.length === 0) {
    console.log(`${TAG} no recent questions in window — R(q) = 0`);
    return 0;
  }

  let maxSim = 0;
  let closestId: string | number | null = null;

  for (const recent of recentQuestions) {
    const sim = cosineSimilarity(candidate.embeddingVector, recent.embeddingVector);
    console.log(`${TAG}   vs recent question ${recent.questionId}: similarity=${sim.toFixed(4)}`);
    if (sim > maxSim) {
      maxSim = sim;
      closestId = recent.questionId;
    }
  }

  console.log(`${TAG} R(q) result`, {
    questionId: candidate.questionId,
    maxSimilarity: maxSim.toFixed(4),
    mostSimilarTo: closestId,
  });

  return maxSim;
}

/**
 * Push a newly-answered question into the sliding window, capping its size at N.
 * Mutates and returns a new array (immutable-friendly for React/state usage).
 */
export function pushToRecentWindow(
  window: QuestionMeta[],
  newQuestion: QuestionMeta,
  windowSize = 5
): QuestionMeta[] {
  const updated = [newQuestion, ...window].slice(0, windowSize);
  console.log(`${TAG} pushToRecentWindow()`, {
    added: newQuestion.questionId,
    windowSizeBefore: window.length,
    windowSizeAfter: updated.length,
    windowSize,
  });
  return updated;
}
