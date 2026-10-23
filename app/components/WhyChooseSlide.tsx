"use client";

import { motion } from "framer-motion";
import SlideWrapper, { itemVariants } from "./SlideWrapper";

const reasons = [
  {
    n: "01",
    title: "End-to-End Ownership",
    body: "From planning to deployment and beyond, we manage the complete lifecycle.",
  },
  {
    n: "02",
    title: "AI-First Thinking",
    body: "We identify opportunities where AI can improve efficiency, automation, and customer experience.",
  },
  {
    n: "03",
    title: "Senior Talent",
    body: "Projects are delivered by experienced engineers, architects, designers, and product specialists.",
  },
  {
    n: "04",
    title: "Business-Focused Approach",
    body: "Technology decisions are aligned with business objectives and measurable outcomes.",
  },
  {
    n: "05",
    title: "Built for Scale",
    body: "Every solution is designed to support future growth and expansion.",
  },
  {
    n: "06",
    title: "Long-Term Partnership",
    body: "We continue supporting, improving, and evolving systems after launch.",
  },
];

export default function WhyChooseSlide() {
  return (
    <SlideWrapper
      id="slide-why"
      bgImage="/light/A_sleek,_dark_background_featuring_202606181541.jpg"
      overlay="rgba(246,245,240,0.86)"
    >
      <div className="stack stack-md">

        <div className="stack stack-xs">
          <motion.p className="t-label eyebrow" variants={itemVariants}>
            13 / Why Origin One Labs
          </motion.p>
          <motion.h2 className="t-h2" variants={itemVariants} style={{ maxWidth: "620px", fontSize: "clamp(2rem, 3.5vw, 3.2rem)" }}>
            A Technology Partner,<br />
            <span className="t-dim">Not Just Another Dev Company.</span>
          </motion.h2>
          <motion.p className="t-body" variants={itemVariants}
            style={{ maxWidth: "400px", margin: "clamp(0.5rem, 2.5vh, 1.5rem) 0" }}>
            Many businesses struggle because technology projects are spread across multiple vendors. We provide a single accountable team. We don&apos;t simply build software. We help businesses build technology that lasts.
          </motion.p>
        </div>

        {/* 6-card auto-fit grid */}
        <div className="grid-auto">
          {reasons.map((r) => (
            <motion.div key={r.n} variants={itemVariants} className="card stack stack-sm">
              <div style={{
                width: "22px", height: "22px", borderRadius: "50%",
                border: "1px solid var(--accent-line)",
                background: "var(--accent-dim)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--f-mono)", fontSize: "0.48rem",
                color: "var(--accent)",
              }}>
                {r.n}
              </div>
              <h3 className="t-h4">{r.title}</h3>
              <p className="t-sm">{r.body}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </SlideWrapper>
  );
}
