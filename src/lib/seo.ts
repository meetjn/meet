import { experience, site } from "@/content/site";

import { SITE_URL } from "./site";

/** Primary meta description — keep under ~160 chars for snippets where possible */
export const SITE_DESCRIPTION =
  "Meet Jain — Founding Engineer at Revalon Finance; former MetaKeep engineer (NASDAQ acquisition validator). Lending platforms, payment systems & acquisition-grade financial infrastructure. Jaipur · Remote.";

/** Expanded vocabulary for search + AI retrieval */
export const SITE_KEYWORDS = [
  "Meet Jain",
  "meetjain.xyz",
  "Meet Jain engineer",
  "Revalon Finance",
  "MetaKeep",
  "Rezolve AI",
  "NASDAQ RZLV",
  "platform engineer",
  "founding engineer fintech",
  "lending platform",
  "financial infrastructure",
  "payment systems",
  "Go engineer",
  "fintech engineer",
  "payment rails",
  "infrastructure engineer",
  "Jaipur engineer",
  "remote platform engineer",
  "founding engineer",
  "risk engineering",
] as const;

const TWITTER_HANDLE = "@meetjaiin";

export const seoTwitterCreator = TWITTER_HANDLE;

const knowsAbout = [
  "lending platforms",
  "payment systems",
  "platform engineering",
  "payment rails",
  "account security",
  "Go",
  "TypeScript",
  "Next.js",
  "financial infrastructure",
  "risk underwriting",
  "distributed systems",
] as const;

export function buildPortfolioJsonLd() {
  const personId = `${SITE_URL}/#person`;
  const websiteId = `${SITE_URL}/#website`;
  const webpageId = `${SITE_URL}/#webpage`;

  const worksFor = [
    {
      "@type": "Organization" as const,
      name: experience[0]?.role ?? "Revalon Finance",
      description: experience[0]?.company,
    },
    {
      "@type": "Organization" as const,
      name: "MetaKeep",
      description: "Acquired by Rezolve AI (NASDAQ: RZLV)",
    },
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        url: SITE_URL,
        image: `${SITE_URL}/opengraph-image`,
        description: SITE_DESCRIPTION,
        jobTitle: site.role,
        worksFor,
        sameAs: [site.linkedin, site.github, site.x, site.calendly],
        knowsAbout: [...knowsAbout],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Jaipur",
          addressRegion: "Rajasthan",
          addressCountry: "IN",
        },
        alumniOf: [
          { "@type": "Organization", name: "MetaKeep" },
          { "@type": "Organization", name: "Quranium" },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "booking",
          url: site.calendly,
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE_URL,
        name: `${site.name} — Portfolio`,
        description: SITE_DESCRIPTION,
        inLanguage: "en-US",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": webpageId,
        url: SITE_URL,
        name: `${site.name} — Founding engineer & platform engineer`,
        description: SITE_DESCRIPTION,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
    ],
  };
}
