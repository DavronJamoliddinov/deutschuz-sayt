"use client";

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig, domMax } from "motion/react";

/**
 * Motion: faqat `m` komponentlari (strict) — to'liq `motion` komponentini import qilmaymiz.
 * domMax — layoutId (tab ko'rsatkichlari) uchun; domAnimation bilan farq atigi ~5 KB gzip (o'lchangan).
 * reducedMotion="user": tizimda «harakatni kamaytirish» yoqilgan bo'lsa, transform animatsiyalari o'chadi.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
