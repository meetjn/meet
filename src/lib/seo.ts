import { site } from "@/content/site";

import { SITE_URL } from "./site";

/** Primary meta description — keep under ~160 chars for snippets where possible */
export const SITE_DESCRIPTION =
  "Meet Jain writes about backend engineering and distributed systems — payments, lending, and fintech infrastructure, drawn out one diagram at a time. Lead Backend Engineer at Ones Finance.";

/** Expanded vocabulary for search + AI retrieval */
export const SITE_KEYWORDS = [
  "Meet Jain",
  "meetjain.xyz",
  "Meet Jain engineer",
  "backend engineering blog",
  "distributed systems blog",
  "Ones Finance",
  "MetaKeep",
  "Rezolve AI",
  "payments infrastructure",
  "fintech infrastructure",
  "Go engineer",
  "idempotent transaction pipeline",
  "payment systems",
  "lending platform",
  "system design articles",
  "engineering diagrams",
] as const;

const TWITTER_HANDLE = "@meetjaiin";

export const seoTwitterCreator = TWITTER_HANDLE;

const knowsAbout = [
  "backend engineering",
  "distributed systems",
  "payment systems",
  "REST API design",
  "idempotency",
  "event-driven systems",
  "Go",
  "TypeScript",
  "Python",
  "PostgreSQL",
  "Redis",
  "fintech infrastructure",
] as const;

export function buildSiteJsonLd() {
  const personId = `${SITE_URL}/#person`;
  const websiteId = `${SITE_URL}/#website`;

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
        worksFor: {
          "@type": "Organization",
          name: "Ones Finance",
        },
        sameAs: [site.linkedin, site.github, site.x],
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
          {
            "@type": "CollegeOrUniversity",
            name: "JECRC University",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE_URL,
        name: `${site.name} — Writing`,
        description: SITE_DESCRIPTION,
        inLanguage: "en-US",
        publisher: { "@id": personId },
      },
    ],
  };
}
