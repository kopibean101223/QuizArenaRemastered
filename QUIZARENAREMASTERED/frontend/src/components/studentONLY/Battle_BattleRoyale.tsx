  'use client';

  import React, { useState, useEffect } from 'react';
  import { Skull, Zap, ChevronRight } from 'lucide-react';
  import { useApp } from '../../context/AppContext';
  import {
    formatBattleQuestions,
    getStudentIdentity,
    computeTimeLeft,
    AVATAR_COLORS,
  } from '@/lib/student/battle/useBattleConnection';
  import type { BattleQuestion } from '@/lib/student/battle/useBattleConnection';
  import { useBattleSocketContext } from '@/lib/student/battle/useBattleSocketProvider';
  import { CountdownBar } from './LiveBattleCOMPONENTONLY/CountdownBar';
  import { AnswerInput } from './battle/Answer_Input';
  import { BattleChat, BattleChatMessage } from './battle/BattleChat';
  import { PowerCard } from './PowerCards/PowerCard';
  import { CARD_CATALOG } from './PowerCards/CardCatalog';
  import type { PowerCardData } from './PowerCards/types';
  import { PowerCardTray } from './PowerCards/PowerCardTray';

  export interface Survivor {
    id: string;
    name: string;
    initials: string;
    color: string;
    isYou?: boolean;
    lives: number;
  }

  // NEW: was a Multiple-Choice-only shape (options/answer). Now reuses the
  // same normalized BattleQuestion union AnswerInput expects, so every
  // question type (not just MCQ) carries its type-specific fields through.
  type RoyaleQuestion = BattleQuestion;

  // The server grades ROYALE answers by simple string equality between
  // optionKey and correctAnswer (see handlers/BattleRoyale.ts), so for the
  // AnswerInput-routed types we just need the correct answer's display text.
  function getCorrectAnswerText(question: RoyaleQuestion): string {
    switch (question.type) {
      case 'Multiple Choice':
        return question.options[question.correct] ?? '';
      case 'True / False':
        return question.correct ? 'True' : 'False';
      case 'Identification':
      case 'Short Answer':
        return question.acceptedAnswers[0] ?? '';
      case 'Numerical Input':
        return String(question.correctValue);
      case 'Mathematics':
        return question.correctExpression;
      default:
        return '';
    }
  }

  function stringifyAnswerValue(value: any): string {
    if (typeof value === 'boolean') return value ? 'True' : 'False';
    return String(value ?? '');
  }

  export interface BattleRoyaleProps {
    battleId?: string;
    initialStartingHp?: number;
    onLeaveBattle?: () => void;
    battleName?: string;
  }

  const OPTION_KEYS = ['A', 'B', 'C', 'D'];
  const DEFAULT_TIME_LIMIT = 20;

  function drawBattleCards(count: number): PowerCardData[] {
    return [...CARD_CATALOG].sort(() => Math.random() - 0.5).slice(0, count);
  }

  /**
   * No longer owns a WebSocket (useBattleSocket) — connection now lives in
   * BattleSocketProvider, mounted with mode="ROYALE" above this component
   * (and above whatever royale lobby renders it) so JOIN_ROYALE goes out on
   * the same socket the lobby already opened, instead of a second connection.
   *
   * All the message handling that used to live inside useBattleSocket's
   * onMessage callback is now a useEffect watching `lastMessage` from
   * context — same logic, same message types, just re-triggered whenever the
   * provider sees a new message instead of via a callback.
   */
  export function BattleRoyale({ battleId = '', initialStartingHp = 100, onLeaveBattle, battleName = 'Battle Royale' }: BattleRoyaleProps) {
    const { user, navigate } = useApp();
  const { send, lastMessage, questions: contextQuestions } = useBattleSocketContext();

    const [questions, setQuestions] = useState<RoyaleQuestion[]>([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const currentQuestion = questions[questionIndex];

    const [startedAt, setStartedAt] = useState<number | null>(null);
    const [timeLimit, setTimeLimit] = useState<number>(DEFAULT_TIME_LIMIT);
    const [timeLeft, setTimeLeft] = useState<number>(DEFAULT_TIME_LIMIT);
    const [powerCards] = useState<PowerCardData[]>(() => drawBattleCards(3));
    const [revealedPowerCards, setRevealedPowerCards] = useState<Set<string>>(() => new Set());

    const [startingHp, setStartingHp] = useState<number>(initialStartingHp);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [answerFeedback, setAnswerFeedback] = useState<boolean | null>(null);
    const [locked, setLocked] = useState(false);
    const [survivors, setSurvivors] = useState<Survivor[]>([]);
    const [eliminated, setEliminated] = useState(false);

    const [chatMessages, setChatMessages] = useState<BattleChatMessage[]>([]);

    const { studentName: myName, currentUserId: myId } = getStudentIdentity(user);

    function applyPlayers(players: any[]) {
      setSurvivors(
        players.filter((p) => p.id !== 'professor').map((p, idx) => ({
          id: p.id,
          name: p.id === myId ? myName : p.name || `Player ${idx + 1}`,
          initials: (p.initials || p.name || 'P').substring(0, 2).toUpperCase(),
          color: p.color || AVATAR_COLORS[idx % AVATAR_COLORS.length],
          isYou: p.id === myId,
          lives: p.lives ?? 0,
        }))
      );
    if (data.type === 'ROYALE_MATCH_ENDED') {
      if (Array.isArray(data.players)) applyPlayers(data.players);
    }

    function applyRoyaleQuestions(rawQuestions: unknown[]) {
      setQuestions(formatBattleQuestions(rawQuestions));
    }

    // Fallback loader only — real source of truth is always the WS payload.
  useEffect(() => {
    if (questions.length === 0 && contextQuestions.length > 0) {
      setQuestions(contextQuestions);
    }
  }, [contextQuestions, questions.length]);

    // Message routing — same logic as the old onMessage callback, now
    // reacting to the shared socket's lastMessage instead of owning the
    // connection itself.
    useEffect(() => {
      const data = lastMessage;
      if (!data) return;

      if (data.type === 'ROYALE_STATE_SYNC') {
        if (typeof data.startingHp === 'number') setStartingHp(data.startingHp);
        if (typeof data.questionIndex === 'number') setQuestionIndex(data.questionIndex);
        if (typeof data.startedAt === 'number') setStartedAt(data.startedAt);
        if (typeof data.timeLimit === 'number') setTimeLimit(data.timeLimit);
        if (Array.isArray(data.players)) applyPlayers(data.players);
        if (Array.isArray(data.questions) && data.questions.length > 0) {
          applyRoyaleQuestions(data.questions);
        }
      }

      // The server broadcasts this when its own timer fires (or once every
      // alive player has answered) — the only thing that should move the
      // whole match to the next question at once.
      if (data.type === 'ROYALE_QUESTION_ADVANCED') {
        setQuestionIndex(data.questionIndex);
        setStartedAt(data.startedAt);
        setTimeLimit(data.timeLimit);
        if (Array.isArray(data.players)) applyPlayers(data.players);
        setSelectedOption(null);
        setAnswerFeedback(null);
        setLocked(false);
      }

      if (data.type === 'ROYALE_HP_UPDATED') {
        if (Array.isArray(data.players)) applyPlayers(data.players);
        if (data.playerId === myId && data.isAlive === false) {
          setEliminated(true);
        }
        if (data.playerId === myId && typeof data.isCorrect === 'boolean') {
          setAnswerFeedback(data.isCorrect);
        }
      }

      if (data.type === 'ROYALE_MATCH_ENDED') {
        if (Array.isArray(data.players)) applyPlayers(data.players);
        navigate('results');
      }

      // Global chat — CHAT_MESSAGE is relayed to everyone in the room.
      if (data.type === 'CHAT_MESSAGE' && data.message) {
        setChatMessages((prev) => [
          ...prev,
          {
            id: `${data.userId || data.sender}-${data.timestamp || Date.now()}`,
            sender: data.sender || 'Anonymous',
            text: data.message,
            isMe: data.userId === myId,
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
      if (locked || eliminated || currentQuestion?.type !== 'Multiple Choice') return;
      setSelectedOption(optionKey);

      const opt = OPTION_KEYS.indexOf(optionKey);
      const answerText = currentQuestion.options[opt];
      setLocked(true);

      const correctAnswer = getCorrectAnswerText(currentQuestion);

      send({
        type: 'SUBMIT_ROYALE_ANSWER',
        battleId,
        playerData: { id: myId, name: myName },
        optionKey: answerText,
        correctAnswer,
      });
    };

    const handleAnswerInputSubmit = (value: any) => {
      if (locked || eliminated || !currentQuestion) return;
      const answerText = stringifyAnswerValue(value);
      setSelectedOption(answerText);
      setLocked(true);

      const correctAnswer = getCorrectAnswerText(currentQuestion);

      send({
        type: 'SUBMIT_ROYALE_ANSWER',
        battleId,
        playerData: { id: myId, name: myName },
        optionKey: answerText,
        correctAnswer,
      });
    };

    const activeSurvivorsCount = survivors.filter((s) => s.lives > 0).length;
    const me = survivors.find((s) => s.isYou);
    const myLives = me?.lives ?? startingHp;

    const handleSendChat = (text: string) => {
      send({
        type: 'CHAT_MESSAGE',
        battleId,
        sender: myName,
        userId: myId,
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
      ? currentQuestion.options.map((text, i) => ({
          key: OPTION_KEYS[i] || String(i),
          text,
          color: ['#A06AF6', '#FF6B4A', '#2ED47A', '#FFC93C'][i] || '#A06AF6',
        }))
      : [];

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
              <span className="text-white font-semibold">{battleName}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-40">
              <CountdownBar timeLeft={timeLeft} timeLimit={timeLimit} />
            </div>
            <div className="bg-[#FF4757]/15 border border-[#FF4757] px-3 py-1 rounded-full text-xs font-extrabold text-[#FF4757] flex items-center gap-1.5">
              <Skull size={14} /> {battleName.toUpperCase()}
            </div>
          </div>
        </header>

                        <PowerCardTray topClassName="top-60" />

                        
        {/* Main Grid */}
        <div className="flex-1 p-5 pl-5 lg:pl-44 grid grid-cols-[1fr_280px] gap-5 min-h-0">
          <div className="flex flex-col gap-4">
            {/* Round Header */}
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-lg">
                <span className="text-[10px] font-extrabold text-[#8F93A8] uppercase">QUESTION</span>
                <span className="text-base font-black">
                  {currentQuestion.number} / {currentQuestion.total}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-3xl font-black leading-none">{activeSurvivorsCount || survivors.length}</span>
                <span className="text-[9px] font-extrabold text-[#8F93A8] tracking-widest uppercase">
                  PLAYERS REMAINING
                </span>
              </div>

              <div className="flex items-center gap-1.5 bg-[#FF4757]/10 border border-[#FF4757]/30 px-3 py-1 rounded-xl">
                <span className="text-[10px] font-extrabold text-[#FF4757] uppercase">HP:</span>
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
              <h2 className="m-0 text-xl font-extrabold leading-snug">{currentQuestion.text}</h2>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-3">
              {eliminated ? (
                <div className="p-6 rounded-xl bg-[#FF4757]/10 border border-[#FF4757]/30 text-center font-bold text-[#FF4757]">
                  You've been eliminated. Spectating the rest of the match…
                </div>
              ) : isMultipleChoice ? (
                options.map((opt) => (
                  <div
                    key={opt.key}
                    onClick={() => handleSelectOption(opt.key)}
                    className={`p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-all border ${
                      selectedOption === opt.key
                        ? answerFeedback === true
                          ? 'bg-[#2ED47A]/20 border-[#2ED47A]'
                          : answerFeedback === false
                            ? 'bg-[#FF4757]/20 border-[#FF4757]'
                            : 'bg-white/10 border-indigo-500'
                        : 'bg-white/[0.03] border-white/10'
                    } ${locked ? 'pointer-events-none opacity-70' : ''}`}
                  >
                    <div
                      className="size-7 rounded-lg text-white flex items-center justify-center font-extrabold text-sm"
                      style={{ backgroundColor: opt.color }}
                    >
                      {opt.key}
                    </div>
                    <span className="font-bold text-base text-white/90">{opt.text}</span>
                  </div>
                ))
              ) : (
                <AnswerInput
                  key={currentQuestion.id}
                  question={currentQuestion}
                  disabled={locked}
                  revealed={false}
                  onSubmit={handleAnswerInputSubmit}
                />
              )}
            </div>
            {answerFeedback !== null && (
              <div className={`rounded-xl border px-4 py-3 text-center text-sm font-extrabold ${answerFeedback ? 'border-[#2ED47A]/40 bg-[#2ED47A]/10 text-[#2ED47A]' : 'border-[#FF4757]/40 bg-[#FF4757]/10 text-[#FF4757]'}`}>
                {answerFeedback ? 'Correct answer!' : 'Incorrect answer. You lost a life.'}
              </div>
            )}
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
                      <span className="text-[10px] text-[#8F93A8] font-bold">{s.name}</span>
                      <div className="flex gap-0.5">
                        <span className="text-[10px] font-black text-[#FF4757]">{s.lives} HP</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Global match chat — everyone in the room sees this, preset messages only. */}
            <div className="border-t border-white/10 pt-4">
              <BattleChat mode="preset" title="Match Chat" messages={chatMessages} onSend={handleSendChat} height={220} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default BattleRoyale;  