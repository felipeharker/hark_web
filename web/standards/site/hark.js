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
   2. Sharing the choice. The choice is made in one place, the switch on
      felipeharker.org's front page, and kept in one cookie, hark-design, set
      for felipeharker.org and so sent to every subdomain: academic., birds.,
      resume., dove., alexandria. Every site reads it; only the front page
      writes it, so no other site can change the choice. A reader who has
      never chosen has no cookie and gets sans. Served from anywhere else (a
      local server), the cookie is that host's alone.
   3. The switch, on the front page: it shows it and makes it work.
   4. The running head's menus: an open one closes when the reader clicks
      elsewhere or presses Escape.

   Until 2026-10-28 the choice travelled in the address (?design=serif) and
   each site kept it in its own localStorage. An address that still carries
   one has it taken out, unread; a choice still in the front page's
   localStorage is moved into the cookie.
   ========================================================================= */

(() => {
  'use strict';

  // The site that serves this script is the one where the choice is made:
  // felipeharker.org, or the local server when it is served from source.
  const HOME = document.currentScript
    ? new URL(document.currentScript.src).origin
    : 'https://felipeharker.org';

  // The domain the cookie is set for, so every subdomain is sent it.
  const DOMAIN = 'felipeharker.org';

  const DESIGNS = ['sans', 'serif'];
  const KEY = 'hark-design';
  const OLD_PARAM = 'design';
  const SERIF_FONT =
    'https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400..600;1,8..60,400&display=swap';

  const root = document.documentElement;
  const atHome = location.origin === HOME;
  const onDomain = location.hostname === DOMAIN || location.hostname.endsWith(`.${DOMAIN}`);

  // -- 2. The cookie ----------------------------------------------------------
  const read = () => {
    const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${KEY}=([^;]*)`));
    return match ? match[1] : null;
  };
  const keep = (value) => {
    document.cookie = [
      `${KEY}=${value}`,
      'Path=/',
      'Max-Age=31536000',
      'SameSite=Lax',
      onDomain ? `Domain=${DOMAIN}` : '',
      location.protocol === 'https:' ? 'Secure' : '',
    ].filter(Boolean).join('; ');
  };

  let design = read();

  // The old ways: a choice in the front page's localStorage moves into the
  // cookie; a ?design= in the address is taken out, unread.
  if (atHome && !DESIGNS.includes(design)) {
    let old = null;
    try { old = localStorage.getItem(KEY); localStorage.removeItem(KEY); } catch { /* none */ }
    if (DESIGNS.includes(old)) { design = old; keep(old); }
  }
  if (new URL(location.href).searchParams.has(OLD_PARAM)) {
    const url = new URL(location.href);
    url.searchParams.delete(OLD_PARAM);
    history.replaceState(history.state, '', url);
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
