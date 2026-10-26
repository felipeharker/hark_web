# Decisions

Why felipeharker.org is built the way it is. Newest first. Each entry says
what was decided, why, and what it replaced; reverse one by adding a new
entry, not by editing an old one.

## 2026-10-20 — A cover on every portfolio tile

**Every tile on the front page shows a cover taken from its project.** The
academic projects show their own covers, from
`https://hark-academic.onrender.com/assets/covers/`; the birding report, one
of its own photographs (a Northern Mockingbird, ML 656802002), linked from
the Macaulay Library as the report links its media; Parametric Living, its
axonometric (`living_axo.png`), and Dove Habitat, an exploded perch mount
(`split-ph1.webp`), each set on white at 3:2 and kept in
`web/portfolio/site/assets/covers/`. *Why:* the owner's call — any graphic
from the project, for now. *Replaces:* placeholder covers (below), on the
front page only; the academic site's own index keeps its placeholders.

## 2026-10-20 — Every tile the same size

**A work list's tiles are all one size, whatever the number in a row**: a
third of the page, or 300px if a third is narrower. A row of two or of one
leaves the rest of its line empty. *Why:* the owner's call — the bird
projects' two tiles, and Parametric Living's one, were larger than the
academic projects'. *Replaces:* `auto-fit`, under which two tiles took half
the page each, and the rule that kept a tile alone in its list a third
wide (below), which this covers.

## 2026-10-20 — Parametric Living has a row of its own

**The portfolio's Work section opens with a row holding one tile, Parametric
Living, linking https://parametric-living.onrender.com/ in a new tab**,
above the academic projects. The site is built from the private
`parametric_living`, outside this family; the tile links its address and
nothing else — its repository and its Render service are left as they are,
and the repository is not linked (`AGENTS.md`, rule 4). *Why:* the owner's
call. *Replaces:* nothing; it adds a row.

**A tile alone in its list keeps a tile's width**, a third of the row, in
`hark.css`; on a phone, the whole width. *Why:* alone, a tile spread across
the page, its cover about 1345 x 900.

## 2026-10-20 — Dove Habitat is a project site, with a tile

