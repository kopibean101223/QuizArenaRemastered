'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  Check, ChevronRight, CircleHelp, Clock3, Grid3X3,
  RefreshCcw, Send as SendIcon, Shield, Trophy, X, Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getStudentIdentity } from '@/lib/student/battle/useBattleConnection';
import { useBattleSocketContext } from '@/lib/student/battle/useBattleSocketProvider';
import { CountdownBar } from './LiveBattleCOMPONENTONLY/CountdownBar';
import { BattleChat, BattleChatMessage } from './battle/BattleChat';
import { PowerCard } from './PowerCards/PowerCard';
import type { PowerCardData } from './PowerCards/types';

type CellStatus = 'unanswered' | 'correct' | 'wrong';
type BingoCell = { value: number; status: CellStatus };
type BingoPlayer = { id: string; name: string; initials?: string; color?: string; wins?: number; stealBuffs?: number; retakeBuffs?: number; bingo?: boolean };
type BingoQuestion = { id?: string | number; text?: string; question?: string; answer?: string; choices?: string[]; options?: string[] };

// Approximate per-phase durations, only used to drive the header progress
// bar — the server is still the source of truth for phaseSeconds itself.
const PHASE_DURATIONS: Record<string, number> = {
  rolling: 5,
  question: 15,
  stealing: 10,
  retake: 15,
};

function bingoLetter(value: number) {
  if (value <= 15) return 'B';
  if (value <= 30) return 'I';
  if (value <= 45) return 'N';
  if (value <= 60) return 'G';
  return 'O';
}

function normalizeCells(raw: unknown): BingoCell[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((cell: any) => ({
    value: Number(cell?.value ?? cell),
    status: cell?.status === 'correct' || cell?.status === 'wrong' ? cell.status : 'unanswered',
  })).filter((cell) => Number.isFinite(cell.value));
}

