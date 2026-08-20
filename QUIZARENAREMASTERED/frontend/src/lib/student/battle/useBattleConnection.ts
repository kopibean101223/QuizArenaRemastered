'use client';

import { useEffect, useRef } from 'react';

/**
 * Shared logic for all 4 battle modes (Battle_LiveQuiz, Battle_OwnPace,
 * Battle_BattleRoyale, Battle_TeamMode).
 *
 * Previously each mode file duplicated its own copy of:
 *   - WebSocket connect/reconnect boilerplate (incl. the ws://localhost:8080
 *     fallback, which only works when the server + browser are on the same
 *     machine — see useBattleSocket below)
 *   - Question parsing (choices/options normalization, correct-answer index)
 *   - Student identity derivation (name/id fallback chain)
 *   - Countdown timer math
 *
 * Fixing a bug (e.g. the WS URL, or a parsing edge case) meant editing
 * 3-4 files and hoping you didn't miss one. Now it's edited here once.
 *
 * Each mode component still owns its own JSX and its own JOIN/message
 * payload shapes (JOIN_BATTLE vs JOIN_ROYALE vs JOIN_TEAM_BATTLE, etc.) —
 * that part is mode-specific and stays in the mode files. This file only
 * centralizes the parts that were byte-for-byte (or near-identical) across
 * all four.
 */

// ---------------------------------------------------------------------------
// Avatar colors — same palette used by every mode's leaderboard/survivor list
// ---------------------------------------------------------------------------
export const AVATAR_COLORS = [
  '#5B3DF6', '#FF6B4A', '#2ED47A', '#FFC93C', '#FF4757',
  '#5BC8F6', '#B06EF6', '#FF9F40', '#E040FB', '#0019A7',
];

// ---------------------------------------------------------------------------
// Question parsing
// ---------------------------------------------------------------------------
export interface NormalizedQuestion {
  id: string | number;
  number: number;
  total: number;
  subject: string;
  text: string;
  options: string[];
  /** index of the correct option in `options` */
  correct: number;
  /** text of the correct option — some server payloads (Royale) key on this instead of an index */
  answer: string;
  points: number;
  timeLimit: number;
}

/**
 * Normalizes whatever /api/questions (or a WS payload) returns into one
 * consistent shape. LiveQuiz/OwnPace/TeamMode read questions via `correct`
 * (index); Royale reads via `answer` (text) — this returns both so any mode
 * can use whichever it needs without re-deriving it.
 */
export function formatBattleQuestions(raw: any[]): NormalizedQuestion[] {
  return raw.map((q: any, idx: number) => {
    let parsedChoices: string[] = [];
    try {
      let rawChoices = q.choices || q.options;
      if (typeof rawChoices === 'string') rawChoices = JSON.parse(rawChoices);
      if (Array.isArray(rawChoices)) {
        parsedChoices = rawChoices.map((c: any) =>
          String(typeof c === 'object' && c !== null ? c.text || c.label || String(c) : c)
        );
      }
    } catch {
      parsedChoices = [];
    }

    const correctFromAnswerText = parsedChoices.findIndex((c) => c === q.answer);
    const correctIdx = correctFromAnswerText !== -1 ? correctFromAnswerText : Number(q.correct) || 0;

    return {
      id: q.id ?? idx,
      number: idx + 1,
      total: raw.length,
      subject: q.topic || q.subject || 'General Knowledge',
      text: q.text || q.question,
      options: parsedChoices,
      correct: correctIdx,
      answer: q.answer ?? parsedChoices[correctIdx] ?? '',
      points: Number(q.points) || 10,
      timeLimit: Number(q.timeLimit) || 60,
    };
  });
}

// ---------------------------------------------------------------------------
// Student identity — same fallback chain every mode used
// ---------------------------------------------------------------------------
export function getStudentIdentity(user: any) {
  const studentName =
    user?.username || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Student';
  const currentUserId = user?.id || `guest_${Math.random().toString(36).slice(2, 8)}`;
  return { studentName, currentUserId };
}

// ---------------------------------------------------------------------------
// Countdown timer math (LiveQuiz + OwnPace)
// ---------------------------------------------------------------------------
export function computeTimeLeft(limit: number, startTs: number | null) {
  if (!startTs) return limit;
  const elapsedSeconds = Math.floor((Date.now() - Number(startTs)) / 1000);
  return Math.max(limit - elapsedSeconds, 0);
}

// ---------------------------------------------------------------------------
// WebSocket connection lifecycle
// ---------------------------------------------------------------------------
interface UseBattleSocketOptions {
  battleId?: string;
  /** Called once the socket is open — send your mode's JOIN_* message here. */
  onOpen: (socket: WebSocket) => void;
  /** Called on every parsed message — switch on data.type for your mode. */
  onMessage: (data: any, socket: WebSocket) => void;
  /**
   * Extra values that should force a reconnect when they change
   * (e.g. TeamBattle reconnects per questionIndex so the server keys the
   * answer bucket correctly). battleId is always included automatically.
   */
  deps?: React.DependencyList;
}

/**
 * Shared connect/reconnect/cleanup lifecycle. This is where the WS URL is
 * resolved — fix NEXT_PUBLIC_WS_URL issues here once instead of in 4 files.
 */
export function useBattleSocket({ battleId, onOpen, onMessage, deps = [] }: UseBattleSocketOptions) {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let socket: WebSocket | null = null;
    let isMounted = true;

    function connect() {
      if (!isMounted) return;
      const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080';
      socket = new WebSocket(wsUrl);
      socketRef.current = socket;

      socket.onopen = () => {
        if (socket) onOpen(socket);
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (socket) onMessage(data, socket);
        } catch (err) {
          console.error('[useBattleSocket] WS message parse error:', err);
        }
      };

      // Previously missing in every mode — reconnects were silent, so a bad
      // wsUrl or a rejected connection just looped forever with no clue why.
      socket.onerror = (err) => {
        console.error('[useBattleSocket] WS error:', err);
      };

      socket.onclose = () => {
        if (isMounted) setTimeout(connect, 2000);
      };
    }

    connect();
    return () => {
      isMounted = false;
      socket?.close();
      socketRef.current = null;
    };
    // battleId + caller-supplied deps control reconnects; onOpen/onMessage
    // are expected to be stable enough not to need to be deps here (same
    // assumption the original 4 files made).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [battleId, ...deps]);

  /** Send a JSON payload if the socket is currently open. Returns false if not connected. */
  function send(payload: object): boolean {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(payload));
      return true;
    }
    return false;
  }

  return { socketRef, send };
}