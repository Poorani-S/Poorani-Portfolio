import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  Github, Linkedin, Mail, Phone, MapPin, Download, ExternalLink, Menu, X,
  GraduationCap, Award, Trophy, Languages as LangIcon, ArrowRight, Sparkles,
  BarChart3, TrendingUp, Database, LayoutDashboard, Cpu, Cloud,
  GitBranch, Target, Boxes, Activity, CheckCircle2, Briefcase, Bot,
  FolderGit2, Code2, Layers, BookOpen, Star, ShieldCheck, Compass,
  Search, FileSpreadsheet, Terminal, Zap, PieChart, LineChart
} from "lucide-react";

import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Magnetic from "./components/Magnetic";
import Reveal, { StaggerContainer, StaggerItem } from "./components/Reveal";
import Counter from "./components/Counter";
import Marquee from "./components/Marquee";

gsap.registerPlugin(ScrollTrigger);

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
  { value: "5", label: "Internships Completed", sub: "Data Analysis, AI, ML & BI" },
  { value: "10+", label: "Projects Shipped", sub: "Full-Stack, RAG & Analytics" },
  { value: "8.9", label: "B.Sc CGPA", sub: "Sri Ramakrishna College" },
  { value: "16+", label: "Certifications", sub: "Deloitte, IBM, NPTEL, Infosys, GUVI" },
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
    icon: Bot,
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

const CERTIFICATIONS = [
  {
    category: "Data Analytics & BI",
    icon: BarChart3,
    color: "from-fuchsia-500 to-violet-500",
    items: [
      { name: "Deloitte Australia – Data Analytics Job Simulation", issuer: "Forage" },
      { name: "IBM – Data Analysis with Python", issuer: "IBM" },
      { name: "IBM – Data Visualization", issuer: "IBM" },
      { name: "IBM – Python for Data Science", issuer: "IBM" },
      { name: "IBM – Business Intelligence", issuer: "IBM" },
      { name: "NoviTech – SQL", issuer: "NoviTech" },
      { name: "NPTEL – Database Management System", issuer: "NPTEL / IIT" },
      { name: "Nasscom – Digital Engineering", issuer: "NASSCOM / FutureSkills Prime" },
      { name: "MongoDB – Database Fundamentals", issuer: "MongoDB University" },
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
    category: "Programming",
    icon: Code2,
    color: "from-indigo-500 to-cyan-500",
    items: [
      { name: "GUVI – Python Programming", issuer: "GUVI" },
      { name: "Infosys – C Programming 101", issuer: "Infosys Springboard" },
      { name: "Infosys – Computer Fundamentals", issuer: "Infosys Springboard" },
    ],
  },
  {
    category: "Cybersecurity",
    icon: ShieldCheck,
    color: "from-rose-500 to-red-600",
    items: [
      { name: "Deloitte Australia – Cyber Job Simulation", issuer: "Forage" },
      { name: "IBM – Cybersecurity Fundamental", issuer: "IBM" },
    ],
  },
  {
    category: "Professional Services",
    icon: Briefcase,
    color: "from-cyan-500 to-teal-500",
    items: [
      { name: "Monday.com – Professional Services Roles Certification Pathway", issuer: "Monday.com" },
    ],
  },
];

const DASHBOARD_METRICS = [
  { label: "Data Records Processed", value: "50,000+", icon: Database, desc: "Fintech, Student & Sensor Data", color: "from-fuchsia-500 to-pink-500", tag: "+100% Validated" },
  { label: "AI Model Accuracy", value: "94.0%", icon: Target, desc: "FixieAI Equipment Failure Predictor", color: "from-violet-500 to-purple-500", tag: "Industrial ML" },
  { label: "Deep Learning Accuracy", value: "88%+", icon: Cpu, desc: "SmartWaste AI 5-Class EfficientNet", color: "from-cyan-500 to-blue-500", tag: "Grad-CAM Vision" },
];

const TOOL_PROFICIENCY = [
  { label: "Python", value: 94, icon: "🐍", color: "from-violet-500 to-indigo-500" },
  { label: "SQL", value: 92, icon: "🗄️", color: "from-fuchsia-500 to-pink-500" },
  { label: "Power BI", value: 90, icon: "📊", color: "from-amber-500 to-orange-500" },
  { label: "Excel", value: 92, icon: "📑", color: "from-emerald-500 to-teal-500" },
  { label: "Tableau", value: 85, icon: "📈", color: "from-cyan-500 to-blue-500" },
];

const INTERNSHIP_MILESTONES = [
  { company: "Hexaind", focus: "Data Science & Tableau", date: "May–Jul '25", level: 30 },
  { company: "NoviTech", focus: "Behavior Analytics & BI", date: "Sep–Oct '25", level: 48 },
  { company: "Kambaa", focus: "Full-Stack AI & Chatbot", date: "Dec '25–Apr '26", level: 66 },
  { company: "IBM / Adroit", focus: "Predictive ML (94%)", date: "May '26", level: 82 },
  { company: "Bluestock", focus: "Fintech & KPI Dashboards", date: "May–Jul '26", level: 96 },
  { company: "Present", focus: "Ready to Deploy Impact", date: "2026+", level: 100 },
];

const TECH_PILLARS = [
  { icon: Database, label: "SQL & MySQL", sub: "Relational Modeling", color: "text-blue-400", border: "border-blue-500/30", bg: "bg-blue-500/10" },
  { icon: BarChart3, label: "Power BI / Tableau", sub: "Executive Cockpits", color: "text-amber-400", border: "border-amber-500/30", bg: "bg-amber-500/10" },
  { icon: Cpu, label: "Scikit & TensorFlow", sub: "Predictive & DL Models", color: "text-fuchsia-400", border: "border-fuchsia-500/30", bg: "bg-fuchsia-500/10" },
  { icon: Bot, label: "Hybrid RAG & LLMs", sub: "FAISS + BM25 Retrieval", color: "text-purple-400", border: "border-purple-500/30", bg: "bg-purple-500/10" },
  { icon: Layers, label: "React & FastAPI", sub: "High-Perf Full-Stack", color: "text-cyan-400", border: "border-cyan-500/30", bg: "bg-cyan-500/10" },
  { icon: GitBranch, label: "Git & Monday.com", sub: "Agile CI/CD & PM", color: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/10" },
];

/* ---------------- Particle Background Field ---------------- */
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

/* ---------------- Parallax Background Orbs ---------------- */
function GradientOrbs({ scrollYProgress }) {
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 240]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <>
      <motion.div style={{ y: y1 }} className="orb orb-1" />
      <motion.div style={{ y: y2 }} className="orb orb-2" />
      <motion.div style={{ y: y3 }} className="orb orb-3" />
    </>
  );
}

