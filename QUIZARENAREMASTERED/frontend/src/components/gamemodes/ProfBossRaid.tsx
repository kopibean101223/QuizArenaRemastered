'use client';

import React, { useState } from 'react';
import { ChibiAvatar } from './ChibiAvatar';
import { Eye, Users, Clock, Zap, TrendingUp, Shield, Send, Search, Swords } from 'lucide-react';

const C = {
  indigo: '#5B3DF6', indigoLight: 'rgba(91,61,246,0.07)',
  coral: '#FF6B4A', yellow: '#FFC93C', green: '#2ED47A', red: '#FF4757',
  navy: '#1B1E2B', muted: '#717182', white: '#FFFFFF',
};

const AVATAR_COLORS = [
  '#5B3DF6', '#FF6B4A', '#2ED47A', '#FFC93C', '#FF4757',
  '#5BC8F6', '#B06EF6', '#FF9F40', '#E040FB', '#00BCD4',
];

interface QuestionItem {
  id?: string;
  text: string;
  choices: string[];
  answer: string;
}

interface ProfBossRaidProps {
  students: { id: string; name: string; avatarColor: string; score: number; isActive: boolean; }[];
  bossHealth: number;
  bossMaxHealth: number;
  timeLeft: number;
  currentQuestion: QuestionItem | null;
  questions?: QuestionItem[];
  onLaunchQuestion?: (q: QuestionItem) => void;
}

