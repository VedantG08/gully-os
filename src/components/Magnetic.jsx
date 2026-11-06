import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap.js";
import { isFinePointer, prefersReducedMotion } from "../lib/motionPrefs.js";

export default function Magnetic({ children, strength = 0.32, className = "" }) {
  const ref = useRef(null);

  useEffect(() => () => {
    if (ref.current) gsap.killTweensOf(ref.current);
  }, []);

  const reset = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, 0.45)", overwrite: true });
  };

  const onMove = (e) => {
    if (!isFinePointer() || prefersReducedMotion() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    gsap.to(ref.current, { x, y, duration: 0.28, ease: "power2.out", overwrite: true });
  };

  return (
    <span
      ref={ref}
      className={`magnetic ${className}`.trim()}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onBlur={reset}
    >
      {children}
    </span>
  );
}
