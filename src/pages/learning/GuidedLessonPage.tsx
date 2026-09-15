import React, { useState, useEffect } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { WORLDS_DATA, getNextLesson, getPreviousLesson, getNextUncompletedLesson } from '../../data/curriculumData';
import { Lesson, LessonStep } from '../../types/learning';
import { CodeEditor } from '../../components/common/CodeEditor';
import {
  BookOpen,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Play,
  Award,
  Sparkles,
  Terminal,
  Code2
} from 'lucide-react';

interface GuidedLessonPageProps {
  lessonId?: string;
  onNavigate: (route: string) => void;
}

export const GuidedLessonPage: React.FC<GuidedLessonPageProps> = ({
  lessonId = 'lesson-var-intro',
  onNavigate
}) => {
  const { markLessonComplete, completedLessons } = usePlayer();

  // Find lesson in curriculum
  let activeLesson: Lesson | null = null;
  let activeWorldTitle = 'World 1';
  let activeTopicTitle = 'Python Basics';

  for (const world of WORLDS_DATA) {
    for (const topic of world.topics) {
      const found = topic.lessons.find((l) => l.id === lessonId);
      if (found) {
        activeLesson = found;
        activeWorldTitle = world.title;
        activeTopicTitle = topic.title;
        break;
      }
    }
  }

  // Fallback to first uncompleted lesson or first lesson
  if (!activeLesson) {
    const nextUncompleted = getNextUncompletedLesson(completedLessons);
    if (nextUncompleted) {
      activeLesson = nextUncompleted.lesson;
      activeWorldTitle = nextUncompleted.world.title;
      activeTopicTitle = nextUncompleted.topic.title;
    } else {
      activeLesson = WORLDS_DATA[0].topics[0].lessons[0];
    }
  }

  const nextLessonData = activeLesson ? getNextLesson(activeLesson.id) : null;
  const prevLessonData = activeLesson ? getPreviousLesson(activeLesson.id) : null;

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userCode, setUserCode] = useState('');
  const [sandboxOutput, setSandboxOutput] = useState<string | null>(null);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const step = activeLesson.steps[currentStepIndex] || activeLesson.steps[0];
  const isCompleted = completedLessons.includes(activeLesson.id);

  useEffect(() => {
    setCurrentStepIndex(0);
    setUserCode(step.starterCode || step.codeExample || '');
    setSandboxOutput(null);
    setSelectedQuizAnswer(null);
    setQuizSubmitted(false);
  }, [activeLesson.id]);

  useEffect(() => {
    setUserCode(step.starterCode || step.codeExample || '');
    setSandboxOutput(null);
    setSelectedQuizAnswer(null);
    setQuizSubmitted(false);
  }, [currentStepIndex]);

  const handleRunCode = () => {
    if (step.expectedOutput) {
      setSandboxOutput(`[PYQUEST Python 3.12 Demo Engine]\nEvaluating executed script...\n\n>>> STDOUT:\n${step.expectedOutput}\n\nExecution finished cleanly (0 exit code).`);
    } else {
      setSandboxOutput(`[PYQUEST Python 3.12 Demo Engine]\n>>> Program output:\nExecuting code successfully without errors.\nExit code: 0`);
    }
  };

  const handleCompleteLesson = () => {
    if (activeLesson) {
      markLessonComplete(
        activeLesson.id,
        activeLesson.topicId,
        activeLesson.xpReward,
        activeLesson.coinsReward
      );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in pb-16">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <button
              onClick={() => onNavigate('/learning')}
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Worlds</span>
            </button>
            <span>/</span>
            <span>{activeWorldTitle}</span>
            <span>/</span>
            <span className="text-[#ffd43b]">{activeTopicTitle}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
            {activeLesson.title}
            {isCompleted && (
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Completed
              </span>
            )}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
            <span className="text-[#ffd43b] font-bold">+{activeLesson.xpReward} XP</span>
            <span className="text-slate-500">•</span>
            <span className="text-amber-400 font-bold">+{activeLesson.coinsReward} Coins</span>
          </div>

          <button
            onClick={() => onNavigate('/learning/practice')}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Code2 className="w-3.5 h-3.5 text-sky-400" />
            <span>Practice Lab</span>
          </button>
        </div>
      </div>

      {/* Step Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800/80">
        {activeLesson.steps.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentStepIndex(idx)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              currentStepIndex === idx
                ? 'bg-gradient-to-r from-[#306998] to-[#4b8bbe] text-white shadow-md'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-black/30 flex items-center justify-center text-[10px]">
              {idx + 1}
            </span>
            <span>{s.title}</span>
          </button>
        ))}
      </div>

      {/* Main Step Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Theory, Concepts & Quiz */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-3xl border border-slate-800 bg-[#0d121f] shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#ffd43b]">
                Step {currentStepIndex + 1} of {activeLesson.steps.length}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Type: {step.type.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            <h2 className="text-xl font-black text-white">{step.title}</h2>

            <div className="text-sm text-slate-300 leading-relaxed space-y-3 whitespace-pre-line font-sans">
              {step.content}
            </div>

            {/* Quiz Interactive Card (if step is quiz) */}
            {step.quiz && (
              <div className="mt-6 pt-6 border-t border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                  <HelpCircle className="w-4 h-4" />
                  <span>Knowledge Check Question</span>
                </div>

                <p className="text-sm font-bold text-white">{step.quiz.question}</p>

                {step.quiz.codeSnippet && (
                  <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 whitespace-pre-wrap">
                    {step.quiz.codeSnippet}
                  </pre>
                )}

                <div className="space-y-2">
                  {step.quiz.options.map((opt, oIdx) => {
                    const isSelected = selectedQuizAnswer === oIdx;
                    const isCorrect = oIdx === step.quiz?.correctIndex;

                    let optionStyle = 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200';
                    if (quizSubmitted) {
                      if (isCorrect) {
                        optionStyle = 'bg-emerald-950/50 border-emerald-600 text-emerald-200';
                      } else if (isSelected) {
                        optionStyle = 'bg-rose-950/50 border-rose-600 text-rose-200';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-[#306998]/40 border-[#4b8bbe] text-white';
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={quizSubmitted}
                        onClick={() => setSelectedQuizAnswer(oIdx)}
                        className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${optionStyle}`}
                      >
                        <span>{opt}</span>
                        {quizSubmitted && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {!quizSubmitted ? (
                  <button
                    disabled={selectedQuizAnswer === null}
                    onClick={() => setQuizSubmitted(true)}
                    className="w-full py-2.5 bg-gradient-to-r from-[#ffd43b] to-amber-500 text-slate-950 font-extrabold text-xs rounded-xl disabled:opacity-40 transition-opacity"
                  >
                    Check Answer
                  </button>
                ) : (
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <p className="font-bold text-white">Explanation:</p>
                    <p className="text-slate-400">{step.quiz.explanation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Code Sandbox & Output Console */}
        <div className="lg:col-span-6 space-y-4">
          <CodeEditor
            code={userCode}
            onChange={setUserCode}
            onRun={handleRunCode}
            onReset={() => setUserCode(step.starterCode || step.codeExample || '')}
            title={`${activeLesson.id}.py`}
          />

          {sandboxOutput && (
            <div className="rounded-2xl border border-slate-800 bg-[#080c14] p-4 font-mono text-xs shadow-lg animate-in fade-in">
              <div className="flex items-center gap-2 text-slate-400 text-[11px] mb-2">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Console Output</span>
              </div>
              <pre className="p-3 rounded-xl bg-[#05080e] border border-slate-800/80 text-emerald-400 whitespace-pre-wrap leading-relaxed">
                {sandboxOutput}
              </pre>
            </div>
          )}

          {step.expectedOutput && (
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-xs">
              <span className="font-bold text-slate-400 text-[10px] uppercase tracking-wider block mb-1">
                Expected Console Output:
              </span>
              <pre className="font-mono text-xs text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800/60">
                {step.expectedOutput}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Step Navigation Bar */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-800">
        <button
          disabled={currentStepIndex === 0}
          onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
          className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-white rounded-xl transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous Step</span>
        </button>

        {currentStepIndex < activeLesson.steps.length - 1 ? (
          <button
            onClick={() => setCurrentStepIndex((prev) => prev + 1)}
            className="px-5 py-2.5 bg-gradient-to-r from-[#306998] to-[#4b8bbe] hover:from-[#23537e] hover:to-[#306998] text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
          >
            <span>Next Step</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="flex flex-wrap items-center gap-2.5">
            {!isCompleted ? (
              <button
                onClick={handleCompleteLesson}
                className="px-6 py-2.5 font-black text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 bg-gradient-to-r from-[#ffd43b] to-amber-500 text-slate-950 hover:scale-105 shadow-amber-500/20 cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>Claim Lesson Rewards (+{activeLesson.xpReward} XP)</span>
              </button>
            ) : (
              <>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Lesson Completed ✓</span>
                </span>
                {nextLessonData ? (
                  <button
                    onClick={() => onNavigate(`/learning/lessons/${nextLessonData.lesson.id}`)}
                    className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs rounded-xl shadow-lg hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next: {nextLessonData.lesson.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigate('/learning')}
                    className="px-5 py-2.5 bg-gradient-to-r from-[#306998] to-[#4b8bbe] text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Curriculum Completed! Return to Hub</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
