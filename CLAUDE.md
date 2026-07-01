# CLAUDE.md — Revenue Architects (firm site)

Context for any Claude instance or designer working in this repo.

## What this is

This is the **firm site: revenuearchitects.com**. It sells the *team and the
services*. It is **not** the method site.

- **revenuearchitects.com** (this repo) — the firm. Who we are, the authors,
  the three service lines, and the path to engage. Buyer-facing, conversion-
  oriented.
- **revenuearchitecture.com** (separate site) — the method/idea. The book, the
  Diagnostic, the canon, and the community. We link to it; we do not duplicate
  it here.

> Scaffold authored to hand off to Laura for design + features, then return to
> John's control.

## Guardrail

Do **not** duplicate the method site's Diagnostic or canon content here. When
the site needs to reference the method (three layers, plays, agents, the
Diagnostic), **link out to revenuearchitecture.com**. This site stays focused
on the firm and its services.

## Brand tokens (single source of truth: `tailwind.config.mjs`)

Never hard-code hex values in pages or components — use the token classes.

- **orange** (Revenue Strategy / CTAs) — DEFAULT `#D96F42`; shades 100–900
  (`#F9E9E3 #F3D1C3 #ECB7A0 #E49A7B #D96F42 #B65F3D #925038 #6F4033 #4B302E`).
- **navy** (Revenue Platform / headings & structure) — DEFAULT `#1F3864`;
  shades 100–900 (`#DDE1E8 #B7BFCD #8F9CB2 #627492 #1F3864 #1D3259 #1B2C4E
  #192743 #172137`).
- **teal** (Revenue Production / secondary) — DEFAULT `#007B80`; shades 100–900
  (`#D9EBEC #ADD5D6 #80BDC0 #4CA3A6 #007B80 #046970 #075760 #0B464F #0E343F`).
- **ink** `#3A3A4A` — body text (never pure black).
- **surface** `#FFFFFF` — background.
- Font: **Plus Jakarta Sans** (self-hosted via `@fontsource`), fallback Aptos,
  system-ui.
- `maxWidth.content` 1280px, `maxWidth.prose` 72ch, `borderRadius.card`
  0.75rem, `spacing.section` 6rem.

## Voice rules

Professional, senior, plain. Zero buzzwords. Active and structural. Confident,
not salesy. Short sentences welcome.

Banned words: unpack, dive in, delve, tap into, seamless, revolutionize,
fast-paced.

## RAOS canon basics (for reference — do not reproduce in full here)

- Three layers, nine playbooks, twenty-seven plays, five Operating Agents.
- Tagline: **"Human-Orchestrated. AI-Operated."**
- **FACT** qualification = **F**it, **A**uthority, **C**riteria, **T**imeline (per Canon v1.3.0 / Play 8.1). Criteria = what the buyer needs and how it judges success. (Competition moved to Play 8.2; "Capacity/Timing" is a non-canon variant — do not use.)

## The three service lines

1. **Certification** — Become a Certified Revenue Architect™. License the
   method, get skill files + badge, deploy with bench support. Buyers:
   practitioners, single-shingle consultants, small consultancies.
2. **Training** — Train-the-trainer and team enablement on RAOS for in-house
   revenue orgs and agencies.
3. **Engagement** — The authors design *and* operate the architecture. Two
   modes: advisory-led (we architect, you run) and operated/done-with-you (we
   run it with agents under our orchestration). Limited slots.

Design and operate are unified because RAOS is human-orchestrated and
AI-operated — a small author-led team can do both.

## FACT Intake — phase 2

The **FACT Intake** (an agentic scoping conversation that runs the FACT
qualification) is **phase 2**. It is not built yet. The home page and `/engage`
mark it "coming soon" and route to the placeholder contact form on `/engage`.
The form has no backend — see the comment in `src/pages/engage.astro`.

## Stack & structure

- Astro 4.x (static output to `dist/`) + Tailwind via `@astrojs/tailwind`.
- `src/layouts/Base.astro` — head/SEO, skip link, Nav, Footer.
- `src/components/` — `Nav.astro`, `Footer.astro`, `Card.astro`,
  `CtaBlock.astro`.
- `src/pages/` — `index`, `about`, `services`, `proof`, `engage`, `404`.
- `src/styles/global.css` — font imports + Tailwind layers.
- Deploys to Cloudflare Pages (`wrangler.toml`).
