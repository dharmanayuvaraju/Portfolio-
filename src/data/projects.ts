import { Project, ProfileData } from '../types';

/**
 * ============================================================================
 * YUVARAJU DHARMANA - PORTFOLIO & "SIGNAL" ML TOPOLOGY DATA FILE
 * ============================================================================
 */

export const SHOW_DO_IT_NOW_APP = true;

export const profileData: ProfileData = {
  name: "Yuvaraju Dharmana",
  role: "AI & ML engineer",
  statusLine: "AI & ML engineer (B.Tech 2026), Hyderabad",
  location: "Hyderabad, India",
  githubUrl: "https://github.com/dharmanayuvaraju",

  bioSentence:
    "I build backend systems and ML models in Python (FastAPI, SQL, scikit-learn, Pandas), plus React frontends, Flutter apps and Power BI dashboards.",

  emailPlaceholder: "dharmanayuvaraju3@gmail.com",
  phone: "+91 7337422054",
  resumePdfPlaceholder: "/resume.pdf",
  linkedinPlaceholder: "https://linkedin.com/in/yuvaraju-dharmana",

  skills: [
    {
      category: "Backend & ML",
      items: ["Python", "FastAPI", "SQL", "scikit-learn", "Pandas", "Flask"],
    },
    {
      category: "Frontend & Mobile",
      items: ["React", "TypeScript", "JavaScript", "Flutter", "HTML5 / CSS3"],
    },
    {
      category: "Data & Infrastructure",
      items: ["Power BI", "Docker", "PostgreSQL", "Firebase", "JWT", "CI/CD"],
    },
  ],
};

