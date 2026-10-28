# Architecture

How felipeharker.org and the sites beside it are put together: what lives in
which repository, how the sites relate to each other, how a change becomes a
live site, and what sits outside the repositories. The diagrams render on
GitHub; every box names a real repository, folder, file or service.

- [The whole system](#the-whole-system)
- [This repository](#this-repository)
- [One stylesheet](#one-stylesheet)
- [One script, two designs](#one-script-two-designs)
- [From a commit to a live site](#from-a-commit-to-a-live-site)
- [The birding report's data](#the-birding-reports-data)
- [How a reader moves around](#how-a-reader-moves-around)
- [Outside the repositories](#outside-the-repositories)

## The whole system

Four public repositories build four static sites, each on its own Render
service. `hark_web` serves felipeharker.org — the portfolio and the standard
— and its one stylesheet styles all four.

```mermaid
flowchart LR
  subgraph web["hark_web (github.com/felipeharker/hark_web)"]
    direction TB
    standards["web/standards<br/>the shared stylesheet and script, their docs, the specimen page"]
    portfolio["web/portfolio<br/>the front page"]
    planning["planning/<br/>roadmap and decisions, for every site"]
  end
  academic["hark_academic<br/>three University of Houston projects"]
  birds["hark_birding<br/>the birding report (Next.js) and its eBird data"]
  resume["hark_resume<br/>the resume"]

  standards -. "styles" .-> portfolio
  standards -. "linked by every page" .-> academic
  standards -. "linked by the page" .-> resume
  standards -. "fetched at build" .-> birds

  web --> s1["Render 'hark-site'<br/>felipeharker.org"]
  academic --> s2["Render 'hark-academic'<br/>academic.felipeharker.org"]
  birds --> s3["Render 'hark-birding'<br/>birds.felipeharker.org"]
  resume --> s4["Render 'hark-resume'<br/>resume.felipeharker.org"]
```

| Address | Repository, folder published | What it is |
|---|---|---|
| https://felipeharker.org/ | `hark_web`, `web/portfolio/site/` | The front page: a tile for each academic project and one for the birding report, About, Elsewhere |
| https://felipeharker.org/standards/ | `hark_web`, `web/standards/site/` | The specimen page, and `/standards/hark.css` itself |
| https://academic.felipeharker.org/ | `hark_academic`, `site/` | Living Outside the Box, Dead Mall Fall, Collingsworth Marketplace — a page each |
| https://birds.felipeharker.org/ | `hark_birding`, `web/out/` (built) | The Harker Ornithology Report: map, locations, media, field notes, one page per checklist |
| https://resume.felipeharker.org/ | `hark_resume`, `site/` | The resume, printable |

## This repository

```mermaid
flowchart LR
  root["hark_web/"]
  root --> rootfiles["README.md · ARCHITECTURE.md · AGENTS.md · CLAUDE.md<br/>render.yaml · .gitignore · .gitattributes · .node-version"]
  root --> tools["tools/"]
  root --> wiki["wiki/<br/>how-to guides"]
  root --> planning["planning/<br/>roadmap.md · decisions.md"]
  root --> workflows[".github/workflows/<br/>wiki.yml"]
  root --> web["web/"]

  tools --> t1["sites.mjs<br/>the parts served here, and the family"]
  tools --> t2["build.mjs<br/>assembles dist/ for Render"]
  tools --> t3["serve.mjs<br/>serves the site locally"]
  tools --> t4["check.mjs<br/>checks pages, links, files, docs"]
  tools --> t5["wiki.mjs<br/>writes wiki/ out as the GitHub wiki"]

  web --> s["standards/"]
  web --> p["portfolio/"]

  s --> s1["site/hark.css · site/hark.js · site/index.html · site/specimen/"]
  s --> s2["docs/ design · components · writing · development"]
  s --> s3["templates/page.html"]

  p --> p1["site/index.html"]
```

Every part keeps what it publishes in a `site/` folder and nothing else
there: no Markdown, notes, models or PDFs. The other three repositories have
the same shape at their root — `site/`, git-ignored `source/` (or the birding
report's `notebook/`), and `tools/` with `site.mjs`, `serve.mjs` and
`check.mjs` — except the birding report, whose app in `web/` writes
`web/out/`.

## One stylesheet

There is one shared stylesheet, `web/standards/site/hark.css` in this
repository. Nothing copies it except the birding app, which needs it at
build time.

```mermaid
flowchart LR
  css["hark_web: web/standards/site/hark.css<br/>tokens + every shared component"]
  css -- "published as" --> url["https://felipeharker.org/standards/hark.css"]

  url -- "&lt;link href=/standards/hark.css&gt;" --> pp["portfolio and specimen pages"]
  url -- "&lt;link&gt;, full address" --> ap["hark_academic pages"]
  url -- "&lt;link&gt;, full address" --> rp["hark_resume page"]
  rp --- rcss["site/assets/site.css<br/>narrower column, print sheet"]
  pp --- scss["specimen/specimen.css<br/>swatches and samples"]

  url -- "predev · prebuild · prelint fetch" --> gen["hark_birding: web/src/app/hark.css<br/>(generated, git-ignored)"]
  gen -- "import, first" --> layout["birding app: layout.tsx"]
  layout --- bcss["styles_primary.css · styles_map.css<br/>the report's own components"]

  docs["web/standards/docs/<br/>design.md (tokens) · components.md (classes)"]
  check["tools/check.mjs"]
  check -. "every token and class documented" .-> docs
  check -. "compares" .-> css
```

A site's own stylesheet loads after `hark.css`, may read and redefine its
tokens, and holds only what no other site needs. A component a second site
needs moves into `hark.css`. A change to `hark.css` reaches the static sites
as soon as `hark-site` deploys, and the birding report on its next build.

## One script, two designs

The standard has two designs, sans (the default) and serif, and one shared
script, `web/standards/site/hark.js`, served beside the stylesheet at
`https://felipeharker.org/standards/hark.js`. Every page links it in its
`<head>`; it sets `<html data-design>` before the page is drawn. The
choice is made only on felipeharker.org's front page and kept in one
cookie set for felipeharker.org, which the browser sends to every
subdomain, so every site reads the same choice.

```mermaid
flowchart LR
  switch["felipeharker.org front page<br/>the design switch"]
  store["cookie hark-design<br/>Domain=felipeharker.org"]
  switch -- "writes" --> store
  store -- "read by" --> acad["academic.felipeharker.org"]
  store -- "read by" --> birds["birds.felipeharker.org"]
  store -- "read by" --> resume["resume.felipeharker.org"]
  store -- "read by" --> dove["dove.felipeharker.org"]
  store -- "read by" --> alex["alexandria.felipeharker.org"]
  css["hark.css<br/>:root — sans<br/>:root:where([data-design='serif']) — serif"]
  script["hark.js<br/>sets data-design, loads Source Serif 4"]
  script -. "on every page" .-> css
```

The front page alone decides: only its switch writes the cookie. Parametric Living and
Parametric Reference are outside the family, on their own copy of the
standard, and keep their one design; nothing here links them any more.

## From a commit to a live site

Each repository deploys on its own; this is `hark_web`'s path. The others
are the same, without the build step for the static ones, and with
`cd web && npm ci && npm run build` for the birding report.

```mermaid
flowchart LR
  dev["edit in web/…"] --> serve["node tools/serve.mjs<br/>localhost:8000, from source"]
  dev --> check["node tools/check.mjs<br/>stylesheet · site links · internal links<br/>published files · docs"]
  check --> push["git push origin main"]
  push --> gh["GitHub<br/>felipeharker/hark_web"]
  gh -- "auto-deploy" --> build["Render: node tools/build.mjs<br/>copy each part's folder to its path"]
  sites["tools/sites.mjs"] -. "paths and folders" .-> build
  build --> dist["dist/<br/>/ · /standards/<br/>stylesheet links fingerprinted"]
  dist -- "publish directory" --> live["felipeharker.org"]
```

`tools/sites.mjs` lists the parts served here and the family of sites; the
build, the local server and the check all read it.
`node tools/build.mjs && node tools/serve.mjs --dist` shows exactly what
Render will publish.

## The birding report's data

Nothing about birds is written into markup. Every page is built from files
in `hark_birding` at build time; images and map tiles come from outside
services when a reader opens the page.

```mermaid
flowchart LR
  ebird["eBird / Macaulay Library<br/>exports"] -- "replace by hand" --> csv
  subgraph data["hark_birding"]
    csv["observation-data/<br/>ebird-data-latest.csv<br/>ebird-media-latest.csv"]
    notes["web/field-notes/<br/>field-note-N.md"]
    config["web/src/lib/siteConfig.ts<br/>title, abstract, links"]
  end
  csv --> parse["parseEbird.ts"]
  notes --> parsen["parseFieldNotes.ts"]
  parse & parsen --> page["src/app/page.tsx"]
  config --> home
  page --> home["HomeDocument<br/>map · locations · media · field notes"]
  parse --> cl["src/app/checklist/[id]/<br/>one page per checklist"]
  home & cl --> out["web/out/ → birds.felipeharker.org"]

  out -. "photos, at view time" .-> ml["Macaulay Library CDN"]
  out -. "basemap, at view time" .-> carto["Carto basemap tiles"]
```

## How a reader moves around

Every page opens with a running head and ends with a colophon, each
carrying the same links: Portfolio, then the pages of the page's section of
the portfolio — Portfolio · Academic; Portfolio · Alexandria Phoenix ·
Parametric Studies; Portfolio · Ornithology Report · Dove Habitat;
Portfolio · Resume; Portfolio · Standards — with the one the reader is in
bracketed. A page within a site keeps its site's links and has no back
link. Links between the sites are absolute and stay in the same tab, except
the portfolio's tiles, which open each project in a new tab; links to anyone
else open a new one. The portfolio's own running head is the one with menus:
Academic, Professional and Birding open onto every project under them, in
the same tab.

```mermaid
flowchart TB
  home["felipeharker.org — Portfolio"]
  acad["academic.felipeharker.org"]
  proj["…/projects/…"]
  birds["birds.felipeharker.org"]
  check["…/checklist/…"]
  resume["resume.felipeharker.org"]
  std["felipeharker.org/standards/"]

  home -- "a tile per project" --> proj
  home -- "birding report tile" --> birds
  home -- "Dove Habitat tile" --> dove["dove.felipeharker.org"]
  home -- "Documentation and Parametric Studies tiles" --> alex["alexandria.felipeharker.org"]
  home -- "Elsewhere" --> resume
  home -- "running head menus" --> proj & birds & dove & alex
  acad --> proj
  proj -- "running head" --> acad
  birds --> check
  check -- "running head" --> birds
  birds <-- "running heads" --> dove

  footer["running head and colophon of every page:<br/>Portfolio, then its section's pages<br/>and the Hark web standards"]
  footer -.-> home & std
```

## Outside the repositories

| What | Where | Relationship |
|---|---|---|
| The live sites | Render static sites `hark-site`, `hark-academic`, `hark-birding`, `hark-resume` (project Hark, workspace Harker-Hub) | Each builds its repository's `main` on every push; `hark-site` serves felipeharker.org and www |
| The old paths | `hark-site`'s Redirects/Rewrites | `/academic/*`, `/birds/*`, `/resume/*` → the same path on the new site |
| DNS | Porkbun | `felipeharker.org` A record → Render; `www` CNAME → `hark-site.onrender.com`; `academic`, `birds`, `resume`, `dove` and `alexandria` CNAMEs → their services' `onrender.com` addresses, each the service's custom domain on Render ($0.25 a month each past the plan's two) |
| `hark_portfolio_archive`, `hark_resume_archive`, `hark_birding_archive` | GitHub, archived | The three repositories the 2026-10-19 monorepo replaced; read-only, with their histories. None of the current repositories was made from them |
| `hark_system_archive`, `hark_references_archive`, `hark_parametric_*_archive` | GitHub, archived | The old CODEBASE standards, an unused references repository, and the old parametric repositories |
| `CODEBASE\parametric` | the private `parametric_*` repositories | The Rhino and Grasshopper work and its own standards; nothing here depends on it |
| alexandria.felipeharker.org | Render static site `alexandria-phoenix`, in the Render project Parametric, from the private `alexandria_phoenix` (its `site/`) | A project site built to the standard: it links `hark.css` and `hark.js` from here, so it follows the reader's design. The portfolio's top row links it from two tiles, Parametric Studies (`/studies/`) and the Alexandria Phoenix Documentation (`/`), each in a new tab, and the running head from its Professional menu; its own running head and colophon link Portfolio, the documentation and the studies. Nothing here builds or changes it |
| parametric-living.onrender.com | Render static site `parametric-living`, from the private `parametric_living`, in the Render project Archive | Its own site, outside the family and its standard. Still live, but no longer linked from here (2026-10-27); nothing here builds or changes it |
| parametric-reference.onrender.com | Render static site `parametric-reference`, from the private `parametric_reference`, in the Render project Archive | The same: still live, outside the family on its own copy of the standard, and no longer linked from here (2026-10-27) |
| The GitHub wiki | github.com/felipeharker/hark_web/wiki | A copy of `wiki/`, replaced by `.github/workflows/wiki.yml` on every push to `main` that changes it |
| Fonts | Google Fonts, by a `<link>` on every page (the birding app's in its `layout.tsx`) | Inter and IBM Plex Mono; Source Serif 4, loaded by `hark.js` for the serif design |
| dove.felipeharker.org | Render static site `hark-dove-habitat`, from the public `hark_dove_habitat` | A project site, opened from its portfolio tile and from the birding report's Reference section; its running head and colophon link Portfolio, the Ornithology Report and itself |
| Photos and map tiles | Macaulay Library CDN, Carto | Loaded by the birding report in the reader's browser |
