import { lazy, Suspense, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { capabilities } from "@/data/profile";
import SectionHead from "./SectionHead";

const ParticleSculpture = lazy(() => import("./ParticleSculpture"));

export default function Capabilities() {
  const rootRef = useRef<HTMLElement>(null);
  const morph = useRef(0);
  const [active, setActive] = useState(0);
  const [mountCanvas, setMountCanvas] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setMountCanvas(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    io.observe(root);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-pillar]").forEach((el, i) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 60%",
            end: "bottom 60%",
            onToggle: (self) => {
              if (self.isActive) {
                setActive(i);
                morph.current = i;
              }
            },
          },
        });
      });
    }, root);

    return () => {
      io.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section id="capabilities" ref={rootRef} className="relative py-[clamp(4rem,10vw,8rem)]">
      <SectionHead index="03" label="Capabilities" aside="Three disciplines, one stack" />

      <div className="shell mt-10 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <div className="relative h-[60svh] lg:sticky lg:top-0 lg:h-[100svh]">
            <div className="absolute inset-0">
              {mountCanvas && (
                <Suspense fallback={null}>
                  <ParticleSculpture morph={morph} />
                </Suspense>
              )}
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-10 flex items-center justify-between label">
              <span>Form {["I", "II", "III"][active]} / III</span>
              <span className="flex gap-1.5">
                {capabilities.map((c, i) => (
                  <span
                    key={c.index}
                    className={`h-px w-8 transition-colors duration-500 ${i === active ? "bg-signal" : "bg-line-strong"}`}
                  />
                ))}
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 lg:pt-[20vh]">
          {capabilities.map((c, i) => (
            <div
              key={c.index}
              data-pillar
              className={`flex min-h-[70svh] flex-col justify-center border-t border-line py-12 transition-opacity duration-700 lg:min-h-[85svh] ${
                i === active ? "opacity-100" : "lg:opacity-30"
              }`}
            >
              <span className="label text-signal">{c.index}</span>
              <h3 className="display mt-4 text-[clamp(2.75rem,6vw,6rem)]">{c.title}</h3>
              <p className="mt-6 max-w-md text-[clamp(1rem,1.3vw,1.2rem)] leading-snug text-ink-soft">{c.body}</p>
              <ul className="mt-8 flex max-w-md flex-wrap gap-2">
                {c.tools.map((t) => (
                  <li key={t} className="rounded-full border border-line-strong px-3.5 py-1.5 font-mono text-[0.72rem] text-ink">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
