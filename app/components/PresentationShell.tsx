"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { usePdfExport } from "../lib/usePdfExport";
import useFitSlides from "../lib/useFitSlides";
import PdfExportOverlay from "./PdfExportOverlay";
import FluidBackground from "./FluidBackground";

/* ─────────────────────────────────────────
   Slide manifest — single source of truth
───────────────────────────────────────── */
export const SLIDES = [
  { id: "slide-hero", label: "Intro" },
  { id: "slide-about", label: "About Origin One" },
  { id: "slide-solutions", label: "What We Build" },
  { id: "slide-tech", label: "Tech Stack" },
  { id: "slide-portfolio", label: "Portfolio Overview" },
  { id: "slide-p1", label: "Fuutura Wallet" },
  { id: "slide-p2", label: "Fuutura Trade" },
  { id: "slide-p3", label: "Fuutura Extension" },
  { id: "slide-p4", label: "Fuutura KYC" },
  { id: "slide-p4b", label: "Fuutura Chat" },
  { id: "slide-p4c", label: "Fuutura VPN" },
  { id: "slide-p5", label: "Origin One Labs HRMS" },
  { id: "slide-p6", label: "Digital24" },
  { id: "slide-p7", label: "Intelizzz | U-Haul" },
  { id: "slide-p8", label: "Toybox" },
  { id: "slide-p9", label: "Health & Care Platform (Ai Based)" },
  { id: "slide-p10", label: "SAAP (Ai Based)" },
  { id: "slide-p11", label: "Marketplace Platform (Ai Based)" },
  { id: "slide-p12", label: "Logistics & Dispatch (Ai Based)" },
  { id: "slide-p13", label: "Creative Community (Ai Based)" },
  { id: "slide-p14", label: "FinTech Platform (Ai Based)" },
  { id: "slide-p15", label: "Ads & Payment (Ai Based)" },
  { id: "slide-p16", label: "E-Commerce Platform (Ai Based)" },
  { id: "slide-p17", label: "CRM Platform (Ai Based)" },
  { id: "slide-why", label: "Why Origin One" },
  { id: "slide-connect", label: "Start a Project" },
];

/* ─────────────────────────────────────────
   Context so child components can navigate
───────────────────────────────────────── */
interface DeckCtx {
  current: number;
  total: number;
  goTo: (index: number) => void;
  goNext: () => void;
  goPrev: () => void;
}

export const DeckContext = createContext<DeckCtx>({
  current: 0,
  total: SLIDES.length,
  goTo: () => { },
  goNext: () => { },
  goPrev: () => { },
});

export const useDeck = () => useContext(DeckContext);

