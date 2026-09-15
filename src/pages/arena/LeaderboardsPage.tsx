import React, { useState, useEffect } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { LeaderboardCategory, LeaderboardEntry } from '../../types/arena';
import { apiService } from '../../services/api';
import { EmptyState } from '../../components/common/EmptyState';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import {
  Trophy,
  Search,
  Users,
  Calendar,
  Globe,
  Sparkles,
  Flame,
  Shield,
  Zap,
  Code2
} from 'lucide-react';

interface LeaderboardsPageProps {
  onNavigate: (route: string) => void;
}

export const LeaderboardsPage: React.FC<LeaderboardsPageProps> = ({ onNavigate }) => {
  const { username } = usePlayer();

  const [activeCategory, setActiveCategory] = useState<LeaderboardCategory>('weekly');
  const [searchQuery, setSearchQuery] = useState('');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    apiService.getLeaderboard(activeCategory, searchQuery).then((data) => {
      if (isMounted) {
        setEntries(data);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [activeCategory, searchQuery]);

  const categories = [
    { id: 'weekly', label: 'Weekly Championship', icon: Trophy },
    { id: 'global', label: 'Global Hall of Fame', icon: Globe },
    { id: 'daily', label: 'Daily Speed Ranks', icon: Zap },
    { id: 'friends', label: 'Friends & Guilds', icon: Users },
    { id: 'algorithms', label: 'By Skill / Algorithms', icon: Code2 }
  ] as const;

  return (
    <div className="space-y-8 animate-in fade-in pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
            <button onClick={() => onNavigate('/arena')} className="hover:text-white">
              Arena
            </button>
            <span>/</span>
            <span className="text-amber-400">Leaderboards</span>
          </div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            🏆 Colosseum Leaderboards
          </h1>
          <p className="text-xs text-slate-400">
            Official rankings across the global Python gladiator arena. Filter by weekly tournament, daily drills, or algorithms.
          </p>
        </div>
      </div>

      {/* Category Tabs & Search */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/80 rounded-2xl border border-slate-800">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-orange-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search gladiator..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Leaderboard Table / Cards */}
      {isLoading ? (
        <LoadingSkeleton count={6} className="h-16" />
      ) : entries.length === 0 ? (
        <EmptyState
          title="No Gladiators Found"
          description={`No players matching "${searchQuery}" in this leaderboard category.`}
          actionLabel="Clear Search"
          onAction={() => setSearchQuery('')}
        />
      ) : (
        <div className="rounded-3xl border border-slate-800 bg-[#0d121f] overflow-hidden shadow-2xl">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-3 px-6 py-3.5 bg-[#090d16] border-b border-slate-800 text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
            <div className="col-span-2 sm:col-span-1">Rank</div>
            <div className="col-span-6 sm:col-span-5">Player</div>
            <div className="hidden sm:block sm:col-span-2 text-center">Tier</div>
            <div className="hidden sm:block sm:col-span-2 text-center">Challenges</div>
            <div className="col-span-4 sm:col-span-2 text-right">Score</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-slate-800/80">
            {entries.map((entry) => {
              const isMe = entry.username.toLowerCase() === username.toLowerCase() || entry.isCurrentPlayer;

              return (
                <div
                  key={entry.userId}
                  className={`grid grid-cols-12 gap-3 px-6 py-4 items-center transition-colors ${
                    isMe
                      ? 'bg-gradient-to-r from-amber-500/10 via-[#ffd43b]/5 to-transparent border-l-4 border-l-[#ffd43b]'
                      : 'hover:bg-slate-900/40'
                  }`}
                >
                  {/* Rank */}
                  <div className="col-span-2 sm:col-span-1 font-mono font-bold text-sm">
                    {entry.rank === 1 ? (
                      <span className="text-xl">🥇</span>
                    ) : entry.rank === 2 ? (
                      <span className="text-xl">🥈</span>
                    ) : entry.rank === 3 ? (
                      <span className="text-xl">🥉</span>
                    ) : (
                      <span className="text-slate-400 text-xs pl-1">#{entry.rank}</span>
                    )}
                  </div>

                  {/* Player Name & Avatar */}
                  <div className="col-span-6 sm:col-span-5 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-lg shadow">
                      {entry.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-black text-white">
                          {entry.username}
                        </span>
                        {isMe && (
                          <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono">
                            YOU
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-slate-400">
                        <Flame className="w-3 h-3 text-orange-400 fill-orange-400" />
                        <span>{entry.streakDays}d streak</span>
                        <span className="hidden sm:inline">•</span>
                        <div className="hidden sm:flex items-center gap-0.5">
                          {entry.badgeIcons.map((b, bIdx) => (
                            <span key={bIdx}>{b}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tier */}
                  <div className="hidden sm:flex sm:col-span-2 justify-center">
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                        entry.tier === 'Python Master'
                          ? 'bg-purple-950/60 text-purple-300 border-purple-800/60'
                          : entry.tier === 'Gold'
                          ? 'bg-amber-950/60 text-amber-300 border-amber-800/60'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {entry.tier}
                    </span>
                  </div>

                  {/* Completed */}
                  <div className="hidden sm:block sm:col-span-2 text-center text-xs font-mono text-slate-300">
                    {entry.challengesCompleted} Solved
                  </div>

                  {/* Score */}
                  <div className="col-span-4 sm:col-span-2 text-right">
                    <span className="font-mono text-sm sm:text-base font-black text-amber-400">
                      {entry.score.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-500 block font-mono">PTS</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
