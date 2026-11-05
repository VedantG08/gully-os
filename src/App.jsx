import { useCallback, useState } from "react";
import kb from "./data/knowledge.json";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import KakaPanel from "./components/KakaPanel.jsx";

export default function App() {
  const [openId, setOpenId] = useState(null);
  const [kakaOpen, setKakaOpen] = useState(false);

  const scrollTo = useCallback((zone) => document.getElementById(zone)?.scrollIntoView({ behavior: "smooth" }), []);
  const openProject = useCallback((id) => {
    setOpenId(id);
    setTimeout(() => document.getElementById(`project-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero kb={kb} onAsk={() => setKakaOpen(true)} />
        <Skills skills={kb.skills} />
        <Projects projects={kb.projects} openId={openId} setOpenId={setOpenId} />
        <Contact contact={kb.profile.contact} />
      </main>
      <KakaPanel kb={kb} open={kakaOpen} setOpen={setKakaOpen} ui={{ openProject, scrollTo }} />
    </>
  );
}
