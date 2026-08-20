import React, { useState, useEffect } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { SPEED_RUN_PROBLEMS } from '../../data/arenaData';
import { SpeedRunProblem } from '../../types/arena';
import {
  Zap,
  Clock,
  Award,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Flame,
  Sparkles
} from 'lucide-react';

import { soundManager } from '../../services/soundEffects';

interface SpeedRunPageProps {
  onNavigate: (route: string) => void;
}

export const SpeedRunPage: React.FC<SpeedRunPageProps> = ({ onNavigate }) => {
  const { recordSpeedRunScore, speedRunHighScore } = usePlayer();

  const totalTime = 180; // 3 minutes = 03:00
  const [secondsLeft, setSecondsLeft] = useState(totalTime);
  const [isRunning, setIsRunning] = useState(false);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const currentProblem: SpeedRunProblem | undefined = SPEED_RUN_PROBLEMS[currentProblemIndex];

  // Start Speed Run
  const handleStart = () => {
    soundManager.playClick();
    setSecondsLeft(totalTime);
    setCurrentProblemIndex(0);
    setScore(0);
    setStreak(0);
    setIsFinished(false);
    setFeedback(null);
    setIsRunning(true);
  };

  // Timer countdown with strict cleanup
  useEffect(() => {
    if (!isRunning || secondsLeft <= 0) return;

    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 10 && prev > 1) {
          soundManager.playCountdownTick();
        }
        if (prev <= 1) {
          window.clearInterval(interval);
          handleFinish(score);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [isRunning, secondsLeft, score]);

  const handleFinish = (finalScore: number) => {
    soundManager.playVictory();
    setIsRunning(false);
    setIsFinished(true);
    recordSpeedRunScore(finalScore);
  };

  const handleAnswer = (answer: string) => {
    if (!currentProblem || isFinished) return;

    const isCorrect = answer.trim() === currentProblem.expectedAnswer.trim();
    let pointDelta = 0;

    if (isCorrect) {
      const multiplier = 1 + streak * 0.2;
      pointDelta = Math.round(currentProblem.points * multiplier);
      soundManager.playCombo(streak + 1);
      setScore((s) => s + pointDelta);
      setStreak((st) => st + 1);
      setFeedback({ isCorrect: true, text: `Correct! +${pointDelta} Pts (Combo ${streak + 1}x)` });
    } else {
      soundManager.playError();
      setStreak(0);
      setFeedback({ isCorrect: false, text: `Incorrect! Answer: ${currentProblem.expectedAnswer}` });
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentProblemIndex + 1 < SPEED_RUN_PROBLEMS.length) {
        setCurrentProblemIndex((idx) => idx + 1);
      } else {
        handleFinish(score + pointDelta);
      }
    }, 850);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  return (
    <div className="space-y-6 animate-in fade-in pb-16 max-w-3xl mx-auto">
      {/* Top Banner */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
            <button onClick={() => onNavigate('/arena')} className="hover:text-white">
              Arena
            </button>
            <span>/</span>
            <span className="text-amber-400">Speed Run</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2.5">
            <Zap className="w-6 h-6 text-amber-400 fill-amber-400" />
            Code Speed Run
          </h1>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
          <span className="text-slate-400">Personal Best:</span>
          <span className="text-amber-400 font-bold">{speedRunHighScore} Pts</span>
        </div>
      </div>

      {/* THE PROMPT SPECIFIED HUD BOX */}
      <div className="relative rounded-3xl border-2 border-amber-500/40 bg-[#0c101a] p-6 sm:p-8 shadow-2xl overflow-hidden font-mono select-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[90px] pointer-events-none" />

        {/* Retro Header Screen Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-amber-400 font-black tracking-widest text-sm">
            <Zap className="w-4 h-4 fill-current" />
            <span>SPEED RUN TERMINAL</span>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-950/60 border border-amber-700/60 text-amber-300 text-[11px] font-bold">
            <Flame className="w-3.5 h-3.5 fill-current text-orange-400" />
            <span>STREAK: {streak}x</span>
          </div>
        </div>

        {/* 3 Main Stats Display */}
        <div className="grid grid-cols-3 gap-4 py-6 text-center border-b border-slate-800">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Time</span>
            <span
              className={`text-2xl sm:text-4xl font-black tracking-wider ${
                secondsLeft <= 30 && secondsLeft > 0
                  ? 'text-rose-400 animate-pulse'
                  : 'text-white'
              }`}
            >
              {formattedTime}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Problems</span>
            <span className="text-2xl sm:text-4xl font-black text-sky-400">
              {currentProblemIndex + 1}/{SPEED_RUN_PROBLEMS.length}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Score</span>
            <span className="text-2xl sm:text-4xl font-black text-amber-400">
              {score}
            </span>
          </div>
        </div>

        {/* Game State Body */}
        {!isRunning && !isFinished ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-3xl mx-auto shadow-inner">
              ⚡
            </div>
            <h3 className="text-lg font-black text-white font-sans">Ready for the Sprint?</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed font-sans">
              Answer rapid syntax, slicing, and logic questions. Consecutive correct answers boost your multiplier score up to 3x!
            </p>
            <button
              onClick={handleStart}
              className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm rounded-xl shadow-xl shadow-orange-500/20 transition-all hover:scale-105"
            >
              START SPEED RUN ⏱️
            </button>
          </div>
        ) : isFinished ? (
          <div className="py-8 text-center space-y-4 font-sans animate-in fade-in">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-3xl mx-auto">
              🏆
            </div>
            <h3 className="text-2xl font-black text-white">Sprint Completed!</h3>
            <p className="text-xs text-slate-400 font-mono">
              Final Score: <span className="text-amber-400 font-bold text-lg">{score}</span> Pts
            </p>
            <div className="flex justify-center gap-3 pt-3">
              <button
                onClick={handleStart}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Play Again</span>
              </button>
              <button
                onClick={() => onNavigate('/arena/leaderboards')}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs rounded-xl"
              >
                View Leaderboard &rarr;
              </button>
            </div>
          </div>
        ) : currentProblem ? (
          <div className="pt-6 space-y-6 font-sans">
            {/* Problem Prompt */}
            <div className="p-4 rounded-2xl bg-[#080c14] border border-slate-800">
              <p className="text-xs text-amber-400 font-mono font-bold mb-1">
                CHALLENGE #{currentProblemIndex + 1}
              </p>
              <p className="text-base font-bold text-white mb-3">
                {currentProblem.prompt}
              </p>
              <pre className="p-3 rounded-xl bg-[#04060a] border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto">
                {currentProblem.snippet}
              </pre>
            </div>

            {/* Answer Options */}
            {currentProblem.options && (
              <div className="grid grid-cols-2 gap-3">
                {currentProblem.options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    disabled={feedback !== null}
                    onClick={() => handleAnswer(opt)}
                    className="p-3.5 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 hover:border-slate-700 text-xs sm:text-sm font-mono font-bold text-white transition-all text-left flex items-center justify-between"
                  >
                    <span>{opt}</span>
                    <span className="text-[10px] text-slate-500">{String.fromCharCode(65 + oIdx)}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Instant Feedback Notice */}
            {feedback && (
              <div
                className={`p-3 rounded-xl border font-mono text-xs text-center font-bold flex items-center justify-center gap-2 animate-in fade-in ${
                  feedback.isCorrect
                    ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300'
                    : 'bg-rose-950/60 border-rose-700 text-rose-300'
                }`}
              >
                {feedback.isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                <span>{feedback.text}</span>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
