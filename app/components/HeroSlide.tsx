"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import BrandMark from "./BrandMark";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

/* Cover — Company Profile.
   Hierarchy follows the brand kit's stacked lockup: the mark and the
   ORIGIN ONE LABS wordmark lead, then the document title, then the
   tagline and positioning line. Corner meta frames it like a printed
   corporate cover. */
export default function HeroSlide() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const show = (delay: number, y = 14) => ({
    initial: { opacity: 0, y },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.85, delay, ease },
  });

  return (
    <section
      ref={ref}
      id="slide-hero"
      className="slide cover"
      style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}
    >
      {/* Background — the embossed mark render, washed toward Ivory */}
      <div
        className="slide-bg"
        style={{ backgroundImage: "url('/light/hero_corporate_bg.jpg')", backgroundPosition: "center 30%" }}
      />
      <div
        className="slide-overlay"
        style={{ background: "radial-gradient(ellipse 70% 62% at 50% 50%, rgba(246,245,240,0.9) 0%, rgba(246,245,240,0.72) 60%, rgba(246,245,240,0.5) 100%)" }}
      />

      {/* ── Corner meta: document header / footer ── */}
      <motion.div className="cover-meta cover-meta-top" {...show(0.1, 0)}>
        <span>Company Profile</span>
        <span className="cover-meta-rule" />
        <span>Edition 2026</span>
      </motion.div>
      <motion.div className="cover-meta cover-meta-bottom" {...show(1.1, 0)}>
        <span>originonelabs.com</span>
        <span className="cover-meta-rule" />
        <span>hello@originonelabs.com</span>
      </motion.div>

      {/* ── Content ── */}
      <div className="slide-content cover-content">

        {/* Logo lockup — stacked, as in the brand kit */}
        <motion.div
          className="cover-mark"
          initial={{ opacity: 0, scale: 0.86 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <BrandMark height="100%" />
        </motion.div>

        <motion.h1 className="cover-wordmark" {...show(0.35, 18)}>
          ORIGIN ONE LABS
        </motion.h1>

        <motion.span
          className="cover-rule"
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.55, ease }}
        />

        {/* Document title */}
        <motion.p className="cover-title" {...show(0.65)}>
          Company Profile
        </motion.p>

        {/* Tagline */}
        <motion.p className="cover-tagline" {...show(0.78)}>
          Build What <span className="t-dim">Matters.</span>
        </motion.p>

        {/* Positioning */}
        <motion.p className="t-body cover-lede" {...show(0.9)}>
          An AI-native technology and engineering partner — designing, building,
          and scaling intelligent digital systems for modern businesses.
        </motion.p>

        {/* Capability pills */}
        <motion.div className="cover-pills" {...show(1.0, 0)}>
          {["AI Systems", "Web & Mobile", "Web3", "Enterprise", "Cloud"].map((tag) => (
            <span key={tag} className="tech-badge">{tag}</span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="no-print cover-scroll"
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.4 }}
      >
        <svg width="14" height="22" viewBox="0 0 14 22" fill="none"
          style={{ animation: "bounce 2.2s ease-in-out infinite" }} aria-hidden="true">
          <path d="M7 3L7 19M7 19L2 13M7 19L12 13" stroke="var(--stem)"
            strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  );
}
