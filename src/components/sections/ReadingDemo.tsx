"use client";

import { Fragment, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { BookText } from "lucide-react";
import { readingDictionary, readingIntro, readingText, type ReadingWord } from "@/content/reading";
import { articleText } from "@/components/mockups/parts";
import { cn } from "@/lib/cn";

type Position = { s: number; p: number };

/**
 * O'qish matni: so'z bosilsa (yoki klaviatura bilan tanlansa) tarjimasi matn ostidagi panelda chiqadi —
 * sahifa almashmaydi, matn joyida qoladi. Klaviatura: Tab — matnga kirish, ←/→ — so'zlar bo'ylab, Enter/Bo'sh joy — tanlash.
 */
export function ReadingDemo() {
  const { words, indexOf } = useMemo(() => {
    const list: Position[] = [];
    readingText.sentences.forEach((sentence, s) =>
      sentence.parts.forEach((part, p) => {
        if (typeof part !== "string" && part.id) list.push({ s, p });
      }),
    );
    return { words: list, indexOf: new Map(list.map((pos, i) => [`${pos.s}:${pos.p}`, i])) };
  }, []);

  const [selected, setSelected] = useState<Position | null>(null);
  const [focusIndex, setFocusIndex] = useState(0);
  const [tapped, setTapped] = useState<string[]>([]);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const selectedWord = selected ? (readingText.sentences[selected.s]?.parts[selected.p] as ReadingWord | undefined) : undefined;
  const entry = selectedWord?.id ? readingDictionary[selectedWord.id] : undefined;

  const choose = (position: Position, index: number) => {
    const part = readingText.sentences[position.s]?.parts[position.p];
    if (!part || typeof part === "string" || !part.id) return;
    const id = part.id;
    setSelected(position);
    setFocusIndex(index);
    setTapped((list) => [id, ...list.filter((item) => item !== id)].slice(0, 8));
  };

  const onKeyDown = (event: KeyboardEvent<HTMLParagraphElement>) => {
    let next = -1;
    if (event.key === "ArrowRight") next = Math.min(focusIndex + 1, words.length - 1);
    else if (event.key === "ArrowLeft") next = Math.max(focusIndex - 1, 0);
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = words.length - 1;
    if (next < 0) return;
    event.preventDefault();
    setFocusIndex(next);
    refs.current[next]?.focus();
  };

  return (
    <div className="overflow-hidden rounded-[28px] bg-white shadow-card ring-1 ring-ink/[0.06]">
      <div className="flex items-start justify-between gap-4 border-b border-line px-5 pb-4 pt-5 sm:px-7">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-[0.12em] text-ink-3">
            <BookText aria-hidden className="size-4" />
            Matn · namuna
          </div>
          <h3 className="mt-2 font-display text-[22px] font-semibold tracking-[-0.03em] text-ink" lang="de">
            {readingText.title}
          </h3>
          <p className="text-[14px] text-ink-3">{readingText.titleUz}</p>
        </div>
        <span className="shrink-0 rounded-full bg-paper-2 px-3 py-1 text-[12.5px] font-semibold text-ink-2">{readingText.level}</span>
      </div>

      <p
        role="group"
        aria-label={readingIntro.textLabel}
        lang="de"
        onKeyDown={onKeyDown}
        className="px-4 py-5 text-[18px] leading-[2.05] text-ink sm:px-6 sm:text-[19px]"
      >
        {readingText.sentences.map((sentence, s) => (
          <Fragment key={s}>
            {sentence.parts.map((part, p) => {
              if (typeof part === "string") return <Fragment key={p}>{part}</Fragment>;
              if (!part.id) return <span key={p}>{part.w}</span>;
              const index = indexOf.get(`${s}:${p}`) ?? 0;
              const isSelected = selected?.s === s && selected?.p === p;
              const seen = tapped.includes(part.id);
              // Keyingi bo'lak tinish belgisi bo'lsa (Internet.), o'ng padding manfiy margin bilan to'liq qoplanadi —
              // nuqta oddiy matndagidek so'zga yopishadi, belgi foni nuqta ostiga biroz kiradi.
              const next = sentence.parts[p + 1];
              const punctuationNext = typeof next === "string" && next.trim() !== "";
              return (
                <button
                  key={p}
                  ref={(el) => {
                    refs.current[index] = el;
                  }}
                  type="button"
                  tabIndex={index === focusIndex ? 0 : -1}
                  aria-pressed={isSelected}
                  onClick={() => choose({ s, p }, index)}
                  className={cn(
                    "-ml-[1px] rounded-[7px] px-[3px] py-[1px] transition-[background-color,color,box-shadow] duration-200",
                    punctuationNext ? "-mr-[3px]" : "-mr-[1px]",
                    isSelected
                      ? "bg-sun text-navy-900 shadow-[0_6px_14px_-8px_rgb(16_26_53/0.5)]"
                      : seen
                        ? "bg-sun-soft hover:bg-sun/50"
                        : "hover:bg-sun/40",
                  )}
                >
                  {part.w}
                </button>
              );
            })}
            {s < readingText.sentences.length - 1 && " "}
          </Fragment>
        ))}
      </p>

      <div aria-live="polite" className="min-h-[9.5rem] border-t border-line bg-paper px-5 py-4 sm:px-7">
        {entry && selectedWord && selected ? (
          <div key={`${selected.s}-${selected.p}`} className="animate-[rise_0.35s_var(--ease-out-expo)_both] motion-reduce:animate-none">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="font-display text-[24px] font-semibold tracking-[-0.03em] text-ink" lang="de">
                {entry.article && <span className={cn("mr-1.5 text-[17px] font-semibold", articleText[entry.article])}>{entry.article}</span>}
                {entry.lemma}
              </span>
              <span className="text-[18px] font-semibold text-ink-2">— {entry.uz}</span>
            </div>
            {selectedWord.form && <p className="mt-1 text-[14px] text-ink-3">{selectedWord.form}</p>}
            <p className="mt-3 text-[13px] leading-snug text-ink-3">
              <span className="font-semibold text-ink-2">{readingIntro.sentenceLabel}:</span> {readingText.sentences[selected.s]?.uz}
            </p>
          </div>
        ) : (
          <p className="text-[15px] text-ink-3">{readingIntro.hint}</p>
        )}
      </div>

      {tapped.length > 0 && (
        <div className="border-t border-line px-5 py-4 sm:px-7">
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-3">{readingIntro.tappedTitle}</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {tapped.map((id) => {
              const item = readingDictionary[id];
              if (!item) return null;
              return (
                <li key={id} className="rounded-full bg-paper-2 px-3 py-1 text-[13px] text-ink-2">
                  <span lang="de" className="font-semibold text-ink">
                    {item.article ? `${item.article} ` : ""}
                    {item.lemma}
                  </span>{" "}
                  — {item.uz}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
