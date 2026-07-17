# meetjain.xyz

Personal writing site — backend engineering and distributed systems, with hand-drawn diagrams. Live at [meetjain.xyz](https://meetjain.xyz).

## Tech stack

This repo is a **TypeScript** application. The site is built and run with **Node.js** and **pnpm** — there is no Go toolchain here.

| Layer | Choice |
|-------|--------|
| Framework | [Next.js 16](https://nextjs.org) (App Router, React 19) |
| Language | **TypeScript** (compiled by `tsc` / Next.js at build time) |
| Styling | Tailwind CSS 3, shadcn-style UI primitives |
| Content | MDX articles in `src/content/articles/` |
| Database | Neon Postgres (newsletter subscribers) |
| Email | Resend (welcome email on subscribe) |
| Deploy | Vercel |

**Go in articles:** Some posts include Go code samples (e.g. payment idempotency). That is **article content** inside `.mdx` files, not part of this site's build. You do not need Go installed to clone, develop, or deploy this project.

## Prerequisites

- Node.js **≥ 20**
- [pnpm](https://pnpm.io) **≥ 9** (required — `npm` / `yarn` are blocked by `preinstall`)

## Clone and run locally

```bash
git clone https://github.com/meetjn/meet.git
cd meet
pnpm install
```

Copy environment variables for newsletter + DB (optional for reading articles; required for `/api/subscribe`):

```bash
# Create .env.local with:
# DATABASE_URL=postgresql://...   # Neon connection string
# RESEND_API_KEY=re_...
# RESEND_FROM=Meet Jain <hello@meetjain.xyz>
```

```bash
pnpm dev          # http://localhost:3000
pnpm exec tsc --noEmit   # typecheck
pnpm build        # production build
pnpm start        # serve production build
```

## Folder structure

```
meet/
├── public/                 # Static assets (sw.js, llms.txt, author photo)
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── api/subscribe/  # Newsletter POST handler
│   │   ├── writing/[slug]/ # Article pages (SSG)
│   │   ├── layout.tsx      # Root layout, metadata, fonts
│   │   ├── page.tsx        # Homepage / writing index
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── rss.xml/        # RSS feed route
│   ├── components/
│   │   ├── writing/        # Article UI (TOC, meta rail, MDX, sketches)
│   │   ├── site/           # Nav, etc.
│   │   ├── sketch/         # Hand-drawn diagram primitives
│   │   └── ...
│   ├── content/
│   │   ├── articles/       # *.mdx — source of truth for posts
│   │   └── site.ts         # Name, links, bio constants
│   └── lib/
│       ├── articles.ts     # Frontmatter, TOC, listing
│       ├── render-mdx.tsx  # MDX compile pipeline
│       ├── db.ts           # Neon subscriber storage
│       └── seo.ts          # JSON-LD, site metadata
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

**Adding or fixing an article:** edit or add a file under `src/content/articles/*.mdx`. Frontmatter fields (`title`, `description`, `date`, `tags`, etc.) are defined in `src/lib/articles.ts`.

## Contributing (pull requests)

Spotted a typo, broken diagram, or unclear explanation? PRs are welcome.

1. Fork [meetjn/meet](https://github.com/meetjn/meet) (or branch from `main` if you have write access).
2. Create a branch: `git checkout -b fix/your-topic`
3. Make your change (often a single `.mdx` file or a small component fix).
4. Verify locally:
   ```bash
   pnpm exec tsc --noEmit
   pnpm build
   ```
5. Commit with a clear message and open a PR against `main`.

Article pages also link to [open a pull request](https://github.com/meetjn/meet/pulls) for corrections.

## Deploy

Production deploys run on Vercel (`pnpm build`). Set `DATABASE_URL`, `RESEND_API_KEY`, and `RESEND_FROM` in the Vercel project environment (no quotes around values). See `CLAUDE.md` for pnpm-only and iCloud path notes if developing on macOS.
