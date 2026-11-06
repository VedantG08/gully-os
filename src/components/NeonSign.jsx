import { useState, useEffect } from "react";
import kakaImg from "../assets/kaka.webp";

export default function NeonSign({ flicker, onAsk }) {
  const {
    mainIntensity,
    tapriIntensity,
    bloomIntensity,
    isHovered,
    setIsHovered,
    isPowerSurging,
    triggerPowerSurge,
  } = flicker;

  const [showHint, setShowHint] = useState(false);
  const [kakaPopping, setKakaPopping] = useState(false);
  const [steamPuff, setSteamPuff] = useState(false);

  // Idle tooltip: fades in once after 4s
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setShowHint(false);
    triggerPowerSurge();
    setSteamPuff(true);
    setKakaPopping(true);

    setTimeout(() => {
      setSteamPuff(false);
    }, 900);

    // After Kaka pops up and greets, open the full chat
    setTimeout(() => {
      onAsk();
      setTimeout(() => setKakaPopping(false), 400);
    }, 750);
  };

  return (
    <div className="neon-sign-wrapper" aria-hidden={false}>
      {/* Dynamic ambient bloom spilling onto wall & wet street */}
      <div
        className="neon-ambient-bloom"
        style={{
          opacity: bloomIntensity * 0.85,
          transform: `scale(${1 + (bloomIntensity - 1) * 0.15})`,
        }}
        aria-hidden="true"
      />

      {/* Interactive Neon Sign Button */}
      <button
        className={`neon-sign-plate ${isPowerSurging ? "surging" : ""}`}
        onClick={handleClick}
        onMouseEnter={() => {
          setIsHovered(true);
          setShowHint(false);
        }}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => {
          setIsHovered(true);
          setShowHint(false);
        }}
        onBlur={() => setIsHovered(false)}
        aria-label="Open Kaka, the AI chai-wala"
        type="button"
      >
        <span className="neon-border" />
        <span
          className="neon-glow-text"
          style={{
            opacity: mainIntensity,
            filter: `drop-shadow(0 0 ${8 * bloomIntensity}px var(--neon-orange))`,
          }}
        >
          <span className="neon-icon">☕</span>
          <span className="neon-word-kaka">KAKA'S</span>
          <span
            className="neon-word-tapri"
            style={{
              opacity: tapriIntensity / mainIntensity,
              textShadow: `0 0 5px #fff, 0 0 12px var(--neon-pink), 0 0 ${
                28 * bloomIntensity
              }px var(--neon-pink)`,
            }}
          >
            TAPRI
          </span>
        </span>
      </button>

      {/* Idle hand-written hint */}
      {showHint && !isHovered && (
        <div className="neon-idle-hint" role="status">
          <span>tap the sign ☕</span>
        </div>
      )}

      {/* Steam puff on activation */}
      {steamPuff && (
        <div className="steam-puff" aria-hidden="true">
          <span className="puff-cloud p1" />
          <span className="puff-cloud p2" />
        </div>
      )}

      {/* Kaka pop-up animation */}
      {kakaPopping && (
        <div className="kaka-popup" aria-live="polite">
          <div className="kaka-speech-bubble">
            Aao, chai piyo! ☕
          </div>
          <img
            src={kakaImg}
            alt="Kaka the chai-wala"
            className="kaka-popup-img"
          />
        </div>
      )}
    </div>
  );
}
