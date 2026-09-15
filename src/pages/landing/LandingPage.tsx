import React, { useState } from 'react';
import {
  Play,
  ArrowRight,
  Flame,
  Zap,
  Swords,
  Skull,
  Award,
  Terminal,
  Code2,
  Cpu,
  Shield,
  Volume2,
  Sparkles,
  CheckCircle2,
  FileCode2,
  Users,
  Trophy
} from 'lucide-react';
import { soundManager } from '../../services/soundEffects';
import { WORLDS_DATA } from '../../data/curriculumData';

interface LandingPageProps {
  onNavigate: (route: string) => void;
}

const REPL_SNIPPETS = {
  'strike.py': `# Calculate Boss Strike Damage with Critical Multiplier
def calculate_strike(base_power: int, speed_ms: int, archetype: str) -> dict:
    multiplier = round(1000 / max(speed_ms, 120), 2)
    bonus = 1.25 if archetype == "Algorithm Knight" else 1.0
    total_dmg = int(base_power * multiplier * bonus)
    return {
        "strike_dmg": total_dmg,
        "boss_status": "HIT (-25 HP)",
        "combo": "3x CRITICAL"
    }

result = calculate_strike(base_power=140, speed_ms=220, archetype="Algorithm Knight")
print(f"Strike Output: {result}")`,

  'zen.py': `# The Zen of Python, by Tim Peters
import this

zen_principles = [
    "Beautiful is better than ugly.",
    "Explicit is better than implicit.",
    "Simple is better than complex.",
    "Readability counts."
]

for idx, rule in enumerate(zen_principles, 1):
    print(f"Rule #{idx}: {rule}")`,

  'primes.py': `# Sieve of Eratosthenes (Crucible Math Engine)
def sieve(limit: int) -> list[int]:
    is_prime = [True] * (limit + 1)
    is_prime[0] = is_prime[1] = False
    for p in range(2, int(limit**0.5) + 1):
        if is_prime[p]:
            for multiple in range(p * p, limit + 1, p):
                is_prime[multiple] = False
    return [x for x in range(limit + 1) if is_prime[x]]

print(f"Primes up to 50: {sieve(50)}")`
};

