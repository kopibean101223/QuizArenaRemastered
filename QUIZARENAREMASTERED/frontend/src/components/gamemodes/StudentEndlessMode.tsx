'use client';

import React, { useState } from 'react';
import { CheckpointCard } from './CheckpointCard';
import { Zap, Heart, Flag } from 'lucide-react';

/* ── Design tokens ────────────────────────────────────────────────────── */
const C = {
  indigo: '#5B3DF6', coral: '#FF6B4A', yellow: '#FFC93C',
  green: '#2ED47A', red: '#FF4757', navy: '#1B1E2B',
  muted: '#717182', white: '#FFFFFF',
};

const OPTION_COLORS = [
  { base: '#5B3DF6', light: 'rgba(91,61,246,0.18)', glow: 'rgba(91,61,246,0.5)' },
  { base: '#FF6B4A', light: 'rgba(255,107,74,0.18)', glow: 'rgba(255,107,74,0.5)' },
  { base: '#2ED47A', light: 'rgba(46,212,122,0.18)', glow: 'rgba(46,212,122,0.5)' },
  { base: '#FFC93C', light: 'rgba(255,201,60,0.18)', glow: 'rgba(255,201,60,0.5)' },
];

/* ── Mock questions pool ──────────────────────────────────────────────── */
const QUESTION_POOL = [
  { text: 'What is the chemical symbol for gold?',     choices: ['Au', 'Ag', 'Fe', 'Cu'],         answer: 'Au' },
  { text: 'Which planet is closest to the sun?',       choices: ['Venus', 'Mercury', 'Mars', 'Earth'], answer: 'Mercury' },
  { text: 'What is 7 × 8?',                            choices: ['54', '56', '58', '64'],          answer: '56' },
  { text: 'Who wrote "Romeo and Juliet"?',              choices: ['Dickens', 'Shakespeare', 'Twain', 'Austen'], answer: 'Shakespeare' },
  { text: 'What gas do plants absorb from the air?',    choices: ['Oxygen', 'Nitrogen', 'CO₂', 'Hydrogen'], answer: 'CO₂' },
  { text: 'What is the square root of 144?',            choices: ['10', '11', '12', '14'],          answer: '12' },
];

const POWER_UP_SLOTS = [
  { name: 'Shield',        icon: '🛡️' },
  { name: 'Double Points',  icon: '⚡' },
  { name: 'Time Freeze',   icon: '❄️' },
];

const CHECKPOINT_INTERVAL = 5;

interface StudentEndlessModeProps {
  currentStage: number;
  lives: number;
  score: number;
  currentQuestion: { text?: string; question?: string; choices?: string[]; options?: string[]; answer?: string; } | any | null;
  onAnswer?: (choice: string) => void;
  showCheckpoint?: boolean;
  onContinueCheckpoint?: (selectedPowerup?: string) => void;
}

