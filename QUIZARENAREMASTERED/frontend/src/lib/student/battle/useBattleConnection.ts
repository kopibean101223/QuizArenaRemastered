// 'use client';

// import { useEffect, useRef } from 'react';

// export const AVATAR_COLORS = [
//   '#5B3DF6', '#FF6B4A', '#2ED47A', '#FFC93C', '#FF4757',
//   '#5BC8F6', '#B06EF6', '#FF9F40', '#E040FB', '#0019A7',
// ];

// // export interface NormalizedQuestion {
// //   id: string | number;
// //   number: number;
// //   total: number;  
// //   subject: string;
// //   text: string;
// //   options: string[];
// //   correct: number;
// //   answer: string;
// //   points: number;
// //   timeLimit: number;
// // }

// export type { NormalizedQuestion, QuestionType } from '../questiontypes';

// export function formatBattleQuestions(raw: any[]): NormalizedQuestion[] {
//   return raw.map((q: any, idx: number) => {
//     let parsedChoices: string[] = [];
//     try {
//       let rawChoices = q.choices || q.options;
//       if (typeof rawChoices === 'string') rawChoices = JSON.parse(rawChoices);
//       if (Array.isArray(rawChoices)) {
//         parsedChoices = rawChoices.map((c: any) =>
//           String(typeof c === 'object' && c !== null ? c.text || c.label || String(c) : c)
//         );
//       }
//     } catch {
//       parsedChoices = [];
//     }

//     const correctFromAnswerText = parsedChoices.findIndex((c) => c === q.answer);
//     const correctIdx = correctFromAnswerText !== -1 ? correctFromAnswerText : Number(q.correct) || 0;

//     return {
//       id: q.id ?? idx,
//       number: idx + 1,
//       total: raw.length,
//       subject: q.topic || q.subject || 'General Knowledge',
//       text: q.text || q.question,
//       options: parsedChoices,
//       correct: correctIdx,
//       answer: q.answer ?? parsedChoices[correctIdx] ?? '',
//       points: Number(q.points) || 10,
//       timeLimit: Number(q.timeLimit) || 60,
//     };
//   });
// }

// export function getStudentIdentity(user: any) {
//   const studentName =
//     user?.username || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Student';
//   const currentUserId = user?.id || `guest_${Math.random().toString(36).slice(2, 8)}`;
//   return { studentName, currentUserId };
// }

// export function computeTimeLeft(limit: number, startTs: number | null) {
//   if (!startTs) return limit;
//   const elapsedSeconds = Math.floor((Date.now() - Number(startTs)) / 1000);
//   return Math.max(limit - elapsedSeconds, 0);
// }

// interface UseBattleSocketOptions {
//   battleId?: string;
//   onOpen: (socket: WebSocket) => void;
//   onMessage: (data: any, socket: WebSocket) => void;
//   deps?: React.DependencyList;
// }

// export function useBattleSocket({ battleId, onOpen, onMessage, deps = [] }: UseBattleSocketOptions) {
//   const socketRef = useRef<WebSocket | null>(null);

//   useEffect(() => {
//     let socket: WebSocket | null = null;
//     let isMounted = true;

//     function connect() {
//       if (!isMounted) return;
//       const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080';
//       console.log('[useBattleSocket] connecting to', wsUrl, 'battleId=', battleId);
//       socket = new WebSocket(wsUrl);
//       socketRef.current = socket;

//       socket.onopen = () => {
//         console.log('[useBattleSocket] OPEN battleId=', battleId);
//         if (socket) onOpen(socket);
//       };

//       socket.onmessage = (event) => {
//         try {
//           const data = JSON.parse(event.data);
//           console.log('[useBattleSocket] <-', data.type, 'battleId=', battleId);
//           if (socket) onMessage(data, socket);
//         } catch (err) {
//           console.error('[useBattleSocket] WS message parse error:', err, 'raw=', event.data);
//         }
//       };

//       socket.onerror = (err) => {
//         console.error('[useBattleSocket] WS error battleId=', battleId, err);
//       };

//       socket.onclose = (event) => {
//         console.warn(
//           '[useBattleSocket] CLOSED battleId=',
//           battleId,
//           'code=',
//           event.code,
//           'reason=',
//           event.reason,
//           '- reconnecting in 2s'
//         );
//         if (isMounted) setTimeout(connect, 2000);
//       };
//     }

