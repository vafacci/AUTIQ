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
    qa: string;
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
    tiers: Record<
      string,
      {
        name: string;
        inclusions: string[];
      }
    >;
  };
  trust: {
    eyebrow: string;
    headline: string;
    support: string;
    metricValue: string;
    metricLabel: string;
    points: {
      tested: string;
      live: string;
      control: string;
    };
  };
  qa: {
    items: Record<
      string,
      {
        question: string;
        answer: string;
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
