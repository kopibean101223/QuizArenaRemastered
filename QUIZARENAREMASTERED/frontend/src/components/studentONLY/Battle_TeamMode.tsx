'use client';

import React, { useState, useEffect } from 'react';
import { Trophy, MessageSquare, Crown, CheckCircle, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  useBattleSocket,
  formatBattleQuestions,
  getStudentIdentity,
  computeTimeLeft,
} from '@/lib/student/battle/useBattleConnection';
import type { BattleQuestion } from '@/lib/student/battle/useBattleConnection';
import { CountdownBar } from './LiveBattleCOMPONENTONLY/CountdownBar';
import { AnswerInput } from './battle/Answer_Input';

export interface TeamMemberAnswer {
  memberId: string;
  memberName: string;
  selectedOption: string;
  submittedAt: number;
}

// NEW: was a Multiple-Choice-only shape (options/correct). Now reuses the
// same normalized BattleQuestion union AnswerInput expects, so every
// question type (not just MCQ) carries its type-specific fields through.
type TeamQuestion = BattleQuestion;

// Stringifies whatever AnswerInput hands back (number/boolean/string,
// depending on question.type) into the same "selectedOption: string" shape
// the team-vote feed and server already expect — same wire format as MCQ's
// letter keys, just not restricted to A/B/C/D anymore.
function stringifyAnswerValue(value: any): string {
  if (typeof value === 'boolean') return value ? 'True' : 'False';
  return String(value ?? '');
}

export interface TeamBattleProps {
  battleId?: string;
  onLeaveBattle?: () => void;
}

const OPTION_KEYS = ['A', 'B', 'C', 'D'];
const DEFAULT_TIME_LIMIT = 30;

