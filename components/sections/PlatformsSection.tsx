"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import {
  contentGalleryIntro,
  contentGalleryItems,
} from "@/data/content-gallery";
import { cn } from "@/lib/cn";

/** Match CodePen count for identical stagger timing */
const GALLERY_COUNT = 10;
const GALLERY_DURATION = "16s";

/**
 * Gallery 3D — 1:1 motion from
 * https://codepen.io/daniel-mu-oz/pen/gbaVNwL
 * Uses local compressed assets from /public/gallery.
 */
export function PlatformsSection() {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const items = contentGalleryItems.slice(0, GALLERY_COUNT);

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
      const maxLeft = (window.innerWidth * 0.5) / 16;
      const maxRight = (window.innerWidth * 0.5) / 16;

      images.forEach((image) => {
        const left = `${-Math.random() * maxLeft}rem`;
        const right = `${-Math.random() * maxRight}rem`;
        image.style.setProperty("--left", left);
        image.style.setProperty("--right", right);
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
              Social content
            </h1>
          </header>
          <ul className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
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
            "--duration": GALLERY_DURATION,
          } as React.CSSProperties
        }
      >
        {items.map((item, index) => {
          const i = index + 1;
          const odd = i % 2 === 1;
          return (
            // Plain img required so CodePen selectors/animation apply 1:1
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={item.id}
              src={item.src}
              alt={item.alt}
              className={cn(
                "gallery-3d-img",
                odd ? "gallery-3d-img--odd" : "gallery-3d-img--even",
              )}
              style={{ "--i": i } as React.CSSProperties}
              loading={index < 4 ? "eager" : "lazy"}
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
          Social content
        </h1>
      </div>
    </section>
  );
}
