import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { BADGES_DATA } from '../data/badgesData';
import { Badge, ActivityItem, PlayerSettings } from '../types/player';
import { ArenaTier } from '../types/arena';
import { PracticeDifficulty, TestSubmissionResult } from '../types/learning';
import { soundManager } from '../services/soundEffects';

interface TopicMasteryRecord {
  topicId: string;
  learningDone: boolean;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  testScore: number;
  isMastered: boolean;
}

interface PlayerContextType {
  // Authentication & Player Stats
  isLoggedIn: boolean;
  username: string;
  handle: string;
  avatar: string;
  bio: string;
  archetype: string;
  level: number;
  xp: number;
  xpForCurrentLevel: number;
  xpToNextLevel: number;
  levelProgressPercent: number;
  coins: number;
  globalRank: number;
  arenaTier: ArenaTier;
  streakDays: number;

  // History & Completed collections
  completedLessons: string[];
  solvedProblems: string[];
  testScores: Record<string, number>;
  topicMastery: Record<string, TopicMasteryRecord>;
  unlockedCompetitions: string[];
  bossVictories: string[];
  survivalHighScore: number;
  speedRunHighScore: number;
  badges: Badge[];
  recentActivity: ActivityItem[];
  settings: PlayerSettings;

  // Actions
  login: (name: string, avatar: string, archetype?: string) => void;
  logout: () => void;
  addXP: (amount: number, reason: string) => void;
  addCoins: (amount: number) => void;
  markLessonComplete: (lessonId: string, topicId: string, xpReward: number, coinsReward: number) => void;
  markProblemSolved: (problemId: string, topicId: string, difficulty: PracticeDifficulty, xpReward: number, coinsReward: number) => void;
  recordTestResult: (result: TestSubmissionResult, topicId: string) => void;
  recordBossDefeat: (bossId: string, rewardXP: number, rewardCoins: number, badgeId: string) => void;
  recordSurvivalResult: (level: number, score: number) => void;
  recordSpeedRunScore: (score: number) => void;
  updateSettings: (newSettings: Partial<PlayerSettings>) => void;
  unlockBadge: (badgeId: string) => void;
  resetProgress: () => void;
}

const STORAGE_KEY = 'pyron_gladiator_state_v2';

const freshTopicMastery: Record<string, TopicMasteryRecord> = {
  'topic-variables': {
    topicId: 'topic-variables',
    learningDone: false,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    testScore: 0,
    isMastered: false
  },
  'topic-conditions': {
    topicId: 'topic-conditions',
    learningDone: false,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    testScore: 0,
    isMastered: false
  },
  'topic-for-loops': {
    topicId: 'topic-for-loops',
    learningDone: false,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    testScore: 0,
    isMastered: false
  },
  'topic-functions': {
    topicId: 'topic-functions',
    learningDone: false,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    testScore: 0,
    isMastered: false
  },
  'topic-lists-tuples': {
    topicId: 'topic-lists-tuples',
    learningDone: false,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    testScore: 0,
    isMastered: false
  },
  'topic-oop': {
    topicId: 'topic-oop',
    learningDone: false,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    testScore: 0,
    isMastered: false
  }
};

