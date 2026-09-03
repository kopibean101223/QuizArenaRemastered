import { WebSocket } from 'ws';
import Redis from 'ioredis';
import { finalizeAndSaveBattle, PlayerResult } from '../src/lib/student/battle/battleSync';
import roomPresenceHandler from './RoomPresence';

const COMPLETED_ROOM_TTL_SECONDS = 3600;
const ACTIVE_ROOM_TTL_SECONDS = 4 * 60 * 60;
const DEFAULT_TIME_LIMIT_SECONDS = 30;

function roomChannel(battleId: string): string {
  return `battle:team:${battleId}`;
}
function stateKey(battleId: string): string {
  return `battle:team:${battleId}:state`;
}
function teamAnswersKey(battleId: string, questionIndex: number): string {
  return `battle:team:${battleId}:q:${questionIndex}:answers`;
}
function teamScopedAnswersKey(battleId: string, questionIndex: number, teamId: string): string {
  return `${teamAnswersKey(battleId, questionIndex)}:${teamId}`;
}
function leaderboardKey(battleId: string): string {
  return `battle:team:${battleId}:leaderboard`;
}
function teamsKey(battleId: string): string {
  return `battle:team:${battleId}:teams`;
}
function groupsKey(battleId: string): string {
  return `battle:team:${battleId}:groups`;
}
function questionsKey(battleId: string): string {
  return `battle:team:${battleId}:questions`;
}
function teamSizeKey(battleId: string): string {
  return `battle:team:${battleId}:teamSize`;
}

export interface TeamMemberAnswerPayload {
  memberId: string;
  memberName: string;
  selectedOption: string;
  submittedAt: number;
}

export interface TeamBattlePayload {
  type: string;
  battleId: string;
  roomCode?: string;
  questionIndex?: number;
  answer?: TeamMemberAnswerPayload;
  isLastQuestion?: boolean;
  userId?: string;
  teamId?: number | string | null;
  questions?: unknown[];
  forceReset?: boolean;
  groups?: string[];
  teamSize?: number;
  // NEW: team-only free-text chat (see TEAM_CHAT_MESSAGE below).
  sender?: string;
  message?: string;
}

class TeamBattleHandler {
  private activeRooms: Map<string, Set<WebSocket>>;
  private clientRoomMap: Map<WebSocket, string>;
  // NEW: one authoritative advance-timer per battleId, held in the server
  // process. This is what makes the timer/question-index "real" instead of
  // each client silently deciding on its own when to move on.
  private questionTimers: Map<string, NodeJS.Timeout>;
  private advancingBattles: Set<string>;
  // NEW: remembers which team each connected socket belongs to, so
  // TEAM_CHAT_MESSAGE can be fanned out to teammates only instead of the
  // whole room. Populated on JOIN_TEAM_BATTLE and kept in sync by
  // TEAM_ASSIGNMENT_UPDATE.
  private clientTeamMap: Map<WebSocket, string>;
  private clientDetails: Map<WebSocket, { id: string; name: string }>;

  constructor() {
    this.activeRooms = new Map<string, Set<WebSocket>>();
    this.clientRoomMap = new Map<WebSocket, string>();
    this.questionTimers = new Map<string, NodeJS.Timeout>();
    this.advancingBattles = new Set<string>();
    this.clientTeamMap = new Map<WebSocket, string>();
    this.clientDetails = new Map<WebSocket, { id: string; name: string }>();
  }

  public initSubscriber(redisSubscriber: Redis): void {
    redisSubscriber.on('message', (channel: string, message: string) => {
      if (!channel.startsWith('battle:team:')) return;
      const battleId = channel.replace('battle:team:', '');
      const clientsInRoom = this.activeRooms.get(battleId);
      console.log('[TEAM][server] redis message on', channel, '-> forwarding to', clientsInRoom?.size ?? 0, 'clients');

      if (!clientsInRoom) return;

      // NEW: TEAM_CHAT_MESSAGE only reaches sockets on the same team as the
      // sender — every other broadcast type still goes to the whole room,
      // exactly as before.
      let restrictToTeamId: string | null = null;
      try {
        const parsed = JSON.parse(message);
          if (parsed.type === 'TEAM_CHAT_MESSAGE' || parsed.type === 'TEAM_ANSWERS_UPDATED' || parsed.type === 'TEAM_POWERUP_RESULT') {
          restrictToTeamId = parsed.teamId ?? null;
        }
      } catch {
        // not JSON we need to inspect — fall through and broadcast as-is
      }

      clientsInRoom.forEach((client) => {
        if (client.readyState !== WebSocket.OPEN) return;
        if (restrictToTeamId !== null && this.clientTeamMap.get(client) !== restrictToTeamId) return;
        client.send(message);
      });
    });
  }

