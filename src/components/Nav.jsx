export default function Nav() {
  const links = [
    { label: "Work", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="nav" aria-label="Sections">
      <a href="#top" className="nav-brand">
        GULLY<span className="brand-slash">//</span>OS
      </a>
      <div className="nav-links">
        {links.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
