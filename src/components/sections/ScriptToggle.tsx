"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, m } from "motion/react";
import { cn } from "@/lib/cn";

type Script = "latn" | "cyrl";

const SCRIPTS: { key: Script; label: string }[] = [
  { key: "latn", label: "Lotin" },
  { key: "cyrl", label: "Кирилл" },
];

const SAMPLE: Record<Script, { translationLabel: string; translation: string; exampleLabel: string; example: string }> = {
  latn: { translationLabel: "Tarjima", translation: "koʻcha", exampleLabel: "Misol", example: "Bu koʻcha juda tinch." },
  cyrl: { translationLabel: "Таржима", translation: "кўча", exampleLabel: "Мисол", example: "Бу кўча жуда тинч." },
};

/** Ilova tilini almashtirish namunasi: o'zbekcha matn alifbosi o'zgaradi, nemischa matn lotinda qoladi. */
export function ScriptToggle() {
  const [script, setScript] = useState<Script>("latn");
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const sample = SAMPLE[script];

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const focused = refs.current.findIndex((el) => el === document.activeElement);
    const index = focused >= 0 ? focused : SCRIPTS.findIndex((s) => s.key === script);
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % SCRIPTS.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + SCRIPTS.length) % SCRIPTS.length;
    else return;
    event.preventDefault();
    const target = SCRIPTS[next];
    if (!target) return;
    setScript(target.key);
    refs.current[next]?.focus();
  };

  return (
    <div>
      <div
        role="radiogroup"
        aria-label="Ilova alifbosi"
        onKeyDown={onKeyDown}
        className="inline-flex rounded-full bg-paper-2 p-1 ring-1 ring-inset ring-ink/[0.06]"
      >
        {SCRIPTS.map(({ key, label }, index) => {
          const selected = key === script;
          return (
            <button
              key={key}
              ref={(el) => {
                refs.current[index] = el;
              }}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => setScript(key)}
              className={cn(
                "relative h-9 min-w-[88px] rounded-full px-4 text-[13.5px] font-semibold transition-colors",
                selected ? "text-ink" : "text-ink-3 hover:text-ink",
              )}
            >
              {selected && (
                <m.span
                  layoutId="script-pill"
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-white shadow-[0_1px_3px_rgb(16_26_53/0.12)] ring-1 ring-ink/5"
                  transition={{ type: "spring", stiffness: 500, damping: 38 }}
                />
              )}
              <span className="relative">{label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded-2xl bg-app-bg p-4 text-app-ink">
        <div className="text-[19px] font-bold tracking-[-0.02em]">
          <span className="text-die">die</span> Straße
        </div>
        <div aria-live="polite" className="min-h-[106px]">
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={script}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mt-0.5 text-[15.5px] text-app-muted">
                <span className="sr-only">{sample.translationLabel}: </span>
                {sample.translation}
              </div>
              <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-app-muted">{sample.exampleLabel}</div>
              <div className="mt-1 text-[14px] font-medium">Diese Straße ist sehr ruhig.</div>
              <div className="text-[13.5px] text-app-muted">{sample.example}</div>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
