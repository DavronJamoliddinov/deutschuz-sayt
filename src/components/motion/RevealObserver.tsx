"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    __dzReveal?: boolean;
  }
}

/**
 * [data-reveal] elementlarini bitta IntersectionObserver bilan kuzatadi va ko'rinishga kirganda
 * data-inview qo'yadi — animatsiyaning o'zi CSS'da (globals.css). Server komponentlari faqat atribut qo'yadi.
 * Layout'da turadi, shuning uchun har sahifa almashganda (pathname) yangi elementlar qayta yig'iladi.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    window.__dzReveal = true;
    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-inview])"));
    if (root.classList.contains("no-reveal") || !("IntersectionObserver" in window)) {
      elements.forEach((el) => el.setAttribute("data-inview", ""));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-inview", "");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
