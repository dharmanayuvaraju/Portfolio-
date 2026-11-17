import React from 'react';
import { motion } from 'framer-motion';
import { ProjectCategory } from '../types';
import { projectsData } from '../data/projects';

interface ConstellationFilterHUDProps {
  activeFilter: string;
  onSelectFilter: (filter: string) => void;
  visible: boolean;
}

export const ConstellationFilterHUD: React.FC<ConstellationFilterHUDProps> = ({
  activeFilter,
  onSelectFilter,
  visible,
}) => {
  const categories: ('All' | ProjectCategory)[] = ['All', 'Apps', 'Websites', 'Dashboards'];

  const getCount = (cat: string) => {
    if (cat === 'All') return projectsData.filter((p) => p.visible !== false).length;
    return projectsData.filter((p) => p.visible !== false && p.category === cat).length;
  };

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="fixed top-20 left-1/2 -translate-x-1/2 z-20 pointer-events-auto"
    >
      <div className="flex items-center gap-1.5 p-1 rounded-full bg-canvas-card/90 border border-white/10 backdrop-blur-md shadow-2xl font-mono text-xs">
        {categories.map((cat) => {
          const isSelected = activeFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectFilter(cat)}
              className={`relative px-3.5 py-1.5 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dynamic-accent)] ${
                isSelected
                  ? 'text-canvas-deep font-bold bg-[var(--dynamic-accent)] shadow-md shadow-[var(--dynamic-accent-dim)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1 py-0.2 rounded-full ${
                    isSelected ? 'bg-black/20 text-black' : 'bg-white/10 text-slate-400'
                  }`}
                >
                  {getCount(cat)}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};
