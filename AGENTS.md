# hark_web — agent guide

felipeharker.org: the portfolio and the web standards. Read
[`README.md`](README.md) first: the family of sites, the layout, and how to
run, check and deploy it. The academic projects, the birding report and the
resume are their own sites, in `hark_academic`, `hark_birding` and
`hark_resume` beside this folder, each with its own `AGENTS.md`; so is Dove
Habitat, a project site, in `hark_dove_habitat`. The standard, the decision
log and the roadmap for all of them live here.

## Rules

1. **`main` is live.** Render builds and deploys every push to `main`. Work on
   a branch; push or merge to `main` only when the user asks. Never change
   Render settings unless asked.
2. **The repository is public, and so is everything in a `site/` folder.**
   Every file here can be read by anyone, not only what is served. No secrets,
   no `.env`, no private notes.
3. **Privacy.** No street address, no one else's contact details, no client
   named and no work done for one shown. The resume carries no phone number
   and no referees' email addresses (`planning/decisions.md`); the employer's
   name is an open decision (`planning/roadmap.md`): never add, change or
   remove it unless asked. The one exception: the birding report shows the
   eBird exports exactly as they are, location names included — never rename,
   hide or filter anything in them.
4. **No links to private `github.com/felipeharker/…` repositories.** A
   visitor gets GitHub's 404. The public ones — `hark_web`,
   `hark_academic`, `hark_birding`, `hark_resume`, `hark_dove_habitat` — may
   be linked.
5. **One stylesheet.** `web/standards/site/hark.css`, served at
   `/standards/hark.css`, is the only shared stylesheet; every page on every
   site links it (`https://felipeharker.org/standards/hark.css` from the other
   sites), and nothing copies it except the birding app's generated,
   git-ignored import. A change to it reaches every site once this repository
   deploys. A part's own rules go in its `site/assets/site.css`, commented.
   No inline `style` attributes, no CSS framework, no preprocessor, no build
   step for static pages, no JavaScript where HTML will do.
6. **Tokens first, and document what you add.** A new token goes in
   `web/standards/docs/design.md`; a new class in
   `web/standards/docs/components.md`, with a specimen on
   `web/standards/site/index.html`. `node tools/check.mjs` fails otherwise.
7. **Only `site/` is published.** Working files — models, board PDFs, design
   sources — go in the part's `source/` folder, which git ignores. PDFs are
   out of the repository for now, and no page links one.
8. **Names.** Anything served is a URL, so it is lowercase kebab-case:
   `projects/<slug>.html`, `assets/projects/<slug>/<abbr>-NN.jpg`.
9. **Images.** Covers: 3:2, 1500 x 1000 or smaller, JPEG. Plates: JPEG, 2000 px
   on the long edge or smaller, named with the project's abbreviation and two
   digits (`lotb-03.jpg`). Every `<img>` has `alt`, and `loading="lazy"` below
   the first screen. **Never invent an image**: a missing cover is a
   `.work-cover-placeholder`.
10. **Links.** Within this site: relative, or root-relative (`/`,
    `/standards/`). To another site in the family: absolute (`FAMILY` in
    `tools/sites.mjs`) and same tab — except a portfolio tile, which opens
    its project in a new tab. To anyone else: absolute,
    `target="_blank" rel="noopener noreferrer"`.
11. **Text.** Plain language; headings in Title Case, never numbered. Every
    page opens with the running head and ends with the colophon, each
    linking every site in the family (`web/standards/docs/components.md`,
    "Running head" and "Colophon").
12. **Third-party material** — papers, field guides, vendor models — never
    goes in the repository. It stays on disk, out of git: in a part's
    `source/`, or the birding report's `notebook/`. Credit a source in the page
    text when a project relies on it.
13. **Keep the docs true.** A change to how something works updates the README,
    wiki page or standard that describes it, in the same commit. A decision —
    for any of the four sites — goes in `planning/decisions.md`. The family's
    addresses are in `tools/sites.mjs` here and `tools/site.mjs` in each
    other repository: change them in all four.

## Before a commit

1. `node tools/check.mjs` passes.
2. `node tools/serve.mjs`, and open every page you touched at desktop width
   and at 390 px.

Commit messages end with the attribution line the session gives, for example
`Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
