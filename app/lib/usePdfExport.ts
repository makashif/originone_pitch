import { useState, useCallback } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { SLIDES } from "../components/PresentationShell";

/* ─────────────────────────────────────────────────────────────
   Export frame — every slide becomes one A4-landscape page.

   Slides are designed for 16:10 screens, so on the taller A4 page
   their content would sit at screen size inside wide empty bands,
   while the densest slides (the portfolio) would run off the page.

   fitSlideForExport sizes each slide's capture frame instead: same
   A4 proportion, but 1380/s × 976/s. Content lays out naturally in
   that frame (no CSS transforms — html2canvas mis-renders text under
   transform: scale), and the capture is then placed full-page, so it
   appears s× larger. It picks the largest s at which the content
   still fits the frame's safe area: sparse slides grow, dense slides
   shrink, everything stays centred.
───────────────────────────────────────────────────────────── */
const EXPORT_W = 1380;
const EXPORT_H = 976;
const FIT_MAX = 1.3;
const FIT_MIN = 0.6;
const FIT_STEP = 0.02;

function fitSlideForExport(doc: Document, slideId: string) {
  const slide = doc.getElementById(slideId);
  const content = slide?.querySelector<HTMLElement>(".slide-content");
  const view = doc.defaultView;
  if (!slide || !content || !view) return;

  const setFrame = (s: number) => {
    slide.style.setProperty("--export-w", `${(EXPORT_W / s).toFixed(1)}px`);
    slide.style.setProperty("--export-h", `${(EXPORT_H / s).toFixed(1)}px`);
  };
  // Measure the content's own height, not the frame-filling box.
  content.style.setProperty("height", "auto", "important");
  content.style.setProperty("max-height", "none", "important");

  let scale = FIT_MIN;
  for (let s = FIT_MAX; s >= FIT_MIN; s -= FIT_STEP) {
    setFrame(s);
    const cs = view.getComputedStyle(slide);
    const availH = slide.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    const naturalH = Math.max(content.scrollHeight, content.offsetHeight);
    if (naturalH <= availH) {
      scale = s;
      break;
    }
  }
  setFrame(scale);
}

/* Force every reveal animation to its end state in the clone: slides
   that have not been scrolled to yet are still hidden, mid-fade or
   mid-blur when captured. */
const CLONE_RESET_CSS = `
  * {
    animation: none !important;
    transition: none !important;
  }
  [style*="opacity: 0"],
  [style*="opacity:0"] {
    opacity: 1 !important;
    visibility: visible !important;
  }
  [style*="translateY"],
  [style*="translateX"],
  [style*="scale"] {
    transform: none !important;
  }
  [style*="blur"] {
    filter: none !important;
  }
`;

function prepareClone(doc: Document, slideId: string) {
  const style = doc.createElement("style");
  style.innerHTML = CLONE_RESET_CSS;
  doc.head.appendChild(style);
  fitSlideForExport(doc, slideId);
}

export function usePdfExport() {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isPreviewing, setIsPreviewing] = useState(false);

  const generatePreview = useCallback(async (slideId: string) => {
    if (isPreviewing || isExporting) return;
    setIsPreviewing(true);

    try {
      document.body.classList.add("pdf-export-active");
      await new Promise((resolve) => setTimeout(resolve, 500));

      const element = document.getElementById(slideId);
      if (!element) return;

      element.scrollIntoView({ behavior: "instant", block: "start" });
      await new Promise((resolve) => setTimeout(resolve, 50));

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#f6f5f0",
        logging: false,
        windowWidth: EXPORT_W,
        windowHeight: EXPORT_H,
        ignoreElements: (el) => el.classList.contains("no-print"),
        onclone: (clonedDoc) => prepareClone(clonedDoc, slideId),
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      setPreviewImage(imgData);
    } catch (error) {
      console.error("Preview generation failed:", error);
      alert("Failed to generate preview.");
    } finally {
      document.body.classList.remove("pdf-export-active");
      setIsPreviewing(false);
    }
  }, [isPreviewing, isExporting]);

  const closePreview = useCallback(() => {
    setPreviewImage(null);
  }, []);

  const exportPdf = useCallback(async () => {
    if (isExporting) return;
    setIsExporting(true);
    setExportProgress(0);

    try {
      document.body.classList.add("pdf-export-active");

      // Give Framer Motion time to fully animate out of any active hover states
      // because pdf-export-active instantly disables pointer events globally.
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Create A4 landscape PDF
      // A4 physical dimensions: 297mm x 210mm
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      for (let i = 0; i < SLIDES.length; i++) {
        const slideId = SLIDES[i].id;
        const element = document.getElementById(slideId);

        if (!element) {
          console.warn(`Slide ${slideId} not found for export.`);
          continue;
        }

        // We temporarily bring the slide into view to ensure it renders correctly
        // especially if there are lazy-loaded images or IntersectionObserver animations.
        element.scrollIntoView({ behavior: "instant", block: "start" });

        // Wait a tiny bit for any layout shifts/animations to settle
        await new Promise((resolve) => setTimeout(resolve, 50));

        const canvas = await html2canvas(element, {
          scale: 2, // 2x resolution for crispness (144dpi effective)
          useCORS: true,
          allowTaint: false,
          backgroundColor: "#f6f5f0",
          logging: false,
          windowWidth: EXPORT_W, // Force a fixed window width so html2canvas doesn't crop at the user's viewport edge
          windowHeight: EXPORT_H,
          // Ignore the UI chrome during export
          ignoreElements: (el) => el.classList.contains("no-print"),
          onclone: (clonedDoc) => prepareClone(clonedDoc, slideId),
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.95);

        if (i > 0) {
          pdf.addPage();
        }

        // The canvas is now guaranteed to be exactly 1380x976 (A4 proportion) via CSS
        pdf.addImage(imgData, "JPEG", 0, 0, 297, 210);

        setExportProgress(i + 1);
      }

      pdf.save("OriginOne-Pitch-Deck.pdf");
    } catch (error) {
      console.error("PDF export failed:", error);
      alert("Failed to export PDF. See console for details.");
    } finally {
      document.body.classList.remove("pdf-export-active");
      setIsExporting(false);
      setExportProgress(0);
    }
  }, [isExporting]);

  return { 
    exportPdf, 
    isExporting, 
    exportProgress, 
    totalSlides: SLIDES.length,
    previewImage,
    isPreviewing,
    generatePreview,
    closePreview
  };
}
