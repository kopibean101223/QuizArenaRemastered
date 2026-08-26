'use client';

import React from 'react';
import { Eye, Users, Flag, Target, Zap, Activity } from 'lucide-react';
import { cn } from '@/components/ui/utils';

/* ── Design tokens & Utilities ────────────────────────────────────────── */
const AVATAR_COLORS = [
  '#5B3DF6', '#FF6B4A', '#2ED47A', '#FFC93C', '#FF4757',
  '#5BC8F6', '#B06EF6', '#FF9F40', '#E040FB', '#00BCD4',
];

/* ── Mock data ────────────────────────────────────────────────────────── */
interface MockStudent {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  currentStage: number;
  isEliminated: boolean;
  combo: number;
  streak: number;
}

const MOCK_STUDENTS: MockStudent[] = [
  { id: '1', name: 'Alice Chen',     initials: 'AC', avatarColor: AVATAR_COLORS[0], currentStage: 14, isEliminated: false, combo: 4, streak: 12 },
  { id: '2', name: 'Bob Martinez',   initials: 'BM', avatarColor: AVATAR_COLORS[1], currentStage: 12, isEliminated: false, combo: 2, streak: 5 },
  { id: '3', name: 'Charlie Kim',    initials: 'CK', avatarColor: AVATAR_COLORS[2], currentStage: 11, isEliminated: false, combo: 1, streak: 2 },
  { id: '4', name: 'Dana Reyes',     initials: 'DR', avatarColor: AVATAR_COLORS[3], currentStage: 10, isEliminated: false, combo: 3, streak: 8 },
  { id: '5', name: 'Ethan Wu',       initials: 'EW', avatarColor: AVATAR_COLORS[4], currentStage: 8,  isEliminated: false, combo: 1, streak: 0 },
  { id: '6', name: 'Fiona Davis',    initials: 'FD', avatarColor: AVATAR_COLORS[5], currentStage: 5,  isEliminated: true,  combo: 1, streak: 0 },
];

const MOCK_QUESTION = {
  text: 'In a binary search tree, what is the time complexity of search in the average case?',
  choices: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
  answer: 'O(log n)',
  distribution: [15, 78, 5, 2], // Placeholder percentage distribution
};

interface ProfEndlessModeProps {
  students?: { id: string; name: string; initials: string; avatarColor: string; currentStage: number; isEliminated: boolean; }[];
  currentStage?: number;
  currentQuestion?: { text: string; choices: string[]; answer: string; } | null;
}

