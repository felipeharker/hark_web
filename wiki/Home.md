# hark_web wiki

How to do things with felipeharker.org. The [README](../README.md) says what
is where; [ARCHITECTURE](../ARCHITECTURE.md) shows how it fits together; the [standards](../web/standards/README.md) say what every page
must be; the [planning](../planning/roadmap.md) folder says what is next.
These pages say how.

## Guides

| Guide | When you need it |
|---|---|
| [Running Locally](Running-Locally.md) | Seeing the site on your machine before anything is pushed. |
| [Editing the Portfolio](Editing-the-Portfolio.md) | Changing the front page: its rows, a cover, the About text. |
| [Changing the Standard](Changing-the-Standard.md) | A token, a component, or a rule every page follows. |
| [Deploying](Deploying.md) | How a push becomes the live site, and the Render settings. |

The academic projects, the birding report and the resume are their own
sites, each in its own repository, and their guides are in their READMEs:
[`hark_academic`](https://github.com/felipeharker/hark_academic) (adding a
project), [`hark_birding`](https://github.com/felipeharker/hark_birding) (new
eBird data, a field note, the report's settings) and
[`hark_resume`](https://github.com/felipeharker/hark_resume) (editing the
resume, and checking it prints).

## The short version

```bash
node tools/serve.mjs        # see the site at http://localhost:8000/
node tools/check.mjs        # check it before every commit
git push                    # main is live: Render deploys every push
```

## Using these pages on GitHub

This folder is written to read well in the repository, and is published as
the repository's [GitHub wiki](https://github.com/felipeharker/hark_web/wiki)
too. The workflow `.github/workflows/wiki.yml` runs `tools/wiki.mjs` on every
push to `main` that changes `wiki/`: it rewrites the links for the wiki (a
page here becomes a wiki page, a file elsewhere in the repository a link to
it on GitHub) and replaces every page on the wiki with these.
`_Sidebar.md` and `_Footer.md` become the wiki's sidebar and footer.

- **Edit here, never on the wiki.** A change made on GitHub is replaced by
  the next push.
- **A new page** is a new file here, named the way its title reads
  (`Editing-the-Portfolio.md`), with a row in the guides table above
  and a line in `_Sidebar.md`.
- **Links** are relative paths, as anywhere in the repository.
  `node tools/check.mjs` fails on one that leads nowhere.
- **The first time**, GitHub has no wiki to push to until its first page
  exists: open Wiki on GitHub, create the first page, save it, then run the
  Wiki workflow (Actions → Wiki → Run workflow). It replaces that page.
