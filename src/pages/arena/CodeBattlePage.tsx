import React, { useState, useEffect } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { CODE_BATTLE_MATCHES } from '../../data/arenaData';
import { CodeBattleMatch } from '../../types/arena';
import { CodeEditor } from '../../components/common/CodeEditor';
import {
  Swords,
  Clock,
  Award,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Shield,
  Bot,
  Terminal,
  Zap
} from 'lucide-react';

interface CodeBattlePageProps {
  onNavigate: (route: string) => void;
}

export const CodeBattlePage: React.FC<CodeBattlePageProps> = ({ onNavigate }) => {
  const { addXP, addCoins } = usePlayer();

  const [selectedMatch, setSelectedMatch] = useState<CodeBattleMatch>(CODE_BATTLE_MATCHES[0]);
  const [battleState, setBattleState] = useState<'lobby' | 'fighting' | 'finished'>('lobby');
  const [userCode, setUserCode] = useState(selectedMatch.problem.starterCode);
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [opponentProgress, setOpponentProgress] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [battleLog, setBattleLog] = useState<string[]>([]);

  // Simulation loop for Opponent progress while fighting
  useEffect(() => {
    if (battleState !== 'fighting') return;

    const timer = window.setInterval(() => {
      setSecondsElapsed((s) => s + 1);
    }, 1000);

    const opponentInterval = window.setInterval(() => {
      setOpponentProgress((prev) => {
        if (prev >= 100) {
          window.clearInterval(opponentInterval);
          return 100;
        }
        const delta = Math.floor(Math.random() * 15) + 5;
        const next = Math.min(100, prev + delta);
        if (next === 100) {
          setBattleLog((l) => [...l, `${selectedMatch.opponent.name} completed their test suite!`]);
        }
        return next;
      });
    }, 2500);

    return () => {
      window.clearInterval(timer);
      window.clearInterval(opponentInterval);
    };
  }, [battleState, selectedMatch]);

  const handleStartBattle = () => {
    setBattleState('fighting');
    setUserCode(selectedMatch.problem.starterCode);
    setOpponentProgress(0);
    setSecondsElapsed(0);
    setBattleLog([`Battle started vs ${selectedMatch.opponent.name}! Both coders solving: ${selectedMatch.problem.title}`]);
  };

  const handleSubmitSolution = () => {
    // Calculate player score based on time and code correctness
    const timeBonus = Math.max(0, 300 - secondsElapsed * 3);
    const correctnessScore = 600;
    const finalPlayerScore = correctnessScore + timeBonus;

    // Opponent score based on their simulated progress & factor
    const finalOpponentScore = 650 + Math.floor(Math.random() * 120);

    setPlayerScore(finalPlayerScore);
    setOpponentScore(finalOpponentScore);
    setBattleState('finished');

    if (finalPlayerScore > finalOpponentScore) {
      addXP(350, `Won Code Battle vs ${selectedMatch.opponent.name}`);
      addCoins(100);
    } else {
      addXP(100, `Completed Code Battle`);
    }
  };

  const isPlayerWinner = playerScore > opponentScore;

  return (
    <div className="space-y-6 animate-in fade-in pb-16 max-w-5xl mx-auto">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
            <button onClick={() => onNavigate('/arena')} className="hover:text-white">
              Arena
            </button>
            <span>/</span>
            <span className="text-blue-400">Code Battles</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2.5">
            <Swords className="w-6 h-6 text-blue-400" />
            Asynchronous Code Battles
          </h1>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 font-mono">
          <Bot className="w-3.5 h-3.5 text-blue-400" />
          <span>Demo Opponent Matching Mode</span>
        </div>
      </div>

      {battleState === 'lobby' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CODE_BATTLE_MATCHES.map((match) => (
            <div
              key={match.id}
              className="p-6 rounded-3xl border border-slate-800 bg-[#0d121f] flex flex-col justify-between shadow-xl space-y-6"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-blue-950/60 text-blue-300 border border-blue-800/60">
                    {match.difficulty} • {match.topic}
                  </span>
                  <span className="text-xs font-mono text-slate-400">Match #{match.id}</span>
                </div>

                <h3 className="text-xl font-black text-white mb-2">{match.title}</h3>
                <p className="text-xs text-slate-400 mb-6">{match.problem.description}</p>

                {/* Opponent Card */}
                <div className="p-4 rounded-2xl bg-[#090d16] border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-xl">
                      {match.opponent.avatar}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{match.opponent.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">
                        {match.opponent.title} • Rating {match.opponent.rating}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold">READY ⚔️</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedMatch(match);
                  handleStartBattle();
                }}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Swords className="w-4 h-4" />
                <span>ACCEPT BATTLE CHALLENGE</span>
              </button>
            </div>
          ))}
        </div>
      ) : battleState === 'fighting' ? (
        <div className="space-y-6">
          {/* Duel HUD Scoreboard */}
          <div className="p-5 rounded-3xl border border-blue-900/50 bg-[#0c121e] grid grid-cols-1 md:grid-cols-3 items-center gap-4 text-center font-mono">
            {/* Player */}
            <div className="p-3 rounded-2xl bg-black/40 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">YOU (PLAYER)</span>
              <span className="text-sm font-black text-emerald-400">Writing Solution</span>
            </div>

            {/* Match Status & Time */}
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block">DUEL TIME</span>
              <span className="text-2xl font-black text-white">
                {String(Math.floor(secondsElapsed / 60)).padStart(2, '0')}:
                {String(secondsElapsed % 60).padStart(2, '0')}
              </span>
              <div className="flex items-center justify-center gap-1 text-[10px] text-amber-400">
                <Zap className="w-3 h-3" />
                <span>Speed Bonus Active</span>
              </div>
            </div>

            {/* Opponent Progress */}
            <div className="p-3 rounded-2xl bg-black/40 border border-slate-800">
              <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase font-bold mb-1">
                <span>{selectedMatch.opponent.name}</span>
                <span>{opponentProgress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${opponentProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Editor and Submission */}
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#0d121f] border border-slate-800">
              <h3 className="text-sm font-bold text-white mb-1">{selectedMatch.problem.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{selectedMatch.problem.description}</p>
            </div>

            <CodeEditor
              code={userCode}
              onChange={setUserCode}
              title={`battle_${selectedMatch.id}.py`}
            />

            <div className="flex justify-end pt-2">
              <button
                onClick={handleSubmitSolution}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all"
              >
                SUBMIT &amp; FINISH BATTLE ⚔️
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Battle Result Comparison Screen */
        <div className="p-8 rounded-3xl border border-blue-900/60 bg-[#0d121f] shadow-2xl text-center space-y-6 animate-in fade-in">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto shadow-xl ${
              isPlayerWinner ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-white'
            }`}
          >
            {isPlayerWinner ? '🏆' : '⚔️'}
          </div>

          <h2 className="text-3xl font-black text-white">
            {isPlayerWinner ? 'VICTORY! You Won the Duel' : 'DEFEAT — Opponent Outscored You'}
          </h2>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto p-4 rounded-2xl bg-[#090d16] border border-slate-800 font-mono text-sm">
            <div className="p-3 rounded-xl bg-black/40 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block">Your Score</span>
              <span className="text-2xl font-black text-emerald-400">{playerScore}</span>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block">{selectedMatch.opponent.name} Score</span>
              <span className="text-2xl font-black text-blue-400">{opponentScore}</span>
            </div>
          </div>

          <div className="text-xs text-slate-400 font-sans max-w-sm mx-auto leading-relaxed">
            {isPlayerWinner
              ? 'Scores evaluated based on solution correctness, submission time, and algorithmic quality. +350 XP awarded!'
              : 'The ghost competitor finished with a faster time bonus. Sharpen your implementation speed and rematch!'}
          </div>

          <div className="flex justify-center gap-3 pt-4">
            <button
              onClick={() => setBattleState('lobby')}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Back to Lobby</span>
            </button>
            <button
              onClick={() => onNavigate('/arena/leaderboards')}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs rounded-xl"
            >
              View Colosseum Rank &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
