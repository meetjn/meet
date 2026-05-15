import type { Metadata } from "next";
import { Bebas_Neue, DM_Serif_Display } from "next/font/google";
import { GeistSans } from "geist/font/sans";

import "./globals.css";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { HotjarAnalytics } from "@/components/HotjarAnalytics";
import { site } from "@/content/site";
import { SITE_URL } from "@/lib/site";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const title = {
  default: "Meet Jain · Co-founder & Protocol Engineer",
  template: "%s · Meet Jain",
};

const description =
  "Co-founder of Revalon Finance · Senior Engineer at MetaKeep (acquired by Rezolve, NASDAQ) · Lending protocols, payment rails, and acquisition-grade financial infrastructure.";

const keywords = [
  "Meet Jain",
  "blockchain engineer",
  "Solidity developer",
  "DeFi",
  "lending protocol",
  "MetaKeep",
  "Revalon Finance",
  "fintech engineer",
  "protocol engineering",
  "remote engineer",
];

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [],
    apple: [],
  },
  title,
  description,
  applicationName: site.name,
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  keywords,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: title.default,
    description,
    url: SITE_URL,
    siteName: "meetjain.xyz",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: title.default,
    description,
  },
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    ...(bingVerification ? { other: { "msvalidate.01": bingVerification } } : {}),
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: SITE_URL,
  email: `mailto:${site.email}`,
  sameAs: [site.linkedin, site.github, site.x],
  jobTitle: site.role,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${bebas.variable} ${dmSerif.variable} ${GeistSans.variable} ${GeistSans.className} overflow-x-hidden font-light antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <GoogleAnalytics />
        <HotjarAnalytics />
        {children}
      </body>
    </html>
  );
}
