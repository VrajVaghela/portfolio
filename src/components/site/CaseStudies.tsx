import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { caseStudies, type CaseStudy } from "@/data/profile";
import SectionHead from "./SectionHead";
import PipelineVisual from "./visuals/PipelineVisual";
import FederationVisual from "./visuals/FederationVisual";
import ModelChart from "./visuals/ModelChart";

const visuals: Record<string, () => React.ReactElement> = {
  "self-rag": PipelineVisual,
  medfl: FederationVisual,
  sirn: ModelChart,
};

function Card({ study }: { study: CaseStudy }) {
  const Visual = visuals[study.id];
  return (
    <article
      data-card-inner
      className="relative flex flex-col overflow-hidden rounded-[clamp(1rem,2vw,1.75rem)] border border-line bg-paper-raised will-change-transform lg:min-h-[calc(100svh-var(--gutter)*2-5rem)]"
    >
      <header className="flex items-center justify-between gap-4 border-b border-line px-[clamp(1.25rem,3vw,2.5rem)] py-4">
        <div className="flex items-baseline gap-4">
          <span className="label text-signal">{study.index}</span>
          <span className="label hidden sm:inline">{study.kicker}</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="label">{study.year}</span>
          <a
            href={study.href}
            target="_blank"
            rel="noreferrer"
            data-cursor="Source"
            className="group flex items-center gap-1.5 label text-ink"
          >
            <span className="link-underline">Source</span>
            <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </header>

      <div className="grid flex-1 gap-10 px-[clamp(1.25rem,3vw,2.5rem)] py-[clamp(1.5rem,2.5vw,2.25rem)] lg:grid-cols-12">
        <div className="flex flex-col justify-between gap-8 lg:col-span-7">
          <div>
            <h3 className="display text-[clamp(3.5rem,8.5vw,8.5rem)]">{study.title}</h3>
            <p className="mt-5 max-w-xl text-[clamp(1.05rem,1.3vw,1.25rem)] leading-snug text-ink">{study.summary}</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {study.metrics.map((m) => (
              <div key={m.label} className="border-t border-line pt-4">
                <div className="display text-[clamp(2.5rem,4vw,3.75rem)] tabular-nums">{m.value}</div>
                <p className="mt-2 max-w-[26ch] text-sm text-ink-soft">{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-5 lg:border-l lg:border-line lg:pl-10">
          <div className="min-h-[14rem] flex-1">{Visual && <Visual />}</div>
          <ul className="space-y-2 border-t border-line pt-5 text-[0.84rem] leading-snug text-ink-soft">
            {study.points.map((p) => (
              <li key={p} className="grid grid-cols-[0.75rem_1fr] gap-2">
                <span className="mt-2 size-1 rounded-full bg-ink-faint" />
                {p}
              </li>
            ))}
          </ul>
          <p className="font-mono text-[0.72rem] tracking-wide text-ink-faint">{study.stack.join("  /  ")}</p>
        </div>
      </div>
    </article>
  );
}

export default function CaseStudies() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const slots = gsap.utils.toArray<HTMLElement>("[data-card-slot]", root);
      slots.forEach((slot, i) => {
        const next = slots[i + 1];
        if (!next) return;
        const inner = slot.querySelector("[data-card-inner]");
        gsap.to(inner, {
          scale: 0.9,
          filter: "brightness(0.45)",
          ease: "none",
          scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="work" ref={rootRef} className="relative pb-[clamp(4rem,10vw,8rem)]">
      <SectionHead index="01" label="Selected work" aside={`${caseStudies.length} case studies`} />

      <div className="shell mt-10 mb-16 grid md:grid-cols-12">
        <h2 className="display text-[clamp(3rem,8.5vw,9rem)] md:col-span-10">
          Systems that <span className="text-ink-faint">earn</span> their answers
        </h2>
      </div>

      <div className="shell">
        {caseStudies.map((s) => (
          <div
            key={s.id}
            data-card-slot
            className="mb-6 lg:sticky lg:top-[calc(var(--gutter)+3.5rem)] lg:mb-[14vh] lg:last:mb-0"
          >
            <Card study={s} />
          </div>
        ))}
      </div>
    </section>
  );
}
