import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Code2, Database, BarChart3, LineChart, FileSpreadsheet,
  Zap, Layers, Cpu, Terminal
} from "lucide-react";

const TOOLS = [
  { name: "Python", icon: Terminal },
  { name: "SQL (MySQL)", icon: Database },
  { name: "Power BI", icon: BarChart3 },
  { name: "Tableau", icon: LineChart },
  { name: "Excel & VBA", icon: FileSpreadsheet },
  { name: "FastAPI / Flask", icon: Zap },
  { name: "React.js", icon: Code2 },
  { name: "MongoDB", icon: Layers },
  { name: "TensorFlow & ML", icon: Cpu },
];

export default function Marquee({ reverse = false, speed = 28, className = "" }) {
  const shouldReduceMotion = useReducedMotion();

  // Triple items for seamless loop
  const items = [...TOOLS, ...TOOLS, ...TOOLS];

  return (
    <div className={`relative w-full overflow-hidden py-4 border-y border-white/5 bg-[#0a0614]/60 backdrop-blur-md ${className}`}>
      {/* Edge Soft Shadows */}
      <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#07040f] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#07040f] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex items-center gap-4 whitespace-nowrap will-change-transform"
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
        {items.map((tool, idx) => {
          const Icon = tool.icon;
          return (
            <div
              key={`${tool.name}-${idx}`}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.025] hover:border-violet-500/40 hover:bg-violet-500/10 text-zinc-300 hover:text-white transition-all duration-200 cursor-default shadow-sm"
            >
              <Icon size={14} className="text-violet-400" />
              <span className="text-xs font-medium tracking-wide text-zinc-200">{tool.name}</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
