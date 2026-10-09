import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import {
  Github, Linkedin, Mail, Phone, MapPin, Download, ExternalLink, Menu, X,
  GraduationCap, Award, Trophy, Languages as LangIcon, ArrowRight, Sparkles,
  BarChart3, TrendingUp, Database, LayoutDashboard, Cpu, Cloud,
  GitBranch, Target, Boxes, Activity, CheckCircle2, Briefcase, Bot,
  FolderGit2, Code2, Layers, BookOpen, Star, ShieldCheck, Compass,
  Search, FileSpreadsheet, Terminal
} from "lucide-react";

const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "dashboards", label: "Analytics Hub" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "leadership", label: "Leadership" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const STATS = [
  { value: "5", label: "Internships Completed", sub: "Fintech, AI, ML & BI" },
  { value: "10+", label: "Projects Shipped", sub: "Full-Stack, RAG & Analytics" },
  { value: "8.9", label: "B.Sc CGPA", sub: "Sri Ramakrishna College" },
  { value: "10+", label: "Certifications", sub: "Deloitte, IBM, NPTEL, GUVI" },
];

const TOP_SKILLS = [
  { name: "Python (Pandas, Streamlit, ML)", pct: 94 },
  { name: "SQL & Relational Databases (MySQL)", pct: 92 },
  { name: "Power BI & Tableau Dashboarding", pct: 90 },
  { name: "Advanced Excel & KPI Modeling", pct: 92 },
  { name: "Machine Learning & Deep Learning (TensorFlow, Scikit)", pct: 86 },
  { name: "FastAPI / Flask Backend & REST APIs", pct: 85 },
  { name: "React.js & Full-Stack Development", pct: 84 },
  { name: "MongoDB & NoSQL Data Systems", pct: 82 },
];

const SKILL_CATEGORIES = [
  {
    title: "Languages",
    icon: Code2,
    skills: ["SQL", "Python", "Java", "JavaScript"],
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["MongoDB", "MySQL", "SQLite"],
  },
  {
    title: "BI & Analytics Tools",
    icon: BarChart3,
    skills: ["Power BI", "Tableau", "Excel", "Cognos Analytics", "IBM Watson Studio"],
  },
  {
    title: "Web Development",
    icon: Layers,
    skills: ["React.js", "Node.js", "HTML5", "CSS3", "Bootstrap", "Chart.js"],
  },
  {
    title: "Frameworks & Platforms",
    icon: Cloud,
    skills: ["Flask", "FastAPI", "REST APIs", "Git", "GitHub", "Microsoft Office"],
  },
  {
    title: "Project Management & AI",
    icon: Bot,
    skills: ["Monday.com", "FAISS / BM25 (RAG)", "TensorFlow / Keras", "Grad-CAM", "UiPath RPA"],
  },
];

const EDUCATION = [
  {
    degree: "B.Sc. Computer Science with Data Analytics",
    institution: "Sri Ramakrishna College of Arts & Science for Women, Coimbatore",
    score: "CGPA: 8.9",
    period: "Expected - 2027",
    current: true,
  },
  {
    degree: "Higher Secondary (Class XII)",
    institution: "Sri Sowdeswari Vidyalaya, MHSS",
    score: "Percentage: 84%",
    period: "Completed",
    current: false,
  },
  {
    degree: "Secondary (Class X)",
    institution: "Sri Sowdeswari Vidyalaya, MHSS",
    score: "Percentage: 93.4%",
    period: "Completed",
    current: false,
  },
];

const EXPERIENCE = [
  {
    role: "Data Analyst Intern",
    company: "Bluestock Fintech",
    dates: "May 2026 – Jul 2026",
    badge: "Fintech & BI",
    bullets: [
      "Delivered business insights through financial and operational data analysis, KPI reporting, and interactive dashboards for cross-functional teams.",
      "Improved reporting clarity and financial understanding through automated data aggregation and visual telemetry.",
    ],
  },
  {
    role: "Machine Learning Intern",
    company: "Adroit Technologies Innovative Career (IBM Career Education)",
    dates: "May 2026",
    badge: "AI & Predictive ML",
    bullets: [
      "Developed and deployed an AI-powered Equipment Failure Prediction System using Machine Learning and Flask.",
      "Trained predictive classification models on a dataset of 2,000+ industrial records to achieve 94% model accuracy.",
    ],
  },
  {
    role: "AI & Full Stack Developer Intern (Full Time)",
    company: "Kambaa Incorporation",
    dates: "Dec 2025 – Apr 2026",
    badge: "Enterprise Full-Stack",
    bullets: [
      "Built role-based enterprise applications including an automated Petty Cash Management System.",
      "Engineered an AI-driven Notes Maker and Knowledge Base platform with intelligent chatbot, rich search, and granular access control.",
    ],
  },
  {
    role: "Data Analyst Intern",
    company: "NoviTech R&D Private Limited",
    dates: "Sep 2025 – Oct 2025",
    badge: "Data Modeling",
    bullets: [
      "Performed comprehensive data cleaning and exploratory analysis using Excel, SQL, and Power BI.",
      "Built a student behaviour analytics dashboard from 1,000+ data points, identifying critical performance gaps to improve coaching effectiveness.",
    ],
  },
  {
    role: "Data Science & Data Analytics Intern",
    company: "Hexaind – Innovate Intern Program",
    dates: "May 2025 – Jul 2025",
    badge: "Data Science",
    bullets: [
      "Applied Python, SQL, Tableau, and Machine Learning to build data visualizations and predictive models during an intensive 8-week internship.",
      "Designed exploratory analytics pipelines and statistical reports for stakeholder decision-making.",
    ],
  },
];

