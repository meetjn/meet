import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = {
  title: "Meet Jain · Full Stack & Blockchain Engineer",
  description:
    "MetaKeep + Quranium builder shipping zero-fee onramps, wallet isolation, and audited DeFi systems for YC-backed teams.",
  metadataBase: new URL("https://meet.build"), // placeholder domain, update when deployed
  openGraph: {
    title: "Meet Jain · Full Stack & Blockchain Engineer",
    description:
      "Shipping production crypto onramps, custody, and smart-contract systems for YC-speed teams.",
    url: "https://meet.build",
    siteName: "Meet Jain Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet Jain · Full Stack & Blockchain Engineer",
    description:
      "Full stack + blockchain engineer building wallets, onramps, and DeFi rails.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-black text-white`}>
        <Script
          src="https://cdn.jsdelivr.net/npm/metakeep@2.2.8/lib/index.js"
          integrity="sha256-dVJ6hf8zqdtHxHJCDJnLAepAyCCbu6lCXzZS3lqMIto="
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
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
