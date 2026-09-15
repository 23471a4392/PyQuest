import React from 'react';
import { X, Command, Keyboard } from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcutGroups = [
    {
      category: 'Code Editor & Evaluation',
      items: [
        { keys: ['Ctrl', 'Enter'], description: 'Run & evaluate current Python script' },
        { keys: ['Ctrl', 'S'], description: 'Quick save solution draft to local storage' },
        { keys: ['Tab'], description: 'Indent 4 spaces (PEP 8 standard)' },
        { keys: ['Shift', 'Tab'], description: 'Dedent current line' }
      ]
    },
    {
      category: 'Navigation & Colosseum',
      items: [
        { keys: ['1'], description: 'Jump to World 1 (Python Basics)' },
        { keys: ['2'], description: 'Jump to World 2 (Decision Making)' },
        { keys: ['3'], description: 'Jump to World 3 (Loops & Iteration)' },
        { keys: ['4'], description: 'Jump to World 4 (Functions & Scope)' },
        { keys: ['5'], description: 'Jump to World 5 (Collections & Slices)' },
        { keys: ['6'], description: 'Jump to World 6 (Advanced OOP)' },
        { keys: ['Esc'], description: 'Close any active modal or drawer' },
        { keys: ['?'], description: 'Toggle this keyboard shortcut guide' }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-800 bg-[#0c101a] p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-[#306998]/20 border border-[#4b8bbe]/40 text-sky-400 flex items-center justify-center">
            <Keyboard className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white">Crucible Keyboard Shortcuts</h2>
            <p className="text-xs text-slate-400">High-efficiency keyboard controls for gladiators.</p>
          </div>
        </div>

        <div className="space-y-6">
          {shortcutGroups.map((group) => (
            <div key={group.category} className="space-y-3">
              <h3 className="text-[11px] font-bold font-mono uppercase tracking-wider text-amber-400">
                {group.category}
              </h3>

              <div className="space-y-2">
                {group.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 text-xs"
                  >
                    <span className="text-slate-300 font-medium">{item.description}</span>
                    <div className="flex items-center gap-1 font-mono">
                      {item.keys.map((k, kIdx) => (
                        <kbd
                          key={kIdx}
                          className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200 text-[10px] font-bold shadow-sm"
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors"
          >
            Got it (Esc)
          </button>
        </div>
      </div>
    </div>
  );
};
