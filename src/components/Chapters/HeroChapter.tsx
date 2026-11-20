import React, { useState, useEffect } from 'react';
import { ArrowDown, Github, FileText, Sparkles } from 'lucide-react';
import { profileData } from '../../data/projects';

interface HeroChapterProps {
  onExplore: () => void;
}

export const HeroChapter: React.FC<HeroChapterProps> = ({ onExplore }) => {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const touchCheck =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches;
      setIsTouch(touchCheck);
    }
  }, []);

  return (
    <section
      id="home"
      className="min-h-[85vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 py-16 max-w-4xl mx-auto select-none"
    >
      {/* Location / Status Badge */}
      <div className="inline-flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span>AI &amp; ML Engineer · Hyderabad (B.Tech 2026)</span>
      </div>

      {/* Main Name Heading */}
      <h1 className="font-sans font-bold text-4xl sm:text-6xl md:text-7xl text-white tracking-tight mb-4">
        {profileData.name}
      </h1>

      {/* Status Subtitle */}
      <p className="font-sans text-xl sm:text-2xl md:text-3xl text-sand-200 font-medium max-w-3xl mx-auto mb-6">
        {profileData.statusLine}
      </p>

      {/* Bio Statement */}
      <p className="font-sans text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
        {profileData.bioSentence}
      </p>

      {/* Action Buttons (min 44px tap target) */}
      <div className="flex flex-wrap items-center justify-center gap-3.5 font-sans text-sm">
        <button
          type="button"
          onClick={onExplore}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-accent hover:bg-accent-hover text-black font-semibold min-h-[44px] transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <Sparkles className="w-4 h-4 text-black" />
          <span>Projects</span>
          <ArrowDown className="w-4 h-4 text-black" />
        </button>

        <a
          href={profileData.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-3 rounded-lg bg-canvas-card border border-white/10 hover:border-accent text-white font-medium min-h-[44px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Github className="w-4 h-4 text-accent" />
          <span>GitHub Profile</span>
        </a>

        <a
          href={profileData.resumePdfPlaceholder}
          download="Yuvaraju_Dharmana_Resume.pdf"
          className="flex items-center gap-2 px-5 py-3 rounded-lg bg-canvas-card border border-white/10 hover:border-accent text-white font-medium min-h-[44px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <FileText className="w-4 h-4 text-accent" />
          <span>Resume</span>
        </a>
      </div>

      {/* Scroll / Swipe invitation indicator */}
      <div className="mt-12 text-slate-400 font-mono text-xs flex items-center gap-2">
        <span>↓</span>
        <span>
          {isTouch
            ? 'Swipe up to advance through projects'
            : 'Scroll down to advance through projects'}
        </span>
        <span>↓</span>
      </div>
    </section>
  );
};
