/* ============================================================================
   HARK STANDARDS — SHARED SCRIPT
   ----------------------------------------------------------------------------
   The one script every page in felipeharker.org's family loads, in its
   <head>, straight after the stylesheet, and not deferred: it has to run
   before the page is drawn.

     <script src="/standards/hark.js"></script>                          felipeharker.org
     <script src="https://felipeharker.org/standards/hark.js"></script>  every other site

   Nothing on a page depends on it. Without it a page is the sans design,
   its running head menus still open and close, and the design switch on the
   front page stays hidden.

   WHAT IT DOES
   1. The design. The standard has two designs, sans (the default) and serif
      (hark.css, section 1). This marks <html data-design="…"> with the
      reader's choice before the page is drawn, so it never flashes the other
      one, and loads Source Serif 4 when the serif is wanted.
   2. Carrying the choice. The choice is made in one place, the switch on
      felipeharker.org's front page. Every site is its own origin, and a
      browser keeps each origin's storage to itself, so the choice travels in
      the address: a link to another site in the family gains ?design=serif
      (or sans) as it is followed, and the site it lands on keeps the value
      and takes it out of the address. felipeharker.org never takes a value
      in, and links to it never carry one, so no other site can change the
      choice.
   3. The switch, on the front page: it shows it and makes it work.
   4. The running head's menus: an open one closes when the reader clicks
      elsewhere or presses Escape.

   The other sites in the family are listed in SITES; tools/check.mjs fails
   if one in FAMILY (tools/sites.mjs) is missing. A project site outside the
   family that links this script — Dove Habitat — is listed too.
   ========================================================================= */

(() => {
  'use strict';

  // The site that serves this script is the one where the choice is made:
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

  const DESIGNS = ['sans', 'serif'];
  const KEY = 'hark-design';
  const PARAM = 'design';
  const SERIF_FONT =
    'https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400..600;1,8..60,400&display=swap';

  const root = document.documentElement;
  const atHome = location.origin === HOME;

  // Storage can be refused (a locked-down browser); then the choice holds
  // for this page only.
  const read = () => {
    try { return localStorage.getItem(KEY); } catch { return null; }
  };
  const keep = (design) => {
    try { localStorage.setItem(KEY, design); } catch { /* this page only */ }
  };

  let design = read();

  // -- 2a. Take in a choice carried from another site ------------------------
  if (!atHome) {
    const url = new URL(location.href);
    if (url.searchParams.has(PARAM)) {
      const carried = url.searchParams.get(PARAM);
      if (DESIGNS.includes(carried)) {
        design = carried;
        keep(carried);
      }
      url.searchParams.delete(PARAM);
      history.replaceState(history.state, '', url);
    }
  }

  if (!DESIGNS.includes(design)) design = null;

  // -- 1. Set the design, before the page is drawn ----------------------------
  let serifLoaded = false;

  function apply() {
    root.dataset.design = design || 'sans';
    if (design === 'serif' && !serifLoaded) {
      serifLoaded = true;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = SERIF_FONT;
      document.head.appendChild(link);
    }
  }

  apply();

  // -- 2b. Carry the choice on a link to another site in the family -----------
  // At the moment the link is followed, not when the page loads, so a link a
  // page draws later (the birding app's) carries it too. A reader who has
  // never chosen carries nothing.
  function carry(event) {
    const link = event.target instanceof Element && event.target.closest('a[href]');
    if (!link || !design) return;
    let url;
    try { url = new URL(link.href); } catch { return; }
    if (url.origin === location.origin || !SITES.includes(url.origin)) return;
    url.searchParams.set(PARAM, design);
    link.href = url.href;
  }

  for (const type of ['click', 'auxclick', 'contextmenu']) {
    document.addEventListener(type, carry, true);
  }

  // -- 3. The switch -----------------------------------------------------------
  function wireSwitch() {
    const box = document.querySelector('[data-design-switch]');
    if (!box || !atHome) return;
    const buttons = [...box.querySelectorAll('button[value]')];
    const show = () => {
      for (const b of buttons) b.setAttribute('aria-pressed', String(b.value === (design || 'sans')));
    };
    for (const b of buttons) {
      b.addEventListener('click', () => {
        design = b.value;
        keep(design);
        apply();
        show();
      });
    }
    show();
    box.hidden = false;
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
    wireSwitch();
    wireMenus();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wire);
  else wire();
})();
