/**
 * FAQ stubs — content to be written during later copy passes.
 */

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: "product" | "pricing" | "deployment" | "pilot";
};

export const faqs: FaqItem[] = [
  // Intentionally empty until copy is authored section-by-section.
];
