# Portfolio

The front of felipeharker.org, served at `/`: one page. It introduces the
work, links the other sites in the family — the academic projects, the
birding report, the resume, each built in its own repository — and the
project sites Dove Habitat and Alexandria Phoenix, and
says how to get in touch. It is also the one place a reader chooses the
design every site in the family is set in, sans or serif.

## Layout

```
web/portfolio/
  README.md
  site/                       published at /, and nothing else
    index.html                Work, About, Elsewhere
```

Every tile shows a cover taken from its project (`planning/decisions.md`).
Each academic tile shows its project's cover from the academic site
(`https://academic.felipeharker.org/assets/covers/<slug>.jpg`), so there is
one file per cover. The birding report's is one of its own photographs,
linked from the Macaulay Library as the report links them. Dove Habitat's
is a drawing from its site, Alexandria Phoenix's its 33 component icons,
drawn large, and Parametric Studies' the Voronoi study's own cover; all are
3:2, in `site/assets/covers/`.

## The page

| Section | What it holds |
|---|---|
| Running head | Portfolio; Academic, Professional and Birding, each a menu of the projects under it; Resume. Every other page's running head is the plain one |
| Masthead | the name, the line under it, and the design switch — "Type: Sans, Serif" — the one place the design is chosen |
| Work | three rows of tiles, each opening its project in a new tab: Parametric Studies (https://alexandria.felipeharker.org/studies/) and the Alexandria Phoenix Documentation (https://alexandria.felipeharker.org/); the academic projects, one tile each linking its page on https://academic.felipeharker.org/; then the bird projects, the birding report (https://birds.felipeharker.org/) and Dove Habitat (https://dove.felipeharker.org/). Each with a cover from its project |
| About | the biography |
| Elsewhere | the resume (https://resume.felipeharker.org/), GitHub, LinkedIn, email |

Parametric Living and Parametric Reference are no longer linked from the
page, by decision; their sites stay up — see `planning/decisions.md`.

## Editing

| Want to change | Edit |
|---|---|
| A row, the About text, Elsewhere | `site/index.html` (the comment at its top says how to add a row or a cover) |
| A cover | `site/assets/covers/<name>.jpg`: a 3:2 JPEG, 1500 x 1000 or smaller; an academic project's is its own, in `site/assets/covers/` in `hark_academic` |
| An academic project's tile | its `<li class="work">` in `site/index.html`, kept in step with its tile on the academic site |
| Anything shared — type, colour, the work list, the footer | the standard: `web/standards/` |

There is no stylesheet or script of its own: everything on the page is the
shared standard, `/standards/hark.css` and `/standards/hark.js`.

Run `node tools/serve.mjs` from the repository root to see it at
http://localhost:8000/, and `node tools/check.mjs` before committing.

## Design

The work list is a row of tiles across the page — a cover, grey until
hovered, then the title, a short dash and the facts under it. It began as the
previous portfolio's large-cover-left rows, without their drop shadows, hover
lift, orange accent, serif body face and fixed sidebar, and became tiles with
the minimal standard (`planning/decisions.md`). It is a shared component of
the standard, used by the academic site too.
