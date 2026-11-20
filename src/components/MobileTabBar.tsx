import React from 'react';
import { Home, Layers, User, Mail } from 'lucide-react';

interface MobileTabBarProps {
  currentChapter: number;
  onNavigateChapter: (chapterIndex: number) => void;
}

export const MobileTabBar: React.FC<MobileTabBarProps> = ({
  currentChapter,
  onNavigateChapter,
}) => {
  const tabs = [
    { name: 'Home', index: 0, icon: Home },
    { name: 'Projects', index: 1, icon: Layers },
    { name: 'About', index: 2, icon: User },
    { name: 'Contact', index: 3, icon: Mail },
  ];

  return (
    <nav
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0a0b10] border-t border-white/10 px-2 py-1 flex items-center justify-around shadow-2xl"
      aria-label="Mobile chapter bottom navigation"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentChapter === tab.index;

        return (
          <button
            key={tab.name}
            type="button"
            onClick={() => onNavigateChapter(tab.index)}
            className={`flex-1 min-h-[44px] flex flex-col items-center justify-center gap-1 py-1 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              isActive
                ? 'text-accent font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
            aria-label={`Go to ${tab.name} section`}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-accent' : 'text-slate-400'}`} />
            <span className="text-[11px] leading-tight font-sans tracking-tight">
              {tab.name}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
