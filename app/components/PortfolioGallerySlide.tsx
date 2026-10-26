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
  {
    number: "20",
    title: "Digital Health Platform",
    category: "HealthTech · Wellbeing",
    stack: "Web App · iOS · Android",
    tags: ["Health Score", "Daily Plans", "Video Sessions"],
  },
  {
    number: "21",
    title: "Vape Local",
    category: "E-Commerce · Retail",
    stack: "Web Storefront · Trade & Retail",
    tags: ["Brand Merchandising", "Deals & Bundles", "Fast Fulfilment"],
  },
];

/* ─────────────────────────────────────────────────────────────
   Grid layout — one table drives both the column count at each
   breakpoint and where the disclaimer goes:
     · the last row has ≥ 2 empty slots → a disclaimer card spans them
     · the last row is full, or has 1 slot → a note below the grid
   Emitted as plain media-query CSS (not React state), so the PDF
   export's fixed 1380px clone re-evaluates it like any other rule.
   Widths match the deck's breakpoints in globals.css.
───────────────────────────────────────────────────────────── */
const LAYOUT: { cols: number; max?: number }[] = [
  { cols: 6 },               // > 1350px
  { cols: 5, max: 1350 },
  { cols: 4, max: 1150 },
  { cols: 2, max: 960 },
  { cols: 1, max: 700 },
];

function layoutCss(count: number) {
  return LAYOUT.map(({ cols, max }) => {
    const empty = (cols - (count % cols)) % cols;
    const asCard = empty >= 2;
    const rules = `
      #slide-portfolio .portfolio-grid { grid-template-columns: repeat(${cols}, 1fr); }
      #slide-portfolio .disclaimer-card { display: ${asCard ? "flex" : "none"}; grid-column: span ${asCard ? empty : 1}; }
      #slide-portfolio .disclaimer-note { display: ${asCard ? "none" : "flex"}; }`;
    return max ? `@media screen and (max-width: ${max}px) {${rules}\n}` : rules;
  }).join("\n");
}

const DISCLAIMER =
  "The projects and case studies featured here represent a selected portfolio of Origin One Labs\u2019 work. We have successfully delivered 50+ projects across diverse industries; however, many engagements are protected by confidentiality agreements and cannot be publicly disclosed.";

function InfoIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--stem)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} aria-hidden="true">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  );
}

export default function PortfolioGallerySlide() {
  const { goTo } = useDeck();

  return (
    <SlideWrapper id="slide-portfolio" bgImage="/light/sleek_dark_bg.jpg" overlay="rgba(246,245,240,0.86)">
      <style>{layoutCss(projects.length)}</style>

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

      {/* Project grid — columns and disclaimer placement come from LAYOUT */}
      <div className="portfolio-grid" style={{
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

        {/* Disclaimer — card spanning the last row's empty slots */}
        <motion.div variants={itemVariants} className="portfolio-card disclaimer-card">
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <InfoIcon />
            <h3 style={{
              fontFamily: "var(--f-display)", fontWeight: 600,
              fontSize: "clamp(0.72rem, 1vw, 0.88rem)",
              color: "var(--tx-1)", letterSpacing: "-0.01em", lineHeight: 1.25,
            }}>
              Disclaimer
            </h3>
          </div>
          <p style={{
            fontFamily: "var(--f-body)", fontSize: "clamp(0.56rem, 0.74vw, 0.7rem)",
            color: "var(--tx-2)", lineHeight: 1.45,
          }}>
            {DISCLAIMER}
          </p>
        </motion.div>
      </div>

      {/* Disclaimer — note below the grid when the last row is full */}
      <motion.p variants={itemVariants} className="disclaimer-note">
        <InfoIcon size={12} />
        <span><strong>Disclaimer:</strong> {DISCLAIMER}</span>
      </motion.p>
    </SlideWrapper>
  );
}
