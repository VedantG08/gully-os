import { useState, useEffect, useRef } from "react";
import { gsap } from "../lib/gsap.js";
import { prefersReducedMotion } from "../lib/motionPrefs.js";

export default function IntroShutter() {
  const [visible, setVisible] = useState(false);
  const shutterRef = useRef(null);

  useEffect(() => {
    try {
      if (prefersReducedMotion()) return;
      if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

      const seen = sessionStorage.getItem("gully_intro_shutter_seen");
      if (!seen) {
        setVisible(true);
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, []);

  useEffect(() => {
    if (!visible || !shutterRef.current) return;

    const el = shutterRef.current;
    const tween = gsap.fromTo(
      el,
      { yPercent: 0 },
      {
        yPercent: -100,
        duration: 1.05,
        delay: 0.28,
        ease: "power3.inOut",
        onComplete: () => {
          try {
            sessionStorage.setItem("gully_intro_shutter_seen", "true");
          } catch {
            /* ignore */
          }
          setVisible(false);
        },
      }
    );

    return () => {
      tween.kill();
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div ref={shutterRef} className="intro-shutter" aria-hidden="true">
      <div className="shutter-ribs">
        <div className="shutter-handle">
          <span>GULLY // OS</span>
        </div>
      </div>
    </div>
  );
}
