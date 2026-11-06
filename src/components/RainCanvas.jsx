import { useEffect, useRef } from "react";

export default function RainCanvas({ containerRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const saveData = Boolean(navigator.connection?.saveData);
    if (reduced || coarse || saveData || window.innerWidth < 800) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId;
    let isVisible = true;
    let width = 0;
    let height = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      const container = containerRef?.current || canvas.parentElement;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // 70 light raindrops for mood without battery drain
    const dropCount = Math.min(80, Math.floor(window.innerWidth / 16));
    const drops = Array.from({ length: dropCount }, () => ({
      x: Math.random() * (width || window.innerWidth),
      y: Math.random() * (height || window.innerHeight),
      len: 12 + Math.random() * 16,
      speed: 12 + Math.random() * 10,
      opacity: 0.15 + Math.random() * 0.2,
    }));

    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        ctx.strokeStyle = `rgba(180, 220, 240, ${d.opacity})`;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 2, d.y + d.len);
        ctx.stroke();

        d.y += d.speed;
        d.x -= 2;

        if (d.y > height) {
          d.y = -d.len;
          d.x = Math.random() * (width + 50);
        }
        if (d.x < -10) {
          d.x = width + 10;
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // Pause when offscreen or hidden
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting && !document.hidden;
      },
      { threshold: 0.05 }
    );

    const handleVisibility = () => {
      isVisible = !document.hidden;
    };

    observer.observe(canvas);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("resize", resize);
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="rain-canvas"
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 2,
      }}
    />
  );
}
