import React, { useState, useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import {
  Github, Linkedin, Mail, Phone, Download, ExternalLink, Menu, X,
  GraduationCap, Award, Languages as LangIcon, ArrowRight, Sparkles,
} from "lucide-react";

const NAV = ["about", "skills", "why-me", "experience", "projects", "certifications", "contact"];

const STATS = [
  { value: "6+", label: "Internships" },
  { value: "9+", label: "Projects" },
  { value: "9.0", label: "CGPA" },
];

const TOP_SKILLS = [
  { name: "Python", pct: 92 },
  { name: "SQL", pct: 90 },
  { name: "AI Analytics", pct: 85 },
  { name: "Power BI", pct: 88 },
  { name: "Advanced Excel", pct: 90 },
  { name: "Tableau", pct: 85 },
  { name: "Business Intelligence", pct: 80 },
  { name: "Machine Learning", pct: 80 },
  { name: "Flask", pct: 78 },
  { name: "JavaScript", pct: 85 },
];

const SKILLS = [
  { group: "Programming", items: ["Python", "SQL", "JavaScript", "Java"] },
  { group: "Data Analytics", items: ["Data Cleaning", "EDA", "Statistical Analysis", "Business Analytics", "KPI Reporting", "Predictive Analytics"] },
  { group: "BI & Visualization", items: ["Power BI", "Business Intelligence", "Tableau", "Excel", "DAX", "Data Storytelling", "Dashboard Design"] },
  { group: "Machine Learning", items: ["Scikit-Learn", "Classification", "Regression", "Random Forest", "Feature Engineering", "Model Evaluation"] },
  { group: "Databases", items: ["MySQL", "MongoDB"] },
  { group: "Web Development", items: ["Flask", "HTML", "CSS", "React", "Node.js", "Express.js"] },
  { group: "Tools", items: ["Git", "GitHub", "VS Code", "Jupyter Notebook","Antigravity"] },
];

const EXPERIENCE = [
  { role: "Data Analyst Intern", company: "Bluestock Fintech", dates: "01/2026 - Present",
    bullets: ["Delivered business insights through financial and operational data analysis, KPI reporting, and interactive dashboards.",
      "Enhanced data quality and decision-making using data transformation, validation, and business intelligence practices."] },
  { role: "Machine Learning Intern", company: "Adroit Technologies (IBM Career Education)", dates: "05/2026",
    bullets: ["Built and deployed an AI-powered Equipment Failure Prediction System using Machine Learning and Flask.",
      "Applied end-to-end ML workflows and predictive analytics to forecast equipment failures and support proactive maintenance."] },
  { role: "AI and Full Stack Developer Intern", company: "Kambaa Incorporation", dates: "12/2025 - 04/2026",
    bullets: ["Developed role-based enterprise applications, including a Petty Cash Management System.",
      "Implemented AI-driven features for a Notes Maker platform, including transcription, summarization, and authentication.",
      "Designed Knowledge Base and AI Chatbot solutions with role-based access control."] },
  { role: "Data Analyst Intern", company: "NoviTech R&D Pvt. Ltd.", dates: "09/2025 -  10/2025",
    bullets: ["Cleaned and transformed raw business data using SQL and Excel.",
      "Created insightful Power BI dashboards for business reporting.",
      "Delivered actionable insights through structured data analysis."] },
  { role: "Power BI Intern", company: "NoviTech R&D Pvt. Ltd.", dates: "09/2025",
    bullets: ["Built interactive dashboards using Power BI and DAX.", "Performed data modeling and visualization.",
      "Converted business requirements into impactful reports."] },
  { role: "Data Science and Analytics Intern", company: "Innovate Intern (Hexaind)", dates: "05/2025 - 07/2025",
    bullets: ["Applied Python, SQL, Tableau, and Machine Learning on real-world datasets.",
      "Built predictive models and analytical reports.", "Conducted exploratory data analysis and BI reporting."] },
];

const FEATURED_PROJECTS = [
  { title: "AnalystOS", tagline: "Personal placement-preparation productivity platform",
    description: "A centralized platform to organize and monitor every stage of my career journey - consolidating learning progress, coding practice, projects, certifications, internship tracking, resume versions, and interview prep into one dashboard.",
    impact: "Replaced scattered spreadsheets with one structured system, improving consistency across skills, projects, and interview readiness.",
    tech: ["Python", "Flask", "Pandas", "SQL", "Bootstrap", "Chart.js"],
    demo: "https://analystos-la7y.onrender.com", repo: "https://github.com/Poorani-S/AnalystOs" },
  { title: "Mutual Fund Analytics Dashboard", tagline: "Investment analysis and fund comparison platform",
    description: "A mutual fund analytics platform helping investors evaluate opportunities using data-driven insights - historical performance, risk metrics, returns, and portfolio statistics through interactive dashboards.",
    impact: "Converted complex financial datasets into clear visual insights, making investment analysis more accessible.",
    tech: ["Python", "Flask", "Pandas", "NumPy", "Plotly", "SQL"],
    demo: "https://mutual-fund-analytics.onrender.com", repo: "https://github.com/Poorani-S/Capstone-Project-I---Mutual-Fund-Analytics" },
  { title: "AI Equipment Failure Prediction", tagline: "ML-powered predictive maintenance application",
    description: "Forecasts industrial equipment failures using Machine Learning - analyzing temperature, vibration, pressure, humidity, and runtime hours to predict potential failures before they occur.",
    impact: "Reduced reliance on reactive maintenance by providing data-driven, proactive predictions.",
    tech: ["Python", "Flask", "Scikit-Learn", "Random Forest", "MongoDB"],
    demo: "https://ai-equipment-failure-prediction-system.onrender.com/home", repo: null },
  { title: "Petty Cash Management System", tagline: "Role-based enterprise financial management system",
    description: "Streamlines expense tracking, cash flow monitoring, and transaction management through secure authentication and administrative controls.",
    impact: "Digitized petty cash tracking and improved transparency through role-based access.",
    tech: ["React", "Node.js", "Express.js", "MySQL"],
    demo: null, repo: null },
  { title: "Earthquake Alert System", tagline: "IoT-based seismic monitoring and alerting",
    description: "Integrates vibration sensors, embedded systems, and cloud communication to detect seismic activity and trigger real-time alerts.",
    impact: "Demonstrated hardware and software integration for real-time environmental monitoring.",
    tech: ["IoT", "Embedded Systems", "Sensors", "Cloud"],
    demo: null, repo: null },
  { title: "Pizza Bot", tagline: "Conversational AI ordering assistant",
    description: "An AI-powered chatbot that processes pizza orders, customizing toppings and sizes through natural language understanding.",
    impact: "Streamlined the ordering process with an interactive and user-friendly automated assistant.",
    tech: ["Python", "Chatbot", "DialogFlow"],
    demo: null, repo: null },
];

const OTHER_PROJECTS = [
  { title: "Knowledge Base Portal", tech: "React, Node.js, Express.js, MongoDB", desc: "Centralizes organizational knowledge with search, content management, and dynamic updates." },
  { title: "Canteen Management System", tech: "Node.js, MySQL, JavaScript", desc: "Full-stack ordering system with authentication and real-time order tracking." },
  { title: "Internship Tracker Dashboard", tech: "BI and Analytics", desc: "Tracks applications, interviews, offers, and hiring metrics with analytical reporting." },
  { title: "Travel Website", tech: "REST APIs, Responsive UI", desc: "Tourism platform for destination discovery and travel planning." },
];

const WHY_HIRE_ME = [
  { text: "Proficient in SQL, Python & Power BI" },
  { text: "5+ Industry Internships" },
  { text: "End-to-End ML Pipeline Experience" },
  { text: "Dashboard & BI Development" },
  { text: "Business Analytics & KPI Reporting" },
  { text: "Tableau & Advanced Excel" },
  { text: "Flask & REST API Development" },
  { text: "MongoDB & MySQL Expertise" },
  { text: "5+ Real-World Projects Shipped" },
  { text: "Fast Learner & Problem Solver" },
];

const CERTS_DETAILED = [
  { issuer: "IBM", issuerColor: "#a855f7", title: "Data Analysis with Python", category: "Data Analytics" },
  { issuer: "IBM", issuerColor: "#a855f7", title: "Data Visualization", category: "Data Analytics" },
  { issuer: "IBM", issuerColor: "#a855f7", title: "Python for Data Science", category: "Data Analytics" },
  { issuer: "IBM", issuerColor: "#a855f7", title: "Business Intelligence", category: "BI" },
  { issuer: "IBM", issuerColor: "#a855f7", title: "CyberSecurity Fundamentals", category: "Security" },
  { issuer: "NOVITECH", issuerColor: "#f97316", title: "SQL Certification", category: "Database" },
  { issuer: "UIPATH", issuerColor: "#f97316", title: "Automation Developer Associate", category: "Automation" },
  { issuer: "GUVI", issuerColor: "#22c55e", title: "Generative AI", category: "AI" },
  { issuer: "GUVI", issuerColor: "#22c55e", title: "Python Programming", category: "Programming" },
  { issuer: "INFOSYS", issuerColor: "#3b82f6", title: "C Programming 101", category: "Programming" },
  { issuer: "INFOSYS", issuerColor: "#3b82f6", title: "Computer Fundamentals", category: "Fundamentals" },
  { issuer: "DELOITTE", issuerColor: "#8bc34a", title: "Data Analytics Job Simulation", category: "Data Analytics" },
  { issuer: "DELOITTE", issuerColor: "#8bc34a", title: "Cyber Job Simulation", category: "Security" },
];

function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w, h, particles, raf;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const count = Math.min(70, Math.floor((w * h) / 18000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    }

    function tick() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
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
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

function Hero3D() {
  const mountRef = useRef(null);
  useEffect(() => {
    const mount = mountRef.current;
    const width = mount.clientWidth, height = mount.clientHeight;
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

    let mouseX = 0, mouseY = 0;
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
      const w2 = mount.clientWidth, h2 = mount.clientHeight;
      camera.aspect = w2 / h2;
      camera.updateProjectionMatrix();
      renderer.setSize(w2, h2);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      mount.removeChild(renderer.domElement);
      icoGeo.dispose(); icoMat.dispose(); innerGeo.dispose(); innerMat.dispose();
      starGeo.dispose(); starMat.dispose(); renderer.dispose();
    };
  }, []);
  return <div ref={mountRef} className="w-full h-full" />;
}

function TiltCard({ children, className }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  function handleMove(e) {
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(6px)`,
      "--glow-x": `${(x + 0.5) * 100}%`,
      "--glow-y": `${(y + 0.5) * 100}%`,
    });
  }
  function handleLeave() {
    setStyle({ transform: "perspective(700px) rotateY(0deg) rotateX(0deg) translateZ(0px)" });
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ ...style, transition: "transform 0.15s ease-out" }}
      className={className}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: `radial-gradient(200px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(168,85,247,0.18), transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}

function SkillBar({ name, pct }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setWidth(pct); obs.disconnect(); }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct]);
  return (
    <div ref={ref}>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-violet-100 font-medium">{name}</span>
        <span className="text-violet-400 font-mono text-xs">{pct}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500 transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

function SectionLabel({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-10 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium mb-4">
        <Sparkles size={12} /> {eyebrow}
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
        {title}
      </h2>
      {subtitle && <p className="text-violet-200/50 text-sm mt-3 max-w-xl mx-auto">{subtitle}</p>}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <circle cx="12" cy="12" r="11" stroke="#a855f7" strokeWidth="1.5" />
      <path d="M7 12.5l3.5 3.5 6.5-7" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WhyHireMe() {
  return (
    <section id="why-me" className="relative z-10 max-w-6xl mx-auto px-5 py-20">
      <SectionLabel
        eyebrow="Why Hire Me"
        title="What I bring to your data team — beyond the resume."
      />
      <div className="grid sm:grid-cols-2 gap-3">
        {WHY_HIRE_ME.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 hover:border-violet-500/40 hover:bg-violet-500/5 transition-all duration-200 group"
          >
            <CheckIcon />
            <span className="text-violet-100/80 text-sm font-medium group-hover:text-white transition-colors">{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CertificationsSection() {
  return (
    <section id="certifications" className="relative z-10 max-w-6xl mx-auto px-5 py-20">
      <SectionLabel
        eyebrow="Certifications"
        title="10+ Verified Credentials"
        subtitle="Continuously learning across data science, Business Analysis,Data Analysis, AI, and engineering domains."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CERTS_DETAILED.map((cert, i) => (
          <div
            key={i}
            className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-200 overflow-hidden group"
          >
            {/* Colored top accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px] opacity-80"
              style={{ background: `linear-gradient(90deg, ${cert.issuerColor}, transparent)` }}
            />
            <div className="flex items-start justify-between gap-2">
              <div>
                <p
                  className="text-[10px] font-bold tracking-widest uppercase mb-1"
                  style={{ color: cert.issuerColor }}
                >
                  {cert.issuer}
                </p>
                <p className="text-white text-sm font-semibold leading-snug">{cert.title}</p>
                <p className="text-violet-300/50 text-[11px] mt-1.5">{cert.category}</p>
              </div>
              <span className="shrink-0 flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 whitespace-nowrap">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="11" stroke="#22c55e" strokeWidth="2" />
                  <path d="M7 12.5l3.5 3.5 6.5-7" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
const ROLES = [
  "Data Analyst",
  "Business Analyst",
  "Power BI Developer",
  "Python Developer",
  "Data Visualization Expert",
  "AI Applications Developer",
  "ML Engineer",
  "Dashboard Designer",
];

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
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative min-h-screen bg-[#07040f] text-white overflow-x-hidden" style={{ fontFamily: "Inter, ui-sans-serif, system-ui" }}>
      <div className="fixed inset-0 z-0">
        <ParticleField />
        <div className="absolute inset-0" style={{ background: "radial-gradient(60% 40% at 50% 0%, rgba(124,58,237,0.25), transparent 60%)" }} />
      </div>

      <header className={`sticky top-0 z-50 transition-colors ${scrolled ? "bg-[#07040f]/80 backdrop-blur-md border-b border-white/10" : ""}`}>
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-fuchsia-500 to-violet-600 flex items-center justify-center text-xs">PS</span>
            Poorani
          </div>
          <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-1.5 py-1.5">
            {NAV.map((n) => (
              <button key={n} onClick={() => scrollTo(n)} className="capitalize text-sm text-violet-100/80 hover:text-white px-4 py-1.5 rounded-full hover:bg-white/10 transition-colors">
                {n}
              </button>
            ))}
          </nav>
          <a href="#contact" className="hidden md:flex items-center gap-2 bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity">
            Let's Connect <ArrowRight size={14} />
          </a>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#07040f] border-t border-white/10 px-5 py-4 flex flex-col gap-3">
            {NAV.map((n) => (
              <button key={n} onClick={() => scrollTo(n)} className="capitalize text-left text-violet-100/80">{n}</button>
            ))}
          </div>
        )}
      </header>

      <section className="relative z-10 max-w-6xl mx-auto px-5 pt-16 pb-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium mb-6">
            <Sparkles size={12} /> Open to Data Analyst roles
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Turning Data Into <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">Business Decisions</span>
          </h1>

          {/* Roles marquee ticker */}
          <div className="mt-5 overflow-hidden relative" style={{ maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)" }}>
            <div className="animate-marquee">
              {[...ROLES, ...ROLES].map((role, i) => (
                <span key={i} className="inline-flex items-center gap-3 shrink-0 px-1">
                  <span className="text-sm font-medium text-violet-300/70 whitespace-nowrap hover:text-fuchsia-300 transition-colors cursor-default">
                    {role}
                  </span>
                  <span className="text-violet-600/50 text-xs">✦</span>
                </span>
              ))}
            </div>
          </div>

          <p className="mt-6 text-violet-200/70 text-base md:text-lg max-w-lg leading-relaxed">
            I'm Poorani S, a Data & Business Analyst and Machine Learning Developer enthusiast building dashboards, predictive
            models, and AI-powered applications that turn raw data into real impact.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => scrollTo("projects")} className="flex items-center gap-2 bg-gradient-to-r from-fuchsia-500 to-violet-600 px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
              View Projects <ArrowRight size={15} />
            </button>
            <a href="/resume.pdf" download className="flex items-center gap-2 border border-white/15 px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/5 transition-colors">
              <Download size={15} /> Resume
            </a>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-md">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center">
                <p className="text-2xl font-bold bg-gradient-to-r from-fuchsia-400 to-violet-400 bg-clip-text text-transparent" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{s.value}</p>
                <p className="text-violet-300/60 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative h-[340px] md:h-[420px]">
          <Hero3D />
        </div>
      </section>

      <section id="about" className="relative z-10 max-w-6xl mx-auto px-5 py-20">
        <SectionLabel eyebrow="About Me" title="The person behind the dashboards" />
        <div className="grid md:grid-cols-3 gap-6">
          <TiltCard className="relative md:col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <div className="space-y-4 text-violet-100/80 text-[15px] leading-relaxed">
              <p>I'm Poorani S, a passionate Data Analyst with hands-on experience in data analytics, business intelligence, predictive modeling, and dashboard development.</p>
              <p>I enjoy transforming raw datasets into meaningful insights that help businesses make smarter decisions. My expertise spans Python, SQL, Power BI, Tableau, Excel, Machine Learning, and Flask, enabling me to build end-to-end analytics solutions.</p>
              <p>Through multiple internships across Data Analytics, Business Analysis & Intelligence, Machine Learning, and AI Development, I've worked on real-world projects involving financial analytics, predictive maintenance, and interactive reporting.</p>
            </div>
          </TiltCard>
          <div className="space-y-4">
            <TiltCard className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-start gap-3">
                <GraduationCap size={18} className="text-fuchsia-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-white text-sm font-semibold">CS with Data Analytics</p>
                  <p className="text-violet-300/60 text-xs mt-1">Sri Ramakrishna College of Arts and Science for Women</p>
                  <p className="text-violet-400 text-xs mt-1">2024–2027 • CGPA 9.0</p>
                </div>
              </div>
            </TiltCard>
            <TiltCard className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-start gap-3">
                <LangIcon size={18} className="text-fuchsia-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-white text-sm font-semibold">Languages</p>
                  <p className="text-violet-300/60 text-xs mt-1">English, Tamil, Hindi, Telugu</p>
                </div>
              </div>
            </TiltCard>
            <TiltCard className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-start gap-3">
                <Award size={18} className="text-fuchsia-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-white text-sm font-semibold">Soft Skills</p>
                  <p className="text-violet-300/60 text-xs mt-1">Analytical thinking, communication, teamwork</p>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      <section id="skills" className="relative z-10 max-w-6xl mx-auto px-5 py-20">
        <SectionLabel eyebrow="Skills" title="Tools I reach for daily" />
        <div className="grid md:grid-cols-2 gap-10 mb-14">
          {TOP_SKILLS.map((s) => <SkillBar key={s.name} {...s} />)}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILLS.map((s) => (
            <TiltCard key={s.group} className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-fuchsia-400 text-xs font-semibold mb-3">{s.group}</p>
              <div className="flex flex-wrap gap-2">
                {s.items.map((it) => (
                  <span key={it} className="text-xs px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-200">{it}</span>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      <WhyHireMe />

      <section id="experience" className="relative z-10 max-w-6xl mx-auto px-5 py-20">
        <SectionLabel eyebrow="Experience" title="Where I've built things" />
        <div className="relative pl-6 md:pl-8 border-l border-violet-500/20 space-y-10">
          {EXPERIENCE.map((e, i) => (
            <div key={i} className="relative">
              <span className="absolute -left-[31px] md:-left-[39px] top-1 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-600" />
              <p className="text-violet-400 text-xs font-mono mb-1">{e.dates}</p>
              <p className="text-white font-semibold text-lg">{e.role}</p>
              <p className="text-violet-300 text-sm mb-3">{e.company}</p>
              <ul className="space-y-1.5">
                {e.bullets.map((b, bi) => (
                  <li key={bi} className="text-violet-100/70 text-sm leading-relaxed flex gap-2">
                    <span className="text-fuchsia-400 shrink-0">•</span>{b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="relative z-10 max-w-6xl mx-auto px-5 py-20">
        <SectionLabel eyebrow="Projects" title="Things I've shipped" />
        <div className="grid md:grid-cols-2 gap-6">
          {FEATURED_PROJECTS.map((p) => (
            <TiltCard key={p.title} className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 flex flex-col">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-white font-bold text-lg" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{p.title}</h3>
                <div className="flex gap-3 shrink-0">
                  {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className="text-violet-300 hover:text-fuchsia-400"><ExternalLink size={16} /></a>}
                  {p.repo && <a href={p.repo} target="_blank" rel="noreferrer" className="text-violet-300 hover:text-fuchsia-400"><Github size={16} /></a>}
                </div>
              </div>
              <p className="text-fuchsia-400 text-xs font-medium mt-1">{p.tagline}</p>
              <p className="text-violet-100/70 text-sm leading-relaxed mt-3">{p.description}</p>
              <p className="text-violet-300/80 text-sm mt-3 italic border-l-2 border-violet-500/40 pl-3">{p.impact}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-200">{t}</span>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>

        <p className="text-violet-300/50 text-xs font-semibold mt-14 mb-5 uppercase tracking-wide">More Projects</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {OTHER_PROJECTS.map((p) => (
            <div key={p.title} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <p className="text-white text-sm font-semibold">{p.title}</p>
              <p className="text-violet-300/60 text-xs mt-1">{p.desc}</p>
              <p className="text-violet-400 text-[11px] mt-2">{p.tech}</p>
            </div>
          ))}
        </div>

      </section>

      <CertificationsSection />

      <section id="contact" className="relative z-10 max-w-6xl mx-auto px-5 py-20">
        <TiltCard className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5 p-8 md:p-14 text-center">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Let's build something data-driven</h2>
          <p className="text-violet-200/70 mt-4 max-w-lg mx-auto">Open to Data Analyst, Business Analyst and Machine Learning roles.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="mailto:poorani0307@gmail.com" className="flex items-center gap-2 border border-white/15 px-5 py-3 rounded-full text-sm hover:bg-white/5 transition-colors"><Mail size={15} /> poorani0307@gmail.com</a>
            <a href="tel:6380045604" className="flex items-center gap-2 border border-white/15 px-5 py-3 rounded-full text-sm hover:bg-white/5 transition-colors"><Phone size={15} /> 6380045604</a>
          </div>
          <div className="mt-6 flex justify-center gap-4">
            <a href="https://www.linkedin.com/in/poorani-s-046357340" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center hover:bg-white/10 transition-colors"><Linkedin size={17} /></a>
            <a href="https://github.com/Poorani-S" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center hover:bg-white/10 transition-colors"><Github size={17} /></a>
          </div>
          <a href="/resume.pdf" download className="mt-8 inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-500 to-violet-600 px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
            <Download size={15} /> Download Resume
          </a>
        </TiltCard>
      </section>

      <footer className="relative z-10 max-w-6xl mx-auto px-5 py-8 border-t border-white/10 text-center text-violet-400/50 text-xs">
        &copy; 2026 Poorani S | Data Analyst Portfolio
      </footer>
    </div>
  );
}