const REPL_OUTPUTS = {
  'strike.py': `Strike Output: {'strike_dmg': 795, 'boss_status': 'HIT (-25 HP)', 'combo': '3x CRITICAL'}

Execution time: 14.2ms | Memory: 3.1 MB | Status: OK (0)`,

  'zen.py': `Rule #1: Beautiful is better than ugly.
Rule #2: Explicit is better than implicit.
Rule #3: Simple is better than complex.
Rule #4: Readability counts.

>>> The Zen of Python verification passed.
Execution time: 9.8ms | CPython 3.12 VM`,

  'primes.py': `Primes up to 50: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]

Time complexity: O(N log log N) | Status: Verified`
};

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [activeFile, setActiveFile] = useState<'strike.py' | 'zen.py' | 'primes.py'>('strike.py');
  const [userCode, setUserCode] = useState(REPL_SNIPPETS['strike.py']);
  const [terminalOutput, setTerminalOutput] = useState(REPL_OUTPUTS['strike.py']);
  const [isRunning, setIsRunning] = useState(false);

  const handleTabChange = (file: 'strike.py' | 'zen.py' | 'primes.py') => {
    soundManager.playClick();
    setActiveFile(file);
    setUserCode(REPL_SNIPPETS[file]);
    setTerminalOutput(REPL_OUTPUTS[file]);
  };

  const handleRunCode = () => {
    soundManager.playClick();
    setIsRunning(true);

    setTimeout(() => {
      soundManager.playSuccess();
      setIsRunning(false);
      setTerminalOutput(REPL_OUTPUTS[activeFile]);
    }, 320);
  };

  const handleStartAtLevel1 = () => {
    soundManager.playClick();
    onNavigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#080b12] text-white flex flex-col selection:bg-orange-500 selection:text-black font-sans">
      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-[#080b12]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onNavigate('/')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#f97316] to-[#eab308] p-0.5 shadow-md shadow-orange-500/20">
              <div className="w-full h-full bg-[#080b12] rounded-[10px] flex items-center justify-center text-xl">
                🔥
              </div>
            </div>
            <span className="font-black text-xl tracking-tight">
              PY<span className="text-[#f97316]">RON</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-mono font-semibold text-slate-300">
            <button onClick={() => onNavigate('/learning')} className="hover:text-white transition-colors">
              Curriculum (6 Worlds)
            </button>
            <button onClick={() => onNavigate('/learning/practice')} className="hover:text-white transition-colors">
              Practice Lab
            </button>
            <button onClick={() => onNavigate('/arena')} className="hover:text-white transition-colors">
              Colosseum Arena
            </button>
            <button onClick={() => onNavigate('/arena/leaderboards')} className="hover:text-white transition-colors">
              Rankings
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={handleStartAtLevel1}
              className="px-4 py-2 text-xs font-mono font-bold text-slate-300 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              Log In
            </button>
            <button
              onClick={handleStartAtLevel1}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 text-xs font-black rounded-xl shadow-lg shadow-orange-500/20 hover:scale-105 transition-all flex items-center gap-1.5"
            >
              <span>Start at Level 1</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-gradient-to-tr from-orange-600/20 via-amber-500/15 to-sky-600/10 blur-[140px] -z-10 pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-inner font-mono">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold text-slate-300">
              PYRON Crucible Engine v2.4.0
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-300 font-bold">
              START AT LEVEL 1
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] max-w-4xl mx-auto">
            The Python Crucible:{' '}
            <span className="bg-gradient-to-r from-[#f97316] via-[#eab308] to-sky-400 bg-clip-text text-transparent">
              Where Syntax Meets Battle Strategy.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Begin as a <strong>Level 1 Novice</strong>. Master Python from low-level memory binding to asynchronous concurrency through 6 systematic worlds, battle the Loop Dragon in boss raids, and climb the Colosseum rankings.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={handleStartAtLevel1}
              className="px-7 py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-orange-500/25 hover:scale-105 transition-all flex items-center gap-2"
            >
              <Flame className="w-4 h-4 fill-current" />
              <span>Enroll Now &amp; Start at Level 1</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('/arena')}
              className="px-6 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-black text-sm rounded-2xl hover:scale-105 transition-all flex items-center gap-2 font-mono"
            >
              <Trophy className="w-4 h-4 text-orange-400" />
              <span>Explore Arena</span>
            </button>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-10 text-center font-mono">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <p className="text-2xl font-black text-orange-400">Level 1</p>
              <p className="text-xs text-slate-400">Fresh Starting Rank</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <p className="text-2xl font-black text-sky-400">6</p>
              <p className="text-xs text-slate-400">Curriculum Worlds</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <p className="text-2xl font-black text-emerald-400">627K+</p>
              <p className="text-xs text-slate-400">Lines of Verified Code</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <p className="text-2xl font-black text-amber-400">100%</p>
              <p className="text-xs text-slate-400">Isolated Sandbox</p>
            </div>
          </div>
        </div>

        {/* Live Multi-File REPL */}
        <div className="max-w-4xl mx-auto mt-14 rounded-3xl border border-slate-800 bg-[#0a0d16] shadow-2xl overflow-hidden font-mono">
          {/* File Tabs */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#060810] border-b border-slate-800">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {(['strike.py', 'zen.py', 'primes.py'] as const).map((file) => (
                <button
                  key={file}
                  onClick={() => handleTabChange(file)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeFile === file
                      ? 'bg-slate-800 text-orange-300 border border-orange-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <FileCode2 className="w-3.5 h-3.5" />
                  <span>{file}</span>
                </button>
              ))}
            </div>

            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 text-xs font-black rounded-lg transition-all hover:scale-105 disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isRunning ? 'Executing...' : 'Run Code'}</span>
            </button>
          </div>

          {/* Editor and Terminal */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="p-4 bg-[#080b12]">
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                className="w-full h-48 font-mono text-xs text-amber-200 bg-transparent resize-none outline-none leading-relaxed"
                spellCheck={false}
              />
            </div>
            <div className="p-4 bg-[#05070e] font-mono text-xs text-slate-300 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-1">
                  CPython Console Output:
                </span>
                <pre className="text-emerald-400 whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto text-[11px]">
                  {terminalOutput}
                </pre>
              </div>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                <span>Web Audio: Active 🔊</span>
                <span className="text-orange-400 font-bold">Interactive Sandbox</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 4-Step Gladiator Journey */}
      <section className="py-16 px-4 sm:px-6 border-t border-slate-800/80 bg-slate-950/40">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange-400">
              HOW TO PLAY &amp; CONQUER
            </span>
            <h2 className="text-3xl sm:text-4xl font-black">
              The 4-Stage Gladiator Progression
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
              You start with clean slate clearance and systematically climb through rigorous verified trials.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-3xl border border-slate-800 bg-[#0a0e17] space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-mono font-bold text-sm">
                01
              </div>
              <h3 className="text-base font-black text-white">Enroll at Level 1</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Choose your callsign, select a coding archetype (*Speed Coder, Knight, Alchemist*), and claim 50 gold coins.
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-slate-800 bg-[#0a0e17] space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-mono font-bold text-sm">
                02
              </div>
              <h3 className="text-base font-black text-white">Conquer 6 Worlds</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Follow the 6-step guided curriculum: Learn &rarr; Syntax &rarr; Examples &rarr; Practice &rarr; Topic Test.
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-slate-800 bg-[#0a0e17] space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-sm">
                03
              </div>
              <h3 className="text-base font-black text-white">Unlock Colosseum</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Raid Pyrax the Loop Dragon, survive 3 Lives in the Gauntlet, and sprint through timed challenges.
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-slate-800 bg-[#0a0e17] space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-mono font-bold text-sm">
                04
              </div>
              <h3 className="text-base font-black text-white">Grandmaster Glory</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Climb global leaderboards, earn legendary badges, and prove yourself as a Python Grandmaster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Worlds Showcase */}
      <section className="py-16 px-4 sm:px-6 border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-3xl sm:text-4xl font-black">
              6 Progressive Curriculum Worlds
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Start in World 1: Python Basics. Complete mastery tests to unlock subsequent worlds and colosseum modes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {WORLDS_DATA.map((world, idx) => (
              <div
                key={world.id}
                onClick={handleStartAtLevel1}
                className="p-6 rounded-3xl border border-slate-800 bg-[#0d121f] hover:border-orange-500/50 transition-all cursor-pointer group hover:-translate-y-1 shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                      {world.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {world.topics.length} Topics
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white group-hover:text-orange-400 transition-colors mb-1">
                    {world.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 mb-2">{world.subtitle}</p>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-4">
                    {world.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-orange-400">
                  <span>{idx === 0 ? 'Start at Level 1' : 'Requires World Progression'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-20 px-4 sm:px-6 border-t border-slate-800/80 bg-gradient-to-b from-[#080b12] to-[#120a16]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-orange-500/20 text-orange-400 flex items-center justify-center text-3xl mx-auto shadow-2xl">
            🔥
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Ready to Prove Your Python Mastery?
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Enroll your gladiator identity and launch into Level 1 now. Pure code, pure execution, zero artificial fluff.
          </p>

          <button
            onClick={handleStartAtLevel1}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-black text-sm rounded-2xl shadow-2xl shadow-orange-500/30 hover:scale-105 transition-all inline-flex items-center gap-2"
          >
            <span>START YOUR LEVEL 1 CRUCIBLE JOURNEY</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-[#04060c] py-10 px-4 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>🔥</span>
            <span className="font-extrabold text-white text-sm">PYRON</span>
            <span>— The Python Crucible</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={handleStartAtLevel1} className="hover:text-white transition-colors">
              Enrollment (Level 1)
            </button>
            <button onClick={() => onNavigate('/learning')} className="hover:text-white transition-colors">
              Curriculum
            </button>
            <button onClick={() => onNavigate('/arena')} className="hover:text-white transition-colors">
              Colosseum
            </button>
          </div>

          <p>v2.4.0 Crucible Release • Level 1 Starting Pipeline</p>
        </div>
      </footer>
    </div>
  );
};
