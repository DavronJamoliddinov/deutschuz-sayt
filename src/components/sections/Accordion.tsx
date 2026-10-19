"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/content/faq";
import { cn } from "@/lib/cn";

/**
 * WAI-ARIA accordion: sarlavha — tugma (aria-expanded/aria-controls), yopiq panel `inert` (fokus va ekran
 * o'quvchidan yashirin). Balandlik animatsiyasi CSS grid (0fr → 1fr) bilan — JS o'lchovi yo'q.
 */
export function Accordion({ items, headingLevel: Heading = "h3" }: { items: FaqItem[]; headingLevel?: "h2" | "h3" }) {
  const [open, setOpen] = useState<ReadonlySet<number>>(() => new Set([0]));
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const toggle = (index: number) =>
    setOpen((previous) => {
      const next = new Set(previous);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = -1;
    if (event.key === "ArrowDown") next = (index + 1) % items.length;
    else if (event.key === "ArrowUp") next = (index - 1 + items.length) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    if (next < 0) return;
    event.preventDefault();
    refs.current[next]?.focus();
  };

  return (
    <div className="divide-y divide-line overflow-hidden rounded-[28px] bg-white shadow-card ring-1 ring-ink/[0.06]">
      {items.map((item, index) => {
        const isOpen = open.has(index);
        return (
          <div key={item.question}>
            <Heading>
              <button
                ref={(el) => {
                  refs.current[index] = el;
                }}
                id={`faq-q-${index}`}
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-a-${index}`}
                onClick={() => toggle(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className="group flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-paper/70 focus-visible:-outline-offset-2 sm:px-8 sm:py-6"
              >
                <span className="font-display text-[17px] font-semibold leading-snug tracking-[-0.02em] text-ink sm:text-[18.5px]">
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-full transition-[transform,background-color,color] duration-500 ease-out-expo",
                    isOpen ? "rotate-45 bg-navy-900 text-sun" : "bg-paper-2 text-ink group-hover:bg-line",
                  )}
                >
                  <Plus className="size-[18px]" strokeWidth={2.25} />
                </span>
              </button>
            </Heading>
            <div
              id={`faq-a-${index}`}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500 ease-out-expo motion-reduce:transition-none",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-[15.5px] leading-[1.7] text-ink-2 sm:px-8 sm:pb-7 sm:pr-24">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
