import {
  pricingIntro,
  pricingNotes,
  pricingTiers,
} from "@/data/pricing";
import { PricingCard } from "./pricing/PricingCard";

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative border-t border-border/40 bg-background"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-[72rem] px-[var(--space-content-x)] py-[var(--space-section-y)]">
        <header className="mx-auto max-w-xl text-center">
          <h2
            id="pricing-heading"
            className="text-[1.75rem] leading-[1.12] tracking-tight text-text-primary md:text-[2rem] xl:text-[2.15rem]"
          >
            {pricingIntro.headlineLine1}
            <br />
            {pricingIntro.headlineLine2}
          </h2>
        </header>

        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-5 md:mt-14 md:grid-cols-2 md:gap-6 md:items-stretch">
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.id} tier={tier} />
          ))}
        </div>

        <p className="mt-8 text-center font-status text-[10px] tracking-[0.08em] text-text-secondary/70 md:mt-10">
          {pricingNotes.thirdParty}
        </p>
      </div>
    </section>
  );
}
