import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * A dot that trails the pointer and swells into a labelled disc over anything
 * marked with `data-cursor="Label"`. Only mounts for fine pointers.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [enabled] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const dot = dotRef.current;
    if (!enabled || !dot) return;

    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(dot, "x", { duration: 0.45, ease: "power3" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.45, ease: "power3" });

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor], a, button");
      if (!target) {
        setLabel(null);
        dot.dataset.state = "idle";
        return;
      }
      const text = target.dataset.cursor;
      setLabel(text ?? null);
      dot.dataset.state = text ? "label" : "link";
    };
    const leave = () => (dot.dataset.state = "hidden");

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      data-state="hidden"
      aria-hidden="true"
      className="group pointer-events-none fixed top-0 left-0 z-[70]"
    >
      <div
        className="grid size-2.5 place-items-center rounded-full bg-ink text-paper mix-blend-difference transition-[width,height,opacity,background-color] duration-500 ease-[var(--ease-out-expo)]
        group-data-[state=hidden]:opacity-0
        group-data-[state=link]:size-10 group-data-[state=link]:bg-ink/90
        group-data-[state=label]:size-24 group-data-[state=label]:bg-signal group-data-[state=label]:mix-blend-normal"
      >
        <span className="label whitespace-nowrap text-[0.625rem] text-paper opacity-0 transition-opacity duration-300 group-data-[state=label]:opacity-100">
          {label}
        </span>
      </div>
    </div>
  );
}
