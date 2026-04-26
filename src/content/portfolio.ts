export const identity = {
  name: "Meet Jain",
  role: "Co-founder · Senior Engineer · Fintech & Blockchain",
  headline:
    "I build production-grade financial infrastructure — from the crypto payment flow that closed a NASDAQ acquisition to co-founding an on-chain lending protocol for prediction markets.",
  location: "India · Remote",
  email: "meetjaiin@gmail.com",
  phone: "+91 88549 28428",
  github: "https://github.com/meetjn",
  linkedin: "https://www.linkedin.com/in/meetjaiin",
};

export const heroSignals = [
  "Engineered Rezolve AI acquisition showcase — NASDAQ-listed deal",
  "Co-founder & CTO, Revalon Finance — 80% LTV on-chain lending",
  "Predexy: 7-platform arbitrage engine · 127 Go tests · production",
  "MetaKeep Wallet Isolation cut enterprise defects 40%",
];

export const stats = [
  {
    value: "L1 → UI",
    label: "Full-Stack Depth",
    detail:
      "From raw Solidity bytes and Go backends to pixel-perfect Next.js interfaces — every layer owned end-to-end.",
  },
  {
    value: "7 Venues",
    label: "Distributed Systems",
    detail:
      "Predexy ingests, normalizes, and arbitrage-scans 7 prediction market platforms in real time with semantic matching.",
  },
  {
    value: "NASDAQ",
    label: "Acquisition Impact",
    detail:
      "Shipped the Rezolve AI × MetaKeep acquisition showcase — crypto payments for luxury retail that closed the deal.",
  },
];

export const experience = [
  {
    company: "Revalon Finance",
    title: "Co-founder & CTO",
    timeline: "Apr 2026 – Present · Remote",
    summary:
      "Building a floor-aware lending protocol on prediction markets: smart-contract custody, deterministic underwriting, and on-chain loan lifecycle orchestration.",
    impact: [
      "Architected Revalon Finance's lending MVP with smart-contract custody, deterministic underwriting, and on-chain loan lifecycle — enabling capital-efficient borrowing against prediction market positions.",
      "Designed collateral math enabling up to 80% LTV on matched YES/NO positions, validating 80 pmUSD loans against 100 pmUSD recoverable collateral.",
      "Designed Predexy's multi-exchange data pipeline across 7 venues (Polymarket, Limitless, Manifold, PredictIt, Azuro, Drift, Predict.fun) with Go connectors, normalization, and pgvector semantic matching.",
      "Delivered production-grade platform: authentication, RBAC, invite flows, rate limiting (Redis), background job orchestration, and Polymarket wallet position tracking.",
      "Built cross-platform market-matching engine using sentence embeddings (all-MiniLM-L6-v2), vector search, and lexical scoring to surface direct and Dutch-book arbitrage opportunities.",
    ],
    stack: [
      "Go",
      "TypeScript",
      "Next.js",
      "PostgreSQL",
      "Redis",
      "pgvector",
      "Solidity",
      "Docker",
      "Turborepo",
      "Prisma",
    ],
  },
  {
    company: "MetaKeep · Acquired by Rezolve (NASDAQ: RZLV)",
    title: "Senior Software Engineer",
    timeline: "Apr 2025 – Apr 2026 · San Francisco (Remote)",
    summary:
      "Shipped the acquisition showcase for Rezolve AI's NASDAQ deal and hardened MetaKeep's core wallet infrastructure for enterprise partners.",
    impact: [
      "Architected the acquisition showcase for Rezolve AI — end-to-end crypto payment flow embedded in a luxury retail chatbot (Pandora, March 2026) that was central to closing the NASDAQ listing.",
      "Built MetaKeep's fiat on-ramp from zero to production: Coinbase API + MetaKeep SDK enabling zero-fee, sign-up-free crypto purchases in under 45 seconds.",
      "Led Wallet Isolation rollout — enterprise-grade security sandbox that reduced pre-production defects by 40% while maintaining weekly deploy cadence.",
      "Built MoonPay → Jupiter → $LOOK fiat-to-token rail, chaining card purchases through Solana swaps and auto-depositing tokens into MetaKeep wallets for partner campaigns.",
      "Designed on-chain USDC transfer system using SPL-token delegation, eliminating repeated approval flows for gasless transfers.",
      "Delivered 8 cross-platform SDK demo apps (6 Android / 2 iOS) covering Solana and Ethereum transaction flows.",
    ],
    stack: [
      "TypeScript",
      "Next.js",
      "Solana",
      "Ethereum",
      "Coinbase API",
      "SPL",
      "Node.js",
      "AWS",
      "MoonPay",
      "Jupiter",
    ],
  },
  {
    company: "Quranium L1",
    title: "Blockchain Developer Intern",
    timeline: "Oct 2024 – Mar 2025 · Remote",
    summary:
      "Led the MVP of a DEX using Uniswap v3 concentrated-liquidity contracts and a production-ready multi-sig wallet.",
    impact: [
      "Implemented concentrated-liquidity token swaps with automated position rebalancing using Uniswap v3.",
      "Shipped production-ready multisig wallet enabling the protocol to self-custody fees without third-party dependency.",
      "Hardened smart-contract surface with Foundry fuzz and invariant tests, covering edge cases in liquidation and rebalancing logic.",
    ],
    stack: ["Solidity", "Foundry", "Uniswap v3", "Hardhat"],
  },
];

