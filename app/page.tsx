import PresentationShell from "./components/PresentationShell";
import NavDots from "./components/NavDots";
import HeroSlide from "./components/HeroSlide";
import AboutSlide from "./components/AboutSlide";
import SolutionsSlide from "./components/SolutionsSlide";
import TechSlide from "./components/TechSlide";
import PortfolioGallerySlide from "./components/PortfolioGallerySlide";
import ProjectSlide from "./components/ProjectSlide";
import WhyChooseSlide from "./components/WhyChooseSlide";
import ConnectSlide from "./components/ConnectSlide";

/* ─────────────────────────────────────────────────────────────
   PROJECT DATA — All 7 Real Delivered Projects
───────────────────────────────────────────────────────────── */

// ── Project 01 — Fuutura Wallet ──
const p1Features = [
  { title: "Multi-Chain Asset Management", desc: "Full EVM, Bitcoin, Solana & Tron support — manage assets across all major blockchain ecosystems from a single unified interface." },
  { title: "Cross-Chain Token Swaps", desc: "Native cross-chain swap functionality with deep integration into the Fuutura Trade for a seamless trading experience." },
  { title: "Non-Custodial Security Architecture", desc: "Enterprise-grade, fully non-custodial design. Users retain complete, sovereign ownership of keys and assets at all times." },
  { title: "Real-Time Portfolio Visibility", desc: "Live portfolio tracking with high-performance transaction monitoring, wallet management, and full transaction history." },
];

// ── Project 02 — Fuutura Trade ──
const p2Features = [
  { title: "Hybrid Authentication System", desc: "Dual login supporting email/password (Web2) and wallet-based login (Web3) via MetaMask & WalletConnect — one unified platform." },
  { title: "Real-Time Order Management", desc: "WebSocket-powered market data feeds with market, limit, stop-loss, and take-profit order types executed in real time." },
  { title: "Advanced Portfolio Tracking", desc: "Portfolio, position, and watchlist management with backend-driven feature flagging and zero-downtime mode switching." },
  { title: "Modular State Architecture", desc: "Zustand-powered scalable state management with full Fuutura Wallet ecosystem integration and dynamic version control." },
];

// ── Project 03 — Fuutura Extension ──
const p3Features = [
  { title: "Non-Custodial Key Management", desc: "Institutional-grade private key management — users retain complete ownership, with secure transaction signing and approval flows." },
  { title: "Browser-Native Wallet Experience", desc: "Smooth, intuitive UX modeled on industry-leading wallet standards. Feels native to the browser, not bolted-on." },
  { title: "Full Fuutura Ecosystem Integration", desc: "Seamless connectivity with Fuutura Trade and Wallet — full feature parity across the entire Fuutura product suite." },
  { title: "Multi-Chain EVM Support", desc: "Complete multi-chain support across EVM networks with cross-platform compatibility and performance optimisation." },
];

// ── Project 04 — Fuutura KYC ──
const p4Features = [
  { title: "AI-Powered Document Verification", desc: "LLaMA-driven document detection and identity verification with a guided mobile flow — fast, accurate, and user-friendly." },
  { title: "On-Chain Digital Identity", desc: "Verified users receive blockchain-backed digital identities on Polygon with token-based verification incentives." },
  { title: "Embeddable B2B SDK", desc: "Plug-and-play SDK for third-party businesses to integrate KYC natively, paired with a full enterprise management dashboard." },
  { title: "Multi-Surface Ecosystem", desc: "Consumer mobile app, embeddable SDK, and B2B web dashboard — a complete KYC platform from a single integrated build." },
];

// ── Project 4b — Fuutura Chat ──
const pChatFeatures = [
  { title: "End-to-End Encrypted Messaging", desc: "A modern, platform-agnostic messenger foundation connecting 1:1 chat, group conversations, and encrypted attachments with offline delivery and automatic sync when users come back online." },
  { title: "Server-Blind by Design", desc: "The backend routes ciphertext only. Messages, files, and call signaling stay encrypted on device — giving you private chat without relying on the server to read or store plaintext." },
  { title: "Connected Communication Lifecycle", desc: "Seamless flow from phone OTP login and contact discovery into profiles, statuses, chat history, and call records — keeping identity, presence, and conversation context in one messenger experience." },
  { title: "Production-Ready Messenger Features", desc: "Built for real-world chat apps — voice and video calls, push notifications, group management, user profiles, story-style statuses, and call history across iOS, Android, and self-hosted backend." },
];