const FEATURED_PROJECTS = [
  {
    title: "AnalystOS",
    tagline: "Personal Career Management & Placement Readiness Operating System",
    description:
      "A centralized platform consolidating placement preparation, career tracking, skill analytics, certification monitoring, and progress visualization into one unified, actionable dashboard.",
    highlights: ["Unified Career Metrics", "Placement Prep Tracker", "Interactive Visual Dashboard"],
    tech: ["Python", "Flask", "SQL", "JavaScript", "Bootstrap", "Chart.js"],
    repo: "https://github.com/Poorani-S/AnalystOs",
    demo: "https://analystos-la7y.onrender.com",
  },
  {
    title: "SRCW Chatbot Assistant (Hybrid RAG)",
    tagline: "Multilingual AI Campus Assistant with FAISS & BM25 Hybrid Retrieval",
    description:
      "Built a hybrid RAG campus assistant combining FAISS dense vector search and BM25 sparse keyword search with multilingual embeddings (English, Tamil, Tanglish), delivering source-cited, hallucination-resistant answers via a modern React interface.",
    highlights: ["Hybrid Search (FAISS + BM25)", "Multilingual (EN, TA, Tanglish)", "Zero-Hallucination Citations"],
    tech: ["Python", "FastAPI", "FAISS", "BM25", "React", "LLMs"],
    repo: "https://github.com/Poorani-S/SRCW_Chatbot_Assistant_Using_RAG",
    demo: null,
  },
  {
    title: "SmartWaste AI – Explainable Waste Classification",
    tagline: "Deep Learning Vision System with Grad-CAM Explainability",
    description:
      "A computer vision classification system using fine-tuned EfficientNetB0 to categorize waste into 5 distinct categories with 88%+ accuracy, featuring Grad-CAM visual heatmaps for AI explainability and a real-time React analytics dashboard.",
    highlights: ["EfficientNetB0 Fine-Tuning", "Grad-CAM Heatmap Visualizer", "88%+ 5-Class Accuracy"],
    tech: ["Python", "TensorFlow/Keras", "Flask", "React", "MongoDB"],
    repo: "https://github.com/Poorani-S/Smart_Waste_AI",
    demo: null,
  },
  {
    title: "Mutual Fund Analytics Dashboard",
    tagline: "Investment Analysis, Portfolio Statistics & Fund Comparison Platform",
    description:
      "An interactive fund analytics platform designed for investors to evaluate opportunities using historical performance, risk-adjusted returns (Sharpe ratio, volatility), and dynamic portfolio statistics dashboards.",
    highlights: ["Risk Metrics & Drawdowns", "Interactive Fund Comparisons", "Historical Performance Modeling"],
    tech: ["Python", "Streamlit", "Pandas", "SQLite", "Plotly"],
    repo: "https://github.com/Poorani-S/Capstone-Project-I---Mutual-Fund-Analytics",
    demo: "https://mutual-fund-analytics.onrender.com",
  },
  {
    title: "AI Equipment Failure Prediction System – FixieAI",
    tagline: "End-to-End Predictive Maintenance & Real-Time Failure Forecasting",
    description:
      "A predictive maintenance platform utilizing end-to-end ML workflows to forecast industrial equipment anomalies and breakdowns in real-time, trained on 2,000+ sensor records achieving 94% model accuracy.",
    highlights: ["2,000+ Sensor Records", "94% Model Accuracy", "Real-Time Telemetry Alerts"],
    tech: ["Python", "ML", "Flask", "MongoDB", "Scikit-Learn"],
    repo: "https://github.com/Poorani-S/AI-Equipment-Failure-Prediction-System",
    demo: "https://ai-equipment-failure-prediction-system.onrender.com/home",
  },
  {
    title: "Petty Cash Management System",
    tagline: "Role-Based Enterprise Financial & Expense Tracker",
    description:
      "Built a full-stack expense tracking system with RESTful APIs, audit trails, and transaction monitoring for organizational accuracy and operational financial transparency.",
    highlights: ["Role-Based Access Control", "RESTful API Architecture", "Live Audit & Ledger Tracking"],
    tech: ["React.js", "Node.js", "MySQL", "Express.js"],
    repo: null,
    demo: null,
  },
  {
    title: "Knowledge Base Portal",
    tagline: "Centralized Enterprise Knowledge & Document Repository",
    description:
      "A full-stack knowledge management system featuring real-time search, rich markdown content editing, dynamic indexing, and role-based document access permissions.",
    highlights: ["Full-Text Search Indexing", "Content Management System", "Access Control & Versioning"],
    tech: ["React.js", "Node.js", "MongoDB", "Express.js"],
    repo: null,
    demo: null,
  },
];

const ADDITIONAL_PROJECTS = [
  {
    title: "Earthquake Alert System",
    tech: "IoT, Arduino, Sensors, Cloud",
    desc: "Seismic monitoring application integrating hardware vibration sensors and real-time cloud alerting for disaster mitigation.",
  },
  {
    title: "Canteen Management System",
    tech: "Node.js, MySQL, JavaScript",
    desc: "Full-stack dining and order processing platform with role-based auth, live menu tracking, and receipt generation.",
  },
  {
    title: "Internship Tracker Dashboard",
    tech: "C#, SQLite, BI Analytics",
    desc: "Personal career application tracker capturing recruitment timelines, interview rounds, and statistical offer analytics.",
  },
  {
    title: "Travel Website",
    tech: "React, Node.js, REST APIs",
    desc: "Dynamic travel booking and destination discovery portal with responsive user experience and interactive filters.",
  },
];

