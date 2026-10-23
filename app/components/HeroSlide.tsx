"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function HeroSlide() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      ref={ref}
      id="slide-hero"
      className="slide"
      style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}
    >
      {/* Background */}
      <div
        className="slide-bg"
        style={{ backgroundImage: "url('/light/hero_corporate_bg.jpg')", backgroundPosition: "center 30%" }}
      />
      <div
        className="slide-overlay"
        style={{ background: "linear-gradient(180deg, rgba(246,245,240,0.3) 0%, rgba(246,245,240,0.68) 42%, rgba(246,245,240,0.97) 100%)" }}
      />

      {/* ── Content ── */}
      <div className="slide-content" style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: "clamp(0.8rem, 1.6vh, 1.4rem)",
        maxWidth: "900px", margin: "0 auto", padding: "0 1rem",
      }}>

        {/* Eyebrow */}
        <motion.p
          className="t-label eyebrow"
          style={{ letterSpacing: "0.28em", alignSelf: "center" }}
          initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.18 }}
        >
          Origin One Labs · AI-Native Technology & Engineering Partner
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="t-hero"
          style={{ color: "var(--ink)" }}
          initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.95, delay: 0.32, ease }}
        >
          Build What<br />
          <span className="t-dim">Matters</span>
        </motion.h1>

        {/* Sub */}
        <motion.div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "center", maxWidth: "600px", textAlign: "center" }}
          initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.55 }}
        >
          <p className="t-body" style={{ fontWeight: 500, color: "var(--tx-1)" }}>
            Technology, AI, and Engineering Solutions Built for Real Business Growth.
          </p>
          <p className="t-body">
            Origin One Labs is an AI-native technology and engineering partner that designs, builds, and scales intelligent digital systems for modern businesses.
          </p>
        </motion.div>

        {/* Rule */}
        <motion.span
          className="rule rule-stem"
          style={{ transformOrigin: "center", width: "48px" }}
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.55, delay: 0.78 }}
        />

        {/* Tech stack pills */}
        <motion.div
          style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {["AI", "Web2", "Web3", "Enterprise", "Mobile"].map((tag) => (
            <span key={tag} className="tech-badge" style={{ fontSize: "0.54rem" }}>{tag}</span>
          ))}
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="t-mono"
          style={{ marginTop: "0.2rem" }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.05 }}
        >
          End-to-end. Production-grade. No shortcuts.
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="no-print"
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.3 }}
        style={{
          position: "absolute", bottom: "clamp(1.2rem, 3vh, 2rem)",
          left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", zIndex: 2,
        }}
      >
        <svg width="14" height="22" viewBox="0 0 14 22" fill="none"
          style={{ animation: "bounce 2.2s ease-in-out infinite" }} aria-hidden="true">
          <path d="M7 3L7 19M7 19L2 13M7 19L12 13" stroke="rgba(11,12,16,0.3)"
            strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  );
}
