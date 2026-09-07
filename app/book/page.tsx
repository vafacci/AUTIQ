import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { BookingExperience } from "@/components/sections/booking/BookingExperience";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Book a call",
  description:
    "Book a 30-minute call with AUTIQ. A short conversation to map your content workflow and where automation fits.",
  openGraph: {
    title: `Book a call · ${site.name}`,
    description:
      "A short discovery call to map your content workflow and where automation fits.",
  },
};

export default function BookPage() {
  return (
    <div className="min-h-dvh bg-background text-text-primary">
      <SiteHeader variant="booking" />
      <main className="relative pt-24 pb-16 sm:pt-28 sm:pb-20">
        <div className="mx-auto w-full max-w-[72rem] px-[var(--space-content-x)]">
          <BookingExperience />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
