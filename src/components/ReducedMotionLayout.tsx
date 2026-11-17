import React, { useState } from 'react';
import {
  Github,
  ExternalLink,
  Mail,
  Phone,
  FileText,
  Linkedin,
  Copy,
  Check,
  MapPin,
  Clock,
  Terminal,
  Code2,
  Database,
  ArrowUpRight,
} from 'lucide-react';
import { projectsData, profileData } from '../data/projects';
import { Project, ProjectCategory } from '../types';

interface ReducedMotionLayoutProps {
  onSelectProject: (project: Project) => void;
}

export const ReducedMotionLayout: React.FC<ReducedMotionLayoutProps> = ({
  onSelectProject,
}) => {
  const [activeFilter, setActiveFilter] = useState<'All' | ProjectCategory>('All');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.emailPlaceholder);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    if (profileData.phone) {
      navigator.clipboard.writeText(profileData.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const visibleProjects = projectsData.filter((p) => p.visible !== false);
  const filteredProjects =
    activeFilter === 'All'
      ? visibleProjects
      : visibleProjects.filter((p) => p.category === activeFilter);

  const filterCounts = {
    All: visibleProjects.length,
    Apps: visibleProjects.filter((p) => p.category === 'Apps').length,
    Websites: visibleProjects.filter((p) => p.category === 'Websites').length,
    Dashboards: visibleProjects.filter((p) => p.category === 'Dashboards').length,
  };

  const getCategoryIcon = (cat: string) => {
    if (cat.includes('Backend')) return <Terminal className="w-4 h-4 text-[var(--dynamic-accent)]" />;
    if (cat.includes('Frontend')) return <Code2 className="w-4 h-4 text-[var(--dynamic-accent)]" />;
    return <Database className="w-4 h-4 text-[var(--dynamic-accent)]" />;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 space-y-24">
      {/* 1. HERO SECTION */}
      <section id="origin" className="pt-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[var(--dynamic-accent)] uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10">
          <span className="w-2 h-2 rounded-full bg-[var(--dynamic-accent)]" />
          <span>HYDERABAD (17.3850° N, 78.4867° E) · B.TECH 2026</span>
        </div>

        <h1 className="font-sans font-bold text-4xl sm:text-6xl md:text-7xl text-white tracking-tight">
          {profileData.name}
        </h1>

        <p className="font-sans text-xl sm:text-2xl text-slate-300 font-medium max-w-2xl mx-auto">
          {profileData.statusLine}
        </p>

        <p className="font-sans text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
          {profileData.bioSentence}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4 font-mono text-xs">
          <a
            href="#projects"
            className="px-5 py-2.5 rounded-lg bg-[var(--dynamic-accent)] text-canvas-deep font-semibold transition-transform hover:scale-105"
          >
            Explore Projects ({visibleProjects.length}) ↓
          </a>
          <a
            href={profileData.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-canvas-card border border-white/10 text-slate-200 hover:text-white"
          >
            <Github className="w-4 h-4 text-[var(--dynamic-accent)]" />
            <span>GitHub Profile</span>
          </a>
        </div>
      </section>

      {/* 2. THE LAB / PROJECTS CONSTELLATION (STACKED GRID) */}
      <section id="projects" className="space-y-8 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="font-mono text-xs text-[var(--dynamic-accent)] uppercase tracking-wider mb-1">
              Chapter 02 // Constellation
            </div>
            <h2 className="font-sans font-bold text-3xl text-white tracking-tight">
              Project Nodes
            </h2>
          </div>

          {/* Filter Chips Bar */}
          <div className="flex items-center gap-1.5 flex-wrap font-mono text-xs" role="tablist">
            {(['All', 'Apps', 'Websites', 'Dashboards'] as const).map((cat) => {
              const isSelected = activeFilter === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-3 py-1.5 rounded-full border transition-all ${
                    isSelected
                      ? 'bg-[var(--dynamic-accent)] text-canvas-deep font-bold border-[var(--dynamic-accent)]'
                      : 'bg-canvas-card text-slate-400 border-white/10 hover:text-white'
                  }`}
                >
                  <span>{cat}</span>{' '}
                  <span className="text-[10px] opacity-75">({filterCounts[cat]})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive Grid of Non-Overlapping Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-xl bg-canvas-card border border-white/10 hover:border-[var(--dynamic-accent)] transition-all p-5 flex flex-col justify-between"
            >
              {/* Card Body Button */}
              <button
                type="button"
                onClick={() => onSelectProject(project)}
                className="text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dynamic-accent)] rounded-lg cursor-pointer"
                aria-label={`Open details for ${project.title}`}
              >
                <div className="flex items-center justify-between gap-2 mb-2 font-mono text-[10px]">
                  <span className="text-slate-400 uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/5 border border-white/5">
                    {project.category}
                  </span>
                  {project.liveUrl ? (
                    <span className="text-[var(--dynamic-accent)] font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--dynamic-accent)]" />
                      LIVE
                    </span>
                  ) : (
                    <span className="text-slate-500">{project.statusBadge || 'REPO'}</span>
                  )}
                </div>

                <h3 className="font-sans font-bold text-xl text-white group-hover:text-[var(--dynamic-accent)] transition-colors mb-1">
                  {project.title}
                </h3>

                <p className="font-sans text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                  {project.tagline}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {project.stack.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </button>

              {/* Sibling Footer Action Bar */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  className="text-[var(--dynamic-accent)] font-semibold hover:underline flex items-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dynamic-accent)] rounded"
                >
                  <span>Inspect Details</span>
                  <span>→</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} source on GitHub`}
                    className="p-1 rounded text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dynamic-accent)]"
                    title="View Source on GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live application`}
                      className="p-1 rounded text-[var(--dynamic-accent)] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dynamic-accent)]"
                      title="Launch Live App"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section id="architecture" className="space-y-6 scroll-mt-24">
        <div className="border-b border-white/10 pb-3">
          <div className="font-mono text-xs text-[var(--dynamic-accent)] uppercase tracking-wider mb-1">
            Chapter 03 // Architecture
          </div>
          <h2 className="font-sans font-bold text-3xl text-white tracking-tight">
            About &amp; Technical Capabilities
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 p-6 rounded-2xl bg-canvas-card border border-white/10 space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--dynamic-accent)]" />
              <span>Verified Engineering Summary</span>
            </h3>

            <p className="font-sans text-base sm:text-lg text-slate-200 leading-relaxed font-medium">
              "{profileData.bioSentence}"
            </p>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 font-mono text-xs">
              <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                <div className="text-slate-400 text-[10px]">Academic Batch</div>
                <div className="text-white font-semibold">B.Tech 2026</div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                <div className="text-slate-400 text-[10px]">Location Base</div>
                <div className="text-white font-semibold">Hyderabad, India</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {profileData.skills.map((s, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-white mb-2 uppercase">
                    {getCategoryIcon(s.category)}
                    <span>{s.category}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {s.items.map((it) => (
                      <span
                        key={it}
                        className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-slate-300"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-canvas-surface border border-white/10 space-y-3 font-mono text-xs">
            <div className="text-[var(--dynamic-accent)] font-semibold uppercase tracking-wider mb-2">
              Direct Channels
            </div>

            <div className="p-3 rounded-xl bg-canvas-card border border-white/10 space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[var(--dynamic-accent)]" />
                  <span>Email</span>
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="text-[10px] text-[var(--dynamic-accent)] hover:underline flex items-center gap-1"
                >
                  {copiedEmail ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="text-white text-xs font-semibold">{profileData.emailPlaceholder}</div>
            </div>

            {profileData.phone && (
              <div className="p-3 rounded-xl bg-canvas-card border border-white/10 space-y-1">
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[var(--dynamic-accent)]" />
                    <span>Phone</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${profileData.phone.replace(/\s+/g, '')}`}
                      className="text-[10px] text-[var(--dynamic-accent)] hover:underline"
                    >
                      Call
                    </a>
                    <button
                      onClick={handleCopyPhone}
                      className="text-[10px] text-[var(--dynamic-accent)] hover:underline flex items-center gap-1"
                    >
                      {copiedPhone ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
                <div className="text-white text-xs font-semibold">{profileData.phone}</div>
              </div>
            )}

            <div className="p-3 rounded-xl bg-canvas-card border border-white/10 space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[var(--dynamic-accent)]" />
                  <span>Resume</span>
                </span>
                <a
                  href={profileData.resumePdfPlaceholder}
                  download="Yuvaraju_Dharmana_Resume.pdf"
                  className="text-[10px] text-[var(--dynamic-accent)] hover:underline"
                >
                  Download PDF
                </a>
              </div>
              <div className="text-slate-300 text-xs">Yuvaraju_Dharmana_Resume.pdf</div>
            </div>

            <div className="p-3 rounded-xl bg-canvas-card border border-white/10 space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span className="flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-[var(--dynamic-accent)]" />
                  <span>LinkedIn</span>
                </span>
                <a
                  href={profileData.linkedinPlaceholder}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-[var(--dynamic-accent)] hover:underline"
                >
                  Connect →
                </a>
              </div>
              <div className="text-slate-300 text-xs">linkedin.com/in/yuvaraju-dharmana</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CONTACT SECTION */}
      <section id="terminus" className="space-y-6 scroll-mt-24 border-t border-white/10 pt-12 text-center">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[var(--dynamic-accent)] uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--dynamic-accent)]" />
          <span>Chapter 04 // Terminus</span>
        </div>

        <h2 className="font-sans font-bold text-3xl sm:text-4xl text-white tracking-tight">
          Initiate Transmission
        </h2>

        <p className="font-sans text-sm sm:text-base text-slate-400 max-w-lg mx-auto">
          Reach out for engineering roles, technical collaboration in Python backend, ML systems, or questions regarding the project lab.
        </p>

        <div className="max-w-xl mx-auto rounded-2xl bg-canvas-card border border-white/10 p-6 text-left space-y-3 font-mono text-xs">
          <a
            href={profileData.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Github className="w-5 h-5 text-[var(--dynamic-accent)]" />
              <div>
                <div className="text-slate-400 text-[10px]">GitHub Repository Index</div>
                <div className="text-white font-semibold">github.com/dharmanayuvaraju</div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </a>

          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-3 truncate">
              <Mail className="w-5 h-5 text-[var(--dynamic-accent)] shrink-0" />
              <div className="truncate">
                <div className="text-slate-400 text-[10px]">Direct Email</div>
                <div className="text-white font-semibold truncate">{profileData.emailPlaceholder}</div>
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              className="ml-2 px-2.5 py-1.5 rounded bg-white/10 text-[var(--dynamic-accent)] flex items-center gap-1 shrink-0"
            >
              {copiedEmail ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {profileData.phone && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-3 truncate">
                <Phone className="w-5 h-5 text-[var(--dynamic-accent)] shrink-0" />
                <div className="truncate">
                  <div className="text-slate-400 text-[10px]">Direct Phone</div>
                  <div className="text-white font-semibold truncate">{profileData.phone}</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                <a
                  href={`tel:${profileData.phone.replace(/\s+/g, '')}`}
                  className="px-2.5 py-1.5 rounded bg-white/10 text-[var(--dynamic-accent)]"
                >
                  Call
                </a>
                <button
                  onClick={handleCopyPhone}
                  className="px-2.5 py-1.5 rounded bg-white/10 text-[var(--dynamic-accent)] flex items-center gap-1"
                >
                  {copiedPhone ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
            <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[var(--dynamic-accent)]" />
              <span className="text-slate-300">Hyderabad, India</span>
            </div>
            <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[var(--dynamic-accent)]" />
              <span className="text-slate-300">IST (UTC +05:30)</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