/* ─────────────────────────────────────────
   PresentationShell
───────────────────────────────────────── */
export default function PresentationShell({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState(0);

  /* Guarantees no slide is ever cropped, at any viewport height. */
  useFitSlides();

  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  const {
    exportPdf,
    isExporting,
    exportProgress,
    totalSlides,
    previewImage,
    isPreviewing,
    generatePreview,
    closePreview
  } = usePdfExport();

  /* ── Scroll to a slide by index ── */
  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(SLIDES.length - 1, index));
    const el = document.getElementById(SLIDES[clamped].id);
    if (!el || !containerRef.current) return;

    isScrollingRef.current = true;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setCurrent(clamped);

    // Re-enable after scroll settles
    setTimeout(() => { isScrollingRef.current = false; }, 800);
  }, []);

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  /* ── IntersectionObserver — update current on scroll ── */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SLIDES.forEach(({ id }, index) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isScrollingRef.current) {
            setCurrent(index);
          }
        },
        {
          root: containerRef.current,
          threshold: 0.55,
        }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* ── Keyboard navigation ── */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Don't hijack typing in inputs
      if ((e.target as HTMLElement)?.tagName === "INPUT" ||
        (e.target as HTMLElement)?.tagName === "TEXTAREA") return;

      if (e.key === "Escape" && (previewImage || isPreviewing)) {
        e.preventDefault();
        closePreview();
        return;
      }

      switch (e.key) {
        case "e":
        case "E":
          if (e.metaKey && e.shiftKey) {
            e.preventDefault();
            exportPdf();
          }
          break;
        case "ArrowDown":
        case "ArrowRight":
        case "PageDown":
        case " ":
        case "Enter":
          e.preventDefault();
          goNext();
          break;
        case "ArrowUp":
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          goPrev();
          break;
        case "Home":
          e.preventDefault();
          goTo(0);
          break;
        case "End":
          e.preventDefault();
          goTo(SLIDES.length - 1);
          break;
        case "m":
        case "M":
          e.preventDefault();
          if (previewImage || isPreviewing) {
            closePreview();
          } else {
            generatePreview(SLIDES[current].id);
          }
          break;
      }

      // Handle number keys (1-9, 0 for 10)
      if (e.key >= "1" && e.key <= "9") {
        e.preventDefault();
        const slideIndex = parseInt(e.key, 10) - 1;
        if (slideIndex < SLIDES.length) {
          goTo(slideIndex);
        }
        return;
      }
      if (e.key === "0") {
        e.preventDefault();
        if (9 < SLIDES.length) {
          goTo(9); // Slide 10
        }
        return;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev, goTo, exportPdf, current, previewImage, isPreviewing, generatePreview, closePreview]);

  /* ── Touch swipe support ── */
  useEffect(() => {
    let startY = 0;
    let startX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      startX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (window.innerWidth <= 960) return; // Disable custom swipe navigation on screens that use continuous scroll

      const dy = startY - e.changedTouches[0].clientY;
      const dx = startX - e.changedTouches[0].clientX;
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 40) {
        if (dy > 0) {
          goNext();
        } else {
          goPrev();
        }
      }
    };

    const container = containerRef.current;
    container?.addEventListener("touchstart", handleTouchStart, { passive: true });
    container?.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      container?.removeEventListener("touchstart", handleTouchStart);
      container?.removeEventListener("touchend", handleTouchEnd);
    };
  }, [goNext, goPrev]);

  return (
    <DeckContext.Provider value={{ current, total: SLIDES.length, goTo, goNext, goPrev }}>
      <PdfExportOverlay isExporting={isExporting} progress={exportProgress} total={totalSlides} />

      {/* Global Fluid Background */}
      <FluidBackground />

      {/* Global Animated Grid Background */}
      <div className="app-grid-bg" />

      {/* Scroll container */}
      <div
        ref={containerRef}
        id="deck-container"
        style={{
          height: "100svh",
          overflowY: "scroll",
          overflowX: "hidden",
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
          overscrollBehaviorY: "contain",
        }}
      >
        {children}
      </div>

      {/* ── UI Chrome — all hidden in print ── */}

      {/* Scroll progress bar */}
      <div
        aria-hidden="true"
        className="no-print"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "2px",
          width: `${((current + 1) / SLIDES.length) * 100}%`,
          background: "linear-gradient(90deg, rgba(255,255,255,1), rgba(255,255,255,0.8))",
          boxShadow: "0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.2)",
          zIndex: 1000,
          transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* Slide counter */}
      {/* <div
        aria-live="polite"
        className="no-print"
        aria-label={`Slide ${current + 1} of ${SLIDES.length}: ${SLIDES[current].label}`}
        style={{
          position: "fixed",
          bottom: "2rem",
          left: "clamp(1.5rem, 5vw, 4rem)",
          zIndex: 500,
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "0.58rem",
          letterSpacing: "0.15em", color: "rgba(255,255,255,0.22)"
        }}>
          {String(current + 1).padStart(2, "0")}{" "}
          <span style={{ opacity: 0.4 }}>/</span>{" "}
          {String(SLIDES.length).padStart(2, "0")}
        </span>
        <span style={{ width: "1px", height: "10px", background: "rgba(255,255,255,0.1)" }} />
        <span style={{
          fontFamily: "var(--font-body)", fontSize: "0.58rem",
          letterSpacing: "0.14em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.18)", maxWidth: "160px",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
        }}>
          {SLIDES[current].label}
        </span>
      </div> */}

      {/* Keyboard hint */}
      <KeyHint />

      {/* Mockup Overlay */}
      {(isPreviewing || previewImage) && (
        <div
          className="no-print"
          onClick={closePreview}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 9999,
            backgroundColor: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            cursor: "pointer",
          }}
        >
          {isPreviewing ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
              <div className="spinner" style={{ width: "24px", height: "24px", border: "2px solid rgba(255,255,255,0.2)", borderTopColor: "white", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
              <p style={{ color: "white", fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.15em" }}>
                GENERATING EXACT FRAME...
              </p>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          ) : previewImage ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewImage}
                alt="Exact Frame Preview"
                style={{
                  maxWidth: "90%",
                  maxHeight: "90%",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "#070707" // match pdf background
                }}
              />
              <p style={{ color: "rgba(255,255,255,0.5)", marginTop: "1.5rem", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em" }}>
                PRESS &apos;M&apos;, &apos;ESC&apos;, OR CLICK ANYWHERE TO CLOSE
              </p>
            </>
          ) : null}
        </div>
      )}
    </DeckContext.Provider>
  );
}

/* ─────────────────────────────────────────
   Keyboard hint toast
───────────────────────────────────────── */
function KeyHint() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hide = () => setVisible(false);
    const t = setTimeout(hide, 4500);
    window.addEventListener("keydown", hide, { once: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", hide);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="no-print key-hint"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "clamp(3rem, 6vw, 5rem)",
        zIndex: 500,
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        padding: "0.5rem 1rem",
        borderRadius: "2px",
        animation: "fadeIn 0.6s ease both",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}
    >
      {/* Arrow icons */}
      {["↑", "↓"].map((arrow) => (
        <kbd
          key={arrow}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.5)",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "3px",
            padding: "0.15rem 0.4rem",
            lineHeight: 1,
          }}
        >
          {arrow}
        </kbd>
      ))}
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.6rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.22)",
        }}
      >
        Navigate
      </span>
      <span style={{ width: "1px", height: "10px", background: "rgba(255,255,255,0.1)", margin: "0 4px" }} />
      <kbd
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.75rem",
          color: "rgba(255,255,255,0.5)",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "3px",
          padding: "0.15rem 0.4rem",
          lineHeight: 1,
        }}
      >
        ⌘⇧E
      </kbd>
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.6rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.22)",
        }}
      >
        PDF
      </span>
    </div>
  );
}
