(function () {
  var page = document.body.getAttribute('data-page') || 'index.html';
  var links = [
    ['index.html', 'Home', 'n-home.png'],
    ['about.html', 'About', 'n-about.png'],
    ['services.html', 'Services', 'n-services.png'],
    ['projects.html', 'Projects', 'n-projects.png'],
    ['contact.html', 'Contact', 'n-contact.png']
  ];



  // Continuous banner behind the whole page (hero image first, then the rest flow on)
  var bg = document.createElement('div'); bg.id = 'siteBg';
  document.body.insertBefore(bg, document.body.firstChild);
  (function () {
    var hero = document.querySelector('.panel.hero');
    function place() { bg.style.top = (hero ? hero.offsetHeight : 0) + 'px'; }
    place(); addEventListener('resize', place); addEventListener('load', place);
  })();

  // App name types in letter by letter, one time, when the home page opens
  (function () {
    var h = document.querySelector('.hero h1');
    if (!h) return;
    var letters = [];
    (function wrap(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var f = document.createDocumentFragment();
          n.textContent.split('').forEach(function (ch) {
            if (ch === ' ' || ch === '\u00a0') { f.appendChild(document.createTextNode(ch)); return; }
            var i = document.createElement('i'); i.className = 'tw'; i.textContent = ch;
            letters.push(i); f.appendChild(i);
          });
          n.parentNode.replaceChild(f, n);
        } else if (n.nodeType === 1) wrap(n);
      });
    })(h);
    h.setAttribute('aria-label', 'A4MP TECH RIDE');
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      letters.forEach(function (l) { l.classList.add('on'); }); return;
    }
    var caret = document.createElement('span'); caret.className = 'tw-caret'; h.appendChild(caret);
    var k = 0;
    setTimeout(function step() {
      if (k < letters.length) {
        letters[k].classList.add('on'); letters[k].after(caret); k++;
        setTimeout(step, 120);
      } else setTimeout(function () { caret.remove(); }, 1200);
    }, 500);
  })();

  // Teddy + search assistant live only on the home page (inside the hero, so they scroll away with it)
  addEventListener('load', function () {
    var hero = document.querySelector('.panel.hero');
    ['.welcome-teddy', '.voice-replay', '.ask'].forEach(function (sel) {
      var el = document.querySelector(sel);
      if (!el) return;
      if (hero) hero.appendChild(el); else el.remove();
    });
  });

  // Premium floating particles background (canvas, no libraries)
  (function () {
    var c = document.createElement('canvas'); c.id = 'fx';
    document.body.insertBefore(c, document.body.firstChild);
    var x = c.getContext('2d'), w, h, pts = [], dpr = Math.min(window.devicePixelRatio || 1, 2);
    function size() { w = c.width = innerWidth * dpr; h = c.height = innerHeight * dpr; }
    size(); addEventListener('resize', size);
    var n = innerWidth < 900 ? 35 : 80;
    for (var i = 0; i < n; i++) pts.push({ x: Math.random(), y: Math.random(), r: Math.random() * 1.8 + .4, vx: (Math.random() - .5) * .00018, vy: -Math.random() * .00028 - .00005, g: Math.random() < .2 });
    function tick() {
      x.clearRect(0, 0, w, h);
      pts.forEach(function (p) {
        p.x += p.vx; p.y += p.vy;
        if (p.y < -.02) { p.y = 1.02; p.x = Math.random(); }
        if (p.x < -.02) p.x = 1.02; if (p.x > 1.02) p.x = -.02;
        x.beginPath(); x.arc(p.x * w, p.y * h, p.r * dpr, 0, 6.283);
        x.fillStyle = p.g ? 'rgba(255,79,163,.8)' : 'rgba(57,255,136,.7)';
        x.shadowBlur = 10 * dpr; x.shadowColor = x.fillStyle; x.fill();
      });
      requestAnimationFrame(tick);
    }
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) tick();
  })();

  // Header
  var nav = links.map(function (l) {
    return '<a href="' + l[0] + '"' + (l[0] === page ? ' class="on"' : '') + '>' +
      '<img class="ni" src="assets/' + l[2] + '" alt="">' + l[1] + '</a>';
  }).join('');
  var header = document.createElement('header');
  header.innerHTML =
    '<a class="brand" href="index.html"><img class="logo" src="assets/logo.jpg" alt="A4MP TECH RIDE logo">' +
    '<div><b>A4MP TECH RIDE</b><small>Running Ahead With Technology</small></div></a>' +
    '<nav id="nav">' + nav + '</nav>' +
    '<a class="btn gold" href="get-started.html">🚀 Get Started</a>' +
    '<button class="menu" id="menu" aria-label="Menu">☰</button>';
  document.body.insertBefore(header, document.body.firstChild);
  document.getElementById('menu').addEventListener('click', function () {
    document.getElementById('nav').classList.toggle('open');
  });

  // Footer
  var footer = document.createElement('footer');
  footer.innerHTML = '© ' + new Date().getFullYear() + ' A4MP TECH RIDE. All rights reserved.';
  document.body.appendChild(footer);

  // Scroll-to-top button
  var up = document.createElement('button');
  up.id = 'up'; up.innerHTML = '↑'; up.setAttribute('aria-label', 'Back to top');
  up.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  document.body.appendChild(up);
  window.addEventListener('scroll', function () {
    up.classList.toggle('show', window.scrollY > 400);
  });

  // Section dots (home page only)
  if (page === 'index.html') {
    var panels = Array.prototype.slice.call(document.querySelectorAll('.panel[id]'));
    var dots = document.createElement('div');
    dots.className = 'dots';
    dots.innerHTML = panels.map(function (p) { return '<a href="#' + p.id + '" aria-label="' + p.id + '"></a>'; }).join('');
    document.body.appendChild(dots);
    var da = dots.querySelectorAll('a');
    var setDot = function () {
      var idx = 0;
      panels.forEach(function (p, i) {
        if (p.getBoundingClientRect().top <= window.innerHeight * 0.5) idx = i;
      });
      Array.prototype.forEach.call(da, function (a, i) { a.classList.toggle('on', i === idx); });
    };
    window.addEventListener('scroll', setDot);
    setDot();
  }

  // Reveal on scroll
  var rv = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    Array.prototype.forEach.call(rv, function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(rv, function (el) { el.classList.add('in'); });
  }

  // Forms (contact + enquiry) — saved in the browser only; connect a backend to receive them
  ['contact', 'enquiry'].forEach(function (id) {
    var f = document.getElementById(id);
    if (!f) return;
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = {};
      new FormData(f).forEach(function (v, k) { data[k] = v; });
      data.time = new Date().toISOString();
      try {
        var key = 'a4mp_' + id;
        var list = JSON.parse(localStorage.getItem(key) || '[]');
        list.push(data);
        localStorage.setItem(key, JSON.stringify(list));
      } catch (err) {}
      f.reset();
      f.querySelector('.ok').style.display = 'block';
    });
  });
})();
