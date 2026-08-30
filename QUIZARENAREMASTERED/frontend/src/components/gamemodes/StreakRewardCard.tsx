'use client';

import React, { useState } from 'react';
import { cn } from '@/components/ui/utils';

/* ── Reward pool (placeholder) ───────────────────────────────────────── */
const REWARDS = [
  { name: 'Extra Life',   icon: '❤️' },
  { name: 'Score Boost',  icon: '⚡' },
  { name: 'Time Freeze',  icon: '❄️' },
  { name: 'Shield',       icon: '🛡️' },
  { name: 'Double Points', icon: '💎' },
  { name: 'Mystic Orb',   icon: '🔮' },
];

interface StreakRewardCardProps {
  /** The current streak count that triggered this card (displayed in header) */
  streak?: number;
  /** Called when the player collects / dismisses the card */
  onCollect?: (rewardName: string) => void;
}

export function StreakRewardCard({ streak = 5, onCollect }: StreakRewardCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [reward] = useState(() => REWARDS[Math.floor(Math.random() * REWARDS.length)]);

  const handleFlip = () => {
    if (!isFlipped) setIsFlipped(true);
  };

  const handleCollect = () => {
    onCollect?.(reward.name);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center z-50 gap-6">
      {/* Streak title */}
      <div className="animate-[gm-combo-pop_0.4s_ease-out] text-center">
        <p className="font-[Fredoka] text-lg font-bold text-white/60 uppercase tracking-[3px] mb-1">
          🔥 Streak Bonus
        </p>
        <h2 className="font-[Fredoka] text-4xl font-bold text-[var(--gm-yellow)] drop-shadow-[0_0_20px_rgba(255,201,60,0.5)]">
          {streak} in a Row!
        </h2>
      </div>

      {/* 3D Card */}
      <div className="[perspective:800px] cursor-pointer" onClick={handleFlip}>
        <div
          className={cn(
            'relative w-52 h-72 transition-transform duration-700 [transform-style:preserve-3d]',
            isFlipped && '[transform:rotateY(180deg)]'
          )}
        >
          {/* Front face */}
          <div
            className={cn(
              'absolute inset-0 [backface-visibility:hidden]',
              'bg-gradient-to-br from-[var(--gm-indigo)] to-[var(--gm-coral)]',
              'rounded-2xl flex flex-col items-center justify-center gap-3',
              'shadow-2xl border-2 border-white/20',
              'hover:scale-[1.03] transition-transform duration-200'
            )}
          >
            {/* Decorative pattern */}
            <div className="absolute inset-3 border-2 border-white/10 rounded-xl pointer-events-none" />
            <span className="text-7xl drop-shadow-lg">❓</span>
            <span className="font-[Fredoka] text-base font-bold text-white/70 uppercase tracking-widest">
              Tap to Reveal
            </span>
          </div>

          {/* Back face */}
          <div
            className={cn(
              'absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]',
              'bg-gradient-to-br from-[var(--gm-yellow)] to-[var(--gm-green)]',
              'rounded-2xl flex flex-col items-center justify-center gap-2',
              'shadow-2xl border-2 border-white/30'
            )}
          >
            <div className="absolute inset-3 border-2 border-black/10 rounded-xl pointer-events-none" />
            <span className="text-6xl drop-shadow-lg animate-[gm-combo-pop_0.5s_ease-out_0.7s_both]">
              {reward.icon}
            </span>
            <span className="font-[Fredoka] text-2xl font-bold text-[var(--gm-navy)] animate-[gm-slide-down_0.4s_ease-out_0.9s_both]">
              {reward.name}
            </span>
            <span className="text-sm font-semibold text-[var(--gm-navy)]/60 animate-[gm-slide-down_0.4s_ease-out_1.1s_both]">
              Power-up unlocked!
            </span>
          </div>
        </div>
      </div>

      {/* Collect button — only visible after flip */}
      <button
        onClick={handleCollect}
        className={cn(
          'px-10 py-3 rounded-xl font-[Fredoka] text-lg font-bold',
          'transition-all duration-300',
          isFlipped
            ? 'bg-[var(--gm-indigo)] text-white shadow-[0_4px_20px_rgba(91,61,246,0.4)] hover:scale-105 active:scale-95 cursor-pointer animate-[gm-slide-down_0.3s_ease-out_1.3s_both]'
            : 'bg-white/10 text-white/30 cursor-default pointer-events-none'
        )}
      >
        {isFlipped ? 'Collect & Continue →' : 'Flip the card first!'}
      </button>
    </div>
  );
}

