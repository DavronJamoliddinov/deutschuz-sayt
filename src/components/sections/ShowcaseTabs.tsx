"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, m } from "motion/react";
import { BookOpen, BookText, Check, CirclePlay, GraduationCap, Layers } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ShowcaseKey, ShowcaseTab } from "@/content/showcase";
import { Phone, type AppTab } from "@/components/mockups/Phone";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/cn";

const META: Record<ShowcaseKey, { icon: LucideIcon; tint: string; appTab?: AppTab }> = {
  dictionary: { icon: BookOpen, tint: "#E4EDFF", appTab: "dictionary" },
  learn: { icon: Layers, tint: "#FFF1C2" },
  grammar: { icon: GraduationCap, tint: "#ECE5FF", appTab: "grammar" },
  reading: { icon: BookText, tint: "#DDF3E6" },
  videos: { icon: CirclePlay, tint: "#FFE3E1" },
};

const EASE = [0.16, 1, 0.3, 1] as const;

/** Ekranlar serverda tayyorlanadi va shu yerga props sifatida keladi — klient bundle'ga maket kodi tushmaydi. */
export function ShowcaseTabs({ tabs, screens, note }: { tabs: ShowcaseTab[]; screens: ReactNode[]; note: string }) {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const vertical = useMediaQuery("(min-width: 1024px)");
  const tab = tabs[active];
  if (!tab) return null;
  const meta = META[tab.key];

  const select = (index: number, focus: boolean) => {
    setActive(index);
    const button = refs.current[index];
    if (focus && button) {
      button.focus();
      button.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    // WAI-ARIA: harakat fokusdagi tabdan hisoblanadi (u tanlangan tab bo'lmasligi ham mumkin).
    const focused = refs.current.findIndex((el) => el === document.activeElement);
    const from = focused >= 0 ? focused : active;
    let next = -1;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (from + 1) % tabs.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (from - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    if (next < 0) return;
    event.preventDefault();
    select(next, true);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.62fr)] lg:items-center lg:gap-12">
      <div
        role="tablist"
        aria-label="Ilova boʻlimlari"
        aria-orientation={vertical ? "vertical" : "horizontal"}
        onKeyDown={onKeyDown}
        className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 py-1 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
      >
        {tabs.map((item, index) => {
          const selected = index === active;
          const Icon = META[item.key].icon;
          return (
            <button
              key={item.key}
              ref={(el) => {
                refs.current[index] = el;
              }}
              id={`showcase-tab-${item.key}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="showcase-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => select(index, false)}
              className={cn(
                "group relative flex shrink-0 items-center gap-3 rounded-full py-2.5 pl-3 pr-4 text-left transition-colors lg:rounded-[20px] lg:p-4",
                selected ? "text-paper" : "text-ink hover:bg-ink/[0.04]",
              )}
            >
              {selected && (
                <m.span
                  layoutId="showcase-active"
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-navy-900 shadow-[0_14px_30px_-16px_rgb(16_26_53/0.6)] lg:rounded-[20px]"
                  transition={{ type: "spring", stiffness: 400, damping: 36 }}
                />
              )}
              <span
                className={cn(
                  "relative grid size-8 shrink-0 place-items-center rounded-full transition-colors lg:size-10 lg:rounded-xl",
                  selected ? "bg-sun text-navy-900" : "bg-white text-ink-2 ring-1 ring-ink/[0.08]",
                )}
              >
                <Icon aria-hidden className="size-4 lg:size-[18px]" />
              </span>
              <span className="relative min-w-0">
                <span className="block text-[15px] font-semibold lg:text-[16px]">{item.label}</span>
                <span className={cn("hidden text-[13.5px] leading-snug lg:block", selected ? "text-paper/70" : "text-ink-3")}>
                  {item.title}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="showcase-panel"
        role="tabpanel"
        aria-labelledby={`showcase-tab-${tab.key}`}
        className="grid items-center gap-8 md:grid-cols-[auto_minmax(0,1fr)] md:gap-12"
      >
        <div className="relative mx-auto h-[520px] w-[300px] sm:h-[620px] sm:w-[340px]">
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-6 top-10 rounded-[44px] transition-colors duration-700"
            style={{ backgroundColor: meta.tint }}
          />
          <div className="absolute inset-0 flex justify-center pt-1">
            <AnimatePresence mode="popLayout" initial={false}>
              <m.div
                key={tab.key}
                initial={{ opacity: 0, y: 28, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98, transition: { duration: 0.25 } }}
                transition={{ duration: 0.55, ease: EASE }}
                className="origin-top scale-[0.86] sm:scale-100"
              >
                <Phone label={tab.screenLabel} tab={meta.appTab}>
                  {screens[active]}
                </Phone>
              </m.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[26rem] md:mx-0">
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={tab.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <h3 className="font-display text-[26px] font-semibold leading-tight tracking-[-0.03em]">{tab.title}</h3>
              <ul className="mt-5 space-y-3">
                {tab.points.map((point) => (
                  <li key={point} className="flex gap-3 text-[15.5px] leading-snug text-ink-2">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-das/12 text-das">
                      <Check aria-hidden className="size-3" strokeWidth={3} />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </m.div>
          </AnimatePresence>
          <p className="mt-8 text-[13px] text-ink-3">{note}</p>
        </div>
      </div>
    </div>
  );
}