export const projectsData: Project[] = [
  // ==========================================================================
  // APPS
  // ==========================================================================
  {
    id: "ai-job-hunt",
    title: "AI Job Hunt",
    category: "Apps",
    tagline: "React + TS frontend, FastAPI + PostgreSQL backend, JWT auth, Docker",
    description:
      "A full-stack job hunting platform pairing a React TypeScript frontend with a Dockerized FastAPI and PostgreSQL backend secured by JWT authentication.",
    stack: ["React", "TypeScript", "FastAPI", "PostgreSQL", "JWT", "Docker"],
    repoUrl: "https://github.com/dharmanayuvaraju/ai-job-hunt",
    liveUrl: "https://ai-job-hunt-frontend.onrender.com",
    liveStatusNote: "May take a minute to wake (backend sleeps on free plan)",
    screenshots: [],
    pos3D: { x: -320, y: -70, z: -1300, pulsePhase: 0.2, pulseSpeed: 1.2 },
  },
  {
    id: "cafelive",
    title: "CafeLive Hyderabad",
    category: "Apps",
    tagline: "Real-time cafe ordering web app, vanilla JS + Firebase",
    description:
      "A real-time cafe ordering web application built with vanilla JavaScript and Firebase for synchronized order handling.",
    stack: ["Vanilla JS", "Firebase", "Realtime DB", "HTML5", "CSS3"],
    repoUrl: "https://github.com/dharmanayuvaraju/Cafelife",
    liveUrl: "https://cafelive-e1b7f.web.app/",
    statusBadge: "Live Web App",
    screenshots: [],
    pos3D: { x: 290, y: -110, z: -1450, pulsePhase: 1.4, pulseSpeed: 1.6 },
  },
  {
    id: "job-tracker",
    title: "Job-Tracker",
    category: "Apps",
    tagline: "Flask job-application tracker with login, CSRF protection and CI",
    description:
      "A Flask web application for tracking job applications featuring user authentication, CSRF protection, and continuous integration.",
    stack: ["Python", "Flask", "Authentication", "CSRF Protection", "CI Pipeline", "SQL"],
    repoUrl: "https://github.com/dharmanayuvaraju/Job-Tracker",
    liveUrl: null,
    statusBadge: "Code Repo",
    screenshots: [],
    pos3D: { x: -120, y: -200, z: -1720, pulsePhase: 3.5, pulseSpeed: 1.4 },
  },
  {
    id: "do-it-now",
    title: "Do It Now",
    category: "Apps",
    tagline: "Flutter medicine-reminder app, Telugu & English, offline alarms",
    description:
      "A cross-platform Flutter medicine-reminder mobile application supporting Telugu and English with offline alarm scheduling.",
    stack: ["Flutter", "Dart", "Telugu & English", "Offline Alarms", "Mobile UI"],
    repoUrl: "https://github.com/dharmanayuvaraju/To-do",
    liveUrl: null,
    statusBadge: "Mobile App",
    visible: SHOW_DO_IT_NOW_APP,
    screenshots: [],
    pos3D: { x: 330, y: 150, z: -1880, pulsePhase: 4.8, pulseSpeed: 1.3 },
  },
  {
    id: "ghatmitra",
    title: "GhatMitra",
    category: "Apps",
    tagline: "FastAPI civic-monitoring dashboard",
    description:
      "A civic-monitoring dashboard powered by FastAPI designed to record and visualize municipal data and civic reports.",
    stack: ["FastAPI", "Python", "Civic Dashboard", "REST API"],
    repoUrl: "https://github.com/dharmanayuvaraju/Ghatmitra",
    liveUrl: null,
    statusBadge: "Archived",
    screenshots: [],
    pos3D: { x: -280, y: 220, z: -2150, pulsePhase: 2.1, pulseSpeed: 1.5 },
  },
  {
    id: "chaibagh",
    title: "ChaiBagh Tea Portal",
    category: "Apps",
    tagline: "FastAPI demo store",
    description:
      "A demo online tea catalog and portal store built using FastAPI.",
    stack: ["FastAPI", "Python", "E-commerce Architecture", "Demo Store"],
    repoUrl: "https://github.com/dharmanayuvaraju/teatime-portal",
    liveUrl: null,
    statusBadge: "Demo",
    screenshots: [],
    pos3D: { x: 110, y: -230, z: -2280, pulsePhase: 3.9, pulseSpeed: 1.7 },
  },

  // ==========================================================================
  // WEBSITES
  // ==========================================================================
  {
    id: "teja-studios",
    title: "Teja Studios",
    category: "Websites",
    tagline: "Photo studio site with price estimator and WhatsApp booking",
    description:
      "A photography studio website featuring an interactive dynamic price estimator and direct WhatsApp booking integration.",
    stack: ["JavaScript", "Responsive Web", "Price Calculator", "WhatsApp API", "CSS3"],
    repoUrl: "https://github.com/dharmanayuvaraju/teja-studios-website",
    liveUrl: "https://teja-studios-website.vercel.app/",
    statusBadge: "Live on Vercel",
    screenshots: [],
    pos3D: { x: -360, y: 120, z: -1580, pulsePhase: 2.7, pulseSpeed: 1.1 },
  },
  {
    id: "swathi-tiffins",
    title: "Sree Swathi Tiffins",
    category: "Websites",
    tagline: "Menu site (local only)",
    description:
      "A clean digital food menu website created for Sree Swathi Tiffins.",
    stack: ["HTML5", "CSS3", "JavaScript", "Digital Menu"],
    repoUrl: "https://github.com/dharmanayuvaraju/swathi-tiffins-website",
    liveUrl: null,
    statusBadge: "Local Only",
    screenshots: [],
    pos3D: { x: 180, y: -40, z: -2020, pulsePhase: 0.9, pulseSpeed: 1.0 },
  },

  // ==========================================================================
  // DASHBOARDS (Learning projects, built on public sample datasets)
  // ==========================================================================
  {
    id: "retail-sales-dashboard",
    title: "Retail Sales Dashboard",
    category: "Dashboards",
    tagline: "Power BI dashboard built on public sample retail datasets",
    description:
      "A Power BI analytics dashboard exploring retail sales metrics and performance trends using public sample retail datasets.",
    stack: ["Power BI", "DAX", "Data Modeling", "Retail Analytics", "Sample Dataset"],
    repoUrl: "https://github.com/dharmanayuvaraju/Retail-sales-dashboard-powerbi",
    liveUrl: null,
    statusBadge: "Learning project",
    learningProject: true,
    screenshots: [],
    pos3D: { x: -190, y: -80, z: -2390, pulsePhase: 5.1, pulseSpeed: 1.2 },
  },
  {
    id: "ecommerce-dashboard",
    title: "E-Commerce Dashboard",
    category: "Dashboards",
    tagline: "Power BI dashboard built on public sample e-commerce data",
    description:
      "An interactive Power BI analytics dashboard analyzing sales orders, revenue distribution, and customer metrics on public sample datasets.",
    stack: ["Power BI", "DAX", "Sales KPIs", "E-commerce Metrics", "Sample Dataset"],
    repoUrl: "https://github.com/dharmanayuvaraju/E---commerce-Dashboard",
    liveUrl: null,
    statusBadge: "Learning project",
    learningProject: true,
    screenshots: [],
    pos3D: { x: 270, y: 190, z: -2480, pulsePhase: 1.8, pulseSpeed: 1.4 },
  },
  {
    id: "university-dashboard",
    title: "University Dashboard",
    category: "Dashboards",
    tagline: "Power BI dashboard built on public sample academic dataset",
    description:
      "A Power BI educational analytics dashboard visualizing academic, enrollment, and institutional indicators using public sample data.",
    stack: ["Power BI", "DAX", "Academic Metrics", "Visualization", "Sample Dataset"],
    repoUrl: "https://github.com/dharmanayuvaraju/Sandip-university-dashboard-powerbi",
    liveUrl: null,
    statusBadge: "Learning project",
    learningProject: true,
    screenshots: [],
    pos3D: { x: -40, y: 160, z: -2580, pulsePhase: 4.2, pulseSpeed: 1.3 },
  },
];
