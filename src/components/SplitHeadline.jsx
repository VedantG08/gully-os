import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap.js";
import { prefersReducedMotion } from "../lib/motionPrefs.js";

export default function SplitHeadline({ lines, className, label }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const chars = root.current?.querySelectorAll(".char");
      if (!chars?.length) return;

      if (prefersReducedMotion()) {
        gsap.set(chars, { opacity: 1, y: 0, rotate: 0, scale: 1 });
        return;
      }

      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: 42,
          rotate: () => gsap.utils.random(-14, 14),
          scale: 0.82,
        },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          scale: 1,
          duration: 0.95,
          stagger: 0.038,
          ease: "elastic.out(1, 0.58)",
          delay: 0.12,
        }
      );
    },
    { scope: root }
  );

  return (
    <h1 ref={root} className={className} aria-label={label}>
      <span className="headline-stack" aria-hidden="true">
        {lines.map((line) => (
          <span className="headline-line" key={line}>
            {Array.from(line).map((ch, i) => (
              <span className="char" key={`${line}-${i}`}>
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </span>
        ))}
        <span className="brush-underline" />
      </span>
      <span className="print-texture" aria-hidden="true" />
    </h1>
  );
}
