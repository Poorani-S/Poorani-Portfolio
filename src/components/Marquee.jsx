import React, { useRef, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import {
  Code2, Database, BarChart3, FileSpreadsheet, Layers, Cpu,
  Sparkles, Bot, Zap, Terminal, LineChart
} from "lucide-react";

const TOOLS = [
  { name: "Python", icon: "🐍", color: "from-violet-500/20 to-indigo-500/20 text-violet-300 border-violet-500/30" },
  { name: "SQL (MySQL)", icon: "🗄️", color: "from-fuchsia-500/20 to-pink-500/20 text-fuchsia-300 border-fuchsia-500/30" },
  { name: "Power BI", icon: "📊", color: "from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/30" },
  { name: "Tableau", icon: "📈", color: "from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/30" },
  { name: "Excel & VBA", icon: "📑", color: "from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/30" },
  { name: "FastAPI / Flask", icon: "⚡", color: "from-purple-500/20 to-violet-500/20 text-purple-300 border-purple-500/30" },
  { name: "React.js", icon: "⚛️", color: "from-sky-500/20 to-blue-500/20 text-sky-300 border-sky-500/30" },
  { name: "MongoDB", icon: "🍃", color: "from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30" },
  { name: "TensorFlow & ML", icon: "🧠", color: "from-rose-500/20 to-pink-500/20 text-rose-300 border-rose-500/30" },
];

export default function Marquee({ reverse = false, speed = 25, className = "" }) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const scrollVelocity = useSpring(scrollY, { damping: 50, stiffness: 400 });

  // Triple the items to ensure seamless infinite looping
  const items = [...TOOLS, ...TOOLS, ...TOOLS];

  return (
    <div className={`relative w-full overflow-hidden py-6 border-y border-white/5 bg-gradient-to-r from-violet-950/20 via-black/40 to-fuchsia-950/20 backdrop-blur-sm ${className}`}>
      {/* Edge Gradient Shadows */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#07040f] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#07040f] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex items-center gap-6 whitespace-nowrap will-change-transform"
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
              }
        }
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: speed,
          ease: "linear",
        }}
      >
        {items.map((tool, idx) => (
          <div
            key={`${tool.name}-${idx}`}
            className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border bg-gradient-to-r ${tool.color} backdrop-blur-md hover:scale-105 transition-transform cursor-pointer shadow-sm`}
          >
            <span className="text-sm">{tool.icon}</span>
            <span className="text-xs font-semibold tracking-wide font-mono">{tool.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
