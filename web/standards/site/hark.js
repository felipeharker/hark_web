/* ============================================================================
   HARK STANDARDS — SHARED SCRIPT
   ----------------------------------------------------------------------------
   The one script every page in felipeharker.org's family loads, in its
   <head>, straight after the stylesheet, and not deferred: it has to run
   before the page is drawn.

     <script src="/standards/hark.js"></script>                          felipeharker.org
     <script src="https://felipeharker.org/standards/hark.js"></script>  every other site

   Nothing on a page depends on it. Without it a page is the sans design in
   ink, its running head menus still open and close, and the switch on the
   front page stays hidden.

   WHAT IT DOES
   1. The reader's choices. The standard lets a reader choose two things:
      the design, sans (the default) or serif, and the accent, ink (the
      default), red or blue (hark.css, section 1). This marks
      <html data-design="…" data-accent="…"> with them before the page is
      drawn, so a page never flashes another, loads Source Serif 4 when the
      serif is wanted, and sets the favicon to the design's letter.
   2. Carrying them. The choices are made in one place, the switch on
      felipeharker.org's front page. Every site is its own origin, and a
      browser keeps each origin's storage to itself, so the choices travel in
      the address: a link to another site in the family gains
      ?design=serif&accent=red (whichever were chosen) as it is followed, and
      the site it lands on keeps the values and takes them out of the
      address. felipeharker.org never takes a value in, and links to it never
      carry one, so no other site can change a choice.
   3. The switch, on the front page: it shows it and makes it work.
   4. The running head's menus: an open one closes when the reader clicks
      elsewhere or presses Escape.

   The other sites in the family are listed in SITES; tools/check.mjs fails
   if one in FAMILY (tools/sites.mjs) is missing. A project site outside the
   family that links this script — Dove Habitat — is listed too.
   ========================================================================= */

(() => {
  'use strict';

  // The site that serves this script is the one where the choices are made:
  // felipeharker.org, or the local server when it is served from source.
  const HOME = document.currentScript
    ? new URL(document.currentScript.src).origin
    : 'https://felipeharker.org';

  const SITES = [
    'https://hark-academic.onrender.com',
    'https://hark-birding.onrender.com',
    'https://hark-resume.onrender.com',
    'https://hark-dove-habitat.onrender.com',
  ];

  // Each choice: its values, the first the default. Its name is the
  // attribute on <html> (data-…), the address's parameter, and, after
  // `hark-`, its key in storage.
  const CHOICES = {
    design: ['sans', 'serif'],
    accent: ['ink', 'red', 'blue'],
  };

  const SERIF_FONT =
    'https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400..600;1,8..60,400&display=swap';

  const root = document.documentElement;
  const atHome = location.origin === HOME;

  // Storage can be refused (a locked-down browser); then a choice holds for
  // this page only.
  const read = (name) => {
    try { return localStorage.getItem(`hark-${name}`); } catch { return null; }
  };
  const keep = (name, value) => {
    try { localStorage.setItem(`hark-${name}`, value); } catch { /* this page only */ }
  };

  // What the reader has chosen; a choice never made is null.
  const chosen = {};
  for (const name in CHOICES) {
    const value = read(name);
    chosen[name] = CHOICES[name].includes(value) ? value : null;
  }

  // -- 2a. Take in choices carried from another site --------------------------
  if (!atHome) {
    const url = new URL(location.href);
    let carried = false;
    for (const name in CHOICES) {
      if (!url.searchParams.has(name)) continue;
      const value = url.searchParams.get(name);
      if (CHOICES[name].includes(value)) {
        chosen[name] = value;
        keep(name, value);
      }
      url.searchParams.delete(name);
      carried = true;
    }
    if (carried) history.replaceState(history.state, '', url);
  }

  // -- 1. Set the choices, before the page is drawn ---------------------------
  let serifLoaded = false;

  // The favicon is the design's letter: favicon.svg or favicon-serif.svg,
  // beside this script. A page whose icon link comes after the script gets
  // it set again once the page is read (wire, below).
  function setIcon() {
    const icon = document.querySelector('link[rel="icon"][type="image/svg+xml"]');
    if (!icon) return;
    const name = chosen.design === 'serif' ? 'favicon-serif.svg' : 'favicon.svg';
    const href = icon.href.replace(/favicon(-serif)?\.svg/, name);
    if (href !== icon.href) icon.href = href;
  }

  function apply() {
    for (const name in CHOICES) root.dataset[name] = chosen[name] || CHOICES[name][0];
    if (chosen.design === 'serif' && !serifLoaded) {
      serifLoaded = true;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = SERIF_FONT;
      document.head.appendChild(link);
    }
    setIcon();
  }

  apply();

  // -- 2b. Carry the choices on a link to another site in the family ----------
  // At the moment the link is followed, not when the page loads, so a link a
  // page draws later (the birding app's) carries them too. A reader who has
  // never chosen carries nothing.
  function carry(event) {
    const link = event.target instanceof Element && event.target.closest('a[href]');
    if (!link) return;
    let url;
    try { url = new URL(link.href); } catch { return; }
    if (url.origin === location.origin || !SITES.includes(url.origin)) return;
    let changed = false;
    for (const name in CHOICES) {
      if (!chosen[name]) continue;
      url.searchParams.set(name, chosen[name]);
      changed = true;
    }
    if (changed) link.href = url.href;
  }

  for (const type of ['click', 'auxclick', 'contextmenu']) {
    document.addEventListener(type, carry, true);
  }

  // -- 3. The switch -----------------------------------------------------------
  // One row per choice: <div class="design-switch" data-switch="design">,
  // its buttons' values the choice's values.
  function wireSwitch() {
    if (!atHome) return;
    for (const row of document.querySelectorAll('[data-switch]')) {
      const name = row.dataset.switch;
      if (!CHOICES[name]) continue;
      const buttons = [...row.querySelectorAll('button[value]')];
      const show = () => {
        const value = chosen[name] || CHOICES[name][0];
        for (const b of buttons) b.setAttribute('aria-pressed', String(b.value === value));
      };
      for (const b of buttons) {
        b.addEventListener('click', () => {
          chosen[name] = b.value;
          keep(name, b.value);
          apply();
          show();
        });
      }
      show();
      row.hidden = false;
    }
  }

  // -- 4. The running head's menus ---------------------------------------------
  function wireMenus() {
    const menus = [...document.querySelectorAll('details.runhead-menu')];
    if (!menus.length) return;
    // `name` makes them exclusive; this does it where `name` is not known.
    for (const menu of menus) {
      menu.addEventListener('toggle', () => {
        if (menu.open) for (const other of menus) if (other !== menu) other.open = false;
      });
    }
    document.addEventListener('click', (event) => {
      for (const menu of menus) if (menu.open && !menu.contains(event.target)) menu.open = false;
    });
    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      for (const menu of menus) {
        if (!menu.open) continue;
        const hadFocus = menu.contains(document.activeElement);
        menu.open = false;
        if (hadFocus) menu.querySelector('summary').focus();
      }
    });
  }

  function wire() {
    setIcon();
    wireSwitch();
    wireMenus();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wire);
  else wire();
})();
