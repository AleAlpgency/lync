# LYNC: Project Instructions

Website for LYNC (lyncevents.com), Rebecca Nolan's women-only friendship community in Madrid: IRL events, retreats, study abroad services, city guides. SYP engagement, completed and handed off; the repo now gets occasional touch-ups only (last commit 2026-07-05: frame-ancestors allowlist so faca-studio.com can embed the site as a work-index hover preview). Next.js 16 App Router on Vercel, Sanity CMS (embedded studio at `/studio`), Acuity events, Airtable quiz leads, Claude-powered admin blog generation.

## Read these first

- `docs/memory.md` : project memory (people, page status, design tokens, component inventory).
- `docs/branding.md` : brand guide (logo, palette, voice).
- `docs/decisions.md` : ADRs (why no Supabase in phase 1, font decisions, Acuity/Shopify kept).
- `docs/roadmap.md` and `docs/updates.md` : phase status and session-by-session change log.

## Hard rules

- **Deploys run from the client's own Vercel account.** The accidental link to the personal Vercel account was removed 2026-05-16. Never relink this repo to the personal account.
- **Keep the frame-ancestors allowlist** in `next.config.ts` (self + faca-studio.com + localhost:3000) when touching headers. It replaced X-Frame-Options: DENY on purpose.
- Server-only secrets (Acuity, Airtable PAT, Sanity token, ADMIN_PASSWORD, ANTHROPIC_API_KEY) never get a `NEXT_PUBLIC_` prefix. `.env.example` is the committed reference; real values in `.env.local`.
- Community photos live in `public/brand/COMMUNITY/` with descriptive filenames. Use ffmpeg for webp resizing (macOS `sips` cannot handle webp). Portrait images in landscape containers need `object-top` or `object-center` to keep faces visible.

## Conventions

- Site pages under `src/app/(site)/`; admin under `src/app/admin`; API routes: `api/admin/{generate-post,login,publish-post}` (Claude blog pipeline), `api/leads` (Airtable), `api/webhooks/sanity` (revalidation).
- Content data files in `src/data/` (faq, testimonials, why-lync). Layout width helper `PAGE_SHELL` in `src/lib/page-shell.ts`.
- Color tokens in `src/app/globals.css`: `--color-lync` #3679F1, `--color-cream` #F3EFE7, `--color-dark` #0a0a0a.
- Fonts: Mona Sans for nav and headings, Playfair Display for the homepage hero H1 only, Inter for body (placeholders until the client's Mogena/Avenir files land).

## Stack deltas from global defaults

- Motion library is `motion` (Framer Motion successor), NOT GSAP + Lenis.
- Sanity is the CMS (next-sanity 12, studio embedded); no Supabase (deliberate, ADR-002).
- No docs trio (PROJECT-BRIEF/DESIGN/FACTS); this project predates it. `docs/memory.md` + `docs/branding.md` fill that role.

## Commands

```bash
npm run dev          # next dev --turbopack
npm run build        # next build
npm run lint         # eslint src/
npx tsc --noEmit     # typecheck (no script)
```

Done = lint + typecheck + build all pass, fresh, exit codes read.

## Status

- Completed and handed off (vault Notion status: Completed). Maintenance touch-ups only.
- Live on Vercel at lync-orcin.vercel.app; client domain is lyncevents.com.
- Blog runs on Sanity + the admin AI generation/publish routes.
- Note: the vault index (written retroactively) says the repo lives on the VPS only; this local repo has the current history through 2026-07-05. Trust the repo, flag the drift if it matters.

## Vault

- Index: `~/Vault/Areas/Clients/Lync/Lync.md` (+ `_context/`, `Notes/`).
- Lessons: `tasks/lessons.md` (does not exist yet; create it on the first correction, read it at session start once it does).
