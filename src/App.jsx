import { useCallback, useState } from "react";
import kb from "./data/knowledge.json";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import KakaPanel from "./components/KakaPanel.jsx";
import SmoothScroll from "./components/SmoothScroll.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import StreetMarquee from "./components/StreetMarquee.jsx";
import TornEdge from "./components/TornEdge.jsx";
import { scrollToId } from "./lib/lenisScroll.js";

export default function App() {
  const [openId, setOpenId] = useState(null);
  const [kakaOpen, setKakaOpen] = useState(false);

  const scrollTo = useCallback((zone) => scrollToId(zone), []);
  const openProject = useCallback((id) => {
    setOpenId(id);
    setTimeout(() => scrollToId(`project-${id}`, { offset: -72 }), 50);
  }, []);

  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <Nav />
      <main>
        <Hero kb={kb} onAsk={() => setKakaOpen(true)} />
        <TornEdge fill="var(--paper)" />
        <Skills skills={kb.skills} />
        <StreetMarquee />
        <Projects projects={kb.projects} openId={openId} setOpenId={setOpenId} />
        <TornEdge fill="var(--paper)" flip />
        <Contact contact={kb.profile.contact} />
      </main>
      <KakaPanel kb={kb} open={kakaOpen} setOpen={setKakaOpen} ui={{ openProject, scrollTo }} />
    </>
  );
}
