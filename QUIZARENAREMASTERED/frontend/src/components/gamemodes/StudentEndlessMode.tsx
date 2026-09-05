'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CheckpointCard } from './CheckpointCard';
import { Zap, Heart, Flag, Shield, Flame, AlertTriangle } from 'lucide-react';
import { cn } from '@/components/ui/utils';
import { StreakRewardCard } from './StreakRewardCard';
import { useBattleSocketContext } from '@/lib/student/battle/useBattleSocketProvider';
import { CountdownDisplay } from '../studentONLY/ComponentsLobby/CountdownDisplay';

const OPTION_COLORS = [
  { base: 'bg-[var(--gm-indigo)]', border: 'border-[var(--gm-indigo)]', light: 'bg-[var(--gm-indigo)]/20', text: 'text-[var(--gm-indigo)]', glow: 'shadow-[0_8px_24px_rgba(91,61,246,0.5)]' },
  { base: 'bg-[var(--gm-coral)]', border: 'border-[var(--gm-coral)]', light: 'bg-[var(--gm-coral)]/20', text: 'text-[var(--gm-coral)]', glow: 'shadow-[0_8px_24px_rgba(255,107,74,0.5)]' },
  { base: 'bg-[var(--gm-green)]', border: 'border-[var(--gm-green)]', light: 'bg-[var(--gm-green)]/20', text: 'text-[var(--gm-green)]', glow: 'shadow-[0_8px_24px_rgba(46,212,122,0.5)]' },
  { base: 'bg-[var(--gm-yellow)]', border: 'border-[var(--gm-yellow)]', light: 'bg-[var(--gm-yellow)]/20', text: 'text-[var(--gm-yellow)]', glow: 'shadow-[0_8px_24px_rgba(255,201,60,0.5)]' },
];

const POWER_UP_SLOTS = [
  { id: 'shield', name: 'Shield', icon: '🛡️' },
  { id: 'double', name: 'Double Points', icon: '⚡' },
  { id: 'freeze', name: 'Time Freeze', icon: '❄️' },
];

const CHECKPOINT_INTERVAL = 5;

interface StudentEndlessModeProps {
  currentStage?: number;
  lives?: number;
  score?: number;
  currentQuestion?: any;
  onAnswer?: (choice: string) => void;
  showCheckpoint?: boolean;
  onContinueCheckpoint?: (selectedPowerup?: string) => void;
  sessionId?: string;
}

