'use client';

import React, { useState, useEffect } from 'react';
import { 
  Skull, Heart, Zap, Volume2, Wifi, LogOut, ChevronRight, Sparkles 
} from 'lucide-react';

const C = {
  bgDark: "#131524",
  cardBg: "#1C1F33",
  cardBorder: "rgba(255,255,255,0.08)",
  redAlert: "#FF4757",
  redAlertBg: "rgba(255,71,87,0.12)",
  redAlertBorder: "rgba(255,71,87,0.3)",
  yellowAccent: "#FFC93C",
  textMain: "#FFFFFF",
  textMuted: "#8F93A8",
  purpleAccent: "#5B3DF6",
};

interface BattleRoyaleProps {
  battleId?: string;
}

export function BattleRoyale({ battleId = "" }: BattleRoyaleProps) {
  
}

interface Survivor {
  id: string;
  name: string;
  initials: string;
  color: string;
  isYou?: boolean;
  lives: number; // Health / Max Wrongs allowed
  isEliminated?: boolean;
}

export function BattleRoyaleView() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timer, setTimer] = useState<number>(10);
  const [round, setRound] = useState<number>(4);
  const maxLives = 3;

  // Track survivors with remaining health/lives
  const [survivors, setSurvivors] = useState<Survivor[]>([
    { id: '1', name: 'Alex', initials: 'AM', color: '#5B3DF6', isYou: true, lives: 1 },
    { id: '2', name: 'Trisha', initials: 'TV', color: '#9B51E0', lives: 2 },
    { id: '3', name: 'Ana', initials: 'AR', color: '#FF6B4A', lives: 3 },
    { id: '4', name: 'Carlo', initials: 'CB', color: '#2ED47A', lives: 1 },
    { id: '5', name: 'Maria', initials: 'MS', color: '#FFC93C', lives: 2 },
    { id: '6', name: 'Juan', initials: 'JD', color: '#FF4757', lives: 1 },
    { id: '7', name: 'Ben', initials: 'BA', color: '#F2994A', lives: 3 },
    { id: '8', name: 'Lea', initials: 'LF', color: '#2D9CDB', lives: 2 },
    { id: '9', name: 'Sofia', initials: 'SC', color: '#E056FD', lives: 1 },
    { id: '10', name: 'Diego', initials: 'DL', color: '#0019A7', lives: 3 },
  ]);

  const activeSurvivorsCount = survivors.filter(s => s.lives > 0).length;

  const options = [
    { key: 'A', text: 'O(n)', color: '#A06AF6' },
    { key: 'B', text: 'O(log n)', color: '#FF6B4A' },
    { key: 'C', text: 'O(n log n)', color: '#2ED47A' },
    { key: 'D', text: 'O(1)', color: '#FFC93C' },
  ];

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div style={{ background: C.bgDark, minHeight: '100vh', color: C.textMain, fontFamily: "'Manrope', sans-serif", display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Navigation Bar */}
      <header style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${C.cardBorder}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800, fontSize: 18, color: '#FFF' }}>
            <div style={{ width: 28, height: 28, background: C.purpleAccent, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={16} fill="#FFF" color="transparent" />
            </div>
            QuizArena
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: C.textMuted }}>
            <span>Battle Lobby</span>
            <ChevronRight size={12} />
            <span style={{ color: '#FFF', fontWeight: 600 }}>Live Battle</span>
            <ChevronRight size={12} />
            <span>Battle Results</span>
          </div>
        </div>

        {/* Right Info Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ background: 'rgba(255,71,87,0.15)', border: `1px solid ${C.redAlert}`, padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 800, color: C.redAlert, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Skull size={14} /> ROYALE
          </div>
          <div style={{ background: 'rgba(255,201,60,0.1)', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, color: C.yellowAccent, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Sparkles size={13} fill={C.yellowAccent} color="transparent" /> 300
          </div>
          <div style={{ display: 'flex', gap: 6, color: C.textMuted }}>
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Volume2 size={14} /></div>
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Wifi size={14} /></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: 20 }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: C.purpleAccent, fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>AL</div>
            <span style={{ fontSize: 12, fontWeight: 600 }}>Alex M.</span>
          </div>
          <button style={{ background: 'rgba(255,71,87,0.15)', border: 'none', color: C.redAlert, padding: '6px 12px', borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
            <LogOut size={13} /> Logout
          </button>
        </div>
      </header>

      {/* Main Grid Content */}
      <div style={{ flex: 1, padding: 20, display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20, minHeight: 0 }}>
        
        {/* Left Interactive Arena */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          
          {/* Round Header & Remaining Players Banner */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: C.textMuted, textTransform: 'uppercase' }}>ROUND</span>
              <span style={{ fontSize: 16, fontWeight: 900, color: '#FFF' }}>{round}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: 32, fontWeight: 900, lineHeight: 1, color: '#FFF' }}>{activeSurvivorsCount}</span>
              <span style={{ fontSize: 9, fontWeight: 800, color: C.textMuted, letterSpacing: 1, textTransform: 'uppercase' }}>PLAYERS REMAINING</span>
            </div>

            <div style={{ width: 60 }} /> {/* Spacer */}
          </div>

          {/* Progress / Timer Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: C.redAlert, display: 'flex', alignItems: 'center', gap: 4 }}>
              🏆 Q4<span style={{ color: C.textMuted }}>/?</span>
            </span>
            <div style={{ flex: 1, height: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 20, overflow: 'hidden' }}>
              <div style={{ width: `${(timer / 10) * 100}%`, height: '100%', background: C.redAlert, transition: 'width 1s linear' }} />
            </div>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: C.redAlertBg, border: `2px solid ${C.redAlert}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, color: '#FFF' }}>
              {timer}
            </div>
          </div>

          {/* Question Box (Red Alert Theme for Elimination Mode) */}
          <div style={{ background: C.redAlertBg, border: `1.5px solid ${C.redAlertBorder}`, borderRadius: 20, padding: '24px 28px' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <span style={{ background: 'rgba(255,71,87,0.2)', color: C.redAlert, fontSize: 10, fontWeight: 800, padding: '3px 8px', borderRadius: 6, textTransform: 'uppercase' }}>Computer Science</span>
              <span style={{ background: 'rgba(255,71,87,0.2)', color: C.redAlert, fontSize: 10, fontWeight: 800, padding: '3px 8px', borderRadius: 6, textTransform: 'uppercase' }}>WRONG ANSWER = ELIMINATED</span>
            </div>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, lineHeight: 1.4 }}>
              What is the time complexity of searching for an element in a balanced Binary Search Tree?
            </h2>
          </div>

          {/* Options Stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {options.map((opt) => {
              const isSelected = selectedOption === opt.key;
              return (
                <div
                  key={opt.key}
                  onClick={() => setSelectedOption(opt.key)}
                  style={{
                    background: isSelected ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
                    border: `1.5px solid ${isSelected ? opt.color : C.cardBorder}`,
                    borderRadius: 14,
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: opt.color, color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14 }}>
                    {opt.key}
                  </div>
                  <span style={{ fontWeight: 700, fontSize: 16, color: 'rgba(255,255,255,0.9)' }}>
                    {opt.text}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Sidebar - Survivors & Health Status */}
        <div style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}`, borderRadius: 20, padding: 18, display: 'flex', flexDirection: 'column', gap: 16 }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${C.cardBorder}`, paddingBottom: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Skull size={15} color={C.redAlert} /> Survivors
            </span>
            <span style={{ fontSize: 10, fontWeight: 800, color: C.redAlert, background: 'rgba(255,71,87,0.15)', padding: '2px 8px', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.redAlert }} /> LIVE
            </span>
          </div>

          {/* Survivors Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, rowGap: 16 }}>
            {survivors.map((survivor) => {
              const isDead = survivor.lives <= 0;
              return (
                <div key={survivor.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, position: 'relative', opacity: isDead ? 0.3 : 1 }}>
                  
                  {survivor.isYou && (
                    <span style={{ fontSize: 8, fontWeight: 900, background: C.yellowAccent, color: '#000', padding: '1px 4px', borderRadius: 4, position: 'absolute', top: -10, zIndex: 2 }}>
                      YOU
                    </span>
                  )}

                  {/* Avatar Circle */}
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: survivor.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12, border: survivor.isYou ? `2px solid ${C.yellowAccent}` : '2px solid rgba(255,255,255,0.1)', position: 'relative' }}>
                    {isDead ? <Skull size={18} color="#FFF" /> : survivor.initials}
                  </div>

                  {/* Name */}
                  <span style={{ fontSize: 10, color: survivor.isYou ? C.yellowAccent : C.textMuted, fontWeight: 700 }}>
                    {survivor.name}
                  </span>

                  {/* Health / Lives Indicators (Hearts) */}
                  <div style={{ display: 'flex', gap: 2 }}>
                    {Array.from({ length: maxLives }).map((_, i) => (
                      <Heart 
                        key={i} 
                        size={8} 
                        fill={i < survivor.lives ? C.redAlert : 'transparent'} 
                        color={i < survivor.lives ? C.redAlert : 'rgba(255,255,255,0.2)'} 
                      />
                    ))}
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}

export default BattleRoyaleView;