**Dove Habitat moves to its own public repository, `hark_dove_habitat`, and
its own Render site, `hark-dove-habitat` (https://hark-dove-habitat.onrender.com/),
with a tile on the portfolio.** It was made from the private `dove_habitat`
as it stood at `e4db1c7` — the page built to the standard, before it was
made to stand alone — with a fresh history; that repository is archived as
`dove_habitat_archive`, and the old `dove-habitat` service only redirects,
path and all. The model, the STLs and the PDFs stay on disk in its
`source/`, out of git, and the page no longer offers the PDF. *Why:* the
owner's call. *Replaces:* "The birding report links the Dove Habitat site"
(below), in so far as the site stood alone and was linked from nowhere else;
the birding report's Reference link stays, at the new address.

**A project site is not one of the family.** Its running head and its site
links lead home, to the portfolio, and nowhere else; it still links the
shared stylesheet and the standards. The family — Portfolio, Academic,
Birding, Resume — and every other page's site links are unchanged.
*Why:* the owner's call: a project's site is reached from its tile, and
leads back to the portfolio.

**The portfolio's tiles open their projects in a new tab.** Every tile's
cover, title and address carry `target="_blank" rel="noopener noreferrer"`.
The running head, the site links and Elsewhere stay in the same tab.
*Why:* the owner's call; the front page stays where the reader left it.
*Replaces:* same-tab links from the tiles ("Links between the sites are
absolute and open in the same tab", below).

**The Work section is two rows**: the academic projects, three across, then
the bird projects — the birding report and Dove Habitat — two across. Each
row is its own `.work-list`; the standard spaces one list after another as
it spaces two rows within one. *Replaces:* the one list of four tiles.

## 2026-10-20 — Four repositories, four sites

**The academic projects, the birding report and the resume are their own
repositories and their own sites.** `hark_academic`, `hark_birding` and
`hark_resume` hold what was `web/academic`, `web/birds` and `web/resume`
here, as it stood at b1008cc, with fresh histories; each is a Render static
site on its free `onrender.com` address (`hark-academic`, `hark-birding`,
`hark-resume`). This repository, renamed `hark_web`, keeps the portfolio,
the standard, and the planning and wiki for all four. *Why:* the user's
call — each body of work in a repository of its own. *Replaces:* "One
domain, with paths" (2026-10-19, below), and the monorepo's single deploy.

**Built from this repository, never from the archives.** The new
repositories were made from what was here, not from the earlier
`hark_birding` and `hark_resume`. Those, and every other archived `hark_*`
repository, were renamed `<name>_archive` (unarchived for the rename, then
archived again) so the names were free.

**Still one stylesheet.** `web/standards/site/hark.css` stays here, served
at `https://felipeharker.org/standards/hark.css`. The academic and resume
pages link it by that full address; the birding app fetches it at build time
instead of copying it from a sibling folder. *Why:* one standard with no
copies, as before. *The cost:* the other sites show the standard as it is
deployed, without the fingerprint `hark-site`'s build adds (so for a few
minutes after a deploy they may get the last one), and the birding report
only after its next build, whose fetch is the one thing it downloads
besides its packages.

**Links between the sites are absolute and open in the same tab.** The
running heads, the site links and the portfolio's tiles point at the
`onrender.com` addresses directly, not at a forwarding address, so a link
never takes an extra hop. *Replaces:* root-relative links between parts.

**The old addresses redirect, path and all.** `hark-site` sends
`/academic/*`, `/birds/*` and `/resume/*` to the same path on the new
sites; birds.felipeharker.org and resume-site-0rfl.onrender.com redirect
straight to the new sites; resume.felipeharker.org and a new
academic.felipeharker.org are Porkbun URL forwarding to their front pages.
*Why:* nothing that linked the old paths breaks, and no custom domain is
added on Render.

## 2026-10-20 — The birding report links the Dove Habitat site

**The Dove Habitat site, dove-habitat.onrender.com, is linked from the
birding report's Reference section, and from nowhere else on
felipeharker.org.** The link is `SITE_LINKS.doveHabitat` in the birding
app's `siteConfig.ts` and opens in a new tab, like every off-site link.
*Why:* the owner's call. The cage accessory system is its own project, with
its own site, repository and design; the birding report is where a reader
of this site would look for it. The Dove Habitat site links nothing back: it
has no running head, no site links and no link to the standards, and it
carries its own stylesheet. *Replaces:* nothing; it adds one link.

## 2026-10-20 — Placeholder covers, for now

**Every tile shows a placeholder block instead of a cover**, on the front
page and on `/academic/`: a `.work-cover-placeholder` naming the project,
like the birding report's. *Why:* the owner's call, for now. The cover files
stay in `web/academic/site/assets/covers/`, so bringing one back is its
`<img>` alone. *Replaces:* the three academic covers, on both pages.

## 2026-10-20 — A tile per academic project on the front page

**Each academic project has its own tile on the portfolio**, linking its
page under `/academic/projects/`, beside the birding report's. *Why:* one
tile for all of them hid the projects behind a page that only listed them;
now each one is seen, and reached, from the front page. `/academic/` stays,
as their index. *Replaces:* the single Academic Projects row, and "a row for
each body of work" (One repository, below).

**The front page shows each project's own cover**, root-relative from
`/academic/assets/covers/`. *Why:* one file per cover, so the two pages
cannot show different ones. *Replaces:* `academic-projects.jpg` in the
portfolio, a copy of Living Outside the Box's cover.

## 2026-10-19 — Stylesheet links carry a fingerprint

**`tools/build.mjs` adds a hash of each stylesheet to every static page's
link to it** (`/standards/hark.css?v=3e228ce5fe`). *Why:* Render's CDN caches
each file for up to five minutes, so just after the minimal redesign went
live a phone got the new pages with the old `hark.css`. A changed stylesheet
now has a new address. The source pages keep the plain link, which is what
`tools/check.mjs` and the local server expect. *Replaces:* "nothing is
transformed" in the build.

## 2026-10-19 — No build downloads a font

**The birding app loads its fonts with a `<link>`, like every other page.**
*Why:* `next/font/google` downloaded Inter and IBM Plex Mono during
`next build`, and on Render that step failed (a Turbopack bug in resolving
the downloaded files), so a merge to `main` did not deploy. A build now
fetches nothing it does not have. *Replaces:* `next/font` in the birding
app, and the `--font-sans` / `--font-mono-face` variables it defined.

## 2026-10-19 — A minimal standard

**The standard becomes an index in ink on white.** Every page is laid on
one grid of two columns — bracketed labels on the left, everything a reader
reads from the middle of the page — with a very large page title in
capitals and small type for the rest. *Why:* a more minimal design, after
two references: a portfolio laid out on a two-column grid with tiny
bracketed labels and very large type, and a black-and-white presentation
deck. *Replaces:* the centred masthead, the 1000px centred column and the
section heading set as a 23px title. "Front pages centre, records align
left" goes with them: nothing is centred, and `.masthead--left` is gone.

**No colour.** The accent is ink (`#111111`); a link is told apart by its
underline, its hover or its place. The accent stays a token, so the deep red
`#7c1405` comes back by setting `--color-accent` alone. *Replaces:* the deep
red as the one accent, and the warm greys.

**Square and unboxed.** No radius anywhere, no border around a cover or a
plate, an underline for a text input. Covers are shown in greys until their
tile is hovered; plates — the work itself — always in colour.

**A running head on every page.** The owner's name and a link to every part
of the site, at the top of every page, as well as in the colophon at the
foot. *Why:* the site links were only at the foot of the page, after the
whole of the birding report. *Replaces:* the birding report's own nav bar on
its interior pages. `tools/check.mjs` checks the running head as it checks
the colophon.

**The work list becomes tiles.** Cover over facts, as many across as fit,
instead of one large cover beside its facts per row, so a page of projects
shows them all at once.

## 2026-10-19 — The wiki is a copy of `wiki/`

**The GitHub wiki is published from `wiki/`, never edited on GitHub.**
`.github/workflows/wiki.yml` runs `tools/wiki.mjs` on every push to `main`
that changes `wiki/`; it rewrites the links for the wiki and replaces every
page there. *Why:* a guide changes in the same commit as the thing it
describes (`AGENTS.md`, rule 13), and the wiki is a separate git repository
that no commit here can touch. Keeping the pages here, and the wiki as their
copy, keeps one source. *Replaces:* pushing `wiki/` to the wiki by hand.

## 2026-10-19 — resume.felipeharker.org

**resume.felipeharker.org forwards to `/resume/`, through Porkbun.**
Porkbun's free URL forwarding sends it to `https://felipeharker.org/resume/`
with a permanent (301) redirect, over HTTP and HTTPS. *Why:* the resume was
the one redirect with only an `onrender.com` address; this gives it a short
one on the site's own domain at no cost and with no change to Render, where
a custom domain beyond the Hobby plan's two costs $0.25 a month. It is a
redirect, not a site, so "One domain, with paths" still holds.
`resume-site-0rfl.onrender.com` keeps redirecting, for old links.
*Replaces:* nothing; it adds an address.

## 2026-10-19 — The old system repositories, archived

**`hark_system` is archived.** Its web standard already lives here; its
Rhino / Grasshopper and repository standards went to
`parametric_living_standards`, in the separate parametric workspace. Its
pull request handing the web styles to this repository was closed without
merging. *Why:* each standard now lives with the work it governs, and
nothing reads `hark_system`. *Replaces:* "the rest of the CODEBASE
standards stay in `hark_system`" (One repository, below).

**Third-party material stays on disk, out of git.** It goes in a part's
`source/` or the birding report's `notebook/`, both ignored. *Why:* the
`hark_references` repository meant for it was never used, and is archived.
*Replaces:* `hark_references` as its home.

## 2026-10-19 — The open questions, settled

**The resume carries no phone number and no referees' email addresses.**
The contact line is the city and an email address; each reference is a name
and a role. *Why:* the repository and the site are public, and those details
are private. *Replaces:* the phone number in the contact line and an email
address under each referee.

**Alexandria stays out of the portfolio, and the PDFs out of the
repository.** Both entries below stand, unchanged; neither comes back now.

**The birding report shows the eBird exports exactly as they are.** Every
location name — "Home (private)" and those named by an address included —
every map pin and every field is published as eBird exports it. Nothing is
renamed, hidden or filtered, in eBird or at build time. *Why:* the report is
the eBird record, shared as it is. It is the one exception to "no street
address" (`AGENTS.md`, rule 3).

## 2026-10-19 — One repository

**The `hark` folder becomes one repository.** The portfolio, the birding
report and the resume — the three folders in `hark` — are organised into one
repository with the academic projects and the web standard, under `web/`. The
repository root holds the tools, the wiki and the planning. *Why:* one person
maintains five parts that share one design and link to each other. Separate
repositories bought no isolation and cost a copy of the stylesheet in each, a
sync to keep the copies in step, and five commits for one change to the
standard. *Replaces:* `hark_portfolio`, `hark_resume` and `hark_birding`,
which are archived.

**Built from the folder, as a new repository.** The content is what was in
the `hark` folder, standardised and reorganised, plus the tools and docs made
for it. Work that existed only elsewhere — unmerged branches and later
commits in the old repositories, and other CODEBASE repositories — is not
brought in. The history starts fresh; the old repositories keep theirs.

**Public.** *Why:* nothing in it is private once the street address is taken
out of the resume's Markdown copy, and the birding notebook (personal notes,
third-party field guides) stays on disk, out of git. Every other CODEBASE
repository stays private, so no page links one.

