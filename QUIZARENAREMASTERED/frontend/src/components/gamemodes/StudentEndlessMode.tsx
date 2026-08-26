'use client';

import React, { useState, useEffect } from 'react';
import { CheckpointCard } from './CheckpointCard';
import { Zap, Heart, Flag } from 'lucide-react';
import { cn } from '@/components/ui/utils';
import { StreakRewardCard } from './StreakRewardCard';

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
  currentQuestion?: { text?: string; question?: string; choices?: string[]; options?: string[]; answer?: string; } | any | null;
  onAnswer?: (choice: string) => void;
  showCheckpoint?: boolean;
  onContinueCheckpoint?: (selectedPowerup?: string) => void;
}

const DEFAULT_QUESTION = {
  text: 'What is the chemical symbol for gold?',
  choices: ['Au', 'Ag', 'Fe', 'Cu'],
  answer: 'Au',
};

export function StudentEndlessMode({
  currentStage = 1,
  lives: initialLives = 3,
  score: initialScore = 0,
  currentQuestion = DEFAULT_QUESTION,
  onAnswer,
  showCheckpoint: initialShowCheckpoint = false,
  onContinueCheckpoint
}: StudentEndlessModeProps) {
  // Local state for demonstration of mechanics, normally passed down or hoisted
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [internalLives, setInternalLives] = useState(initialLives);
  const [internalScore, setInternalScore] = useState(initialScore);
  const [internalStage, setInternalStage] = useState(currentStage);
  const [showCheckpoint, setShowCheckpoint] = useState(initialShowCheckpoint);

  // Gameplay Mechanics State
  const [combo, setCombo] = useState(0);
  const [comboPop, setComboPop] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [timerPercent, setTimerPercent] = useState(75);
  const [streak, setStreak] = useState(0);
  const [showStreakCard, setShowStreakCard] = useState(false);

  const [powerUpStates, setPowerUpStates] = useState(
    POWER_UP_SLOTS.map(() => ({ ready: true, cooldown: 0 }))
  );

  useEffect(() => {
    setQuestionStartTime(Date.now());
  }, [internalStage, currentQuestion]);

  const stagesUntilCheckpoint = CHECKPOINT_INTERVAL - (internalStage % CHECKPOINT_INTERVAL);
  const isSuddenDeath = internalStage % 5 === 0 && internalStage > 0;
  const timerPenalty = Math.max(0, (internalStage - 1) * 5); // 5% per completed stage

  // Calculate combo multiplier
  const comboMultiplier = combo >= 6 ? 8 : combo >= 4 ? 4 : combo >= 2 ? 2 : 1;
  const multiplierColor = comboMultiplier === 8 ? 'text-[var(--gm-red)]' : comboMultiplier === 4 ? 'text-[var(--gm-coral)]' : comboMultiplier === 2 ? 'text-[var(--gm-yellow)]' : 'text-white/50';

  const handleSelect = (i: number, choice: string) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);

    const isCorrect = choice === (currentQuestion?.answer || '');
    const answerTime = Date.now() - questionStartTime;

    if (isCorrect) {
      // Fast answer combo check (< 2s)
      if (answerTime < 2000) {
        setCombo(prev => prev + 1);
        setComboPop(true);
        setTimeout(() => setComboPop(false), 300);
      } else {
        setCombo(0);
      }

      setInternalScore(prev => prev + (100 * comboMultiplier));
      
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak === 5) {
        setShowStreakCard(true);
      }
    } else {
      setCombo(0);
      setStreak(0);
      setInternalLives(prev => Math.max(0, prev - 1));
    }

    if (onAnswer) {
      onAnswer(choice);
    }

    setTimeout(() => {
      const nextStage = internalStage + 1;
      if (nextStage > 1 && (nextStage - 1) % CHECKPOINT_INTERVAL === 0) {
        setShowCheckpoint(true);
      } else {
        advanceStage(nextStage);
      }
    }, 1200);
  };

  const advanceStage = (next: number) => {
    setInternalStage(next);
    setSelected(null);
    setAnswered(false);
    setShowCheckpoint(false);
  };

  const handleCheckpointContinue = (selectedPowerup?: string) => {
    if (onContinueCheckpoint) onContinueCheckpoint(selectedPowerup);
    advanceStage(internalStage + 1);
  };

  const handlePowerUpClick = (index: number) => {
    if (!powerUpStates[index].ready) return;

    // Set to cooldown
    setPowerUpStates(prev => {
      const next = [...prev];
      next[index] = { ready: false, cooldown: Date.now() + 3000 };
      return next;
    });

    // Auto-reset after 3 seconds
    setTimeout(() => {
      setPowerUpStates(prev => {
        const next = [...prev];
        next[index] = { ready: true, cooldown: 0 };
        return next;
      });
    }, 3000);
  };

  if (showStreakCard) {
    return (
      <div className="min-h-screen bg-[var(--gm-navy)] flex flex-col font-[Manrope] text-white p-4">
        <StreakRewardCard 
          onCollect={() => {
            setStreak(0);
            setShowStreakCard(false);
          }} 
        />
      </div>
    );
  }

  const choices = currentQuestion?.options || currentQuestion?.choices || [];

  return (
    <div className="min-h-screen bg-[var(--gm-navy)] flex flex-col font-[Manrope] text-white">
      {showCheckpoint && (
        <div className="absolute inset-0 z-50">
          <CheckpointCard stage={internalStage} onContinue={handleCheckpointContinue} />
        </div>
      )}

      {/* SUDDEN DEATH BANNER */}
      {isSuddenDeath && (
        <div className="bg-[var(--gm-red)]/20 border-b border-[var(--gm-red)] py-2 text-center animate-[gm-pulse_1s_infinite]">
          <span className="font-[Fredoka] text-[var(--gm-red)] font-bold text-sm tracking-widest uppercase">
            ⚠ Sudden Death ⚠
          </span>
        </div>
      )}

      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center gap-2">
          <Flag className="w-4 h-4 text-[var(--gm-yellow)]" />
          <span className="font-[Fredoka] text-lg font-bold">
            Stage <span className="text-[var(--gm-yellow)]">{internalStage}</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Combo Multiplier */}
          <span className={cn(
            "font-[Fredoka] text-sm font-bold transition-all",
            multiplierColor,
            comboPop && "animate-[gm-combo-pop_0.3s_ease-out]"
          )}>
            {comboMultiplier}×
          </span>
          <span className="font-[Fredoka] text-sm font-bold text-[var(--gm-yellow)]">
            {internalScore} pts
          </span>
          <div className="flex gap-[3px]">
            {Array.from({ length: 3 }, (_, i) => (
              <Heart 
                key={i} 
                className={cn(
                  "w-[18px] h-[18px] stroke-2 transition-all",
                  i < internalLives ? "fill-[var(--gm-red)] text-[var(--gm-red)]" : "fill-transparent text-white/15"
                )} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Progress to next checkpoint */}
      <div className="px-5 pb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-bold text-[var(--gm-muted)] uppercase">
            Next checkpoint
          </span>
          <span className="text-[10px] font-bold text-[var(--gm-yellow)]">
            {stagesUntilCheckpoint === CHECKPOINT_INTERVAL ? 'Now!' : `${stagesUntilCheckpoint} stages`}
          </span>
        </div>
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-[var(--gm-indigo)] to-[var(--gm-yellow)] transition-[width] duration-400 ease-out"
            style={{ width: `${((internalStage % CHECKPOINT_INTERVAL) / CHECKPOINT_INTERVAL) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          {Array.from({ length: CHECKPOINT_INTERVAL }, (_, i) => {
            const stageDot = i + 1;
            const filled = (internalStage % CHECKPOINT_INTERVAL) >= stageDot || internalStage % CHECKPOINT_INTERVAL === 0;
            return (
              <div 
                key={i} 
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-colors duration-300",
                  filled ? "bg-[var(--gm-yellow)]" : "bg-white/10"
                )} 
              />
            );
          })}
        </div>
      </div>

      {/* Timer bar */}
      <div className="px-5 flex items-center gap-2">
        {timerPenalty > 0 && !isSuddenDeath && (
          <span className="text-[10px] font-bold text-[var(--gm-coral)] bg-[var(--gm-coral)]/10 px-1.5 py-0.5 rounded">
            -{timerPenalty}%
          </span>
        )}
        <div className="flex-1 h-[5px] bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-[var(--gm-yellow)] to-[var(--gm-coral)] transition-[width] duration-1000 linear"
            style={{ width: isSuddenDeath ? '100%' : `${timerPercent}%` }}
          />
        </div>
        <span className="font-[Fredoka] text-[13px] font-bold text-[var(--gm-yellow)] min-w-[30px] text-right">
          {isSuddenDeath ? '3s' : '22s'}
        </span>
      </div>

      {/* Question Area */}
      <div className="p-4 px-5 flex-1 flex flex-col gap-3.5">
        <div className="relative bg-white/[0.04] border border-white/[0.08] rounded-2xl p-[18px] px-5">
          {isSuddenDeath && (
            <div className="absolute -top-3 left-4 bg-[var(--gm-navy)] px-2">
              <span className="text-[10px] font-bold text-[var(--gm-muted)] border border-white/10 rounded px-1.5 py-0.5">
                RECYCLED
              </span>
            </div>
          )}
          <p className={cn(
            "text-[17px] font-bold leading-relaxed m-0 transition-opacity duration-700",
            timerPercent < 30 ? "opacity-30" : "opacity-100"
          )}>
            {currentQuestion?.text}
          </p>
        </div>

        {/* Answer choices */}
        <div className="grid grid-cols-2 gap-2.5 flex-1 content-start">
          {choices.map((choice: string, i: number) => {
            const isCorrect = choice === (currentQuestion?.answer || '');
            const isSelected = selected === i;
            const theme = OPTION_COLORS[i % OPTION_COLORS.length];
            
            // Answer Feedback styling
            let overrideStyle = "";
            let animStyle = "";
            
            if (answered) {
              if (isCorrect) {
                overrideStyle = "bg-[var(--gm-green)]/15 border-[var(--gm-green)]";
              } else if (isSelected && !isCorrect) {
                overrideStyle = "bg-[var(--gm-red)]/15 border-[var(--gm-red)]";
                animStyle = "animate-[gm-shake_0.4s]";
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i, choice)}
                disabled={answered}
                className={cn(
                  "bg-white/[0.03] border-2 border-white/[0.08] rounded-2xl p-4 px-5 text-left flex items-center gap-4 transition-all duration-200",
                  isSelected ? `${theme.base} ${theme.border} scale-[1.02] ${theme.glow}` : "hover:bg-white/5",
                  overrideStyle,
                  animStyle,
                  answered && "cursor-default"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center font-[Fredoka] text-[13px] font-bold shrink-0 transition-colors",
                  isSelected ? "bg-black/20 text-white" : `${theme.light} ${theme.text}`
                )}>
                  {['A', 'B', 'C', 'D'][i]}
                </div>
                <span className={cn(
                  "text-sm font-semibold transition-colors",
                  answered && isCorrect ? "text-[var(--gm-green)]" : (isSelected ? "text-white" : "text-white/90")
                )}>
                  {choice}
                </span>
              </button>
            );
          })}
        </div>

        {/* Power-up slots */}
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
