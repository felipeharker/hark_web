# Portfolio

The front of felipeharker.org, served at `/`: one page. It introduces the
work, links the other sites in the family — the academic projects, the
birding report, the resume, each built in its own repository — and the
project site Dove Habitat, and says how to get in touch.

## Layout

```
web/portfolio/
  README.md
  site/                       published at /, and nothing else
    index.html                Work, About, Elsewhere
    assets/cards/             a title card's graphic for each tile, one SVG
```

Every tile's cover is a title card (`planning/decisions.md`): what kind of
work and the title, over a background graphic that is the project's own — a
line drawing of its idea, the same size, weight and placement on every card.
The graphics are in `site/assets/cards/`, named after their projects, and
drawn to the rules in the standard
([components.md](../standards/docs/components.md), "Title card").

## The page

| Section | What it holds |
|---|---|
| Work | three rows of tiles, each opening its project in a new tab: Parametric Living (https://parametric-living.onrender.com/), alone; the academic projects, one tile each linking its page on https://hark-academic.onrender.com/; then the bird projects, the birding report (https://hark-birding.onrender.com/) and Dove Habitat (https://hark-dove-habitat.onrender.com/). Each with a title card for its cover |
| About | the biography |
| Elsewhere | the resume (https://hark-resume.onrender.com/), GitHub, LinkedIn, email |

Alexandria is left out for now, by decision — see `planning/decisions.md`.

## Editing

| Want to change | Edit |
|---|---|
| A row, the About text, Elsewhere | `site/index.html` (the comment at its top says how to add a row or a title card) |
| A title card | its `<span class="title-card">` in `site/index.html`; its graphic, `site/assets/cards/<slug>.svg`, drawn to the rules for one |
| An academic project's tile | its `<li class="work">` in `site/index.html`, kept in step with its tile on the academic site |
| Anything shared — type, colour, the work list, the footer | the standard: `web/standards/` |

There is no stylesheet of its own: everything on the page is the shared
standard, `/standards/hark.css`.

Run `node tools/serve.mjs` from the repository root to see it at
http://localhost:8000/, and `node tools/check.mjs` before committing.

## Design

The work list is a row of tiles across the page — a cover, grey until
hovered, then the title, a short dash and the facts under it. Here every
cover is a title card, so the row reads as a set and each card by its
drawing. It began as the
previous portfolio's large-cover-left rows, without their drop shadows, hover
lift, orange accent, serif body face and fixed sidebar, and became tiles with
the minimal standard (`planning/decisions.md`). It is a shared component of
the standard, used by the academic site too.
