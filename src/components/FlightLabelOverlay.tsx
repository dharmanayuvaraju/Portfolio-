import React from 'react';
import { ExternalLink, Github, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project, ProjectCategory } from '../types';

interface FlightLabelOverlayProps {
  focalProject: Project | null;
  focalIndex: number;
  totalProjects: number;
  activeFilter: string;
  onSelectFilter: (filter: string) => void;
  onSelectProject: (project: Project) => void;
  onNavigateToProjectIndex: (index: number) => void;
  visible: boolean;
}

export const FlightLabelOverlay: React.FC<FlightLabelOverlayProps> = ({
  focalProject,
  focalIndex,
  totalProjects,
  activeFilter,
  onSelectFilter,
  onSelectProject,
  onNavigateToProjectIndex,
  visible,
}) => {
  if (!visible || !focalProject) return null;

  const categories: ('All' | ProjectCategory)[] = ['All', 'Apps', 'Websites', 'Dashboards'];

  // Project label alternates left or right on desktop based on 3D object X coordinate
  const isObjectOnLeft = focalProject.pos3D.x < 0;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 sm:p-6 md:p-8">
      {/* Top Bar: Filter Pills HUD */}
      <div className="w-full flex justify-center pointer-events-auto pt-16 sm:pt-20 px-2 sm:px-4">
        <div
          className="flex items-center gap-2 p-1.5 rounded-full bg-[#121520] border border-white/10 overflow-x-auto whitespace-nowrap scrollbar-none shadow-2xl max-w-full touch-pan-x"
          role="tablist"
          aria-label="Filter 3D flight projects by category"
        >
          {categories.map((cat) => {
            const isSelected = activeFilter === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => onSelectFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  isSelected
                    ? 'bg-accent text-black font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Focal Project Label Card */}
      <div
        className={`w-full flex pointer-events-none transition-all duration-300 ${
          isObjectOnLeft ? 'md:justify-end' : 'md:justify-start'
        } justify-center items-end md:items-center pb-16 sm:pb-8 md:pb-0`}
      >
        <div className="pointer-events-auto w-full max-w-md p-5 sm:p-6 rounded-2xl bg-[#121520] border border-accent/40 shadow-2xl space-y-4">
          {/* Header Row: Index & Category */}
          <div className="flex items-center justify-between gap-2 text-xs font-mono">
            <span className="text-accent font-semibold tracking-wider">
              {String(focalIndex + 1).padStart(2, '0')} / {String(totalProjects).padStart(2, '0')}
            </span>

            <div className="flex items-center gap-2">
              <span className="text-slate-300 uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10">
                {focalProject.category}
              </span>
              {focalProject.liveUrl && (
                <span className="text-accent flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  Live
                </span>
              )}
            </div>
          </div>

          {/* Title & Tagline */}
          <div>
            <h3 className="font-sans font-bold text-2xl text-white tracking-tight mb-1.5">
              {focalProject.title}
            </h3>
            <p className="font-sans text-sm text-slate-300 leading-relaxed line-clamp-2">
              {focalProject.tagline}
            </p>
          </div>

          {/* Stack Chips */}
          <div className="flex flex-wrap gap-1.5">
            {focalProject.stack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs px-2 py-0.5 rounded bg-[#0a0b10] text-slate-300 border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons: 44px tap targets */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => onSelectProject(focalProject)}
              className="flex items-center gap-1.5 text-accent font-semibold hover:underline min-h-[44px] min-w-[44px] px-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={`View project details for ${focalProject.title}`}
            >
              <span>View project</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <a
                href={focalProject.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 min-h-[44px] min-w-[44px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                title="View code on GitHub"
                aria-label={`View code for ${focalProject.title} on GitHub`}
              >
                <Github className="w-4 h-4 text-accent" />
                <span className="text-xs font-mono">Code</span>
              </a>

              {focalProject.liveUrl && (
                <a
                  href={focalProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-accent text-black font-semibold hover:bg-accent-hover min-h-[44px] min-w-[44px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  title="Open Live Demo"
                  aria-label={`Open live demo for ${focalProject.title}`}
                >
                  <ExternalLink className="w-4 h-4 text-black" />
                  <span className="text-xs font-sans">Live demo</span>
                </a>
              )}
            </div>
          </div>

          {/* Step Navigation Controls (Prev / Next Object) */}
          <div className="flex items-center justify-between pt-2 text-xs font-mono text-slate-400">
            <button
              type="button"
              onClick={() => onNavigateToProjectIndex(Math.max(0, focalIndex - 1))}
              disabled={focalIndex === 0}
              className="flex items-center gap-1 hover:text-white disabled:opacity-30 min-h-[44px] min-w-[44px] px-2"
              aria-label="Previous project in flight"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            <span className="text-slate-500">Scroll to advance</span>
            <button
              type="button"
              onClick={() => onNavigateToProjectIndex(Math.min(totalProjects - 1, focalIndex + 1))}
              disabled={focalIndex >= totalProjects - 1}
              className="flex items-center gap-1 hover:text-white disabled:opacity-30 min-h-[44px] min-w-[44px] px-2 justify-end"
              aria-label="Next project in flight"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom spacer for mobile bar */}
      <div className="h-4 sm:h-0" />
    </div>
  );
};
