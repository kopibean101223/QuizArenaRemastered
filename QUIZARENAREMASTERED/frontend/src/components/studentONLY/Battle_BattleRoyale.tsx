  'use client';

  import React, { useState, useEffect, useRef } from 'react';
  import { Flame, Heart, Shield, Skull, Zap, ChevronRight, Sparkles } from 'lucide-react';
  import { useApp } from '../../context/AppContext';
  import {
    formatBattleQuestions,
    getStudentIdentity,
    AVATAR_COLORS,
  } from '@/lib/student/battle/useBattleConnection';
  import { getBaseRoyaleDamage } from '@/lib/student/battle/royaleScoring';
  import type { BattleQuestion } from '@/lib/student/battle/useBattleConnection';
  import { useBattleSocketContext } from '@/lib/student/battle/useBattleSocketProvider';
  import { CountdownBar } from './LiveBattleCOMPONENTONLY/CountdownBar';
  import { AnswerInput } from './battle/Answer_Input';
  import { BattleChat, BattleChatMessage } from './battle/BattleChat';
  import { PowerCard } from './PowerCards/PowerCard';
  import { BATTLE_ROYALE_CARDS, getCardById } from './PowerCards/CardCatalog';
  import type { PowerCardData } from './PowerCards/types';
  import { PowerCardTray } from './PowerCards/PowerCardTray';
  import { ChoosePowerUp } from './PowerCards/ChoosePowerUp';

  export interface Survivor {
    id: string;
    name: string;
    initials: string;
    color: string;
    isYou?: boolean;
    lives: number;
    score: number;
    shield: number;
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
      case 'Step-by-step Solution':
        return question.acceptedAnswers[0] ?? '';
      case 'Numerical Input':
        return question.correctAnswerText ?? String(question.correctValue);
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
  const DEFAULT_TIME_LIMIT = 60;

  function drawBattleCards(count: number): PowerCardData[] {
    return [...BATTLE_ROYALE_CARDS].sort(() => Math.random() - 0.5).slice(0, count);
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

    const [roundStartedAt, setRoundStartedAt] = useState<number | null>(null);
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
    const [cardEffect, setCardEffect] = useState<{ targetId: string; label: string } | null>(null);

    const [chatMessages, setChatMessages] = useState<BattleChatMessage[]>([]);
    const [playerStreak, setPlayerStreak] = useState(0);
    
    // Power-up card system states
    const [collectedPowerCards, setCollectedPowerCards] = useState<PowerCardData[]>([]);
    const [availablePowerChoices, setAvailablePowerChoices] = useState<PowerCardData[]>([]);
    const [showChoosePowerUP, setShowChoosePowerUP] = useState(false);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
    const [roundPhase, setRoundPhase] = useState<'powerup' | 'playing' | 'feedback'>('powerup');
    const [powerupDeadline, setPowerupDeadline] = useState<number | null>(null);
    const feedbackTimeoutRef = useRef<number | null>(null);
    const powerupTimeoutRef = useRef<number | null>(null);
    const timeoutHandledRef = useRef(false);
    const initializedBattleRef = useRef<string | null>(null);
    const synchronizedStartRef = useRef<number | null>(null);
    const serverRoundActiveRef = useRef(false);

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
        score: p.score ?? 0,
        shield: p.shield ?? 0,
      }))
    );
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
        if (typeof data.questionIndex === 'number' && initializedBattleRef.current !== battleId) setQuestionIndex(data.questionIndex);
        if (typeof data.timeLimit === 'number' && questions.length === 0) setTimeLimit(data.timeLimit);
        if (data.phase === 'round' && typeof data.startedAt === 'number') {
          serverRoundActiveRef.current = true;
          setRoundStartedAt(data.startedAt);
          setTimeLimit(60);
        }
        if (data.phase === 'powerup') {
          setRoundPhase('powerup');
          setPowerupDeadline(Number(data.phaseEndsAt) || null);
          const currentPlayer = data.players?.find((player: any) => player.id === myId);
          const shouldChoose = (currentPlayer?.correctAnswers ?? 0) > 0 && (currentPlayer.correctAnswers % 2 === 0);
          setAvailablePowerChoices(shouldChoose ? drawBattleCards(3) : []);
          setShowChoosePowerUP(true);
          if (data.questionIndex === 0) {
            setCollectedPowerCards([]);
          }
        }
        if (data.phase === 'feedback') setRoundPhase('feedback');
        if (Array.isArray(data.players)) applyPlayers(data.players);
        if (Array.isArray(data.questions) && data.questions.length > 0) {
          applyRoyaleQuestions(data.questions);
        }
        if (data.phase === 'powerup') setRoundPhase('powerup');
      }

      if (data.type === 'ROYALE_POWERUP_PHASE') {
        if (Array.isArray(data.players)) applyPlayers(data.players);
        const currentPlayer = data.players?.find((player: any) => player.id === myId);
        const shouldChoose = (currentPlayer?.correctAnswers ?? 0) > 0 && (currentPlayer.correctAnswers % 2 === 0);
        setRoundPhase('powerup');
        setPowerupDeadline(Number(data.phaseEndsAt) || null);
        if (data.questionIndex === 0) setCollectedPowerCards([]);
        setAvailablePowerChoices(shouldChoose ? drawBattleCards(3) : []);
        setShowChoosePowerUP(true);
      }

      if (data.type === 'ROYALE_ROUND_FEEDBACK') {
        setRoundPhase('feedback');
      }

      if (data.type === 'ROYALE_ROUND_STARTED') {
        if (typeof data.questionIndex === 'number') setQuestionIndex(data.questionIndex);
        if (typeof data.startedAt === 'number') {
          serverRoundActiveRef.current = true;
          synchronizedStartRef.current = data.startedAt;
          setRoundStartedAt(data.startedAt);
        }
        setTimeLimit(60);
        setSelectedOption(null);
        setAnswerFeedback(null);
        setLocked(false);
        setRoundPhase('playing');
        setPowerupDeadline(null);
        setShowChoosePowerUP(false);
        setAvailablePowerChoices([]);
      }

      if (data.type === 'BATTLE_ACTION' && data.action === 'USE_POWER_CARD' && data.userId !== myId) {
        const effectTargetId = data.targetId || data.userId;
        const usedCard = data.cardId ? getCardById(data.cardId.split('-')[0]) || getCardById(data.cardId) : undefined;
        if (usedCard?.effect.category === 'shield' && data.userId) {
          setSurvivors((previous) => previous.map((player) =>
            player.id === data.userId
              ? { ...player, shield: player.shield + Number(usedCard.effect.amount ?? 0) }
              : player
          ));
        }
        if (effectTargetId) {
          setCardEffect({ targetId: effectTargetId, label: data.cardId ? `used ${data.cardId}` : 'power card used' });
          window.setTimeout(() => setCardEffect(null), 1200);
        }
      }

      if (data.type === 'ROYALE_SHIELD_UPDATED' && data.playerId) {
        setSurvivors((previous) => previous.map((player) =>
          player.id === data.playerId ? { ...player, shield: Number(data.shield) || 0 } : player
        ));
      }

      if (data.type === 'ROYALE_HP_UPDATED') {
        if (Array.isArray(data.players)) applyPlayers(data.players);
        if (data.playerId === myId && data.isAlive === false) {
          setEliminated(true);
        }
        if (data.playerId === myId && typeof data.isCorrect === 'boolean') {
          setPlayerStreak((prev) => (data.isCorrect ? prev + 1 : 0));
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

    useEffect(() => {
      if (!currentQuestion) return;
      setTimeLimit(DEFAULT_TIME_LIMIT);
      setTimeLeft(DEFAULT_TIME_LIMIT);
      if (synchronizedStartRef.current !== null) {
        setRoundStartedAt(synchronizedStartRef.current);
      } else if (!serverRoundActiveRef.current) {
        setRoundStartedAt(null);
      }
      synchronizedStartRef.current = null;
      timeoutHandledRef.current = false;
      setRoundPhase((previous) => previous === 'powerup' ? previous : 'playing');
    }, [currentQuestion?.id, questionIndex]);

    useEffect(() => {
      if (!roundStartedAt || roundPhase === 'powerup') return;
      const tick = () => {
        const elapsedSeconds = Math.floor((Date.now() - roundStartedAt) / 1000);
        const left = Math.max(timeLimit - elapsedSeconds, 0);
        setTimeLeft(left);
      };
      tick();
      const interval = setInterval(tick, 1000);
      return () => clearInterval(interval);
    }, [roundStartedAt, timeLimit, roundPhase]);

    useEffect(() => {
      return () => {
        if (feedbackTimeoutRef.current) window.clearTimeout(feedbackTimeoutRef.current);
        if (powerupTimeoutRef.current) window.clearTimeout(powerupTimeoutRef.current);
      };
    }, []);

    const moveToNextQuestion = () => {
      setQuestionIndex((previous) => {
        const next = previous + 1;
        if (next >= questions.length) {
          navigate('results');
          return previous;
        }
        return next;
      });
      setSelectedOption(null);
      setAnswerFeedback(null);
      setLocked(false);
      setRoundPhase('playing');
    };

    const scheduleRoundTransition = (wasCorrect: boolean) => {
      setAnswerFeedback(wasCorrect);
      setRoundPhase('feedback');
    };

    useEffect(() => {
      if (timeLeft !== 0 || locked || eliminated || roundPhase !== 'playing' || !currentQuestion || timeoutHandledRef.current) return;
      timeoutHandledRef.current = true;
      setLocked(true);
      send({
        type: 'SUBMIT_ROYALE_ANSWER',
        battleId,
        playerData: { id: myId, name: myName },
        optionKey: '',
        correctAnswer: getCorrectAnswerText(currentQuestion),
        timeRemaining: 0,
        isTimeout: true,
      });
      scheduleRoundTransition(false);
    }, [timeLeft, locked, eliminated, roundPhase, currentQuestion?.id, battleId, myId, myName, send]);

    const handleSelectOption = (optionKey: string) => {
      if (locked || eliminated || currentQuestion?.type !== 'Multiple Choice') return;
      setSelectedOption(optionKey);

      const opt = OPTION_KEYS.indexOf(optionKey);
      const answerText = currentQuestion.options[opt];
      setLocked(true);

      const correctAnswer = getCorrectAnswerText(currentQuestion);
      const wasCorrect = answerText === correctAnswer;

      send({
        type: 'SUBMIT_ROYALE_ANSWER',
        battleId,
        playerData: { id: myId, name: myName },
        optionKey: answerText,
        correctAnswer,
        timeRemaining: timeLeft,
      });
      scheduleRoundTransition(wasCorrect);
    };

    const handleAnswerInputSubmit = (value: any) => {
      if (locked || eliminated || !currentQuestion) return;
      const answerText = stringifyAnswerValue(value);
      setSelectedOption(answerText);
      setLocked(true);

      const correctAnswer = getCorrectAnswerText(currentQuestion);
      const wasCorrect = answerText === correctAnswer;

      send({
        type: 'SUBMIT_ROYALE_ANSWER',
        battleId,
        playerData: { id: myId, name: myName },
        optionKey: answerText,
        correctAnswer,
        timeRemaining: timeLeft,
      });
      scheduleRoundTransition(wasCorrect);
    };

    const handleChoosePowerUP = (card: PowerCardData) => {
      setCollectedPowerCards((prev) => [...prev, { ...card, id: `${card.id}-${Date.now()}` }]);
      setShowChoosePowerUP(false);
      setAvailablePowerChoices([]);
      setCorrectAnswersCount(0);
    };

    const handleUsePowerCard = (card: PowerCardData, targetId?: string) => {
      send({
        type: 'BATTLE_ACTION',
        battleId,
        userId: myId,
        sender: myName,
        action: 'USE_POWER_CARD',
        mode: 'ROYALE',
        cardId: card.id,
        targetId,
        questionIndex,
        message: `used power card: ${card.name}`,
      });
      const amount = Number(card.effect.amount ?? 0);
      if (targetId && card.effect.category === 'damage') {
        setSurvivors((previous) => previous.map((player) =>
          player.id === targetId ? { ...player, lives: Math.max(0, player.lives - amount) } : player
        ));
        setCardEffect({ targetId, label: `-${amount} HP` });
        window.setTimeout(() => setCardEffect(null), 1200);
      } else if (card.effect.target === 'self' && card.effect.category === 'hp') {
        setSurvivors((previous) => previous.map((player) =>
          player.isYou ? { ...player, lives: Math.min(startingHp, player.lives + amount) } : player
        ));
        setCardEffect({ targetId: myId, label: `+${amount} HP` });
        window.setTimeout(() => setCardEffect(null), 1200);
      } else if (card.effect.target === 'self' && card.effect.category === 'shield') {
        setSurvivors((previous) => previous.map((player) =>
          player.isYou ? { ...player, shield: player.shield + amount } : player
        ));
        setCardEffect({ targetId: myId, label: `+${amount} HP shield` });
        window.setTimeout(() => setCardEffect(null), 1200);
      }
      setCollectedPowerCards((previous) => previous.filter((item) => item.id !== card.id));
    };

    const activeSurvivorsCount = survivors.filter((s) => s.lives > 0).length;
    const me = survivors.find((s) => s.isYou);
    const myLives = me?.lives ?? startingHp;
    const myScore = me?.score ?? 0;
    const currentQuestionBaseDamage = getBaseRoyaleDamage(currentQuestion?.number ?? questionIndex + 1, Math.max(questions.length, 1));

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
        <style>{`@keyframes royaleHit{0%,100%{transform:scale(1)}35%{transform:scale(1.22);filter:brightness(1.5)}}@keyframes royaleFlame{0%{opacity:0;transform:translateY(8px) scale(.5) rotate(-12deg)}35%{opacity:1;transform:translateY(-2px) scale(1.1) rotate(8deg)}100%{opacity:0;transform:translateY(-18px) scale(.8)}}@keyframes royaleDamage{0%{opacity:0;transform:translate(-50%,8px)}30%{opacity:1}100%{opacity:0;transform:translate(-50%,-18px)}}`}</style>
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

                        {!showChoosePowerUP && (
                          <PowerCardTray
                            cards={collectedPowerCards}
                            size="md"
                            phaseLocked={roundPhase === 'powerup'}
                            topClassName="top-60"
                            onCardUse={handleUsePowerCard}
                            targetOptions={survivors.filter((player) => !player.isYou && player.lives > 0).map((player) => ({ id: player.id, name: player.name }))}
                          />
                        )}

                        
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
              <div className="flex items-center gap-1.5 bg-[#FFC93C]/10 border border-[#FFC93C]/30 px-3 py-1 rounded-xl">
                <span className="text-[10px] font-extrabold text-[#FFC93C] uppercase">POINTS:</span>
                <span className="text-sm font-black text-white">{myScore.toLocaleString()}</span>
              </div>
            </div>

            {/* Question Box */}
            <div className="bg-[#FF4757]/10 border border-[#FF4757]/30 rounded-2xl p-6">
              <div className="flex gap-2 mb-3 flex-wrap">
                <span className="bg-[#FF4757]/20 text-[#FF4757] text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                  {currentQuestion.subject}
                </span>
                <span className="bg-[#FF4757]/20 text-[#FF4757] text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                  WRONG ANSWER = ELIMINATED
                </span>
                <span className="bg-[#5B3DF6]/20 text-[#B9A7FF] text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                  BASE DAMAGE: {currentQuestionBaseDamage}
                </span>
                <span className="bg-[#2ED47A]/15 text-[#7AF0B0] text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                  STREAK: {playerStreak}
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
          <div className="relative z-[110] bg-[#1C1F33] border border-white/10 rounded-2xl p-4 flex h-full min-h-0 flex-col gap-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-extrabold flex items-center gap-1.5">
                <Skull size={15} className="text-[#FF4757]" /> Survivors
              </span>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
              <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8F93A8]">Leaderboard</span>
                <span className="text-[10px] font-bold text-[#8F93A8]">POINTS</span>
              </div>
              <div className="flex flex-col gap-2">
              {survivors.length === 0 ? (
                <span className="text-xs text-white/30 italic">Waiting for players…</span>
              ) : (
                [...survivors].sort((a, b) => b.score - a.score).map((s, index) => {
                  const isDead = s.lives <= 0;
                  return (
                    <div
                      key={s.id}
                      className={`flex items-center gap-2 rounded-lg border border-white/5 px-2 py-2 ${isDead ? 'opacity-30' : 'opacity-100'}`}
                    >
                      <span className="w-4 text-center text-[10px] font-black text-[#8F93A8]">{index + 1}</span>
                      {s.isYou && (
                        <span className="text-[8px] font-black bg-[#FFC93C] text-black px-1 rounded absolute -top-2 z-10">
                          YOU
                        </span>
                      )}
                      <div
                        className={`size-8 rounded-full flex items-center justify-center font-extrabold text-xs text-white border-2 border-white/10 relative ${cardEffect?.targetId === s.id ? 'animate-[royaleHit_700ms_ease-in-out]' : ''}`}
                        style={{ backgroundColor: s.color }}
                      >
                        {isDead ? <Skull size={18} /> : s.initials}
                        {isDead && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="h-[2px] w-full bg-red-500 rotate-45 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.9)]" />
                          </div>
                        )}
                        {cardEffect?.targetId === s.id && (
                          <>
                            <span className="pointer-events-none absolute -right-3 -top-3 text-[#FF8A3D] animate-[royaleFlame_900ms_ease-out]">
                              <Flame size={22} fill="currentColor" />
                            </span>
                            <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-black text-[#FFC93C] animate-[royaleDamage_900ms_ease-out]">
                              {cardEffect.label}
                            </span>
                          </>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block truncate text-[10px] text-white font-bold">{s.name}</span>
                        <span className="flex items-center gap-1 text-[10px] font-black text-[#FF4757]" title={`${s.lives} HP`}>
                          <Heart size={11} fill="currentColor" strokeWidth={2.5} /> {s.lives}
                          {s.shield > 0 && (
                            <span className="flex items-center gap-0.5 text-[#4DA3FF]" title={`${s.shield} HP shield`}>
                              <Shield size={10} /> {s.shield}
                            </span>
                          )}
                        </span>
                      </div>
                      <span className="text-sm font-black text-[#FFC93C]">{s.score.toLocaleString()}</span>
                    </div>
                  );
                })
              )}
              </div>
            </div>

            {/* Global match chat — everyone in the room sees this, preset messages only. */}
            <div className="mt-auto flex-shrink-0 border-t border-white/10 pt-4">
              <BattleChat mode="preset" title="Match Chat" messages={chatMessages} onSend={handleSendChat} height={220} />
            </div>
          </div>
        </div>

        {/* Choose Power-Up Modal */}
        {showChoosePowerUP && (
          <ChoosePowerUp
            drawnCards={availablePowerChoices}
            deadline={powerupDeadline}
            onTimeout={handleChoosePowerUP}
            onSelectCard={handleChoosePowerUP}
            emptyMessage="There is no powerup available"
          />
        )}
      </div>
    );
    }
  
  export default BattleRoyale;  