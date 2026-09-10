import React, { useState } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { ARENA_BOSSES_DATA } from '../../data/arenaData';
import { Boss, BossChallenge } from '../../types/arena';
import { CodeEditor } from '../../components/common/CodeEditor';
import {
  Skull,
  Shield,
  Award,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Flame,
  Swords,
  Heart
} from 'lucide-react';

import { soundManager } from '../../services/soundEffects';

interface BossBattlePageProps {
  onNavigate: (route: string) => void;
}

export const BossBattlePage: React.FC<BossBattlePageProps> = ({ onNavigate }) => {
  const { recordBossDefeat, bossVictories } = usePlayer();

  const [activeBossIndex, setActiveBossIndex] = useState(0);
  const boss: Boss = ARENA_BOSSES_DATA[activeBossIndex] || ARENA_BOSSES_DATA[0];

  const [bossHp, setBossHp] = useState(boss.maxHp);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [userCode, setUserCode] = useState(boss.challenges[0].starterCode);
  const [isStriking, setIsStriking] = useState(false);
  const [battleMessage, setBattleMessage] = useState<string | null>(null);
  const [isDefeated, setIsDefeated] = useState(false);

  const currentChallenge: BossChallenge | undefined = boss.challenges[currentChallengeIndex];
  const isAlreadyDefeated = bossVictories.includes(boss.id);

  const handleReset = (newBossIdx = activeBossIndex) => {
    setActiveBossIndex(newBossIdx);
    const b = ARENA_BOSSES_DATA[newBossIdx] || ARENA_BOSSES_DATA[0];
    setBossHp(b.maxHp);
    setCurrentChallengeIndex(0);
    setUserCode(b.challenges[0].starterCode);
    setIsStriking(false);
    setBattleMessage(null);
    setIsDefeated(false);
  };

  const handleAttackBoss = () => {
    if (!currentChallenge || isDefeated) return;

    setIsStriking(true);
    setBattleMessage('⚔️ Channeling Pythonic Strike...');
    soundManager.playBossHit();

    setTimeout(() => {
      const damage = currentChallenge.damageToBoss;
      const nextHp = Math.max(0, bossHp - damage);
      setBossHp(nextHp);

      if (nextHp === 0) {
        setIsDefeated(true);
        soundManager.playVictory();
        setBattleMessage(`💥 CRITICAL FINISHER! ${boss.name} DEFEATED!`);
        recordBossDefeat(boss.id, boss.rewardXP, boss.rewardCoins, boss.rewardBadgeId);
      } else {
        soundManager.playSuccess();
        setBattleMessage(`⚔️ DIRECT HIT! -${damage} HP Dealt to ${boss.name}!`);
        if (currentChallengeIndex + 1 < boss.challenges.length) {
          const nextIdx = currentChallengeIndex + 1;
          setCurrentChallengeIndex(nextIdx);
          setUserCode(boss.challenges[nextIdx].starterCode);
        }
      }
      setIsStriking(false);
    }, 700);
  };

  const hpPercentage = Math.round((bossHp / boss.maxHp) * 100);

  return (
    <div className="space-y-6 animate-in fade-in pb-16 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
            <button onClick={() => onNavigate('/arena')} className="hover:text-white">
              Arena
            </button>
            <span>/</span>
            <span className="text-emerald-400">Boss Raid</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2.5">
            <Skull className="w-6 h-6 text-emerald-400" />
            Python Boss Colosseum
          </h1>
        </div>

        {/* Boss Switcher */}
        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
          {ARENA_BOSSES_DATA.map((b, idx) => (
            <button
              key={b.id}
              onClick={() => handleReset(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeBossIndex === idx
                  ? 'bg-slate-800 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {b.avatar} {b.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* BOSS ARENA CHAMBER */}
      <div className="relative rounded-3xl border-2 border-emerald-900/60 bg-gradient-to-b from-[#0b1715] to-[#0c101a] p-6 sm:p-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 blur-[120px] pointer-events-none" />

        {/* Boss Header & Animated Avatar */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div
            className={`w-24 h-24 rounded-3xl bg-slate-900/80 border border-emerald-500/40 flex items-center justify-center text-5xl shadow-2xl transition-transform duration-300 ${
              isStriking ? 'scale-90 rotate-6 border-rose-500' : 'hover:scale-105'
            }`}
          >
            {boss.avatar}
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
              {boss.name}
            </h2>
            <p className="text-xs text-emerald-400 font-mono font-bold uppercase tracking-wider">
              {boss.title} • Weakness: {boss.weakness}
            </p>
          </div>

          {/* BOSS HP BAR (PROMPT SPECIFICATION) */}
          <div className="w-full max-w-lg space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-rose-400 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 fill-rose-500" />
                BOSS HP
              </span>
              <span className={bossHp > 30 ? 'text-emerald-400' : 'text-rose-400 animate-pulse'}>
                {bossHp} / {boss.maxHp} ({hpPercentage}%)
              </span>
            </div>

            <div className="w-full h-4 bg-slate-950 rounded-full border border-slate-800 p-0.5 overflow-hidden shadow-inner">
              <div
                className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500"
                style={{ width: `${hpPercentage}%` }}
              />
            </div>
          </div>

          {/* Attack / Battle Log Message */}
          {battleMessage && (
            <div className="px-4 py-2 rounded-xl bg-black/60 border border-emerald-500/30 text-xs font-mono font-bold text-emerald-300 animate-in fade-in">
              {battleMessage}
            </div>
          )}
        </div>

        {/* Chamber Challenge Body */}
        {!isDefeated && currentChallenge ? (
          <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-6">
            <div className="p-4 rounded-2xl bg-[#090d16] border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 font-bold">
                  STAGE {currentChallengeIndex + 1} OF {boss.challenges.length}
                </span>
                <span className="text-[#ffd43b] font-bold">
                  ⚔️ Deals -{currentChallenge.damageToBoss} HP on Hit
                </span>
              </div>
              <h3 className="text-base font-bold text-white">{currentChallenge.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{currentChallenge.prompt}</p>
            </div>

            <CodeEditor
              code={userCode}
              onChange={setUserCode}
              title={`strike_chamber_${currentChallengeIndex + 1}.py`}
            />

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400 font-mono">
                💡 Hint: {currentChallenge.hint}
              </span>

              <button
                disabled={isStriking}
                onClick={handleAttackBoss}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 hover:scale-105"
              >
                <Swords className="w-4 h-4" />
                <span>UNLEASH STRIKE (-{currentChallenge.damageToBoss} HP)</span>
              </button>
            </div>
          </div>
        ) : (
          /* Boss Defeated Celebration Screen */
          <div className="mt-8 pt-8 border-t border-slate-800 text-center space-y-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-4xl mx-auto shadow-2xl">
              🏆
            </div>

            <h3 className="text-3xl font-black text-white">
              🐉 {boss.name.toUpperCase()} DEFEATED!
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              You executed flawless Python loops and dismantled the monster&apos;s defenses. You have been awarded legendary status in the Colosseum!
            </p>

            <div className="inline-flex items-center gap-4 p-4 rounded-2xl bg-[#090d16] border border-slate-800 font-mono text-xs">
              <span className="text-[#ffd43b] font-bold text-sm">+{boss.rewardXP} XP</span>
              <span className="text-slate-600">•</span>
              <span className="text-amber-400 font-bold text-sm">+{boss.rewardCoins} Coins</span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400 font-bold">Loop Master Badge 🎖️</span>
            </div>

            <div className="flex justify-center gap-3 pt-4">
              <button
                onClick={() => handleReset()}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Rematch Boss</span>
              </button>

              <button
                onClick={() => onNavigate('/profile')}
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs rounded-xl"
              >
                View Badges in Profile &rarr;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
