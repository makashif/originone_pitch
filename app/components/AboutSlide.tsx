"use client";

import { motion } from "framer-motion";
import SlideWrapper, { itemVariants } from "./SlideWrapper";

const coreValues = [
  { title: "Excellence", desc: "We pursue the highest standards in everything we build." },
  { title: "Innovation", desc: "We embrace emerging technologies and modern approaches." },
  { title: "Accountability", desc: "We take ownership of outcomes, not just deliverables." },
  { title: "Collaboration", desc: "We work as an extension of our clients' teams." },
  { title: "Long-Term Thinking", desc: "We build systems designed to create lasting value." },
];

export default function AboutSlide() {
  return (
    <SlideWrapper
      id="slide-about"
      bgImage="/light/Extremely_professional_corporate_background_for_202606181541.jpg"
      overlay="rgba(246,245,240,0.9)"
    >
      <div className="stack stack-md">
        {/* Header */}
        <div className="stack stack-xs">
          <motion.p className="t-label eyebrow" variants={itemVariants}>
            02 / About Origin One Labs
          </motion.p>
          <motion.h2 className="t-h2" variants={itemVariants}>
            Engineering the Future<br />
            <span className="t-dim">of Business.</span>
          </motion.h2>
        </div>

        {/* Core Values Label (outside of grid-2, aligned with the right column) */}
        <div className="grid-2 about-values-header">
          <div className="about-values-empty"></div>
          <div>
            <motion.p className="t-label" variants={itemVariants}
              style={{ marginBottom: "var(--sp-xs)" }}>
              Core Values
            </motion.p>
          </div>
        </div>

        <div className="grid-2">
          
          {/* ── Left Column ── */}
          <div className="stack stack-sm">
            <motion.p className="t-body" variants={itemVariants}
              style={{ maxWidth: "460px", paddingTop: "var(--sp-xs)" }}>
              Origin One Labs was founded to help organizations navigate increasingly complex technology challenges. We believe great technology is built through a combination of strategic thinking, strong architecture, engineering excellence, and relentless execution.
            </motion.p>
            <motion.p className="t-body" variants={itemVariants}
              style={{ maxWidth: "460px" }}>
              Our goal is simple: Help businesses build technology that delivers measurable value and supports long-term growth. We don&apos;t outsource outcomes. We take ownership from concept to production.
            </motion.p>

            <motion.div variants={itemVariants}
              style={{
                paddingTop: "var(--sp-sm)", borderTop: "1px solid var(--border)",
                marginTop: "var(--sp-xs)",
              }}>
            </motion.div>

            {/* Mission / Vision */}
            <div className="mv-grid">
              {[
                { tag: "Mission", text: "To design and deliver intelligent technology solutions that help businesses innovate, scale, and compete in a digital-first world." },
                { tag: "Vision", text: "To become a globally trusted technology and engineering partner known for building innovative, scalable, and impactful digital systems." },
              ].map(item => (
                <motion.div key={item.tag} variants={itemVariants}
                  style={{
                    borderLeft: "1px solid var(--border-strong)",
                    paddingLeft: "clamp(0.8rem, 1.6vw, 1.25rem)", paddingTop: "clamp(0.3rem, 1.2vh, 0.65rem)", paddingBottom: "clamp(0.3rem, 1.2vh, 0.65rem)"
                  }}>
                  <p className="t-mono" style={{ color: "var(--tx-3)", marginBottom: "0.25rem" }}>
                    {item.tag}
                  </p>
                  <p className="t-sm">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Right Column ── */}
          <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>

            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: "clamp(0.5rem, 2.2vh, 1.25rem)",
              marginTop: "auto", /* Align bottom with Mission/Vision */
            }}>
              {coreValues.map((v, i) => (
                <motion.div key={i} variants={itemVariants}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: "clamp(0.7rem, 1.6vw, 1.25rem)",
                    paddingBottom: "clamp(0.45rem, 2vh, 1.15rem)",
                    borderBottom: "1px solid var(--border)",
                  }}>
                  <span className="t-mono t-accent" style={{ width: "2rem", flexShrink: 0, marginTop: "0.2rem" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="stack" style={{ gap: "0.25rem" }}>
                    <span className="t-h4" style={{ fontWeight: 500 }}>{v.title}</span>
                    <span className="t-sm" style={{ color: "var(--tx-3)" }}>{v.desc}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        <motion.div variants={itemVariants}
          style={{ display: "flex", justifyContent: "center", paddingTop: "clamp(0.75rem, 4vh, 3rem)", width: "100%" }}>
          <span style={{ fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.25em", color: "var(--ink)" }}>
            ORIGIN ONE LABS
          </span>
        </motion.div>

      </div>
    </SlideWrapper>
  );
}
