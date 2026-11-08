import type { ReactNode } from "react";

interface SectionHeadProps {
  index: string;
  label: string;
  aside?: ReactNode;
}

export default function SectionHead({ index, label, aside }: SectionHeadProps) {
  return (
    <div className="shell">
      <div className="flex items-baseline justify-between gap-6 border-t border-line pt-4">
        <p className="label">
          <span className="text-signal">({index})</span>&nbsp;&nbsp;{label}
        </p>
        {aside && <div className="label text-right">{aside}</div>}
      </div>
    </div>
  );
}
