'use client';
import React, { useState } from 'react';
import { PowerCard } from './PowerCard';
import type { PowerCardData } from './types';

interface ChoosePowerUpProps {
  drawnCards: PowerCardData[];
  onSelectCard: (card: PowerCardData) => void;
}

export function ChoosePowerUp({ drawnCards, onSelectCard }: ChoosePowerUpProps) {
  // Track which cards have been clicked/revealed by their IDs
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());

  const revealCard = (id: string) => {
    setRevealedIds((prev) => new Set(prev).add(id));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-[Fredoka] font-bold text-[var(--gm-yellow)] mb-2 uppercase animate-[gm-pulse_1s_infinite]">
          Select Ultimate Protocol
        </h2>
        <p className="text-[var(--gm-muted)] mb-8">Click a mystery card to reveal it, then add to your deck.</p>
        
        <div className="flex gap-8 items-center justify-center">
          {drawnCards.map((card) => {
            const isRevealed = revealedIds.has(card.id);
            return (
              <div key={card.id} className="flex flex-col items-center gap-4">
                <div onClick={() => revealCard(card.id)}>
                  <PowerCard
                    card={card}
                    state={isRevealed ? 'revealed' : 'locked'}
                    size="lg"
                  />
                </div>
                {isRevealed && (
                  <button
                    onClick={() => onSelectCard(card)}
                    className="bg-[var(--gm-coral)] hover:bg-[var(--gm-red)] text-white font-bold px-6 py-2 rounded-xl transition-colors cursor-pointer animate-[gm-float-up_0.5s_ease-out]"
                  >
                    Add to Deck
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}