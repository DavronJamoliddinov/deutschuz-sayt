"use client";

import { useEffect, useRef } from "react";
import { animate, m, useMotionValue, useTransform } from "motion/react";
import { groupDigits } from "@/lib/format";

/**
 * Raqam ko'rinishga kirganda 0 dan sanaladi. Statik HTML'da (va JS'siz) yakuniy qiymat turadi; sahifa
 * ochilganda raqam allaqachon ekranda bo'lsa yoki «harakatni kamaytirish» yoqilgan bo'lsa — animatsiya yo'q.
 */
export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const count = useMotionValue(value);
  const text = useTransform(count, (v) => `${groupDigits(v)}${suffix}`);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    count.set(0);
    let controls: ReturnType<typeof animate> | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        controls = animate(count, value, { duration: 1.6, ease: [0.16, 1, 0.3, 1] });
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      controls?.stop();
      count.set(value);
    };
  }, [count, value]);

  return (
    <>
      <m.span ref={ref} aria-hidden className="tabular-nums">
        {text}
      </m.span>
      <span className="sr-only">
        {groupDigits(value)}
        {suffix}
      </span>
    </>
  );
}