// ── Project 4c — Fuutura VPN ──
const pVpnFeatures = [
  { title: "Global VPN Infrastructure", desc: "Distributed server infrastructure across multiple regions and locations, enabling users to establish fast, encrypted connections with intelligent server selection, load balancing, and automatic failover." },
  { title: "Security & Privacy Engine", desc: "Advanced encryption, secure tunneling protocols, DNS protection, kill-switch functionality, IP masking, and threat-prevention controls designed to protect user traffic, identity, and sensitive information." },
  { title: "User, Device & Access Management", desc: "Centralized management of accounts, subscriptions, connected devices, teams, and access policies. Role-based controls and configurable permissions enable both individual and enterprise VPN deployments." },
  { title: "Subscription, Billing & Analytics", desc: "Integrated subscription management with multiple plans, payment gateways, recurring billing, usage monitoring, and administrative analytics — providing complete visibility into customers, infrastructure performance, revenue, and service utilization." },
];


// ── Project 05 — Origin One Labs HRMS ──
const p5Features = [
  { title: "Unified HR & Work Management", desc: "A modern, industry-agnostic HRMS connecting employee administration, payroll, and leave with task and performance tracking." },
  { title: "Actionable Performance Data", desc: "Move beyond subjective reviews. Performance is tied directly to a real record of assigned tasks, completed projects, and actual outcomes." },
  { title: "Connected Talent Lifecycle", desc: "Seamless workflow from recruitment and candidate tracking directly into the employee record, ongoing learning, and career history." },
  { title: "Configurable Operations", desc: "Built for diverse working environments — effortlessly supporting office employees, field teams, and shift workers across any industry." },
];

// ── Project 06 — Digital24 ──
const p6Features = [
  { title: "Multi-Channel Campaign Builder", desc: "Flexible campaign creation with guaranteed placements, newswire, SEO guest posting, and journalist outreach targeting." },
  { title: "Stripe & In-Platform Wallet", desc: "Cart and checkout supporting Stripe card payments and wallet balance, with bulk credit pack purchasing and deferred application." },
  { title: "Role-Based Admin Dashboard", desc: "Full admin panel for user, campaign, offer, and reporting management — powering internal fulfilment operations end-to-end." },
  { title: "CMS-Driven Public Platform", desc: "Sanity-powered public site with pricing, bundles, case studies, and help centre — built for discovery and conversion." },
];

// ── Project 07 — Intelizzz ──
const p7Features = [
  { title: "Real-Time Vehicle Tracking", desc: "Live SSE data streams powering real-time GPS tracking with geofence engine supporting circle, polygon, and rectangle zones." },
  { title: "Event-Driven Microservices", desc: "12 dedicated Node.js/Koa services on a Kafka pipeline handling device events, wake history, and tracking data at scale." },
  { title: "Offline-First PWA", desc: "Installer PWA with IndexedDB and Workbox service worker — full functionality without connectivity, perfect sync on restore." },
  { title: "Multi-Role Platform", desc: "Consumer, installer, operations, and recovery agent roles across 6 integrated modules with Kubernetes-orchestrated infrastructure." },
];

// ── Project 08 — Toybox ──
const p8Features = [
  { title: "Native iOS Member App", desc: "Swift-built iOS app with garage management, concierge booking, vehicle services, and an integrated AI assistant." },
  { title: "AI-Powered Concierge", desc: "Intelligent concierge assistant enabling members to book detailing, wash, transport, and vehicle acquisition with ease." },
  { title: "Staff & Admin Web Applications", desc: "Dedicated Next.js staff and admin surfaces for full operational management — scheduling, reporting, and member oversight." },
  { title: "Role-Based Access Across 4 Surfaces", desc: "Member app, staff web app, admin dashboard, and member portal — all unified with role-based access and consistent data." },
];

