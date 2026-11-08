import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "@/data/profile";
import { scrollToTarget, setScrollLocked } from "@/lib/smooth-scroll";
import { useLocalTime } from "@/lib/use-local-time";

const links = [
  { href: "#work", label: "Work" },
  { href: "#index", label: "Index" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#record", label: "Record" },
  { href: "#contact", label: "Contact" },
];

function RollLink({ label }: { label: string }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-full">
        {label}
      </span>
      <span className="absolute inset-0 translate-y-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0">
        {label}
      </span>
    </span>
  );
}

export default function Nav({ ready }: { ready: boolean }) {
  const [open, setOpen] = useState(false);
  const time = useLocalTime(profile.timezone);

  useEffect(() => {
    setScrollLocked(open);
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    scrollToTarget(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className="fixed inset-x-0 top-0 z-50 mix-blend-difference text-[#f2efe8]"
      >
        <div className="shell flex items-center justify-between py-5">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              go("#top");
            }}
            className="font-display text-lg font-semibold tracking-tight"
            aria-label="Vraj Vaghela, back to top"
          >
            VV<sup className="ml-0.5 text-[0.55em]">©26</sup>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(l.href);
                }}
                className="group label text-[#f2efe8]"
              >
                <RollLink label={l.label} />
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 label text-[#f2efe8] md:flex">
            <span className="relative flex size-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#f2efe8] opacity-60" />
              <span className="relative size-1.5 rounded-full bg-[#f2efe8]" />
            </span>
            <span className="tabular-nums">Surat {time} IST</span>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="label text-[#f2efe8] md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-end bg-paper px-[var(--gutter)] pb-10 md:hidden"
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(l.href);
                  }}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="display flex items-baseline justify-between border-b border-line py-3 text-5xl"
                >
                  {l.label}
                  <span className="label">0{i + 1}</span>
                </motion.a>
              ))}
            </nav>
            <p className="label mt-8 tabular-nums">Surat · {time} IST</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
