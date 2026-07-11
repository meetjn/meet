# Project rules for AI tools (and humans)

## Package manager: pnpm ONLY — this is non-negotiable

This project uses **pnpm** exclusively. **Never** use `npm` or `yarn` for
anything — not to install, not to run scripts, not to add packages.

- Install dependencies: `pnpm install`
- Add a package: `pnpm add <pkg>` (dev: `pnpm add -D <pkg>`)
- Run scripts: `pnpm dev`, `pnpm build`, `pnpm start`, `pnpm lint`
- The only lockfile is `pnpm-lock.yaml`. Never create or commit
  `package-lock.json`, `yarn.lock`, or `npm-shrinkwrap.json` — they are
  gitignored, and a `preinstall` guard (`only-allow pnpm`) makes `npm`/`yarn`
  installs fail on purpose.

### Do not "get rid of" node_modules — manage it correctly instead
`node_modules` is unavoidable: pnpm (like every JS package manager) needs it,
and Next.js cannot build without it. That is fine. The rule is:
`node_modules` is **disposable and git-ignored** — never commit it, never edit
inside it, never treat a broken `node_modules` as data loss. If it is ever
missing or corrupted, just run `pnpm install` and it rebuilds in seconds from
pnpm's content-addressed store.

## Keep this repo OUT of iCloud sync

History: this folder once lived under an iCloud-synced Desktop. When the disk
filled, iCloud "Optimize Storage" evicted file contents into zero-byte
placeholders ("dataless" files). Reading one forces an on-demand download; with
sync offline, tools like `tsc` **deadlocked at 0% CPU** waiting forever. If you
ever see a build/typecheck hang with no CPU usage, suspect evicted files —
check with `ls -lO <file>` (look for the `dataless` flag), and reinstall
(`rm -rf node_modules && pnpm install`) or move the project off iCloud.

Prefer keeping this project in a non-synced location (e.g. `~/dev/`, or a
folder excluded from iCloud). Do not re-enable iCloud "Desktop & Documents"
sync for this repo.

## Verifying changes

- Typecheck: `pnpm exec tsc --noEmit`
- Production build: `pnpm build`
- Dev server: `pnpm dev` (port 3000)
