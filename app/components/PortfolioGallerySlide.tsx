"use client";

import { motion } from "framer-motion";
import SlideWrapper, { itemVariants } from "./SlideWrapper";
import { useDeck } from "./PresentationShell";

interface Project {
  number: string;
  title: string;
  category: string;
  stack: string;
  tags: string[];
}

const projects: Project[] = [
  {
    number: "01",
    title: "Fuutura Wallet",
    category: "Web3 · DeFi · Fintech",
    stack: "React.js · Ethers.js · Viem · Node.js · AWS",
    tags: ["Non-Custodial", "Multi-Chain", "Cross-Chain Swaps"],
  },
  {
    number: "02",
    title: "Fuutura Trade",
    category: "Trading · Web3 · Fintech",
    stack: "React.js · TypeScript · Zustand · WebSocket · AWS",
    tags: ["Hybrid Web2/Web3", "Real-Time Orders", "MetaMask"],
  },
  {
    number: "03",
    title: "Fuutura Extension",
    category: "Browser Extension · Web3",
    stack: "Next.js · Wagmi · Viem · MongoDB · AWS",
    tags: ["Non-Custodial", "Browser-Native", "Multi-Chain"],
  },
  {
    number: "04",
    title: "Fuutura KYC",
    category: "AI · Blockchain · Identity",
    stack: "iOS · Python · LLaMA · React.js · Polygon · AWS",
    tags: ["AI Verification", "On-Chain Identity", "B2B SDK"],
  },
  {
    number: "05",
    title: "Fuutura Chat",
    category: "Communication · Security",
    stack: "React Native · Next.js · Node.js · WebRTC",
    tags: ["E2E Encryption", "Server-Blind", "Voice & Video"],
  },
  {
    number: "06",
    title: "Fuutura VPN",
    category: "Security · Infrastructure",
    stack: "C++ · Next.js · Node.js · AWS",
    tags: ["Global Network", "Zero-Log", "Threat Prevention"],
  },
  {
    number: "07",
    title: "Origin One Labs HRMS",
    category: "SaaS · Enterprise · HR Tech",
    stack: "Next.js · Node.js · PostgreSQL · AI · AWS",
    tags: ["Unified Lifecycle", "Work & Performance", "Industry-Agnostic"],
  },
  {
    number: "08",
    title: "Digital24",
    category: "SaaS · PR Distribution",
    stack: "Next.js · PostgreSQL · Stripe · Sanity · AWS",
    tags: ["PR Campaigns", "Multi-Channel", "CMS-Powered"],
  },
  {
    number: "09",
    title: "Intelizzz",
    category: "IoT · Enterprise · Mobile",
    stack: "React Native · Node.js · Kafka · MongoDB · Kubernetes",
    tags: ["6 Modules", "12 Microservices", "Real-Time Tracking"],
  },
  {
    number: "10",
    title: "Toybox",
    category: "Luxury Automotive · iOS · Web",
    stack: "Swift (iOS) · Next.js · Node.js · AWS",
    tags: ["AI Concierge", "4 Surfaces", "Native iOS"],
  },
  {
    number: "11",
    title: "Clinic Management Platform",
    category: "HealthTech · Veterinary",
    stack: "Next.js · Node.js · PostgreSQL",
    tags: ["Clinical Records", "Patient Lifecycle", "Care Operations"],
  },
  {
    number: "12",
    title: "Manufacturing & Production Management Platform",
    category: "Enterprise SaaS · B2B",
    stack: "Next.js · Node.js · PostgreSQL · AWS",
    tags: ["Workflow Automation", "Resource Management", "Business Analytics"],
  },
  {
    number: "13",
    title: "Community & Social Commerce Platform",
    category: "Real Estate · Marketplace",
    stack: "Next.js · Node.js · PostgreSQL",
    tags: ["Property Listings", "Asset Management", "Capital Advisory"],
  },
  {
    number: "14",
    title: "Logistics & Dispatch",
    category: "Logistics · Fleet Management",
    stack: "Next.js · Node.js · PostgreSQL · AWS",
    tags: ["Fleet Control", "Trip Management", "Performance Analytics"],
  },
  {
    number: "15",
    title: "Creative Community",
    category: "Social Media · Media",
    stack: "Next.js · Node.js · AWS",
    tags: ["Community Hubs", "Audio Streaming", "P2P Marketplace"],
  },
  {
    number: "16",
    title: "Payment & Credit Services Platform",
    category: "FinTech · Lending",
    stack: "Next.js · Node.js · AWS",
    tags: ["Credit Pipeline", "Lender Matching", "Financial Literacy"],
  },
  {
    number: "17",
    title: "Ads & Payment",
    category: "AdTech · FinTech",
    stack: "Next.js · Node.js · PostgreSQL",
    tags: ["Ad Management", "Payment Gateways", "Revenue Analytics"],
  },
  {
    number: "18",
    title: "E-commerce & Retail Management Platform",
    category: "E-Commerce · Retail",
    stack: "Next.js · Node.js · PostgreSQL",
    tags: ["Multi-Vendor", "Catalog Management", "Order Pipeline"],
  },
  {
    number: "19",
    title: "Real Estate Discovery & Investment Platform",
    category: "SaaS · CRM",
    stack: "Next.js · Node.js · PostgreSQL",
    tags: ["Sales Pipeline", "Workflow Automation", "Analytics"],
  },
];

