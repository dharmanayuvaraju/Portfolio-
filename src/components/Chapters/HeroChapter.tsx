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
      className="min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-20 pb-16 max-w-5xl mx-auto select-none"
    >
      {/* Location / Status Badge */}
      <div className="inline-flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-4">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span>AI &amp; ML Engineer · Hyderabad (B.Tech 2026)</span>
      </div>

      {/* Main Name Heading */}
      <h1 className="font-sans font-bold text-4xl sm:text-6xl md:text-7xl text-white tracking-tight mb-3">
        {profileData.name}
      </h1>

      {/* Status Subtitle */}
      <p className="font-sans text-xl sm:text-2xl md:text-3xl text-sand-200 font-medium max-w-3xl mx-auto mb-6">
        {profileData.statusLine}
      </p>

      {/* 0. HERO VIDEO: Top of site, full width, max-height ~80vh, dark background */}
      <div className="relative w-full mx-auto my-4 rounded-2xl overflow-hidden border border-white/10 bg-[#0a0b10] shadow-2xl">
        <video
          src="/intro.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full max-h-[80vh] object-cover bg-black block"
          aria-label="Yuvaraju Dharmana Portfolio Introduction Video"
        />

        {/* Visible Skip button past the hero video and intro */}
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10">
          <button
            type="button"
            onClick={onExplore}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/85 hover:bg-black text-white text-xs font-mono border border-white/20 transition-all hover:border-accent min-h-[44px] min-w-[44px] shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Skip hero video and jump to 3D flight"
          >
            <span className="font-semibold text-accent">Skip to 3D Flight</span>
            <ArrowDown className="w-4 h-4 text-accent" />
          </button>
        </div>
      </div>

      {/* Bio Statement */}
      <p className="font-sans text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto mt-6 mb-8 leading-relaxed">
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
          <span>Explore Projects</span>
          <ArrowDown className="w-4 h-4 text-black" />
        </button>

        <a
          href={profileData.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#121520] border border-white/10 hover:border-accent text-white font-medium min-h-[44px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Github className="w-4 h-4 text-accent" />
          <span>GitHub Profile</span>
        </a>

        <a
          href={profileData.resumePdfPlaceholder}
          download="Yuvaraju_Dharmana_Resume.pdf"
          className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#121520] border border-white/10 hover:border-accent text-white font-medium min-h-[44px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <FileText className="w-4 h-4 text-accent" />
          <span>Resume</span>
        </a>
      </div>

      {/* Scroll / Swipe invitation indicator */}
      <div className="mt-10 text-slate-400 font-mono text-xs flex items-center gap-2">
        <span>↓</span>
        <span>
          {isTouch
            ? 'Swipe up to begin 3D project flight'
            : 'Scroll down to begin 3D project flight'}
        </span>
        <span>↓</span>
      </div>
    </section>
  );
};
