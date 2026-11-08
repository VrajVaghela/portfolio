import { useEffect, useRef } from "react";
import { createTimeline, stagger } from "animejs";

interface PreloaderProps {
  onDone: () => void;
}

export default function Preloader({ onDone }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.style.display = "none";
      onDone();
      return;
    }

    const counter = { value: 0 };
    const tl = createTimeline({ defaults: { ease: "outExpo" } });

    tl.add(root.querySelectorAll("[data-pre-word]"), {
      y: ["110%", "0%"],
      duration: 900,
      delay: stagger(70),
    })
      .add(
        counter,
        {
          value: 100,
          duration: 1400,
          ease: "inOutQuart",
          onUpdate: () => {
            const v = Math.round(counter.value);
            if (countRef.current) countRef.current.textContent = String(v).padStart(3, "0");
            if (barRef.current) barRef.current.style.transform = `scaleX(${v / 100})`;
          },
        },
        0,
      )
      .add(root.querySelectorAll("[data-pre-word]"), {
        y: ["0%", "-110%"],
        duration: 600,
        ease: "inQuart",
        delay: stagger(40),
      })
      .add(root, {
        clipPath: ["inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"],
        duration: 900,
        ease: "inOutQuart",
        onBegin: onDone,
        onComplete: () => {
          root.style.display = "none";
        },
      }, "-=250");

    return () => {
      tl.revert();
    };
  }, [onDone]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[80] flex flex-col justify-between bg-paper p-[var(--gutter)] text-ink"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      aria-hidden="true"
    >
      <div className="flex justify-between label">
        <span>Portfolio</span>
        <span>Surat, IN</span>
      </div>

      <div className="display flex flex-wrap gap-x-[0.25em] text-[clamp(2.5rem,9vw,8rem)]">
        {["Grounded", "AI,", "built", "to", "hold", "up."].map((w) => (
          <span key={w} className="line-mask">
            <span data-pre-word className="inline-block" style={{ transform: "translateY(110%)" }}>
              {w}
            </span>
          </span>
        ))}
      </div>

      <div className="flex items-end justify-between gap-6">
        <div className="relative h-px flex-1 bg-line">
          <div ref={barRef} className="absolute inset-0 origin-left scale-x-0 bg-signal" />
        </div>
        <span ref={countRef} className="display text-[clamp(3rem,8vw,7rem)] tabular-nums leading-none">
          000
        </span>
      </div>
    </div>
  );
}
