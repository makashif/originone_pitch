"use client";

import { useEffect } from "react";

/* ══════════════════════════════════════════════════════════════════
   useFitSlides — "never crop a slide" engine
   ──────────────────────────────────────────────────────────────────
   Presentation decks have a hard constraint: one slide = one viewport.
   CSS clamp() alone cannot guarantee that, because text wraps and card
   grids reflow in ways no formula can predict. On short screens
   (13" Windows laptops at 768px, browser chrome + taskbar eating ~150px)
   dense slides overflow and get clipped by `.slide { overflow: hidden }`.

   This measures each slide's natural (un-transformed) content box and,
   when it exceeds the padded safe area, applies a uniform downscale via
   the `--fit` custom property, consumed by `.slide-content`:

       transform: scale(var(--fit, 1));

   Why this is loop-safe:
   - `transform` never affects layout, so offsetHeight/scrollHeight stay
     at their natural values no matter what --fit we set.
   - ResizeObserver watches the border-box, which transforms do not
     change → setting --fit cannot re-trigger the observer.

   Disabled on mobile (continuous scroll, slides grow naturally) and
   during PDF export (which locks its own fixed 1380×976 canvas).
════════════════════════════════════════════════════════════════════ */

/** Never shrink past this — below it, text stops being readable. */
const MIN_SCALE = 0.55;
/** Ignore sub-pixel overshoot so we don't scale for a 0.3px rounding. */
const EPSILON = 1.5;

export default function useFitSlides() {
  useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 960px)");

    const isFitDisabled = () =>
      mqMobile.matches || document.body.classList.contains("pdf-export-active");

    /** Measure + scale a single slide. */
    const fit = (slide: HTMLElement) => {
      const content = slide.querySelector<HTMLElement>(".slide-content");
      if (!content) return;

      // Always reset first: measurements must be taken un-scaled, and this
      // also restores 1:1 when the viewport grows back.
      content.style.setProperty("--fit", "1");

      if (isFitDisabled()) return;

      const cs = getComputedStyle(slide);
      const availH =
        slide.clientHeight -
        parseFloat(cs.paddingTop) -
        parseFloat(cs.paddingBottom);
      const availW =
        slide.clientWidth -
        parseFloat(cs.paddingLeft) -
        parseFloat(cs.paddingRight);

      if (availH <= 0 || availW <= 0) return;

      // offsetHeight = laid-out box (transform-independent).
      // scrollHeight catches descendants overflowing the box.
      const naturalH = Math.max(content.scrollHeight, content.offsetHeight);
      const naturalW = Math.max(content.scrollWidth, content.offsetWidth);
      if (!naturalH || !naturalW) return;

      if (naturalH <= availH + EPSILON && naturalW <= availW + EPSILON) return;

      const scale = Math.min(availH / naturalH, availW / naturalW, 1);
      content.style.setProperty("--fit", String(Math.max(scale, MIN_SCALE).toFixed(4)));
    };

    let frame = 0;
    const fitAll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        document
          .querySelectorAll<HTMLElement>(".slide")
          .forEach((slide) => fit(slide));
      });
    };

    fitAll();

    /* ── Per-slide content observer: images decoding, fonts swapping,
          text rewrapping — anything that changes natural size. ── */
    const ro = new ResizeObserver(() => fitAll());
    document
      .querySelectorAll<HTMLElement>(".slide-content")
      .forEach((el) => ro.observe(el));

    /* ── Viewport changes. `resize` covers desktop window resizing and
          mobile URL-bar collapse; orientationchange covers rotation. ── */
    window.addEventListener("resize", fitAll);
    window.addEventListener("orientationchange", fitAll);
    mqMobile.addEventListener("change", fitAll);

    /* ── Late web-font swap changes metrics after first paint. ── */
    document.fonts?.ready.then(fitAll).catch(() => {});

    /* ── PDF export toggles `pdf-export-active` on <body>; re-fit when
          it is removed so the deck returns to its screen layout. ── */
    const bodyObserver = new MutationObserver(fitAll);
    bodyObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    /* ── Images inside device mockups load async and are the biggest
          single source of height change. ── */
    const onLoad = (e: Event) => {
      if ((e.target as HTMLElement)?.tagName === "IMG") fitAll();
    };
    document.addEventListener("load", onLoad, true);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      bodyObserver.disconnect();
      window.removeEventListener("resize", fitAll);
      window.removeEventListener("orientationchange", fitAll);
      mqMobile.removeEventListener("change", fitAll);
      document.removeEventListener("load", onLoad, true);
    };
  }, []);
}
