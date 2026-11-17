import React from 'react';
import { projectsData } from '../data/projects';

interface TelemetryHUDProps {
  cameraZ: number;
  currentChapter: number;
  scrollProgress: number;
  activeFilter: string;
}

export const TelemetryHUD: React.FC<TelemetryHUDProps> = ({
  cameraZ,
  currentChapter,
  scrollProgress,
  activeFilter,
}) => {
  const visibleProjects = projectsData.filter((p) => p.visible !== false);
  const filteredCount =
    activeFilter === 'All'
      ? visibleProjects.length
      : visibleProjects.filter((p) => p.category === activeFilter).length;

  const chapterNames = [
    'ORIGIN // HERO',
    `CONSTELLATION // ${filteredCount} NODES (${activeFilter.toUpperCase()})`,
    'ARCHITECTURE // ABOUT',
    'TERMINUS // CONTACT',
  ];

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-6 z-20 pointer-events-none flex items-end justify-between font-mono text-[10px] text-slate-500">
      {/* Left: Depth & Accurate Node Telemetry */}
      <div className="space-y-1 bg-canvas-deep/70 backdrop-blur-sm p-2 rounded-lg border border-white/5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--dynamic-accent)] animate-pulse" />
          <span className="text-slate-300 font-semibold">{chapterNames[currentChapter]}</span>
        </div>
        <div className="text-slate-500">
          Z_AXIS: <span className="text-white">{Math.round(cameraZ)}px</span> · NODES: <span className="text-[var(--dynamic-accent)]">{filteredCount}</span> · STREAMS: <span className="text-slate-300">1100</span>
        </div>
      </div>

      {/* Right: Scroll Progress Bar */}
      <div className="flex flex-col items-end gap-1.5 bg-canvas-deep/70 backdrop-blur-sm p-2 rounded-lg border border-white/5">
        <div className="text-slate-400">
          TRAVERSE: <span className="text-white">{Math.round(scrollProgress * 100)}%</span>
        </div>
        <div className="w-24 sm:w-36 h-1 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-[var(--dynamic-accent)] transition-all duration-75"
            style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
          />
        </div>
      </div>
    </div>
  );
};
