'use client';

import React, { useState } from 'react';
import { Search, Sparkles, X } from 'lucide-react';
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
  onCardUse?: (card: PowerCardData, targetId?: string) => void;
  targetOptions?: { id: string; name: string }[];
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
  targetOptions = [],
}: PowerCardTrayProps) {
  const [drawnCards] = useState<PowerCardData[]>(() => cards ?? drawBattleCards(count));
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [targetId, setTargetId] = useState('');
  const [targetSearch, setTargetSearch] = useState('');
  const powerCards = cards ?? drawnCards;
  const expandedCard = expandedCardId ? powerCards.find(c => c.id === expandedCardId) : null;
  const needsTarget = expandedCard?.effect.target === 'enemy' && targetOptions.length > 0;
  const filteredTargets = targetOptions.filter((target) =>
    target.name.toLowerCase().includes(targetSearch.toLowerCase())
  );

  function toggleCard(card: PowerCardData) {
    if (expandedCardId === card.id) {
      // If already expanded, close it
      setExpandedCardId(null);
    } else {
      // Expand the card to full view
      setExpandedCardId(card.id);
      setTargetId('');
      setTargetSearch('');
    }
    onToggleReveal?.(card, expandedCardId !== card.id);
  }

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
                  state="revealed" // <-- Changed from "locked" to "revealed"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-[powerCardFadeIn_220ms_ease-out]">
          <div className="relative flex flex-col items-center gap-6 p-8 animate-[powerCardRise_420ms_cubic-bezier(.2,.8,.2,1)]">
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

              {needsTarget && (
                <div className="mt-4 w-full max-w-xs text-left animate-[powerCardFadeIn_300ms_ease-out]">
                  <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-white/50">
                    Target player
                  </label>
                  <div className="relative mb-2">
                    <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      value={targetSearch}
                      onChange={(event) => setTargetSearch(event.target.value)}
                      placeholder="Search players"
                      className="w-full rounded-lg border border-white/10 bg-black/20 py-2 pl-9 pr-3 text-xs text-white outline-none transition focus:border-[#FFC93C]"
                    />
                  </div>
                  <select
                    value={targetId}
                    onChange={(event) => setTargetId(event.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-[#171329] px-3 py-2 text-xs font-bold text-white outline-none transition focus:border-[#FFC93C]"
                    aria-label="Select target player"
                  >
                    <option value="">Choose a player</option>
                    {filteredTargets.map((target) => (
                      <option key={target.id} value={target.id}>{target.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Use Button */}
            {onCardUse && (
              <button
                disabled={needsTarget && !targetId}
                onClick={() => {
                  onCardUse(expandedCard, targetId || undefined);
                  setExpandedCardId(null);
                }}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#5B3DF6] px-6 py-3 font-extrabold text-white transition hover:bg-[#765dff] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Sparkles size={16} />
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
      <style>{`@keyframes powerCardFadeIn{from{opacity:0}to{opacity:1}}@keyframes powerCardRise{from{opacity:0;transform:translateY(18px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}`}</style>
    </>
  );
}

export default PowerCardTray;