"use client";

import { useEffect, useRef } from "react";
import WebGLFluid from "webgl-fluid-enhanced";

function isWebGLAvailable() {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    return !!gl;
  } catch {
    return false;
  }
}

export default function FluidBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || initializedRef.current) return;
    initializedRef.current = true;

    // Purely decorative: where WebGL is unavailable (blocked, an old or
    // blacklisted GPU, or the browser's context limit reached) skip the
    // effect instead of crashing the deck. webgl-fluid-enhanced assumes a
    // working context and does not null-check it itself.
    if (!isWebGLAvailable()) return;

    let fluid: WebGLFluid;
    try {
      fluid = new WebGLFluid(containerRef.current);
    } catch {
      return;
    }
    fluid.setConfig({
      hover: true,
      densityDissipation: 4,
      velocityDissipation: 1.5,
      pressure: 0.5,
      curl: 4,
      splatRadius: 0.1,
      shading: true,
      colorful: true,
      colorPalette: ["#1cc8d0", "#4fd6dc", "#1cc8d0"], // Turquoise Cyan, the primary stem
      bloom: false,
      bloomIterations: 8,
      bloomResolution: 256,
      bloomIntensity: 0.1,
      bloomThreshold: 0.6,
      bloomSoftKnee: 0.7,
      sunrays: true,
      sunraysResolution: 196,
      sunraysWeight: 1.0,
      transparent: true,
    });
    fluid.start();
  }, []);

  useEffect(() => {
    // Forward mouse events to the container so it works even when elements in front block hover
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      // Prevent infinite loop from bubbling synthetic events
      if (!e.isTrusted) return;
      if (!containerRef.current) return;
      
      let clientX, clientY;
      if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      // Dispatch a synthetic event directly to the internal canvas
      const syntheticEvent = new MouseEvent('mousemove', {
        clientX,
        clientY,
        bubbles: true,
        cancelable: true,
      });
      const internalCanvas = containerRef.current.querySelector('canvas');
      if (internalCanvas) {
        internalCanvas.dispatchEvent(syntheticEvent);
      }
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
    };
  }, []);

  return (
    <div
      className="no-print"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100svh",
        zIndex: 1, // Sit above the dark background (-1) and overlay (0), but below content (2)
        pointerEvents: "none", // Let clicks pass through
        opacity: 0.6, // Slightly fade to keep it elegant and non-distracting
        mixBlendMode: "multiply", // Tints the ivory page with the stem dyes; empty canvas stays invisible
      }}
    >
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
