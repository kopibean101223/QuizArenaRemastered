'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Skull, Heart, Zap, LogOut, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export interface Survivor {
  id: string;
  name: string;
  initials: string;
  color: string;
  isYou?: boolean;
  lives: number;
}

interface RoyaleQuestion {
  id: string | number;
  number: number;
  total: number;
  subject: string;
  text: string;
  options: string[];
  answer: string; // the correct option TEXT, matches SUBMIT_ROYALE_ANSWER's correctAnswer contract
}

export interface BattleRoyaleProps {
  battleId?: string;
  initialStartingHp?: number;
  onLeaveBattle?: () => void;
}

const OPTION_KEYS = ['A', 'B', 'C', 'D'];
const AVATAR_COLORS = ['#5B3DF6', '#FF6B4A', '#2ED47A', '#FFC93C', '#FF4757', '#5BC8F6', '#B06EF6', '#FF9F40', '#E040FB', '#0019A7'];

function formatQuestions(raw: any[]): RoyaleQuestion[] {
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
    return {
      id: q.id ?? idx,
      number: idx + 1,
      total: raw.length,
      subject: q.topic || q.subject || 'General Knowledge',
      text: q.text || q.question,
      options: parsedChoices,
      answer: q.answer,
    };
  });
}

export function BattleRoyale({
  battleId = '',
  initialStartingHp = 3,
  onLeaveBattle,
}: BattleRoyaleProps) {
  const { user, navigate, setLastBattleMode } = useApp();
  const wsRef = useRef<WebSocket | null>(null);

  const [questions, setQuestions] = useState<RoyaleQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const currentQuestion = questions[questionIndex];

  const [startingHp, setStartingHp] = useState<number>(initialStartingHp);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);
  const [survivors, setSurvivors] = useState<Survivor[]>([]);
  const [eliminated, setEliminated] = useState(false);

  const myId = user?.id || `guest_${Math.random().toString(36).slice(2, 8)}`;
  const myName = user?.username || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'You';

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
        console.error('[BattleRoyale] Failed to load questions:', err);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // 2. Real WebSocket connection — FIX (1.1): replaces the old commented-out
  // "WebSocket Listener Simulation" with an actual connection to BattleRoyal.ts.
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
          type: 'JOIN_ROYALE',
          battleId,
          startingHp: initialStartingHp,
          playerData: {
            id: myId,
            name: myName,
            initials: myName.substring(0, 2).toUpperCase(),
            color: AVATAR_COLORS[0],
          },
        }));
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.type === 'ROYALE_STATE_SYNC') {
            if (typeof data.startingHp === 'number') setStartingHp(data.startingHp);
            if (Array.isArray(data.players)) applyPlayers(data.players);
          }

          if (data.type === 'ROYALE_HP_UPDATED') {
            if (Array.isArray(data.players)) applyPlayers(data.players);
            if (data.playerId === myId && data.isAlive === false) {
              setEliminated(true);
            }
          }

          if (data.type === 'ROYALE_MATCH_ENDED') {
            if (Array.isArray(data.players)) applyPlayers(data.players);
            setLastBattleMode('ROYALE');
            navigate('results');
          }
        } catch (err) {
          console.error('[BattleRoyale] WS parse error:', err);
        }
      };

      socket.onclose = () => {
        if (isMounted) setTimeout(connectWs, 2000);
      };
    }

    function applyPlayers(players: any[]) {
      setSurvivors(players.map((p, idx) => ({
        id: p.id,
        name: p.id === myId ? myName : (p.name || `Player ${idx + 1}`),
        initials: (p.initials || p.name || 'P').substring(0, 2).toUpperCase(),
        color: p.color || AVATAR_COLORS[idx % AVATAR_COLORS.length],
        isYou: p.id === myId,
        lives: p.lives ?? 0,
      })));
    }

    connectWs();
    return () => {
      isMounted = false;
      socket?.close();
      wsRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [battleId]);

  const handleSelectOption = (optionKey: string) => {
    if (locked || eliminated) return;
    setSelectedOption(optionKey);

    const opt = OPTION_KEYS.indexOf(optionKey);
    const answerText = currentQuestion?.options[opt];
    setLocked(true);

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'SUBMIT_ROYALE_ANSWER',
        battleId,
        playerData: { id: myId, name: myName },
        optionKey: answerText,
        correctAnswer: currentQuestion?.answer,
      }));
    }

    // Advance locally to the next question after a short reveal beat.
    // The server decides (via ROYALE_MATCH_ENDED) if the match is actually over.
    setTimeout(() => {
      setQuestionIndex((i) => Math.min(i + 1, questions.length - 1));
      setSelectedOption(null);
      setLocked(false);
    }, 2500);
  };

  const activeSurvivorsCount = survivors.filter((s) => s.lives > 0).length;
  const me = survivors.find((s) => s.isYou);
  const myLives = me?.lives ?? startingHp;

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-[#131524] text-white flex items-center justify-center font-sans">
        Waiting for questions to load…
      </div>
    );
  }

  const options = currentQuestion.options.map((text, i) => ({
    key: OPTION_KEYS[i] || String(i),
    text,
    color: ['#A06AF6', '#FF6B4A', '#2ED47A', '#FFC93C'][i] || '#A06AF6',
  }));

  return (
    <div className="min-h-screen bg-[#131524] text-white flex flex-col font-sans">
      {/* Header Bar */}
      <header className="px-6 py-3 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-black text-lg">
            <div className="size-7 bg-[#5B3DF6] rounded-lg flex items-center justify-center">
              <Zap size={16} fill="#FFF" color="transparent" />
            </div>
            QuizArena
          </div>
          <div className="flex items-center gap-2 text-xs text-[#8F93A8]">
            <span>Battle Lobby</span>
            <ChevronRight size={12} />
            <span className="text-white font-semibold">Battle Royale</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#FF4757]/15 border border-[#FF4757] px-3 py-1 rounded-full text-xs font-extrabold text-[#FF4757] flex items-center gap-1.5">
            <Skull size={14} /> ROYALE
          </div>
          <button
            onClick={onLeaveBattle}
            className="bg-[#FF4757]/15 border-none text-[#FF4757] px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer flex items-center gap-1"
          >
            <LogOut size={13} /> Exit
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="flex-1 p-5 grid grid-cols-[1fr_280px] gap-5 min-h-0">
        <div className="flex flex-col gap-4">
          {/* Round Header */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-lg">
              <span className="text-[10px] font-extrabold text-[#8F93A8] uppercase">
                QUESTION
              </span>
              <span className="text-base font-black">{currentQuestion.number} / {currentQuestion.total}</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-3xl font-black leading-none">
                {activeSurvivorsCount || survivors.length}
              </span>
              <span className="text-[9px] font-extrabold text-[#8F93A8] tracking-widest uppercase">
                PLAYERS REMAINING
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#FF4757]/10 border border-[#FF4757]/30 px-3 py-1 rounded-xl">
              <span className="text-[10px] font-extrabold text-[#FF4757] uppercase">
                HP:
              </span>
              <span className="text-sm font-black text-white">
                {myLives} / {startingHp}
              </span>
            </div>
          </div>

          {/* Question Box */}
          <div className="bg-[#FF4757]/10 border border-[#FF4757]/30 rounded-2xl p-6">
            <div className="flex gap-2 mb-3">
              <span className="bg-[#FF4757]/20 text-[#FF4757] text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                {currentQuestion.subject}
              </span>
              <span className="bg-[#FF4757]/20 text-[#FF4757] text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                WRONG ANSWER = ELIMINATED
              </span>
            </div>
            <h2 className="m-0 text-xl font-extrabold leading-snug">
              {currentQuestion.text}
            </h2>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {eliminated ? (
              <div className="p-6 rounded-xl bg-[#FF4757]/10 border border-[#FF4757]/30 text-center font-bold text-[#FF4757]">
                You've been eliminated. Spectating the rest of the match…
              </div>
            ) : (
              options.map((opt) => (
                <div
                  key={opt.key}
                  onClick={() => handleSelectOption(opt.key)}
                  className={`p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-all border ${
                    selectedOption === opt.key
                      ? 'bg-white/10 border-indigo-500'
                      : 'bg-white/[0.03] border-white/10'
                  } ${locked ? 'pointer-events-none opacity-70' : ''}`}
                >
                  <div
                    className="size-7 rounded-lg text-white flex items-center justify-center font-extrabold text-sm"
                    style={{ backgroundColor: opt.color }}
                  >
                    {opt.key}
                  </div>
                  <span className="font-bold text-base text-white/90">
                    {opt.text}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Sidebar - Survivors List */}
        <div className="bg-[#1C1F33] border border-white/10 rounded-2xl p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-extrabold flex items-center gap-1.5">
              <Skull size={15} className="text-[#FF4757]" /> Survivors
            </span>
          </div>

          <div className="grid grid-cols-5 gap-3 row-gap-4">
            {survivors.length === 0 ? (
              <span className="col-span-5 text-xs text-white/30 italic">Waiting for players…</span>
            ) : (
              survivors.map((s) => {
                const isDead = s.lives <= 0;
                return (
                  <div
                    key={s.id}
                    className={`flex flex-col items-center gap-1 relative ${isDead ? 'opacity-30' : 'opacity-100'}`}
                  >
                    {s.isYou && (
                      <span className="text-[8px] font-black bg-[#FFC93C] text-black px-1 rounded absolute -top-2 z-10">
                        YOU
                      </span>
                    )}
                    <div
                      className="size-9 rounded-full flex items-center justify-center font-extrabold text-xs text-white border-2 border-white/10 relative"
                      style={{ backgroundColor: s.color }}
                    >
                      {isDead ? <Skull size={18} /> : s.initials}
                    </div>
                    <span className="text-[10px] text-[#8F93A8] font-bold">
                      {s.name}
                    </span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: startingHp }).map((_, i) => (
                        <Heart
                          key={i}
                          size={8}
                          fill={i < s.lives ? '#FF4757' : 'transparent'}
                          color={i < s.lives ? '#FF4757' : 'rgba(255,255,255,0.2)'}
                        />
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BattleRoyale;
