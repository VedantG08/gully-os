const ITEMS = [
  "KAKA'S TAPRI · OPEN LATE",
  "CUTTING CHAI",
  "RAG",
  "AGENTIC AI",
  "COMPUTER VISION",
  "AWS",
  "ASK KAKA",
  "GULLY//OS",
];

export default function StreetMarquee() {
  const line = ITEMS.join("  ★  ");
  return (
    <div className="street-marquee" aria-hidden="true">
      <div className="marquee-track">
        <span className="marquee-copy">{line}  ★  {line}  ★  </span>
        <span className="marquee-copy">{line}  ★  {line}  ★  </span>
      </div>
    </div>
  );
}
