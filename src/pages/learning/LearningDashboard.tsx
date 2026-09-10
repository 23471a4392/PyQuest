import React from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { WORLDS_DATA, getNextUncompletedLesson, getAllLessonsInOrder } from '../../data/curriculumData';
import { PRACTICE_PROBLEMS_DATA } from '../../data/practiceProblems';
import {
  BookOpen,
  ArrowRight,
  Flame,
  Award,
  Sparkles,
  CheckCircle2,
  Lock,
  Compass,
  Code2,
  Play
} from 'lucide-react';

interface LearningDashboardProps {
  onNavigate: (route: string) => void;
}

export const LearningDashboard: React.FC<LearningDashboardProps> = ({ onNavigate }) => {
  const {
    username,
    archetype,
    level,
    xp,
    xpToNextLevel,
    levelProgressPercent,
    streakDays,
    completedLessons,
    solvedProblems,
    topicMastery
  } = usePlayer();

  // Calculate overall learning metrics
  const totalLessons = WORLDS_DATA.reduce(
    (acc, w) => acc + w.topics.reduce((tAcc, t) => tAcc + t.lessons.length, 0),
    0
  );
  const lessonsCompletedCount = completedLessons.length;
  const overallPercentage = Math.round((lessonsCompletedCount / (totalLessons || 1)) * 100);

  // Recommended Practice: pick problems not yet solved
  const unsolvedPractice = PRACTICE_PROBLEMS_DATA.filter(
    (p) => !solvedProblems.includes(p.id)
  ).slice(0, 3);

  // Determine next uncompleted lesson and topic dynamically
  const allLessons = getAllLessonsInOrder();
  const nextLessonItem = getNextUncompletedLesson(completedLessons);
  const nextLesson = nextLessonItem ? nextLessonItem.lesson : allLessons[0]?.lesson;
  const nextTopic = nextLessonItem ? nextLessonItem.topic : allLessons[0]?.topic;
  const nextWorld = nextLessonItem ? nextLessonItem.world : allLessons[0]?.world;
  const isAllCurriculumCompleted = lessonsCompletedCount >= totalLessons;

  const isLevel1 = level === 1;

  return (
    <div className="space-y-8 animate-in fade-in pb-12">
      {/* A. Welcome Banner & Overview */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-[#0e1726] via-[#111c30] to-[#0d1322] p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-[#306998]/20 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-60 h-60 rounded-full bg-[#ffd43b]/10 blur-[90px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-semibold text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-[#ffd43b]" />
              <span>
                {isLevel1 ? 'Crucible Initiate • Level 1 Active' : `Crucible Veteran • Level ${level}`}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              {isLevel1 ? 'Welcome to the Crucible,' : 'Welcome back,'}{' '}
              <span className="bg-gradient-to-r from-white via-slate-100 to-[#ffd43b] bg-clip-text text-transparent">
                {username}
              </span>!
            </h1>
            <p className="text-sm text-slate-400 max-w-xl">
              {isLevel1
                ? `Level 1 ${archetype} • Your trial begins in World 1: Python Foundations. Forge your syntax and earn your first XP.`
                : `Level ${level} ${archetype} • Keep your ${streakDays}-day streak burning and forge higher mastery in the Crucible.`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate(isAllCurriculumCompleted ? '/learning/mastery' : `/learning/lessons/${nextLesson.id}`)}
              className="px-5 py-3 bg-gradient-to-r from-[#306998] to-[#4b8bbe] hover:from-[#23537e] hover:to-[#306998] text-white font-extrabold text-xs rounded-xl shadow-lg shadow-pyblue-500/20 hover:scale-105 transition-all flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isAllCurriculumCompleted ? 'Curriculum Mastered' : (lessonsCompletedCount > 0 ? `Continue: ${nextLesson.title}` : 'Continue Lesson')}</span>
            </button>
            <button
              onClick={() => onNavigate('/learning/mastery')}
              className="px-4 py-3 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-[#ffd43b]" />
              <span>Mastery Progress</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-800/80">
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Compass className="w-3.5 h-3.5 text-sky-400" />
              <span>Current Level</span>
            </div>
            <p className="text-xl font-black text-white">Level {level}</p>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-sky-400 to-[#ffd43b] h-full"
                style={{ width: `${levelProgressPercent}%` }}
              />
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#ffd43b]" />
              <span>Total Experience</span>
            </div>
            <p className="text-xl font-black text-[#ffd43b]">{xp.toLocaleString()} XP</p>
            <p className="text-[10px] text-slate-400 mt-1">{xpToNextLevel - xp} XP to Next Lvl</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>Active Streak</span>
            </div>
            <p className="text-xl font-black text-orange-400">{streakDays} Days</p>
            <p className="text-[10px] text-slate-400 mt-1">Multiplier Active (1.5x)</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Lessons Done</span>
            </div>
            <p className="text-xl font-black text-emerald-400">
              {lessonsCompletedCount} / {totalLessons}
            </p>
            <p className="text-[10px] text-slate-400 mt-1">{overallPercentage}% Complete</p>
          </div>
        </div>
      </div>

      {/* B. Continue Learning Hero Card */}
      <div className="p-6 rounded-3xl border border-slate-800 bg-[#0d121f] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#306998] to-[#4b8bbe] flex items-center justify-center text-2xl shadow-lg shrink-0">
            {isAllCurriculumCompleted ? '🏆' : (nextWorld.badge.split(' ')[0] || '🟢')}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {isAllCurriculumCompleted
                  ? 'All 6 Worlds Completed • Master Rank'
                  : `${nextWorld.title} • ${nextTopic.title}`}
              </span>
              {!isAllCurriculumCompleted && (
                <span className="text-xs text-slate-400 font-mono">
                  {nextLesson.estimatedMinutes} mins est.
                </span>
              )}
            </div>
            <h3 className="text-lg font-black text-white">
              {isAllCurriculumCompleted ? 'All Curriculum Lessons Mastered!' : nextLesson.title}
            </h3>
            <p className="text-xs text-slate-400">
              {isAllCurriculumCompleted
                ? 'Outstanding gladiator! You have conquered all 13 core curriculum lessons. Sharpen your skills in the Practice Lab or Colosseum Arena.'
                : lessonsCompletedCount > 0
                ? `Next Up: ${nextTopic.description}`
                : 'Pick up right where you left off: learn dynamic assignment, snake_case syntax, and memory binding.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate(isAllCurriculumCompleted ? '/learning/practice' : `/learning/lessons/${nextLesson.id}`)}
          className="w-full md:w-auto px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
        >
          <span>{isAllCurriculumCompleted ? 'Go to Practice Lab' : (lessonsCompletedCount > 0 ? 'Start Next Lesson' : 'Resume Step')}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* C. The 6 Python Learning Worlds */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-white">Python Learning Worlds</h2>
            <p className="text-xs text-slate-400">Systematic guided progression through 6 core developmental phases.</p>
          </div>
          <span className="text-xs font-mono text-slate-400">Phase 1: Learn</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {WORLDS_DATA.map((world, idx) => {
            // Check completion within this world
            const worldLessons = world.topics.flatMap((t) => t.lessons);
            const doneInWorld = worldLessons.filter((l) => completedLessons.includes(l.id)).length;
            const worldPct = worldLessons.length > 0 ? Math.round((doneInWorld / worldLessons.length) * 100) : 0;
            const requiredLevel = idx * 3;
            const isUnlocked = idx === 0 || level >= requiredLevel || worldPct > 0;

            return (
              <div
                key={world.id}
                className={`relative p-5 rounded-2xl border transition-all ${
                  isUnlocked
                    ? 'border-slate-800 bg-[#0d121f] hover:border-slate-700 shadow-md'
                    : 'border-slate-800/40 bg-slate-950/40 opacity-75'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {world.badge}
                  </span>
                  {isUnlocked ? (
                    <span className="text-xs font-mono text-emerald-400 font-bold">
                      {worldPct}% Done
                    </span>
                  ) : (
                    <div className="flex items-center gap-1 text-[11px] text-amber-400/80 font-mono">
                      <Lock className="w-3 h-3" />
                      <span>Lvl {requiredLevel}+</span>
                    </div>
                  )}
                </div>

                <h3 className="text-base font-black text-white mb-0.5">{world.title}</h3>
                <p className="text-xs font-semibold text-slate-400 mb-2">{world.subtitle}</p>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                  {world.description}
                </p>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full bg-gradient-to-r from-[#306998] to-[#ffd43b]"
                    style={{ width: `${worldPct}%` }}
                  />
                </div>

                {/* World Topics Pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {world.topics.map((top) => {
                    const topicRecord = topicMastery[top.id];
                    const isTopicMastered = topicRecord?.isMastered;

                    return (
                      <span
                        key={top.id}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                          isTopicMastered
                            ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/50'
                            : 'bg-slate-900 text-slate-400 border-slate-800'
                        }`}
                      >
                        {isTopicMastered ? '✓ ' : ''}{top.title.split(' ')[0]}
                      </span>
                    );
                  })}
                </div>

                <button
                  disabled={!isUnlocked}
                  onClick={() => {
                    if (!isUnlocked) return;
                    const worldLessons = world.topics.flatMap((t) => t.lessons);
                    const nextInWorld = worldLessons.find((l) => !completedLessons.includes(l.id)) || worldLessons[0];
                    onNavigate(`/learning/lessons/${nextInWorld?.id || 'lesson-var-intro'}`);
                  }}
                  className={`w-full py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                    isUnlocked
                      ? 'bg-slate-800 hover:bg-slate-700 text-white cursor-pointer hover:scale-[1.01]'
                      : 'bg-slate-900/50 text-slate-500 cursor-not-allowed border border-slate-800/60'
                  }`}
                >
                  {isUnlocked ? (
                    <>
                      <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                      <span>Explore World Lessons</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 text-slate-500" />
                      <span>Unlocks at Level {requiredLevel}</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* D. Recommended Practice Lab Problems */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-white">Recommended Practice Drills</h2>
            <p className="text-xs text-slate-400">Sharpen your code by tackling curated test case problems in the sandbox.</p>
          </div>
          <button
            onClick={() => onNavigate('/learning/practice')}
            className="text-xs font-bold text-[#ffd43b] hover:underline flex items-center gap-1"
          >
            <span>All Problems ({PRACTICE_PROBLEMS_DATA.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {unsolvedPractice.map((problem) => (
            <div
              key={problem.id}
              onClick={() => onNavigate(`/learning/practice/${problem.id}`)}
              className="p-5 rounded-2xl border border-slate-800 bg-[#0d121f] hover:border-slate-700 transition-all cursor-pointer group shadow-md"
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                    problem.difficulty === 'Easy'
                      ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/50'
                      : problem.difficulty === 'Medium'
                      ? 'bg-amber-950/40 text-amber-300 border-amber-800/50'
                      : 'bg-rose-950/40 text-rose-300 border-rose-800/50'
                  }`}
                >
                  {problem.difficulty}
                </span>

                <span className="text-[11px] font-mono text-[#ffd43b] font-bold">
                  +{problem.xpReward} XP
                </span>
              </div>

              <h3 className="text-sm font-black text-white group-hover:text-[#ffd43b] transition-colors mb-1">
                {problem.title}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                {problem.description}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs text-slate-400">
                <div className="flex items-center gap-1 font-mono text-[11px]">
                  <Code2 className="w-3.5 h-3.5 text-sky-400" />
                  <span>{problem.testCases.length} Test Cases</span>
                </div>
                <span className="text-emerald-400 font-bold group-hover:translate-x-1 transition-transform">
                  Solve &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
