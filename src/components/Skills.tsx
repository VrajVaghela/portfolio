import { useEffect, useRef, useState } from "react";
import { Code2, Layers, Database, Brain, Container, ClipboardCheck, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    icon: <Code2 size={18} />,
    title: "Languages",
    skills: [
      { name: "C++", level: "Expert" },
      { name: "Python", level: "Expert" },
      { name: "TypeScript", level: "Core" },
      { name: "JavaScript", level: "Core" },
      { name: "SQL", level: "Core" },
      { name: "HTML5", level: "Proficient" },
      { name: "CSS3", level: "Proficient" }
    ],
  },
  {
    icon: <Layers size={18} />,
    title: "Frameworks",
    skills: [
      { name: "React.js", level: "Expert" },
      { name: "Next.js", level: "Expert" },
      { name: "Node.js", level: "Core" },
      { name: "Express.js", level: "Core" },
      { name: "Vite", level: "Core" },
      { name: "Zustand", level: "Core" }
    ],
  },
  {
    icon: <Database size={18} />,
    title: "Data Stores",
    skills: [
      { name: "PostgreSQL", level: "Expert" },
      { name: "Supabase", level: "Expert" },
      { name: "MongoDB", level: "Core" },
      { name: "Qdrant", level: "Core" },
      { name: "Dexie.js", level: "Proficient" }
    ],
  },
  {
    icon: <Brain size={18} />,
    title: "ML & AI Systems",
    skills: [
      { name: "RAG Pipelines", level: "Expert" },
      { name: "NLP", level: "Expert" },
      { name: "PyTorch", level: "Core" },
      { name: "Scikit-Learn", level: "Core" },
      { name: "Demand Forecasting", level: "Core" }
    ],
  },
  {
    icon: <Container size={18} />,
    title: "Platforms & Tools",
    skills: [
      { name: "Docker", level: "Core" },
      { name: "Git & GitHub", level: "Core" },
      { name: "Linux", level: "Core" },
      { name: "REST APIs", level: "Core" },
      { name: "Postman", level: "Proficient" }
    ],
  },
  {
    icon: <ClipboardCheck size={18} />,
    title: "Product Focus",
    skills: [
      { name: "Financial Intelligence", level: "Core" },
      { name: "Document Parsing", level: "Core" },
      { name: "Federated Learning", level: "Core" },
      { name: "ML Dashboards", level: "Core" }
    ],
  },
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(0); // Default first row open

  useEffect(() => {
    // Elegant slide-in transitions on mount/scroll
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      accordionRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 72%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  const handleMouseEnter = (idx: number) => {
    setActiveIndex(idx);
  };

  const handleRowClick = (idx: number) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <section id="skills" ref={containerRef} className="section-container">
      <div ref={headerRef} style={{ marginBottom: "3rem" }}>
        <p className="eyebrow">TOOLKIT</p>
        <h2 className="section-title">ENGINEERING CAPABILITIES.</h2>
        <p style={{ color: "var(--ink-soft)", maxWidth: "580px", fontSize: "0.95rem", lineHeight: 1.6 }}>
          Comfortable navigating model training, database structures, microservice pipelines, 
          and high-fidelity user layers. Hover or tap to expand categories.
        </p>
      </div>

      <div ref={accordionRef} className="skills-accordion-container">
        {skillCategories.map((cat, idx) => {
          const isActive = activeIndex === idx;
          return (
            <div
              key={cat.title}
              className={`skills-row-item ${isActive ? "active" : ""}`}
              onMouseEnter={() => handleMouseEnter(idx)}
              onClick={() => handleRowClick(idx)}
            >
              <div className="skills-row-header">
                <div className="skills-row-left">
                  <span className="skills-row-idx">
                    {(idx + 1).toString().padStart(2, "0")}
                  </span>
                  <div className="skills-row-icon">
                    {cat.icon}
                  </div>
                  <h3 className="skills-row-title">
                    {cat.title}
                  </h3>
                </div>
                <div className="skills-row-arrow">
                  <ChevronRight size={18} />
                </div>
              </div>

              <div className="skills-row-panel">
                <div className="skill-capsules-grid">
                  {cat.skills.map((skill) => (
                    <div key={skill.name} className="skill-capsule">
                      <span>{skill.name}</span>
                      <span className="proficiency-indicator">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
