import { type ReactNode, useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface FitTextProps {
  children: ReactNode;
  className?: string;
  /** Font size at which the text was measured; the result scales linearly from it. */
  base?: number;
}

/** Sizes a single line of display type so it spans its container exactly. */
export default function FitText({ children, className, base = 100 }: FitTextProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const text = textRef.current;
    if (!wrap || !text) return;

    const fit = () => {
      text.style.fontSize = `${base}px`;
      const ratio = wrap.clientWidth / text.scrollWidth;
      text.style.fontSize = `${base * ratio}px`;
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(wrap);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [base]);

  return (
    <div ref={wrapRef} className="w-full">
      <span ref={textRef} className={cn("inline-block whitespace-nowrap", className)}>
        {children}
      </span>
    </div>
  );
}