export function ProfBossRaid({ students, bossHealth, bossMaxHealth, timeLeft, currentQuestion, questions = [], onLaunchQuestion }: ProfBossRaidProps) {
  const healthPercent = Math.max(0, (bossHealth / bossMaxHealth) * 100);
  const [customQuestion, setCustomQuestion] = useState("");
  const [draggedQ, setDraggedQ] = useState<QuestionItem | null>(null);
  
  // Track questions available to throw
  const [availableQuestions, setAvailableQuestions] = useState<QuestionItem[]>(questions);

  // Sync state if prop changes entirely (e.g. initial load)
  React.useEffect(() => {
    if (availableQuestions.length === 0 && questions.length > 0) {
      setAvailableQuestions(questions);
    }
  }, [questions]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedQ && onLaunchQuestion) {
      onLaunchQuestion(draggedQ);
      // Remove from available list
      setAvailableQuestions(prev => prev.filter(q => q !== draggedQ));
    }
    setDraggedQ(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const launchCustom = () => {
    if (!customQuestion.trim() || !onLaunchQuestion) return;
    onLaunchQuestion({
      text: customQuestion,
      choices: ["True", "False", "Yes", "No"], // Dummy for now
      answer: "True"
    });
    setCustomQuestion("");
  };

  return (
    <div style={{
      minHeight: '100vh', background: C.navy,
      fontFamily: 'Manrope, sans-serif', color: C.white,
      display: 'flex', overflow: 'hidden'
    }}>
      {/* ── Left Sidebar (Question Bank) ── */}
      <div style={{
        width: 340, background: 'rgba(0,0,0,0.2)', borderRight: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', flexDirection: 'column', padding: 20
      }}>
        <h2 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 18, color: C.yellow, margin: '0 0 16px' }}>
          <Zap size={16} style={{ display: 'inline', marginRight: 6 }} />
          Ammunition (Bank)
        </h2>
        
        <p style={{ fontSize: 12, color: C.muted, margin: '0 0 16px' }}>Drag and drop questions onto the battlefield to attack the students.</p>

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12, paddingRight: 8 }}>
          {availableQuestions.map((q, idx) => (
            <div
              key={idx}
              draggable={true}
              onDragStart={(e) => {
                setDraggedQ(q);
                e.dataTransfer.setData("text/plain", q.text);
              }}
              onDragEnd={() => setDraggedQ(null)}
              style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                padding: 12, borderRadius: 12, cursor: 'grab',
                opacity: draggedQ === q ? 0.5 : 1
              }}
            >
              <div style={{ fontSize: 10, color: C.muted, marginBottom: 4 }}>Q{idx + 1}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', lineHeight: 1.4 }}>{q.text}</div>
            </div>
          ))}
        </div>

        {/* Custom Question Throw */}
        <div style={{ marginTop: 16, background: 'rgba(255,107,74,0.1)', border: `1px solid ${C.coral}`, borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: C.coral, marginBottom: 8, textTransform: 'uppercase' }}>
            Live Challenge (Custom)
          </div>
          <textarea
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            placeholder="Type a surprise question..."
            style={{
              width: '100%', background: 'rgba(0,0,0,0.3)', border: 'none', borderRadius: 8,
              padding: 10, color: '#fff', fontSize: 13, resize: 'none', height: 60, marginBottom: 10,
              fontFamily: 'Manrope, sans-serif'
            }}
          />
          <button onClick={launchCustom} style={{
            width: '100%', background: C.coral, border: 'none', borderRadius: 8, padding: '8px 0',
            color: '#fff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
          }}>
            <Send size={14} /> Throw Challenge!
          </button>
        </div>
      </div>

      {/* ── Main Battlefield ── */}
      <div 
        onDrop={handleDrop} 
        onDragOver={handleDragOver}
        style={{
          flex: 1, padding: 32, display: 'flex', flexDirection: 'column',
          background: draggedQ ? 'radial-gradient(circle, rgba(255,107,74,0.1) 0%, transparent 70%)' : 'transparent',
          transition: 'background 0.3s'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <h1 style={{
              fontFamily: 'Fredoka, sans-serif', fontSize: 28, fontWeight: 700, margin: 0,
              background: `linear-gradient(135deg, ${C.coral}, ${C.yellow})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Boss Raid Battlefield
            </h1>
            <p style={{ fontSize: 13, color: C.muted, margin: '4px 0 0' }}>Drop questions here to launch them at the class.</p>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <StatBadge icon={<Users size={14} />} label="Players" value={`${students.filter(s => s.isActive).length}/${students.length}`} color={C.indigo} />
            <StatBadge icon={<Clock size={14} />} label="Timer" value={`${timeLeft}s`} color={C.yellow} />
            <StatBadge icon={<TrendingUp size={14} />} label="Total DMG" value="360" color={C.coral} />
          </div>
        </div>

        {/* Boss Health Bar */}
        <div style={{
          background: 'rgba(255,107,74,0.08)', border: `1.5px solid ${C.coral}`,
          borderRadius: 16, padding: '20px 24px', marginBottom: 32,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: C.coral }}>
              <Shield size={18} style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle' }} />
              Quiz Guardian (You)
            </span>
            <span style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 18, fontWeight: 700, color: healthPercent < 30 ? C.red : C.green }}>
              {bossHealth} / {bossMaxHealth} HP
            </span>
          </div>
          <div style={{ width: '100%', height: 18, background: 'rgba(0,0,0,0.3)', borderRadius: 9, overflow: 'hidden' }}>
            <div style={{
              width: `${healthPercent}%`, height: '100%', borderRadius: 9,
              background: healthPercent < 30 ? 'linear-gradient(90deg, #FF4757, #FF6B4A)' : 'linear-gradient(90deg, #FF6B4A, #FFC93C)',
              transition: 'width 0.6s ease-out',
            }} />
          </div>
        </div>

        {/* Chibi Student Grid (Drop Target) */}
        <div style={{
          flex: 1, background: 'rgba(255,255,255,0.02)', border: draggedQ ? `2px dashed ${C.coral}` : '2px dashed rgba(255,255,255,0.1)',
          borderRadius: 24, padding: '32px', display: 'flex', flexDirection: 'column'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, alignSelf: 'center' }}>
            <Swords size={24} color={C.yellow} />
            <span style={{ fontSize: 16, fontWeight: 800, color: C.yellow, textTransform: 'uppercase' }}>
              Target: The Class
            </span>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: 24, justifyItems: 'center'
          }}>
            {students.map(s => (
              <ChibiAvatar key={s.id} name={s.name} color={s.avatarColor} size={72} isActive={s.isActive} score={s.score} />
            ))}
          </div>
          
          {draggedQ && (
            <div style={{ margin: 'auto', padding: '16px 24px', background: C.coral, color: '#fff', borderRadius: 16, fontWeight: 700, fontSize: 18, animation: 'pulse 1s infinite' }}>
              Drop to Launch Attack!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatBadge({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string; }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      background: `${color}12`, border: `1px solid ${color}30`,
      borderRadius: 12, padding: '8px 16px',
    }}>
      <span style={{ color }}>{icon}</span>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: 'uppercase' }}>{label}</div>
        <div style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 16, fontWeight: 700, color }}>{value}</div>
      </div>
    </div>
  );
}
