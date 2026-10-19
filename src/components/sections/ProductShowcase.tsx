import type { JSX } from "react";
import { showcaseIntro, showcaseTabs, type ShowcaseKey } from "@/content/showcase";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SearchScreen } from "@/components/mockups/screens/SearchScreen";
import { FlashcardScreen } from "@/components/mockups/screens/FlashcardScreen";
import { GrammarScreen } from "@/components/mockups/screens/GrammarScreen";
import { ReadingScreen } from "@/components/mockups/screens/ReadingScreen";
import { VideoScreen } from "@/components/mockups/screens/VideoScreen";
import { ShowcaseTabs } from "./ShowcaseTabs";

const SCREENS: Record<ShowcaseKey, () => JSX.Element> = {
  dictionary: SearchScreen,
  learn: FlashcardScreen,
  grammar: GrammarScreen,
  reading: ReadingScreen,
  videos: VideoScreen,
};

export function ProductShowcase() {
  const screens = showcaseTabs.map((tab) => {
    const Screen = SCREENS[tab.key];
    return <Screen key={tab.key} />;
  });

  return (
    <section id="ilova" aria-labelledby="showcase-title" className="cv-auto relative overflow-hidden py-24 sm:py-32 lg:py-36">
      <div className="container-page">
        <SectionHeader id="showcase-title" eyebrow={showcaseIntro.eyebrow} title={showcaseIntro.title} lead={showcaseIntro.lead} />
        <div data-reveal className="mt-12 lg:mt-14">
          <ShowcaseTabs tabs={showcaseTabs} screens={screens} note={showcaseIntro.note} />
        </div>
      </div>
    </section>
  );
}
