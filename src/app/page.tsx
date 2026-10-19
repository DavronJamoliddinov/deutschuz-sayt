import { storesAvailable } from "@/config/site";
import { Hero } from "@/components/sections/Hero";
import { FactsBand } from "@/components/sections/FactsBand";
import { Approach } from "@/components/sections/Approach";
import { VocabularyDemo } from "@/components/sections/VocabularyDemo";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { ExamPrep } from "@/components/sections/ExamPrep";
import { ExploreLinks } from "@/components/sections/ExploreLinks";
import { FinalCTA } from "@/components/sections/FinalCTA";

/**
 * Bosh sahifa. Navigatsiyadagi bo'limlar (imkoniyatlar, qanday ishlaydi, darajalar, narxlar, savollar) o'z sahifalarida —
 * bu yerda takrorlanmaydi; ExploreLinks ularga olib boradi. Navbar va Footer — layout'da.
 */
export default function HomePage() {
  return (
    <main id="asosiy" tabIndex={-1} className="outline-none">
      <Hero storesAvailable={storesAvailable} />
      <FactsBand />
      <Approach />
      <VocabularyDemo />
      <ProductShowcase />
      <ExamPrep />
      <ExploreLinks />
      <FinalCTA />
    </main>
  );
}
