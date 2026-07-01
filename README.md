# Revenue Architects — revenuearchitects.com

The firm site for Revenue Architects, the practitioner team behind Revenue
Architecture® and RAOS (the Revenue Architecture Operating System). This site
sells the team and the services. The method/idea lives on the separate site,
**revenuearchitecture.com**.

> **STATUS: starter scaffold — content framed, design intentionally minimal,
> FACT Intake and backend are TODO.**

## Stack

- [Astro](https://astro.build) 4.x — static output to `dist/`
- Tailwind CSS via `@astrojs/tailwind` (brand tokens in `tailwind.config.mjs`)
- Plus Jakarta Sans, self-hosted via `@fontsource/plus-jakarta-sans`
  (fallback Aptos, system-ui)
- Node 18+

## Develop

```bash
npm install     # install dependencies
npm run dev      # local dev server
npm run build    # build static site to dist/
npm run preview  # preview the built site
```

## Deploy (Cloudflare Pages)

The repo includes `wrangler.toml` (`name = "revenuearchitects"`,
`pages_build_output_dir = "dist"`).

```bash
npm run build
npx wrangler pages deploy dist --project-name=revenuearchitects
```

## Structure

```
src/
  layouts/Base.astro          # head, SEO, skip link, Nav + Footer
  components/                 # Nav, Footer, Card, CtaBlock
  pages/                      # index, about, services, proof, engage, 404
  styles/global.css           # font imports + Tailwind layers
public/favicon.svg
tailwind.config.mjs           # brand tokens — single source of truth
astro.config.mjs
wrangler.toml
CLAUDE.md                     # context for Claude / the designer (Laura)
```

## TODO (for the team / Laura)

- Design pass over the whole site (this scaffold is intentionally minimal).
- **FACT Intake (phase 2):** build the agentic scoping conversation. Today the
  `/engage` form is a non-functional placeholder with no backend.
- Confirm the author bios on `/about` ([bio to confirm]).
- Add real case studies and the Certified Architect directory on `/proof`
  ([case study to add], [directory to add]).
- Wire the contact form to a real handler/CRM.

See `CLAUDE.md` for brand tokens, voice rules, and the two-site model.
