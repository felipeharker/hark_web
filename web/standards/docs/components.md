# Components

Every class [`site/hark.css`](../site/hark.css) defines, in the order the
stylesheet defines them, with the markup it expects. Each one is rendered on
the specimen page, `/standards/` ([`site/index.html`](../site/index.html)).

A page uses these classes as written. If a part of the site needs something
none of them does, it goes in that part's own stylesheet — and if a second
part then needs it, it moves here.

`node tools/check.mjs` fails if a class in the stylesheet is missing from
this page.

## Page frame

| Class | What it is | Used on |
|---|---|---|
| `.doc` | The frame a page sits inside, under the running head. One per page, on `<article>`. | Every page |
| `.visually-hidden` | Text for screen readers only — a label for an input that shows an icon instead. | Birds |

**The grid.** The running head, `.masthead`, `.abstract`, `.contents`,
`.section`, a plate's `<figcaption>` and `.colophon` are each laid on the
same two columns ([design.md](design.md), "The grid"). Each puts its label —
`.kicker`, `.abstract-label`, `.toc-label`, `.section-heading`,
`.plate-title`, `.site-links` — in the left column, on the baseline of the
first line beside it, and everything else in the right column, one row each
in the order of the markup. Below 860px the label sits above. No markup is
needed for any of it beyond the classes below.

## Masthead

The block at the top of a page: kicker, title, subtitle, byline, dateline.
Only the title is required; omit any other line rather than leave it empty.

```html
<header class="masthead">
  <p class="kicker">Portfolio</p>
  <h1 class="title">Felipe E. Harker</h1>
  <p class="subtitle">Computational design, architecture, and the tools built alongside them</p>
  <p class="dateline">
    <span>Houston, TX</span>
    <span class="sep" aria-hidden="true">|</span>
    <a href="mailto:fehark@gmail.com">fehark@gmail.com</a>
  </p>
</header>
```

