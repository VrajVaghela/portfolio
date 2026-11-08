import { useEffect, useRef } from "react";
import { ArrowDownRight, FileText } from "lucide-react";
import gsap from "gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLParagraphElement>(null);
  const ledeRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Staggered Intro Animation using GSAP
    const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });
    
    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, delay: 0.2 }
    );
    
    tl.fromTo(
      titleRef.current,
      { opacity: 0, scale: 1.02, letterSpacing: "0.08em" },
      { opacity: 1, scale: 1, letterSpacing: "-0.03em", duration: 1.6 },
      "-=0.9"
    );
    
    tl.fromTo(
      ledeRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0 },
      "-=1.1"
    );
    
    tl.fromTo(
      actionsRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0 },
      "-=0.95"
    );

    tl.fromTo(
      bottomRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 },
      "-=0.8"
    );
  }, []);

  const handleScrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("work");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        padding: "140px 0 80px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        borderBottom: "1px solid var(--line)",
      }}
    >


      <div
        style={{
          width: "min(1200px, calc(100% - 40px))",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        <p ref={badgeRef} className="tech-pill" style={{ opacity: 0 }}>
          SYSTEMS & DATA LABS // SVNIT
        </p>

        <h1 ref={titleRef} className="title-massive" style={{ opacity: 0, marginBottom: "0.2rem" }}>
          ENGINEERING <br />
          INTELLECT.
        </h1>

        <p
          ref={ledeRef}
          style={{
            opacity: 0,
            maxWidth: "680px",
            color: "var(--ink-soft)",
            fontSize: "clamp(1rem, 1.3vw, 1.18rem)",
            lineHeight: 1.6,
          }}
        >
          Building high-performance machine learning systems, privacy-preserving networks,
          and intelligent document AI.
        </p>

        <div ref={actionsRef} style={{ opacity: 0, display: "flex", flexWrap: "wrap", gap: "0.8rem", marginTop: "0.5rem" }}>
          <a href="#work" onClick={handleScrollToWork} className="btn btn-primary">
            <ArrowDownRight size={16} />
            View Work
          </a>
          <a href="/assets/vraj-resume.pdf" target="_blank" rel="noreferrer" className="btn">
            <FileText size={16} />
            Resume
          </a>
        </div>

        {/* Floating Dock & Status Row */}
        <div
          ref={bottomRef}
          style={{
            opacity: 0,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2rem",
            marginTop: "2.5rem",
            width: "100%",
          }}
        >
          {/* Social Dock */}
          <div style={{ position: "relative", width: "fit-content" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                border: "1px solid var(--line)",
                borderRadius: "8px",
                background: "var(--bg-panel)",
                boxShadow: "var(--shadow-diffused)",
              }}
            />
            <div style={{ position: "relative", display: "flex", gap: "0.3rem", padding: "0.35rem" }}>
              <a
                href="https://github.com/VrajVaghela"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="social-dock-item"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/vraj-vaghela-950219237/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="social-dock-item"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="mailto:vrjvghl@gmail.com"
                aria-label="Email"
                className="social-dock-item"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Active Matte Status card */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              border: "1px solid var(--line-strong)",
              borderRadius: "100px",
              background: "var(--bg-panel)",
              color: "var(--ink-soft)",
              fontSize: "0.85rem",
              padding: "0.5rem 1rem",
              boxShadow: "var(--shadow-diffused)",
            }}
          >
            <span
              style={{
                width: "0.5rem",
                height: "0.5rem",
                borderRadius: "50%",
                background: "var(--accent-emerald)",
                boxShadow: "0 0 10px var(--accent-emerald)",
                animation: "pulse-soft 2s infinite ease-in-out",
              }}
            />
            <span>Open to internships, research collaborations, and ambitious builds.</span>
          </div>
        </div>
      </div>

      <style>{`
        .social-dock-item {
          display: grid;
          width: 2.3rem;
          height: 2.3rem;
          place-items: center;
          border-radius: 6px;
          color: var(--ink-soft);
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .social-dock-item:hover {
          color: #ffffff;
          background-color: rgba(255, 255, 255, 0.05);
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}
