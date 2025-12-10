export const identity = {
  name: "Meet Jain",
  role: "Full Stack × Blockchain Engineer",
  headline:
    "I build production grade web apps and payment flows for fast moving teams — from SaaS dashboards to crypto rails.",
  location: "India · Remote friendly",
  email: "meetjaiin@gmail.com",
  phone: "+91 88549 28428",
  github: "https://github.com/meet-metakeep",
  linkedin: "https://www.linkedin.com/in/meetjaiin",
};

export const heroSignals = [
  "Coinbase + MetaKeep fiat on-ramp shipped zero to prod",
  "Wallet isolation launch cut pre-prod bugs by 40%",
  "8 SDK demo apps live across Android & iOS",
  "FairFund contracts: 100% coverage, gas down 25%",
];

export const stats = [
  {
    value: "L1 ↔ UI",
    label: "Technical Depth",
    detail: "From raw Solidity bytes to pixel-perfect React framer motion.",
  },
  {
    value: "Rapid",
    label: "Ship Cadence",
    detail: "Bias for action. Deploying production features weekly.",
  },
  {
    value: "Zero-Friction",
    label: "User Experience",
    detail:
      "Designing flows where users see clean dollars and outcomes, not wallets and gas.",
  },
];

export const experience = [
  {
    company: "MetaKeep",
    title: "Full Stack Blockchain Engineer",
    timeline: "Apr 2025 – Present · San Francisco (Remote)",
    summary:
      "Shipped revenue-facing onramps and hardened wallet infra for strategic partners.",
    impact: [
      "Designed Coinbase-powered on-ramp that removed KYC sign-ups and let users buy crypto in 2 taps.",
      "Launched Wallet Isolation, segmenting enterprise custodial flows and cutting pre-production defects by 40%.",
      "Built MoonPay → Jupiter swapper that auto-deposits LOOK tokens into MetaKeep wallets.",
      "Created an SPL delegation system for gasless USDC transfers without repeat approvals.",
    ],
    stack: ["TypeScript", "Next.js", "Solana", "Ethereum", "Coinbase API", "SPL"],
  },
  {
    company: "Quranium L1",
    title: "Blockchain Developer Intern",
    timeline: "Oct 2024 – Mar 2025 · Remote",
    summary:
      "Led the MVP of a DEX using Uniswap v3 contracts and a multi-sig wallet.",
    impact: [
      "Implemented concentrated-liquidity swaps with automated position rebalancing.",
      "Shipped production-ready multisig wallet so the protocol could self-custody fees.",
      "Hardened smart-contract surface with Foundry fuzz + invariant tests.",
    ],
    stack: ["Solidity", "Foundry", "Uniswap v3", "Hardhat"],
  },
];

export const keystoneBuilds = [
  {
    title: "MetaKeep Onramp",
    metric: "1st purchase in <45s",
    description:
      "Greenfield Coinbase Commerce + MetaKeep SDK integration that let retail users buy assets with no sign-up and zero fees.",
    proof: "Designed flow, API choreography, and authentication gates; production launch now powering strategic partner pilots.",
    tags: ["Next.js", "Coinbase API", "Serverless"],
  },
  {
    title: "Wallet Isolation",
    metric: "40% defect drop",
    description:
      "Enterprise-grade isolation layer that sandboxed wallet state per partner to block regression bleed-through.",
    proof: "Reduced pre-production bugs by 40% while keeping deploy cadence weekly.",
    tags: ["Node.js", "PostgreSQL", "Observability"],
  },
  {
    title: "MoonPay × Jupiter LOOK Rail",
    metric: "Card → token in 1 flow",
    description:
      "Fiat-to-LOOK on-ramp that chained MoonPay card purchases with Jupiter swaps, auto-depositing tokens into MetaKeep wallets.",
    proof: "Delivered for a strategic partner to unlock marketing campaign rewards.",
    tags: ["Solana", "MoonPay", "Jupiter", "Automation"],
  },
];

export const personalProjects = [
  {
    name: "Transaction Link Generator",
    link: "https://github.com/meetjn/Transaction-link-generator",
    summary:
      "Secure React + AWS app that creates one-click MetaKeep transaction URLs with full audit logging.",
    highlight: "CI/CD via GitHub Actions brought deploys down by 90%.",
    stack: ["TypeScript", "React", "AWS EC2", "GitHub Actions"],
  },
  {
    name: "DeFi Stable Coin",
    link: "https://github.com/meetjn/Defi-Protocol",
    summary:
      "Collateralized lending protocol with dynamic interest bands and on-chain auditing.",
    highlight: "Foundry-based test harness covering liquidation edges and rate shifts.",
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
    name: "Developer-sponsor-gas-SVM",
    description: "Vercel app showcasing sponsored gas flows on Solana.",
  },
];

export const openSource = [
  {
    org: "StabilityNexus · FairFund · Coverage",
    contribution:
      "Cut gas by 25%, fixed critical bugs, and drove coverage to 100% across the FairFund contracts.",
    link: "https://github.com/StabilityNexus/FairFund/pull/74",
  },
  {
    org: "StabilityNexus · FairFund · FundingVault",
    contribution:
      "Earlier refactors and improvements that hardened FundingVault and reduced gas costs.",
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
    "Whether you’re building fintech, SaaS, or web3, I partner with founders and execs to quietly own wallets, payments, and smart-contract systems end-to-end so your team can stay focused on product and distribution.",
  actions: [
    {
      label: "Book a 15-min sync",
      href: "https://calendly.com/meetjaiin/30min",
    },
  ],
};



