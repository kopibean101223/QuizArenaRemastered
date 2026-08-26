import React, { useState } from 'react';
import { cn } from '@/components/ui/utils';

interface CheckpointCardProps {
  stage: number;
  onContinue?: (selectedPowerUp?: string) => void;
}

const POWER_UP_SLOTS = [
  { name: 'Shield',        icon: '🛡️' },
  { name: 'Double Points',  icon: '⚡' },
  { name: 'Time Freeze',   icon: '❄️' },
];

export function CheckpointCard({ stage, onContinue }: CheckpointCardProps) {
  const checkpointNumber = Math.floor(stage / 5);   // 1st at stage 5, 2nd at 10, etc.
  const [selectedPowerUp, setSelectedPowerUp] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/[0.72] backdrop-blur-lg z-[100]">
      <div className="bg-gradient-to-br from-[var(--gm-navy)] to-[#2D2B4E] border-2 border-[var(--gm-yellow)] rounded-3xl px-10 py-8 text-center max-w-[420px] w-[90%] shadow-[0_0_40px_rgba(255,201,60,0.15),0_20px_60px_rgba(0,0,0,0.5)]">
        {/* Icon */}
        <div className="text-5xl mb-2">🏁</div>

        {/* Title */}
        <h2 className="font-[Fredoka] text-[28px] font-bold text-[var(--gm-yellow)] mb-1">
          Checkpoint!
        </h2>

        <p className="font-[Manrope] text-sm font-semibold text-white/65 mb-5">
          Stage {stage} cleared
        </p>

        {/* Progress dots – up to 5 checkpoints visualised */}
        <div className="flex justify-center gap-1.5 mb-6">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className={cn(
              "w-2.5 h-2.5 rounded-full transition-colors duration-300",
              i < checkpointNumber ? "bg-[var(--gm-yellow)]" : "bg-white/[0.12]"
            )} />
          ))}
        </div>

        {/* Power-up interactive slots */}
        <div className="mb-6">
          <span className="font-[Manrope] text-[10px] font-bold text-white/[0.35] uppercase tracking-[1.5px]">
            Select a Power-up
          </span>

          <div className="flex justify-center gap-3 mt-3">
            {POWER_UP_SLOTS.map((slot, i) => {
              const isSelected = selectedPowerUp === slot.name;
              return (
                <div 
                  key={i} 
                  onClick={() => setSelectedPowerUp(slot.name)}
                  className={cn(
                    "w-[70px] h-[70px] rounded-[14px] flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-200",
                    isSelected 
                      ? "bg-[var(--gm-yellow)]/15 border-2 border-[var(--gm-yellow)] scale-110 shadow-[0_0_15px_rgba(255,201,60,0.33)]"
                      : "bg-white/[0.04] border-[1.5px] border-dashed border-white/[0.14]"
                  )}>
                  <span className="text-2xl">{slot.icon}</span>
                  <span className={cn(
                    "font-[Manrope] text-[8px] font-bold text-center leading-none",
                    isSelected ? "text-[var(--gm-yellow)]" : "text-white/[0.45]"
                  )}>
                    {slot.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Continue button */}
        <button 
          onClick={() => onContinue?.(selectedPowerUp || undefined)}
          className="bg-gradient-to-r from-[var(--gm-indigo)] to-[#7B5BF7] text-white border-none rounded-xl px-9 py-3 font-[Fredoka] text-base font-bold cursor-pointer transition-all duration-150 shadow-[0_4px_20px_rgba(91,61,246,0.4)] hover:scale-105 active:scale-95">
          {selectedPowerUp ? 'Claim & Continue →' : 'Continue →'}
        </button>
      </div>
    </div>
  );
}
