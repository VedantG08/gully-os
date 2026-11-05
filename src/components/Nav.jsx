export default function Nav() {
  return (
    <nav className="nav" aria-label="Sections">
      <b>GULLY//OS</b>
      {["about", "skills", "projects", "contact"].map((z) => (
        <a key={z} href={`#${z}`}>{z[0].toUpperCase() + z.slice(1)}</a>
      ))}
    </nav>
  );
}
