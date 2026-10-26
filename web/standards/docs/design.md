# Design

How every page on felipeharker.org looks, and why. The values here are the
tokens at the top of [`site/hark.css`](../site/hark.css); to see them
rendered, open `/standards/` ([`site/index.html`](../site/index.html)).

## The design in one paragraph

An index printed in ink on white. Every page is laid on one grid of two
columns: small bracketed labels down the left, and everything a reader reads
from the middle of the page, so the edges of every block line up from the
top of the page to the foot. The page title is set very large, in capitals;
almost everything else is small, and the space between them is what gives
the page its shape. A neutral sans (Inter) carries the words; a monospace
(IBM Plex Mono) is reserved for recorded values — a date, a place, a count,
an address — so a reader can tell at a glance that something is a literal
rather than a sentence about one. There is no colour: black, two greys of
text and white. Structure is whitespace and hairlines, never a box, a tint or
a shadow, and nothing is rounded.

## The rules

These hold on every page. A page that breaks one is wrong, however good it
looks.

- **One grid.** Every block that pairs a label with what it labels — the
  running head, the masthead, the abstract, the contents, a section, a
  plate's caption, the colophon — is laid on the same two columns (`--grid`).
  Labels go in the left column; everything else starts in the right one. A
  block that needs the width — a work list, a plate, a map — spans both, on a
  row of its own. Nothing is centred.
- **Two sizes, far apart.** One very large size for the page title, and small
  ones for everything else. A heading does not need size to be found when it
  is alone in its column; a section is named by a 12px label.
- **Brackets mark the left column.** The kicker, the abstract and contents
  labels and every section heading are drawn in brackets — "[ About ]" — and
  so is the current site in the running head. Nothing else is
  bracketed. The brackets are drawn by the stylesheet, never typed.
- **Two faces, two jobs.** Inter for anything a person wrote; IBM Plex Mono
  for anything read off a record. A stack line, a dateline, a URL and a table
  of counts are mono. A heading, a summary and a back link are not.
- **No bold.** 400 for reading, 500 for noticing — labels, titles, the page
  title itself. 600 is available and rarely wanted. Never 700.
- **No colour.** Ink, two greys and white. The accent is ink: what can be
  clicked is told apart by an underline, a hover, or its place on the page,
  never by a hue. It is still a token, so a part with a reason to re-accent
  sets one value.
- **Hairlines, not boxes.** An ink rule opens each section, across the whole
  page; a grey one separates rows inside it. No tinted panel, no border box,
  no shadow, no radius.
- **Images in grey until asked.** A work-list cover is shown in greys, like
  the page around it, and comes into colour when its tile is hovered. Plates —
  the work itself — are always shown as they are.
- **Nothing the reader sees is numbered.** No numbered sections, figures,
  captions or references. Order on the page is the order; a heading's name is
  the way to refer to it. (Stylesheet sections are numbered so a rule can be
  found — that numbering is for the person editing, not the reader.)
- **Tokens first.** A rule never contains a hex colour or a pixel size that a
  token already names. A value that is needed and has no token gets a token.
- **Quiet motion.** One transition, 140ms ease, on colour, border and the
  grey of a cover only. Nothing slides, fades in on scroll or bounces, and all
  of it switches off for a reader who asks for reduced motion.

## Colour

| Token | Value | Used for |
|---|---|---|
| `--color-bg` | `#ffffff` | The page. White, so a drawing on a white sheet sits on it with no edge. |
| `--color-surface` | `#f4f4f4` | A cover placeholder; a hovered map control. Never a region of the page. |
| `--color-surface-hover` | `#ececec` | Inline code; a neutral tag. |
| `--color-text` | `#111111` | Headings, titles, the labels in the left column. 18.9:1 on white. |
| `--color-text-soft` | `#3a3a3a` | Prose: paragraphs, summaries, lists. 11.4:1. |
| `--color-text-mute` | `#6e6e6e` | Captions, recorded values, eyebrows inside a block. 5.1:1 — the lightest text allowed; nothing lighter is ever set as text. |
| `--color-accent` | `#111111` | Links, controls, selected state. Ink. |
| `--color-accent-hover` | accent mixed 62% with the page | A hovered link: it greys. 5.3:1. Derived — change the accent, not this. |
| `--color-accent-wash` | accent mixed 5% with the page | The ground behind a focused input. Derived. |
| `--color-selection` | `#111111` | Selected text, which inverts: ink ground, white letters. |
| `--color-rule` | `#e5e5e5` | Hairlines between rows inside a section. |
| `--color-rule-strong` | `#111111` | The ink rule above a section, under a masthead, under a table's header, above the colophon. |

To re-accent the whole site, change `--color-accent` alone; both derived
tokens follow.

## Type

**Families.** `--font-body` (Inter) and `--font-mono` (IBM Plex Mono). Every
page loads both from Google Fonts with a `<link>` in its `<head>` — a static
page with the one in [`templates/page.html`](../templates/page.html), the
birding app with the same in its `layout.tsx`, plus the italics its
scientific names need. The browser fetches the fonts; no build downloads
them, so a deploy cannot fail on a font.

