'use client';

import React, { useState, useEffect } from 'react';
import { BossEntity } from './BossEntity';
import { Zap } from 'lucide-react';
import { cn } from '@/components/ui/utils';
import { StreakRewardCard } from './StreakRewardCard';
import { useBattleSocketContext } from '@/lib/student/battle/useBattleSocketProvider';
import { toast } from 'sonner';

const POWER_UP_SLOTS = [
  { name: 'Shield',        icon: '🛡️' },
  { name: 'Second Chance', icon: '♻️' },
  { name: 'Time Boost',    icon: '⏳' },
  { name: 'Hint',          icon: '💡' },
  { name: 'Heal',          icon: '❤️' },
  { name: 'Double Score',  icon: '2️⃣' },
];

interface StudentBossRaidProps {
  battleId?: string;
  currentQuestion?: { text?: string; question?: string; choices?: string[]; options?: string[]; answer?: string; } | any | null;
  activeQuestion?: { text?: string; question?: string; choices?: string[]; options?: string[]; answer?: string; } | any | null;
  bossHealth?: number;
  bossMaxHealth?: number;
  activeStudentsCount?: number;
  bossCardEffect?: 'OVERRIDE' | 'TIME_SQUEEZE' | 'EVASION' | null;
  totalQuestions?: number;
  onAnswer?: (choice: string) => void;
  lastMessage?: any;
}



import { useApp } from "../../context/AppContext";

