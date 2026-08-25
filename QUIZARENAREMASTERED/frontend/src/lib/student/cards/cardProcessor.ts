import type { PowerCardData, CardCategory } from '@/components/studentONLY/PowerCards/types';

/**
 * "Pointing & processing" module — the single place that:
 *  1. Validates a card can be used (enough points, valid target state).
 *  2. Deducts the card's point cost from the student.
 *  3. Runs the category-specific effect (damage/shield/hp/points/timers/removeChoices).
 *  4. Logs the transaction.
 *  5. Returns the updated state — including `remainingPoints`, the balance
 *     handed back to the student after the card is spent.
 *
 * Pure functions in, updated state out — no framework/store dependency, so
 * this can be called from a React component (see PowerCardGallery.tsx) or
 * from a WS handler on the server (mirroring the pattern in
 * handlers/BattleRoyale.ts) without changes.
 */

export interface StudentCardState {
  studentId: string;
  /** Spendable currency used to "buy"/activate cards. */
  points: number;
  /** Quiz score — separate from `points` so a points-category card can top it up. */
  score: number;
  hp: number;
  maxHp: number;
  shield: number;
  timeLeft: number;
}

export interface EnemyCardState {
  enemyId: string;
  hp: number;
  shield: number;
  timeLeft: number;
}

export interface QuestionOption {
  key: string;
  isCorrect: boolean;
}

export interface CardUsageLogEntry {
  studentId: string;
  cardId: string;
  category: CardCategory;
  costPaid: number;
  remainingPoints: number;
  result: string;
  timestamp: number;
}

export interface CardUseContext {
  card: PowerCardData;
  student: StudentCardState;
  /** Required for damage / enemyTimer cards. */
  enemy?: EnemyCardState;
  /** Required for removeChoices cards — the current question's options. */
  questionOptions?: QuestionOption[];
}

export interface CardUseResult {
  success: boolean;
  message: string;
  updatedStudent: StudentCardState;
  updatedEnemy?: EnemyCardState;
  /** Option keys the removeChoices handler stripped from the question. */
  removedChoiceKeys?: string[];
  /** Balance left after the card's cost was deducted — the value returned to the student. */
  remainingPoints: number;
}

// In-memory ledger keyed by studentId. Swap for a DB/Redis write (same shape
// as answeredKey()/playersKey() in handlers/BattleRoyale.ts) once this is
// wired server-side; kept in-memory here so the module works standalone.
const usageLedger: Map<string, CardUsageLogEntry[]> = new Map();

function logUsage(entry: CardUsageLogEntry) {
  const existing = usageLedger.get(entry.studentId) ?? [];
  usageLedger.set(entry.studentId, [...existing, entry]);
}

export function getUsageHistory(studentId: string): CardUsageLogEntry[] {
  return usageLedger.get(studentId) ?? [];
}

export function getRemainingPoints(studentId: string, fallback: number): number {
  const history = usageLedger.get(studentId);
  if (!history || history.length === 0) return fallback;
  return history[history.length - 1].remainingPoints;
}

// ---------------------------------------------------------------------------
// Category handlers — each takes the already-cost-deducted student state and
// returns the fully updated result. Every handler is pure: same input always
// produces the same shape of output (random rolls aside).
// ---------------------------------------------------------------------------

function applyDamageCard(card: PowerCardData, student: StudentCardState, enemy?: EnemyCardState): CardUseResult {
  if (!enemy) {
    return { success: false, message: 'No enemy target available for this card.', updatedStudent: student, remainingPoints: student.points };
  }
  const { amount = 0, chance, multiplier = 1 } = card.effect;
  const rolled = chance === undefined || Math.random() < chance;
  const damage = rolled ? amount * multiplier : amount;

  const shieldAbsorbed = Math.min(enemy.shield, damage);
  const hpDamage = damage - shieldAbsorbed;

  const updatedEnemy: EnemyCardState = {
    ...enemy,
    shield: enemy.shield - shieldAbsorbed,
    hp: Math.max(0, enemy.hp - hpDamage),
  };

  const boosted = rolled && multiplier > 1;
  return {
    success: true,
    message: boosted
      ? `${card.name} triggered! Dealt ${damage} damage (x${multiplier}).`
      : `${card.name} dealt ${damage} damage.`,
    updatedStudent: student,
    updatedEnemy,
    remainingPoints: student.points,
  };
}

function applyShieldCard(card: PowerCardData, student: StudentCardState): CardUseResult {
  const amount = card.effect.amount ?? 0;
  const updatedStudent: StudentCardState = { ...student, shield: student.shield + amount };
  return {
    success: true,
    message: `${card.name} added ${amount} shield.`,
    updatedStudent,
    remainingPoints: updatedStudent.points,
  };
}

