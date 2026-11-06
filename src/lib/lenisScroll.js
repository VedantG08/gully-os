import { ScrollTrigger } from "./gsap.js";

let lenis = null;

export function setLenis(instance) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

export function scrollToId(id, options = {}) {
  const el = typeof id === "string" ? document.getElementById(id) : id;
  if (!el) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const offset = options.offset ?? -56;
  const duration = reduced ? 0 : options.duration;

  if (lenis) {
    lenis.scrollTo(el, {
      offset,
      duration,
      immediate: reduced,
      onComplete: () => {
        ScrollTrigger.update();
        options.onComplete?.();
      },
      ...options.lenis,
    });
    return;
  }

  el.scrollIntoView({
    behavior: reduced ? "auto" : "smooth",
    block: options.block || "start",
  });
}
