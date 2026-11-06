import { gsap, useGSAP } from "../lib/gsap.js";
import { prefersReducedMotion } from "../lib/motionPrefs.js";

export function useScrollReveal(ref, vars = {}) {
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      gsap.from(el, {
        y: 32,
        opacity: 0,
        duration: 0.75,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        ...vars,
      });
    },
    { scope: ref }
  );
}
