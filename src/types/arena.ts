export type ArenaGameMode = 'speed-run' | 'battles' | 'boss' | 'survival';

export type ArenaTier = 'Basic' | 'Bronze' | 'Silver' | 'Gold' | 'Python Master';

export type CompetitionStatus = 'active' | 'upcoming' | 'completed';

export interface Competition {
  id: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme';
  tierRequired: ArenaTier;
  participantsCount: number;
  durationMinutes: number;
  problemCount: number;
  status: CompetitionStatus;
  startTime: string;
  endTime: string;
  prizeXP: number;
  prizeCoins: number;
  description: string;
  rules: string[];
  prerequisiteTopicTitle?: string;
  isUnlocked: boolean;
}

export interface SpeedRunProblem {
  id: string;
  prompt: string;
  snippet: string;
  options?: string[];
  type: 'code' | 'quick_choice' | 'output_guess';
  expectedAnswer: string;
  starterCode?: string;
  points: number;
}

export interface SpeedRunSession {
  totalTimeSeconds: number;
  remainingSeconds: number;
  currentProblemIndex: number;
  problems: SpeedRunProblem[];
  score: number;
  comboStreak: number;
  isCompleted: boolean;
}

export interface BossAttack {
  name: string;
  damagePercent: number;
  dialogue: string;
}

export interface BossChallenge {
  id: string;
  title: string;
  prompt: string;
  hint: string;
  starterCode: string;
  testInput: string;
  expectedOutput: string;
  damageToBoss: number;
}

export interface Boss {
  id: string;
  name: string;
  title: string;
  avatar: string;
  worldId: string;
  maxHp: number;
  currentHp: number;
  themeColor: string;
  description: string;
  weakness: string;
  challenges: BossChallenge[];
  rewardXP: number;
  rewardCoins: number;
  rewardBadgeId: string;
}

export interface SurvivalQuestion {
  id: string;
  level: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  xpValue: number;
}

export interface CodeBattleMatch {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  opponent: {
    name: string;
    avatar: string;
    rating: number;
    title: string;
    speedFactor: number; // simulated progression rate
  };
  problem: {
    title: string;
    description: string;
    starterCode: string;
    testCases: { input: string; expected: string }[];
  };
  playerScore: number;
  opponentScore: number;
  status: 'ready' | 'in_progress' | 'player_won' | 'opponent_won' | 'draw';
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar: string;
  score: number;
  tier: ArenaTier;
  wins: number;
  challengesCompleted: number;
  streakDays: number;
  badgeIcons: string[];
  isCurrentPlayer?: boolean;
}

export type LeaderboardCategory = 'global' | 'weekly' | 'daily' | 'friends' | 'algorithms';