| Class | What it is |
|---|---|
| `.masthead` | The `<header>` of the page's `<article>`, laid on the grid. |
| `.kicker` | The bracketed label in the left column, on the baseline of the title's last line: what kind of page this is. |
| `.title` | The page's `<h1>`, in the right column: very large, in capitals, a word too long for the column breaking rather than overflowing. One per page. |
| `.subtitle` | One line under the title saying what the subject is. |
| `.byline` | The author, under the subtitle, where the page needs one. |
| `.dateline` | Recorded values — place, address, date — in mono, separated by `.sep` spans. Stacks one per line on a phone. |
| `.masthead--record` | With `.masthead`, for a record whose title names a thing rather than the person (a checklist's location): a smaller title. A `.facts` grid can follow the dateline inside the header. |

Every masthead has the same shape; nothing is centred.

## Abstract

```html
<div class="abstract">
  <p class="abstract-label">Abstract</p>
  <p>…</p>
</div>
```

| Class | What it is |
|---|---|
| `.abstract` | One labelled paragraph under the masthead, a step larger than body text, in the right column. |
| `.abstract-label` | Its bracketed label, in the left column. |

## Contents

```html
<nav class="contents" aria-label="Contents">
  <p class="toc-label">Contents</p>
  <ul class="toc">
    <li><a href="#sec-map">Map</a></li>
  </ul>
</nav>
```

| Class | What it is |
|---|---|
| `.contents` | The `<nav>`, laid on the grid. |
| `.toc-label` | The bracketed label, in the left column. |
| `.toc` | The index, in the right column: one entry per line. |
| `.toc--inline` | With `.toc`: entries on one wrapping line. For a short index of one-word entries (the resume). |

Each entry's text is the section heading's text, exactly. Section ids are
`sec-<name>`.

## Sections

```html
<section class="section" id="sec-about">
  <h2 class="section-heading">About</h2>
  …
</section>
```

| Class | What it is |
|---|---|
| `.section` | A top-level block, laid on the grid and opened by an ink rule across the page. |
| `.section-heading` | Its `<h2>`: a plain name, never numbered, set as a small bracketed label in the left column. |

A `.work-list` or a `.plate` in a section spans both columns, on a row of its
own under the heading. So should any block of a part's own that leads a
section and has no text of its own (the birding report's map): beside the
heading, it would pull the heading down to its foot.

## Body copy

| Class | What it is |
|---|---|
| `.body-text` | A paragraph, capped at the reading measure. |
| `.list` | A bulleted list in prose. |
| `.label` | An uppercase eyebrow above any block. |
| `.caption` | Under a figure or table, when it says something the content does not. Sentence case, unnumbered. |
| `.data` | A run of recorded data inside prose: mono, tabular figures. |
| `.empty` | The line shown where a list has nothing in it ("No field notes yet."). |
| `.sep` | The separator between items on one line. Always `aria-hidden="true"`. Never type a pipe or slash into the text instead. |

## Rules

| Class | What it is |
|---|---|
| `.rule` | `<hr>` for a major division: under a masthead. Ink. |
| `.rule-soft` | `<hr>` for a minor division within a block. Grey. In a work-list tile, a short ink dash under the title. |

## Tables

```html
<div class="table-scroll">
  <table class="table">
    <thead><tr><th>Species</th><th class="num-cell">Count</th></tr></thead>
    <tbody><tr><td>Killdeer</td><td class="num-cell">2</td></tr></tbody>
  </table>
</div>
```

| Class | What it is |
|---|---|
| `.table` | A data table: horizontal hairlines only. |
| `.num-cell` | On a `<th>` and its `<td>`s: a right-aligned numeric column. Cells are mono. |
| `.table-scroll` | Wrapper that lets a wide table scroll inside itself. |

## Definition grid

```html
<dl class="facts">
  <dt>Languages</dt>
  <dd>English (Native), Portuguese (Native), Spanish (Proficient)</dd>
</dl>
```

| Class | What it is |
|---|---|
| `.facts` | A `<dl>` of label / value pairs. Values are prose. Stacks on a phone. |
| `.facts--data` | With `.facts`: the values are recorded data, so mono, and the grid is denser. |

## Disclosure rows

A long list is a list of native `<details>` rows: the page starts as an
index and each row opens in place.

```html
<details class="disclosure">
  <summary>
    <span class="disclosure-heading">
      <span class="disclosure-title">Sheldon Lake State Park</span>
      <span class="disclosure-hint">
        <span class="hint-closed">Show</span><span class="hint-open">Hide</span>
      </span>
    </span>
  </summary>
  <div class="disclosure-body">
    <p class="disclosure-meta"><span>Harris, US-TX</span><span>42 observations</span></p>
    <div class="detail-group">…</div>
    <div class="detail-group">…</div>
  </div>
</details>
```

| Class | What it is |
|---|---|
| `.disclosure` | The `<details>` row. |
| `.disclosure-heading` | Inside `<summary>`: title left, hint right. |
| `.disclosure-hint` | "Show" / "Hide" — names the action, never a count. |
| `.hint-closed` | The word shown while the row is closed. |
| `.hint-open` | The word shown while it is open. CSS picks; no script needed. |
| `.disclosure-body` | Everything the row reveals. |
| `.disclosure-meta` | The row's line of recorded values, under its heading. |
| `.detail-group` | One block in an open row; blocks are spaced, never ruled. |

`.disclosure-title` carries no style of its own; it is the hook a page uses
to mark a selected row (the birding report sets the open location's title in
the accent).

## Controls

| Class | What it is |
|---|---|
| `.btn` | A text button: small caps inside an ink hairline, filled with ink on hover. |
| `.tag` | A small solid ink block for something the reader should notice ("Incomplete"). |
| `.tag--neutral` | With `.tag`: a grey one that merely classifies (a breeding code). |
| `.field` | Wrapper for a text input with an icon inside it. |
| `.field-icon` | The icon, at the start of the line. |
| `.input` | The text input: an ink underline, not a box. |
| `.toolbar` | A row with a caption on the left and a control on the right. |

```html
<div class="field">
  <label for="filter" class="visually-hidden">Filter locations by name</label>
  <span class="field-icon">…svg…</span>
  <input id="filter" class="input" placeholder="Filter by name…">
</div>
```

## Design switch

The one place a reader picks the design every site in the family is set
in, sans or serif ([design](design.md#the-serif-design)). It is on
felipeharker.org's front page alone, the last line of its masthead; no
other page has one.

```html
<div class="design-switch" role="group" aria-labelledby="design-switch-label" data-design-switch hidden>
  <span class="design-switch-label" id="design-switch-label">Type</span>
  <button type="button" value="sans" aria-pressed="true">Sans</button>
  <button type="button" value="serif" aria-pressed="false">Serif</button>
</div>
```

| Class | What it is |
|---|---|
| `.design-switch` | A line of small capitals, like the running head: a label, then a button for each design. The one in force is bracketed, as the running head brackets the current site; each button is set in the face it chooses. |
| `.design-switch-label` | "Type", in grey. |

It ships `hidden`, and `hark.js` shows it, so without the script there is
no control that does nothing. The script finds it by `data-design-switch`
and only on felipeharker.org, keeps each button's `aria-pressed` true to the
design in force, and remembers the choice.

## Work list

One project or site per tile, the tiles side by side across the whole width
of the page. Every tile is the same size — a third of the page, or 300px if
a third is narrower — so three to a row on a wide screen and one on a phone,
and a row of two, or of one, leaves the rest of its line empty rather than
stretching its tiles. Every tile has the same seven parts in the
same order; a tile without one of them omits the element.

```html
<ul class="work-list">
  <li class="work">
    <a class="work-cover" href="…" aria-hidden="true" tabindex="-1">
      <img src="assets/covers/name.jpg" alt="">
    </a>
    <div class="work-facts">
      <h3 class="work-title"><a href="…">Living Outside the Box</a></h3>
      <hr class="rule-soft">
      <p class="work-summary">One sentence on what it is.</p>
      <p class="work-stack">
        <span>Rio de Janeiro, Brazil</span>
        <span class="sep" aria-hidden="true">/</span>
        <span>Residential</span>
      </p>
      <p class="work-kind">Academic</p>
      <a class="work-link" href="…">Project Page</a>
    </div>
  </li>
</ul>
```

| Class | What it is |
|---|---|
| `.work-list` | The `<ul>`. Spans both columns of a section. |
| `.work` | One tile. Hovering anywhere on it brings the cover into colour and underlines the title together. |
| `.work-cover` | The cover frame: fixed ratio, no border. Its image is shown in greys until the tile is hovered. It duplicates the title link, so it is `aria-hidden="true" tabindex="-1"` and its image has `alt=""`. |
| `.work-cover-placeholder` | Inside `.work-cover` until there is an image: names the project and says the cover is pending. |
| `.work-cover-placeholder .name` | The project's name in the placeholder. |
| `.work-cover-placeholder .note` | "Cover pending". |
| `.work-title` | The tile's `<h3>` and its link. |
| `.work-summary` | One sentence on what it is. |
| `.work-stack` | What it is made of or where it is: literals, mono, separated by `.sep`. |
| `.work-kind` | What kind of work: Academic, Professional, Personal. |
| `.work-link` | The tile's address, in small caps: "Project Page", "Project Site". |

`.work-facts` holds everything under the cover; it carries no style of its
own. The `<hr class="rule-soft">` in it is drawn as a short ink dash.

To give each kind of work a row of its own, put one `.work-list` after
another in the section: each starts a new row, as far below the last as two
rows within one list. The portfolio has three — Parametric Studies and the Alexandria
Phoenix Documentation, two across, then the academic projects, three across, then the bird projects, two
across. Every tile is the same size in all three.

## Entries

```html
<div class="entry">
  <h3 class="entry-title">Bachelor of Architecture</h3>
  <p class="entry-org">University of Houston, Hines College of Architecture and Design</p>
  <p class="entry-meta"><span>Houston, TX</span><span class="sep" aria-hidden="true">|</span><span>2024</span></p>
  <ul class="list">…</ul>
</div>
```

| Class | What it is |
|---|---|
| `.entry` | One job, school or dated record; entries are separated by soft hairlines. |
| `.entry-title` | The role or degree. |
| `.entry-org` | The employer or institution. |
| `.entry-meta` | Place and dates, mono, tabular figures. |

## Plates

```html
<figure class="plate">
  <img src="…" alt="The box" loading="lazy">
  <figcaption>
    <h3 class="plate-title">The Box</h3>
    <p class="body-text">…</p>
  </figcaption>
</figure>
```

| Class | What it is |
|---|---|
| `.plate` | A drawing or render across the whole width of the page, with no frame; under it, its `<figcaption>` laid on the grid. |
| `.plate-lead` | With `.plate`: the plate between the masthead and the first section. |
| `.plate-title` | The plate's `<h3>`, in the left column; its text goes in the right. |

## References

```html
<ul class="reference-list">
  <li>
    <a href="https://github.com/felipeharker">GitHub</a>
    <span class="desc">Source for the software on this page.</span>
  </li>
  <li>
    <span class="name">A Referee</span>
    <span class="desc">Their role and institution</span>
    <a class="addr" href="mailto:name@example.edu">name@example.edu</a>
  </li>
</ul>
```

| Class | What it is |
|---|---|
| `.reference-list` | A plain list of places to go, at the foot of a page. Never numbered, never cited by marker. A link that opens another site carries a drawn arrow. |
| `.reference-list .name` | An entry's heading when it is a person, not a link. |
| `.desc` | The entry's line of description. |
| `.path` | On the heading link, when the heading is itself an address (an email): mono. |
| `.addr` | A secondary address under the description: how to reach the person. Mono. |

## Running head

The line across the top of every page, before its `<article>`: the owner's
name in the left column, linking to the portfolio, and from the middle
**Portfolio, then the pages of the section the page belongs to** — the
section of the portfolio's running head that lists it, in the order below.
The page the reader is on, or the part of a site it sits in, is
bracketed. Every page in a section carries the same links, the colophon
repeats them, and every link opens in the same tab.

| Section | Every page's running head and site links |
|---|---|
| Academic | Portfolio · Academic |
| Professional | Portfolio · Alexandria Phoenix · Parametric Studies |
| Birding | Portfolio · Ornithology Report · Dove Habitat |
| Resume | Portfolio · Resume |
| The standards | Portfolio · Standards |

A dove habitat page, say:

```html
<header class="runhead">
  <a class="runhead-owner" href="https://felipeharker.org/">Felipe E. Harker</a>
  <nav class="runhead-links" aria-label="Site">
    <a href="https://felipeharker.org/">Portfolio</a>
    <a href="https://birds.felipeharker.org/">Ornithology Report</a>
    <a href="/" aria-current="page">Dove Habitat</a>
  </nav>
</header>
```

| Class | What it is |
|---|---|
| `.runhead` | The `<header>` of the page, outside its `<article>`, in the same frame as `.doc` and laid on the grid. |
| `.runhead-owner` | The owner's name, linking to the portfolio, in the left column. |
| `.runhead-links` | The `<nav>` of Portfolio and the section's pages, in the right column. The one the reader is in carries `aria-current="page"` and is bracketed. |

A site's link to its own front page is `/`; the others are absolute. A page
within a site — an academic project, a study, a checklist — keeps its site's
links, with its site's link bracketed; it has no back link, because the
running head is the way up. `tools/check.mjs`, in every repository, fails if
a page's running head or site links are not its section's, in order.

### Menus in the running head

The portfolio's running head is the one with menus: Portfolio, then
Academic, Professional and Birding, each a menu of the projects under it,
then Resume. A menu lists the projects alone — Academic's has no entry for
the academic front page, which every academic page's running head links —
and together the menus reach every site in the family. Every other page has
the plain running head above.

```html
<details class="runhead-menu" name="runhead-menu">
  <summary>Academic</summary>
  <ul class="runhead-menu-list">
    <li><a href="https://academic.felipeharker.org/projects/living-outside-the-box.html">Living Outside the Box</a></li>
    …
  </ul>
</details>
```

| Class | What it is |
|---|---|
| `.runhead-menu` | A `<details>` in `.runhead-links`: its `<summary>` is the heading, in the running head's capitals, with a drawn caret that turns when it opens. Every menu shares one `name`, so opening one closes the others. |
| `.runhead-menu-list` | The entries, dropped below the heading over the white above the masthead, between an ink rule and a grey one, on a ground of white. Project names in the body face, not capitals. Below 640px it spans the running head. |

It opens and closes with no script. `hark.js` also closes an open menu when
the reader clicks elsewhere or presses Escape. Its links open in the same
tab, like every link in the running head.

## Back link

```html
<a class="backlink" href="../">&larr; Academic Projects</a>
```

| Class | What it is |
|---|---|
| `.backlink` | Above the masthead, in small caps: a way up to the page that lists this one. Not used on the family's pages, whose running head names their section and is the way up; kept for a page outside the sections. |

## Colophon

The foot of every page: the site links — the same links as the running
head, in the same order, so a reader can move on from either end of a page —
then a line on how the page was made. It is the last thing inside `.doc`. On
a site other than felipeharker.org, the standards link is absolute:
`https://felipeharker.org/standards/`. The portfolio's own site links, having
no section, are every site in the family, in the order of `FAMILY` in
[`tools/sites.mjs`](../../../tools/sites.mjs).

```html
<footer class="colophon">
  <nav class="site-links" aria-label="Felipe E. Harker">
    <span class="site-links-owner">Felipe E. Harker</span>
    <a href="https://felipeharker.org/">Portfolio</a>
    <a href="https://birds.felipeharker.org/">Ornithology Report</a>
    <a href="/" aria-current="page">Dove Habitat</a>
  </nav>
  <p>Set in Inter or Source Serif 4, with IBM Plex Mono. Static HTML; no framework.
     Built to the <a href="https://felipeharker.org/standards/">Hark web standards</a>.</p>
</footer>
```

| Class | What it is |
|---|---|
| `.colophon` | The footer block, laid on the grid: an ink rule, then the site links on the left and small grey lines on the right. |
| `.site-links` | The row of the running head's links, in small caps. |
| `.site-links-owner` | The name that leads the row. |

The link the reader is in carries `aria-current="page"` and is set in ink;
the rest are grey. `tools/check.mjs`, in every repository, fails if a page's
site links are not its running head's, or if the page does not link the
standards.
