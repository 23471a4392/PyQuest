import React from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { COMPETITIONS_DATA } from '../../data/arenaData';
import {
  Trophy,
  Zap,
  Swords,
  Skull,
  Flame,
  ArrowRight,
  Shield,
  Clock,
  Users,
  Award,
  Sparkles,
  Play
} from 'lucide-react';

interface ArenaDashboardProps {
  onNavigate: (route: string) => void;
}

export const ArenaDashboard: React.FC<ArenaDashboardProps> = ({ onNavigate }) => {
  const { arenaTier, survivalHighScore, speedRunHighScore, bossVictories } = usePlayer();

  const activeComps = COMPETITIONS_DATA.filter((c) => c.status === 'active');

  return (
    <div className="space-y-8 animate-in fade-in pb-16">
      {/* Top Cyber Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-rose-900/40 bg-gradient-to-br from-[#180d19] via-[#1c1223] to-[#0c0f1d] p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-rose-600/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 w-60 h-60 rounded-full bg-amber-500/10 blur-[90px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-800/80 text-xs font-semibold text-rose-300">
              <Trophy className="w-3.5 h-3.5 text-rose-400" />
              <span>Phase 2 — Competitive Coding Arena</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              The <span className="bg-gradient-to-r from-rose-400 via-orange-400 to-[#ffd43b] bg-clip-text text-transparent">PyQuest Colosseum</span>
            </h1>

            <p className="text-sm text-slate-400 max-w-xl">
              Test your algorithmic speed, outthink rival coders in code duels, slay legendary Python bosses, and survive the elimination gauntlet.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('/arena/speed-run')}
              className="px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-orange-500/20 hover:scale-105 transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Quick Speed Run</span>
            </button>

            <button
              onClick={() => onNavigate('/arena/leaderboards')}
              className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2"
            >
              <Trophy className="w-4 h-4 text-[#ffd43b]" />
              <span>Leaderboards</span>
            </button>
          </div>
        </div>

        {/* Player Colosseum HUD */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-800/80">
          <div className="p-3 rounded-2xl bg-black/40 border border-slate-800 text-xs">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Colosseum League</span>
            <span className="text-lg font-black text-amber-400 flex items-center gap-1.5 mt-0.5">
              <Shield className="w-4 h-4 text-amber-400" />
              {arenaTier} Tier
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-black/40 border border-slate-800 text-xs">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Speed Run Best</span>
            <span className="text-lg font-black text-white mt-0.5">
              {speedRunHighScore} Pts
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-black/40 border border-slate-800 text-xs">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Survival Best</span>
            <span className="text-lg font-black text-rose-400 mt-0.5">
              Level {survivalHighScore}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-black/40 border border-slate-800 text-xs">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Bosses Slain</span>
            <span className="text-lg font-black text-emerald-400 mt-0.5">
              {bossVictories.length} Bosses
            </span>
          </div>
        </div>
      </div>

      {/* 4 Arena Game Modes Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-black text-white">Choose Your Arena Gauntlet</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Speed Run */}
          <div
            onClick={() => onNavigate('/arena/speed-run')}
            className="p-6 rounded-3xl border border-amber-900/40 bg-gradient-to-b from-[#16120d] to-[#0d121f] hover:border-amber-500/60 transition-all cursor-pointer group shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 fill-current" />
              </div>
              <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors mb-1">
                ⚡ Speed Run
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Race the countdown clock! Quick syntax and output deduction with multiplier streaks.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-amber-400">
              <span>Play Sprint</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Code Battles */}
          <div
            onClick={() => onNavigate('/arena/battles')}
            className="p-6 rounded-3xl border border-blue-900/40 bg-gradient-to-b from-[#0d141e] to-[#0d121f] hover:border-blue-500/60 transition-all cursor-pointer group shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                <Swords className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white group-hover:text-blue-300 transition-colors mb-1">
                🧠 Code Battle
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Asynchronous duel with rival ghost coders. Scores compared on runtime, accuracy, and hints.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-blue-400">
              <span>Enter Duel</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Boss Battle */}
          <div
            onClick={() => onNavigate('/arena/boss')}
            className="p-6 rounded-3xl border border-emerald-900/40 bg-gradient-to-b from-[#0b1715] to-[#0d121f] hover:border-emerald-500/60 transition-all cursor-pointer group shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                <Skull className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white group-hover:text-emerald-300 transition-colors mb-1">
                🐉 Python Boss
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Raid Pyrax the Loop Dragon with coded attacks dealing -25 HP. Slay the beast for +500 XP!
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-emerald-400">
              <span>Fight Dragon</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Survival Gauntlet */}
          <div
            onClick={() => onNavigate('/arena/survival')}
            className="p-6 rounded-3xl border border-rose-900/40 bg-gradient-to-b from-[#180d14] to-[#0d121f] hover:border-rose-500/60 transition-all cursor-pointer group shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                <Flame className="w-6 h-6 fill-rose-500" />
              </div>
              <h3 className="text-lg font-black text-white group-hover:text-rose-300 transition-colors mb-1">
                🔥 Survival Mode
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Start with 3 Lives (❤️❤️❤️). Questions escalate in difficulty. How long can you survive?
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-rose-400">
              <span>Survive Gauntlet</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Tournaments */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-white">Active Arena Competitions</h2>
            <p className="text-xs text-slate-400">Participate in scheduled tournaments for massive XP and season ranking points.</p>
          </div>

          <button
            onClick={() => onNavigate('/arena/competitions')}
            className="text-xs font-bold text-[#ffd43b] hover:underline flex items-center gap-1"
          >
            <span>All Competitions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {activeComps.map((comp) => (
            <div
              key={comp.id}
              onClick={() => onNavigate(`/arena/competitions/${comp.id}`)}
              className="p-6 rounded-3xl border border-slate-800 bg-[#0d121f] hover:border-slate-700 transition-all cursor-pointer group shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                    LIVE NOW
                  </span>

                  <span className="text-xs font-mono text-amber-400 font-bold">
                    Prize: +{comp.prizeXP} XP • {comp.prizeCoins} 🪙
                  </span>
                </div>

                <h3 className="text-lg font-black text-white group-hover:text-[#ffd43b] transition-colors mb-1">
                  {comp.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {comp.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {comp.durationMinutes} mins
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    {comp.participantsCount} Coders
                  </span>
                </div>

                <span className="font-bold text-sky-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Join Match &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
