import type { PowerCardData } from './types';

/** damage category — hurts the enemy (team, opponent, or boss depending on mode). */
export const DAMAGE_CARDS: PowerCardData[] = [
  {
    id: 'dmg-double-trouble',
    category: 'damage',
    name: 'Double Trouble',
    description: '50% chance to deal double damage to the enemy.',
    cost: 30,
    rarity: 'rare',
    effect: { category: 'damage', target: 'enemy', amount: 10, chance: 0.5, multiplier: 2 },
  },
  {
    id: 'dmg-headshot',
    category: 'damage',
    name: 'Headshot',
    description: 'Deals 2 bonus damage straight to the enemy player.',
    cost: 15,
    rarity: 'common',
    effect: { category: 'damage', target: 'enemy', amount: 2 },
  },
  {
    id: 'dmg-critical-strike',
    category: 'damage',
    name: 'Critical Strike',
    description: '25% chance to deal triple damage to the enemy.',
    cost: 40,
    rarity: 'epic',
    effect: { category: 'damage', target: 'enemy', amount: 8, chance: 0.25, multiplier: 3 },
  },
];

/** shield category — absorbs incoming damage before it touches HP. */
export const SHIELD_CARDS: PowerCardData[] = [
  {
    id: 'shd-iron-wall',
    category: 'shield',
    name: 'Iron Wall',
    description: 'Grants 5 HP shield that absorbs damage first.',
    cost: 20,
    rarity: 'common',
    effect: { category: 'shield', target: 'self', amount: 5 },
  },
  {
    id: 'shd-barrier-surge',
    category: 'shield',
    name: 'Barrier Surge',
    description: 'Stacks 3 HP shield on top of any shield you already have.',
    cost: 25,
    rarity: 'rare',
    effect: { category: 'shield', target: 'self', amount: 3 },
  },
  {
    id: 'shd-aegis',
    category: 'shield',
    name: 'Aegis',
    description: 'A heavy 10 HP shield for the next hit that lands.',
    cost: 45,
    rarity: 'epic',
    effect: { category: 'shield', target: 'self', amount: 10 },
  },
];

/** hp category — restores the student's own health. */
export const HP_CARDS: PowerCardData[] = [
  {
    id: 'hp-second-wind',
    category: 'hp',
    name: 'Second Wind',
    description: 'Restores 3 HP instantly.',
    cost: 20,
    rarity: 'common',
    effect: { category: 'hp', target: 'self', amount: 3 },
  },
  {
    id: 'hp-emergency-patch',
    category: 'hp',
    name: 'Emergency Patch',
    description: 'A quick 1 HP top-up — cheap, but every point counts.',
    cost: 10,
    rarity: 'common',
    effect: { category: 'hp', target: 'self', amount: 1 },
  },
  {
    id: 'hp-vitality-boost',
    category: 'hp',
    name: 'Vitality Boost',
    description: 'Restores 6 HP, capped at your max HP.',
    cost: 35,
    rarity: 'epic',
    effect: { category: 'hp', target: 'self', amount: 6 },
  },
];

/** points category — adds directly to the student's score. */
export const POINTS_CARDS: PowerCardData[] = [
  {
    id: 'pts-bonus-bounty',
    category: 'points',
    name: 'Bonus Bounty',
    description: 'Instantly adds 25 points to your score.',
    cost: 30,
    rarity: 'rare',
    effect: { category: 'points', target: 'self', amount: 25 },
  },
  {
    id: 'pts-lucky-streak',
    category: 'points',
    name: 'Lucky Streak',
    description: 'Adds a modest 10-point bonus to your score.',
    cost: 12,
    rarity: 'common',
    effect: { category: 'points', target: 'self', amount: 10 },
  },
  {
    id: 'pts-jackpot',
    category: 'points',
    name: 'Jackpot',
    description: 'A big 50-point windfall added straight to your score.',
    cost: 50,
    rarity: 'legendary',
    effect: { category: 'points', target: 'self', amount: 50 },
  },
];

/** selfTimer category — extends the student's own answer timer. */
export const SELF_TIMER_CARDS: PowerCardData[] = [
  {
    id: 'time-extra-seconds',
    category: 'selfTimer',
    name: 'Extra Seconds',
    description: 'Adds 5 seconds to your own countdown.',
    cost: 15,
    rarity: 'common',
    effect: { category: 'selfTimer', target: 'self', amount: 5 },
  },
  {
    id: 'time-warp',
    category: 'selfTimer',
    name: 'Time Warp',
    description: 'Adds a generous 10 seconds to your own countdown.',
    cost: 35,
    rarity: 'epic',
    effect: { category: 'selfTimer', target: 'self', amount: 10 },
  },
];

