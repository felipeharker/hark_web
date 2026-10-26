# Writing

How text, links and images are written on every page of felipeharker.org.
The stylesheet can make a page look consistent; only these conventions make
it read that way.

## Headings and titles

- **Title Case** for page titles, section headings, row titles and plate
  titles: "Pre-Fab Modular Living", "Species Observed".
- **A heading is a name, not a sentence.** "Experience", not "Where I Have
  Worked".
- **Never numbered.** No "1. Overview", no "Figure 3", no "[2]". The order on
  the page is the order.
- **Kickers** say what kind of page it is — "Portfolio", "Academic",
  "Checklist Report". Write them, the page title and every section heading
  in Title Case in the markup; CSS sets the capitals and draws the brackets.
  Never type either.
- **One `<h1>` per page**, then `<h2>` for sections and `<h3>` for rows and
  plates, without skipping a level.

## Prose

- Summaries in a work list are **one sentence**. They say what the thing is,
  not how good it is.
- Use real punctuation, written as entities in HTML: `&rsquo;` for an
  apostrophe, `&ldquo;` `&rdquo;` for quotes, `&mdash;` for a break in a
  sentence, `&ndash;` for a range.
- Ranges take an en dash with spaces: "Jul. 2024 – Present", "2021 – 2024".
- Months are abbreviated with a full stop where space is short ("Oct.
  2021"), and written out in running prose.

## Recorded values

Anything read off a record — a place, a date, a count, an address, a list of
tools — goes in an element the stylesheet sets in mono: `.dateline`,
`.work-stack`, `.entry-meta`, `.data`, a `.num-cell`. Do not set a sentence
in mono because it looks technical.

Items on one line are separated by a `.sep` span with `aria-hidden="true"` —
`|` in a dateline, `/` in a stack. Never type the separator into the text:
a copied line should come across clean.

## Captions

- Only when the caption says something the image or table does not.
- Sentence case, no full stop needed for a fragment, never numbered.

## Links

- **Link the words that name the place.** "my <a>CV</a>", never "click
  here".
- **Links between the sites in the family open in the same tab** —
  `https://hark-academic.onrender.com/`, `https://hark-birding.onrender.com/`.
  They are one body of work; moving around it is navigation. The
  portfolio's tiles are the exception: each opens its project in a new
  tab, so the front page stays where the reader left it.
- **Links to anyone else's site open in a new tab**, always with
  `target="_blank" rel="noopener noreferrer"`. In the birding app, spread
  `externalLinkProps(href)` from `siteConfig.ts` instead of writing the
  attributes by hand.
- **Every page opens with the running head and ends with the site links**
  in its colophon, the same links in the same order
  ([components.md](components.md), "Running head" and "Colophon").
- An address that is the link's own text — an email, a URL — is written in
  full: `fehark@gmail.com`, not "email me".

## Images

| Kind | Shape | Size | Format | Alt text |
|---|---|---|---|---|
| Work-list cover | 3:2, cropped to fill | 1500 × 1000 or smaller | JPEG, in colour (the page shows it in grey until hovered) | `alt=""` — the title under it names it |
| Plate | Any; full column width | 2000px on the long edge or smaller | JPEG | What the drawing shows, in a few words |
| Lead plate | Any | as a plate | JPEG | as a plate |

- Name files `<project-abbreviation>-<two digits>.jpg`: `lotb-03.jpg`,
  `cmp-07.jpg`. A cover is named after its project: `dead-mall-fall.jpg`.
- Every image below the first screen gets `loading="lazy"`.
- A cover that does not exist yet is a `.work-cover-placeholder`, not a
  stock image.

## Downloads

For now nothing is offered for download: PDFs (board sets, the printed
resume) are kept out of the repository and their links removed
(`planning/decisions.md`). When they come back, a download is linked from the
masthead's dateline ("Project Boards (PDF)"), says it is a PDF in the link
text, and is 10 MB or less.

## Privacy

The repository and the site are public. Never write a street address, anyone
else's contact details, or the name of a client, or show work done for one —
not in a page, and not in a note beside it. The one exception is the birding
report, which shows the eBird exports exactly as they are, location names
included (`planning/decisions.md`).

## The colophon

The last block on every page. It says, in one or two short sentences, what
the page is set in and how it is built, and that it follows these standards:

> Set in Inter and IBM Plex Mono. Static HTML; no framework and no
> JavaScript. Built to the Hark web standards.

A page with something specific to say about its own source (the birding
report's data date) says it first.
