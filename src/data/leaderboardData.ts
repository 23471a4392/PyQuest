import { LeaderboardEntry, LeaderboardCategory } from '../types/arena';

export const LEADERBOARDS_DATABASE: Record<LeaderboardCategory, LeaderboardEntry[]> = {
  weekly: [
    {
      rank: 1,
      userId: 'user-alex',
      username: 'Alex_PyPro',
      avatar: '👑',
      score: 4820,
      tier: 'Python Master',
      wins: 42,
      challengesCompleted: 156,
      streakDays: 24,
      badgeIcons: ['👑', '⚡', '🏆']
    },
    {
      rank: 2,
      userId: 'user-rahul',
      username: 'Rahul_Dev',
      avatar: '⚡',
      score: 4510,
      tier: 'Gold',
      wins: 38,
      challengesCompleted: 142,
      streakDays: 19,
      badgeIcons: ['⚡', '🧠', '🔥']
    },
    {
      rank: 3,
      userId: 'user-current-sree',
      username: 'Sree',
      avatar: '🧑‍💻',
      score: 4290,
      tier: 'Gold',
      wins: 18,
      challengesCompleted: 110,
      streakDays: 7,
      badgeIcons: ['🏆', '🐍', '⚡', '🔥'],
      isCurrentPlayer: true
    },
    {
      rank: 4,
      userId: 'user-priya',
      username: 'Priya_Code',
      avatar: '🌟',
      score: 4010,
      tier: 'Gold',
      wins: 29,
      challengesCompleted: 98,
      streakDays: 14,
      badgeIcons: ['🔁', '🛠️']
    },
    {
      rank: 5,
      userId: 'user-marcus',
      username: 'MarcusViper',
      avatar: '🐍',
      score: 3850,
      tier: 'Silver',
      wins: 22,
      challengesCompleted: 87,
      streakDays: 9,
      badgeIcons: ['🔢', '🧠']
    },
    {
      rank: 6,
      userId: 'user-elena',
      username: 'ElenaK',
      avatar: '🚀',
      score: 3620,
      tier: 'Silver',
      wins: 19,
      challengesCompleted: 74,
      streakDays: 11,
      badgeIcons: ['📦']
    },
    {
      rank: 7,
      userId: 'user-kenji',
      username: 'Kenji_Syntax',
      avatar: '⚔️',
      score: 3410,
      tier: 'Silver',
      wins: 15,
      challengesCompleted: 68,
      streakDays: 5,
      badgeIcons: ['⚡']
    }
  ],
  global: [
    {
      rank: 1,
      userId: 'user-zenith',
      username: 'ZenithCoder',
      avatar: '🌌',
      score: 49800,
      tier: 'Python Master',
      wins: 310,
      challengesCompleted: 950,
      streakDays: 180,
      badgeIcons: ['👑', '🏆', '💎', '🔥']
    },
    {
      rank: 2,
      userId: 'user-alex',
      username: 'Alex_PyPro',
      avatar: '👑',
      score: 38400,
      tier: 'Python Master',
      wins: 245,
      challengesCompleted: 790,
      streakDays: 94,
      badgeIcons: ['👑', '⚡', '🏆']
    },
    {
      rank: 3,
      userId: 'user-byteknight',
      username: 'ByteKnight',
      avatar: '🛡️',
      score: 32100,
      tier: 'Gold',
      wins: 190,
      challengesCompleted: 640,
      streakDays: 45,
      badgeIcons: ['🧠', '🔁']
    },
    {
      rank: 24,
      userId: 'user-current-sree',
      username: 'Sree',
      avatar: '🧑‍💻',
      score: 8420,
      tier: 'Gold',
      wins: 18,
      challengesCompleted: 110,
      streakDays: 7,
      badgeIcons: ['🏆', '🐍', '⚡', '🔥'],
      isCurrentPlayer: true
    }
  ],
  daily: [
    {
      rank: 1,
      userId: 'user-marcus',
      username: 'MarcusViper',
      avatar: '🐍',
      score: 950,
      tier: 'Silver',
      wins: 5,
      challengesCompleted: 18,
      streakDays: 9,
      badgeIcons: ['⚡']
    },
    {
      rank: 2,
      userId: 'user-current-sree',
      username: 'Sree',
      avatar: '🧑‍💻',
      score: 850,
      tier: 'Gold',
      wins: 3,
      challengesCompleted: 15,
      streakDays: 7,
      badgeIcons: ['🏆', '🐍'],
      isCurrentPlayer: true
    },
    {
      rank: 3,
      userId: 'user-priya',
      username: 'Priya_Code',
      avatar: '🌟',
      score: 620,
      tier: 'Gold',
      wins: 2,
      challengesCompleted: 10,
      streakDays: 14,
      badgeIcons: ['🛠️']
    }
  ],
  friends: [
    {
      rank: 1,
      userId: 'user-current-sree',
      username: 'Sree',
      avatar: '🧑‍💻',
      score: 4290,
      tier: 'Gold',
      wins: 18,
      challengesCompleted: 110,
      streakDays: 7,
      badgeIcons: ['🏆', '🐍', '⚡', '🔥'],
      isCurrentPlayer: true
    },
    {
      rank: 2,
      userId: 'user-priya',
      username: 'Priya_Code',
      avatar: '🌟',
      score: 4010,
      tier: 'Gold',
      wins: 29,
      challengesCompleted: 98,
      streakDays: 14,
      badgeIcons: ['🔁', '🛠️']
    },
    {
      rank: 3,
      userId: 'user-rahul',
      username: 'Rahul_Dev',
      avatar: '⚡',
      score: 3890,
      tier: 'Gold',
      wins: 24,
      challengesCompleted: 92,
      streakDays: 19,
      badgeIcons: ['⚡', '🧠']
    }
  ],
  algorithms: [
    {
      rank: 1,
      userId: 'user-alex',
      username: 'Alex_PyPro',
      avatar: '👑',
      score: 18500,
      tier: 'Python Master',
      wins: 89,
      challengesCompleted: 340,
      streakDays: 94,
      badgeIcons: ['👑']
    },
    {
      rank: 2,
      userId: 'user-current-sree',
      username: 'Sree',
      avatar: '🧑‍💻',
      score: 6200,
      tier: 'Gold',
      wins: 18,
      challengesCompleted: 80,
      streakDays: 7,
      badgeIcons: ['🧠', '🐍'],
      isCurrentPlayer: true
    }
  ]
};
