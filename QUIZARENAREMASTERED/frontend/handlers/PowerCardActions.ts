import Redis from 'ioredis';
import { getCardById, LIVE_QUIZ_CARDS } from '../src/components/studentONLY/PowerCards/CardCatalog';
import type { PowerCardData } from '../src/components/studentONLY/PowerCards/types';

const COMPLETED_ROOM_TTL_SECONDS = 3600;

function channelKey(battleId: string): string {
  return `battle:${battleId}`;
}

function stateKey(battleId: string): string {
  return `battle:${battleId}:state`;
}

function leaderboardKey(battleId: string): string {
  return `battle:${battleId}:leaderboard`;
}

function questionsKey(battleId: string): string {
  return `battle:${battleId}:questions`;
}

function useKey(battleId: string, userId: string, questionIndex: number, cardId: string): string {
  return `battle:${battleId}:power-card:${userId}:${questionIndex}:${cardId}`;
}

export interface LivePowerCardAction {
  battleId: string;
  userId?: string;
  cardId?: string;
  targetId?: string;
  questionIndex?: number;
}

interface LivePowerCardResult {
  success: boolean;
  message: string;
  card?: PowerCardData;
  updatedPlayer?: Record<string, unknown>;
  leaderboard?: Record<string, unknown>[];
  removedChoiceIndices?: number[];
}

/**
 * Authoritative live-quiz power-card transaction. Keeping this outside the
 * quiz handler makes card validation, idempotency, and effect broadcasts
 * reusable without mixing them into answer or room lifecycle code.
 */
export async function applyLivePowerCard(
  action: LivePowerCardAction,
  redisPublisher: Redis
): Promise<LivePowerCardResult> {
  const { battleId, userId, cardId } = action;
  if (!userId || !cardId) return { success: false, message: 'A card and player are required.' };

  const card = getCardById(cardId) ?? LIVE_QUIZ_CARDS.find((candidate) => cardId.startsWith(`${candidate.id}-`));
  if (!card) return { success: false, message: 'That power card is not valid.' };
  if (!LIVE_QUIZ_CARDS.some((liveCard) => liveCard.id === card.id)) {
    return { success: false, message: 'That card is not available in live quiz mode.' };
  }
  if (card.effect.target !== 'self') {
    return { success: false, message: 'This card cannot be used in live quiz mode.' };
  }

  const roomState = await redisPublisher.hgetall(stateKey(battleId));
  const questionIndex = Number.isInteger(action.questionIndex)
    ? Number(action.questionIndex)
    : Number(roomState.currentIndex || 0);
  const rawPlayer = await redisPublisher.hget(leaderboardKey(battleId), userId);
  if (!rawPlayer) return { success: false, message: 'Your live score is not initialized yet.' };

  const idempotencyKey = useKey(battleId, userId, questionIndex, card.id);
  const claimed = await redisPublisher.set(idempotencyKey, '1', 'EX', COMPLETED_ROOM_TTL_SECONDS, 'NX');
  if (claimed !== 'OK') return { success: false, message: 'This card has already been used this round.' };

  const player = JSON.parse(rawPlayer) as Record<string, unknown>;
  const updatedPlayer = { ...player };
  const amount = Number(card.effect.amount ?? 0);
  let message = `${card.name} applied to the current question.`;
  let removedChoiceIndices: number[] | undefined;

  if (card.effect.category === 'points') {
    updatedPlayer.score = Number(player.score ?? 0) + amount;
    message = `${card.name} added ${amount} points to your score.`;
  } else if (card.effect.category === 'removeChoices') {
    const rawQuestions = await redisPublisher.get(questionsKey(battleId));
    const questions = rawQuestions ? JSON.parse(rawQuestions) as Array<Record<string, unknown>> : [];
    const question = questions[questionIndex];
    const options = Array.isArray(question?.options) ? question.options : [];
    const correctIndex = Number(question?.correct ?? -1);
    const incorrectIndices = options
      .map((_, index) => index)
      .filter((index) => index !== correctIndex);
    removedChoiceIndices = incorrectIndices.slice(0, card.effect.choicesToRemove ?? 1);
    message = `${card.name} removed ${removedChoiceIndices.length} incorrect choice(s).`;
  }

  await redisPublisher.hset(leaderboardKey(battleId), userId, JSON.stringify(updatedPlayer));
  await redisPublisher.expire(leaderboardKey(battleId), COMPLETED_ROOM_TTL_SECONDS);
  const rawLeaderboard = await redisPublisher.hgetall(leaderboardKey(battleId));
  const leaderboard = Object.values(rawLeaderboard).map((item) => JSON.parse(item) as Record<string, unknown>);

  await redisPublisher.publish(channelKey(battleId), JSON.stringify({
    type: 'POWER_CARD_APPLIED',
    battleId,
    userId,
    cardId: card.id,
    targetId: action.targetId,
    questionIndex,
    effect: card.effect,
    updatedPlayer,
    leaderboard,
    removedChoiceIndices,
    message,
  }));

  return { success: true, message, card, updatedPlayer, leaderboard, removedChoiceIndices };
}
