'use client';

import React, { useState, useEffect } from 'react';
import { Trophy, MessageSquare, Crown, CheckCircle, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  formatBattleQuestions,
  getStudentIdentity,
  computeTimeLeft,
} from '@/lib/student/battle/useBattleConnection';
import type { BattleQuestion } from '@/lib/student/battle/useBattleConnection';
import { useBattleSocketContext } from '@/lib/student/battle/useBattleSocketProvider';
import { CountdownBar } from './LiveBattleCOMPONENTONLY/CountdownBar';
import { AnswerInput } from './battle/Answer_Input';
import { BattleChat, BattleChatMessage } from './battle/BattleChat';

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
  // Which team this player picked in the lobby — needed so the shared
  // socket's JOIN_TEAM_BATTLE (sent by BattleSocketProvider) tells the
  // server which team's chat this player should join.
  teamId?: string | null;
}

const OPTION_KEYS = ['A', 'B', 'C', 'D'];
const DEFAULT_TIME_LIMIT = 30;

/**
 * No longer owns a WebSocket (useBattleSocket) — connection now lives in
 * BattleSocketProvider, mounted with mode="TEAM" (and extraJoinPayload:
 * { teamId }) above this component, so JOIN_TEAM_BATTLE goes out on the
 * same socket the lobby already opened.
 *
 * Message handling that used to live in useBattleSocket's onMessage is now
 * a useEffect watching `lastMessage` from context.
 */
export function TeamBattle({ battleId = '', onLeaveBattle, teamId = null }: TeamBattleProps) {
  const { user, navigate } = useApp();  
  const { send, lastMessage } = useBattleSocketContext();

  const [questions, setQuestions] = useState<TeamQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const currentQuestion = questions[questionIndex];

  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [timeLimit, setTimeLimit] = useState<number>(DEFAULT_TIME_LIMIT);
  const [timeLeft, setTimeLeft] = useState<number>(DEFAULT_TIME_LIMIT);

  const [selectedOption, setSelectedOption] = useState<string>('');
  const [confirmed, setConfirmed] = useState(false);
  const [teamMemberAnswers, setTeamMemberAnswers] = useState<TeamMemberAnswer[]>([]);

  const [chatMessages, setChatMessages] = useState<BattleChatMessage[]>([]);

  const { studentName: memberName, currentUserId: memberId } = getStudentIdentity(user);

  function applyTeamQuestions(rawQuestions: unknown[]) {
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

  // Message routing — same logic as the old onMessage callback, now
  // reacting to the shared socket's lastMessage instead of owning the
  // connection itself.
  useEffect(() => {
    const data = lastMessage;
    if (!data) return;

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

    // The server broadcasts this when its own timer fires (or a professor
    // manually advances) — the ONLY thing that should move every teammate
    // to the next question at the same time.
    if (data.type === 'TEAM_QUESTION_ADVANCED') {
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
      localStorage.removeItem('active_battle_session');
      navigate('results');
    }

    // Teammate-only chat — the server only forwards this to sockets on the
    // same team, so anything received here is safe to show as-is.
    if (data.type === 'TEAM_CHAT_MESSAGE' && data.message) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: `${data.userId || data.sender}-${data.timestamp || Date.now()}`,
          sender: data.sender || 'Anonymous',
          text: data.message,
          isMe: data.userId === memberId,
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastMessage]);

  // Countdown driven off the server's startedAt/timeLimit.
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

  const handleConfirmAnswer = () => {
    if (!selectedOption || confirmed) return;
    setConfirmed(true);

    const myAnswer: TeamMemberAnswer = {
      memberId,
      memberName,
      selectedOption,
      submittedAt: Date.now(),
    };

    send({
      type: 'SUBMIT_TEAM_MEMBER_ANSWER',
      battleId,
      questionIndex,
      answer: myAnswer,
    });
  };

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

  const handleSendChat = (text: string) => {
    send({
      type: 'TEAM_CHAT_MESSAGE',
      battleId,
      userId: memberId,
      teamId,
      sender: memberName,
      message: text,
    });
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-[#131524] text-white flex items-center justify-center font-sans">
        Waiting for questions to load…
      </div>
    );
  }

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

          {/* Teammate-only chat — free text, not visible outside this team. */}
          <div style={{ padding: "10px", borderTop: "1.5px solid rgba(255,255,255,0.06)" }}>
            <BattleChat
              mode="free"
              title="Team Chat"
              messages={chatMessages}
              onSend={handleSendChat}
              placeholder="Message your team…"
              height={260}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamBattle;