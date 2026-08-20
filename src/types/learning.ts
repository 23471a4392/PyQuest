export type WorldId = 'world-1' | 'world-2' | 'world-3' | 'world-4' | 'world-5' | 'world-6';

export type PracticeDifficulty = 'Easy' | 'Medium' | 'Hard';

export type LessonStepType = 'concept' | 'syntax' | 'example' | 'try_it' | 'practice' | 'quiz' | 'mastery';

export interface QuizQuestion {
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonStep {
  id: string;
  title: string;
  type: LessonStepType;
  content: string; // Markdown / explanatory text
  codeExample?: string;
  expectedOutput?: string;
  starterCode?: string;
  solutionHint?: string;
  quiz?: QuizQuestion;
}

export interface Lesson {
  id: string;
  topicId: string;
  worldId: WorldId;
  title: string;
  order: number;
  difficulty: PracticeDifficulty;
  estimatedMinutes: number;
  xpReward: number;
  coinsReward: number;
  steps: LessonStep[];
}

export interface Topic {
  id: string;
  worldId: WorldId;
  title: string;
  order: number;
  description: string;
  iconName: string;
  estimatedTime: string;
  lessons: Lesson[];
  practiceProblemIds: string[];
  testId: string;
  prerequisiteTopicId?: string;
}

export interface World {
  id: WorldId;
  number: number;
  title: string;
  subtitle: string;
  badge: string;
  color: string;
  description: string;
  topics: Topic[];
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  description?: string;
  isHidden?: boolean;
}

export interface PracticeProblem {
  id: string;
  title: string;
  topicId: string;
  worldId: WorldId;
  difficulty: PracticeDifficulty;
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints?: string[];
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  starterCode: string;
  testCases: TestCase[];
  hints: string[];
  xpReward: number;
  coinsReward: number;
  skillPoints: number;
}

export interface TestCaseResult {
  testCaseId: string;
  passed: boolean;
  input: string;
  expected: string;
  actual: string;
  description?: string;
  error?: string;
  isHidden?: boolean;
}

export interface EvaluationReport {
  status: 'passed' | 'failed' | 'error' | 'syntax_error';
  passedCount: number;
  totalCount: number;
  stdout: string;
  executionTimeMs: number;
  results: TestCaseResult[];
  errorTrace?: string;
}

export interface TestQuestion {
  id: string;
  text: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TopicTest {
  id: string;
  topicId: string;
  worldId: WorldId;
  title: string;
  description: string;
  durationMinutes: number;
  totalQuestions: number;
  passPercentage: number;
  questions: TestQuestion[];
  xpReward: number;
  coinsReward: number;
}

export interface TestSubmissionResult {
  testId: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  percentage: number;
  passed: boolean;
  xpEarned: number;
  coinsEarned: number;
  userAnswers: { [questionId: string]: number };
  completedAt: string;
}

export interface TopicMastery {
  topicId: string;
  topicTitle: string;
  worldId: WorldId;
  learningCompleted: boolean;
  practiceTotal: number;
  practiceSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  testScorePercentage: number;
  isMastered: boolean;
  competitionUnlocked: boolean;
  unlockedCompetitionId?: string;
}
