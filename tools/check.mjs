#!/usr/bin/env node
/**
 * Checks felipeharker.org against its standard. Changes nothing; exits 1 on
 * any problem, so it can run before every commit and on every push.
 *
 *   node tools/check.mjs
 *
 * 1. Pages      every page links the one shared stylesheet and the one
 *               shared script, carries links to every site in the family in
 *               its running head and its colophon, and links the standards.
 * 2. Links      every internal link, image and stylesheet resolves to a file,
 *               and every same-page #anchor to an id.
 * 3. Published  a static site/ folder holds only web files — no PDFs, notes,
 *               models or Markdown; robots.txt and sitemap.xml at the root of
 *               the site at / too — and no stray copy of the stylesheet
 *               exists anywhere.
 * 4. Docs       every token and class in the stylesheet is in
 *               web/standards/docs/, no documented token has gone, and
 *               every link in wiki/ resolves (tools/wiki.mjs).
 * 5. Script     every other site in the family is a subdomain of
 *               felipeharker.org, so the shared script's cookie, and with it
 *               the reader's design, reaches it.
 *
 * The other sites in the family — academic, birding, resume — are checked by
 * the same kind of tool in their own repositories.
 */

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DOMAIN, FAMILY, SCRIPT, SITES, STYLESHEET, mounts, resolveUrl, siteLinkHref } from './sites.mjs';
import { wikiPages } from './wiki.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const STANDARDS = join(ROOT, 'web', 'standards');
const SKIP = new Set(['.git', 'node_modules', '.next', 'dist']);
const WEB_FILES = new Set(['.html', '.css', '.js', '.svg', '.jpg', '.jpeg', '.png', '.webp', '.ico']);
// What search engines read, at the root of the site served at /: robots.txt names the sitemap.
const CRAWLER_FILES = new Set(['robots.txt', 'sitemap.xml']);
const problems = [];
const problem = (where, what) => problems.push(`${where}: ${what}`);
const rel = (p) => relative(ROOT, p).split(sep).join('/');

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) { if (!SKIP.has(name)) walk(p, out); } else out.push(p);
  }
  return out;
}

const served = mounts(ROOT);

// -- 1 and 2. Every page -------------------------------------------------------

console.log('Pages and links\n');

