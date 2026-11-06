import portrait from "../assets/vedant-cutout.webp";

export default function Hero({ kb, onAsk }) {
  const { profile, about } = kb;
  const [first, ...rest] = profile.name.split(" ");
  return (
    <>
      <section id="top" className="hero-neon">
        <div className="neon-bg" aria-hidden="true" />
        <div className="neon-sign" aria-hidden="true">KAKA'S TAPRI</div>
        <div className="hero-copy">
          <p className="eyebrow">// {profile.role}</p>
          <h1><span>{first}</span><span>{rest.join(" ")}</span></h1>
          <p>{profile.tagline}</p>
          <div className="cta">
            <a className="btn" href="#projects">View Work</a>
            <button className="btn ghost" onClick={onAsk}>Ask Kaka</button>
          </div>
        </div>
        <img className="hero-portrait" src={portrait} width="900" height="1100" fetchpriority="high"
          alt={`${profile.name} wearing sunglasses and a grey blazer`} />
        <div className="wet" aria-hidden="true" />
      </section>
      <section id="about">
        <div className="board">
          <p><b>{profile.role}</b></p>
          <p>{about.bio}</p>
          <p className="mr" lang="mr">{about.marathiLine}</p>
        </div>
      </section>
    </>
  );
}
