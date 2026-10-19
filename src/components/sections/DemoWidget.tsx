"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, m, type Variants } from "motion/react";
import { Check, Flame, RotateCcw, Repeat2, Sparkles, X } from "lucide-react";
import { demoCards, demoIntro, quizItems, type Article } from "@/content/demo";
import { articleBg, articleText } from "@/components/mockups/parts";
import { cn } from "@/lib/cn";

type Tab = "cards" | "quiz";
const TABS: { key: Tab; label: string }[] = [
  { key: "cards", label: demoIntro.tabs.cards },
  { key: "quiz", label: demoIntro.tabs.quiz },
];
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Chiqib ketayotgan karta yo'nalishi AnimatePresence'ning `custom` qiymatidan olinadi: kalit almashganda eski
 * element oldingi render props'i bilan qoladi, shuning uchun yo'nalishni props orqali berib bo'lmaydi.
 */
const cardVariants: Variants = {
  initial: { opacity: 0, y: 26, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1, x: 0, rotate: 0, transition: { duration: 0.5, ease: EASE } },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * 150,
    rotate: direction * 7,
    transition: { duration: 0.32, ease: EASE },
  }),
};

export function DemoWidget() {
  const [tab, setTab] = useState<Tab>("cards");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const onTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const focused = tabRefs.current.findIndex((el) => el === document.activeElement);
    const index = focused >= 0 ? focused : TABS.findIndex((t) => t.key === tab);
    let next = -1;
    if (event.key === "ArrowRight") next = (index + 1) % TABS.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + TABS.length) % TABS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = TABS.length - 1;
    const target = TABS[next];
    if (!target) return;
    event.preventDefault();
    setTab(target.key);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="rounded-[30px] bg-paper p-4 text-ink shadow-[0_50px_100px_-40px_rgb(0_0_0/0.7)] ring-1 ring-white/10 sm:p-6">
      <div
        role="tablist"
        aria-label="Mashq turi"
        onKeyDown={onTabKeyDown}
        className="grid grid-cols-2 rounded-full bg-paper-2 p-1 ring-1 ring-inset ring-ink/[0.06]"
      >
        {TABS.map(({ key, label }, index) => {
          const selected = key === tab;
          return (
            <button
              key={key}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              id={`demo-tab-${key}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`demo-panel-${key}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setTab(key)}
              className={cn(
                "relative h-11 rounded-full text-[14.5px] font-semibold transition-colors",
                selected ? "text-ink" : "text-ink-3 hover:text-ink",
              )}
            >
              {selected && (
                <m.span
                  layoutId="demo-tab"
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-white shadow-[0_1px_3px_rgb(16_26_53/0.12)] ring-1 ring-ink/5"
                  transition={{ type: "spring", stiffness: 480, damping: 38 }}
                />
              )}
              <span className="relative">{label}</span>
            </button>
          );
        })}
      </div>

      <div id="demo-panel-cards" role="tabpanel" aria-labelledby="demo-tab-cards" hidden={tab !== "cards"} className="mt-5">
        <Flashcards />
      </div>
      <div id="demo-panel-quiz" role="tabpanel" aria-labelledby="demo-tab-quiz" hidden={tab !== "quiz"} className="mt-5">
        <ArticleQuiz />
      </div>
    </div>
  );
}

/* ---------- Kartochkalar ---------- */

