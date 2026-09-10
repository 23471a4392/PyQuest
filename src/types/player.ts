import { ArenaTier } from './arena';

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'learning' | 'arena' | 'mastery' | 'streak' | 'special';
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  isUnlocked: boolean;
  unlockedAt?: string;
  requirement: string;
}

export interface SkillProgress {
  topicId: string;
  topicName: string;
  worldNumber: number;
  percentage: number;
  masteryStatus: 'Novice' | 'Apprentice' | 'Proficient' | 'Master';
  problemsSolved: number;
  totalProblems: number;
  lessonsDone: number;
  totalLessons: number;
}

export interface ActivityItem {
  id: string;
  type: 'lesson_completed' | 'problem_solved' | 'test_passed' | 'boss_defeated' | 'arena_win' | 'badge_unlocked';
  title: string;
  xpEarned: number;
  timestamp: string;
}

export interface PlayerProfile {
  id: string;
  username: string;
  handle: string;
  bio: string;
  avatarUrl: string;
  level: number;
  xp: number;
  xpForCurrentLevel: number;
  xpToNextLevel: number;
  coins: number;
  globalRank: number;
  arenaTier: ArenaTier;
  joinedDate: string;
  streakDays: number;
  lastActiveDate: string;
  
  // Game & Learning Stats
  lessonsCompleted: number;
  problemsSolved: number;
  testsCompleted: number;
  arenaCompetitionsWon: number;
  arenaCompetitionsPlayed: number;
  bossesDefeated: number;
  highestSurvivalScore: number;
  speedRunBestScore: number;

  badges: Badge[];
  skills: SkillProgress[];
  recentActivity: ActivityItem[];
}

export interface PlayerSettings {
  displayName: string;
  handle: string;
  bio: string;
  avatarId: string;
  theme: 'dark' | 'light';
  editorFontSize: number;
  editorTabSize: number;
  autoRunTests: boolean;
  soundEffects: boolean;
  emailNotifications: boolean;
}
