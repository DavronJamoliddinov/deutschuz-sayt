import { ChevronLeft, Sparkles, Star, Volume2 } from "lucide-react";
import { ArticleWord, SpeakerDot } from "../parts";

/** Lug'atdagi so'z sahifasi: tarjima so'z ostida, artikl rangda, ma'nolar misollari bilan. */
export function WordScreen() {
  return (
    <div className="px-[16px]">
      <div className="flex items-center justify-between py-[6px] text-app-text">
        <ChevronLeft aria-hidden className="size-[24px]" strokeWidth={2.2} />
        <Star aria-hidden className="size-[20px]" />
      </div>

      <div className="mt-[4px] rounded-[18px] bg-white p-[14px]">
        <div className="flex items-start justify-between gap-[8px]">
          <div>
            <ArticleWord
              article="die"
              word="Sprache"
              className="text-[27px] font-bold leading-none tracking-[-0.025em]"
              articleClassName="text-[16px] tracking-normal"
            />
            <div className="mt-[6px] text-[17px] text-[#3a4258]">til</div>
          </div>
          <SpeakerDot size={36} />
        </div>
        <div className="mt-[10px] flex flex-wrap gap-[6px] text-[11px] font-medium">
          <span className="rounded-full bg-app/10 px-[8px] py-[3px] font-semibold text-app-text">A1</span>
          <span className="rounded-full bg-app-bg px-[8px] py-[3px] text-app-muted">[ˈʃpʁaːxə]</span>
          <span className="rounded-full bg-app-bg px-[8px] py-[3px] text-app-muted">koʻpligi: die Sprachen</span>
        </div>
      </div>

      <div className="mt-[14px] px-[4px] text-[11px] font-semibold uppercase tracking-[0.06em] text-app-muted">Maʼnolari</div>
      <div className="mt-[6px] divide-y divide-app-line rounded-[18px] bg-white">
        <Meaning n={1} title="til" de="Ich lerne eine neue Sprache." uz="Men yangi til oʻrganyapman." />
        <Meaning n={2} title="nutq, ifoda uslubi" de="Sie spricht eine klare Sprache." uz="U ochiq-oydin gapiradi." />
      </div>

      <div className="mt-[12px] flex items-center justify-center gap-[7px] rounded-[14px] bg-gradient-to-r from-app to-[#4d8dff] py-[11px] text-[13.5px] font-semibold text-white">
        <Sparkles aria-hidden className="size-[15px]" />
        AI tushuntir
      </div>
    </div>
  );
}

function Meaning({ n, title, de, uz }: { n: number; title: string; de: string; uz: string }) {
  return (
    <div className="flex gap-[10px] p-[13px]">
      <span className="mt-[1px] grid size-[20px] shrink-0 place-items-center rounded-full bg-app/10 text-[11px] font-bold text-app-text">
        {n}
      </span>
      <div className="min-w-0">
        <div className="text-[14px] font-semibold">{title}</div>
        <div className="mt-[5px] flex items-start gap-[5px] text-[12.5px] leading-[1.4]">
          <Volume2 aria-hidden className="mt-[2px] size-[12px] shrink-0 text-app-text" />
          <span>{de}</span>
        </div>
        <div className="pl-[17px] text-[12px] leading-[1.4] text-app-muted">{uz}</div>
      </div>
    </div>
  );
}
