import { useEffect, useRef } from "react";
import { skipHeavyFx } from "../lib/motionPrefs.js";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (skipHeavyFx()) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("has-custom-cursor");

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { x: pos.x, y: pos.y };
    let hovering = false;
    let hidden = false;
    let raf = 0;

    const onMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      const tag = e.target?.closest?.("input, textarea, select, [contenteditable='true']");
      hidden = Boolean(tag);
    };

    const onOver = (e) => {
      hovering = Boolean(e.target?.closest?.("a, button, [role='button'], .sticker, .shutter"));
    };

    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.18;
      ringPos.y += (pos.y - ringPos.y) * 0.18;
      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) scale(${hovering ? 1.55 : 1})`;
      dot.style.opacity = hidden ? "0" : "1";
      ring.style.opacity = hidden ? "0" : hovering ? "0.9" : "0.55";
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div className="custom-cursor" aria-hidden="true">
      <span className="cursor-ring" ref={ringRef} />
      <span className="cursor-dot" ref={dotRef} />
    </div>
  );
}