**Weights.**

| Token | Value | Used for |
|---|---|---|
| `--weight-regular` | 400 | Everything read at length; a row in a long list. |
| `--weight-medium` | 500 | Noticed: labels, table headers, a button, row titles — and the page title, which at its size needs no more. |
| `--weight-strong` | 600 | Available, rarely wanted. The heaviest weight anywhere. |

**Scale.** The two titles follow the width of the window, between a floor
for a phone and a ceiling at which the longest word of any title still fits
the content column; below 860px, where the title has the whole width, they
follow it more steeply. The rest are fixed, and a few step down below 640px.

| Token | Desktop | Phone | Used for |
|---|---|---|---|
| `--size-title` | 34–84px | 34–72px | The page title, in capitals. |
| `--size-title-record` | 28–48px | 28–44px | The title of a record page whose title names a thing (a checklist's location). |
| `--size-subtitle` | 21px | 18px | The line under the page title. |
| `--size-abstract` | 18px | 17px | The abstract paragraph. |
| `--size-subsection` | 17px | 16px | Row titles: a project, a job; a reference. |
| `--size-body` | 16px | 16px | Paragraphs; a disclosure row's title. |
| `--size-table` | 15px | 15px | Lists, table cells, summaries, a byline, a plate's title. |
| `--size-data` | 13px | 13px | Monospace recorded values. |
| `--size-caption` | 13px | 13px | Captions, descriptions, the colophon. |
| `--size-section` | 12px | 12px | The labels in the left column: section headings, the abstract and contents labels. |
| `--size-fine` | 12px | 12px | The smallest secondary text: a scientific name, a photo caption. |
| `--size-label` | 11px | 11px | Uppercase eyebrows, the kicker, the running head, table headers, tags, buttons. |

**Tracking.**

| Token | Value | Used for |
|---|---|---|
| `--track-display` | -0.045em | The page title — Inter sets loose at display sizes. |
| `--track-tight` | -0.02em | Row titles, the subtitle. |
| `--track-body` | -0.006em | Running prose. |
| `--track-label` | 0.06em | Uppercase labels — small capitals need opening up. |

**Line height** is set per role rather than tokenised: 0.92 for the title,
1–1.4 for labels and headings, 1.6 for the body, 1.65 for reading
paragraphs.

## Space

Every margin, padding and gap is a step on this scale.

| Token | Value | Phone |
|---|---|---|
| `--space-1` | 4px | |
| `--space-2` | 8px | |
| `--space-3` | 12px | |
| `--space-4` | 18px | |
| `--space-5` | 26px | |
| `--space-6` | 40px | |
| `--space-7` | 56px | |
| `--space-8` | 88px | 64px |
| `--space-9` | 136px | 96px |

Between sections: `--space-8` above the ink rule, `--space-4` below it.
Between rows inside a section: `--space-5`, split around a `--color-rule`
hairline. Above the colophon: `--space-9`.

## The grid

| Token | Value | Used for |
|---|---|---|
| `--grid` | `[label] minmax(0, 1fr) [content] minmax(--grid-content-min, 1fr)` | The two columns every gridded block is laid on, with three names: `label`, `content`, and `full` across both. Below 860px all three name one column. |
| `--grid-gap` | `--space-6` | Between the two columns. |
| `--grid-content-min` | 560px | The narrowest the content column gets: the two columns share the width equally until then, and below it the label column gives way. |

A block on the grid puts its label in `grid-column: label` and the rest in
`content`; a part's own block that needs the width (the birding report's
map) uses `full`.

## Shape and measure

| Token | Value | Used for |
|---|---|---|
| `--radius-sm` | 0 | Controls, covers, thumbnails, code. Square; kept as a token so a part with a reason to round has one value to set. |
| `--radius-md` | 0 | A large framed object: the map. Square. |
| `--measure` | 1440px | The page frame: wide enough for three covers across. |
| `--measure-text` | 68ch | Running prose inside the content column. |
| `--doc-pad-top` | `--space-6` (`--space-5` phone) | Headroom between the running head and the page. |
| `--doc-pad-bottom` | `--space-6` | Footroom below the colophon. |
| `--doc-pad-x` | 40px (20px phone) | The gutter to the window edge. |
| `--work-cover-ratio` | 3 / 2 | A work-list cover. |
| `--work-gap` | `--space-6` | Between two tiles of a work list. |
| `--transition` | 140ms ease | Every transition. |

## Breakpoints

| Width | What changes |
|---|---|
| 860px | The grid becomes one column: each label sits above what it labels, and the titles take the whole width. |
| 640px | Some type steps down; the page frame and the two largest spaces tighten; datelines stack one item per line; definition grids put the label above the value; table columns close up. |

The work list needs no breakpoint of its own: its tiles are as many across
as fit at 300px or more. There are no other breakpoints. A part's own
stylesheet uses these two widths too.
