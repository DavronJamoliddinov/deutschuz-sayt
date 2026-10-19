import { Fragment, type CSSProperties, type ReactNode } from "react";
import { Check } from "lucide-react";
import { hero } from "@/content/home";
import { startCta } from "@/content/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { HeroVisual } from "./HeroVisual";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero({ storesAvailable }: { storesAvailable: boolean }) {
  return (
    <section id="top" aria-labelledby="hero-title" className="surface-dark relative isolate overflow-hidden bg-navy-900 text-paper">
      <Backdrop />
      <div className="container-page relative grid items-center gap-6 pb-32 pt-28 sm:gap-10 sm:pb-40 sm:pt-36 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:gap-6 lg:pb-44 lg:pt-36">
        <div className="relative z-10 max-w-[40rem]">
          <p
            className="hero-in inline-flex items-center gap-2.5 rounded-full border border-white/[0.12] bg-white/[0.05] py-1.5 pl-3 pr-3.5 text-[13.5px] font-medium text-paper/80"
            style={delay(0)}
          >
            <span aria-hidden className="relative flex size-2">
              <span className="ping-soft absolute inset-0 rounded-full bg-sun" />
              <span className="relative size-2 rounded-full bg-sun" />
            </span>
            {storesAvailable ? hero.statusLive : hero.statusSoon}
          </p>

          <h1
            id="hero-title"
            className="mt-7 font-display text-[clamp(2.7rem,1.5rem+5.2vw,5.6rem)] font-semibold leading-[1.02] tracking-[-0.045em]"
          >
            {hero.titleWords.map((word, index) => (
              <Fragment key={word}>
                <span className="hero-word" style={{ "--i": index } as CSSProperties}>
                  {index === hero.highlight ? <Highlight>{word}</Highlight> : word}
                </span>
                {index < hero.titleWords.length - 1 && " "}
              </Fragment>
            ))}
          </h1>

          <p className="hero-in mt-7 max-w-[34rem] text-[17.5px] leading-[1.65] text-paper/75 sm:text-[19px]" style={delay(480)}>
            {hero.lead}
          </p>

          <div className="hero-in mt-9 flex flex-col gap-3 sm:flex-row" style={delay(580)}>
            <ButtonLink href={startCta.href} size="lg" arrow>
              {startCta.label}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} size="lg" variant="ghost-dark">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>

          <ul className="hero-in mt-10 flex flex-wrap gap-x-6 gap-y-3 text-[14.5px] text-paper/70" style={delay(680)}>
            {hero.highlights.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-full bg-sun/15 text-sun">
                  <Check aria-hidden className="size-3" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual label={hero.visualLabel} />
      </div>
    </section>
  );
}

/** Ajratilgan so'z: sariq rang va ostida qo'lda chizilgandek chiziq (CSS bilan chiziladi). */
function Highlight({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block text-sun">
      {children}
      <svg
        aria-hidden
        viewBox="0 0 300 20"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -bottom-[0.02em] left-[-1%] h-[0.2em] w-[102%] overflow-visible"
      >
        <path
          d="M5 13C62 6 128 4 190 8s86 8 105 3"
          pathLength={1}
          fill="none"
          stroke="#F06455"
          strokeWidth={6}
          strokeLinecap="round"
          className="draw-path"
          style={delay(950)}
        />
      </svg>
    </span>
  );
}

function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_10%_-10%,#1d2f5c_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-grid-dark mask-radial opacity-80" />
      <div className="absolute -right-[12%] top-[6%] size-[680px] rounded-full bg-[radial-gradient(circle,rgb(255_212_71/0.14),transparent_62%)]" />
      <div className="absolute -bottom-[28%] right-[22%] size-[560px] rounded-full bg-[radial-gradient(circle,rgb(240_100_85/0.13),transparent_65%)]" />
    </div>
  );
}
