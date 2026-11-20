import React, { useEffect } from 'react';
import { FastForward } from 'lucide-react';
import { profileData } from '../data/projects';

interface IntroSequenceProps {
  onComplete: () => void;
  liteMode: boolean;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({
  onComplete,
  liteMode,
}) => {
  useEffect(() => {
    if (liteMode) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      onComplete();
    }, 1800);

    const handleSkip = (e: KeyboardEvent | MouseEvent | TouchEvent) => {
      if ('key' in e && e.key !== 'Escape' && e.key !== ' ') return;
      onComplete();
    };

    window.addEventListener('keydown', handleSkip);
    window.addEventListener('click', handleSkip);
    window.addEventListener('touchstart', handleSkip);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleSkip);
      window.removeEventListener('click', handleSkip);
      window.removeEventListener('touchstart', handleSkip);
    };
  }, [liteMode, onComplete]);

  if (liteMode) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0b10] select-none">
      {/* Prominent, accessible Skip button */}
      <button
        type="button"
        onClick={onComplete}
        className="absolute top-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-mono text-xs hover:border-accent hover:text-accent transition-colors min-h-[44px] min-w-[44px]"
        aria-label="Skip introduction"
      >
        <FastForward className="w-4 h-4 text-accent" />
        <span>Skip intro [Esc]</span>
      </button>

      {/* Central Intro Badge */}
      <div className="text-center px-4 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>PORTFOLIO 2026</span>
        </div>

        <h1 className="font-sans font-bold text-3xl sm:text-5xl text-white tracking-tight">
          {profileData.name}
        </h1>

        <p className="font-sans text-sm sm:text-base text-slate-400">
          {profileData.statusLine}
        </p>
      </div>
    </div>
  );
};
