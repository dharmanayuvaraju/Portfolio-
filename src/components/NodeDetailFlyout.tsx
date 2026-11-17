import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  X,
  ExternalLink,
  Github,
  Clock,
  Layers,
  Info,
} from 'lucide-react';
import { Project } from '../types';

interface NodeDetailFlyoutProps {
  project: Project | null;
  onClose: () => void;
  reducedMotion: boolean;
}

export const NodeDetailFlyout: React.FC<NodeDetailFlyoutProps> = ({
  project,
  onClose,
  reducedMotion,
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
    setTimeout(() => closeBtnRef.current?.focus(), 60);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-6 pointer-events-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="flyout-title"
      >
        {/* Seamless 3D Shared Element Unfolding Container */}
        <motion.div
          initial={
            reducedMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  scale: 0.65,
                  z: -300,
                  rotateX: 12,
                }
          }
          animate={{
            opacity: 1,
            scale: 1,
            z: 0,
            rotateX: 0,
          }}
          exit={
            reducedMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  scale: 0.7,
                  z: -250,
                  rotateX: -10,
                }
          }
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 26,
            mass: 0.8,
          }}
          className="pointer-events-auto relative w-full max-w-2xl bg-canvas-card/95 border border-[var(--dynamic-accent)] rounded-2xl shadow-[0_0_50px_var(--dynamic-accent-dim)] backdrop-blur-xl overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-canvas-surface/80 sticky top-0 z-10 font-mono text-xs">
            <button
              onClick={onClose}
              ref={closeBtnRef}
              className="flex items-center gap-2 text-slate-300 hover:text-white px-2.5 py-1.5 rounded-md hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dynamic-accent)]"
              aria-label="Fly back to constellation"
            >
              <ArrowLeft className="w-4 h-4 text-[var(--dynamic-accent)]" />
              <span>[ ESC ] Fly Back to Constellation</span>
            </button>

            <span className="text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
              {project.category}
            </span>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dynamic-accent)]"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Unfolded Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            {/* Title & Tagline */}
            <div>
              <div className="font-mono text-xs text-[var(--dynamic-accent)] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[var(--dynamic-accent)] animate-pulse" />
                <span>UNFOLDED NODE TELEMETRY // {project.id}</span>
              </div>
              <h2 id="flyout-title" className="font-sans font-bold text-2xl sm:text-3xl text-white tracking-tight mb-2">
                {project.title}
              </h2>
              <p className="font-sans text-sm sm:text-base text-slate-300">
                {project.tagline}
              </p>
            </div>

            {/* Screenshot Gallery (rendered only when screenshots exist; no placeholder galleries) */}
            {project.screenshots && project.screenshots.length > 0 && (
              <div className="rounded-xl overflow-hidden border border-white/10 bg-canvas-deep/80 relative space-y-4 p-4">
                {project.screenshots.map((s, idx) => (
                  <div key={idx} className="rounded-lg overflow-hidden border border-white/10">
                    <img
                      src={s.url}
                      alt={s.caption || `${project.title} screenshot ${idx + 1}`}
                      className="w-full h-auto object-cover"
                    />
                    {s.caption && (
                      <p className="p-2 font-mono text-xs text-slate-400 bg-canvas-card">
                        {s.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Honest Sentence Description */}
            <div className="p-4 rounded-xl bg-canvas-surface border border-white/10">
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--dynamic-accent)] uppercase tracking-wider mb-2">
                <Info className="w-4 h-4" />
                <span>Honest Functionality Statement</span>
              </div>
              <p className="font-sans text-sm sm:text-base text-slate-200 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Backend Sleep Notice (AI Job Hunt) */}
            {project.liveStatusNote && (
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 font-mono text-xs">
                <Clock className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-amber-300">Live Backend Notice: </span>
                  {project.liveStatusNote}
                </div>
              </div>
            )}

            {/* Stack Chips */}
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-slate-400 uppercase tracking-wider mb-2.5">
                <Layers className="w-4 h-4" />
                <span>Technology Stack Chips</span>
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

            {/* Links: GitHub & Conditional Live Link */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-4">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-canvas-surface hover:bg-white/10 border border-white/15 text-white font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dynamic-accent)]"
              >
                <Github className="w-4 h-4 text-[var(--dynamic-accent)]" />
                <span>View Source on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>

              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--dynamic-accent)] text-canvas-deep font-mono text-xs font-semibold hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <ExternalLink className="w-4 h-4 text-canvas-deep" />
                  <span>Launch Live Deployment</span>
                </a>
              ) : (
                <div className="text-slate-500 font-mono text-xs px-3 py-2 rounded border border-white/5 bg-white/5">
                  {project.statusBadge
                    ? `Status: ${project.statusBadge} (No public URL)`
                    : 'Repository only (No live deployment)'}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
