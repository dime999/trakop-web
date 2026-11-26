// TRAKOP – slider izdvojenih radova, galerija i lightbox
(function () {
  // ---------- Slider ----------
  var slider = document.querySelector('.slider');
  if (slider) {
    var slides = [].slice.call(slider.querySelectorAll('.slide'));
    var dots = [].slice.call(document.querySelectorAll('.dots .dot'));
    var bar = slider.querySelector('.s-progress span');
    var delay = parseInt(slider.getAttribute('data-autoplay'), 10) || 5000;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var cur = 0, timer = null, paused = false;
    slider.style.setProperty('--dur', delay + 'ms');

    function load(i) {
      var s = slides[(i + slides.length) % slides.length];
      s.querySelectorAll('img[loading="lazy"]').forEach(function (img) { img.loading = 'eager'; });
    }
    function go(i) {
      i = (i + slides.length) % slides.length;
      slides[cur].classList.remove('is-active'); slides[cur].setAttribute('aria-hidden', 'true');
      if (dots[cur]) dots[cur].classList.remove('is-active');
      cur = i;
      slides[cur].classList.add('is-active'); slides[cur].setAttribute('aria-hidden', 'false');
      if (dots[cur]) dots[cur].classList.add('is-active');
      load(cur + 1);
      restart();
    }
    function restart() {
      clearTimeout(timer);
      slider.classList.remove('run'); void bar.offsetWidth; // reset progress bar
      if (paused || reduce) return;
      slider.classList.add('run');
      timer = setTimeout(function () { go(cur + 1); }, delay);
    }
    function pause(p) {
      paused = p;
      slider.classList.toggle('paused', p);
      if (p) clearTimeout(timer); else restart();
    }
    slider.querySelector('.s-next').addEventListener('click', function () { go(cur + 1); });
    slider.querySelector('.s-prev').addEventListener('click', function () { go(cur - 1); });
    dots.forEach(function (d) { d.addEventListener('click', function () { go(+d.getAttribute('data-go')); }); });
    slider.addEventListener('mouseenter', function () { pause(true); });
    slider.addEventListener('mouseleave', function () { pause(false); });
    document.addEventListener('visibilitychange', function () { pause(document.hidden); });
    // swipe
    var x0 = null;
    slider.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1));
    });
    // start when visible
    load(1);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { en.forEach(function (x) { pause(!x.isIntersecting); }); }, { threshold: 0.25 }).observe(slider);
    } else restart();
  }

  // ---------- Galerija: prikaži sve ----------
  var gal = document.querySelector('.gallery');
  var more = document.getElementById('show-all');
  if (gal && more) {
    more.addEventListener('click', function () { gal.classList.add('show-all'); more.remove(); });
  }

  // ---------- Lightbox ----------
  var lb = document.getElementById('lightbox');
  if (!gal || !lb) return;
  var items = [].slice.call(gal.querySelectorAll('.g-item'));
  var img = lb.querySelector('img'), cap = lb.querySelector('figcaption');
  var idx = 0, lastFocus = null;
  function show(i) {
    idx = (i + items.length) % items.length;
    var it = items[idx];
    img.style.animation = 'none'; void img.offsetWidth; img.style.animation = '';
    img.src = it.getAttribute('data-full');
    img.alt = it.querySelector('img').alt;
    cap.textContent = (it.getAttribute('data-cap') ? it.getAttribute('data-cap') + ' · ' : '') + (idx + 1) + ' / ' + items.length;
    new Image().src = items[(idx + 1) % items.length].getAttribute('data-full');
  }
  function open(i) { lastFocus = document.activeElement; show(i); lb.hidden = false; document.body.style.overflow = 'hidden'; lb.querySelector('.lb-close').focus(); }
  function close() { lb.hidden = true; document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); }
  items.forEach(function (it, i) { it.addEventListener('click', function () { gal.classList.add('show-all'); if (more && more.parentNode) more.remove(); open(i); }); });
  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', function () { show(idx - 1); });
  lb.querySelector('.lb-next').addEventListener('click', function () { show(idx + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') show(idx + 1);
    else if (e.key === 'ArrowLeft') show(idx - 1);
  });
  var lx = null;
  lb.addEventListener('touchstart', function (e) { lx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (lx === null) return; var dx = e.changedTouches[0].clientX - lx; lx = null;
    if (Math.abs(dx) > 40) show(idx + (dx < 0 ? 1 : -1));
  });
})();
