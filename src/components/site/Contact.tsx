import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import AttractButton from "@/components/kokonutui/attract-button";
import SplitFlapText from "@/components/kokonutui/split-flap-text";
import { profile } from "@/data/profile";

const channels = [
  { label: "LinkedIn", href: profile.linkedin },
  { label: "GitHub", href: profile.github },
  { label: "Résumé (PDF)", href: profile.resume },
  { label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
];

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-contact-line]",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.3,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: root, start: "top 65%" },
        },
      );
      gsap.fromTo(
        "[data-contact-media]",
        { scale: 1.2 },
        { scale: 1, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom bottom", scrub: true } },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" ref={rootRef} className="relative isolate overflow-hidden">
      <div data-contact-media className="absolute inset-0 -z-10">
        <video
          className="h-full w-full object-cover opacity-70"
          src="/media/contact.mp4"
          poster="/media/contact-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-paper via-paper/40 to-paper/80" />
      </div>

      <div className="shell flex min-h-[100svh] flex-col justify-between gap-16 pt-[clamp(6rem,12vw,10rem)] pb-12">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="label">
            <span className="text-signal">(05)</span>&nbsp;&nbsp;Contact
          </p>
          <div className="flex items-center gap-3">
            <span className="label">Open to</span>
            <SplitFlapText
              words={["AI ENGINEERING", "ML SYSTEMS", "RAG + AGENTS", "FULL STACK"]}
              interval={2600}
              className="font-mono text-base sm:text-xl"
              tileClassName="bg-paper-raised text-ink border-line"
            />
          </div>
        </div>

        <h2 className="display text-[clamp(3.5rem,11.5vw,13rem)]">
          {["Let's build", "something", "that holds up."].map((line, i) => (
            <span key={line} className="line-mask block">
              <span data-contact-line className={`block ${i === 2 ? "text-signal" : ""}`}>
                {line}
              </span>
            </span>
          ))}
        </h2>

        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <div className="flex flex-col items-start gap-6 md:col-span-6">
            <button
              type="button"
              onClick={copyEmail}
              data-cursor={copied ? "Copied" : "Copy"}
              className="group flex items-center gap-4 text-left font-display text-[clamp(1.5rem,3.2vw,3rem)] font-medium tracking-[-0.02em]"
            >
              <span className="link-underline">{profile.email}</span>
              {copied ? (
                <Check className="size-[0.6em] text-signal" />
              ) : (
                <Copy className="size-[0.5em] text-ink-faint transition-colors group-hover:text-ink" strokeWidth={1.5} />
              )}
            </button>
            <AttractButton
              radius={72}
              density={1.2}
              onClick={() => (window.location.href = `mailto:${profile.email}?subject=Hello%20Vraj`)}
              className="h-14 min-w-52 rounded-full bg-ink px-8 font-mono text-[0.75rem] tracking-[0.08em] text-paper uppercase hover:bg-signal dark:bg-ink dark:text-paper dark:hover:bg-signal"
            >
              Start a conversation
            </AttractButton>
          </div>

          <ul className="md:col-span-5 md:col-start-8">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") || c.href.endsWith(".pdf") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center justify-between border-b border-line py-4 text-lg"
                >
                  <span className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
                    {c.label}
                  </span>
                  <ArrowUpRight className="size-4 text-ink-faint transition-all duration-500 group-hover:rotate-45 group-hover:text-signal" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
