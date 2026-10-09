import React, { useEffect, useRef } from "react";

export default function Snowfall() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, flakes, raf;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      // Create smooth, ambient snowflakes with depth
      const count = Math.min(95, Math.floor(w / 14));
      flakes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 2.2 + 0.8, // 0.8px to 3.0px
        density: Math.random() * 1.5 + 0.5,
        speedY: Math.random() * 0.7 + 0.35, // gentle fall speed
        speedX: (Math.random() - 0.5) * 0.3, // gentle horizontal drift
        opacity: Math.random() * 0.55 + 0.2, // soft translucency
        swaySpeed: Math.random() * 0.02 + 0.008,
        swayOffset: Math.random() * Math.PI * 2,
      }));
    }

    let time = 0;
    function tick() {
      time += 1;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];

        // Horizontal sinusoidal sway
        const sway = Math.sin(time * f.swaySpeed + f.swayOffset) * 0.45;
        f.x += f.speedX + sway;
        f.y += f.speedY;

        // Wrap around viewport edges smoothly
        if (f.y > h + 10) {
          f.y = -10;
          f.x = Math.random() * w;
        }
        if (f.x > w + 10) {
          f.x = -10;
        } else if (f.x < -10) {
          f.x = w + 10;
        }

        // Draw glowing snowflake
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(224, 215, 255, ${f.opacity})`;
        ctx.shadowColor = "rgba(192, 132, 252, 0.4)";
        ctx.shadowBlur = f.radius > 2 ? 6 : 2;
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    }

    resize();
    tick();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[2]"
      style={{ opacity: 0.85 }}
    />
  );
}
