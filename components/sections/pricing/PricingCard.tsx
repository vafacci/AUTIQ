"use client";

import { motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { cn } from "@/lib/cn";
import { primaryCta } from "@/data/navigation";
import { formatMoney, type PricingTier } from "@/data/pricing";
import { useLocale } from "@/components/providers/locale-provider";

type PricingCardProps = {
  tier: PricingTier;
};

function CheckIcon({ emphasized }: { emphasized?: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className={cn(
        "mt-0.5 shrink-0",
        emphasized ? "text-signal" : "text-text-secondary",
      )}
    >
      <path
        d="M2.5 7.2 5.5 10.2 11.5 4.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Dreamit-style package card — adapted to ATOM tokens.
 * Large setup figure, secondary monthly line, full-width CTA, inclusions.
 */
export function PricingCard({ tier }: PricingCardProps) {
  const highlighted = Boolean(tier.highlighted);
  const reduceMotion = useReducedMotion();
  const { locale, t } = useLocale();

  return (
    <motion.article
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-[1.25rem] border transition-colors duration-300",
        highlighted
          ? "border-border bg-elevated md:-translate-y-1 md:shadow-[0_28px_60px_-32px_rgba(0,0,0,0.75)]"
          : "border-border/50 bg-surface/80 hover:border-border",
      )}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: 0.55,
        delay: highlighted ? 0.05 : 0.14,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {highlighted ? (
        <>
          {/* Hairline signal accent — system cue, not a brand fill */}
          <motion.span
            className="absolute inset-x-8 top-0 z-[2] h-px origin-center bg-signal"
            aria-hidden
            initial={reduceMotion ? { scaleX: 1, opacity: 0.85 } : { scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 0.9 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          />
          {!reduceMotion ? (
            <motion.span
              className="pointer-events-none absolute -top-24 left-1/2 z-0 h-40 w-[70%] -translate-x-1/2 rounded-full bg-signal/[0.07] blur-3xl"
              aria-hidden
              animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.92, 1.05, 0.92] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            />
          ) : (
            <span
              className="pointer-events-none absolute -top-24 left-1/2 z-0 h-40 w-[70%] -translate-x-1/2 rounded-full bg-signal/[0.07] blur-3xl"
              aria-hidden
            />
          )}
        </>
      ) : null}

      <div
        className={cn(
          "relative z-[1] flex h-full flex-col gap-5 p-7 lg:gap-4 xl:p-8",
          highlighted ? "lg:p-8" : "lg:p-6 xl:p-7",
        )}
      >
        <h3
          className={cn(
            "leading-tight tracking-tight text-text-primary",
            highlighted
              ? "text-[1.5rem] lg:text-[1.65rem]"
              : "text-[1.35rem] lg:text-[1.45rem]",
          )}
        >
          {tier.name}
        </h3>

        <div>
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <p
              className={cn(
                "font-status leading-none tracking-tight text-text-primary",
                highlighted
                  ? "text-[2.75rem] sm:text-[3rem]"
                  : "text-[2.35rem] sm:text-[2.6rem]",
              )}
            >
              {formatMoney(tier.setupDkk, tier.setupUsd, locale)}
            </p>
            <span className="text-sm text-text-secondary">{t.pricing.setup}</span>
          </div>
          {tier.monthlyDkk !== null || tier.monthlyUsd !== null ? (
            <p className="mt-2 text-sm text-text-secondary">
              {formatMoney(tier.monthlyDkk, tier.monthlyUsd, locale)}{" "}
              {t.pricing.perMonth}
            </p>
          ) : null}
        </div>

        {tier.description ? (
          <p className="text-[0.9375rem] leading-relaxed text-text-secondary">
            {tier.description}
          </p>
        ) : null}

        <ButtonLink
          href={primaryCta.href}
          variant={highlighted ? "primary" : "secondary"}
          className="w-full min-h-[44px] tracking-[0.06em]"
        >
          {t.pricing.book}
        </ButtonLink>

        {tier.inclusions.length > 0 ? (
          <ul className="mt-auto flex flex-col gap-2.5 pt-1">
            {tier.inclusions.map((item) => (
              <li
                key={item}
                className="flex gap-2.5 text-sm text-text-secondary"
              >
                <CheckIcon emphasized={highlighted} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-auto" aria-hidden />
        )}
      </div>
    </motion.article>
  );
}
