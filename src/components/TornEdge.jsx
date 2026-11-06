export default function TornEdge({ fill = "var(--asphalt)", flip = false }) {
  return (
    <div className={`torn-edge${flip ? " is-flipped" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 1200 36" preserveAspectRatio="none">
        <path
          fill={fill}
          d="M0 18 C40 2 70 34 110 16 C150 0 180 32 220 14 C260 36 300 4 340 20 C380 2 420 34 460 12 C510 36 550 0 590 18 C630 4 670 32 710 10 C760 34 800 2 840 20 C880 4 920 30 960 12 C1000 34 1050 2 1100 18 C1140 6 1170 28 1200 14 L1200 36 L0 36 Z"
        />
      </svg>
    </div>
  );
}
