(function () {
  'use strict';

  /* ---------- sticky header ---------- */
  var hdr = document.getElementById('hdr');
  var ticking = false;

  function onScroll() {
    hdr.classList.toggle('is-fix', (window.scrollY || 0) > 10);
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onScroll);
    }
  }, { passive: true });
  onScroll();

  /* ---------- mobile nav ---------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  var navbg = document.getElementById('navbg');

  function setNav(open) {
    nav.classList.toggle('is-open', open);
    if (open) {
      nav.style.top = hdr.getBoundingClientRect().bottom + 'px';
    }
    navbg.style.opacity = open ? '1' : '0';
    navbg.style.visibility = open ? 'visible' : 'hidden';
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    document.body.classList.toggle('lock', open);
  }

  burger.addEventListener('click', function () {
    setNav(burger.getAttribute('aria-expanded') !== 'true');
  });
  navbg.addEventListener('click', function () { setNav(false); });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setNav(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setNav(false);
  });

  /* ---------- CTA form ---------- */
  var frm = document.getElementById('frm');
  var ok = document.getElementById('ok');

  if (frm) {
    frm.addEventListener('submit', function (e) {
      e.preventDefault();

      var firstBad = null;

      function invalid(input, mode) {
        var v = input.value.trim();
        if (mode === 'digits') return v.replace(/\D/g, '').length < 6;
        return v.length < 2;
      }

      [['n1', 'text'], ['p1', 'digits']].forEach(function (pair) {
        var input = document.getElementById(pair[0]);
        var wrap = input.closest('.fr');
        var bad = invalid(input, pair[1]);
        wrap.classList.toggle('bad', bad);
        if (bad && !firstBad) firstBad = input;
      });

      if (firstBad) {
        firstBad.focus();
        return;
      }

      ok.classList.add('on');
      frm.reset();
    });

    frm.addEventListener('input', function (e) {
      var wrap = e.target.closest('.fr');
      if (wrap) wrap.classList.remove('bad');
    });
  }
})();
