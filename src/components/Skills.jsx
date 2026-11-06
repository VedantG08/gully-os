import { useRef, useState } from "react";
import Sticker from "./Sticker.jsx";
import { useScrollReveal } from "../hooks/useScrollReveal.js";

export default function Skills({ skills }) {
  const [sel, setSel] = useState(null);
  const root = useRef(null);
  const active = skills.find((s) => s.id === sel);
  useScrollReveal(root);

  return (
    <section id="skills" ref={root}>
      <h2>Skills / Tech Superpowers</h2>
      <ul className="stickers">
        {skills.map((s, i) => (
          <li key={s.id}>
            <Sticker
              index={i}
              selected={sel === s.id}
              expanded={sel === s.id}
              onClick={() => setSel(sel === s.id ? null : s.id)}
            >
              {s.name}
            </Sticker>
          </li>
        ))}
      </ul>
      {active && <p className="proof" role="status">{active.proof}</p>}
    </section>
  );
}
