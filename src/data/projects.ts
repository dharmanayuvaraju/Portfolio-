import { Project, ProfileData } from '../types';

export const SHOW_DO_IT_NOW_APP = true;

export const profileData: ProfileData = {
  name: "Yuvaraju Dharmana",
  role: "AI & ML Engineer",
  statusLine: "AI & ML Engineer, Hyderabad",
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
  // 1. AI Job Hunt
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
    modelType: "terminal",
    pos3D: { x: -2.2, y: 0.3, z: -4 },
  },

  // ==========================================================================
  // 2. CafeLive Hyderabad
  // ==========================================================================
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
    modelType: "cup",
    pos3D: { x: 2.2, y: -0.2, z: -9 },
  },

  // ==========================================================================
  // 3. Kora (QR Restaurant Ordering - 12th project)
  // ==========================================================================
  {
    id: "kora",
    title: "Kora",
    category: "Apps",
    tagline: "QR restaurant ordering web app (QR-based Dine OS)",
    description:
      "A contactless restaurant ordering and dining operating system enabling real-time menu browsing, ordering, and kitchen coordination via QR codes.",
    stack: ["React", "TypeScript", "Node.js", "Tailwind CSS", "QR Dine OS"],
    repoUrl: "https://github.com/dharmanayuvaraju/kora--QR-Based-dine-os-",
    liveUrl: "https://kora-qr-based-dine-os-67os.vercel.app/",
    statusBadge: "Live on Vercel",
    modelType: "qr-cube",
    pos3D: { x: -2.3, y: 0.2, z: -14 },
  },

  // ==========================================================================
  // 4. Do It Now
  // ==========================================================================
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
    modelType: "phone",
    pos3D: { x: 2.3, y: 0.1, z: -19 },
  },

  // ==========================================================================
  // 5. Job-Tracker
  // ==========================================================================
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
    modelType: "terminal",
    pos3D: { x: -2.1, y: -0.3, z: -24 },
  },

  // ==========================================================================
  // 6. Teja Studios
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
    modelType: "softbox",
    pos3D: { x: 2.2, y: 0.4, z: -29 },
  },

  // ==========================================================================
  // 7. GhatMitra
  // ==========================================================================
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
    modelType: "beacon",
    pos3D: { x: -2.2, y: 0.2, z: -34 },
  },

  // ==========================================================================
  // 8. ChaiBagh Tea Portal
  // ==========================================================================
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
    modelType: "teapot",
    pos3D: { x: 2.1, y: -0.2, z: -39 },
  },

  // ==========================================================================
  // 9. Sree Swathi Tiffins
  // ==========================================================================
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
    modelType: "cloche",
    pos3D: { x: -2.2, y: 0.3, z: -44 },
  },

  // ==========================================================================
  // 10. Retail Sales Dashboard
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
    modelType: "barchart",
    pos3D: { x: 2.3, y: -0.1, z: -49 },
  },

  // ==========================================================================
  // 11. E-Commerce Dashboard
  // ==========================================================================
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
    modelType: "barchart",
    pos3D: { x: -2.2, y: 0.2, z: -54 },
  },

  // ==========================================================================
  // 12. University Dashboard
  // ==========================================================================
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
    modelType: "barchart",
    pos3D: { x: 2.1, y: 0.1, z: -59 },
  },
];
