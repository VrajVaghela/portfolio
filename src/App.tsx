import { useEffect, useState } from "react";
import FluidCanvas from "./components/FluidCanvas";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Metrics from "./components/Metrics";
import Work from "./components/Work";
import Skills from "./components/Skills";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // 1. Mouse pointer tracker for CSS custom properties (cursor glow)
    const handlePointerMove = (e: PointerEvent) => {
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--my", `${e.clientY}px`);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // 2. Window Scroll progress indicators
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Visual Scroll Progress Bar */}
      <div 
        className="scroll-progress-bar" 
        style={{ width: `${scrollProgress}%` }} 
      />

      {/* Interactive Magnetic Vector Fluid Background */}
      <FluidCanvas />

      {/* Static Visual layers */}
      <div className="noise-layer" aria-hidden="true" />
      <div className="cursor-glow" aria-hidden="true" />

      {/* Skipper Link */}
      <a href="#work" className="skip-link">Skip to selected builds</a>

      {/* Application Shell */}
      <div className="site-wrapper">
        <Navbar />
        
        <main>
          <Hero />
          <Metrics />
          <Work />
          <Skills />
          <About />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </>
  );
}

export default App;
