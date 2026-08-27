'use client';

import React, { useState, useEffect } from 'react';
import { ChibiAvatar } from './ChibiAvatar';
import { Users, Clock, Zap, TrendingUp, Shield, Send, Swords, AlertTriangle } from 'lucide-react';
import { cn } from '@/components/ui/utils';
import { toast } from 'sonner';
import { PowerCard } from '../studentONLY/PowerCards/PowerCard';
import { PROF_CARDS } from '../studentONLY/PowerCards/CardCatalog';
import type { PowerCardData } from '../studentONLY/PowerCards/types';

interface QuestionItem {
  id?: string | number;
  text: string;
  choices?: string[];
  answer: string;
}

interface ProfBossRaidProps {
  students?: { id: string; name: string; avatarColor: string; score: number; isActive: boolean; isQuarantined?: boolean; }[];
  bossHealth?: number;
  bossMaxHealth?: number;
  timeLeft?: number;
  currentQuestion?: QuestionItem | null;
  questions?: QuestionItem[];
  onLaunchQuestion?: (q: QuestionItem) => void;
  lastMessage?: any;
  socketSend?: (msg: any) => void;
}

interface DamageLogEntry {
  player: string;
  action: string;
  value: number;
  timestamp: number;
}

const DEFAULT_STUDENTS = [
  { id: '1', name: 'Alice', avatarColor: '#5B3DF6', score: 120, isActive: true },
  { id: '2', name: 'Bob', avatarColor: '#FF6B4A', score: 85, isActive: true },
  { id: '3', name: 'Charlie', avatarColor: '#2ED47A', score: 60, isActive: true, isQuarantined: true },
  { id: '4', name: 'Dana', avatarColor: '#FFC93C', score: 45, isActive: false },
];

