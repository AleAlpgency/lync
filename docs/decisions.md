# LYNC — Architectural Decisions

## ADR-001: Next.js 15 over WordPress
- **Date:** March 29, 2026
- **Decision:** Replace WordPress + Elementor with Next.js 15 (App Router)
- **Rationale:** Custom design, better performance, full control over data flow, Vercel deployment
- **Consequences:** Need to recreate all pages, but gain flexibility for quiz funnel + future integrations

## ADR-002: No Supabase in Phase 1
- **Date:** March 30, 2026
- **Decision:** Build frontend-only first, add Supabase later
- **Rationale:** Focus on visual rebuild + quiz UX before connecting backend
- **Consequences:** Quiz data stored client-side only for now, lead capture not functional until Phase 2

## ADR-003: Keep Acuity + Shopify (for now)
- **Date:** March 29, 2026
- **Decision:** Don't replace Acuity or Shopify yet — webhook into Supabase later
- **Rationale:** Working integrations, replacing them adds scope. Connect via webhooks first.
- **Consequences:** Events page will link to Acuity externally until Phase 3

## ADR-004: Placeholder fonts (Playfair Display + Inter)
- **Date:** March 30, 2026
- **Decision:** Use Playfair Display (display) and Inter (body) as placeholders for Mogena and Avenir
- **Rationale:** Mogena is a premium/custom font. Playfair Display captures similar editorial/serif energy. Boss can swap in Mogena when font files are available.
- **Update (March 31, 2026):** Playfair is no longer the global display font. See ADR-005.

## ADR-005: Mona Sans for titles; Playfair only on hero headline
- **Date:** March 31, 2026
- **Decision:** Use Mona Sans (`font-nav`, Google Fonts) for navigation, all marketing section titles, and default semantic headings (`h1–h6` base styles in `globals.css`). Reserve Playfair Display (`font-display`) for the **homepage hero `<h1>` only**. Non-hero titles use **uppercase**, **`font-semibold`**, and **`tracking-normal`** (wider tracking was tried with `tracking-wide` and reverted).
- **Rationale:** Keeps nav and titles in one sans voice; a single serif hero line preserves editorial emphasis without mixing display fonts across the page. Tighter letter-spacing reads better for long uppercase lines.
- **Consequences:** Inner pages and section headers render in Mona Sans. Hero remains visually distinct. Quiz question copy stays sentence case (semibold only, no forced uppercase).

## ADR-006: Static retreat data over Acuity for curated retreats
- **Date:** April 8, 2026
- **Decision:** Curated retreats (like Solstice) are defined as static data in `src/data/retreats.ts` with their own detail pages (`/retreats/[slug]`), rather than relying solely on Acuity API events. Booking URLs point directly to the specific Acuity appointment.
- **Rationale:** Retreats need rich content (itinerary, founder story, inclusions, bento photo grid) that Acuity's API can't provide. Static data allows full creative control over the detail page while still linking to Acuity for booking.
- **Consequences:** New retreats require adding data to `retreats.ts`. The events page (`/events`) shows only Acuity events — retreats live exclusively on `/retreats`.

## ADR-007: Sticky CTA bar with scroll-aware visibility
- **Date:** April 8, 2026
- **Decision:** Retreat detail pages have a fixed bottom CTA bar that shows after scrolling past the hero and hides when the in-page pricing section or bottom CTA is in viewport. Uses `data-sticky-cta` attribute on `<html>` to coordinate with the WhatsApp FAB.
- **Rationale:** Keeps booking action always accessible during long-scroll content, but avoids visual duplication when the user reaches the actual pricing/CTA sections.
- **Consequences:** WhatsApp FAB uses a MutationObserver to shift up when the sticky bar is visible. Any future fixed bottom elements need to account for this z-index stacking.

## ADR-008: Postgres for member card scans
- **Date:** October 9, 2026
- **Decision:** Partner scans of member cards are logged in a Postgres database (Neon, attached to Rebecca's Vercel project as `DATABASE_URL`). Schema and partner seed live in `db/schema.sql`; Rebecca reads the log at `/admin/scans`. Partners are identified by a per-partner PIN stored in a cookie on the staff phone.
- **Rationale:** Rebecca asked for a real database behind her own dashboard rather than Airtable. This is the first data the site writes itself, which ADR-002 deferred until there was a need.
- **Consequences:** Partners (name, category, deal, optional online code, visibility) live only in the `partners` table. Rebecca adds or hides them at `/admin/scans`; the membership page reads them (revalidated on change) and online codes show only on active members' card pages. Schema changes go in numbered files under `db/` and are run once in the Vercel Storage Query tab.
