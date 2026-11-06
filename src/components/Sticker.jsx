import { useMemo, useRef } from "react";
import { motion } from "motion/react";
import { useFinePointer, useReducedMotion } from "../lib/motionPrefs.js";

function seededAngle(index) {
  const n = ((index + 1) * 37) % 11;
  return (n - 5) * 1.15;
}

export default function Sticker({ children, selected, onClick, index, expanded }) {
  const innerRef = useRef(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const rotate = useMemo(() => seededAngle(index), [index]);

  const onPointerMove = (e) => {
    if (!fine || reduced || !innerRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
    const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
    innerRef.current.style.transform = `rotateX(${(-dy * 10).toFixed(2)}deg) rotateY(${(dx * 12).toFixed(2)}deg) rotate(${rotate}deg)`;
  };

  const onPointerLeave = () => {
    if (!innerRef.current) return;
    innerRef.current.style.transform = `rotate(${rotate}deg)`;
  };

  return (
    <motion.button
      type="button"
      className={`sticker${selected ? " is-selected" : ""}`}
      aria-expanded={expanded}
      onClick={onClick}
      onMouseMove={onPointerMove}
      onMouseLeave={onPointerLeave}
      whileHover={fine && !reduced ? { y: -8, scale: 1.06 } : undefined}
      whileTap={!reduced ? { scale: 0.96 } : undefined}
      transition={{ type: "spring", stiffness: 420, damping: 18, mass: 0.7 }}
    >
      <span
        ref={innerRef}
        className="sticker-face"
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        {children}
        <span className="sticker-peel" aria-hidden="true" />
      </span>
    </motion.button>
  );
}