**One domain, with paths.** `/` portfolio, `/academic/`, `/birds/`,
`/resume/`, `/standards/`, all from one Render static site. *Why:* one
deploy, no DNS record per site, and links between parts that are just paths.
birds.felipeharker.org and resume-site-0rfl.onrender.com redirect to their
paths. *Replaces:* those addresses as separate sites, and the planned
academic site on its own `onrender.com` address.

**The academic projects are their own part.** `/academic/` holds the three
University of Houston projects that were pages of the portfolio. *Why:* the
portfolio becomes the front page — a row for each body of work, About, and
how to get in touch — with no pages of its own.

**Alexandria is out of the portfolio, for now.** Its row and links are
removed. *Why:* it has its own site and will be linked from there when it
returns.

**PDFs are out of the repository, for now.** Board sets are ignored (`*.pdf`)
and every link to one is removed; the files stay on disk in
`web/academic/source/`. *Why:* they were most of the repository's size, and
nothing on the site depends on them.

**The web standard lives here, as one stylesheet with no copies.**
`web/standards/site/hark.css`, linked by every page at `/standards/hark.css`,
with docs, a specimen page and `tools/check.mjs`. The birding app copies it
in at build time. *Why:* the standard and the pages it governs change
together, in one commit. It was built from the three sites' own stylesheets:
the components they shared became one set (masthead, work list, entries,
plates, definition grid, disclosures, controls, colophon); four names for the
label/value grid became `.facts`; three separator classes became `.sep`; two
back links became `.backlink`. *Replaces:* the copy of the tokens in each
site, and the birding report's `/design-standards` page. The rest of the
CODEBASE standards stay in `hark_system`.

**Links between parts open in the same tab.** Root-relative, same tab; links
to anyone else open a new tab. *Why:* it is one site, and moving around it is
navigation.
