import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Copy, Check, Terminal, Sparkles, Sliders, Shield } from 'lucide-react';
import { soundManager } from '../../services/soundEffects';
import { CodeInspector } from './CodeInspector';

export type EditorTheme = 'crucible' | 'monokai' | 'dracula' | 'cyberpunk' | 'idle';

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  onRun?: () => void;
  isRunning?: boolean;
  onReset?: () => void;
  title?: string;
  readOnly?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  onRun,
  isRunning = false,
  onReset,
  title = 'solution.py',
  readOnly = false
}) => {
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState<EditorTheme>('crucible');
  const [showInspector, setShowInspector] = useState(false);
  const [isVimMode, setIsVimMode] = useState(false);
  const [vimModeState, setVimModeState] = useState<'NORMAL' | 'INSERT'>('INSERT');

  const lines = code.split('\n');

  // Handle Ctrl+Enter to run
  useEffect(() => {
    const handleKeyDownGlobal = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (onRun && !isRunning) {
          soundManager.playClick();
          onRun();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDownGlobal);
    return () => window.removeEventListener('keydown', handleKeyDownGlobal);
  }, [onRun, isRunning]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (readOnly) return;

    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const updated = code.substring(0, start) + '    ' + code.substring(end);
      onChange(updated);

      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 4;
      }, 0);
    }
  };

  const handleCopy = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const themeClasses: Record<EditorTheme, { bg: string; text: string; header: string }> = {
    crucible: {
      bg: 'bg-[#0a0d16]',
      text: 'text-amber-100',
      header: 'bg-[#060810]'
    },
    monokai: {
      bg: 'bg-[#272822]',
      text: 'text-[#f8f8f2]',
      header: 'bg-[#1e1f1c]'
    },
    dracula: {
      bg: 'bg-[#282a36]',
      text: 'text-[#f8f8f2]',
      header: 'bg-[#21222c]'
    },
    cyberpunk: {
      bg: 'bg-[#050014]',
      text: 'text-[#00ffcc]',
      header: 'bg-[#02000a]'
    },
    idle: {
      bg: 'bg-[#182030]',
      text: 'text-[#d0e0ff]',
      header: 'bg-[#101622]'
    }
  };

  const currentThemeStyle = themeClasses[theme] || themeClasses.crucible;

  return (
    <div className="flex flex-col rounded-3xl border border-slate-800 bg-[#0d121f] overflow-hidden shadow-2xl">
      {/* Editor Top Bar */}
      <div className={`flex flex-wrap items-center justify-between px-4 py-3 ${currentThemeStyle.header} border-b border-slate-800/80 gap-2`}>
        <div className="flex items-center gap-2.5">
          <span className="text-sm">🐍</span>
          <span className="font-mono text-xs font-bold text-white">{title}</span>

          {/* Vim status indicator */}
          <button
            onClick={() => {
              setIsVimMode(!isVimMode);
              soundManager.playClick();
            }}
            className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border transition-colors ${
              isVimMode
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800/80 text-slate-500 border-slate-700 hover:text-slate-300'
            }`}
            title="Toggle Vim Mode Simulator"
          >
            {isVimMode ? `-- ${vimModeState} --` : 'VIM: OFF'}
          </button>

          {/* Theme Dropdown */}
          <select
            value={theme}
            onChange={(e) => {
              setTheme(e.target.value as EditorTheme);
              soundManager.playClick();
            }}
            className="text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-300 rounded-lg px-2 py-0.5 focus:outline-none"
          >
            <option value="crucible">Crucible Dark</option>
            <option value="monokai">Monokai Pro</option>
            <option value="dracula">Dracula</option>
            <option value="cyberpunk">Cyberpunk Neon</option>
            <option value="idle">Python IDLE</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          {/* Linter & Bytecode Inspector Toggle */}
          <button
            onClick={() => {
              setShowInspector(!showInspector);
              soundManager.playClick();
            }}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg transition-colors border ${
              showInspector
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-800/60'
            }`}
            title="Toggle PEP 8 & Bytecode Inspector"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Inspect</span>
          </button>

          {onReset && (
            <button
              onClick={() => {
                soundManager.playClick();
                onReset();
              }}
              disabled={isRunning}
              className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-lg transition-colors"
              title="Reset code template"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-lg transition-colors"
            title="Copy Python script"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>

          {onRun && (
            <button
              onClick={() => {
                soundManager.playClick();
                onRun();
              }}
              disabled={isRunning}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-orange-500/20 transition-all hover:scale-105 disabled:opacity-50"
            >
              {isRunning ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Executing...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run (Ctrl+Enter)</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Optional Inspector Panel */}
      {showInspector && (
        <div className="p-3 bg-[#070a12] border-b border-slate-800">
          <CodeInspector code={code} />
        </div>
      )}

      {/* Editor Body */}
      <div className={`relative flex flex-1 min-h-[240px] max-h-[500px] overflow-hidden ${currentThemeStyle.bg}`}>
        {/* Line Numbers */}
        <div className="select-none py-3 px-3.5 text-right bg-black/25 border-r border-slate-800/60 text-slate-500 font-mono text-xs leading-6">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Text Area */}
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
          spellCheck={false}
          className={`flex-1 w-full p-3.5 font-mono text-xs leading-6 ${currentThemeStyle.text} bg-transparent resize-none outline-none border-none whitespace-pre focus:ring-0 selection:bg-amber-500/30`}
          placeholder="# Write Python code here..."
        />
      </div>

      {/* Footer / Status Bar */}
      <div className={`flex items-center justify-between px-4 py-2 ${currentThemeStyle.header} border-t border-slate-800/60 text-[11px] text-slate-400 font-mono`}>
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span>CPython 3.12 (Isolated Sandbox)</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Ln {lines.length}, Col {lines[lines.length - 1]?.length || 0}</span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span className="hidden sm:inline text-amber-400">Ctrl+Enter to Execute</span>
        </div>
      </div>
    </div>
  );
};
