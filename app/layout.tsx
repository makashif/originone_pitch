import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

/* Absolute origin of the deployment actually serving this deck.
   Link-preview crawlers (WhatsApp, LinkedIn, X, Slack…) fetch og:image
   and og:url as full URLs, so they must point at this host — not at
   the main originonelabs.com site, which has no /opengraph-image.
   Set NEXT_PUBLIC_SITE_URL to pin a custom domain; on Vercel the
   project's production domain is used automatically. */
function siteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return new URL(explicit);
  const vercelHost =
    process.env.VERCEL_ENV === "production"
      ? process.env.VERCEL_PROJECT_PRODUCTION_URL
      : process.env.VERCEL_BRANCH_URL ?? process.env.VERCEL_URL;
  if (vercelHost) return new URL(`https://${vercelHost}`);
  return new URL(`http://localhost:${process.env.PORT ?? 3000}`);
}

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: "Origin One Labs",
  description:
    "Built on Expertise. Driven by Results. Origin One Labs is a technology partner combining deep technical expertise with strong product thinking to build scalable solutions.",
  keywords: ["Origin One", "software development", "mobile apps", "AI", "Web3", "enterprise software"],
  alternates: {
    canonical: '/',
  },
  /* Brand kit V2 icon set — same files as the main originonelabs.com
     site (app/favicon.ico, app/icon.png and app/apple-icon.png are
     picked up by file convention; these add the sized PNGs). */
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  /* og:image / twitter:image come from app/opengraph-image.tsx. */
  openGraph: {
    url: '/',
    siteName: "Origin One Labs",
    title: "Origin One Labs",
    description: "Built on Expertise. Driven by Results.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Origin One Labs",
    description: "Built on Expertise. Driven by Results.",
  },
};

/* Without this, mobile browsers assume a 980px-wide desktop canvas and
   scale the whole deck down — every media query below 960px would be
   dead code. viewportFit:"cover" lets the deck fill notched displays. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#f6f5f0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
