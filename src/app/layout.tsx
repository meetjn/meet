import type { Metadata, Viewport } from "next";
import { Bebas_Neue, DM_Serif_Display } from "next/font/google";
import { GeistSans } from "geist/font/sans";

import "./globals.css";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { HotjarAnalytics } from "@/components/HotjarAnalytics";
import { site } from "@/content/site";
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  buildPortfolioJsonLd,
  seoTwitterCreator,
} from "@/lib/seo";
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
  default: "Meet Jain · Co-founder & Platform Engineer",
  template: "%s · Meet Jain",
};

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Meet Jain — product infrastructure & financial systems engineering",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [{ url: "/icon-empty.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon-empty.svg", type: "image/svg+xml" }],
  },
  title,
  description: SITE_DESCRIPTION,
  applicationName: site.name,
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  keywords: [...SITE_KEYWORDS],
  alternates: { canonical: "/" },
  formatDetection: { email: false, telephone: false },
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: title.default,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "meetjain.xyz",
    locale: "en_US",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: title.default,
    description: SITE_DESCRIPTION,
    creator: seoTwitterCreator,
    site: seoTwitterCreator,
    images: [ogImage.url],
  },
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    ...(bingVerification
      ? { other: { "msvalidate.01": bingVerification } }
      : {}),
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "dark",
};

const portfolioJsonLd = buildPortfolioJsonLd();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" className="scroll-smooth">
      <body
        className={`${bebas.variable} ${dmSerif.variable} ${GeistSans.variable} ${GeistSans.className} overflow-x-hidden font-light antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(portfolioJsonLd),
          }}
        />
        <GoogleAnalytics />
        <HotjarAnalytics />
        {children}
      </body>
    </html>
  );
}
