import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#03010a] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
