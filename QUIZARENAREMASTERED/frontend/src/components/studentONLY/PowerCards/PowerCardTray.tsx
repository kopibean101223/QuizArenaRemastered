'use client';

import React, { useState } from 'react';
import { PowerCard } from './PowerCard';
import { CARD_CATALOG } from './CardCatalog';
import type { PowerCardData } from './types';

export interface PowerCardTrayProps {
  count?: number;
  cards?: PowerCardData[];
  /** Vertical offset so each page can park the tray below its own header. */
  topClassName?: string;
  size?: 'sm' | 'md' | 'lg';
  onToggleReveal?: (card: PowerCardData, isRevealed: boolean) => void;
}

function drawBattleCards(count: number): PowerCardData[] {
  return [...CARD_CATALOG].sort(() => Math.random() - 0.5).slice(0, count);
}

export function PowerCardTray({
  count = 3,
  cards,
  topClassName = 'top-60',
  size = 'md',
  onToggleReveal,
}: PowerCardTrayProps) {
  const [drawnCards] = useState<PowerCardData[]>(() => cards ?? drawBattleCards(count));
  const [revealedCards, setRevealedCards] = useState<Set<string>>(() => new Set());
  const powerCards = cards ?? drawnCards;

  function toggleCard(card: PowerCardData) {
    setRevealedCards((previous) => {
      const next = new Set(previous);
      const willReveal = !next.has(card.id);
      if (willReveal) next.add(card.id);
      else next.delete(card.id);
      onToggleReveal?.(card, willReveal);
      return next;
    });
  }

  return (
    <div className={`fixed left-[30px] ${topClassName} z-30`}>
      <div className="relative flex h-44 w-64 items-center">
        {powerCards.map((card, index) => {
          const mid = (powerCards.length - 1) / 2;
          const isRevealed = revealedCards.has(card.id);
          return (
            <div
              key={card.id}
              className="absolute left-0 top-1/2 transition-all duration-500"
              style={{
                transform: `translateY(-50%) rotate(${90 + (isRevealed ? 0 : (index - mid) * 12)}deg) translateX(${isRevealed ? 16 : index * 20}px)`,
                transformOrigin: 'left center',
                zIndex: isRevealed ? 50 : powerCards.length - index,
              }}
            >
              <PowerCard
                card={card}
                state={isRevealed ? 'revealed' : 'locked'}
                size={size}
                onClick={() => toggleCard(card)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PowerCardTray;