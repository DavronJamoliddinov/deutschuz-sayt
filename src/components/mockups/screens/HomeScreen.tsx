import { BookText, ChevronRight, CirclePlay, Flame, Gamepad2, LayoutGrid, MessagesSquare, Search, Sparkles, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Ring } from "../parts";

const SECTIONS: { label: string; icon: LucideIcon; bg: string; fg: string }[] = [
  { label: "Oʻyinlar", icon: Gamepad2, bg: "#E8F0FF", fg: "#1E6BF0" },
  { label: "Gapirish", icon: MessagesSquare, bg: "#FFF0E3", fg: "#D9640B" },
  { label: "Matnlar", icon: BookText, bg: "#E7F7EE", fg: "#1E8449" },
  { label: "Videolar", icon: CirclePlay, bg: "#FFECEC", fg: "#D13438" },
  { label: "Mavzular", icon: LayoutGrid, bg: "#F1ECFF", fg: "#6B4CE6" },
  { label: "AI yordamchi", icon: Sparkles, bg: "#FFF7D6", fg: "#A87B00" },
];

/** Bosh sahifa: qidiruv, kunlik maqsad, bo'limlar (pastel kartalar) va «Kun so'zi». */
export function HomeScreen() {
  return (
    <div className="px-[16px]">
      <div className="flex items-center justify-between pt-[4px]">
        <span className="flex items-center gap-[5px] rounded-full bg-white px-[10px] py-[5px] text-[12px] font-semibold">
          <Flame aria-hidden className="size-[14px] fill-[#FF8A1F] text-[#FF8A1F]" />7
        </span>
        <span className="grid size-[30px] place-items-center rounded-full bg-[#DDE7FB] text-app-text">
          <UserRound aria-hidden className="size-[16px]" />
        </span>
      </div>

      <div className="mt-[10px] flex h-[38px] items-center gap-[8px] rounded-[12px] bg-white px-[12px] text-[12.5px] text-app-muted">
        <Search aria-hidden className="size-[15px]" />
        65&nbsp;000+ soʻz ichidan qidiring
      </div>

      <div className="mt-[14px] text-[22px] font-bold tracking-[-0.025em]">Xayrli kun!</div>

      <div className="mt-[10px] flex items-center gap-[12px] rounded-[18px] bg-app p-[13px] text-white">
        <Ring value={0.7} size={46} stroke={5} color="#FFFFFF" track="rgba(255,255,255,0.25)" />
        <div>
          <div className="text-[11.5px] text-white">Kunlik maqsad</div>
          <div className="text-[17px] font-semibold tracking-[-0.01em]">14 / 20 soʻz</div>
        </div>
        <ChevronRight aria-hidden className="ml-auto size-[18px] text-white/80" />
      </div>

      <div className="mt-[12px] grid grid-cols-2 gap-[9px]">
        {SECTIONS.map(({ label, icon: Icon, bg, fg }) => (
          <div key={label} className="flex h-[60px] items-center gap-[9px] rounded-[16px] px-[11px]" style={{ backgroundColor: bg }}>
            <span className="grid size-[30px] place-items-center rounded-[10px] bg-white/80" style={{ color: fg }}>
              <Icon aria-hidden className="size-[16px]" />
            </span>
            <span className="text-[12.5px] font-semibold leading-tight">{label}</span>
          </div>
        ))}
      </div>

      <div className="mt-[12px] rounded-[18px] bg-white p-[13px]">
        <div className="text-[10.5px] font-semibold uppercase tracking-[0.06em] text-app-muted">Kun soʻzi</div>
        <div className="mt-[4px] text-[17px] font-bold">
          <span className="text-die">die</span> Geduld
        </div>
        <div className="text-[13px] text-app-muted">sabr, toqat</div>
      </div>
    </div>
  );
}
