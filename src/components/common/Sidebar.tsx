import React from 'react';
import {
  BookOpen,
  Code2,
  CheckCircle2,
  Award,
  Zap,
  Swords,
  Skull,
  Flame,
  Trophy,
  BarChart3,
  User,
  Settings,
  Compass,
  X,
  Activity,
  Cpu
} from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { soundManager } from '../../services/soundEffects';
import { getNextUncompletedLesson } from '../../data/curriculumData';

interface SidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentRoute, onNavigate, isOpen, onClose }) => {
  const { arenaTier, unlockedCompetitions, solvedProblems, completedLessons } = usePlayer();

  const nextLessonItem = getNextUncompletedLesson(completedLessons);
  const guidedWorldsRoute = nextLessonItem
    ? `/learning/lessons/${nextLessonItem.lesson.id}`
    : '/learning/lessons/lesson-var-intro';

  const navGroups = [
    {
      label: 'CRUCIBLE CURRICULUM',
      items: [
        { label: 'Overview', route: '/learning', icon: Compass },
        { label: 'Guided Worlds', route: guidedWorldsRoute, icon: BookOpen, badge: '6 Worlds' },
        { label: 'Practice Lab', route: '/learning/practice', icon: Code2, badge: `${solvedProblems.length} Solved` },
        { label: 'Mastery Tests', route: '/learning/tests', icon: CheckCircle2 },
        { label: 'Unlock Matrix', route: '/learning/mastery', icon: Award }
      ]
    },
    {
      label: 'COLOSSEUM ARENA',
      items: [
        { label: 'Arena Hub', route: '/arena', icon: Trophy },
        { label: 'Speed Run', route: '/arena/speed-run', icon: Zap },
        { label: 'Code Battles', route: '/arena/battles', icon: Swords },
        { label: 'Boss Battle', route: '/arena/boss', icon: Skull, badge: 'Pyrax' },
        { label: 'Survival Gauntlet', route: '/arena/survival', icon: Flame, badge: '3 Lives' },
        { label: 'Competitions', route: '/arena/competitions', icon: Trophy, badge: `${unlockedCompetitions.length} Open` },
        { label: 'Leaderboards', route: '/arena/leaderboards', icon: BarChart3 }
      ]
    },
    {
      label: 'GLADIATOR PROFILE',
      items: [
        { label: 'Player Career', route: '/profile', icon: User },
        { label: 'Settings & Theme', route: '/profile/settings', icon: Settings }
      ]
    }
  ];

  const handleLinkClick = (route: string) => {
    soundManager.playClick();
    onNavigate(route);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 border-r border-slate-800/80 bg-[#080b12] transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col justify-between overflow-y-auto p-4">
          <div>
            {/* Mobile Header with close button */}
            <div className="flex items-center justify-between pb-4 mb-2 border-b border-slate-800 lg:hidden">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔥</span>
                <span className="font-extrabold text-white text-lg tracking-tight">PYRON</span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tier Badge Box */}
            <div className="mb-6 p-3 rounded-2xl bg-gradient-to-r from-[#120a1c] to-[#1a120c] border border-orange-500/20 flex items-center justify-between shadow-lg">
              <div>
                <p className="text-[9px] uppercase tracking-widest font-mono font-bold text-slate-400">Gladiator League</p>
                <p className="font-black text-amber-400 text-sm tracking-wide font-mono">{arenaTier} Tier</p>
              </div>
              <span className="text-2xl">🛡️</span>
            </div>

            {/* Navigation Groups */}
            <nav className="space-y-6">
              {navGroups.map((group) => (
                <div key={group.label} className="space-y-1">
                  <p className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                    {group.label}
                  </p>
                  <div className="space-y-0.5">
                    {group.items.map((item) => {
                      const isActive =
                        currentRoute === item.route ||
                        (item.label === 'Guided Worlds' && currentRoute.startsWith('/learning/lessons')) ||
                        (item.route !== '/learning' && item.route !== '/arena' && currentRoute.startsWith(item.route));
                      const Icon = item.icon;

                      return (
                        <button
                          key={item.route}
                          onClick={() => handleLinkClick(item.route)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                            isActive
                              ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/10 text-white border border-orange-500/40 shadow-sm'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon
                              className={`w-4 h-4 transition-colors ${
                                isActive
                                  ? 'text-[#f97316]'
                                  : 'text-slate-500 group-hover:text-slate-300'
                              }`}
                            />
                            <span>{item.label}</span>
                          </div>

                          {item.badge && (
                            <span
                              className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                                isActive
                                  ? 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                                  : 'bg-slate-900 text-slate-400 border-slate-800'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </div>

          {/* Sidebar Telemetry Footer */}
          <div className="pt-4 border-t border-slate-800/80 mt-4 space-y-2">
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/90 text-xs font-mono">
              <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                <span className="flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-sky-400" />
                  <span>CRUCIBLE VM</span>
                </span>
                <span className="text-emerald-400 font-bold">ONLINE</span>
              </div>
              <div className="text-[10px] text-slate-500 space-y-0.5">
                <p>Sandboxing: Isolated CPython</p>
                <p>Latency: 14ms • UTF-8</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
