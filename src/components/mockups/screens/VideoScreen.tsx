import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { cn } from "@/lib/cn";

/** Video dars: pleyer, karaoke subtitr (aytilayotgan so'z ajralgan), tarjima, tezlik va gapma-gap rejimi. */
export function VideoScreen() {
  return (
    <div className="px-[16px]">
      <div className="flex items-center gap-[2px] py-[6px] text-[13px] text-app-text">
        <ChevronLeft aria-hidden className="size-[20px]" strokeWidth={2.2} />
        Videolar
      </div>

      <div className="relative mt-[4px] aspect-video overflow-hidden rounded-[16px] bg-[linear-gradient(140deg,#22356a,#0e1630_70%)]">
        <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_70%_30%,rgba(255,212,71,0.25),transparent_70%)]" />
        <div className="absolute inset-0 grid place-items-center">
          <span className="grid size-[44px] place-items-center rounded-full bg-white/90 text-app-ink">
            <Play aria-hidden className="size-[18px] translate-x-[1px] fill-current" />
          </span>
        </div>
        <div className="absolute inset-x-[10px] bottom-[8px]">
          <div className="h-[3px] rounded-full bg-white/25">
            <div className="h-full w-[38%] rounded-full bg-sun" />
          </div>
          <div className="mt-[4px] flex justify-between text-[9.5px] font-medium text-white/80 tabular-nums">
            <span>1:24</span>
            <span>4:10</span>
          </div>
        </div>
      </div>

      <div className="mt-[10px] text-[11px] font-semibold uppercase tracking-[0.06em] text-app-muted">Video dars · A1</div>

      <div className="mt-[6px] rounded-[16px] bg-white p-[14px]">
        <p className="text-[16px] font-semibold leading-[1.55] tracking-[-0.01em]">
          Ich fahre jeden Morgen mit dem <span className="rounded-[5px] bg-sun px-[3px]">Bus</span>{" "}
          <span className="text-app-muted">zur Arbeit.</span>
        </p>
        <p className="mt-[6px] text-[12.5px] leading-[1.45] text-app-muted">Men har kuni ertalab ishga avtobusda boraman.</p>
      </div>

      <div className="mt-[10px] grid grid-cols-3 gap-[8px] text-[11.5px] font-semibold">
        {["0,75×", "Gapma-gap", "Matn"].map((label, i) => (
          <span
            key={label}
            className={cn("rounded-[11px] py-[8px] text-center", i === 1 ? "bg-app text-white" : "bg-white text-[#3a4258]")}
          >
            {label}
          </span>
        ))}
      </div>

      <div className="mt-[10px] flex items-center justify-between rounded-[14px] bg-white px-[12px] py-[10px] text-[12px]">
        <span className="flex items-center gap-[2px] text-app-muted">
          <ChevronLeft aria-hidden className="size-[14px]" />
          Oldingi gap
        </span>
        <span className="flex items-center gap-[2px] font-semibold text-app-text">
          Keyingi gap
          <ChevronRight aria-hidden className="size-[14px]" />
        </span>
      </div>
    </div>
  );
}
