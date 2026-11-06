import { useRef } from "react";
import bgPlate from "../assets/gully-bg.webp";
import RainCanvas from "./RainCanvas.jsx";
import Steam from "./Steam.jsx";
import NeonSign from "./NeonSign.jsx";
import PortraitParallax from "./PortraitParallax.jsx";
import IntroShutter from "./IntroShutter.jsx";
import SplitHeadline from "./SplitHeadline.jsx";
import Magnetic from "./Magnetic.jsx";
import AmbientFX from "./AmbientFX.jsx";
import { useParallax } from "../hooks/useParallax.js";
import { useNeonFlicker } from "../hooks/useNeonFlicker.js";
import { useScrollReveal } from "../hooks/useScrollReveal.js";

export default function Hero({ kb, onAsk }) {
  const { profile, about } = kb;
  const stageRef = useRef(null);
  const boardRef = useRef(null);
  const offsets = useParallax(stageRef);
  const flicker = useNeonFlicker();
  useScrollReveal(boardRef);

  return (
    <>
      <IntroShutter />

      <section id="top" className="stage-section" ref={stageRef}>
        <div className="stage">
          <div
            className="stage-bg-plate"
            style={{
              backgroundImage: `url(${bgPlate})`,
              transform: `translate3d(${offsets.bg.x}px, ${offsets.bg.y}px, 0) scale(1.04)`,
            }}
            aria-hidden="true"
          />

          <div
            className="wet-street-shimmer"
            style={{
              opacity: 0.4 + flicker.bloomIntensity * 0.35,
            }}
            aria-hidden="true"
          />

          <RainCanvas containerRef={stageRef} />
          <AmbientFX />
          <Steam className="steam-kettle" />
          <NeonSign flicker={flicker} onAsk={onAsk} />

          <div className="hero-content-layer">
            <div className="hero-copy-box">
              <div className="hero-intro-script">Hey, I'm</div>

              <SplitHeadline
                className="hero-name-brush"
                label="Vedant Gaikwad"
                lines={["VEDANT", "GAIKWAD"]}
              />

              <div className="ai-builder-badge">
                <span className="badge-text">the AI builder</span>
              </div>

              <p className="hero-tagline-text">
                RAG · Agentic AI · Computer Vision · AWS
              </p>

              <nav className="hero-jump" aria-label="Required sections">
                <a href="#about">About Me</a>
                <a href="#skills">Skills</a>
                <a href="#projects">Projects</a>
              </nav>

              <div className="hero-actions-row">
                <Magnetic>
                  <a className="btn btn-dashed" href="#projects">
                    View Work →
                  </a>
                </Magnetic>
                <Magnetic>
                  <button
                    className="btn btn-ask-kaka-hero"
                    onClick={onAsk}
                    aria-label="Ask Kaka, the AI chai-wala"
                  >
                    <span className="chai-icon" aria-hidden="true">☕</span> ASK KAKA
                  </button>
                </Magnetic>
              </div>

              <div className="hero-social-links" aria-label="Social profiles">
                {profile.contact?.github && (
                  <a
                    href={profile.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                    className="social-pill"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span>GitHub</span>
                  </a>
                )}
                {profile.contact?.linkedin && (
                  <a
                    href={profile.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    className="social-pill"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                )}
                {profile.contact?.email && (
                  <a
                    href={`mailto:${profile.contact.email}`}
                    aria-label="Email Vedant"
                    className="social-pill"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                    <span>Email</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          <PortraitParallax offsets={offsets} flicker={flicker} />
          <div className="vignette-grain-overlay" aria-hidden="true" />
        </div>
      </section>

      <section id="about" className="about-notice-board">
        <h2>About Me</h2>
        <div className="board" ref={boardRef}>
          <p><b>{profile.role}</b></p>
          <p>{about.bio}</p>
          <p className="mr" lang="mr">{about.marathiLine}</p>
        </div>
      </section>
    </>
  );
}
