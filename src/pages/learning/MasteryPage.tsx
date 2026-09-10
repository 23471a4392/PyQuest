import React from 'react';
import { usePlayer } from '../../context/PlayerContext';
import {
  Award,
  CheckCircle2,
  Lock,
  Unlock,
  ArrowRight,
  Sparkles,
  BookOpen,
  Code2,
  Trophy,
  ShieldAlert
} from 'lucide-react';

interface MasteryPageProps {
  onNavigate: (route: string) => void;
}

interface TopicMasteryItem {
  id: string;
  name: string;
  worldNumber: number;
  learningCompleted: boolean;
  practiceStatus: {
    easyCount: number;
    easyTotal: number;
    medCount: number;
    medTotal: number;
    hardCount: number;
    hardTotal: number;
  };
  testScore: number;
  isMastered: boolean;
  competitionUnlockedName: string;
  competitionRoute: string;
}

export const MasteryPage: React.FC<MasteryPageProps> = ({ onNavigate }) => {
  const { topicMastery } = usePlayer();

  // Master criteria data
  const topicsList: TopicMasteryItem[] = [
    {
      id: 'topic-variables',
      name: 'Variables & Memory (World 1)',
      worldNumber: 1,
      learningCompleted: topicMastery['topic-variables']?.learningDone ?? true,
      practiceStatus: {
        easyCount: topicMastery['topic-variables']?.easySolved ?? 2,
        easyTotal: 2,
        medCount: topicMastery['topic-variables']?.mediumSolved ?? 1,
        medTotal: 1,
        hardCount: topicMastery['topic-variables']?.hardSolved ?? 0,
        hardTotal: 0
      },
      testScore: topicMastery['topic-variables']?.testScore ?? 100,
      isMastered: topicMastery['topic-variables']?.isMastered ?? true,
      competitionUnlockedName: '⚡ Lightning Syntax Sprint',
      competitionRoute: '/arena/speed-run'
    },
    {
      id: 'topic-conditions',
      name: 'Decision Making & Logic (World 2)',
      worldNumber: 2,
      learningCompleted: topicMastery['topic-conditions']?.learningDone ?? true,
      practiceStatus: {
        easyCount: topicMastery['topic-conditions']?.easySolved ?? 1,
        easyTotal: 2,
        medCount: topicMastery['topic-conditions']?.mediumSolved ?? 1,
        medTotal: 2,
        hardCount: topicMastery['topic-conditions']?.hardSolved ?? 0,
        hardTotal: 1
      },
      testScore: topicMastery['topic-conditions']?.testScore ?? 80,
      isMastered: topicMastery['topic-conditions']?.isMastered ?? true,
      competitionUnlockedName: '🧠 Speed Duel: Palindrome Checker',
      competitionRoute: '/arena/battles'
    },
    {
      id: 'topic-for-loops',
      name: 'Loops & Iteration (World 3)',
      worldNumber: 3,
      learningCompleted: topicMastery['topic-for-loops']?.learningDone ?? false,
      practiceStatus: {
        easyCount: topicMastery['topic-for-loops']?.easySolved ?? 1,
        easyTotal: 2,
        medCount: topicMastery['topic-for-loops']?.mediumSolved ?? 0,
        medTotal: 2,
        hardCount: topicMastery['topic-for-loops']?.hardSolved ?? 0,
        hardTotal: 1
      },
      testScore: topicMastery['topic-for-loops']?.testScore ?? 0,
      isMastered: topicMastery['topic-for-loops']?.isMastered ?? false,
      competitionUnlockedName: '🐉 Boss Battle: Pyrax the Loop Dragon',
      competitionRoute: '/arena/boss'
    },
    {
      id: 'topic-functions',
      name: 'Functions & Scope (World 4)',
      worldNumber: 4,
      learningCompleted: topicMastery['topic-functions']?.learningDone ?? false,
      practiceStatus: {
        easyCount: topicMastery['topic-functions']?.easySolved ?? 0,
        easyTotal: 3,
        medCount: topicMastery['topic-functions']?.mediumSolved ?? 0,
        medTotal: 2,
        hardCount: topicMastery['topic-functions']?.hardSolved ?? 0,
        hardTotal: 1
      },
      testScore: topicMastery['topic-functions']?.testScore ?? 0,
      isMastered: topicMastery['topic-functions']?.isMastered ?? false,
      competitionUnlockedName: '🏆 Weekly Python Championship',
      competitionRoute: '/arena/competitions'
    },
    {
      id: 'topic-lists-tuples',
      name: 'Collections & Slices (World 5)',
      worldNumber: 5,
      learningCompleted: topicMastery['topic-lists-tuples']?.learningDone ?? false,
      practiceStatus: {
        easyCount: topicMastery['topic-lists-tuples']?.easySolved ?? 0,
        easyTotal: 2,
        medCount: topicMastery['topic-lists-tuples']?.mediumSolved ?? 0,
        medTotal: 2,
        hardCount: topicMastery['topic-lists-tuples']?.hardSolved ?? 0,
        hardTotal: 2
      },
      testScore: topicMastery['topic-lists-tuples']?.testScore ?? 0,
      isMastered: topicMastery['topic-lists-tuples']?.isMastered ?? false,
      competitionUnlockedName: '🔥 Survival Mode: High Tier Gauntlet',
      competitionRoute: '/arena/survival'
    },
    {
      id: 'topic-oop',
      name: 'Advanced OOP & Classes (World 6)',
      worldNumber: 6,
      learningCompleted: topicMastery['topic-oop']?.learningDone ?? false,
      practiceStatus: {
        easyCount: topicMastery['topic-oop']?.easySolved ?? 0,
        easyTotal: 1,
        medCount: topicMastery['topic-oop']?.mediumSolved ?? 0,
        medTotal: 2,
        hardCount: topicMastery['topic-oop']?.hardSolved ?? 0,
        hardTotal: 2
      },
      testScore: topicMastery['topic-oop']?.testScore ?? 0,
      isMastered: topicMastery['topic-oop']?.isMastered ?? false,
      competitionUnlockedName: '👑 Grandmaster Python Masters Cup',
      competitionRoute: '/arena/competitions'
    }
  ];

  const masteredCount = topicsList.filter((t) => t.isMastered).length;

  return (
    <div className="space-y-8 animate-in fade-in pb-16">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
            <button onClick={() => onNavigate('/learning')} className="hover:text-white">
              Learning
            </button>
            <span>/</span>
            <span className="text-[#ffd43b]">Mastery Check</span>
          </div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            Python Mastery &amp; Unlock Matrix
          </h1>
          <p className="text-xs text-slate-400">
            Competitions are strictly locked until topic mastery is verified across Learning, Practice Drills, and Topic Tests.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900 border border-slate-800">
          <Award className="w-5 h-5 text-[#ffd43b]" />
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Topics Mastered</p>
            <p className="text-sm font-black text-white">
              {masteredCount} of {topicsList.length} Complete
            </p>
          </div>
        </div>
      </div>

      {/* Progression Flow Explainer */}
      <div className="p-6 rounded-3xl border border-slate-800 bg-[#0d121f] shadow-xl">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
          🎓 Standard 4-Tier Mastery Rule
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono text-center">
          <div className="p-3.5 rounded-2xl bg-[#090d16] border border-slate-800/80">
            <BookOpen className="w-4 h-4 text-sky-400 mx-auto mb-1.5" />
            <span className="text-slate-200 font-bold block">1. Guided Lessons</span>
            <span className="text-slate-400 text-[11px]">All steps read &amp; tried</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#090d16] border border-slate-800/80">
            <Code2 className="w-4 h-4 text-[#ffd43b] mx-auto mb-1.5" />
            <span className="text-slate-200 font-bold block">2. Practice Lab</span>
            <span className="text-slate-400 text-[11px]">Easy &amp; Medium solved</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#090d16] border border-slate-800/80">
            <Award className="w-4 h-4 text-emerald-400 mx-auto mb-1.5" />
            <span className="text-slate-200 font-bold block">3. Mastery Test</span>
            <span className="text-slate-400 text-[11px]">Score &ge; 80%</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#090d16] border border-slate-800/80">
            <Trophy className="w-4 h-4 text-rose-400 mx-auto mb-1.5" />
            <span className="text-slate-200 font-bold block">4. Arena Unlocked</span>
            <span className="text-slate-400 text-[11px]">Competition access</span>
          </div>
        </div>
      </div>

      {/* Mastery Grid */}
      <div className="space-y-4">
        {topicsList.map((topic) => (
          <div
            key={topic.id}
            className={`p-6 rounded-3xl border transition-all shadow-xl ${
              topic.isMastered
                ? 'border-emerald-900/60 bg-[#0c161d]'
                : 'border-slate-800 bg-[#0d121f]'
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Left Details */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                      topic.isMastered
                        ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {topic.isMastered ? '🟢 MASTERED' : '🟡 IN PROGRESS'}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    World {topic.worldNumber}
                  </span>
                </div>

                <h3 className="text-lg font-black text-white">{topic.name}</h3>

                {/* Criteria Checklist */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono pt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400">Learning:</span>
                    {topic.learningCompleted ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Done
                      </span>
                    ) : (
                      <span className="text-amber-400">Incomplete</span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400">Practice:</span>
                    <span className="text-slate-200">
                      Easy {topic.practiceStatus.easyCount}/{topic.practiceStatus.easyTotal} • Med {topic.practiceStatus.medCount}/{topic.practiceStatus.medTotal}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400">Mastery Test:</span>
                    <span
                      className={`font-bold ${
                        topic.testScore >= 80 ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      {topic.testScore}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Unlock Card */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs min-w-[240px]">
                  <div className="flex items-center gap-2 mb-1">
                    {topic.isMastered ? (
                      <Unlock className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Lock className="w-4 h-4 text-slate-400" />
                    )}
                    <span className="text-slate-400 font-bold uppercase text-[10px]">
                      {topic.isMastered ? 'Arena Competition Unlocked' : 'Prerequisite for:'}
                    </span>
                  </div>
                  <p className="font-bold text-white text-xs truncate">
                    {topic.competitionUnlockedName}
                  </p>
                </div>

                {topic.isMastered ? (
                  <button
                    onClick={() => onNavigate(topic.competitionRoute)}
                    className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <span>Enter Arena</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigate('/learning/tests')}
                    className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <span>Take Test</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