// ── Project 09 — Health & Care Platform ──
const p9Features = [
  { title: "Unified Clinical & Care Management", desc: "A modern, industry-agnostic health and care platform connecting patient records, outpatient visits, prescriptions, and lab work with vaccination, grooming, and hospitalization tracking — all in one connected workflow." },
  { title: "Actionable Clinical Data", desc: "Move beyond scattered notes and paper files. Every consultation, diagnosis, lab result, imaging report, and prescription is tied directly to a real record of assigned care, completed treatments, and measurable outcomes over time." },
  { title: "Connected Patient Lifecycle", desc: "Seamless workflow from front-desk intake and OPD case management directly into longitudinal medical history — vaccinations, deworming, surgery, radiology, and ongoing follow-up care across the pet’s full life at the clinic." },
  { title: "Configurable Care Operations", desc: "Built for diverse care environments — effortlessly supporting busy outpatient clinics, in-house laboratories, imaging departments, and multi-staff teams across reception, veterinary, and admin roles in any health and care setting." },
];

// ── Project 10 — SAAP ──
const p10Features = [
  { title: "Data & Resource Management", desc: "Real-time management of business data, resources, records, statuses, and operational activity. Centralized controls provide accurate visibility while reducing duplication, errors, and information gaps." },
  { title: "Configurable Workflow Automation", desc: "Flexible multi-stage workflows for managing complex business processes from initiation through completion. Automated status tracking, approvals, notifications, performance monitoring, and bottleneck identification keep operations moving efficiently." },
  { title: "Users, Teams & Partner Management", desc: "Centralized management of users, departments, customers, vendors, and external partners. Role-based access, assignments, activity tracking, and performance visibility enable secure collaboration across the organization." },
  { title: "Analytics, Reporting & Business Controls", desc: "Integrated dashboards, financial and operational tracking, audit trails, and configurable reporting. Accurate data aggregation with PDF and CSV exports supports better decision-making, compliance, and enterprise-level reporting." },
];

// ── Project 11 — Marketplace Platform ──
const p11Features = [
  { title: "Asset Management & Property Listings", desc: "Real-time indexing of residential and commercial properties, off-plan developments, and key geographic areas with advanced filtering, floor plans, and developer profiles." },
  { title: "End-to-End Asset Management", desc: "Comprehensive portfolio oversight covering tenant lifecycle workflows, rental collection tracking, property maintenance requests, and regulatory compliance monitoring." },
  { title: "Investment & Capital Advisory", desc: "Integrated financial planning tools for portfolio optimization, yield forecasting, capital management, and structured property financing solutions." },
  { title: "Brokerage & Insurance Services", desc: "Streamlined client inquiry pipelines, interactive consultation scheduling, and tailored insurance support designed to protect real estate assets." },
];

// ── Project 12 — Logistics & Dispatch Platform ──
const p12Features = [
  { title: "Real-Time Fleet & Dispatch Control", desc: "Centralized tracking of active transit routes, daily trip loads, and vehicle availability. Automated assignment workflows to maximize driver capacity and minimize dispatch downtime." },
  { title: "Operational Trip & Freight Management", desc: "End-to-end monitoring of individual transit legs—from origin dispatch to final drop-off—with live status updates, route optimization, and operational status logs." },
  { title: "Directory & Asset Management", desc: "Centralized registry for driver profiles, transport vehicles, carrier partners, and client directories to streamline compliance, contact mapping, and fleet assignments." },
  { title: "Performance & Financial Analytics", desc: "Real-time dashboard metrics tracking total trip volumes, daily/monthly revenue trends, operational expenditures, and exportable reporting for executive fleet oversight." },
];

// ── Project 13 — Creative Community & Media Platform ──
const p13Features = [
  { title: "Social Media Platform", desc: "Interactive content feeds enabling users to share media updates, engage via likes and comments, build personalized creator profiles, and discover tailored recommendations across the network." },
  { title: "Community Hubs", desc: "Dedicated spaces and interest-based groups allowing creators to connect, foster discussions, collaborate on specialized topics, and cultivate niche digital communities." },
  { title: "Peer-to-Peer Marketplace", desc: "Integrated commerce system enabling creators and members to list, browse, sell, and exchange gear, digital assets, and specialized products directly within the ecosystem." },
  { title: "Podcast & Audio Streaming", desc: "Embedded media hub designed for streaming long-form audio discussions, expert interviews, and featured series, seamlessly bridging community discussions with audio content." },
];

