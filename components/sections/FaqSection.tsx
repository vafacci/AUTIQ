"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqIds } from "@/data/faqs";
import { useLocale } from "@/components/providers/locale-provider";
import { cn } from "@/lib/cn";

export function FaqSection() {
  const { t } = useLocale();
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      id="qa"
      className="relative bg-background"
      aria-label={t.nav.qa}
    >
      <div className="mx-auto max-w-[42rem] px-[var(--space-content-x)] py-[var(--space-section-y)]">
        <div className="border-t border-border/50">
          {faqIds.map((id) => {
            const item = t.qa.items[id];
            const open = openId === id;
            const panelId = `${baseId}-${id}-panel`;
            const buttonId = `${baseId}-${id}-button`;

            return (
              <div key={id} className="border-b border-border/50">
                <h2 className="m-0 text-base font-normal">
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenId(open ? null : id)}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border sm:py-5"
                  >
                    <span className="text-[0.975rem] leading-snug tracking-tight text-text-primary sm:text-base">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        "size-4 shrink-0 text-text-secondary transition-transform duration-200",
                        open && "rotate-180",
                      )}
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </button>
                </h2>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!open}
                  className={cn(!open && "hidden")}
                >
                  <p className="pb-5 pr-8 text-[0.9375rem] leading-relaxed text-text-secondary sm:pb-6">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
