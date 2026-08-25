'use client';

import React, { useState } from 'react';
import { BossEntity } from './BossEntity';
import { Zap } from 'lucide-react';

/* ── Design tokens ────────────────────────────────────────────────────── */
const C = {
  indigo: '#5B3DF6', coral: '#FF6B4A', yellow: '#FFC93C',
  green: '#2ED47A', red: '#FF4757', navy: '#1B1E2B',
  muted: '#717182', white: '#FFFFFF',
};

const OPTION_COLORS = [
  { base: '#5B3DF6', light: 'rgba(91,61,246,0.18)',  glow: 'rgba(91,61,246,0.5)' },
  { base: '#FF6B4A', light: 'rgba(255,107,74,0.18)', glow: 'rgba(255,107,74,0.5)' },
  { base: '#2ED47A', light: 'rgba(46,212,122,0.18)', glow: 'rgba(46,212,122,0.5)' },
  { base: '#FFC93C', light: 'rgba(255,201,60,0.18)', glow: 'rgba(255,201,60,0.5)' },
];

/* ── Mock data ────────────────────────────────────────────────────────── */
const MOCK_QUESTION = {
  text: 'Which organelle is responsible for photosynthesis in plant cells?',
  choices: ['Mitochondria', 'Chloroplast', 'Ribosome', 'Golgi apparatus'],
  answer: 'Chloroplast',
};

const POWER_UP_SLOTS = [
  { name: 'Shield',        icon: '🛡️' },
  { name: 'Second Chance', icon: '♻️' },
  { name: 'Time Boost',    icon: '⏳' },
  { name: 'Hint',          icon: '💡' },
  { name: 'Heal',          icon: '❤️' },
  { name: 'Double Score',  icon: '2️⃣' },
];

/* ── Component ────────────────────────────────────────────────────────── */
interface StudentBossRaidProps {
  currentQuestion: { text?: string; question?: string; choices?: string[]; options?: string[]; answer?: string; } | any | null;
  bossHealth: number;
  bossMaxHealth: number;
  onAnswer?: (choice: string) => void;
}

export function StudentBossRaid({ currentQuestion, bossHealth, bossMaxHealth, onAnswer }: StudentBossRaidProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (i: number, choice: string) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (onAnswer) onAnswer(choice);
  };

  return (
    <div style={{
      minHeight: '100vh', background: C.navy, display: 'flex', flexDirection: 'column',
      fontFamily: 'Manrope, sans-serif', color: C.white,
    }}>
      {/* ── Boss Area (top ~40 %) ───────────────────────────────────── */}
      <div style={{
        flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '16px 16px 0',
        background: 'radial-gradient(ellipse at 50% 80%, rgba(91,61,246,0.12) 0%, transparent 70%)',
      }}>
        <BossEntity health={640} maxHealth={1000} name="Quiz Guardian" stage={3} />
      </div>

      {/* ── Question + Choices Area ─────────────────────────────────── */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 20px 16px',
        gap: 16,
      }}>
        {currentQuestion ? (
          <>
            {/* Timer bar */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <div style={{
                flex: 1, height: 6, background: 'rgba(255,255,255,0.06)',
                borderRadius: 3, overflow: 'hidden',
              }}>
                <div style={{
                  width: '60%', height: '100%', borderRadius: 3,
                  background: 'linear-gradient(90deg, #FFC93C, #FF6B4A)',
                  transition: 'width 1s linear',
                }} />
              </div>
              <span style={{
                fontFamily: 'Fredoka, sans-serif', fontSize: 14, fontWeight: 700, color: C.yellow,
                minWidth: 32, textAlign: 'right',
              }}>18s</span>
            </div>

            {/* Question text */}
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16, padding: 20, textAlign: 'center',
            }}>
              <p style={{
                fontSize: 17, fontWeight: 700, lineHeight: 1.5, margin: 0,
              }}>
                {currentQuestion.text || currentQuestion.question || "Unknown Question"}
              </p>
            </div>

            {/* Answer choices */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, flex: 1,
            }}>
              {(currentQuestion.options || currentQuestion.choices || []).map((choice, i) => {
                const isSelected = selected === i;
                const color = OPTION_COLORS[i % OPTION_COLORS.length];
                
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i, choice)}
                    disabled={answered}
                    style={{
                      background: isSelected ? color.base : 'rgba(255,255,255,0.03)',
                      border: `2px solid ${isSelected ? color.base : 'rgba(255,255,255,0.08)'}`,
                      borderRadius: 16, padding: '16px 20px',
                      color: isSelected ? '#fff' : 'rgba(255,255,255,0.85)',
                      fontSize: 16, fontWeight: 700, fontFamily: 'Manrope, sans-serif',
                      textAlign: 'left', cursor: answered ? 'default' : 'pointer',
                      display: 'flex', alignItems: 'center', gap: 16,
                      transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                      boxShadow: isSelected ? `0 8px 24px ${color.glow}` : 'none',
                    }}
                  >
                    <div style={{
                      width: 32, height: 32, borderRadius: 10,
                      background: isSelected ? 'rgba(0,0,0,0.2)' : color.light,
                      color: isSelected ? '#fff' : color.base,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14, fontWeight: 800, flexShrink: 0,
                    }}>
                      {['A', 'B', 'C', 'D'][i]}
                    </div>
                    {choice}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <div style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 16, padding: '32px 20px', textAlign: 'center'
          }}>
            <div style={{
              width: 50, height: 50, border: `3px solid rgba(255,255,255,0.1)`, 
              borderTopColor: C.coral, borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
            <h3 style={{ margin: 0, fontFamily: 'Fredoka, sans-serif', fontSize: 24, color: C.yellow }}>
              Brace for Impact!
            </h3>
            <p style={{ margin: 0, fontSize: 16, color: 'rgba(255,255,255,0.7)' }}>
              Waiting for the Boss to launch an attack...
            </p>
          </div>
        )}

        {/* Power-up slots */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
          padding: '8px 0 4px',
        }}>
          <span style={{
            fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)',
            textTransform: 'uppercase', letterSpacing: 1, marginRight: 4,
          }}>
            <Zap size={10} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 3 }} />
            Power-ups
          </span>
          
          {POWER_UP_SLOTS.map((slot, i) => (
            <button key={i} style={{
              width: 36, height: 36, borderRadius: 18,
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, cursor: 'pointer',
              transition: 'transform 0.2s, background 0.2s',
            }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            title={slot.name}>
              {slot.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
