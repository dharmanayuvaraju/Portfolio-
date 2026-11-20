export type ProjectCategory = 'Apps' | 'Websites' | 'Dashboards';

export interface ScreenshotItem {
  url: string;
  caption: string;
}

export type Model3DType =
  | 'terminal'
  | 'cup'
  | 'phone'
  | 'softbox'
  | 'barchart'
  | 'qr-cube'
  | 'beacon'
  | 'teapot'
  | 'cloche';

export interface Node3DPosition {
  x: number;
  y: number;
  z: number;
  pulsePhase?: number;
  pulseSpeed?: number;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  tagline: string;
  description: string;
  stack: string[];
  repoUrl: string;
  liveUrl?: string | null;
  liveStatusNote?: string;
  statusBadge?: string;
  screenshots?: ScreenshotItem[];
  learningProject?: boolean;
  visible?: boolean;
  modelType: Model3DType;
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
