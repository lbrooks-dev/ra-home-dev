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
  const isComment = (l) => /^\s*<!--.*-->\s*$/.test(l);

  for (const line of lines) {
    if (/^#\s+/.test(line)) { if (!cur) siteTitle = line.replace(/^#\s+/, '').trim(); continue; }
    if (/^##\s+/.test(line)) { if (!cur) pageTitle = line.replace(/^##\s+/, '').trim(); continue; }
    if (/^###\s+/.test(line)) { if (cur) raw.push(cur); cur = { title: line.replace(/^###\s+/, '').trim(), type: '', body: [] }; continue; }
    if (!cur) continue;
    const ty = typeOf(line); if (ty) { cur.type = ty; continue; }
    if (isComment(line)) continue;
    cur.body.push(line);
  }
  if (cur) raw.push(cur);

  const sections = raw.map((s) => {
    let eyebrow = '';
    let heading = '';
    const paras = [];
    const items = [];
    let links = [];
    for (const line of s.body) {
      const t = line.trim();
      if (!t) continue;
      let m;
      if ((m = t.match(/^_(.+)_$/))) { eyebrow = m[1].trim(); continue; }
      if ((m = t.match(/^#{4,6}\s+(.+)$/))) { heading = m[1].trim(); continue; }
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
    return { type: s.type || 'generic', title: s.title, eyebrow, heading: heading || s.title, paras, items, links };
  });

  return { siteTitle, pageTitle, sections };
}
