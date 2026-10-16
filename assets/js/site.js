/* genomics.tel — small scripts for the whole site. Everything here is an
   enhancement: the pages work without it. */
(function () {
  'use strict';

  /* A hidden live region for short announcements, such as "Code copied" */
  var announcer = document.createElement('div');
  announcer.className = 'visually-hidden';
  announcer.setAttribute('aria-live', 'polite');
  document.body.appendChild(announcer);
  function announce(text) { announcer.textContent = ''; setTimeout(function () { announcer.textContent = text; }, 50); }

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
    var header = document.querySelector('.site-header');
    // Close the menu when keyboard focus or a click moves out of the header, so it never covers what has focus
    header.addEventListener('focusout', function (e) {
      if (nav.classList.contains('is-open') && e.relatedTarget && !header.contains(e.relatedTarget)) setMenu(false);
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('is-open') && !header.contains(e.target)) setMenu(false);
    });
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
        announce('Code copied');
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

  /* ─── Code blocks that scroll: let keyboard users scroll them too ─── */
  function markScrollableCode() {
    document.querySelectorAll('.highlight pre').forEach(function (pre) {
      var scrolls = pre.scrollWidth > pre.clientWidth + 1 || pre.scrollHeight > pre.clientHeight + 1;
      if (scrolls && !pre.hasAttribute('tabindex')) {
        var example = pre.closest('.example');
        var file = example ? example.querySelector('.example-file') : null;
        pre.setAttribute('tabindex', '0');
        pre.setAttribute('role', 'region');
        pre.setAttribute('aria-label', 'Code' + (file ? ': ' + file.textContent : '') + ' (scrolls)');
      } else if (!scrolls && pre.getAttribute('role') === 'region') {
        pre.removeAttribute('tabindex'); pre.removeAttribute('role'); pre.removeAttribute('aria-label');
      }
    });
  }
  markScrollableCode();
  document.querySelectorAll('.example-code').forEach(function (d) { d.addEventListener('toggle', markScrollableCode); });

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
  window.addEventListener('resize', function () { clearTimeout(resizeTimer); resizeTimer = setTimeout(function () { markScrollableTables(); markScrollableCode(); }, 200); });

  /* ─── Examples marked tall grow to fit their content ─── */
  // The examples come from this site, so the page can measure them. Viewers that
  // zoom with the mouse wheel keep their fixed height instead (see example.html).
  function fitToContent(frame) {
    function measure() {
      var stage = frame.parentNode, doc;
      try { doc = frame.contentDocument; } catch (e) { return; }
      if (!stage || !doc || !doc.documentElement || doc.URL === 'about:blank') return;
      var h = Math.ceil(doc.documentElement.getBoundingClientRect().height);
      if (h > 120) stage.style.height = Math.min(h, 3000) + 'px';
    }
    function start() {
      measure();
      try {
        if (window.ResizeObserver) new ResizeObserver(measure).observe(frame.contentDocument.body);
      } catch (e) { /* a page from another site cannot be measured */ }
    }
    frame.addEventListener('load', start);
    try {
      var d = frame.contentDocument;
      if (d && d.readyState === 'complete' && d.URL !== 'about:blank') start();
    } catch (e) { /* not loaded yet */ }
  }
  document.querySelectorAll('.example--tall iframe').forEach(fitToContent);

  /* ─── Examples that wait for a click ─── */
  document.querySelectorAll('[data-load-example]').forEach(function (button) {
    button.addEventListener('click', function () {
      var stage = button.closest('.example-stage');
      var frame = document.createElement('iframe');
      frame.src = button.getAttribute('data-load-example');
      frame.title = button.getAttribute('data-title') || 'Live example';
      frame.setAttribute('allow', 'fullscreen; clipboard-write');
      if (stage.closest('.example--tall')) fitToContent(frame);
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
      var links = toc.querySelectorAll('a');
      var setActive = function (id) {
        links.forEach(function (a) {
          var on = a.getAttribute('href') === '#' + id;
          a.classList.toggle('is-active', on);
          if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
        });
      };
      links.forEach(function (a) { a.addEventListener('click', function () { setActive(a.getAttribute('href').slice(1)); }); });
      window.addEventListener('hashchange', function () { setActive(decodeURIComponent(location.hash.slice(1))); });
      if (location.hash) setActive(decodeURIComponent(location.hash.slice(1)));
      if ('IntersectionObserver' in window) {
        // The band starts just below the sticky header, where a heading lands after a jump
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) { if (e.isIntersecting) setActive(e.target.id); });
        }, { rootMargin: '-60px 0px -65% 0px' });
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
    var spoken = hbb.querySelector('[data-codon7-text]');   // the text version read by screen readers
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
      if (spoken) spoken.textContent = on ? 'GTG' : 'GAG';
      toggle.textContent = on ? 'Show the usual sequence' : 'Make the sickle-cell change';
      note.innerHTML = on ? hbb.getAttribute('data-variant-note') : usual;
    });
  }
})();
