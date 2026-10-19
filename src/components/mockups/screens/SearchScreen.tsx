import { ChevronRight, CircleX, Search } from "lucide-react";
import type { Article } from "@/content/demo";
import { ArticleWord, SpeakerDot } from "../parts";

const RESULTS: { article: Article; word: string; uz: string }[] = [
  { article: "die", word: "Hausaufgabe", uz: "uy vazifasi" },
  { article: "der", word: "Haushalt", uz: "roʻzgʻor, uy xoʻjaligi" },
  { article: "die", word: "Hausfrau", uz: "uy bekasi" },
];

/** Lug'at qidiruvi: «eng mos natija» kartasi va artikllari rangli natijalar. */
export function SearchScreen() {
  return (
    <div className="px-[16px]">
      <div className="pt-[4px] text-[28px] font-bold tracking-[-0.03em]">Lugʻat</div>

      <div className="mt-[8px] flex h-[38px] items-center gap-[8px] rounded-[12px] bg-[#E3E6EC] px-[11px] text-[14px]">
        <Search aria-hidden className="size-[16px] text-app-muted" />
        <span>haus</span>
        <span aria-hidden className="-ml-[6px] h-[17px] w-[2px] rounded-full bg-app" />
        <CircleX aria-hidden className="ml-auto size-[16px] fill-[#a3a9b8] text-[#E3E6EC]" />
      </div>

      <div className="mt-[14px] px-[4px] text-[11px] font-semibold uppercase tracking-[0.06em] text-app-muted">Eng mos natija</div>
      <div className="mt-[6px] rounded-[18px] bg-white p-[14px] ring-[1.5px] ring-app/20">
        <div className="flex items-start justify-between">
          <div>
            <ArticleWord article="das" word="Haus" className="text-[22px] font-bold tracking-[-0.02em]" articleClassName="text-[14px] tracking-normal" />
            <div className="mt-[2px] text-[14px] text-[#3a4258]">uy, bino</div>
          </div>
          <span className="rounded-full bg-app/10 px-[8px] py-[3px] text-[11px] font-semibold text-app-text">A1</span>
        </div>
        <div className="mt-[10px] flex items-center justify-between text-[11.5px] text-app-muted">
          <span>koʻpligi: die Häuser</span>
          <SpeakerDot size={28} />
        </div>
      </div>

      <div className="mt-[14px] px-[4px] text-[11px] font-semibold uppercase tracking-[0.06em] text-app-muted">Boshqa natijalar</div>
      <div className="mt-[6px] divide-y divide-app-line rounded-[18px] bg-white">
        {RESULTS.map((r) => (
          <div key={r.word} className="flex items-center justify-between px-[14px] py-[10px]">
            <div className="min-w-0">
              <ArticleWord article={r.article} word={r.word} className="text-[14px] font-semibold" />
              <div className="text-[12px] text-app-muted">{r.uz}</div>
            </div>
            <ChevronRight aria-hidden className="size-[15px] shrink-0 text-[#c3c7d2]" />
          </div>
        ))}
      </div>
    </div>
  );
}
