# Changing the Standard

Every page on felipeharker.org and the three sites beside it links one
stylesheet, `web/standards/site/hark.css` (served at
`https://felipeharker.org/standards/hark.css`). A change to it is a change to
every page at once — which is the point, and the reason to make it carefully. The rules are in
[`web/standards/docs/`](../web/standards/docs/design.md).

## Changing a token

A token is a value at the top of `hark.css`: a colour, a size, a space.

1. Change it in `web/standards/site/hark.css`.
2. Update its row in `web/standards/docs/design.md` (and its contrast ratio,
   if it is a text colour).
3. Look at `/standards/` and at the portfolio, then, once it is deployed, at
   a page of each of the other sites.
4. `node tools/check.mjs`.

## Adding or changing a component

1. Add the class to the right numbered section of `hark.css`, with a comment
   saying why it exists.
2. Add a row for it in `web/standards/docs/components.md`, with its markup.
   `tools/check.mjs` fails until you do.
3. Add a specimen of it to `web/standards/site/index.html`.
4. Use it on the page that needed it, and look at both.

A component used by only one site belongs in that site's own
`site/assets/site.css`, not here. It moves into the standard when a
second site needs it.

## The other sites

The academic and resume pages link the live stylesheet by its full address,
so they change the moment `hark-site` deploys. The birding app imports it at
build time: `npm run dev`, `npm run build` and `npm run lint` fetch it into
`web/src/app/hark.css` in `hark_birding` first. That copy is generated and
ignored by git — never edit it. To try an undeployed change there, run
`HARK_CSS=../../hark_web/web/standards/site/hark.css npm run dev` in
`hark_birding/web`; to carry a deployed change to the live report, redeploy
`hark-birding` (any push, or a manual deploy on Render).

## The two designs

The standard has two designs, sans (the default) and serif, and the serif
is only a set of tokens on `:root:where([data-design='serif'])` at the end
of section 1 of `hark.css` (and its phone sizes in section 19). A new token
that should differ between them gets a value in each; a new rule reads
tokens and never asks which design it is in. To see a page in the serif
design, pick it on the local front page (http://localhost:8000/): the
standards page follows.

The shared script, `web/standards/site/hark.js`, sets the design on every
page and carries it between the sites. A site added to `FAMILY` is added
to `SITES` there too; `tools/check.mjs` fails until it is.

## One commit

The standard and every page here it changed go in one commit, so the
history shows them together. A change it needs on another site goes in that
site's repository, pushed after this one deploys.