export const keystoneBuilds = [
  {
    title: "Predexy — Arbitrage Engine",
    metric: "7 platforms · real-time",
    description:
      "Go-native data pipeline that ingests, normalizes, and semantic-matches prediction markets across 7 venues — surfacing direct and Dutch-book arbitrage opportunities fee-adjusted.",
    proof:
      "127 Go tests (race-detection), pgvector semantic matching, 9-job GitHub Actions CI pipeline, Docker Compose full-stack.",
    tags: ["Go", "pgvector", "Redis", "Docker", "Turborepo"],
    link: "https://app.revalonlabs.xyz",
  },
  {
    title: "Rezolve Acquisition Showcase",
    metric: "NASDAQ listing catalyst",
    description:
      "End-to-end crypto payment flow in a luxury retail chatbot (Pandora) built for Rezolve AI's NASDAQ acquisition of MetaKeep.",
    proof:
      "Shipped March 2026; central to the Rezolve AI × MetaKeep deal announced on NASDAQ.",
    tags: ["TypeScript", "Solana", "MetaKeep SDK", "Chatbot"],
  },
  {
    title: "MetaKeep Onramp",
    metric: "First purchase <45 s",
    description:
      "Greenfield Coinbase Commerce + MetaKeep SDK integration letting retail users buy crypto with no sign-up and zero fees.",
    proof:
      "Designed flow, API choreography, and auth gates; powering strategic partner pilots in production.",
    tags: ["Next.js", "Coinbase API", "Serverless"],
  },
  {
    title: "Revalon Finance Protocol",
    metric: "80% LTV on pmUSD",
    description:
      "Floor-aware lending protocol using prediction market positions as collateral — smart-contract custody, deterministic underwriting, on-chain lifecycle.",
    proof:
      "Validated 80 pmUSD loans against 100 pmUSD matched YES/NO collateral in testnet; mainnet launch in progress.",
    tags: ["Solidity", "Next.js", "Go", "PostgreSQL"],
    link: "https://app.revalonlabs.xyz/revalon/lending",
  },
  {
    title: "Wallet Isolation",
    metric: "40% defect drop",
    description:
      "Enterprise isolation layer sandboxing wallet state per partner to prevent regression bleed-through across custodial flows.",
    proof:
      "Reduced pre-production bugs 40% while keeping deploy cadence weekly across all MetaKeep partners.",
    tags: ["Node.js", "PostgreSQL", "Observability"],
  },
];

