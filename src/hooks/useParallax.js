import { useState, useEffect, useRef } from "react";

export function useParallax(containerRef) {
  const [offsets, setOffsets] = useState({
    bg: { x: 0, y: 0 },
    portrait: { x: 0, y: 0, tiltX: 0, tiltY: 0 },
    foreground: { x: 0, y: 0 },
  });

  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isReducedMotion = useRef(false);

  useEffect(() => {
    isReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const saveData = Boolean(navigator.connection?.saveData);
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (isReducedMotion.current || saveData || coarse) return;

    let animId;
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const handleMouseMove = (e) => {
      const container = containerRef?.current;
      if (!container) {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        mouse.current.targetX = (e.clientX - cx) / cx;
        mouse.current.targetY = (e.clientY - cy) / cy;
        return;
      }

      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouse.current.targetX = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)));
      mouse.current.targetY = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));
    };

    const handleMouseLeave = () => {
      mouse.current.targetX = 0;
      mouse.current.targetY = 0;
    };

    const loop = () => {
      mouse.current.x = lerp(mouse.current.x, mouse.current.targetX, 0.08);
      mouse.current.y = lerp(mouse.current.y, mouse.current.targetY, 0.08);

      const mx = mouse.current.x;
      const my = mouse.current.y;

      // bg moves subtle in same direction: ~6px
      const bgX = mx * 6;
      const bgY = my * 4;

      // portrait moves slightly opposite to cursor: ~12px, tilt max 3deg
      const portraitX = -mx * 12;
      const portraitY = -my * 8;
      const tiltX = -my * 3.0; // rotation around X axis
      const tiltY = mx * 3.0; // rotation around Y axis

      // foreground chai glass moves most: ~24px opposite
      const fgX = -mx * 26;
      const fgY = -my * 18;

      setOffsets({
        bg: { x: bgX, y: bgY },
        portrait: { x: portraitX, y: portraitY, tiltX, tiltY },
        foreground: { x: fgX, y: fgY },
      });

      animId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [containerRef]);

  return offsets;
}
