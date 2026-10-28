# Deploying

felipeharker.org is one Render static site, built from this repository's
`main` branch. Every push to `main` deploys. The academic projects, the
birding report and the resume are their own Render static sites, each
deployed from its own repository's `main` the same way.

## What Render runs

| Setting | Value |
|---|---|
| Service | `hark-site` — static site in the Render project **Hark** (workspace Harker-Hub); its `onrender.com` address is turned off |
| Repository / branch | `felipeharker/hark_web`, `main`, auto-deploy once the Check workflow passes |
| Build command | `node tools/build.mjs` |
| Publish directory | `dist` |
| Environment | `NODE_VERSION=22` |
| Custom domains | `felipeharker.org`, `www.felipeharker.org` |
| Redirects | `/academic`, `/academic/*`, `/birds`, `/birds/*`, `/resume`, `/resume/*` → the new sites (below) |

The same settings are in [`render.yaml`](../render.yaml), synced as the
Render Blueprint `hark_web`: change them there, not in the dashboard, which
the next sync overwrites. Every other repository's `render.yaml` is its own
Blueprint the same way, named after the repository.

`tools/build.mjs` copies each part's published folder to its path in
`dist/`: the portfolio to `/`, the standards to `/standards/`. Last, it adds
a fingerprint of each stylesheet's and script's contents to every page's
link to it (`/standards/hark.css?v=3e228ce5fe`, `/standards/hark.js?v=…`).
Render's CDN caches a page and its stylesheet separately for up to five
minutes; with the fingerprint, a page from a new deploy never gets the
stylesheet or script from the last one. The other sites link both by their
full addresses, without a fingerprint, so for those few minutes after a
deploy they may still get the last ones.

Nothing in the build needs the network: no packages, fonts or data are
downloaded, so a push to `main` that passes `node tools/build.mjs` locally
deploys.

## The other sites

| Service | Repository | Build command | Publish directory | Address |
|---|---|---|---|---|
| `hark-academic` | `felipeharker/hark_academic` | none | `site` | https://academic.felipeharker.org/ |
| `hark-birding` | `felipeharker/hark_birding` | `cd web && npm ci && npm run build` (`NODE_VERSION=22`) | `web/out` | https://birds.felipeharker.org/ |
| `hark-resume` | `felipeharker/hark_resume` | none | `site` | https://resume.felipeharker.org/ |

All three are in the Render project **Hark**, with auto-deploy on; each is
served at its custom domain, and each repository's `render.yaml` records its
settings. The birding build fetches the shared stylesheet from
felipeharker.org, so a change to the standard reaches the report on its next
deploy: push to `hark_birding`, or deploy it by hand on Render.

## Before you push

```bash
node tools/check.mjs
node tools/build.mjs && node tools/serve.mjs --dist
```

The second line shows exactly what will be published.

## Domains and the old addresses

- **felipeharker.org** and **www** are the `hark-site` service's custom domains.
  DNS is at Porkbun: the apex is an A record to Render's `216.24.57.1`, and
  `www` is a CNAME to `hark-site.onrender.com`. `www` redirects to
  felipeharker.org.
- **Every other site is a subdomain**, the custom domain of its own service:
  academic.felipeharker.org (`hark-academic`), birds.felipeharker.org
  (`hark-birding`), resume.felipeharker.org (`hark-resume`),
  dove.felipeharker.org (`hark-dove-habitat`) and alexandria.felipeharker.org
  (`alexandria-phoenix`). Each is a CNAME at Porkbun to the service's
  `onrender.com` address, added in the service's settings under Custom
  Domains, where Render issues its certificate. Each service's `onrender.com`
  address is turned off (Render Subdomain: Disabled), so every site has one
  address; the CNAMEs still point at those names, which Render routes by
  domain. The plan includes two custom
  domains (felipeharker.org, with its www, and one more); each past that is
  $0.25 a month.
- **felipeharker.org/academic/, /birds/ and /resume/** held those sites until
  2026-10-20. `hark-site`'s Redirects/Rewrites rules send each of them, path
  and all, to the same path on the new site: `/birds/checklist/S123/` →
  `https://birds.felipeharker.org/checklist/S123/`. The rules without a
  trailing slash catch `/academic`, `/birds` and `/resume` themselves.
- **Porkbun URL forwarding** sent resume.felipeharker.org and
  academic.felipeharker.org to the sites until 2026-10-28; now that they are
  the sites' own domains, no forward is left but an old one for the apex,
  which its A record overrides. Porkbun asks before deleting a forward with a
  browser dialog, which the Claude browser pane dismisses, so a delete there
  has to be clicked by hand.
- **The first addresses are gone.** hark-ornithology.onrender.com (the
  birding report's first site), resume-site-0rfl.onrender.com (the resume's)
  and dove-habitat.onrender.com (Dove Habitat's until 2026-10-20) were kept
  by three redirect services, `hark-birding-redirect`,
  `hark-resume-redirect` and `dove-habitat`, deleted on 2026-10-28; old
  links to them no longer work.

The Render project **Hark** holds `hark-site`, `hark-academic`, `hark-birding`,
`hark-resume` and `hark-dove-habitat`. **Parametric** holds
`alexandria-phoenix`; **Archive** holds `parametric-living`,
`parametric-reference`, `anna-grades` and `ren-fest-planning`, live but
unlinked; **Dev Lab** holds the `dev-*`
game sites. No service is left ungrouped.

The move to four sites is tracked in
[`planning/roadmap.md`](../planning/roadmap.md).
