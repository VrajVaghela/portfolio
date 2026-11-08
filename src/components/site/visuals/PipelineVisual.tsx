import { useEffect, useRef } from "react";
import { createTimeline } from "animejs";

const steps = [
  { id: "q", label: "Query" },
  { id: "r", label: "[Retrieve]?" },
  { id: "rel", label: "[IsRel]" },
  { id: "sup", label: "[IsSup]" },
  { id: "use", label: "[IsUse]" },
];

/** Self-RAG's decision graph, lighting one critique node at a time. */
export default function PipelineVisual() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const nodes = root.querySelectorAll<HTMLElement>("[data-node]");
    const wires = root.querySelectorAll<HTMLElement>("[data-wire]");
    const tl = createTimeline({ loop: true, autoplay: false, defaults: { ease: "outExpo" } });

    nodes.forEach((node, i) => {
      tl.add(node, { backgroundColor: ["#121210", "#ff5b24"], color: ["#f2efe8", "#0a0a09"], duration: 380 }, i * 520);
      if (wires[i]) tl.add(wires[i], { scaleY: [0, 1], duration: 420 }, i * 520 + 200);
    });
    tl.add(root.querySelector("[data-verdict]")!, { opacity: [0, 1], y: [8, 0], duration: 500 }, nodes.length * 520)
      .add(nodes, { backgroundColor: "#121210", color: "#f2efe8", duration: 600 }, "+=1400")
      .add(wires, { scaleY: 0, duration: 400 }, "<<")
      .add(root.querySelector("[data-verdict]")!, { opacity: 0, duration: 300 }, "<<");

    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? tl.play() : tl.pause()));
    io.observe(root);
    return () => {
      io.disconnect();
      tl.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="flex h-full flex-col justify-between gap-6">
      <p className="label">Decision graph · per query</p>
      <div className="flex flex-col gap-0">
        {steps.map((s, i) => (
          <div key={s.id} className="flex flex-col items-start">
            <div
              data-node
              className="rounded-full border border-line-strong bg-paper-raised px-4 py-2 font-mono text-[0.8rem] text-ink"
            >
              {s.label}
            </div>
            {i < steps.length - 1 && (
              <div className="relative ml-6 h-6 w-px bg-line">
                <div data-wire className="absolute inset-0 origin-top bg-signal" style={{ transform: "scaleY(0)" }} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div data-verdict className="flex items-center gap-3 opacity-0">
        <span className="size-2 rounded-full bg-signal" />
        <span className="font-mono text-[0.8rem] text-ink">Grounded → answer. Otherwise → refuse.</span>
      </div>
    </div>
  );
}