export function StudentEndlessMode({
  currentStage = 1,
  score: initialScore = 0,
  currentQuestion: propQuestion = null,
  onAnswer,
  sessionId,
}: StudentEndlessModeProps) {
  const socketCtx = useBattleSocketContext();
  const lastMessage = socketCtx?.lastMessage;

  // Server Authoritative States
  const [stage, setStage] = useState(currentStage);
  const [score, setScore] = useState(initialScore);
  const [hp, setHp] = useState(100);
  const [maxHp] = useState(100);
  const [combo, setCombo] = useState(0);
  const [isAlive, setIsAlive] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameOverReason, setGameOverReason] = useState<string | null>(null);

  // Question & Answer States
  const [activeQuestion, setActiveQuestion] = useState<any>(propQuestion);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [lastVerdict, setLastVerdict] = useState<{ isCorrect: boolean; answer: string } | null>(null);

  // Storm / Hazard States
  const [zone, setZone] = useState<'SAFE' | 'HAZARD'>('SAFE');
  const [safeZoneEndsAt, setSafeZoneEndsAt] = useState<number>(Date.now() + 20_000);
  const [questionEndsAt, setQuestionEndsAt] = useState<number>(Date.now() + 30_000);
  const [safeDurationSeconds, setSafeDurationSeconds] = useState(20);
  const [timeRemaining, setTimeRemaining] = useState(20);
  const [isStormFlashing, setIsStormFlashing] = useState(false);
  const [hazardDamagePop, setHazardDamagePop] = useState(false);

  // Checkpoint & Powerup States
  const [showCheckpoint, setShowCheckpoint] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showStreakCard, setShowStreakCard] = useState(false);
  const [comboPop, setComboPop] = useState(false);

  const [powerUpStates, setPowerUpStates] = useState(
    POWER_UP_SLOTS.map(() => ({ ready: true, cooldown: 0 }))
  );

  // Parse raw question choices
  const parseChoices = (rawChoices: any) => {
    if (!Array.isArray(rawChoices)) return [];
    return rawChoices.map((c: any) =>
      typeof c === 'object' && c !== null ? (c.text || c.label || String(c)) : String(c)
    );
  };

  // 1. Initial State Sync via Socket on connect
  useEffect(() => {
    if (socketCtx?.send && sessionId && isAlive) {
      socketCtx.send({
        type: 'JOIN_BATTLE',
        battleId: sessionId,
        mode: 'ENDLESS',
        userId: socketCtx.userId,
        sender: socketCtx.userName || 'Student',
      });
    }
  }, [sessionId, socketCtx?.userId]);

  // 2. Continuous countdown calculation based on authoritative timestamps
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const currentZone = now < safeZoneEndsAt ? 'SAFE' : 'HAZARD';
      setZone(currentZone);

      if (currentZone === 'SAFE') {
        const remainingSec = Math.max(0, (safeZoneEndsAt - now) / 1000);
        setTimeRemaining(remainingSec);
      } else {
        const remainingTotal = Math.max(0, (questionEndsAt - now) / 1000);
        setTimeRemaining(remainingTotal);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [safeZoneEndsAt, questionEndsAt]);

  // 3. Socket Event Handling (Authoritative Updates)
  useEffect(() => {
    if (!lastMessage) return;

    switch (lastMessage.type) {
      case 'ENDLESS_STATE_SYNC': {
        if (lastMessage.stage !== undefined) setStage(lastMessage.stage);
        if (lastMessage.currentIndex !== undefined) setQuestionIndex(lastMessage.currentIndex);
        if (lastMessage.safeZoneEndsAt) setSafeZoneEndsAt(lastMessage.safeZoneEndsAt);
        if (lastMessage.questionEndsAt) setQuestionEndsAt(lastMessage.questionEndsAt);
        if (lastMessage.safeZoneDuration) setSafeDurationSeconds(lastMessage.safeZoneDuration);
        if (lastMessage.zone) setZone(lastMessage.zone);
        if (lastMessage.currentQuestion) {
          setActiveQuestion({
            ...lastMessage.currentQuestion,
            choices: parseChoices(lastMessage.currentQuestion.choices || lastMessage.currentQuestion.options),
          });
        }
        if (lastMessage.player) {
          setHp(lastMessage.player.hp ?? 100);
          setScore(lastMessage.player.score ?? 0);
          setCombo(lastMessage.player.combo ?? 0);
          setIsAlive(lastMessage.player.isAlive ?? true);
          if (lastMessage.player.isAlive === false || lastMessage.player.hp <= 0) {
            setIsGameOver(true);
            setGameOverReason('ELIMINATED');
          }
        }
        if (lastMessage.status === 'completed') {
          setIsGameOver(true);
          setGameOverReason('MATCH_COMPLETED');
        }
        break;
      }

      case 'QUESTION_ADVANCED':
      case 'PROF_START_BATTLE': {
        if (lastMessage.stage !== undefined) setStage(lastMessage.stage);
        if (lastMessage.currentIndex !== undefined) setQuestionIndex(lastMessage.currentIndex);
        if (lastMessage.safeZoneEndsAt) setSafeZoneEndsAt(lastMessage.safeZoneEndsAt);
        if (lastMessage.questionEndsAt) setQuestionEndsAt(lastMessage.questionEndsAt);
        if (lastMessage.safeZoneDuration) setSafeDurationSeconds(lastMessage.safeZoneDuration);
        if (lastMessage.currentQuestion) {
          setActiveQuestion({
            ...lastMessage.currentQuestion,
            choices: parseChoices(lastMessage.currentQuestion.choices || lastMessage.currentQuestion.options),
          });
        }
        setZone('SAFE');
        setSelectedChoice(null);
        setAnswered(false);
        setLastVerdict(null);
        setShowCheckpoint(false);
        break;
      }

      case 'ENDLESS_ZONE_TRANSITION': {
        if (lastMessage.zone === 'HAZARD') {
          setZone('HAZARD');
          setIsStormFlashing(true);
          setTimeout(() => setIsStormFlashing(false), 1200);
        }
        break;
      }

      case 'ENDLESS_HAZARD_TICK': {
        if (Array.isArray(lastMessage.updatedPlayers)) {
          const me = lastMessage.updatedPlayers.find((p: any) => p.id === socketCtx?.userId || p.userId === socketCtx?.userId);
          if (me) {
            setHp(me.hp);
            setHazardDamagePop(true);
            setTimeout(() => setHazardDamagePop(false), 400);
            if (!me.isAlive || me.hp <= 0) {
              setIsAlive(false);
              setIsGameOver(true);
              setGameOverReason('STORM_DAMAGE');
            }
          }
        }
        break;
      }

      case 'ENDLESS_ANSWER_RESULT': {
        if (lastMessage.userId === socketCtx?.userId) {
          setScore(lastMessage.score);
          setCombo(lastMessage.combo);
          setHp(lastMessage.hp);
          setIsAlive(lastMessage.isAlive);
          setLastVerdict({
            isCorrect: lastMessage.isCorrect,
            answer: activeQuestion?.answer || '',
          });

          if (lastMessage.isCorrect) {
            setComboPop(true);
            setTimeout(() => setComboPop(false), 300);
            setStreak((prev) => {
              const nextStreak = prev + 1;
              if (nextStreak === 5) setShowStreakCard(true);
              return nextStreak;
            });
          } else {
            setStreak(0);
          }

          if (!lastMessage.isAlive || lastMessage.hp <= 0) {
            setIsGameOver(true);
            setGameOverReason('WRONG_ANSWER');
          }
        }
        break;
      }

      case 'ENDLESS_CHECKPOINT_REACHED': {
        setShowCheckpoint(true);
        break;
      }

      case 'ENDLESS_CHECKPOINT_RESOLVED': {
        if (lastMessage.userId === socketCtx?.userId) {
          setShowCheckpoint(false);
          setHp((prev) => Math.min(100, prev + 25));
        }
        break;
      }

      case 'ENDLESS_PLAYER_ELIMINATED': {
        if (lastMessage.userId === socketCtx?.userId) {
          setIsAlive(false);
          setIsGameOver(true);
          setGameOverReason(lastMessage.reason || 'ELIMINATED');
        }
        break;
      }

      case 'ROOM_COMPLETED': {
        setIsGameOver(true);
        setGameOverReason('ROOM_COMPLETED');
        break;
      }
    }
  }, [lastMessage, socketCtx?.userId, activeQuestion?.answer]);

  // Fallback question loading from socket context or room state
  useEffect(() => {
    if (!activeQuestion && socketCtx?.questions && socketCtx.questions.length > 0) {
      const q = socketCtx.questions[0];
      setActiveQuestion({
        ...q,
        choices: parseChoices((q as any).choices || (q as any).options),
      });
    }
  }, [socketCtx?.questions, activeQuestion]);

  const stagesUntilCheckpoint = CHECKPOINT_INTERVAL - (stage % CHECKPOINT_INTERVAL);
  const isSuddenDeath = stage % 5 === 0 && stage > 0;
  const comboMultiplier = combo >= 6 ? 8 : combo >= 4 ? 4 : combo >= 2 ? 2 : 1;
  const multiplierColor =
    comboMultiplier === 8 ? 'text-[var(--gm-red)]' :
    comboMultiplier === 4 ? 'text-[var(--gm-coral)]' :
    comboMultiplier === 2 ? 'text-[var(--gm-yellow)]' : 'text-white/50';

  // Handle player answer submission (strictly server-authoritative)
  const handleSelect = (choiceIndex: number, choiceText: string) => {
    if (answered || !isAlive || isGameOver) return;

    setSelectedChoice(choiceIndex);
    setAnswered(true);

    if (socketCtx?.send && sessionId) {
      socketCtx.send({
        type: 'SUBMIT_ENDLESS_ANSWER',
        battleId: sessionId,
        mode: 'ENDLESS',
        stage,
        currentIndex: questionIndex,
        questionIndex,
        answer: choiceText,
        timestamp: Date.now(),
      });
    }

    if (onAnswer) {
      onAnswer(choiceText);
    }
  };

  const handleCheckpointReward = (selectedPowerup?: string) => {
    if (socketCtx?.send && sessionId) {
      socketCtx.send({
        type: 'SUBMIT_CHECKPOINT_SELECTION',
        battleId: sessionId,
        mode: 'ENDLESS',
        stage,
        powerupId: selectedPowerup || 'shield',
      });
    }
    setShowCheckpoint(false);
  };

  const handlePowerUpClick = (index: number) => {
    if (!powerUpStates[index].ready) return;
    setPowerUpStates((prev) => {
      const next = [...prev];
      next[index] = { ready: false, cooldown: Date.now() + 3000 };
      return next;
    });
    setTimeout(() => {
      setPowerUpStates((prev) => {
        const next = [...prev];
        next[index] = { ready: true, cooldown: 0 };
        return next;
      });
    }, 3000);
  };

  // Waiting for lobby countdown
  if (socketCtx?.countdown !== null && !socketCtx?.battleStarted) {
    return <CountdownDisplay count={socketCtx.countdown} />;
  }

  // Game Over Modal
  if (isGameOver || !isAlive || hp <= 0) {
    return (
      <div className="min-h-screen bg-[var(--gm-navy)] flex flex-col items-center justify-center font-[Manrope] text-white p-4 text-center">
        <div className="bg-[var(--gm-red)]/10 border-2 border-[var(--gm-red)]/30 rounded-2xl p-8 max-w-md w-full shadow-2xl backdrop-blur-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--gm-red)]/20 border border-[var(--gm-red)]/40 flex items-center justify-center text-3xl">
            💀
          </div>
          <h2 className="font-[Fredoka] text-3xl font-bold mb-2 text-white">
            {gameOverReason === 'STORM_DAMAGE' ? 'Claimed by the Storm' : 'Eliminated'}
          </h2>
          <p className="text-white/60 text-sm mb-6">
            {gameOverReason === 'STORM_DAMAGE'
              ? 'You stayed in the Hazard Zone too long without answering!'
              : gameOverReason === 'TIMEOUT'
              ? 'Stage time expired before you could make your choice.'
              : 'Endless challenge finished! Outstanding effort.'}
          </p>
          <div className="grid grid-cols-2 gap-3 mb-6 bg-white/5 p-4 rounded-xl border border-white/10">
            <div>
              <span className="text-xs text-white/50 block font-bold uppercase">Final Stage</span>
              <span className="font-[Fredoka] text-2xl font-bold text-[var(--gm-yellow)]">
                Stage {stage}
              </span>
            </div>
            <div>
              <span className="text-xs text-white/50 block font-bold uppercase">Final Score</span>
              <span className="font-[Fredoka] text-2xl font-bold text-[var(--gm-green)]">
                {score.toLocaleString()} pts
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                localStorage.removeItem('active_battle_session');
                window.location.href = '/';
              }
            }}
            className="w-full bg-[var(--gm-indigo)] py-4 rounded-xl font-bold font-[Fredoka] text-lg uppercase tracking-wide hover:opacity-90 active:scale-95 transition-all shadow-lg"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Loading Question Bank
  if (!activeQuestion) {
    return (
      <div className="min-h-screen bg-[var(--gm-navy)] flex flex-col items-center justify-center font-[Manrope] text-white p-4 text-center">
        <div className="w-12 h-12 border-4 border-white/10 border-t-[var(--gm-yellow)] rounded-full animate-spin mb-4" />
        <h2 className="font-[Fredoka] text-2xl font-bold text-[var(--gm-yellow)] animate-pulse">
          Connecting to Endless Battle...
        </h2>
        <p className="text-white/50 text-sm mt-2">Waiting for server state synchronization</p>
      </div>
    );
  }

  const choices = activeQuestion?.options || activeQuestion?.choices || [];
  const safeTimePercent = safeDurationSeconds > 0 ? Math.min(100, (timeRemaining / safeDurationSeconds) * 100) : 0;

  return (
    <div className={cn(
      "min-h-screen bg-[var(--gm-navy)] flex flex-col font-[Manrope] text-white relative transition-colors duration-500 overflow-hidden",
      zone === 'HAZARD' && "bg-[#180a14]"
    )}>
      {/* STORM VIGNETTE & WARNING OVERLAY */}
      {zone === 'HAZARD' && (
        <div className="pointer-events-none absolute inset-0 z-30 shadow-[inset_0_0_100px_rgba(255,40,70,0.45)] animate-pulse border-4 border-red-500/30" />
      )}
      {isStormFlashing && (
        <div className="pointer-events-none absolute inset-0 z-40 bg-red-600/20 backdrop-blur-[1px] animate-ping" />
      )}
      {hazardDamagePop && (
        <div className="pointer-events-none absolute inset-0 z-40 animate-[gm-shake_0.4s]" />
      )}

      {/* CHECKPOINT MODAL */}
      {showCheckpoint && (
        <div className="absolute inset-0 z-50">
          <CheckpointCard stage={stage} onContinue={handleCheckpointReward} />
        </div>
      )}

      {/* STREAK REWARD MODAL */}
      {showStreakCard && (
        <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <StreakRewardCard
            onCollect={() => {
              setStreak(0);
              setShowStreakCard(false);
            }}
          />
        </div>
      )}

      {/* SUDDEN DEATH / STORM BANNER */}
      {zone === 'HAZARD' ? (
        <div className="bg-red-600/30 border-b border-red-500 py-2 text-center animate-pulse flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <span className="font-[Fredoka] text-red-300 font-bold text-xs tracking-widest uppercase">
            ⚡ STORM HAZARD ZONE: Taking 2 HP/sec Storm Damage! ⚡
          </span>
        </div>
      ) : isSuddenDeath ? (
        <div className="bg-[var(--gm-red)]/20 border-b border-[var(--gm-red)] py-2 text-center animate-[gm-pulse_1s_infinite]">
          <span className="font-[Fredoka] text-[var(--gm-red)] font-bold text-xs tracking-widest uppercase">
            ⚠ Sudden Death Stage ⚠
          </span>
        </div>
      ) : null}

      {/* TOP STATUS BAR */}
      <div className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center gap-2">
          <Flag className="w-4 h-4 text-[var(--gm-yellow)]" />
          <span className="font-[Fredoka] text-lg font-bold">
            Stage <span className="text-[var(--gm-yellow)]">{stage}</span>
          </span>
          <span className={cn(
            "text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase border",
            zone === 'SAFE'
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
              : "bg-red-500/20 text-red-300 border-red-500/40 animate-pulse"
          )}>
            {zone === 'SAFE' ? 'Safe Zone' : 'Hazard Storm'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Combo Multiplier */}
          <span
            className={cn(
              "font-[Fredoka] text-sm font-bold transition-all",
              multiplierColor,
              comboPop && "animate-[gm-combo-pop_0.3s_ease-out]"
            )}
          >
            {comboMultiplier}×
          </span>
          <span className="font-[Fredoka] text-sm font-bold text-[var(--gm-yellow)]">
            {score.toLocaleString()} pts
          </span>

          {/* Player HP Bar */}
          <div className="flex items-center gap-2 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
            <Heart className={cn("w-4 h-4 fill-red-500 text-red-500", hazardDamagePop && "animate-bounce")} />
            <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full transition-all duration-300 rounded-full",
                  hp > 50 ? "bg-[var(--gm-green)]" : hp > 25 ? "bg-[var(--gm-yellow)]" : "bg-[var(--gm-red)] animate-pulse"
                )}
                style={{ width: `${Math.max(0, (hp / maxHp) * 100)}%` }}
              />
            </div>
            <span className="font-[Fredoka] text-xs font-bold text-white/90 min-w-[28px] text-right">
              {hp}
            </span>
          </div>
        </div>
      </div>

      {/* CHECKPOINT PROGRESS BAR */}
      <div className="px-5 pb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-bold text-[var(--gm-muted)] uppercase">
            Next Checkpoint
          </span>
          <span className="text-[10px] font-bold text-[var(--gm-yellow)]">
            {stagesUntilCheckpoint === CHECKPOINT_INTERVAL ? 'Checkpoint Now!' : `${stagesUntilCheckpoint} stages`}
          </span>
        </div>
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--gm-indigo)] to-[var(--gm-yellow)] transition-[width] duration-400 ease-out"
            style={{ width: `${((stage % CHECKPOINT_INTERVAL) / CHECKPOINT_INTERVAL) * 100}%` }}
          />
        </div>
      </div>

      {/* ZONE TIMER BAR */}
      <div className="px-5 flex items-center gap-2">
        <span className={cn(
          "text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider",
          zone === 'SAFE' ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"
        )}>
          {zone === 'SAFE' ? 'Safe Window' : 'Storm Timer'}
        </span>
        <div className="flex-1 h-[6px] bg-white/5 rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-[width] duration-200 linear",
              zone === 'SAFE'
                ? "bg-gradient-to-r from-[var(--gm-green)] to-[var(--gm-yellow)]"
                : "bg-gradient-to-r from-red-500 to-orange-500 animate-pulse"
            )}
            style={{ width: `${Math.min(100, Math.max(0, safeTimePercent))}%` }}
          />
        </div>
        <span className="font-[Fredoka] text-[13px] font-bold text-[var(--gm-yellow)] min-w-[35px] text-right">
          {Math.ceil(timeRemaining)}s
        </span>
      </div>

      {/* QUESTION AREA */}
      <div className="p-4 px-5 flex-1 flex flex-col gap-3.5">
        <div className={cn(
          "relative bg-white/[0.04] border rounded-2xl p-[18px] px-5 transition-all duration-300",
          zone === 'HAZARD' ? "border-red-500/40 bg-red-950/20" : "border-white/[0.08]"
        )}>
          {isSuddenDeath && (
            <div className="absolute -top-3 left-4 bg-[var(--gm-navy)] px-2">
              <span className="text-[10px] font-bold text-[var(--gm-muted)] border border-white/10 rounded px-1.5 py-0.5">
                SPEED ROUND
              </span>
            </div>
          )}
          <p className="text-[17px] font-bold leading-relaxed m-0 text-white">
            {activeQuestion?.text || activeQuestion?.question}
          </p>
        </div>

        {/* ANSWER CHOICES */}
        <div className="grid grid-cols-2 gap-2.5 flex-1 content-start">
          {choices.map((rawChoice: any, i: number) => {
            const choiceText = typeof rawChoice === 'object' && rawChoice !== null
              ? (rawChoice.text || rawChoice.label || String(rawChoice))
              : String(rawChoice);

            const isSelected = selectedChoice === i;
            const theme = OPTION_COLORS[i % OPTION_COLORS.length];

            let overrideStyle = "";
            let animStyle = "";

            if (answered && lastVerdict) {
              if (choiceText === lastVerdict.answer) {
                overrideStyle = "bg-[var(--gm-green)]/15 border-[var(--gm-green)]";
              } else if (isSelected && !lastVerdict.isCorrect) {
                overrideStyle = "bg-[var(--gm-red)]/15 border-[var(--gm-red)]";
                animStyle = "animate-[gm-shake_0.4s]";
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i, choiceText)}
                disabled={answered || !isAlive}
                className={cn(
                  "bg-white/[0.03] border-2 border-white/[0.08] rounded-2xl p-4 px-5 text-left flex items-center gap-4 transition-all duration-200",
                  isSelected ? `${theme.base} ${theme.border} scale-[1.02] ${theme.glow}` : "hover:bg-white/5",
                  overrideStyle,
                  animStyle,
                  answered && "cursor-default"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center font-[Fredoka] text-[13px] font-bold shrink-0 transition-colors",
                    isSelected ? "bg-black/20 text-white" : `${theme.light} ${theme.text}`
                  )}
                >
                  {String.fromCharCode(65 + i)}
                </div>
                <span
                  className={cn(
                    "text-sm font-semibold transition-colors",
                    answered && lastVerdict && choiceText === lastVerdict.answer
                      ? "text-[var(--gm-green)]"
                      : isSelected
                      ? "text-white"
                      : "text-white/90"
                  )}
                >
                  {choiceText}
                </span>
              </button>
            );
          })}
        </div>

        {/* FEEDBACK BANNER */}
        {answered && lastVerdict && !lastVerdict.isCorrect && (
          <div className="bg-[var(--gm-red)]/10 border border-[var(--gm-red)]/30 rounded-xl p-3 text-center animate-in fade-in slide-in-from-bottom-2">
            <span className="text-[var(--gm-red)] font-bold text-sm">Mistake Penalty (-20 HP)!</span>
            {lastVerdict.answer && (
              <span className="text-white/80 text-sm ml-2">
                Correct answer was: <strong className="text-white">{lastVerdict.answer}</strong>
              </span>
            )}
          </div>
        )}

        {/* POWER-UP SLOTS */}
        <div className="flex items-center justify-center gap-3 py-2 mt-auto">
          <span className="text-[10px] font-bold text-white/30 uppercase tracking-[1px] mr-1 flex items-center">
            <Zap className="w-2.5 h-2.5 mr-1" />
            Power-ups
          </span>
          {POWER_UP_SLOTS.map((slot, i) => {
            const state = powerUpStates[i];
            return (
              <button
                key={i}
                title={slot.name}
                onClick={() => handlePowerUpClick(i)}
                disabled={!state.ready}
                className={cn(
                  "w-11 h-11 rounded-xl bg-white/[0.04] border-[1.5px] border-dashed border-white/[0.12] flex items-center justify-center text-lg transition-all duration-200",
                  state.ready
                    ? "opacity-100 hover:scale-110 active:scale-95 cursor-pointer hover:border-white/30"
                    : "opacity-40 grayscale cursor-not-allowed",
                  state.ready && "hover:animate-[gm-glow-pulse_1s_infinite]"
                )}
              >
                {slot.icon}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

