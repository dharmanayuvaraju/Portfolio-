import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Project } from './types';
import { SignalCanvas } from './components/SignalCanvas';
import { Scene3D } from './components/Scene3D';
import { NodeDetailFlyout } from './components/NodeDetailFlyout';
import { IntroSequence } from './components/IntroSequence';
import { Navbar } from './components/Navbar';
import { ConstellationFilterHUD } from './components/ConstellationFilterHUD';
import { TelemetryHUD } from './components/TelemetryHUD';
import { FilmGrain } from './components/FilmGrain';
import { ReducedMotionLayout } from './components/ReducedMotionLayout';

export const App: React.FC = () => {
  // OS prefers-reduced-motion honored on first load
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  const [introActive, setIntroActive] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return true;
  });

  // Camera coordinates & rotation for 3D mode
  const [cameraZ, setCameraZ] = useState(0);
  const [cameraX, setCameraX] = useState(0);
  const [cameraY, setCameraY] = useState(0);
  const [cameraRotX, setCameraRotX] = useState(0);
  const [cameraRotY, setCameraRotY] = useState(0);

  // Interaction states
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Internal physics targets
  const targetsRef = useRef({
    z: 0,
    x: 0,
    y: 0,
    rotX: 0,
    rotY: 0,
    isFocused: false,
  });

  // Listen to OS prefers-reduced-motion changes
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches) setIntroActive(false);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Update targets when a project node is selected or closed
  useEffect(() => {
    if (selectedProject) {
      targetsRef.current.isFocused = true;
      targetsRef.current.x = selectedProject.pos3D.x;
      targetsRef.current.y = selectedProject.pos3D.y;
      targetsRef.current.z = selectedProject.pos3D.z + 420;
    } else {
      targetsRef.current.isFocused = false;
      targetsRef.current.x = 0;
      targetsRef.current.y = 0;
    }
  }, [selectedProject]);

  // Scroll listener driving Camera Z in 3D mode
  useEffect(() => {
    if (reducedMotion) return;

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      setScrollProgress(progress);

      if (!targetsRef.current.isFocused) {
        // Map 0 -> 0px, 0.35 -> -1800px, 0.7308 -> -3800px, 1.0 -> -5200px
        const z = -progress * 5200;
        targetsRef.current.z = z;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reducedMotion]);

  // Mouse steering listener
  useEffect(() => {
    if (reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const normY = (e.clientY - innerHeight / 2) / (innerHeight / 2);

      targetsRef.current.rotY = normX * 6.0;
      targetsRef.current.rotX = -normY * 4.5;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reducedMotion]);

  // 60fps Spring physics interpolation loop for 3D camera
  useEffect(() => {
    if (reducedMotion) return;

    let animId: number;
    let curZ = targetsRef.current.z;
    let curX = 0;
    let curY = 0;
    let curRotX = 0;
    let curRotY = 0;

    const lerpRate = 0.085;

    const loop = () => {
      const t = targetsRef.current;

      curZ += (t.z - curZ) * lerpRate;
      curX += (t.x - curX) * lerpRate;
      curY += (t.y - curY) * lerpRate;
      curRotX += (t.rotX - curRotX) * lerpRate;
      curRotY += (t.rotY - curRotY) * lerpRate;

      setCameraZ(curZ);
      setCameraX(curX);
      setCameraY(curY);
      setCameraRotX(curRotX);
      setCameraRotY(curRotY);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [reducedMotion]);

  // Calculate current chapter index (0: Origin, 1: Constellation, 2: Architecture, 3: Terminus)
  const currentChapter =
    cameraZ > -800 ? 0 : cameraZ > -3200 ? 1 : cameraZ > -4600 ? 2 : 3;

  // Chapter navigation function with exact focal landing positions
  const navigateToChapter = useCallback((chapterIndex: number) => {
    setSelectedProject(null);
    if (reducedMotion) {
      const targetIds = ['origin', 'projects', 'architecture', 'terminus'];
      const el = document.getElementById(targetIds[chapterIndex]);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    // Exact focal stops: 0 -> 0px, 1 -> -1800px, 2 -> -3800px, 3 -> -5200px
    const progressMap = [0, 1800 / 5200, 3800 / 5200, 1.0];
    const targetScrollY = progressMap[chapterIndex] * maxScroll;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  }, [reducedMotion]);

  return (
    <div className="relative min-h-screen bg-canvas-deep text-slate-100 overflow-x-hidden selection:bg-[var(--dynamic-accent)] selection:text-black">
      {/* Persistent Film Grain Overlay */}
      <FilmGrain />

      {/* Persistent Top Navigation Bar */}
      <Navbar
        currentChapter={currentChapter}
        onNavigateChapter={navigateToChapter}
        reducedMotion={reducedMotion}
        toggleReducedMotion={() => {
          setReducedMotion((prev) => !prev);
          setSelectedProject(null);
        }}
      />

      {/* REDUCED MOTION MODE: Stacked, Non-Overlapping, Fully Readable Layout */}
      {reducedMotion ? (
        <ReducedMotionLayout onSelectProject={(p) => setSelectedProject(p)} />
      ) : (
        /* IMMERSIVE 3D "SIGNAL" MODE */
        <>
          {/* 1. Persistent 2D Canvas */}
          <SignalCanvas
            cameraZ={cameraZ}
            cameraX={cameraX}
            cameraY={cameraY}
            cameraRotX={cameraRotX}
            cameraRotY={cameraRotY}
            hoveredNodeId={hoveredNodeId}
            reducedMotion={reducedMotion}
          />

          {/* 2. Persistent 3D Perspective Scene */}
          <Scene3D
            cameraZ={cameraZ}
            cameraX={cameraX}
            cameraY={cameraY}
            cameraRotX={cameraRotX}
            cameraRotY={cameraRotY}
            activeFilter={activeFilter}
            hoveredNodeId={hoveredNodeId}
            onHoverNode={setHoveredNodeId}
            onSelectNode={(p) => setSelectedProject(p)}
            onExplore={() => navigateToChapter(1)}
            onRewindToTop={() => navigateToChapter(0)}
            reducedMotion={reducedMotion}
          />

          {/* 3. Virtual Scroll Track */}
          <div
            className="relative pointer-events-none w-full z-0"
            style={{ height: '560vh' }}
            aria-hidden="true"
          />

          {/* 4. Constellation Filter HUD */}
          <ConstellationFilterHUD
            activeFilter={activeFilter}
            onSelectFilter={setActiveFilter}
            visible={currentChapter === 1 && !selectedProject}
          />

          {/* 5. Bottom Telemetry & Traverse Progress Bar */}
          <TelemetryHUD
            cameraZ={cameraZ}
            currentChapter={currentChapter}
            scrollProgress={scrollProgress}
            activeFilter={activeFilter}
          />

          {/* 6. Intro Sequence (2-3s ignition, skippable) */}
          {introActive && (
            <IntroSequence
              onComplete={() => setIntroActive(false)}
              reducedMotion={reducedMotion}
            />
          )}
        </>
      )}

      {/* Shared-Element Node Detail Unfolded View (Works seamlessly in both 3D & Reduced Motion) */}
      <NodeDetailFlyout
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        reducedMotion={reducedMotion}
      />
    </div>
  );
};

export default App;
