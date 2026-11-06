import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "../lib/gsap.js";
import { prefersReducedMotion } from "../lib/motionPrefs.js";

export default function Projects({ projects, openId, setOpenId }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const shops = gsap.utils.toArray(".shop", root.current);
      const reduced = prefersReducedMotion();

      if (reduced) {
        shops.forEach((shop) => {
          const shutter = shop.querySelector(".shutter");
          gsap.set(shutter, { yPercent: openId === shop.dataset.projectId ? -100 : 0 });
        });
        return;
      }

      const setY = (shutter, yPercent, duration) => {
        if (!shutter) return;
        if (reduced || duration === 0) {
          gsap.set(shutter, { yPercent });
          return;
        }
        gsap.to(shutter, {
          yPercent,
          duration,
          ease: "power3.inOut",
          overwrite: "auto",
        });
      };

      shops.forEach((shop) => {
        const shutter = shop.querySelector(".shutter");
        const id = shop.dataset.projectId;

        if (openId === id) {
          setY(shutter, -100, 0.85);
          return;
        }

        gsap.fromTo(
          shutter,
          { yPercent: 0 },
          {
            yPercent: -44,
            ease: "none",
            scrollTrigger: {
              trigger: shop,
              start: "top 95%",
              end: "top 42%",
              scrub: 0.55,
            },
          }
        );
      });

      ScrollTrigger.refresh();
    },
    { scope: root, dependencies: [projects, openId] }
  );

  return (
    <section id="projects" ref={root}>
      <h2>Projects / Achievements</h2>
      {projects.map((p) => {
        const open = openId === p.id;
        return (
          <article
            key={p.id}
            id={`project-${p.id}`}
            data-project-id={p.id}
            className={`shop${open ? " open" : ""}`}
          >
            <div className="shop-art" aria-hidden="true">
              <span className="chai-ring" />
              <span className="shop-stamp">{p.title}</span>
            </div>
            <button
              className="shutter"
              onClick={() => setOpenId(p.id)}
              aria-expanded={open}
              tabIndex={open ? -1 : 0}
            >
              {p.title}
              <small>Tap to roll up the shutter</small>
              <span className="shutter-bar" aria-hidden="true" />
            </button>
            <div className="poster" aria-hidden={!open}>
              {open && (
                <button className="btn close" onClick={() => setOpenId(null)}>
                  Close shutter
                </button>
              )}
              <h3>{p.title}</h3> <span className="badge">{p.status}</span>
              <dl>
                <dt>Problem</dt><dd>{p.problem}</dd>
                <dt>What I built</dt><dd>{p.built}</dd>
                <dt>My role</dt><dd>{p.role}</dd>
                <dt>Stack</dt><dd>{p.stack.join(", ")}</dd>
              </dl>
              {p.links.repo && <a href={p.links.repo} target="_blank" rel="noopener noreferrer">Repo</a>}{" "}
              {p.links.demo && <a href={p.links.demo} target="_blank" rel="noopener noreferrer">Demo</a>}
            </div>
          </article>
        );
      })}
    </section>
  );
}
