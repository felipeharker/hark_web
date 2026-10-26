# Running Locally

You need Node 20.9 or newer. Python is not needed.

## This site

From the repository root:

```bash
node tools/serve.mjs
```

Open http://localhost:8000/. The portfolio is served at `/` and the
standards at `/standards/`, straight from their source folders, so an edit
shows on the next refresh. The site links to the academic projects, the
birding report and the resume lead to those sites, live.

Use `--port 8080` to pick another port. In the Claude desktop app, the
`site` entry in `.claude/launch.json` starts the same server.

## The other sites

Each has the same tools at its root, in its own repository beside this one:

```bash
cd ../hark_academic && node tools/serve.mjs     # or hark_resume
cd ../hark_birding/web && npm install && npm run dev   # http://localhost:3000/
```

Their pages link the live stylesheet and script at
`https://felipeharker.org/standards/hark.css` and `hark.js`, so they show
the standard as it is deployed, not as it is in this folder. The design a
reader picks on the local front page does not reach them: the choice
travels only on links between the live sites.

## Exactly what Render will publish

```bash
node tools/build.mjs        # assembles dist/
node tools/serve.mjs --dist # serves dist/ at http://localhost:8000/
```

## Checking

```bash
node tools/check.mjs
```

It reports any page that does not link the shared stylesheet or script,
or whose running head or colophon misses a site in the family, any internal
link or image that does not resolve, any file in a `site/` folder that should not be
published, any token or class the standards docs do not cover, and any link
in `wiki/` that leads nowhere. It changes nothing. Each of the other sites
has its own `tools/check.mjs`.
