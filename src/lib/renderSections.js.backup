// renderSections.js — the SHARED renderer.
// One plain-JS function that turns MyFolio sections into the exact HTML markup
// the live RA site produces (mirrors MyFolioRender.astro + Card.astro +
// CtaBlock.astro). The Astro site and the styler/preview both call this, so the
// preview can never drift from the real thing. Pair it with the site's real
// compiled CSS and the output looks identical to production.
//
// Input: an array of parsed sections, each shaped like parseContent.js returns:
//   { type, eyebrowStyle, tone, eyebrow, heading, paras[], items[], links[], id? }
// Output: an HTML string (a sequence of tone-wrapped <div> section bands).

const escMap = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const esc = (v) => String(v == null ? "" : v).replace(/[&<>"']/g, (c) => escMap[c]);
const isExt = (href) => /^https?:/i.test(href || "");

// CTA Banner palettes (ported verbatim from the styling demo).
const CTA_COLORS = {
  orange: { fill: "#C44620", accent: "#C44620", tint: "#FBEFE9" },
  teal: { fill: "#007B80", accent: "#007B80", tint: "#E3F0EF" },
  navy: { fill: "#1F3864", accent: "#1F3864", tint: "#EAEEF5" },
  lightteal: { fill: "#E3F0EF", accent: "#007B80", tint: "#E3F0EF" },
};
const BTN_COLORS = { white: "#FFFFFF", orange: "#C44620", teal: "#007B80", navy: "#1F3864" };
const STYLE_BG = { light: "#FFFFFF", neutral: "#EEF1F6", dark: "#17294F" };
// One CTA button: type is solid | outline | link; bcKey picks the color.
function ctaButton(href, label, type, bcKey) {
  const bc = BTN_COLORS[bcKey] || BTN_COLORS.navy;
  const h = esc(href), t = esc(label);
  if (type === "link") return `<a class="cta-btn cta-link" href="${h}" style="background:transparent;border:0;color:${bc}">${t} \u2192</a>`;
  if (type === "outline") return `<a class="cta-btn" href="${h}" style="background:transparent;color:${bc};border:1.5px solid ${bc}">${t}</a>`;
  const txt = bcKey === "white" ? "#1F3864" : "#FFFFFF";
  return `<a class="cta-btn" href="${h}" style="background:${bc};color:${txt};border:1.5px solid ${bc}">${t}</a>`;
}

// Eyebrow class per section (same rule as the site).
const ebClass = (s) =>
  s.eyebrowStyle === "letterspacing" ? "eyebrow-track" : s.eyebrowStyle === "default" ? "eyebrow-plain" : "eyebrow";

// Surface tone band. Intro sections default to neutral, everything else light.
const toneClass = (s) =>
  "tone-" + (["light", "neutral", "dark"].includes(s.tone) ? s.tone : s.type === "pageintro" ? "neutral" : "light");

// Text alignment (left default). center/right add a class; left adds nothing.
const alignClass = (s) => (s.align === "center" ? "align-center" : s.align === "right" ? "align-right" : "");

// Background treatment layered over the tone color (none default).
const bgClass = (s) => (s.bg === "grid" ? "secbg-grid" : s.bg === "gradient" ? "secbg-gradient" : "");

// Hero heading: **bold** spans render orange. Escape first, then wrap.
const heroHeading = (h) => esc(h).replace(/\*\*(.+?)\*\*/g, '<span class="text-orange">$1</span>');

const eyebrowP = (s) => (s.eyebrow ? `<p class="${ebClass(s)}">${esc(s.eyebrow)}</p>` : "");

// The RAOS three-layer diagram is fixed canon (not content-driven) — verbatim SVG.
const AUTHORITY_SVG = `<svg viewBox="0 0 720 416" role="img" aria-label="The three layers of the revenue architecture: Strategy, Platform, and Production, connected by a single orchestration spine." class="font-sans h-auto w-full" xmlns="http://www.w3.org/2000/svg">
  <g class="stroke-navy-100" stroke-width="1" opacity="0.6"><line x1="96" y1="8" x2="96" y2="412"></line><line x1="696" y1="8" x2="696" y2="412"></line></g>
  <line x1="60" y1="68" x2="60" y2="316" class="stroke-navy-200" stroke-width="2"></line>
  <g>
    <line x1="60" y1="68" x2="96" y2="68" class="stroke-navy-200" stroke-width="2"></line>
    <circle cx="60" cy="68" r="7" class="fill-orange-500"></circle>
    <circle cx="60" cy="68" r="13" class="fill-none stroke-navy-200" stroke-width="1.5"></circle>
    <rect x="96" y="16" width="600" height="104" rx="12" class="fill-surface stroke-navy-100" stroke-width="1.5"></rect>
    <rect x="96" y="16" width="6" height="104" class="fill-orange-500"></rect>
    <text x="124" y="50" class="fill-teal-600" font-size="13" font-weight="700" letter-spacing="1.5">LAYER I</text>
    <text x="124" y="82" class="fill-navy" font-size="26" font-weight="800">Revenue Strategy</text>
    <text x="124" y="106" class="fill-ink" font-size="14" font-weight="500">Market definition · value positioning · go-to-market</text>
    <g class="fill-orange-500"><rect x="672" y="40" width="8" height="8" rx="2" opacity="1"></rect><rect x="656" y="40" width="8" height="8" rx="2" opacity="0.72"></rect><rect x="640" y="40" width="8" height="8" rx="2" opacity="0.44"></rect></g>
  </g>
  <g>
    <line x1="60" y1="192" x2="96" y2="192" class="stroke-navy-200" stroke-width="2"></line>
    <circle cx="60" cy="192" r="7" class="fill-navy"></circle>
    <circle cx="60" cy="192" r="13" class="fill-none stroke-navy-200" stroke-width="1.5"></circle>
    <rect x="96" y="140" width="600" height="104" rx="12" class="fill-surface stroke-navy-100" stroke-width="1.5"></rect>
    <rect x="96" y="140" width="6" height="104" class="fill-navy"></rect>
    <text x="124" y="174" class="fill-teal-600" font-size="13" font-weight="700" letter-spacing="1.5">LAYER II</text>
    <text x="124" y="206" class="fill-navy" font-size="26" font-weight="800">Revenue Platform</text>
    <text x="124" y="230" class="fill-ink" font-size="14" font-weight="500">Brand system · revenue technology · operations</text>
    <g class="fill-navy"><rect x="672" y="164" width="8" height="8" rx="2" opacity="1"></rect><rect x="656" y="164" width="8" height="8" rx="2" opacity="0.72"></rect><rect x="640" y="164" width="8" height="8" rx="2" opacity="0.44"></rect></g>
  </g>
  <g>
    <line x1="60" y1="316" x2="96" y2="316" class="stroke-navy-200" stroke-width="2"></line>
    <circle cx="60" cy="316" r="7" class="fill-teal-500"></circle>
    <circle cx="60" cy="316" r="13" class="fill-none stroke-navy-200" stroke-width="1.5"></circle>
    <rect x="96" y="264" width="600" height="104" rx="12" class="fill-surface stroke-navy-100" stroke-width="1.5"></rect>
    <rect x="96" y="264" width="6" height="104" class="fill-teal-500"></rect>
    <text x="124" y="298" class="fill-teal-600" font-size="13" font-weight="700" letter-spacing="1.5">LAYER III</text>
    <text x="124" y="330" class="fill-navy" font-size="26" font-weight="800">Revenue Production</text>
    <text x="124" y="354" class="fill-ink" font-size="14" font-weight="500">Demand · opportunity · account expansion</text>
    <g class="fill-teal-500"><rect x="672" y="288" width="8" height="8" rx="2" opacity="1"></rect><rect x="656" y="288" width="8" height="8" rx="2" opacity="0.72"></rect><rect x="640" y="288" width="8" height="8" rx="2" opacity="0.44"></rect></g>
  </g>
  <text x="96" y="398" class="fill-navy" font-size="14" font-weight="700" letter-spacing="0.5">Human-Orchestrated. AI-Operated.</text>
</svg>`;

const CLIENT_LOGOS = [
  { alt: "Charles Schwab", file: "/logos/schwab.png" },
  { alt: "Natixis", file: "/logos/natixis.png" },
  { alt: "Directions", file: "/logos/directions.png" },
  { alt: "4R", file: "/logos/4r.png" },
  { alt: "Imprivata", file: "/logos/imprivata.png" },
  { alt: "Arcserve", file: "/logos/arcserve.png" },
  { alt: "Cognizant", file: "/logos/cognizant.png" },
];

const FEATURE_CARD_META = [
  { eyebrow: "Enablement", accent: "teal", cta: "See training", href: "/services#training" },
  { eyebrow: "Credential", accent: "orange", cta: "Become certified", href: "/services#certification" },
  { eyebrow: "With the authors", accent: "orange", cta: "Scope an engagement", href: "/engage" },
];
const CARD_ACCENT = { navy: "border-t-navy", teal: "border-t-teal", orange: "border-t-orange" };

// A content card (mirrors Card.astro).
function card({ title, eyebrow, href, cta, accent, body }) {
  const acc = CARD_ACCENT[accent] || "border-t-navy";
  return (
    `<article class="flex h-full flex-col rounded-card border border-navy-100 border-t-4 bg-surface p-6 shadow-sm ${acc}">` +
    (eyebrow ? `<p class="text-xs font-semibold uppercase tracking-wide text-teal">${esc(eyebrow)}</p>` : "") +
    `<h3 class="mt-1 text-xl">${esc(title)}</h3>` +
    `<div class="mt-3 flex-1 text-sm leading-relaxed text-ink">${esc(body)}</div>` +
    (href
      ? `<a href="${esc(href)}" class="mt-5 inline-flex items-center text-sm font-semibold text-orange transition-colors hover:text-orange-600">${esc(cta || "Learn more")} &rarr;</a>`
      : "") +
    `</article>`
  );
}

// Per-type section body builders. Each returns the inner <section> HTML.
function renderOne(s) {
  const paras = s.paras || [], items = s.items || [], links = s.links || [];

  if (s.type === "hero") {
    return (
      `<section class="relative overflow-hidden border-b border-navy-100 bg-grid">` +
      `<div class="mx-auto max-w-content px-6 py-20 md:py-28">` +
      eyebrowP(s) +
      `<h1 class="mt-4 max-w-4xl text-4xl leading-[1.05] md:text-6xl">${heroHeading(s.heading)}</h1>` +
      paras.map((p) => `<p class="mt-6 max-w-prose text-lg text-ink">${esc(p)}</p>`).join("") +
      (links.length
        ? `<div class="mt-8 flex flex-col gap-4 sm:flex-row">` +
          links
            .map(
              (l, i) =>
                `<a href="${esc(l.href)}" class="inline-flex items-center justify-center rounded-card px-6 py-3 text-sm font-semibold transition-colors ${
                  i === 0 ? "bg-orange text-surface hover:bg-orange-600" : "border border-navy text-navy hover:bg-navy hover:text-surface"
                }">${esc(l.label)}</a>`
            )
            .join("") +
          `</div>`
        : "") +
      `</div></section>`
    );
  }

  if (s.type === "stats") {
    return (
      `<section class="mx-auto max-w-content px-6 py-section">` +
      (s.heading ? `<h2 class="text-2xl md:text-3xl">${esc(s.heading)}</h2>` : "") +
      paras.map((p) => `<p class="mt-3 max-w-prose text-ink">${esc(p)}</p>`).join("") +
      `<div class="mt-10 grid gap-6 sm:grid-cols-3">` +
      items
        .map(
          (it) =>
            `<div><div class="text-4xl font-bold text-orange md:text-5xl">${esc(it.label)}</div>` +
            `<div class="mt-2 text-sm font-semibold uppercase tracking-wide text-ink">${esc(it.text)}</div></div>`
        )
        .join("") +
      `</div></section>`
    );
  }

  if (s.type === "featuregrid") {
    return (
      `<section class="mx-auto max-w-content px-6 py-section">` +
      eyebrowP(s) +
      (s.heading ? `<h2 class="mt-2 text-2xl md:text-3xl">${esc(s.heading)}</h2>` : "") +
      paras.map((p) => `<p class="mt-3 max-w-prose text-ink">${esc(p)}</p>`).join("") +
      `<div class="mt-10 grid gap-6 md:grid-cols-3">` +
      items
        .map((it, i) => {
          const m = FEATURE_CARD_META[i] || { accent: ["orange", "teal", "navy"][i % 3] };
          return card({ title: it.label, eyebrow: m.eyebrow, accent: m.accent, href: m.href, cta: m.cta, body: it.text });
        })
        .join("") +
      `</div></section>`
    );
  }

  if (s.type === "pageintro") {
    return (
      `<section><div class="mx-auto max-w-content px-6 py-section">` +
      eyebrowP(s) +
      (s.heading ? `<h2 class="mt-2 text-2xl md:text-3xl">${esc(s.heading)}</h2>` : "") +
      `<div class="mt-6 max-w-prose space-y-4 text-ink">${paras.map((p) => `<p>${esc(p)}</p>`).join("")}</div>` +
      links
        .map(
          (l) =>
            `<a href="${esc(l.href)}" class="mt-6 inline-flex items-center text-sm font-semibold text-orange transition-colors hover:text-orange-600">${esc(l.label)} &rarr;</a>`
        )
        .join("") +
      `</div></section>`
    );
  }

  if (s.type === "ctabanner") {
    const name = s.ctaName === "full" ? "full" : "boxed";
    const style = ["light", "neutral", "dark"].includes(s.tone) ? s.tone : "light";
    const align = ["left", "center", "right"].includes(s.align) ? s.align : "left";
    const type = ["solid", "outline", "bar"].includes(s.ctaType) ? s.ctaType : "solid";
    const color = ["orange", "teal", "navy", "lightteal", "none"].includes(s.ctaColor) ? s.ctaColor : "none";
    const desc = paras.join(" ");
    const btnOpts = [{ type: s.ctaB1Type, color: s.ctaB1Color }, { type: s.ctaB2Type, color: s.ctaB2Color }];
    const actions =
      `<div class="cta-actions">` +
      links.map((l, i) => {
        const o = btnOpts[i] || {};
        const btype = ["solid", "outline", "link"].includes(o.type) ? o.type : "solid";
        const bckey = ["white", "orange", "teal", "navy"].includes(o.color) ? o.color : i === 0 ? "teal" : "orange";
        return ctaButton(l.href, l.label, btype, bckey);
      }).join("") +
      `</div>`;
    if (name === "full") {
      const useColor = color !== "none";
      const bg = useColor ? CTA_COLORS[color].fill : STYLE_BG[style];
      const darkBg = useColor ? color !== "lightteal" : style === "dark";
      const head = darkBg ? "#FFFFFF" : "#1F3864", descc = darkBg ? "rgba(255,255,255,.86)" : "#3A3A4A";
      const eyeF = darkBg ? "rgba(255,255,255,.85)" : "#007B80";
      const eyebrowF = s.eyebrow ? `<p class="cta-eyebrow" style="color:${eyeF}">${esc(s.eyebrow)}</p>` : "";
      return (
        `<section class="cta-section cta-name-full cta-align-${align}" style="background:${bg}">` +
        `<div class="cta-fullinner">${eyebrowF}<h2 class="cta-h2" style="color:${head}">${esc(s.heading)}</h2>` +
        (desc ? `<p class="cta-desc" style="color:${descc}">${esc(desc)}</p>` : "") +
        actions +
        `</div></section>`
      );
    }
    const boxColor = color === "none" ? "navy" : color, c = CTA_COLORS[boxColor];
    const outline = type === "outline", darkBox = !outline && boxColor !== "lightteal";
    const boxBg = outline ? c.tint : c.fill, border = outline ? `2px dashed ${c.accent}` : "1px solid transparent";
    const txt = darkBox ? "#FFFFFF" : "#3A3A4A", head2 = darkBox ? "#FFFFFF" : "#1F3864", eye = darkBox ? "rgba(255,255,255,.82)" : c.accent;
    const eyebrow = s.eyebrow ? `<p class="cta-eyebrow" style="color:${eye}">${esc(s.eyebrow)}</p>` : "";
    const boxStyle = `background:${boxBg};border:${border};color:${txt}`;
    const inner =
      type === "bar"
        ? `<div class="cta-inner"><div class="cta-box" style="${boxStyle}"><div class="cta-textwrap">${eyebrow}<h2 class="cta-h2" style="color:${head2}">${esc(s.heading)}</h2></div>${actions}</div></div>`
        : `<div class="cta-inner"><div class="cta-box" style="${boxStyle}">${eyebrow}<h2 class="cta-h2" style="color:${head2}">${esc(s.heading)}</h2>` +
          (desc ? `<p class="cta-desc" style="color:${txt}">${esc(desc)}</p>` : "") +
          `${actions}</div></div>`;
    return `<section class="cta-section cta-name-boxed st-style-${style} cta-type-${type} cta-color-${boxColor} cta-align-${align}">${inner}</section>`;
  }

  if (s.type === "authority") {
    return (
      `<section class="mx-auto max-w-content px-6 py-section">` +
      `<div class="grid gap-10 md:grid-cols-2 md:items-center"><div>` +
      eyebrowP(s) +
      (s.heading ? `<h2 class="mt-2 text-2xl md:text-3xl">${esc(s.heading)}</h2>` : "") +
      `<div class="mt-6 max-w-prose space-y-4 text-ink">${paras.map((p) => `<p>${esc(p)}</p>`).join("")}</div>` +
      links
        .map(
          (l) =>
            `<a href="${esc(l.href)}"${isExt(l.href) ? ' rel="noopener" target="_blank"' : ""} class="mt-6 inline-flex items-center text-sm font-semibold text-teal transition-colors hover:text-teal-600">${esc(l.label)} &rarr;</a>`
        )
        .join("") +
      `</div>` +
      `<div class="rounded-card border border-navy-100 bg-grid p-5 md:p-6">${AUTHORITY_SVG}</div>` +
      `</div></section>`
    );
  }

  if (s.type === "clients") {
    return (
      `<section class="mx-auto max-w-content px-6 py-section">` +
      eyebrowP(s) +
      paras.map((p) => `<p class="mt-4 max-w-prose text-ink">${esc(p)}</p>`).join("") +
      `<div class="mt-12 grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-4 md:grid-cols-7">` +
      CLIENT_LOGOS.map(
        (logo) =>
          `<img src="${logo.file}" alt="${esc(logo.alt)}" loading="lazy" class="h-8 w-auto justify-self-center object-contain grayscale opacity-60 transition duration-200 hover:opacity-100 hover:grayscale-0" />`
      ).join("") +
      `</div>` +
      links
        .map(
          (l) =>
            `<a href="${esc(l.href)}" class="mt-12 inline-flex items-center text-sm font-semibold text-orange transition-colors hover:text-orange-600">${esc(l.label)} &rarr;</a>`
        )
        .join("") +
      `</section>`
    );
  }

  // Footer: two-column brand/nav row + legal row. Mirrors Footer.astro so it
  // uses the site's compiled classes. Contract: heading = brand name, first
  // paragraph = blurb, remaining paragraphs = legal lines, links = footer nav.
  if (s.type === "footer") {
    const hasHeading = !!s.heading;
    const brand = s.heading || paras[0] || "";
    const rest = hasHeading ? paras : paras.slice(1);
    const blurb = rest[0] || "";
    const legal = rest.slice(1);
    const tone = ["light", "neutral", "dark"].includes(s.tone) ? s.tone : "light";
    const dark = tone === "dark";
    const bandBg = dark ? "#1F3864" : tone === "neutral" ? "rgb(31 56 100 / 0.05)" : "#FFFFFF";
    const lineC = dark ? "rgba(255,255,255,.14)" : "#DCE3EF";
    const brandC = dark ? "#FFFFFF" : "#1F3864";
    const blurbC = dark ? "rgba(255,255,255,.82)" : "#3A3A4A";
    const legalC = dark ? "rgba(255,255,255,.6)" : "#8CA0BE";
    const nav = links
      .map((l) => {
        const ext = isExt(l.href);
        const cls = ext
          ? "text-teal transition-colors hover:text-teal-600"
          : "text-ink transition-colors hover:text-orange";
        const st = dark ? ` style="color:${ext ? "#9CC6C4" : "#D7DCE6"}"` : "";
        return `<a href="${esc(l.href)}" class="${cls}"${st}>${esc(l.label)}</a>`;
      })
      .join("");
    return (
      `<footer class="mt-section" style="background:${bandBg};border-top:1px solid ${lineC}">` +
      `<div class="mx-auto flex max-w-content flex-col gap-6 px-6 py-12 md:flex-row md:items-start md:justify-between">` +
      `<div class="max-w-prose">` +
      (brand ? `<p class="text-lg font-extrabold" style="color:${brandC}">${esc(brand)}</p>` : "") +
      (blurb ? `<p class="mt-2 text-sm" style="color:${blurbC}">${esc(blurb)}</p>` : "") +
      `</div>` +
      (nav ? `<nav aria-label="Footer" class="flex flex-col gap-2 text-sm">${nav}</nav>` : "") +
      `</div>` +
      (legal.length
        ? `<div style="border-top:1px solid ${lineC}"><div class="mx-auto flex max-w-content flex-col gap-1 px-6 py-6 text-xs md:flex-row md:justify-between" style="color:${legalC}">` +
          legal.map((p) => `<p>${esc(p)}</p>`).join("") +
          `</div></div>`
        : "") +
      `</footer>`
    );
  }

  // Generic fallback.
  return (
    `<section class="mx-auto max-w-content px-6 py-section">` +
    (s.heading ? `<h2 class="text-2xl md:text-3xl">${esc(s.heading)}</h2>` : "") +
    `<div class="mt-6 max-w-prose space-y-4 text-ink">${paras.map((p) => `<p>${esc(p)}</p>`).join("")}</div>` +
    `</section>`
  );
}

// Wrap each section in its tone band (mirrors the .astro wrapper).
export function renderSection(s) {
  const id = s && s.id ? ` data-section-id="${esc(s.id)}"` : "";
  if (s && (s.type === "ctabanner" || s.type === "footer")) return `<div${id}>${renderOne(s)}</div>`;
  const cls = [toneClass(s), alignClass(s), bgClass(s)].filter(Boolean).join(" ");
  return `<div class="${cls}"${id}>${renderOne(s)}</div>`;
}

export function renderSections(sections = []) {
  return (sections || []).map(renderSection).join("\n");
}

export { ebClass, toneClass, alignClass, bgClass, esc };
export default renderSections;
