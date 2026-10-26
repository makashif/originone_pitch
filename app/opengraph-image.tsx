import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { MARK_VIEWBOX } from "./components/BrandMark";

/* Social share card — mirrors the deck's cover: stacked brand lockup,
   "Company Profile" title, tagline, and corner meta, in Cyan Blue on
   Ivory. Centred so it survives the square crop WhatsApp and others
   apply to small previews. */

export const alt = "Origin One Labs — Company Profile. AI-native technology and engineering partner. Build what matters.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const IVORY = "#f6f5f0";
const INK = "#0b0c10";
const CYAN = "#0a78c2";
const CYAN_HI = "#2ab4f5";
const MUTED = "rgba(11,12,16,0.56)";

export default async function Image() {
  const dir = join(process.cwd(), "app/_og");
  const [medium, bold] = await Promise.all([
    readFile(join(dir, "PlusJakartaSans-500.woff")),
    readFile(join(dir, "PlusJakartaSans-700.woff")),
  ]);

  const meta = { fontSize: 17, fontWeight: 700, letterSpacing: "0.22em", color: MUTED } as const;
  const rule = { flex: 1, height: 1, margin: "0 24px", background: "rgba(10,120,194,0.28)" } as const;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          background: IVORY,
          backgroundImage:
            "radial-gradient(circle at 50% 46%, rgba(42,180,245,0.14) 0%, rgba(246,245,240,0) 46%), linear-gradient(rgba(11,12,16,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(11,12,16,0.04) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 60px 60px, 60px 60px",
          fontFamily: "Jakarta",
          color: INK,
          padding: "44px 64px 0",
        }}
      >
        {/* Header meta */}
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <div style={meta}>COMPANY PROFILE</div>
          <div style={rule} />
          <div style={meta}>EDITION 2026</div>
        </div>

        {/* Lockup */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* The OG renderer needs fixed pixel dimensions on the <svg>. */}
          <svg
            width={Math.round((150 * MARK_VIEWBOX.w) / MARK_VIEWBOX.h)}
            height={150}
            viewBox={`${MARK_VIEWBOX.x} ${MARK_VIEWBOX.y} ${MARK_VIEWBOX.w} ${MARK_VIEWBOX.h}`}
          >
            <path
              fill={INK}
              fillRule="evenodd"
              d="M200 122a78 78 0 1 1 0 156a78 78 0 1 1 0-156zM200 148a52 52 0 1 0 0 104a52 52 0 1 0 0-104z"
            />
            <rect fill={CYAN} x="187" y="74" width="26" height="252" />
          </svg>
          <div style={{ marginTop: 26, fontSize: 68, fontWeight: 700, letterSpacing: "0.14em", paddingLeft: "0.14em", lineHeight: 1 }}>
            ORIGIN ONE LABS
          </div>
          <div style={{ marginTop: 24, width: 72, height: 3, borderRadius: 3, backgroundImage: `linear-gradient(90deg, ${CYAN}, ${CYAN_HI})` }} />
          <div style={{ marginTop: 20, fontSize: 32, fontWeight: 700, letterSpacing: "0.32em", paddingLeft: "0.32em", color: CYAN }}>
            COMPANY PROFILE
          </div>
          <div style={{ display: "flex", marginTop: 12, fontSize: 25, fontWeight: 500, letterSpacing: "-0.01em" }}>
            Build What&nbsp;<span style={{ color: CYAN, fontWeight: 700 }}>Matters.</span>
          </div>
        </div>

        {/* Footer meta + Cyan Blue bar */}
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", width: "100%", paddingBottom: 30 }}>
            <div style={{ ...meta, letterSpacing: "0.08em", fontWeight: 500 }}>originonelabs.com</div>
            <div style={rule} />
            <div style={{ ...meta, letterSpacing: "0.08em", fontWeight: 500 }}>AI-Native Technology & Engineering Partner</div>
          </div>
          <div style={{ display: "flex", height: 10, margin: "0 -64px", backgroundImage: `linear-gradient(90deg, ${CYAN}, ${CYAN_HI})` }} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Jakarta", data: medium, style: "normal", weight: 500 },
        { name: "Jakarta", data: bold, style: "normal", weight: 700 },
      ],
    }
  );
}
