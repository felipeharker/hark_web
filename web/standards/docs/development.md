# Development

How felipeharker.org and the sites beside it are built, laid out, checked
and deployed.

## Four sites, four repositories

felipeharker.org is the front of a family of four sites. Each is built from
its own public repository and served by its own Render static site; all four
are built to this one standard.

| Site | Address | Repository | Stack |
|---|---|---|---|
| Portfolio, and these standards | https://felipeharker.org/, `/standards/` | `hark_web` | Static HTML |
| Academic | https://hark-academic.onrender.com/ | `hark_academic` | Static HTML |
| Birding | https://hark-birding.onrender.com/ | `hark_birding` | Next.js, static export |
| Resume | https://hark-resume.onrender.com/ | `hark_resume` | Static HTML |

`hark_web` (`C:\Users\fharker\Documents\CODEBASE\hark_web`,
`github.com/felipeharker/hark_web`) holds the portfolio, the standard and the
planning for all four; the others sit beside it in `CODEBASE`. The list of
sites is in [`tools/sites.mjs`](../../../tools/sites.mjs) here, as `FAMILY`,
and in `tools/site.mjs` in each of the other three: the site links and the
checks read it.

## Choosing a stack

- **Static HTML and CSS by default.** No framework, no build step, no
  JavaScript. A page is a file; what is in a `site/` folder is what the
  browser gets.
- **A framework only when the content is generated from data at build time.**
  The birding report is Next.js because every page is built from eBird CSV
  exports. Even then it exports static files — no server, no database.
- **JavaScript only for interaction that HTML cannot do.** A disclosure row
  is `<details>`, not a script.
- **No CSS framework, no preprocessor, no inline styles.** Not Tailwind, not
  Sass, not `style="…"`, not a React `style={{}}` object. Every visual rule is
  a commented class in a stylesheet.

## Folder layout

Every static site has the same shape — a part of `hark_web` under
`web/<part>/`, or the root of its own repository:

```
<site>/
  site/                 what is published, and nothing else
    index.html          the site's front page
    projects/           further pages, one file each
    assets/
      site.css          this site's own rules, if it has any
      covers/           work-list covers, 3:2
      projects/<slug>/  images for one page
  source/               working files: models, board PDFs (git-ignored)
  README.md
```

- **Only `site/` is published, and everything in it is public.** No
  Markdown, notes, models, PDFs or drafts in `site/`. `tools/check.mjs`
  fails on any file there that is not HTML, CSS or an image.
- **`source/` is for working files** — Rhino models, board-set PDFs, design
  sources. Git ignores everything in it but a README. The birding report's
  equivalent is its `notebook/`.
- **The birding report** is the one exception to the shape: in
  `hark_birding`, its app is in `web/`, its data in `observation-data/`, and
  its build writes `web/out/`, which is what is published.

## Stylesheets

There is one shared stylesheet, `web/standards/site/hark.css` in `hark_web`,
published at `https://felipeharker.org/standards/hark.css`. Every page links
it first, then its site's own stylesheet if it has one. On felipeharker.org
the link is root-relative; on the other sites it is the full address:

```html
<link rel="stylesheet" href="/standards/hark.css">                          <!-- felipeharker.org -->
<link rel="stylesheet" href="https://felipeharker.org/standards/hark.css">  <!-- every other site -->
<link rel="stylesheet" href="assets/site.css">                              <!-- only if needed -->
```

- **There are no copies.** Every static page links the one address, so a
  change to the standard reaches every site as soon as `hark_web` deploys.
  The birding app imports the stylesheet at build time, so its `predev`,
  `prebuild` and `prelint` scripts fetch it to `web/src/app/hark.css` in
  `hark_birding` — a generated file git ignores — and its next build carries
  the change.
- **A site's own stylesheet** holds the components no other site has — the
  birding report's map and lightbox, the resume's print sheet. It may
  redefine a token (the resume's print sheet resizes the type and narrows
  the label column). It should not restyle a shared class; if a shared
  component needs to change, change the standard.
- **When a second site needs a site-only component**, move it into
  `hark.css` and document it in [`components.md`](components.md).

Every stylesheet opens the same way, so any of them can be read cold:

```css
/* ============================================================================
   <SITE> — <ROLE> STYLESHEET
   ----------------------------------------------------------------------------
   What this file styles, what it does not, and where the rest lives.

   HOW THIS FILE IS ORGANISED
      1.  Tokens ................... …
      2.  …
   ========================================================================= */
```

…then numbered sections, each opened by the same banner, tokens first. A
comment says why a rule exists, not what CSS it contains.

## Page structure

```html
<body>
<header class="runhead">…owner, then every site in the family…</header>
<article class="doc">
  <a class="backlink" href="…">&larr; …</a>     <!-- interior pages only -->
  <header class="masthead">…</header>
  <section class="section" id="sec-…">…</section>
  <footer class="colophon">…site links, then one line…</footer>
</article>
</body>
```

[`templates/page.html`](../templates/page.html) is a blank page in this
shape, with the `<head>` every page needs: title, description, the two font
families and the stylesheet.

## Links

- **Within a site**, links are relative: `projects/x.html`,
  `../index.html`. A site's link to its own front page is `/`;
  felipeharker.org's link to its standards is `/standards/`.
- **Between the sites in the family**, links are absolute —
  `https://felipeharker.org/`, `https://hark-academic.onrender.com/`,
  `https://hark-birding.onrender.com/`, `https://hark-resume.onrender.com/`,
  `https://felipeharker.org/standards/` — and open in the same tab. The
  one exception is a portfolio tile: its links open the project in a new
  tab, with `target="_blank" rel="noopener noreferrer"`. A project site
  outside the family, like `https://hark-dove-habitat.onrender.com/`, links
  only the portfolio from its running head and colophon, in the same tab.