  private registerClient(
    ws: WebSocket,
    battleId: string,
    channel: string,
    redisSubscriber: Redis
  ): void {
    if (!this.activeRooms.has(battleId)) {
      this.activeRooms.set(battleId, new Set<WebSocket>());
      console.log('[TEAM][server] first client — subscribing redis channel', channel);
      redisSubscriber.subscribe(channel, (err) => {
        if (err) console.error(`Failed to subscribe to ${channel}`, err);
        else console.log('[TEAM][server] subscribe confirmed for', channel);
      });
    }

    this.activeRooms.get(battleId)!.add(ws);
    this.clientRoomMap.set(ws, battleId);
    console.log('[TEAM][server] registered client. room size now:', this.activeRooms.get(battleId)!.size);
  }

  private rememberClient(ws: WebSocket, userId?: string, sender?: string): void {
    if (!userId) return;
    this.clientDetails.set(ws, { id: userId, name: sender || userId });
  }

  private getLobbyPlayers(battleId: string): Array<{ id: string; name: string; teamId: string | null }> {
    const clients = this.activeRooms.get(battleId) ?? new Set<WebSocket>();
    return Array.from(clients)
      .map((client) => this.clientDetails.get(client))
      .filter((player): player is { id: string; name: string } => Boolean(player))
      .map((player) => ({
        ...player,
        teamId: null,
      }));
  }

  private async getLobbyRoster(
    battleId: string,
    redisPublisher: Redis
  ): Promise<Array<{ id: string; name: string; teamId: string | null }>> {
    const assignments = await redisPublisher.hgetall(teamsKey(battleId));
    return this.getLobbyPlayers(battleId).map((player) => ({
      ...player,
      teamId: assignments[player.id] || null,
    }));
  }

  // ── Timer bookkeeping ────────────────────────────────────────────────
  // NEW: cancels any in-flight auto-advance timer for a battle. Must be
  // called before scheduling a new one (double timers were part of why
  // question index could jump around independently on different runs).
  private clearQuestionTimer(battleId: string): void {
    const existing = this.questionTimers.get(battleId);
    if (existing) {
      clearTimeout(existing);
      this.questionTimers.delete(battleId);
      console.log(`[TEAM][TIMER] cleared existing timer for ${battleId}`);
    }
  }

  private scheduleQuestionTimeout(
    battleId: string,
    delayMs: number,
    redisPublisher: Redis,
    roomCode?: string
  ): void {
    this.clearQuestionTimer(battleId);
    console.log(`[TEAM][TIMER] scheduling auto-advance for ${battleId} in ${delayMs}ms`);
    const handle = setTimeout(() => {
      console.log(`[TEAM][TIMER] timer FIRED for ${battleId}`);
      this.triggerAdvance(battleId, redisPublisher, roomCode, 'timeout').catch((err) =>
        console.error(`[TEAM][TIMER] advanceOrEnd failed for ${battleId}:`, err)
      );
    }, delayMs);
    this.questionTimers.set(battleId, handle);
  }

  private async triggerAdvance(
    battleId: string,
    redisPublisher: Redis,
    roomCode: string | undefined,
    reason: 'timeout' | 'manual' | 'all-answered'
  ): Promise<void> {
    if (this.advancingBattles.has(battleId)) return;
    this.advancingBattles.add(battleId);
    try {
      await this.advanceOrEnd(battleId, redisPublisher, roomCode, reason);
    } finally {
      this.advancingBattles.delete(battleId);
    }
  }

