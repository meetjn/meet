export const site = {
  name: "Meet Jain",
  role: "Co-founder · CTO · Platform Engineer",
  x: "https://x.com/meetjaiin",
  github: "https://github.com/meetjn",
  linkedin: "https://www.linkedin.com/in/meetjaiin",
  calendly: "https://calendly.com/meetjaiin/30min",
  location: "Jaipur, India · Remote · 2026",
} as const;

export const traits = [
  {
    number: "01",
    title: "Domain Obsession",
    description:
      "I don't ship features — I internalize the problem space. Lending platforms, payment systems, account security — I go deep until I understand the threat model, the incentive structure, the edge cases that kill companies. Then I build.",
  },
  {
    number: "02",
    title: "Zero-to-Production Speed",
    description:
      "From zero to a payment onboarding flow used in a NASDAQ acquisition. From zero to a lending platform with disciplined automated execution and integrated risk controls. Most engineers prototype. I ship.",
  },
  {
    number: "03",
    title: "System-Level Thinking",
    description:
      "I see the whole board — core platform, application layer, DevOps, security architecture. When I build lending infrastructure I think about recovery workflows, custody boundaries, reconciliation, and auditable decision trails simultaneously.",
  },
  {
    number: "04",
    title: "High-Stakes Calm",
    description:
      "The work I do has real financial consequence — credit losses, coordinated attacks, acquisition due diligence. I operate with the same focus under pressure as I do at 2am with no deadline. That's not a work habit. It's character.",
  },
  {
    number: "05",
    title: "Ownership Instinct",
    description:
      "I've never handed a problem back with \"that's not my area.\" Per-app key isolation, open-source cost optimization, fiat funding integrations — I find the gap, understand it, and close it. Not because someone asked, but because leaving it open bothers me.",
  },
  {
    number: "06",
    title: "Compounding Trajectory",
    description:
      "One year: intern contributing to next-generation distributed ledger logic. Two years: CTO of a production-grade lending platform. The velocity isn't luck — it's what happens when someone is genuinely, deeply in love with the craft.",
  },
] as const;

export const experience = [
  {
    period: "Apr 2026 – Now",
    tag: "Co-founder · CTO",
    role: "Revalon Finance",
    website: "https://revalon.finance",
    company: "Platform Engineering · Financial Infrastructure",
    points: [
      "Led architecture for a lending platform: core contract logic across multiple modules, guarded execution paths, and operational controls (delayed execution, multi-party approvals). Shipped full pre-production lifecycle with disciplined asset management and recovery workflows.",
      "Built Go services for underwriting and dynamic loan-to-value ratios — multi-signal inputs, auditable outputs, and PostgreSQL trails suitable for downstream analytics and diligence.",
      "Delivered marketplace mechanics bridging lenders and borrowers: dynamic rate regimes, automated monitoring, and a staged margin workflow aligned with platform constraints.",
      "Integrated hybrid digital and regulated-venue collateral with encryption and KMS-aware key handling. Architecture and integrations available under NDA.",
    ],
    impact: "Pre-production-ready platform · Risk discipline",
  },
  {
    period: "Apr 2025 – May 2026",
    tag: "Senior Engineer",
    role: "MetaKeep (Acquired)",
    website: "https://metakeep.xyz",
    company: "Rezolve AI · NASDAQ: RZLV",
    points: [
      "Engineered the digital payment integration that served as the primary technical validator for MetaKeep's acquisition by Rezolve AI (NASDAQ: RZLV). Sign-up-free transactions in a chatbot UI for luxury retail — shipped March 2026.",
      "Led Wallet Isolation, an enterprise security feature enforcing per-app key segregation. Reduced pre-production bugs by 40%. Adopted as a production standard across the MetaKeep SDK.",
      "Built MetaKeep's payment onboarding flow from zero — integrated Coinbase API with zero-fee, sign-up-free UX. Architected a third-party payment routing pipeline with automated account funding.",
      "Shipped 8 SDK integration demos (6 Android, 2 iOS) covering cross-platform payment integrations — used as developer documentation and enterprise sales tooling.",
    ],
    impact: "NASDAQ acquisition validator · 40% defect drop",
  },
  {
    period: "Oct 2024 – Mar 2025",
    tag: "Platform Engineering Intern",
    role: "Quranium",
    website: "https://quranium.org",
    company: "Next-Generation Distributed Ledger Infrastructure",
    points: [
      "Built an MVP automated trading exchange with multi-signature treasury controls for a quantum-resistant distributed ledger platform.",
      "4 merged PRs to FairFund open-source platform logic — reduced execution costs by 25%, fixed critical bugs, drove test coverage to 100% branch coverage.",
    ],
    impact: "25% cost reduction · 100% test coverage",
  },
] as const;

export const mentors = [
  {
    name: "WhatsApp Pay",
    role: "Global payments infrastructure · Billions of users",
  },
  {
    name: "Diem Payments (Meta)",
    role: "Meta's digital payments and ledger program",
  },
  {
    name: "Twitter Social Graph",
    role: "Distributed systems at social-media scale",
  },
] as const;

export const stackGroups = [
  {
    title: "Backend & Core Systems",
    items: ["Go", "Rust", "PostgreSQL", "Redis", "AWS Nitro Enclaves"],
  },
  {
    title: "Application Layer",
    items: ["TypeScript", "Next.js", "React", "Node.js", "Prisma", "MongoDB"],
  },
  {
    title: "Financial Platform",
    items: [
      "Distributed ledger platforms",
      "Contract development tooling",
      "Automated market integrations",
      "Oracle & pricing feeds",
      "Security & compliance libraries",
    ],
  },
  {
    title: "Infrastructure",
    items: [
      "Docker / Terraform",
      "AWS KMS",
      "GitHub Actions CI/CD",
      "AWS EC2 / Linux",
      "Operational security monitoring",
      "Multi-party approval systems",
    ],
  },
] as const;
