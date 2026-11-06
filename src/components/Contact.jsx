import { useRef } from "react";
import Magnetic from "./Magnetic.jsx";
import { useScrollReveal } from "../hooks/useScrollReveal.js";

export default function Contact({ contact }) {
  const root = useRef(null);
  useScrollReveal(root);

  return (
    <section id="contact" className="contact" ref={root}>
      <h2>Contact</h2>
      <p className="contact-kicker">Chai pe charcha</p>
      <p>
        <Magnetic>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </Magnetic>
      </p>
      <p>
        <a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        {" · "}
        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </p>
    </section>
  );
}