const LEADERSHIP_ACHIEVEMENTS = [
  {
    title: "Class Representative (Current)",
    organization: "Sri Ramakrishna College of Arts & Science for Women",
    icon: UsersIcon,
    description:
      "Represent the student cohort, coordinate key communications with department faculty, organize academic activities, and lead student welfare initiatives.",
    type: "Leadership",
  },
  {
    title: "Placement Coordinator (2nd Year)",
    organization: "Placement Cell, SRCW",
    icon: Briefcase,
    description:
      "Coordinated campus placement drives, supported recruitment panels from visiting companies, and facilitated communication between eligible candidates and the placement cell.",
    type: "Coordination",
  },
  {
    title: "Secretary, Career Guidance & Higher Education Cell",
    organization: "Career Guidance Cell, SRCW",
    icon: Compass,
    description:
      "Organized career counseling workshops, higher education orientation seminars, and industry expert guest lectures for students across departments.",
    type: "Leadership",
  },
  {
    title: "1st Prize, Maths Pi Day Competition",
    organization: "Departmental Mathematics & Logic League",
    icon: Trophy,
    description:
      "Secured 1st Place for demonstrating exceptional analytical problem-solving, mathematical riddles speed-resolution, and logical reasoning.",
    type: "Award",
  },
];

function UsersIcon(props) {
  return <Bot {...props} />;
}

const CERTIFICATIONS = [
  {
    category: "Data Analytics & BI",
    icon: BarChart3,
    color: "from-fuchsia-500 to-violet-500",
    items: [
      { name: "Deloitte Australia – Data Analytics Job Simulation", issuer: "Forage" },
      { name: "IBM – Data Analysis with Python", issuer: "IBM" },
      { name: "IBM – Data Visualization", issuer: "IBM" },
      { name: "IBM – Business Intelligence", issuer: "IBM" },
      { name: "NoviTech – SQL for Data Analytics", issuer: "NoviTech" },
      { name: "NPTEL – Database Management System", issuer: "NPTEL / IIT" },
    ],
  },
  {
    category: "AI & Automation",
    icon: Cpu,
    color: "from-violet-500 to-indigo-500",
    items: [
      { name: "GUVI – Generative AI", issuer: "GUVI Geek Network" },
      { name: "UiPath Academy – Automation Developer Associate Training", issuer: "UiPath" },
    ],
  },
  {
    category: "Programming & Foundations",
    icon: Code2,
    color: "from-indigo-500 to-cyan-500",
    items: [
      { name: "GUVI – Python Programming Masterclass", issuer: "GUVI" },
    ],
  },
  {
    category: "Professional Services",
    icon: ShieldCheck,
    color: "from-cyan-500 to-teal-500",
    items: [
      { name: "Monday.com – Professional Services Roles Certification Pathway", issuer: "Monday.com" },
    ],
  },
];

const DASHBOARD_METRICS = [
  { label: "Data Records Analyzed", value: "50,000+", icon: Database, desc: "Fintech, Student & Sensor Data" },
  { label: "AI Model Accuracy", value: "94.0%", icon: Target, desc: "FixieAI Equipment Failure Predictor" },
  { label: "Deep Learning Accuracy", value: "88%+", icon: Cpu, desc: "SmartWaste AI 5-Class EfficientNet" },
  { label: "Production Dashboards", value: "15+", icon: LayoutDashboard, desc: "Power BI, Streamlit, Tableau" },
];

const TOOL_PROFICIENCY = [
  { label: "Python", value: 94 },
  { label: "SQL", value: 92 },
  { label: "Power BI", value: 90 },
  { label: "Excel", value: 92 },
  { label: "Tableau", value: 85 },
];

const INTERNSHIP_GROWTH_POINTS = [25, 42, 58, 72, 88, 96];
const INTERNSHIP_GROWTH_LABELS = [
  "Hexaind (Data Sci)",
  "NoviTech (Analytics)",
  "Kambaa (Full-Stack & AI)",
  "IBM / Adroit (ML)",
  "Bluestock (Fintech)",
  "Present (Full Ready)",
];

const TECH_PILLARS = [
  { icon: Database, label: "SQL & MySQL", color: "text-blue-400" },
  { icon: BarChart3, label: "Power BI / Tableau", color: "text-amber-400" },
  { icon: Cpu, label: "Scikit & TensorFlow", color: "text-fuchsia-400" },
  { icon: Bot, label: "Hybrid RAG & LLMs", color: "text-purple-400" },
  { icon: Layers, label: "React & FastAPI", color: "text-cyan-400" },
  { icon: GitBranch, label: "Git & Monday.com", color: "text-emerald-400" },
];

function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, particles, raf;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999, active: false };

    function resize() {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const count = Math.min(80, Math.floor((w * h) / 16000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    }
    function onLeave() {
      mouse.active = false;
    }

    function tick() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        if (mouse.active) {
          const dx = p.x - mouse.x,
            dy = p.y - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 140 && d > 0.001) {
            const force = (140 - d) / 140;
            p.vx += (dx / d) * force * 0.03;
            p.vy += (dy / d) * force * 0.03;
          }
        }
        p.vx *= 0.985;
        p.vy *= 0.985;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed < 0.06) {
          p.vx += (Math.random() - 0.5) * 0.03;
          p.vy += (Math.random() - 0.5) * 0.03;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i],
            b = particles[j];
          const dx = a.x - b.x,
            dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.strokeStyle = `rgba(167,139,250,${0.16 * (1 - dist / 130)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        if (mouse.active) {
          const dx = a.x - mouse.x,
            dy = a.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.strokeStyle = `rgba(232,121,249,${0.35 * (1 - dist / 150)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
      for (const p of particles) {
        ctx.fillStyle = "rgba(196,181,253,0.55)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    }

    resize();
    tick();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

function GradientOrbs() {
  return (
    <>
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
    </>
  );
}

function Hero3D() {
  const mountRef = useRef(null);
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const width = mount.clientWidth,
      height = mount.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const icoGeo = new THREE.IcosahedronGeometry(1.9, 1);
    const icoMat = new THREE.MeshBasicMaterial({ color: 0xa855f7, wireframe: true, transparent: true, opacity: 0.55 });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    group.add(ico);

    const innerGeo = new THREE.IcosahedronGeometry(1.15, 0);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0xf0abfc, wireframe: true, transparent: true, opacity: 0.4 });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    group.add(inner);

    const starGeo = new THREE.BufferGeometry();
    const starCount = 180;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 3.2 + Math.random() * 1.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xc4b5fd, size: 0.035, transparent: true, opacity: 0.8 });
    const stars = new THREE.Points(starGeo, starMat);
    group.add(stars);

    let mouseX = 0,
      mouseY = 0;
    function onMove(e) {
      const rect = mount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    }
    window.addEventListener("mousemove", onMove);

    let raf;
    function animate() {
      ico.rotation.y += 0.0035;
      ico.rotation.x += 0.0015;
      inner.rotation.y -= 0.004;
      inner.rotation.x += 0.002;
      stars.rotation.y += 0.0008;
      group.rotation.y += (mouseX * 0.4 - group.rotation.y) * 0.03;
      group.rotation.x += (-mouseY * 0.3 - group.rotation.x) * 0.03;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    }
    animate();

    function onResize() {
      if (!mount) return;
      const w2 = mount.clientWidth,
        h2 = mount.clientHeight;
      camera.aspect = w2 / h2;
      camera.updateProjectionMatrix();
      renderer.setSize(w2, h2);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      icoGeo.dispose();
      icoMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      renderer.dispose();
    };
  }, []);
  return <div ref={mountRef} className="w-full h-full" />;
}

