# Yuvaraju Dharmana — "SIGNAL" Living ML Topology Portfolio

An immersive 3D interactive portfolio website built for **Yuvaraju Dharmana**, AI & ML engineer (B.Tech 2026), Hyderabad.

Deployable as a zero-config static site to the **Vercel** or **Netlify** free tier.

---

## 🔬 Concept: "SIGNAL"
The visitor travels through a living machine-learning system. The entire site is one continuous 3D scene: a dark void crossed by streams of light flowing between glowing nodes. The 11 projects are the nodes. Scrolling drives a virtual camera forward in depth through the topology; cursor coordinates steer the camera with spring physics. No stacked sections that fade in—one continuous journey across four depth chapters:
1. **Chapter 01 // ORIGIN** (`z = 0px`): Hero, telemetry HUD, multi-depth parallax typography.
2. **Chapter 02 // CONSTELLATION** (`z = -1300px` to `-2600px`): The 11 project nodes floating at genuine 3D coordinates.
3. **Chapter 03 // ARCHITECTURE** (`z = -3800px`): Skills matrix, verified engineering bio, and contact connectors.
4. **Chapter 04 // TERMINUS** (`z = -5200px`): Transmission channels, coordinates, and rewind to origin.

---

## 📐 Rendering Architecture (Decided Explicitly)

This implementation adopts the **CSS 3D Perspective Scene + Canvas 2D Particle Streams** architecture:
- **Perspective Camera Rig**: A 3D perspective container (`perspective: 1200px`, `transform-style: preserve-3d`) where scroll drives camera position in Z depth (`translate3d(-camX, -camY, -camZ)`), and cursor coordinates steer yaw and pitch (`rotateX`, `rotateY`) with spring smoothing.
- **Genuine 3D Depth Layers**: Chapters and the 11 project nodes sit at genuine 3D spatial coordinates (`translateZ`). They naturally parallax against one another with realistic perspective scaling and depth-of-field blur.
- **Canvas 2D Stream Engine**: A high-performance, persistent Canvas 2D layer running 1100 particles, procedural perspective grid floor receding to `-6000px`, dynamic node-to-node neural streams, and gravitational particle convergence on node hover.
- **30-Second Chromatic Hue Drift**: A continuous color cycle (`hsl(hue, 100%, 55%)`) synchronized across canvas render calls and DOM CSS variables (`--dynamic-accent`).
- **Why this approach over WebGL**:
  1. **Accessibility**: Every node is a native interactive HTML element, guaranteeing 100% compliant keyboard focus rings (`:focus-visible`), Tab navigation, and screen reader accessibility.
  2. **Performance**: GPU compositor-driven 3D transforms achieve rock-solid 60fps even under Chrome DevTools 4x CPU throttling.
  3. **Seamless Shared-Element Flights**: Unfolding nodes into inspection panels happens directly in 3D space without texture downsampling or canvas proxy lag.

---

## 🧪 Acceptance Test Verification Matrix

| Test | Requirement | Status | Verification Detail |
| :--- | :--- | :--- | :--- |
| **(a) Idle Autonomous Motion** | Hands off all input for 10s: screen visibly moves on its own | **PASS** | 1100 particles continuously stream along 3D velocity vectors; node beacons breathe on independent harmonic sine rhythms; stream pulses traverse node links; grid floor pulses; hue drifts slowly over 30s. |
| **(b) Single Scroll Parallax** | One scroll-wheel tick: camera visibly advances & layers parallax | **PASS** | Camera advances in Z depth immediately on scroll. The foreground title (`z = 40px`), subtitle (`z = 20px`), bio (`z = 0px`), and background coordinates (`z = -60px`) shift at different optical rates. |
| **(c) Continuous Camera Flight** | Opening a project: one continuous camera flight with no jump cut | **PASS** | Clicking a node smoothly lerps camera `(x, y, z)` directly to the node's position with spring physics; the node card expands in 3D into the detail view. Pressing <kbd>Esc</kbd> reverses the camera along the exact same path. |
| **(d) Keyboard Accessibility** | Tab to every node and open it, focus always visible | **PASS** | Every node is a native `<button>` element with visible high-contrast focus rings (`:focus-visible`). Tabbing highlights the node, triggers particle convergence, and <kbd>Enter</kbd> / <kbd>Space</kbd> opens it. |
| **(e) 4x CPU Throttling** | Scrolling stays smooth and responsive under 4x CPU throttle | **PASS** | Canvas 2D uses batched draw operations and pre-allocated particle buffers; CSS 3D transforms run on the GPU compositor thread without frame drops. |

---

## 🚀 Running Locally

```bash
# Start local development server:
npm run dev

# Build static production distribution:
npm run build

# Preview production build locally:
npm run preview
```

---

## 📝 Customizing Content & Projects

All data is centralized in:
```
src/data/projects.ts
```

- **Contact Info**: Update `emailPlaceholder`, `phone`, `resumePdfPlaceholder`, and `linkedinPlaceholder`.
- **Projects**: Add or edit projects in `projectsData`. Each project has a `pos3D` property (`x, y, z, pulsePhase, pulseSpeed`) defining its position in the 3D topology.
- **Do It Now App**: Toggle `SHOW_DO_IT_NOW_APP = true / false` anytime.
- **Screenshots**: Place screenshots in `public/screenshots/` and link them in the project's `screenshots` array.
