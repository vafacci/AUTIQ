"use client";

import { useLocale } from "@/components/providers/locale-provider";

export function TrustSection() {
  const { t } = useLocale();
  const points = [
    t.trust.points.tested,
    t.trust.points.live,
    t.trust.points.control,
  ];

  return (
    <section
      id="trust"
      className="relative border-t border-border/40 bg-background"
      aria-labelledby="trust-heading"
    >
      <div className="mx-auto max-w-[72rem] px-[var(--space-content-x)] py-[var(--space-section-y)]">
        <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
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

          <div className="lg:justify-self-end lg:text-right">
            <p className="font-status text-[4.5rem] leading-none tracking-tight text-text-primary sm:text-[5.25rem]">
              <span className="text-signal">{t.trust.metricValue}</span>
            </p>
            <p className="mt-3 font-status text-[11px] tracking-[0.14em] text-text-secondary uppercase">
              {t.trust.metricLabel}
            </p>
          </div>
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-[4px] border border-border/50 bg-border/50 sm:mt-14 md:grid-cols-3">
          {points.map((point) => (
            <li
              key={point}
              className="bg-background px-5 py-5 sm:px-6 sm:py-6"
            >
              <span
                className="mb-3 block size-1.5 rounded-full bg-signal"
                aria-hidden
              />
              <p className="text-[0.9375rem] leading-relaxed text-text-secondary">
                {point}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
