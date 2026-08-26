'use client';

/**
 * ONE socket for the whole lobby -> battle flow.
 *
 * Replaces the two independent connections that used to exist:
 *   - useLobbySocket   (roster / countdown / battleStarted)      <- Lobby_LiveQuiz
 *   - useBattleSocket  (questions / scoring / chat)               <- LiveBattle
 *
 * Both hooks opened their own WebSocket. Because Lobby_LiveQuiz never
 * actually unmounts when battleStarted flips true (it just conditionally
 * returns <LiveBattle/> instead of its own JSX), its socket kept running
 * for the entire battle in parallel with LiveBattle's socket — two live
 * connections at once, each independently reconnecting on drop.
 *
 * This provider owns a single WebSocket for the lifetime of whatever
 * component tree wraps it (intended mount point: StudentDashboard, around
 * the `hasJoined` branch — see StudentDashboard.tsx). It connects once per
 * (sessionId, userId) and stays open across the lobby -> battle transition.
 * It closes naturally when the wrapping component unmounts — e.g. when
 * navigate("results") swaps StudentDashboard out of the router entirely,
 * which is the correct place for it to end, since BattleResults reads
 * already-persisted data and doesn't need a live connection.
 *
 * `mode` controls which extra join message goes out alongside the base
 * JOIN_BATTLE handshake:
 *   - LIVE:   nothing extra. LiveBattleHandler replies to JOIN_BATTLE
 *             itself (server.ts lets JOIN_BATTLE fall through to it after
 *             RoomPresenceHandler registers the client).
 *   - TEAM:   JOIN_TEAM_LOBBY (registers with TeamBattleHandler, syncs
 *             groups/teamAssignments) + JOIN_TEAM_BATTLE (registers for
 *             TEAM_STATE_SYNC — questions/questionIndex/teamAnswers; safe
 *             to send even before the professor starts, server returns
 *             defaults).
 *   - ROYALE: JOIN_ROYALE — one message covers both lobby and battle sync
 *             for Royale.
 * Team and Royale each own a separate Redis channel (`battle:team:{id}` /
 * `battle:royale:{id}`) that JOIN_BATTLE never touches — RoomPresenceHandler
 * only registers the base `battle:{id}` room — so these extra sends are
 * required, not optional.
 */

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import { AVATAR_COLORS, LobbyPlayerT } from '@/components/studentONLY/ComponentsLobby/LobbyConstants';
import {
  formatBattleQuestions,
  computeTimeLeft,
  type BattleQuestion,
} from '@/lib/student/battle/useBattleConnection';

// Leaderboard entry shape used during the battle (score/streak/isMe).
// Kept distinct from LobbyPlayerT (the lobby roster) — they represent
// different things and are populated by different message types.
export interface LeaderboardPlayer {
  id: string;
  name: string;
  initials: string;
  color: string;
  score: number;
  streak: number;
  isMe: boolean;
  isLeader: boolean;
}

export interface BattleChatMessage {
  id: string;
  sender: string;
  text: string;
  isMe: boolean;
}

interface BattleSocketValue {
  // Connection
  status: 'connecting' | 'open' | 'closed';
  send: (payload: object) => boolean;

  // Lobby-phase state
  players: LobbyPlayerT[];
  countdown: number | null;
  battleStarted: boolean;
  battleMode: string;

  // Battle-phase state
  questions: BattleQuestion[];
  currentIndex: number;
  startedAt: number | null;
  leaderboard: LeaderboardPlayer[];
  chatMessages: BattleChatMessage[];

  // Escape hatches for screen-specific state that the provider doesn't
  // need to know the meaning of, but callers may want to react to.
  lastMessage: any;
}

const BattleSocketContext = createContext<BattleSocketValue | null>(null);

export interface BattleSocketProviderProps {
  sessionId: string;
  userId?: string;
  userName?: string;
  /**
   * Which mode-specific join message to send alongside the base
   * JOIN_BATTLE handshake. Defaults to 'LIVE' (no extra message).
   */
  mode?: 'LIVE' | 'TEAM' | 'ROYALE' | 'CHAOS_CLASH' | 'BINGO';
  /**
   * Extra fields merged into the mode-specific join payload — e.g. Team's
   * { teamId } on reconnect. Optional: the server already falls back to
   * its own Redis record (keyed by userId) when this is omitted.
   */
  extraJoinPayload?: Record<string, unknown>;
  children: ReactNode;
}