for (const site of SITES) {
  const dir = join(ROOT, site.dir);
  if (!existsSync(dir)) {
    console.log(`  ${site.name.padEnd(10)} skipped — ${site.dir} is not built (npm run build in ${site.app})`);
    continue;
  }
  const pages = walk(dir).filter((f) => f.endsWith('.html') && !/(^|[\\/])(404|_not-found)\.html$/.test(f));
  let broken = 0;
  let inBrowser = 0;

  for (const file of pages) {
    // Comments hold instructions with placeholder paths; they are not links.
    const html = readFileSync(file, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
    const where = rel(file);
    const pageUrl = site.path + rel(file).slice(site.dir.length + 1);

    // A Next page that renders its body in the browser ships only a loading
    // fallback; its links exist once it runs, so only its assets are checked.
    const clientRendered = html.includes('BAILOUT_TO_CLIENT_SIDE_RENDERING');
    if (clientRendered) inBrowser++;

    if (site.kind === 'static' && !html.includes(`href="${STYLESHEET}"`)) problem(where, `does not link ${STYLESHEET}`);
    if (site.kind === 'static' && !html.includes(`<script src="${SCRIPT}"></script>`)) problem(where, `does not link ${SCRIPT}`);
    const nav = html.match(/<nav class="site-links"[\s\S]*?<\/nav>/);
    const head = html.match(/<nav class="runhead-links"[\s\S]*?<\/nav>/);
    if (!clientRendered) {
      if (!nav) problem(where, 'has no site links');
      else for (const s of FAMILY) if (!nav[0].includes(`href="${siteLinkHref(s)}"`)) problem(where, `site links miss ${s.name} (${siteLinkHref(s)})`);
      if (!head) problem(where, 'has no running head');
      else for (const s of FAMILY) if (!head[0].includes(`href="${siteLinkHref(s)}"`)) problem(where, `running head misses ${s.name} (${siteLinkHref(s)})`);
      if (!html.includes('href="/standards/"') && site.path !== '/standards/') problem(where, 'does not link /standards/');
    }

    const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
    for (const [, attr] of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
      if (/^(https?:|mailto:|tel:|data:|javascript:|\/\/)/.test(attr)) continue;
      const [pathPart, hash] = attr.split('#');
      if (!pathPart) {
        if (hash && !ids.has(hash)) { problem(where, `#${hash} has no target`); broken++; }
        continue;
      }
      const target = new URL(pathPart, `http://x${pageUrl}`).pathname;
      if (!resolveUrl(served, target)) { problem(where, `${attr} does not resolve`); broken++; }
    }
  }
  const note = inBrowser ? ` (${inBrowser} rendered in the browser: links not checked)` : '';
  console.log(`  ${site.name.padEnd(10)} ${String(pages.length).padStart(4)} pages, ${broken} broken links${note}`);
}

// -- 3. Published folders and stray copies -------------------------------------

console.log('\nPublished folders\n');

for (const site of SITES.filter((s) => s.kind === 'static')) {
  const files = walk(join(ROOT, site.dir));
  const odd = files.filter((f) => !WEB_FILES.has(extname(f).toLowerCase())
    && !(site.path === '/' && CRAWLER_FILES.has(relative(join(ROOT, site.dir), f))));
  for (const f of odd) problem(rel(f), 'is not a web file, and everything in site/ is published');
  console.log(`  ${site.name.padEnd(10)} ${String(files.length).padStart(4)} files, ${odd.length} that should not be published`);
}

const stylesheet = rel(join(STANDARDS, 'site', 'hark.css'));
for (const f of walk(join(ROOT, 'web'))) {
  const name = f.split(sep).pop();
  const r = rel(f);
  if ((name === 'hark.css' && r !== stylesheet) || name === 'hark-styles.css') {
    problem(r, 'is a stray copy of the shared stylesheet; link /standards/hark.css instead');
  }
}

// -- 4. Docs -------------------------------------------------------------------

console.log('\nDocs\n');

const css = readFileSync(join(STANDARDS, 'site', 'hark.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
const design = readFileSync(join(STANDARDS, 'docs', 'design.md'), 'utf8');
const components = readFileSync(join(STANDARDS, 'docs', 'components.md'), 'utf8');

const tokens = new Set([...css.matchAll(/(--[a-z0-9-]+)\s*:/g)].map((m) => m[1]));
const referenced = new Set([...css.matchAll(/var\((--[a-z0-9-]+)/g)].map((m) => m[1]));
const classes = new Set();
for (const [, prelude] of css.matchAll(/([^{}]+)\{/g)) {
  if (prelude.trim().startsWith('@')) continue;
  for (const [, name] of prelude.matchAll(/\.([a-zA-Z][\w-]*)/g)) classes.add(name);
}
const inCode = (doc, literal) =>
  new RegExp('`[^`\\n]*' + literal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![\\w-])[^`\\n]*`').test(doc);

const undocumentedTokens = [...tokens].filter((t) => !inCode(design, t));
const undocumentedClasses = [...classes].filter((c) => !inCode(components, '.' + c));
const staleTokens = [...new Set([...design.matchAll(/`(--[a-z0-9-]+)`/g)].map((m) => m[1]))]
  .filter((t) => !tokens.has(t) && !referenced.has(t));
for (const t of undocumentedTokens) problem('web/standards/docs/design.md', `does not document ${t}`);
for (const c of undocumentedClasses) problem('web/standards/docs/components.md', `does not document .${c}`);
for (const t of staleTokens) problem('web/standards/docs/design.md', `documents ${t}, which hark.css no longer defines`);
console.log(`  ${tokens.size} tokens, ${undocumentedTokens.length} undocumented, ${staleTokens.length} stale`);
console.log(`  ${classes.size} classes, ${undocumentedClasses.length} undocumented`);

const wiki = wikiPages();
const wikiBroken = wiki.flatMap((p) => p.problems.map((what) => `wiki/${p.name}: ${what}`));
problems.push(...wikiBroken);
console.log(`  ${wiki.length} wiki pages, ${wikiBroken.length} broken links`);

// -- 5. The shared script -------------------------------------------------------

console.log('\nScript\n');

const host = new URL(DOMAIN).hostname;
const others = FAMILY.filter((s) => !s.url.startsWith(`${DOMAIN}/`));
const unreached = others.filter((s) => !new URL(s.url).hostname.endsWith(`.${host}`));
for (const s of unreached) problem('tools/sites.mjs', `${s.name} (${new URL(s.url).hostname}) is not a subdomain of ${host}, so the design cookie does not reach it`);
console.log(`  the design reaches ${others.length - unreached.length} of ${others.length} other sites in the family`);

// -- Result --------------------------------------------------------------------

if (problems.length) {
  console.log(`\n${problems.length} problem${problems.length === 1 ? '' : 's'}:\n`);
  for (const p of problems.slice(0, 60)) console.log(`  - ${p}`);
  if (problems.length > 60) console.log(`  … and ${problems.length - 60} more`);
  process.exit(1);
}
console.log('\nEverything is in step.');
