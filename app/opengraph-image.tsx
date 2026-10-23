import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/* Social share card — Brand kit V2, light mode: Ink ring + Turquoise
   Cyan stem on Ivory, matching the main originonelabs.com theme. */

export const alt = "Origin One Labs — AI-Native Technology & Engineering Partner. Build what matters.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const IVORY = "#f6f5f0";
const INK = "#0b0c10";
const STEM = "#0a8c93";

/* The mark, drawn from the brand kit's proportions: a ring whose
   stroke equals the stem width, the stem running ~1.6× the ring. */
function Mark({ ring }: { ring: number }) {
  const stroke = ring * 0.17;
  const stemH = ring * 1.6;
  return (
    <div style={{ position: "relative", display: "flex", width: ring, height: stemH, alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: ring, height: ring, borderRadius: ring, border: `${stroke}px solid ${INK}` }} />
      <div style={{ position: "absolute", left: (ring - stroke) / 2, top: 0, width: stroke, height: stemH, background: STEM }} />
    </div>
  );
}

export default async function Image() {
  const dir = join(process.cwd(), "app/_og");
  const [medium, bold] = await Promise.all([
    readFile(join(dir, "PlusJakartaSans-500.woff")),
    readFile(join(dir, "PlusJakartaSans-700.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: IVORY,
          backgroundImage:
            "linear-gradient(rgba(11,12,16,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(11,12,16,0.045) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          fontFamily: "Jakarta",
          color: INK,
          padding: "72px 80px",
        }}
      >
        {/* Copy */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <Mark ring={30} />
            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: "0.16em" }}>ORIGIN ONE LABS</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 112, fontWeight: 700, lineHeight: 0.98, letterSpacing: "-0.03em" }}>Build What</div>
            <div style={{ fontSize: 112, fontWeight: 700, lineHeight: 0.98, letterSpacing: "-0.03em", color: "#0a6a70" }}>Matters</div>
            <div style={{ marginTop: 30, fontSize: 28, fontWeight: 500, color: "rgba(11,12,16,0.7)" }}>
              AI-Native Technology & Engineering Partner
            </div>
          </div>

          <div style={{ display: "flex", fontSize: 20, fontWeight: 500, letterSpacing: "0.08em", color: "rgba(11,12,16,0.55)" }}>
            originonelabs.com
          </div>
        </div>

        {/* Large mark */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 360 }}>
          <Mark ring={250} />
        </div>

        {/* Tri-stem bar — all three colourways */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 10,
            backgroundImage: "linear-gradient(90deg, #1cc8d0, #2ab4f5, #5fe3b8)",
          }}
        />
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
