import React from 'react';
import { projectsData } from '../data/projects';
import { Project } from '../types';
import { ConstellationNode } from './ConstellationNode';
import { HeroChapter } from './Chapters/HeroChapter';
import { AboutChapter } from './Chapters/AboutChapter';
import { ContactChapter } from './Chapters/ContactChapter';

interface Scene3DProps {
  cameraZ: number;
  cameraX: number;
  cameraY: number;
  cameraRotX: number;
  cameraRotY: number;
  activeFilter: string;
  hoveredNodeId: string | null;
  onHoverNode: (id: string | null) => void;
  onSelectNode: (project: Project) => void;
  onExplore: () => void;
  onRewindToTop: () => void;
  reducedMotion: boolean;
}

export const Scene3D: React.FC<Scene3DProps> = ({
  cameraZ,
  cameraX,
  cameraY,
  cameraRotX,
  cameraRotY,
  activeFilter,
  hoveredNodeId,
  onHoverNode,
  onSelectNode,
  onExplore,
  onRewindToTop,
  reducedMotion,
}) => {
  // Chapter 1: Hero visibility (focal stop at z = 0; hidden when camera advances into constellation)
  const isHeroVisible = cameraZ > -850;
  const heroOpacity = cameraZ <= -500 ? Math.max(0, (cameraZ - (-850)) / 350) : 1;
  const heroBlur = reducedMotion ? 0 : Math.min(3, Math.max(0, (-cameraZ - 200) * 0.004));

  // Chapter 2: Constellation visibility (hidden in Hero to prevent overlapping hero text; hidden in About)
  const isConstellationVisible = cameraZ <= -520 && cameraZ > -3250;

  // Chapter 3: About visibility (focal stop at z = -3800; hidden in constellation & contact to prevent overlap)
  const isAboutVisible = cameraZ <= -3100 && cameraZ > -4650;
  const distToAbout = Math.abs(cameraZ - (-3800));
  const aboutBlur = reducedMotion ? 0 : Math.min(3, Math.max(0, (distToAbout - 120) * 0.003));
  const aboutOpacity =
    cameraZ > -3500
      ? Math.max(0, (cameraZ - (-3100)) / -400)
      : cameraZ < -4200
      ? Math.max(0, (cameraZ - (-4650)) / 450)
      : 1;

  // Chapter 4: Contact visibility (focal stop at z = -5200; hidden in earlier chapters)
  const isContactVisible = cameraZ <= -4500;
  const distToContact = Math.abs(cameraZ - (-5200));
  const contactBlur = reducedMotion ? 0 : Math.min(3, Math.max(0, (distToContact - 120) * 0.003));
  const contactOpacity = cameraZ > -4850 ? Math.max(0, (cameraZ - (-4500)) / -350) : 1;

  return (
    <div
      className="fixed inset-0 w-full h-full overflow-hidden select-none pointer-events-none z-10"
      style={{
        perspective: '1200px',
        perspectiveOrigin: '50% 50%',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Virtual Camera Rig */}
      <div
        className="w-full h-full relative"
        style={{
          transformStyle: 'preserve-3d',
          transform: reducedMotion
            ? `translate3d(${-cameraX}px, ${-cameraY}px, ${-cameraZ}px)`
            : `translate3d(${-cameraX}px, ${-cameraY}px, ${-cameraZ}px) rotateX(${cameraRotX}deg) rotateY(${cameraRotY}deg)`,
          transition: reducedMotion ? 'transform 0.4s ease-out' : 'none',
          willChange: 'transform',
        }}
      >
        {/* Chapter 01: Hero (Zero blur at rest, fades out before constellation) */}
        {isHeroVisible && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: heroOpacity,
              filter: `blur(${heroBlur}px)`,
              pointerEvents: heroOpacity > 0.4 ? 'auto' : 'none',
              transformStyle: 'preserve-3d',
            }}
          >
            <HeroChapter onExplore={onExplore} />
          </div>
        )}

        {/* Chapter 02: Constellation (Active strictly between -520px and -3250px; zero overlap with Hero or About) */}
        {isConstellationVisible &&
          projectsData.map((project) => {
            if (project.visible === false) return null;
            return (
              <ConstellationNode
                key={project.id}
                project={project}
                cameraZ={cameraZ}
                activeFilter={activeFilter}
                isHovered={hoveredNodeId === project.id}
                onHover={onHoverNode}
                onSelect={onSelectNode}
                reducedMotion={reducedMotion}
              />
            );
          })}

        {/* Chapter 03: Architecture / About (Focal stop at z = -3800px; zero blur at rest, fully crisp) */}
        {isAboutVisible && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: aboutOpacity,
              filter: `blur(${aboutBlur}px)`,
              pointerEvents: aboutOpacity > 0.4 ? 'auto' : 'none',
              transformStyle: 'preserve-3d',
            }}
          >
            <AboutChapter />
          </div>
        )}

        {/* Chapter 04: Terminus / Contact (Focal stop at z = -5200px; zero blur at rest, fully crisp) */}
        {isContactVisible && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: contactOpacity,
              filter: `blur(${contactBlur}px)`,
              pointerEvents: contactOpacity > 0.4 ? 'auto' : 'none',
              transformStyle: 'preserve-3d',
            }}
          >
            <ContactChapter onRewindToTop={onRewindToTop} />
          </div>
        )}
      </div>
    </div>
  );
};
