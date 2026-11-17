import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../types';

interface ConstellationNodeProps {
  project: Project;
  cameraZ: number;
  activeFilter: string;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onSelect: (project: Project) => void;
  reducedMotion: boolean;
}

export const ConstellationNode: React.FC<ConstellationNodeProps> = ({
  project,
  cameraZ,
  activeFilter,
  isHovered,
  onHover,
  onSelect,
  reducedMotion,
}) => {
  const { pos3D } = project;

  // Calculate optical depth relative to virtual camera
  const distToCamera = Math.abs(pos3D.z - (cameraZ - 450));
  // Cap max blur at 3px so non-active nodes provide atmospheric depth without smearing text
  const depthBlur = reducedMotion ? 0 : Math.min(3, Math.max(0, (distToCamera - 250) * 0.003));

  // Category filter state
  const isMatching = activeFilter === 'All' || project.category === activeFilter;
  const isDimmed = !isMatching;

  // Spring target Z and scale
  const targetZ = pos3D.z + (isDimmed ? -200 : isHovered ? 50 : 0);
  const targetScale = isDimmed ? 0.85 : isHovered ? 1.06 : 1.0;
  const targetOpacity = isDimmed ? 0.18 : 1.0;

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transformStyle: 'preserve-3d',
      }}
      animate={{
        x: pos3D.x,
        y: pos3D.y,
        z: targetZ,
        scale: targetScale,
        opacity: targetOpacity,
        filter: isDimmed
          ? 'grayscale(0.85) blur(2px)'
          : `blur(${isHovered ? 0 : depthBlur}px)`,
      }}
      transition={{
        type: 'spring',
        stiffness: 220,
        damping: 24,
        mass: 0.8,
      }}
      className="pointer-events-auto"
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div
        className={`group relative text-left w-64 sm:w-72 rounded-xl backdrop-blur-md transition-colors duration-200 border flex flex-col justify-between overflow-hidden ${
          isHovered
            ? 'bg-canvas-cardHover/95 border-[var(--dynamic-accent)] shadow-[0_0_30px_var(--dynamic-accent-dim)]'
            : 'bg-canvas-card/90 border-white/15 hover:border-[var(--dynamic-accent)] shadow-xl'
        }`}
      >
        {/* Pulsing Node Core Beacon */}
        <div className="absolute top-3 right-3 flex items-center justify-center pointer-events-none">
          <span
            className="absolute w-5 h-5 rounded-full bg-[var(--dynamic-accent)] opacity-40 animate-ping"
            style={{ animationDuration: `${2.5 / pos3D.pulseSpeed}s` }}
          />
          <span className="relative w-2.5 h-2.5 rounded-full bg-[var(--dynamic-accent)] border border-canvas-deep" />
        </div>

        {/* 1. Main Card Interactive Body (Opens Project Detail View) */}
        <button
          type="button"
          onClick={() => onSelect(project)}
          onFocus={() => onHover(project.id)}
          onBlur={() => onHover(null)}
          tabIndex={0}
          aria-label={`Open details for project: ${project.title} (${project.category})`}
          className="pointer-events-auto text-left w-full p-4 pb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dynamic-accent)] focus-visible:ring-inset rounded-t-xl transition-all cursor-pointer"
        >
          {/* Node Category & Status */}
          <div className="flex items-center gap-2 mb-2 font-mono text-[10px]">
            <span className="text-slate-300 uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/10 border border-white/10">
              {project.category}
            </span>
            {project.liveUrl ? (
              <span className="text-[var(--dynamic-accent)] flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--dynamic-accent)] animate-pulse" />
                LIVE
              </span>
            ) : (
              <span className="text-slate-400">
                {project.statusBadge || 'REPO'}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-sans font-bold text-lg text-white group-hover:text-[var(--dynamic-accent)] transition-colors mb-1 truncate pr-6">
            {project.title}
          </h3>

          {/* Tagline */}
          <p className="font-sans text-xs text-slate-300 line-clamp-2 mb-3 leading-relaxed">
            {project.tagline}
          </p>

          {/* Stack Chips Preview */}
          <div className="flex flex-wrap gap-1 mb-1">
            {project.stack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 3 && (
              <span className="font-mono text-[10px] px-1 py-0.5 text-slate-400">
                +{project.stack.length - 3}
              </span>
            )}
          </div>
        </button>

        {/* 2. Sibling Action Bar: Separate, Non-Nested Interactive Elements */}
        <div className="px-4 py-2.5 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-[11px] font-mono">
          <button
            type="button"
            onClick={() => onSelect(project)}
            onFocus={() => onHover(project.id)}
            onBlur={() => onHover(null)}
            tabIndex={0}
            className="pointer-events-auto text-[var(--dynamic-accent)] font-semibold flex items-center gap-1 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dynamic-accent)] rounded px-1 py-0.5"
            aria-label={`Inspect ${project.title} stream`}
          >
            <span>Inspect Stream</span>
            <span className="inline-block group-hover:translate-x-0.5 transition-transform">→</span>
          </button>

          <div className="flex items-center gap-2">
            {/* GitHub Source Link */}
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source on GitHub`}
              onClick={(e) => e.stopPropagation()}
              className="pointer-events-auto p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dynamic-accent)]"
              title="View Source on GitHub"
            >
              <Github className="w-3.5 h-3.5" />
            </a>

            {/* Live Link (Only when active) */}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live application`}
                onClick={(e) => e.stopPropagation()}
                className="pointer-events-auto p-1.5 rounded-md text-[var(--dynamic-accent)] hover:text-white hover:bg-[var(--dynamic-accent)]/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dynamic-accent)]"
                title="Launch Live App"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
