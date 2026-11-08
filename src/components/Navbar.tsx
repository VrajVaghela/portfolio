import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Section highlighters
      const sections = ["home", "work", "skills", "about", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle("nav-open", !isOpen);
  };

  const handleNavClick = (sectionId: string) => {
    setIsOpen(false);
    document.body.classList.remove("nav-open");
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        zIndex: 50,
        borderBottom: isScrolled ? "1px solid var(--line)" : "1px solid transparent",
        background: isScrolled ? "rgba(3, 3, 3, 0.72)" : "transparent",
        backdropFilter: isScrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(20px)" : "none",
        transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <nav
        style={{
          width: "min(1200px, calc(100% - 40px))",
          minHeight: "72px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("home");
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.7rem",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            fontSize: "1.1rem",
            textDecoration: "none",
            color: "var(--ink)",
          }}
        >
          <span
            style={{
              position: "relative",
              display: "grid",
              width: "2.1rem",
              height: "2.1rem",
              placeItems: "center",
              border: "1px solid var(--line-strong)",
              borderRadius: "8px",
              overflow: "hidden",
              background: "linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))",
              color: "#ffffff",
              fontSize: "0.72rem",
              fontWeight: 900,
            }}
          >
            VV
          </span>
          <span style={{ transition: "opacity 0.3s ease" }}>Vraj Vaghela</span>
        </a>

        {/* Desktop Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
            border: "1px solid var(--line-strong)",
            borderRadius: "999px",
            background: "rgba(10, 10, 15, 0.4)",
            padding: "0.25rem",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          }}
          className="desktop-nav"
        >
          {["work", "skills", "about", "contact"].map((sec) => (
            <a
              key={sec}
              href={`#${sec}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(sec);
              }}
              style={{
                borderRadius: "999px",
                color: activeSection === sec ? "#ffffff" : "var(--ink-soft)",
                fontSize: "0.85rem",
                fontWeight: 600,
                padding: "0.45rem 1rem",
                textDecoration: "none",
                background: activeSection === sec ? "rgba(255, 255, 255, 0.06)" : "transparent",
                boxShadow: activeSection === sec ? "inset 0 1px 0 rgba(255,255,255,0.05)" : "none",
                transition: "all 0.25s ease",
                textTransform: "capitalize",
              }}
              onMouseEnter={(e) => {
                if (activeSection !== sec) {
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== sec) {
                  e.currentTarget.style.color = "var(--ink-soft)";
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              {sec}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          style={{
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            width: "2.4rem",
            height: "2.4rem",
            border: "1px solid var(--line-strong)",
            borderRadius: "8px",
            background: "rgba(255, 255, 255, 0.03)",
            color: "var(--ink)",
            cursor: "pointer",
            outline: "none",
            transition: "all 0.2s ease",
          }}
          className="mobile-nav-toggle"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        {/* Mobile Menu Panel */}
        {isOpen && (
          <div
            style={{
              position: "fixed",
              top: "72px",
              left: "15px",
              right: "15px",
              display: "flex",
              flexDirection: "column",
              border: "1px solid var(--line-strong)",
              borderRadius: "12px",
              background: "rgba(10, 10, 15, 0.95)",
              padding: "0.4rem",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "var(--shadow-diffused)",
              zIndex: 49,
            }}
          >
            {["work", "skills", "about", "contact"].map((sec) => (
              <a
                key={sec}
                href={`#${sec}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(sec);
                }}
                style={{
                  padding: "0.8rem 1rem",
                  borderRadius: "8px",
                  color: activeSection === sec ? "#ffffff" : "var(--ink-soft)",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  background: activeSection === sec ? "rgba(255,255,255,0.06)" : "transparent",
                  textTransform: "capitalize",
                  transition: "all 0.2s ease",
                }}
              >
                {sec}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Styled JSX for Responsive elements */}
      <style>{`
        @media (max-width: 720px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-nav-toggle {
            display: inline-flex !important;
          }
        }
      `}</style>
    </header>
  );
}
