'use client';
import React, { useState } from 'react';
import { PowerCard } from './PowerCard';
import type { PowerCardData } from './types';

interface ChoosePowerUpProps {
  drawnCards: PowerCardData[];
  onSelectCard: (card: PowerCardData) => void;
}

export function ChoosePowerUp({ drawnCards, onSelectCard }: ChoosePowerUpProps) {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const handleCardClick = (card: PowerCardData) => {
    if (selectedCardId) return; // Prevent multiple clicks
    setSelectedCardId(card.id);
    
    // Wait for the reveal animation and transition to finish before adding to deck
    setTimeout(() => {
      onSelectCard(card);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-[Fredoka] font-bold text-[var(--gm-yellow)] mb-2 uppercase animate-[gm-pulse_1s_infinite]">
          Select Ultimate Protocol
        </h2>
        <p className="text-[var(--gm-muted)] mb-8">Click a mystery card.</p>
        
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
      </div>
    </div>
  );
}