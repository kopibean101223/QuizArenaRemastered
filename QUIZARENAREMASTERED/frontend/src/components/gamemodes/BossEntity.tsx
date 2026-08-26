import React from 'react';
import { cn } from '@/components/ui/utils';

interface BossEntityProps {
  health: number;
  maxHealth: number;
  name?: string;
  stage?: number;
}

export function BossEntity({ health, maxHealth, name = "Quiz Guardian", stage = 1 }: BossEntityProps) {
  const healthPercent = Math.max(0, Math.min(100, (health / maxHealth) * 100));
  const isEnraged = healthPercent < 30;

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      
      {/* Boss Name & Stage */}
      <div className="text-center">
        <div className="font-[Manrope] text-sm font-extrabold text-[var(--gm-yellow)] uppercase tracking-[3px] mb-2">
          Stage {stage}
        </div>
        <div className={cn(
          "font-[Fredoka] text-[32px] font-extrabold transition-all duration-500",
          isEnraged 
            ? "text-[var(--gm-red)] drop-shadow-[0_0_25px_rgba(255,71,87,0.6)]" 
            : "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
        )}>
          {name}
        </div>
      </div>

      {/* Boss SVG */}
      <div className={cn(
        "relative transition-[filter] duration-500",
        isEnraged ? "animate-[gm-enraged_2s_infinite_ease-in-out]" : "animate-[gm-float_4s_infinite_ease-in-out]"
      )}>
        <svg width="240" height="270" viewBox="0 0 200 220" fill="none">
          {/* Shadow on ground */}
          <ellipse cx="100" cy="210" rx="55" ry="8" fill="rgba(0,0,0,0.25)" />

          {/* Creepy Tentacles */}
          <path d="M 60 160 Q 20 220 10 180 Q 20 150 50 170 Z" fill="#1A0F3D" />
          <path d="M 140 160 Q 180 220 190 180 Q 180 150 150 170 Z" fill="#1A0F3D" />
          <path d="M 80 180 Q 60 230 40 210 Q 50 180 80 190 Z" fill="#11052B" />
          <path d="M 120 180 Q 140 230 160 210 Q 150 180 120 190 Z" fill="#11052B" />

          {/* Robe / Body - Darker and jagged */}
          <path d="M 60 100 Q 40 125 45 185 L 100 210 L 155 185 Q 160 125 140 100 Z"
                fill="#11052B" />
          <path d="M 75 120 L 80 195 L 120 195 L 125 120 Z"
                fill="#1A0F3D" opacity="0.65" />

          {/* Head - Sharp angles */}
          <polygon points="100,30 60,80 70,110 130,110 140,80" fill="#11052B" />

          {/* Crown / Horns - sharp red/black */}
          <path d="M 67 57 L 40 10 L 74 48 Z" fill={isEnraged ? '#FF4757' : '#5B3DF6'} />
          <path d="M 133 57 L 160 10 L 126 48 Z" fill={isEnraged ? '#FF4757' : '#5B3DF6'} />
          <path d="M 90 42 L 84 0 L 100 34 L 116 0 L 110 42 Z" fill={isEnraged ? '#FF4757' : '#5B3DF6'} />

          {/* Multiple Eyes */}
          <ellipse cx="80" cy="70" rx="10" ry="4" fill={isEnraged ? '#FF4757' : '#FFC93C'} transform="rotate(-15 80 70)" />
          <ellipse cx="120" cy="70" rx="10" ry="4" fill={isEnraged ? '#FF4757' : '#FFC93C'} transform="rotate(15 120 70)" />
          <circle cx="100" cy="60" r="5" fill="#FF4757" opacity={isEnraged ? 1 : 0.2} />
          
          <ellipse cx="80" cy="70" rx="3" ry="2" fill="#000" />
          <ellipse cx="120" cy="70" rx="3" ry="2" fill="#000" />

          {/* Jagged Mouth */}
          <path d="M 75 95 L 85 90 L 100 100 L 115 90 L 125 95 L 115 105 L 100 95 L 85 105 Z" 
                fill={isEnraged ? '#FF4757' : '#7B61FF'} />

          {/* Chest gem */}
          <polygon points="100,120 115,145 100,170 85,145" fill={isEnraged ? '#FF4757' : '#FFC93C'} />
          <polygon points="100,130 108,145 100,160 92,145"
                   fill={isEnraged ? '#FF6B7A' : '#FFD966'} opacity="0.8" />

          {/* Sharp Arms */}
          <path d="M 60 112 Q 10 100 24 146 Q 22 170 36 156 Q 46 154 52 142 Q 56 134 55 118 Z"
                fill="#11052B" />
          <path d="M 140 112 Q 190 100 176 146 Q 178 170 164 156 Q 154 154 148 142 Q 144 134 145 118 Z"
                fill="#11052B" />
        </svg>
      </div>

      {/* Health Bar */}
      <div className="w-full max-w-[320px]">
        <div className="flex justify-between mb-1.5">
          <span className="font-[Manrope] text-sm font-extrabold text-white/70">
            BOSS HP
          </span>
          <span className={cn(
            "font-[Fredoka] text-base font-bold",
            isEnraged ? "text-[var(--gm-red)]" : "text-[var(--gm-green)]"
          )}>
            {health} / {maxHealth}
          </span>
        </div>
        <div className="w-full h-4 bg-black/30 rounded-lg overflow-hidden border border-white/10">
          <div 
            className="h-full rounded-lg transition-all duration-500"
            style={{ 
              width: `${healthPercent}%`,
              background: isEnraged
                ? 'linear-gradient(90deg, #FF4757, #FF6B4A)'
                : healthPercent > 50
                  ? 'linear-gradient(90deg, #2ED47A, #4AE68C)'
                  : 'linear-gradient(90deg, #FFC93C, #FFD966)',
              boxShadow: isEnraged ? '0 0 16px rgba(255,71,87,0.8)' : 'none',
            }}
          />
        </div>
      </div>
    </div>
  );
}
