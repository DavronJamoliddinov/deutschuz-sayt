import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeader({ id, eyebrow, title, lead, align = "left", tone = "light", className }: SectionHeaderProps) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-[46rem]", align === "center" && "mx-auto text-center", className)}>
      <p
        data-reveal
        className={cn(
          "inline-flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-[0.16em]",
          dark ? "text-sun" : "text-coral-700",
        )}
      >
        <span aria-hidden className={cn("size-1.5 rounded-full", dark ? "bg-sun" : "bg-coral")} />
        {eyebrow}
      </p>
      <h2
        id={id}
        data-reveal
        style={{ "--reveal-delay": "70ms" } as CSSProperties}
        className={cn(
          "mt-4 font-display text-[clamp(2.05rem,1.45rem+2.6vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.034em] text-balance",
          dark ? "text-paper" : "text-ink",
        )}
      >
        {title}
      </h2>
      {lead && (
        <p
          data-reveal
          style={{ "--reveal-delay": "140ms" } as CSSProperties}
          className={cn("mt-5 text-[17px] leading-[1.65] text-pretty sm:text-[18px]", dark ? "text-paper/70" : "text-ink-2")}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