// ── Project 14 — FinTech Platform ──
const p14Features = [
  { title: "Multi-Lender Aggregation Engine", desc: "Single-application submission flow that routes credit requests to multiple financial institutions simultaneously, fostering competitive bidding to secure optimal lending terms." },
  { title: "Automated Onboarding & Credit Pipeline", desc: "Frictionless digital profile setup and evaluation workflows designed to accelerate verification, minimize drop-offs, and expedite approval turnarounds." },
  { title: "Financial Literacy & Educational Hub", desc: "Integrated learning portal and resource center providing interactive courses, capital management guides, and knowledge bases to empower informed decision-making." },
  { title: "Secure Portal & Offer Management", desc: "Centralized dashboard allowing users to track application statuses in real time, evaluate personalized financing offers side-by-side, and connect directly with matched providers." },
];

// ── Project 15 — Multiple Payment Gateways & Advertisement Platform ──
const p15Features = [
  { title: "Advertisement Campaign Management", desc: "End-to-end campaign creation and management across digital advertising channels. Configure campaign objectives, audiences, budgets, creatives, placements, schedules, and performance targets from a centralized dashboard." },
  { title: "Multi-Gateway Payment Infrastructure", desc: "Flexible payment orchestration layer integrating multiple payment gateways, digital wallets, cards, bank transfers, and local payment methods. Intelligent routing, transaction tracking, refunds, reconciliation, and gateway-level reporting provide a seamless global payment experience." },
  { title: "Ad Placement & Distribution Engine", desc: "Centralized system for managing advertisement inventory, placements, categories, targeting rules, and distribution channels. Dynamically deliver relevant advertisements based on audience, location, campaign parameters, and available inventory." },
  { title: "Analytics, Billing & Revenue Management", desc: "Unified analytics and financial dashboard providing real-time visibility into impressions, clicks, conversions, advertising spend, payment transactions, commissions, and platform revenue. Automated billing, settlement, reconciliation, and exportable reports deliver complete financial and campaign transparency." },
];

// ── Project 16 — E-Commerce Platform ──
const p16Features = [
  { title: "Multi-Vendor Storefront Engine", desc: "Hybrid marketplace architecture supporting both platform-direct sales and independent merchant storefronts with isolated product management and order fulfillment flows." },
  { title: "Catalog & Inventory Control", desc: "Dynamic product indexing with category hierarchy, live stock status indicators, targeted promotional discounting, and rich variant attributes across consumer categories." },
  { title: "Search & Discovery Experience", desc: "Frictionless product lookup with category filtering, real-time search auto-complete, featured showcase carousels, and optimized item detail pages." },
  { title: "Cart & Order Management", desc: "Centralized cart persistence, real-time total calculations, user account authentication, and streamlined checkout pipelines designed for high conversion efficiency." },
];

// ── Project 17 — CRM Platform ──
const p17Features = [
  { title: "Leads & Sales Pipeline Management", desc: "Centralized lead and opportunity management with customizable sales stages, deal tracking, lead scoring, assignments, follow-ups, and real-time pipeline visibility from initial contact through conversion." },
  { title: "Customer & Account Management", desc: "Unified customer profiles combining contacts, organizations, communication history, documents, activities, transactions, and relationship data — providing teams with a complete 360-degree view of every customer." },
  { title: "Workflow & Communication Automation", desc: "Configurable workflows for task assignment, approvals, email communication, notifications, reminders, follow-up sequences, and sales automation — reducing manual operations while maintaining consistent customer engagement." },
  { title: "Analytics, Reporting & Integrations", desc: "Real-time dashboards covering sales performance, conversion rates, team productivity, forecasts, and customer activity. API-driven integrations with email, calendars, payment platforms, marketing tools, ERP systems, and third-party applications create a connected business ecosystem." },
];









// ── Project 18 — Digital Health Platform ──
const p18Features = [
  { title: "Composite Health Score", desc: "A single score built from energy, sleep, nutrition confidence, cycle wellbeing, and strength — reassessed through the programme, with a domain-by-domain breakdown of what moved and why." },
  { title: "Personalised Daily Plans", desc: "Protocol-driven daily focus and habit plans across nutrition, movement, and mindfulness — with check-ins, streaks, and progress tracked against each member's goals." },
  { title: "Clinician Sessions & Messaging", desc: "Video sessions with the care team built into the programme — booking, rescheduling, and joining calls alongside secure messaging, all from the member dashboard." },
  { title: "Insights & Guided Learning", desc: "Weekly insights generated from check-in data and a curated learning library matched to each member's programme, delivered consistently across web and mobile." },
];