function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({
    transform: "perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0px) scale(1)",
  });

  function handleMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateZ(18px) scale(1.015)`,
      boxShadow: `${-x * 30}px ${-y * 30 + 16}px 40px -10px rgba(124,58,237,0.35)`,
      "--glow-x": `${(x + 0.5) * 100}%`,
      "--glow-y": `${(y + 0.5) * 100}%`,
    });
  }
  function handleLeave() {
    setStyle({
      transform: "perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0px) scale(1)",
      boxShadow: "0px 10px 30px -18px rgba(124,58,237,0.2)",
    });
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        ...style,
        transition: "transform 0.2s ease-out, box-shadow 0.2s ease-out",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      className={`relative ${className}`}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: `radial-gradient(220px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(168,85,247,0.22), transparent 70%)`,
        }}
      />
      <div style={{ transform: "translateZ(16px)", transformStyle: "preserve-3d" }}>{children}</div>
    </div>
  );
}

function BarChartWidget({ data }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex items-end gap-2.5 h-28">
      {data.map((d, i) => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-1.5">
          <div className="w-full rounded-t-md bg-white/5 h-full flex items-end overflow-hidden">
            <div
              className="w-full rounded-t-md bg-gradient-to-t from-violet-600 via-fuchsia-500 to-pink-400 transition-all duration-700 ease-out"
              style={{
                height: active ? `${d.value}%` : "0%",
                transitionDelay: `${i * 80}ms`,
                boxShadow: "0 0 14px rgba(217,70,239,0.45)",
              }}
            />
          </div>
          <span className="text-[10px] text-violet-300/80 font-medium leading-none">{d.label}</span>
          <span className="text-[9px] text-fuchsia-400/80 font-mono leading-none">{d.value}%</span>
        </div>
      ))}
    </div>
  );
}

function LineChartWidget({ points, labels }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const w = 320,
    h = 110,
    pad = 12;
  const max = Math.max(...points),
    min = Math.min(...points);
  const coords = points.map((p, i) => {
    const x = pad + (i / (points.length - 1)) * (w - pad * 2);
    const y = h - pad - ((p - min) / (max - min || 1)) * (h - pad * 2);
    return [x, y];
  });
  const linePath = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L${coords[coords.length - 1][0]},${h} L${coords[0][0]},${h} Z`;
  const last = coords[coords.length - 1];

  return (
    <div ref={ref}>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-28 overflow-visible">
        <defs>
          <linearGradient id="growthLineFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e879f9" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={areaPath}
          fill="url(#growthLineFill)"
          style={{ opacity: active ? 1 : 0, transition: "opacity 0.8s ease-out 0.3s" }}
        />
        <path
          d={linePath}
          fill="none"
          stroke="#e879f9"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: "drop-shadow(0 0 8px rgba(232,121,249,0.7))",
            strokeDasharray: 600,
            strokeDashoffset: active ? 0 : 600,
            transition: "stroke-dashoffset 1.2s ease-out",
          }}
        />
        {active && (
          <circle cx={last[0]} cy={last[1]} r="4.5" fill="#ffffff">
            <animate attributeName="r" values="3.5;6;3.5" dur="1.8s" repeatCount="indefinite" />
          </circle>
        )}
      </svg>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 mt-2 text-center">
        {labels.map((l) => (
          <span key={l} className="text-[9px] text-violet-300/70 font-mono leading-tight">
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

function SkillBar({ name, pct }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWidth(pct);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct]);

  return (
    <div ref={ref}>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-violet-100 font-medium">{name}</span>
        <span className="text-violet-400 font-mono text-xs font-semibold">{pct}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-white/5 overflow-hidden p-0.5 border border-white/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500 transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

function SectionLabel({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-12 text-center">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-semibold tracking-wide uppercase mb-4 shadow-sm">
        <Sparkles size={13} className="text-fuchsia-400" /> {eyebrow}
      </div>
      <h2
        className="text-3xl md:text-5xl font-extrabold text-white tracking-tight"
        style={{ fontFamily: "Space Grotesk, sans-serif" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-violet-200/70 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      className="relative min-h-screen bg-[#07040f] text-white overflow-x-hidden selection:bg-fuchsia-500 selection:text-white"
      style={{ fontFamily: "Inter, ui-sans-serif, system-ui" }}
    >
      {/* Background Animated Atmosphere */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <GradientOrbs />
        <ParticleField />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 45% at 50% 0%, rgba(124,58,237,0.28), transparent 70%)",
          }}
        />
      </div>

      {/* Sticky Top Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#07040f]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl py-2"
            : "py-4"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2.5 font-bold text-lg cursor-pointer group"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-500 via-purple-600 to-indigo-600 flex items-center justify-center text-xs font-black shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform">
              PS
            </span>
            <span className="tracking-wide">
              Poorani <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-violet-400">S</span>
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.04] border border-white/10 backdrop-blur-md rounded-full px-2 py-1.5 shadow-inner">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="text-xs font-medium text-violet-100/80 hover:text-white px-3.5 py-1.5 rounded-full hover:bg-white/10 transition-colors"
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            <a
              href="/resume.pdf"
              download="Poorani_S_Resume.pdf"
              className="flex items-center gap-2 border border-violet-500/40 bg-violet-500/10 text-violet-200 text-xs font-semibold px-4 py-2 rounded-full hover:bg-violet-500/20 hover:border-violet-400 transition-all"
            >
              <Download size={13} /> Resume
            </a>
            <button
              onClick={() => scrollTo("contact")}
              className="flex items-center gap-1.5 bg-gradient-to-r from-fuchsia-500 via-violet-600 to-indigo-600 text-white text-xs font-semibold px-4 py-2 rounded-full hover:opacity-95 shadow-md shadow-violet-500/25 transition-transform hover:scale-105"
            >
              Let's Connect <ArrowRight size={13} />
            </button>
          </div>

          <button
            className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-violet-200"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown Nav */}
        {menuOpen && (
          <div className="lg:hidden bg-[#07040f]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-5 flex flex-col gap-3 shadow-2xl animate-in slide-in-from-top-2">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="text-left text-sm font-medium text-violet-100/90 py-1.5 hover:text-fuchsia-400"
              >
                {n.label}
              </button>
            ))}
            <div className="pt-3 border-t border-white/10 flex gap-2">
              <a
                href="/resume.pdf"
                download="Poorani_S_Resume.pdf"
                className="flex-1 flex items-center justify-center gap-2 border border-white/15 py-2.5 rounded-full text-xs font-semibold"
              >
                <Download size={14} /> Resume
              </a>
              <button
                onClick={() => scrollTo("contact")}
                className="flex-1 bg-gradient-to-r from-fuchsia-500 to-violet-600 py-2.5 rounded-full text-xs font-semibold text-center"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-5 pt-12 md:pt-16 pb-20 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-300 text-xs font-medium mb-6 shadow-sm">
            <Sparkles size={13} className="animate-spin" style={{ animationDuration: "6s" }} />
            Final-Year B.Sc CS (Data Analytics) • Open for Data Analyst Roles
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Turning Raw Data Into{" "}
            <span className="bg-gradient-to-r from-fuchsia-400 via-violet-300 to-indigo-400 bg-clip-text text-transparent">
              Actionable Business Intelligence
            </span>
          </h1>

          <p className="mt-6 text-violet-200/80 text-base md:text-lg leading-relaxed font-normal max-w-2xl">
            Hi, I'm <strong className="text-white font-semibold">Poorani S</strong>. Final-year Data Analytics
            student with hands-on internship experience across Fintech, Machine Learning, AI Full-Stack,
            and Business Intelligence. Proficient in Python, SQL, Power BI, Tableau, and Excel to empower
            growth-oriented decisions.
          </p>

          <div className="mt-8 flex flex-wrap gap-3.5 items-center">
            <button
              onClick={() => scrollTo("projects")}
              className="flex items-center gap-2 bg-gradient-to-r from-fuchsia-500 via-violet-600 to-indigo-600 px-6 py-3.5 rounded-full text-sm font-semibold shadow-lg shadow-violet-500/30 hover:shadow-fuchsia-500/40 hover:scale-105 transition-all"
            >
              Explore Projects <ArrowRight size={15} />
            </button>
            <a
              href="/resume.pdf"
              download="Poorani_S_Resume.pdf"
              className="flex items-center gap-2 border border-white/20 bg-white/5 backdrop-blur-md px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-white/10 hover:border-violet-400 transition-all"
            >
              <Download size={15} /> Download Resume
            </a>
            <a
              href="https://github.com/Poorani-S"
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:text-fuchsia-300 transition-colors"
              title="GitHub Profile"
            >
              <Github size={17} />
            </a>
            <a
              href="https://linkedin.com/in/poorani-s-046357340"
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:text-fuchsia-300 transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin size={17} />
            </a>
          </div>

          {/* Key Metric Badges */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {STATS.map((s) => (
              <TiltCard
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-4 text-center hover:border-fuchsia-500/40 transition-colors"
              >
                <p
                  className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-fuchsia-400 to-violet-300 bg-clip-text text-transparent"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {s.value}
                </p>
                <p className="text-white text-xs font-semibold mt-1">{s.label}</p>
                <p className="text-violet-300/60 text-[10px] mt-0.5">{s.sub}</p>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* Interactive 3D Orbit Canvas */}
        <div className="lg:col-span-5 relative h-[360px] md:h-[440px] flex items-center justify-center">
          <Hero3D />
          <div className="absolute -bottom-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-2 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-violet-200">
              Coimbatore, Tamil Nadu • <span className="text-fuchsia-300 font-mono">241cd030@srcw.ac.in</span>
            </span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 max-w-6xl mx-auto px-5 py-20">
        <SectionLabel
          eyebrow="Career Background"
          title="About Me & Education"
          subtitle="Analytical thinker passionate about building production-grade dashboards, predictive algorithms, and AI solutions."
        />

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Career Objective & Bio */}
          <TiltCard className="lg:col-span-7 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20 border border-fuchsia-500/30">
                  <BookOpen size={20} className="text-fuchsia-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    Career Objective
                  </h3>
                  <p className="text-violet-300/60 text-xs">Data Analyst & Machine Learning Developer</p>
                </div>
              </div>

              <div className="space-y-4 text-violet-100/80 text-[15px] leading-relaxed">
                <p className="border-l-2 border-fuchsia-500/60 pl-4 py-1 text-violet-100 font-medium italic bg-fuchsia-500/[0.04] rounded-r-lg">
                  "Final-year B.Sc. Computer Science (Data Analytics) student with hands-on internship
                  experience in data analysis, business intelligence, and machine learning. Proficient in
                  Python, SQL, Power BI, Tableau, and Excel, with a proven ability to turn complex data
                  into clear, actionable insights that support data-driven decisions."
                </p>
                <p>
                  I bridge the gap between heavy data architectures and strategic business decisions.
                  Whether structuring multi-table relational databases in MySQL, constructing KPI telemetry in
                  Power BI / Tableau, or implementing Hybrid RAG architectures with FAISS and BM25, I focus on
                  creating transparent, reliable, and high-impact data systems.
                </p>
                <p>
                  Having completed 5 dynamic internships across FinTech, Industrial ML, Enterprise Software,
                  and Data Analytics, I am well-prepared to contribute immediately to cross-functional data teams.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 grid sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <p className="text-[11px] text-violet-300/60 uppercase tracking-wider font-semibold">Location</p>
                <p className="text-white text-xs font-semibold mt-1">Coimbatore, India</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <p className="text-[11px] text-violet-300/60 uppercase tracking-wider font-semibold">Specialization</p>
                <p className="text-white text-xs font-semibold mt-1">CS & Data Analytics</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <p className="text-[11px] text-violet-300/60 uppercase tracking-wider font-semibold">Availability</p>
                <p className="text-emerald-400 text-xs font-semibold mt-1">Full-time / Immediate</p>
              </div>
            </div>
          </TiltCard>

          {/* Academic Timeline & Details */}
          <div className="lg:col-span-5 space-y-4">
            <h3
              className="text-lg font-bold text-white mb-2 flex items-center gap-2"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              <GraduationCap className="text-fuchsia-400" size={20} /> Academic History
            </h3>

            {EDUCATION.map((edu, idx) => (
              <TiltCard
                key={idx}
                className={`rounded-2xl border p-5 backdrop-blur-md ${
                  edu.current
                    ? "border-fuchsia-500/40 bg-gradient-to-br from-fuchsia-500/10 to-violet-500/5 shadow-lg shadow-purple-500/10"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                      {edu.period}
                    </span>
                    <h4 className="text-white font-bold text-sm mt-2">{edu.degree}</h4>
                    <p className="text-violet-300/70 text-xs mt-1">{edu.institution}</p>
                  </div>
                  <span className="text-xs font-bold text-fuchsia-300 px-2.5 py-1 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/20 shrink-0">
                    {edu.score}
                  </span>
                </div>
              </TiltCard>
            ))}

            {/* Language & Communication Card */}
            <TiltCard className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-2">
                <LangIcon size={18} className="text-fuchsia-400" />
                <h4 className="text-white font-semibold text-sm">Languages & Communication</h4>
              </div>
              <p className="text-violet-200/70 text-xs">
                English (Fluent / Professional), Tamil (Native / Fluent), Hindi (Working proficiency)
              </p>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Skills & Technical Arsenal */}
      <section id="skills" className="relative z-10 max-w-6xl mx-auto px-5 py-20">
        <SectionLabel
          eyebrow="Technical Stack"
          title="Skills & Technical Arsenal"
          subtitle="Curated toolchain and core competencies aligned with end-to-end data analysis, modeling, and enterprise reporting."
        />

        {/* Top Skill Bars */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8 backdrop-blur-md">
          {TOP_SKILLS.map((s) => (
            <SkillBar key={s.name} {...s} />
          ))}
        </div>

        {/* Categorized Technical Skills */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <TiltCard
                key={cat.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md hover:border-violet-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-fuchsia-400">
                      <Icon size={18} />
                    </div>
                    <h4 className="text-white font-bold text-sm tracking-wide">{cat.title}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((item) => (
                      <span
                        key={item}
                        className="text-xs px-3 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-200 font-medium hover:bg-violet-500/20 hover:text-white transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </section>

      {/* Analytics Hub / Live Visualizations */}
      <section id="dashboards" className="relative z-10 max-w-6xl mx-auto px-5 py-20">
        <SectionLabel
          eyebrow="Analytics Telemetry"
          title="Interactive Analytics Hub"
          subtitle="A live demonstration of how I structure metrics, transform raw data, and engineer executive dashboards."
        />

        <div className="grid md:grid-cols-3 gap-5">
          {/* Tool Proficiency Bar Graph */}
          <TiltCard className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md">
            <div className="flex items-center gap-2.5 mb-1">
              <BarChart3 size={18} className="text-fuchsia-400" />
              <h4 className="text-white text-sm font-bold">Analytics Tool Strength</h4>
            </div>
            <p className="text-violet-300/50 text-xs mb-5">Validated through hands-on project implementations</p>
            <BarChartWidget data={TOOL_PROFICIENCY} />
          </TiltCard>

          {/* Integrated Tech Pillars */}
          <TiltCard className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md">
            <div className="flex items-center gap-2.5 mb-1">
              <Boxes size={18} className="text-fuchsia-400" />
              <h4 className="text-white text-sm font-bold">Core Architecture Stack</h4>
            </div>
            <p className="text-violet-300/50 text-xs mb-4">Technologies powering my end-to-end pipelines</p>
            <div className="grid grid-cols-2 gap-2.5">
              {TECH_PILLARS.map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-2.5 hover:border-violet-500/30 transition-colors"
                >
                  <Icon size={16} className={color} />
                  <span className="text-[11px] text-violet-200/90 font-medium truncate">{label}</span>
                </div>
              ))}
            </div>
          </TiltCard>

          {/* Quantitative Snapshot */}
          <TiltCard className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md">
            <div className="flex items-center gap-2.5 mb-1">
              <Activity size={18} className="text-fuchsia-400" />
              <h4 className="text-white text-sm font-bold">Quantitative Impact</h4>
            </div>
            <p className="text-violet-300/50 text-xs mb-4">Key numbers achieved across real workflows</p>
            <div className="space-y-2.5">
              {DASHBOARD_METRICS.slice(0, 3).map(({ icon: Icon, label, value, desc }) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={15} className="text-fuchsia-400" />
                    <div>
                      <p className="text-white text-xs font-semibold">{label}</p>
                      <p className="text-violet-300/50 text-[10px]">{desc}</p>
                    </div>
                  </div>
                  <span
                    className="text-fuchsia-300 text-sm font-bold font-mono"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </TiltCard>

          {/* Internship Progression Area Chart */}
          <TiltCard className="md:col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md">
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-2.5">
                <TrendingUp size={18} className="text-fuchsia-400" />
                <h4 className="text-white text-sm font-bold">Cumulative Internship Skill Velocity</h4>
              </div>
              <span className="text-[11px] font-mono text-fuchsia-400 bg-fuchsia-500/10 px-2.5 py-0.5 rounded-full border border-fuchsia-500/20">
                5 Completed
              </span>
            </div>
            <p className="text-violet-300/50 text-xs mb-4">
              Hands-on mastery scaling across Data Analytics, ML, Full-Stack, and Financial BI
            </p>
            <LineChartWidget points={INTERNSHIP_GROWTH_POINTS} labels={INTERNSHIP_GROWTH_LABELS} />
          </TiltCard>

          {/* Business Dashboard Highlights */}
          <TiltCard className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md flex flex-col justify-center">
            <div className="flex items-center gap-2.5 mb-2">
              <LayoutDashboard size={18} className="text-fuchsia-400" />
              <h4 className="text-white text-sm font-bold">BI Deliverables</h4>
            </div>
            <p className="text-violet-300/70 text-xs leading-relaxed mb-4">
              Specialized in building executive decision cockpits with DAX calculations, interactive slicers,
              and drill-down hierarchies.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[10px] px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 font-medium">
                Power BI & DAX
              </span>
              <span className="text-[10px] px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-300 font-medium">
                Tableau Desktop
              </span>
              <span className="text-[10px] px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-medium">
                Advanced Excel & VBA
              </span>
              <span className="text-[10px] px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 font-medium">
                Plotly & Streamlit
              </span>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* Internship Experience */}
      <section id="experience" className="relative z-10 max-w-6xl mx-auto px-5 py-20">
        <SectionLabel
          eyebrow="Work History"
          title="Internship Experience"
          subtitle="Real-world contributions across Fintech, Artificial Intelligence, Full-Stack engineering, and Data Analytics."
        />

        <div className="relative pl-6 md:pl-10 border-l border-violet-500/30 space-y-12">
          {EXPERIENCE.map((exp, i) => (
            <div key={i} className="relative group">
              {/* Timeline Marker */}
              <span className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#07040f] border-2 border-fuchsia-400 shadow-md shadow-fuchsia-500/40 group-hover:scale-125 transition-transform" />

              <TiltCard className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8 backdrop-blur-md hover:border-violet-500/40 transition-all">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-300">
                      {exp.dates}
                    </span>
                    <h3
                      className="text-xl font-bold text-white mt-2 group-hover:text-fuchsia-300 transition-colors"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {exp.role}
                    </h3>
                    <p className="text-violet-300 font-medium text-sm">{exp.company}</p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-200 font-medium">
                    {exp.badge}
                  </span>
                </div>

                <ul className="mt-4 space-y-2.5">
                  {exp.bullets.map((bullet, bi) => (
                    <li key={bi} className="text-violet-100/80 text-sm leading-relaxed flex gap-2.5 items-start">
                      <CheckCircle2 size={15} className="text-fuchsia-400 shrink-0 mt-1" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </div>
          ))}
        </div>
      </section>

      {/* Featured & Additional Projects */}
      <section id="projects" className="relative z-10 max-w-6xl mx-auto px-5 py-20">
        <SectionLabel
          eyebrow="Portfolio Showcase"
          title="Featured Projects"
          subtitle="Production-tested systems ranging from Hybrid RAG chatbots and deep learning vision systems to financial analytics dashboards."
        />

        {/* Featured Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {FEATURED_PROJECTS.map((proj) => (
            <TiltCard
              key={proj.title}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-md hover:border-fuchsia-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3
                    className="text-xl font-bold text-white"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {proj.title}
                  </h3>
                  <div className="flex gap-2.5 shrink-0">
                    {proj.demo && (
                      <a
                        href={proj.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-300 hover:text-fuchsia-300 hover:bg-violet-500/20 transition-all"
                        title="Live Demo"
                      >
                        <ExternalLink size={15} />
                      </a>
                    )}
                    {proj.repo && (
                      <a
                        href={proj.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-300 hover:text-fuchsia-300 hover:bg-violet-500/20 transition-all"
                        title="Source Code"
                      >
                        <Github size={15} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-fuchsia-400 text-xs font-semibold mb-3">{proj.tagline}</p>
                <p className="text-violet-100/75 text-sm leading-relaxed mb-4">{proj.description}</p>

                {proj.highlights && (
                  <div className="mb-4 space-y-1">
                    {proj.highlights.map((hl, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-violet-300/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                {proj.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-200 font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Additional Projects Section */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <FolderGit2 className="text-fuchsia-400" size={20} />
            <h3
              className="text-xl font-bold text-white tracking-wide"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Additional Projects & Systems
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ADDITIONAL_PROJECTS.map((p) => (
              <TiltCard
                key={p.title}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md flex flex-col justify-between hover:border-violet-500/30"
              >
                <div>
                  <h4 className="text-white text-sm font-bold mb-1.5">{p.title}</h4>
                  <p className="text-violet-200/70 text-xs leading-relaxed mb-3">{p.desc}</p>
                </div>
                <p className="text-fuchsia-400/90 text-[11px] font-mono font-medium">{p.tech}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Extracurricular Achievements */}
      <section id="leadership" className="relative z-10 max-w-6xl mx-auto px-5 py-20">
        <SectionLabel
          eyebrow="Initiative & Recognition"
          title="Leadership & Achievements"
          subtitle="Demonstrated student representation, academic organizing, and competition problem-solving accolades."
        />

        <div className="grid sm:grid-cols-2 gap-5">
          {LEADERSHIP_ACHIEVEMENTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <TiltCard
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md hover:border-fuchsia-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20 border border-fuchsia-500/30 text-fuchsia-300">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h4
                          className="text-white font-bold text-base"
                          style={{ fontFamily: "Space Grotesk, sans-serif" }}
                        >
                          {item.title}
                        </h4>
                        <p className="text-violet-300/70 text-xs mt-0.5">{item.organization}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 shrink-0">
                      {item.type}
                    </span>
                  </div>

                  <p className="text-violet-100/75 text-xs leading-relaxed mt-2">{item.description}</p>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="relative z-10 max-w-6xl mx-auto px-5 py-20">
        <SectionLabel
          eyebrow="Verified Credentials"
          title="Professional Certifications"
          subtitle="Credentials from Deloitte, IBM, NPTEL, GUVI, and Monday.com confirming expertise across analytics, AI, and engineering."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CERTIFICATIONS.map((cert) => {
            const Icon = cert.icon;
            return (
              <TiltCard
                key={cert.category}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md hover:border-violet-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2.5 rounded-2xl bg-gradient-to-br ${cert.color} bg-opacity-20 border border-white/15 text-white`}>
                      <Icon size={18} />
                    </div>
                    <h4 className="text-white font-bold text-sm">{cert.category}</h4>
                  </div>

                  <ul className="space-y-3">
                    {cert.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs">
                        <Award size={14} className="text-fuchsia-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-violet-100 font-medium leading-snug">{item.name}</p>
                          <p className="text-violet-300/50 text-[10px] mt-0.5 font-mono">{item.issuer}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </section>

      {/* Contact & Connect Section */}
      <section id="contact" className="relative z-10 max-w-6xl mx-auto px-5 py-20">
        <TiltCard className="rounded-3xl border border-white/15 bg-gradient-to-br from-violet-900/30 via-fuchsia-900/20 to-indigo-950/40 p-8 md:p-14 text-center backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-300 text-xs font-semibold mb-6">
            <Sparkles size={12} /> Open For Immediate Opportunities
          </div>

          <h2
            className="text-3xl md:text-5xl font-extrabold text-white max-w-2xl mx-auto leading-tight"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Let's Build Impactful,{" "}
            <span className="bg-gradient-to-r from-fuchsia-400 to-violet-300 bg-clip-text text-transparent">
              Data-Driven Systems
            </span>
          </h2>

          <p className="text-violet-200/80 mt-4 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
            Interested in discussing data analytics, business intelligence dashboards, or machine learning engineering?
            Feel free to reach out directly.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <a
              href="mailto:241cd030@srcw.ac.in"
              className="flex items-center gap-2.5 border border-white/15 bg-white/5 backdrop-blur-md px-5 py-3 rounded-full text-xs sm:text-sm font-medium hover:bg-white/10 hover:border-fuchsia-400 transition-all"
            >
              <Mail size={15} className="text-fuchsia-400" /> 241cd030@srcw.ac.in
            </a>
            <a
              href="tel:6380045604"
              className="flex items-center gap-2.5 border border-white/15 bg-white/5 backdrop-blur-md px-5 py-3 rounded-full text-xs sm:text-sm font-medium hover:bg-white/10 hover:border-fuchsia-400 transition-all"
            >
              <Phone size={15} className="text-fuchsia-400" /> +91 6380045604
            </a>
            <div className="flex items-center gap-2.5 border border-white/10 bg-white/[0.02] px-5 py-3 rounded-full text-xs text-violet-300/80">
              <MapPin size={15} className="text-fuchsia-400 shrink-0" /> No 3, Kamarajar street, Saibaba Colony, Coimbatore
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <a
              href="https://linkedin.com/in/poorani-s-046357340"
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-full border border-white/15 bg-white/5 flex items-center justify-center hover:bg-white/15 hover:text-fuchsia-400 transition-all"
              title="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://github.com/Poorani-S"
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-full border border-white/15 bg-white/5 flex items-center justify-center hover:bg-white/15 hover:text-fuchsia-400 transition-all"
              title="GitHub Profile"
            >
              <Github size={18} />
            </a>
          </div>

          <div className="mt-8">
            <a
              href="/resume.pdf"
              download="Poorani_S_Resume.pdf"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-500 via-violet-600 to-indigo-600 px-7 py-3.5 rounded-full text-sm font-bold shadow-xl shadow-purple-500/30 hover:scale-105 transition-all"
            >
              <Download size={16} /> Download Official Resume (PDF)
            </a>
          </div>
        </TiltCard>
      </section>

      {/* Footer */}
      <footer className="relative z-10 max-w-6xl mx-auto px-5 py-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-violet-300/50">
        <p>&copy; {new Date().getFullYear()} Poorani S — Data Analyst Portfolio</p>
        <p className="flex items-center gap-2">
          <span>Designed & Developed with React & Three.js</span>
          <span>•</span>
          <span className="text-violet-400">Coimbatore, India</span>
        </p>
      </footer>
    </div>
  );
}
