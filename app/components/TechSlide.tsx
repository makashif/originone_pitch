"use client";

import { motion } from "framer-motion";
import SlideWrapper, { itemVariants } from "./SlideWrapper";
import {
  Smartphone,
  Globe,
  Server,
  Terminal,
  Blocks,
  Brain,
  Link,
  Database,
  Flame,
  Cloud,
  Box,
  Network,
  Code2
} from "lucide-react";

const techStack = [
  { name: "React Native", category: "Mobile", icon: Smartphone },
  { name: "Flutter", category: "Mobile", icon: Smartphone },
  { name: "Swift", category: "iOS", icon: Smartphone },
  { name: "Kotlin", category: "Android", icon: Smartphone },
  { name: "Next.js", category: "Web", icon: Globe },
  { name: "Node.js", category: "Backend", icon: Server },
  { name: "Python", category: "AI / Backend", icon: Terminal },
  { name: "Solidity", category: "Web3", icon: Code2 },
  { name: "OpenAI API", category: "AI", icon: Brain },
  { name: "LangChain", category: "AI", icon: Link },
  { name: "PostgreSQL", category: "Database", icon: Database },
  { name: "Firebase", category: "Platform", icon: Flame },
  { name: "AWS", category: "Cloud", icon: Cloud },
  { name: "GCP", category: "Cloud", icon: Cloud },
  { name: "Docker", category: "DevOps", icon: Box },
  { name: "Supabase", category: "Database", icon: Database },
  { name: "Ethereum", category: "Web3", icon: Blocks },
  { name: "GraphQL", category: "API", icon: Network },
];

const capabilities = [
  {
    title: "Mobile-First Development",
    desc: "React Native, Flutter, Swift, Kotlin — cross-platform and native mobile apps built to App Store and Play Store standard.",
  },
  {
    title: "AI Engineering",
    desc: "LLM orchestration, RAG systems, AI agents, and intelligent automation deployed at production scale.",
  },
  {
    title: "Web3 & Blockchain",
    desc: "Smart contracts, DeFi protocols, NFT systems, and on-chain infrastructure — audited and battle-tested.",
  },
  {
    title: "Cloud & DevOps",
    desc: "Auto-scaling infrastructure, CI/CD pipelines, containerization, and zero-downtime deployment on AWS and GCP.",
  },
];

export default function TechSlide() {
  return (
    <SlideWrapper id="slide-tech" bgImage="/light/tech_bg.jpg" overlay="rgba(246,245,240,0.84)">
      <div className="stack stack-md">

        {/* Header */}
        <div className="stack stack-xs">
          <motion.p className="t-label eyebrow" variants={itemVariants}>
            04 / Technology Stack
          </motion.p>
          <motion.h2 className="t-h2" variants={itemVariants} style={{ maxWidth: "620px" }}>
            Engineering Across<br />
            <span className="t-dim">Every Layer.</span>
          </motion.h2>
        </div>

        <div className="grid-2" style={{ gap: "clamp(1.5rem, 4vw, 5rem)" }}>

          {/* Left: Capability cards */}
          <div className="stack" style={{ gap: "1px", background: "var(--border)" }}>
            {capabilities.map((cap, i) => (
              <motion.div key={i} variants={itemVariants} className="card stack stack-xs">
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                  <span className="t-mono" style={{ color: "var(--accent)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="rule-stem" style={{ flex: 1, height: "1px" }} />
                </div>
                <h3 className="t-h4">{cap.title}</h3>
                <p className="t-sm">{cap.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Right: Tech stack grid */}
          <div className="stack stack-sm" style={{ justifyContent: "flex-end" }}>
            <motion.p className="t-label" variants={itemVariants} style={{ marginBottom: "0.4rem" }}>
              Tools & Technologies
            </motion.p>
            <motion.div variants={itemVariants} className="tech-grid">
              {techStack.map((tech, i) => (
                <motion.div key={i} className="tech-pill"
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.6rem",
                    padding: "0.55rem 0.75rem",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}>
                  {tech.icon && <tech.icon size={18} strokeWidth={1.5} style={{ color: "var(--tx-2)" }} />}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.1rem" }}>
                    <span style={{
                      fontFamily: "var(--f-body)", fontSize: "0.7rem",
                      fontWeight: 500, color: "var(--tx-1)",
                    }}>
                      {tech.name}
                    </span>
                    <span className="t-mono" style={{ color: "var(--tx-4)", fontSize: "0.45rem" }}>
                      {tech.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </SlideWrapper>
  );
}
