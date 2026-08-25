'use client';

import React, { useState } from 'react';
import { Eye, Users, TrendingUp, Clock, Flag, Zap } from 'lucide-react';

/* ── Design tokens ────────────────────────────────────────────────────── */
const C = {
  indigo: '#5B3DF6', indigoLight: 'rgba(91,61,246,0.15)',
  coral: '#FF6B4A', yellow: '#FFC93C', green: '#2ED47A', red: '#FF4757',
  navy: '#1B1E2B', muted: '#717182', white: '#FFFFFF',
};

const AVATAR_COLORS = [
  '#5B3DF6', '#FF6B4A', '#2ED47A', '#FFC93C', '#FF4757',
  '#5BC8F6', '#B06EF6', '#FF9F40', '#E040FB', '#00BCD4',
];

/* ── Mock data ────────────────────────────────────────────────────────── */
interface MockStudent {
  id: string; name: string; initials: string;
  avatarColor: string; currentStage: number; isEliminated: boolean;
}

const MOCK_STUDENTS: MockStudent[] = [
  { id: '1', name: 'Alice Chen',     initials: 'AC', avatarColor: AVATAR_COLORS[0], currentStage: 14, isEliminated: false },
  { id: '2', name: 'Bob Martinez',   initials: 'BM', avatarColor: AVATAR_COLORS[1], currentStage: 12, isEliminated: false },
  { id: '3', name: 'Charlie Kim',    initials: 'CK', avatarColor: AVATAR_COLORS[2], currentStage: 11, isEliminated: false },
  { id: '4', name: 'Dana Reyes',     initials: 'DR', avatarColor: AVATAR_COLORS[3], currentStage: 10, isEliminated: false },
  { id: '5', name: 'Ethan Wu',       initials: 'EW', avatarColor: AVATAR_COLORS[4], currentStage: 8,  isEliminated: false },
  { id: '6', name: 'Fiona Davis',    initials: 'FD', avatarColor: AVATAR_COLORS[5], currentStage: 5,  isEliminated: true  },
];

const MOCK_QUESTION = {
  text: 'In a binary search tree, what is the time complexity of search in the average case?',
  choices: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
  answer: 'O(log n)',
};

interface ProfEndlessModeProps {
  students: { id: string; name: string; initials: string; avatarColor: string; currentStage: number; isEliminated: boolean; }[];
  currentStage: number;
  currentQuestion: { text: string; choices: string[]; answer: string; } | null;
}

