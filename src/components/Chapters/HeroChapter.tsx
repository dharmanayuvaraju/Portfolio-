import React from 'react';
import { ArrowDown, Github, Sparkles } from 'lucide-react';
import { profileData } from '../../data/projects';

interface HeroChapterProps {
  onExplore: () => void;
}

export const HeroChapter: React.FC<HeroChapterProps> = ({ onExplore }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) translateZ(0px)',
        transformStyle: 'preserve-3d',
      }}
      className="w-full max-w-4xl px-4 text-center select-none pointer-events-auto"
    >
      {/* Background Coordinate Depth Layer (z = -60px) */}
      <div
        style={{ transform: 'translateZ(-60px)' }}
        className="font-mono text-[11px] text-[var(--dynamic-accent)] tracking-widest uppercase mb-4 opacity-80"
      >
        <span className="inline-block w-2 h-2 rounded-full bg-[var(--dynamic-accent)] mr-2 animate-ping" />
        <span>SIGNAL // LIVING ML TOPOLOGY · HYD (17.3850° N, 78.4867° E)</span>
      </div>

      {/* Main Name Heading Depth Layer (z = 40px) */}
      <h1
        style={{ transform: 'translateZ(40px)' }}
        className="font-sans font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white mb-4 text-balance"
      >
        {profileData.name}
      </h1>

      {/* Subtitle Depth Layer (z = 20px) */}
      <p
        style={{ transform: 'translateZ(20px)' }}
        className="font-sans text-xl sm:text-2xl md:text-3xl text-slate-300 font-medium max-w-3xl mx-auto mb-6 text-balance"
      >
        {profileData.statusLine}
      </p>

      {/* Brief Bio Sentence Depth Layer (z = 0px) */}
      <p
        style={{ transform: 'translateZ(0px)' }}
        className="font-sans text-sm sm:text-base text-slate-400 max-w-xl mx-auto mb-8 leading-relaxed"
      >
        {profileData.bioSentence}
      </p>

      {/* Action Buttons Depth Layer (z = 60px) */}
      <div
        style={{ transform: 'translateZ(60px)' }}
        className="flex flex-wrap items-center justify-center gap-4 font-mono text-xs"
      >
        <button
          onClick={onExplore}
          className="group flex items-center gap-2.5 px-6 py-3 rounded-lg bg-[var(--dynamic-accent)] text-canvas-deep font-semibold shadow-lg shadow-[var(--dynamic-accent-dim)] transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <Sparkles className="w-4 h-4 text-canvas-deep" />
          <span>Traverse Constellation</span>
          <ArrowDown className="w-4 h-4 text-canvas-deep group-hover:translate-y-0.5 transition-transform" />
        </button>

        <a
          href={profileData.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-3 rounded-lg bg-canvas-card border border-white/10 hover:border-[var(--dynamic-accent)] text-slate-200 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dynamic-accent)]"
        >
          <Github className="w-4 h-4 text-[var(--dynamic-accent)]" />
          <span>GitHub Profile</span>
        </a>
      </div>

      {/* Parallaxing Scroll Invitation Indicator */}
      <div
        style={{ transform: 'translateZ(-40px)' }}
        className="mt-12 text-slate-500 font-mono text-[11px] animate-bounce"
      >
        ↓ Scroll wheel or drag to advance camera through the 3D topology ↓
      </div>
    </div>
  );
};
