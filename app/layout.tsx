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

export const metadata: Metadata = {
  metadataBase: new URL('https://originonelabs.com'),
  title: "Origin One Labs",
  description:
    "Built on Expertise. Driven by Results. Origin One Labs is a technology partner combining deep technical expertise with strong product thinking to build scalable solutions.",
  keywords: ["Origin One", "software development", "mobile apps", "AI", "Web3", "enterprise software"],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Origin One Labs",
    description: "Built on Expertise. Driven by Results.",
    type: "website",
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
  themeColor: "#070707",
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
