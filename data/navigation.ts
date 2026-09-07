export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Platforms", href: "/#platforms" },
  { label: "Pricing", href: "/#pricing" },
];

export const primaryCta = {
  label: "Book a call",
  href: "/book",
} as const;