export const personalProjects = [
  {
    name: "Predexy — Prediction Market Aggregator",
    link: "https://app.revalonlabs.xyz",
    isLive: true,
    summary:
      "Full-stack platform aggregating 7 prediction market venues into a unified data layer with semantic question matching, cross-platform arbitrage detection, and wallet position tracking.",
    highlight:
      "Go Gin API + Python embedding sidecar (all-MiniLM-L6-v2 + pgvector) detecting direct and Dutch-book arbitrage. 127 passing Go tests with race detection. Monorepo with Turborepo, 9-job CI pipeline.",
    stack: [
      "Go",
      "TypeScript",
      "Next.js",
      "PostgreSQL",
      "Redis",
      "pgvector",
      "Docker",
      "Turborepo",
    ],
  },
  {
    name: "Transaction Link Generator",
    link: "https://github.com/meetjn/Transaction-link-generator",
    isLive: false,
    summary:
      "Secure React + AWS app that creates one-click MetaKeep transaction URLs with full audit logging.",
    highlight:
      "CI/CD via GitHub Actions reduced deployment time by 90%; hosted on EC2 with auto-deploy on merge.",
    stack: ["TypeScript", "React", "AWS EC2", "GitHub Actions"],
  },
  {
    name: "DeFi Collateral Protocol",
    link: "https://github.com/meetjn/Defi-Protocol",
    isLive: false,
    summary:
      "Collateralized lending protocol with dynamic interest rate bands, liquidation logic, and on-chain auditing.",
    highlight:
      "Foundry fuzz + invariant test harness covering liquidation edges and interest-rate shifts with 100% branch coverage.",
    stack: ["Solidity", "Foundry", "Chainlink Feeds"],
  },
];

export const demoSuite = [
  {
    name: "IOS-EVM-App",
    description: "Swift sample for broadcasting EVM transactions via MetaKeep.",
  },
  {
    name: "iOS-SVM-App",
    description: "Solana-native signer for iOS using MetaKeep SDK.",
  },
  {
    name: "Kotlin-App",
    description: "Android EVM broadcaster with developer wallet sponsorship.",
  },
  {
    name: "React-Native-App",
    description: "Solana transaction broadcasting demo for Android teams.",
  },
  {
    name: "Developer-Sponsor-Gas-SVM",
    description: "Vercel app showcasing sponsored gas flows on Solana.",
  },
];

export const techStack = {
  languages: ["Go", "TypeScript", "JavaScript", "Solidity", "Rust"],
  frontend: ["Next.js", "React", "Tailwind CSS"],
  backend: ["Gin", "Node.js", "Prisma", "REST", "WebSockets", "FastAPI"],
  blockchain: [
    "Ethereum",
    "Solana",
    "Foundry",
    "Hardhat",
    "SPL",
    "Uniswap v3",
  ],
  infrastructure: [
    "Docker",
    "Terraform",
    "Linux",
    "CI/CD",
    "GitHub Actions",
    "AWS EC2",
    "AWS Nitro Enclaves",
    "Turborepo",
  ],
  databases: ["PostgreSQL", "Redis", "MongoDB", "pgvector"],
  mobile: ["Kotlin", "Swift"],
};

export const openSource = [
  {
    org: "StabilityNexus · FairFund · Coverage",
    contribution:
      "Cut gas by 25%, fixed critical bugs, and drove coverage to 100% across FairFund smart contracts.",
    link: "https://github.com/StabilityNexus/FairFund/pull/74",
  },
  {
    org: "StabilityNexus · FairFund · FundingVault",
    contribution:
      "Hardened FundingVault contract, refactored storage layout, and reduced gas costs.",
    link: "https://github.com/StabilityNexus/FairFund/pull/69",
  },
  {
    org: "AOSSIE · Agora-Blockchain · Safety",
    contribution:
      "Fixed edge cases in election logic to prevent out-of-bounds access in removeCandidate.",
    link: "https://github.com/AOSSIE-Org/Agora-Blockchain/pull/119",
  },
  {
    org: "AOSSIE · Agora-Blockchain · Gas",
    contribution:
      "Optimized voting and messaging contracts to reduce gas usage across cross-chain calls.",
    link: "https://github.com/AOSSIE-Org/Agora-Blockchain/pull/123",
  },
];

export const contact = {
  headline: "Building something ambitious?",
  pitch:
    "I partner with founders and engineering teams to own wallets, payments, smart-contract systems, and distributed data pipelines end-to-end — so you can stay focused on product and growth. Available for remote full-time or founding engineer roles.",
  actions: [
    {
      label: "Book a 15-min sync",
      href: "https://calendly.com/meetjaiin/30min",
    },
    {
      label: "Email me",
      href: "mailto:meetjaiin@gmail.com",
    },
  ],
};
