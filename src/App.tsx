import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { Project } from './types';
import { projectsData } from './data/projects';
import { Navbar } from './components/Navbar';
import { MobileTabBar } from './components/MobileTabBar';
import { HeroChapter } from './components/Chapters/HeroChapter';
import { ProjectsChapter } from './components/Chapters/ProjectsChapter';
import { AboutChapter } from './components/Chapters/AboutChapter';
import { ContactChapter } from './components/Chapters/ContactChapter';
import { FlightLabelOverlay } from './components/FlightLabelOverlay';
import { NodeDetailFlyout } from './components/NodeDetailFlyout';
import { IntroSequence } from './components/IntroSequence';
import { recordVisitorPageView } from './utils/supabase';
import { trackPageView } from './utils/analytics';

// Lazy-load the Three.js scene (First-load JS under 150KB gzip budget)
const ThreeCanvas = React.lazy(() => import('./components/ThreeCanvas'));

// Auto Lite detection helper: fresh visits default to 3D mode!
function detectAutoLite(): boolean {
  if (typeof window === 'undefined') return false;
  const saved = localStorage.getItem('portfolio_lite_mode');
  if (saved !== null) {
    return saved === 'true';
  }

  // Fresh visits MUST default to 3D mode
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nav = navigator as any;
  const isSaveData = nav.connection?.saveData === true;

  let hasWebGL = false;
  try {
    const canvas = document.createElement('canvas');
    hasWebGL = !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    hasWebGL = false;
  }

  if (!hasWebGL || isReducedMotion || isSaveData) {
    return true;
  }

  // Hard constraints: only if both CPU AND memory are strictly <= 4
  const isLowCpu = typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 4;
  const isLowMem = typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4;
  if (isLowCpu && isLowMem) {
    return true;
  }

  return false;
}

