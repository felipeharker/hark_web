# Roadmap

What is done, what is waiting, and what is next for felipeharker.org and the
sites beside it. Why
things are the way they are is in [decisions.md](decisions.md). Tick an item
when it is done, with the date.

## Now: four repositories, four sites (2026-10-20)

- [x] Rename every archived `hark_*` repository to `<name>_archive`
      (2026-10-20)
- [x] Make `hark_academic`, `hark_birding` and `hark_resume` (public) from
      this repository's `web/academic`, `web/birds` and `web/resume`, with
      their own tools, READMEs and agent guides (2026-10-20)
- [x] Render static sites `hark-academic`, `hark-birding`, `hark-resume` on
      their `onrender.com` addresses (2026-10-20)
- [x] Rename `hark` to `hark_web`; the portfolio and the standard link the
      new sites (2026-10-20)
- [x] `hark-site` redirects: `/academic/*`, `/birds/*`, `/resume/*` → the
      new sites, path and all (2026-10-20)
- [x] The old redirect services (`hark-birding-redirect`,
      `hark-resume-redirect`) point their rules at the new sites (2026-10-20)
- [x] Porkbun: resume.felipeharker.org forwards straight to
      `https://hark-resume.onrender.com/`, and academic.felipeharker.org to
      `https://hark-academic.onrender.com/`, both permanent (2026-10-20)
- [x] Dove Habitat: `hark_dove_habitat` (public) from the private
      `dove_habitat`, now `dove_habitat_archive`; Render `hark-dove-habitat`;
      a tile on the portfolio; `dove-habitat` redirects (2026-10-20)
- [ ] **Yours:** rename the local folder `CODEBASEhark` to
      `CODEBASEhark_web` (close the sessions using it first)

## Before: the move to one repository (started 2026-10-19)

The site moved from three repositories and three Render services to this one
repository and one service.

- [x] Organise the `hark` folder — portfolio, academic, birding, resume — into
      one repository, with a web standard, tools, a wiki and these planning
      docs (2026-10-19)
- [x] Split the academic projects out to `/academic/`; Alexandria out of the
      portfolio; PDFs out of the repository (2026-10-19)
- [x] One shared stylesheet with docs, a specimen page and a check
      (2026-10-19)
- [x] Publish `felipeharker/hark` on GitHub (public) (2026-10-19)
- [x] Create the `hark-site` static site on Render:
      https://hark-site.onrender.com (2026-10-19; it replaced a first service
      that kept serving files from its earlier deploys)
- [x] Move the custom domains `felipeharker.org` and `www` from "Portfolio
      Website" to `hark-site`; felipeharker.org verified, certificate issued, live
      (2026-10-19)
- [x] www.felipeharker.org verified on `hark-site`, certificate issued; it
      redirects to felipeharker.org (2026-10-19)
- [x] Porkbun: the `www` CNAME points at `hark-site.onrender.com`, no longer
      at the old portfolio service (2026-10-19)
- [x] Render tidy-up: "Portfolio Website" and "Portfolio Site" deleted;
      `hark-site`, the two redirect services (now `hark-birding-redirect` and
      `hark-resume-redirect`) and `anna-grades` grouped in the project Hark
      (2026-10-19)
- [x] Archive the replaced repositories `hark_parametric_city`,
      `hark_parametric_dwelling`, `hark_parametric_design` (replaced by the
      `parametric_*` repositories), `hark_parametric_graphics` and the unused
      `hark_references` (2026-10-19)
- [x] Redirect rule on the old "Birding Website" (birds.felipeharker.org):
      `/*` → `https://felipeharker.org/birds/*` (2026-10-19)
- [x] Redirect rule on the old "Resume Website"
      (resume-site-0rfl.onrender.com): `/*` → `https://felipeharker.org/resume/*`
      (2026-10-19)
- [x] resume.felipeharker.org: Porkbun URL forwarding, a permanent redirect
      to `https://felipeharker.org/resume/` (2026-10-19)
- [x] Both old services publish only a one-line page that forwards their
      homepage to the new path, so every address redirects (2026-10-19)
- [x] Suspend "Portfolio Website" and "Portfolio Site" (2026-10-19)
- [x] Archive `hark_portfolio`, `hark_resume` and `hark_birding` on GitHub
      (2026-10-19)
- [x] Archive `hark_system`; its pull request handing the web styles to
      this repository closed without merging (2026-10-19)
- [ ] **Yours:** once you are happy, delete
      `CODEBASE\_retired\hark_clones_2026-10-19` (the old local clones)

## Open decisions

These are yours to make; nothing changes until you do.

- **The employer's name on the resume.** It is on the page, by name.

Decided (the reasons are in [decisions.md](decisions.md)):

- [x] Resume contact details: no phone number and no referees' email
      addresses; references are names and roles (2026-10-19)
- [x] Alexandria: stays out of the portfolio, for now (2026-10-19)
- [x] PDFs: stay out of the repository, for now (2026-10-19)
- [x] Birding locations: the eBird exports are shown exactly as they are,
      location names and map pins included; nothing is renamed, hidden or
      filtered (2026-10-19)

## Next

- **Covers for every tile**: the portfolio's tiles each have one, from the
  project, for now (2026-10-20); the academic site's index still shows
  placeholders.
- **A check on every push.** A GitHub Actions workflow in each repository
  running its `node tools/check.mjs` (and, in `hark_birding`, the build),
  so a broken link never reaches `main`.
- **Rebuilding the birding report when the standard changes.** It carries
  the stylesheet from its last build; a deploy hook called from `hark_web`
  could keep it in step.
- **The GitHub wiki.** `.github/workflows/wiki.yml` publishes `wiki/` to it
  on every push to `main` that changes it (2026-10-19). **Yours:** create the
  wiki's first page on GitHub once, then run the Wiki workflow (see
  `wiki/Home.md`).
