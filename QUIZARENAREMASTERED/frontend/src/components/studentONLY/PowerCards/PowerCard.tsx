'use client';

import React from 'react';
import { CARD_CATEGORY_META, type PowerCardData } from './types';

export type PowerCardVisualState = 'locked' | 'revealed';
export type PowerCardSize = 'sm' | 'md' | 'lg';

export interface PowerCardProps {
  /** Omit (or pass null) to render the face-down "mystery" card seen in the battle overlay. */
  card?: PowerCardData | null;
  /** 'locked' = gold diamond mystery back. 'revealed' = flips to show category icon + copy. */
  state?: PowerCardVisualState;
  size?: PowerCardSize;
  /** Draws the highlighted selection ring, same treatment used for the chosen MCQ option elsewhere in the app. */
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  /** When true, renders a small lightning-bolt badge on the card corner to mark it as a power-up reward. */
  powerUp?: boolean;
}

const SIZE_MAP: Record<PowerCardSize, { w: string; h: string; gem: string; icon: number; name: string; desc: string }> = {
  sm: { w: 'w-24', h: 'h-32', gem: 'w-9 h-9', icon: 16, name: 'text-[10px]', desc: 'text-[8px]' },
  md: { w: 'w-32', h: 'h-44', gem: 'w-14 h-14', icon: 22, name: 'text-xs', desc: 'text-[9px]' },
  lg: { w: 'w-40', h: 'h-56', gem: 'w-20 h-20', icon: 28, name: 'text-sm', desc: 'text-[10px]' },
};

const MYSTERY_ACCENT = '#F5C542';

/**
 * Base card shell reused for every power type in the game. The "front" is
 * category-driven (icon/color come from CARD_CATEGORY_META, keyed off
 * card.category), so this component never needs to know about damage vs.
 * shield vs. hp etc. — new categories are a data change, not a code change.
 *
 * Locked -> revealed is a real 3D flip: both faces are always in the DOM,
 * back-face-hidden, and the inner wrapper rotates on the Y axis whenever
 * `state` changes to 'revealed'. Toggle the `state` prop from a parent
 * (e.g. after a reveal delay, or immediately on click) to trigger it.
 */
export function PowerCard({
  card = null,
  state = 'locked',
  size = 'md',
  selected = false,
  disabled = false,
  onClick,
  className = '',
  powerUp = false,
}: PowerCardProps) {
  const dims = SIZE_MAP[size];
  const isRevealed = state === 'revealed' && !!card;
  const meta = card ? CARD_CATEGORY_META[card.category] : null;
  const frontAccent = MYSTERY_ACCENT; // locked/back face is always mystery-gold
  const backAccent = meta ? meta.color : MYSTERY_ACCENT;
  const Icon = meta?.icon;

  return (
    <div
      className={[dims.w, dims.h, disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer', className].join(' ')}
      style={{ perspective: '1000px', position: 'relative' }}
      onClick={disabled ? undefined : onClick}
      role="button"
      aria-label={isRevealed && card ? card.name : 'Mystery power card'}
    >
      {/* Power-up badge overlay */}
      {powerUp && (
        <span
          className="absolute -top-1.5 -right-1.5 z-20 flex items-center justify-center w-6 h-6 rounded-full text-[11px]"
          style={{
            background: 'linear-gradient(135deg, #FFC93C, #FF6B4A)',
            boxShadow: '0 2px 8px rgba(255,201,60,0.5)',
            border: '2px solid #0b0916',
          }}
          title="Power-up reward"
        >
          ⚡
        </span>
      )}
      <div
        className="relative w-full h-full transition-transform duration-500 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* BACK FACE OF THE CARD (shown first) — mystery gold diamond */}
        <div
          className="group absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-2xl border-2 transition-shadow duration-300"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: 'radial-gradient(circle at 50% 28%, #26193f 0%, #150f24 62%, #0b0916 100%)',
            borderColor: frontAccent,
            boxShadow: selected
              ? `0 0 0 3px ${frontAccent}, 0 0 26px ${frontAccent}99`
              : `0 0 16px ${frontAccent}4d, inset 0 0 22px rgba(0,0,0,0.55)`,
          }}
        >
          <CornerMark pos="top-2 left-2" color={frontAccent} />
          <CornerMark pos="top-2 right-2" color={frontAccent} />
          <CornerMark pos="bottom-2 left-2" color={frontAccent} />
          <CornerMark pos="bottom-2 right-2" color={frontAccent} />
          <Diamond size={dims.gem} color={frontAccent} />
        </div>

        {/* FRONT FACE (revealed) — pre-rotated 180deg so it reads right-side-up once the flip completes */}
        <div
          className="group absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-2xl border-2 transition-shadow duration-300"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'radial-gradient(circle at 50% 28%, #26193f 0%, #150f24 62%, #0b0916 100%)',
            borderColor: backAccent,
            boxShadow: selected
              ? `0 0 0 3px ${backAccent}, 0 0 26px ${backAccent}99`
              : `0 0 16px ${backAccent}4d, inset 0 0 22px rgba(0,0,0,0.55)`,
          }}
        >
          <CornerMark pos="top-2 left-2" color={backAccent} />
          <CornerMark pos="top-2 right-2" color={backAccent} />
          <CornerMark pos="bottom-2 left-2" color={backAccent} />
          <CornerMark pos="bottom-2 right-2" color={backAccent} />

          {card && (
            <div className="z-10 flex flex-col items-center gap-1.5 px-2.5 text-center">
              <div
                className={`${dims.gem} rounded-xl flex items-center justify-center`}
                style={{ background: `radial-gradient(circle, ${backAccent}40, transparent 72%)` }}
              >
                {Icon && <Icon size={dims.icon} color={backAccent} strokeWidth={2.25} />}
              </div>
              <span className={`${dims.name} font-extrabold text-white leading-tight`}>{card.name}</span>
              {size !== 'sm' && (
                <span className={`${dims.desc} text-white/55 leading-snug line-clamp-3`}>{card.description}</span>
              )}
              <span
                className="mt-0.5 text-[10px] font-black px-2 py-0.5 rounded-full"
                style={{ background: `${backAccent}26`, color: backAccent }}
              >
                {card.cost} pts
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CornerMark({ pos, color }: { pos: string; color: string }) {
  return (
    <span
      className={`absolute ${pos} w-1.5 h-1.5 rounded-full`}
      style={{ background: color, boxShadow: `0 0 6px ${color}` }}
    />
  );
}

/** The rotated-square "gem" shown on the face-down card. */
function Diamond({ size, color }: { size: string; color: string }) {
  return (
    <div className={`relative ${size}`}>
      <div
        className="absolute inset-0 rotate-45 rounded-md border-2"
        style={{
          borderColor: color,
          background: `radial-gradient(circle at 50% 40%, ${color}, transparent 75%)`,
          boxShadow: `0 0 18px ${color}`,
        }}
      />
    </div>
  );
}

export default PowerCard;