export function ProfEndlessMode({ students = MOCK_STUDENTS, currentStage = 12, currentQuestion = MOCK_QUESTION }: ProfEndlessModeProps) {
  const CHECKPOINT_INTERVAL = 5;
  const totalVisible = Math.max(currentStage + 3, 18);
  const activePlayers = students.filter(s => !s.isEliminated).length;

  return (
    <div className="min-h-screen bg-[var(--gm-navy)] p-6 font-[Manrope] text-white">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="mb-6">
        <h1 className="font-[Fredoka] text-2xl font-bold m-0 bg-gradient-to-r from-[var(--gm-yellow)] to-[var(--gm-coral)] bg-clip-text text-transparent">
          ⚡ Endless Mode — Professor View
        </h1>
        <p className="text-xs text-[var(--gm-muted)] mt-1">
          Students advance individually · Checkpoint every {CHECKPOINT_INTERVAL} stages · Not live
        </p>
      </div>

      {/* ── Live Stats Dashboard ────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2 bg-[var(--gm-indigo)]/10 border border-[var(--gm-indigo)]/30 rounded-xl px-4 py-2">
          <Target size={16} className="text-[var(--gm-indigo)]" />
          <div className="flex flex-col">
            <span className="text-[10px] text-[var(--gm-muted)] font-bold uppercase">Class Accuracy</span>
            <span className="text-sm font-[Fredoka] font-bold text-white">78%</span>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-[var(--gm-indigo)]/10 border border-[var(--gm-indigo)]/30 rounded-xl px-4 py-2">
          <Zap size={16} className="text-[var(--gm-yellow)]" />
          <div className="flex flex-col">
            <span className="text-[10px] text-[var(--gm-muted)] font-bold uppercase">Average Combo</span>
            <span className="text-sm font-[Fredoka] font-bold text-white">3.2×</span>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-[var(--gm-indigo)]/10 border border-[var(--gm-indigo)]/30 rounded-xl px-4 py-2">
          <Activity size={16} className="text-[var(--gm-coral)]" />
          <div className="flex flex-col">
            <span className="text-[10px] text-[var(--gm-muted)] font-bold uppercase">Top Streak</span>
            <span className="text-sm font-[Fredoka] font-bold text-white">12</span>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-[var(--gm-indigo)]/10 border border-[var(--gm-indigo)]/30 rounded-xl px-4 py-2">
          <Users size={16} className="text-[var(--gm-green)]" />
          <div className="flex flex-col">
            <span className="text-[10px] text-[var(--gm-muted)] font-bold uppercase">Active Players</span>
            <span className="text-sm font-[Fredoka] font-bold text-white">{activePlayers}</span>
          </div>
        </div>
      </div>

      {/* ── Stage Progress Track ────────────────────────────────────── */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 mb-6 overflow-x-auto">
        <div className="flex items-center gap-2 mb-3">
          <Flag size={14} className="text-[var(--gm-yellow)]" />
          <span className="text-xs font-extrabold text-[var(--gm-yellow)] uppercase">
            Stage Progress
          </span>
        </div>

        <div className="flex items-center gap-0 relative" style={{ minWidth: totalVisible * 40 }}>
          {Array.from({ length: totalVisible }, (_, i) => {
            const stageNum = i + 1;
            const isCheckpoint = stageNum % CHECKPOINT_INTERVAL === 0;
            const isCurrent = stageNum === currentStage;
            const isPassed = stageNum < currentStage;

            return (
              <React.Fragment key={stageNum}>
                {/* Connector line */}
                {i > 0 && (
                  <div className={cn(
                    "w-5 h-0.5 shrink-0",
                    isPassed ? "bg-[var(--gm-indigo)]" : "bg-white/[0.08]"
                  )} />
                )}

                {/* Stage node */}
                <div className={cn(
                  "flex items-center justify-center font-[Fredoka] font-bold text-white shrink-0 transition-all duration-300",
                  isCheckpoint ? "w-9 h-9 rounded-[10px] text-[11px]" : "w-6 h-6 rounded-full text-[9px]",
                  isCurrent ? "bg-[var(--gm-indigo)] border-2 border-[var(--gm-yellow)] shadow-[0_0_12px_rgba(91,61,246,0.5)]" 
                    : isPassed 
                      ? isCheckpoint ? "bg-[var(--gm-yellow)] border-2 border-[var(--gm-yellow)]" : "bg-[var(--gm-indigo)]/60 border-2 border-transparent"
                      : "bg-white/[0.06] border-2 border-transparent"
                )}>
                  {isCheckpoint ? '🏁' : stageNum}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ── Student Status List ─────────────────────────────────────── */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Users size={16} className="text-[var(--gm-indigo)]" />
          <span className="text-xs font-extrabold text-[var(--gm-indigo)] uppercase">
            Student Progress ({activePlayers} active)
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {[...students].sort((a, b) => {
            if (a.isEliminated && !b.isEliminated) return 1;
            if (!a.isEliminated && b.isEliminated) return -1;
            return b.currentStage - a.currentStage;
          }).map((s, index) => {
            const isGauntlet = s.currentStage % CHECKPOINT_INTERVAL === 0 && !s.isEliminated;
            const mockExtras = MOCK_STUDENTS.find(m => m.id === s.id) || { combo: 1, streak: 0 };
            
            return (
              <div key={s.id} className={cn(
                "flex items-center gap-3 rounded-xl px-3.5 py-2.5",
                s.isEliminated 
                  ? "bg-[var(--gm-red)]/[0.06] border border-[var(--gm-red)]/[0.15] opacity-40" 
                  : isGauntlet
                    ? "bg-[var(--gm-red)]/10 border border-[var(--gm-red)]/30"
                    : "bg-white/[0.03] border border-white/[0.06]"
              )}>
                {/* Rank */}
                <span className={cn(
                  "font-[Fredoka] text-sm font-bold min-w-[22px]",
                  index === 0 && !s.isEliminated ? "text-[var(--gm-yellow)]" 
                    : index === 1 && !s.isEliminated ? "text-[#C0C0C0]" 
                    : index === 2 && !s.isEliminated ? "text-[#CD7F32]" 
                    : "text-[var(--gm-muted)]"
                )}>
                  #{index + 1}
                </span>

                {/* Avatar */}
                <div 
                  className="w-9 h-9 rounded-full flex items-center justify-center font-[Fredoka] text-sm font-bold text-white shrink-0"
                  style={{ background: `linear-gradient(145deg, ${s.avatarColor}, ${s.avatarColor}cc)` }}
                >
                  {s.initials}
                </div>

                {/* Info */}
                <div className="flex-1 flex items-center gap-2">
                  <span className={cn(
                    "text-[13px] font-bold",
                    s.isEliminated ? "text-[var(--gm-red)]" : "text-white/85"
                  )}>
                    {s.name}
                  </span>
                  
                  {s.isEliminated && (
                    <span className="text-[10px] text-[var(--gm-red)] flex items-center gap-1 ml-1">
                      ☠ Eliminated
                    </span>
                  )}
                  
                  {isGauntlet && !s.isEliminated && (
                    <span className="text-[10px] bg-[var(--gm-red)]/20 text-[var(--gm-red)] font-bold rounded px-1.5 py-0.5 ml-1 border border-[var(--gm-red)]/30">
                      ⚠ GAUNTLET
                    </span>
                  )}
                  
                  {!s.isEliminated && mockExtras.combo > 1 && (
                    <span className="bg-[var(--gm-yellow)]/15 text-[var(--gm-yellow)] text-[10px] font-bold rounded px-1.5 ml-1">
                      {mockExtras.combo}× Combo
                    </span>
                  )}
                  
                  {!s.isEliminated && mockExtras.streak > 2 && (
                    <span className="text-[10px] text-[var(--gm-coral)] font-bold ml-1">
                      🔥{mockExtras.streak}
                    </span>
                  )}
                </div>

                {/* Stage progress bar */}
                <div className="w-[120px]">
                  <div className="flex justify-between mb-[3px]">
                    <span className="text-[9px] font-bold text-[var(--gm-muted)]">Stage</span>
                    <span className={cn(
                      "font-[Fredoka] text-[11px] font-bold",
                      isGauntlet ? "text-[var(--gm-yellow)]" : "text-white"
                    )}>
                      {s.currentStage}
                    </span>
                  </div>
                  <div className="w-full h-[5px] bg-white/[0.06] rounded-[3px] overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-[3px] transition-all duration-500 ease-out",
                        s.isEliminated ? "bg-[var(--gm-red)]" : ""
                      )} 
                      style={!s.isEliminated ? { 
                        width: `${Math.min(100, (s.currentStage / 20) * 100)}%`,
                        background: `linear-gradient(90deg, var(--gm-indigo), ${s.avatarColor})` 
                      } : {
                        width: `${Math.min(100, (s.currentStage / 20) * 100)}%`
                      }} 
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Question Inspection Panel ───────────────────────────────── */}
      <div className="bg-[var(--gm-indigo)]/12 border-2 border-[var(--gm-indigo)] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <Eye size={18} className="text-[var(--gm-yellow)]" />
            <span className="text-[13px] font-extrabold text-[var(--gm-yellow)] uppercase">
              Current Question Preview
            </span>
          </div>
          <span className="bg-[var(--gm-yellow)]/20 text-[var(--gm-yellow)] text-xs font-bold px-2 py-1 rounded-md border border-[var(--gm-yellow)]/30">
            Medium
          </span>
        </div>

        <p className="text-lg font-bold text-white m-0 mb-4">
          {currentQuestion?.text || MOCK_QUESTION.text}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {(currentQuestion?.choices || MOCK_QUESTION.choices).map((choice, i) => {
            const isCorrect = choice === (currentQuestion?.answer || MOCK_QUESTION.answer);
            const dist = MOCK_QUESTION.distribution[i];
            
            return (
              <div key={i} className={cn(
                "relative overflow-hidden border-[1.5px] p-3 rounded-xl text-sm flex flex-col justify-center",
                isCorrect 
                  ? "bg-[var(--gm-green)]/10 border-[var(--gm-green)] text-[var(--gm-green)] font-bold" 
                  : "bg-black/30 border-white/10 text-white/85 font-medium"
              )}>
                {/* Distribution Bar Background */}
                <div 
                  className={cn(
                    "absolute left-0 top-0 bottom-0 opacity-20 transition-all duration-1000",
                    isCorrect ? "bg-[var(--gm-green)]" : "bg-white"
                  )}
                  style={{ width: `${dist}%` }}
                />
                
                <div className="relative z-10 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="font-bold opacity-70">{['A', 'B', 'C', 'D'][i]}.</span> 
                    {choice}
                  </span>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-xs opacity-75">{dist}%</span>
                    {isCorrect && (
                      <span className="text-[10px] bg-[var(--gm-green)] text-white px-1.5 py-0.5 rounded flex items-center gap-1">
                        ✓ Correct
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
