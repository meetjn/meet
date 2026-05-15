export const site = {
  name: "Meet Jain",
  role: "Co-founder · CTO · Protocol Engineer",
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
      "I don't ship features — I internalize the problem space. Crypto lending, payment rails, wallet security — I go deep until I understand the threat model, the incentive structure, the edge cases that kill companies. Then I build.",
  },
  {
    number: "02",
    title: "Zero-to-Production Speed",
    description:
      "From zero to a crypto onramp used in a NASDAQ acquisition. From zero to a lending protocol with disciplined on-chain execution and automated risk workflows. Most engineers prototype. I ship.",
  },
  {
    number: "03",
    title: "System-Level Thinking",
    description:
      "I see the whole board — protocol layer, application layer, DevOps, security architecture. When I build lending infrastructure I think about liquidation economics, custody boundaries, reconciliation, and observable decision trails simultaneously.",
  },
  {
    number: "04",
    title: "High-Stakes Calm",
    description:
      "The work I do has real financial consequence — bad debt, flash-loan exploits, acquisition validators. I operate with the same focus under pressure as I do at 2am with no deadline. That's not a work habit. It's character.",
  },
  {
    number: "05",
    title: "Ownership Instinct",
    description:
      "I've never handed a problem back with \"that's not my area.\" Wallet Isolation, open-source gas optimization, fiat-to-token rails — I find the gap, understand it, and close it. Not because someone asked, but because leaving it open bothers me.",
  },
  {
    number: "06",
    title: "Compounding Trajectory",
    description:
      "One year: intern contributing to quantum-resistant L1 smart contracts. Two years: CTO of a production-grade DeFi protocol. The velocity isn't luck — it's what happens when someone is genuinely, deeply in love with the craft.",
  },
] as const;

export const experience = [
  {
    period: "Apr 2026 – Now",
    tag: "Co-founder · CTO",
    role: "Revalon Finance",
    website: "https://revalon.finance",
    company: "Protocol Engineering · DeFi Infrastructure",
    points: [
      "Led architecture for a lending protocol on Polygon: Solidity across multiple contracts, guarded execution paths, and operational controls (timelock, multisig). Shipped full testnet lifecycle with disciplined collateral and liquidation practice.",
      "Built Go services for underwriting and dynamic LTV — multi-signal inputs, auditable outputs, and PostgreSQL trails suitable for downstream analytics and diligence.",
      "Delivered marketplace mechanics bridging lenders and borrowers: dynamic rate regimes, automated monitoring, and a staged margin workflow aligned with protocol constraints.",
      "Integrated hybrid on-chain/off-chain collateral from crypto and regulated venues with encryption and KMS-aware key handling. Architecture and integrations available under NDA.",
    ],
    impact: "Testnet-complete protocol · Risk discipline",
  },
  {
    period: "Apr 2025 – May 2026",
    tag: "Senior Engineer",
    role: "MetaKeep (Acquired)",
    website: "https://metakeep.xyz",
    company: "Rezolve AI · NASDAQ: RZLV",
    points: [
      "Engineered the crypto payment integration that served as the primary technical validator for MetaKeep's acquisition by Rezolve AI (NASDAQ: RZLV). Sign-up-free transactions in a chatbot UI for luxury retail — shipped March 2026.",
      "Led Wallet Isolation, an enterprise security feature enforcing per-app key segregation. Reduced pre-production bugs by 40%. Adopted as a production standard across the MetaKeep SDK.",
      "Built MetaKeep's crypto onramp from zero — integrated Coinbase API with zero-fee, sign-up-free UX. Architected a MoonPay → Jupiter fiat-to-token swap rail with auto-deposit into MetaKeep wallets.",
      "Shipped 8 SDK integration demos (6 Android, 2 iOS) covering Solana and Ethereum flows — used as developer documentation and enterprise sales tooling.",
    ],
    impact: "NASDAQ acquisition validator · 40% defect drop",
  },
  {
    period: "Oct 2024 – Mar 2025",
    tag: "Blockchain Dev Intern",
    role: "Quranium",
    website: "https://quranium.org",
    company: "Quantum-Resistant Blockchain Infrastructure",
    points: [
      "Built an MVP decentralised exchange using Uniswap v3 and a multi-sig wallet for a quantum-resistant L1 blockchain.",
      "4 merged PRs to FairFund open-source smart contracts — reduced gas costs by 25%, fixed critical bugs, drove test coverage to 100% branch coverage.",
    ],
    impact: "25% gas reduction · 100% test coverage",
  },
] as const;

export const mentors = [
  {
    name: "WhatsApp Pay",
    role: "Global payments infrastructure · Billions of users",
  },
  {
    name: "Diem Blockchain (Meta)",
    role: "Facebook's stablecoin & distributed ledger project",
  },
  {
    name: "Twitter Social Graph",
    role: "Distributed systems at social-media scale",
  },
] as const;

export const stackGroups = [
  {
    title: "Systems & Protocol",
    items: ["Go", "Rust", "Solidity", "PostgreSQL", "Redis", "AWS Nitro Enclaves"],
  },
  {
    title: "Application Layer",
    items: ["TypeScript", "Next.js", "React", "Node.js", "Prisma", "MongoDB"],
  },
  {
    title: "Blockchain",
    items: [
      "Ethereum / Polygon",
      "Solana / SPL",
      "Foundry / Hardhat",
      "Uniswap v3",
      "Chainlink",
      "OpenZeppelin",
    ],
  },
  {
    title: "Infrastructure",
    items: [
      "Docker / Terraform",
      "AWS KMS",
      "GitHub Actions CI/CD",
      "AWS EC2 / Linux",
      "OZ Defender",
      "Gnosis Safe",
    ],
  },
] as const;
