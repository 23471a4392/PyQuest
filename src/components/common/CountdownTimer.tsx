import React, { useState, useEffect, useRef } from 'react';
import { Clock, AlertCircle } from 'lucide-react';

interface CountdownTimerProps {
  initialSeconds: number;
  onExpire?: () => void;
  isRunning?: boolean;
  warningThresholdSeconds?: number;
  label?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialSeconds,
  onExpire,
  isRunning = true,
  warningThresholdSeconds = 30,
  label = 'Time Remaining'
}) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    setSecondsLeft(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (!isRunning || secondsLeft <= 0) return;

    const intervalId = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(intervalId);
          if (onExpireRef.current) {
            onExpireRef.current();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Guaranteed cleanup on unmount or pause
    return () => {
      window.clearInterval(intervalId);
    };
  }, [isRunning, secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  const isWarning = secondsLeft <= warningThresholdSeconds && secondsLeft > 0;
  const isExpired = secondsLeft === 0;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono font-bold text-xs transition-colors select-none ${
        isExpired
          ? 'bg-rose-950/80 border-rose-700 text-rose-300'
          : isWarning
          ? 'bg-amber-950/80 border-amber-600 text-amber-300 animate-pulse'
          : 'bg-slate-900/90 border-slate-800 text-slate-200'
      }`}
    >
      {isExpired ? (
        <AlertCircle className="w-4 h-4 text-rose-400" />
      ) : (
        <Clock className={`w-4 h-4 ${isWarning ? 'text-amber-400 animate-spin' : 'text-slate-400'}`} />
      )}

      <div className="flex flex-col">
        {label && <span className="text-[9px] text-slate-400 font-sans -mb-0.5">{label}</span>}
        <span className="text-sm tracking-wider">
          {isExpired ? '00:00 (EXPIRED)' : formattedTime}
        </span>
      </div>
    </div>
  );
};
