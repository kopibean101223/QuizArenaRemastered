'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
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
  onCardUse?: (card: PowerCardData) => void;
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
  onCardUse,
}: PowerCardTrayProps) {
  const [drawnCards] = useState<PowerCardData[]>(() => cards ?? drawBattleCards(count));
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const powerCards = cards ?? drawnCards;

  function toggleCard(card: PowerCardData) {
    if (expandedCardId === card.id) {
      // If already expanded, close it
      setExpandedCardId(null);
    } else {
      // Expand the card to full view
      setExpandedCardId(card.id);
    }
    onToggleReveal?.(card, expandedCardId !== card.id);
  }

  const expandedCard = expandedCardId ? powerCards.find(c => c.id === expandedCardId) : null;

  return (
    <>
      {/* Card Tray in corner */}
      <div className={`fixed left-[30px] ${topClassName} z-30`}>
        <div className="relative flex h-44 w-64 items-center">
          {powerCards.map((card, index) => {
            const mid = (powerCards.length - 1) / 2;
            const isExpanded = expandedCardId === card.id;
            return (
              <div
                key={card.id}
                className="absolute left-0 top-1/2 transition-all duration-500"
                style={{
                  transform: isExpanded 
                    ? `translateY(-50%) scale(0.5) opacity-0` 
                    : `translateY(-50%) rotate(${90 + (index - mid) * 12}deg) translateX(${index * 20}px)`,
                  transformOrigin: 'left center',
                  zIndex: isExpanded ? 0 : powerCards.length - index,
                  pointerEvents: isExpanded ? 'none' : 'auto',
                }}
              >
                <PowerCard
                  card={card}
                  state="locked"
                  size={size}
                  onClick={() => toggleCard(card)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Full-Screen Card View */}
      {expandedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative flex flex-col items-center gap-6 p-8">
            {/* Close button */}
            <button
              onClick={() => setExpandedCardId(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close card"
            >
              <X size={24} className="text-white" />
            </button>

            {/* Large Card Display */}
            <div className="scale-150">
              <PowerCard
                card={expandedCard}
                state="revealed"
                size="lg"
                onClick={() => setExpandedCardId(null)}
              />
            </div>

            {/* Card Details */}
            <div className="text-center max-w-md">
              <h2 className="text-2xl font-black text-white mb-2">{expandedCard.name}</h2>
              <p className="text-sm text-white/70 mb-4 leading-relaxed">
                {expandedCard.description}
              </p>
              <div className="flex items-center justify-center gap-4 text-xs font-bold">
                <span className="px-3 py-1 rounded-lg bg-white/10 text-white/80">
                  Rarity: {expandedCard.rarity}
                </span>
              </div>
            </div>

            {/* Use Button */}
            {onCardUse && (
              <button
                onClick={() => {
                  onCardUse(expandedCard);
                  setExpandedCardId(null);
                }}
                className="mt-4 px-6 py-3 bg-[#5B3DF6] hover:bg-[#5B3DF6]/80 text-white font-extrabold rounded-xl transition-colors"
              >
                Use Card
              </button>
            )}

            {/* Close on click outside */}
            <div
              className="absolute inset-0 -z-10"
              onClick={() => setExpandedCardId(null)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default PowerCardTray;