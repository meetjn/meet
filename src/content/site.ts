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
  // {
  //   number: "04",
  //   title: "High-Stakes Calm",
  //   description:
  //     "The work I do has real financial consequence — credit losses, coordinated attacks, acquisition due diligence. I operate with the same focus under pressure as I do at 2am with no deadline. That's not a work habit. It's character.",
  // },
  // {
  //   number: "05",
  //   title: "Ownership Instinct",
  //   description:
  //     "I've never handed a problem back with \"that's not my area.\" Per-app key isolation, open-source cost optimization, fiat funding integrations — I find the gap, understand it, and close it. Not because someone asked, but because leaving it open bothers me.",
  // },
  // {
  //   number: "06",
  //   title: "Compounding Trajectory",
  //   description:
  //     "One year: intern contributing to next-generation distributed ledger logic. Two years: CTO of a production-grade lending platform. The velocity isn't luck — it's what happens when someone is genuinely, deeply in love with the craft.",
  // },
] as const;

export const experience = [
  {
    period: "Apr 2026 – Present",
    tag: "Senior Software Engineer",
    role: "Revalon Finance",
    website: "https://revalon.finance",
    company: "Remote · Platform Engineering · Financial Infrastructure",
    points: [
      "Shipped to Polygon Amoy testnet — 22 on-chain loans, $3,360 USDC borrowed, 100% repayment rate across 21 beta wallets, 21 invite redemptions; live analytics dashboard, every metric verifiable on Polygonscan.",
      "Architected a production-grade floor-aware lending protocol on Polygon — 5 Solidity contracts, 7-guard on-chain quote verification, 48h TimelockController, and 3-of-5 Gnosis Safe multisig — zero bad debt across full testnet lifecycle.",
      "Built a real-time LTV engine in Go — 7 market signals drive dynamic LTV (50–80% floor), with automated 3-tier margin calls and full audit trails for every collateral health change.",
      "Shipped Polymarket collateral end-to-end (ERC-1155 vault custody, signed floor snapshots); built Kalshi backend (CFTC API attestation, KMS-encrypted read-only keys, 60s health polling).",
      "Designed 7-layer security (AWS KMS, CEI, flash-loan resistance, Redis rate limiting — rejected 99.96% of ~4,500 req/s abuse burst); deployed on DO App Platform at $24/mo with GitHub Actions CD, p95 <20ms under load.",
      "Built borrower-facing UI in Next.js — portfolio dashboard, quote-to-borrow flow with Privy, SSE-driven loan updates (~50–100ms post-confirmation), IndexedDB recovery, and invite-gated beta with HMAC JWT auth.",
    ],
    impact: "100% repayment · Zero bad debt · p95 <20ms",
  },
  {
    period: "Apr 2025 – Apr 2026",
    tag: "Senior Software Engineer",
    role: "MetaKeep (Acquired)",
    website: "https://metakeep.xyz",
    company: "Rezolve AI · NASDAQ: RZLV · Remote",
    points: [
      "Engineered the end-to-end payment integration that served as the primary technical validator for MetaKeep's acquisition by Rezolve AI (NASDAQ: RZLV), March 2026 — built on Reown Wallet Mobile Kit and MetaKeep SDK, enabling sign-up-free transactions inside a chatbot UI for luxury retail.",
      "Led Wallet Isolation — an enterprise security feature requested by Solana, enforcing per-app key segregation across a wallet infrastructure platform managing 10M+ wallets; reduced pre-production bugs by 40%.",
      "Built MetaKeep's crypto onramp from zero to production in TypeScript — integrated Coinbase API and MetaKeep SDK for zero-fee, sign-up-free purchases; architected a MoonPay fiat-to-token rail chaining card purchases through Jupiter swaps with auto-deposit into MetaKeep wallets.",
      "Designed an on-chain USDC transfer system using SPL token delegation, eliminating repeated approval flows and reducing transaction friction for end users.",
      "Shipped 8 SDK integration demos (6 Android, 2 iOS) covering Solana and Ethereum transaction flows — used as developer documentation and sales tooling for enterprise partners.",
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
