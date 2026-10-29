(() => {
  'use strict';
  const root = document.documentElement;
  const language = root.lang === 'ja' ? 'ja' : 'en';
  const isJapanese = language === 'ja';
  const themeKey = 'yuganaTheme';
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const themeButton = document.querySelector('[data-theme-toggle]');
  let themePreference = null;
  try {
    const saved = window.localStorage.getItem(themeKey);
    if (saved === 'light' || saved === 'dark') themePreference = saved;
  } catch { /* Theme selection still works for the current page. */ }

  function applyTheme(theme, remember = false) {
    if (theme !== 'light' && theme !== 'dark') return;
    root.dataset.theme = theme;
    if (themeButton) {
      themeButton.setAttribute('aria-pressed', String(theme === 'dark'));
      const label = theme === 'dark'
        ? (isJapanese ? 'ライトモードに切り替える' : 'Use light mode')
        : (isJapanese ? 'ダークモードに切り替える' : 'Use dark mode');
      themeButton.setAttribute('aria-label', label);
      themeButton.title = label;
    }
    const colour = document.querySelector('meta[name="theme-color"]');
    if (colour) colour.setAttribute('content', theme === 'dark' ? '#101c17' : '#faf7f0');
    if (remember) {
      themePreference = theme;
      try { window.localStorage.setItem(themeKey, theme); } catch { /* Storage is optional. */ }
    }
  }
  applyTheme(themePreference || (media.matches ? 'dark' : 'light'));
  themeButton?.addEventListener('click', () => {
    applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
  });
  media.addEventListener('change', () => {
    if (!themePreference) applyTheme(media.matches ? 'dark' : 'light');
  });
  window.addEventListener('storage', event => {
    if (event.key !== themeKey && event.key !== null) return;
    themePreference = event.newValue === 'dark' || event.newValue === 'light' ? event.newValue : null;
    applyTheme(themePreference || (media.matches ? 'dark' : 'light'));
  });

  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.primary-navigation');
  function menuLabel() {
    if (!menuButton) return;
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-label', isJapanese
      ? (open ? 'メニューを閉じる' : 'メニューを開く')
      : (open ? 'Close menu' : 'Open menu'));
  }
  function closeMenu(restoreFocus = false) {
    if (!menuButton || !header) return;
    header.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuLabel();
    if (restoreFocus) menuButton.focus();
  }
  if (menuButton && navigation && header) {
    menuButton.addEventListener('click', () => {
      const opening = menuButton.getAttribute('aria-expanded') !== 'true';
      header.classList.toggle('menu-open', opening);
      menuButton.setAttribute('aria-expanded', String(opening));
      menuLabel();
      if (opening) navigation.querySelector('a')?.focus();
    });
    navigation.addEventListener('click', event => {
      if (event.target instanceof Element && event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
    });
    document.addEventListener('click', event => {
      if (event.target instanceof Node && !header.contains(event.target)) closeMenu();
    });
    window.matchMedia('(min-width: 701px)').addEventListener('change', () => closeMenu());
  }

  // Language links work without JavaScript. Preserve an in-page destination when switching.
  document.querySelectorAll('a[data-language]').forEach(link => {
    link.addEventListener('click', () => {
      if (window.location.hash) {
        const target = new URL(link.href);
        if (target.origin === window.location.origin) {
          target.hash = window.location.hash;
          link.href = target.href;
        }
      }
    });
  });

  const quoteForm = document.querySelector('.quote-form');
  if (quoteForm) {
    const date = document.getElementById('quote-date');
    const now = new Date();
    date.min = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const names = new Map([
      ['general', isJapanese ? 'バリ島旅行' : 'a Bali trip'],
      ['ubud', isJapanese ? 'ウブドツアー' : 'an Ubud tour'],
      ['uluwatu', isJapanese ? 'ウルワツツアー' : 'an Uluwatu tour'],
      ['nusa-penida', isJapanese ? 'ヌサペニダツアー' : 'a Nusa Penida tour'],
    ]);
    quoteForm.addEventListener('submit', event => {
      if (!quoteForm.checkValidity()) {
        event.preventDefault();
        quoteForm.reportValidity();
        return;
      }
      const read = (id, maxLength = 160) => document.getElementById(id).value.trim().slice(0, maxLength);
      const topic = names.get(read('quote-tour')) || names.get('general');
      const unknown = isJapanese ? '未定・相談したい' : 'To be discussed';
      const message = isJapanese
        ? `Yūgana Bari-kun様、こんにちは。${topic}について相談したいです。料金とプランの詳細を教えてください。`
        : `Hello Yūgana Bari-kun! I would like to ask about ${topic}. Please help me with a quote and the tour details.`;
      const lines = [message, ''];
      if (isJapanese) {
        lines.push(`旅行日：${read('quote-date') || unknown}`, `大人：${read('quote-adults')}名`, `子ども：${read('quote-children')}名`, `ホテル・送迎エリア：${read('quote-hotel') || unknown}`);
        if (read('quote-notes', 600)) lines.push(`その他の希望：${read('quote-notes', 600)}`);
        lines.push('', '総額、含まれる内容、送迎、所要時間、ガイドの対応言語、支払い・キャンセル条件を確認したいです。');
      } else {
        lines.push(`Travel date: ${read('quote-date') || unknown}`, `Adults: ${read('quote-adults')}`, `Children: ${read('quote-children')}`, `Hotel / pickup area: ${read('quote-hotel') || unknown}`);
        if (read('quote-notes', 600)) lines.push(`Preferences: ${read('quote-notes', 600)}`);
        lines.push('', 'Please confirm the total price, inclusions, pickup, duration, guide language, and payment / cancellation terms.');
      }
      // A hidden form value is encoded by the browser; user data is never inserted as HTML or persisted.
      document.getElementById('quote-message').value = lines.join('\n');
    });
  }

  const contactTarget = document.querySelector('#contact') || document.querySelector('.site-footer');
  if ('IntersectionObserver' in window && contactTarget) {
    const observer = new IntersectionObserver(entries => {
      document.body.classList.toggle('contact-in-view', entries[0].isIntersecting);
    }, { threshold: 0 });
    observer.observe(contactTarget);
  }
  // Enhance visible content only. Nothing is hidden while waiting for JavaScript or an observer.
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const reveal = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-entering');
        entry.target.addEventListener('animationend', () => entry.target.classList.remove('is-entering'), { once: true });
        reveal.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.section-top h2, .section-intro, .tour-card, .planning-inner h2, .planning-steps li, .about-copy h2, .about-copy > p, .about-image .photo-frame, .prep-grid a, .faq-heading h2, .contact-copy h2, .quote-form').forEach(element => reveal.observe(element));
  }
  // Only hide the no-script mobile navigation once handlers have been installed.
  root.classList.add('js');
})();
