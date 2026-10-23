import { useState, useCallback } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { SLIDES } from "../components/PresentationShell";

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
        windowWidth: 1380,
        windowHeight: 976,
        ignoreElements: (el) => el.classList.contains("no-print"),
        onclone: (clonedDoc) => {
          const style = clonedDoc.createElement("style");
          style.innerHTML = `
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
          `;
          clonedDoc.head.appendChild(style);
        },
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
          windowWidth: 1380, // Force a fixed window width so html2canvas doesn't crop at the user's viewport edge
          windowHeight: 976,
          // Ignore the UI chrome during export
          ignoreElements: (el) => el.classList.contains("no-print"),
          onclone: (clonedDoc) => {
            // Inject a style block to force all Framer Motion initial states to their final visible states
            const style = clonedDoc.createElement("style");
            style.innerHTML = `
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
            `;
            clonedDoc.head.appendChild(style);
          },
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
