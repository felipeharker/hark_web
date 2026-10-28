/**
 * felipeharker.org, and the family of sites it belongs to.
 * tools/build.mjs, tools/serve.mjs and tools/check.mjs all read this file.
 *
 * SITES are the parts this repository serves:
 *
 *   path       where it is served, always with a trailing slash
 *   dir        the folder published at that path, relative to the repository
 *   kind       'static' — the folder is the site, as it is
 *   nav        the links its running head and site links carry, in order —
 *              Portfolio, then its section's pages — `current` on its own.
 *              The portfolio has none: its running head is its menus, and
 *              its site links are FAMILY.
 *
 * FAMILY is every site in the portfolio's site links, in the order they
 * appear, and every site its running head's menus reach. The portfolio is
 * served from here; the others are their own sites, each built from its own
 * repository and linked by its absolute address. Every other page carries
 * its own section's links instead (web/standards/docs/components.md,
 * "Running head"), listed as NAV in that repository's tools/site.mjs.
 */

import { existsSync, statSync } from 'node:fs';
import { join, normalize } from 'node:path';

export const DOMAIN = 'https://felipeharker.org';

export const SITES = [
  { name: 'Portfolio', path: '/', dir: 'web/portfolio/site', kind: 'static' },
  {
    name: 'Standards', path: '/standards/', dir: 'web/standards/site', kind: 'static',
    nav: [{ name: 'Portfolio', url: '/' }, { name: 'Standards', url: '/standards/', current: true }],
  },
];

export const FAMILY = [
  { name: 'Portfolio', url: 'https://felipeharker.org/', repo: 'hark_web' },
  { name: 'Academic', url: 'https://academic.felipeharker.org/', repo: 'hark_academic' },
  { name: 'Birding', url: 'https://birds.felipeharker.org/', repo: 'hark_birding' },
  { name: 'Resume', url: 'https://resume.felipeharker.org/', repo: 'hark_resume' },
];

/** The href a site link carries: root-relative on felipeharker.org, absolute to the others. */
export const siteLinkHref = (site) => (site.url.startsWith(`${DOMAIN}/`) ? site.url.slice(DOMAIN.length) : site.url);

/** The one shared stylesheet, as every page here links it. */
export const STYLESHEET = '/standards/hark.css';

/** The one shared script, as every page here links it. */
export const SCRIPT = '/standards/hark.js';

/** Where each path is served from, longest path first so /standards/ wins over /. */
export function mounts(root) {
  return [...SITES]
    .sort((a, b) => b.path.length - a.path.length)
    .map((s) => ({ ...s, abs: join(root, s.dir) }));
}

/**
 * The file a URL path is served from, or null. Like Render: the path as a
 * file, then with .html, then as a folder's index.html.
 */
export function resolveUrl(mountList, urlPath) {
  const mount = mountList.find((m) => urlPath.startsWith(m.path) || urlPath === m.path.slice(0, -1));
  if (!mount) return null;
  const rest = normalize(decodeURIComponent(urlPath.slice(mount.path.length - 1) || '/'));
  const base = join(mount.abs, rest);
  if (!base.startsWith(mount.abs)) return null;
  for (const candidate of [base, `${base}.html`, join(base, 'index.html')]) {
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return null;
}
