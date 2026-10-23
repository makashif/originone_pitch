"use client";

import { useDeck, SLIDES } from "./PresentationShell";

export default function NavDots() {
  const { current, goTo } = useDeck();

  return (
    <nav
      aria-label="Slide navigation"
      className="no-print nav-dots"
      style={{
        position: "fixed",
        right: "clamp(1.2rem, 2.5vw, 2.2rem)",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 500,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {SLIDES.map((slide, i) => (
        <button
          key={slide.id}
          id={`nav-dot-${i}`}
          aria-label={`Go to ${slide.label}`}
          onClick={() => goTo(i)}
          title={slide.label}
          style={{
            width: current === i ? "28px" : "8px",
            height: "8px",
            borderRadius: "99px",
            background: current === i ? "var(--tri)" : "rgba(11,12,16,0.2)",
            border: "none",
            cursor: "pointer",
            padding: 0,
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            boxShadow: current === i ? "0 0 10px rgba(28,200,208,0.55)" : "none",
          }}
        />
      ))}
    </nav>
  );
}
