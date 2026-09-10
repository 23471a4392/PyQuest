import React, { useState } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { Badge } from '../../types/player';
import { BadgeModal } from '../../components/common/BadgeModal';
import {
  User,
  Shield,
  Award,
  Sparkles,
  Flame,
  Coins,
  Trophy,
  BookOpen,
  Code2,
  CheckCircle2,
  Calendar,
  Settings,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface PlayerProfilePageProps {
  onNavigate: (route: string) => void;
}

export const PlayerProfilePage: React.FC<PlayerProfilePageProps> = ({ onNavigate }) => {
  const {
    username,
    handle,
    avatar,
    bio,
    level,
    xp,
    xpToNextLevel,
    xpForCurrentLevel,
    levelProgressPercent,
    coins,
    globalRank,
    arenaTier,
    streakDays,
    completedLessons,
    solvedProblems,
    testScores,
    topicMastery,
    bossVictories,
    survivalHighScore,
    badges,
    recentActivity
  } = usePlayer();

  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  // Dynamic skills mastery computation from PlayerContext
  const getTopicMetrics = (topicId: string) => {
    const tm = topicMastery[topicId];
    if (!tm) return { percentage: 0, status: 'Uninitiated' };
    let score = 0;
    if (tm.learningDone) score += 30;
    const totalSolved = (tm.easySolved || 0) + (tm.mediumSolved || 0) + (tm.hardSolved || 0);
    score += Math.min(40, totalSolved * 15);
    if (tm.testScore > 0) score += Math.min(30, Math.round(tm.testScore * 0.3));
    if (tm.isMastered) score = 100;

    let status = 'Novice';
    if (score >= 90) status = 'Master';
    else if (score >= 70) status = 'Proficient';
    else if (score >= 40) status = 'Apprentice';
    else if (score === 0) status = 'Uninitiated';

    return { percentage: Math.min(100, score), status };
  };

  const topicConfigs = [
    { id: 'topic-variables', name: 'Variables & Data Types', route: '/learning/lessons/lesson-var-intro' },
    { id: 'topic-conditions', name: 'Decision Making & Logic', route: '/learning/lessons/lesson-if-elif-else' },
    { id: 'topic-for-loops', name: 'Loops & Iteration', route: '/learning/lessons/lesson-range-loop' },
    { id: 'topic-functions', name: 'Functions & Scope', route: '/learning/lessons/lesson-func-def' },
    { id: 'topic-lists-tuples', name: 'Collections (Lists & Dicts)', route: '/learning/lessons/lesson-list-comprehension' },
    { id: 'topic-oop', name: 'Advanced Python (OOP)', route: '/learning/lessons/lesson-oop-classes' }
  ];

  const skillTopics = topicConfigs.map((cfg) => {
    const metrics = getTopicMetrics(cfg.id);
    return {
      name: cfg.name,
      percentage: metrics.percentage,
      status: metrics.status,
      route: cfg.route
    };
  });

  const earnedBadges = badges.filter((b) => b.isUnlocked);
  const lockedBadges = badges.filter((b) => !b.isUnlocked);

  return (
    <div className="space-y-8 animate-in fade-in pb-16">
      {/* 1. Profile Header Card */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-[#0d121f] p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#306998]/20 via-[#4b8bbe]/10 to-[#ffd43b]/10 blur-[120px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#306998] via-[#4b8bbe] to-[#ffd43b] p-1 shadow-xl shrink-0">
              <div className="w-full h-full bg-[#0b0f19] rounded-[22px] flex items-center justify-center text-4xl">
                {avatar}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white">{username}</h1>
                <span className="text-xs text-slate-400 font-mono">{handle}</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  {arenaTier} Tier
                </span>
              </div>
              <p className="text-xs text-slate-300 max-w-lg leading-relaxed">{bio}</p>
              <div className="flex items-center gap-3 pt-1 text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  Active Season 1
                </span>
                <span>•</span>
                <span className="text-emerald-400 font-bold">Colosseum Rank #{globalRank}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('/profile/settings')}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-2 self-start md:self-auto"
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Level Progression Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-white flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[#ffd43b]">Level {level}</span>
              <span className="text-slate-400">Progression</span>
            </span>
            <span className="text-slate-300">
              {xp.toLocaleString()} / {xpToNextLevel.toLocaleString()} XP ({levelProgressPercent}%)
            </span>
          </div>

          <div className="w-full h-2.5 bg-slate-900 rounded-full border border-slate-800 p-0.5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#4b8bbe] via-[#ffd43b] to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${levelProgressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. Player Career Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="p-4 rounded-2xl bg-[#0d121f] border border-slate-800 text-center font-mono">
          <BookOpen className="w-4 h-4 text-sky-400 mx-auto mb-1.5" />
          <span className="text-slate-400 text-[10px] block">LESSONS</span>
          <span className="text-lg font-black text-white">{completedLessons.length}</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0d121f] border border-slate-800 text-center font-mono">
          <Code2 className="w-4 h-4 text-[#ffd43b] mx-auto mb-1.5" />
          <span className="text-slate-400 text-[10px] block">PROBLEMS</span>
          <span className="text-lg font-black text-white">{solvedProblems.length}</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0d121f] border border-slate-800 text-center font-mono">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto mb-1.5" />
          <span className="text-slate-400 text-[10px] block">TESTS</span>
          <span className="text-lg font-black text-white">{Object.keys(testScores).length}</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0d121f] border border-slate-800 text-center font-mono">
          <Trophy className="w-4 h-4 text-amber-400 mx-auto mb-1.5" />
          <span className="text-slate-400 text-[10px] block">ARENA WINS</span>
          <span className="text-lg font-black text-amber-400">
            {survivalHighScore > 0 ? survivalHighScore : 0}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0d121f] border border-slate-800 text-center font-mono">
          <Award className="w-4 h-4 text-purple-400 mx-auto mb-1.5" />
          <span className="text-slate-400 text-[10px] block">BOSS KILLS</span>
          <span className="text-lg font-black text-purple-300">{bossVictories.length}</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0d121f] border border-slate-800 text-center font-mono">
          <Flame className="w-4 h-4 text-orange-400 mx-auto mb-1.5" />
          <span className="text-slate-400 text-[10px] block">STREAK</span>
          <span className="text-lg font-black text-orange-400">{streakDays}d</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0d121f] border border-slate-800 text-center font-mono">
          <Coins className="w-4 h-4 text-amber-300 mx-auto mb-1.5" />
          <span className="text-slate-400 text-[10px] block">COINS</span>
          <span className="text-lg font-black text-amber-300">{coins.toLocaleString()}</span>
        </div>
      </div>

      {/* 3. Skill Mastery Progression & Topic Bars */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-[#0d121f] shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-white">Python Topic Mastery Radar</h2>
            <p className="text-xs text-slate-400">Current skill levels across the 6 developmental areas.</p>
          </div>
          <button
            onClick={() => onNavigate('/learning/mastery')}
            className="text-xs font-bold text-[#ffd43b] hover:underline flex items-center gap-1"
          >
            <span>Mastery Matrix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {skillTopics.map((topic) => (
            <div
              key={topic.name}
              onClick={() => onNavigate(topic.route)}
              className="p-4 rounded-2xl bg-[#090d16] border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white group-hover:text-[#ffd43b] transition-colors">
                  {topic.name}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {topic.percentage}% • {topic.status}
                </span>
              </div>

              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#306998] to-[#ffd43b] transition-all duration-500"
                  style={{ width: `${topic.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Badges & Achievements Gallery */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-white">Achievements &amp; Badges</h2>
            <p className="text-xs text-slate-400">Click any badge to inspect criteria, rarity, and unlock timestamps.</p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {earnedBadges.length} / {badges.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {badges.map((badge) => (
            <div
              key={badge.id}
              onClick={() => setSelectedBadge(badge)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer text-center group flex flex-col items-center justify-between ${
                badge.isUnlocked
                  ? 'bg-[#0d1424] border-slate-800 hover:border-amber-400/50 shadow-md'
                  : 'bg-slate-950/40 border-slate-800/40 opacity-50 hover:opacity-75'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform">
                {badge.icon}
              </div>

              <span className="text-xs font-bold text-white line-clamp-1 group-hover:text-[#ffd43b] transition-colors">
                {badge.title}
              </span>

              <span className="text-[9px] font-mono text-slate-400 mt-1 uppercase">
                {badge.rarity}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Recent Activity Feed */}
      <div className="p-6 rounded-3xl border border-slate-800 bg-[#0d121f] shadow-xl space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          Recent Gladiator Activity Log
        </h3>
        <div className="divide-y divide-slate-800/80">
          {recentActivity.slice(0, 5).map((act) => (
            <div key={act.id} className="py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-3.5 h-3.5 text-[#ffd43b]" />
                <span className="text-slate-200 font-medium">{act.title}</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-slate-400 text-[11px]">
                <span className="text-emerald-400 font-bold">+{act.xpEarned} XP</span>
                <span>{act.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badge Details Modal */}
      <BadgeModal badge={selectedBadge} onClose={() => setSelectedBadge(null)} />
    </div>
  );
};
