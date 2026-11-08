import { useCallback, useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setScrollLocked, useSmoothScroll } from "@/lib/smooth-scroll";
import Preloader from "@/components/site/Preloader";
import Cursor from "@/components/site/Cursor";
import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import Statement from "@/components/site/Statement";
import CaseStudies from "@/components/site/CaseStudies";
import ProjectIndex from "@/components/site/ProjectIndex";
import Numbers from "@/components/site/Numbers";
import Capabilities from "@/components/site/Capabilities";
import Record from "@/components/site/Record";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";

export default function App() {
  const [ready, setReady] = useState(false);
  useSmoothScroll();

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    setScrollLocked(true);
  }, []);

  const handleLoaded = useCallback(() => {
    setReady(true);
    setScrollLocked(false);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  return (
    <>
      <Preloader onDone={handleLoaded} />
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <a
        href="#work"
        className="label fixed top-3 left-3 z-[90] -translate-y-20 rounded-full bg-ink px-4 py-2 text-paper focus:translate-y-0"
      >
        Skip to work
      </a>

      <Nav ready={ready} />
      <main>
        <Hero ready={ready} />
        <Statement />
        <CaseStudies />
        <Numbers />
        <ProjectIndex />
        <Capabilities />
        <Record />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