export function StudentEndlessMode({ currentStage, lives, score, currentQuestion, onAnswer, showCheckpoint, onContinueCheckpoint }: StudentEndlessModeProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const stagesUntilCheckpoint = CHECKPOINT_INTERVAL - (currentStage % CHECKPOINT_INTERVAL);

  const handleSelect = (i: number) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);

    const isCorrect = (question.options || question.choices)[i] === question.answer;
    if (isCorrect) {
      setScore(prev => prev + 100);
    } else {
      setLives(prev => Math.max(0, prev - 1));
    }

    // After a short delay, advance or show checkpoint
    setTimeout(() => {
      const nextStage = currentStage + 1;
      if (nextStage > 1 && (nextStage - 1) % CHECKPOINT_INTERVAL === 0) {
        setShowCheckpoint(true);
      } else {
        advanceStage(nextStage);
      }
    }, 1200);
  };

  const advanceStage = (next: number) => {
    setCurrentStage(next);
    setSelected(null);
    setAnswered(false);
    setShowCheckpoint(false);
  };

  const handleCheckpointContinue = () => {
    advanceStage(currentStage + 1);
  };

  return (
    <div style={{
      minHeight: '100vh', background: C.navy, display: 'flex', flexDirection: 'column',
      fontFamily: 'Manrope, sans-serif', color: C.white,
    }}>
      {/* Checkpoint overlay */}
      {showCheckpoint && (
        <CheckpointCard stage={currentStage} onContinue={handleCheckpointContinue} />
      )}

      {/* ── Top Bar ─────────────────────────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 20px 12px',
      }}>
        {/* Stage counter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Flag size={16} color={C.yellow} />
          <span style={{
            fontFamily: 'Fredoka, sans-serif', fontSize: 18, fontWeight: 700,
          }}>
            Stage <span style={{ color: C.yellow }}>{currentStage}</span>
          </span>
        </div>

        {/* Score + Lives */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{
            fontFamily: 'Fredoka, sans-serif', fontSize: 14, fontWeight: 700,
            color: C.yellow,
          }}>
            {score} pts
          </span>
          <div style={{ display: 'flex', gap: 3 }}>
            {Array.from({ length: 3 }, (_, i) => (
              <Heart key={i} size={18} fill={i < lives ? C.red : 'transparent'}
                     color={i < lives ? C.red : 'rgba(255,255,255,0.15)'}
                     strokeWidth={2} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Progress to next checkpoint ─────────────────────────────── */}
      <div style={{ padding: '0 20px 12px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6,
        }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: 'uppercase' }}>
            Next checkpoint
          </span>
          <span style={{ fontSize: 10, fontWeight: 700, color: C.yellow }}>
            {stagesUntilCheckpoint === CHECKPOINT_INTERVAL ? 'Now!' : `${stagesUntilCheckpoint} stages`}
          </span>
        </div>
        <div style={{
          width: '100%', height: 6, background: 'rgba(255,255,255,0.06)',
          borderRadius: 3, overflow: 'hidden',
        }}>
          <div style={{
            width: `${((currentStage % CHECKPOINT_INTERVAL) / CHECKPOINT_INTERVAL) * 100}%`,
            height: '100%', borderRadius: 3,
            background: `linear-gradient(90deg, ${C.indigo}, ${C.yellow})`,
            transition: 'width 0.4s ease-out',
          }} />
        </div>

        {/* Mini checkpoint dots */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          {Array.from({ length: CHECKPOINT_INTERVAL }, (_, i) => {
            const stageDot = i + 1;
            const filled = (currentStage % CHECKPOINT_INTERVAL) >= stageDot || currentStage % CHECKPOINT_INTERVAL === 0;
            return (
              <div key={i} style={{
                width: 6, height: 6, borderRadius: '50%',
                background: filled ? C.yellow : 'rgba(255,255,255,0.1)',
                transition: 'background 0.3s',
              }} />
            );
          })}
        </div>
      </div>

      {/* ── Timer bar ───────────────────────────────────────────────── */}
      <div style={{ padding: '0 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          flex: 1, height: 5, background: 'rgba(255,255,255,0.06)',
          borderRadius: 3, overflow: 'hidden',
        }}>
          <div style={{
            width: '75%', height: '100%', borderRadius: 3,
            background: 'linear-gradient(90deg, #FFC93C, #FF6B4A)',
            transition: 'width 1s linear',
          }} />
        </div>
        <span style={{
          fontFamily: 'Fredoka, sans-serif', fontSize: 13, fontWeight: 700, color: C.yellow,
          minWidth: 30, textAlign: 'right',
        }}>22s</span>
      </div>

      {/* ── Question ────────────────────────────────────────────────── */}
      <div style={{ padding: '16px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{
          background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.08)',
          borderRadius: 16, padding: '18px 20px',
        }}>
          <p style={{
            fontSize: 17, fontWeight: 700, lineHeight: 1.5, margin: 0,
          }}>
            {currentQuestion?.text}
          </p>
        </div>

        {/* Answer choices */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, flex: 1,
        }}>
          {(currentQuestion?.options || currentQuestion?.choices || []).map((choice, i) => {
            const isCorrect = choice === (currentQuestion?.answer || '');
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
                  fontFamily: 'Fredoka, sans-serif', fontSize: 13, fontWeight: 700,
                  color: '#fff', flexShrink: 0,
                }}>
                  {['A', 'B', 'C', 'D'][i]}
                </div>
                <span style={{
                  fontSize: 14, fontWeight: 600,
                  color: answered && isCorrect ? C.green : 'rgba(255,255,255,0.9)',
                }}>
                  {choice}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Power-up slots (placeholder) ──────────────────────────── */}
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
            <div key={i} title={`${slot.name} (Coming Soon)`} style={{
              width: 44, height: 44, borderRadius: 12,
              background: 'rgba(255,255,255,0.04)',
              border: '1.5px dashed rgba(255,255,255,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, cursor: 'not-allowed', opacity: 0.55,
              transition: 'opacity 0.2s',
            }}>
              {slot.icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