//     connect();
//     return () => {
//       console.log('[useBattleSocket] cleanup, closing socket battleId=', battleId);
//       isMounted = false;
//       socket?.close();
//       socketRef.current = null;
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [battleId, ...deps]);

//   function send(payload: object): boolean {
//     if (socketRef.current?.readyState === WebSocket.OPEN) {
//       console.log('[useBattleSocket] ->', (payload as any).type, payload);
//       socketRef.current.send(JSON.stringify(payload));
//       return true;
//     }
//     console.warn('[useBattleSocket] send() called while socket not OPEN, dropped:', payload);
//     return false;
//   }

//   return { socketRef, send };
// }


'use client';

import { useEffect, useRef } from 'react';
import type { NormalizedQuestion, QuestionType } from '../questiontypes';

export const AVATAR_COLORS = [
  '#5B3DF6', '#FF6B4A', '#2ED47A', '#FFC93C', '#FF4757',
  '#5BC8F6', '#B06EF6', '#FF9F40', '#E040FB', '#0019A7',
];

export type { NormalizedQuestion, QuestionType } from '../questiontypes';

// `number`/`total` are the question's position within THIS battle, not part
// of a question's own shape — kept as a separate wrapper so
// NormalizedQuestion stays reusable outside battle mode (e.g. question bank,
// exports) without dragging quiz-runtime bookkeeping along with it.
export type BattleQuestion = NormalizedQuestion & {
  number: number;
  total: number;
};

function parseOptions(q: any): string[] {
  try {
    let rawChoices = q.choices || q.options;
    if (typeof rawChoices === 'string') rawChoices = JSON.parse(rawChoices);
    if (Array.isArray(rawChoices)) {
      return rawChoices.map((c: any) =>
        String(typeof c === 'object' && c !== null ? c.text || c.label || String(c) : c)
      );
    }
  } catch {
    // fall through
  }
  return [];
}

function parseAcceptedAnswers(q: any): string[] {
  if (Array.isArray(q.acceptedAnswers)) return q.acceptedAnswers;
  if (typeof q.acceptedAnswers === 'string') {
    try {
      const parsed = JSON.parse(q.acceptedAnswers);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // fall through
    }
  }
  return q.answer ? [q.answer] : [];
}

export function parseNumericValue(value: unknown): number | null {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return null;

    const compact = trimmed.replace(/,/g, '').replace(/\s+/g, '');
    const fractionMatch = compact.match(/^([-+]?\d+(?:\.\d+)?)\/([-+]?\d+(?:\.\d+)?)$/);
    if (fractionMatch) {
      const numerator = Number(fractionMatch[1]);
      const denominator = Number(fractionMatch[2]);
      if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) {
        return null;
      }
      return numerator / denominator;
    }

    const parsed = Number(compact);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

// Builds the type-specific fields for a single raw row. Legacy rows from
// the DB have no `type` column at all, so anything untyped is treated as
// 'Multiple Choice' — that was the only shape that existed before this union.
function buildTypedFields(q: any, options: string[]): NormalizedQuestion {
  const type: QuestionType = q.type || 'Multiple Choice';
  const base = {
    id: q.id,
    difficulty: q.difficulty || 'Medium',
    topic: q.topic || 'General',
    subject: q.subject || q.topic || 'General Knowledge',
    text: q.text || q.question,
    points: Number(q.points) || 10,
    timeLimit: Number(q.timeLimit) || 60,
    explanation: q.explanation ?? undefined,
    mediaUrl: q.mediaUrl ?? undefined,
  };

  switch (type) {
    case 'True / False': {
      const correct =
        typeof q.correct === 'boolean'
          ? q.correct
          : String(q.correct ?? q.answer).toLowerCase() === 'true';
      return { ...base, type: 'True / False', correct };
    }

    case 'Mathematics': {
      return {
        ...base,
        type: 'Mathematics',
        correctExpression: String(q.correctExpression ?? q.answer ?? ''),
        allowEquivalentForms: Boolean(q.allowEquivalentForms),
      };
    }

    case 'Short Answer': {
      return {
        ...base,
        type: 'Short Answer',
        acceptedAnswers: parseAcceptedAnswers(q),
        caseSensitive: Boolean(q.caseSensitive),
      };
    }

    case 'Step-by-step Solution': {
      const stepWeights = Array.isArray(q.stepWeights)
        ? q.stepWeights.map((step: any) => ({
            stepDescription: step?.stepDescription ?? step?.description ?? '',
            description: step?.description ?? step?.stepDescription ?? '',
            pointsAwarded: Number(step?.pointsAwarded ?? step?.points ?? 0),
            commonMistake: step?.commonMistake ?? '',
          }))
        : [];
      const steps = Array.isArray(q.steps)
        ? q.steps
        : stepWeights.length > 0
          ? stepWeights.map((step: any) => step.stepDescription || step.description || '')
          : ['Step 1'];

      return {
        ...base,
        type: 'Step-by-step Solution',
        acceptedAnswers: parseAcceptedAnswers(q),
        caseSensitive: Boolean(q.caseSensitive),
        steps,
        stepWeights,
      };
    }

    case 'Numerical Input': {
      const rawCorrectValue = q.correctValue ?? q.answer ?? 0;
      const parsedCorrectValue = parseNumericValue(rawCorrectValue) ?? 0;
      return {
        ...base,
        type: 'Numerical Input',
        correctValue: parsedCorrectValue,
        correctAnswerText: typeof rawCorrectValue === 'string' ? rawCorrectValue.trim() : String(rawCorrectValue ?? ''),
        tolerance: q.tolerance != null ? Number(q.tolerance) : undefined,
        unit: q.unit ?? undefined,
      };
    }

    case 'Identification': {
      return {
        ...base,
        type: 'Identification',
        acceptedAnswers: parseAcceptedAnswers(q),
        caseSensitive: Boolean(q.caseSensitive),
      };
    }

    case 'Multiple Choice':
    default: {
      const correctFromAnswerText = options.findIndex((c) => c === q.answer);
      const correct = correctFromAnswerText !== -1 ? correctFromAnswerText : Number(q.correct) || 0;
      return { ...base, type: 'Multiple Choice', options, correct };
    }
  }
}

