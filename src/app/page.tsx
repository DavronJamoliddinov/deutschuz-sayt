import { site, storeState } from "@/config/site";
import { Hero } from "@/components/sections/Hero";
import { FactsBand } from "@/components/sections/FactsBand";
import { NewsSpotlight } from "@/components/sections/NewsSpotlight";
import { Approach } from "@/components/sections/Approach";
import { VocabularyDemo } from "@/components/sections/VocabularyDemo";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { ExamPrep } from "@/components/sections/ExamPrep";
import { ExploreLinks } from "@/components/sections/ExploreLinks";
import { FinalCTA } from "@/components/sections/FinalCTA";

/**
 * Bosh sahifa. Navigatsiyadagi bo'limlar (imkoniyatlar, qanday ishlaydi, darajalar, narxlar, yangiliklar, savollar) o'z
 * sahifalarida — bu yerda takrorlanmaydi; ExploreLinks ularga olib boradi. Istisno — NewsSpotlight: asosiy yangilik
 * (nega nemis tili hozir kerak) raqamlar panelidan keyin. Navbar va Footer — layout'da.
 */
export default function HomePage() {
  return (
    <main id="asosiy" tabIndex={-1} className="outline-none">
      <Hero stores={storeState} webApp={Boolean(site.webAppUrl)} />
      <FactsBand />
      <NewsSpotlight />
      <Approach />
      <VocabularyDemo />
      <ProductShowcase />
      <ExamPrep />
      <ExploreLinks />
      <FinalCTA />
    </main>
  );
}
