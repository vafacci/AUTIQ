import fs from "fs";

const meta = JSON.parse(
  fs.readFileSync("public/gallery/manifest.json", "utf8"),
);
const platforms = [
  "Instagram",
  "TikTok",
  "YouTube",
  "Instagram",
  "TikTok",
  "LinkedIn",
];

const items = meta.map((m, i) => {
  const type = i % 5 === 1 ? "video" : "image";
  const platform = platforms[i % platforms.length];
  return `  {
    id: ${JSON.stringify(m.id)},
    type: ${JSON.stringify(type)},
    src: ${JSON.stringify(m.src)},
    alt: ${JSON.stringify(`Social content ${i + 1}`)},
    aspect: ${JSON.stringify(m.aspect)},
    platform: ${JSON.stringify(platform)},
  }`;
});

const out = `/**
 * Social content gallery — local compressed assets from /public/gallery.
 */

export const contentGalleryIntro = {
  id: "platforms",
  eyebrow: "Social content",
  headline: "Made for the feed.",
  support:
    "Reels, posts, Shorts — Content Autopilot moves finished content onto the platforms your audience already lives on.",
} as const;

export type GalleryItem = {
  id: string;
  type: "image" | "video";
  src: string;
  alt: string;
  aspect: "portrait" | "square";
  platform: "Instagram" | "TikTok" | "YouTube" | "LinkedIn";
};

export const contentGalleryItems: GalleryItem[] = [
${items.join(",\n")}
];
`;

fs.writeFileSync("data/content-gallery.ts", out);
console.log("wrote", meta.length, "items");
