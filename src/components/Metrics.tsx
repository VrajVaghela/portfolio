import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const metricData = [
  { id: "01", val: "8.76 CGPA", text: "B.Tech CSE at SVNIT, expected May 2027." },
  { id: "02", val: "12+ repos", text: "Recent public work across Python, TypeScript, and React." },
  { id: "03", val: "Top 11 / 7000+", text: "Selected in a national innovation hackathon." },
  { id: "04", val: "AI + Product", text: "RAG, federated learning, forecasting, and responsive interfaces." },
];

export default function Metrics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="section-container" style={{ padding: "40px 0 80px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1rem",
        }}
      >
        {metricData.map((item, idx) => (
          <div
            key={item.id}
            ref={(el) => {
              if (el) cardsRef.current[idx] = el;
            }}
            style={{
              position: "relative",
              minHeight: "160px",
              borderRadius: "12px",
              padding: "1.5rem",
              border: "1px solid var(--line)",
              background: "var(--bg-panel)",
              boxShadow: "var(--shadow-diffused)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, background-color 0.4s ease",
            }}
            className="metric-card-item"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.borderColor = "var(--accent-indigo)";
              e.currentTarget.style.backgroundColor = "var(--bg-panel-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.borderColor = "var(--line)";
              e.currentTarget.style.backgroundColor = "var(--bg-panel)";
            }}
          >
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-mono)",
                color: "var(--accent-indigo)",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
            >
              {item.id}
            </span>
            <div>
              <strong
                style={{
                  display: "block",
                  fontFamily: "var(--font-display)",
                  fontSize: "1.45rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  lineHeight: 1.1,
                  marginBottom: "0.4rem",
                }}
              >
                {item.val}
              </strong>
              <p
                style={{
                  margin: 0,
                  color: "var(--ink-soft)",
                  fontSize: "0.85rem",
                  lineHeight: 1.4,
                }}
              >
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
