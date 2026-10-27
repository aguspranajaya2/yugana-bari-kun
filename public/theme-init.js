(() => {
  'use strict';
  const root = document.documentElement;
  let preference = null;
  try {
    const saved = window.localStorage.getItem('yuganaTheme');
    if (saved === 'light' || saved === 'dark') preference = saved;
  } catch { /* The device preference remains available without storage. */ }
  const darkDevice = window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = preference || (darkDevice ? 'dark' : 'light');

  // Support old shared ?lang links using only the two paths generated at build time.
  // The query string is never used as a destination URL or rendered as markup.
  if (root.dataset.errorPage === 'true') return;
  const current = new URL(window.location.href);
  const requested = current.searchParams.get('lang');
  if (requested !== 'en' && requested !== 'ja') return;
  const path = requested === 'ja' ? root.dataset.pathJa : root.dataset.pathEn;
  if (!path || !path.startsWith('/') || path.startsWith('//') || path.includes('\\')) return;
  const target = new URL(path, window.location.origin);
  if (target.origin !== current.origin) return;
  current.searchParams.delete('lang');
  target.search = current.search;
  target.hash = current.hash;
  if (current.pathname.replace(/\.html$/, '').replace(/\/$/, '') !== target.pathname.replace(/\/$/, '')) {
    window.location.replace(target.href);
  } else {
    try { window.history.replaceState(null, '', target.href); } catch { /* Optional URL clean-up. */ }
  }
})();
