import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Model3DType } from '../types';

interface ProjectObjectProps {
  type: Model3DType;
  position: [number, number, number];
  isNearest: boolean;
  isMobile: boolean;
  accentColor?: string;
}

// Procedural QR Canvas Texture (256x256 max)
function createQrTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Background: warm off-white
    ctx.fillStyle = '#f5f3ef';
    ctx.fillRect(0, 0, 256, 256);

    // Dark ink squares
    ctx.fillStyle = '#0a0b10';
    const s = 16;
    // Finder patterns (top-left, top-right, bottom-left)
    const drawFinder = (x: number, y: number) => {
      ctx.fillStyle = '#ff6b35'; // Orange outer ring
      ctx.fillRect(x, y, 7 * s, 7 * s);
      ctx.fillStyle = '#f5f3ef';
      ctx.fillRect(x + s, y + s, 5 * s, 5 * s);
      ctx.fillStyle = '#0a0b10';
      ctx.fillRect(x + 2 * s, y + 2 * s, 3 * s, 3 * s);
    };

    drawFinder(2 * s, 2 * s);
    drawFinder(9 * s, 2 * s);
    drawFinder(2 * s, 9 * s);

    // Random QR data blocks
    ctx.fillStyle = '#0a0b10';
    for (let r = 0; r < 16; r++) {
      for (let c = 0; c < 16; c++) {
        if ((r < 8 && c < 8) || (r < 8 && c >= 8) || (r >= 8 && c < 8)) continue;
        if ((r * 7 + c * 13) % 3 === 0 || (r + c) % 5 === 0) {
          ctx.fillRect(c * s, r * s, s - 1, s - 1);
        }
      }
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

export const ProjectObject: React.FC<ProjectObjectProps> = ({
  type,
  position,
  isNearest,
  accentColor = '#ff6b35',
}) => {
  const groupRef = useRef<THREE.Group>(null);

  // Rotate slowly only when it is the nearest object to the camera
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (isNearest) {
      groupRef.current.rotation.y += delta * 0.7;
      if (type === 'qr-cube') {
        groupRef.current.rotation.x += delta * 0.35;
      }
    } else {
      // Return gently toward base angle
      groupRef.current.rotation.y *= 0.95;
      groupRef.current.rotation.x *= 0.95;
    }
  });

  const qrTexture = useMemo(() => {
    if (type === 'qr-cube') {
      return createQrTexture();
    }
    return null;
  }, [type]);

  useEffect(() => {
    return () => {
      if (qrTexture) qrTexture.dispose();
    };
  }, [qrTexture]);

  return (
    <group ref={groupRef} position={position}>
      {/* 1. Low-poly Cafe Cup (CafeLive) */}
      {type === 'cup' && (
        <group scale={[0.8, 0.8, 0.8]}>
          {/* Cup Body */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.7, 0.5, 1.2, 16]} />
            <meshLambertMaterial color="#f5f3ef" />
          </mesh>
          {/* Orange trim rim */}
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.72, 0.72, 0.08, 16]} />
            <meshBasicMaterial color={accentColor} />
          </mesh>
          {/* Coffee liquid surface */}
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.66, 0.66, 0.05, 16]} />
            <meshLambertMaterial color="#2d1d13" />
          </mesh>
          {/* Handle */}
          <mesh position={[0.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.35, 0.09, 8, 16, Math.PI]} />
            <meshLambertMaterial color="#f5f3ef" />
          </mesh>
          {/* Saucer */}
          <mesh position={[0, -0.65, 0]}>
            <cylinderGeometry args={[1.1, 0.9, 0.1, 16]} />
            <meshLambertMaterial color="#e8e5de" />
          </mesh>
        </group>
      )}

      {/* 2. Mini Phone (Do It Now) */}
      {type === 'phone' && (
        <group scale={[0.85, 0.85, 0.85]}>
          {/* Phone body */}
          <mesh>
            <boxGeometry args={[1.0, 1.8, 0.12]} />
            <meshLambertMaterial color="#121520" />
          </mesh>
          {/* Screen */}
          <mesh position={[0, 0, 0.065]}>
            <planeGeometry args={[0.88, 1.62]} />
            <meshBasicMaterial color="#0a0b10" />
          </mesh>
          {/* App UI bar top */}
          <mesh position={[0, 0.6, 0.07]}>
            <planeGeometry args={[0.76, 0.18]} />
            <meshBasicMaterial color={accentColor} />
          </mesh>
          {/* Reminder cards on screen */}
          <mesh position={[0, 0.2, 0.07]}>
            <planeGeometry args={[0.76, 0.25]} />
            <meshBasicMaterial color="#1d2233" />
          </mesh>
          <mesh position={[0, -0.2, 0.07]}>
            <planeGeometry args={[0.76, 0.25]} />
            <meshBasicMaterial color="#252b3d" />
          </mesh>
        </group>
      )}

      {/* 3. Photo Softbox (Teja Studios) */}
      {type === 'softbox' && (
        <group scale={[0.85, 0.85, 0.85]}>
          {/* Softbox cone/pyramid */}
          <mesh position={[0, 0.3, -0.4]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.8, 0.2, 0.9, 4]} />
            <meshLambertMaterial color="#121520" />
          </mesh>
          {/* Diffuser face */}
          <mesh position={[0, 0.3, 0.05]}>
            <planeGeometry args={[1.1, 1.1]} />
            <meshBasicMaterial color="#f5f3ef" />
          </mesh>
          {/* Stand pole */}
          <mesh position={[0, -0.6, -0.4]}>
            <cylinderGeometry args={[0.04, 0.04, 1.2, 8]} />
            <meshLambertMaterial color="#252b3d" />
          </mesh>
          {/* Tripod legs */}
          <mesh position={[0, -1.2, -0.4]} rotation={[0, 0, Math.PI / 6]}>
            <cylinderGeometry args={[0.03, 0.03, 0.6, 6]} />
            <meshLambertMaterial color="#252b3d" />
          </mesh>
        </group>
      )}

      {/* 4. Terminal Window (AI Job Hunt, Job-Tracker) */}
      {type === 'terminal' && (
        <group scale={[0.9, 0.9, 0.9]}>
          {/* Window Frame */}
          <mesh>
            <boxGeometry args={[1.7, 1.2, 0.08]} />
            <meshLambertMaterial color="#121520" />
          </mesh>
          {/* Title Bar */}
          <mesh position={[0, 0.5, 0.045]}>
            <planeGeometry args={[1.65, 0.16]} />
            <meshBasicMaterial color="#1d2233" />
          </mesh>
          {/* 3 Window Dots */}
          <mesh position={[-0.7, 0.5, 0.05]}>
            <circleGeometry args={[0.035, 8]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
          <mesh position={[-0.6, 0.5, 0.05]}>
            <circleGeometry args={[0.035, 8]} />
            <meshBasicMaterial color="#eab308" />
          </mesh>
          <mesh position={[-0.5, 0.5, 0.05]}>
            <circleGeometry args={[0.035, 8]} />
            <meshBasicMaterial color="#22c55e" />
          </mesh>
          {/* Code lines */}
          <mesh position={[-0.2, 0.25, 0.045]}>
            <planeGeometry args={[0.9, 0.05]} />
            <meshBasicMaterial color={accentColor} />
          </mesh>
          <mesh position={[0.0, 0.1, 0.045]}>
            <planeGeometry args={[1.3, 0.04]} />
            <meshBasicMaterial color="#f5f3ef" />
          </mesh>
          <mesh position={[-0.1, -0.05, 0.045]}>
            <planeGeometry args={[1.1, 0.04]} />
            <meshBasicMaterial color="#9e998e" />
          </mesh>
          <mesh position={[-0.3, -0.2, 0.045]}>
            <planeGeometry args={[0.7, 0.04]} />
            <meshBasicMaterial color={accentColor} />
          </mesh>
        </group>
      )}

      {/* 5. Rotating QR-code Cube (Kora - Dine OS) */}
      {type === 'qr-cube' && (
        <group scale={[0.85, 0.85, 0.85]}>
          <mesh>
            <boxGeometry args={[1.3, 1.3, 1.3]} />
            {qrTexture ? (
              <meshBasicMaterial map={qrTexture} />
            ) : (
              <meshBasicMaterial color="#f5f3ef" />
            )}
          </mesh>
          {/* Glowing orange corner brackets */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.34, 1.34, 1.34]} />
            <meshBasicMaterial color={accentColor} wireframe />
          </mesh>
        </group>
      )}

      {/* 6. Bar-chart Stack (Power BI Dashboards) */}
      {type === 'barchart' && (
        <group scale={[0.85, 0.85, 0.85]}>
          {/* Base Pedestal */}
          <mesh position={[0, -0.5, 0]}>
            <boxGeometry args={[1.6, 0.08, 0.8]} />
            <meshLambertMaterial color="#1d2233" />
          </mesh>
          {/* Bar 1 */}
          <mesh position={[-0.5, -0.2, 0]}>
            <boxGeometry args={[0.25, 0.5, 0.25]} />
            <meshLambertMaterial color="#9e998e" />
          </mesh>
          {/* Bar 2 (Orange Accent Highlight) */}
          <mesh position={[-0.15, 0.1, 0]}>
            <boxGeometry args={[0.25, 1.1, 0.25]} />
            <meshLambertMaterial color={accentColor} />
          </mesh>
          {/* Bar 3 */}
          <mesh position={[0.2, -0.05, 0]}>
            <boxGeometry args={[0.25, 0.8, 0.25]} />
            <meshLambertMaterial color="#f5f3ef" />
          </mesh>
          {/* Bar 4 */}
          <mesh position={[0.55, 0.25, 0]}>
            <boxGeometry args={[0.25, 1.4, 0.25]} />
            <meshLambertMaterial color="#ff8452" />
          </mesh>
        </group>
      )}

      {/* 7. Civic Beacon / Pillar (GhatMitra) */}
      {type === 'beacon' && (
        <group scale={[0.85, 0.85, 0.85]}>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.3, 0.45, 1.5, 8]} />
            <meshLambertMaterial color="#1d2233" />
          </mesh>
          <mesh position={[0, 0.8, 0]}>
            <torusGeometry args={[0.35, 0.08, 8, 16]} />
            <meshBasicMaterial color={accentColor} />
          </mesh>
          <mesh position={[0, 1.1, 0]}>
            <cylinderGeometry args={[0.02, 0.04, 0.6, 8]} />
            <meshBasicMaterial color="#f5f3ef" />
          </mesh>
        </group>
      )}

      {/* 8. Teapot (ChaiBagh) */}
      {type === 'teapot' && (
        <group scale={[0.85, 0.85, 0.85]}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.65, 14, 12]} />
            <meshLambertMaterial color="#f5f3ef" />
          </mesh>
          {/* Lid knob */}
          <mesh position={[0, 0.72, 0]}>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshBasicMaterial color={accentColor} />
          </mesh>
          {/* Spout */}
          <mesh position={[0.65, 0.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <cylinderGeometry args={[0.1, 0.18, 0.6, 10]} />
            <meshLambertMaterial color="#f5f3ef" />
          </mesh>
          {/* Handle */}
          <mesh position={[-0.65, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.35, 0.08, 8, 14, Math.PI]} />
            <meshLambertMaterial color="#f5f3ef" />
          </mesh>
        </group>
      )}

      {/* 9. Cloche / Food Cover (Sree Swathi Tiffins) */}
      {type === 'cloche' && (
        <group scale={[0.85, 0.85, 0.85]}>
          {/* Dome */}
          <mesh position={[0, 0.1, 0]}>
            <sphereGeometry args={[0.75, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshLambertMaterial color="#f5f3ef" side={THREE.DoubleSide} />
          </mesh>
          {/* Knob */}
          <mesh position={[0, 0.88, 0]}>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshBasicMaterial color={accentColor} />
          </mesh>
          {/* Tray Platter Rim */}
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[1.0, 1.0, 0.08, 16]} />
            <meshLambertMaterial color="#1d2233" />
          </mesh>
        </group>
      )}
    </group>
  );
};
