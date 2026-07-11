import type { Metadata, Viewport } from "next";
import { Caveat, Fraunces } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "./globals.css";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { HotjarAnalytics } from "@/components/HotjarAnalytics";
import { CommandPalette } from "@/components/search/CommandPalette";
import { ServiceWorkerRegistrar } from "@/components/pwa/ServiceWorkerRegistrar";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { site } from "@/content/site";
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  buildSiteJsonLd,
  seoTwitterCreator,
} from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

/* Editorial serif — display, italics, and the calligraphic voice. */
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

/* Handwritten voice for diagram annotations and margin notes. */
const caveat = Caveat({
  weight: ["500"],
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
});

const title = {
  default: "Meet Jain — Systems, explained",
  template: "%s · Meet Jain",
};

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Meet Jain — writing on backend engineering and distributed systems",
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
    { media: "(prefers-color-scheme: light)", color: "#FAF7F0" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0908" },
  ],
};

const siteJsonLd = buildSiteJsonLd();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${caveat.variable} ${GeistSans.variable} ${GeistMono.variable} ${GeistSans.className} overflow-x-hidden font-light antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteJsonLd),
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <GoogleAnalytics />
          <HotjarAnalytics />
          <ServiceWorkerRegistrar />
          <CommandPalette />
          <div className="flex min-h-[100dvh] flex-col bg-portfolio-black">
            <SiteNav />
            <main className="flex flex-1 flex-col">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
