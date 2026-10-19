"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * `content-visibility: auto` (.cv-auto) ekrandan tashqaridagi bo'limlarni taxminiy balandlik bilan qoldiradi — «#bo'lim»
 * havolasiga o'tishda brauzer shu taxminlar bilan hisoblab, noto'g'ri joyda to'xtashi mumkin. Shuning uchun «#» li havola
 * bosilganda (yoki sahifa «#bo'lim» bilan ochilganda) barcha bo'limlar bir marta to'liq chiziladi: keyin
 * `contain-intrinsic-size: auto` haqiqiy o'lchamlarni eslab qoladi. Boshlang'ich yuklanish tezligicha qoladi.
 */
export function InPageNavigation() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest("a[href*='#']") : null;
      if (link) root.classList.add("cv-off");
    };
    // capture: brauzer (yoki Next router) scroll qilishidan oldin ishlaydi
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    const id = window.location.hash.length > 1 ? decodeURIComponent(window.location.hash.slice(1)) : "";
    const target = id ? document.getElementById(id) : null;
    if (!target) return;
    document.documentElement.classList.add("cv-off");
    const frame = requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