export const App: React.FC = () => {
  // Lite mode state (persisted in localStorage)
  const [liteMode, setLiteMode] = useState<boolean>(() => detectAutoLite());
  const [introActive, setIntroActive] = useState<boolean>(() => !detectAutoLite());

  // Toast notification for automatic FPS fallback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active filter state
  const [activeFilter, setActiveFilter] = useState('All');

  // Selected project for modal dialog
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Focal project currently passed by 3D camera
  const [focalProject, setFocalProject] = useState<Project | null>(() => projectsData[0]);
  const [focalIndex, setFocalIndex] = useState<number>(0);

  // Scroll progress for 3D camera flight (0 to 1)
  const [scrollProgress, setScrollProgress] = useState(0);

  // Current active chapter (0: Home, 1: Projects, 2: About, 3: Contact)
  const [currentChapter, setCurrentChapter] = useState(0);

  // Mobile viewport detection
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') return window.innerWidth < 768;
    return false;
  });

  // Record Supabase visitor on initial mount (guarded by sessionStorage)
  useEffect(() => {
    recordVisitorPageView();
  }, []);

  // Track chapter change with GA4
  useEffect(() => {
    const chapterNames = ['home', 'projects', 'about', 'contact'];
    trackPageView(chapterNames[currentChapter]);
  }, [currentChapter]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Listen to OS prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setLiteMode(true);
        setIntroActive(false);
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Toggle Lite Mode with persistence
  const toggleLiteMode = useCallback(() => {
    setLiteMode((prev) => {
      const next = !prev;
      localStorage.setItem('portfolio_lite_mode', String(next));
      return next;
    });
  }, []);

  // Handle Low FPS fallback from 3D probe
  const handleLowFpsFallback = useCallback(() => {
    // If the user explicitly chose 3D mode in localStorage, respect their preference
    const saved = localStorage.getItem('portfolio_lite_mode');
    if (saved === 'false') return;

    setLiteMode(true);
    localStorage.setItem('portfolio_lite_mode', 'true');
    setToastMessage('Switched to Lite mode for smoother performance.');
    setTimeout(() => {
      setToastMessage(null);
    }, 6000);
  }, []);

  // Memoized callback to update nearest project without triggering extra renders
  const handleNearestProjectChange = useCallback((proj: Project | null, idx: number) => {
    if (proj) {
      setFocalProject(proj);
      setFocalIndex(idx);
    }
  }, []);

  // Scroll tracking driving camera progress and chapter detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      const heroEl = document.getElementById('home');
      const aboutEl = document.getElementById('about');
      const contactEl = document.getElementById('contact');

      // 1. Precise Chapter Detection using getBoundingClientRect()
      if (contactEl && contactEl.getBoundingClientRect().top <= vh * 0.5) {
        setCurrentChapter(3);
      } else if (aboutEl && aboutEl.getBoundingClientRect().top <= vh * 0.5) {
        setCurrentChapter(2);
      } else if (heroEl && heroEl.getBoundingClientRect().bottom > vh * 0.35) {
        setCurrentChapter(0);
      } else {
        setCurrentChapter(1);
      }

      // 2. 3D Flight Progress Calculation
      if (!liteMode && heroEl) {
        const heroHeight = heroEl.offsetHeight;
        const flightCorridorEl = document.getElementById('flight-corridor');
        const corridorHeight = flightCorridorEl ? flightCorridorEl.offsetHeight : vh * 4.5;

        if (scrollY <= heroHeight * 0.35) {
          setScrollProgress(0);
        } else {
          // Progress from 0 to 1 across the flight corridor
          const rawProgress = (scrollY - heroHeight * 0.35) / corridorHeight;
          const progress = Math.min(1, Math.max(0, rawProgress));
          setScrollProgress(progress);
        }
      } else if (liteMode) {
        const maxScroll = document.documentElement.scrollHeight - vh;
        if (maxScroll > 0) {
          setScrollProgress(Math.min(1, Math.max(0, scrollY / maxScroll)));
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [liteMode]);

  // Chapter Navigation Handler
  const navigateToChapter = useCallback(
    (chapterIndex: number) => {
      if (chapterIndex === 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (chapterIndex === 1) {
        if (liteMode) {
          const el = document.getElementById('projects');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
          const heroEl = document.getElementById('home');
          const heroHeight = heroEl ? heroEl.offsetHeight : window.innerHeight;
          window.scrollTo({ top: heroHeight, behavior: 'smooth' });
        }
        return;
      }

      const targetId = chapterIndex === 2 ? 'about' : 'contact';
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [liteMode]
  );

  // Jump camera directly to project index along the flight
  const navigateToProjectIndex = useCallback((index: number) => {
    const heroEl = document.getElementById('home');
    const heroHeight = heroEl ? heroEl.offsetHeight : window.innerHeight;
    const flightCorridorEl = document.getElementById('flight-corridor');
    const corridorHeight = flightCorridorEl ? flightCorridorEl.offsetHeight : window.innerHeight * 4.5;

    // Map index 0..11 to progress t = 0.08 .. 0.85
    const t = 0.08 + (index / 11) * (0.85 - 0.08);
    window.scrollTo({ top: heroHeight * 0.35 + t * corridorHeight, behavior: 'smooth' });
  }, []);

  // Filtered projects list
  const filteredProjects =
    activeFilter === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  // Determine if flight label overlay should be visible in 3D mode
  const isFlightLabelVisible =
    !liteMode &&
    currentChapter === 1 &&
    scrollProgress >= 0.02 &&
    scrollProgress <= 0.95;

  return (
    <div className="relative min-h-screen bg-[#0a0b10] text-[#f5f3ef] selection:bg-accent selection:text-black">
      {/* 1. Top Navbar */}
      <Navbar
        currentChapter={currentChapter}
        onNavigateChapter={navigateToChapter}
        liteMode={liteMode}
        toggleLiteMode={toggleLiteMode}
      />

      {/* 2. Three.js 3D Background Canvas (Continuous camera flight) */}
      {!liteMode && (
        <Suspense fallback={null}>
          <ThreeCanvas
            projects={projectsData}
            scrollProgress={scrollProgress}
            onNearestProjectChange={handleNearestProjectChange}
            onLowFps={handleLowFpsFallback}
            isMobile={isMobile}
          />
        </Suspense>
      )}

      {/* 3. 3D FLIGHT MODE VIEW (Primary View: Camera Flight + Focal Labels) */}
      {!liteMode ? (
        <div className="relative">
          {/* 0. Hero Section: Top of site with Intro Video */}
          <div className="relative z-10 bg-[#0a0b10]">
            <HeroChapter onExplore={() => navigateToChapter(1)} />
          </div>

          {/* Virtual scroll corridor that drives the CatmullRom camera flight */}
          <div
            id="flight-corridor"
            className="w-full pointer-events-none"
            style={{ height: '450vh' }}
            aria-hidden="true"
          />

          {/* Floating HTML Label Overlay for active 3D project object */}
          <FlightLabelOverlay
            focalProject={focalProject}
            focalIndex={focalIndex}
            totalProjects={projectsData.length}
            activeFilter={activeFilter}
            onSelectFilter={setActiveFilter}
            onSelectProject={(p) => setSelectedProject(p)}
            onNavigateToProjectIndex={navigateToProjectIndex}
            visible={isFlightLabelVisible}
          />

          {/* End of Flight: About & Contact DOM Overlays (Solid, readable, outside 3D space) */}
          <main className="relative z-10 bg-[#0a0b10] border-t border-white/10 pt-16 pb-24 sm:pb-16">
            <AboutChapter />
            <ContactChapter onRewindToTop={() => navigateToChapter(0)} />
          </main>
        </div>
      ) : (
        /* 4. LITE MODE VIEW (Clean 2D Fallback: Stacked layout) */
        <main className="relative z-10 pt-16 pb-24 sm:pb-16">
          <HeroChapter onExplore={() => navigateToChapter(1)} />

          <ProjectsChapter
            projects={filteredProjects}
            onSelectProject={(p) => setSelectedProject(p)}
            activeFilter={activeFilter}
            onSelectFilter={setActiveFilter}
            focalProject={focalProject}
          />

          <AboutChapter />
          <ContactChapter onRewindToTop={() => navigateToChapter(0)} />
        </main>
      )}

      {/* 5. Mobile Bottom Tab Bar (<640px) */}
      <MobileTabBar
        currentChapter={currentChapter}
        onNavigateChapter={navigateToChapter}
      />

      {/* 6. Project Detail Flyout Dialog Modal */}
      <NodeDetailFlyout
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* 7. Intro Sequence (skippable, 1.8s) */}
      {introActive && (
        <IntroSequence
          onComplete={() => setIntroActive(false)}
          liteMode={liteMode}
        />
      )}

      {/* 8. Small FPS Fallback Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 p-4 rounded-xl bg-[#121520] border border-accent text-white text-xs font-mono shadow-2xl flex items-center gap-3 animate-fade-in"
        >
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => {
              toggleLiteMode();
              setToastMessage(null);
            }}
            className="text-accent underline font-semibold ml-2 hover:text-white"
          >
            Switch to 3D
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
