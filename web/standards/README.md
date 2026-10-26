# Standards

The web design and development standards for every page on felipeharker.org
and the sites beside it — the academic projects, the birding report, the
resume — served at `/standards/`: one shared stylesheet, one shared script,
the rules behind them, and a page that renders all of it.

## What is here

| Path | What it is |
|---|---|
| [`site/hark.css`](site/hark.css) | **The shared stylesheet**, published at `/standards/hark.css`. Tokens first, then every shared component, in numbered sections. Every page links it; nothing copies it. |
| [`site/hark.js`](site/hark.js) | **The shared script**, published at `/standards/hark.js`. Sets every page in the design and accent the reader chose on the front page, and carries the choices between the sites. Every page links it. |
| [`site/favicon.svg`](site/favicon.svg) | **The favicon**, a bracketed H, with `favicon-serif.svg` and PNGs for browsers without SVG icons. Every page links it. |
| [`site/index.html`](site/index.html) | **The specimen page**, `/standards/`: every token and component, rendered by `hark.css` itself. |
| [`docs/design.md`](docs/design.md) | The design rules, and every token: colour, type, space, shape, breakpoints. |
| [`docs/components.md`](docs/components.md) | Every shared class: what it is for and the markup it expects. |
| [`docs/writing.md`](docs/writing.md) | Headings, prose, recorded values, captions, links, images, privacy. |
| [`docs/development.md`](docs/development.md) | Stack, folders, stylesheets, page structure, links, naming, accessibility, checking, deploying. |
| [`templates/page.html`](templates/page.html) | A blank page that already follows the standard. |

Read the docs in that order: design, components, writing, development.

## The design, in one paragraph

An index printed in ink on white. Every page is laid on one grid of two
columns: small bracketed labels on the left, everything else from the middle
of the page. The page title is very large, in capitals; almost everything
else is small. Inter carries the words; IBM Plex Mono is reserved for
recorded values. No colour — the accent is ink — no bold, no boxes, no
shadows and nothing rounded: structure is whitespace and hairlines. Nothing
the reader sees is numbered. That is the sans design; the serif design is
the same page set in Source Serif 4, and the accent may be red or blue as
well as ink; the reader picks on the portfolio's front page.

## Changing the standard

Edit `site/hark.css`, document any new token or class, look at `/standards/`
and every page the change touches, then run `node tools/check.mjs` from the
repository root. The change reaches every page at once — the birding report on its next build — there are no copies
to update. The full steps are in
[`docs/development.md`](docs/development.md#changing-the-standard) and
[`wiki/Changing-the-Standard.md`](../../wiki/Changing-the-Standard.md).

## History

The standard began as the design shared by three separate sites — the
portfolio, the resume and the birding report — each keeping its own copy of
the same tokens, and documented on the birding report's `/design-standards`
page. On 2026-10-19 it was gathered here, beside the pages it governs, as one
stylesheet with no copies (`planning/decisions.md`).
