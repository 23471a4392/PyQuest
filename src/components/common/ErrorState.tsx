import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'An unexpected error occurred while loading content.',
  onRetry
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-rose-900/50 bg-rose-950/20 text-rose-300">
      <div className="w-10 h-10 rounded-xl bg-rose-900/40 border border-rose-800 flex items-center justify-center mb-3">
        <AlertTriangle className="w-5 h-5 text-rose-400" />
      </div>
      <p className="text-sm font-semibold mb-1">Content Error</p>
      <p className="text-xs text-rose-300/80 max-w-sm mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-900/60 hover:bg-rose-900 text-xs font-bold text-white transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retry Request</span>
        </button>
      )}
    </div>
  );
};
