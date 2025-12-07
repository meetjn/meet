export const identity = {
  name: "Meet Jain",
  role: "Full Stack × Blockchain Engineer",
  headline:
    "I build consumer-grade crypto journeys for YC-scale companies—shipping payment rails, wallets, and security systems that feel invisible.",
  location: "San Francisco · Remote friendly",
  email: "meetjaiin@gmail.com",
  phone: "+91 88549 28428",
  github: "https://github.com/meet-metakeep",
  linkedin: "https://www.linkedin.com/in/meetjaiin",
  availability: "Open to YC-backed teams moving fast on crypto or fintech infra.",
};

export const heroSignals = [
  "Coinbase + MetaKeep fiat on-ramp shipped zero to prod",
  "Wallet isolation launch cut pre-prod bugs by 40%",
  "8 SDK demo apps live across Android & iOS",
  "FairFund contracts: 100% coverage, gas down 25%",
];

export const stats = [
  {
    value: "0-fee",
    label: "Retail on-ramp",
    detail: "Coinbase API + MetaKeep SDK experience for first-time buyers.",
  },
  {
    value: "40%",
    label: "Fewer pre-prod bugs",
    detail: "Wallet Isolation hardened enterprise custody rollouts.",
  },
  {
    value: "8 apps",
    label: "SDK demo suite",
    detail: "6 Android + 2 iOS showcasing Solana/EVM flows.",
  },
  {
    value: "100%",
    label: "Smart-contract coverage",
    detail: "AOSSIE FairFund suite with 25% gas savings.",
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
      "Led the MVP of a DEX on Uniswap v3 primitives plus a multi-sig treasury.",
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
    link: "https://github.com/meet-metakeep/Transaction-Link-Generator",
    summary:
      "Secure React + AWS app that creates one-click MetaKeep transaction URLs with full audit logging.",
    highlight: "CI/CD via GitHub Actions brought deploys down by 90%.",
    stack: ["TypeScript", "React", "AWS EC2", "GitHub Actions"],
  },
  {
    name: "DeFi Stable Coin",
    link: "https://github.com/meet-metakeep/defi-stable-coin",
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
    org: "AOSSIE · FairFund",
    contribution:
      "Cut gas by 25%, fixed critical bugs, and drove coverage to 100% across the FairFund contracts.",
    link: "https://github.com/AOSSIE",
  },
];

export const contact = {
  headline: "Building something ambitious?",
  pitch:
    "YC-scale companies get a partner who can ship regulated on-ramps, wallets, and smart-contract systems without slowing growth.",
  actions: [
    { label: "Book a 15-min sync", href: "mailto:meetjaiin@gmail.com?subject=Let%27s%20ship%20crypto%20infra" },
    { label: "View GitHub", href: "https://github.com/meet-metakeep" },
  ],
};

