import type { CSSProperties } from "react";
import { ParallaxLayer, ParallaxStage } from "@/components/motion/Parallax";
import { Phone } from "@/components/mockups/Phone";
import { WordScreen } from "@/components/mockups/screens/WordScreen";
import { ArticleCard, GoalCard, GrammarCard, SpeakingCard } from "@/components/mockups/FloatingCards";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * Hero kompozitsiyasi: markazda lug'at sahifasi, atrofida ilovaning boshqa qismlari (grammatika, kunlik
 * maqsad, AI bilan gapirish, der/die/das). Kartalar faqat telefon ramkasiga chiqib turadi — ekrandagi asosiy
 * matnni yopmaydi. Yon kartalar joy yetarli bo'lgan kengliklardagina ko'rsatiladi. Kartalar bezak:
 * telefonning aria-label'i hammasini tavsiflaydi.
 */
export function HeroVisual({ label }: { label: string }) {
  return (
    <div className="relative mx-auto h-[500px] w-full max-w-[580px] sm:h-[660px] lg:mx-0 lg:ml-auto lg:h-[640px]">
      <ParallaxStage className="absolute inset-0">
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(30_107_240/0.42),transparent_64%)] sm:size-[600px]"
        />

        <ParallaxLayer depth={8} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="hero-float scale-[0.8] sm:scale-100 lg:scale-[0.96] xl:scale-100" style={delay(220)}>
            <Phone label={label} tab="dictionary">
              <WordScreen />
            </Phone>
          </div>
        </ParallaxLayer>

        <ParallaxLayer depth={22} className="absolute left-[-8%] top-[13%] hidden md:block lg:hidden xl:block">
          <div aria-hidden className="hero-float" style={delay(520)}>
            <GrammarCard />
          </div>
        </ParallaxLayer>

        <ParallaxLayer depth={16} className="absolute right-[-2%] top-[1%] sm:right-[1%] sm:top-[4%]">
          <div aria-hidden className="hero-float origin-top-right scale-[0.8] sm:scale-100" style={delay(620)}>
            <GoalCard />
          </div>
        </ParallaxLayer>

        <ParallaxLayer depth={28} className="absolute right-[-9%] top-[51%] hidden md:block lg:hidden xl:block">
          <div aria-hidden className="hero-float" style={delay(720)}>
            <SpeakingCard />
          </div>
        </ParallaxLayer>

        <ParallaxLayer depth={19} className="absolute bottom-[8%] left-[2%] hidden sm:block md:left-[-9%] lg:hidden xl:left-[-12%] xl:block">
          <div aria-hidden className="hero-float origin-bottom-left" style={delay(820)}>
            <ArticleCard />
          </div>
        </ParallaxLayer>
      </ParallaxStage>
    </div>
  );
}
