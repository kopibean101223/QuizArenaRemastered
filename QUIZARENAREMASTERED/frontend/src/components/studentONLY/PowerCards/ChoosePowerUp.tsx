'use client';
import React, { useEffect, useRef, useState } from 'react';
import { PowerCard } from './PowerCard';
import { PowerCardOverlay } from './PowerCardOverlay';
import type { PowerCardData } from './types';

interface ChoosePowerUpProps {
  drawnCards: PowerCardData[];
  deadline?: number | null;
  onSelectCard?: (card: PowerCardData) => void;
  onVoteCard?: (card: PowerCardData) => void;
  onVoteEnd?: () => void;
  onTimeout?: (card: PowerCardData) => void;
  voteDeadline?: number | null;
  emptyMessage?: string;
}

export function ChoosePowerUp({ drawnCards, onSelectCard, onVoteCard, onVoteEnd, onTimeout, voteDeadline, deadline, emptyMessage = 'You have no available cards' }: ChoosePowerUpProps) {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(10);
  const completedRef = useRef(false);

  useEffect(() => {
    if (!onVoteCard && !deadline) return;
    completedRef.current = false;
    const timer = window.setInterval(() => {
      const activeDeadline = voteDeadline || deadline;
      const next = activeDeadline ? Math.max(0, Math.ceil((activeDeadline - Date.now()) / 1000)) : 10;
      setSecondsLeft(next);
      if (next === 0 && !completedRef.current) {
        completedRef.current = true;
        window.clearInterval(timer);
        if (onTimeout && drawnCards.length > 0) {
          const randomCard = drawnCards[Math.floor(Math.random() * drawnCards.length)];
          onTimeout(randomCard);
        } else {
          onVoteEnd?.();
        }
      }
    }, 250);
    return () => window.clearInterval(timer);
  }, [deadline, drawnCards, onTimeout, onVoteCard, onVoteEnd, voteDeadline]);

  const handleCardClick = (card: PowerCardData) => {
    if (selectedCardId) return;
    completedRef.current = true;
    setSelectedCardId(card.id);
    if (onVoteCard) {
      onVoteCard(card);
    } else {
      window.setTimeout(() => onSelectCard?.(card), 1200);
    }
  };

  return (  
    <PowerCardOverlay locked>
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-[Fredoka] font-bold text-[var(--gm-yellow)] mb-2 uppercase animate-[gm-pulse_1s_infinite]">
          Select Ultimate Protocol
        </h2>
        <p className="text-[var(--gm-muted)] mb-8">{onVoteCard || deadline ? `Blind choice · ${secondsLeft}s` : 'Click a mystery card.'}</p>
        
        {drawnCards.length === 0 ? (
          <p className="rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-bold text-white/70">
            {emptyMessage}
          </p>
        ) : (
          <div className="flex gap-8 items-center justify-center relative">
            {drawnCards.map((card) => {
            const isSelected = selectedCardId === card.id;
            const isOther = selectedCardId && !isSelected;

            return (
              <div 
                key={card.id} 
                className={`flex flex-col items-center gap-4 transition-all duration-700 ease-in-out cursor-pointer
                  ${isSelected ? 'scale-125 z-50 translate-y-32 opacity-0 delay-500' : ''}
                  ${isOther ? 'scale-75 opacity-0' : 'hover:scale-105'}
                `}
              >
                <div onClick={() => handleCardClick(card)}>
                  <PowerCard
                    card={card}
                    state={isSelected ? 'revealed' : 'locked'}
                    size="lg"
                  />
                </div>
              </div>
            );
            })}
          </div>
        )}
      </div>
    </PowerCardOverlay>
  );
}