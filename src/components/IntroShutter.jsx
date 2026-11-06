import { useState, useEffect } from "react";

export default function IntroShutter() {
  const [visible, setVisible] = useState(false);
  const [rolledUp, setRolledUp] = useState(false);

  useEffect(() => {
    try {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reducedMotion) return;

      const seen = sessionStorage.getItem("gully_intro_shutter_seen");
      if (!seen) {
        setVisible(true);
        // Trigger roll up after brief initial pause
        const timer = setTimeout(() => {
          setRolledUp(true);
          sessionStorage.setItem("gully_intro_shutter_seen", "true");
        }, 300);

        // Remove from DOM after roll-up finishes
        const cleanup = setTimeout(() => {
          setVisible(false);
        }, 1500);

        return () => {
          clearTimeout(timer);
          clearTimeout(cleanup);
        };
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`intro-shutter ${rolledUp ? "rolled-up" : ""}`}
      aria-hidden="true"
    >
      <div className="shutter-ribs">
        <div className="shutter-handle">
          <span>GULLY // OS</span>
        </div>
      </div>
    </div>
  );
}
