import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { HotjarAnalytics } from "@/components/HotjarAnalytics";
import { identity } from "@/content/portfolio";
import { SITE_URL } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const title = {
  default: "Meet Jain · Co-founder & Senior Engineer · Fintech & Blockchain",
  template: "%s · Meet Jain",
};

const description =
  "Co-founder of Revalon Finance · Senior Engineer at MetaKeep (acquired by Rezolve, NASDAQ) · Shipping distributed systems, on-chain lending protocols, wallet rails, and multi-platform data pipelines.";

const ogDescription =
  "Built the Rezolve AI acquisition showcase, co-founded Revalon Finance's on-chain lending protocol, and shipped Predexy — a 7-platform prediction market arbitrage engine.";

const keywords = [
  "Meet Jain",
  "blockchain engineer",
  "Solidity developer",
  "DeFi",
  "lending protocol",
  "MetaKeep",
  "Revalon Finance",
  "fintech engineer",
  "Go engineer",
  "TypeScript",
  "wallet infrastructure",
  "crypto payments",
  "remote engineer",
  "protocol engineering",
  "Polygon",
  "Ethereum",
  "Solana",
];

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  applicationName: "Meet Jain",
  authors: [{ name: identity.name, url: SITE_URL }],
  creator: identity.name,
  publisher: identity.name,
  category: "technology",
  keywords,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: title.default,
    description: ogDescription,
    url: SITE_URL,
    siteName: "meetjain.xyz",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: title.default,
    description:
      "Co-founder, Revalon Finance · Senior Engineer, MetaKeep (NASDAQ: RZLV) · Go · TypeScript · Solidity · Docker · Terraform",
  },
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    ...(bingVerification ? { other: { "msvalidate.01": bingVerification } } : {}),
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: identity.name,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  jobTitle: identity.role,
  email: `mailto:${identity.email}`,
  telephone: identity.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: identity.location,
  },
  sameAs: [identity.linkedin, identity.github],
  knowsAbout: [
    "Blockchain",
    "DeFi",
    "Solidity",
    "Distributed systems",
    "Fintech",
    "Lending protocols",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Meet Jain — Portfolio",
  url: SITE_URL,
  description,
  inLanguage: "en-US",
  author: { "@type": "Person", name: identity.name, url: SITE_URL },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-black text-white`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personJsonLd, websiteJsonLd]),
          }}
        />
        <GoogleAnalytics />
        <HotjarAnalytics />
        <div className="relative min-h-screen bg-black pb-16 pt-4 text-white">
          <div className="pointer-events-none absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)]" />
          </div>
          <Navbar />
          <div className="relative z-10">{children}</div>
        </div>
      </body>
    </html>
  );
}