export function ProfEndlessMode({ students, currentStage, currentQuestion }: ProfEndlessModeProps) {
  const CHECKPOINT_INTERVAL = 5;

  // Build the stage progress markers (show up to currentStage + a few ahead)
  const totalVisible = Math.max(currentStage + 3, 18);

  return (
    <div style={{
      minHeight: '100vh', background: C.navy, padding: '24px 28px',
      fontFamily: 'Manrope, sans-serif', color: C.white,
    }}>
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{
          fontFamily: 'Fredoka, sans-serif', fontSize: 24, fontWeight: 700, margin: 0,
          background: `linear-gradient(135deg, ${C.yellow}, ${C.coral})`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          ⚡ Endless Mode — Professor View
        </h1>
        <p style={{ fontSize: 12, color: C.muted, margin: '4px 0 0' }}>
          Students advance individually · Checkpoint every {CHECKPOINT_INTERVAL} stages · Not live
        </p>
      </div>

      {/* ── Stage Progress Track ────────────────────────────────────── */}
      <div style={{
        background: 'rgba(255,255,255,0.02)', border: '1.5px solid rgba(255,255,255,0.06)',
        borderRadius: 16, padding: '16px 20px', marginBottom: 24, overflowX: 'auto',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12,
        }}>
          <Flag size={14} color={C.yellow} />
          <span style={{ fontSize: 12, fontWeight: 800, color: C.yellow, textTransform: 'uppercase' }}>
            Stage Progress
          </span>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 0, position: 'relative',
          minWidth: totalVisible * 40,
        }}>
          {Array.from({ length: totalVisible }, (_, i) => {
            const stageNum = i + 1;
            const isCheckpoint = stageNum % CHECKPOINT_INTERVAL === 0;
            const isCurrent = stageNum === currentStage;
            const isPassed = stageNum < currentStage;

            return (
              <React.Fragment key={stageNum}>
                {/* Connector line */}
                {i > 0 && (
                  <div style={{
                    width: 20, height: 2, flexShrink: 0,
                    background: isPassed ? C.indigo : 'rgba(255,255,255,0.08)',
                  }} />
                )}

                {/* Stage node */}
                <div style={{
                  width: isCheckpoint ? 36 : 24,
                  height: isCheckpoint ? 36 : 24,
                  borderRadius: isCheckpoint ? 10 : '50%',
                  background: isCurrent
                    ? C.indigo
                    : isPassed
                      ? isCheckpoint ? C.yellow : `${C.indigo}60`
                      : 'rgba(255,255,255,0.06)',
                  border: isCurrent
                    ? `2px solid ${C.yellow}`
                    : isCheckpoint && isPassed
                      ? `2px solid ${C.yellow}`
                      : '2px solid transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Fredoka, sans-serif',
                  fontSize: isCheckpoint ? 11 : 9,
                  fontWeight: 700, color: '#fff', flexShrink: 0,
                  boxShadow: isCurrent ? `0 0 12px rgba(91,61,246,0.5)` : 'none',
                  transition: 'background 0.3s, border 0.3s',
                }}>
                  {isCheckpoint ? '🏁' : stageNum}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ── Student Status List ─────────────────────────────────────── */}
      <div style={{
        background: 'rgba(255,255,255,0.02)', border: '1.5px solid rgba(255,255,255,0.06)',
        borderRadius: 20, padding: '20px 24px', marginBottom: 24,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16,
        }}>
          <Users size={16} color={C.indigo} />
          <span style={{ fontSize: 12, fontWeight: 800, color: C.indigo, textTransform: 'uppercase' }}>
            Student Progress ({students.filter(s => !s.isEliminated).length} active)
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[...students].sort((a, b) => b.currentStage - a.currentStage).map((s, rank) => (
            <div key={s.id} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: s.isEliminated ? 'rgba(255,71,87,0.06)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${s.isEliminated ? 'rgba(255,71,87,0.15)' : 'rgba(255,255,255,0.06)'}`,
              borderRadius: 12, padding: '10px 14px',
              opacity: s.isEliminated ? 0.5 : 1,
            }}>
              {/* Rank */}
              <span style={{
                fontFamily: 'Fredoka, sans-serif', fontSize: 14, fontWeight: 700,
                color: rank === 0 ? C.yellow : rank === 1 ? '#C0C0C0' : rank === 2 ? '#CD7F32' : C.muted,
                minWidth: 22,
              }}>
                #{rank + 1}
              </span>

              {/* Avatar */}
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: `linear-gradient(145deg, ${s.avatarColor}, ${s.avatarColor}cc)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Fredoka, sans-serif', fontSize: 13, fontWeight: 700, color: '#fff',
                flexShrink: 0,
              }}>
                {s.initials}
              </div>

              {/* Name */}
              <span style={{
                flex: 1, fontSize: 13, fontWeight: 700,
                color: s.isEliminated ? C.red : 'rgba(255,255,255,0.85)',
              }}>
                {s.name}
                {s.isEliminated && (
                  <span style={{ fontSize: 10, color: C.red, marginLeft: 6 }}>
                    ✕ Eliminated
                  </span>
                )}
              </span>

              {/* Stage progress bar */}
              <div style={{ width: 120 }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', marginBottom: 3,
                }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: C.muted }}>Stage</span>
                  <span style={{
                    fontFamily: 'Fredoka, sans-serif', fontSize: 11, fontWeight: 700,
                    color: s.currentStage % CHECKPOINT_INTERVAL === 0 ? C.yellow : C.white,
                  }}>
                    {s.currentStage}
                  </span>
                </div>
                <div style={{
                  width: '100%', height: 5, background: 'rgba(255,255,255,0.06)',
                  borderRadius: 3, overflow: 'hidden',
                }}>
                  <div style={{
                    width: `${Math.min(100, (s.currentStage / 20) * 100)}%`,
                    height: '100%', borderRadius: 3,
                    background: s.isEliminated
                      ? C.red
                      : `linear-gradient(90deg, ${C.indigo}, ${s.avatarColor})`,
                    transition: 'width 0.5s ease-out',
                  }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Question Inspection Panel ───────────────────────────────── */}
      <div style={{
        background: 'rgba(91,61,246,0.12)', border: `2px solid ${C.indigo}`,
        borderRadius: 20, padding: '24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <Eye size={18} color={C.yellow} />
          <span style={{
            fontSize: 13, fontWeight: 800, color: C.yellow, textTransform: 'uppercase',
          }}>
            Current Question Preview
          </span>
        </div>

        <p style={{ fontSize: 18, fontWeight: 700, color: '#fff', margin: '0 0 16px' }}>
          {currentQuestion?.text || MOCK_QUESTION.text}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {(currentQuestion?.choices || MOCK_QUESTION.choices).map((choice, i) => {
            const isCorrect = choice === (currentQuestion?.answer || MOCK_QUESTION.answer);
            return (
              <div key={i} style={{
                background: isCorrect ? 'rgba(46,212,122,0.25)' : 'rgba(0,0,0,0.3)',
                border: `1.5px solid ${isCorrect ? C.green : 'rgba(255,255,255,0.1)'}`,
                padding: '12px 16px', borderRadius: 12, fontSize: 14,
                color: isCorrect ? C.green : 'rgba(255,255,255,0.85)',
                fontWeight: isCorrect ? 700 : 500,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span><b>{['A', 'B', 'C', 'D'][i]}.</b> {choice}</span>
                {isCorrect && (
                  <span style={{
                    fontSize: 10, background: C.green, color: '#fff',
                    padding: '2px 6px', borderRadius: 4,
                  }}>Correct</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