/* ---------------- Hero 3D (Interactive & Scroll-Scrubbed) ---------------- */
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

    let targetMouseX = 0, targetMouseY = 0;
    let mouseX = 0, mouseY = 0;
    function onMove(e) {
      const rect = mount.getBoundingClientRect();
      targetMouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetMouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    }
    window.addEventListener("mousemove", onMove);

    // ScrollTrigger scrub for scale & rotation
    let scrollTriggerInstance = null;
    try {
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: mount,
        start: "top center",
        end: "bottom top",
        scrub: 1.2,
        onUpdate: (self) => {
          const p = self.progress;
          group.scale.set(1 + p * 0.15, 1 + p * 0.15, 1 + p * 0.15);
          group.rotation.z = p * 0.6;
        },
      });
    } catch (e) {
      // safe fallback
    }

    let raf;
    function animate() {
      ico.rotation.y += 0.0035;
      ico.rotation.x += 0.0015;
      inner.rotation.y -= 0.004;
      inner.rotation.x += 0.002;
      stars.rotation.y += 0.0008;

      // Enhanced smooth mouse response
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      group.rotation.y = mouseX * 0.65;
      group.rotation.x = -mouseY * 0.55;

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
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
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

/* ---------------- TiltCard with 3D Spring & Cursor Glow ---------------- */
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
      transform: `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(16px) scale(1.012)`,
      boxShadow: `${-x * 25}px ${-y * 25 + 14}px 35px -8px rgba(124,58,237,0.35)`,
      "--glow-x": `${(x + 0.5) * 100}%`,
      "--glow-y": `${(y + 0.5) * 100}%`,
    });
  }
  function handleLeave() {
    setStyle({
      transform: "perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0px) scale(1)",
      boxShadow: "0px 10px 30px -18px rgba(124,58,237,0.18)",
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
          background: `radial-gradient(220px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(168,85,247,0.2), transparent 70%)`,
        }}
      />
      <div style={{ transform: "translateZ(14px)", transformStyle: "preserve-3d" }}>{children}</div>
    </div>
  );
}

