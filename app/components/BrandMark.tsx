/* Brand kit V2 mark — Ink ring, coloured stem. Geometry traced from the
   400×400 master (same as the main site's LogoMark): ring centred at
   (200,200) with outer/inner radii 78/52, and a 26-wide bar spanning
   y 74→326. Fills are attributes (not classes) so html2canvas and the
   OG image renderer draw it exactly. */

export const MARK_VIEWBOX = { x: 122, y: 74, w: 156, h: 252 };

export default function BrandMark({
  height,
  ring = "#0b0c10",
  stem = "#0a78c2",
  style,
}: {
  height: number | string;
  ring?: string;
  stem?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox={`${MARK_VIEWBOX.x} ${MARK_VIEWBOX.y} ${MARK_VIEWBOX.w} ${MARK_VIEWBOX.h}`}
      style={{ height, width: "auto", aspectRatio: `${MARK_VIEWBOX.w} / ${MARK_VIEWBOX.h}`, display: "block", ...style }}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill={ring}
        fillRule="evenodd"
        d="M200 122a78 78 0 1 1 0 156a78 78 0 1 1 0-156zM200 148a52 52 0 1 0 0 104a52 52 0 1 0 0-104z"
      />
      <rect fill={stem} x="187" y="74" width="26" height="252" />
    </svg>
  );
}
