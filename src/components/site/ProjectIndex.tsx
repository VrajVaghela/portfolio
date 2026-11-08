import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { profile, projectIndex } from "@/data/profile";
import SectionHead from "./SectionHead";

export default function ProjectIndex() {
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const preview = previewRef.current;
    const list = listRef.current;
    if (!preview || !list || !window.matchMedia("(pointer: fine)").matches) return;

    const xTo = gsap.quickTo(preview, "x", { duration: 0.7, ease: "power3" });
    const yTo = gsap.quickTo(preview, "y", { duration: 0.7, ease: "power3" });
    const rTo = gsap.quickTo(preview, "rotation", { duration: 0.9, ease: "power3" });
    let lastX = 0;

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      rTo(gsap.utils.clamp(-8, 8, (e.clientX - lastX) * 0.4));
      lastX = e.clientX;
    };
    list.addEventListener("pointermove", move);
    return () => list.removeEventListener("pointermove", move);
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (!list || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-row]", {
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.06,
        scrollTrigger: { trigger: list, start: "top 80%" },
      });
    }, list);
    return () => ctx.revert();
  }, []);

  const current = active === null ? null : projectIndex[active];

  return (
    <section id="index" className="relative py-[clamp(4rem,10vw,8rem)]">
      <SectionHead
        index="02"
        label="Index"
        aside={
          <a href={profile.github} target="_blank" rel="noreferrer" className="link-underline text-ink">
            All repositories ↗
          </a>
        }
      />

      <div className="shell mt-10 mb-12 grid gap-6 md:grid-cols-12 md:items-end">
        <h2 className="display text-[clamp(3rem,8.5vw,9rem)] md:col-span-8">More builds</h2>
        <p className="max-w-sm text-ink-soft md:col-span-4 md:justify-self-end">
          Agents, retrieval systems and the odd Rust firewall. Built for hackathons, courses, or because the
          problem wouldn&apos;t leave me alone.
        </p>
      </div>

      <div ref={listRef} className="shell" onPointerLeave={() => setActive(null)}>
        <div className="hidden grid-cols-12 gap-4 border-b border-line pb-3 label md:grid">
          <span className="col-span-1">No.</span>
          <span className="col-span-5">Project</span>
          <span className="col-span-3">Type</span>
          <span className="col-span-2">Stack</span>
          <span className="col-span-1 text-right">Year</span>
        </div>

        {projectIndex.map((p, i) => (
          <a
            key={p.title}
            data-row
            href={p.href}
            target="_blank"
            rel="noreferrer"
            data-cursor="Open"
            onPointerEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            className="group relative grid grid-cols-12 items-baseline gap-x-4 gap-y-2 border-b border-line py-6 transition-colors duration-500 md:py-7"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100"
            />
            <span className="relative col-span-2 label transition-colors duration-500 group-hover:text-paper md:col-span-1">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="relative col-span-10 flex items-center gap-3 font-display text-[clamp(1.9rem,4.4vw,4.25rem)] leading-none font-semibold tracking-[-0.03em] uppercase transition-[color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-3 group-hover:text-paper md:col-span-5">
              {p.title}
              <ArrowUpRight className="size-[0.5em] -translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" strokeWidth={1.5} />
            </span>
            <span className="relative col-span-10 col-start-3 text-sm text-ink-soft transition-colors duration-500 group-hover:text-paper/70 md:col-span-3 md:col-start-auto md:text-base">
              {p.kind}
            </span>
            <span className="relative col-span-10 col-start-3 font-mono text-[0.72rem] text-ink-faint transition-colors duration-500 group-hover:text-paper/60 md:col-span-2 md:col-start-auto">
              {p.stack}
            </span>
            <span className="relative hidden text-right label transition-colors duration-500 group-hover:text-paper md:col-span-1 md:block">
              {p.year}
            </span>
            <p className="relative col-span-10 col-start-3 max-w-xl text-sm text-ink-soft md:hidden">{p.blurb}</p>
          </a>
        ))}
      </div>

      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-30 hidden md:block"
      >
        <AnimatePresence mode="popLayout">
          {current && (
            <motion.div
              key={current.title}
              initial={{ opacity: 0, scale: 0.6, clipPath: "inset(50% 0 50% 0)" }}
              animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0 0% 0)" }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="ml-8 -mt-40 flex h-80 w-[19rem] flex-col justify-between rounded-2xl p-6 text-[#0a0a09] shadow-2xl"
              style={{ background: current.tone }}
            >
              <div className="flex justify-between font-mono text-[0.68rem] tracking-wider uppercase">
                <span>{current.kind}</span>
                <span>{current.year}</span>
              </div>
              <div>
                <div className="font-display text-5xl leading-[0.9] font-semibold tracking-[-0.03em] uppercase">
                  {current.title}
                </div>
                <p className="mt-4 text-[0.82rem] leading-snug">{current.blurb}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
