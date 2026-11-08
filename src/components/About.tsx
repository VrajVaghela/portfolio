import { useEffect, useRef } from "react";
import { Award, Calendar } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      leftColRef.current,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      rightColRef.current,
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section id="about" ref={containerRef} className="section-container">
      {/* Section Header */}
      <div ref={headerRef} style={{ marginBottom: "3rem" }}>
        <p className="eyebrow">BACKGROUND</p>
        <h2 className="section-title">THE ENGINEERING ROADMAP.</h2>
        <p style={{ color: "var(--ink-soft)", maxWidth: "580px", fontSize: "0.95rem" }}>
          Student engineer at SVNIT with a systems-first habit and a history of building high-performance models.
        </p>
      </div>

      {/* Spacious Asymmetric Split Timelines */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 0.7fr",
          gap: "2.5rem",
          alignItems: "start",
        }}
        className="about-split-grid"
      >
        {/* Left timeline details */}
        <div ref={leftColRef} style={{ display: "grid", gap: "1rem" }}>
          {/* Timeline Node 1 */}
          <div
            style={{
              position: "relative",
              borderRadius: "12px",
              padding: "2rem",
              border: "1px solid var(--line)",
              background: "var(--bg-panel)",
              boxShadow: "var(--shadow-diffused)",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-gold)" }}>
              <Calendar size={14} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em" }}>
                AUG 2023 - PRESENT
              </span>
            </div>
            
            <h3 style={{ fontFamily: "var(--font-body)", fontSize: "1.25rem", color: "#ffffff", fontWeight: 700, marginTop: "0.2rem" }}>
              Sardar Vallabhbhai National Institute of Technology
            </h3>
            
            <p style={{ color: "var(--accent-indigo)", fontSize: "0.85rem", fontWeight: 600 }}>
              B.Tech in Computer Science and Engineering // CGPA: 8.76 / 10.0
            </p>
            
            <p style={{ color: "var(--ink-soft)", fontSize: "0.88rem", lineHeight: 1.5, margin: 0 }}>
              Pursuing computer science fundamentals with core focus on distributed databases, algorithms, and practical machine learning platforms. Graduation expected May 2027.
            </p>
          </div>

          {/* Timeline Node 2 */}
          <div
            style={{
              position: "relative",
              borderRadius: "12px",
              padding: "2rem",
              border: "1px solid var(--line)",
              background: "var(--bg-panel)",
              boxShadow: "var(--shadow-diffused)",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-gold)" }}>
              <Calendar size={14} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em" }}>
                JUN 2022 - APR 2023
              </span>
            </div>
            
            <h3 style={{ fontFamily: "var(--font-body)", fontSize: "1.25rem", color: "#ffffff", fontWeight: 700, marginTop: "0.2rem" }}>
              Netaji Model School
            </h3>
            
            <p style={{ color: "var(--accent-indigo)", fontSize: "0.85rem", fontWeight: 600 }}>
              Senior Secondary // GHSEB Science // 82%
            </p>
            
            <p style={{ color: "var(--ink-soft)", fontSize: "0.88rem", lineHeight: 1.5, margin: 0 }}>
              Focused on core mathematics, physics, and programming foundations, graduating with GHSEB honours.
            </p>
          </div>
        </div>

        {/* Right timeline details */}
        <div ref={rightColRef}>
          <div
            style={{
              borderRadius: "12px",
              padding: "2.2rem 2rem",
              border: "1px solid var(--line)",
              background: "var(--bg-panel)",
              boxShadow: "var(--shadow-diffused)",
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
              height: "100%",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                width: "2.6rem",
                height: "2.6rem",
                placeItems: "center",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                background: "rgba(245, 158, 11, 0.05)",
                border: "1px solid rgba(245, 158, 11, 0.15)",
                color: "var(--accent-gold)",
              }}
            >
              <Award size={20} />
            </div>

            <div>
              <h3
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  marginBottom: "0.5rem",
                }}
              >
                Hackathon Recognition
              </h3>
              
              <p
                style={{
                  color: "var(--ink-soft)",
                  fontSize: "0.88rem",
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                Selected among the **top 11 teams out of 7,000+ national participants** in a prestigious, high-fidelity innovation hackathon. Researched and prototyped demand predictors under extreme time pressure.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .about-split-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
