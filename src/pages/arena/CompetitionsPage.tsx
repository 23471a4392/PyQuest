import React, { useState } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { COMPETITIONS_DATA } from '../../data/arenaData';
import { Competition } from '../../types/arena';
import {
  Trophy,
  Clock,
  Users,
  Shield,
  Award,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lock,
  Search,
  Sparkles
} from 'lucide-react';

interface CompetitionsPageProps {
  initialCompetitionId?: string;
  onNavigate: (route: string) => void;
}

export const CompetitionsPage: React.FC<CompetitionsPageProps> = ({
  initialCompetitionId,
  onNavigate
}) => {
  const { arenaTier } = usePlayer();

  const [selectedCompId, setSelectedCompId] = useState<string | null>(
    initialCompetitionId || null
  );
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'upcoming' | 'completed'>('all');
  const [joinedComps, setJoinedComps] = useState<string[]>(['comp-speed-sprint']);

  const activeCompetition = selectedCompId
    ? COMPETITIONS_DATA.find((c) => c.id === selectedCompId)
    : null;

  const filteredCompetitions = COMPETITIONS_DATA.filter((comp) => {
    if (statusFilter === 'all') return true;
    return comp.status === statusFilter;
  });

  const handleJoinCompetition = (compId: string) => {
    setJoinedComps((prev) => [...prev, compId]);
  };

  // Competition Details View
  if (activeCompetition) {
    const isJoined = joinedComps.includes(activeCompetition.id);

    return (
      <div className="space-y-6 animate-in fade-in pb-16 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <button
            onClick={() => setSelectedCompId(null)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                  activeCompetition.status === 'active'
                    ? 'bg-rose-950/60 text-rose-300 border-rose-800/60'
                    : activeCompetition.status === 'upcoming'
                    ? 'bg-amber-950/60 text-amber-300 border-amber-800/60'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                {activeCompetition.status.toUpperCase()}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Tier: {activeCompetition.tierRequired}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {activeCompetition.title}
            </h1>
          </div>
        </div>

        {/* Details Box */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-[#0d121f] shadow-2xl space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono text-xs">
            <div className="p-3 rounded-2xl bg-[#090d16] border border-slate-800">
              <span className="text-slate-400 text-[10px] block">DURATION</span>
              <span className="text-white font-bold text-sm">{activeCompetition.durationMinutes}m</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#090d16] border border-slate-800">
              <span className="text-slate-400 text-[10px] block">PROBLEMS</span>
              <span className="text-white font-bold text-sm">{activeCompetition.problemCount}</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#090d16] border border-slate-800">
              <span className="text-slate-400 text-[10px] block">PARTICIPANTS</span>
              <span className="text-white font-bold text-sm">{activeCompetition.participantsCount}</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#090d16] border border-slate-800">
              <span className="text-slate-400 text-[10px] block">PRIZE POOL</span>
              <span className="text-[#ffd43b] font-bold text-sm">+{activeCompetition.prizeXP} XP</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
              Tournament Overview
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">{activeCompetition.description}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
              Official Competition Rules
            </h3>
            <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside bg-[#090d16] p-4 rounded-2xl border border-slate-800">
              {activeCompetition.rules.map((r, i) => (
                <li key={i} className="leading-relaxed">{r}</li>
              ))}
            </ul>
          </div>

          {activeCompetition.prerequisiteTopicTitle && (
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Prerequisite Topic: <strong>{activeCompetition.prerequisiteTopicTitle}</strong></span>
              </div>
              <span className="text-emerald-400 font-bold">Verified Mastered ✓</span>
            </div>
          )}

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setSelectedCompId(null)}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl"
            >
              Back to Catalog
            </button>

            {isJoined ? (
              <button
                onClick={() => onNavigate('/arena/speed-run')}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Registered • Enter Tournament</span>
              </button>
            ) : (
              <button
                onClick={() => handleJoinCompetition(activeCompetition.id)}
                className="px-6 py-2.5 bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white font-black text-xs rounded-xl shadow-lg transition-all"
              >
                Join Competition
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Catalog View
  return (
    <div className="space-y-8 animate-in fade-in pb-16">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
            <button onClick={() => onNavigate('/arena')} className="hover:text-white">
              Arena
            </button>
            <span>/</span>
            <span className="text-rose-400">Competitions</span>
          </div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            Arena Tournaments &amp; Cups
          </h1>
          <p className="text-xs text-slate-400">
            Compete in live, scheduled tournaments. Demonstrate algorithm mastery and earn championship trophies.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800 self-start">
        {(['all', 'active', 'upcoming', 'completed'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              statusFilter === status
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Competitions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCompetitions.map((comp) => {
          const isJoined = joinedComps.includes(comp.id);

          return (
            <div
              key={comp.id}
              className="p-6 rounded-3xl border border-slate-800 bg-[#0d121f] flex flex-col justify-between shadow-xl space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                      comp.status === 'active'
                        ? 'bg-rose-950/60 text-rose-300 border-rose-800/60'
                        : comp.status === 'upcoming'
                        ? 'bg-amber-950/60 text-amber-300 border-amber-800/60'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {comp.status}
                  </span>

                  <span className="text-xs font-mono text-[#ffd43b] font-bold">
                    +{comp.prizeXP} XP • {comp.prizeCoins} 🪙
                  </span>
                </div>

                <h3 className="text-lg font-black text-white mb-1.5">{comp.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                  {comp.description}
                </p>

                <div className="grid grid-cols-3 gap-2 text-center font-mono text-[11px] p-2.5 rounded-2xl bg-[#090d16] border border-slate-800">
                  <div>
                    <span className="text-slate-500 block text-[9px]">DURATION</span>
                    <span className="text-slate-200 font-bold">{comp.durationMinutes}m</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[9px]">PROBLEMS</span>
                    <span className="text-slate-200 font-bold">{comp.problemCount}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[9px]">TIER</span>
                    <span className="text-amber-400 font-bold">{comp.tierRequired}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {comp.participantsCount} Coders
                </span>

                <button
                  onClick={() => setSelectedCompId(comp.id)}
                  className="px-4 py-2 bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>{isJoined ? 'Enter Match' : 'View & Join'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
