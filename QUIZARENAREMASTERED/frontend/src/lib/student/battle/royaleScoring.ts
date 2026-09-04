export type RoyaleTimerBand = '75-100' | '50-74' | '25-49' | '1-24' | '0';

export interface RoyaleScoringResult {
  baseDamage: number;
  timerDamage: number;
  totalDamage: number;
  timerReward: number;
  streakBonus: number;
  totalPoints: number;
  timeRemainingPercent: number;
  timerBand: RoyaleTimerBand;
}

export function getBaseRoyaleDamage(questionNumber: number, totalQuestions: number): number {
  if (!Number.isFinite(questionNumber) || !Number.isFinite(totalQuestions) || totalQuestions <= 1) {
    return 3;
  }

  const safeQuestion = Math.max(1, questionNumber);
  const safeTotal = Math.max(2, totalQuestions);
  const raw = 3 + (17 * (safeQuestion - 1)) / (safeTotal - 1);
  return Math.round(raw);
}

export function getTimeRemainingPercent(timeRemaining: number, totalTime: number): number {
  if (!Number.isFinite(timeRemaining) || !Number.isFinite(totalTime) || totalTime <= 0) {
    return 0;
  }

  const percent = (timeRemaining / totalTime) * 100;
  return Math.max(0, Math.min(100, percent));
}

export function getTimerBand(percent: number): RoyaleTimerBand {
  if (percent <= 0) return '0';
  if (percent >= 75) return '75-100';
  if (percent >= 50) return '50-74';
  if (percent >= 25) return '25-49';
  return '1-24';
}

export function getTimerRewardFromPercent(percent: number): number {
  const band = getTimerBand(percent);

  switch (band) {
    case '75-100':
      return 5;
    case '50-74':
      return 4;
    case '25-49':
      return 3;
    case '1-24':
      return 2;
    default:
      return 0;
  }
}

export function getTimerDamageFromPercent(percent: number): number {
  const band = getTimerBand(percent);

  switch (band) {
    case '75-100':
      return 5;
    case '50-74':
      return 4;
    case '25-49':
      return 3;
    case '1-24':
      return 2;
    default:
      return 5;
  }
}

export function getStreakBonus(currentStreak: number): number {
  return Math.max(0, (currentStreak - 3) * 10);
}

export function calculateRoyaleCorrectPoints(
  currentStreak: number,
  timeRemaining: number,
  totalTime: number
): RoyaleScoringResult {
  const percent = getTimeRemainingPercent(timeRemaining, totalTime);
  const timerReward = getTimerRewardFromPercent(percent);
  const streakBonus = getStreakBonus(currentStreak);

  return {
    baseDamage: 0,
    timerDamage: 0,
    totalDamage: 0,
    timerReward,
    streakBonus,
    totalPoints: 10 + streakBonus + timerReward,
    timeRemainingPercent: percent,
    timerBand: getTimerBand(percent),
  };
}

export function calculateRoyaleWrongAnswerDamage(
  questionNumber: number,
  totalQuestions: number,
  timeRemaining: number,
  totalTime: number
): RoyaleScoringResult {
  const percent = getTimeRemainingPercent(timeRemaining, totalTime);
  const baseDamage = getBaseRoyaleDamage(questionNumber, totalQuestions);
  const timerDamage = getTimerDamageFromPercent(percent);

  return {
    baseDamage,
    timerDamage,
    totalDamage: baseDamage + timerDamage,
    timerReward: 0,
    streakBonus: 0,
    totalPoints: 0,
    timeRemainingPercent: percent,
    timerBand: getTimerBand(percent),
  };
}

export function calculateRoyaleTimeoutDamage(
  questionNumber: number,
  totalQuestions: number
): RoyaleScoringResult {
  const baseDamage = getBaseRoyaleDamage(questionNumber, totalQuestions);

  return {
    baseDamage,
    timerDamage: 5,
    totalDamage: baseDamage + 5,
    timerReward: 0,
    streakBonus: 0,
    totalPoints: 0,
    timeRemainingPercent: 0,
    timerBand: '0',
  };
}

export function resolveRoyaleAttemptOutcome(params: {
  questionNumber: number;
  totalQuestions: number;
  timeRemaining: number;
  totalTime: number;
  currentStreak: number;
  isCorrect: boolean;
  isTimeout?: boolean;
}): RoyaleScoringResult {
  if (params.isTimeout) {
    return calculateRoyaleTimeoutDamage(params.questionNumber, params.totalQuestions);
  }

  if (params.isCorrect) {
    return calculateRoyaleCorrectPoints(params.currentStreak, params.timeRemaining, params.totalTime);
  }

  return calculateRoyaleWrongAnswerDamage(
    params.questionNumber,
    params.totalQuestions,
    params.timeRemaining,
    params.totalTime
  );
}
