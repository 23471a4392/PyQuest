import React, { useState, useEffect } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { PRACTICE_PROBLEMS_DATA } from '../../data/practiceProblems';
import { PracticeProblem, EvaluationReport } from '../../types/learning';
import { CodeEditor } from '../../components/common/CodeEditor';
import { EvaluationResult } from '../../components/common/EvaluationResult';
import { apiService } from '../../services/api';
import {
  Code2,
  Search,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Coins,
  Award,
  Zap
} from 'lucide-react';

interface PracticeLabPageProps {
  initialProblemId?: string;
  onNavigate: (route: string) => void;
}

export const PracticeLabPage: React.FC<PracticeLabPageProps> = ({
  initialProblemId,
  onNavigate
}) => {
  const { solvedProblems, markProblemSolved } = usePlayer();

  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(
    initialProblemId || null
  );
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Problem-solving state
  const [activeProblem, setActiveProblem] = useState<PracticeProblem | null>(null);
  const [userCode, setUserCode] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalReport, setEvalReport] = useState<EvaluationReport | null>(null);
  const [openHintIndex, setOpenHintIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedProblemId) {
      const found = PRACTICE_PROBLEMS_DATA.find((p) => p.id === selectedProblemId);
      if (found) {
        setActiveProblem(found);
        setUserCode(found.starterCode);
        setEvalReport(null);
        setOpenHintIndex(null);
      }
    } else {
      setActiveProblem(null);
    }
  }, [selectedProblemId]);

  const handleRunEvaluation = async () => {
    if (!activeProblem) return;
    setIsEvaluating(true);

    try {
      const report = await apiService.evaluateSubmission(activeProblem.id, userCode);
      setEvalReport(report);

      if (report.status === 'passed') {
        markProblemSolved(
          activeProblem.id,
          activeProblem.topicId,
          activeProblem.difficulty,
          activeProblem.xpReward,
          activeProblem.coinsReward
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsEvaluating(false);
    }
  };

  // Filtered problems list
  const filteredProblems = PRACTICE_PROBLEMS_DATA.filter((p) => {
    const matchesDiff = filterDifficulty === 'All' || p.difficulty === filterDifficulty;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDiff && matchesSearch;
  });

  // If in Split IDE mode:
  if (activeProblem) {
    const isSolved = solvedProblems.includes(activeProblem.id);

    return (
      <div className="space-y-6 animate-in fade-in pb-16">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedProblemId(null)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                    activeProblem.difficulty === 'Easy'
                      ? 'bg-emerald-950/50 text-emerald-300 border-emerald-800/60'
                      : activeProblem.difficulty === 'Medium'
                      ? 'bg-amber-950/50 text-amber-300 border-amber-800/60'
                      : 'bg-rose-950/50 text-rose-300 border-rose-800/60'
                  }`}
                >
                  {activeProblem.difficulty}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Topic: {activeProblem.topicId.replace('topic-', '')}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                {activeProblem.title}
                {isSolved && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Solved
                  </span>
                )}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
              <span className="text-[#ffd43b] font-bold">+{activeProblem.xpReward} XP</span>
              <span className="text-slate-500">•</span>
              <span className="text-amber-400 font-bold">+{activeProblem.coinsReward} Coins</span>
            </div>
          </div>
        </div>

        {/* Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Description, Constraints, Examples, Hints */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 rounded-3xl border border-slate-800 bg-[#0d121f] shadow-xl space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Problem Description
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {activeProblem.description}
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div>
                  <span className="font-bold text-slate-400 block mb-0.5">Input Format:</span>
                  <p className="text-slate-300 font-mono">{activeProblem.inputFormat}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-400 block mb-0.5">Output Format:</span>
                  <p className="text-slate-300 font-mono">{activeProblem.outputFormat}</p>
                </div>
                {activeProblem.constraints && activeProblem.constraints.length > 0 && (
                  <div>
                    <span className="font-bold text-slate-400 block mb-0.5">Constraints:</span>
                    <ul className="list-disc list-inside text-slate-400 space-y-0.5 font-mono">
                      {activeProblem.constraints.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Examples */}
              <div className="space-y-3 pt-3 border-t border-slate-800">
                <span className="font-bold text-slate-400 text-xs uppercase tracking-wider block">
                  Example Test Cases:
                </span>
                {activeProblem.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-[#090d16] border border-slate-800 font-mono text-xs space-y-1.5"
                  >
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Input:</span>
                      <p className="text-slate-200">{ex.input}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Output:</span>
                      <p className="text-emerald-400">{ex.output}</p>
                    </div>
                    {ex.explanation && (
                      <p className="text-[11px] text-slate-400 font-sans pt-1 border-t border-slate-800/80">
                        {ex.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Hints Accordion */}
              {activeProblem.hints.length > 0 && (
                <div className="space-y-2 pt-3 border-t border-slate-800">
                  <span className="font-bold text-slate-400 text-xs uppercase tracking-wider block">
                    Hints &amp; Clues:
                  </span>
                  {activeProblem.hints.map((hint, hIdx) => {
                    const isOpen = openHintIndex === hIdx;
                    return (
                      <div
                        key={hIdx}
                        className="rounded-xl border border-slate-800 bg-[#090d16] overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenHintIndex(isOpen ? null : hIdx)}
                          className="w-full px-3 py-2 text-left text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-between"
                        >
                          <span className="flex items-center gap-1.5 text-amber-400">
                            <Sparkles className="w-3.5 h-3.5" />
                            Hint {hIdx + 1}
                          </span>
                          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                        {isOpen && (
                          <div className="px-3 pb-3 text-xs text-slate-400 border-t border-slate-800/80 pt-2 font-sans">
                            {hint}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Code Editor & Evaluation Output */}
          <div className="lg:col-span-7 space-y-5">
            <CodeEditor
              code={userCode}
              onChange={setUserCode}
              onRun={handleRunEvaluation}
              isRunning={isEvaluating}
              onReset={() => setUserCode(activeProblem.starterCode)}
              title={`${activeProblem.id}.py`}
            />

            <EvaluationResult report={evalReport} isLoading={isEvaluating} />
          </div>
        </div>
      </div>
    );
  }

  // Otherwise: Problem Directory Catalog
  return (
    <div className="space-y-8 animate-in fade-in pb-16">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
            <button onClick={() => onNavigate('/learning')} className="hover:text-white">
              Learning
            </button>
            <span>/</span>
            <span className="text-[#ffd43b]">Practice Lab</span>
          </div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            Python Practice Lab
          </h1>
          <p className="text-xs text-slate-400">
            Interactive coding challenges across all difficulty tiers. Each verified solution awards XP, Coins &amp; Skill Mastery.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-white">
              {solvedProblems.length} / {PRACTICE_PROBLEMS_DATA.length} Solved
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search problems, keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#4b8bbe]"
          />
        </div>

        {/* Difficulty Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800 self-start md:self-auto">
          {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
            <button
              key={diff}
              onClick={() => setFilterDifficulty(diff)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterDifficulty === diff
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Problems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProblems.map((problem) => {
          const isSolved = solvedProblems.includes(problem.id);

          return (
            <div
              key={problem.id}
              onClick={() => setSelectedProblemId(problem.id)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer group shadow-md flex flex-col justify-between ${
                isSolved
                  ? 'bg-[#0d1522] border-emerald-900/40 hover:border-emerald-600/60'
                  : 'bg-[#0d121f] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                      problem.difficulty === 'Easy'
                        ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/50'
                        : problem.difficulty === 'Medium'
                        ? 'bg-amber-950/40 text-amber-300 border-amber-800/50'
                        : 'bg-rose-950/40 text-rose-300 border-rose-800/50'
                    }`}
                  >
                    {problem.difficulty}
                  </span>

                  {isSolved ? (
                    <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Solved
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono text-[#ffd43b] font-bold">
                      +{problem.xpReward} XP
                    </span>
                  )}
                </div>

                <h3 className="text-base font-black text-white group-hover:text-[#ffd43b] transition-colors mb-1.5">
                  {problem.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                  {problem.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-slate-400">
                  {problem.testCases.length} Test Cases
                </span>
                <span className="font-bold text-emerald-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Solve &rarr;
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
