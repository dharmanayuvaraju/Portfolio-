import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Project } from '../types';
import { ProjectObject } from './ThreeModels';
import { ThreeParticles } from './ThreeParticles';

interface ThreeCanvasProps {
  projects: Project[];
  scrollProgress: number; // 0 to 1
  onNearestProjectChange: (project: Project | null, index: number) => void;
  onLowFps: () => void;
  isMobile: boolean;
}

// Camera Flight Path along a smooth CatmullRom Curve
function createFlightCurve(): THREE.CatmullRomCurve3 {
  const points = [
    new THREE.Vector3(0, 0, 8),        // 0.00: Hero Origin
    new THREE.Vector3(0, 0, 2),        // 0.05: Transition
    new THREE.Vector3(-0.2, 0.2, -4),  // 0.11: Project 1 (AI Job Hunt)
    new THREE.Vector3(0.2, -0.1, -9),  // 0.17: Project 2 (CafeLive)
    new THREE.Vector3(-0.3, 0.2, -14), // 0.23: Project 3 (Kora - Dine OS)
    new THREE.Vector3(0.3, 0.1, -19),  // 0.29: Project 4 (Do It Now)
    new THREE.Vector3(-0.2, -0.2, -24),// 0.35: Project 5 (Job-Tracker)
    new THREE.Vector3(0.3, 0.2, -29),  // 0.41: Project 6 (Teja Studios)
    new THREE.Vector3(-0.3, 0.1, -34), // 0.47: Project 7 (GhatMitra)
    new THREE.Vector3(0.2, -0.1, -39), // 0.53: Project 8 (ChaiBagh)
    new THREE.Vector3(-0.2, 0.2, -44), // 0.59: Project 9 (Swathi Tiffins)
    new THREE.Vector3(0.3, -0.1, -49), // 0.65: Project 10 (Retail Sales)
    new THREE.Vector3(-0.3, 0.1, -54), // 0.71: Project 11 (E-Commerce)
    new THREE.Vector3(0.2, 0.0, -59),  // 0.77: Project 12 (University)
    new THREE.Vector3(0, 0, -68),      // 0.86: Approach About
    new THREE.Vector3(0, 0, -78),      // 1.00: Approach Contact
  ];
  return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5);
}

// Internal Scene Rig that manages camera positioning and nearest project tracking
const SceneRig: React.FC<{
  projects: Project[];
  scrollProgress: number;
  onNearestChange: (project: Project | null, index: number) => void;
  onLowFps: () => void;
  isMobile: boolean;
}> = ({ projects, scrollProgress, onNearestChange, onLowFps, isMobile }) => {
  const { camera } = useThree();
  const curve = useMemo(() => createFlightCurve(), []);
  const curTRef = useRef(0);
  const lookTargetRef = useRef(new THREE.Vector3(0, 0, -10));

  // FPS Probe for 1 second
  const frameCountRef = useRef(0);
  const fpsStartTimeRef = useRef<number | null>(null);
  const probeDoneRef = useRef(false);

  const [nearestIndex, setNearestIndex] = useState<number>(0);

  // Initial notification
  useEffect(() => {
    if (projects.length > 0) {
      onNearestChange(projects[0], 0);
    }
  }, [projects, onNearestChange]);

  useFrame((_, delta) => {
    // 1. FPS Probe Check
    if (!probeDoneRef.current) {
      if (fpsStartTimeRef.current === null) {
        fpsStartTimeRef.current = performance.now();
      } else {
        frameCountRef.current++;
        const elapsed = performance.now() - fpsStartTimeRef.current;
        if (elapsed >= 1000) {
          probeDoneRef.current = true;
          const measuredFps = (frameCountRef.current / elapsed) * 1000;
          const minFps = isMobile ? 30 : 40;
          if (measuredFps < minFps) {
            onLowFps();
          }
        }
      }
    }

    // 2. Camera movement along curve
    const targetT = Math.min(1, Math.max(0, scrollProgress));
    // Responsive smooth lerp
    curTRef.current += (targetT - curTRef.current) * Math.min(1, delta * 9);
    const clampedT = Math.min(0.999, Math.max(0.001, curTRef.current));

    const camPos = curve.getPointAt(clampedT);
    camera.position.copy(camPos);

    // Look ahead along curve
    const lookAheadT = Math.min(1, clampedT + 0.035);
    const targetLookAt = curve.getPointAt(lookAheadT);
    lookTargetRef.current.lerp(targetLookAt, 0.15);
    camera.lookAt(lookTargetRef.current);

    // 3. Find closest project object to the camera
    let closestDist = Infinity;
    let closestIdx = -1;

    for (let i = 0; i < projects.length; i++) {
      const p = projects[i];
      const dist = Math.abs(p.pos3D.z - camPos.z);
      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = i;
      }
    }

    if (closestDist < 6.0 && closestIdx >= 0) {
      if (closestIdx !== nearestIndex) {
        setNearestIndex(closestIdx);
        onNearestChange(projects[closestIdx], closestIdx);
      }
    }
  });

  return (
    <>
      {/* 3D Fog: depth without per-frame CSS blur */}
      <fog attach="fog" args={['#0a0b10', 8, 30]} />

      {/* 1 ambient + 1 directional light (hard performance rule: flat light, no shadows) */}
      <ambientLight intensity={0.9} color="#e5e8f0" />
      <directionalLight position={[5, 10, 5]} intensity={1.2} color="#fff4e8" />

      {/* Particles: ONE THREE.Points (600 mobile / 1500 desktop) */}
      <ThreeParticles isMobile={isMobile} />

      {/* Project 3D Objects */}
      {projects.map((p, idx) => {
        // Mobile optimization: render only objects within active scroll distance
        if (isMobile) {
          const camZ = camera.position.z;
          const distZ = Math.abs(p.pos3D.z - camZ);
          if (distZ > 22) return null;
        }

        const isNearest = idx === nearestIndex;

        return (
          <ProjectObject
            key={p.id}
            type={p.modelType}
            position={[p.pos3D.x, p.pos3D.y, p.pos3D.z]}
            isNearest={isNearest}
            isMobile={isMobile}
          />
        );
      })}
    </>
  );
};

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  projects,
  scrollProgress,
  onNearestProjectChange,
  onLowFps,
  isMobile,
}) => {
  const [isTabVisible, setIsTabVisible] = useState(true);

  useEffect(() => {
    const handleVisChange = () => {
      setIsTabVisible(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', handleVisChange);
    return () => document.removeEventListener('visibilitychange', handleVisChange);
  }, []);

  const dpr = Math.min(
    typeof window !== 'undefined' ? window.devicePixelRatio : 1,
    isMobile ? 1.25 : 1.75
  );

  if (!isTabVisible) {
    return <div className="fixed inset-0 bg-[#0a0b10] pointer-events-none" />;
  }

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        gl={{
          antialias: !isMobile,
          powerPreference: 'high-performance',
          alpha: false,
          depth: true,
        }}
        dpr={dpr}
        camera={{ position: [0, 0, 8], fov: isMobile ? 58 : 48, near: 0.1, far: 50 }}
        style={{ background: '#0a0b10' }}
      >
        <SceneRig
          projects={projects}
          scrollProgress={scrollProgress}
          onNearestChange={onNearestProjectChange}
          onLowFps={onLowFps}
          isMobile={isMobile}
        />
      </Canvas>
    </div>
  );
};

export default ThreeCanvas;
