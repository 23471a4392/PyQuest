import { World, Lesson, PracticeProblem, TopicTest, EvaluationReport } from '../types/learning';
import { Competition, Boss, LeaderboardCategory, LeaderboardEntry } from '../types/arena';
import { PlayerProfile, Badge, SkillProgress } from '../types/player';
import { WORLDS_DATA } from '../data/curriculumData';
import { PRACTICE_PROBLEMS_DATA } from '../data/practiceProblems';
import { TOPIC_TESTS_DATA } from '../data/topicTests';
import { ARENA_BOSSES_DATA, COMPETITIONS_DATA } from '../data/arenaData';
import { LEADERBOARDS_DATABASE } from '../data/leaderboardData';
import { BADGES_DATA } from '../data/badgesData';
import { evaluatePythonCode } from './codeEvaluator';

/**
 * Service Abstraction Layer for PYQUEST.
 * Clean, separated async methods ready for backend integration by Member 3 & Member 4.
 */
class PyQuestApiService {
  private simulateDelay<T>(data: T, delayMs: number = 180): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(data), delayMs));
  }

  // --- LEARNING SERVICES ---
  async getWorlds(): Promise<World[]> {
    return this.simulateDelay(WORLDS_DATA);
  }

  async getLessonById(lessonId: string): Promise<Lesson | null> {
    for (const world of WORLDS_DATA) {
      for (const topic of world.topics) {
        const found = topic.lessons.find((l) => l.id === lessonId);
        if (found) return this.simulateDelay(found);
      }
    }
    return this.simulateDelay(null);
  }

  async getPracticeProblems(filter?: { difficulty?: string; topicId?: string; search?: string }): Promise<PracticeProblem[]> {
    let list = [...PRACTICE_PROBLEMS_DATA];
    if (filter?.difficulty && filter.difficulty !== 'All') {
      list = list.filter((p) => p.difficulty === filter.difficulty);
    }
    if (filter?.topicId) {
      list = list.filter((p) => p.topicId === filter.topicId);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    return this.simulateDelay(list);
  }

  async getPracticeProblemById(id: string): Promise<PracticeProblem | null> {
    const found = PRACTICE_PROBLEMS_DATA.find((p) => p.id === id) || null;
    return this.simulateDelay(found);
  }

  async evaluateSubmission(problemId: string, code: string): Promise<EvaluationReport> {
    const problem = PRACTICE_PROBLEMS_DATA.find((p) => p.id === problemId);
    if (!problem) {
      throw new Error(`Problem ${problemId} not found`);
    }
    return evaluatePythonCode(problem, code);
  }

  async getTopicTests(): Promise<TopicTest[]> {
    return this.simulateDelay(TOPIC_TESTS_DATA);
  }

  async getTestById(testId: string): Promise<TopicTest | null> {
    const found = TOPIC_TESTS_DATA.find((t) => t.id === testId) || null;
    return this.simulateDelay(found);
  }

  // --- ARENA SERVICES ---
  async getCompetitions(filter?: { status?: string; difficulty?: string }): Promise<Competition[]> {
    let list = [...COMPETITIONS_DATA];
    if (filter?.status && filter.status !== 'all') {
      list = list.filter((c) => c.status === filter.status);
    }
    if (filter?.difficulty && filter.difficulty !== 'all') {
      list = list.filter((c) => c.difficulty === filter.difficulty);
    }
    return this.simulateDelay(list);
  }

  async getCompetitionById(id: string): Promise<Competition | null> {
    const found = COMPETITIONS_DATA.find((c) => c.id === id) || null;
    return this.simulateDelay(found);
  }

  async getBosses(): Promise<Boss[]> {
    return this.simulateDelay(ARENA_BOSSES_DATA);
  }

  async getBossById(id: string): Promise<Boss | null> {
    const found = ARENA_BOSSES_DATA.find((b) => b.id === id) || null;
    return this.simulateDelay(found);
  }

  async getLeaderboard(category: LeaderboardCategory = 'weekly', search?: string): Promise<LeaderboardEntry[]> {
    let list = LEADERBOARDS_DATABASE[category] || LEADERBOARDS_DATABASE.weekly;
    if (search && search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((entry) => entry.username.toLowerCase().includes(q));
    }
    return this.simulateDelay(list);
  }

  // --- PROFILE SERVICES ---
  async getPlayerProfile(): Promise<Partial<PlayerProfile>> {
    const profile: Partial<PlayerProfile> = {
      id: 'usr-novice-001',
      username: 'Novice Gladiator',
      handle: '@gladiator',
      bio: 'Newly enrolled Python gladiator in the Crucible. Ready to conquer World 1.',
      avatarUrl: '🧑‍💻',
      level: 1,
      xp: 0,
      xpForCurrentLevel: 0,
      xpToNextLevel: 500,
      coins: 50,
      globalRank: 128,
      arenaTier: 'Basic',
      joinedDate: 'Active Season 1',
      streakDays: 1,
      lessonsCompleted: 0,
      problemsSolved: 0,
      testsCompleted: 0,
      arenaCompetitionsWon: 0,
      arenaCompetitionsPlayed: 0,
      bossesDefeated: 0,
      highestSurvivalScore: 0,
      speedRunBestScore: 0,
      badges: BADGES_DATA
    };
    return this.simulateDelay(profile);
  }

  async getPlayerAchievements(): Promise<Badge[]> {
    return this.simulateDelay(BADGES_DATA);
  }

  async getPlayerSkillProgress(): Promise<SkillProgress[]> {
    const skills: SkillProgress[] = [
      { topicId: 'topic-variables', topicName: 'Variables & Types', worldNumber: 1, percentage: 100, masteryStatus: 'Master', problemsSolved: 5, totalProblems: 5, lessonsDone: 2, totalLessons: 2 },
      { topicId: 'topic-conditions', topicName: 'Decision Making', worldNumber: 2, percentage: 95, masteryStatus: 'Master', problemsSolved: 4, totalProblems: 5, lessonsDone: 2, totalLessons: 2 },
      { topicId: 'topic-loops', topicName: 'Loops & Iteration', worldNumber: 3, percentage: 88, masteryStatus: 'Proficient', problemsSolved: 4, totalProblems: 5, lessonsDone: 2, totalLessons: 2 },
      { topicId: 'topic-functions', topicName: 'Functions & Scope', worldNumber: 4, percentage: 82, masteryStatus: 'Proficient', problemsSolved: 3, totalProblems: 5, lessonsDone: 1, totalLessons: 1 },
      { topicId: 'topic-collections', topicName: 'Collections & Slices', worldNumber: 5, percentage: 65, masteryStatus: 'Apprentice', problemsSolved: 2, totalProblems: 5, lessonsDone: 1, totalLessons: 2 },
      { topicId: 'topic-oop', topicName: 'Advanced Python (OOP)', worldNumber: 6, percentage: 35, masteryStatus: 'Novice', problemsSolved: 1, totalProblems: 5, lessonsDone: 1, totalLessons: 2 }
    ];
    return this.simulateDelay(skills);
  }
}

export const apiService = new PyQuestApiService();