export function formatBattleQuestions(raw: any[]): BattleQuestion[] {
  return raw.map((q: any, idx: number) => {
    const options = parseOptions(q);
    const typed = buildTypedFields(q, options);
    return {
      ...typed,
      number: idx + 1,
      total: raw.length,
    };
  });
}

export function getStudentIdentity(user: any) {
  const studentName =
    user?.username || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Student';
  const currentUserId = user?.id || `guest_${Math.random().toString(36).slice(2, 8)}`;
  return { studentName, currentUserId };
}

export function computeTimeLeft(limit: number, startTs: number | null) {
  if (!startTs) return limit;
  const elapsedSeconds = Math.floor((Date.now() - Number(startTs)) / 1000);
  return Math.max(limit - elapsedSeconds, 0);
}

interface UseBattleSocketOptions {
  battleId?: string;
  onOpen: (socket: WebSocket) => void;
  onMessage: (data: any, socket: WebSocket) => void;
  deps?: React.DependencyList;
}

export function useBattleSocket({ battleId, onOpen, onMessage, deps = [] }: UseBattleSocketOptions) {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let socket: WebSocket | null = null;
    let isMounted = true;

    function connect() {
      if (!isMounted) return;
      const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080';
      console.log('[useBattleSocket] connecting to', wsUrl, 'battleId=', battleId);
      socket = new WebSocket(wsUrl);
      socketRef.current = socket;

      socket.onopen = () => {
        console.log('[useBattleSocket] OPEN battleId=', battleId);
        if (socket) onOpen(socket);
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('[useBattleSocket] <-', data.type, 'battleId=', battleId);
          if (socket) onMessage(data, socket);
        } catch (err) {
          console.error('[useBattleSocket] WS message parse error:', err, 'raw=', event.data);
        }
      };

      socket.onerror = (err) => {
        console.error('[useBattleSocket] WS error battleId=', battleId, err);
      };

      socket.onclose = (event) => {
        console.warn(
          '[useBattleSocket] CLOSED battleId=',
          battleId,
          'code=',
          event.code,
          'reason=',
          event.reason,
          '- reconnecting in 2s'
        );
        if (isMounted) setTimeout(connect, 2000);
      };
    }

    connect();
    return () => {
      console.log('[useBattleSocket] cleanup, closing socket battleId=', battleId);
      isMounted = false;
      socket?.close();
      socketRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [battleId, ...deps]);

  function send(payload: object): boolean {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      console.log('[useBattleSocket] ->', (payload as any).type, payload);
      socketRef.current.send(JSON.stringify(payload));
      return true;
    }
    console.warn('[useBattleSocket] send() called while socket not OPEN, dropped:', payload);
    return false;
  }

  return { socketRef, send };
}