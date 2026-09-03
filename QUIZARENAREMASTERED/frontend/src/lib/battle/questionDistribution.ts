export type QuestionDistributionMode = 'adaptive' | 'uniform';

export interface QuestionDistributionRequest<T> {
  adaptive: boolean;
  studentId?: string;
  battleId?: string;
  docId?: string | null;
  questions: T[];
  fallbackQuestion?: T | null;
}

export function getQuestionDistributionMode(adaptiveEnabled: boolean): QuestionDistributionMode {
  return adaptiveEnabled ? 'adaptive' : 'uniform';
}

export function buildUniformQuestionSet<T>(questions: T[], randomize = true): T[] {
  const items = [...questions];
  if (!randomize) return items;

  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

export function buildDistributionQuestionSet<T>(
  questions: T[],
  adaptiveEnabled: boolean,
  randomize = true,
): T[] {
  if (adaptiveEnabled) {
    return [...questions];
  }
  return buildUniformQuestionSet(questions, randomize);
}

export function isAdaptiveDistributionMode(value?: boolean | string | null): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value.toLowerCase() === 'adaptive';
  return false;
}

export async function requestAdaptiveQuestion<T>({
  adaptive,
  studentId,
  battleId,
  docId,
  fallbackQuestion,
}: QuestionDistributionRequest<T>): Promise<T | null> {
  if (!adaptive || !studentId || !battleId) {
    return fallbackQuestion ?? null;
  }

  try {
    const response = await fetch('/api/adaptive/next-question', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, battleId, docId }),
    });

    if (!response.ok) {
      console.warn('[QuestionDistribution] adaptive selection failed:', response.status);
      return fallbackQuestion ?? null;
    }

    const data = await response.json();
    return data?.selected ?? fallbackQuestion ?? null;
  } catch (error) {
    console.error('[QuestionDistribution] adaptive selection error:', error);
    return fallbackQuestion ?? null;
  }
}
