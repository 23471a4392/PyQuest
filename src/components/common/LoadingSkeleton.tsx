import React from 'react';

export const LoadingSkeleton: React.FC<{ count?: number; className?: string }> = ({ count = 3, className = 'h-24' }) => {
  return (
    <div className="space-y-3 w-full animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`w-full bg-slate-800/50 rounded-2xl border border-slate-800/80 ${className}`}
        />
      ))}
    </div>
  );
};
