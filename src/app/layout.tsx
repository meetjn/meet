import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = {
  title: "Meet Jain · Co-founder & Senior Engineer · Fintech & Blockchain",
  description:
    "Co-founder of Revalon Finance · Senior Engineer at MetaKeep (acquired by Rezolve, NASDAQ) · Shipping distributed systems, on-chain lending protocols, and multi-platform data pipelines.",
  metadataBase: new URL("https://meetjain.xyz"),
  openGraph: {
    title: "Meet Jain · Co-founder & Senior Engineer · Fintech & Blockchain",
    description:
      "Built the Rezolve AI acquisition showcase, co-founded Revalon Finance's on-chain lending protocol, and shipped Predexy — a 7-platform prediction market arbitrage engine.",
    url: "https://meetjain.xyz",
    siteName: "meetjain.xyz",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet Jain · Co-founder & Senior Engineer · Fintech & Blockchain",
    description:
      "Co-founder, Revalon Finance · Senior Engineer, MetaKeep (NASDAQ: RZLV) · Go · TypeScript · Solidity · Docker · Terraform",
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
