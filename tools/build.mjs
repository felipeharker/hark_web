#!/usr/bin/env node
/**
 * Builds felipeharker.org into dist/: what Render publishes.
 *
 *   node tools/build.mjs
 *
 * Each part of the site is copied as it is to its path in dist/: the
 * portfolio to /, the standards to /standards/. The academic projects, the
 * birding report and the resume are their own sites, built from their own
 * repositories.
 *
 * One thing is changed on the way: every stylesheet and script a static page
 * links gets a fingerprint of its contents, `hark.css?v=1a2b3c4d5e`. A CDN
 * caches a page and its stylesheet separately, for minutes; without the
 * fingerprint a visitor just after a deploy can get the new page with the old
 * stylesheet. With it, a changed file has a new address, so the two always
 * match. (The other sites link the stylesheet and the script by their full
 * addresses, unfingerprinted; the birding app's own stylesheets are
 * fingerprinted by Next.)
 *
 * With STAGING=1 — the staging service, hark-site-staging — every page is
 * also marked noindex, and robots.txt turns crawlers away.
 *
 * Plain Node, no dependencies, so Render needs nothing but Node to run it.
 */

import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITES } from './sites.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST);

// The root part first, so a sub-path can never be overwritten by it.
for (const site of [...SITES].sort((a, b) => a.path.length - b.path.length)) {
  const from = join(ROOT, site.dir);
  const to = join(DIST, site.path);
  if (!existsSync(from)) throw new Error(`${site.name}: ${site.dir} does not exist`);
  if (site.path !== '/' && existsSync(to)) throw new Error(`${site.name}: ${site.path} is already taken in dist/`);
  cpSync(from, to, { recursive: true });
  console.log(`${site.name.padEnd(10)} ${site.dir.padEnd(22)} -> dist${site.path}  (${readdirSync(from).length} entries)`);
}

// -- Fingerprint the stylesheets and scripts each static page links -------------

const walk = (dir) => readdirSync(dir).flatMap((name) => {
  const p = join(dir, name);
  return statSync(p).isDirectory() ? walk(p) : [p];
});
const fingerprint = (file) => createHash('sha256').update(readFileSync(file)).digest('hex').slice(0, 10);

let stamped = 0;
for (const site of SITES.filter((s) => s.kind === 'static')) {
  for (const source of walk(join(ROOT, site.dir)).filter((f) => f.endsWith('.html'))) {
    const pageUrl = site.path + relative(join(ROOT, site.dir), source).split(sep).join('/');
    const page = join(DIST, pageUrl);
    const html = readFileSync(page, 'utf8').replace(/(href|src)="([^":?#]+\.(?:css|js))"/g, (link, attr, href) => {
      const file = join(DIST, new URL(href, `http://x${pageUrl}`).pathname);
      if (!existsSync(file)) return link;
      stamped++;
      return `${attr}="${href}?v=${fingerprint(file)}"`;
    });
    writeFileSync(page, html);
  }
}
console.log(`\nFingerprinted ${stamped} stylesheet and script links.`);

// -- A staging build -----------------------------------------------------------
// STAGING=1 is set on the staging service, hark-site-staging, which deploys
// the staging branch. Every page is marked noindex and robots.txt turns
// crawlers away, so the staging copy never competes with felipeharker.org in
// search. Nothing else differs: staging is what main will be.

if (process.env.STAGING === '1') {
  let marked = 0;
  for (const page of walk(DIST).filter((f) => f.endsWith('.html'))) {
    const html = readFileSync(page, 'utf8');
    if (html.includes('name="robots"')) continue;
    writeFileSync(page, html.replace('</head>', '<meta name="robots" content="noindex">\n</head>'));
    marked++;
  }
  writeFileSync(join(DIST, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
  console.log(`\nStaging: ${marked} pages marked noindex; robots.txt turns crawlers away.`);
}

console.log('\nBuilt dist/.');