// ── Project 19 — Vape Local ──
const p19Features = [
  { title: "Brand-Led Catalogue & Merchandising", desc: "Brand carousels, category tiles, and spotlight campaigns across disposables, pod kits, nic salts and e-liquids, nicotine pouches, and hardware." },
  { title: "Deals, Bundles & Clearance", desc: "Promotional banners, bundle pricing, trending lists, and clearance ranges that keep high-volume trade and retail buyers moving to checkout." },
  { title: "Fulfilment-Aware Shopping", desc: "Free-delivery thresholds, same-day dispatch cut-offs, and Saturday delivery messaging surfaced throughout the journey to drive order timing." },
  { title: "Accounts, Trade & Compliance", desc: "Customer accounts and trade registration, help and contact channels, VPD information, and regulatory nicotine warnings built into product presentation." },
];

/* ─────────────────────────────────────────────────────────────
   PAGE COMPOSITION — 28 Slides
   01 Hero → 02 About → 03 Solutions → 04 Tech → 05 Portfolio Overview →
   06 P1 (Fuutura Wallet) →
   07 P2 (Fuutura Trade) →
   08 P3 (Fuutura Extension) →
   09 P4 (Fuutura KYC) →
   10 P4b (Fuutura Chat) →
   11 P4c (Fuutura VPN) →
   12 P5 (Origin One Labs HRMS) →
   13 P6 (Digital24) →
   14 P7 (Intelizzz) →
   15 P8 (Toybox) →
   16 P9 (Health & Care Platform) →
   17 P10 (SAAP) →
   18 P11 (Marketplace Platform) →
   19 P12 (Logistics & Dispatch) →
   20 P13 (Creative Community) →
   21 P14 (FinTech Platform) →
   22 P15 (Ads & Payment) →
   23 P16 (E-Commerce Platform) →
   24 P17 (CRM Platform) →
   25 P18 (Digital Health Platform) →
   26 P19 (Vape Local) →
   27 Why Us → 28 Connect
───────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <PresentationShell>
      <NavDots />

      {/* ── 01 Hero ── */}
      <HeroSlide />

      {/* ── 02 About ── */}
      <AboutSlide />

      {/* ── 03 Solutions ── */}
      <SolutionsSlide />

      {/* ── 04 Tech Stack ── */}
      <TechSlide />

      {/* ── 05 Portfolio Overview ── */}
      <PortfolioGallerySlide />

      {/* ── Project 01 — Fuutura Wallet ── */}
      <ProjectSlide
        id="slide-p1"
        slideNumber="6"
        title="Fuutura Wallet"
        description="A secure, enterprise-grade non-custodial Web3 wallet bridging digital asset management and trading — enabling users to store, manage, transfer, and swap cryptocurrencies across multiple blockchain ecosystems while maintaining complete asset ownership."
        domain="Web3 · DeFi · React.js · Node.js"
        background="/light/fwallet_premium_bg.jpg"
        status="Delivered"
        features={p1Features}
        mockupType="showcase"
        showcase={{
          web: { src: "/screens/fuutura/wallet-web-dashboard.jpg", alt: "Fuutura Wallet dashboard", url: "wallet.fuutura.com" },
          front: { kind: "web", src: "/screens/fuutura/wallet-web-transactions.jpg", alt: "Fuutura Wallet transaction history", url: "wallet.fuutura.com/activity" },
        }}
      />

      {/* ── Project 02 — Fuutura Trade ── */}
      <ProjectSlide
        id="slide-p2"
        slideNumber="7"
        title="Fuutura Trade"
        description="A sophisticated full-stack hybrid trading platform bridging traditional finance and decentralized ecosystems. Built for both Web2 and Web3 users in a single unified experience, delivering institutional-grade trading with real-time performance."
        domain="Trading · React.js · Zustand · WebSocket"
        background="/light/ftrade_premium_bg.jpg"
        status="Delivered"
        features={p2Features}
        mockupType="showcase"
        showcase={{
          web: { src: "/screens/fuutura/trade-web-terminal.jpg", alt: "Fuutura Trade web terminal", url: "trade.fuutura.com" },
          front: { kind: "phone", src: "/screens/fuutura/trade-mobile.jpg", alt: "Fuutura Trade mobile app" },
        }}
      />

      {/* ── Project 03 — Fuutura Extension ── */}
      <ProjectSlide
        id="slide-p3"
        slideNumber="8"
        title="Fuutura Extension"
        description="A production-grade, non-custodial browser extension wallet engineered to deliver the fluency and familiarity of leading wallet extensions — while maintaining the full security architecture of the Fuutura ecosystem."
        domain="Browser Extension · Next.js · Viem · AWS"
        background="/light/fextension_premium_bg.jpg"
        status="Delivered"
        features={p3Features}
        mockupSrcSplash="/screens/fuutura/extension-tokens.jpg"
        mockupSrc="/screens/fuutura/extension-account.jpg"
        mockupType="extension"
      />

      {/* ── Project 04 — Fuutura KYC ── */}
      <ProjectSlide
        id="slide-p4"
        slideNumber="9"
        title="Fuutura KYC"
        description="A multi-surface, AI-powered KYC ecosystem making identity verification fast, intelligent, and blockchain-backed. Serves individual users and enterprise clients via a consumer mobile app, embeddable SDK, and B2B web dashboard."
        domain="AI · Identity · Python · LLaMA · Polygon"
        background="/light/fkyc_premium_bg.jpg"
        status="Delivered"
        features={p4Features}
        mockupType="showcase"
        showcase={{
          web: { src: "/screens/fuutura/id-web-dashboard.jpg", alt: "Fuutura ID identity dashboard", url: "id.fuutura.com" },
          front: { kind: "phone", src: "/screens/fuutura/id-mobile.jpg", alt: "Fuutura ID mobile app" },
        }}
      />

      {/* ── Project 4b — Fuutura Chat ── */}
      <ProjectSlide
        id="slide-p4b"
        slideNumber="10"
        title="Fuutura Chat"
        description="A next-generation encrypted chat and messenger stack for building private communication into any app. Unifying end-to-end messaging, voice and video calls, and real-time sync — so teams can chat securely without exposing message content on the server."
        domain="Communication · Security · React Native"
        background="/light/fchat_premium_bg.jpg"
        status="Delivered"
        features={pChatFeatures}
        mockupSrcSplash="/FchatS.jpg"
        mockupSrc="/Fchat.jpg"
        mockupType="mobile"
      />

      {/* ── Project 4c — Fuutura VPN ── */}
      <ProjectSlide
        id="slide-p4c"
        slideNumber="11"
        title="Fuutura VPN"
        description="An enterprise-grade VPN and secure connectivity platform engineered to deliver private, encrypted, and high-performance internet access — enabling users and organizations to securely connect across global networks through a unified infrastructure."
        domain="Security · Infrastructure · C++"
        background="/light/fvpn_premium_bg.jpg"
        status="Delivered"
        features={pVpnFeatures}
        mockupSrcSplash="/FvpnS.jpg"
        mockupSrc="/Fvpn.jpg"
        mockupType="mobile"
      />


      {/* ── Project 05 — Origin One Labs HRMS ── */}
      <ProjectSlide
        id="slide-p5"
        slideNumber="12"
        title="Origin One Labs HRMS"
        description="A next-generation platform bridging workforce administration and daily operations. Unifying HR records, recruitment, and actionable performance tracking to show not just who works for the company, but the actual impact of their work."
        domain="SaaS · HR Tech · Next.js · Node.js"
        background="/light/fhrms_premium_bg.jpg"
        status="Delivered"
        features={p5Features}
        mockupSrc="/hrms.png"
        mockupType="laptop"
      />

      {/* ── Project 06 — Digital24 ── */}
      <ProjectSlide
        id="slide-p6"
        slideNumber="13"
        title="Digital24"
        description="A full-featured PR distribution platform streamlining how businesses create, manage, and fulfil media campaigns at scale — from guaranteed placements and newswire to SEO guest posting, journalist outreach, payments, and internal fulfilment."
        domain="SaaS · Next.js · PostgreSQL · Stripe"
        background="/light/digital24_premium_bg.jpg"
        status="Delivered"
        features={p6Features}
        mockupSrc="/D24.png"
        mockupType="laptop"
      />

      {/* ── Project 07 — Intelizzz ── */}
      <ProjectSlide
        id="slide-p7"
        slideNumber="14"
        title="Intelizzz — Vehicle Intelligence"
        description="Delivered an enterprise-grade vehicle intelligence and fleet management platform for Intelizzz, powering connected vehicle operations and tracking for enterprise fleet customers."
        background="/light/intelizzz_premium_bg.jpg"
        status="Delivered"
        features={p7Features}
        mockupSrcSplash="/IntelizzzS.png"
        mockupSrc="/intelizzz.jpg"
      />

      {/* ── Project 08 — Toybox ── */}
      <ProjectSlide
        id="slide-p8"
        slideNumber="15"
        title="Toybox — Automotive Concierge"
        description="A premium automotive concierge ecosystem purpose-built for luxury vehicle owners — delivered across four integrated surfaces covering the full member, staff, and operational experience with native iOS and web applications."
        domain="Luxury Auto · iOS Swift · Next.js"
        background="/light/toybox_premium_bg.jpg"
        status="Delivered"
        features={p8Features}
        mockupSrcSplash="/ToyBoxS.png"
        mockupSrc="/toybox.jpg"
      />

      {/* ── Project 09 — Health & Care Platform ── */}
      <ProjectSlide
        id="slide-p9"
        slideNumber="16"
        title="Clinic Management Platform"
        description="A next-generation platform bridging clinical administration and day-to-day patient care. Unifying pet records, outpatient workflows, and actionable treatment tracking to show not just who is under care, but the full clinical journey and outcomes of every case."
        domain="HealthTech · Veterinary · Next.js"
        background="/light/health_premium_bg.jpg"
        status="Delivered"
        features={p9Features}
        mockupSrc="/new screens/IMG_8589.png"
        mockupType="laptop"
      />

      {/* ── Project 10 — SAAP ── */}
      <ProjectSlide
        id="slide-p10"
        slideNumber="17"
        title="Manufacturing & Production Management Platform"
        description="An enterprise-grade SaaS platform engineered to streamline complex business operations through centralized workflows, real-time data visibility, automation, and intelligent reporting — creating a single source of truth across teams and processes."
        domain="Enterprise SaaS · Next.js · Node.js"
        background="/light/saap_premium_bg.jpg"
        status="Delivered"
        features={p10Features}
        mockupSrc="/new screens/IMG_8591.png"
        mockupType="laptop"
      />

      {/* ── Project 11 — Marketplace Platform ── */}
      <ProjectSlide
        id="slide-p11"
        slideNumber="18"
        title="Community & Social Commerce Platform"
        description="An enterprise-grade, multi-service marketplace platform engineered to deliver seamless asset discovery and transaction management — connecting buyers, developers, and investors with comprehensive property listings and financial advisory tools."
        domain="Real Estate · Marketplace · Next.js"
        background="/light/marketplace_premium_bg.jpg"
        status="Delivered"
        features={p11Features}
        mockupSrc="/new screens/IMG_8600.png"
        mockupType="laptop"
      />

      {/* ── Project 12 — Logistics & Dispatch Platform ── */}
      <ProjectSlide
        id="slide-p12"
        slideNumber="19"
        title="Logistics & Dispatch"
        description="An enterprise-grade, fleet management platform engineered to optimize freight movement, dispatch operations, and transit visibility — consolidating load scheduling, driver tracking, and performance analytics into a central dispatch hub."
        domain="Logistics · Fleet Management · Next.js"
        background="/light/logistics_premium_bg.jpg"
        status="Delivered"
        features={p12Features}
        mockupSrc="/new screens/IMG_8593.png"
        mockupType="laptop"
      />

      {/* ── Project 13 — Creative Community & Media Platform ── */}
      <ProjectSlide
        id="slide-p13"
        slideNumber="20"
        title="Creative Community"
        description="An enterprise-grade, multi-functional community ecosystem engineered to unite creators, enthusiasts, and brands — seamlessly integrating dynamic social interactions, collaborative group hubs, peer-to-peer commerce, and audio content streaming."
        domain="Social Media · Audio Streaming · Next.js"
        background="/light/community_premium_bg.jpg"
        status="Delivered"
        features={p13Features}
        mockupSrc="/new screens/IMG_8594.png"
        mockupType="laptop"
      />

      {/* ── Project 14 — FinTech Platform ── */}
      <ProjectSlide
        id="slide-p14"
        slideNumber="21"
        title="Payment & Credit Services Platform"
        description="An enterprise-grade, digital credit marketplace engineered to streamline borrowing and capital distribution — connecting applicants with a network of competing financial institutions through automated matching, friction-free onboarding, and financial literacy resources."
        domain="FinTech · Lending · Next.js"
        background="/light/fintech_premium_bg.jpg"
        status="Delivered"
        features={p14Features}
        mockupSrc="/new screens/IMG_8602.png"
        mockupType="laptop"
      />

      {/* ── Project 15 — Multiple Payment Gateways & Advertisement Platform ── */}
      <ProjectSlide
        id="slide-p15"
        slideNumber="22"
        title="Ads & Payment"
        description="An enterprise-grade advertising and payment orchestration platform engineered to centralize digital campaign management, multi-channel advertising, and multi-gateway payment processing — enabling businesses to launch, manage, monetize, and analyze campaigns through a unified ecosystem."
        domain="AdTech · FinTech · Next.js"
        background="/light/ads_payment_premium_bg.jpg"
        status="Delivered"
        features={p15Features}
        mockupSrc="/new screens/IMG_8603.png"
        mockupType="laptop"
        topMaxWidth="850px"
      />

      {/* ── Project 16 — E-Commerce Platform ── */}
      <ProjectSlide
        id="slide-p16"
        slideNumber="23"
        title="E-commerce & Retail Management Platform"
        description="An enterprise-grade, digital retail platform engineered to power multi-vendor commerce — uniting single and direct seller storefronts with catalog management, real-time cart tracking, and product discovery."
        domain="E-Commerce · Retail · Next.js"
        background="/light/ecommerce_premium_bg.jpg"
        status="Delivered"
        features={p16Features}
        mockupSrc="/new screens/IMG_8599.png"
        mockupType="laptop"
      />

      {/* ── Project 17 — CRM Platform ── */}
      <ProjectSlide
        id="slide-p17"
        slideNumber="24"
        title="Real Estate Discovery & Investment Platform"
        description="An enterprise-grade Customer Relationship Management platform engineered to centralize sales, customer interactions, business workflows, and performance intelligence — enabling organizations to manage the complete customer lifecycle through a unified digital workspace."
        domain="CRM · B2B SaaS · Next.js"
        background="/light/crm_premium_bg.jpg"
        status="Delivered"
        features={p17Features}
        mockupSrc="/new screens/image.png"
        mockupType="laptop"
      />

      {/* ── Project 18 — Digital Health Platform ── */}
      <ProjectSlide
        id="slide-p18"
        slideNumber="25"
        title="Digital Health Platform"
        description="A personalised digital health platform for structured wellbeing programmes — combining a composite health score, daily habit plans, guided learning, and clinician video sessions in one connected experience across web and mobile."
        domain="HealthTech · Wellbeing · Web & Mobile"
        background="/light/health_premium_bg.jpg"
        status="Delivered"
        features={p18Features}
        mockupType="showcase"
        showcase={{
          web: { src: "/screens/health/web-dashboard.png", alt: "Digital health platform member dashboard", url: "Member dashboard" },
          phones: [
            { src: "/screens/health/mobile-today.jpg", alt: "Mobile app — today's plan" },
            { src: "/screens/health/mobile-score.jpg", alt: "Mobile app — health score" },
            { src: "/screens/health/mobile-breakdown.jpg", alt: "Mobile app — score breakdown" },
          ],
        }}
      />

      {/* ── Project 19 — Vape Local ── */}
      <ProjectSlide
        id="slide-p19"
        slideNumber="26"
        title="Vape Local — E-Commerce Platform"
        description="A high-volume UK vape and nicotine e-commerce platform — brand-led merchandising, deal-driven navigation, and fulfilment-aware shopping across vapes, e-liquids, nicotine pouches, and hardware for trade and retail customers."
        domain="E-Commerce · Retail · Web"
        background="/light/ecommerce_premium_bg.jpg"
        status="Delivered"
        features={p19Features}
        mockupType="showcase"
        showcase={{
          web: { src: "/screens/vapelocal/web-home.jpg", alt: "Vape Local storefront home page", url: "Vape Local · Storefront", ratio: 16 / 9 },
        }}
      />

      {/* ── 23 Why Origin One ── */}
      <WhyChooseSlide />

      {/* ── 24 Let's Connect ── */}
      <ConnectSlide />
    </PresentationShell>
  );
}
