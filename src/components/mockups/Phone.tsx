import type { ReactNode } from "react";
import { BookOpen, CircleUserRound, GraduationCap, House, Layers } from "lucide-react";
import { cn } from "@/lib/cn";

export type AppTab = "home" | "dictionary" | "learn" | "grammar" | "profile";

const TABS: { key: AppTab; label: string; icon: typeof House }[] = [
  { key: "home", label: "Bosh sahifa", icon: House },
  { key: "dictionary", label: "Lugʻat", icon: BookOpen },
  { key: "learn", label: "Yodlash", icon: Layers },
  { key: "grammar", label: "Grammatika", icon: GraduationCap },
  { key: "profile", label: "Profil", icon: CircleUserRound },
];

/**
 * Telefon ramkasi. Ichidagi ekran — rasm vazifasini bajaradi (role="img" + aria-label), shuning uchun ichida
 * bosiladigan element yo'q: bu illyustratsiya, ishlaydigan interfeys emas.
 */
export function Phone({
  label,
  children,
  tab,
  className,
}: {
  label: string;
  children: ReactNode;
  tab?: AppTab;
  className?: string;
}) {
  return (
    <div role="img" aria-label={label} className={cn("relative w-[280px] shrink-0 select-none", className)}>
      <span aria-hidden className="absolute -left-[3px] top-[104px] h-[28px] w-[3px] rounded-l-sm bg-[#1d2335]" />
      <span aria-hidden className="absolute -left-[3px] top-[148px] h-[50px] w-[3px] rounded-l-sm bg-[#1d2335]" />
      <span aria-hidden className="absolute -left-[3px] top-[206px] h-[50px] w-[3px] rounded-l-sm bg-[#1d2335]" />
      <span aria-hidden className="absolute -right-[3px] top-[168px] h-[78px] w-[3px] rounded-r-sm bg-[#1d2335]" />
      <div className="rounded-[46px] bg-[#0b101d] p-[8px] shadow-phone ring-1 ring-white/10">
        <div className="phone-screen relative h-[576px] overflow-hidden rounded-[38px] bg-app-bg text-app-ink">
          <StatusBar />
          <span aria-hidden className="absolute left-1/2 top-[9px] z-20 h-[25px] w-[84px] -translate-x-1/2 rounded-full bg-black" />
          <div className={cn("absolute inset-x-0 top-[42px] overflow-hidden", tab ? "bottom-[74px]" : "bottom-[18px]")}>
            {children}
          </div>
          {tab && <TabBar active={tab} />}
          <span aria-hidden className="absolute bottom-[7px] left-1/2 z-20 h-[4px] w-[96px] -translate-x-1/2 rounded-full bg-app-ink/85" />
        </div>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="absolute inset-x-0 top-0 z-10 flex h-[42px] items-center justify-between px-[26px] pt-[3px] text-[12.5px] font-semibold">
      <span>9:41</span>
      <span className="flex items-center gap-[5px]">
        <svg width="16" height="11" viewBox="0 0 16 11" aria-hidden>
          <rect x="0" y="7" width="3" height="4" rx="0.8" fill="currentColor" />
          <rect x="4.3" y="5" width="3" height="6" rx="0.8" fill="currentColor" />
          <rect x="8.6" y="2.6" width="3" height="8.4" rx="0.8" fill="currentColor" />
          <rect x="12.9" y="0" width="3" height="11" rx="0.8" fill="currentColor" />
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11" aria-hidden>
          <path d="M7.5 2.2c2.1 0 4 .8 5.5 2.1l1.2-1.3A9.6 9.6 0 0 0 7.5.4 9.6 9.6 0 0 0 .8 3l1.2 1.3a7.8 7.8 0 0 1 5.5-2.1Z" fill="currentColor" />
          <path d="M7.5 5.6c1.2 0 2.3.4 3.1 1.2l1.2-1.3a6.3 6.3 0 0 0-8.6 0l1.2 1.3c.8-.8 1.9-1.2 3.1-1.2Z" fill="currentColor" />
          <path d="M7.5 8.6 9.3 7a2.7 2.7 0 0 0-3.6 0l1.8 1.6Z" fill="currentColor" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" aria-hidden>
          <rect x="0.6" y="0.6" width="21" height="10.8" rx="3.2" fill="none" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.2" />
          <rect x="2.2" y="2.2" width="15.5" height="7.6" rx="1.8" fill="currentColor" />
          <path d="M23.2 4.2v3.6c.8-.3 1.3-1 1.3-1.8s-.5-1.5-1.3-1.8Z" fill="currentColor" fillOpacity="0.45" />
        </svg>
      </span>
    </div>
  );
}

function TabBar({ active }: { active: AppTab }) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-10 h-[74px] border-t border-app-line bg-white/95 px-[4px] pt-[7px]">
      <div className="grid grid-cols-5">
        {TABS.map(({ key, label, icon: Icon }) => {
          const isActive = key === active;
          return (
            <div
              key={key}
              className={cn(
                "flex flex-col items-center gap-[3px] whitespace-nowrap text-[9px] font-medium tracking-[-0.02em]",
                isActive ? "text-app-text" : "text-[#6b7083]",
              )}
            >
              <Icon aria-hidden className="size-[21px]" strokeWidth={isActive ? 2.25 : 1.8} />
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
