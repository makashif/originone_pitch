"use client";

import { useEffect, useRef } from "react";
import WebGLFluid from "webgl-fluid-enhanced";

export default function FluidBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || initializedRef.current) return;
    initializedRef.current = true;

    // Initialize the WebGL Fluid simulation
    const fluid = new WebGLFluid(containerRef.current);
    fluid.setConfig({
      hover: true,
      densityDissipation: 2.5,
      velocityDissipation: 2.0,
      pressure: 0.1,
      curl: 3,
      splatRadius: 0.1,
      shading: true,
      colorful: false,
      colorPalette: ["#333333", "#444444", "#555555", "#666666"],
      bloom: true,
      bloomIterations: 8,
      bloomResolution: 256,
      bloomIntensity: 0.2,
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
        opacity: 0.8, // Slightly fade to keep it elegant and non-distracting
        mixBlendMode: "screen", // Perfectly makes the black canvas transparent on dark themes!
      }}
    >
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
