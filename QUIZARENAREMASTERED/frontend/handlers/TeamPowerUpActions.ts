import Redis from 'ioredis';
import { TEAM_MODE_CARDS } from '../src/components/studentONLY/PowerCards/CardCatalog';
import type { PowerCardData } from '../src/components/studentONLY/PowerCards/types';

const VOTE_WINDOW_MS = 10_000;
const COMPLETED_ROOM_TTL_SECONDS = 3600;

function teamsKey(battleId: string): string { return `battle:team:${battleId}:teams`; }
function votesKey(battleId: string, questionIndex: number, teamId: string): string {
  return `battle:team:${battleId}:power-votes:${questionIndex}:${teamId}`;
}
function resultKey(battleId: string, questionIndex: number, teamId: string): string {
  return `battle:team:${battleId}:power-result:${questionIndex}:${teamId}`;
}
function channelKey(battleId: string): string { return `battle:team:${battleId}`; }

const timers = new Map<string, NodeJS.Timeout>();

export interface TeamPowerUpVote {
  battleId: string;
  userId?: string;
  teamId?: string | null;
  cardId?: string;
  questionIndex?: number;
}

function canonicalCard(cardId: string): PowerCardData | undefined {
  return TEAM_MODE_CARDS.find((card) => card.id === cardId || cardId.startsWith(`${card.id}-`));
}

export async function submitTeamPowerUpVote(
  vote: TeamPowerUpVote,
  redisPublisher: Redis
): Promise<void> {
  const { battleId, userId } = vote;
  if (!userId) return;
  const assignments = await redisPublisher.hgetall(teamsKey(battleId));
  const teamId = String(vote.teamId ?? assignments[userId] ?? '');
  const card = vote.cardId ? canonicalCard(vote.cardId) : undefined;
  if (!teamId || (vote.cardId && !card)) return;

  const questionIndex = Number(vote.questionIndex ?? 0);
  if (await redisPublisher.exists(resultKey(battleId, questionIndex, teamId))) return;
  const key = votesKey(battleId, questionIndex, teamId);
  if (card) await redisPublisher.hset(key, userId, card.id);
  await redisPublisher.expire(key, COMPLETED_ROOM_TTL_SECONDS);

  const timerId = `${battleId}:${questionIndex}:${teamId}`;
  if (!timers.has(timerId)) {
    const deadline = Date.now() + VOTE_WINDOW_MS;
    await redisPublisher.set(`${key}:deadline`, String(deadline), 'EX', COMPLETED_ROOM_TTL_SECONDS);
    await redisPublisher.publish(channelKey(battleId), JSON.stringify({
      type: 'TEAM_POWERUP_STARTED', battleId, teamId, questionIndex, deadline,
    }));
    timers.set(timerId, setTimeout(() => {
      finalizeTeamPowerUpVote(battleId, questionIndex, teamId, redisPublisher, true).catch((error) =>
        console.error('[TEAM][POWERUP] vote finalization failed', error)
      );
    }, VOTE_WINDOW_MS));
  }

  const teamMemberCount = Object.values(assignments || {}).filter((value) => String(value) === teamId).length;
  const voteCount = await redisPublisher.hlen(key);
  if (teamMemberCount > 0 && voteCount >= teamMemberCount) {
    const timer = timers.get(timerId);
    if (timer) clearTimeout(timer);
    await finalizeTeamPowerUpVote(battleId, questionIndex, teamId, redisPublisher, true);
  }
}

export async function finishTeamPowerUpVote(
  vote: TeamPowerUpVote,
  redisPublisher: Redis
): Promise<void> {
  if (!vote.userId) return;
  const assignments = await redisPublisher.hgetall(teamsKey(vote.battleId));
  const teamId = String(vote.teamId ?? assignments[vote.userId] ?? '');
  if (!teamId) return;
  await finalizeTeamPowerUpVote(vote.battleId, Number(vote.questionIndex ?? 0), teamId, redisPublisher, true);
}

async function finalizeTeamPowerUpVote(
  battleId: string,
  questionIndex: number,
  teamId: string,
  redisPublisher: Redis,
  force: boolean
): Promise<void> {
  const timerId = `${battleId}:${questionIndex}:${teamId}`;
  timers.delete(timerId);
  const key = votesKey(battleId, questionIndex, teamId);
  if (await redisPublisher.exists(resultKey(battleId, questionIndex, teamId))) return;
  const votes = await redisPublisher.hgetall(key);
  const counts: Record<string, number> = {};
  Object.values(votes).forEach((cardId) => { counts[cardId] = (counts[cardId] || 0) + 1; });
  const winningCardId = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const card = winningCardId ? canonicalCard(winningCardId) : undefined;
  const assignments = await redisPublisher.hgetall(teamsKey(battleId));
  const teamMemberCount = Object.values(assignments || {}).filter((value) => String(value) === teamId).length;
  if (!force && teamMemberCount > 0 && Object.keys(votes).length < teamMemberCount) return;
  if (card) await redisPublisher.set(resultKey(battleId, questionIndex, teamId), card.id, 'EX', COMPLETED_ROOM_TTL_SECONDS);
  await redisPublisher.publish(channelKey(battleId), JSON.stringify({
    type: 'TEAM_POWERUP_RESULT',
    battleId,
    teamId,
    questionIndex,
    cardId: card?.id,
    card,
    voteCounts: counts,
  }));
}
