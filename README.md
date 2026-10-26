# hark_web

[felipeharker.org](https://felipeharker.org/): the portfolio, and the web
standards that it and the sites beside it are built to. It is the front of a
family of four sites, each in its own repository and on its own Render
service, all linked from here and from each other, and the project sites
its tiles open, such as Dove Habitat:

| Site | Address | Repository | What it holds |
|---|---|---|---|
| Portfolio | https://felipeharker.org/ | `hark_web`, this one ([`web/portfolio/`](web/portfolio/)) | The front page: rows of tiles — Parametric Living and Parametric Reference, the academic projects, the bird projects (the birding report and Dove Habitat) — About, contact; menus of the projects in its running head; and the switch between the two designs. |
| Standards | https://felipeharker.org/standards/ | `hark_web`, this one ([`web/standards/`](web/standards/)) | The web design and development standards, the one shared stylesheet and script, and a page that renders them. |
| Academic | https://hark-academic.onrender.com/ | [`hark_academic`](https://github.com/felipeharker/hark_academic) | Architecture and urban design projects from the University of Houston, a page each. |
| Birding | https://hark-birding.onrender.com/ | [`hark_birding`](https://github.com/felipeharker/hark_birding) | The Harker Ornithology Report: eBird observations, checklists, media and field notes. Next.js. |
| Resume | https://hark-resume.onrender.com/ | [`hark_resume`](https://github.com/felipeharker/hark_resume) | The resume, as one printable page. |
| Dove Habitat | https://hark-dove-habitat.onrender.com/ | [`hark_dove_habitat`](https://github.com/felipeharker/hark_dove_habitat) | A project site: the design documentation for a modular cage accessory system. Not in the site links; its own lead home to the portfolio. |

Every page on every site links the one stylesheet and the one script served
from here, `https://felipeharker.org/standards/hark.css` and `hark.js`
beside it. The standard has two designs, sans and serif; a reader picks one
on the portfolio's front page, and the script carries the choice to every
site. Every page ends with the same site
links. The decision log and the roadmap for all four live here, in
[`planning/`](planning/).

## Layout

```
hark_web/
  README.md           this page
  ARCHITECTURE.md     diagrams: how the sites, the stylesheet, the builds and the services relate
  AGENTS.md           rules for coding agents (CLAUDE.md points here)
  render.yaml         the Render service, recorded
  tools/
    sites.mjs         the parts served here, and the family of sites
    serve.mjs         serve the site locally, from source
    check.mjs         check pages, links, published files and docs
    build.mjs         build the site into dist/ for Render
    wiki.mjs          publish wiki/ as the GitHub wiki
  web/
    standards/        the standard: site/hark.css, site/hark.js, docs/, the specimen page
    portfolio/        site/ is published at /
  wiki/               how-to guides: running, editing, deploying
  planning/           the roadmap and the decision log, for every site
  .github/workflows/  wiki.yml: publishes wiki/ to the GitHub wiki
```

Each part keeps what it publishes in `site/` and nothing else there.

## Quick start

Node 20.9 or newer, nothing else.

```bash
node tools/serve.mjs
```

serves the portfolio and the standards at http://localhost:8000/, straight
from source, so an edit shows on the next refresh. The site links to the
other sites lead to them, live; each is served locally from its own
repository with the same command.

Before a commit:

```bash
node tools/check.mjs
```

## Where to read next

- **[ARCHITECTURE.md](ARCHITECTURE.md)** — the system in diagrams: the
  repositories, the one stylesheet, the builds and deploys, how a reader
  moves between sites, and the services outside the repositories.
- **[wiki/](wiki/Home.md)** — how to do things: run the site, edit the
  portfolio, change the standard, deploy. The same pages are the
  repository's [GitHub wiki](https://github.com/felipeharker/hark_web/wiki).
- **[web/standards/](web/standards/)** — the rules every page follows:
  [design](web/standards/docs/design.md),
  [components](web/standards/docs/components.md),
  [writing](web/standards/docs/writing.md),
  [development](web/standards/docs/development.md).
- **[planning/](planning/roadmap.md)** — what is next, what is open, and
  [why things are the way they are](planning/decisions.md).
- **[AGENTS.md](AGENTS.md)** — the rules for anyone, or anything, editing
  this repository.

## Deploying

One Render static site, `hark-site`, deployed from `main` on every push:
build command `node tools/build.mjs`, publish directory `dist`. A second,
`hark-site-staging`, deploys the `staging` branch the same way at
https://hark-site-staging.onrender.com/, to look at a change before it goes
to `main`. Its redirect
rules send the old paths `/academic/`, `/birds/` and `/resume/` to the new
sites. See [wiki/Deploying.md](wiki/Deploying.md).

## Elsewhere in CODEBASE

`hark_academic`, `hark_birding`, `hark_resume` and `hark_dove_habitat`
sit beside this folder in `CODEBASE`. The Rhino and Grasshopper work, with its own standards, lives in
a separate workspace, `CODEBASE\parametric` (the private `parametric_*`
repositories); nothing here depends on it. The earlier `hark_*` repositories
are archived under `<name>_archive`.
