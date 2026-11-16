import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

/**
 * Katakchalar diagrammasi: `total` ta katak, birinchi `filled` tasi to'lgan (sariq). Ko'rinishga kirganda katakchalar
 * ketma-ket paydo bo'ladi, to'lganlari bir marta «nur sochadi» (globals.css: .unit-cell). Ustunlar soni — `className`
 * orqali (masalan, "grid-cols-9 sm:grid-cols-15"): Tailwind klasslari matnda to'liq yozilishi kerak.
 */
export function UnitGrid({
  total,
  filled,
  label,
  tone = "dark",
  className,
}: {
  total: number;
  filled: number;
  /** Ekran o'quvchisi uchun to'liq ma'no, masalan «45 katakdan 2 tasi to'lgan…». */
  label: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div role="img" aria-label={label} data-reveal className={cn("grid gap-[clamp(4px,0.7vw,8px)]", className)}>
      {Array.from({ length: total }, (_, index) => {
        const on = index < filled;
        return (
          <span
            key={index}
            aria-hidden
            style={{ "--i": index } as CSSProperties}
            className={cn(
              "unit-cell relative aspect-square rounded-[24%]",
              on
                ? "unit-on bg-sun shadow-[0_0_22px_-4px_rgb(255_212_71/0.75)]"
                : tone === "dark"
                  ? "bg-white/[0.07] ring-1 ring-inset ring-white/[0.09]"
                  : "bg-ink/[0.05] ring-1 ring-inset ring-ink/[0.08]",
            )}
          />
        );
      })}
    </div>
  );
}
