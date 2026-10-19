import { ChevronLeft, Plus } from "lucide-react";
import { ArticleWord, SpeakerDot } from "../parts";

/** O'qish matni: bosilgan so'z tarjimasi pastki oynada, o'qish to'xtamaydi. */
export function ReadingScreen() {
  return (
    <div className="relative h-full">
      <div className="px-[16px]">
        <div className="flex items-center justify-between py-[6px] text-[13px] text-app-text">
          <span className="flex items-center gap-[2px]">
            <ChevronLeft aria-hidden className="size-[20px]" strokeWidth={2.2} />
            Matnlar
          </span>
          <span className="rounded-full bg-app/10 px-[8px] py-[2px] text-[11px] font-semibold">A2</span>
        </div>
        <div className="mt-[6px] text-[22px] font-bold tracking-[-0.025em]">Eine neue Wohnung</div>
        <div className="text-[12px] text-app-muted">Yangi kvartira</div>
        <p className="mt-[14px] text-[15px] leading-[1.75]">
          Aziz sucht eine Wohnung in Köln. Jeden Tag liest er{" "}
          <span className="rounded-[5px] bg-sun/60 px-[3px] py-[1px] font-medium">Anzeigen</span> im Internet. Endlich findet
          er eine kleine Wohnung mit Balkon. Sie ist hell und nicht teuer.
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-0 rounded-t-[24px] bg-white px-[16px] pb-[14px] pt-[10px] shadow-[0_-14px_34px_-16px_rgba(21,27,46,0.3)]">
        <div className="mx-auto mb-[12px] h-[4px] w-[36px] rounded-full bg-[#D9DCE4]" />
        <div className="flex items-start justify-between">
          <div>
            <ArticleWord article="die" word="Anzeige" className="text-[20px] font-bold tracking-[-0.02em]" articleClassName="text-[14px] tracking-normal" />
            <div className="text-[14.5px] text-[#3a4258]">eʼlon</div>
          </div>
          <SpeakerDot size={32} />
        </div>
        <div className="mt-[6px] text-[11.5px] text-app-muted">koʻpligi: die Anzeigen</div>
        <div className="mt-[12px] flex items-center justify-center gap-[6px] rounded-[13px] bg-app py-[11px] text-[13px] font-semibold text-white">
          <Plus aria-hidden className="size-[15px]" strokeWidth={2.5} />
          Kartochkalarga qoʻshish
        </div>
      </div>
    </div>
  );
}
