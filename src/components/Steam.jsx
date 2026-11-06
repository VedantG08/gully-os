export default function Steam({ style, className = "" }) {
  return (
    <div className={`steam-container ${className}`} aria-hidden="true" style={style}>
      <svg className="steam-svg" viewBox="0 0 50 90" fill="none">
        <path className="steam-path s1" d="M16 82 C12 62 24 54 18 36 C14 24 22 16 20 8" />
        <path className="steam-path s2" d="M26 84 C30 64 20 52 28 34 C34 22 26 14 30 6" />
        <path className="steam-path s3" d="M36 80 C40 63 32 50 38 32 C42 20 36 12 40 4" />
      </svg>
      <span className="wisp wisp-1" />
      <span className="wisp wisp-2" />
      <span className="wisp wisp-3" />
      <span className="wisp wisp-4" />
    </div>
  );
}
