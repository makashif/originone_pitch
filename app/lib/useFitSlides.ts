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
const EPSILON = 0.5;

export default function useFitSlides() {
  useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 960px)");

    const isFitDisabled = () =>
      mqMobile.matches || document.body.classList.contains("pdf-export-active");

    /** Measure, scale and re-centre a single slide. */
    const fit = (slide: HTMLElement) => {
      const content = slide.querySelector<HTMLElement>(".slide-content");
      if (!content) return;

      // Reset first: measurements must be taken un-transformed, and this
      // also restores 1:1 when the viewport grows back.
      content.style.setProperty("--fit", "1");
      content.style.setProperty("--fit-y", "0px");

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

      /* offsetHeight is the laid-out box; scrollHeight additionally
         covers descendants that spill out of it (a flex row whose
         mockup is taller than the row, an absolutely-placed figure).
         Both ignore transforms, so these numbers are stable no matter
         what we have written to --fit. */
      const boxH = content.offsetHeight;
      const naturalH = Math.max(content.scrollHeight, boxH);
      const naturalW = Math.max(content.scrollWidth, content.offsetWidth);
      if (!naturalH || !naturalW) return;

      const fits =
        naturalH <= availH + EPSILON && naturalW <= availW + EPSILON;

      // Floor (never round) to 4 decimals: rounding up by even 1e-5 puts
      // the content back over the edge it was just scaled to fit inside.
      const scale = fits
        ? 1
        : Math.floor(
            Math.max(
              Math.min(availH / naturalH, availW / naturalW, 1),
              MIN_SCALE,
            ) * 1e4,
          ) / 1e4;

      /* The slide centres `.slide-content` on its BOX. When content
         spills below that box, the box's centre is not the visible
         centre, and the spill hangs past the slide edge — the case that
         clipped project slides even at scale 1. Lift by half the spill
         so the visible extent, not the box, ends up centred. The shift
         is in post-scale pixels because `translate` is applied outside
         `scale` in the transform list. */
      const spillBelow = Math.max(0, naturalH - boxH);
      const shiftY = -((spillBelow * scale) / 2);

      content.style.setProperty("--fit", String(scale));
      content.style.setProperty("--fit-y", shiftY.toFixed(2) + "px");
    };

    const runAll = () =>
      document.querySelectorAll<HTMLElement>(".slide").forEach(fit);

    /* Debounced on TWO racing schedulers, because neither alone is
       reliable in every tab state:

         requestAnimationFrame — fires on the next paint when the tab is
           visible (exactly when a stale scale would be seen), but is
           suspended entirely in background or occluded tabs.

         setTimeout — keeps firing when the tab is hidden, but browsers
           throttle it hard there (to ~1/s, and far less after a few
           minutes backgrounded).

       Whichever wins runs the pass and cancels the other, so the deck
       re-fits on the very next frame when it matters and still catches
       up eventually when it does not. */
    let timer: ReturnType<typeof setTimeout> | undefined;
    let frame = 0;
    const flush = () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
      runAll();
    };
    const fitAll = () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(flush);
      timer = setTimeout(flush, 50);
    };

    /* Settling passes: web fonts swap, `next/image` decodes and card
       grids rewrap over the first second. Each pass is a handful of
       layout reads, so re-checking a few times is cheap insurance
       against locking in a scale measured mid-load. */
    runAll();
    const settle = [120, 400, 1000, 2000].map((ms) => setTimeout(runAll, ms));

    /* ── The primary trigger. Two element sets are watched:

          .slide         — height is 100svh, so its box changes whenever
                           the viewport does. This makes the engine
                           self-driving: it reacts to viewport changes
                           without depending on a `resize` event, which
                           browser zoom, devtools docking and mobile
                           URL-bar collapse do not always deliver.

          .slide-content — natural size changes from images decoding,
                           web fonts swapping and text rewrapping.

       Neither box is affected by `transform`, so writing `--fit` cannot
       feed back into the observer. ── */
    const ro = new ResizeObserver(() => fitAll());
    document
      .querySelectorAll<HTMLElement>(".slide, .slide-content")
      .forEach((el) => ro.observe(el));

    /* ── Redundant viewport triggers. The ResizeObserver above already
          covers these; they are kept as a cheap safety net. ── */
    window.addEventListener("resize", fitAll);
    window.addEventListener("orientationchange", fitAll);
    document.addEventListener("visibilitychange", fitAll);
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
      clearTimeout(timer);
      cancelAnimationFrame(frame);
      settle.forEach(clearTimeout);
      ro.disconnect();
      bodyObserver.disconnect();
      window.removeEventListener("resize", fitAll);
      window.removeEventListener("orientationchange", fitAll);
      document.removeEventListener("visibilitychange", fitAll);
      mqMobile.removeEventListener("change", fitAll);
      document.removeEventListener("load", onLoad, true);
    };
  }, []);
}