- **To anyone else's site**, links are absolute and open in a new tab, always
  with `target="_blank" rel="noopener noreferrer"`. In the birding app,
  spread `externalLinkProps(href)` from `siteConfig.ts`, which keeps the
  family in the same tab.
- **In the birding app**, a link inside the app is a Next `<Link>`; a link
  out of it is a plain `<a>`.
- **No links to private `github.com/felipeharker/…` repositories.** A
  visitor gets GitHub's 404. The four `hark_` repositories above are public.

## Naming

- Anything served is a URL, so it is lowercase kebab-case:
  `projects/living-outside-the-box.html`,
  `assets/projects/<slug>/<slug>-NN.jpg`.
- Files outside `site/` — tools, docs, notes — are lowercase, with
  underscores or hyphens as the folder already uses.
- Repositories are `hark_<name>`; their Render services `hark-<name>`.
- Section ids: `sec-<name>`.
- Images: see [`writing.md`](writing.md), "Images".

## What stays out of the repositories

- **PDFs, for now.** Board sets, the printed resume and third-party field
  guides are ignored; their links are removed from the pages
  (`planning/decisions.md`). They stay on disk in each site's `source/`.
- **Working files** — `.3dm`, `.psd`, `.ai`, `.indd`, raw exports. Large,
  changing and never served; keep them in `source/`.
- **Anything over 50 MB.** GitHub warns above 50 MB and refuses a push with
  a file over 100 MB.
- **Private details.** No street address, no one else's contact details, no
  client or employer work shown. The repositories are public: every file in
  them is published, not only `site/`.
- **Third-party material** (papers, field guides, vendor models) never goes
  in a repository. It stays on disk, out of git: in a site's `source/`, or
  the birding report's `notebook/`. Credit a source in the page text when a
  project relies on it.

## Accessibility

Every page, before it ships:

- `<html lang="en">`, a `<title>` and a `<meta name="description">`.
- One `<h1>`; headings in order.
- Every `<img>` has `alt` (a description, or `alt=""` when text beside it
  already says the same), and `loading="lazy"` below the first screen.
- A link that duplicates another (a cover beside its title) is
  `aria-hidden="true" tabindex="-1"`.
- Separators are `aria-hidden="true"`.
- Keyboard focus is always visible — the stylesheet does this; do not remove
  an outline without replacing it.
- Text is never lighter than `--color-text-mute` (4.6:1 on white).
- Nothing depends on motion; reduced motion turns it all off.

## Checking a change

Every repository has the same two tools, run from its root:

```bash
node tools/serve.mjs     # the site at http://localhost:8000/, from source
node tools/check.mjs     # must pass before every commit
```

1. Look at what you changed at desktop width and at 390px.
2. `node tools/check.mjs` must pass: stylesheet links, the links to every
   site in each running head and colophon, every internal link and image,
   and what is published — and, in `hark_web`, the docs and the wiki's
   links.
3. For the birding report, in `hark_birding/web`: `npm run build` and
   `npm run lint` must both pass, before its `tools/check.mjs` checks the
   build. `npm run dev` there serves the app at http://localhost:3000/.
4. In `hark_web`, before a deploy, `node tools/build.mjs` and
   `node tools/serve.mjs --dist` show exactly what Render will publish.

## Changing the standard

1. Edit `web/standards/site/hark.css` in `hark_web`. Add or rename a token or
   class? Document it in [`design.md`](design.md) or
   [`components.md`](components.md), and give a new component a specimen on
   `web/standards/site/index.html`.
2. Look at `/standards/` and at every page the change touches, on every site.
   The other sites load the live stylesheet, so to see them with an
   undeployed change, preview it on `hark_web`'s own pages first; the birding
   app can build against a local copy (`HARK_CSS`, see its README).
3. `node tools/check.mjs` must pass.
4. Commit once: the standard and everything it changed move together. Once
   `hark_web` deploys, the static sites follow at once; rebuild the birding
   report (any push to `hark_birding`, or a manual deploy) to carry it there.

## Deploying

One Render static site per repository, each deployed from `main` on every
push, each described in its own `render.yaml`:

| Service | Repository | Build command | Publish directory |
|---|---|---|---|
| `hark-site` | `hark_web` | `node tools/build.mjs` | `dist` |
| `hark-academic` | `hark_academic` | none | `site` |
| `hark-birding` | `hark_birding` | `cd web && npm ci && npm run build` | `web/out` |
| `hark-resume` | `hark_resume` | none | `site` |

`hark-site`'s build fingerprints each page's stylesheet links
(`hark.css?v=…`) so a CDN can never pair a new page with an old stylesheet;
write links without the fingerprint, and the build adds it. The other sites
link the stylesheet by its full address, unfingerprinted.

felipeharker.org is `hark-site`'s custom domain; the others keep their free
`onrender.com` addresses. The old paths on felipeharker.org — `/academic/`,
`/birds/`, `/resume/` — redirect to the new sites, path and all.

## Adding a site

1. Make a repository `hark_<name>` in the shape above, starting from
   [`templates/page.html`](../templates/page.html) and from another site's
   `tools/`, `AGENTS.md` and `render.yaml`.
2. Make its Render static site, `hark-<name>`, from `main`.
3. Add it to `FAMILY` in `tools/sites.mjs` here and in every other
   repository's `tools/site.mjs` (and to `SITE_FAMILY` in the birding app's
   `siteConfig.ts`, which feeds both), then to every page's running head and
   colophon; each `tools/check.mjs` lists every page that misses it.
4. Write its `README.md`.
5. `node tools/check.mjs` in every repository.
