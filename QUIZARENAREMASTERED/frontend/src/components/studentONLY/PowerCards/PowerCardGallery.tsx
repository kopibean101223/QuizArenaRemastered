'use client';

import React, { useState } from 'react';
import { PowerCard } from './PowerCard';
import { CARD_CATALOG_BY_CATEGORY, CARD_CATALOG, getCardById } from './CardCatalog';
import { CARD_CATEGORY_META, RARITY_LABEL, type CardCategory, type PowerCardData } from './types';
import { processCardUsage, type StudentCardState } from '@/lib/student/cards/cardProcessor';

const CATEGORY_ORDER: CardCategory[] = [
  'damage',
  'shield',
  'hp',
  'points',
  'selfTimer',
  'enemyTimer',
  'removeChoices',
];

const DEMO_STUDENT: StudentCardState = {
  studentId: 'demo-student',
  points: 100,
  score: 0,
  hp: 5,
  maxHp: 5,
  shield: 0,
  timeLeft: 30,
};

/**
 * Example page: browses every category, using PowerCard for both the
 * face-down "pick a card" moment and the revealed catalog grid, and runs
 * a live use-card transaction through cardProcessor so you can see the
 * remaining points update. Swap DEMO_STUDENT / the enemy stub for real
 * battle state when wiring this into Battle_TeamMode / Battle_BattleRoyale.
 */
/** Picks 3 random distinct cards for the "draw a mystery card" row. */
function drawRandomCards(count: number): PowerCardData[] {
  const shuffled = [...CARD_CATALOG].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function PowerCardGallery() {
  const [student, setStudent] = useState<StudentCardState>(DEMO_STUDENT);
  const [log, setLog] = useState<string[]>([]);

  // Mystery draw: each slot holds a hidden card + whether it's been flipped
  // yet. First click flips it face-up; a second click on an already-
  // revealed card spends it through cardProcessor, same as the catalog grid.
  const [mysterySlots, setMysterySlots] = useState<{ card: PowerCardData; revealed: boolean }[]>(() =>
    drawRandomCards(3).map((card) => ({ card, revealed: false }))
  );

  const flipSlot = (index: number) => {
    setMysterySlots((prev) => prev.map((slot, i) => (i === index ? { ...slot, revealed: true } : slot)));
  };

  const redrawMystery = () => {
    setMysterySlots(drawRandomCards(3).map((card) => ({ card, revealed: false })));
  };

  const handleUseCard = (cardId: string) => {
    const card = getCardById(cardId);
    if (!card) return;

    const result = processCardUsage({
      card,
      student,
      enemy: { enemyId: 'demo-enemy', hp: 5, shield: 0, timeLeft: 30 },
      questionOptions: [
        { key: 'A', isCorrect: false },
        { key: 'B', isCorrect: true },
        { key: 'C', isCorrect: false },
        { key: 'D', isCorrect: false },
      ],
    });

    if (!result.success) {
      setLog((prev) => [result.message, ...prev].slice(0, 6));
      return;
    }

    setStudent(result.updatedStudent);
    setLog((prev) => [`${result.message} — ${result.remainingPoints} pts left`, ...prev].slice(0, 6));
  };

  return (
    <div className="min-h-screen bg-[#0b0916] text-white p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-extrabold">Power Card Catalog</h1>
        <div className="flex items-center gap-4 text-xs font-bold text-white/70">
          <span>Points: <span className="text-[#F5C542]">{student.points}</span></span>
          <span>Score: <span className="text-[#2ED47A]">{student.score}</span></span>
          <span>HP: <span className="text-[#FF5C5C]">{student.hp}/{student.maxHp}</span></span>
          <span>Shield: <span className="text-[#4DA3FF]">{student.shield}</span></span>
          <span>Timer: <span className="text-[#8F7BFF]">{student.timeLeft}s</span></span>
        </div>
      </div>

      {CATEGORY_ORDER.map((category) => {
        const meta = CARD_CATEGORY_META[category];
        const cards = CARD_CATALOG_BY_CATEGORY[category];
        return (
          <section key={category} className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <meta.icon size={16} color={meta.color} />
              <h2 className="text-sm font-extrabold uppercase tracking-wide" style={{ color: meta.color }}>
                {meta.label}
              </h2>
            </div>
            <div className="flex flex-wrap gap-4">
              {cards.map((card) => (
                <div key={card.id} className="flex flex-col items-center gap-2">
                  <PowerCard card={card} state="revealed" size="md" onClick={() => handleUseCard(card.id)} />
                  <span className="text-[10px] text-white/40">{RARITY_LABEL[card.rarity]}</span>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {/* the face-down draw as seen mid-battle: click a card to flip it, click again to use it */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-extrabold uppercase tracking-wide text-white/60">Draw a power card</h2>
          <button
            type="button"
            onClick={redrawMystery}
            className="text-[10px] font-bold text-white/50 hover:text-white/80 underline"
          >
            Redraw
          </button>
        </div>
        <div className="flex gap-4">
          {mysterySlots.map((slot, i) => (
            <PowerCard
              key={slot.card.id}
              card={slot.card}
              state={slot.revealed ? 'revealed' : 'locked'}
              size="md"
              onClick={() => (slot.revealed ? handleUseCard(slot.card.id) : flipSlot(i))}
            />
          ))}
        </div>
      </section>

      <section className="bg-white/5 rounded-xl p-4 text-xs text-white/70 font-mono">
        {log.length === 0 ? 'Click a card to run it through cardProcessor…' : log.map((line, i) => <div key={i}>{line}</div>)}
      </section>
    </div>
  );
}

export default PowerCardGallery;