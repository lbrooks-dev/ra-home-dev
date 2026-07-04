// Parse a MyFolioWorks content.md export into structured, typed sections.
// No markdown dependency: we pull out the pieces each section needs
// (eyebrow, heading, paragraphs, list items, links) so the renderer can
// emit them through the site's real components and tokens.
//
//   "# area"  -> site title
//   "## project" -> page title
//   "### section" + "<!-- type: X -->" + body
// HTML-comment markers (id, sharing, binder) are ignored.

const DASH = /\s*[\u2014\u2013-]\s*/; // em / en / hyphen

export function parseContent(md) {
  const lines = (md || '').replace(/\r\n/g, '\n').split('\n');
  let siteTitle = '';
  let pageTitle = '';
  const raw = [];
  let cur = null;

  const typeOf = (l) => {
    const m = l.match(/^\s*<!--\s*type:\s*(.+?)\s*-->\s*$/i);
    return m ? m[1].trim().toLowerCase() : null;
  };
  const eyebrowOf = (l) => {
    const m = l.match(/^\s*<!--\s*eyebrow:\s*(.+?)\s*-->\s*$/i);
    return m ? m[1].trim().toLowerCase() : null;
  };
  const toneOf = (l) => {
    const m = l.match(/^\s*<!--\s*tone:\s*(.+?)\s*-->\s*$/i);
    return m ? m[1].trim().toLowerCase() : null;
  };
  const alignOf = (l) => {
    const m = l.match(/^\s*<!--\s*align:\s*(.+?)\s*-->\s*$/i);
    return m ? m[1].trim().toLowerCase() : null;
  };
  const bgOf = (l) => {
    const m = l.match(/^\s*<!--\s*bg:\s*(.+?)\s*-->\s*$/i);
    return m ? m[1].trim().toLowerCase() : null;
  };
  const ctaKey = (l, key) => {
    const m = l.match(new RegExp('^\\s*<!--\\s*' + key + ':\\s*(.+?)\\s*-->\\s*$', 'i'));
    return m ? m[1].trim().toLowerCase() : null;
  };
  const isComment = (l) => /^\s*<!--.*-->\s*$/.test(l);

  for (const line of lines) {
    if (/^#\s+/.test(line)) { if (!cur) siteTitle = line.replace(/^#\s+/, '').trim(); continue; }
    if (/^##\s+/.test(line)) { if (!cur) pageTitle = line.replace(/^##\s+/, '').trim(); continue; }
    if (/^###\s+/.test(line)) { if (cur) raw.push(cur); cur = { id: '', title: line.replace(/^###\s+/, '').trim(), type: '', eyebrowStyle: '', tone: '', align: '', bg: '', body: [] }; continue; }
    if (!cur) continue;
    const iv = (line.match(/^\s*<!--\s*id:\s*(.+?)\s*-->\s*$/i) || [])[1]; if (iv) { cur.id = iv.trim(); continue; }
    const ty = typeOf(line); if (ty) { cur.type = ty; continue; }
    const eb = eyebrowOf(line); if (eb) { cur.eyebrowStyle = eb; continue; }
    const tn = toneOf(line); if (tn) { cur.tone = tn; continue; }
    const al = alignOf(line); if (al) { cur.align = al; continue; }
    const bgv = bgOf(line); if (bgv) { cur.bg = bgv; continue; }
    const cn = ctaKey(line, 'ctaname'); if (cn) { cur.ctaName = cn; continue; }
    const cty = ctaKey(line, 'ctatype'); if (cty) { cur.ctaType = cty; continue; }
    const cco = ctaKey(line, 'ctacolor'); if (cco) { cur.ctaColor = cco; continue; }
    const cb1 = ctaKey(line, 'ctab1'); if (cb1) { const p = cb1.split('/'); cur.ctaB1Type = p[0]; cur.ctaB1Color = p[1] || 'default'; continue; }
    const cb2 = ctaKey(line, 'ctab2'); if (cb2) { const p = cb2.split('/'); cur.ctaB2Type = p[0]; cur.ctaB2Color = p[1] || 'default'; continue; }
    const lo = ctaKey(line, 'layout'); if (lo) { cur.layout = lo; continue; }
    const csx = ctaKey(line, 'clientstyle'); if (csx) { cur.clientStyle = csx; continue; }
    if (/^\s*<!--\s*herologo\s*-->\s*$/i.test(line)) { cur.heroLogo = true; continue; }
    const fgn = ctaKey(line, 'fgname'); if (fgn) { cur.fgVariant = fgn; continue; }
    if (isComment(line)) continue;
    cur.body.push(line);
  }
  if (cur) raw.push(cur);

  const sections = raw.map((s) => {
    let eyebrow = '';
    let heading = '';
    const paras = [];
    const items = [];
    const images = [];
    let links = [];
    for (const line of s.body) {
      const t = line.trim();
      if (!t) continue;
      let m;
      if ((m = t.match(/^_(.+)_$/))) { eyebrow = m[1].trim(); continue; }
      if ((m = t.match(/^#{4,6}\s+(.+)$/))) { heading = m[1].trim(); continue; }
      if ((m = t.match(/^!\[([^\]]*)\]\(([^)]+)\)\s*$/))) { images.push({ alt: m[1].trim(), src: m[2].trim() }); continue; }
      if ((m = t.match(/^[-*]\s+(.+)$/))) {
        const raw = m[1];
        const sep = raw.match(/\s[\u2014\u2013-]\s/); // a dash with spaces around it — not hyphenated words
        if (sep) items.push({ label: raw.slice(0, sep.index).trim(), text: raw.slice(sep.index + sep[0].length).trim() });
        else items.push({ label: raw.trim(), text: '' });
        continue;
      }
      const found = [...t.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map((x) => ({ label: x[1], href: x[2] }));
      if (found.length) { links = links.concat(found); continue; }
      paras.push(t);
    }
    return { type: s.type || 'generic', id: s.id || '', eyebrowStyle: s.eyebrowStyle || 'border', tone: (['light','neutral','dark'].includes(s.tone) ? s.tone : (s.type === 'pageintro' ? 'neutral' : 'light')), align: (['left','center','right'].includes(s.align) ? s.align : 'left'), bg: (['none','grid','gradient'].includes(s.bg) ? s.bg : 'none'), ctaName: s.ctaName || 'boxed', ctaType: s.ctaType || 'solid', ctaColor: s.ctaColor || 'none', ctaB1Type: s.ctaB1Type || 'solid', ctaB1Color: s.ctaB1Color || 'default', ctaB2Type: s.ctaB2Type || 'solid', ctaB2Color: s.ctaB2Color || 'default', layout: s.layout || 'default', heroLogo: !!s.heroLogo, clientStyle: (['bare','boxed'].includes(s.clientStyle) ? s.clientStyle : 'bare'), fgVariant: (['topborder','titlebg','icon','darktop','line','alt'].includes(s.fgVariant) ? s.fgVariant : 'topborder'), title: s.title, eyebrow, heading: heading || s.title, paras, items, images, links };
  });

  return { siteTitle, pageTitle, sections };
}