  // NEW: the single source of truth for moving every client in the room to
  // the next question (or ending the battle). Previously each student's
  // browser called setTimeout(...) locally and flipped its OWN questionIndex
  // — nothing told the server, nothing told teammates, so everyone drifted
  // out of sync the moment one player answered faster than another.
  private async advanceOrEnd(
    battleId: string,
    redisPublisher: Redis,
    roomCode: string | undefined,
    reason: 'timeout' | 'manual' | 'all-answered'
  ): Promise<void> {
    console.log(`[TEAM][ADVANCE] triggered for ${battleId} reason=${reason}`);
    this.clearQuestionTimer(battleId);

    const sKey = stateKey(battleId);
    const qKey = questionsKey(battleId);
    const lKey = leaderboardKey(battleId);
    const channel = roomChannel(battleId);

    const [rawQuestions, roomState] = await Promise.all([
      redisPublisher.get(qKey),
      redisPublisher.hgetall(sKey),
    ]);
    const questions = rawQuestions ? JSON.parse(rawQuestions) : [];
    const currentIndex = parseInt(roomState.questionIndex || '0', 10);
    const nextIndex = currentIndex + 1;

    console.log(
      `[TEAM][ADVANCE] ${battleId} currentIndex=${currentIndex} nextIndex=${nextIndex} totalQuestions=${questions.length}`
    );

    if (nextIndex >= questions.length) {
      await redisPublisher.hset(sKey, { status: 'completed' });
      await redisPublisher.expire(sKey, COMPLETED_ROOM_TTL_SECONDS);

      await this.syncBattleToSupabase(redisPublisher, battleId, roomCode);

      const rawScores = await redisPublisher.hgetall(lKey);
      const leaderboard = Object.values(rawScores || {}).map((item) => JSON.parse(item));

      console.log(`[TEAM][END] ${battleId} out of questions -> TEAM_BATTLE_COMPLETED`);
      await redisPublisher.publish(
        channel,
        JSON.stringify({ type: 'TEAM_BATTLE_COMPLETED', battleId, leaderboard })
      );
      return;
    }

    const startedAt = Date.now();
    const timeLimit = Number(questions[nextIndex]?.timeLimit) || DEFAULT_TIME_LIMIT_SECONDS;

    await redisPublisher.hset(sKey, {
      questionIndex: String(nextIndex),
      startedAt: String(startedAt),
      timeLimit: String(timeLimit),
    });
    await redisPublisher.expire(sKey, ACTIVE_ROOM_TTL_SECONDS);

    // fresh answer bucket for the new question
    await redisPublisher.del(teamAnswersKey(battleId, currentIndex));

    console.log(
      `[TEAM][ADVANCE] ${battleId} -> question ${nextIndex}, timeLimit=${timeLimit}s, broadcasting TEAM_QUESTION_ADVANCED`
    );

    await redisPublisher.publish(
      channel,
      JSON.stringify({
        type: 'TEAM_QUESTION_ADVANCED',
        battleId,
        questionIndex: nextIndex,
        startedAt,
        timeLimit,
        teamAnswers: [],
      })
    );

    this.scheduleQuestionTimeout(battleId, timeLimit * 1000, redisPublisher, roomCode);
  }

  public async syncBattleToSupabase(
    redisPublisher: Redis,
    battleId: string,
    roomCode?: string
  ): Promise<void> {
    try {
      const lKey = leaderboardKey(battleId);
      const sKey = stateKey(battleId);

      const rawScores = await redisPublisher.hgetall(lKey);
      const roomState = await redisPublisher.hgetall(sKey);

      const players: PlayerResult[] = Object.values(rawScores || {}).map((item) => {
        const parsed = JSON.parse(item);
        return {
          userId: parsed.id || parsed.userId,
          score: parsed.score || 0,
          correctAnswers: parsed.correctAnswers || 0,
          totalQuestions: parsed.totalQuestions || 0,
          accuracy: parsed.accuracy || 0,
        };
      });

      await finalizeAndSaveBattle({
        battleId,
        roomCode: roomCode || roomState.roomCode || 'TEAM_ROOM',
        battleMode: 'TEAM',
        players,
      });

      console.log(`[TeamBattle] Saved battle ${battleId} results to Supabase (${players.length} players)`);
    } catch (err) {
      console.error(`[TeamBattle] Failed to sync battle ${battleId} to Supabase:`, err);
    }
  }

