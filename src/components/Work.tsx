import { useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "FinSight AI",
    type: "AI Platform",
    desc: "Enterprise-grade financial document intelligence platform with structural layout parsing, dense vector search, hybrid retrieval rerankers, refusal gates, and generative UI dashboards.",
    bullets: [
      "Docling-based layout extraction for complex PDF tables.",
      "Dense vector, BM25 keyword, and Cross-Encoder reranking.",
      "Voice workflow with STT, TTS, and client barge-in.",
    ],
    tags: ["Python", "RAG", "Qdrant", "GenUI"],
    link: "https://github.com/VrajVaghela/FinSight",
    isGithub: true,
  },
  {
    title: "Enfinity",
    type: "Adaptive NLP Reading",
    desc: "Distraction-free adaptive reading platform utilizing a custom Comprehension Friction engine that tracks real-time struggles and triggers dynamic per-paragraph NLP assistance.",
    bullets: [
      "Tracked dwell time, hesitation, and scroll regressions.",
      "Built automatic, prompt-based, and manual support modes.",
      "Supabase OAuth, Dexie offline sync, and Gemini API.",
    ],
    tags: ["React", "TypeScript", "Zustand", "NLP"],
    link: "https://dashing-nougat-c66726.netlify.app/",
    isGithub: false,
  },
  {
    title: "MedFL",
    type: "Federated Learning",
    desc: "Privacy-preserving federated model training platform across decentralized client hospital nodes, containerized as a robust 6-service aggregates architecture.",
    bullets: [
      "Dynamic Weighted Federated Aggregation aggregation scheme.",
      "Decentralized secure clients using isolated APIs.",
      "Containerized microservices using Docker.",
    ],
    tags: ["Python", "PyTorch", "Docker", "REST APIs"],
    link: "https://github.com/Dhruvi-Rana09/MedFL",
    isGithub: true,
  },
  {
    title: "Retail Stockout ML",
    type: "Demand Forecasting",
    desc: "Decision support ML platform forecasting store inventory exhaust and recommending intelligent inter-store stock transfers before depletion.",
    bullets: [
      "Model achieved demand forecasting R2 around 0.97.",
      "Predictive inter-store redistribution path search.",
      "Comprehensive scikit-learn analytics framework.",
    ],
    tags: ["Python", "Scikit-Learn", "React", "Supabase"],
    link: "https://github.com/NityaSingh77/Sparkathon",
    isGithub: true,
  },
  {
    title: "AlgoX",
    type: "Trading Backtesting",
    desc: "Quantitative strategy simulator for importing CSV asset ticks, assessing 9 trading algorithms, compiling performance stats, and charting indicators.",
    bullets: [
      "Implemented 20+ indicators (MACD, RSI, Bollinger).",
      "Robust client-side backtesting speeds.",
      "Fully responsive charting interface.",
    ],
    tags: ["React 19", "TypeScript", "Vite", "Tailwind"],
    link: "https://github.com/VrajVaghela/algoX",
    isGithub: true,
  },
  {
    title: "NIDS Framework",
    type: "Security ML",
    desc: "Research-grade Network Intrusion Detection System built on the NSL-KDD dataset using supervised models, cluster anomalies, and Optuna tuning.",
    bullets: [
      "Integrated SHAP explainable intelligence plots.",
      "Used SMOTE oversampling to address class imbalances.",
      "Optimized classifiers with Optuna hyperparameter sweeps.",
    ],
    tags: ["Python", "Jupyter", "SMOTE", "SHAP"],
    link: "https://github.com/VrajVaghela/DSlab_Project_Network_Intrusion_detection_Kirtan_Sodagar_U23CS051",
    isGithub: true,
  },
];

