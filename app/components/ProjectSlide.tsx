"use client";

import { motion } from "framer-motion";
import SlideWrapper, { itemVariants } from "./SlideWrapper";
import DeviceMockup from "./DeviceMockup";
import LaptopMockup from "./LaptopMockup";
import ExtensionMockup from "./ExtensionMockup";

interface Feature {
  title: string;
  desc: string;
}

interface ProjectSlideProps {
  id: string;
  slideNumber: string;
  title: string;
  description: string;
  domain?: string;
  background: string;
  status: string;
  features: Feature[];
  mockupSrc?: string;
  mockupSrcSplash?: string;
  mockupType?: "mobile" | "laptop" | "extension";
  topMaxWidth?: string;
}

export default function ProjectSlide({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id, slideNumber, title, description, domain, background, status, features, mockupSrc, mockupSrcSplash, mockupType = "mobile", topMaxWidth = "620px",
}: ProjectSlideProps) {
  return (
    <SlideWrapper id={id} bgImage={background} overlay="rgba(7,7,7,0.85)">
      {/* Full-height positioning context */}
      <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>

        {/* ── Top: label + title + description + divider ── */}
        <div className="stack stack-sm" style={{ maxWidth: topMaxWidth }}>

          {/* Top row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "0.2rem" }}>
            <motion.p className="t-label" variants={itemVariants} style={{ position: "relative", overflow: "hidden" }}>
              <motion.span
                initial={{ left: "-100%" }}
                animate={{ left: "200%" }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", repeatDelay: 4 }}
                style={{
                  position: "absolute",
                  top: 0, left: 0, width: "40%", height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
                  transform: "skewX(-25deg)",
                  pointerEvents: "none"
                }}
              />
              {slideNumber} / Project Overview
            </motion.p>
            <motion.span variants={itemVariants}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.45rem",
                padding: "0.28rem 0.85rem", border: "1px solid var(--border)",
                background: "var(--surface)",
                fontFamily: "var(--f-body)", fontSize: "0.58rem",
                letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--tx-3)"
              }}>
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                style={{
                  width: "6px", height: "6px", borderRadius: "50%",
                  background: status === "Delivered" ? "var(--accent)" : "rgba(255,255,255,0.2)",
                  boxShadow: status === "Delivered" ? "0 0 8px 1px rgba(228, 228, 231, 0.4)" : "none"
                }}
              />
              {status}
            </motion.span>
          </div>

          {/* Domain + title */}
          <div className="stack" style={{ gap: "0.1rem" }}>
            {/* <motion.p className="t-mono" variants={itemVariants} style={{ color: "var(--accent)", opacity: 0.6 }}>
              {domain}
            </motion.p> */}
            <motion.h2 className="t-h3" variants={itemVariants} style={{ maxWidth: "900px" }}>
              {title}
            </motion.h2>
          </div>

        </div>

        {/* ── Bottom row: features grid + mockup, both bottom-aligned ── */}
        <div className="project-slide-row">

          {/* Left: description + divider + features grid */}
          <div className="stack stack-sm project-slide-left">

            {/* Overview Description */}
            <motion.p className="t-body" variants={itemVariants} style={{ maxWidth: "900px" }}>
              {description}
            </motion.p>

            <motion.div variants={itemVariants} style={{ borderBottom: "1px solid var(--border)", margin: "0.25rem 0", maxWidth: "900px" }} />

            {/* Key Features (2x2 Grid) */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(0.5rem, 3vh, 1.25rem)", maxWidth: "100%", marginTop: "clamp(0.5rem, 3vh, 1rem)" }}>
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.03,
                    y: -5,
                    backgroundColor: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.12)",
                    boxShadow: "0 15px 35px -10px rgba(0,0,0,0.6)"
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="stack stack-xs"
                  style={{
                    padding: "1.25rem",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.02)",
                    background: "rgba(255,255,255,0.01)",
                    cursor: "default",
                    position: "relative",
                    overflow: "hidden"
                  }}
                >
                  {/* Subtle shimmer gradient on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      position: "absolute", inset: 0,
                      background: "radial-gradient(circle at top left, rgba(255,255,255,0.06), transparent 70%)",
                      pointerEvents: "none"
                    }}
                  />

                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", position: "relative", zIndex: 1 }}>
                    <span className="t-mono" style={{ color: "var(--accent)", opacity: 0.5, fontSize: "0.7rem" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <motion.span
                      className="rule"
                      style={{ flex: 1, width: "auto", transformOrigin: "left" }}
                      initial={{ scaleX: 0, opacity: 0 }}
                      whileInView={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.3 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                      viewport={{ once: true }}
                    />
                  </div>
                  <h3 className="t-h5" style={{ fontSize: "clamp(0.75rem, 0.95vw, 0.9rem)", marginTop: "0.5rem", position: "relative", zIndex: 1 }}>
                    {f.title}
                  </h3>
                  <p className="t-sm" style={{ fontSize: "clamp(0.65rem, 0.85vw, 0.8rem)", color: "var(--tx-2)", position: "relative", zIndex: 1 }}>
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Area Wrapper — takes the remaining space on the right */}
          <div className="mockup-positioning project-slide-right">
            {/* Device Mockup */}
            <motion.div
              variants={itemVariants}
              animate={{ y: [0, -10, 0] }}
              transition={{
                y: { repeat: Infinity, duration: 6, ease: "easeInOut" }
              }}
              style={{
                flexShrink: 0,
                display: "flex",
                gap: mockupType === "extension" ? "clamp(0.8rem, min(1.5vw, 2.6vh), 2rem)" : "clamp(3.5rem, min(6.5vw, 11.5vh), 7.5rem)",
                marginRight: mockupType === "laptop" ? "calc(var(--laptop-w) * 0.08)" : 0,
                willChange: "transform"
              }}
            >
              {mockupType === "laptop" ? (
                <motion.div whileHover={{ scale: 1.03, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}>
                  <LaptopMockup src={mockupSrc} alt={`${title} app screenshot`} />
                </motion.div>
              ) : mockupType === "extension" ? (
                <>
                  {mockupSrcSplash && (
                    <motion.div whileHover={{ scale: 1.03, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}>
                      <ExtensionMockup src={mockupSrcSplash} alt={`${title} splash screen`} />
                    </motion.div>
                  )}
                  {mockupSrc && (
                    <motion.div whileHover={{ scale: 1.03, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}>
                      <ExtensionMockup src={mockupSrc} alt={`${title} app screenshot`} />
                    </motion.div>
                  )}
                </>
              ) : (
                <>
                  <motion.div whileHover={{ scale: 1.03, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}>
                    <DeviceMockup src={mockupSrcSplash} alt={`${title} splash screen`} />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}>
                    <DeviceMockup src={mockupSrc} alt={`${title} app screenshot`} />
                  </motion.div>
                </>
              )}
            </motion.div>
          </div>

        </div>

      </div>
    </SlideWrapper>
  );
}
