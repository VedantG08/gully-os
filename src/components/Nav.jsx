import { useEffect, useState } from "react";

const LINKS = [
  { id: "projects", label: "Work", href: "#projects" },
  { id: "about", label: "About", href: "#about" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const ids = ["top", "about", "skills", "projects", "contact"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <a className="skip-link" href="#about">
        Skip to about
      </a>
      <nav className="nav" aria-label="Sections">
        <a href="#top" className="nav-brand" aria-label="Back to top">
          GULLY<span className="brand-slash">//</span>OS
        </a>
        <div className="nav-links">
          <a
            href="#top"
            className="nav-home"
            aria-current={active === "top" ? "page" : undefined}
          >
            Home
          </a>
          {LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={active === item.id ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
