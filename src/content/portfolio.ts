import { getCalendlyBookingUrl } from "@/lib/site";

type KeystoneBuild = {
  title: string;
  metric: string;
  description: string;
  proof: string;
  tags: string[];
  link?: string;
};

export const identity = {
  name: "Meet Jain",
  role: "Product Infrastructure Engineer · Financial Protocols · Onchain Systems",
  headline:
    "Product infrastructure engineer specializing in financial protocols, onchain systems, and backend architecture at the founding layer.",
  location: "Remote",
  email: "meetjaiin@gmail.com",
  phone: "+91 88549 28428",
  github: "https://github.com/meetjn",
  linkedin: "https://www.linkedin.com/in/meetjaiin",
};

export const heroSignals = [
  "Revalon: floor-aware lending protocol on Polygon PoS",
  "NASDAQ acquisition validator: Rezolve AI × MetaKeep",
  "Wallet Isolation reduced pre-production bugs by 40%",
  "Built crypto onramp and MoonPay -> Jupiter token rail",
];

export const stats = [
  {
    value: "5 Contracts",
    label: "Full-Stack Depth",
    detail:
      "Built end-to-end lending infrastructure across Solidity contracts, Go underwriting services, and production application layers.",
  },
  {
    value: "7 Signals",
    label: "Distributed Systems",
    detail:
      "Implemented dynamic LTV underwriting in Go using seven real-time risk multipliers with PostgreSQL audit trails.",
  },
  {
    value: "NASDAQ",
    label: "Acquisition Impact",
    detail:
      "Engineered the crypto payment integration used as the primary technical validator for MetaKeep's acquisition by Rezolve AI.",
  },
];

export const experience = [
  {
    company: "Revalon Finance",
    title: "Co-founder & CTO",
    timeline: "Apr 2026 – Present · Remote",
    summary:
      "Architecting a production-grade floor-aware lending protocol with secure custody, dynamic underwriting, and automated risk controls.",
    impact: [
      "Architected a floor-aware lending protocol on Polygon PoS with 5 Solidity contracts, 7-guard quote verification, 48h TimelockController, and 3-of-5 Gnosis Safe multisig to maintain zero bad debt across the full testnet lifecycle.",
      "Built a dynamic LTV underwriting engine in Go computing per-condition borrow rates (60-90%) using 7 real-time market signal multipliers, with full PostgreSQL audit trails for ML training.",
      "Engineered a two-sided lending marketplace with a rebasing rlUSDC receipt token, utilization-zone APY controls (6-15%), and a Go drift monitor tracking 5 collateral health metrics with a 3-tier automated margin call system.",
      "Integrated Polymarket (trustless ERC-1155 custody) and Kalshi (CFTC-regulated API attestation) as off-chain collateral sources with AES-256 + KMS envelope encryption and sub-account position isolation.",
      "Shipped a pnpm monorepo (Go Gin, Next.js 16, Solidity) with AWS KMS policy signing, OZ Defender keeper automation, CEI enforcement, flash-loan resistance via snapshot signing, and real-time vault reconciliation.",
    ],
    stack: [
      "Go",
      "TypeScript",
      "Next.js",
      "Rust",
      "PostgreSQL",
      "Redis",
      "Solidity",
      "Docker",
      "AWS KMS",
      "Polygon PoS",
    ],
  },
  {
    company: "MetaKeep (Acquired)",
    title: "Senior Software Engineer",
    timeline: "Apr 2025 – May 2026 · San Francisco · Remote",
    summary:
      "Delivered acquisition-critical payments infrastructure and enterprise wallet security features for production partners.",
    impact: [
      "Engineered the end-to-end crypto payment integration that served as the primary technical validator for MetaKeep's acquisition by Rezolve AI (NASDAQ: RZLV) in March 2026.",
      "Led Wallet Isolation, enforcing per-app key segregation; reduced pre-production bugs by 40% and shipped it as a production feature across the MetaKeep SDK.",
      "Built MetaKeep's crypto onramp from zero to production using Coinbase API and MetaKeep SDK to enable zero-fee, sign-up-free purchases.",
      "Architected a MoonPay fiat-to-token rail through Jupiter swaps with auto-deposit into MetaKeep wallets.",
      "Designed an on-chain USDC transfer system using SPL token delegation to remove repeated approval flows and reduce user friction.",
      "Shipped 8 SDK integration demos (6 Android, 2 iOS) covering Solana and Ethereum transaction flows for developer docs and sales enablement.",
    ],
    stack: [
      "TypeScript",
      "Next.js",
      "Solana",
      "Ethereum",
      "Coinbase API",
      "SPL",
      "Node.js",
      "MoonPay",
      "Jupiter",
      "MetaKeep SDK",
    ],
  },
  {
    company: "Quranium L1",
    title: "Blockchain Developer Intern",
    timeline: "Oct 2024 – Mar 2025 · Remote",
    summary:
      "Built decentralized finance primitives and shipped open-source smart contract contributions.",
    impact: [
      "Built an MVP decentralized exchange using Uniswap v3 and a multisignature wallet for a quantum-resistant L1.",
      "Contributed 4 merged PRs to FairFund smart contracts, reducing gas costs by 25%, fixing critical bugs, and increasing test coverage to 100%.",
    ],
    stack: ["Solidity", "Foundry", "Uniswap v3", "Hardhat"],
  },
];

