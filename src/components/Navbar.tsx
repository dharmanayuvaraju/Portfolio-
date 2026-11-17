import React from 'react';
import { Github, Zap, ZapOff } from 'lucide-react';
import { profileData } from '../data/projects';

interface NavbarProps {
  currentChapter: number;
  onNavigateChapter: (chapterIndex: number) => void;
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentChapter,
  onNavigateChapter,
  reducedMotion,
  toggleReducedMotion,
}) => {
  const chapters = [
    { name: 'ORIGIN', index: 0 },
    { name: 'CONSTELLATION', index: 1 },
    { name: 'ARCHITECTURE', index: 2 },
    { name: 'TERMINUS', index: 3 },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-30 py-4 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-canvas-deep/90 via-canvas-deep/60 to-transparent backdrop-blur-[2px]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Monogram */}
        <button
          onClick={() => onNavigateChapter(0)}
          className="group flex items-center gap-2.5 font-mono text-xs tracking-wider text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dynamic-accent)] rounded px-1 py-0.5"
          aria-label="Return to Signal Origin"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--dynamic-accent)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--dynamic-accent)]"></span>
          </span>
          <span className="font-bold text-white group-hover:text-[var(--dynamic-accent)] transition-colors">
            YD
          </span>
          <span className="text-slate-600">//</span>
          <span className="text-slate-400 group-hover:text-slate-200 transition-colors uppercase text-[11px]">
            SIGNAL
          </span>
        </button>

        {/* Chapter Waypoints Navigation */}
        <nav className="hidden md:flex items-center gap-6 font-mono text-xs" aria-label="Chapter flight navigation">
          {chapters.map((ch) => {
            const isActive = currentChapter === ch.index;
            return (
              <button
                key={ch.name}
                onClick={() => onNavigateChapter(ch.index)}
                className={`py-1 transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dynamic-accent)] rounded px-1 ${
                  isActive
                    ? 'text-[var(--dynamic-accent)] font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span className="text-[10px] text-slate-600">0{ch.index + 1}.</span>
                <span>//{ch.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Motion Toggle & GitHub */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <button
            onClick={toggleReducedMotion}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${
              reducedMotion
                ? 'border-[var(--dynamic-accent)]/50 bg-[var(--dynamic-accent)]/10 text-[var(--dynamic-accent)]'
                : 'border-white/10 text-slate-400 hover:text-white hover:border-white/20'
            }`}
            title="Toggle between full 3D motion and accessible reduced motion"
            aria-label="Toggle motion preference"
          >
            {reducedMotion ? (
              <>
                <ZapOff className="w-3.5 h-3.5 text-[var(--dynamic-accent)]" />
                <span className="text-[11px]">Motion: Reduced</span>
              </>
            ) : (
              <>
                <Zap className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[11px]">Signal 3D</span>
              </>
            )}
          </button>

          <a
            href={profileData.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="w-3.5 h-3.5 text-[var(--dynamic-accent)]" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};
