import { motion } from "motion/react";

const nodes = [
  { name: "Hospital A", weight: 42, x: 50, y: 10 },
  { name: "Hospital B", weight: 29, x: 12, y: 82 },
  { name: "Hospital C", weight: 29, x: 88, y: 82 },
];

/** Three hospital nodes feeding one aggregator, line weight set by ISH share. */
export default function FederationVisual() {
  return (
    <div className="flex h-full flex-col justify-between gap-6">
      <p className="label">ISH-weighted aggregation · share per node</p>

      <div className="relative aspect-[5/4] w-full max-w-[20rem] self-center">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          {nodes.map((n, i) => (
            <motion.line
              key={n.name}
              x1={n.x}
              y1={n.y}
              x2={50}
              y2={56}
              stroke={i === 0 ? "#ff5b24" : "rgb(242 239 232 / 0.35)"}
              strokeWidth={n.weight / 22}
              strokeDasharray="1.5 1.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1.4, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </svg>

        <div className="absolute top-[56%] left-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-paper text-center">
          <span className="label leading-tight text-ink">Global<br />model</span>
        </div>

        {nodes.map((n, i) => (
          <motion.div
            key={n.name}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className={`font-display text-3xl font-semibold tabular-nums ${i === 0 ? "text-signal" : "text-ink"}`}
            >
              {i === 0 ? "" : "~"}
              {n.weight}%
            </div>
            <div className="label mt-0.5">{n.name}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 font-mono text-[0.8rem]">
        <span className="text-ink-soft">R1 75.69%</span>
        <div className="relative h-px bg-line">
          <motion.div
            className="absolute inset-y-0 left-0 bg-signal"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
          />
        </div>
        <span className="text-ink">R5 97.22%</span>
      </div>
    </div>
  );
}
