import React, { useState, useRef } from 'react';
import { Project, ProjectCategory } from '../../types';
import { ProjectCard } from '../ProjectCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectsChapterProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  activeFilter: string;
  onSelectFilter: (filter: string) => void;
  focalProject?: Project | null;
}

export const ProjectsChapter: React.FC<ProjectsChapterProps> = ({
  projects,
  onSelectProject,
  activeFilter,
  onSelectFilter,
  focalProject,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const categories: ('All' | ProjectCategory)[] = ['All', 'Apps', 'Websites', 'Dashboards'];

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const getCount = (cat: string) => {
    if (cat === 'All') return projects.length;
    return projects.filter((p) => p.category === cat).length;
  };

  const handleScrollToCard = (direction: 'next' | 'prev') => {
    if (!carouselRef.current) return;
    const nextIdx =
      direction === 'next'
        ? Math.min(filteredProjects.length - 1, carouselIndex + 1)
        : Math.max(0, carouselIndex - 1);

    const cardWidth = carouselRef.current.clientWidth;
    carouselRef.current.scrollTo({
      left: nextIdx * cardWidth,
      behavior: 'smooth',
    });
    setCarouselIndex(nextIdx);
  };

  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const cardWidth = carouselRef.current.clientWidth;
    if (cardWidth <= 0) return;
    const idx = Math.round(carouselRef.current.scrollLeft / cardWidth);
    setCarouselIndex(idx);
  };

  return (
    <section id="projects" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
      {/* Chapter Title & Filter Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>Featured Engineering Work</span>
          </div>
          <h2 className="font-sans font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Projects
          </h2>
        </div>

        {/* Filter Pills - scrollable row on mobile, must NEVER clip */}
        <div
          className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none py-1 px-1 -mx-1 max-w-full"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {categories.map((cat) => {
            const isSelected = activeFilter === cat;
            return (
              <button
                key={cat}
                role="tab"
                type="button"
                aria-selected={isSelected}
                onClick={() => {
                  onSelectFilter(cat);
                  setCarouselIndex(0);
                  if (carouselRef.current) {
                    carouselRef.current.scrollTo({ left: 0 });
                  }
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs font-mono min-h-[44px] min-w-[44px] justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent shrink-0 ${
                  isSelected
                    ? 'bg-accent text-black font-bold border-accent'
                    : 'bg-[#121520] text-slate-300 border-white/10 hover:text-white hover:border-white/30'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-black/20 text-black' : 'bg-white/10 text-slate-400'
                  }`}
                >
                  {getCount(cat)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MOBILE VIEW (<768px): ONE Card at a time, scroll-snap carousel, full width, 16px padding */}
      <div className="block md:hidden">
        {/* Mobile Carousel Controls & Progress */}
        <div className="flex items-center justify-between mb-3 px-1 text-xs font-mono text-slate-400">
          <span>
            Project {carouselIndex + 1} of {filteredProjects.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleScrollToCard('prev')}
              disabled={carouselIndex === 0}
              aria-label="Previous project card"
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white disabled:opacity-30 min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => handleScrollToCard('next')}
              disabled={carouselIndex >= filteredProjects.length - 1}
              aria-label="Next project card"
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white disabled:opacity-30 min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          onScroll={handleCarouselScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-none w-full"
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="snap-center w-full min-w-full shrink-0"
            >
              <ProjectCard
                project={project}
                onSelect={onSelectProject}
                isFocal={focalProject?.id === project.id}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP & TABLET VIEW (>=768px): Responsive Non-Overlapping Grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onSelect={onSelectProject}
            isFocal={focalProject?.id === project.id}
          />
        ))}
      </div>
    </section>
  );
};
