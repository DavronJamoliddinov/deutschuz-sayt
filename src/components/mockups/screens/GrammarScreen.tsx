import { ChevronLeft, CircleCheck, Volume2 } from "lucide-react";
import { cn } from "@/lib/cn";

const ROWS = [
  { g: "m", nom: "der · ein", akk: "den · einen", changed: true },
  { g: "f", nom: "die · eine", akk: "die · eine" },
  { g: "n", nom: "das · ein", akk: "das · ein" },
  { g: "pl", nom: "die", akk: "die" },
];

/** Grammatika darsi: o'zbekcha qoida, jadval, talaffuzli misol va mashq. */
export function GrammarScreen() {
  return (
    <div className="px-[16px]">
      <div className="flex items-center gap-[2px] py-[6px] text-[13px] text-app-text">
        <ChevronLeft aria-hidden className="size-[20px]" strokeWidth={2.2} />
        Grammatika
      </div>
      <div className="text-[11px] font-semibold text-app-text">A1 · 6-dars</div>
      <div className="mt-[2px] text-[21px] font-bold leading-[1.15] tracking-[-0.025em]">Nominativ va Akkusativ</div>
      <p className="mt-[8px] text-[12.5px] leading-[1.5] text-[#3a4258]">
        Akkusativ — toʻldiruvchi: <b className="font-semibold text-app-ink">kimni? nimani?</b> Faqat erkak jinsidagi artikl
        oʻzgaradi.
      </p>

      <div className="mt-[10px] overflow-hidden rounded-[16px] bg-white text-[12px]">
        <div className="grid grid-cols-[28px_1fr_1fr] bg-[#F6F7FA] px-[12px] py-[7px] text-[10.5px] font-semibold uppercase tracking-[0.04em] text-app-muted">
          <span />
          <span>Nominativ</span>
          <span>Akkusativ</span>
        </div>
        {ROWS.map((r) => (
          <div
            key={r.g}
            className={cn("grid grid-cols-[28px_1fr_1fr] border-t border-app-line px-[12px] py-[7px]", r.changed && "bg-der/[0.06]")}
          >
            <span className="text-[10.5px] font-semibold text-app-muted">{r.g}</span>
            <span>{r.nom}</span>
            <span className={cn(r.changed && "font-bold text-der")}>{r.akk}</span>
          </div>
        ))}
      </div>

      <div className="mt-[10px] rounded-[16px] bg-white p-[12px]">
        <div className="flex items-center gap-[7px] text-[13px] font-semibold">
          <Volume2 aria-hidden className="size-[14px] text-app-text" />
          <span>
            Ich sehe <span className="text-der">den</span> Mann.
          </span>
        </div>
        <div className="mt-[2px] pl-[21px] text-[12px] text-app-muted">Men u erkakni koʻryapman.</div>
      </div>

      <div className="mt-[10px] rounded-[16px] bg-white p-[12px]">
        <div className="text-[10.5px] font-semibold uppercase tracking-[0.06em] text-app-muted">Mashq 3/10</div>
        <div className="mt-[6px] text-[14px]">
          Ich kaufe <span className="rounded-[6px] bg-das/10 px-[6px] py-[1px] font-semibold text-das">einen</span> Tisch.
        </div>
        <div className="mt-[6px] flex items-center gap-[5px] text-[12px] font-semibold text-das">
          <CircleCheck aria-hidden className="size-[14px]" />
          Toʻgʻri!
        </div>
      </div>
    </div>
  );
}
