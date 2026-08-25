import {
  Swords,
  ShieldCheck,
  HeartPulse,
  Star,
  Hourglass,
  TimerOff,
  XCircle,
  type LucideIcon,
} from 'lucide-react';

/**
 * The 7 power categories requested. Every card in the catalog belongs to
 * exactly one of these — adding an 8th category later only means adding
 * one entry to CARD_CATEGORY_META + one array in cardCatalog.ts, nothing
 * in PowerCard.tsx has to change.
 */
export type CardCategory =
  | 'damage'
  | 'shield'
  | 'hp'
  | 'points'
  | 'selfTimer'
  | 'enemyTimer'
  | 'removeChoices';

export type CardRarity = 'common' | 'rare' | 'epic' | 'legendary';

/** Who the effect resolves against when a card is used. */
export type CardTarget = 'self' | 'enemy';

export interface PowerCardEffect {
  category: CardCategory;
  target: CardTarget;
  /** Flat amount: damage dealt / shield granted / hp restored / points added / seconds. */
  amount?: number;
  /** 0-1 probability gate, e.g. "50% chance to deal double damage". */
  chance?: number;
  /** Applied to `amount` when the chance check succeeds (e.g. 2 = double damage). */
  multiplier?: number;
  /** How many answer choices to strip, for the removeChoices category. */
  choicesToRemove?: number;
}

export interface PowerCardData {
  id: string;
  category: CardCategory;
  name: string;
  description: string;
  /** Points cost deducted from the student's balance when the card is used. */
  cost: number;
  rarity: CardRarity;
  effect: PowerCardEffect;
}

export interface CardCategoryMeta {
  label: string;
  icon: LucideIcon;
  /** Accent hex used for border glow, icon color, and cost badge. */
  color: string;
}

export const CARD_CATEGORY_META: Record<CardCategory, CardCategoryMeta> = {
  damage: { label: 'Damage', icon: Swords, color: '#FF5C5C' },
  shield: { label: 'Shield', icon: ShieldCheck, color: '#4DA3FF' },
  hp: { label: 'HP Recovery', icon: HeartPulse, color: '#2ED47A' },
  points: { label: 'Points', icon: Star, color: '#F5C542' },
  selfTimer: { label: 'Extra Time', icon: Hourglass, color: '#8F7BFF' },
  enemyTimer: { label: 'Time Drain', icon: TimerOff, color: '#FF8A3D' },
  removeChoices: { label: 'Eliminate', icon: XCircle, color: '#FF6FD8' },
};

export const RARITY_LABEL: Record<CardRarity, string> = {
  common: 'Common',
  rare: 'Rare',
  epic: 'Epic',
  legendary: 'Legendary',
};