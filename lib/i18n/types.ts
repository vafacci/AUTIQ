export type Locale = "da" | "en";

export const LOCALES: Locale[] = ["da", "en"];
export const DEFAULT_LOCALE: Locale = "da";
export const LOCALE_STORAGE_KEY = "autiq-locale";

export type Dictionary = {
  meta: {
    description: string;
    tagline: string;
  };
  nav: {
    howItWorks: string;
    platforms: string;
    pricing: string;
    book: string;
    back: string;
    openMenu: string;
    closeMenu: string;
    primary: string;
    mobile: string;
  };
  hero: {
    headlineLine1: string;
    headlineLine2: string;
    body1: string;
    body2: string;
    book: string;
    howItWorks: string;
    scrollLabel: string;
    platformsLabel: string;
  };
  workflow: {
    headlineLine1: string;
    headlineLine2: string;
    support: string;
    stages: Record<
      string,
      {
        title: string;
        microcopy: string;
        nodeLabel: string;
        activeStatus: string;
        completeStatus: string;
      }
    >;
  };
  platforms: {
    heading: string;
  };
  pricing: {
    headlineLine1: string;
    headlineLine2: string;
    setup: string;
    perMonth: string;
    book: string;
    thirdParty: string;
    tiers: Record<
      string,
      {
        name: string;
        inclusions: string[];
      }
    >;
  };
  footer: {
    navigation: string;
    contact: string;
    rights: string;
  };
  booking: {
    title: string;
    description: string;
    eyebrow: string;
    headline: string;
    support: string;
    details: { duration: string; format: string; commitment: string };
    successEyebrow: string;
    successHeadline: string;
    successSupport: string;
    backHome: string;
  };
  common: {
    language: string;
  };
};
