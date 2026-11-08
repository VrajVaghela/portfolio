import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDownRight } from "lucide-react";
import { SpecialText } from "@/components/special-text";
import FitText from "./FitText";
import { scrollToTarget } from "@/lib/smooth-scroll";

const NAME = "VRAJ VAGHELA";

export default function Hero({ ready }: { ready: boolean }) {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !ready) return;

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.fromTo(
        "[data-hero-char]",
        { yPercent: 105, y: 0 },
        { yPercent: 0, y: 0, duration: reduce ? 0 : 1.4, ease: "expo.out", stagger: 0.045, delay: 0.15 },
      );
      gsap.fromTo(
        "[data-hero-fade]",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: reduce ? 0 : 1.2, ease: "expo.out", stagger: 0.08, delay: 0.55 },
      );
      gsap.fromTo(
        videoRef.current,
        { scale: 1.25 },
        { scale: 1.05, duration: reduce ? 0 : 2.4, ease: "expo.out" },
      );

      if (reduce) return;

      const st = { trigger: root, start: "top top", end: "bottom top", scrub: true };
      gsap.to("[data-hero-name]", { yPercent: -35, ease: "none", scrollTrigger: st });
      gsap.to("[data-hero-copy]", { yPercent: -120, opacity: 0, ease: "none", scrollTrigger: st });
      gsap.to("[data-hero-media]", { yPercent: 25, ease: "none", scrollTrigger: st });
      gsap.to("[data-hero-shade]", { opacity: 1, ease: "none", scrollTrigger: st });
    }, root);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative isolate flex h-[100svh] min-h-[640px] flex-col justify-end overflow-hidden"
    >
      <div data-hero-media className="absolute inset-0 -z-10">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src="/media/hero.mp4"
          poster="/media/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/50 via-paper/10 to-paper" />
        <div data-hero-shade className="absolute inset-0 bg-paper opacity-0" />
      </div>

      <div data-hero-copy className="shell grid gap-10 pb-10 md:grid-cols-12 md:items-end md:pb-14">
        <p
          data-hero-fade
          className="max-w-md text-[clamp(1.05rem,1.5vw,1.35rem)] leading-snug text-ink md:col-span-6 lg:col-span-5"
        >
          I build AI that knows when not to answer. Retrieval that critiques itself, models trained on data
          that never moves, and forecasts that ship stock before shelves run dry.
        </p>

        <dl
          data-hero-fade
          className="grid grid-cols-2 gap-x-8 gap-y-4 md:col-span-4 md:col-start-8 lg:col-span-3 lg:col-start-9"
        >
          {[
            ["Studying", "CSE · SVNIT ’27"],
            ["Based in", "Surat, India"],
            ["Focus", "RAG · Agents · ML"],
            ["Status", "Open to roles"],
          ].map(([k, v], i) => (
            <div key={k}>
              <dt className="label text-ink-faint">{k}</dt>
              <dd className="mt-1 text-sm text-ink">
                {ready ? (
                  <SpecialText delay={0.8 + i * 0.12} speed={18} className="h-auto font-sans font-normal">
                    {v}
                  </SpecialText>
                ) : (
                  <span className="opacity-0">{v}</span>
                )}
              </dd>
            </div>
          ))}
        </dl>

        <button
          type="button"
          data-hero-fade
          data-cursor="Scroll"
          onClick={() => scrollToTarget("#statement")}
          className="hidden size-14 place-items-center justify-self-end rounded-full border border-line-strong text-ink transition-colors duration-300 hover:bg-ink hover:text-paper md:col-span-1 md:col-start-12 md:grid"
          aria-label="Scroll to introduction"
        >
          <ArrowDownRight className="size-5" strokeWidth={1.5} />
        </button>
      </div>

      <div data-hero-name className="shell pb-[clamp(0.75rem,2vw,2rem)]">
        <h1 aria-label="Vraj Vaghela">
          <FitText className="display leading-[0.8]">
            {NAME.split("").map((c, i) => (
              <span key={i} className="line-mask" aria-hidden="true">
                <span data-hero-char className="inline-block" style={{ transform: "translateY(105%)" }}>
                  {c === " " ? "\u00A0" : c}
                </span>
              </span>
            ))}
          </FitText>
        </h1>
      </div>
    </section>
  );
}