function Flashcards() {
  const total = demoCards.length;
  const [queue, setQueue] = useState<number[]>(() => demoCards.map((_, i) => i));
  const [known, setKnown] = useState<number[]>([]);
  const [flipped, setFlipped] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [round, setRound] = useState(0);
  const [announcement, setAnnouncement] = useState("");

  const currentIndex = queue[0];
  const card = currentIndex !== undefined ? demoCards[currentIndex] : undefined;

  const flip = () => {
    if (!card) return;
    const next = !flipped;
    setFlipped(next);
    setAnnouncement(next ? `Tarjima: ${card.uz}. Misol: ${card.exampleDe} — ${card.exampleUz}` : "Kartaning old tomoni");
  };

  const answer = (knewIt: boolean) => {
    if (currentIndex === undefined) return;
    setDirection(knewIt ? 1 : -1);
    setFlipped(false);
    setRound((r) => r + 1);
    if (knewIt) {
      const nextKnown = [...known, currentIndex];
      setKnown(nextKnown);
      setQueue((q) => q.slice(1));
      setAnnouncement(nextKnown.length === total ? "Barcha soʻzlarni bildingiz!" : `Bildim: ${nextKnown.length} / ${total}`);
    } else {
      setQueue((q) => [...q.slice(1), currentIndex]);
      setAnnouncement("Bu soʻz navbat oxiriga qoʻyildi");
    }
  };

  const reset = () => {
    setQueue(demoCards.map((_, i) => i));
    setKnown([]);
    setFlipped(false);
    setDirection(1);
    setRound((r) => r + 1);
    setAnnouncement("Kartochkalar qaytadan boshlandi");
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-[13px]">
        <span className="font-semibold text-ink-2">A1 · namuna</span>
        <span className="tabular-nums text-ink-3">
          Bildim: <span className="font-semibold text-ink">{known.length}</span> / {total}
        </span>
      </div>
      <div className="mt-2.5 flex gap-1.5" aria-hidden>
        {demoCards.map((c, i) => (
          <span
            key={c.word}
            className={cn("h-1.5 flex-1 rounded-full transition-colors duration-500", known.includes(i) ? "bg-das" : "bg-ink/10")}
          />
        ))}
      </div>

      <div className="relative mt-5 h-[318px] [perspective:1400px] sm:h-[330px]">
        <AnimatePresence custom={direction} initial={false}>
          {card ? (
            <m.div
              key={`${currentIndex}-${round}`}
              custom={direction}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0"
            >
              <button
                type="button"
                onClick={flip}
                aria-pressed={flipped}
                className="group/card block size-full rounded-[24px] text-left [perspective:1400px]"
              >
                <m.span
                  className="relative block size-full [transform-style:preserve-3d]"
                  animate={{ rotateY: flipped ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 210, damping: 24 }}
                >
                  <CardFace hidden={flipped}>
                    <span className="flex items-center justify-between text-[12px] font-semibold text-ink-3">
                      <span className="rounded-full bg-paper-2 px-2.5 py-1">{card.article ? "ot" : "feʼl"}</span>
                      <span className="inline-flex items-center gap-1.5">
                        <Repeat2 aria-hidden className="size-3.5" />
                        Aylantiring
                      </span>
                    </span>
                    <span className="flex flex-1 flex-col items-center justify-center text-center">
                      {card.article && (
                        <span className={cn("text-[17px] font-semibold", articleText[card.article])}>{card.article}</span>
                      )}
                      <span className="font-serif text-[clamp(2.75rem,2rem+3vw,3.5rem)] italic leading-[1.05] tracking-[-0.01em] text-ink">
                        {card.word}
                      </span>
                      <span className="mt-3 text-[13.5px] text-ink-3">
                        {card.formsLabel}: <span className="font-medium text-ink-2">{card.forms}</span>
                      </span>
                    </span>
                    <span className="text-center text-[13px] text-ink-3 transition-colors group-hover/card:text-ink-2">
                      Tarjimani koʻrish uchun bosing
                    </span>
                  </CardFace>

                  <CardFace back hidden={!flipped}>
                    <span className="flex items-center justify-between text-[12px] font-semibold text-ink-3">
                      <span>
                        {card.article && <span className={articleText[card.article]}>{card.article} </span>}
                        <span className="text-ink-2">{card.word}</span>
                      </span>
                      <span className="rounded-full bg-sun-soft px-2.5 py-1 text-[#7a5a00]">tarjima</span>
                    </span>
                    <span className="flex flex-1 flex-col items-center justify-center text-center">
                      <span className="font-display text-[clamp(2rem,1.6rem+1.6vw,2.6rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
                        {card.uz}
                      </span>
                      <span className="mt-5 block w-full rounded-2xl bg-paper-2 px-4 py-3 text-left">
                        <span className="block text-[14.5px] font-medium text-ink">{card.exampleDe}</span>
                        <span className="block text-[13.5px] text-ink-3">{card.exampleUz}</span>
                      </span>
                    </span>
                    <span className="text-center text-[13px] text-ink-3">Yana bosing — old tomoniga</span>
                  </CardFace>
                </m.span>
              </button>
            </m.div>
          ) : (
            <m.div
              key="done"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="absolute inset-0 flex flex-col items-center justify-center rounded-[24px] bg-white p-6 text-center ring-1 ring-ink/[0.06]"
            >
              <m.span
                initial={{ scale: 0.5, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
                className="grid size-16 place-items-center rounded-full bg-das text-white"
              >
                <Check aria-hidden className="size-8" strokeWidth={3} />
              </m.span>
              <span className="mt-5 font-display text-[26px] font-semibold tracking-[-0.03em]">Barakalla!</span>
              <span className="mt-2 max-w-[22rem] text-[15px] leading-relaxed text-ink-2">
                Barcha {total} ta soʻzni bildingiz. Ilovada bu soʻzlar FSRS jadvali boʻyicha oʻz vaqtida takrorlashga qaytadi.
              </span>
              <button
                type="button"
                onClick={reset}
                className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-navy-900 px-5 text-[14.5px] font-semibold text-paper transition-transform hover:-translate-y-px active:scale-[0.98]"
              >
                <RotateCcw aria-hidden className="size-4" />
                Qaytadan
              </button>
            </m.div>
          )}
        </AnimatePresence>
      </div>

      <div className={cn("mt-4 grid grid-cols-2 gap-3", !card && "invisible")}>
        <button
          type="button"
          onClick={() => answer(false)}
          disabled={!card}
          className="h-12 rounded-2xl bg-white text-[15px] font-semibold text-ink-2 ring-1 ring-inset ring-ink/10 transition-[background-color,transform] hover:bg-paper-2 active:scale-[0.98]"
        >
          Yana koʻrsat
        </button>
        <button
          type="button"
          onClick={() => answer(true)}
          disabled={!card}
          className="h-12 rounded-2xl bg-navy-900 text-[15px] font-semibold text-paper transition-[background-color,transform] hover:bg-navy-800 active:scale-[0.98]"
        >
          Bildim
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </div>
  );
}

function CardFace({ back = false, hidden, children }: { back?: boolean; hidden: boolean; children: ReactNode }) {
  return (
    <span
      aria-hidden={hidden}
      className={cn(
        "absolute inset-0 flex flex-col rounded-[24px] bg-white p-5 shadow-[0_18px_40px_-24px_rgb(16_26_53/0.35)] ring-1 ring-ink/[0.07] [backface-visibility:hidden] sm:p-6",
        back && "[transform:rotateY(180deg)]",
      )}
    >
      {children}
    </span>
  );
}

/* ---------- der / die / das ---------- */

const ARTICLES: Article[] = ["der", "die", "das"];

function ArticleQuiz() {
  const total = quizItems.length;
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<Article | null>(null);
  const [results, setResults] = useState<boolean[]>([]);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const nextRef = useRef<HTMLButtonElement>(null);
  const item = quizItems[index];
  const score = results.filter(Boolean).length;

  useEffect(() => {
    if (picked) nextRef.current?.focus({ preventScroll: true });
  }, [picked]);

  const choose = (article: Article) => {
    if (picked || !item) return;
    const correct = article === item.article;
    const nextStreak = correct ? streak + 1 : 0;
    setPicked(article);
    setResults((r) => [...r, correct]);
    setStreak(nextStreak);
    setBestStreak((b) => Math.max(b, nextStreak));
  };

  const next = () => {
    setPicked(null);
    setIndex((i) => i + 1);
  };

  const reset = () => {
    setIndex(0);
    setPicked(null);
    setResults([]);
    setStreak(0);
    setBestStreak(0);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const choice = ARTICLES[Number(event.key) - 1];
    if (choice && !picked && item) {
      event.preventDefault();
      choose(choice);
    }
  };

  if (!item) {
    const message =
      score === total ? "Ajoyib — hammasi toʻgʻri!" : score >= total - 2 ? "Yaxshi natija!" : "Mashq qilsangiz, artikllar tez yodlanadi.";
    return (
      <div className="flex h-[452px] flex-col items-center justify-center rounded-[24px] bg-white p-6 text-center ring-1 ring-ink/[0.06] sm:h-[464px]">
        <span className="font-display text-[56px] font-semibold leading-none tracking-[-0.04em] tabular-nums">
          {score}
          <span className="text-ink-3">/{total}</span>
        </span>
        <span className="mt-3 font-display text-[22px] font-semibold tracking-[-0.02em]">{message}</span>
        <span className="mt-2 max-w-[22rem] text-[15px] leading-relaxed text-ink-2">
          Eng uzun seriya: {bestStreak}. Ilovada xato qilingan soʻzlar «Qiyin soʻzlar» roʻyxatiga tushadi.
        </span>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-navy-900 px-5 text-[14.5px] font-semibold text-paper transition-transform hover:-translate-y-px active:scale-[0.98]"
        >
          <RotateCcw aria-hidden className="size-4" />
          Qaytadan
        </button>
      </div>
    );
  }

  const correct = picked === item.article;

  return (
    <div onKeyDown={onKeyDown}>
      <div className="flex items-center justify-between gap-3 text-[13px]">
        <span className="font-semibold text-ink-2 tabular-nums">
          Savol {index + 1} / {total}
        </span>
        <span className="inline-flex items-center gap-1.5 tabular-nums text-ink-3">
          <Flame aria-hidden className={cn("size-4 transition-colors", streak > 0 ? "fill-[#FF8A1F] text-[#FF8A1F]" : "")} />
          Seriya: <span className="font-semibold text-ink">{streak}</span>
        </span>
      </div>
      <div className="mt-2.5 flex gap-1.5" aria-hidden>
        {quizItems.map((q, i) => (
          <span
            key={q.word}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors duration-500",
              results[i] === true ? "bg-das" : results[i] === false ? "bg-die" : i === index ? "bg-ink/30" : "bg-ink/10",
            )}
          />
        ))}
      </div>

      <div className="mt-5 rounded-[24px] bg-white p-5 ring-1 ring-ink/[0.07] sm:p-6">
        <div className="text-center">
          <div className="text-[13px] font-semibold text-ink-3">Qaysi artikl?</div>
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={item.word}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="mt-2 font-serif text-[clamp(2.75rem,2rem+3vw,3.5rem)] italic leading-[1.1] tracking-[-0.01em] text-ink"
            >
              {item.word}
            </m.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2.5" role="group" aria-label="Artiklni tanlang">
          {ARTICLES.map((article, i) => {
            const isAnswer = picked !== null && article === item.article;
            const isWrongPick = picked === article && article !== item.article;
            return (
              <button
                key={article}
                type="button"
                onClick={() => choose(article)}
                aria-disabled={picked !== null}
                aria-keyshortcuts={String(i + 1)}
                className={cn(
                  "relative flex h-14 items-center justify-center gap-1.5 rounded-2xl text-[17px] font-semibold transition-[background-color,color,opacity,transform,box-shadow] duration-300",
                  picked === null && "ring-1 ring-inset hover:-translate-y-0.5 active:scale-[0.97]",
                  picked === null && article === "der" && "text-der ring-der/30 hover:bg-der/[0.06]",
                  picked === null && article === "die" && "text-die ring-die/30 hover:bg-die/[0.06]",
                  picked === null && article === "das" && "text-das ring-das/30 hover:bg-das/[0.06]",
                  isAnswer && cn(articleBg[article], "text-white shadow-[0_10px_24px_-12px_rgb(16_26_53/0.5)]"),
                  isWrongPick && "bg-ink/[0.06] text-ink-3 line-through decoration-2",
                  picked !== null && !isAnswer && !isWrongPick && "text-ink-3 opacity-45 ring-1 ring-inset ring-ink/10",
                )}
              >
                {article}
                {isAnswer && <Check aria-hidden className="size-[18px]" strokeWidth={3} />}
                {isWrongPick && <X aria-hidden className="size-[18px]" strokeWidth={3} />}
                <kbd className="absolute right-2 top-1.5 hidden font-sans text-[10px] font-medium text-current opacity-50 sm:block">{i + 1}</kbd>
              </button>
            );
          })}
        </div>

        <div aria-live="polite" className="mt-5 min-h-[92px]">
          {picked && (
            <m.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: EASE }}>
              <p className={cn("text-[15px] font-semibold", correct ? "text-das" : "text-die")}>
                {correct ? "Toʻgʻri!" : "Afsus."}{" "}
                <span className="font-medium text-ink">
                  {correct ? "" : "Toʻgʻrisi: "}
                  <span className={articleText[item.article]}>{item.article}</span> {item.word} — {item.uz}
                </span>
              </p>
              {item.tip && (
                <p className="mt-2 flex gap-2 rounded-xl bg-sun-soft px-3 py-2 text-[13.5px] leading-snug text-ink-2">
                  <Sparkles aria-hidden className="mt-0.5 size-4 shrink-0 text-[#a87b00]" />
                  {item.tip}
                </p>
              )}
            </m.div>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="hidden text-[12.5px] text-ink-3 sm:block">
          Klaviatura: <kbd className="rounded bg-paper-2 px-1.5 py-0.5 font-sans font-semibold">1</kbd>{" "}
          <kbd className="rounded bg-paper-2 px-1.5 py-0.5 font-sans font-semibold">2</kbd>{" "}
          <kbd className="rounded bg-paper-2 px-1.5 py-0.5 font-sans font-semibold">3</kbd>
        </p>
        <button
          ref={nextRef}
          type="button"
          onClick={next}
          disabled={!picked}
          className="ml-auto inline-flex h-12 items-center gap-2 rounded-2xl bg-navy-900 px-6 text-[15px] font-semibold text-paper transition-[opacity,transform,background-color] hover:bg-navy-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-35"
        >
          {index + 1 === total ? "Natijani koʻrish" : "Keyingisi"}
        </button>
      </div>
    </div>
  );
}
