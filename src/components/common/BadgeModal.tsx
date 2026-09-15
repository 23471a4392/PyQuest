import React from 'react';
import { Badge } from '../../types/player';
import { X, Calendar, Target, Shield } from 'lucide-react';

interface BadgeModalProps {
  badge: Badge | null;
  onClose: () => void;
}

export const BadgeModal: React.FC<BadgeModalProps> = ({ badge, onClose }) => {
  if (!badge) return null;

  const rarityColors = {
    Common: 'border-slate-500/40 text-slate-300 bg-slate-800/40',
    Rare: 'border-blue-500/40 text-blue-300 bg-blue-950/40',
    Epic: 'border-purple-500/40 text-purple-300 bg-purple-950/40',
    Legendary: 'border-amber-500/50 text-amber-300 bg-amber-950/50'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-[#0d121f] p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center text-4xl mb-4 shadow-xl">
            {badge.icon}
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                rarityColors[badge.rarity]
              }`}
            >
              {badge.rarity}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
              {badge.category}
            </span>
          </div>

          <h3 className="text-xl font-black text-white mb-2">{badge.title}</h3>
          <p className="text-xs text-slate-300 leading-relaxed mb-6">{badge.description}</p>

          <div className="w-full space-y-2.5 text-left text-xs bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-start gap-2 text-slate-300">
              <Target className="w-4 h-4 text-[#ffd43b] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Unlock Requirement:</span>
                <p className="text-slate-400 text-[11px] mt-0.5">{badge.requirement}</p>
              </div>
            </div>

            {badge.isUnlocked && badge.unlockedAt && (
              <div className="flex items-center gap-2 text-emerald-400 pt-1 border-t border-slate-800/80">
                <Calendar className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium">Unlocked on: {badge.unlockedAt}</span>
              </div>
            )}
          </div>

          <div className="mt-6 w-full">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