export const keystoneBuilds: KeystoneBuild[] = [
  {
    title: "Revalon Lending Protocol",
    metric: "Zero bad debt on testnet",
    description:
      "Production-grade floor-aware lending protocol on Polygon PoS with five Solidity contracts, timelock governance, and multisig safety controls.",
    proof:
      "Includes 7-guard on-chain quote verification, 48h TimelockController, and 3-of-5 Gnosis Safe custody.",
    tags: ["Solidity", "Go", "Polygon", "PostgreSQL", "AWS KMS"],
  },
  {
    title: "Rezolve Acquisition Integration",
    metric: "Primary technical validator",
    description:
      "Engineered the end-to-end crypto payment integration used in MetaKeep's acquisition by Rezolve AI (NASDAQ: RZLV).",
    proof:
      "Shipped in March 2026 with sign-up-free transaction UX in a chatbot flow for luxury retail.",
    tags: ["TypeScript", "Solana", "MetaKeep SDK", "Reown"],
  },
  {
    title: "MetaKeep Onramp + Fiat Rail",
    metric: "Zero-fee, sign-up-free",
    description:
      "Built MetaKeep's production onramp with Coinbase API and a MoonPay -> Jupiter swap rail with automatic wallet deposit.",
    proof:
      "Reduced onboarding friction by eliminating repeated approval and sign-up barriers for end users.",
    tags: ["Coinbase API", "MoonPay", "Jupiter", "SPL", "Node.js"],
  },
  {
    title: "Dynamic Underwriting Engine",
    metric: "60-90% borrow rates",
    description:
      "Go underwriting engine computes per-condition borrow rates from seven live risk multipliers, with full auditability.",
    proof:
      "Signals include time-to-expiry, implied probability, liquidity, spread, cross-platform deviation, and oracle objectivity.",
    tags: ["Go", "PostgreSQL", "Risk Engine", "ML Audit Trail"],
  },
  {
    title: "Wallet Isolation",
    metric: "40% defect drop",
    description:
      "Enterprise key-segregation feature enforcing per-app wallet boundaries across partner SDK integrations.",
    proof:
      "Reduced pre-production bugs by 40% and was adopted as a production-standard security control.",
    tags: ["Node.js", "Security", "SDK", "Production"],
  },
];

export const personalProjects = [
  {
    name: "Transaction Link Generator",
    link: "https://github.com/meetjn/Transaction-link-generator",
    isLive: false,
    summary:
      "Secure React + AWS application generating one-click MetaKeep transaction links with complete audit logging.",
    highlight:
      "CI/CD through GitHub Actions reduced deployment time by 90%; hosted on EC2 with auto-deploy on merge.",
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
  languages: ["Go", "Rust", "Solidity"],
  frontend: ["TypeScript", "Next.js", "React"],
  backend: ["Node.js", "Prisma", "MongoDB"],
  blockchain: ["Ethereum", "Solana", "Foundry", "Hardhat", "Uniswap v3", "SPL"],
  infrastructure: [
    "Docker",
    "Terraform",
    "Linux",
    "CI/CD",
    "AWS EC2",
    "AWS KMS",
    "AWS Nitro Enclaves",
    "GitHub Actions",
  ],
  databases: ["PostgreSQL", "Redis"],
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
    "I build protocol and application infrastructure end-to-end: lending systems, wallet/payment rails, and secure backend architecture for high-stakes products. Available for remote founding or senior engineering roles.",
  actions: [
    {
      label: "Book a 15-min sync",
      href: getCalendlyBookingUrl(),
    },
    {
      label: "Email me",
      href: "mailto:meetjaiin@gmail.com",
    },
  ],
};
