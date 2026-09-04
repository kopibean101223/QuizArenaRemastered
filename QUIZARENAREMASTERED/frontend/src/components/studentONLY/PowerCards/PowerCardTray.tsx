'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Search, Sparkles, X } from 'lucide-react';
import { PowerCard } from './PowerCard';
import { PowerCardOverlay } from './PowerCardOverlay';
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
  /** Keeps the card-use overlay open for the entire synchronized phase. */
  phaseLocked?: boolean;
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
  phaseLocked = false,
}: PowerCardTrayProps) {
  const [drawnCards] = useState<PowerCardData[]>(() => cards ?? drawBattleCards(count));
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [targetId, setTargetId] = useState('');
  const [targetSearch, setTargetSearch] = useState('');
  const [usedInPhase, setUsedInPhase] = useState(false);
  const wasPhaseLockedRef = useRef(phaseLocked);
  const powerCards = cards ?? drawnCards;
  const expandedCard = expandedCardId ? powerCards.find(c => c.id === expandedCardId) : null;
  const needsTarget = expandedCard?.effect.target === 'enemy' && targetOptions.length > 0;
  const filteredTargets = targetOptions.filter((target) =>
    target.name.toLowerCase().includes(targetSearch.toLowerCase())
  );

  useEffect(() => {
    if (wasPhaseLockedRef.current && !phaseLocked) {
      setExpandedCardId(null);
      setTargetId('');
      setTargetSearch('');
    }
    if (!phaseLocked) setUsedInPhase(false);
    if (phaseLocked && powerCards.length > 0 && !expandedCardId) {
      setExpandedCardId(powerCards[0].id);
    }
    if (expandedCardId && !powerCards.some((card) => card.id === expandedCardId)) {
      setExpandedCardId(null);
    }
    wasPhaseLockedRef.current = phaseLocked;
  }, [expandedCardId, phaseLocked, powerCards]);

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
        <PowerCardOverlay locked={phaseLocked} onClose={() => setExpandedCardId(null)}>
            {/* Close button */}
            {!phaseLocked && (
              <button
                onClick={() => setExpandedCardId(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Close card"
              >
                <X size={24} className="text-white" />
              </button>
            )}

            <div className="flex max-w-5xl flex-wrap items-center justify-center gap-4">
                {powerCards.map((card) => (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => setExpandedCardId(card.id)}
                    className={`rounded-2xl p-1 transition ${expandedCardId === card.id ? 'ring-2 ring-[#FFC93C]' : 'opacity-75 hover:opacity-100'}`}
                    aria-label={`Inspect ${card.name}`}
                  >
                    <PowerCard card={card} state="revealed" size="md" />
                  </button>
                ))}
            </div>

            {/* Large Card Display */}
            <div className="scale-150">
              <PowerCard
                card={expandedCard}
                state="revealed"
                size="lg"
                onClick={phaseLocked ? undefined : () => setExpandedCardId(null)}
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
                <div className="mt-4 w-full max-w-xs text-left">
                  <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-white/50">
                    Target player
                  </label>
                  <div className="relative mb-2">
                    <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      value={targetSearch}
                      onChange={(event) => setTargetSearch(event.target.value)}
                      placeholder="Search players"
                      className="w-full rounded-lg border border-white/10 bg-black/20 py-2 pl-9 pr-3 text-xs text-white outline-none focus:border-[#FFC93C]"
                    />
                  </div>
                  <select
                    value={targetId}
                    onChange={(event) => setTargetId(event.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-[#171329] px-3 py-2 text-xs font-bold text-white outline-none focus:border-[#FFC93C]"
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

            {phaseLocked && onCardUse && (
              <button
                type="button"
                disabled={usedInPhase || (needsTarget && !targetId)}
                onClick={() => {
                  setUsedInPhase(true);
                  onCardUse(expandedCard, targetId || undefined);
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-[#5B3DF6] px-6 py-3 font-extrabold text-white transition hover:bg-[#765dff] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Sparkles size={16} />
                {usedInPhase ? 'Card Used' : 'Use Card'}
              </button>
            )}

        </PowerCardOverlay>
      )}
    </>
  );
}

export default PowerCardTray;