/* ---------------- Viewport-Triggered Bar Chart ---------------- */
function BarChartWidget({ data }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-40px" });
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div ref={containerRef} className="w-full flex flex-col justify-between pt-3">
      {/* Visual Chart Track */}
      <div className="flex items-end justify-between gap-3 h-32 px-1 relative">
        {/* Grid Guidelines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
          <div className="border-b border-violet-400 border-dashed w-full" />
          <div className="border-b border-violet-400 border-dashed w-full" />
          <div className="border-b border-violet-400 border-dashed w-full" />
        </div>

        {data.map((d, i) => (
          <div
            key={d.label}
            className="flex-1 h-full flex flex-col items-center justify-end relative group cursor-pointer"
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {/* Tooltip on hover */}
            {hoveredIdx === i && (
              <div className="absolute -top-7 bg-violet-950/90 border border-fuchsia-400 text-fuchsia-200 text-[10px] font-bold px-2 py-0.5 rounded shadow-lg backdrop-blur-md z-20 whitespace-nowrap animate-in fade-in zoom-in-95">
                {d.label}: {d.value}%
              </div>
            )}

            {/* Score label above bar */}
            <span
              className={`text-[10px] font-mono font-bold mb-1.5 transition-all duration-300 ${
                hoveredIdx === i ? "text-fuchsia-300 scale-110" : "text-violet-300/80"
              }`}
            >
              {isInView ? <Counter value={`${d.value}%`} duration={1.2 + i * 0.1} /> : "0%"}
            </span>

            {/* Bar Outer Track */}
            <div className="w-full bg-white/[0.06] rounded-t-lg h-24 relative flex items-end overflow-hidden p-0.5 border border-white/5 group-hover:border-fuchsia-500/40 transition-colors">
              {/* Inner Gradient Bar */}
              <div
                className={`w-full rounded-t-md bg-gradient-to-t ${d.color || "from-violet-600 via-fuchsia-500 to-pink-400"} transition-all duration-1000 ease-out relative`}
                style={{
                  height: isInView ? `${d.value}%` : "0%",
                  transitionDelay: `${i * 120}ms`,
                  boxShadow: hoveredIdx === i ? "0 0 20px rgba(232,121,249,0.8)" : "0 0 10px rgba(217,70,239,0.35)",
                }}
              >
                {/* Glowing Top Cap */}
                <div className="absolute top-0 inset-x-0 h-1 bg-white/80 rounded-t-md shadow-sm" />
              </div>
            </div>

            {/* Tech Name Label */}
            <div className="mt-2.5 flex items-center gap-1 text-center">
              <span className="text-xs">{d.icon}</span>
              <span className="text-[11px] font-semibold text-violet-100 group-hover:text-fuchsia-300 transition-colors">
                {d.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Viewport-Triggered Line Chart ---------------- */
function LineChartWidget({ milestones }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-40px" });
  const [activeNode, setActiveNode] = useState(null);

  const w = 540,
    h = 130,
    pad = 28;
  const count = milestones.length;

  const points = milestones.map((m, i) => {
    const x = pad + (i / (count - 1)) * (w - pad * 2);
    const y = h - pad - (m.level / 100) * (h - pad * 2);
    return { x, y, ...m };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  const areaPath = `${linePath} L ${points[count - 1].x} ${h - 8} L ${points[0].x} ${h - 8} Z`;

  return (
    <div ref={containerRef} className="w-full pt-2">
      <div className="relative">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-32 overflow-visible">
          <defs>
            <linearGradient id="velocityGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d946ef" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#8b5cf6" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="strokeGlow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="50%" stopColor="#d946ef" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>

          {/* Area Fill */}
          <path
            d={areaPath}
            fill="url(#velocityGradient)"
            style={{
              opacity: isInView ? 1 : 0,
              transition: "opacity 1.2s ease-out 0.4s",
            }}
          />

          {/* Path Line */}
          <path
            d={linePath}
            fill="none"
            stroke="url(#strokeGlow)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              filter: "drop-shadow(0 0 10px rgba(217,70,239,0.7))",
              strokeDasharray: 900,
              strokeDashoffset: isInView ? 0 : 900,
              transition: "stroke-dashoffset 1.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />

          {/* Interactive Milestone Nodes (Popping in sequentially) */}
          {points.map((p, i) => (
            <g
              key={i}
              className="cursor-pointer group"
              onMouseEnter={() => setActiveNode(p)}
              onMouseLeave={() => setActiveNode(null)}
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "scale(1)" : "scale(0)",
                transformOrigin: `${p.x}px ${p.y}px`,
                transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.6 + i * 0.18}s`,
              }}
            >
              {/* Pulsing ring for latest point */}
              {i === count - 1 && isInView && (
                <circle cx={p.x} cy={p.y} r="9" fill="none" stroke="#38bdf8" strokeWidth="1.5">
                  <animate attributeName="r" values="6;13;6" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
                </circle>
              )}

              {/* Node Dot */}
              <circle
                cx={p.x}
                cy={p.y}
                r={activeNode?.company === p.company ? "6.5" : "4.5"}
                fill="#ffffff"
                stroke="#d946ef"
                strokeWidth="2.5"
                style={{
                  transition: "all 0.2s ease-out",
                  filter: "drop-shadow(0 0 6px rgba(217,70,239,0.9))",
                }}
              />
            </g>
          ))}
        </svg>

        {/* Milestone Node Details Overlay */}
        {activeNode && (
          <div className="absolute top-0 right-4 bg-black/80 border border-fuchsia-500/50 backdrop-blur-md rounded-xl px-3 py-1.5 shadow-xl flex items-center gap-2 animate-in fade-in">
            <span className="w-2 h-2 rounded-full bg-fuchsia-400" />
            <span className="text-xs font-bold text-white">{activeNode.company}</span>
            <span className="text-[11px] text-violet-300 font-medium">({activeNode.focus})</span>
            <span className="text-[10px] text-fuchsia-300 font-mono bg-fuchsia-500/20 px-1.5 py-0.5 rounded">
              {activeNode.date}
            </span>
          </div>
        )}
      </div>

      {/* High-Contrast Readable Labels */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-3 pt-2 border-t border-white/5">
        {milestones.map((m, i) => (
          <div
            key={i}
            className={`flex flex-col items-center text-center p-1.5 rounded-lg border transition-all ${
              activeNode?.company === m.company
                ? "bg-fuchsia-500/15 border-fuchsia-500/40 shadow-sm"
                : "bg-white/[0.02] border-white/5 hover:border-violet-500/30"
            }`}
          >
            <p className="text-[11px] font-bold text-violet-100 leading-tight">{m.company}</p>
            <p className="text-[9px] text-fuchsia-300/90 font-medium truncate w-full mt-0.5">{m.focus}</p>
            <p className="text-[8px] text-violet-400 font-mono mt-0.5">{m.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Skill Bar with Shimmer Sweep ---------------- */
function SkillBar({ name, pct }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref}>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-violet-100 font-medium">{name}</span>
        <span className="text-violet-400 font-mono text-xs font-semibold">
          {isInView ? <Counter value={`${pct}%`} duration={1.5} /> : "0%"}
        </span>
      </div>
      <div className="h-2.5 rounded-full bg-white/5 overflow-hidden p-0.5 border border-white/5 relative">
        <div
          className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500 transition-all duration-1000 ease-out relative overflow-hidden"
          style={{ width: isInView ? `${pct}%` : "0%" }}
        >
          {/* Shimmer sweep effect */}
          {isInView && (
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer pointer-events-none" />
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Section Label with Mask/Clip-Path Animation ---------------- */
function SectionLabel({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-12 text-center">
      {/* Eyebrow */}
      <Reveal direction="down" delay={0.05}>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-semibold tracking-wide uppercase mb-4 shadow-sm">
          <Sparkles size={13} className="text-fuchsia-400" /> {eyebrow}
        </div>
      </Reveal>

      {/* Mask-revealed Title */}
      <div className="overflow-hidden py-1">
        <motion.h2
          initial={{ y: "100%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.1 }}
          className="text-3xl md:text-5xl font-extrabold text-white tracking-tight"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          {title}
        </motion.h2>
      </div>

      {/* Subtitle */}
      {subtitle && (
        <Reveal delay={0.2} y={20}>
          <p className="mt-3 text-violet-200/70 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------------- Hero Headline Word-by-Word Reveal ---------------- */
function HeroHeadline() {
  const words = ["Turning", "Raw", "Data", "Into"];

  return (
    <h1
      className="text-4xl sm:text-5xl lg:text-[62px] font-extrabold leading-[1.1] tracking-tight text-white"
      style={{ fontFamily: "Space Grotesk, sans-serif" }}
    >
      <div className="flex flex-wrap gap-x-3.5 gap-y-1">
        {words.map((word, idx) => (
          <span key={idx} className="overflow-hidden inline-block py-0.5">
            <motion.span
              className="inline-block"
              initial={{ y: "115%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 0.65,
                ease: [0.21, 0.47, 0.32, 0.98],
                delay: 0.1 + idx * 0.06,
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </div>

      <span className="relative block mt-2 overflow-hidden py-1">
        <motion.span
          className="inline-block"
          initial={{ y: "115%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.21, 0.47, 0.32, 0.98],
            delay: 0.38,
          }}
        >
          <span className="bg-gradient-to-r from-fuchsia-400 via-pink-300 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(217,70,239,0.35)]">
            Actionable Business
          </span>{" "}
          <span className="bg-gradient-to-r from-violet-300 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
            Intelligence
          </span>
        </motion.span>
      </span>
    </h1>
  );
}

/* ---------------- Hero Rotating / Typewriter Line ---------------- */
function HeroRoles() {
  const roles = [
    "Data Analyst",
    "BI Developer",
    "ML Engineer",
    "Data Analyst / BI Developer / ML Engineer",
  ];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = roles[currentIdx];
    let timer;

    if (!isDeleting) {
      if (displayedText.length < fullText.length) {
        timer = setTimeout(() => {
          setDisplayedText(fullText.slice(0, displayedText.length + 1));
        }, 60);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(fullText.slice(0, displayedText.length - 1));
        }, 30);
      } else {
        setIsDeleting(false);
        setCurrentIdx((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentIdx]);

  return (
    <div className="inline-flex items-center gap-2 font-mono text-sm sm:text-base font-semibold text-violet-300 mt-3.5 mb-1 bg-violet-950/40 px-3.5 py-1.5 rounded-xl border border-violet-500/25">
      <Sparkles size={14} className="text-fuchsia-400 animate-spin" style={{ animationDuration: "6s" }} />
      <span>{displayedText}</span>
      <span className="w-2 h-4 bg-fuchsia-400 animate-pulse" />
    </div>
  );
}

/* ---------------- Featured Projects Horizontal Pin-and-Scroll Section ---------------- */
function FeaturedProjectsHorizontal() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const track = trackRef.current;
        if (!track) return;

        const totalScroll = track.scrollWidth - window.innerWidth + 140;

        gsap.to(track, {
          x: () => -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            start: "top top+=75",
            end: () => `+=${totalScroll * 1.15}`,
            invalidateOnRefresh: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Desktop Horizontal Scroll Track */}
      <div className="hidden lg:block overflow-hidden py-6">
        <div ref={trackRef} className="flex gap-7 px-8 items-stretch will-change-transform">
          {FEATURED_PROJECTS.map((proj, idx) => (
            <div
              key={proj.title}
              className="w-[480px] shrink-0 group transition-transform duration-300 hover:-translate-y-2"
            >
              <TiltCard className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-md group-hover:border-fuchsia-500/50 transition-all flex flex-col justify-between shadow-xl">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[10px] font-mono text-fuchsia-300 font-bold bg-fuchsia-500/10 px-2 py-0.5 rounded border border-fuchsia-500/20">
                        Project #{idx + 1}
                      </span>
                      <h3
                        className="text-xl font-bold text-white mt-1.5"
                        style={{ fontFamily: "Space Grotesk, sans-serif" }}
                      >
                        {proj.title}
                      </h3>
                    </div>
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
                    <div className="mb-4 space-y-1.5">
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
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-200 font-medium group-hover:border-fuchsia-500/30 transition-all"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile & Tablet Fallback Grid */}
      <div className="lg:hidden grid sm:grid-cols-2 gap-6">
        {FEATURED_PROJECTS.map((proj) => (
          <Reveal key={proj.title}>
            <TiltCard className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-md hover:border-fuchsia-500/40 transition-all flex flex-col justify-between">
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
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ========================================================================= */
/*                              MAIN APP                                     */
/* ========================================================================= */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("about");
  const lenisRef = useRef(null);

  const { scrollY, scrollYProgress } = useScroll();

  // Initialize Lenis + GSAP ScrollTrigger
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion) {
      const lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.75,
      });
      lenisRef.current = lenis;

      lenis.on("scroll", ScrollTrigger.update);

      const tickerCallback = (time) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(tickerCallback);
        lenis.destroy();
      };
    }
  }, []);

  // Track Navbar Scroll Direction (Hide on scroll down, show on scroll up)
  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 30);

      if (currentY > 140) {
        if (currentY > lastY) {
          setNavVisible(false); // scrolling down
        } else {
          setNavVisible(true); // scrolling up
        }
      } else {
        setNavVisible(true);
      }
      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track Active Section for Navbar Sliding Pill
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25 }
    );

    NAV.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll handler using Lenis
  const scrollTo = (id) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (!element) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(element, { offset: -70 });
    } else {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      className="relative min-h-screen bg-[#07040f] text-white overflow-x-hidden selection:bg-fuchsia-500 selection:text-white"
      style={{ fontFamily: "Inter, ui-sans-serif, system-ui" }}
    >
      {/* Session Preloader */}
      <Preloader />

      {/* Interactive Custom Cursor */}
      <Cursor />

      {/* Top Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500 z-[999] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Background Animated Atmosphere & Parallax Orbs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <GradientOrbs scrollYProgress={scrollYProgress} />
        <ParticleField />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 45% at 50% 0%, rgba(124,58,237,0.28), transparent 70%)",
          }}
        />
      </div>

      {/* Sticky Smart Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          navVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          scrolled
            ? "bg-[#07040f]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl py-2"
            : "py-4"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
          <div
            onClick={() => {
              if (lenisRef.current) lenisRef.current.scrollTo(0);
              else window.scrollTo({ top: 0, behavior: "smooth" });
            }}
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

          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.04] border border-white/10 backdrop-blur-md rounded-full px-2 py-1.5 shadow-inner relative">
            {NAV.map((n) => {
              const isActive = activeSection === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => scrollTo(n.id)}
                  className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-colors relative ${
                    isActive ? "text-white font-semibold" : "text-violet-100/80 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-500/30 to-violet-500/30 border border-fuchsia-400/40 shadow-sm"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{n.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            <Magnetic strength={0.3}>
              <a
                href="/resume.pdf"
                download="Poorani_S_Resume.pdf"
                className="flex items-center gap-2 border border-violet-500/40 bg-violet-500/10 text-violet-200 text-xs font-semibold px-4 py-2 rounded-full hover:bg-violet-500/20 hover:border-violet-400 transition-all"
              >
                <Download size={13} /> Resume
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <button
                onClick={() => scrollTo("contact")}
                className="flex items-center gap-1.5 bg-gradient-to-r from-fuchsia-500 via-violet-600 to-indigo-600 text-white text-xs font-semibold px-4 py-2 rounded-full hover:opacity-95 shadow-md shadow-violet-500/25 transition-transform hover:scale-105"
              >
                Let's Connect <ArrowRight size={13} />
              </button>
            </Magnetic>
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
                className={`text-left text-sm font-medium py-1.5 transition-colors ${
                  activeSection === n.id ? "text-fuchsia-400 font-bold" : "text-violet-100/90 hover:text-fuchsia-400"
                }`}
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
      <section className="relative z-10 max-w-6xl mx-auto px-5 pt-28 md:pt-36 pb-20 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          {/* Enhanced Glowing Status Pill */}
          <Reveal delay={0.05} y={20}>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-fuchsia-500/40 bg-gradient-to-r from-fuchsia-500/15 via-purple-500/15 to-violet-500/15 text-fuchsia-200 text-xs sm:text-sm font-semibold mb-5 shadow-lg shadow-fuchsia-500/20 backdrop-blur-md hover:border-fuchsia-400 transition-all">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-fuchsia-400"></span>
              </span>
              <span>Final-Year B.Sc CS (Data Analytics)</span>
              <span className="text-violet-400 font-bold">•</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-fuchsia-200 to-indigo-200 font-bold">
                Open for Data Analyst Roles
              </span>
            </div>
          </Reveal>

          {/* High-Impact Headline with Word-by-Word Stagger Mask */}
          <HeroHeadline />

          {/* Dynamic Typing Line */}
          <Reveal delay={0.45} y={15}>
            <HeroRoles />
          </Reveal>

          {/* Styled Introduction Card with Tagged Highlights */}
          <Reveal delay={0.5} y={25}>
            <div className="mt-5 text-violet-100/90 text-base sm:text-lg leading-relaxed max-w-2xl bg-white/[0.03] border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-md shadow-lg shadow-purple-950/20">
              <p className="font-normal">
                Hi, I'm <strong className="text-white font-bold text-lg bg-gradient-to-r from-fuchsia-400 to-violet-300 bg-clip-text text-transparent">Poorani S</strong> — a final-year Data Analytics student with hands-on internship experience across{" "}
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-fuchsia-500/15 border border-fuchsia-500/30 text-fuchsia-200 text-xs sm:text-sm font-semibold">Fintech</span>,{" "}
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-violet-500/15 border border-violet-500/30 text-violet-200 text-xs sm:text-sm font-semibold">Machine Learning</span>,{" "}
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-cyan-500/15 border border-cyan-500/30 text-cyan-200 text-xs sm:text-sm font-semibold">AI Full-Stack</span>, and{" "}
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-200 text-xs sm:text-sm font-semibold">Business Intelligence</span>.
              </p>
              <div className="mt-3.5 pt-3.5 border-t border-white/10 flex flex-wrap items-center gap-2 text-sm text-violet-200">
                <span className="text-xs text-violet-300/70 font-medium">Core Toolchain:</span>
                <span className="text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white font-semibold">Python</span>
                <span className="text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white font-semibold">SQL</span>
                <span className="text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white font-semibold">Power BI</span>
                <span className="text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white font-semibold">Tableau</span>
                <span className="text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white font-semibold">Excel</span>
                <span className="text-xs text-fuchsia-300 font-medium ml-auto">→ Empowering Growth Decisions</span>
              </div>
            </div>
          </Reveal>

          {/* Action Buttons with Magnetic Effect */}
          <Reveal delay={0.6} y={25}>
            <div className="mt-8 flex flex-wrap gap-3.5 items-center">
              <Magnetic strength={0.35}>
                <button
                  onClick={() => scrollTo("projects")}
                  className="flex items-center gap-2 bg-gradient-to-r from-fuchsia-500 via-violet-600 to-indigo-600 px-6 py-3.5 rounded-full text-sm font-semibold shadow-lg shadow-violet-500/30 hover:shadow-fuchsia-500/40 hover:scale-105 transition-all"
                >
                  Explore Projects <ArrowRight size={15} />
                </button>
              </Magnetic>
              <Magnetic strength={0.35}>
                <a
                  href="/resume.pdf"
                  download="Poorani_S_Resume.pdf"
                  className="flex items-center gap-2 border border-white/20 bg-white/5 backdrop-blur-md px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-white/10 hover:border-violet-400 transition-all"
                >
                  <Download size={15} /> Download Resume
                </a>
              </Magnetic>
              <Magnetic strength={0.4}>
                <a
                  href="https://github.com/Poorani-S"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:text-fuchsia-300 transition-colors inline-block"
                  title="GitHub Profile"
                >
                  <Github size={17} />
                </a>
              </Magnetic>
              <Magnetic strength={0.4}>
                <a
                  href="https://linkedin.com/in/poorani-s-046357340"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:text-fuchsia-300 transition-colors inline-block"
                  title="LinkedIn Profile"
                >
                  <Linkedin size={17} />
                </a>
              </Magnetic>
            </div>
          </Reveal>

          {/* Key Metric Badges with Smooth Upward Counter */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {STATS.map((s, idx) => (
              <Reveal key={s.label} delay={0.7 + idx * 0.08} y={30}>
                <TiltCard className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-4 text-center hover:border-fuchsia-500/40 transition-colors">
                  <p
                    className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-fuchsia-400 to-violet-300 bg-clip-text text-transparent"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    <Counter value={s.value} duration={1.6} />
                  </p>
                  <p className="text-white text-xs font-semibold mt-1">{s.label}</p>
                  <p className="text-violet-300/60 text-[10px] mt-0.5">{s.sub}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Interactive 3D Orbit Canvas */}
        <Reveal delay={0.3} scale={0.92} className="lg:col-span-5 relative h-[360px] md:h-[440px] flex items-center justify-center">
          <Hero3D />
          <div className="absolute -bottom-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-2 flex items-center gap-3 shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-violet-200">
              Coimbatore, Tamil Nadu • <span className="text-fuchsia-300 font-mono font-semibold">poorani0307@gmail.com</span>
            </span>
          </div>
        </Reveal>
      </section>

      {/* Infinite Tool Marquee Strip */}
      <Marquee speed={32} />

      {/* About Section */}
      <section id="about" className="relative z-10 max-w-6xl mx-auto px-5 py-20">
        <SectionLabel
          eyebrow="Career Background"
          title="About Me & Education"
          subtitle="Analytical thinker passionate about building production-grade dashboards, predictive algorithms, and AI solutions."
        />

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Career Objective & Bio */}
          <Reveal className="lg:col-span-7" direction="left">
            <TiltCard className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md flex flex-col justify-between">
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
          </Reveal>

          {/* Academic Timeline & Details */}
          <div className="lg:col-span-5 space-y-4">
            <Reveal direction="right">
              <h3
                className="text-lg font-bold text-white mb-2 flex items-center gap-2"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                <GraduationCap className="text-fuchsia-400" size={20} /> Academic History
              </h3>
            </Reveal>

            {EDUCATION.map((edu, idx) => (
              <Reveal key={idx} delay={idx * 0.1} direction="right">
                <TiltCard
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
              </Reveal>
            ))}

            {/* Language & Communication Card */}
            <Reveal delay={0.35} direction="right">
              <TiltCard className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-2">
                  <LangIcon size={18} className="text-fuchsia-400" />
                  <h4 className="text-white font-semibold text-sm">Languages & Communication</h4>
                </div>
                <p className="text-violet-200/70 text-xs">
                  English (Fluent / Professional), Tamil (Native / Fluent), Hindi (Working proficiency)
                </p>
              </TiltCard>
            </Reveal>
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

        {/* Top Skill Bars with Shimmer Sweep */}
        <Reveal>
          <div className="grid md:grid-cols-2 gap-8 mb-16 rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8 backdrop-blur-md shadow-lg">
            {TOP_SKILLS.map((s) => (
              <SkillBar key={s.name} {...s} />
            ))}
          </div>
        </Reveal>

        {/* Categorized Technical Skills with Sine Wobble Chips */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Reveal key={cat.title} delay={idx * 0.08} y={30}>
                <TiltCard className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md hover:border-violet-500/40 transition-all flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-fuchsia-400">
                        <Icon size={18} />
                      </div>
                      <h4 className="text-white font-bold text-sm tracking-wide">{cat.title}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((item, itemIdx) => (
                        <span
                          key={item}
                          style={{ animationDelay: `${(idx + itemIdx) * 0.3}s` }}
                          className="animate-wobble text-xs px-3 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-200 font-medium hover:bg-violet-500/25 hover:text-white hover:scale-105 transition-all cursor-default"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Reversing Tool Marquee Strip */}
      <Marquee speed={28} reverse={true} />

      {/* LIVE ANALYTICS HUB SECTION */}
      <section id="dashboards" className="relative z-10 max-w-6xl mx-auto px-5 py-20">
        <SectionLabel
          eyebrow="Live Analytics Telemetry"
          title="Interactive Analytics Hub"
          subtitle="A production-grade dashboard experience showcasing quantitative telemetry, architecture foundations, and progression velocity."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1: Tool Proficiency */}
          <Reveal y={30} delay={0.05}>
            <TiltCard className="h-full rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6 backdrop-blur-xl shadow-2xl flex flex-col justify-between hover:border-fuchsia-500/50 transition-all">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-fuchsia-500/15 border border-fuchsia-500/30 text-fuchsia-400">
                      <BarChart3 size={18} />
                    </div>
                    <div>
                      <h4 className="text-white text-base font-bold">Analytics Tool Strength</h4>
                      <p className="text-violet-300/60 text-xs">Hands-on project accuracy</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/20 px-2 py-0.5 rounded-full">
                    Verified
                  </span>
                </div>

                <div className="mt-4">
                  <BarChartWidget data={TOOL_PROFICIENCY} />
                </div>
              </div>

              <p className="text-violet-300/60 text-[11px] mt-4 pt-3 border-t border-white/10 text-center">
                Benchmarked across data transformation, exploratory modeling & DAX queries.
              </p>
            </TiltCard>
          </Reveal>

          {/* Card 2: Core Architecture Stack */}
          <Reveal y={30} delay={0.15}>
            <TiltCard className="h-full rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6 backdrop-blur-xl shadow-2xl flex flex-col justify-between hover:border-violet-500/50 transition-all">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400">
                      <Boxes size={18} />
                    </div>
                    <div>
                      <h4 className="text-white text-base font-bold">Core Architecture Stack</h4>
                      <p className="text-violet-300/60 text-xs">Technologies powering pipelines</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2 py-0.5 rounded-full">
                    6 Pillars
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 mt-5">
                  {TECH_PILLARS.map(({ icon: Icon, label, sub, color, border, bg }) => (
                    <div
                      key={label}
                      className={`flex flex-col rounded-xl border ${border} ${bg} p-2.5 hover:scale-[1.03] transition-all cursor-pointer`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon size={16} className={color} />
                        <span className="text-xs font-bold text-white leading-tight">{label}</span>
                      </div>
                      <span className="text-[10px] text-violet-300/70 mt-1 leading-tight">{sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-violet-300/60 text-[11px] mt-4 pt-3 border-t border-white/10 text-center">
                End-to-end telemetry from raw ingestion to model deployment.
              </p>
            </TiltCard>
          </Reveal>

          {/* Card 3: Quantitative Impact */}
          <Reveal y={30} delay={0.25}>
            <TiltCard className="h-full rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6 backdrop-blur-xl shadow-2xl flex flex-col justify-between hover:border-cyan-500/50 transition-all">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
                      <Activity size={18} />
                    </div>
                    <div>
                      <h4 className="text-white text-base font-bold">Quantitative Impact</h4>
                      <p className="text-violet-300/60 text-xs">Key metrics achieved across workflows</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-2 py-0.5 rounded-full">
                    Metrics
                  </span>
                </div>

                <div className="space-y-3 mt-4">
                  {DASHBOARD_METRICS.map(({ icon: Icon, label, value, desc, color, tag }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-3 hover:border-violet-400/40 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${color} bg-opacity-20 text-white border border-white/10`}>
                          <Icon size={16} />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="text-white text-xs font-bold leading-tight">{label}</p>
                            <span className="text-[9px] font-mono bg-white/10 text-violet-200 px-1 rounded">
                              {tag}
                            </span>
                          </div>
                          <p className="text-violet-300/60 text-[10px] mt-0.5">{desc}</p>
                        </div>
                      </div>
                      <span
                        className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 to-violet-200 font-mono shrink-0 pl-2"
                        style={{ fontFamily: "Space Grotesk, sans-serif" }}
                      >
                        <Counter value={value} duration={1.8} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-violet-300/60 text-[11px] mt-4 pt-3 border-t border-white/10 text-center">
                Evaluated on rigorous cross-validation and client datasets.
              </p>
            </TiltCard>
          </Reveal>

          {/* Card 4: Cumulative Skill Velocity Area Chart */}
          <Reveal className="md:col-span-2" y={30} delay={0.1}>
            <TiltCard className="rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6 sm:p-7 backdrop-blur-xl shadow-2xl hover:border-fuchsia-500/40 transition-all">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-1">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20 border border-fuchsia-500/30 text-fuchsia-400">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <h4 className="text-white text-lg font-bold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                      Cumulative Internship Skill Velocity
                    </h4>
                    <p className="text-violet-300/60 text-xs">Hands-on impact scaling across 5 diverse internships</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-fuchsia-300 bg-fuchsia-500/15 border border-fuchsia-500/30 px-3 py-1 rounded-full shadow-sm">
                    5 Roles Completed
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full">
                    100% Industry Ready
                  </span>
                </div>
              </div>

              <LineChartWidget milestones={INTERNSHIP_MILESTONES} />
            </TiltCard>
          </Reveal>

          {/* Card 5: BI Deliverables & Reporting Suite */}
          <Reveal y={30} delay={0.2}>
            <TiltCard className="h-full rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6 backdrop-blur-xl shadow-2xl flex flex-col justify-between hover:border-amber-500/40 transition-all">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
                    <LayoutDashboard size={20} />
                  </div>
                  <div>
                    <h4 className="text-white text-base font-bold">BI Deliverables</h4>
                    <p className="text-violet-300/60 text-xs">Executive Decision Cockpits</p>
                  </div>
                </div>

                <p className="text-violet-200/80 text-xs leading-relaxed mt-3 mb-4">
                  Specialized in architecting executive dashboards with calculated DAX measures, automated ETL pipelines, drill-down filters, and dynamic storytelling visualizations.
                </p>

                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-200 flex items-center gap-1.5">
                      <span>📊</span> Power BI & DAX
                    </span>
                    <span className="text-[10px] text-amber-300/80 font-mono">Student & Fintech BI</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-200 flex items-center gap-1.5">
                      <span>📈</span> Tableau Desktop
                    </span>
                    <span className="text-[10px] text-blue-300/80 font-mono">Hexaind Exploratory</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-200 flex items-center gap-1.5">
                      <span>📑</span> Advanced Excel & VBA
                    </span>
                    <span className="text-[10px] text-emerald-300/80 font-mono">KPI & Financial Models</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-200 flex items-center gap-1.5">
                      <span>⚡</span> Plotly & Streamlit
                    </span>
                    <span className="text-[10px] text-purple-300/80 font-mono">Mutual Fund Analytics</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-violet-300">
                <span>Ready to ingest enterprise datasets</span>
                <span className="text-fuchsia-400 font-bold">100% Live</span>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </section>

      {/* Internship Experience with Scroll-Drawn Timeline */}
      <section id="experience" className="relative z-10 max-w-6xl mx-auto px-5 py-20">
        <SectionLabel
          eyebrow="Work History"
          title="Internship Experience"
          subtitle="Real-world contributions across Fintech, Artificial Intelligence, Full-Stack engineering, and Data Analytics."
        />

        <div className="relative pl-6 md:pl-10 space-y-12">
          {/* Scroll-Drawn Vertical Timeline Line */}
          <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-white/10 overflow-hidden">
            <motion.div
              className="w-full h-full bg-gradient-to-b from-fuchsia-500 via-violet-500 to-indigo-500 origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>

          {EXPERIENCE.map((exp, i) => (
            <div key={i} className="relative group">
              {/* Timeline Marker Dot with Spring Pop */}
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: "spring", stiffness: 400, damping: 20, delay: i * 0.1 }}
                className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#07040f] border-2 border-fuchsia-400 shadow-md shadow-fuchsia-500/40 group-hover:scale-125 transition-transform"
              />

              {/* Card Sliding from Alternating Sides */}
              <Reveal direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.1}>
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
              </Reveal>
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

        {/* 7 Featured Projects with Desktop Pin-and-Scroll & Mobile Responsive Grid */}
        <FeaturedProjectsHorizontal />

        {/* Additional Projects Section */}
        <div className="mt-16">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <FolderGit2 className="text-fuchsia-400" size={20} />
              <h3
                className="text-xl font-bold text-white tracking-wide"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Additional Projects & Systems
              </h3>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ADDITIONAL_PROJECTS.map((p, idx) => (
              <Reveal key={p.title} delay={idx * 0.08} y={30}>
                <TiltCard className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md flex flex-col justify-between hover:border-violet-500/30">
                  <div>
                    <h4 className="text-white text-sm font-bold mb-1.5">{p.title}</h4>
                    <p className="text-violet-200/70 text-xs leading-relaxed mb-3">{p.desc}</p>
                  </div>
                  <p className="text-fuchsia-400/90 text-[11px] font-mono font-medium">{p.tech}</p>
                </TiltCard>
              </Reveal>
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
              <Reveal key={idx} delay={idx * 0.1} y={30}>
                <TiltCard className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md hover:border-fuchsia-500/40 transition-all flex flex-col justify-between">
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
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="relative z-10 max-w-6xl mx-auto px-5 py-20">
        <SectionLabel
          eyebrow="Verified Credentials"
          title="Professional Certifications"
          subtitle="Credentials from Deloitte, IBM, NPTEL, Infosys, GUVI, UiPath, and Monday.com confirming expertise across analytics, AI, programming, and cybersecurity."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert, idx) => {
            const Icon = cert.icon;
            return (
              <Reveal key={cert.category} delay={idx * 0.08} y={35}>
                <TiltCard className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md hover:border-violet-500/40 transition-all flex flex-col justify-between">
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
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Contact & Connect Section */}
      <section id="contact" className="relative z-10 max-w-6xl mx-auto px-5 py-20">
        <Reveal y={40}>
          <TiltCard className="rounded-3xl border border-white/15 bg-gradient-to-br from-violet-900/30 via-fuchsia-900/20 to-indigo-950/40 p-8 md:p-14 text-center backdrop-blur-2xl shadow-2xl relative overflow-hidden">
            {/* Subtle animated light highlight */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-300 text-xs font-semibold mb-6">
              <Sparkles size={12} /> Open For Immediate Opportunities
            </div>

            <h2
              className="text-3xl md:text-5xl font-extrabold text-white max-w-2xl mx-auto leading-tight"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Let's Build Impactful,{" "}
              <span className="bg-gradient-to-r from-fuchsia-400 via-pink-300 to-violet-300 bg-clip-text text-transparent animate-gradient-text">
                Data-Driven Systems
              </span>
            </h2>

            <p className="text-violet-200/80 mt-4 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
              Interested in discussing data analytics, business intelligence dashboards, or machine learning engineering?
              Feel free to reach out directly.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3.5">
              <Magnetic strength={0.3}>
                <a
                  href="mailto:poorani0307@gmail.com"
                  className="flex items-center gap-2.5 border border-white/15 bg-white/5 backdrop-blur-md px-5 py-3 rounded-full text-xs sm:text-sm font-medium hover:bg-white/10 hover:border-fuchsia-400 transition-all"
                >
                  <Mail size={15} className="text-fuchsia-400" /> poorani0307@gmail.com
                </a>
              </Magnetic>
              <Magnetic strength={0.3}>
                <a
                  href="tel:6380045604"
                  className="flex items-center gap-2.5 border border-white/15 bg-white/5 backdrop-blur-md px-5 py-3 rounded-full text-xs sm:text-sm font-medium hover:bg-white/10 hover:border-fuchsia-400 transition-all"
                >
                  <Phone size={15} className="text-fuchsia-400" /> +91 6380045604
                </a>
              </Magnetic>
              <div className="flex items-center gap-2.5 border border-white/10 bg-white/[0.02] px-5 py-3 rounded-full text-xs text-violet-300/80">
                <MapPin size={15} className="text-fuchsia-400 shrink-0" /> No 3, Kamarajar street, Saibaba Colony, Coimbatore
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-4">
              <Magnetic strength={0.4}>
                <a
                  href="https://linkedin.com/in/poorani-s-046357340"
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 rounded-full border border-white/15 bg-white/5 flex items-center justify-center hover:bg-white/15 hover:text-fuchsia-400 transition-all inline-flex"
                  title="LinkedIn Profile"
                >
                  <Linkedin size={18} />
                </a>
              </Magnetic>
              <Magnetic strength={0.4}>
                <a
                  href="https://github.com/Poorani-S"
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 rounded-full border border-white/15 bg-white/5 flex items-center justify-center hover:bg-white/15 hover:text-fuchsia-400 transition-all inline-flex"
                  title="GitHub Profile"
                >
                  <Github size={18} />
                </a>
              </Magnetic>
            </div>

            <div className="mt-8">
              <Magnetic strength={0.35}>
                <a
                  href="/resume.pdf"
                  download="Poorani_S_Resume.pdf"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-500 via-violet-600 to-indigo-600 px-7 py-3.5 rounded-full text-sm font-bold shadow-xl shadow-purple-500/30 hover:scale-105 transition-all"
                >
                  <Download size={16} /> Download Official Resume (PDF)
                </a>
              </Magnetic>
            </div>
          </TiltCard>
        </Reveal>
      </section>

      {/* Footer */}
      <Reveal y={20}>
        <footer className="relative z-10 max-w-6xl mx-auto px-5 py-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-violet-300/50">
          <p>&copy; {new Date().getFullYear()} Poorani S — Data Analyst Portfolio</p>
          <p className="flex items-center gap-2">
            <span>Designed & Developed with React & Three.js</span>
            <span>•</span>
            <span className="text-violet-400">Coimbatore, India</span>
          </p>
        </footer>
      </Reveal>
    </div>
  );
}
