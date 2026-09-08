import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { BookingExperience } from "@/components/sections/booking/BookingExperience";
import { site } from "@/data/site";
import { da } from "@/lib/i18n/dictionaries";

export const metadata: Metadata = {
  title: da.booking.title,
  description: da.booking.description,
  openGraph: {
    title: `${da.booking.title} · ${site.name}`,
    description: da.booking.description,
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
