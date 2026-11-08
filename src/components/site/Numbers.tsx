import { useEffect, useRef } from "react";
import { animate } from "animejs";
import { Marquee } from "@/components/marquee";
import { languages, profile } from "@/data/profile";
import { useContributions } from "@/lib/use-contributions";

interface Stat {
  value: number;
  decimals: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

function Counter({ value, decimals, prefix = "", suffix = "" }: Omit<Stat, "label">) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const render = (v: number) =>
      (el.textContent = `${prefix}${v.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      render(value);
      return;
    }
    render(0);
    const counter = { v: 0 };
    let anim: ReturnType<typeof animate> | null = null;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        anim = animate(counter, {
          v: value,
          duration: 2200,
          ease: "outExpo",
          onUpdate: () => render(counter.v),
        });
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      anim?.pause();
    };
  }, [value, decimals, prefix, suffix]);

  return <span ref={ref} className="tabular-nums" />;
}

export default function Numbers() {
  const contributions = useContributions(profile.githubUser);

  const stats: Stat[] = [
    { value: 8.76, decimals: 2, label: "CGPA at SVNIT, out of 10" },
    { value: 7000, decimals: 0, suffix: "+", label: "hackathon participants. Sirn placed in the top 11" },
    { value: 97.22, decimals: 2, suffix: "%", label: "federated model accuracy, MedFL round five" },
    {
      value: contributions?.totalYear ?? 300,
      decimals: 0,
      suffix: contributions ? "" : "+",
      label: "GitHub contributions in the last twelve months",
    },
  ];

  return (
    <section aria-label="In numbers" className="relative border-y border-line">
      <div className="shell grid grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`flex flex-col justify-between gap-10 py-10 pr-4 lg:py-14 ${i > 0 ? "lg:border-l lg:border-line lg:pl-8" : ""} ${i % 2 === 1 ? "border-l border-line pl-4 lg:pl-8" : ""} ${i > 1 ? "border-t border-line lg:border-t-0" : ""}`}
          >
            <span className="label">0{i + 1}</span>
            <div>
              <div className="display text-[clamp(2.5rem,8vw,4rem)] lg:text-[clamp(3rem,5vw,5.5rem)]">
                <Counter value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <p className="mt-3 max-w-[24ch] text-sm text-ink-soft">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-line py-6">
        <Marquee duration={32} fadeAmount={6}>
          {[...languages, ...languages].map((l, i) => (
            <span key={`${l}-${i}`} className="flex items-center gap-10 pr-10 font-display text-[clamp(1.5rem,3vw,2.75rem)] font-medium tracking-[-0.02em] uppercase text-ink-faint">
              {l}
              <span className="size-2 rounded-full bg-signal" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
