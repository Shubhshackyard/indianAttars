"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  // Default to the final value so SSR / no-JS always shows a real number.
  const [val, setVal] = useState(to);
  const started = useRef(false);

  // With JS + motion allowed, reset to 0 before paint so the count-up shows.
  useIsomorphicLayoutEffect(() => {
    if (!reduce) setVal(0);
  }, [reduce]);

  useEffect(() => {
    if (reduce) {
      setVal(to);
      return;
    }
    if (!inView || started.current) return;
    started.current = true;
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

const stats: { value?: number; suffix?: string; static?: string; label: string }[] =
  [
    { value: 28, suffix: "+", label: "Essential Oils" },
    { value: 14, label: "Indian Attars" },
    { value: 5, label: "Ruh & Absolutes" },
    { value: 7, label: "Certifications" },
    { static: "ISO", label: "9001:2015 Certified" },
  ];

export function TrustBar() {
  return (
    <section className="border-y border-line bg-surface text-ink">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-y-6 px-4 py-8 sm:px-6">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`flex flex-1 basis-1/2 flex-col items-center px-3 text-center sm:basis-auto ${
              i > 0 ? "sm:border-l sm:border-primary/30" : ""
            }`}
          >
            <span className="font-label text-3xl font-semibold text-primary sm:text-4xl">
              {s.static ? (
                s.static
              ) : (
                <CountUp to={s.value!} suffix={s.suffix} />
              )}
            </span>
            <span className="mt-1 text-xs uppercase tracking-[0.1em] text-muted">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
