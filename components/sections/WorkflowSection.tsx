"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { workflowStages } from "@/data/workflow-stages";
import { WorkflowVisual } from "./workflow/WorkflowVisual";
import { useLocale } from "@/components/providers/locale-provider";
import { useLocalizedWorkflowStages } from "@/lib/i18n/use-localized-content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STAGE_COUNT = workflowStages.length;
const PUBLISH_TARGETS = 3;

export function WorkflowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const mobilePinRef = useRef<HTMLDivElement>(null);
  const mobileVisualRef = useRef<HTMLDivElement>(null);
  const { t } = useLocale();
  const localizedStages = useLocalizedWorkflowStages();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop:
            "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          mobile:
            "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { desktop, mobile, reduced } = context.conditions!;

          if (reduced) {
            const desktopVisual = visualRef.current?.querySelector(
              ".workflow-visual",
            );
            const mobileVisual = mobileVisualRef.current?.querySelector(
              ".workflow-visual",
            );
            const cleanups: Array<() => void> = [];

            const desktopCopies =
              gsap.utils.toArray<HTMLElement>("[data-stage-copy]");
            const mobileCopies = gsap.utils.toArray<HTMLElement>(
              "[data-stage-copy-mobile]",
            );

            [desktopVisual, mobileVisual].forEach((root, idx) => {
              if (!root) return;
              const copies = idx === 0 ? desktopCopies : mobileCopies;
              applyStage(root, STAGE_COUNT - 1, false);
              setConnectors(root, 1);
              setPublishTargets(root, PUBLISH_TARGETS);
              copies.forEach((el, i) => {
                const on = i === STAGE_COUNT - 1;
                gsap.set(el, {
                  opacity: on ? 1 : 0,
                  visibility: on ? "visible" : "hidden",
                  y: 0,
                });
              });
              cleanups.push(bindClickableStages(root, copies));
            });

            return () => cleanups.forEach((fn) => fn());
          }

          if (desktop) {
            const pin = pinRef.current;
            const visualRoot =
              visualRef.current?.querySelector(".workflow-visual");
            if (!pin || !visualRoot) return;

            const copies =
              gsap.utils.toArray<HTMLElement>("[data-stage-copy]");
            return bindPinnedWorkflow({
              pin,
              visualRoot,
              copies,
              endFactor: 0.55,
            });
          }

          if (mobile) {
            const pin = mobilePinRef.current;
            const visualRoot =
              mobileVisualRef.current?.querySelector(".workflow-visual");
            if (!pin || !visualRoot) return;

            const copies = gsap.utils.toArray<HTMLElement>(
              "[data-stage-copy-mobile]",
            );
            return bindPinnedWorkflow({
              pin,
              visualRoot,
              copies,
              endFactor: 0.48,
            });
          }
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [localizedStages] },
  );

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative border-t border-border/40 bg-background"
      aria-labelledby="workflow-heading"
    >
      {/* Desktop: left copy / right system */}
      <div ref={pinRef} className="hidden lg:block">
        <div className="mx-auto flex min-h-dvh max-w-[76rem] items-center px-[var(--space-content-x)] py-20">
          <div className="grid w-full grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] items-center gap-12 xl:gap-16">
            <div className="min-w-0">
              <h2
                id="workflow-heading"
                className="text-[1.85rem] leading-[1.12] tracking-tight text-text-primary xl:text-[2.15rem]"
              >
                {t.workflow.headlineLine1}
                <br />
                {t.workflow.headlineLine2}
              </h2>
              <p className="mt-3 max-w-[22rem] text-base text-text-secondary">
                {t.workflow.support}
              </p>

              <div className="relative mt-6 h-[5.5rem]">
                {localizedStages.map((stage, index) => (
                  <div
                    key={stage.id}
                    data-stage-copy={index}
                    className="absolute inset-x-0 top-0"
                    style={{
                      opacity: index === 0 ? 1 : 0,
                      visibility: index === 0 ? "visible" : "hidden",
                    }}
                    aria-hidden={index !== 0}
                  >
                    <p className="font-status text-[11px] tracking-[0.12em] text-text-secondary uppercase">
                      <span className="text-signal">{stage.index}</span>
                      <span className="mx-1.5 text-border">/</span>
                      {stage.title}
                    </p>
                    <p className="mt-2.5 max-w-[20rem] text-[1.02rem] leading-relaxed text-text-primary">
                      {stage.microcopy}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              ref={visualRef}
              className="min-w-0 translate-y-3 xl:translate-y-4"
            >
              <WorkflowVisual stages={localizedStages} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: same mental model — stacked, pinned, scroll-driven */}
      <div ref={mobilePinRef} className="lg:hidden">
        <div className="mx-auto flex min-h-dvh max-w-[68rem] flex-col justify-center px-[var(--space-content-x)] py-10">
          <h2 className="text-[1.45rem] leading-[1.12] tracking-tight text-text-primary sm:text-[1.65rem]">
            {t.workflow.headlineLine1}
            <br />
            {t.workflow.headlineLine2}
          </h2>
          <p className="mt-2 text-[0.9rem] text-text-secondary">
            {t.workflow.support}
          </p>

          <div className="relative mt-4 h-[3.75rem]">
            {localizedStages.map((stage, index) => (
              <div
                key={stage.id}
                data-stage-copy-mobile={index}
                className="absolute inset-x-0 top-0"
                style={{
                  opacity: index === 0 ? 1 : 0,
                  visibility: index === 0 ? "visible" : "hidden",
                }}
                aria-hidden={index !== 0}
              >
                <p className="font-status text-[10px] tracking-[0.12em] text-text-secondary uppercase">
                  <span className="text-signal">{stage.index}</span>
                  <span className="mx-1.5 text-border">/</span>
                  {stage.title}
                </p>
                <p className="mt-1.5 text-[0.9rem] leading-snug text-text-primary">
                  {stage.microcopy}
                </p>
              </div>
            ))}
          </div>

          <div ref={mobileVisualRef} className="mt-5">
            <WorkflowVisual
              compact
              orientation="vertical"
              stages={localizedStages}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function bindClickableStages(visualRoot: Element, copies: HTMLElement[]) {
  let lastStage = STAGE_COUNT - 1;

  const paintStage = (stage: number) => {
    const prev = lastStage;
    lastStage = stage;
    const progress =
      stage >= STAGE_COUNT - 1 ? 1 : (stage + 0.55) / STAGE_COUNT;
    setConnectors(visualRoot, progress);
    setPublishTargets(
      visualRoot,
      stage === STAGE_COUNT - 1 ? PUBLISH_TARGETS : 0,
    );
    applyStage(visualRoot, stage, false);
    if (prev !== stage) swapExclusive(copies, stage, prev);
  };

  const onVisualClick = (event: Event) => {
    const target = event.target as Element | null;
    if (!target) return;
    const card = target.closest<HTMLElement>("[data-stage-card]");
    if (!card || !visualRoot.contains(card)) return;
    const index = Number(card.dataset.stageCard);
    if (Number.isNaN(index)) return;
    paintStage(index);
  };

  visualRoot.addEventListener("click", onVisualClick);
  return () => visualRoot.removeEventListener("click", onVisualClick);
}

function bindPinnedWorkflow({
  pin,
  visualRoot,
  copies,
  endFactor,
}: {
  pin: HTMLElement;
  visualRoot: Element;
  copies: HTMLElement[];
  endFactor: number;
}) {
  let lastStage = -1;
  let completed = false;
  let st: ScrollTrigger | null = null;

  const paintStage = (stage: number, animateCopy: boolean) => {
    const prev = lastStage;
    lastStage = stage;

    const progress =
      stage >= STAGE_COUNT - 1 ? 1 : (stage + 0.55) / STAGE_COUNT;
    setConnectors(visualRoot, progress);

    if (stage === STAGE_COUNT - 1) {
      setPublishTargets(visualRoot, PUBLISH_TARGETS);
    } else {
      setPublishTargets(visualRoot, 0);
    }

    applyStage(visualRoot, stage, false);

    if (animateCopy && prev !== stage && prev >= 0) {
      swapExclusive(copies, stage, prev);
    } else {
      copies.forEach((el, idx) => {
        const on = idx === stage;
        gsap.set(el, {
          opacity: on ? 1 : 0,
          visibility: on ? "visible" : "hidden",
          y: 0,
        });
        el.setAttribute("aria-hidden", on ? "false" : "true");
      });
    }
  };

  const lockFinal = () => {
    completed = true;
    paintStage(STAGE_COUNT - 1, false);
  };

  gsap.set(copies, { opacity: 0, visibility: "hidden" });
  gsap.set(copies[0], { opacity: 1, visibility: "visible" });
  applyStage(visualRoot, 0, false);
  setConnectors(visualRoot, 0);
  setPublishTargets(visualRoot, 0);
  lastStage = 0;

  const onCardActivate = (index: number) => {
    if (index < 0 || index >= STAGE_COUNT) return;

    // Still scrubbing: jump the scroll position to that stage
    if (!completed && st) {
      const p = (index + 0.5) / STAGE_COUNT;
      const target = st.start + p * (st.end - st.start);
      st.scroll(target);
      return;
    }

    paintStage(index, true);
  };

  const onVisualClick = (event: Event) => {
    const target = event.target as Element | null;
    if (!target) return;
    const card = target.closest<HTMLElement>("[data-stage-card]");
    if (!card || !visualRoot.contains(card)) return;
    const index = Number(card.dataset.stageCard);
    if (Number.isNaN(index)) return;
    onCardActivate(index);
  };

  const onVisualKeydown = (event: Event) => {
    const ke = event as KeyboardEvent;
    if (ke.key !== "Enter" && ke.key !== " ") return;
    const target = ke.target as Element | null;
    if (!target) return;
    const card = target.closest<HTMLElement>("[data-stage-card]");
    if (!card || !visualRoot.contains(card)) return;
    ke.preventDefault();
    const index = Number(card.dataset.stageCard);
    if (Number.isNaN(index)) return;
    onCardActivate(index);
  };

  visualRoot.addEventListener("click", onVisualClick);
  visualRoot.addEventListener("keydown", onVisualKeydown);

  const finishAndUnpin = (self: ScrollTrigger) => {
    if (completed) return;
    completed = true;
    lockFinal();

    // Measure extra pin space before tear-down so we can keep the viewport stable.
    const pinEl = self.pin as HTMLElement | null;
    const spacer = pinEl?.parentElement;
    const extra =
      spacer && pinEl
        ? Math.max(0, spacer.offsetHeight - pinEl.offsetHeight)
        : 0;
    const yBefore = window.scrollY;

    // Full reset removes the pin-spacer (once:true often leaves a huge gap).
    self.kill(true);
    st = null;

    lockFinal();
    ScrollTrigger.refresh();

    if (extra > 0) {
      window.scrollTo(0, Math.max(0, yBefore - extra));
    }
  };

  st = ScrollTrigger.create({
    trigger: pin,
    start: "top top",
    end: () => `+=${Math.round(window.innerHeight * STAGE_COUNT * endFactor)}`,
    pin: true,
    scrub: 0.65,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      if (completed) return;

      const progress = self.progress;
      const raw = progress * STAGE_COUNT;
      const stage = Math.min(STAGE_COUNT - 1, Math.floor(raw + 1e-6));
      const stageLocal = Math.min(1, Math.max(0, raw - stage));

      setConnectors(visualRoot, progress);

      if (stage === STAGE_COUNT - 1) {
        const lit = Math.min(
          PUBLISH_TARGETS,
          Math.floor(stageLocal * PUBLISH_TARGETS + 0.01) + 1,
        );
        setPublishTargets(visualRoot, lit);
      } else {
        setPublishTargets(visualRoot, 0);
      }

      if (stage === lastStage) return;
      const prev = lastStage;
      lastStage = stage;

      applyStage(visualRoot, stage, false);
      swapExclusive(copies, stage, prev);
    },
    onLeave: (self) => {
      finishAndUnpin(self);
    },
  });

  return () => {
    visualRoot.removeEventListener("click", onVisualClick);
    visualRoot.removeEventListener("keydown", onVisualKeydown);
    st?.kill(true);
  };
}

function swapExclusive(
  elements: HTMLElement[],
  active: number,
  prev: number,
) {
  elements.forEach((el, idx) => {
    if (idx === active) {
      el.setAttribute("aria-hidden", "false");
      gsap.fromTo(
        el,
        { opacity: 0, visibility: "visible", y: 5 },
        { opacity: 1, y: 0, duration: 0.25, overwrite: true },
      );
    } else if (idx === prev) {
      el.setAttribute("aria-hidden", "true");
      gsap.to(el, {
        opacity: 0,
        y: -3,
        duration: 0.18,
        overwrite: true,
        onComplete: () => {
          if (idx !== active) el.style.visibility = "hidden";
        },
      });
    } else {
      el.setAttribute("aria-hidden", "true");
      gsap.set(el, { opacity: 0, visibility: "hidden", y: 0 });
    }
  });
}

function setConnectors(root: Element, progress: number) {
  const fills = root.querySelectorAll<HTMLElement>("[data-connector-fill]");
  const segments = fills.length;
  if (!segments) return;

  const vertical = root.getAttribute("data-orientation") === "vertical";
  const scaled = Math.min(1, Math.max(0, progress)) * segments;

  fills.forEach((fill, i) => {
    const local = Math.min(1, Math.max(0, scaled - i));
    if (vertical) {
      fill.style.height = `${local * 100}%`;
      fill.style.width = "100%";
    } else {
      fill.style.width = `${local * 100}%`;
      fill.style.height = "100%";
    }
  });
}

function setPublishTargets(root: Element, litCount: number) {
  const rows = root.querySelectorAll<HTMLElement>("[data-publish-target]");
  const dots = root.querySelectorAll<HTMLElement>("[data-publish-dot]");

  rows.forEach((row, i) => {
    row.style.opacity = i < litCount ? "1" : "0.35";
  });

  dots.forEach((dot, i) => {
    dot.style.background =
      i < litCount ? "var(--atom-signal)" : "var(--atom-border)";
  });
}

function applyStage(root: Element, active: number, revealAll: boolean) {
  root.setAttribute("data-active-stage", String(active));

  const cards = root.querySelectorAll<HTMLElement>("[data-stage-card]");
  const dots = root.querySelectorAll<HTMLElement>("[data-signal-dot]");
  const stems = root.querySelectorAll<HTMLElement>("[data-stem]");
  const statuses = root.querySelectorAll<HTMLElement>("[data-status]");
  const labels = root.querySelectorAll<HTMLElement>("[data-node-label]");

  cards.forEach((card, i) => {
    const state =
      revealAll || i < active
        ? "complete"
        : i === active
          ? "active"
          : "pending";
    card.dataset.state = state;
    card.style.opacity = state === "pending" ? "0.42" : "1";
    card.setAttribute("aria-current", i === active ? "step" : "false");
  });

  labels.forEach((label, i) => {
    const on = revealAll || i <= active;
    const current = i === active && !revealAll;
    label.style.color = current
      ? "var(--atom-text-primary)"
      : on
        ? "var(--atom-text-secondary)"
        : "color-mix(in srgb, var(--atom-text-secondary) 55%, transparent)";
  });

  dots.forEach((dot, i) => {
    const on = revealAll || i <= active;
    const current = i === active && !revealAll;
    dot.style.background = current
      ? "var(--atom-signal)"
      : on
        ? "color-mix(in srgb, var(--atom-signal) 45%, transparent)"
        : "var(--atom-background)";
    dot.style.borderColor = on ? "var(--atom-signal)" : "var(--atom-border)";
  });

  stems.forEach((stem, i) => {
    const on = revealAll || i <= active;
    stem.style.background = on
      ? "color-mix(in srgb, var(--atom-signal) 35%, var(--atom-border))"
      : "color-mix(in srgb, var(--atom-border) 50%, transparent)";
  });

  statuses.forEach((status, i) => {
    const pending = status.dataset.pending ?? "—";
    const activeLabel = status.dataset.active ?? "";
    const complete = status.dataset.complete ?? "";
    if (revealAll || i < active) {
      status.textContent = complete;
      status.style.color = "var(--atom-text-secondary)";
    } else if (i === active) {
      status.textContent = activeLabel;
      status.style.color = "var(--atom-signal)";
    } else {
      status.textContent = pending;
      status.style.color = "var(--atom-text-secondary)";
    }
  });
}
