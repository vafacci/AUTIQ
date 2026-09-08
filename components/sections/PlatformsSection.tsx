"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import {
  contentGalleryIntro,
  contentGalleryItems,
} from "@/data/content-gallery";
import { cn } from "@/lib/cn";
import { useLocale } from "@/components/providers/locale-provider";

/**
 * All gallery assets cycle through the tunnel.
 *
 * Distribution notes (desktop clumping fix):
 * - Horizontal offsets use ~half the viewport (CodePen-style), not a tiny rem cap
 * - Vertical lanes use a coprime step so consecutive (visible) frames jump far apart
 * - Desktop CSS widens X push + vertical spread and slightly shrinks card size
 */
const TARGET_VISIBLE = 5;
const FLY_DURATION_SEC = 36;
const VERTICAL_LANES = 10;
/** Coprime with VERTICAL_LANES → consecutive indices skip across the frame */
const LANE_STEP = 7;
const GOLDEN = 0.6180339887498949;

/**
 * Gallery 3D — CodePen motion model with controlled density.
 * https://codepen.io/daniel-mu-oz/pen/gbaVNwL
 */
export function PlatformsSection() {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const { t } = useLocale();

  const items = contentGalleryItems;
  const duration = `${FLY_DURATION_SEC}s`;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(Boolean(entry?.isIntersecting)),
      { rootMargin: "40px 0px", threshold: 0.08 },
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || reduceMotion) return;

    const applyOffsets = () => {
      const images = stage.querySelectorAll<HTMLImageElement>(".gallery-3d-img");
      const w = window.innerWidth;
      const desktop = w >= 1024;
      // Original CodePen used ~50% viewport; keep phones tighter
      const maxRem = desktop
        ? Math.min(28, (w * 0.5) / 16)
        : Math.min(11, (w * 0.36) / 16);
      const minRem = desktop ? 5 : 2.25;

      images.forEach((image, index) => {
        // Unique, evenly spaced fractions across the side band
        const frac = (index * GOLDEN) % 1;
        const offset = minRem + frac * (maxRem - minRem);
        // Mirror partner so left/right sides both use full range
        const mirror = minRem + ((frac + 0.5) % 1) * (maxRem - minRem);
        image.style.setProperty("--left", `${-offset}rem`);
        image.style.setProperty("--right", `${-mirror}rem`);
      });
    };

    applyOffsets();
    window.addEventListener("resize", applyOffsets);
    return () => window.removeEventListener("resize", applyOffsets);
  }, [reduceMotion, items.length]);

  if (reduceMotion) {
    return (
      <section
        id={contentGalleryIntro.id}
        className="border-t border-border/40 bg-background"
        aria-labelledby="platforms-heading"
      >
        <div className="mx-auto max-w-[72rem] px-[var(--space-content-x)] py-[var(--space-section-y)]">
          <header className="mx-auto max-w-xl text-center">
            <h1
              id="platforms-heading"
              className="text-[1.75rem] tracking-tight text-text-primary md:text-[2rem]"
            >
              {t.platforms.heading}
            </h1>
          </header>
          <ul className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {items.map((item) => (
              <li
                key={item.id}
                className="relative aspect-[3/4] overflow-hidden rounded-[0.35rem]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section
      id={contentGalleryIntro.id}
      className="gallery-3d-section border-t border-border/40"
      aria-labelledby="platforms-heading"
    >
      <div
        ref={stageRef}
        className="gallery-3d-stage"
        data-active={active ? "true" : "false"}
        style={
          {
            "--count": items.length,
            "--duration": duration,
            "--lanes": VERTICAL_LANES,
            "--spread": "7.5rem",
            "--x-push": "22rem",
            "--visible-window": TARGET_VISIBLE / Math.max(items.length, 1),
          } as React.CSSProperties
        }
      >
        {items.map((item, index) => {
          const i = index + 1;
          const odd = i % 2 === 1;
          // Spread consecutive (time-adjacent) frames across distant lanes
          const lane = ((index * LANE_STEP) % VERTICAL_LANES) + 1;
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={item.id}
              src={item.src}
              alt={item.alt}
              className={cn(
                "gallery-3d-img",
                odd ? "gallery-3d-img--odd" : "gallery-3d-img--even",
              )}
              style={
                {
                  "--i": i,
                  "--lane": lane,
                } as React.CSSProperties
              }
              loading={index < 8 ? "eager" : "lazy"}
              decoding="async"
            />
          );
        })}
      </div>

      <div className="gallery-3d-copy">
        <h1
          id="platforms-heading"
          className="text-[1.85rem] leading-[1.1] tracking-tight text-text-primary sm:text-[2.35rem]"
        >
          {t.platforms.heading}
        </h1>
      </div>
    </section>
  );
}
