'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Trophy, MessageSquare, Crown, CheckCircle, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export interface TeamMemberAnswer {
  memberId: string;
  memberName: string;
  selectedOption: string; // e.g. "A", "B", "C", or "D"
  submittedAt: number;
}

interface TeamQuestion {
  id: string | number;
  number: number;
  total: number;
  subject: string;
  text: string;
  options: string[]; // option text, index 0 = "A", 1 = "B", ...
  correct: number;
  points: number;
}

export interface TeamBattleProps {
  battleId?: string;
  onLeaveBattle?: () => void;
}

const OPTION_KEYS = ['A', 'B', 'C', 'D'];

// Same shape LiveBattle uses to normalize whatever /api/questions returns
function formatQuestions(raw: any[]): TeamQuestion[] {
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
    const correctIdx = parsedChoices.findIndex((c) => c === q.answer);
    return {
      id: q.id ?? idx,
      number: idx + 1,
      total: raw.length,
      subject: q.topic || q.subject || 'General Knowledge',
      text: q.text || q.question,
      options: parsedChoices,
      correct: correctIdx !== -1 ? correctIdx : Number(q.correct) || 0,
      points: Number(q.points) || 10,
    };
  });
}

export function TeamBattle({ battleId = '', onLeaveBattle }: TeamBattleProps) {
  const { user, navigate, setLastBattleMode } = useApp();
  const wsRef = useRef<WebSocket | null>(null);

  const [questions, setQuestions] = useState<TeamQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const currentQuestion = questions[questionIndex];

  const [selectedOption, setSelectedOption] = useState<string>('');
  const [confirmed, setConfirmed] = useState(false);
  const [teamMemberAnswers, setTeamMemberAnswers] = useState<TeamMemberAnswer[]>([]);

  const memberId = user?.id || `guest_${Math.random().toString(36).slice(2, 8)}`;
  const memberName =
    user?.username || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'You';

  // 1. Load real questions
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/questions');
        if (res.ok) {
          const data = await res.json();
          if (!cancelled && Array.isArray(data) && data.length > 0) {
            setQuestions(formatQuestions(data));
          }
        }
      } catch (err) {
        console.error('[TeamBattle] Failed to load questions:', err);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // 2. Real WebSocket connection — FIX (1.1): this used to be a commented-out
  // "simulation". Now it actually joins the team room and reacts to what
  // TeamBattle.ts (server) sends back.
  useEffect(() => {
    let socket: WebSocket | null = null;
    let isMounted = true;

    function connectWs() {
      if (!isMounted) return;
      const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080';
      socket = new WebSocket(wsUrl);
      wsRef.current = socket;

      socket.onopen = () => {
        socket?.send(JSON.stringify({
          type: 'JOIN_TEAM_BATTLE',
          battleId,
          questionIndex,
        }));
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.type === 'TEAM_STATE_SYNC' || data.type === 'TEAM_ANSWERS_UPDATED') {
            if (Array.isArray(data.teamAnswers)) {
              setTeamMemberAnswers(data.teamAnswers);
            }
          }

          if (data.type === 'TEAM_BATTLE_COMPLETED') {
            setLastBattleMode('TEAM');
            navigate('results');
          }
        } catch (err) {
          console.error('[TeamBattle] WS parse error:', err);
        }
      };

      socket.onclose = () => {
        if (isMounted) setTimeout(connectWs, 2000);
      };
    }

    connectWs();
    return () => {
      isMounted = false;
      socket?.close();
      wsRef.current = null;
    };
    // Re-join whenever we move to a new question so the server keys the answer bucket correctly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [battleId, questionIndex]);

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

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'SUBMIT_TEAM_MEMBER_ANSWER',
        battleId,
        questionIndex,
        answer: myAnswer,
      }));
    }

    const isLastQuestion = questionIndex >= questions.length - 1;

    // Give teammates a few seconds to see the locked-in answer, then either
    // move to the next question or end the battle for real (not just locally).
    setTimeout(() => {
      if (isLastQuestion) {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({
            type: 'END_TEAM_BATTLE',
            battleId,
            isLastQuestion: true,
          }));
        }
      } else {
        setQuestionIndex((i) => i + 1);
        setSelectedOption('');
        setConfirmed(false);
      }
    }, 3000);
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

  const options = currentQuestion.options.map((text, i) => ({ key: OPTION_KEYS[i] || String(i), text }));

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
        <span className="text-xs text-[#8F93A8] font-bold">
          Question {currentQuestion.number} / {currentQuestion.total}
        </span>
      </header>

      {/* Content */}
      <div className="flex-1 p-5 grid grid-cols-[1fr_280px] gap-5">
        <div className="flex flex-col gap-4">
          <div className="bg-[#1C1F33] border border-white/10 rounded-2xl p-6">
            <span className="bg-[#5B3DF6]/20 text-[#5B3DF6] text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
              {currentQuestion.subject}
            </span>
            <h2 className="mt-2 text-xl font-bold">
              {currentQuestion.text}
            </h2>
          </div>

          {/* Options with real vote % from teamMemberAnswers */}
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
                  } ${
                    isSelected
                      ? 'bg-[#632A38] border-[#FF5C5C]'
                      : 'bg-white/[0.03] border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3 z-10">
                    <span className="size-7 bg-white/10 rounded-lg flex items-center justify-center font-extrabold text-sm">
                      {opt.key}
                    </span>
                    <span className="font-bold">{opt.text}</span>
                  </div>
                  <span className="font-extrabold text-xs z-10 text-[#FF5C5C]">
                    {percentage}%
                  </span>
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
            {confirmed ? 'Answer Locked In' : 'Confirm Final Answer'}
            <CheckCircle size={18} />
          </button>
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