const freshLevel1State = {
  isLoggedIn: false,
  username: 'Novice Gladiator',
  handle: '@gladiator',
  avatar: '🧑‍💻',
  bio: 'Newly enrolled Python gladiator in the Crucible. Ready to conquer World 1.',
  archetype: 'Speed Coder',
  xp: 0,
  coins: 50,
  streakDays: 1,
  completedLessons: [] as string[],
  solvedProblems: [] as string[],
  testScores: {} as Record<string, number>,
  topicMastery: freshTopicMastery,
  unlockedCompetitions: ['comp-speed-sprint'] as string[],
  bossVictories: [] as string[],
  survivalHighScore: 0,
  speedRunHighScore: 0,
  badges: BADGES_DATA.map((b) => ({ ...b, isUnlocked: b.id === 'badge-beginner' })),
  recentActivity: [
    {
      id: 'act-init',
      type: 'badge_unlocked' as const,
      title: 'Enrolled in PYRON Crucible (Level 1 Novice)',
      xpEarned: 0,
      timestamp: 'Just now'
    }
  ] as ActivityItem[],
  settings: {
    displayName: 'Novice Gladiator',
    handle: '@gladiator',
    bio: 'Newly enrolled Python gladiator.',
    avatarId: '🧑‍💻',
    theme: 'dark' as const,
    editorFontSize: 14,
    editorTabSize: 4,
    autoRunTests: true,
    soundEffects: true,
    emailNotifications: false
  }
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure starting from level 1 logic
        return {
          ...freshLevel1State,
          ...parsed,
          badges: BADGES_DATA.map((b) => {
            const found = parsed.badges?.find((pb: Badge) => pb.id === b.id);
            return found ? found : b;
          })
        };
      }
    } catch {
      // ignore
    }
    return freshLevel1State;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to persist player state:', e);
    }
  }, [state]);

  // Derived Level calculations: 500 XP per level. Level 1 starts at 0 XP!
  const level = Math.floor(state.xp / 500) + 1;
  const xpForCurrentLevel = (level - 1) * 500;
  const xpToNextLevel = level * 500;
  const levelProgressPercent = Math.min(100, Math.round(((state.xp - xpForCurrentLevel) / 500) * 100));

  // Determine Arena Tier based on level
  let arenaTier: ArenaTier = 'Basic';
  if (level >= 20) arenaTier = 'Python Master';
  else if (level >= 15) arenaTier = 'Gold';
  else if (level >= 10) arenaTier = 'Silver';
  else if (level >= 5) arenaTier = 'Bronze';

  // Login Method
  const login = (name: string, avatar: string, archetype = 'Speed Coder') => {
    const cleanName = name.trim() || 'Gladiator';
    const cleanHandle = `@${cleanName.toLowerCase().replace(/\s+/g, '_')}`;

    soundManager.playVictory();

    setState((prev: typeof freshLevel1State) => ({
      ...prev,
      isLoggedIn: true,
      username: cleanName,
      handle: cleanHandle,
      avatar,
      archetype,
      bio: `Level 1 ${archetype} in the Python Crucible. Ready for World 1.`,
      settings: {
        ...prev.settings,
        displayName: cleanName,
        handle: cleanHandle,
        avatarId: avatar
      },
      recentActivity: [
        {
          id: 'act-' + Date.now(),
          type: 'badge_unlocked',
          title: `Gladiator ${cleanName} Initiated at Level 1 (${archetype})`,
          xpEarned: 0,
          timestamp: 'Just now'
        },
        ...prev.recentActivity
      ]
    }));
  };

  // Logout Method
  const logout = () => {
    soundManager.playClick();
    setState((prev: typeof freshLevel1State) => ({
      ...prev,
      isLoggedIn: false
    }));
  };

  const addXP = (amount: number, reason: string) => {
    setState((prev: typeof freshLevel1State) => {
      const newXp = prev.xp + amount;
      const newActivity: ActivityItem = {
        id: 'act-' + Date.now(),
        type: 'lesson_completed',
        title: reason,
        xpEarned: amount,
        timestamp: 'Just now'
      };
      return {
        ...prev,
        xp: newXp,
        recentActivity: [newActivity, ...prev.recentActivity.slice(0, 19)]
      };
    });
  };

  const addCoins = (amount: number) => {
    setState((prev: typeof freshLevel1State) => ({
      ...prev,
      coins: prev.coins + amount
    }));
  };

  const unlockBadge = (badgeId: string) => {
    setState((prev: typeof freshLevel1State) => {
      const updated = prev.badges.map((b: Badge) =>
        b.id === badgeId ? { ...b, isUnlocked: true, unlockedAt: new Date().toISOString().split('T')[0] } : b
      );
      return { ...prev, badges: updated };
    });
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const markLessonComplete = (lessonId: string, topicId: string, xpReward: number, coinsReward: number) => {
    setState((prev: typeof freshLevel1State) => {
      if (prev.completedLessons.includes(lessonId)) return prev;

      const completedLessons = [...prev.completedLessons, lessonId];
      const prevTopic = prev.topicMastery[topicId] || {
        topicId,
        learningDone: false,
        easySolved: 0,
        mediumSolved: 0,
        hardSolved: 0,
        testScore: 0,
        isMastered: false
      };

      const updatedTopic: TopicMasteryRecord = {
        ...prevTopic,
        learningDone: true
      };

      const newXp = prev.xp + xpReward;
      const newCoins = prev.coins + coinsReward;
      const newActivity: ActivityItem = {
        id: 'act-' + Date.now(),
        type: 'lesson_completed',
        title: `Completed Lesson: ${lessonId}`,
        xpEarned: xpReward,
        timestamp: 'Just now'
      };

      soundManager.playSuccess();
      triggerCelebration();

      return {
        ...prev,
        xp: newXp,
        coins: newCoins,
        completedLessons,
        topicMastery: {
          ...prev.topicMastery,
          [topicId]: updatedTopic
        },
        recentActivity: [newActivity, ...prev.recentActivity.slice(0, 19)]
      };
    });
  };

  const markProblemSolved = (problemId: string, topicId: string, difficulty: PracticeDifficulty, xpReward: number, coinsReward: number) => {
    setState((prev: typeof freshLevel1State) => {
      const isAlreadySolved = prev.solvedProblems.includes(problemId);
      const solvedProblems = isAlreadySolved ? prev.solvedProblems : [...prev.solvedProblems, problemId];

      const prevTopic = prev.topicMastery[topicId] || {
        topicId,
        learningDone: false,
        easySolved: 0,
        mediumSolved: 0,
        hardSolved: 0,
        testScore: 0,
        isMastered: false
      };

      let easySolved = prevTopic.easySolved;
      let mediumSolved = prevTopic.mediumSolved;
      let hardSolved = prevTopic.hardSolved;

      if (!isAlreadySolved) {
        if (difficulty === 'Easy') easySolved++;
        else if (difficulty === 'Medium') mediumSolved++;
        else if (difficulty === 'Hard') hardSolved++;
      }

      const isMastered = prevTopic.learningDone && (easySolved + mediumSolved + hardSolved >= 2) && prevTopic.testScore >= 80;

      const updatedTopic: TopicMasteryRecord = {
        ...prevTopic,
        easySolved,
        mediumSolved,
        hardSolved,
        isMastered
      };

      const newXp = isAlreadySolved ? prev.xp : prev.xp + xpReward;
      const newCoins = isAlreadySolved ? prev.coins : prev.coins + coinsReward;
      const newActivity: ActivityItem = {
        id: 'act-' + Date.now(),
        type: 'problem_solved',
        title: `Solved ${difficulty} Practice Drill`,
        xpEarned: isAlreadySolved ? 0 : xpReward,
        timestamp: 'Just now'
      };

      soundManager.playSuccess();
      triggerCelebration();

      return {
        ...prev,
        xp: newXp,
        coins: newCoins,
        solvedProblems,
        topicMastery: {
          ...prev.topicMastery,
          [topicId]: updatedTopic
        },
        recentActivity: [newActivity, ...prev.recentActivity.slice(0, 19)]
      };
    });
  };

  const recordTestResult = (result: TestSubmissionResult, topicId: string) => {
    setState((prev: typeof freshLevel1State) => {
      const prevTopic = prev.topicMastery[topicId] || {
        topicId,
        learningDone: false,
        easySolved: 0,
        mediumSolved: 0,
        hardSolved: 0,
        testScore: 0,
        isMastered: false
      };

      const bestScore = Math.max(prevTopic.testScore, result.percentage);
      const isMastered = prevTopic.learningDone && (prevTopic.easySolved + prevTopic.mediumSolved + prevTopic.hardSolved >= 1) && bestScore >= 80;

      const updatedTopic: TopicMasteryRecord = {
        ...prevTopic,
        testScore: bestScore,
        isMastered
      };

      const unlockedComps = new Set(prev.unlockedCompetitions);
      if (isMastered) {
        unlockedComps.add('comp-weekly-1');
        unlockedComps.add('comp-speed-sprint');
        triggerCelebration();
      }

      const newActivity: ActivityItem = {
        id: 'act-' + Date.now(),
        type: 'test_passed',
        title: `Mastery Test (${result.percentage}%)`,
        xpEarned: result.xpEarned,
        timestamp: 'Just now'
      };

      return {
        ...prev,
        xp: prev.xp + result.xpEarned,
        coins: prev.coins + result.coinsEarned,
        testScores: {
          ...prev.testScores,
          [result.testId]: bestScore
        },
        topicMastery: {
          ...prev.topicMastery,
          [topicId]: updatedTopic
        },
        unlockedCompetitions: Array.from(unlockedComps),
        recentActivity: [newActivity, ...prev.recentActivity.slice(0, 19)]
      };
    });
  };

  const recordBossDefeat = (bossId: string, rewardXP: number, rewardCoins: number, badgeId: string) => {
    setState((prev: typeof freshLevel1State) => {
      const bossVictories = prev.bossVictories.includes(bossId) ? prev.bossVictories : [...prev.bossVictories, bossId];
      const badges = prev.badges.map((b: Badge) =>
        b.id === badgeId ? { ...b, isUnlocked: true, unlockedAt: new Date().toISOString().split('T')[0] } : b
      );

      triggerCelebration();

      const newActivity: ActivityItem = {
        id: 'act-' + Date.now(),
        type: 'boss_defeated',
        title: `Defeated Boss in Colosseum Raid!`,
        xpEarned: rewardXP,
        timestamp: 'Just now'
      };

      return {
        ...prev,
        xp: prev.xp + rewardXP,
        coins: prev.coins + rewardCoins,
        bossVictories,
        badges,
        recentActivity: [newActivity, ...prev.recentActivity.slice(0, 19)]
      };
    });
  };

  const recordSurvivalResult = (levelAchieved: number, score: number) => {
    setState((prev: typeof freshLevel1State) => {
      const highestSurvivalScore = Math.max(prev.survivalHighScore, levelAchieved);
      return {
        ...prev,
        xp: prev.xp + score,
        survivalHighScore: highestSurvivalScore
      };
    });
  };

  const recordSpeedRunScore = (score: number) => {
    setState((prev: typeof freshLevel1State) => {
      const speedRunHighScore = Math.max(prev.speedRunHighScore, score);
      return {
        ...prev,
        xp: prev.xp + Math.round(score / 2),
        speedRunHighScore
      };
    });
  };

  const updateSettings = (newSettings: Partial<PlayerSettings>) => {
    setState((prev: typeof freshLevel1State) => ({
      ...prev,
      username: newSettings.displayName || prev.username,
      handle: newSettings.handle || prev.handle,
      bio: newSettings.bio || prev.bio,
      avatar: newSettings.avatarId || prev.avatar,
      settings: { ...prev.settings, ...newSettings }
    }));
  };

  const resetProgress = () => {
    setState(freshLevel1State);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <PlayerContext.Provider
      value={{
        isLoggedIn: state.isLoggedIn,
        username: state.username,
        handle: state.handle,
        avatar: state.avatar,
        bio: state.bio,
        archetype: state.archetype,
        level,
        xp: state.xp,
        xpForCurrentLevel,
        xpToNextLevel,
        levelProgressPercent,
        coins: state.coins,
        globalRank: 128,
        arenaTier,
        streakDays: state.streakDays,
        completedLessons: state.completedLessons,
        solvedProblems: state.solvedProblems,
        testScores: state.testScores,
        topicMastery: state.topicMastery,
        unlockedCompetitions: state.unlockedCompetitions,
        bossVictories: state.bossVictories,
        survivalHighScore: state.survivalHighScore,
        speedRunHighScore: state.speedRunHighScore,
        badges: state.badges,
        recentActivity: state.recentActivity,
        settings: state.settings,
        login,
        logout,
        addXP,
        addCoins,
        markLessonComplete,
        markProblemSolved,
        recordTestResult,
        recordBossDefeat,
        recordSurvivalResult,
        recordSpeedRunScore,
        updateSettings,
        unlockBadge,
        resetProgress
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
