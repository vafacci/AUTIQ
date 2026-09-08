"use client";

import { cn } from "@/lib/cn";
import { useLocale } from "@/components/providers/locale-provider";
import type { Locale } from "@/lib/i18n/types";

type LanguageSwitchProps = {
  className?: string;
  /** Light footer / dark header */
  tone?: "dark" | "light";
};

const OPTIONS: { id: Locale; label: string }[] = [
  { id: "da", label: "DA" },
  { id: "en", label: "EN" },
];

export function LanguageSwitch({
  className,
  tone = "dark",
}: LanguageSwitchProps) {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      className={cn("inline-flex items-center gap-1", className)}
      role="group"
      aria-label={t.common.language}
    >
      {OPTIONS.map((option, index) => (
        <span key={option.id} className="inline-flex items-center gap-1">
          {index > 0 ? (
            <span
              className={cn(
                "text-[10px]",
                tone === "dark" ? "text-text-secondary/40" : "text-[#070809]/25",
              )}
              aria-hidden
            >
              /
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => setLocale(option.id)}
            className={cn(
              "font-status text-[10px] tracking-[0.14em] transition-colors",
              tone === "dark"
                ? locale === option.id
                  ? "text-text-primary"
                  : "text-text-secondary hover:text-text-primary"
                : locale === option.id
                  ? "text-[#070809]"
                  : "text-[#070809]/45 hover:text-[#070809]",
            )}
            aria-pressed={locale === option.id}
          >
            {option.label}
          </button>
        </span>
      ))}
    </div>
  );
}
