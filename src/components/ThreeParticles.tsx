import React, { useMemo, useEffect } from 'react';
import * as THREE from 'three';

interface ThreeParticlesProps {
  isMobile: boolean;
}

export const ThreeParticles: React.FC<ThreeParticlesProps> = ({ isMobile }) => {
  const count = isMobile ? 600 : 1500;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const warmWhite = new THREE.Color('#f5f3ef');
    const warmOrange = new THREE.Color('#ff6b35');
    const inkMuted = new THREE.Color('#9e998e');

    for (let i = 0; i < count; i++) {
      // Spread across camera flight path
      pos[i * 3 + 0] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = 8 - Math.random() * 88;

      // Color distribution: 70% warm white, 20% warm orange, 10% muted
      const rand = Math.random();
      const chosenColor = rand > 0.8 ? warmOrange : rand > 0.1 ? warmWhite : inkMuted;

      col[i * 3 + 0] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return [pos, col];
  }, [count]);

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geom;
  }, [positions, colors]);

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      size: isMobile ? 0.08 : 0.09,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });
  }, [isMobile]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  return <points geometry={geometry} material={material} />;
};
