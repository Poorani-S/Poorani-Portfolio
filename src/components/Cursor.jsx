import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function Cursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Detect touch device or pointer coarse
    const checkTouch = () => {
      const isTouch =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches;
      setIsTouchDevice(isTouch);
    };

    checkTouch();
    window.addEventListener("resize", checkTouch);

    const onMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const handlePointerOver = (e) => {
      const target = e.target;
      const isInteractive =
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".cursor-pointer") ||
        target.closest("[role='button']") ||
        target.closest("input") ||
        target.closest("textarea");

      setIsHovered(Boolean(isInteractive));
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", handlePointerOver);

    return () => {
      window.removeEventListener("resize", checkTouch);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", handlePointerOver);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Central Small Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full bg-gradient-to-r from-fuchsia-400 to-violet-400 shadow-[0_0_12px_rgba(232,121,249,0.9)]"
        animate={{
          x: mousePos.x - (isHovered ? 6 : 4),
          y: mousePos.y - (isHovered ? 6 : 4),
          width: isHovered ? 12 : 8,
          height: isHovered ? 12 : 8,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          damping: 35,
          stiffness: 450,
          mass: 0.2,
        }}
      />

      {/* Outer Smooth Trailing Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full border border-fuchsia-400/40 bg-fuchsia-500/5 backdrop-blur-[1px]"
        animate={{
          x: mousePos.x - (isHovered ? 28 : 18),
          y: mousePos.y - (isHovered ? 28 : 18),
          width: isHovered ? 56 : 36,
          height: isHovered ? 56 : 36,
          opacity: isVisible ? 1 : 0,
          borderColor: isHovered ? "rgba(232, 121, 249, 0.75)" : "rgba(168, 85, 247, 0.35)",
          scale: isHovered ? 1.15 : 1,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 220,
          mass: 0.6,
        }}
      />
    </>
  );
}
