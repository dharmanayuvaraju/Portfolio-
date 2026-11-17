import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FastForward } from 'lucide-react';

interface IntroSequenceProps {
  onComplete: () => void;
  reducedMotion: boolean;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({
  onComplete,
  reducedMotion,
}) => {
  const [stage, setStage] = useState<0 | 1 | 2 | 3>(0);

  useEffect(() => {
    if (reducedMotion) {
      onComplete();
      return;
    }

    const t1 = setTimeout(() => setStage(1), 350);  // Pulse ignites
    const t2 = setTimeout(() => setStage(2), 850);  // Streams race & telemetry
    const t3 = setTimeout(() => setStage(3), 2300); // Hand off
    const t4 = setTimeout(() => onComplete(), 2800); // Complete

    // Skip on click, scroll wheel, or key
    const handleSkip = () => {
      onComplete();
    };

    window.addEventListener('click', handleSkip, { once: true });
    window.addEventListener('wheel', handleSkip, { once: true });
    window.addEventListener('keydown', handleSkip, { once: true });
    window.addEventListener('touchstart', handleSkip, { once: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('click', handleSkip);
      window.removeEventListener('wheel', handleSkip);
      window.removeEventListener('keydown', handleSkip);
      window.removeEventListener('touchstart', handleSkip);
    };
  }, [reducedMotion, onComplete]);

  if (reducedMotion) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-canvas-deep select-none">
      {/* Skip Button */}
      <button
        onClick={onComplete}
        className="absolute top-6 right-6 z-50 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 font-mono text-xs hover:border-[var(--dynamic-accent)] hover:text-white transition-colors"
      >
        <FastForward className="w-3.5 h-3.5 text-[var(--dynamic-accent)]" />
        <span>Skip Sequence [Click / Esc]</span>
      </button>

      {/* Central Ignition Shockwaves */}
      <div className="relative flex items-center justify-center">
        {stage >= 1 && (
          <>
            <motion.div
              initial={{ scale: 0, opacity: 0.9 }}
              animate={{ scale: [0, 2.5, 5], opacity: [0.9, 0.4, 0] }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="absolute w-40 h-40 rounded-full border border-[var(--dynamic-accent)] pointer-events-none"
            />
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [0, 4, 8], opacity: [1, 0.2, 0] }}
              transition={{ duration: 1.6, delay: 0.1, ease: 'easeOut' }}
              className="absolute w-40 h-40 rounded-full border border-white/30 pointer-events-none"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.4 }}
              className="w-4 h-4 rounded-full bg-[var(--dynamic-accent)] shadow-[0_0_40px_var(--dynamic-accent)]"
            />
          </>
        )}
      </div>

      {/* Radial Stream Lines Racing Outward */}
      {stage >= 1 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <motion.div
              key={deg}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: [0, 1], opacity: [0, 0.6, 0] }}
              transition={{ duration: 1.1, delay: 0.2, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '50vw',
                height: '1px',
                transformOrigin: '0 0',
                transform: `rotate(${deg}deg)`,
                background: `linear-gradient(to right, var(--dynamic-accent), transparent)`,
              }}
            />
          ))}
        </div>
      )}

      {/* Monospace System Telemetry Log */}
      <AnimatePresence>
        {stage >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute max-w-lg mx-auto px-6 text-center font-mono text-xs sm:text-sm text-slate-300 space-y-2 pointer-events-none"
          >
            <div className="text-[var(--dynamic-accent)] font-semibold tracking-wider flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--dynamic-accent)] animate-ping" />
              <span>&gt;&gt; SIGNAL TOPOLOGY INITIALIZING</span>
            </div>

            <div className="text-white font-bold text-base sm:text-lg tracking-tight">
              Yuvaraju Dharmana
            </div>

            <div className="text-slate-400 text-xs sm:text-sm">
              AI &amp; ML engineer (B.Tech 2026), Hyderabad
            </div>

            <div className="pt-2 text-[11px] text-slate-500 font-mono">
              [ 11 PROJECT NODES ASSEMBLED · HANDING CONTROL TO VISITOR ]
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
