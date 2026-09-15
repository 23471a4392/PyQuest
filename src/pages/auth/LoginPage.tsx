import React, { useState } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { soundManager } from '../../services/soundEffects';
import {
  Flame,
  ArrowRight,
  Shield,
  Zap,
  Sparkles,
  User,
  CheckCircle2,
  Coins,
  BookOpen,
  Terminal
} from 'lucide-react';

interface LoginPageProps {
  onNavigate: (route: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { login, isLoggedIn, username: activeUsername, level: activeLevel, archetype: activeArchetype, avatar: activeAvatar } = usePlayer();

  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('🧑‍💻');
  const [selectedArchetype, setSelectedArchetype] = useState('Speed Coder');
  const [errorMsg, setErrorMsg] = useState('');

  const avatars = ['🧑‍💻', '🥷', '🧙‍♂️', '🐍', '🤖', '👑', '⚡', '🐉', '🛡️', '🌟'];

  const archetypes = [
    {
      id: 'Speed Coder',
      title: '⚡ Speed Coder',
      icon: Zap,
      perk: '+10% Speed Run streak multiplier',
      color: 'border-amber-500/40 text-amber-300 bg-amber-950/20'
    },
    {
      id: 'Algorithm Knight',
      title: '🛡️ Algorithm Knight',
      icon: Shield,
      perk: '+15% Boss Raid strike damage',
      color: 'border-blue-500/40 text-blue-300 bg-blue-950/20'
    },
    {
      id: 'Syntax Alchemist',
      title: '🧙‍♂️ Syntax Alchemist',
      icon: Sparkles,
      perk: 'Free AST hint reveals & linter bonus',
      color: 'border-purple-500/40 text-purple-300 bg-purple-950/20'
    },
    {
      id: 'Pythonic Purist',
      title: '🐍 Pythonic Purist',
      icon: Flame,
      perk: 'PEP-8 master & cleaner memory footprint',
      color: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/20'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please specify your gladiator name.');
      soundManager.playError();
      return;
    }

    login(name, selectedAvatar, selectedArchetype);
    onNavigate('/learning');
  };

  return (
    <div className="min-h-screen bg-[#080b12] text-white flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden font-sans">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-orange-600/20 via-amber-500/10 to-sky-600/10 blur-[130px] -z-10 pointer-events-none rounded-full" />

      {/* Brand Header */}
      <div
        onClick={() => onNavigate('/')}
        className="flex items-center gap-3 mb-8 cursor-pointer group select-none"
      >
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#f97316] to-[#eab308] p-0.5 shadow-xl shadow-orange-500/25 group-hover:scale-105 transition-transform">
          <div className="w-full h-full bg-[#080b12] rounded-[14px] flex items-center justify-center text-2xl">
            🔥
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-black text-2xl tracking-tight">
            PY<span className="text-[#f97316]">RON</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono tracking-widest -mt-1 uppercase">
            Gladiator Enrollment
          </span>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-xl rounded-3xl border border-slate-800 bg-[#0c101a] p-6 sm:p-10 shadow-2xl space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-mono font-bold">
            <Terminal className="w-3.5 h-3.5" />
            <span>LEVEL 1 ONBOARDING PROTOCOL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Enroll in the Crucible
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            Enter your callsign and select your specialization. Every gladiator starts their journey at <strong>Level 1 (0 XP)</strong> in World 1.
          </p>
        </div>

        {/* Existing Session Quick Resume Banner */}
        {isLoggedIn && (
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/40 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-xl shadow">
                {activeAvatar}
              </div>
              <div>
                <p className="text-xs font-bold text-white">Active: {activeUsername}</p>
                <p className="text-[11px] text-slate-400 font-mono">
                  Level {activeLevel} • {activeArchetype}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onNavigate('/learning');
              }}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <span>Resume</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. Name Input */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>Gladiator Callsign / Name</span>
              {name && (
                <span className="text-orange-400 font-mono text-[11px]">
                  @{name.toLowerCase().replace(/\s+/g, '_')}
                </span>
              )}
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Alex, Maya, Neo..."
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                className="w-full pl-4 pr-4 py-3 bg-[#070912] border border-slate-800 rounded-2xl text-sm font-bold text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 transition-colors"
                autoFocus
              />
            </div>
            {errorMsg && (
              <p className="text-xs text-rose-400 font-mono">{errorMsg}</p>
            )}
          </div>

          {/* 2. Coding Archetype Selection */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
              Choose Specialization Archetype
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {archetypes.map((arch) => {
                const isSelected = selectedArchetype === arch.id;

                return (
                  <button
                    type="button"
                    key={arch.id}
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedArchetype(arch.id);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-orange-500 bg-orange-500/10 shadow-md shadow-orange-500/15 scale-[1.02]'
                        : 'border-slate-800/90 bg-[#070912] hover:border-slate-700 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-white">{arch.title}</span>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-orange-400" />
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {arch.perk}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Avatar Selection */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
              Select Gladiator Avatar
            </label>
            <div className="flex flex-wrap gap-2">
              {avatars.map((av) => (
                <button
                  type="button"
                  key={av}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedAvatar(av);
                  }}
                  className={`w-11 h-11 rounded-2xl border text-xl flex items-center justify-center transition-all ${
                    selectedAvatar === av
                      ? 'border-[#f97316] bg-orange-500/20 scale-110 shadow-md shadow-orange-500/25'
                      : 'border-slate-800 bg-[#070912] hover:border-slate-700'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          {/* Level 1 Starting Bundle Preview */}
          <div className="p-4 rounded-2xl bg-[#070912] border border-slate-800/80 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2">
              <span>LEVEL 1 STARTING CLEARANCE</span>
              <span className="text-emerald-400 font-bold">READY</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] pt-1">
              <div>
                <span className="text-slate-500 block">START LEVEL</span>
                <span className="text-white font-bold text-xs">Level 1 (0 XP)</span>
              </div>
              <div>
                <span className="text-slate-500 block">STIPEND</span>
                <span className="text-amber-400 font-bold text-xs">50 🪙</span>
              </div>
              <div>
                <span className="text-slate-500 block">START ZONE</span>
                <span className="text-sky-400 font-bold text-xs">World 1 Basics</span>
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-orange-500/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <span>INITIALIZE LEVEL 1 JOURNEY</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Return Home Link */}
      <button
        onClick={() => onNavigate('/')}
        className="mt-6 text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors"
      >
        &larr; Back to Crucible Landing Page
      </button>
    </div>
  );
};
