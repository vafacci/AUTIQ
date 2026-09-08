"use client";

import { site } from "@/data/site";
import { primaryCta } from "@/data/navigation";
import { useLocale } from "@/components/providers/locale-provider";
import { useNavLinks } from "@/lib/i18n/use-localized-content";
import { LanguageSwitch } from "@/components/layout/LanguageSwitch";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const { t } = useLocale();
  const navLinks = useNavLinks();

  return (
    <footer className="border-t border-black/10 bg-white text-[#070809]">
      <div className="mx-auto max-w-[72rem] px-[var(--space-content-x)] py-12 md:py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
          <div>
            <a
              href="/#top"
              className="inline-block text-sm font-medium tracking-tight text-[#070809] transition-opacity hover:opacity-70"
            >
              {site.product}
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#070809]/60">
              {t.meta.tagline}
            </p>
            <LanguageSwitch className="mt-5" tone="light" />
          </div>

          <div>
            <p className="mb-4 font-status text-[10px] tracking-[0.16em] text-[#070809]/45">
              {t.footer.navigation}
            </p>
            <nav className="flex flex-col gap-2.5" aria-label={t.footer.navigation}>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#070809]/65 transition-colors hover:text-[#070809]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="mb-4 font-status text-[10px] tracking-[0.16em] text-[#070809]/45">
              {t.footer.contact}
            </p>
            <div className="flex flex-col gap-2.5 text-sm text-[#070809]/65">
              <a
                href={site.emailHref}
                className="transition-colors hover:text-[#070809]"
              >
                {site.email}
              </a>
              <a
                href={site.phoneHref}
                className="transition-colors hover:text-[#070809]"
              >
                {site.phone}
              </a>
              <a
                href={primaryCta.href}
                className="mt-2 font-medium text-[#070809] transition-opacity hover:opacity-70"
              >
                {t.nav.book} →
              </a>
            </div>
          </div>
        </div>

        <p className="mt-12 border-t border-black/10 pt-6 text-xs text-[#070809]/45">
          © {year} {site.name}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
