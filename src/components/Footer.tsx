import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("home");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      style={{
        width: "min(1200px, calc(100% - 40px))",
        margin: "0 auto",
        padding: "40px 0 80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderTop: "1px solid var(--line)",
        color: "var(--muted)",
        fontFamily: "var(--font-mono)",
        fontSize: "0.78rem",
        letterSpacing: "0.02em",
        textTransform: "uppercase",
      }}
    >
      <p style={{ margin: 0 }}>
        © {new Date().getFullYear()} // DESIGNED & DEVELOPED FOR VRAJ VAGHELA
      </p>
      
      <a
        href="#home"
        onClick={scrollToTop}
        aria-label="Back to top"
        style={{
          display: "inline-grid",
          width: "2.5rem",
          height: "2.5rem",
          placeItems: "center",
          border: "1px solid var(--line-strong)",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.02)",
          color: "var(--ink-soft)",
          textDecoration: "none",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.borderColor = "var(--ink)";
          e.currentTarget.style.color = "#ffffff";
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.06)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "none";
          e.currentTarget.style.borderColor = "var(--line-strong)";
          e.currentTarget.style.color = "var(--ink-soft)";
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.02)";
        }}
      >
        <ArrowUp size={16} />
      </a>
    </footer>
  );
}
