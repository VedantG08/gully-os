import { useState } from "react";
export default function Skills({ skills }) {
  const [sel, setSel] = useState(null);
  const active = skills.find((s) => s.id === sel);
  return (
    <section id="skills">
      <h2>Skills</h2>
      <ul className="stickers">
        {skills.map((s, i) => (
          <li key={s.id}>
            <button className="sticker" style={{ "--r": `${(i % 3 - 1) * 2.5}deg` }}
              aria-expanded={sel === s.id} onClick={() => setSel(sel === s.id ? null : s.id)}>{s.name}</button>
          </li>
        ))}
      </ul>
      {active && <p className="proof" role="status">{active.proof}</p>}
    </section>
  );
}
