import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { WorkflowSection } from "@/components/sections/WorkflowSection";
import { PlatformsSection } from "@/components/sections/PlatformsSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { FaqSection } from "@/components/sections/FaqSection";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <WorkflowSection />
        <PlatformsSection />
        <PricingSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}
