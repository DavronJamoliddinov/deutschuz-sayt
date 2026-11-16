import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import type { NewsCover as Cover } from "@/content/news";
import { groupDigits } from "@/lib/format";
import { cn } from "@/lib/cn";
import { UnitGrid } from "./UnitGrid";

/**
 * Yangilik vizuali — qorong'i fonda (ota element `surface-dark` va to'q fon beradi). Surat o'rniga xabarning asosiy
 * raqami: begona rasm va logotipga huquq masalasi yo'q, ma'no esa birinchi qarashda tushuniladi.
 */
export function NewsCover({ cover, size = "md" }: { cover: Cover; size?: "sm" | "md" | "lg" }) {
  const big =
    size === "lg"
      ? "text-[clamp(2.6rem,1.9rem+2.4vw,3.9rem)]"
      : size === "md"
        ? "text-[clamp(2.1rem,1.7rem+1.4vw,2.9rem)]"
        : "text-[2rem]";

  if (cover.kind === "units") {
    const filled = groupDigits(cover.filled * cover.unitValue);
    const total = groupDigits(cover.total * cover.unitValue);
    const unit = `${groupDigits(cover.unitValue)} ${cover.unitLabel}`;
    return (
      <div className="flex w-full flex-col gap-5">
        <p className="flex flex-wrap items-baseline gap-x-2 font-display font-semibold leading-none tracking-[-0.045em]">
          <span className={cn("text-sun", big)}>{filled}</span>
          <span className={cn("text-paper/55", size === "lg" ? "text-[1.6rem]" : "text-[1.25rem]")}>/ {total}</span>
        </p>
        <UnitGrid
          total={cover.total}
          filled={cover.filled}
          label={`${cover.total} ta katakdan ${cover.filled} tasi toʻlgan. Har bir katak — ${unit}: ${total} dan ${filled} tasi.`}
          className="grid-cols-9 @md:grid-cols-15 @3xl:grid-cols-9"
        />
        <p className="flex items-center gap-2 text-[12.5px] leading-snug text-paper/65">
          <span aria-hidden className="size-2.5 shrink-0 rounded-[3px] bg-sun" />1 katak — {unit}
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <p className="flex flex-wrap items-center gap-x-3 font-display font-semibold leading-none tracking-[-0.045em]">
        <span className={cn("text-paper", big)}>
          {cover.steps} {cover.stepLabel}
        </span>
        <ArrowRight aria-hidden className="size-[1.6rem] text-paper/40" />
        <span className={cn("text-sun", big)}>{cover.goal}</span>
      </p>
      <div role="img" aria-label={cover.label} data-reveal className="flex items-center gap-1.5">
        {Array.from({ length: cover.steps }, (_, index) => (
          <span
            key={index}
            aria-hidden
            style={{ "--i": index * 3, "--o": 0.3 + (0.7 * (index + 1)) / cover.steps } as CSSProperties}
            className="unit-cell h-2.5 flex-1 rounded-full bg-sun"
          />
        ))}
        <span
          aria-hidden
          style={{ "--i": cover.steps * 3 } as CSSProperties}
          className="unit-cell unit-on ml-1.5 grid size-11 shrink-0 place-items-center rounded-full bg-sun font-display text-[15px] font-semibold text-navy-900 shadow-[0_0_24px_-4px_rgb(255_212_71/0.8)]"
        >
          {cover.goal}
        </span>
      </div>
      <div aria-hidden className="-mt-3 flex justify-between pr-14 text-[11.5px] text-paper/55">
        <span>1-{cover.stepLabel}</span>
        <span>
          {cover.steps}-{cover.stepLabel}
        </span>
      </div>
      <p className="text-[12.5px] leading-snug text-paper/65">{cover.label}</p>
    </div>
  );
}
