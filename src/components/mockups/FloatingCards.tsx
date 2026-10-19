import { ArrowRight, Check, GraduationCap, Mic, Sparkles } from "lucide-react";
import { Ring, Waveform } from "./parts";
import { cn } from "@/lib/cn";

const card = "rounded-[20px] bg-white text-ink shadow-float ring-1 ring-black/[0.04]";

export function GrammarCard({ className }: { className?: string }) {
  return (
    <div className={cn(card, "w-[200px] p-3.5", className)}>
      <div className="flex items-center gap-2 text-[11.5px] font-semibold text-ink-3">
        <span className="grid size-6 place-items-center rounded-lg bg-[#EFE9FF] text-[#6B4CE6]">
          <GraduationCap aria-hidden className="size-3.5" />
        </span>
        Grammatika · A1
      </div>
      <div className="mt-2 font-display text-[18px] font-semibold tracking-[-0.02em]">Akkusativ</div>
      <div className="mt-2 space-y-1.5 text-[13px] font-semibold">
        {[
          ["der", "den"],
          ["ein", "einen"],
        ].map(([from, to]) => (
          <div key={from} className="flex items-center justify-between rounded-[10px] bg-paper-2 px-2.5 py-1.5">
            <span className="text-ink-2">{from}</span>
            <ArrowRight aria-hidden className="size-3.5 text-ink-3" />
            <span className="text-der">{to}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function GoalCard({ className }: { className?: string }) {
  return (
    <div className={cn(card, "flex items-center gap-3 py-3 pl-3 pr-4", className)}>
      <Ring value={0.7} size={44} stroke={5} color="#1E6BF0" />
      <div>
        <div className="text-[11.5px] font-semibold text-ink-3">Kunlik maqsad</div>
        <div className="font-display text-[18px] font-semibold tracking-[-0.02em]">
          14 / 20 <span className="text-[12.5px] font-medium text-ink-3">soʻz</span>
        </div>
      </div>
    </div>
  );
}

export function SpeakingCard({ className }: { className?: string }) {
  return (
    <div className={cn(card, "w-[232px] p-3.5", className)}>
      <div className="flex items-center gap-2">
        <span className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-app to-[#7fa9ff] text-white">
          <Sparkles aria-hidden className="size-3.5" />
        </span>
        <span className="text-[11.5px] font-semibold text-ink-3">AI imtihonchi</span>
        <span className="ml-auto rounded-full bg-coral/12 px-2 py-0.5 text-[10.5px] font-semibold text-coral-700">Teil 1</span>
      </div>
      <div className="mt-2.5 rounded-[16px] rounded-tl-[6px] bg-paper-2 px-3 py-2">
        <div className="text-[14px] font-semibold">Wie heißen Sie?</div>
        <div className="text-[12px] text-ink-3">Ismingiz nima?</div>
      </div>
      <div className="mt-2.5 flex items-center gap-2.5">
        <span className="grid size-8 place-items-center rounded-full bg-coral text-white">
          <Mic aria-hidden className="size-4" />
        </span>
        <Waveform className="h-5" barClassName="bg-coral/50" />
      </div>
    </div>
  );
}

export function ArticleCard({ className }: { className?: string }) {
  return (
    <div className={cn(card, "w-[210px] p-3.5", className)}>
      <div className="text-[11.5px] font-semibold text-ink-3">Qaysi artikl?</div>
      <div className="mt-1 font-serif text-[30px] italic leading-none tracking-[-0.01em]">Tisch</div>
      <div className="mt-3 grid grid-cols-3 gap-1.5 text-[13px] font-semibold">
        <span className="flex items-center justify-center gap-1 rounded-[10px] bg-der py-1.5 text-white">
          der <Check aria-hidden className="size-3.5" strokeWidth={3} />
        </span>
        <span className="rounded-[10px] py-1.5 text-center text-die ring-1 ring-inset ring-die/25">die</span>
        <span className="rounded-[10px] py-1.5 text-center text-das ring-1 ring-inset ring-das/25">das</span>
      </div>
    </div>
  );
}