  public async handleMessage(
    ws: WebSocket,
    payload: TeamBattlePayload,
    redisPublisher: Redis,
    redisSubscriber: Redis
  ): Promise<void> {
    const { type, battleId, roomCode, answer, userId, teamId, message } = payload;
    console.log(`[TEAM][server] handleMessage type=${type} battleId=${battleId}`);

    if (!battleId) {
      ws.send(JSON.stringify({ error: 'battleId is required for Team operations' }));
      return;
    }

    const channel = roomChannel(battleId);
    const sKey = stateKey(battleId);
    const lKey = leaderboardKey(battleId);
    const tKey = teamsKey(battleId);
    const qKey = questionsKey(battleId);
    const gKey = groupsKey(battleId);
    const szKey = teamSizeKey(battleId);

    // ── JOIN TEAM LOBBY ──
    if (type === 'JOIN_TEAM_LOBBY') {
      roomPresenceHandler.setBattleMode(battleId, 'TEAM');
      this.registerClient(ws, battleId, channel, redisSubscriber);
      this.rememberClient(ws, userId, payload.sender);

      const rawTeams = await redisPublisher.hgetall(tKey);
      const rawGroups = await redisPublisher.get(gKey);
      const groups = rawGroups ? JSON.parse(rawGroups) : ['Team 1', 'Team 2'];
      const rawTeamSize = await redisPublisher.get(szKey);
      const teamSize = rawTeamSize ? parseInt(rawTeamSize, 10) : 4;
      const players = await this.getLobbyRoster(battleId, redisPublisher);

      ws.send(
        JSON.stringify({
          type: 'TEAM_LOBBY_STATE_SYNC',
          battleId,
          teams: rawTeams,
          players,
          groups,
          teamSize,
        })
      );

      await redisPublisher.publish(
        channel,
        JSON.stringify({
          type: 'TEAM_LOBBY_STATE_SYNC',
          battleId,
          teams: rawTeams,
          players,
          groups,
          teamSize,
        })
      );
      return;
    }

    // ── TEAM ASSIGNMENT UPDATE ──
    if (type === 'TEAM_ASSIGNMENT_UPDATE') {
      console.log('[TEAM][server] received TEAM_ASSIGNMENT_UPDATE', { battleId, userId, teamId });
      this.registerClient(ws, battleId, channel, redisSubscriber);
      this.rememberClient(ws, userId, payload.sender);

      if (!userId) return;

      if (teamId === null || teamId === undefined) {
        await redisPublisher.hdel(tKey, userId);
        // NEW: keep this socket's remembered team (used for chat scoping) in sync
        this.clientTeamMap.delete(ws);
      } else {
        await redisPublisher.hset(tKey, userId, String(teamId));
        // NEW: keep this socket's remembered team (used for chat scoping) in sync
        this.clientTeamMap.set(ws, String(teamId));
      }
      await redisPublisher.expire(tKey, COMPLETED_ROOM_TTL_SECONDS);

      await redisPublisher.publish(
        channel,
        JSON.stringify({
          type: 'TEAM_ASSIGNMENT_UPDATE',
          battleId,
          userId,
          teamId: teamId ?? null,
          players: await this.getLobbyRoster(battleId, redisPublisher),
        })
      );
      await redisPublisher.publish(
        `battle:${battleId}`,
        JSON.stringify({
          type: 'TEAM_ASSIGNMENT_UPDATE',
          battleId,
          userId,
          teamId: teamId ?? null,
          players: await this.getLobbyRoster(battleId, redisPublisher),
        })
      );
      await redisPublisher.publish(
        channel,
        JSON.stringify({
          type: 'TEAM_ROSTER_UPDATED',
          battleId,
          players: await this.getLobbyRoster(battleId, redisPublisher),
        })
      );
      return;
    }

    // ── JOIN TEAM BATTLE ──
    // FIX: previously trusted whatever questionIndex the client happened to
    // have locally (and even reconnected the socket every time that local
    // index changed). Now the server's own state (sKey) is the only source
    // of truth for where in the question set this room currently is.
    if (type === 'JOIN_TEAM_BATTLE') {
      this.registerClient(ws, battleId, channel, redisSubscriber);
      this.rememberClient(ws, userId, payload.sender);

      // NEW: remember this socket's team for TEAM_CHAT_MESSAGE scoping.
      // The battle socket is a fresh connection from the lobby socket that
      // originally recorded the pick, so fall back to the Redis record
      // (set by TEAM_ASSIGNMENT_UPDATE in the lobby) when the join payload
      // itself doesn't carry a teamId.
      if (teamId !== null && teamId !== undefined) {
        this.clientTeamMap.set(ws, String(teamId));
      } else if (userId) {
        const storedTeamId = await redisPublisher.hget(tKey, userId);
        if (storedTeamId) this.clientTeamMap.set(ws, storedTeamId);
      }

      const roomState = await redisPublisher.hgetall(sKey);
      const serverQuestionIndex = parseInt(roomState.questionIndex || '0', 10);
      const startedAt = parseInt(roomState.startedAt || String(Date.now()), 10);
      const timeLimit = parseInt(roomState.timeLimit || String(DEFAULT_TIME_LIMIT_SECONDS), 10);

      const ansKey = teamAnswersKey(battleId, serverQuestionIndex);
      const rawAnswers = await redisPublisher.hgetall(ansKey);
      const assignedTeam = userId ? await redisPublisher.hget(tKey, userId) : null;
      const scopedAnsKey = assignedTeam ? teamScopedAnswersKey(battleId, serverQuestionIndex, assignedTeam) : '';
      const rawScopedAnswers = scopedAnsKey ? await redisPublisher.hgetall(scopedAnsKey) : rawAnswers;
      const teamAnswers = Object.values(rawScopedAnswers || {}).map((item) => JSON.parse(item));

      const rawQuestions = await redisPublisher.get(qKey);
      const questions = rawQuestions ? JSON.parse(rawQuestions) : [];

      console.log(
        `[TEAM][JOIN] ${battleId} client joined at server questionIndex=${serverQuestionIndex}, timeLimit=${timeLimit}s`
      );

      ws.send(
        JSON.stringify({
          type: 'TEAM_STATE_SYNC',
          battleId,
          questionIndex: serverQuestionIndex,
          startedAt,
          timeLimit,
          teamAnswers,
          questions,
        })
      );
      return;
    }

    if (type === 'PROF_UPDATE_GROUPS') {
      this.registerClient(ws, battleId, channel, redisSubscriber);

      if (Array.isArray(payload.groups)) {
        await redisPublisher.set(gKey, JSON.stringify(payload.groups));
        await redisPublisher.expire(gKey, COMPLETED_ROOM_TTL_SECONDS);
      }

      if (typeof payload.teamSize === 'number' && payload.teamSize > 0) {
        await redisPublisher.set(szKey, String(payload.teamSize));
        await redisPublisher.expire(szKey, COMPLETED_ROOM_TTL_SECONDS);
      }

      const rawGroups = await redisPublisher.get(gKey);
      const groups = rawGroups ? JSON.parse(rawGroups) : ['Team 1', 'Team 2'];
      const rawTeamSize = await redisPublisher.get(szKey);
      const teamSize = rawTeamSize ? parseInt(rawTeamSize, 10) : 4;

      await redisPublisher.publish(
        channel,
        JSON.stringify({
          type: 'TEAM_GROUPS_UPDATED',
          battleId,
          groups,
          teamSize,
        })
      );
      return;
    }

    // ── PROFESSOR STARTS THE TEAM BATTLE ──
    // FIX: now seeds questionIndex/startedAt/timeLimit in Redis (sKey) and
    // schedules the first auto-advance timer, exactly like LiveBattle does
    // for PROF_START_BATTLE. This is what the timer UI needs to exist at all.
    if (type === 'PROF_START_TEAM') {
      this.registerClient(ws, battleId, channel, redisSubscriber);

      if (payload.forceReset) {
        // clear out any answers from a previous run before we touch qIndex 0
        const rawQuestionsBefore = await redisPublisher.get(qKey);
        const questionsBefore = rawQuestionsBefore ? JSON.parse(rawQuestionsBefore) : [];
        await Promise.all(
          questionsBefore.map((_: unknown, i: number) => redisPublisher.del(teamAnswersKey(battleId, i)))
        );
        await redisPublisher.del(lKey);
      }

      if (payload.questions && Array.isArray(payload.questions)) {
        await redisPublisher.set(qKey, JSON.stringify(payload.questions));
      }

      const rawQuestions = await redisPublisher.get(qKey);
      const questions = rawQuestions ? JSON.parse(rawQuestions) : [];
      const startedAt = Date.now();
      const timeLimit = Number(questions[0]?.timeLimit) || DEFAULT_TIME_LIMIT_SECONDS;

      await redisPublisher.hset(sKey, {
        status: 'active',
        roomCode: roomCode || '',
        questionIndex: '0',
        startedAt: String(startedAt),
        timeLimit: String(timeLimit),
      });
      await redisPublisher.expire(sKey, ACTIVE_ROOM_TTL_SECONDS);

      console.log(
        `[TEAM][START] ${battleId} starting with ${questions.length} questions, first timeLimit=${timeLimit}s`
      );

      await redisPublisher.publish(
        channel,
        JSON.stringify({
          type: 'TEAM_STATE_SYNC',
          battleId,
          questionIndex: 0,
          startedAt,
          timeLimit,
          teamAnswers: [],
          questions,
        })
      );

      // also reach clients still sitting on the pre-battle lobby channel
      await redisPublisher.publish(
        `battle:${battleId}`,
        JSON.stringify({
          type: 'TEAM_STATE_SYNC',
          battleId,
          questionIndex: 0,
          startedAt,
          timeLimit,
          questions,
        })
      );

      this.scheduleQuestionTimeout(battleId, timeLimit * 1000, redisPublisher, roomCode);

      console.log(`[TeamBattle] Professor started Team Battle Room ${battleId} with ${questions.length} questions.`);
      return;
    }

    // ── SUBMIT MEMBER ANSWER & BROADCAST ALL TEAM ANSWERS ──
    // NOTE: submitting no longer moves the question forward by itself — it
    // only records the vote. Once every assigned player has answered, the
    // server advances immediately; otherwise the scheduled timer remains the
    // source of truth for the round boundary.
    if (type === 'SUBMIT_TEAM_MEMBER_ANSWER') {
      if (!answer || !answer.memberId) return;

      const roomState = await redisPublisher.hgetall(sKey);
      const serverQuestionIndex = parseInt(roomState.questionIndex || '0', 10);
      const ansKey = teamAnswersKey(battleId, serverQuestionIndex);
      const assignedTeam = userId ? await redisPublisher.hget(tKey, userId) : null;
      if (!assignedTeam || answer.memberId !== userId) return;
      const scopedAnsKey = teamScopedAnswersKey(battleId, serverQuestionIndex, assignedTeam);

      console.log(
        `[TEAM][ANSWER] ${battleId} member=${answer.memberId} option=${answer.selectedOption} at serverQuestionIndex=${serverQuestionIndex}`
      );

      await redisPublisher.hset(ansKey, answer.memberId, JSON.stringify(answer));
      await redisPublisher.hset(scopedAnsKey, answer.memberId, JSON.stringify(answer));
      await redisPublisher.expire(ansKey, COMPLETED_ROOM_TTL_SECONDS);

      const rawAnswers = await redisPublisher.hgetall(ansKey);
      const teamAnswers: TeamMemberAnswerPayload[] = Object.values(rawAnswers).map((item) => JSON.parse(item));
      const rawScopedAnswers = await redisPublisher.hgetall(scopedAnsKey);
      const scopedTeamAnswers: TeamMemberAnswerPayload[] = Object.values(rawScopedAnswers).map((item) => JSON.parse(item));

      const voteCounts: Record<string, number> = {};
      let leaderVote = '';

      scopedTeamAnswers.forEach((ans) => {
        voteCounts[ans.selectedOption] = (voteCounts[ans.selectedOption] || 0) + 1;
        if ((ans as any).isDesignatedLeader) leaderVote = ans.selectedOption;
      });

      let maxVotes = 0;
      let winningOption = '';
      let isTie = false;

      Object.entries(voteCounts).forEach(([option, count]) => {
        if (count > maxVotes) {
          maxVotes = count;
          winningOption = option;
          isTie = false;
        } else if (count === maxVotes) {
          isTie = true;
        }
      });

      if (isTie && leaderVote) {
        winningOption = leaderVote;
      }

      const assignedPlayers = await redisPublisher.hgetall(tKey);
      const assignedPlayerCount = Object.keys(assignedPlayers || {}).length;
      const teamMemberCount = Object.values(assignedPlayers || {}).filter((value) => String(value) === String(assignedTeam)).length;

      await redisPublisher.publish(
        channel,
        JSON.stringify({
          type: 'TEAM_ANSWERS_UPDATED',
          battleId,
          questionIndex: serverQuestionIndex,
          teamAnswers: scopedTeamAnswers,
          teamId: assignedTeam,
          teamMemberCount,
          isComplete: scopedTeamAnswers.length >= teamMemberCount,
          currentWinningOption: winningOption,
          isTieResolvedByLeader: isTie,
        })
      );

      if (assignedPlayerCount > 0 && teamAnswers.length >= assignedPlayerCount) {
        await this.triggerAdvance(battleId, redisPublisher, roomCode, 'all-answered');
      }
      return;
    }

    // ── MANUAL ADVANCE (professor override) ──
    if (type === 'ADVANCE_QUESTION') {
      console.log(`[TEAM][server] manual ADVANCE_QUESTION received for ${battleId}`);
      await this.triggerAdvance(battleId, redisPublisher, roomCode, 'manual');
      return;
    }

    // ── END BATTLE ──
    if (type === 'END_TEAM_BATTLE') {
      this.clearQuestionTimer(battleId);
      await redisPublisher.hset(sKey, { status: 'completed' });
      await redisPublisher.expire(sKey, COMPLETED_ROOM_TTL_SECONDS);

      await this.syncBattleToSupabase(redisPublisher, battleId, roomCode);

      const rawScores = await redisPublisher.hgetall(lKey);
      const leaderboard = Object.values(rawScores || {}).map((item) => JSON.parse(item));

      console.log(`[TEAM][END] ${battleId} manually ended -> TEAM_BATTLE_COMPLETED`);

      await redisPublisher.publish(
        channel,
        JSON.stringify({
          type: 'TEAM_BATTLE_COMPLETED',
          battleId,
          leaderboard,
        })
      );
      return;
    }
    // ── TEAM CHAT (free text, only visible to this player's own team) ──
    if (type === 'TEAM_CHAT_MESSAGE') {
      if (!message) return;

      let senderTeamId = this.clientTeamMap.get(ws) || (teamId != null ? String(teamId) : null);

      if (!senderTeamId && userId) {
        const storedTeamId = await redisPublisher.hget(tKey, userId);
        if (storedTeamId) {
          senderTeamId = String(storedTeamId);
          this.clientTeamMap.set(ws, senderTeamId);
        }
      }

      if (!senderTeamId) {
        console.warn('[TEAM][CHAT] dropped message — sender has no known teamId', { battleId, userId });
        return;
      }

      console.log(`[TEAM][CHAT] ${battleId} team=${senderTeamId} ${payload.sender || 'Anonymous'}: ${message}`);

      await redisPublisher.publish(
        channel,
        JSON.stringify({
          type: 'TEAM_CHAT_MESSAGE',
          battleId,
          teamId: senderTeamId,
          sender: payload.sender || 'Anonymous',
          userId: userId || null,
          message,
          timestamp: new Date().toISOString(),
        })
      );
      return;
    }
  }

  public handleLeave(ws: WebSocket, redisSubscriber: Redis): void {
    const battleId = this.clientRoomMap.get(ws);
    if (!battleId) return;

    const roomClients = this.activeRooms.get(battleId);
    if (roomClients) {
      roomClients.delete(ws);
      if (roomClients.size === 0) {
        this.activeRooms.delete(battleId);
        this.clearQuestionTimer(battleId);
        redisSubscriber.unsubscribe(roomChannel(battleId));
      }
    }
    this.clientRoomMap.delete(ws);
    // NEW: drop the chat-team bookkeeping for this socket along with everything else.
    this.clientTeamMap.delete(ws);
    this.clientDetails.delete(ws);
  }
}

export default new TeamBattleHandler();