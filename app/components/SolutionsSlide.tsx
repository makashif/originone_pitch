"use client";

import { motion } from "framer-motion";
import SlideWrapper, { itemVariants } from "./SlideWrapper";
import { Bot, AppWindow, Building2, CreditCard, Cloud, Database, ShieldCheck, Compass } from "lucide-react";

const services = [
  {
    label: "01",
    title: "AI Systems & Automation",
    desc: "Intelligent systems, AI agents, enterprise AI assistants, and machine learning solutions.",
    icon: <Bot size={24} strokeWidth={1.2} style={{ color: "var(--accent)" }} />,
  },
  {
    label: "02",
    title: "Custom Software",
    desc: "Web platforms, mobile applications, SaaS products, and customer-facing applications.",
    icon: <AppWindow size={24} strokeWidth={1.2} style={{ color: "var(--accent)" }} />,
  },
  {
    label: "03",
    title: "Enterprise Systems",
    desc: "ERP platforms, workflow automation, operational dashboards, and internal tools.",
    icon: <Building2 size={24} strokeWidth={1.2} style={{ color: "var(--accent)" }} />,
  },
  {
    label: "04",
    title: "Fintech Solutions",
    desc: "Payment systems, financial APIs, transaction platforms, and secure financial products.",
    icon: <CreditCard size={24} strokeWidth={1.2} style={{ color: "var(--accent)" }} />,
  },
  {
    label: "05",
    title: "Cloud & Infrastructure",
    desc: "AWS, Azure, GCP, DevOps, Kubernetes, infrastructure automation, and cloud optimization.",
    icon: <Cloud size={24} strokeWidth={1.2} style={{ color: "var(--accent)" }} />,
  },
  {
    label: "06",
    title: "Data & Intelligence",
    desc: "Analytics platforms, reporting systems, business intelligence, and data pipelines.",
    icon: <Database size={24} strokeWidth={1.2} style={{ color: "var(--accent)" }} />,
  },
  {
    label: "07",
    title: "Security & Compliance",
    desc: "Application security, access management, compliance readiness, and security reviews.",
    icon: <ShieldCheck size={24} strokeWidth={1.2} style={{ color: "var(--accent)" }} />,
  },
  {
    label: "08",
    title: "Technology Consulting",
    desc: "Architecture planning, technical strategy, digital transformation, and CTO advisory.",
    icon: <Compass size={24} strokeWidth={1.2} style={{ color: "var(--accent)" }} />,
  },
];

const process = [
  "Discovery & Strategy",
  "Architecture & Planning",
  "Design & Development",
  "Testing & Validation",
  "Deployment & Launch",
  "Support & Growth",
];

export default function SolutionsSlide() {
  return (
    <SlideWrapper
      id="slide-solutions"
      bgImage="/solutions_bg.png"
      overlay="rgba(7,7,7,0.8)"
    >
      {/* Header */}
      <div className="stack stack-xs" style={{ marginBottom: "clamp(0.5rem, 1vh, 1rem)" }}>
        <motion.p className="t-label" variants={itemVariants}>
          03 / What We Do
        </motion.p>
        <motion.h2 className="t-h2" variants={itemVariants} style={{ maxWidth: "620px", fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
          Everything You Need<br />
          <span style={{ color: "rgba(242,242,242,0.28)" }}>to Build and Scale.</span>
        </motion.h2>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-start", margin: "clamp(0.5rem, 2.5vh, 1.5rem) 0" }}>
        <motion.p className="t-body" variants={itemVariants}
          style={{ maxWidth: "360px" }}>
          From concept to production. We design, develop, and scale digital solutions that solve real business challenges.
        </motion.p>
      </div>

      {/* 8 Pillar cards */}
      <div className="grid-4" style={{ border: "1px solid var(--border)", borderRadius: "4px", overflow: "hidden" }}>
        {services.map((service, i) => (
          <motion.div key={i} variants={itemVariants} className="card stack stack-xs">

            {/* Icon + number */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.2rem" }}>
              {service.icon}
              <span className="t-mono" style={{ color: "var(--tx-4)" }}>{service.label}</span>
            </div>

            {/* Title + desc */}
            <div className="stack" style={{ gap: "0.25rem" }}>
              <h3 className="t-h4" style={{ fontSize: "0.85rem" }}>{service.title}</h3>
              <p className="t-sm" style={{ lineHeight: 1.5, fontSize: "0.68rem" }}>{service.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Process strip */}
      <motion.div variants={itemVariants} className="process-strip"
        style={{
          display: "grid", marginTop: "clamp(0.4rem, 1.8vh, 1rem)",
          background: "var(--border)", gap: "1px", overflow: "hidden", borderRadius: "4px"
        }}>
        {process.map((step, i) => (
          <div key={i} style={{
            background: "var(--surface)",
            padding: "0.5rem 0.6rem",
            display: "flex", alignItems: "center", gap: "0.4rem",
          }}>
            <span className="t-mono" style={{ color: "var(--accent)", opacity: 0.45, flexShrink: 0, fontSize: "0.55rem" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="t-sm" style={{ color: "var(--tx-2)", fontSize: "0.55rem", lineHeight: 1.2 }}>{step}</span>
          </div>
        ))}
      </motion.div>
    </SlideWrapper>
  );
}
