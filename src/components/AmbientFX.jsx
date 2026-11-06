import { useMemo } from "react";
import { skipHeavyFx, useReducedMotion } from "../lib/motionPrefs.js";

const MOTES = Array.from({ length: 9 }, (_, i) => ({
  left: `${(i * 11 + 7) % 92}%`,
  top: `${(i * 17 + 13) % 80}%`,
  delay: `${(i * 0.8) % 6}s`,
  duration: `${10 + (i % 5)}s`,
  size: `${2 + (i % 3)}px`,
}));

export default function AmbientFX() {
  const reduced = useReducedMotion();
  const heavyOff = typeof window !== "undefined" && skipHeavyFx();
  const motes = useMemo(() => MOTES, []);

  return (
    <>
      <div className="hanging-bulb" aria-hidden="true">
        <span className="bulb-cord" />
        <span className="bulb-glow" />
        <span className="bulb" />
      </div>
      {!reduced && !heavyOff && (
        <div className="dust-field" aria-hidden="true">
          {motes.map((m, i) => (
            <span
              key={i}
              className="dust-mote"
              style={{
                left: m.left,
                top: m.top,
                width: m.size,
                height: m.size,
                animationDelay: m.delay,
                animationDuration: m.duration,
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
