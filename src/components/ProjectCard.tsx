import React from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  className?: string;
  isFocal?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelect,
  className = '',
  isFocal = false,
}) => {
  return (
    <article
      className={`group relative rounded-xl bg-[#121520] border transition-colors flex flex-col justify-between overflow-hidden p-4 sm:p-5 ${
        isFocal
          ? 'border-accent shadow-[0_0_24px_rgba(255,107,53,0.2)]'
          : 'border-white/10 hover:border-accent'
      } ${className}`}
    >
      <div>
        {/* Header: Category & Status */}
        <div className="flex items-center justify-between gap-2 mb-3 text-xs font-mono">
          <span className="text-slate-300 uppercase tracking-wider px-2.5 py-1 rounded bg-white/5 border border-white/10">
            {project.category}
          </span>

          {project.liveUrl ? (
            <span className="text-accent flex items-center gap-1.5 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Live Demo
            </span>
          ) : (
            <span className="text-slate-400">
              {project.statusBadge || 'Code Repo'}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-sans font-bold text-xl text-white group-hover:text-accent transition-colors mb-2">
          {project.title}
        </h3>

        {/* Tagline */}
        <p className="font-sans text-sm text-slate-300 leading-relaxed mb-4 line-clamp-3">
          {project.tagline}
        </p>

        {/* Stack Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="font-mono text-xs px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="font-mono text-xs px-1.5 py-0.5 text-slate-400">
              +{project.stack.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons: 44px min tap targets */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 font-sans text-xs">
        <button
          type="button"
          onClick={() => onSelect(project)}
          className="flex items-center gap-1.5 text-accent font-semibold hover:underline py-2 min-h-[44px] min-w-[44px] px-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={`View project details for ${project.title}`}
        >
          <span>View project</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          {/* View Code (GitHub) */}
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View code for ${project.title} on GitHub`}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 min-h-[44px] min-w-[44px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            title="View code on GitHub"
          >
            <Github className="w-4 h-4 text-accent" />
            <span className="hidden sm:inline">Code</span>
          </a>

          {/* Live Demo */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open live demo for ${project.title}`}
              className="flex items-center gap-1 px-3.5 py-2 rounded-lg bg-accent text-black font-semibold hover:bg-accent-hover min-h-[44px] min-w-[44px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              title="Open Live Demo"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live demo</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