export function BattleSocketProvider({
  sessionId,
  userId,
  userName,
  mode = 'LIVE',
  extraJoinPayload,
  children,
}: BattleSocketProviderProps) {
  const socketRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<'connecting' | 'open' | 'closed'>('connecting');

  // Lobby-phase state (moved from useLobbySocket)
  const [players, setPlayers] = useState<LobbyPlayerT[]>([]);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [battleStarted, setBattleStarted] = useState(false);
  const [battleMode, setBattleMode] = useState('LIVE');

  // Battle-phase state (moved from useBattleSocket + LiveBattle's onMessage)
  const [questions, setQuestions] = useState<BattleQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardPlayer[]>([]);
  const [chatMessages, setChatMessages] = useState<BattleChatMessage[]>([]);
  const [lastMessage, setLastMessage] = useState<any>(null);

  useEffect(() => {
    if (!sessionId) return;
    let cancelled = false;

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080';
    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;
    setStatus('connecting');

    const resolvedName = userName || 'Unknown Student';
    const resolvedUserId = userId || `user_${Math.random()}`;

    socket.onopen = () => {
      if (cancelled) {
        // Strict Mode's dev-only double-invoke tore this mount down before
        // the handshake finished — close cleanly instead of mid-connect.
        socket.close();
        return;
      }

      setStatus('open');

      // Single JOIN_BATTLE handshake for the whole session. This registers
      // the client with RoomPresenceHandler (roster/chat/host-disconnect
      // grace period) for every mode, regardless of what else gets sent
      // below.
      socket.send(JSON.stringify({
        type: 'JOIN_BATTLE',
        battleId: sessionId,
        userId: resolvedUserId,
        sender: resolvedName,
      }));

      // Mode-specific join, in addition to the base JOIN_BATTLE above.
      if (mode === 'TEAM') {
        socket.send(JSON.stringify({
          type: 'JOIN_TEAM_LOBBY',
          mode: 'TEAM',
          battleId: sessionId,
          ...extraJoinPayload,
        }));
        socket.send(JSON.stringify({
          type: 'JOIN_TEAM_BATTLE',
          mode: 'TEAM',
          battleId: sessionId,
          userId: resolvedUserId,
          ...extraJoinPayload,
        }));
      } else if (mode === 'ROYALE' || mode === 'CHAOS_CLASH') {
        socket.send(JSON.stringify({
          type: 'JOIN_ROYALE',
          mode: 'ROYALE',
          battleId: sessionId,
          playerData: {
            id: resolvedUserId,
            name: resolvedName,
            initials: resolvedName.substring(0, 2).toUpperCase(),
            color: AVATAR_COLORS[0],
          },
          ...extraJoinPayload,
        }));
      } else if (mode === 'BINGO') {
        socket.send(JSON.stringify({
          type: 'JOIN_BINGO',
          mode: 'BINGO',
          battleId: sessionId,
          playerData: {
            id: resolvedUserId,
            name: resolvedName,
            initials: resolvedName.substring(0, 2).toUpperCase(),
            color: AVATAR_COLORS[0],
          },
          ...extraJoinPayload,
        }));
      }

      setPlayers((prev) => {
        if (prev.some((p) => p.id === resolvedUserId)) return prev;
        return [
          ...prev,
          {
            id: resolvedUserId,
            name: resolvedName,
            initials: resolvedName.substring(0, 2).toUpperCase(),
            color: AVATAR_COLORS[prev.length % AVATAR_COLORS.length],
            isHost: false,
            isReady: true,
          },
        ];
      });

      setTimeout(() => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({
            type: 'BATTLE_ACTION',
            battleId: sessionId,
            userId: resolvedUserId,
            sender: resolvedName,
            message: 'has joined the lobby! ✅',
            isJoinEvent: true,
          }));
        }
      }, 150);
    };

    socket.onmessage = (event) => {
      let data: any;
      try {
        data = JSON.parse(event.data);
      } catch (err) {
        console.error('[BattleSocketProvider] Failed to parse WS message:', err);
        return;
      }
      setLastMessage(data);

      // ---- Lobby-phase routing (from useLobbySocket) ----

      if (
        data.type === 'PROF_START_BATTLE' ||
        data.type === 'BATTLE_STARTED' ||
        data.type === 'START_BATTLE'
      ) {
        const m = (data.mode || data.battleMode || 'LIVE').toUpperCase();
        setBattleMode(m);
        setCountdown((prev) => (prev === null ? 3 : prev));
      }

      if (
        (data.type === 'ROYALE_STATE_SYNC' && data.status === 'active') ||
        (data.type === 'TEAM_STATE_SYNC' && Array.isArray(data.questions) && data.questions.length > 0)
      ) {
        const m = data.type === 'ROYALE_STATE_SYNC' ? 'ROYALE' : 'TEAM';
        setBattleMode(m);
        setCountdown((prev) => (prev === null ? 3 : prev));
      }

      if (data.type === 'BINGO_STATE_SYNC') {
        if (Array.isArray(data.players)) {
          setPlayers(data.players
            .filter((player: any) => player.id !== 'professor' && !player.isHost)
            .map((player: any, index: number) => ({
              id: player.id,
              name: player.name || player.id,
              initials: player.initials || String(player.name || player.id).substring(0, 2).toUpperCase(),
              color: player.color || AVATAR_COLORS[index % AVATAR_COLORS.length],
              isHost: false,
              isReady: true,
            })));
        }
        if (data.status === 'active') {
          setBattleMode('BINGO');
          setCountdown((prev) => (prev === null ? 3 : prev));
        }
      }

      if (data.type === 'ROOM_STATE_SYNC' && Array.isArray(data.players)) {
        const restoredPlayers: LobbyPlayerT[] = data.players.map((player: any, index: number) => {
          const name = player.name || 'Unknown Student';
          return {
            id: player.id || player.userId,
            name,
            initials: name.substring(0, 2).toUpperCase(),
            color: AVATAR_COLORS[index % AVATAR_COLORS.length],
            isHost: player.role === 'host',
            isReady: true,
          };
        });
        setPlayers(restoredPlayers);
      }

      if (data.type === 'ROOM_STATE_SYNC' && data.status === 'active') {
        const m = (data.mode || data.battleMode || 'LIVE').toUpperCase();
        setBattleMode(m);
        setBattleStarted(true);
      }

      if (data.type === 'PLAYER_JOINED' || (data.type === 'BATTLE_ACTION' && data.isJoinEvent)) {
        setPlayers((prev) => {
          if (prev.some((p) => p.id === data.userId || p.name === data.sender)) return prev;
          return [...prev, {
            id: data.userId || `peer_${Math.random()}`,
            name: data.sender || 'Peer',
            initials: (data.sender || 'PR').substring(0, 2).toUpperCase(),
            color: AVATAR_COLORS[prev.length % AVATAR_COLORS.length],
            isHost: false,
            isReady: true,
          }];
        });
      }

      // ---- Battle-phase routing (from useBattleSocket / LiveBattle) ----

      const rawQuestions = data.questions || data.roomState?.questions || data.payload?.questions;
      if (Array.isArray(rawQuestions) && rawQuestions.length > 0) {
        setQuestions(formatBattleQuestions(rawQuestions));
      }

      if (data.type === 'ROOM_STATE_SYNC' || data.type === 'QUESTION_ADVANCED' || data.type === 'PROF_START_BATTLE') {
        if (typeof data.currentIndex === 'number') setCurrentIndex(data.currentIndex);
        if (data.startedAt) setStartedAt(data.startedAt);
      }

      if (data.type === 'SCORE_UPDATED' || data.type === 'LEADERBOARD_UPDATE') {
        if (Array.isArray(data.leaderboard)) {
          const formatted: LeaderboardPlayer[] = data.leaderboard.map((item: any, idx: number) => ({
            id: item.id || item.userId,
            name: item.name || item.sender || `Player ${idx + 1}`,
            initials: (item.name || 'P').substring(0, 2).toUpperCase(),
            color: AVATAR_COLORS[idx % AVATAR_COLORS.length],
            score: item.score || 0,
            streak: item.streak || 0,
            isMe: (item.id || item.userId) === resolvedUserId,
            isLeader: idx === 0,
          }));
          setLeaderboard(formatted);
        }
      }

      if (data.type === 'BATTLE_ACTION' && data.message) {
        setChatMessages((prev) => [
          ...prev,
          {
            id: `${data.userId || data.sender}-${data.timestamp || Date.now()}`,
            sender: data.sender || 'Anonymous',
            text: data.message,
            isMe: data.userId === resolvedUserId,
          },
        ]);
      }
      // Note: QUIZ_COMPLETED / TEAM_BATTLE_COMPLETED / ROYALE_MATCH_ENDED are
      // intentionally left for each screen to read via `lastMessage` and
      // call navigate("results") itself — navigation is a screen concern,
      // not a connection concern.
    };

    socket.onerror = (event) => {
      if (cancelled) return;
      console.error('[BattleSocketProvider] WebSocket error', { url: wsUrl, event });
    };

    socket.onclose = (event) => {
      if (cancelled) return;
      setStatus('closed');
      console.warn('[BattleSocketProvider] WebSocket closed', {
        code: event.code,
        reason: event.reason,
        wasClean: event.wasClean,
      });
    };

    return () => {
      cancelled = true;
      if (socket.readyState === WebSocket.OPEN) socket.close();
      socketRef.current = null;
    };
    // Deliberately NOT depending on countdown/battleStarted/etc — those are
    // effects of messages, not inputs to the connection. Re-running this
    // effect should only happen if the identity of the session/user/mode
    // changes.
  }, [sessionId, userId, userName, mode]);

  // 3-2-1 countdown ticker (moved from useLobbySocket, unchanged).
  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      const t = setTimeout(() => {
        setBattleStarted(true);
        setCountdown(null);
      }, 1500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCountdown((c) => (c ?? 1) - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  function send(payload: object): boolean {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(payload));
      return true;
    }
    console.warn('[BattleSocketProvider] send() called while socket not OPEN, dropped:', payload);
    return false;
  }

  return (
    <BattleSocketContext.Provider
      value={{
        status,
        send,
        players,
        countdown,
        battleStarted,
        battleMode,
        questions,
        currentIndex,
        startedAt,
        leaderboard,
        chatMessages,
        lastMessage,
      }}
    >
      {children}
    </BattleSocketContext.Provider>
  );
}

export function useBattleSocketContext(): BattleSocketValue {
  const ctx = useContext(BattleSocketContext);
  if (!ctx) {
    throw new Error('useBattleSocketContext must be used within a BattleSocketProvider');
  }
  return ctx;
}