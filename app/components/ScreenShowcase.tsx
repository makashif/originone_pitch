"use client";

import DeviceMockup from "./DeviceMockup";

/* ─────────────────────────────────────────────────────────────
   ScreenShowcase — a product's web app in a browser window, with
   its other surfaces in front of the lower-right corner:
     · front: one phone, or a second web screen
     · phones: a fan of up to three phones (front-most first)
     · neither: the browser window on its own

   Everything is sized from one variable, --showcase-w, so the set
   keeps its composition at every breakpoint and in the PDF export.

   The web screenshots are full page length. The window shows the top
   of the page; hovering scrolls slowly to the bottom. The scroll is
   driven by `top` + `transform` rather than object-position, because
   html2canvas (PDF export) does not support object-fit.
───────────────────────────────────────────────────────────── */

type Surface =
  | { kind: "phone"; src: string; alt: string }
  | { kind: "web"; src: string; alt: string; url?: string };

interface WebScreen {
  src: string;
  alt: string;
  /** Text in the address pill — a URL, or a neutral label. */
  url: string;
  /** Screen width / height. Defaults to 16:10. */
  ratio?: number;
}

interface ScreenShowcaseProps {
  web: WebScreen;
  front?: Surface;
  phones?: { src: string; alt: string }[];
}

function BrowserWindow({ src, alt, url, ratio, className = "" }: WebScreen & { className?: string }) {
  return (
    <div className={`browser ${className}`}>
      <div className="browser-bar">
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="browser-url">
          <svg width="8" height="9" viewBox="0 0 8 9" fill="none" aria-hidden="true">
            <rect x="0.5" y="3.5" width="7" height="5" rx="1" stroke="currentColor" />
            <path d="M2 3.5V2.5a2 2 0 0 1 4 0v1" stroke="currentColor" />
          </svg>
          {url}
        </span>
      </div>
      <div
        className="browser-screen"
        style={ratio ? ({ "--screen-ratio": String(ratio) } as React.CSSProperties) : undefined}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} draggable={false} />
      </div>
    </div>
  );
}

export default function ScreenShowcase({ web, front, phones }: ScreenShowcaseProps) {
  const variant = phones?.length ? "fan" : front ? front.kind : "solo";

  return (
    <div className={`showcase showcase--${variant}`}>
      <BrowserWindow {...web} className="showcase-main" />

      {front?.kind === "phone" && (
        <div className="showcase-front showcase-phone">
          <DeviceMockup src={front.src} alt={front.alt} />
        </div>
      )}

      {front?.kind === "web" && (
        <div className="showcase-front showcase-web">
          <BrowserWindow src={front.src} alt={front.alt} url={front.url ?? web.url} />
        </div>
      )}

      {phones?.slice(0, 3).map((p, i) => (
        <div key={p.src} className="showcase-fan-phone" style={{ "--i": i } as React.CSSProperties}>
          <DeviceMockup src={p.src} alt={p.alt} />
        </div>
      ))}
    </div>
  );
}
