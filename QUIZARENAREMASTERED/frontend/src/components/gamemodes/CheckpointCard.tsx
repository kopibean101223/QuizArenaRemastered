import React, { useState } from 'react';

interface CheckpointCardProps {
  stage: number;
  onContinue?: (selectedPowerUp?: string) => void;
}

const C = {
  indigo: '#5B3DF6', yellow: '#FFC93C', green: '#2ED47A', navy: '#1B1E2B',
};

const POWER_UP_SLOTS = [
  { name: 'Shield',        icon: '🛡️' },
  { name: 'Double Points',  icon: '⚡' },
  { name: 'Time Freeze',   icon: '❄️' },
];

export function CheckpointCard({ stage, onContinue }: CheckpointCardProps) {
  const checkpointNumber = Math.floor(stage / 5);   // 1st at stage 5, 2nd at 10, etc.
  const [selectedPowerUp, setSelectedPowerUp] = useState<string | null>(null);

  return (
    <div style={{
      position: 'fixed', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(8px)',
      zIndex: 100,
    }}>
      <div style={{
        background: `linear-gradient(145deg, ${C.navy}, #2D2B4E)`,
        border: `2px solid ${C.yellow}`,
        borderRadius: 24, padding: '32px 40px', textAlign: 'center',
        maxWidth: 420, width: '90%',
        boxShadow: '0 0 40px rgba(255,201,60,0.15), 0 20px 60px rgba(0,0,0,0.5)',
      }}>
        {/* Icon */}
        <div style={{ fontSize: 48, marginBottom: 8 }}>🏁</div>

        {/* Title */}
        <h2 style={{
          fontFamily: 'Fredoka, sans-serif', fontSize: 28, fontWeight: 700,
          color: C.yellow, margin: '0 0 4px',
        }}>
          Checkpoint!
        </h2>

        <p style={{
          fontFamily: 'Manrope, sans-serif', fontSize: 14, fontWeight: 600,
          color: 'rgba(255,255,255,0.65)', margin: '0 0 20px',
        }}>
          Stage {stage} cleared
        </p>

        {/* Progress dots – up to 5 checkpoints visualised */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 24 }}>
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} style={{
              width: 10, height: 10, borderRadius: '50%',
              background: i < checkpointNumber ? C.yellow : 'rgba(255,255,255,0.12)',
              transition: 'background 0.3s',
            }} />
          ))}
        </div>

        {/* Power-up interactive slots */}
        <div style={{ marginBottom: 24 }}>
          <span style={{
            fontFamily: 'Manrope, sans-serif', fontSize: 10, fontWeight: 700,
            color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: 1.5,
          }}>
            Select a Power-up
          </span>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 12 }}>
            {POWER_UP_SLOTS.map((slot, i) => {
              const isSelected = selectedPowerUp === slot.name;
              return (
                <div 
                  key={i} 
                  onClick={() => setSelectedPowerUp(slot.name)}
                  style={{
                    width: 70, height: 70, borderRadius: 14,
                    background: isSelected ? 'rgba(255,201,60,0.15)' : 'rgba(255,255,255,0.04)',
                    border: isSelected ? `2px solid ${C.yellow}` : '1.5px dashed rgba(255,255,255,0.14)',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: 4,
                    cursor: 'pointer', transition: 'all 0.2s',
                    transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                    boxShadow: isSelected ? `0 0 15px ${C.yellow}55` : 'none',
                  }}>
                  <span style={{ fontSize: 24 }}>{slot.icon}</span>
                  <span style={{
                    fontFamily: 'Manrope, sans-serif', fontSize: 8, fontWeight: 700,
                    color: isSelected ? C.yellow : 'rgba(255,255,255,0.45)',
                    textAlign: 'center', lineHeight: 1,
                  }}>
                    {slot.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Continue button */}
        <button onClick={() => onContinue?.(selectedPowerUp || undefined)} style={{
          background: `linear-gradient(135deg, ${C.indigo}, #7B5BF7)`,
          color: '#fff', border: 'none', borderRadius: 12, padding: '12px 36px',
          fontFamily: 'Fredoka, sans-serif', fontSize: 16, fontWeight: 700,
          cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s',
          boxShadow: '0 4px 20px rgba(91,61,246,0.4)',
        }}>
          {selectedPowerUp ? 'Claim & Continue →' : 'Continue →'}
        </button>
      </div>
    </div>
  );
}

