# Editing the Portfolio

The portfolio is the front of the site, `/`: one page, `web/portfolio/site/index.html`.
Its README is [`web/portfolio/README.md`](../web/portfolio/README.md).

## Common changes

| Change | Where |
|---|---|
| The name, subtitle, location or email at the top | the masthead at the top of `site/index.html` |
| A Work tile | its `<li class="work">` in `site/index.html`, in its row |
| The About text | the About section of `site/index.html` |
| The resume link, GitHub, LinkedIn, email | the Elsewhere section of `site/index.html` |

The pages the rows link to are their own sites, each in its own repository:
the academic projects (`hark_academic`, https://hark-academic.onrender.com/),
the birding report (`hark_birding`, https://hark-birding.onrender.com/) and
the resume (`hark_resume`, https://hark-resume.onrender.com/), and Dove
Habitat (`hark_dove_habitat`, https://hark-dove-habitat.onrender.com/). Links
to them are absolute. A tile's links open its project in a new tab
(`target="_blank" rel="noopener noreferrer"`); the running head, the site
links and Elsewhere stay in the same tab.

## Adding a tile

The Work section is three rows, each its own `<ul class="work-list">`:
Parametric Living (one), the academic projects (three), then the bird
projects (the birding report and Dove Habitat). Parametric Living is a site
built elsewhere, from a private repository: the tile links its address and
nothing more. Copy one `<li class="work">` block into its row. Every tile
carries the same parts in the same order — cover, title, hairline, summary,
stack, kind, link — and a tile without one of them omits the element.

Each academic project has its own tile in the first row, linking its page,
`https://hark-academic.onrender.com/projects/<slug>.html`; a new project gets
one as part of adding it (`hark_academic`'s README, "Adding a project").

## Adding or replacing a cover

Every tile has a cover taken from its project (`planning/decisions.md`); a
new tile without one starts with a `.work-cover-placeholder`.
Inside the tile's `<a class="work-cover">`, replace the whole
`<span class="work-cover-placeholder">` with
`<img src="assets/covers/<name>.jpg" alt="">`, using a 3:2 JPEG at 1500 x
1000 or smaller. An academic project's row uses that project's own cover,
`<img src="https://hark-academic.onrender.com/assets/covers/<slug>.jpg" alt="">`,
not a copy. Never
stand in a stock or invented image.

## Checking

`node tools/serve.mjs`, look at the page at full width and at 390 px, then
`node tools/check.mjs`.
