export type ProjectCategory = 'Apps' | 'Websites' | 'Dashboards';

export interface ScreenshotItem {
  url: string;
  caption: string;
}

export interface Node3DPosition {
  x: number; // 3D X in pixels (-450 to +450)
  y: number; // 3D Y in pixels (-300 to +300)
  z: number; // 3D Z in pixels (-1200 to -2600)
  pulsePhase: number; // 0 to 2PI
  pulseSpeed: number; // 0.8 to 2.5
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  tagline: string;
  description: string; // One honest sentence about what it does
  stack: string[];
  repoUrl: string;
  liveUrl?: string | null;
  liveStatusNote?: string; // e.g. "May take a minute to wake"
  statusBadge?: string;    // e.g. "Demo", "Learning project", "Active"
  screenshots: ScreenshotItem[];
  learningProject?: boolean;
  visible?: boolean;       // Set to false if you decide not to show publicly (e.g., Do It Now)
  // 3D coordinates in the SIGNAL constellation space
  pos3D: Node3DPosition;
}

export interface ProfileData {
  name: string;
  role: string;
  statusLine: string;
  location: string;
  githubUrl: string;
  emailPlaceholder: string;
  phone?: string;
  resumePdfPlaceholder: string;
  linkedinPlaceholder: string;
  bioSentence: string;
  skills: {
    category: string;
    items: string[];
  }[];
}
