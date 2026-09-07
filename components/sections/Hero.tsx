"use client";

import { motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { LiquidOrb } from "./hero/LiquidOrb";
import { heroPlatforms } from "@/data/platforms";

const heroCtaClass =
  "h-10 w-[9.75rem] px-0 text-[11px] font-medium uppercase tracking-[0.08em]";

export function Hero() {
  const reduceMotion = useReducedMotion();

  const fade = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      id="top"
      className="relative flex min-h-dvh flex-col justify-center overflow-hidden bg-background pt-20 pb-16 sm:pb-14 lg:pt-24 lg:pb-16"
      aria-labelledby="hero-heading"
    >
      <div className="relative mx-auto w-full max-w-[68rem] px-[var(--space-content-x)]">
        {/* Mobile / tablet: compact orb, top-right — close to the headline */}
        <motion.div
          className="pointer-events-none absolute -top-1 right-0 z-0 w-[6.5rem] sm:w-[7.75rem] md:w-[8.5rem] lg:hidden"
          {...fade(0.1)}
          aria-hidden
        >
          <LiquidOrb variant="compact" />
        </motion.div>

        <div className="relative z-10 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-8 xl:gap-10">
          <div className="flex max-w-lg flex-col justify-center lg:max-w-none lg:pr-2">
            <motion.h1
              id="hero-heading"
              className="pr-[6.75rem] text-[2.125rem] leading-[1.08] tracking-tight text-text-primary sm:pr-36 sm:text-[2.75rem] lg:pr-0 lg:text-[3rem] xl:text-[3.15rem]"
              {...fade(0)}
            >
              Your content,
              <br />
              moving by itself.
            </motion.h1>

            <motion.div
              className="mt-5 max-w-md space-y-3 text-[0.975rem] leading-relaxed text-text-secondary sm:mt-6 sm:text-base"
              {...fade(0.06)}
            >
              <p>
                From finished content to approved, scheduled and published —
                automatically.
              </p>
              <p>You stay in control where it matters.</p>
            </motion.div>

            <motion.div
              className="mt-8 flex flex-row flex-wrap items-center gap-3 sm:mt-9"
              {...fade(0.12)}
            >
              <ButtonLink href="/book" className={heroCtaClass}>
                Book a call
              </ButtonLink>
              <ButtonLink
                href="#how-it-works"
                variant="secondary"
                className={heroCtaClass}
              >
                How it works
              </ButtonLink>
            </motion.div>

            <motion.p
              className="mt-7 font-status text-[10px] tracking-[0.14em] text-text-secondary sm:mt-8"
              {...fade(0.18)}
            >
              {heroPlatforms.join("  ·  ")}
            </motion.p>
          </div>

          <motion.div
            className="hidden w-full items-center justify-center lg:flex lg:justify-self-stretch"
            {...fade(0.16)}
          >
            <LiquidOrb variant="hero" />
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#how-it-works"
        className="absolute bottom-5 left-1/2 z-10 inline-flex size-10 -translate-x-1/2 items-center justify-center text-text-secondary/55 transition-colors hover:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border sm:bottom-6"
        aria-label="Scroll to how it works"
        {...fade(0.35)}
      >
        <motion.span
          className="inline-flex"
          animate={reduceMotion ? undefined : { y: [0, 4, 0] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <ChevronDown className="size-5" strokeWidth={1.5} aria-hidden />
        </motion.span>
      </motion.a>
    </section>
  );
}
