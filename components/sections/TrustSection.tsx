"use client";

import { useLocale } from "@/components/providers/locale-provider";

export function TrustSection() {
  const { t } = useLocale();
  const stats = [
    t.trust.stats.hours,
    t.trust.stats.posts,
    t.trust.stats.clients,
  ];

  return (
    <section
      id="trust"
      className="relative border-t border-border/40 bg-background"
      aria-labelledby="trust-heading"
    >
      <div className="mx-auto max-w-[72rem] px-[var(--space-content-x)] py-[var(--space-section-y)]">
        <header className="max-w-xl">
          <p className="font-status text-[11px] tracking-[0.14em] text-text-secondary">
            {t.trust.eyebrow}
          </p>
          <h2
            id="trust-heading"
            className="mt-3 text-[1.75rem] leading-[1.12] tracking-tight text-text-primary md:text-[2rem] xl:text-[2.15rem]"
          >
            {t.trust.headline}
          </h2>
          <p className="mt-4 max-w-md text-[0.975rem] leading-relaxed text-text-secondary md:text-base">
            {t.trust.support}
          </p>
        </header>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[4px] border border-border/50 bg-border/50 sm:mt-14 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-background px-6 py-8 sm:px-7 sm:py-9">
              <p className="font-status text-[2.75rem] leading-none tracking-tight text-signal sm:text-[3.25rem]">
                {stat.value}
              </p>
              <p className="mt-3 font-status text-[11px] tracking-[0.14em] text-text-secondary uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
