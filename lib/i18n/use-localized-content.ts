"use client";

import { useMemo } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import { workflowStages } from "@/data/workflow-stages";
import { pricingTiers } from "@/data/pricing";
import { navLinks as navHrefs } from "@/data/navigation";

export function useNavLinks() {
  const { t } = useLocale();
  return useMemo(
    () => [
      { label: t.nav.howItWorks, href: navHrefs[0].href },
      { label: t.nav.platforms, href: navHrefs[1].href },
      { label: t.nav.pricing, href: navHrefs[2].href },
    ],
    [t],
  );
}

export function useLocalizedWorkflowStages() {
  const { t } = useLocale();
  return useMemo(
    () =>
      workflowStages.map((stage) => ({
        ...stage,
        ...t.workflow.stages[stage.id],
      })),
    [t],
  );
}

export function useLocalizedPricingTiers() {
  const { t } = useLocale();
  return useMemo(
    () =>
      pricingTiers.map((tier) => ({
        ...tier,
        name: t.pricing.tiers[tier.id]?.name ?? tier.name,
        inclusions: t.pricing.tiers[tier.id]?.inclusions ?? tier.inclusions,
      })),
    [t],
  );
}