function applyHpCard(card: PowerCardData, student: StudentCardState): CardUseResult {
  const amount = card.effect.amount ?? 0;
  const updatedStudent: StudentCardState = {
    ...student,
    hp: Math.min(student.maxHp, student.hp + amount),
  };
  return {
    success: true,
    message: `${card.name} restored ${amount} HP.`,
    updatedStudent,
    remainingPoints: updatedStudent.points,
  };
}

function applyPointsCard(card: PowerCardData, student: StudentCardState): CardUseResult {
  const amount = card.effect.amount ?? 0;
  const updatedStudent: StudentCardState = { ...student, score: student.score + amount };
  return {
    success: true,
    message: `${card.name} added ${amount} points to your score.`,
    updatedStudent,
    remainingPoints: updatedStudent.points,
  };
}

function applySelfTimerCard(card: PowerCardData, student: StudentCardState): CardUseResult {
  const amount = card.effect.amount ?? 0;
  const updatedStudent: StudentCardState = { ...student, timeLeft: student.timeLeft + amount };
  return {
    success: true,
    message: `${card.name} added ${amount}s to your timer.`,
    updatedStudent,
    remainingPoints: updatedStudent.points,
  };
}

function applyEnemyTimerCard(card: PowerCardData, student: StudentCardState, enemy?: EnemyCardState): CardUseResult {
  if (!enemy) {
    return { success: false, message: 'No enemy target available for this card.', updatedStudent: student, remainingPoints: student.points };
  }
  const amount = card.effect.amount ?? 0;
  const updatedEnemy: EnemyCardState = { ...enemy, timeLeft: Math.max(0, enemy.timeLeft - amount) };
  return {
    success: true,
    message: `${card.name} cut ${amount}s from the enemy's timer.`,
    updatedStudent: student,
    updatedEnemy,
    remainingPoints: student.points,
  };
}

function applyRemoveChoicesCard(
  card: PowerCardData,
  student: StudentCardState,
  questionOptions?: QuestionOption[]
): CardUseResult {
  if (!questionOptions || questionOptions.length === 0) {
    return { success: false, message: 'No active question to apply this card to.', updatedStudent: student, remainingPoints: student.points };
  }
  const toRemove = card.effect.choicesToRemove ?? 1;
  const incorrect = questionOptions.filter((o) => !o.isCorrect);
  const shuffled = [...incorrect].sort(() => Math.random() - 0.5);
  const removedChoiceKeys = shuffled.slice(0, Math.min(toRemove, incorrect.length)).map((o) => o.key);

  return {
    success: true,
    message: `${card.name} removed ${removedChoiceKeys.length} incorrect choice(s).`,
    updatedStudent: student,
    removedChoiceKeys,
    remainingPoints: student.points,
  };
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

/**
 * Spend + resolve a power card. This is the only function callers need:
 * it deducts `card.cost` from `student.points`, dispatches to the right
 * category handler, logs the transaction, and hands back the remaining
 * point balance alongside the updated student/enemy state.
 */
export function processCardUsage(ctx: CardUseContext): CardUseResult {
  const { card, student, enemy, questionOptions } = ctx;

  if (student.points < card.cost) {
    return {
      success: false,
      message: `Not enough points to use ${card.name} (needs ${card.cost}, have ${student.points}).`,
      updatedStudent: student,
      remainingPoints: student.points,
    };
  }

  const afterCost: StudentCardState = { ...student, points: student.points - card.cost };

  let result: CardUseResult;
  switch (card.category) {
    case 'damage':
      result = applyDamageCard(card, afterCost, enemy);
      break;
    case 'shield':
      result = applyShieldCard(card, afterCost);
      break;
    case 'hp':
      result = applyHpCard(card, afterCost);
      break;
    case 'points':
      result = applyPointsCard(card, afterCost);
      break;
    case 'selfTimer':
      result = applySelfTimerCard(card, afterCost);
      break;
    case 'enemyTimer':
      result = applyEnemyTimerCard(card, afterCost, enemy);
      break;
    case 'removeChoices':
      result = applyRemoveChoicesCard(card, afterCost, questionOptions);
      break;
    default:
      result = { success: false, message: `Unknown card category.`, updatedStudent: student, remainingPoints: student.points };
  }

  // If the category handler bailed out (e.g. no enemy/question available),
  // refund the cost rather than charging for a no-op.
  if (!result.success) {
    return { ...result, updatedStudent: student, remainingPoints: student.points };
  }

  logUsage({
    studentId: student.studentId,
    cardId: card.id,
    category: card.category,
    costPaid: card.cost,
    remainingPoints: result.remainingPoints,
    result: result.message,
    timestamp: Date.now(),
  });

  return result;
}