export function BattleBingo({ battleId }: { battleId: string }) {
  const { user, navigate } = useApp();
  const { send, lastMessage, lastBingoState } = useBattleSocketContext();
  const { studentName, currentUserId } = getStudentIdentity(user);

  const [cells, setCells] = useState<BingoCell[]>([]);
  const [players, setPlayers] = useState<BingoPlayer[]>([]);
  const [round, setRound] = useState(0);
  const [phase, setPhase] = useState('rolling');
  const [phaseSeconds, setPhaseSeconds] = useState(0);
  const [rolledNumber, setRolledNumber] = useState<number | null>(null);
  const [eligiblePlayerIds, setEligiblePlayerIds] = useState<string[]>([]);
  const [question, setQuestion] = useState<BingoQuestion | null>(null);
  const [answer, setAnswer] = useState('');
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(null);
  const [answerFeedback, setAnswerFeedback] = useState<boolean | null>(null);
  const [calledNumbers, setCalledNumbers] = useState<number[]>([]);
  const [chatMessages, setChatMessages] = useState<BattleChatMessage[]>([]);
  const [targetId, setTargetId] = useState('');
  const [discardValue, setDiscardValue] = useState('');
  const [retakeValue, setRetakeValue] = useState('');
  const [winner, setWinner] = useState<BingoPlayer | null>(null);
  const [retakeStarted, setRetakeStarted] = useState(false);   // ADD
  const [retakeUsed, setRetakeUsed] = useState(false);          // ADD
  const [retakeChoiceIndex, setRetakeChoiceIndex] = useState<number | null>(null); // ADD

  const me = players.find((player) => player.id === currentUserId);
  const currentQuestionText = question?.text || question?.question || '';
  const questionChoices = (question?.choices || question?.options || []).map((choice: any) =>
    typeof choice === 'string' ? choice : choice?.text || choice?.label || choice?.value || String(choice)
  );

  const buffCards: PowerCardData[] = [
    ...Array.from({ length: (me?.stealBuffs || 0) }, (_, i) => ({
      id: `steal-${i}`,
      category: 'shield' as const,
      name: 'Steal',
      description: 'Blindly swap a number with another player.',
      cost: 0,
      rarity: 'rare' as const,
      effect: { category: 'shield' as const, target: 'enemy' as const },
    })),
    ...Array.from({ length: (me?.retakeBuffs || 0)}, (_, i ) => ({
      id: `retake-${i}`,
      category: 'hp' as const,
      name: 'Retake',
      description: 'Recover one of your incorrect numbers.',
      cost: 0,
      rarity: 'rare' as const,
      effect: { category: 'hp' as const, target: 'self' as const },
    })),
  ];
  
  const bingoProgress = useMemo(() => {
    const green = new Set(cells.filter((cell) => cell.status === 'correct').map((cell) => cell.value));
    const lines = [
      [0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14], [15, 16, 17, 18, 19], [20, 21, 22, 23, 24],
      [0, 5, 10, 15, 20], [1, 6, 11, 16, 21], [2, 7, 12, 17, 22], [3, 8, 13, 18, 23], [4, 9, 14, 19, 24],
      [0, 6, 12, 18, 24], [4, 8, 12, 16, 20],
    ];
    return lines.filter((line) => line.every((index) => cells[index] && green.has(cells[index].value))).length;
  }, [cells]);

  function applyBingoState(state: any) {
    if (!state || state.battleId !== battleId) return;
    if (state.playerId === currentUserId || state.playerId === undefined) {
      const own = state.self || state.player;
      if (own?.card) setCells(normalizeCells(own.card));
    }
    if (Array.isArray(state.players)) setPlayers(state.players);
    if (Array.isArray(state.calledNumbers)) setCalledNumbers(state.calledNumbers);
    if (typeof state.round === 'number') setRound(state.round);
    if (state.phase) setPhase(state.phase);
    const phaseEndsAt = Number(state.phaseEndsAt || 0);
    if (phaseEndsAt > 0) setPhaseSeconds(Math.max(0, Math.ceil((phaseEndsAt - Date.now()) / 1000)));
    else if (typeof state.phaseSeconds === 'number') setPhaseSeconds(state.phaseSeconds);
    if (typeof state.rolledNumber === 'number') setRolledNumber(state.rolledNumber);
    if (Array.isArray(state.eligiblePlayerIds)) setEligiblePlayerIds(state.eligiblePlayerIds);
    if (state.question) setQuestion(state.question);
  }

  useEffect(() => {
    const data = lastMessage;
    if (!data || data.battleId !== battleId) {
      applyBingoState(lastBingoState);
      return;
    }

    if (data.type === 'BINGO_STATE_SYNC') applyBingoState(data);
    else applyBingoState(lastBingoState);

    if (data.type === 'BINGO_ANSWER_RESULT' && data.playerId === currentUserId) {
      setAnswerFeedback(Boolean(data.isCorrect));
      setCells(normalizeCells(data.card));
      setAnswer('');
      setSelectedChoiceIndex(null);
    }
    if (data.type === 'BINGO_MATCH_ENDED') {
      setWinner(data.winner || null);
      setPhase('finished');
    }
    // FIX: carry userId through so the chat panel can tell "You" apart
    // from everyone else, matching how the other battle modes tag isMe.
    if (data.type === 'BINGO_CHAT') {
      setChatMessages((previous) => [
        ...previous,
        {
          id: `${data.userId || data.sender}-${data.timestamp || Date.now()}`,
          sender: data.sender || 'Player',
          text: data.message,
          isMe: data.userId === currentUserId,
        },
      ]);
    }
  }, [lastMessage, lastBingoState, battleId, currentUserId]);

  useEffect(() => {
    if (phaseSeconds <= 0) return;
    const timer = window.setInterval(() => setPhaseSeconds((seconds) => Math.max(0, seconds - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [phaseSeconds]);

  useEffect(() => {
    setAnswer('');
    setSelectedChoiceIndex(null);
    setAnswerFeedback(null);
  }, [round, rolledNumber]);

  // One retake attempt per retake phase — re-arm everything the moment a
  // new retake phase starts, and lock it the instant useRetake() fires.
  useEffect(() => {
    if (phase === 'retake') {
      setRetakeStarted(false);
      setRetakeUsed(false);
      setRetakeChoiceIndex(null);
      setRetakeValue('');
      setAnswer('');
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== 'finished' || !winner) return;
    if (winner.id === currentUserId) return;
    const timer = window.setTimeout(() => navigate('results'), 2500);
    return () => window.clearTimeout(timer);
  }, [phase, winner, currentUserId, navigate]);

  function submitAnswer(event?: FormEvent) {
    event?.preventDefault();
    if (phase !== 'question' || !currentQuestionText || !eligiblePlayerIds.includes(currentUserId)) return;
    send({ type: 'SUBMIT_BINGO_ANSWER', mode: 'BINGO', battleId, answer });
  }

  function useSteal() {
    if (!targetId || !discardValue || phase !== 'stealing') return;
    send({ type: 'USE_BINGO_STEAL', mode: 'BINGO', battleId, targetUserId: targetId, discardValue: Number(discardValue) });
    setTargetId('');
    setDiscardValue('');
  }

    function useRetake() {
    if (phase !== 'retake' || !answer || retakeUsed) return;
    send({ type: 'USE_BINGO_RETAKE', mode: 'BINGO', battleId, answer, retakeValue: Number(retakeValue) });
    setRetakeUsed(true);
  }

  function handleSendChat(text: string) {
    send({ type: 'BINGO_CHAT', mode: 'BINGO', battleId, sender: studentName, userId: currentUserId, message: text });
  }

  if (phase === 'finished') {
    return (
      <div className="min-h-screen bg-[#131524] text-white flex flex-col items-center justify-center gap-3 font-sans">
        <Trophy size={56} className="text-[#FFC93C]" />
        <h1 className="text-2xl font-black">
          {winner?.id === currentUserId ? 'Bingo! You won!' : `${winner?.name || 'A player'} won Bingo!`}
        </h1>
        <p className="text-sm text-[#8F93A8]">The match is complete. Redirecting to results…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#131524] text-white flex flex-col font-sans">
      {/* Header Bar — same shell as every other battle mode */}
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
            <span className="text-white font-semibold">Bingo Battle</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-40">
            <CountdownBar timeLeft={phaseSeconds} timeLimit={PHASE_DURATIONS[phase] ?? Math.max(phaseSeconds, 1)} />
          </div>
          <div className="bg-[#5B3DF6]/15 border border-[#5B3DF6] px-3 py-1 rounded-full text-xs font-extrabold text-[#A98CFF] flex items-center gap-1.5">
            <Grid3X3 size={14} /> {phase.toUpperCase()}
          </div>
        </div>
      </header>

      {buffCards.length > 0 && (
        <div className="fixed left-[30px] top-60 z-30">
          <div className="relative flex h-44 w-64 items-center">
            {buffCards.map((card, index) => {
              const mid = (buffCards.length - 1) / 2;
              return (
                <div
                  key={card.id}
                  className="absolute left-0 top-1/2 transition-all duration-500"
                  style={{
                    transform: `translateY(-50%) rotate(${90 + (index - mid) * 12}deg) translateX(${index * 20}px)`,
                    transformOrigin: 'left center',
                    zIndex: buffCards.length - index,
                  }}
                >
                  <PowerCard card={card} state="revealed" size="md" />
                </div>
              );
            })}
          </div>
        </div>
      )}


      {/* Main Grid — same two-column shape as Royale/TeamMode */}
      <div className="flex-1 p-5 pl-5 lg:pl-44 grid grid-cols-[1fr_280px] gap-5 min-h-0">
        <div className="flex flex-col gap-4">
          {/* Round row */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-lg">
              <span className="text-[10px] font-extrabold text-[#8F93A8] uppercase">ROUND</span>
              <span className="text-base font-black">{round || 1}</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-3xl font-black leading-none">
                {rolledNumber ? `${bingoLetter(rolledNumber)}-${rolledNumber}` : '--'}
              </span>
              <span className="text-[9px] font-extrabold text-[#8F93A8] tracking-widest uppercase">
                CURRENT DRAW
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#2ED47A]/10 border border-[#2ED47A]/30 px-3 py-1 rounded-xl">
              <span className="text-[10px] font-extrabold text-[#2ED47A] uppercase">LINES:</span>
              <span className="text-sm font-black text-white">{bingoProgress} / 1</span>
            </div>
          </div>

          {/* Called numbers strip */}
          <div className="bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 flex items-center gap-2 overflow-x-auto">
            <span className="text-[10px] font-extrabold text-[#8F93A8] uppercase flex-shrink-0">Called</span>
            {calledNumbers.length ? (
              calledNumbers.map((n) => (
                <span key={n} className="flex-shrink-0 bg-black/20 border border-white/10 rounded-lg px-2 py-1 text-xs font-bold">
                  {bingoLetter(n)}-{n}
                </span>
              ))
            ) : (
              <span className="text-xs text-white/30 italic">Waiting for the first draw…</span>
            )}
          </div>

          {/* Bingo Board — takes the visual slot the "Question Box" fills in Royale */}
                    <div className="bg-[#5B3DF6]/10 border border-[#5B3DF6]/30 rounded-2xl p-4">
            <div className="flex gap-2 mb-2">
              <span className="bg-[#5B3DF6]/20 text-[#A98CFF] text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                Your Board
              </span>
              <span className="bg-[#5B3DF6]/20 text-[#A98CFF] text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                First to five in a row
              </span>
            </div>

            <div className="max-w-[300px] mx-auto">
              <div className="grid grid-cols-5 gap-1 mb-1.5 text-center">
                {['B', 'I', 'N', 'G', 'O'].map((letter, i) => (
                  <span
                    key={letter}
                    className="text-xs font-black"
                    style={{ color: ['#5bc8f6', '#2ed47a', '#ffc93c', '#ff9f40', '#ff6b4a'][i] }}
                  >
                    {letter}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-5 gap-1">
                {cells.length === 25 ? (
                  cells.map((cell) => {
                    const isCurrent = cell.value === rolledNumber;
                    return (
                      <div
                        key={cell.value}
                        className={`aspect-square rounded-md flex items-center justify-center relative font-black text-xs border ${
                          cell.status === 'correct'
                            ? 'bg-[#2ED47A]/20 border-[#2ED47A] text-[#2ED47A]'
                            : cell.status === 'wrong'
                              ? 'bg-[#FF4757]/15 border-[#FF4757]/50 text-white/60'
                              : isCurrent
                                ? 'bg-[#FFC93C]/10 border-[#FFC93C] text-[#FFC93C]'
                                : 'bg-white/[0.03] border-white/10 text-white/80'
                        }`}
                      >
                        {cell.value}
                        {cell.status === 'correct' && <Check size={10} className="absolute top-0.5 right-0.5" />}
                        {cell.status === 'wrong' && <X size={10} className="absolute top-0.5 right-0.5" />}
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-5 py-8 text-center text-white/40 text-xs">Your board is syncing…</div>
                )}
              </div>
            </div>
          </div>

          {/* Phase-driven action area — same visual slot as the "Options" section in Royale */}
          {phase === 'question' && (
            <div className="flex flex-col gap-3">
              <div className="bg-[#1C1F33] border border-white/10 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-extrabold text-[#8F93A8] uppercase">
                    Question for {rolledNumber ? `${bingoLetter(rolledNumber)}-${rolledNumber}` : 'your number'}
                  </span>
                  <Clock3 size={16} className="text-[#8F93A8]" />
                </div>
                <h2 className="m-0 text-lg font-extrabold leading-snug mb-4">
                  {eligiblePlayerIds.includes(currentUserId)
                    ? currentQuestionText || 'Loading question…'
                    : 'You do not own the drawn number'}
                </h2>

                {eligiblePlayerIds.includes(currentUserId) && currentQuestionText && (
                  <form onSubmit={submitAnswer} className="flex flex-col gap-3">
                    {questionChoices.length > 0 ? (
                      questionChoices.map((choice, index) => (
                        <div
                          key={`${choice}-${index}`}
                          onClick={() => { setAnswer(choice); setSelectedChoiceIndex(index); setAnswerFeedback(null); }}
                          className={`p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-all border ${
                            selectedChoiceIndex === index
                              ? 'bg-white/10 border-[#5B3DF6]'
                              : 'bg-white/[0.03] border-white/10'
                          }`}
                        >
                          <span className="font-bold text-base text-white/90">{choice}</span>
                        </div>
                      ))
                    ) : (
                      <input
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Type your answer"
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-semibold text-white outline-none focus:border-[#5B3DF6]"
                      />
                    )}
                    <button
                      type="submit"
                      disabled={!answer}
                      className="bg-[#5B3DF6] disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold py-3 rounded-xl flex items-center justify-center gap-2"
                    >
                      <Zap size={16} /> Submit answer
                    </button>
                  </form>
                )}
              </div>

              {answerFeedback !== null && (
                <div className={`rounded-xl border px-4 py-3 text-center text-sm font-extrabold ${
                  answerFeedback
                    ? 'border-[#2ED47A]/40 bg-[#2ED47A]/10 text-[#2ED47A]'
                    : 'border-[#FF4757]/40 bg-[#FF4757]/10 text-[#FF4757]'
                }`}>
                  {answerFeedback ? 'Correct! Your number is green.' : 'Incorrect. Your number stays red.'}
                </div>
              )}
            </div>
          )}

          {phase === 'stealing' && (
            <div className="bg-[#1C1F33] border border-white/10 rounded-2xl p-5">
              <span className="text-[10px] font-extrabold text-[#8F93A8] uppercase">10-second steal phase</span>
              <h2 className="m-0 mt-1 mb-1 text-lg font-extrabold">Swap with a fellow player</h2>
              <p className="text-xs text-white/50 mb-4">
                Choose a target blindly. If they own the drawn number, your selected number is exchanged.
              </p>
              <div className="flex flex-wrap gap-2">
                <select
                  value={targetId}
                  onChange={(e) => setTargetId(e.target.value)}
                  className="flex-1 min-w-[150px] bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                >
                  <option value="">Choose target</option>
                  {players.filter((p) => p.id !== currentUserId).map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                <select
                  value={discardValue}
                  onChange={(e) => setDiscardValue(e.target.value)}
                  className="flex-1 min-w-[150px] bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                >
                  <option value="">Discard one of yours</option>
                  {cells.map((cell) => (
                    <option key={cell.value} value={cell.value}>{bingoLetter(cell.value)}-{cell.value}</option>
                  ))}
                </select>
                <button
                  onClick={useSteal}
                  disabled={!targetId || !discardValue}
                  className="bg-[#4DA3FF] disabled:opacity-40 disabled:cursor-not-allowed text-black font-extrabold px-4 py-2 rounded-xl flex items-center gap-2"
                >
                  <Shield size={16} /> Use Steal ({me?.stealBuffs || 0})
                </button>
              </div>
            </div>
          )}

                   {phase === 'retake' && (
            <div className="bg-[#1C1F33] border border-white/10 rounded-2xl p-5">
              <span className="text-[10px] font-extrabold text-[#8F93A8] uppercase">Retake phase</span>
              <h2 className="m-0 mt-1 mb-1 text-lg font-extrabold">Recover a red answer</h2>
              <p className="text-xs text-white/50 mb-4">
                {retakeUsed
                  ? 'You already used your retake this phase.'
                  : 'Use one Retake Buff on an incorrect number.'}
              </p>

              {!retakeStarted ? (
                <div className="flex flex-wrap gap-2">
                  <select
                    value={retakeValue}
                    onChange={(e) => setRetakeValue(e.target.value)}
                    disabled={retakeUsed || (me?.retakeBuffs || 0) <= 0}
                    className="flex-1 min-w-[150px] bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white disabled:opacity-40"
                  >
                    <option value="">Choose a red number</option>
                    {cells.filter((cell) => cell.status === 'wrong').map((cell) => (
                      <option key={cell.value} value={cell.value}>{bingoLetter(cell.value)}-{cell.value}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setRetakeStarted(true)}
                    disabled={retakeUsed || !retakeValue || (me?.retakeBuffs || 0) <= 0}
                    className="bg-[#2ED47A] disabled:opacity-40 disabled:cursor-not-allowed text-black font-extrabold px-4 py-2 rounded-xl flex items-center gap-2"
                  >
                    <RefreshCcw size={16} /> Retake ({me?.retakeBuffs || 0})
                  </button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); useRetake(); }} className="flex flex-col gap-3">
                  <div className="text-xs text-white/50">
                    Retaking <strong className="text-white">{bingoLetter(Number(retakeValue))}-{retakeValue}</strong>
                  </div>

                  <h3 className="m-0 text-base font-extrabold leading-snug">
                    {currentQuestionText || 'Loading question…'}
                  </h3>

                  {questionChoices.length > 0 ? (
                    questionChoices.map((choice, index) => (
                      <div
                        key={`${choice}-${index}`}
                        onClick={() => {
                          if (retakeUsed) return;
                          setAnswer(choice);
                          setRetakeChoiceIndex(index);
                        }}
                        className={`p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-all border ${
                          retakeChoiceIndex === index
                            ? 'bg-white/10 border-[#2ED47A]'
                            : 'bg-white/[0.03] border-white/10'
                        } ${retakeUsed ? 'pointer-events-none opacity-60' : ''}`}
                      >
                        <span className="font-bold text-base text-white/90">{choice}</span>
                      </div>
                    ))
                  ) : (
                    <input
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Answer the retake question"
                      disabled={retakeUsed}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-semibold text-white outline-none focus:border-[#2ED47A] disabled:opacity-40"
                    />
                  )}

                  <button
                    type="submit"
                    disabled={!answer || retakeUsed}
                    className="bg-[#2ED47A] disabled:opacity-40 disabled:cursor-not-allowed text-black font-extrabold py-3 rounded-xl flex items-center justify-center gap-2"
                  >
                    <RefreshCcw size={16} /> Submit retake answer
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Right Sidebar — same shell as Royale's Survivors panel */}
        <div className="bg-[#1C1F33] border border-white/10 rounded-2xl p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-extrabold flex items-center gap-1.5">
              <Trophy size={15} className="text-[#FFC93C]" /> Standings
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {players.length === 0 ? (
              <span className="text-xs text-white/30 italic">Waiting for players…</span>
            ) : (
              [...players].sort((a, b) => (b.wins || 0) - (a.wins || 0)).map((p, idx) => (
                <div
                  key={p.id}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-lg ${
                    p.id === currentUserId ? 'bg-[#5B3DF6]/10 border border-[#5B3DF6]/30' : ''
                  }`}
                >
                  <span className="text-[10px] font-black text-[#8F93A8] w-4">#{idx + 1}</span>
                  <div
                    className="size-7 rounded-full flex items-center justify-center font-extrabold text-[10px] text-white flex-shrink-0"
                    style={{ backgroundColor: p.color || '#5B3DF6' }}
                  >
                    {p.initials || p.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="text-xs font-bold flex-1 truncate">{p.name}</span>
                  <span className="text-xs font-black text-[#FFC93C]">{p.wins || 0}</span>
                </div>
              ))
            )}
          </div>

          {/* Buffs — Bingo's own steal/retake economy, shown in the same
              visual weight the other modes give HP/points */}
          {/* Global match chat — reuses the same BattleChat component as
              Royale/LiveQuiz/TeamMode instead of Bingo's old bespoke form */}
          <div className="border-t border-white/10 pt-4">
            <BattleChat mode="free" title="Match Chat" messages={chatMessages} onSend={handleSendChat} height={220} placeholder="Say something…" />
          </div>

          <div className="flex items-start gap-2 text-[11px] text-white/40 leading-relaxed">
            <CircleHelp size={14} className="flex-shrink-0 mt-0.5" />
            <span>Every 2 wins grants a random buff. Retakes open every 3 rounds.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BattleBingo;