export function TeamBattle({ battleId = '', onLeaveBattle }: TeamBattleProps) {
  const { user, navigate, setLastBattleMode } = useApp();

  const [questions, setQuestions] = useState<TeamQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const currentQuestion = questions[questionIndex];

  // NEW: server-driven timer state. startedAt/timeLimit now come from the
  // server (TEAM_STATE_SYNC / TEAM_QUESTION_ADVANCED), not a local guess.
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [timeLimit, setTimeLimit] = useState<number>(DEFAULT_TIME_LIMIT);
  const [timeLeft, setTimeLeft] = useState<number>(DEFAULT_TIME_LIMIT);

  const [selectedOption, setSelectedOption] = useState<string>('');
  const [confirmed, setConfirmed] = useState(false);
  const [teamMemberAnswers, setTeamMemberAnswers] = useState<TeamMemberAnswer[]>([]);

  const { studentName: memberName, currentUserId: memberId } = getStudentIdentity(user);

  function applyTeamQuestions(rawQuestions: unknown[]) {
    console.log('[TeamBattle][client] applying', rawQuestions.length, 'questions from server');
    // NEW: keep every normalized field (not just the MCQ-only ones) so
    // non-Multiple-Choice questions have what AnswerInput needs to render.
    setQuestions(formatBattleQuestions(rawQuestions));
  }

  // Fallback loader only — real source of truth is always the WS payload.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (questions.length > 0) return;
        const res = await fetch('/api/questions');
        if (res.ok) {
          const data = await res.json();
          if (!cancelled && Array.isArray(data) && data.length > 0) {
            console.log('[TeamBattle][client] fallback /api/questions returned', data.length, 'questions');
            applyTeamQuestions(data);
          }
        }
      } catch (err) {
        console.error('[TeamBattle] Failed to load fallback questions:', err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [questions.length]);

  // FIX: no longer reconnects per questionIndex. The server owns
  // questionIndex now, so tearing the socket down every time it changed
  // (as before) just risked missing the exact broadcast that changed it.
  // One persistent connection for the whole battle, keyed only on battleId.
  const { send } = useBattleSocket({
    battleId,
    onOpen: (socket) => {
      console.log('[TeamBattle][client] socket open -> sending JOIN_TEAM_BATTLE', { battleId });
      socket.send(
        JSON.stringify({
          type: 'JOIN_TEAM_BATTLE',
          mode: 'TEAM',
          battleId,
        })
      );
    },
    onMessage: (data) => {
      console.log('[TeamBattle][client] received', data.type, data);

      if (data.type === 'TEAM_STATE_SYNC') {
        if (typeof data.questionIndex === 'number') setQuestionIndex(data.questionIndex);
        if (typeof data.startedAt === 'number') setStartedAt(data.startedAt);
        if (typeof data.timeLimit === 'number') setTimeLimit(data.timeLimit);
        if (Array.isArray(data.teamAnswers)) setTeamMemberAnswers(data.teamAnswers);
        if (Array.isArray(data.questions) && data.questions.length > 0) {
          applyTeamQuestions(data.questions);
        }
        setSelectedOption('');
        setConfirmed(false);
      }

      // NEW: the server now broadcasts this when its own timer fires (or a
      // professor manually advances) — this is the ONLY thing that should
      // move every teammate to the next question at the same time.
      if (data.type === 'TEAM_QUESTION_ADVANCED') {
        console.log(
          `[TeamBattle][client] server advanced room to question ${data.questionIndex}, timeLimit=${data.timeLimit}s`
        );
        setQuestionIndex(data.questionIndex);
        setStartedAt(data.startedAt);
        setTimeLimit(data.timeLimit);
        setTeamMemberAnswers(Array.isArray(data.teamAnswers) ? data.teamAnswers : []);
        setSelectedOption('');
        setConfirmed(false);
      }

      if (data.type === 'TEAM_ANSWERS_UPDATED') {
        if (Array.isArray(data.teamAnswers)) setTeamMemberAnswers(data.teamAnswers);
      }

      if (data.type === 'TEAM_BATTLE_COMPLETED') {
        console.log('[TeamBattle][client] battle completed, navigating to results');
        setLastBattleMode('TEAM');
        navigate('results');
      }
    },
  });

  // NEW: countdown driven off the server's startedAt/timeLimit, ticking
  // every second like LiveQuiz's timer, instead of not existing at all.
  useEffect(() => {
    if (!startedAt) {
      setTimeLeft(timeLimit);
      return;
    }
    const tick = () => {
      const left = computeTimeLeft(timeLimit, startedAt);
      setTimeLeft(left);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [startedAt, timeLimit]);

  const handleSelectOption = (optionKey: string) => {
    if (confirmed) return;
    setSelectedOption(optionKey);
  };

  // FIX: confirming an answer no longer starts a local setTimeout that
  // silently flips this ONE browser's questionIndex. It just submits the
  // vote and waits — the server's shared timer (or all-teammates-answered
  // shortcut, if you add one server-side) is what advances everyone.
  const handleConfirmAnswer = () => {
    if (!selectedOption || confirmed) return;
    setConfirmed(true);

    const myAnswer: TeamMemberAnswer = {
      memberId,
      memberName,
      selectedOption,
      submittedAt: Date.now(),
    };

    console.log('[TeamBattle][client] submitting answer', myAnswer, 'at questionIndex', questionIndex);

    send({
      type: 'SUBMIT_TEAM_MEMBER_ANSWER',
      battleId,
      questionIndex,
      answer: myAnswer,
    });
  };

  // Handles submissions coming from AnswerInput for every question type
  // other than Multiple Choice (which keeps its own select-then-confirm
  // grid below). Mirrors handleConfirmAnswer's send, just with a
  // stringified value in place of the A/B/C/D option key.
  const handleAnswerInputSubmit = (value: any) => {
    if (confirmed) return;
    const stringValue = stringifyAnswerValue(value);
    setSelectedOption(stringValue);
    setConfirmed(true);

    const myAnswer: TeamMemberAnswer = {
      memberId,
      memberName,
      selectedOption: stringValue,
      submittedAt: Date.now(),
    };

    console.log('[TeamBattle][client] submitting answer', myAnswer, 'at questionIndex', questionIndex);

    send({
      type: 'SUBMIT_TEAM_MEMBER_ANSWER',
      battleId,
      questionIndex,
      answer: myAnswer,
    });
  };

  const getOptionPercentage = (optionKey: string) => {
    if (teamMemberAnswers.length === 0) return 0;
    const count = teamMemberAnswers.filter((a) => a.selectedOption === optionKey).length;
    return Math.round((count / teamMemberAnswers.length) * 100);
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-[#131524] text-white flex items-center justify-center font-sans">
        Waiting for questions to load…
      </div>
    );
  }

  // Only Multiple Choice questions have `.options` — other types render
  // through AnswerInput instead, so this stays undefined for them.
  const isMultipleChoice = currentQuestion.type === 'Multiple Choice';
  const options = isMultipleChoice
    ? currentQuestion.options.map((text, i) => ({ key: OPTION_KEYS[i] || String(i), text }))
    : [];

  return (
    <div className="min-h-screen bg-[#131524] text-white flex flex-col font-sans">
      {/* Header */}
      <header className="px-6 py-3 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3 font-extrabold text-lg">
          <div className="size-7 bg-[#5B3DF6] rounded-lg flex items-center justify-center">
            <Zap size={16} fill="#FFF" color="transparent" />
          </div>
          QuizArena - Team Mode
        </div>
        <div className="flex items-center gap-4">
          <div className="w-40">
            <CountdownBar timeLeft={timeLeft} timeLimit={timeLimit} />
          </div>
          <span className="text-xs text-[#8F93A8] font-bold">
            Question {currentQuestion.number} / {currentQuestion.total}
          </span>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 p-5 grid grid-cols-[1fr_280px] gap-5">
        <div className="flex flex-col gap-4">
          <div className="bg-[#1C1F33] border border-white/10 rounded-2xl p-6">
            <span className="bg-[#5B3DF6]/20 text-[#5B3DF6] text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
              {currentQuestion.subject}
            </span>
            <h2 className="mt-2 text-xl font-bold">{currentQuestion.text}</h2>
          </div>

          {isMultipleChoice ? (
            <>
              <div className="flex flex-col gap-3">
                {options.map((opt) => {
                  const isSelected = selectedOption === opt.key;
                  const percentage = getOptionPercentage(opt.key);
                  return (
                    <div
                      key={opt.key}
                      onClick={() => handleSelectOption(opt.key)}
                      className={`relative p-4 rounded-xl border flex items-center justify-between overflow-hidden ${
                        confirmed ? 'cursor-default' : 'cursor-pointer'
                      } ${isSelected ? 'bg-[#632A38] border-[#FF5C5C]' : 'bg-white/[0.03] border-white/10'}`}
                    >
                      <div className="flex items-center gap-3 z-10">
                        <span className="size-7 bg-white/10 rounded-lg flex items-center justify-center font-extrabold text-sm">
                          {opt.key}
                        </span>
                        <span className="font-bold">{opt.text}</span>
                      </div>
                      <span className="font-extrabold text-xs z-10 text-[#FF5C5C]">{percentage}%</span>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                disabled={!selectedOption || confirmed}
                onClick={handleConfirmAnswer}
                className="w-full bg-[#2ED47A] disabled:opacity-40 disabled:cursor-not-allowed text-black font-extrabold py-4 rounded-xl flex items-center justify-center gap-2"
              >
                <Crown size={18} fill="#000" />
                {confirmed ? 'Answer Locked In — waiting for the timer…' : 'Confirm Final Answer'}
                <CheckCircle size={18} />
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-3">
              <AnswerInput
                key={currentQuestion.id}
                question={currentQuestion}
                disabled={confirmed}
                revealed={false}
                onSubmit={handleAnswerInputSubmit}
              />
              {confirmed && (
                <div className="w-full bg-[#2ED47A]/15 border border-[#2ED47A]/40 text-[#2ED47A] font-extrabold py-3 rounded-xl flex items-center justify-center gap-2">
                  <Crown size={18} fill="#2ED47A" color="transparent" />
                  Answer Locked In — waiting for the timer…
                </div>
              )}
            </div>
          )}
        </div>

        {/* Live Team Member Answers Feed Panel */}
        <div className="bg-[#1C1F33] border border-white/10 rounded-2xl p-4 flex flex-col gap-3">
          <span className="text-xs font-extrabold text-[#8F93A8] uppercase flex items-center gap-2">
            <MessageSquare size={14} /> Team Answers Received ({teamMemberAnswers.length})
          </span>

          <div className="flex flex-col gap-2">
            {teamMemberAnswers.length === 0 ? (
              <span className="text-xs text-white/30 italic">Waiting for teammates…</span>
            ) : (
              teamMemberAnswers.map((ans) => (
                <div
                  key={ans.memberId}
                  className="bg-white/5 p-2.5 rounded-lg flex items-center justify-between border border-white/5"
                >
                  <span className="text-xs font-semibold text-white/80">
                    {ans.memberId === memberId ? `${ans.memberName} (You)` : ans.memberName}
                  </span>
                  <span className="text-xs font-black bg-[#5B3DF6] px-2 py-0.5 rounded text-white">
                    {ans.selectedOption}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamBattle;