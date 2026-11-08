import { useEffect, useRef } from "react";
import gsap from "gsap";
import SectionHead from "./SectionHead";

const TEXT =
  "Most AI demos answer everything. I build the ones that check first. Pipelines that verify an answer is grounded before they speak, models that learn across hospitals without moving a single record, and forecasts that move inventory to the store about to run out.";

const EMPHASIS = new Set(["check", "first.", "grounded"]);

export default function Statement() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-word]",
        { opacity: 0.12 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.08,
          scrollTrigger: { trigger: "[data-statement]", start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="statement" ref={rootRef} className="relative py-[clamp(6rem,14vw,12rem)]">
      <SectionHead index="00" label="Approach" aside="Grounded by default" />
      <div className="shell mt-12 grid md:grid-cols-12">
        <p
          data-statement
          className="font-display text-[clamp(1.9rem,4.4vw,4.6rem)] leading-[1.02] font-medium tracking-[-0.025em] md:col-span-11 md:col-start-2"
        >
          {TEXT.split(" ").map((w, i) => (
            <span
              key={i}
              data-word
              className={EMPHASIS.has(w) ? "text-signal" : undefined}
            >
              {w}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
