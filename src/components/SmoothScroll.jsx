import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../lib/gsap.js";
import { prefersReducedMotion } from "../lib/motionPrefs.js";
import { setLenis, scrollToId } from "../lib/lenisScroll.js";

export default function SmoothScroll() {
  useEffect(() => {
    const onAnchorClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const id = href.slice(1);
      if (!document.getElementById(id)) return;
      e.preventDefault();
      scrollToId(id);
      history.pushState(null, "", href);
    };

    document.addEventListener("click", onAnchorClick);

    if (prefersReducedMotion()) {
      return () => document.removeEventListener("click", onAnchorClick);
    }

    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.15,
      smoothWheel: true,
      touchMultiplier: 1.1,
    });

    setLenis(lenis);
    document.documentElement.classList.add("lenis");
    document.documentElement.style.scrollBehavior = "auto";

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const onResize = () => ScrollTrigger.refresh();
    const onLoad = () => {
      ScrollTrigger.refresh();
      const hash = window.location.hash.slice(1);
      if (hash && document.getElementById(hash)) scrollToId(hash, { duration: 0 });
    };
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("load", onLoad);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      const hash = window.location.hash.slice(1);
      if (hash && document.getElementById(hash)) {
        scrollToId(hash, { duration: 0 });
      }
    });

    return () => {
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      setLenis(null);
      document.documentElement.classList.remove("lenis");
    };
  }, []);

  return null;
}
