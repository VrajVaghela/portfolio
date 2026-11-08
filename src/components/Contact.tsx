import { useEffect, useRef } from "react";
import { Mail, Phone } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const contactChannels = [
  {
    icon: <Mail size={16} />,
    label: "vrjvghl@gmail.com",
    href: "mailto:vrjvghl@gmail.com",
  },
  {
    icon: <Phone size={16} />,
    label: "+91 96012 81995",
    href: "tel:+919601281995",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    label: "LinkedIn Profile",
    href: "https://www.linkedin.com/in/vraj-vaghela-950219237/",
    target: "_blank",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
    label: "GitHub Profile",
    href: "https://github.com/VrajVaghela",
    target: "_blank",
  },
];

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      leftColRef.current,
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
      rightColRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section id="contact" ref={containerRef} className="section-container" style={{ paddingBottom: "120px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 0.95fr",
          gap: "4rem",
          alignItems: "center",
        }}
        className="contact-split-grid"
      >
        {/* Left side lable */}
        <div ref={leftColRef} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <p className="eyebrow">CONTACT</p>
          <h2 className="section-title" style={{ margin: 0 }}>
            LET US BUILD <br />
            SOMETHING SHARP.
          </h2>
          <p
            style={{
              color: "var(--ink-soft)",
              fontSize: "1rem",
              lineHeight: 1.6,
              maxWidth: "480px",
              marginTop: "0.5rem",
            }}
          >
            I am especially interested in AI products, ML infrastructure, research-heavy prototypes, 
            and full-stack systems where engineering detail matters.
          </p>
        </div>

        {/* Right side connection tiles */}
        <div ref={rightColRef} style={{ display: "grid", gap: "0.75rem" }}>
          {contactChannels.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              target={channel.target}
              rel={channel.target ? "noreferrer" : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                borderRadius: "8px",
                border: "1px solid var(--line-strong)",
                background: "rgba(255, 255, 255, 0.01)",
                color: "var(--ink)",
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                fontWeight: 600,
                padding: "1rem 1.4rem",
                textDecoration: "none",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className="contact-link-tile"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateX(8px)";
                e.currentTarget.style.borderColor = "var(--accent-indigo)";
                e.currentTarget.style.backgroundColor = "var(--bg-panel-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.borderColor = "var(--line-strong)";
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.01)";
              }}
            >
              <div
                style={{
                  display: "grid",
                  placeItems: "center",
                  color: "var(--accent-cyan)",
                }}
              >
                {channel.icon}
              </div>
              <span style={{ flex: 1 }}>{channel.label}</span>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .contact-split-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
