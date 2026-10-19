import type { CSSProperties, ReactNode } from "react";
import { Lightbulb, Mic, PenLine, Sparkles } from "lucide-react";

/** Gapirish mashqi namunasi (A1, Teil 1): savol, foydalanuvchi javobi, tuzatish va keyingi savol. */
export function ChatThread({ label }: { label: string }) {
  return (
    <div role="img" aria-label={label} className="w-full overflow-hidden rounded-[28px] bg-white text-ink shadow-[0_40px_80px_-32px_rgba(3,7,18,0.65)]">
      <div className="flex items-center gap-3 border-b border-line px-5 py-4">
        <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-app to-[#7fa9ff] text-white">
          <Sparkles aria-hidden className="size-4" />
        </span>
        <div className="min-w-0">
          <div className="text-[14px] font-semibold">AI imtihonchi</div>
          <div className="text-[12px] text-ink-3">Goethe · A1 · Teil 1</div>
        </div>
        <span className="ml-auto rounded-full bg-paper-2 px-2.5 py-1 text-[11.5px] font-semibold text-ink-2">2 / 6</span>
      </div>

      <div className="space-y-3 bg-paper/60 px-5 py-5">
        <Bubble side="ai" delay={0}>
          <div className="text-[15px] font-semibold">Guten Tag! Wie heißen Sie?</div>
          <div className="text-[13px] text-ink-3">Assalomu alaykum! Ismingiz nima?</div>
        </Bubble>

        <Bubble side="me" delay={120}>
          <div className="text-[15px]">Ich heiße Dilnoza. Ich komme von Usbekistan.</div>
        </Bubble>

        <div
          data-reveal
          style={{ "--reveal-delay": "240ms" } as CSSProperties}
          className="ml-auto max-w-[88%] rounded-2xl border border-das/25 bg-das/[0.06] px-3.5 py-2.5"
        >
          <div className="flex items-center gap-1.5 text-[12px] font-semibold text-das">
            <PenLine aria-hidden className="size-3.5" />
            Tuzatish
          </div>
          <div className="mt-1 text-[14px]">
            <span className="text-ink-3 line-through decoration-die/60">von</span>{" "}
            <span className="font-semibold text-das">aus</span> Usbekistan
          </div>
          <div className="text-[12.5px] text-ink-2">Qayerdan kelganingizni aytganda «aus» ishlatiladi.</div>
        </div>

        <Bubble side="ai" delay={360}>
          <div className="text-[15px] font-semibold">Sehr gut! Was sind Sie von Beruf?</div>
          <div className="text-[13px] text-ink-3">Juda yaxshi! Kasbingiz nima?</div>
        </Bubble>
      </div>

      <div className="flex items-center gap-2.5 border-t border-line px-4 py-3.5">
        <span className="flex h-10 items-center gap-1.5 rounded-full bg-sun-soft px-3.5 text-[13px] font-semibold text-navy-900">
          <Lightbulb aria-hidden className="size-4" />
          Yordam
        </span>
        <span className="flex h-10 min-w-0 flex-1 items-center rounded-full bg-paper-2 px-4 text-[13px] text-ink-3">
          Javobingizni yozing…
        </span>
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-app text-white">
          <Mic aria-hidden className="size-[18px]" />
        </span>
      </div>
    </div>
  );
}

function Bubble({ side, delay, children }: { side: "ai" | "me"; delay: number; children: ReactNode }) {
  const mine = side === "me";
  return (
    <div
      data-reveal
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      className={
        mine
          ? "ml-auto max-w-[88%] rounded-2xl rounded-br-md bg-app px-3.5 py-2.5 text-white"
          : "max-w-[88%] rounded-2xl rounded-bl-md bg-white px-3.5 py-2.5 shadow-[0_1px_2px_rgba(16,26,53,0.06)] ring-1 ring-line"
      }
    >
      {children}
    </div>
  );
}
