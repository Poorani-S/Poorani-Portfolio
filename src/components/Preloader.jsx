import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Check if user already saw the preloader in this session
    const hasSeen = sessionStorage.getItem("poorani_portfolio_preloader");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (hasSeen || prefersReducedMotion) {
      if (onComplete) onComplete();
      return;
    }

    const duration = 1800; // ~1.8 seconds
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = Math.min(100, Math.round((currentStep / steps) * 100));
      setPercent(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          sessionStorage.setItem("poorani_portfolio_preloader", "true");
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 800);
        }, 200);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  // If already completed or seen, do not render
  if (sessionStorage.getItem("poorani_portfolio_preloader") && isDone) {
    return null;
  }

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Top Curtain */}
          <motion.div
            initial={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#07040f] border-b border-fuchsia-500/20"
          />

          {/* Bottom Curtain */}
          <motion.div
            initial={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#07040f] border-t border-violet-500/20"
          />

          {/* Center Content */}
          <motion.div
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* SVG Logo "PS" with stroke draw animation */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-6 flex items-center justify-center">
              {/* Subtle Glowing Backdrop */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-fuchsia-600/30 to-violet-600/30 blur-xl animate-pulse" />

              <svg
                viewBox="0 0 120 120"
                className="w-full h-full drop-shadow-[0_0_25px_rgba(217,70,239,0.5)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="psGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e879f9" />
                    <stop offset="50%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>

                {/* Outer Rounded Box Stroke */}
                <motion.rect
                  x="8"
                  y="8"
                  width="104"
                  height="104"
                  rx="24"
                  stroke="url(#psGradient)"
                  strokeWidth="3.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                />

                {/* Letter P */}
                <motion.path
                  d="M36 84 V36 H52 C61 36 67 41 67 48 C67 56 61 61 52 61 H36"
                  stroke="url(#psGradient)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
                />

                {/* Letter S */}
                <motion.path
                  d="M86 42 C82 37 74 36 68 39 C62 42 61 48 65 52 L73 57 C78 61 80 66 77 72 C74 78 65 80 58 76 C52 72 50 67 50 64"
                  stroke="url(#psGradient)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut", delay: 0.4 }}
                />
              </svg>
            </div>

            {/* Percentage & Loading Bar */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <span
                  className="text-2xl sm:text-3xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-violet-300 to-indigo-300"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {percent}%
                </span>
              </div>

              {/* Progress Track */}
              <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 rounded-full shadow-[0_0_12px_rgba(217,70,239,0.8)]"
                  style={{ width: `${percent}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>

              <span className="text-[11px] font-mono tracking-widest text-violet-300/70 uppercase mt-1">
                Initializing Telemetry...
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
