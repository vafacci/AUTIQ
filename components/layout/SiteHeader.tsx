"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/data/site";
import { primaryCta } from "@/data/navigation";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { LanguageSwitch } from "@/components/layout/LanguageSwitch";
import { useLocale } from "@/components/providers/locale-provider";
import { useNavLinks } from "@/lib/i18n/use-localized-content";
import { cn } from "@/lib/cn";

type SiteHeaderProps = {
  /** Booking page: brand + home only — no full marketing nav */
  variant?: "default" | "booking";
};

export function SiteHeader({ variant = "default" }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const menuId = useId();
  const isBooking = variant === "booking";
  const { t } = useLocale();
  const navLinks = useNavLinks();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);

      if (open) {
        setHidden(false);
        lastY.current = y;
        return;
      }

      if (y < 32) {
        setHidden(false);
      } else if (y > lastY.current + 6) {
        setHidden(true);
      } else if (y < lastY.current - 6) {
        setHidden(false);
      }

      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-300 ease-out",
        hidden && !open ? "-translate-y-full" : "translate-y-0",
        isBooking
          ? "border-b border-border/40 bg-background/90 backdrop-blur-md"
          : scrolled || open
            ? "border-b border-border/40 bg-background/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[72rem] items-center justify-between px-[var(--space-content-x)] lg:h-[4.5rem]">
        <a
          href={isBooking ? "/" : "/#top"}
          className="text-sm font-medium tracking-[0.14em] text-text-primary transition-opacity hover:opacity-80"
        >
          {site.name}
        </a>

        {isBooking ? (
          <div className="flex items-center gap-5">
            <LanguageSwitch />
            <a
              href="/"
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {t.nav.back}
            </a>
          </div>
        ) : (
          <>
            <nav
              className="hidden items-center gap-8 md:flex"
              aria-label={t.nav.primary}
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary transition-colors duration-200 hover:text-text-primary"
                >
                  {link.label}
                </a>
              ))}
              <LanguageSwitch className="ml-1" />
              <ButtonLink
                href={primaryCta.href}
                className="ml-2 h-9 px-4 py-0 text-[12px]"
              >
                {t.nav.book}
              </ButtonLink>
            </nav>

            <div className="flex items-center gap-2 md:hidden">
              <LanguageSwitch />
              <button
                type="button"
                className="inline-flex size-10 items-center justify-center rounded-[4px] text-text-primary"
                aria-expanded={open}
                aria-controls={menuId}
                aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
                onClick={() => setOpen((value) => !value)}
              >
                {open ? (
                  <X size={20} strokeWidth={1.5} />
                ) : (
                  <Menu size={20} strokeWidth={1.5} />
                )}
              </button>
            </div>
          </>
        )}
      </div>

      {!isBooking ? (
        <div
          id={menuId}
          className={cn(
            "border-t border-border bg-background md:hidden",
            open ? "block" : "hidden",
          )}
        >
          <nav
            className="mx-auto flex max-w-[72rem] flex-col gap-1 px-[var(--space-content-x)] py-4"
            aria-label={t.nav.mobile}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="py-3 text-sm text-text-secondary transition-colors hover:text-text-primary"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3">
              <ButtonLink
                href={primaryCta.href}
                className="h-10 w-full px-4 py-0 text-[12px]"
                onClick={() => setOpen(false)}
              >
                {t.nav.book}
              </ButtonLink>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
