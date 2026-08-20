import React, { useState } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { TOPIC_TESTS_DATA } from '../../data/topicTests';
import { TopicTest, TestSubmissionResult } from '../../types/learning';
import { CountdownTimer } from '../../components/common/CountdownTimer';
import {
  CheckCircle2,
  XCircle,
  Clock,
  ArrowLeft,
  ArrowRight,
  Award,
  AlertCircle,
  RotateCcw,
  Sparkles,
  Play
} from 'lucide-react';

interface TopicTestsPageProps {
  initialTestId?: string;
  onNavigate: (route: string) => void;
}

export const TopicTestsPage: React.FC<TopicTestsPageProps> = ({ initialTestId, onNavigate }) => {
  const { testScores, recordTestResult } = usePlayer();

  const [activeTest, setActiveTest] = useState<TopicTest | null>(() => {
    if (initialTestId) {
      return TOPIC_TESTS_DATA.find((t) => t.id === initialTestId) || null;
    }
    return null;
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [isTestActive, setIsTestActive] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<TestSubmissionResult | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const startTest = (test: TopicTest) => {
    setActiveTest(test);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setIsTestActive(true);
    setSubmissionResult(null);
    setShowConfirmModal(false);
  };

  const handleSelectAnswer = (qId: string, optionIndex: number) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: optionIndex }));
  };

  const handleSubmitTest = () => {
    if (!activeTest) return;

    let correctCount = 0;
    activeTest.questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / activeTest.questions.length) * 100);
    const passed = percentage >= activeTest.passPercentage;
    const xpEarned = passed ? activeTest.xpReward : Math.round(activeTest.xpReward * 0.3);
    const coinsEarned = passed ? activeTest.coinsReward : 10;

    const result: TestSubmissionResult = {
      testId: activeTest.id,
      score: correctCount,
      totalQuestions: activeTest.questions.length,
      correctCount,
      percentage,
      passed,
      xpEarned,
      coinsEarned,
      userAnswers,
      completedAt: new Date().toISOString()
    };

    setSubmissionResult(result);
    setIsTestActive(false);
    setShowConfirmModal(false);

    // Update global reactive player state
    recordTestResult(result, activeTest.topicId);
  };

  // Test Taking Interface
  if (isTestActive && activeTest) {
    const q = activeTest.questions[currentQuestionIndex];
    const answeredCount = Object.keys(userAnswers).length;

    return (
      <div className="space-y-6 animate-in fade-in pb-16 max-w-4xl mx-auto">
        {/* Test Header with Timer */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div>
            <h2 className="text-sm font-black text-white">{activeTest.title}</h2>
            <p className="text-xs text-slate-400">
              Question {currentQuestionIndex + 1} of {activeTest.questions.length} • {answeredCount} answered
            </p>
          </div>

          <CountdownTimer
            initialSeconds={activeTest.durationMinutes * 60}
            onExpire={handleSubmitTest}
            warningThresholdSeconds={60}
          />
        </div>

        {/* Question Selector Palette */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {activeTest.questions.map((ques, idx) => {
            const isAnswered = userAnswers[ques.id] !== undefined;
            const isCurrent = currentQuestionIndex === idx;

            return (
              <button
                key={ques.id}
                onClick={() => setCurrentQuestionIndex(idx)}
                className={`w-9 h-9 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center ${
                  isCurrent
                    ? 'bg-[#306998] text-white ring-2 ring-[#4b8bbe]'
                    : isAnswered
                    ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Question Card */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-[#0d121f] shadow-2xl space-y-6">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>QUESTION {currentQuestionIndex + 1}</span>
            <span>Single Choice</span>
          </div>

          <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
            {q.text}
          </p>

          {q.codeSnippet && (
            <pre className="p-4 rounded-2xl bg-[#090d16] border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto">
              {q.codeSnippet}
            </pre>
          )}

          {/* Options */}
          <div className="space-y-3">
            {q.options.map((opt, oIdx) => {
              const isSelected = userAnswers[q.id] === oIdx;

              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectAnswer(q.id, oIdx)}
                  className={`w-full p-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all text-left flex items-center gap-3 ${
                    isSelected
                      ? 'bg-[#306998]/30 border-[#4b8bbe] text-white shadow-md'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                      isSelected
                        ? 'border-[#ffd43b] bg-[#ffd43b] text-slate-950'
                        : 'border-slate-700 text-slate-400'
                    }`}
                  >
                    {String.fromCharCode(65 + oIdx)}
                  </div>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-4">
          <button
            disabled={currentQuestionIndex === 0}
            onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-white rounded-xl transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-3">
            {currentQuestionIndex < activeTest.questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                className="px-5 py-2.5 bg-gradient-to-r from-[#306998] to-[#4b8bbe] hover:from-[#23537e] hover:to-[#306998] text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setShowConfirmModal(true)}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all"
              >
                Submit Test
              </button>
            )}
          </div>
        </div>

        {/* Confirm Submit Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
            <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#0d121f] p-6 text-center space-y-4 shadow-2xl">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-black text-white">Submit Test?</h3>
              <p className="text-xs text-slate-400">
                You have answered {answeredCount} of {activeTest.questions.length} questions. Are you ready to submit your test for evaluation?
              </p>

              <div className="flex items-center gap-3 pt-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors"
                >
                  Return to Questions
                </button>
                <button
                  onClick={handleSubmitTest}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition-colors"
                >
                  Yes, Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Submission Results View
  if (submissionResult && activeTest) {
    return (
      <div className="space-y-6 animate-in fade-in pb-16 max-w-4xl mx-auto">
        {/* Results Banner */}
        <div
          className={`p-8 rounded-3xl border text-center space-y-4 shadow-2xl ${
            submissionResult.passed
              ? 'bg-emerald-950/30 border-emerald-800/60'
              : 'bg-amber-950/30 border-amber-800/60'
          }`}
        >
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto shadow-lg ${
              submissionResult.passed
                ? 'bg-emerald-500 text-slate-950'
                : 'bg-amber-500 text-slate-950'
            }`}
          >
            {submissionResult.passed ? '🏆' : '📚'}
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {submissionResult.passed ? 'Mastery Test Passed!' : 'Review & Try Again'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            {submissionResult.passed
              ? `Outstanding! You achieved ${submissionResult.percentage}% and demonstrated full topic mastery. Arena competition unlocked!`
              : `You scored ${submissionResult.percentage}%. The pass mark is ${activeTest.passPercentage}%. Review explanations below and retake to unlock.`}
          </p>

          <div className="flex items-center justify-center gap-6 pt-4 text-xs font-mono">
            <div className="p-3 rounded-xl bg-black/40 border border-white/10">
              <span className="text-slate-400 block text-[10px]">SCORE</span>
              <span className="text-lg font-black text-white">
                {submissionResult.correctCount} / {submissionResult.totalQuestions}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-white/10">
              <span className="text-slate-400 block text-[10px]">PERCENTAGE</span>
              <span
                className={`text-lg font-black ${
                  submissionResult.passed ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {submissionResult.percentage}%
              </span>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-white/10">
              <span className="text-slate-400 block text-[10px]">XP EARNED</span>
              <span className="text-lg font-black text-[#ffd43b]">
                +{submissionResult.xpEarned} XP
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={() => startTest(activeTest)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Test</span>
            </button>

            <button
              onClick={() => {
                setActiveTest(null);
                setSubmissionResult(null);
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#306998] to-[#4b8bbe] text-white font-extrabold text-xs shadow-md transition-all"
            >
              Back to Tests Catalog
            </button>

            <button
              onClick={() => onNavigate('/arena')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-orange-600 text-white font-extrabold text-xs shadow-md transition-all"
            >
              Check Arena Unlocks &rarr;
            </button>
          </div>
        </div>

        {/* Detailed Question Review */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white">Question Review &amp; Explanations</h3>

          {activeTest.questions.map((ques, idx) => {
            const userChoice = submissionResult.userAnswers[ques.id];
            const isCorrect = userChoice === ques.correctIndex;

            return (
              <div
                key={ques.id}
                className={`p-5 rounded-2xl border ${
                  isCorrect
                    ? 'border-emerald-900/50 bg-emerald-950/10'
                    : 'border-rose-900/50 bg-rose-950/10'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold mb-2">
                  {isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-400" />
                  )}
                  <span className={isCorrect ? 'text-emerald-400' : 'text-rose-400'}>
                    Question {idx + 1}: {isCorrect ? 'Correct (+1 Point)' : 'Incorrect'}
                  </span>
                </div>

                <p className="text-sm font-semibold text-white mb-3">{ques.text}</p>

                <div className="text-xs space-y-1 text-slate-300 font-mono mb-3">
                  <p>Your Answer: {userChoice !== undefined ? ques.options[userChoice] : 'None'}</p>
                  <p className="text-emerald-400">Correct Answer: {ques.options[ques.correctIndex]}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 text-xs text-slate-400 font-sans">
                  <strong className="text-slate-200">Explanation: </strong>
                  {ques.explanation}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Tests Catalog View
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
            <span className="text-[#ffd43b]">Topic Tests</span>
          </div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            Topic Mastery Tests
          </h1>
          <p className="text-xs text-slate-400">
            Timed knowledge assessments verifying your conceptual and syntactic comprehension. Achieve 80%+ to master topics and unlock competitions.
          </p>
        </div>
      </div>

      {/* Test Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TOPIC_TESTS_DATA.map((test) => {
          const score = testScores[test.id];
          const hasTaken = score !== undefined;
          const hasPassed = hasTaken && score >= test.passPercentage;

          return (
            <div
              key={test.id}
              className="p-6 rounded-3xl border border-slate-800 bg-[#0d121f] flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {test.worldId.replace('-', ' ').toUpperCase()}
                  </span>

                  {hasPassed ? (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Passed ({score}%)
                    </span>
                  ) : hasTaken ? (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      Best: {score}%
                    </span>
                  ) : (
                    <span className="text-xs font-mono text-slate-400">Not attempted</span>
                  )}
                </div>

                <h3 className="text-lg font-black text-white mb-2">{test.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {test.description}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-800/80">
                <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs text-slate-400">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800/80">
                    <span className="text-[10px] block text-slate-400">QUESTIONS</span>
                    <span className="text-slate-200 font-bold">{test.totalQuestions}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800/80">
                    <span className="text-[10px] block text-slate-400">DURATION</span>
                    <span className="text-slate-200 font-bold">{test.durationMinutes}m</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800/80">
                    <span className="text-[10px] block text-slate-400">PASS MARK</span>
                    <span className="text-slate-200 font-bold">{test.passPercentage}%</span>
                  </div>
                </div>

                <button
                  onClick={() => startTest(test)}
                  className="w-full py-3 bg-gradient-to-r from-[#306998] to-[#4b8bbe] hover:from-[#23537e] hover:to-[#306998] text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{hasTaken ? 'Retake Test' : 'Start Mastery Test'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