export default function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const scrollSection = scrollSectionRef.current;
    if (!track || !scrollSection) return;

    // Horizontal Scrolling capture logic using GSAP ScrollTrigger
    const getScrollAmount = () => {
      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      return -(trackWidth - viewportWidth + 60); // elegant margin buffer
    };

    const scrollTween = gsap.fromTo(
      track,
      { x: 0 },
      {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: scrollSection,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
        },
      }
    );

    // Header reveal scroll animation
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: scrollSection,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      scrollTween.scrollTrigger?.kill();
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    card.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${y * -12}deg) translateY(-8px)`;
    card.style.setProperty("--local-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--local-y", `${e.clientY - rect.top}px`);
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLElement>) => {
    const card = e.currentTarget;
    card.style.transform = "none";
  };

  return (
    <div ref={scrollSectionRef} style={{ overflow: "hidden", background: "var(--bg-darker)" }}>
      <div
        ref={containerRef}
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 0",
          position: "relative",
        }}
      >
        {/* Section Header */}
        <div
          ref={headerRef}
          style={{
            width: "min(1200px, calc(100% - 40px))",
            margin: "0 auto 3rem",
            position: "relative",
            zIndex: 10,
          }}
        >
          <p className="eyebrow">SELECTED WORK</p>
          <h2 className="section-title" style={{ marginBottom: "0.5rem" }}>
            PROJECTS WITH SYSTEM DEPTH.
          </h2>
          <p style={{ color: "var(--ink-soft)", maxWidth: "580px", fontSize: "0.95rem" }}>
            A high-craft catalog of public builds showing engineering rigour: RAG pipelines, 
            adaptive NLP modules, and privacy-preserving federated nodes.
          </p>
        </div>

        {/* Gravity-Defying Horizontal Kinetic Slider Track */}
        <div className="kinetic-viewport" style={{ width: "100%", overflow: "visible" }}>
          <div
            ref={trackRef}
            className="kinetic-card-wrapper"
            style={{
              display: "flex",
              gap: "2rem",
              paddingLeft: "min(1200px, calc(50vw - 600px))",
              paddingRight: "10vw",
              width: "max-content",
            }}
          >
            {projects.map((project) => (
              <article
                key={project.title}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
                style={{
                  width: "420px",
                  height: "440px",
                  borderRadius: "12px",
                  border: "1px solid var(--line)",
                  background: "var(--bg-panel)",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "var(--shadow-diffused)",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className="kinetic-project-card"
              >
                {/* Magnetic mouse-trailing overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 0,
                    pointerEvents: "none",
                    background: "radial-gradient(circle at var(--local-x, 50%) var(--local-y, 50%), rgba(99, 102, 241, 0.08) 0%, transparent 60%)",
                  }}
                />

                <div style={{ position: "relative", zIndex: 2 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--accent-gold)",
                        border: "1px solid var(--line-strong)",
                        borderRadius: "4px",
                        padding: "0.2rem 0.5rem",
                      }}
                    >
                      {project.type}
                    </span>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${project.title}`}
                      style={{
                        display: "inline-grid",
                        width: "2.1rem",
                        height: "2.1rem",
                        placeItems: "center",
                        border: "1px solid var(--line-strong)",
                        borderRadius: "50%",
                        background: "rgba(255, 255, 255, 0.03)",
                        color: "var(--ink)",
                        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "rotate(12deg) scale(1.08)";
                        e.currentTarget.style.borderColor = "var(--ink)";
                        e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "none";
                        e.currentTarget.style.borderColor = "var(--line-strong)";
                        e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.03)";
                      }}
                    >
                      {project.isGithub ? (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                      ) : (
                        <ExternalLink size={15} />
                      )}
                    </a>
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.45rem",
                      fontWeight: 700,
                      color: "#ffffff",
                      marginBottom: "0.6rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {project.title}
                  </h3>
                  
                  <p
                    style={{
                      color: "var(--ink-soft)",
                      fontSize: "0.85rem",
                      lineHeight: 1.5,
                      marginBottom: "1rem",
                    }}
                  >
                    {project.desc}
                  </p>

                  <ul
                    style={{
                      display: "grid",
                      gap: "0.35rem",
                      paddingLeft: "1.1rem",
                      color: "var(--ink-soft)",
                      fontSize: "0.78rem",
                      lineHeight: 1.45,
                    }}
                  >
                    {project.bullets.map((b, bidx) => (
                      <li key={bidx}>{b}</li>
                    ))}
                  </ul>
                </div>

                <div
                  style={{
                    position: "relative",
                    zIndex: 2,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.35rem",
                    marginTop: "1.5rem",
                  }}
                >
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        border: "1px solid var(--line-strong)",
                        borderRadius: "4px",
                        background: "rgba(1, 1, 2, 0.4)",
                        color: "var(--ink-soft)",
                        fontSize: "0.68rem",
                        fontWeight: 600,
                        padding: "0.15rem 0.4rem",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      
      {/* Scroll adjustments styling */}
      <style>{`
        .kinetic-project-card:hover {
          border-color: var(--accent-indigo) !important;
          box-shadow: 0 20px 45px rgba(99, 102, 241, 0.08), 0 0 25px rgba(0, 0, 0, 0.7) !important;
        }
      `}</style>
    </div>
  );
}
