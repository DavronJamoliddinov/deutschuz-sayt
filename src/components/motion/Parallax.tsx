"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { m, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";

type ParallaxValues = {
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  scrollY: MotionValue<number>;
  /** 1 — parallaks yoqilgan, 0 — o'chiq («harakatni kamaytirish» yoqilganda). */
  strength: MotionValue<number>;
};

const ParallaxContext = createContext<ParallaxValues | null>(null);

/**
 * Hero kompozitsiyasi uchun yengil parallaks: sichqoncha harakati (faqat aniq ko'rsatkichli qurilmalarda)
 * va scroll. Faqat transform — layout qayta hisoblanmaydi.
 */
export function ParallaxStage({ children, className }: { children: ReactNode; className?: string }) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, { stiffness: 60, damping: 18, mass: 0.8 });
  const pointerY = useSpring(rawY, { stiffness: 60, damping: 18, mass: 0.8 });
  const strength = useMotionValue(0);
  const { scrollY } = useScroll();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");
    const onMove = (event: PointerEvent) => {
      rawX.set((event.clientX / window.innerWidth) * 2 - 1);
      rawY.set((event.clientY / window.innerHeight) * 2 - 1);
    };
    const sync = () => {
      strength.set(reduce.matches ? 0 : 1);
      window.removeEventListener("pointermove", onMove);
      if (!reduce.matches && fine.matches) window.addEventListener("pointermove", onMove, { passive: true });
      else {
        rawX.set(0);
        rawY.set(0);
      }
    };
    sync();
    reduce.addEventListener("change", sync);
    return () => {
      reduce.removeEventListener("change", sync);
      window.removeEventListener("pointermove", onMove);
    };
  }, [rawX, rawY, strength]);

  return (
    <ParallaxContext.Provider value={{ pointerX, pointerY, scrollY, strength }}>
      <div className={className}>{children}</div>
    </ParallaxContext.Provider>
  );
}

/** depth — piksel: sichqoncha chetga borganda qatlam shuncha siljiydi; scroll'da ham chuqurlikka mos. */
export function ParallaxLayer({ depth, children, className }: { depth: number; children: ReactNode; className?: string }) {
  const ctx = useContext(ParallaxContext);
  if (!ctx) throw new Error("ParallaxLayer ParallaxStage ichida bo'lishi kerak");
  const x = useTransform(() => ctx.pointerX.get() * depth * ctx.strength.get());
  const y = useTransform(
    () => (ctx.pointerY.get() * depth - Math.min(Math.max(ctx.scrollY.get(), 0), 1000) * depth * 0.004) * ctx.strength.get(),
  );
  return (
    <m.div style={{ x, y }} className={className}>
      {children}
    </m.div>
  );
}
