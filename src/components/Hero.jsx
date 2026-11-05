export default function Hero({ kb, onAsk }) {
  const { profile, about } = kb;
  return (
    <section id="about" className="hero">
      <h1>{profile.name}</h1>
      <p>{profile.tagline}</p>
      <button className="btn" onClick={onAsk} style={{ alignSelf: "flex-start" }}>Ask Kaka about me</button>
      <div className="board">
        <p><b>{profile.role}</b></p>
        <p>{about.bio}</p>
        <p className="mr" lang="mr">{about.marathiLine}</p>
      </div>
    </section>
  );
}
