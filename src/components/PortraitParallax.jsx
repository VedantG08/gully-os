import { useRef } from "react";
import portraitImg from "../assets/vedant-cutout.webp";
import Steam from "./Steam.jsx";
import { gsap, useGSAP } from "../lib/gsap.js";
import { prefersReducedMotion } from "../lib/motionPrefs.js";

export default function PortraitParallax({ offsets, flicker }) {
  const { portrait, foreground } = offsets;
  const { bloomIntensity } = flicker;
  const enterRef = useRef(null);

  useGSAP(
    () => {
      const root = enterRef.current;
      if (!root) return;
      const cutout = root.querySelector(".portrait-cutout");
      const chai = root.querySelector(".portrait-offset-shadow.chai");
      const pink = root.querySelector(".portrait-offset-shadow.pink");

      if (prefersReducedMotion()) {
        root.classList.add("is-settled");
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => root.classList.add("is-settled"),
      });

      tl.fromTo(
        pink,
        { x: -48, y: 44, opacity: 0 },
        { x: -22, y: 20, opacity: 0.42, duration: 0.7, ease: "power3.out" },
        0.05
      )
        .fromTo(
          chai,
          { x: 48, y: 40, opacity: 0 },
          { x: 26, y: 16, opacity: 0.55, duration: 0.7, ease: "power3.out" },
          0.12
        )
        .fromTo(
          cutout,
          { y: 64, opacity: 0, rotate: -2 },
          { y: 0, opacity: 1, rotate: 0, duration: 0.95, ease: "power3.out" },
          0.18
        );
    },
    { scope: enterRef }
  );

  return (
    <div className="portrait-stage-layer" aria-hidden="false">
      <div
        className="rim-glow rim-glow-orange"
        style={{
          opacity: 0.35 + bloomIntensity * 0.25,
          transform: `translate3d(${portrait.x * 0.4}px, ${portrait.y * 0.4}px, 0)`,
        }}
        aria-hidden="true"
      />
      <div
        className="rim-glow rim-glow-teal"
        style={{
          opacity: 0.3 + bloomIntensity * 0.2,
          transform: `translate3d(${portrait.x * 0.4}px, ${portrait.y * 0.4}px, 0)`,
        }}
        aria-hidden="true"
      />

      <div
        className="portrait-wrapper"
        style={{
          transform: `translate3d(${portrait.x}px, ${portrait.y}px, 0) rotateX(${portrait.tiltX}deg) rotateY(${portrait.tiltY}deg)`,
        }}
      >
        <div className="portrait-entrance" ref={enterRef}>
          <img
            src={portraitImg}
            alt=""
            className="portrait-offset-shadow pink"
            width="900"
            height="1086"
            aria-hidden="true"
          />
          <img
            src={portraitImg}
            alt=""
            className="portrait-offset-shadow chai"
            width="900"
            height="1086"
            aria-hidden="true"
          />
          <img
            src={portraitImg}
            alt="Vedant Gaikwad, AI/ML developer in a grey suit and square sunglasses"
            className="portrait-cutout"
            width="900"
            height="1086"
            fetchPriority="high"
          />
        </div>
      </div>

      <div
        className="foreground-glass-wrapper"
        style={{
          transform: `translate3d(${foreground.x}px, ${foreground.y}px, 0)`,
        }}
        aria-hidden="true"
      >
        <div className="chai-glass-silhouette">
          <div className="chai-tea-liquid" />
          <div className="chai-glass-rim" />
          <Steam className="steam-foreground" />
        </div>
      </div>
    </div>
  );
}
