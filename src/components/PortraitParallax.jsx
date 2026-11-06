import portraitImg from "../assets/vedant-cutout.webp";
import Steam from "./Steam.jsx";

export default function PortraitParallax({ offsets, flicker }) {
  const { portrait, foreground } = offsets;
  const { bloomIntensity } = flicker;

  return (
    <div className="portrait-stage-layer" aria-hidden="false">
      {/* Dynamic orange & teal rim light glows pulsing with the neon */}
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

      {/* Main Portrait with 3D tilt, parallax & breathing float */}
      <div
        className="portrait-wrapper"
        style={{
          transform: `translate3d(${portrait.x}px, ${portrait.y}px, 0) rotateX(${portrait.tiltX}deg) rotateY(${portrait.tiltY}deg)`,
        }}
      >
        <img
          src={portraitImg}
          alt="Vedant Gaikwad, AI/ML Developer wearing square sunglasses and grey blazer holding chai"
          className="portrait-cutout"
          width="900"
          height="1086"
          fetchPriority="high"
        />
      </div>

      {/* Foreground Cutting Chai Glass with steam parallaxing faster */}
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