export function StudentBossRaid({ battleId, currentQuestion = null, bossHealth = 1000, bossMaxHealth = 1000, activeStudentsCount = 1, bossCardEffect = null, totalQuestions = 10, onAnswer, lastMessage: propLastMessage }: StudentBossRaidProps) {
  const socketCtx = useBattleSocketContext();
  const send = socketCtx?.send;
  const lastMessage = propLastMessage || socketCtx?.lastMessage;
  const { navigate } = useApp();

  useEffect(() => {
    if (lastMessage?.type === 'ROOM_COMPLETED' || lastMessage?.type === 'QUIZ_COMPLETED') {
      navigate("results");
    }
  }, [lastMessage, navigate]);
  
  // Use currentQuestion from props if available, otherwise get it from socketCtx
  const activeQuestion = currentQuestion || (socketCtx?.questions && socketCtx.questions[socketCtx.currentIndex]) || null;

  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
  // Timer State
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (!socketCtx?.startedAt) {
      setTimeLeft(60);
      return;
    }
    const timer = setInterval(() => {
      const limit = socketCtx.lastMessage?.timeLimit || 60;
      const elapsed = Math.floor((Date.now() - socketCtx.startedAt) / 1000);
      setTimeLeft(Math.max(0, limit - elapsed));
    }, 500);
    return () => clearInterval(timer);
  }, [socketCtx?.startedAt, socketCtx?.lastMessage?.timeLimit, activeQuestion]);

  // Stagger Meter
  const [staggerProgress, setStaggerProgress] = useState(0); // 0 to 3
  const [isBossStaggered, setIsBossStaggered] = useState(false);
  
  // Quarantine System
  const [missStreak, setMissStreak] = useState(0);
  const [isQuarantined, setIsQuarantined] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  
  // Local Health States for Demo
  const [localBossHp, setLocalBossHp] = useState(bossHealth);
  const [localClassHp, setLocalClassHp] = useState(1000);
  const classMaxHealth = 1000;

  useEffect(() => {
    if (lastMessage?.type === 'BOSS_ACTION' || lastMessage?.type === 'ROOM_STATE_SYNC') {
      if (lastMessage.bossHp !== undefined) setLocalBossHp(lastMessage.bossHp);
      if (lastMessage.classHp !== undefined) {
        setLocalClassHp(prev => {
          if (lastMessage.classHp < prev && lastMessage.type === 'BOSS_ACTION') {
            setSlashed(true);
            setTimeout(() => setSlashed(false), 300);
          }
          return lastMessage.classHp;
        });
      }
    } else if (lastMessage?.type === 'BOSSRAID_TIME_UP') {
      if (lastMessage.classHp !== undefined) {
        setLocalClassHp(lastMessage.classHp);
        setSlashed(true);
        setTimeout(() => setSlashed(false), 300);
      }
      toast.error(lastMessage.message || "Time's up! BRACE FOR IMPACT!", {
        position: 'top-center',
        style: { background: 'red', color: 'white', fontWeight: 'bold' }
      });
    }
  }, [lastMessage]);

  const [slashed, setSlashed] = useState(false);
  
  // Ultimate Attack Warning
  const [ultimateIncoming, setUltimateIncoming] = useState(false);
  
  // Override Mechanics
  const [overrideIncoming, setOverrideIncoming] = useState(false);
  const [overrideActive, setOverrideActive] = useState(false);
  const [cardAnimation, setCardAnimation] = useState<string | null>(null);

  useEffect(() => {
    if (bossCardEffect === 'OVERRIDE') {
      setOverrideIncoming(true);
      setTimeout(() => setOverrideIncoming(false), 2000);
      setOverrideActive(true);
      setTimeout(() => setOverrideActive(false), 5000);
      setCardAnimation('OVERRIDE PROTOCOL!');
    } else if (bossCardEffect === 'TIME_SQUEEZE') {
      setTimeLeft(prev => Math.max(0, prev - 6));
      setCardAnimation('TIME SQUEEZE!');
    } else if (bossCardEffect === 'EVASION') {
      setCardAnimation('BOSS EVASION!');
    }
    
    if (bossCardEffect) {
      setTimeout(() => setCardAnimation(null), 3000);
    }
  }, [bossCardEffect]);
  
  // Floating Damage Numbers
  const [damageNumbers, setDamageNumbers] = useState<{ id: number; value: number; x: number }[]>([]);
  
  // Interactive Power-ups
  const [powerUpCooldowns, setPowerUpCooldowns] = useState<boolean[]>(new Array(6).fill(true));
  const [activePowerUpIndex, setActivePowerUpIndex] = useState<number | null>(null);
  
  // Streak Card System
  const [streak, setStreak] = useState(0);
  const [showStreakCard, setShowStreakCard] = useState(false);

  // Timeout State Watcher
  useEffect(() => {
    if (timeLeft === 0 && !answered) {
      // Just mark it locally so the UI updates
      setAnswered(true);
      setIsCorrect(false);
      setStreak(0);
      setStaggerProgress(0);
      setMissStreak(m => m + 1);
      // The server will handle computing and dispatching the Class HP penalty via BOSSRAID_TIME_UP!
    }
  }, [timeLeft, answered]);

  // Reset selected when question changes
  useEffect(() => {
    setSelected(null);
    setAnswered(false);
    setIsCorrect(null);
  }, [activeQuestion]);

  const handleSelect = (i: number, choice: string) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    
    const correctAnswer = activeQuestion?.answer || activeQuestion?.options?.[0] || activeQuestion?.choices?.[0];
    const correct = choice === correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      // Handle Streak
      setStreak(s => {
        const next = s + 1;
        if (next >= 5) {
          setShowStreakCard(true);
        }
        return next;
      });
      
      // Handle Quarantine Recovery
      setMissStreak(0);
      setIsQuarantined(false);
      
      // Handle Stagger
      setStaggerProgress(p => {
        const next = p + 1;
        if (next >= 3) {
          setIsBossStaggered(true);
          setTimeout(() => {
            setIsBossStaggered(false);
            setStaggerProgress(0);
          }, 10000);
          return 3;
        }
        return next;
      });
      
      // Dynamic Damage calculation based on participant count & speed
      const maxDamagePerRound = 100; // Base 100 damage for 1 player
      const baseHit = Math.max(1, Math.round(maxDamagePerRound / Math.max(1, activeStudentsCount)));
      const speedMultiplier = timeLeft > 25 ? 1.5 : (timeLeft > 15 ? 1.2 : 1.0);
      const finalDmg = Math.round(baseHit * speedMultiplier);

      // Apply Damage to Boss
      const newHp = Math.max(0, localBossHp - finalDmg);
      setLocalBossHp(newHp);
      if (send) send({ type: 'BOSS_ACTION', battleId, bossHp: newHp });

      // Floating damage
      const dmg = { id: Date.now(), value: finalDmg, x: Math.random() * 80 + 10 };
      setDamageNumbers(prev => [...prev, dmg]);
      setTimeout(() => {
        setDamageNumbers(prev => prev.filter(d => d.id !== dmg.id));
      }, 1000);

      // Boss slash effect
      setSlashed(true);
      setTimeout(() => setSlashed(false), 300);
      
    } else {
      // Handle wrong answer
      setStreak(0);
      setStaggerProgress(0);
      setMissStreak(m => {
        const next = m + 1;
        if (next >= 3) {
          setIsQuarantined(true);
        }
        return next;
      });

      // Apply damage to class (mistake)
      const newHp = Math.max(0, localClassHp - 25);
      setLocalClassHp(newHp);
      if (send) send({ type: 'BOSS_ACTION', battleId, classHp: newHp, addBossEnergy: 3 });

      // Player slash effect
      setSlashed(true);
      setTimeout(() => setSlashed(false), 300);
    }
    
    // Check if every 3 questions for powerup, only for the leading player
    setQuestionsAnswered(prev => {
      const next = prev + 1;
      const threshold = 3;
      
      const leaderboard = socketCtx?.leaderboard || [];
      const isLeader = leaderboard.find(p => p.isMe)?.isLeader;

      if (next % threshold === 0 && isLeader) {
        // Unlock a random powerup
        setPowerUpCooldowns(cooldowns => {
          const newCooldowns = [...cooldowns];
          const lockedIndices = newCooldowns.map((c, i) => c ? i : -1).filter(i => i !== -1);
          if (lockedIndices.length > 0) {
            const unlockIdx = lockedIndices[Math.floor(Math.random() * lockedIndices.length)];
            newCooldowns[unlockIdx] = false;
          }
          return newCooldowns;
        });
      }
      return next;
    });

    if (onAnswer) onAnswer(choice);
  };
  
  const handlePowerUpClick = (index: number) => {
    if (powerUpCooldowns[index]) return;
    
    setActivePowerUpIndex(index);
    setTimeout(() => {
      setActivePowerUpIndex(null);
      setPowerUpCooldowns(prev => {
        const next = [...prev];
        next[index] = true;
        return next;
      });
      
      const powerup = POWER_UP_SLOTS[index].name;
      if (powerup === 'Heal') {
        const newClassHp = Math.min(classMaxHealth, localClassHp + 150);
        setLocalClassHp(newClassHp);
        if (send) send({ type: 'BOSS_ACTION', battleId, classHp: newClassHp });
      } else if (powerup === 'Shield') {
        // Just deduct some boss energy
        if (send) send({ type: 'BOSS_ACTION', battleId, addBossEnergy: -15 });
      } else if (powerup === 'Time Boost') {
        setTimeLeft(prev => prev + 15);
      } else {
        // Generic effect for others
        if (send) send({ type: 'BOSS_ACTION', battleId, classHp: Math.min(classMaxHealth, localClassHp + 50) });
      }
    }, 1000);
  };
  
  const handleCollectStreak = () => {
    setShowStreakCard(false);
    setStreak(0);
  };

  const getOptionClasses = (i: number, choice: string) => {
    const isThisSelected = selected === i;
    
    // Default base styles
    let classes = "w-full text-left rounded-2xl p-4 flex items-center gap-4 transition-all duration-200 cursor-pointer font-[Manrope] font-bold text-base bg-white/[0.03] border-2 border-white/[0.08] text-white/85 hover:bg-white/[0.08] hover:border-white/[0.2] hover:scale-[1.02] active:scale-[0.98]";
    
    // Default circle
    let circleClasses = "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 bg-white/10 text-white transition-colors duration-200";
    
    if (answered) {
      const isCorrectChoice = choice === (activeQuestion?.answer || activeQuestion?.options?.[0] || activeQuestion?.choices?.[0]);

      // Base for answered
      classes = "w-full text-left rounded-2xl p-4 flex items-center gap-4 font-[Manrope] font-bold text-base cursor-default transition-all duration-200";

      if (isThisSelected) {
        if (isCorrect) {
          classes += " bg-[var(--gm-green)]/15 border-[var(--gm-green)] scale-[1.02] text-white shadow-[0_0_15px_rgba(46,212,122,0.3)]";
          circleClasses = "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 bg-[var(--gm-green)] text-white";
        } else {
          classes += " bg-[var(--gm-red)]/15 border-[var(--gm-red)] animate-[gm-shake_0.4s] text-white shadow-[0_0_15px_rgba(255,71,87,0.3)]";
          circleClasses = "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 bg-[var(--gm-red)] text-white";
        }
      } else if (isCorrectChoice) {
        // Highlight correct option if they missed it
        classes += " bg-white/[0.03] border-[var(--gm-green)]/50 text-white/85";
        circleClasses = "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 bg-[var(--gm-green)]/20 text-[var(--gm-green)]";
      } else {
        classes += " bg-white/[0.02] border-white/[0.04] text-white/40";
        circleClasses = "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 bg-white/5 text-white/40";
      }
    }
    
    return { classes, circleClasses };
  };

  const options = activeQuestion?.options || activeQuestion?.choices || [];

  if (isQuarantined) {
    return (
      <div className="flex flex-col min-h-screen bg-[var(--gm-navy)] text-white relative overflow-hidden items-center justify-center p-6 text-center box-border">
        <div className="w-24 h-24 mb-6 rounded-full bg-[var(--gm-red)]/20 border-4 border-[var(--gm-red)] flex items-center justify-center">
          <span className="text-4xl">💀</span>
        </div>
        <h1 className="text-4xl font-[Fredoka] font-bold text-[var(--gm-red)] mb-4 uppercase tracking-widest animate-[gm-shake_0.5s]">Eliminated</h1>
        <p className="text-white/60 mb-8 max-w-sm font-[Manrope] font-medium leading-relaxed">
          You made too many consecutive mistakes and were overwhelmed by the Boss's attacks! 
        </p>
        <p className="text-[var(--gm-yellow)] text-sm font-bold animate-pulse">
          Wait for the battle to conclude...
        </p>
      </div>
    );
  }

  return (
    <div className={cn(
      "min-h-screen flex flex-col font-[Manrope] text-white relative transition-colors duration-300 box-border",
      isQuarantined && "border-2 animate-[gm-amber-pulse_1.5s_infinite] border-amber-500",
      overrideActive ? "bg-[var(--gm-red)]/15" : "bg-[var(--gm-navy)]"
    )}>
      {/* Ultimate Warning */}
      {ultimateIncoming && (
        <>
          <div className="fixed inset-0 bg-[var(--gm-red)]/30 animate-[gm-ultimate-flash_1.5s] pointer-events-none z-50" />
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
            <h1 className="font-[Fredoka] text-3xl font-bold text-white animate-[gm-shake_0.4s]">⚡ ULTIMATE INCOMING!</h1>
          </div>
        </>
      )}

      {/* Card Effect Animation */}
      {cardAnimation && (
        <>
          <div className="fixed inset-0 bg-[var(--gm-indigo)]/30 animate-[gm-ultimate-flash_1.5s] pointer-events-none z-50" />
          <div className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-50">
            <div className="text-6xl mb-4 animate-[gm-float-up_1s_ease-out]">🃏</div>
            <h1 className="font-[Fredoka] text-4xl font-black text-[var(--gm-indigo)] animate-[gm-combo-pop_0.4s] drop-shadow-[0_0_20px_rgba(91,61,246,0.8)] text-center tracking-widest uppercase">
              {cardAnimation}
            </h1>
          </div>
        </>
      )}

      {/* Override Klaxon Warning */}
      {overrideIncoming && (
        <>
          <div className="fixed inset-0 bg-amber-500/30 animate-[gm-ultimate-flash_1.5s] pointer-events-none z-50" />
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
            <h1 className="font-[Fredoka] text-4xl font-black text-amber-400 animate-[gm-shake_0.4s] drop-shadow-[0_0_20px_rgba(251,191,36,0.6)] text-center tracking-widest uppercase">
              ⚠ WARNING: OVERRIDE IMMINENT ⚠
            </h1>
          </div>
        </>
      )}

      {/* Slash Effect overlay */}
      {slashed && (
        <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center bg-[var(--gm-red)]/30">
          <div className="w-[150%] h-[150%] absolute border-[20px] border-[var(--gm-red)] opacity-0 animate-[gm-slash_0.3s_ease-out]" />
          <div className="w-[4px] h-[1000px] bg-white shadow-[0_0_20px_var(--gm-red)] rotate-[-45deg] opacity-0 animate-[gm-slash_0.3s_ease-out]" />
        </div>
      )}

      {/* Class Health Bar */}
      <div className="absolute top-4 left-4 right-4 z-30 flex flex-col items-center pointer-events-none">
        <span className="text-white/70 text-[10px] font-bold tracking-widest mb-1">CLASS HP: {localClassHp} / {classMaxHealth}</span>
        <div className="w-full max-w-md h-3 rounded-full bg-black/30 overflow-hidden mb-4">
          <div 
            className="h-full bg-gradient-to-r from-[var(--gm-green)] to-[#10b981] transition-all duration-300"
            style={{ width: `${(localClassHp / classMaxHealth) * 100}%` }}
          />
        </div>

        {/* Student Timer */}
        <span className="text-white/70 text-[10px] font-bold tracking-widest mb-1">
          {timeLeft > 0 ? `TIME REMAINING: ${timeLeft}s` : "WAITING FOR ATTACK..."}
        </span>
        <div className="w-full max-w-xs h-2 rounded-full bg-black/30 overflow-hidden shadow-[0_0_10px_rgba(255,201,60,0.2)]">
          <div 
            className={cn(
              "h-full transition-all duration-1000 linear",
              timeLeft <= 5 && timeLeft > 0 ? "bg-[var(--gm-red)] animate-[gm-pulse_1s_infinite]" : "bg-[var(--gm-yellow)]"
            )}
            style={{ width: `${(timeLeft / 30) * 100}%` }}
          />
        </div>
      </div>

      {/* ── Boss Area ───────────────────────────────────── */}
      <div className="flex-none flex flex-col items-center px-4 pt-16 bg-[radial-gradient(ellipse_at_50%_80%,rgba(91,61,246,0.12)_0%,transparent_70%)] relative">
        {/* Floating Damage Numbers */}
        {damageNumbers.map(d => (
          <div 
            key={d.id} 
            className="absolute animate-[gm-float-up_1s_ease-out_forwards] text-[var(--gm-green)] font-[Fredoka] font-bold text-xl pointer-events-none z-40"
            style={{ left: `${d.x}%`, top: '40%' }}
          >
            +{d.value} DMG
          </div>
        ))}
        
        {/* Stagger Overlay */}
        {isBossStaggered && (
          <div className="absolute inset-x-0 bottom-12 flex flex-col items-center pointer-events-none z-30">
            <div className="animate-[gm-stagger-flash_0.5s_3] inset-0 bg-white/20 absolute rounded-full blur-2xl" />
            <h2 className="font-[Fredoka] text-2xl font-bold text-[var(--gm-green)] animate-[gm-combo-pop_0.3s_ease-out]">
              BOSS STAGGERED!
            </h2>
          </div>
        )}

        <BossEntity health={localBossHp} maxHealth={bossMaxHealth} name="Quiz Guardian" stage={3} />
        
        {/* Stagger Meter */}
        <div className="w-full max-w-[200px] mt-6 flex flex-col items-center">
          <span className="text-[10px] font-bold tracking-wider text-white/50 mb-1">CLASS ACCURACY — STAGGER METER</span>
          <div className="flex gap-1 w-full h-2">
            {[0, 1, 2].map(segment => (
              <div 
                key={segment} 
                className={cn(
                  "flex-1 rounded-sm transition-all duration-300",
                  staggerProgress > segment ? "bg-[var(--gm-yellow)] shadow-[0_0_8px_rgba(255,201,60,0.6)]" : "bg-white/10"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Question + Choices Area ─────────────────────────────────── */}
      <div className="flex-1 flex flex-col p-5 pb-4 gap-4 relative z-10">
        {activeQuestion ? (
          <>
           

            {/* Question text */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 text-center backdrop-blur-sm">
              <p className="text-[17px] font-bold leading-relaxed m-0">
                {activeQuestion.text || activeQuestion.question || "Unknown Question"}
              </p>
            </div>

            {/* Answer choices */}
            <div className="grid grid-cols-2 gap-2.5 flex-1">
              {options.map((choice: string, i: number) => {
                const styles = getOptionClasses(i, choice);
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i, choice)}
                    disabled={answered}
                    className={styles.classes}
                  >
                    <div className={styles.circleClasses}>
                      {['A', 'B', 'C', 'D'][i]}
                    </div>
                    <span>{choice}</span>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 py-8 text-center">
            <div className="w-12 h-12 border-4 border-white/10 border-t-[var(--gm-coral)] rounded-full animate-spin" />
            <h3 className="m-0 font-[Fredoka] text-2xl text-[var(--gm-yellow)] font-bold">
              Brace for Impact!
            </h3>
            <p className="m-0 text-base text-white/70">
              Waiting for the Boss to launch an attack...
            </p>
          </div>
        )}

        {/* Power-up slots */}
        <div className="flex items-center justify-center gap-3 py-2">
          <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest mr-1 flex items-center">
            <Zap size={10} className="mr-1 inline" />
            Power-ups
          </span>
          
          {POWER_UP_SLOTS.map((slot, i) => {
            const onCooldown = powerUpCooldowns[i];
            const isActive = activePowerUpIndex === i;
            
            return (
              <button 
                key={i} 
                onClick={() => handlePowerUpClick(i)}
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-base transition-all duration-200",
                  !onCooldown && !isActive && "hover:scale-110 active:scale-95 bg-white/10 border border-white/20 cursor-pointer",
                  onCooldown && "opacity-40 cursor-not-allowed grayscale bg-white/5 border border-white/10",
                  isActive && "animate-[gm-glow-pulse_1s_infinite] ring-2 ring-[var(--gm-indigo)] bg-white/20 border border-[var(--gm-indigo)]"
                )}
                title={slot.name}
              >
                {slot.icon}
              </button>
            );
          })}
        </div>
      </div>

      {showStreakCard && (
        <StreakRewardCard streak={streak} onCollect={handleCollectStreak} />
      )}
    </div>
  );
}


