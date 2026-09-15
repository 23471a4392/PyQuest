import { Badge } from '../types/player';

export const BADGES_DATA: Badge[] = [
  {
    id: 'badge-beginner',
    title: 'Python Beginner',
    description: 'Began the PyQuest journey and declared your first variable.',
    icon: '🐣',
    category: 'learning',
    rarity: 'Common',
    isUnlocked: true,
    unlockedAt: '2026-08-10',
    requirement: 'Complete the first lesson in World 1.'
  },
  {
    id: 'badge-var-master',
    title: 'Variable Master',
    description: 'Mastered dynamic memory, types, and input/output formatting.',
    icon: '🔢',
    category: 'learning',
    rarity: 'Common',
    isUnlocked: true,
    unlockedAt: '2026-08-14',
    requirement: 'Master all World 1 topics.'
  },
  {
    id: 'badge-logic-builder',
    title: 'Logic Builder',
    description: 'Mastered if/elif/else branching and compound boolean expressions.',
    icon: '🧠',
    category: 'learning',
    rarity: 'Rare',
    isUnlocked: true,
    unlockedAt: '2026-08-20',
    requirement: 'Achieve 85%+ on Decision Making Mastery Test.'
  },
  {
    id: 'badge-loop-warrior',
    title: 'Loop Warrior',
    description: 'Conquered range, for loops, and escaped while loop traps.',
    icon: '🔁',
    category: 'learning',
    rarity: 'Rare',
    isUnlocked: true,
    unlockedAt: '2026-08-28',
    requirement: 'Solve 5 loop practice problems.'
  },
  {
    id: 'badge-func-builder',
    title: 'Function Builder',
    description: 'Modularized complex routines with reusable def and clean returns.',
    icon: '🛠️',
    category: 'learning',
    rarity: 'Rare',
    isUnlocked: true,
    unlockedAt: '2026-09-02',
    requirement: 'Complete all lessons in World 4 Functions.'
  },
  {
    id: 'badge-collection-master',
    title: 'Collection Master',
    description: 'Harnessed lists, tuples, dictionaries, sets, and comprehensions.',
    icon: '📦',
    category: 'mastery',
    rarity: 'Epic',
    isUnlocked: false,
    requirement: 'Master both Lists and Dicts topics in World 5.'
  },
  {
    id: 'badge-oop-master',
    title: 'OOP Master',
    description: 'Engineered classes, methods, inheritance, and polymorphic systems.',
    icon: '👑',
    category: 'mastery',
    rarity: 'Legendary',
    isUnlocked: false,
    requirement: 'Pass World 6 Advanced OOP Mastery Check.'
  },
  {
    id: 'badge-speed-coder',
    title: 'Speed Coder',
    description: 'Answered 5 consecutive Speed Run challenges in under 45 seconds.',
    icon: '⚡',
    category: 'arena',
    rarity: 'Rare',
    isUnlocked: true,
    unlockedAt: '2026-09-10',
    requirement: 'Achieve 5x streak in Speed Run Arena.'
  },
  {
    id: 'badge-7-day-streak',
    title: '7-Day Streak',
    description: 'Trained coding drills every day for 7 consecutive days.',
    icon: '🔥',
    category: 'streak',
    rarity: 'Rare',
    isUnlocked: true,
    unlockedAt: '2026-09-12',
    requirement: 'Maintain active streak for 7 days.'
  },
  {
    id: 'badge-dragon-slayer',
    title: 'Dragon Slayer',
    description: 'Defeated Pyrax the Loop Dragon in the Python Boss Battle!',
    icon: '🐉',
    category: 'arena',
    rarity: 'Epic',
    isUnlocked: false,
    requirement: 'Reduce Pyrax the Loop Dragon to 0 HP.'
  },
  {
    id: 'badge-survival-legend',
    title: 'Survival Legend',
    description: 'Survived past Level 5 in Python Survival Gauntlet.',
    icon: '🛡️',
    category: 'arena',
    rarity: 'Epic',
    isUnlocked: false,
    requirement: 'Reach Level 6 in Survival Mode.'
  },
  {
    id: 'badge-arena-champion',
    title: 'Arena Champion',
    description: 'Finished 1st place in an official PYQUEST Weekly Championship.',
    icon: '🏆',
    category: 'arena',
    rarity: 'Legendary',
    isUnlocked: false,
    requirement: 'Win 1st place in Weekly Championship.'
  }
];
