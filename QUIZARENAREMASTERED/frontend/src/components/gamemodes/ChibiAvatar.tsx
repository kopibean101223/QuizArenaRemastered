import React from 'react';

interface ChibiAvatarProps {
  name: string;
  color: string;
  size?: number;
  isActive?: boolean;
  score?: number;
}

/* Shift a hex colour by `amount` (negative = darker, positive = lighter). */
function adjustColor(hex: string, amount: number): string {
  if (!hex.startsWith('#') || hex.length < 7) return hex;
  const r = Math.max(0, Math.min(255, parseInt(hex.slice(1, 3), 16) + amount));
  const g = Math.max(0, Math.min(255, parseInt(hex.slice(3, 5), 16) + amount));
  const b = Math.max(0, Math.min(255, parseInt(hex.slice(5, 7), 16) + amount));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export function ChibiAvatar({ name, color, size = 80, isActive = true, score }: ChibiAvatarProps) {
  const darker  = adjustColor(color, -40);
  const lighter = adjustColor(color, 40);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
      opacity: isActive ? 1 : 0.4,
      transition: 'opacity 0.3s, transform 0.3s',
    }}>
      <svg width={size} height={size * 1.35} viewBox="0 0 100 135" fill="none">
        {/* ── Hair / Cap ── */}
        <ellipse cx="50" cy="26" rx="33" ry="20" fill={darker} />
        <ellipse cx="50" cy="20" rx="26" ry="12" fill={color} />

        {/* ── Head ── */}
        <circle cx="50" cy="42" r="28" fill="#FDECD0" />

        {/* ── Eyes ── */}
        <ellipse cx="39" cy="42" rx="4" ry="5" fill="#2D2B3D" />
        <ellipse cx="61" cy="42" rx="4" ry="5" fill="#2D2B3D" />
        {/* highlights */}
        <circle cx="41" cy="40" r="1.8" fill="#fff" />
        <circle cx="63" cy="40" r="1.8" fill="#fff" />

        {/* ── Blush ── */}
        <ellipse cx="31" cy="49" rx="5" ry="2.5" fill="rgba(255,140,140,0.3)" />
        <ellipse cx="69" cy="49" rx="5" ry="2.5" fill="rgba(255,140,140,0.3)" />

        {/* ── Mouth ── */}
        <path d="M 44 53 Q 50 58 56 53" stroke="#C4846C" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* ── Body ── */}
        <rect x="35" y="69" width="30" height="30" rx="10" fill={color} />
        <rect x="43" y="73" width="14" height="5" rx="2.5" fill={lighter} opacity="0.4" />

        {/* ── Arms ── */}
        <ellipse cx="27" cy="82" rx="10" ry="5.5" fill={color} />
        <ellipse cx="73" cy="82" rx="10" ry="5.5" fill={color} />

        {/* ── Legs ── */}
        <rect x="38" y="97" width="9" height="14" rx="4.5" fill={darker} />
        <rect x="53" y="97" width="9" height="14" rx="4.5" fill={darker} />

        {/* ── Shoes ── */}
        <ellipse cx="42.5" cy="112" rx="6.5" ry="3.5" fill="#2D2B3D" />
        <ellipse cx="57.5" cy="112" rx="6.5" ry="3.5" fill="#2D2B3D" />
      </svg>

      {/* Name tag */}
      <span style={{
        fontFamily: 'Manrope, sans-serif',
        fontSize: Math.max(9, size * 0.13),
        fontWeight: 700,
        color: 'rgba(255,255,255,0.85)',
        textAlign: 'center',
        maxWidth: size * 1.1,
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        background: 'rgba(0,0,0,0.35)',
        padding: '2px 8px', borderRadius: 6,
      }}>
        {name}
      </span>

      {score !== undefined && (
        <span style={{
          fontFamily: 'Fredoka, sans-serif',
          fontSize: Math.max(8, size * 0.12),
          fontWeight: 600,
          color: '#FFC93C',
        }}>
          {score} pts
        </span>
      )}
    </div>
  );
}

