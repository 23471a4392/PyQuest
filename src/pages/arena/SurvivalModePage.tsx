import React, { useState } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { SURVIVAL_QUESTIONS } from '../../data/arenaData';
import { SurvivalQuestion } from '../../types/arena';
import {
  Flame,
  Heart,
  RotateCcw,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Skull,
  Award,
  Sparkles
} from 'lucide-react';

import { soundManager } from '../../services/soundEffects';

interface SurvivalModePageProps {
  onNavigate: (route: string) => void;
}

export const SurvivalModePage: React.FC<SurvivalModePageProps> = ({ onNavigate }) => {
  const { recordSurvivalResult, survivalHighScore } = usePlayer();

  const [gameState, setGameState] = useState<'lobby' | 'active' | 'game_over' | 'victory'>('lobby');
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [accumulatedScore, setAccumulatedScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answeredFeedback, setAnsweredFeedback] = useState<{ isCorrect: boolean; explanation: string } | null>(null);

  const currentQ: SurvivalQuestion | undefined = SURVIVAL_QUESTIONS[currentLevelIndex];

  const handleStartGame = () => {
    soundManager.playClick();
    setGameState('active');
    setCurrentLevelIndex(0);
    setLives(3);
    setAccumulatedScore(0);
    setSelectedOption(null);
    setAnsweredFeedback(null);
  };

  const handleChooseAnswer = (optIndex: number) => {
    if (!currentQ || answeredFeedback !== null) return;

    setSelectedOption(optIndex);
    const isCorrect = optIndex === currentQ.correctIndex;

    if (isCorrect) {
      soundManager.playSuccess();
      const newScore = accumulatedScore + currentQ.xpValue;
      setAccumulatedScore(newScore);
      setAnsweredFeedback({ isCorrect: true, explanation: currentQ.explanation });

      setTimeout(() => {
        setAnsweredFeedback(null);
        setSelectedOption(null);

        if (currentLevelIndex + 1 < SURVIVAL_QUESTIONS.length) {
          setCurrentLevelIndex((lvl) => lvl + 1);
        } else {
          soundManager.playVictory();
          setGameState('victory');
          recordSurvivalResult(SURVIVAL_QUESTIONS.length, newScore);
        }
      }, 1000);
    } else {
      soundManager.playError();
      const remainingLives = lives - 1;
      setLives(remainingLives);
      setAnsweredFeedback({ isCorrect: false, explanation: currentQ.explanation });

      setTimeout(() => {
        setAnsweredFeedback(null);
        setSelectedOption(null);

        if (remainingLives <= 0) {
          setGameState('game_over');
          recordSurvivalResult(currentLevelIndex + 1, accumulatedScore);
        } else {
          // Continue to next question or remain
          if (currentLevelIndex + 1 < SURVIVAL_QUESTIONS.length) {
            setCurrentLevelIndex((lvl) => lvl + 1);
          } else {
            setGameState('game_over');
            recordSurvivalResult(currentLevelIndex + 1, accumulatedScore);
          }
        }
      }, 1200);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in pb-16 max-w-3xl mx-auto">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
            <button onClick={() => onNavigate('/arena')} className="hover:text-white">
              Arena
            </button>
            <span>/</span>
            <span className="text-rose-400">Survival Gauntlet</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2.5">
            <Flame className="w-6 h-6 text-rose-500 fill-rose-500" />
            Python Survival Gauntlet
          </h1>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
          <span className="text-slate-400">Survival Record:</span>
          <span className="text-rose-400 font-bold">Level {survivalHighScore}</span>
        </div>
      </div>

      {/* Main Gauntlet Card */}
      <div className="relative rounded-3xl border-2 border-rose-900/50 bg-[#0d1017] p-6 sm:p-8 shadow-2xl overflow-hidden font-sans">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 blur-[110px] pointer-events-none" />

        {/* HUD Top Bar: Lives and Level Counter */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800">
          {/* Hearts Display */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">Lives:</span>
            <div className="flex items-center gap-1.5 text-xl">
              {Array.from({ length: 3 }).map((_, i) => (
                <Heart
                  key={i}
                  className={`w-6 h-6 transition-all duration-300 ${
                    i < lives
                      ? 'text-rose-500 fill-rose-500 scale-100 animate-pulse'
                      : 'text-slate-700 fill-slate-800 scale-90'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="px-3 py-1 rounded-xl bg-black/50 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">LEVEL</span>
              <span className="text-sm font-black text-white">
                {currentLevelIndex + 1} / {SURVIVAL_QUESTIONS.length}
              </span>
            </div>

            <div className="px-3 py-1 rounded-xl bg-black/50 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">SCORE</span>
              <span className="text-sm font-black text-amber-400">{accumulatedScore} XP</span>
            </div>
          </div>
        </div>

        {/* 1. LOBBY STATE */}
        {gameState === 'lobby' && (
          <div className="py-10 text-center space-y-5">
            <div className="w-16 h-16 rounded-3xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-3xl mx-auto shadow-inner">
              🔥
            </div>
            <h2 className="text-2xl font-black text-white">Enter the Survival Gauntlet</h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Answer escalating Python questions starting from Easy up to Expert. You have only 3 Lives (❤️❤️❤️). One mistake costs a life. How far will your mastery carry you?
            </p>

            {/* Escalating difficulty preview */}
            <div className="flex flex-wrap items-center justify-center gap-2 py-2 text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60">Lvl 1: Easy</span>
              <span>&rarr;</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60">Lvl 2: Easy</span>
              <span>&rarr;</span>
              <span className="px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/60">Lvl 3: Medium</span>
              <span>&rarr;</span>
              <span className="px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/60">Lvl 4: Medium</span>
              <span>&rarr;</span>
              <span className="px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-800/60">Lvl 5: Hard</span>
              <span>&rarr;</span>
              <span className="px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/60">Lvl 6: Expert</span>
            </div>

            <button
              onClick={handleStartGame}
              className="px-8 py-3.5 bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white font-black text-xs rounded-xl shadow-xl shadow-rose-600/20 transition-all hover:scale-105"
            >
              START GAUNTLET (3 LIVES) 🛡️
            </button>
          </div>
        )}

        {/* 2. ACTIVE GAMEPLAY */}
        {gameState === 'active' && currentQ && (
          <div className="py-6 space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between text-xs font-mono">
              <span
                className={`font-bold px-2.5 py-0.5 rounded-full border ${
                  currentQ.difficulty === 'Easy'
                    ? 'bg-emerald-950/50 text-emerald-300 border-emerald-800/50'
                    : currentQ.difficulty === 'Medium'
                    ? 'bg-amber-950/50 text-amber-300 border-amber-800/50'
                    : currentQ.difficulty === 'Hard'
                    ? 'bg-rose-950/50 text-rose-300 border-rose-800/50'
                    : 'bg-purple-950/50 text-purple-300 border-purple-800/50'
                }`}
              >
                TIER: {currentQ.difficulty.toUpperCase()}
              </span>

              <span className="text-[#ffd43b] font-bold">+{currentQ.xpValue} XP Bounty</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
              {currentQ.question}
            </h3>

            {currentQ.codeSnippet && (
              <pre className="p-4 rounded-2xl bg-[#090d16] border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto">
                {currentQ.codeSnippet}
              </pre>
            )}

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt, oIdx) => {
                const isChosen = selectedOption === oIdx;
                let btnStyle = 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-200';

                if (answeredFeedback) {
                  if (oIdx === currentQ.correctIndex) {
                    btnStyle = 'bg-emerald-950/60 border-emerald-600 text-emerald-200';
                  } else if (isChosen) {
                    btnStyle = 'bg-rose-950/60 border-rose-600 text-rose-200';
                  }
                } else if (isChosen) {
                  btnStyle = 'bg-blue-900/60 border-blue-600 text-white';
                }

                return (
                  <button
                    key={oIdx}
                    disabled={answeredFeedback !== null}
                    onClick={() => handleChooseAnswer(oIdx)}
                    className={`w-full p-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all text-left flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {answeredFeedback && oIdx === currentQ.correctIndex && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                    {answeredFeedback && isChosen && oIdx !== currentQ.correctIndex && (
                      <XCircle className="w-4 h-4 text-rose-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {answeredFeedback && (
              <div
                className={`p-3.5 rounded-xl border text-xs leading-relaxed animate-in fade-in ${
                  answeredFeedback.isCorrect
                    ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
                    : 'bg-rose-950/40 border-rose-800/60 text-rose-300'
                }`}
              >
                <span className="font-bold block mb-0.5">
                  {answeredFeedback.isCorrect ? '✅ Correct! Advancing...' : '❌ Incorrect! Heart Lost (❤️)'}
                </span>
                <span className="text-slate-400">{answeredFeedback.explanation}</span>
              </div>
            )}
          </div>
        )}

        {/* 3. GAME OVER STATE */}
        {gameState === 'game_over' && (
          <div className="py-10 text-center space-y-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-3xl bg-rose-950 border border-rose-800 text-rose-400 flex items-center justify-center text-3xl mx-auto shadow-xl">
              <Skull className="w-8 h-8" />
            </div>

            <h2 className="text-3xl font-black text-rose-400">GAME OVER</h2>
            <p className="text-xs text-slate-400">You lost all 3 lives in the gauntlet.</p>

            <div className="p-4 rounded-2xl bg-[#090d16] border border-slate-800 max-w-xs mx-auto font-mono text-xs space-y-1">
              <p className="text-slate-400">SURVIVED UNTIL</p>
              <p className="text-xl font-black text-white">Level {currentLevelIndex + 1}</p>
              <p className="text-amber-400 font-bold pt-1">Total Score: +{accumulatedScore} XP</p>
            </div>

            <div className="flex justify-center gap-3 pt-4">
              <button
                onClick={handleStartGame}
                className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart Gauntlet</span>
              </button>
              <button
                onClick={() => onNavigate('/arena')}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl"
              >
                Back to Arena
              </button>
            </div>
          </div>
        )}

        {/* 4. VICTORY STATE */}
        {gameState === 'victory' && (
          <div className="py-10 text-center space-y-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-4xl mx-auto shadow-xl">
              👑
            </div>

            <h2 className="text-3xl font-black text-white">SURVIVAL CHAMPION!</h2>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Incredible fortitude! You survived all 6 levels of the Python gauntlet and conquered the Expert tier.
            </p>

            <div className="p-4 rounded-2xl bg-[#090d16] border border-slate-800 max-w-xs mx-auto font-mono text-xs space-y-1">
              <p className="text-emerald-400 font-bold">ALL 6 LEVELS CLEARED</p>
              <p className="text-2xl font-black text-[#ffd43b]">+{accumulatedScore} XP</p>
            </div>

            <div className="flex justify-center gap-3 pt-4">
              <button
                onClick={handleStartGame}
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl"
              >
                Play Again
              </button>
              <button
                onClick={() => onNavigate('/arena/leaderboards')}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs rounded-xl"
              >
                Check Leaderboards &rarr;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
