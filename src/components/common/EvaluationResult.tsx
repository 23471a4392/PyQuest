import React, { useState } from 'react';
import { EvaluationReport } from '../../types/learning';
import { CheckCircle2, XCircle, Clock, Terminal, AlertTriangle } from 'lucide-react';

interface EvaluationResultProps {
  report: EvaluationReport | null;
  isLoading?: boolean;
}

export const EvaluationResult: React.FC<EvaluationResultProps> = ({ report, isLoading }) => {
  const [activeTab, setActiveTab] = useState(0);

  if (isLoading) {
    return (
      <div className="p-6 rounded-2xl border border-slate-800 bg-[#0d121f] flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-3 border-[#ffd43b] border-t-transparent rounded-full animate-spin" />
        <p className="font-mono text-xs text-slate-400">Evaluating against test suite...</p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="p-5 rounded-2xl border border-dashed border-slate-800 bg-slate-950/40 text-center text-xs text-slate-400 font-mono">
        Click <span className="text-emerald-400 font-semibold">&ldquo;Run &amp; Evaluate&rdquo;</span> to execute your Python code and view test case outcomes.
      </div>
    );
  }

  const allPassed = report.status === 'passed';
  const currentCase = report.results[activeTab] || report.results[0];

  return (
    <div className="flex flex-col rounded-2xl border border-slate-800 bg-[#0d121f] overflow-hidden shadow-lg">
      {/* Top Banner */}
      <div
        className={`px-4 py-3 flex items-center justify-between border-b ${
          allPassed
            ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
            : report.status === 'syntax_error'
            ? 'bg-amber-950/40 border-amber-800/60 text-amber-300'
            : 'bg-rose-950/40 border-rose-800/60 text-rose-300'
        }`}
      >
        <div className="flex items-center gap-2.5">
          {allPassed ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          ) : report.status === 'syntax_error' ? (
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          ) : (
            <XCircle className="w-5 h-5 text-rose-400" />
          )}

          <div>
            <p className="font-bold text-xs uppercase tracking-wide">
              {allPassed
                ? 'All Test Cases Passed!'
                : report.status === 'syntax_error'
                ? 'Syntax Error'
                : 'Tests Failed'}
            </p>
            <p className="text-[11px] opacity-80">
              {report.passedCount} / {report.totalCount} test cases completed successfully
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-mono px-2 py-1 rounded bg-black/40 border border-white/10">
          <Clock className="w-3.5 h-3.5" />
          <span>{report.executionTimeMs} ms</span>
        </div>
      </div>

      {/* Test Case Selector Tabs */}
      {report.results.length > 0 && (
        <div className="flex items-center gap-1 px-3 pt-2.5 pb-1 bg-[#090d16] border-b border-slate-800/80 overflow-x-auto">
          {report.results.map((res, idx) => (
            <button
              key={res.testCaseId}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                activeTab === idx
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  res.passed ? 'bg-emerald-400' : 'bg-rose-400'
                }`}
              />
              <span>Case {idx + 1}</span>
              {res.isHidden && (
                <span className="text-[9px] px-1 py-0.2 rounded bg-slate-700 text-slate-300">
                  Hidden
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Selected Case Breakdown */}
      {currentCase && (
        <div className="p-4 space-y-3 bg-[#0b0f19]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
            <div>
              <p className="text-slate-400 text-[10px] uppercase font-bold mb-1">Input Argument(s)</p>
              <div className="p-2.5 rounded-xl bg-[#111827] border border-slate-800 text-slate-200">
                {currentCase.input || 'None'}
              </div>
            </div>

            <div>
              <p className="text-slate-400 text-[10px] uppercase font-bold mb-1">Expected Output</p>
              <div className="p-2.5 rounded-xl bg-[#111827] border border-slate-800 text-emerald-400">
                {currentCase.expected}
              </div>
            </div>
          </div>

          <div>
            <p className="text-slate-400 text-[10px] uppercase font-bold mb-1">Your Function Output</p>
            <div
              className={`p-2.5 rounded-xl border font-mono text-xs ${
                currentCase.passed
                  ? 'bg-emerald-950/20 border-emerald-900/40 text-emerald-300'
                  : 'bg-rose-950/20 border-rose-900/40 text-rose-300'
              }`}
            >
              {currentCase.actual}
            </div>
          </div>
        </div>
      )}

      {/* Stdout Console */}
      <div className="border-t border-slate-800/80 bg-[#080c14] p-3">
        <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-mono mb-1.5">
          <Terminal className="w-3.5 h-3.5 text-slate-400" />
          <span>Evaluation Terminal Output</span>
        </div>
        <pre className="text-[11px] font-mono text-slate-300 whitespace-pre-wrap bg-[#05080e] p-2.5 rounded-lg border border-slate-800/60 leading-relaxed overflow-x-auto max-h-36">
          {report.stdout}
        </pre>
      </div>
    </div>
  );
};
