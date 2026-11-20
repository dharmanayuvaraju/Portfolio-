import React from 'react';
import { Github, Zap, Layers } from 'lucide-react';
import { profileData } from '../data/projects';

interface NavbarProps {
  currentChapter: number;
  onNavigateChapter: (chapterIndex: number) => void;
  liteMode: boolean;
  toggleLiteMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentChapter,
  onNavigateChapter,
  liteMode,
  toggleLiteMode,
}) => {
  const chapters = [
    { name: 'Home', index: 0 },
    { name: 'Projects', index: 1 },
    { name: 'About', index: 2 },
    { name: 'Contact', index: 3 },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-30 py-2.5 px-4 sm:px-6 bg-[#0a0b10]/95 border-b border-white/10 backdrop-blur-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Monogram Brand */}
        <button
          type="button"
          onClick={() => onNavigateChapter(0)}
          className="group flex items-center gap-2 text-sm font-sans font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded px-2.5 py-2 min-h-[44px] min-w-[44px]"
          aria-label="Return to home"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-accent" />
          <span className="tracking-tight text-white group-hover:text-accent transition-colors">
            YD
          </span>
          <span className="text-slate-500 font-normal">|</span>
          <span className="text-slate-300 font-normal text-xs sm:text-sm">
            Yuvaraju Dharmana
          </span>
        </button>

        {/* Desktop Chapter Waypoints */}
        <nav className="hidden md:flex items-center gap-1 font-sans text-sm" aria-label="Main chapter navigation">
          {chapters.map((ch) => {
            const isActive = currentChapter === ch.index;
            return (
              <button
                key={ch.name}
                type="button"
                onClick={() => onNavigateChapter(ch.index)}
                className={`px-3.5 py-2 rounded-lg transition-colors min-h-[44px] flex items-center font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  isActive
                    ? 'text-accent bg-accent/10 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {ch.name}
              </button>
            );
          })}
        </nav>

        {/* Actions: Lite Mode Toggle & GitHub */}
        <div className="flex items-center gap-2.5">
          {/* Visible Lite Mode Toggle (Persisted) */}
          <button
            type="button"
            onClick={toggleLiteMode}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-xs font-mono font-medium min-h-[44px] min-w-[44px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              liteMode
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-white/20 bg-white/5 text-slate-300 hover:text-white hover:border-white/40'
            }`}
            title="Toggle between Lite mode and 3D flight mode"
            aria-label={`Switch to ${liteMode ? '3D' : 'Lite'} mode`}
          >
            {liteMode ? (
              <>
                <Layers className="w-4 h-4 text-accent" />
                <span>Lite Mode</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-accent" />
                <span>3D Mode</span>
              </>
            )}
          </button>

          {/* GitHub link */}
          <a
            href={profileData.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white text-xs font-mono min-h-[44px] min-w-[44px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4 text-accent" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};