/** enemyTimer category — shortens the enemy's answer timer. */
export const ENEMY_TIMER_CARDS: PowerCardData[] = [
  {
    id: 'time-freeze',
    category: 'enemyTimer',
    name: 'Time Freeze',
    description: "Cuts 5 seconds from the enemy's countdown.",
    cost: 20,
    rarity: 'rare',
    effect: { category: 'enemyTimer', target: 'enemy', amount: 5 },
  },
  {
    id: 'time-countdown-crash',
    category: 'enemyTimer',
    name: 'Countdown Crash',
    description: "Slashes 8 seconds off the enemy's countdown.",
    cost: 40,
    rarity: 'epic',
    effect: { category: 'enemyTimer', target: 'enemy', amount: 8 },
  },
];

/** removeChoices category — a 50/50-style lifeline on the student's own question. */
export const REMOVE_CHOICES_CARDS: PowerCardData[] = [
  {
    id: 'rc-fifty-fifty',
    category: 'removeChoices',
    name: 'Fifty-Fifty',
    description: 'Removes 2 incorrect answer choices from the current question.',
    cost: 25,
    rarity: 'rare',
    effect: { category: 'removeChoices', target: 'self', choicesToRemove: 2 },
  },
  {
    id: 'rc-narrow-it-down',
    category: 'removeChoices',
    name: 'Narrow It Down',
    description: 'Removes 1 incorrect answer choice from the current question.',
    cost: 12,
    rarity: 'common',
    effect: { category: 'removeChoices', target: 'self', choicesToRemove: 1 },
  },
];

export const PROF_CARDS: PowerCardData[] = [
  {
    id: 'prof-override',
    category: 'profOverride',
    name: 'Override',
    description: 'Forces a sudden-death True/False question window.',
    cost: 50,
    rarity: 'legendary',
    effect: { category: 'profOverride', target: 'enemy' },
  },
  {
    id: 'prof-evasion',
    category: 'profEvasion',
    name: 'Evasion Protocol',
    description: 'Nullifies 50% of incoming class damage for the current turn.',
    cost: 30,
    rarity: 'epic',
    effect: { category: 'profEvasion', target: 'self', multiplier: 0.5 },
  },
  {
    id: 'prof-time-drain',
    category: 'profTime',
    name: 'Time Squeeze',
    description: "Instantly decreases the students' remaining time by 20%.",
    cost: 25,
    rarity: 'rare',
    effect: { category: 'profTime', target: 'enemy', amount: 20 },
  }
];

/** Bingo-specific cards — Steal and Retake buffs for the Bingo game mode. */
export const BINGO_STEAL_CARDS: PowerCardData[] = [
  {
    id: 'bingo-steal',
    category: 'shield',
    name: 'Steal',
    description: 'Blindly swap a number with another player.',
    cost: 0,
    rarity: 'rare',
    effect: { category: 'shield', target: 'enemy' },
  },
];

export const BINGO_RETAKE_CARDS: PowerCardData[] = [
  {
    id: 'bingo-retake',
    category: 'hp',
    name: 'Retake',
    description: 'Recover one of your incorrect numbers.',
    cost: 0,
    rarity: 'rare',
    effect: { category: 'hp', target: 'self' },
  },
];

export const LIVE_QUIZ_CARDS: PowerCardData[] = [
  ...POINTS_CARDS,
  ...REMOVE_CHOICES_CARDS,
];

export const TEAM_MODE_CARDS: PowerCardData[] = [
  ...POINTS_CARDS,
  ...REMOVE_CHOICES_CARDS,
];

export const BATTLE_ROYALE_CARDS: PowerCardData[] = [
  //...ENEMY_TIMER_CARDS,
  //...SELF_TIMER_CARDS,
  ...POINTS_CARDS,
  //...REMOVE_CHOICES_CARDS,
  ...HP_CARDS,
  ...SHIELD_CARDS,
  ...DAMAGE_CARDS,
];

export const ENDLESS_CARDS: PowerCardData[] = [
  // Populate endless mode cards here
];

export const BOSS_MODE_CARDS: PowerCardData[] = [
  // Populate boss mode cards here
];

// Helper functions

export function getEndlessCards(): PowerCardData[] {
  return ENDLESS_CARDS;
}

export function getBossModeCards(): PowerCardData[] {
  return BOSS_MODE_CARDS;
}



export const CARD_CATALOG: PowerCardData[] = [
  ...DAMAGE_CARDS,
  ...SHIELD_CARDS,
  ...HP_CARDS,
  ...POINTS_CARDS,
  ...SELF_TIMER_CARDS,
  ...ENEMY_TIMER_CARDS,
  ...REMOVE_CHOICES_CARDS,
  ...PROF_CARDS,
  ...BINGO_STEAL_CARDS,
  ...BINGO_RETAKE_CARDS,
];

export const CARD_CATALOG_BY_CATEGORY = {
  damage: DAMAGE_CARDS,
  shield: SHIELD_CARDS,
  hp: HP_CARDS,
  points: POINTS_CARDS,
  selfTimer: SELF_TIMER_CARDS,
  enemyTimer: ENEMY_TIMER_CARDS,
  removeChoices: REMOVE_CHOICES_CARDS,
} as const;

export function getCardById(cardId: string): PowerCardData | undefined {
  return CARD_CATALOG.find((c) => c.id === cardId);
}