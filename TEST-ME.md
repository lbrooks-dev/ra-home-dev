# ra-home-demo — RA's real site + MyFolio bridge (for testing)

This is RA's actual Astro project (their tokens, fonts, components) with the
MyFolio bridge added. Two pages build:
  /            → RA's real hand-built home (index.astro)
  /home-demo   → your MyFolio content.md, rendered through RA's components/tokens

## Test it on your ra-home-demo Cloudflare project
1. In your ra-home-demo repo, delete the OLD project files first (everything
   except the .git folder) so nothing stale lingers.
2. Copy ALL of these files into the repo (package.json at the top level).
3. Commit + push in GitHub Desktop. Cloudflare rebuilds (build: npm run build, output: dist).
   - If the build complains about Node, set NODE_VERSION=20 in the Pages project env vars.
4. Visit ra-home-demo.pages.dev/  (RA's real home) and ra-home-demo.pages.dev/home-demo
   (your MyFolio content in RA's styling). They share the same stylesheet.

## The loop going forward
content.md at the repo root is your MyFolio export. MyFolio's "Publish to
repository" overwrites it; push, and /home-demo updates. (Point the repo folder
in MyFolio's publish dialog at this repo.)

Nothing here touches RA's live site — this is your copy in your repo.
