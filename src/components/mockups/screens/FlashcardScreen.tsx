import { X } from "lucide-react";
import { ArticleWord, StationIllustration } from "../parts";

/** Yodlash: 20 so'zlik qismdagi kartochka — rasm (A1–A2), tarjima, misol, «Yana ko'rsat» / «Bildim». */
export function FlashcardScreen() {
  return (
    <div className="flex h-full flex-col px-[16px] pb-[10px]">
      <div className="flex items-center justify-between py-[6px] text-[13px]">
        <X aria-hidden className="size-[20px] text-app-muted" />
        <span className="font-semibold">A1 · 3-qism</span>
        <span className="tabular-nums text-app-muted">8/20</span>
      </div>
      <div className="mt-[4px] h-[5px] rounded-full bg-[#E3E6EC]">
        <div className="h-full w-[40%] rounded-full bg-app" />
      </div>

      <div className="mt-[16px] flex flex-1 flex-col items-center rounded-[24px] bg-white px-[18px] pb-[18px] pt-[22px] text-center shadow-[0_12px_30px_-14px_rgba(21,27,46,0.22)]">
        <StationIllustration className="h-[104px] w-auto" />
        <ArticleWord
          article="der"
          word="Bahnhof"
          className="mt-[14px] text-[26px] font-bold tracking-[-0.025em]"
          articleClassName="text-[16px] tracking-normal"
        />
        <div className="text-[12px] text-app-muted">koʻpligi: die Bahnhöfe</div>
        <div className="my-[14px] h-px w-full bg-app-line" />
        <div className="text-[21px] font-semibold tracking-[-0.01em]">vokzal</div>
        <div className="mt-[10px] text-[12.5px]">Der Bahnhof ist nicht weit.</div>
        <div className="text-[12px] text-app-muted">Vokzal uzoq emas.</div>
      </div>

      <div className="mt-[12px] grid grid-cols-2 gap-[10px] text-[13.5px] font-semibold">
        <div className="rounded-[14px] bg-white py-[12px] text-center text-[#3a4258] ring-1 ring-[#E3E6EC]">Yana koʻrsat</div>
        <div className="rounded-[14px] bg-app py-[12px] text-center text-white">Bildim</div>
      </div>
    </div>
  );
}
