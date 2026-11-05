export default function Projects({ projects, openId, setOpenId }) {
  return (
    <section id="projects">
      <h2>Projects</h2>
      {projects.map((p) => {
        const open = openId === p.id;
        return (
          <article key={p.id} id={`project-${p.id}`} className={`shop${open ? " open" : ""}`}>
            <button className="shutter" onClick={() => setOpenId(p.id)} aria-expanded={open} tabIndex={open ? -1 : 0}>
              {p.title}<small>Tap to roll up the shutter</small>
            </button>
            <div className="poster" aria-hidden={!open}>
              {open && <button className="btn close" onClick={() => setOpenId(null)}>Close shutter</button>}
              <h3>{p.title}</h3> <span className="badge">{p.status}</span>
              <dl>
                <dt>Problem</dt><dd>{p.problem}</dd>
                <dt>What I built</dt><dd>{p.built}</dd>
                <dt>My role</dt><dd>{p.role}</dd>
                <dt>Stack</dt><dd>{p.stack.join(", ")}</dd>
              </dl>
              {p.links.repo && <a href={p.links.repo} target="_blank" rel="noreferrer">Repo</a>}{" "}
              {p.links.demo && <a href={p.links.demo} target="_blank" rel="noreferrer">Demo</a>}
            </div>
          </article>
        );
      })}
    </section>
  );
}
