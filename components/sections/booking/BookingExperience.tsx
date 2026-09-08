"use client";

import { useMemo, useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { resolveCalLink } from "@/data/booking";
import { useLocale } from "@/components/providers/locale-provider";
import { CalEmbed } from "./CalEmbed";

type Step = "book" | "success";

export function BookingExperience() {
  const [step, setStep] = useState<Step>("book");
  const calLink = useMemo(() => resolveCalLink(), []);
  const { t } = useLocale();

  if (step === "success") {
    return (
      <section
        className="mx-auto flex min-h-[60dvh] w-full max-w-[36rem] flex-col justify-center"
        aria-labelledby="success-heading"
      >
        <p className="font-status text-[11px] tracking-[0.14em] text-text-secondary">
          {t.booking.successEyebrow}
        </p>
        <h2
          id="success-heading"
          className="mt-3 text-[2rem] leading-[1.1] tracking-tight text-text-primary sm:text-[2.25rem]"
        >
          {t.booking.successHeadline}
        </h2>
        <p className="mt-4 max-w-md text-[0.975rem] leading-relaxed text-text-secondary">
          {t.booking.successSupport}
        </p>
        <div className="mt-10">
          <ButtonLink href="/" className="h-10 px-5 text-[12px]">
            {t.booking.backHome}
          </ButtonLink>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full" aria-labelledby="booking-heading">
      <div className="mx-auto max-w-[40rem] text-center sm:max-w-none">
        <p className="font-status text-[11px] tracking-[0.14em] text-text-secondary">
          {t.booking.eyebrow}
        </p>
        <h1
          id="booking-heading"
          className="mt-3 text-[2rem] leading-[1.1] tracking-tight text-text-primary sm:text-[2.35rem]"
        >
          {t.booking.headline}
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-[0.975rem] leading-relaxed text-text-secondary">
          {t.booking.support}
        </p>

        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {(
            [
              t.booking.details.duration,
              t.booking.details.format,
              t.booking.details.commitment,
            ] as const
          ).map((label) => (
            <li
              key={label}
              className="font-status text-[10px] tracking-[0.12em] text-text-secondary"
            >
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-10 w-full max-w-[56rem] overflow-hidden rounded-[1.25rem] bg-white shadow-[0_24px_80px_-40px_rgba(0,0,0,0.65)] sm:mt-12">
        <CalEmbed
          calLink={calLink}
          theme="light"
          className="min-h-[min(70dvh,44rem)] border-0 sm:min-h-[48rem]"
          onBooked={() => setStep("success")}
        />
      </div>
    </section>
  );
}
