/* genomics.tel — small scripts for the whole site. Everything here is an
   enhancement: the pages work without it. */
(function () {
  'use strict';
  var root = document.documentElement;
  var KEY = 'gt-theme';

  /* ─── Light and dark ─── */
  var dark = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function store(v) { try { if (v) localStorage.setItem(KEY, v); else localStorage.removeItem(KEY); } catch (e) {} }
  function effective() {
    var t = root.getAttribute('data-theme');
    if (t === 'light' || t === 'dark') return t;
    return dark && dark.matches ? 'dark' : 'light';
  }
  function applyTheme(choice) {
    if (choice === 'light' || choice === 'dark') root.setAttribute('data-theme', choice);
    else root.removeAttribute('data-theme');
    store(choice === 'light' || choice === 'dark' ? choice : null);
    syncThemeControls();
  }
  function syncThemeControls() {
    var now = effective();
    var choice = stored() || 'auto';
    document.querySelectorAll('[data-theme-toggle]').forEach(function (b) {
      b.setAttribute('aria-label', now === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
    document.querySelectorAll('[data-theme-choice]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-theme-choice') === choice));
    });
    var meta = document.querySelectorAll('meta[name="theme-color"]');
    meta.forEach(function (m) { m.setAttribute('content', now === 'dark' ? '#0e1726' : '#ffffff'); m.removeAttribute('media'); });
  }
  document.querySelectorAll('[data-theme-toggle]').forEach(function (b) {
    b.addEventListener('click', function () { applyTheme(effective() === 'dark' ? 'light' : 'dark'); });
  });
  document.querySelectorAll('[data-theme-choice]').forEach(function (b) {
    b.addEventListener('click', function () { applyTheme(b.getAttribute('data-theme-choice')); });
  });
  if (dark && dark.addEventListener) dark.addEventListener('change', syncThemeControls);
  syncThemeControls();

  /* ─── Menu on small screens ─── */
  var menuButton = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');
  if (menuButton && nav) {
    var setMenu = function (open) {
      nav.classList.toggle('is-open', open);
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.textContent = open ? 'Close' : 'Menu';
    };
    menuButton.addEventListener('click', function () { setMenu(!nav.classList.contains('is-open')); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); menuButton.focus(); }
    });
  }

  /* The side menu on guide pages starts folded on small screens */
  var sideDetails = document.querySelector('[data-sidenav]');
  if (sideDetails && window.matchMedia && window.matchMedia('(max-width: 62rem)').matches) sideDetails.open = false;

  /* ─── Copy buttons on code ─── */
  document.querySelectorAll('div.highlighter-rouge > .highlight, figure.highlight').forEach(function (block) {
    var pre = block.querySelector('pre');
    if (!pre) return;
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy-button';
    button.textContent = 'Copy';
    button.setAttribute('aria-label', 'Copy code');
    button.addEventListener('click', function () {
      var text = pre.innerText.replace(/\n$/, '');
      var done = function () {
        button.textContent = 'Copied';
        button.classList.add('is-done');
        setTimeout(function () { button.textContent = 'Copy'; button.classList.remove('is-done'); }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
      } else { fallbackCopy(text); done(); }
    });
    block.style.position = 'relative';
    block.classList.add('has-copy');
    block.appendChild(button);
  });
  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
  }

  /* ─── Wide tables: let keyboard users scroll them ─── */
  function markScrollableTables() {
    document.querySelectorAll('.table-wrap').forEach(function (wrap) {
      var scrolls = wrap.scrollWidth > wrap.clientWidth + 1;
      if (scrolls && !wrap.hasAttribute('tabindex')) {
        var heading = null, el = wrap.previousElementSibling;
        while (el && !heading) { if (/^H[2-4]$/.test(el.tagName)) heading = el; el = el.previousElementSibling; }
        wrap.setAttribute('tabindex', '0');
        wrap.setAttribute('role', 'region');
        wrap.setAttribute('aria-label', 'Table' + (heading ? ': ' + heading.textContent : '') + ' (scrolls sideways)');
      } else if (!scrolls && wrap.getAttribute('role') === 'region') {
        wrap.removeAttribute('tabindex'); wrap.removeAttribute('role'); wrap.removeAttribute('aria-label');
      }
    });
  }
  markScrollableTables();
  var resizeTimer = null;
  window.addEventListener('resize', function () { clearTimeout(resizeTimer); resizeTimer = setTimeout(markScrollableTables, 200); });

  /* ─── Examples that wait for a click ─── */
  document.querySelectorAll('[data-load-example]').forEach(function (button) {
    button.addEventListener('click', function () {
      var stage = button.closest('.example-stage');
      var frame = document.createElement('iframe');
      frame.src = button.getAttribute('data-load-example');
      frame.title = button.getAttribute('data-title') || 'Live example';
      frame.setAttribute('allow', 'fullscreen; clipboard-write');
      stage.innerHTML = '';
      stage.appendChild(frame);
      frame.focus();
    });
  });

  /* ─── "On this page" list for guide pages ─── */
  var toc = document.querySelector('.toc');
  var article = document.querySelector('.guide-main .prose');
  if (toc && article) {
    var heads = Array.prototype.filter.call(article.querySelectorAll('h2[id]'), function (h) { return !h.closest('.example, .ad'); });
    if (heads.length >= 3) {
      var list = toc.querySelector('ol');
      heads.forEach(function (h) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#' + h.id;
        a.textContent = h.textContent;
        li.appendChild(a);
        list.appendChild(li);
      });
      toc.hidden = false;
      if ('IntersectionObserver' in window) {
        var links = toc.querySelectorAll('a');
        var current = null;
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) { if (e.isIntersecting) current = e.target.id; });
          links.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + current); });
        }, { rootMargin: '-15% 0px -70% 0px' });
        heads.forEach(function (h) { io.observe(h); });
      }
    }
  }

  /* ─── Ads: ask AdSense to fill each ad unit once ─── */
  document.querySelectorAll('ins.adsbygoogle').forEach(function (ins) {
    if (ins.getAttribute('data-adsbygoogle-status')) return;
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
  });
  document.querySelectorAll('[data-cookie-settings]').forEach(function (b) {
    b.addEventListener('click', function () {
      window.googlefc = window.googlefc || {};
      window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
      window.googlefc.callbackQueue.push(function () {
        if (window.googlefc.showRevocationMessage) window.googlefc.showRevocationMessage();
      });
    });
  });

  /* ─── Home page: the sickle-cell change in HBB ─── */
  var hbb = document.querySelector('[data-hbb]');
  if (hbb) {
    var toggle = hbb.querySelector('.seq-toggle');
    var base = hbb.querySelector('[data-c20]');
    var aa = hbb.querySelector('[data-codon7-aa]');
    var note = hbb.querySelector('.seq-note');
    var usual = note.innerHTML;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    toggle.addEventListener('click', function () {
      var on = !hbb.classList.contains('is-variant');
      hbb.classList.toggle('is-variant', on);
      base.textContent = on ? 'T' : 'A';
      base.className = 'nt ' + (on ? 'T' : 'A');
      if (!reduce) { void base.offsetWidth; base.classList.add('is-flipping'); }
      aa.textContent = on ? 'Val' : 'Glu';
      toggle.textContent = on ? 'Show the usual sequence' : 'Make the sickle-cell change';
      note.innerHTML = on ? hbb.getAttribute('data-variant-note') : usual;
    });
  }
})();
