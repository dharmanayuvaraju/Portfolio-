import React, { useEffect, useRef } from 'react';
import {
  ArrowLeft,
  X,
  ExternalLink,
  Github,
  Clock,
  Layers,
} from 'lucide-react';
import { Project } from '../types';

interface NodeDetailFlyoutProps {
  project: Project | null;
  onClose: () => void;
}

export const NodeDetailFlyout: React.FC<NodeDetailFlyoutProps> = ({
  project,
  onClose,
}) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    setTimeout(() => closeBtnRef.current?.focus(), 50);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-[#121520] border border-accent rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#161a29] sticky top-0 z-10 font-sans text-sm">
          <button
            type="button"
            onClick={onClose}
            ref={closeBtnRef}
            className="flex items-center gap-2 text-slate-300 hover:text-white px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Back to projects"
          >
            <ArrowLeft className="w-4 h-4 text-accent" />
            <span className="font-mono text-xs">Back to projects</span>
          </button>

          <span className="text-slate-400 font-mono text-xs bg-white/5 border border-white/10 px-2.5 py-1 rounded-full uppercase">
            {project.category}
          </span>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Title & Tagline */}
          <div>
            <h2
              id="project-modal-title"
              className="font-sans font-bold text-2xl sm:text-3xl text-white tracking-tight mb-2"
            >
              {project.title}
            </h2>
            <p className="font-sans text-sm sm:text-base text-slate-300">
              {project.tagline}
            </p>
          </div>

          {/* Description */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h3 className="font-sans font-semibold text-sm text-accent mb-2">
              Overview
            </h3>
            <p className="font-sans text-sm sm:text-base text-slate-200 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Backend Sleep Notice (AI Job Hunt) */}
          {project.liveStatusNote && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 font-sans text-xs">
              <Clock className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <span className="font-bold text-amber-300">Live note: </span>
                {project.liveStatusNote}
              </div>
            </div>
          )}

          {/* Stack Chips */}
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-slate-400 uppercase tracking-wider mb-2.5">
              <Layers className="w-4 h-4 text-accent" />
              <span>Technology Stack</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links: View Code & Live Demo */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-white font-sans text-sm min-h-[44px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Github className="w-4 h-4 text-accent" />
              <span>View code</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-black font-sans text-sm font-semibold hover:bg-accent-hover min-h-[44px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ExternalLink className="w-4 h-4 text-black" />
                <span>Live demo</span>
              </a>
            ) : (
              <span className="text-slate-400 font-mono text-xs px-3 py-2 rounded border border-white/5 bg-white/5">
                {project.statusBadge || 'Repository only'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
