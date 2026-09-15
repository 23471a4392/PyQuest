import React, { useState } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { soundManager } from '../../services/soundEffects';
import { ShortcutsModal } from './ShortcutsModal';
import {
  Flame,
  Coins,
  Trophy,
  Menu,
  X,
  Shield,
  ChevronDown,
  User,
  Settings,
  Sparkles,
  BookOpen,
  Volume2,
  VolumeX,
  Keyboard,
  LogOut
} from 'lucide-react';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onToggleSidebar }) => {
  const {
    isLoggedIn,
    logout,
    username,
    avatar,
    level,
    xp,
    xpToNextLevel,
    levelProgressPercent,
    coins,
    streakDays,
    arenaTier
  } = usePlayer();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  const handleToggleSound = () => {
    const nextMuted = soundManager.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleLinkNavigate = (route: string) => {
    soundManager.playClick();
    onNavigate(route);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#080b12]/95 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          {/* Left: PYRON Brand & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundManager.playClick();
                onToggleSidebar?.();
              }}
              className="p-2 text-slate-400 hover:text-slate-100 lg:hidden rounded-xl hover:bg-slate-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div
              onClick={() => handleLinkNavigate('/')}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#f97316] via-[#ea580c] to-[#eab308] p-0.5 shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#080b12] rounded-[10px] flex items-center justify-center font-black text-xl">
                  🔥
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-orange-400 bg-clip-text text-transparent">
                  PY<span className="text-[#f97316]">RON</span>
                </span>
                <span className="text-[9px] text-slate-400 font-mono tracking-widest -mt-1 uppercase">
                  The Python Crucible
                </span>
              </div>
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/70 p-1 rounded-2xl border border-slate-800">
            <button
              onClick={() => handleLinkNavigate('/learning')}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-sky-400" />
              Crucible (6 Worlds)
            </button>
            <button
              onClick={() => handleLinkNavigate('/learning/practice')}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Practice Lab
            </button>
            <button
              onClick={() => handleLinkNavigate('/arena')}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <Trophy className="w-3.5 h-3.5 text-rose-400" />
              Colosseum Arena
            </button>
          </nav>

          {/* Right Status HUD */}
          <div className="flex items-center gap-2.5">
            {/* Audio Synthesizer Toggle */}
            <button
              onClick={handleToggleSound}
              className={`p-2 rounded-xl border transition-all ${
                isMuted
                  ? 'border-slate-800 text-slate-500 hover:text-slate-300 bg-slate-900/50'
                  : 'border-orange-500/40 text-orange-400 bg-orange-500/10 shadow-sm shadow-orange-500/20'
              }`}
              title={isMuted ? 'Unmute Arcade Sound Effects' : 'Mute Arcade Sound Effects'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Keyboard Shortcuts Trigger */}
            <button
              onClick={() => {
                soundManager.playClick();
                setShortcutsOpen(true);
              }}
              className="p-2 rounded-xl border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition-colors hidden sm:block"
              title="Keyboard Shortcuts (?)"
            >
              <Keyboard className="w-4 h-4" />
            </button>

            {/* Streak */}
            <div
              title={`${streakDays}-Day Crucible Streak!`}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-orange-950/40 border border-orange-800/50 text-orange-400 text-xs font-bold font-mono"
            >
              <Flame className="w-4 h-4 fill-orange-500 text-orange-500 animate-pulse" />
              <span>{streakDays}d</span>
            </div>

            {/* Coins */}
            <div
              title={`${coins} Gold Coins`}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-950/40 border border-amber-800/50 text-amber-300 text-xs font-bold font-mono"
            >
              <Coins className="w-4 h-4 text-amber-400" />
              <span>{coins.toLocaleString()}</span>
            </div>

            {/* Level & XP Gauge */}
            <div className="hidden lg:flex flex-col items-end mr-1">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-extrabold text-white">Lvl {level}</span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {xp} / {xpToNextLevel} XP
                </span>
              </div>
              <div className="w-28 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
                <div
                  className="h-full bg-gradient-to-r from-sky-400 to-[#f97316] transition-all duration-500"
                  style={{ width: `${levelProgressPercent}%` }}
                />
              </div>
            </div>

            {/* Profile Dropdown or Log In Action */}
            {!isLoggedIn ? (
              <button
                onClick={() => handleLinkNavigate('/login')}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5"
              >
                <span>Log In</span>
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setProfileMenuOpen(!profileMenuOpen);
                  }}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-800/80 border border-slate-800 transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-600 to-amber-600 flex items-center justify-center text-base shadow-sm">
                    {avatar}
                  </div>
                  <span className="hidden sm:inline font-semibold text-xs text-slate-200">
                    {username}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {profileMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setProfileMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0d121f] border border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-3 py-2 border-b border-slate-800/80 mb-1">
                        <p className="font-bold text-sm text-white">{username}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                            <Shield className="w-2.5 h-2.5" />
                            {arenaTier} Tier
                          </span>
                          <span className="text-[11px] text-slate-400">Level {level}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          handleLinkNavigate('/profile');
                          setProfileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-800 hover:text-white transition-colors"
                      >
                        <User className="w-4 h-4 text-sky-400" />
                        Gladiator Profile &amp; Badges
                      </button>

                      <button
                        onClick={() => {
                          handleLinkNavigate('/profile/settings');
                          setProfileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-800 hover:text-white transition-colors"
                      >
                        <Settings className="w-4 h-4 text-slate-400" />
                        Preferences &amp; Themes
                      </button>

                      <div className="my-1 border-t border-slate-800/80" />

                      <button
                        onClick={() => {
                          logout();
                          handleLinkNavigate('/login');
                          setProfileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-amber-400 hover:bg-amber-950/30 transition-colors"
                      >
                        <LogOut className="w-4 h-4 text-amber-400" />
                        Switch Gladiator / Logout
                      </button>

                      <button
                        onClick={() => {
                          handleLinkNavigate('/');
                          setProfileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-950/30 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Exit to Crucible Gate
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global Keyboard Shortcuts Modal */}
      <ShortcutsModal isOpen={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
    </>
  );
};