export function ProfBossRaid({ students = DEFAULT_STUDENTS, bossHealth = 1000, bossMaxHealth = 1000, timeLeft = 45, currentQuestion = null, questions = [], onLaunchQuestion, lastMessage, socketSend }: ProfBossRaidProps) {
  // Local HP & Timer for demo
  const [localBossHp, setLocalBossHp] = useState(bossHealth);
  const [localClassHp, setLocalClassHp] = useState(1000);
  const classMaxHp = 1000;
  
  // Removed bossHealth effect because we sync directly via socket now

  useEffect(() => {
    if (lastMessage?.type === 'BOSS_ACTION' || lastMessage?.type === 'ROOM_STATE_SYNC') {
      console.log("[ProfBossRaid] Received", lastMessage.type, lastMessage);
      if (lastMessage.bossHp !== undefined) {
        setLocalBossHp(prev => {
          if (lastMessage.bossHp < prev && lastMessage.type === 'BOSS_ACTION') {
            setSlashed(true);
            setTimeout(() => setSlashed(false), 300);
          }
          return lastMessage.bossHp;
        });
      }
      if (lastMessage.classHp !== undefined) setLocalClassHp(lastMessage.classHp);
      if (lastMessage.bossEnergy !== undefined) {
        setEnergy(lastMessage.bossEnergy); // Absolute override from prof
      }
      if (lastMessage?.type === 'BOSS_ACTION' && lastMessage.addBossEnergy !== undefined) {
        setEnergy(prev => {
          const next = prev + lastMessage.addBossEnergy;
          if (next >= 100) {
            setUltimateReady(true);
            return 100;
          }
          return next;
        });
      }
    }
  }, [lastMessage]);

  const healthPercent = Math.max(0, (localBossHp / bossMaxHealth) * 100);

  const [localTimeLeft, setLocalTimeLeft] = useState(timeLeft);
  const [isQuestionActive, setIsQuestionActive] = useState(!!currentQuestion);
  const [slashed, setSlashed] = useState(false);

  const [customQuestion, setCustomQuestion] = useState("");
  const [draggedQ, setDraggedQ] = useState<QuestionItem | null>(null);
  const [overrideActive, setOverrideActive] = useState(false);
  const [globalCooldown, setGlobalCooldown] = useState(0);
  
  // Track questions available to throw
  const [availableQuestions, setAvailableQuestions] = useState<QuestionItem[]>(questions);

  // Energy & Ultimate State
  const [energy, setEnergy] = useState(0);
  const [ultimateReady, setUltimateReady] = useState(false);
  
  // Card Modal State
  const [showCardModal, setShowCardModal] = useState(false);
  const [drawnCards, setDrawnCards] = useState<{ id: string; card: PowerCardData; revealed: boolean }[]>([]);

  // Stagger State
  const [isStaggered, setIsStaggered] = useState(false);
  const [staggerTimer, setStaggerTimer] = useState(0);

  // Class Accuracy
  const [classAccuracy] = useState(82);

  // Damage Log (Start Empty)
  const [damageLog, setDamageLog] = useState<DamageLogEntry[]>([]);

  useEffect(() => {
    setLocalTimeLeft(timeLeft);
    if (timeLeft === 0 && isQuestionActive) {
      setIsQuestionActive(false);
      toast.error("Time's up for this question! Prepare to launch the next one.", {
        position: 'top-right',
        style: { background: 'var(--gm-red)', color: 'white' }
      });
    }
  }, [timeLeft, isQuestionActive]);

  // Sync state if prop changes entirely (e.g. initial load)
  useEffect(() => {
    setAvailableQuestions(questions);
  }, [questions]);

  // Energy Auto-increment (0.5% per second)
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy(prev => {
        const next = prev + 5;
        if (next >= 100) {
          setUltimateReady(true);
          return 100;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Expose or trigger this when a student answers wrong via websocket
  const handleStudentMistake = () => {
    setEnergy(prev => {
      const next = prev + 3;
      if (next >= 100) {
        setUltimateReady(true);
        return 100;
      }
      return next;
    });
  };

  // Stagger Auto-decrement
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStaggered && staggerTimer > 0) {
      interval = setInterval(() => {
        setStaggerTimer(prev => prev - 1);
      }, 1000);
    } else if (isStaggered && staggerTimer === 0) {
      setIsStaggered(false);
    }
    return () => clearInterval(interval);
  }, [isStaggered, staggerTimer]);

  const toggleStagger = () => {
    if (!isStaggered) {
      setIsStaggered(true);
      setStaggerTimer(10);
    } else {
      setIsStaggered(false);
      setStaggerTimer(0);
    }
  };

  const triggerUltimate = () => {
    if (ultimateReady) {
      // Draw 3 random cards from PROF_CARDS
      const shuffled = [...PROF_CARDS].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3).map((c, i) => ({
        id: `drawn-${Date.now()}-${i}`,
        card: c,
        revealed: false
      }));
      setDrawnCards(selected);
      setShowCardModal(true);
    }
  };

  const revealCard = (id: string) => {
    setDrawnCards(prev => prev.map(c => c.id === id ? { ...c, revealed: true } : c));
  };

  const triggerSlash = () => {
    setSlashed(true);
    setTimeout(() => setSlashed(false), 300);
  };

  const useSkill = (skill: PowerCardData) => {
    // Activate skill effect globally
    if (skill.category === 'profOverride') {
      setOverrideActive(true);
      setTimeout(() => setOverrideActive(false), 5000);
      setDamageLog(prev => [{ player: "ALL", action: "OVERRIDE PROTOCOL", value: 0, timestamp: Date.now() }, ...prev]);
    } else if (skill.category === 'profEvasion') {
      setDamageLog(prev => [{ player: "ALL", action: "EVASION PROTOCOL", value: 0, timestamp: Date.now() }, ...prev]);
    } else if (skill.category === 'profTime') {
      setDamageLog(prev => [{ player: "ALL", action: "TIME SQUEEZE", value: 0, timestamp: Date.now() }, ...prev]);
      setLocalTimeLeft(prev => Math.max(0, prev - 6)); // Subtract time
    }
    
    setEnergy(0);
    setUltimateReady(false);
    setShowCardModal(false);
    setGlobalCooldown(3); // Start 3s GCD

    // Broadcast
    if (socketSend) {
      socketSend({
        type: 'BOSS_ACTION',
        bossEnergy: 0,
        bossCardEffect: skill.category === 'profOverride' ? 'OVERRIDE' : skill.category === 'profEvasion' ? 'EVASION' : 'TIME_SQUEEZE'
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (isStaggered || globalCooldown > 0) return;

    if (draggedQ && onLaunchQuestion) {
      onLaunchQuestion(draggedQ);
      // Launching an attack deals damage to the class!
      setDamageLog(prev => [{ player: "BOSS", action: "LAUNCHED QUESTION", value: 0, timestamp: Date.now() }, ...prev]);
      setIsQuestionActive(true);
      triggerSlash();
      
      // Remove from available list
      setAvailableQuestions(prev => prev.filter(q => q !== draggedQ));
      setGlobalCooldown(3); // Start 3s GCD

      if (socketSend) {
        socketSend({
          type: 'BOSS_ACTION',
          // no classHp deduction here anymore
        });
      }
    }
    setDraggedQ(null);
  };

  // Add effect for global cooldown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (globalCooldown > 0) {
      interval = setInterval(() => {
        setGlobalCooldown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [globalCooldown]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const [customQuestionAnswer, setCustomQuestionAnswer] = useState("True");

  const launchCustom = () => {
    if (!customQuestion.trim() || !onLaunchQuestion) return;
    onLaunchQuestion({
      text: customQuestion,
      choices: ["True", "False"],
      answer: customQuestionAnswer
    });
    setCustomQuestion("");
    // Also trigger slash/damage/broadcast for custom question just like handleDrop
    setDamageLog(prev => [{ player: "BOSS", action: "LAUNCHED CUSTOM QUESTION", value: 0, timestamp: Date.now() }, ...prev]);
    setIsQuestionActive(true);
    triggerSlash();
    setGlobalCooldown(3);
    
    if (socketSend) {
      socketSend({
        type: 'BOSS_ACTION',
        // no classHp deduction here anymore
      });
    }
  };

  const studentsWithMockQuarantine = students.map((s, idx) => ({
    ...s,
    isQuarantined: s.isQuarantined !== undefined ? s.isQuarantined : (idx === 0 || idx === 1)
  }));

  return (
    <div className={cn(
      "min-h-screen font-[Manrope] text-white flex overflow-hidden transition-colors duration-500",
      overrideActive ? "bg-[var(--gm-red)]/10" : "bg-[var(--gm-navy)]"
    )}>
      {/* Stagger Overlay */}
      {isStaggered && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[var(--gm-green)]/20 border-2 border-[var(--gm-green)] rounded-3xl p-10 text-center animate-[gm-stagger-flash_0.5s_3]">
            <h2 className="font-[Fredoka] text-3xl font-bold text-[var(--gm-green)] mb-2 uppercase">
              Staggered — Controls Locked
            </h2>
            <div className="text-xl font-bold text-white">
              Recovering in {staggerTimer}s...
            </div>
          </div>
        </div>
      )}

      {/* ── Left Sidebar (Question Bank) ── */}
      <div className="w-[340px] bg-black/20 border-r border-white/[0.05] flex flex-col p-5">
        <h2 className="font-[Fredoka] text-lg text-[var(--gm-yellow)] m-0 mb-4 flex items-center">
          <Zap size={16} className="inline mr-1.5" />
          Ammunition (Bank)
        </h2>
        
        <p className="text-xs text-[var(--gm-muted)] m-0 mb-4">Drag and drop questions onto the battlefield to attack the students.</p>

        <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-2">
          {availableQuestions.map((q, idx) => {
            const isDisabled = globalCooldown > 0 || isStaggered;
            return (
              <div
                key={idx}
                draggable={!isDisabled}
                onDragStart={(e) => {
                  if (isDisabled) return;
                  setDraggedQ(q);
                  e.dataTransfer.setData("text/plain", q.text);
                }}
                onDragEnd={() => setDraggedQ(null)}
                className={cn(
                  "bg-white/[0.03] border border-white/10 p-3 rounded-xl transition-all duration-200",
                  isDisabled ? "opacity-40 grayscale cursor-not-allowed" : "cursor-grab active:cursor-grabbing hover:border-[var(--gm-coral)]/50 hover:bg-white/[0.06]",
                  draggedQ === q && "opacity-50 rotate-2 scale-95"
                )}
              >
                <div className="text-[10px] text-[var(--gm-muted)] mb-1">Q{idx + 1}</div>
                <div className="text-[13px] font-semibold text-white leading-relaxed">{q.text}</div>
              </div>
            );
          })}
        </div>

        {/* Custom Question Throw */}
        <div className="mt-4 bg-[var(--gm-coral)]/10 border border-[var(--gm-coral)] rounded-xl p-4">
          <div className="text-xs font-extrabold text-[var(--gm-coral)] mb-2 uppercase">
            Live Challenge (Custom)
          </div>
          <textarea
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            placeholder="Type a surprise question..."
            className="w-full bg-black/30 border-none rounded-lg p-2.5 text-white text-[13px] resize-none h-[60px] mb-2.5 font-[Manrope] focus:outline-none focus:ring-1 focus:ring-[var(--gm-coral)]"
          />
          <div className="flex gap-4 mb-3">
            <label className="flex items-center gap-1.5 text-[13px] cursor-pointer">
              <input type="radio" name="customAnswer" value="True" checked={customQuestionAnswer === "True"} onChange={() => setCustomQuestionAnswer("True")} className="accent-[var(--gm-coral)]" />
              True
            </label>
            <label className="flex items-center gap-1.5 text-[13px] cursor-pointer">
              <input type="radio" name="customAnswer" value="False" checked={customQuestionAnswer === "False"} onChange={() => setCustomQuestionAnswer("False")} className="accent-[var(--gm-coral)]" />
              False
            </label>
          </div>
          <button 
            onClick={launchCustom} 
            className="w-full bg-[var(--gm-coral)] border-none rounded-lg py-2 text-white font-bold cursor-pointer flex items-center justify-center gap-1.5 hover:scale-[1.02] transition-transform"
          >
            <Send size={14} /> Throw Challenge!
          </button>
        </div>
      </div>

      {/* ── Main Battlefield ── */}
      <div 
        onDrop={handleDrop} 
        onDragOver={handleDragOver}
        className={cn(
          "flex-1 p-8 flex flex-col transition-colors duration-300 relative",
          draggedQ ? "bg-[radial-gradient(circle,rgba(255,107,74,0.1)_0%,transparent_70%)]" : "bg-transparent"
        )}
      >
        {overrideActive && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-40 bg-[var(--gm-red)]/10 animate-[gm-pulse_1s_infinite]">
            <h1 className="text-6xl font-[Fredoka] font-bold text-[var(--gm-red)] opacity-50 uppercase tracking-widest">
              Override Active
            </h1>
          </div>
        )}
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-[Fredoka] text-[28px] font-bold m-0 bg-gradient-to-r from-[var(--gm-coral)] to-[var(--gm-yellow)] bg-clip-text text-transparent">
              Boss Raid Battlefield
            </h1>
            <p className="text-[13px] text-[var(--gm-muted)] mt-1 mb-0">Drop questions here to launch them at the class.</p>
          </div>
          <div className="flex gap-4">
            {/* Class Accuracy Tracker */}
            <div className="flex flex-col items-end justify-center mr-4">
              <div className={cn(
                "text-3xl font-[Fredoka] font-bold leading-none",
                classAccuracy >= 85 ? "text-[var(--gm-green)]" : classAccuracy >= 60 ? "text-[var(--gm-yellow)]" : "text-[var(--gm-red)]"
              )}>
                {classAccuracy}%
              </div>
              <div className="text-[10px] text-[var(--gm-muted)] uppercase font-bold mt-1">
                Last 3 Questions
              </div>
            </div>

            <StatBadge icon={<Shield size={14} />} label="Class HP" value={`${localClassHp}`} color={localClassHp < 300 ? 'coral' : 'indigo'} />
            <StatBadge icon={<Users size={14} />} label="Players" value={`${students.filter(s => s.isActive).length}/${students.length}`} color="indigo" />
            <StatBadge icon={<Clock size={14} />} label="Timer" value={isQuestionActive ? `${localTimeLeft}s` : "--"} color="yellow" />
            <StatBadge icon={<TrendingUp size={14} />} label="Total DMG" value="360" color="coral" />
          </div>
        </div>

        {/* Slash effect */}
        {slashed && (
          <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center bg-[var(--gm-red)]/30">
            <div className="w-[150%] h-[150%] absolute border-[20px] border-[var(--gm-red)] opacity-0 animate-[gm-slash_0.3s_ease-out]" />
            <div className="w-[4px] h-[1000px] bg-white shadow-[0_0_20px_var(--gm-red)] rotate-[-45deg] opacity-0 animate-[gm-slash_0.3s_ease-out]" />
          </div>
        )}

        {/* Boss Health Bar & Energy */}
        <div className="bg-[var(--gm-coral)]/5 border-2 border-[var(--gm-coral)]/30 rounded-2xl p-5 mb-8 flex flex-col gap-4">
          {/* Health */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-base font-extrabold text-[var(--gm-coral)] flex items-center gap-2">
                <Shield size={18} />
                Quiz Guardian (You)
              </span>
              <div className="flex items-center gap-4">
                <button onClick={toggleStagger} className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors cursor-pointer border border-white/20">
                  Toggle Stagger
                </button>
                <span className={cn(
                  "font-[Fredoka] text-lg font-bold",
                  healthPercent < 30 ? "text-[var(--gm-red)]" : "text-[var(--gm-green)]"
                )}>
                  {localBossHp} / {bossMaxHealth} HP
                </span>
              </div>
            </div>
            <div className="w-full h-[18px] bg-black/30 rounded-[9px] overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-[9px] transition-all duration-700 ease-out",
                  healthPercent < 30 ? "bg-gradient-to-r from-[var(--gm-red)] to-[var(--gm-coral)]" : "bg-gradient-to-r from-[var(--gm-coral)] to-[var(--gm-yellow)]"
                )}
                style={{ width: `${healthPercent}%` }} 
              />
            </div>
          </div>

          {/* Energy */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-[var(--gm-indigo)] uppercase">Ultimate Energy</span>
              <span className="text-[11px] font-bold text-[var(--gm-indigo)]">{energy}%</span>
            </div>
            <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden flex items-center mb-4">
              <div 
                className="h-full bg-gradient-to-r from-[var(--gm-indigo)] to-[var(--gm-coral)] bg-[length:200%_100%] animate-[gm-energy-charge_2s_linear_infinite] transition-all duration-300"
                style={{ width: `${energy}%` }}
              />
            </div>

          {ultimateReady && (
            <button 
              onClick={triggerUltimate}
              className="mt-2 animate-[gm-glow-pulse_1s_infinite] bg-[var(--gm-coral)] text-white font-bold rounded-xl px-6 py-3 hover:scale-105 cursor-pointer self-center border-none shadow-[0_0_15px_rgba(255,107,74,0.5)] transition-transform"
            >
              ⚡ DRAW ULTIMATE CARDS
            </button>
          )}
          </div>
        </div>

        {/* Chibi Student Grid (Drop Target) */}
        <div className={cn(
          "flex-1 border-2 border-dashed rounded-3xl p-8 flex flex-col transition-all duration-300",
          draggedQ ? "border-[var(--gm-coral)] bg-[var(--gm-coral)]/5 scale-[1.01]" : "border-white/10 bg-white/[0.02]"
        )}>
          <div className="flex items-center gap-2 mb-6 self-center">
            <Swords size={24} className="text-[var(--gm-yellow)]" />
            <span className="text-base font-extrabold text-[var(--gm-yellow)] uppercase">
              Target: The Class
            </span>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(90px,1fr))] gap-6 justify-items-center mb-auto">
            {studentsWithMockQuarantine.map(s => (
              <div key={s.id} className="relative">
                <ChibiAvatar name={s.name} color={s.avatarColor} size={72} isActive={s.isActive} score={s.score} />
                {s.isQuarantined && (
                  <>
                    <div className="absolute inset-[-4px] rounded-full ring-2 ring-amber-400 animate-[gm-amber-pulse_1.5s_infinite] pointer-events-none" />
                    <div className="absolute -top-2 -right-2 bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-lg z-10 border-2 border-[var(--gm-navy)]">
                      <AlertTriangle size={12} strokeWidth={3} />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          
          {draggedQ && (
            <div className="mt-8 mx-auto px-6 py-4 bg-[var(--gm-coral)] text-white rounded-2xl font-bold text-lg animate-[gm-pulse_1s_infinite] shadow-[0_0_20px_rgba(255,107,74,0.4)]">
              Drop to Launch Attack!
            </div>
          )}
        </div>

        {/* Damage Log */}
        <div className="mt-6 bg-white/[0.02] border border-white/5 rounded-2xl p-4 max-h-48 overflow-y-auto space-y-1">
          <div className="text-xs font-bold text-[var(--gm-muted)] uppercase mb-3 sticky top-0 pb-1">
            Combat Log
          </div>
          {damageLog.map((log, idx) => (
            <div key={idx} className="flex items-center gap-2 text-[13px] py-1 border-b border-white/[0.02] last:border-0">
              <span className="text-white font-medium">{log.player}</span>
              <span className="text-[var(--gm-muted)]">→</span>
              <span className={cn(
                "font-bold",
                log.action === "MISS" ? "text-[var(--gm-red)]" : "text-[var(--gm-green)]"
              )}>
                {log.action}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Selection Modal */}
      {showCardModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-[Fredoka] font-bold text-[var(--gm-yellow)] mb-2 uppercase animate-[gm-pulse_1s_infinite]">
              Select Ultimate Protocol
            </h2>
            <p className="text-[var(--gm-muted)] mb-8">Click a mystery card to reveal it, then apply to the class.</p>
            
            <div className="flex gap-8 items-center justify-center">
              {drawnCards.map((c) => (
                <div key={c.id} className="flex flex-col items-center gap-4">
                  <div onClick={() => revealCard(c.id)}>
                    <PowerCard
                      card={c.card}
                      state={c.revealed ? 'revealed' : 'locked'}
                      size="lg"
                    />
                  </div>
                  {c.revealed && (
                    <button
                      onClick={() => useSkill(c.card)}
                      className="bg-[var(--gm-coral)] hover:bg-[var(--gm-red)] text-white font-bold px-6 py-2 rounded-xl transition-colors cursor-pointer animate-[gm-float-up_0.5s_ease-out]"
                    >
                      Apply Globally
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatBadge({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: 'indigo' | 'yellow' | 'coral'; }) {
  const colorMap = {
    indigo: { text: "text-[var(--gm-indigo)]", border: "border-[var(--gm-indigo)]/30" },
    yellow: { text: "text-[var(--gm-yellow)]", border: "border-[var(--gm-yellow)]/30" },
    coral: { text: "text-[var(--gm-coral)]", border: "border-[var(--gm-coral)]/30" },
  };
  
  return (
    <div className={cn("flex items-center gap-2 rounded-xl px-4 py-2 border bg-white/[0.02] backdrop-blur-sm", colorMap[color].border)}>
      <span className={colorMap[color].text}>{icon}</span>
      <div>
        <div className="text-[10px] font-bold text-[var(--gm-muted)] uppercase">{label}</div>
        <div className={cn("font-[Fredoka] text-base font-bold", colorMap[color].text)}>{value}</div>
      </div>
    </div>
  );
}
