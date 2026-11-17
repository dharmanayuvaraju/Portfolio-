import React, { useEffect, useRef } from 'react';
import { projectsData } from '../data/projects';

interface SignalCanvasProps {
  cameraZ: number;
  cameraX: number;
  cameraY: number;
  cameraRotX: number;
  cameraRotY: number;
  hoveredNodeId: string | null;
  reducedMotion: boolean;
}

interface Particle3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  baseSize: number;
  alpha: number;
  pulsePhase: number;
}

export const SignalCanvas: React.FC<SignalCanvasProps> = ({
  cameraZ,
  cameraX,
  cameraY,
  cameraRotX,
  cameraRotY,
  hoveredNodeId,
  reducedMotion,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Keep latest camera/props in ref so RAF loop never re-instantiates or drops frames
  const stateRef = useRef({
    cameraZ,
    cameraX,
    cameraY,
    cameraRotX,
    cameraRotY,
    hoveredNodeId,
    reducedMotion,
  });

  useEffect(() => {
    stateRef.current = {
      cameraZ,
      cameraX,
      cameraY,
      cameraRotX,
      cameraRotY,
      hoveredNodeId,
      reducedMotion,
    };
  }, [cameraZ, cameraX, cameraY, cameraRotX, cameraRotY, hoveredNodeId, reducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Initialize 1100 persistent particles in 3D volume
    const PARTICLE_COUNT = 1100;
    const particles: Particle3D[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 1600,
        y: (Math.random() - 0.5) * 1200,
        z: Math.random() * -6200,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: -0.6 - Math.random() * 0.8,
        baseSize: 1 + Math.random() * 2,
        alpha: 0.2 + Math.random() * 0.6,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Node network links between adjacent project nodes in 3D
    const nodeLinks: [number, number][] = [
      [0, 1],
      [1, 6],
      [0, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [2, 6],
      [6, 7],
      [7, 8],
      [8, 9],
      [9, 10],
      [4, 8],
      [5, 10],
    ];

    // Pulses traveling across node links
    interface StreamPulse {
      linkIdx: number;
      progress: number;
      speed: number;
    }
    const streamPulses: StreamPulse[] = [
      { linkIdx: 0, progress: 0.1, speed: 0.007 },
      { linkIdx: 1, progress: 0.4, speed: 0.009 },
      { linkIdx: 2, progress: 0.7, speed: 0.006 },
      { linkIdx: 3, progress: 0.2, speed: 0.008 },
      { linkIdx: 4, progress: 0.8, speed: 0.007 },
      { linkIdx: 5, progress: 0.5, speed: 0.010 },
      { linkIdx: 6, progress: 0.3, speed: 0.008 },
      { linkIdx: 7, progress: 0.9, speed: 0.006 },
      { linkIdx: 8, progress: 0.6, speed: 0.009 },
      { linkIdx: 9, progress: 0.2, speed: 0.007 },
      { linkIdx: 10, progress: 0.5, speed: 0.008 },
    ];

    let startTime = performance.now();

    // 3D Perspective Projection helper
    const fov = 1100; // focal length matching CSS perspective: 1200px
    const halfW = width / 2;
    const halfH = height / 2;

    const render = (time: number) => {
      const elapsed = time - startTime;
      const {
        cameraZ: cZ,
        cameraX: cX,
        cameraY: cY,
        cameraRotX: rX,
        cameraRotY: rY,
        hoveredNodeId: hId,
        reducedMotion: isReduced,
      } = stateRef.current;

      // 30-Second Hue Drift: cycles cyan -> teal -> violet -> azure -> cyan
      const hue = Math.floor((185 + (elapsed / 30000) * 360) % 360);
      const accentColor = `hsl(${hue}, 100%, 55%)`;
      const accentDim = `hsla(${hue}, 100%, 55%, 0.15)`;
      const accentGlow = `hsla(${hue}, 100%, 65%, 0.4)`;

      // Set CSS variable for seamless chromatic synchronization with DOM elements
      document.documentElement.style.setProperty('--dynamic-accent', accentColor);
      document.documentElement.style.setProperty('--dynamic-accent-dim', accentDim);
      document.documentElement.style.setProperty('--dynamic-accent-glow', accentGlow);

      // Deep void clear
      ctx.fillStyle = '#06070e';
      ctx.fillRect(0, 0, width, height);

      // Camera rotation cosines and sines
      const radY = (rY * Math.PI) / 180;
      const radX = (rX * Math.PI) / 180;
      const cosY = Math.cos(radY);
      const sinY = Math.sin(radY);
      const cosX = Math.cos(radX);
      const sinX = Math.sin(radX);

      // 3D Point to Screen projection function
      const project = (x3d: number, y3d: number, z3d: number) => {
        // Translation relative to camera
        let dx = x3d - cX;
        let dy = y3d - cY;
        let dz = z3d - cZ;

        // Camera yaw rotation (around Y)
        const rx = dx * cosY + dz * sinY;
        const rzTemp = -dx * sinY + dz * cosY;

        // Camera pitch rotation (around X)
        const ry = dy * cosX - rzTemp * sinX;
        const rz = dy * sinX + rzTemp * cosX;

        // Clip if behind camera or too close
        if (rz >= -50) return null;

        const scale = fov / -rz;
        return {
          x: halfW + rx * scale,
          y: halfH + ry * scale,
          scale,
          depth: -rz,
        };
      };

      // 1. Perspective Grid Floor at y = +420
      const floorY = 420;
      ctx.lineWidth = 1;
      ctx.strokeStyle = `hsla(${hue}, 80%, 40%, 0.04)`;

      // Longitudinal lines
      for (let gx = -1200; gx <= 1200; gx += 300) {
        const pStart = project(gx, floorY, cZ);
        const pEnd = project(gx, floorY, cZ - 3000);
        if (pStart && pEnd) {
          ctx.beginPath();
          ctx.moveTo(pStart.x, pStart.y);
          ctx.lineTo(pEnd.x, pEnd.y);
          ctx.stroke();
        }
      }

      // Transverse lines (receding into the depth)
      const baseGridZ = Math.floor(cZ / 400) * 400;
      for (let gz = baseGridZ; gz >= baseGridZ - 3200; gz -= 400) {
        const pLeft = project(-1200, floorY, gz);
        const pRight = project(1200, floorY, gz);
        if (pLeft && pRight) {
          ctx.beginPath();
          ctx.moveTo(pLeft.x, pLeft.y);
          ctx.lineTo(pRight.x, pRight.y);
          ctx.stroke();
        }
      }

      // Find hovered node position if any
      let hoveredPos: { x: number; y: number; z: number } | null = null;
      if (hId) {
        const found = projectsData.find((p) => p.id === hId);
        if (found) {
          hoveredPos = found.pos3D;
        }
      }

      // 2. Draw Network Vector Streams Between Project Nodes
      for (let i = 0; i < nodeLinks.length; i++) {
        const [aIdx, bIdx] = nodeLinks[i];
        const nA = projectsData[aIdx];
        const nB = projectsData[bIdx];
        if (!nA || !nB) continue;

        const pA = project(nA.pos3D.x, nA.pos3D.y, nA.pos3D.z);
        const pB = project(nB.pos3D.x, nB.pos3D.y, nB.pos3D.z);

        if (pA && pB) {
          // Base connection line
          const isLinkHovered = hId === nA.id || hId === nB.id;
          ctx.beginPath();
          ctx.moveTo(pA.x, pA.y);
          ctx.lineTo(pB.x, pB.y);
          ctx.lineWidth = isLinkHovered ? 2 : 1;
          ctx.strokeStyle = isLinkHovered
            ? `hsla(${hue}, 100%, 65%, 0.45)`
            : `hsla(${hue}, 100%, 55%, 0.12)`;
          ctx.stroke();
        }
      }

      // 3. Draw Flowing Signal Pulses traversing along node links
      if (!isReduced) {
        for (let i = 0; i < streamPulses.length; i++) {
          const pulse = streamPulses[i];
          pulse.progress += pulse.speed;
          if (pulse.progress > 1) pulse.progress = 0;

          const [aIdx, bIdx] = nodeLinks[pulse.linkIdx];
          const nA = projectsData[aIdx];
          const nB = projectsData[bIdx];
          if (!nA || !nB) continue;

          // Interpolated 3D position
          const px = nA.pos3D.x + (nB.pos3D.x - nA.pos3D.x) * pulse.progress;
          const py = nA.pos3D.y + (nB.pos3D.y - nA.pos3D.y) * pulse.progress;
          const pz = nA.pos3D.z + (nB.pos3D.z - nA.pos3D.z) * pulse.progress;

          const pt = project(px, py, pz);
          if (pt) {
            const rad = Math.max(1.5, 3 * pt.scale);
            ctx.fillStyle = accentColor;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, rad, 0, Math.PI * 2);
            ctx.fill();

            // Glow ring
            ctx.fillStyle = `hsla(${hue}, 100%, 75%, 0.3)`;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, rad * 2.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // 4. Update and Render Persistent 1100 Particles (Autonomous Motion)
      ctx.fillStyle = accentColor;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!isReduced) {
          // Autonomous drift velocity
          p.x += p.vx;
          p.y += p.vy;
          p.z += p.vz;

          // On hover: gravitational convergence into target node
          if (hoveredPos) {
            const dx = hoveredPos.x - p.x;
            const dy = hoveredPos.y - p.y;
            const dz = hoveredPos.z - p.z;
            const distSq = dx * dx + dy * dy + dz * dz;
            if (distSq < 400000 && distSq > 400) {
              const force = 40 / distSq;
              p.vx += dx * force;
              p.vy += dy * force;
              p.vz += dz * force;
              // Damping
              p.vx *= 0.96;
              p.vy *= 0.96;
              p.vz *= 0.96;
            }
          }

          // Cycle particles around the active camera Z volume
          if (p.z > cZ + 200) {
            p.z = cZ - 5800;
            p.x = (Math.random() - 0.5) * 1600;
            p.y = (Math.random() - 0.5) * 1200;
          } else if (p.z < cZ - 6000) {
            p.z = cZ + 100;
          }
        }

        const proj = project(p.x, p.y, p.z);
        if (!proj) continue;

        // Subtle harmonic pulse per particle
        const pulse = Math.sin(elapsed * 0.002 + p.pulsePhase) * 0.2 + 0.8;
        const currentSize = Math.max(0.8, p.baseSize * proj.scale * pulse);
        const alpha = Math.min(1, Math.max(0.1, p.alpha * proj.scale * 1.4));

        ctx.fillStyle = `hsla(${hue}, 100%, 75%, ${alpha})`;
        ctx.fillRect(
          proj.x - currentSize / 2,
          proj.y - currentSize / 2,
          currentSize,
          currentSize
        );
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