export default function PortfolioGallerySlide() {
  const { goTo } = useDeck();

  return (
    <SlideWrapper id="slide-portfolio" bgImage="/light/sleek_dark_bg.jpg" overlay="rgba(246,245,240,0.86)">
      {/* Header */}
      <div className="stack stack-xs" style={{ marginBottom: "clamp(0.5rem, 1vh, 1rem)" }}>
        <motion.p className="t-label eyebrow" variants={itemVariants}>
          05 / Our Track Record
        </motion.p>
        <motion.h2 className="t-h2" variants={itemVariants} style={{ maxWidth: "900px" }}>
          Multiple projects delivered.<br />
          <span className="t-dim">Engineered for scale.</span>
        </motion.h2>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-start", margin: "clamp(0.5rem, 2.2vh, 1.5rem) 0" }}>
        <motion.p className="t-body" variants={itemVariants}
          style={{ maxWidth: "900px" }}>
          Below are some of our featured work from multiple successfully delivered projects. From Web3 infrastructure to AI ecosystems, we architect and deploy battle-tested technology that powers global businesses.
        </motion.p>
      </div>

      {/* Project grid — 4 cols × 2 rows, with disclaimer on 3rd row */}
      <div className="grid-5" style={{
        background: "transparent",
        gap: "clamp(0.2rem, 0.4vw, 0.75rem)",
      }}>
        {projects.map((project, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            onClick={() => goTo(5 + i)}
            className="portfolio-card"
          >
            {/* Number + category */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{
                fontFamily: "var(--f-mono)", fontSize: "0.5rem",
                letterSpacing: "0.12em", color: "var(--accent)",
              }}>
                {project.number}
              </span>
              <span style={{
                fontFamily: "var(--f-mono)", fontSize: "0.48rem",
                letterSpacing: "0.1em", color: "var(--tx-4)",
                textTransform: "uppercase",
              }}>
                {project.category.split(" · ")[0]}
              </span>
            </div>

            {/* Title */}
            <h3 style={{
              fontFamily: "var(--f-display)", fontWeight: 600,
              fontSize: "clamp(0.72rem, 1vw, 0.88rem)",
              color: "var(--tx-1)", letterSpacing: "-0.01em", lineHeight: 1.25,
            }}>
              {project.title}
            </h3>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
              {project.tags.map((tag, j) => (
                <span key={j} style={{
                  fontFamily: "var(--f-mono)", fontSize: "0.46rem",
                  letterSpacing: "0.06em", color: "var(--tx-3)",
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  padding: "0.12rem 0.4rem", borderRadius: "2px",
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Stack */}
            <p style={{
              fontFamily: "var(--f-mono)", fontSize: "0.45rem",
              color: "var(--tx-4)", letterSpacing: "0.05em",
              lineHeight: 1.5, marginTop: "auto",
              borderTop: "1px solid var(--border)", paddingTop: "0.4rem",
            }}>
              {project.stack}
            </p>
          </motion.div>
        ))}

        {/* Disclaimer Card (Spans the 3rd row) */}
        <motion.div
          variants={itemVariants}
          className="portfolio-card"
          style={{
            // gridColumn: "1 / -1",
            background: "linear-gradient(135deg, rgb(var(--stem-bright-rgb) / 0.12) 0%, rgb(var(--ivory-rgb) / 0.6) 100%)",
            border: "1px solid var(--accent-line)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: "clamp(0.5rem, 0.4vw, 1.5rem)",
            opacity: 1
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--stem)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "0.4rem" }}>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <h3 style={{
              fontFamily: "var(--f-display)", fontWeight: 600,
              fontSize: "clamp(0.72rem, 1vw, 0.88rem)",
              color: "var(--tx-1)", letterSpacing: "-0.01em", lineHeight: 1.25,
            }}>
              Disclaimer
            </h3>
          </div>

          <p style={{
            fontFamily: "var(--f-body)", fontSize: "clamp(0.52rem, 0.7vw, 0.65rem)",
            color: "var(--tx-2)", lineHeight: 1.2
          }}>
            The projects and case studies featured on this website represent a selected portfolio of Origin One Labs&apos; work. We have successfully delivered 50+ projects across diverse industries; however, many engagements are protected by confidentiality agreements and cannot be publicly disclosed.
          </p>
        </motion.div>
      </div>
    </SlideWrapper>
  );
}
