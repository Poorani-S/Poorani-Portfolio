import React, { useEffect, useState, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

export default function Counter({ value, duration = 1.8, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (typeof value !== "string" && typeof value !== "number") {
      setDisplayValue(String(value || 0));
      return;
    }

    const strVal = String(value).trim();

    // Match prefix, number, decimals, commas, and suffix
    // Examples: "50,000+", "94.0%", "88%+", "10+", "8.9", "16+", "5"
    const match = strVal.match(/^([^0-9.]*)([0-9,.]+)(.*)$/);

    if (!match) {
      setDisplayValue(strVal);
      return;
    }

    const prefix = match[1] || "";
    const rawNumStr = match[2];
    const suffix = match[3] || "";

    const hasCommas = rawNumStr.includes(",");
    const numClean = parseFloat(rawNumStr.replace(/,/g, ""));

    if (isNaN(numClean)) {
      setDisplayValue(strVal);
      return;
    }

    // Determine decimal precision
    const decimalParts = rawNumStr.split(".");
    const decimals = decimalParts.length > 1 ? decimalParts[1].length : 0;

    if (shouldReduceMotion || !isInView) {
      if (shouldReduceMotion) {
        setDisplayValue(strVal);
      }
      return;
    }

    let startTime = null;
    let animationFrame;

    const easeOutExpo = (x) => {
      return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    };

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easedProgress = easeOutExpo(progress);
      const currentNum = easedProgress * numClean;

      let formattedNum = currentNum.toFixed(decimals);
      if (hasCommas) {
        const parts = formattedNum.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        formattedNum = parts.join(".");
      }

      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        // Ensure exact target at the end
        setDisplayValue(strVal);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isInView, value, duration, shouldReduceMotion]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}
