export default function Steam({ style, className = "" }) {
  return (
    <div className={`steam-container ${className}`} aria-hidden="true" style={style}>
      <span className="wisp wisp-1" />
      <span className="wisp wisp-2" />
      <span className="wisp wisp-3" />
      <span className="wisp wisp-4" />
    </div>
  );
}
