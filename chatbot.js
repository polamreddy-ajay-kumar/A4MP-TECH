/* A4MP TECH RIDE – site assistant (works offline, answers about this website) */
(function () {
  var KB = [
    { k: ['hi', 'hello', 'hey', 'namaste', 'namaskaram', 'good morning', 'good evening'], a: 'Hi! 👋 I\'m the A4MP TECH RIDE assistant. Ask me about our services, projects, vision, or how to get started.' },
    { k: ['full form', 'stands for', 'meaning', 'a4mp ante', 'a4mp meaning', 'what does a4mp'], a: 'A4MP = Artificial Intelligence • Fourth Mind Platform. Our motto: "Ask Anything • Learn Everything" and "Running Ahead With Technology".', link: ['about.html', 'About Us'] },
    { k: ['what is a4mp', 'about a4mp', 'about you', 'about us', 'who are you', 'a4mp enti', 'company', 'platform', 'tech ride'], a: 'A4MP TECH RIDE is a next-generation technology platform dedicated to innovation, creativity and growth. We provide professional tech solutions that empower individuals and businesses to achieve more. Tagline: "Running Ahead With Technology".', link: ['about.html', 'Read About Us'] },
    { k: ['service', 'services', 'offer', 'what do you do', 'provide', 'solutions', 'sevalu'], a: 'We offer 6 services:\n• Web Development – modern & responsive web solutions\n• Software Development – scalable & reliable software\n• Programming – code, innovate, grow\n• UI/UX Design – stunning interfaces\n• IT Consultancy – expert guidance\n• Digital Solutions – smart solutions for smart business', link: ['services.html', 'View Services'] },
    { k: ['web development', 'website', 'web design', 'responsive'], a: 'Web Development: we build modern & responsive web solutions that look great on every device.', link: ['services.html', 'View Services'] },
    { k: ['software development', 'software'], a: 'Software Development: scalable & reliable software built for your needs.', link: ['services.html', 'View Services'] },
    { k: ['programming', 'coding', 'code'], a: 'Programming: "Code. Innovate. Grow." – we help you write, learn and grow with code.', link: ['services.html', 'View Services'] },
    { k: ['ui', 'ux', 'design', 'interface'], a: 'UI/UX Design: stunning interfaces that are easy and enjoyable to use.', link: ['services.html', 'View Services'] },
    { k: ['consult', 'consultancy', 'it consultancy', 'guidance', 'advice'], a: 'IT Consultancy: expert guidance to plan and deliver the right technology for you.', link: ['services.html', 'View Services'] },
    { k: ['digital solution', 'digital', 'business'], a: 'Digital Solutions: smart solutions for smart business.', link: ['services.html', 'View Services'] },
    { k: ['project', 'projects', 'work', 'works', 'portfolio', 'latest'], a: 'We have completed 100+ projects. You can see our latest works and innovations on the Projects page.', link: ['projects.html', 'View Projects'] },
    { k: ['learner', 'learners', 'students', '10k', 'how many', 'stats', 'numbers'], a: 'Our numbers: 100+ Projects, 10K+ Learners and a Global Reach.', link: ['about.html', 'About Us'] },
    { k: ['vision', 'mission', 'goal', 'why choose', 'why us', 'values'], a: 'Our Vision – A Smarter & Digital World.\nOur Mission – Innovate & Empower.\nOur Goal – Grow Together.\nWhy Choose Us? – Quality, Innovation, Trust.', link: ['about.html', 'Know More'] },
    { k: ['start', 'get started', 'enquiry', 'inquiry', 'join', 'hire', 'order', 'quote', 'new project'], a: 'Great! Tell us what you need on the Get Started page – fill the enquiry form (name, phone, email, service and project details) and we will reach out.', link: ['get-started.html', 'Get Started'] },
    { k: ['contact', 'reach', 'message', 'email', 'phone', 'call', 'address', 'talk'], a: 'You can reach us using the Contact page form (name, email, subject and message). For a project enquiry, use the Get Started page.', link: ['contact.html', 'Contact Us'] },
    { k: ['social', 'github', 'youtube', 'linkedin', 'telegram', 'whatsapp', 'instagram', 'follow'], a: 'Find us on GitHub, YouTube, LinkedIn, Telegram and WhatsApp – use the icons on the left side of the Home page.' },
    { k: ['page', 'pages', 'menu', 'navigate', 'sections'], a: 'Pages: Home, About, Services, Projects, Contact and Get Started. Use the menu at the top to move around.' },
    { k: ['video', 'watch'], a: 'The "Watch Video" button on the Home page is reserved for our intro video.' },
    { k: ['price', 'pricing', 'cost', 'fee', 'fees', 'charges'], a: 'Pricing depends on your requirements. Send us the details on the Get Started page and we will get back to you.', link: ['get-started.html', 'Get Started'] },
    { k: ['thank', 'thanks', 'bye', 'ok'], a: 'You\'re welcome! 😊 Ask me anything else about A4MP TECH RIDE.' }
  ];
  var CHIPS = ['What services do you offer?', 'About A4MP TECH RIDE', 'Your projects', 'How to get started?'];

  function norm(t) { return ' ' + t.toLowerCase().replace(/[^a-z0-9+ ]/g, ' ').replace(/\s+/g, ' ') + ' '; }
  function answer(q) {
    var n = norm(q), best = null, score = 0;
    KB.forEach(function (e) {
      var s = 0;
      e.k.forEach(function (w) {
        var needle = ' ' + w + ' ';
        if (n.indexOf(needle) > -1) s += w.split(' ').length * 2 + 1;
        else if (w.length > 4 && n.indexOf(w) > -1) s += 1;
      });
      if (s > score) { score = s; best = e; }
    });
    if (best) return best;
    return { a: 'I can only answer questions about this website. Try asking about our services, projects, vision, contact or how to get started.' };
  }
  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  var box = document.createElement('div');
  box.className = 'ask';
  box.innerHTML =
    '<div class="ask-panel" id="askPanel" aria-live="polite">' +
    '<div class="ask-head"><span>🤖 A4MP Assistant</span><button id="askClose" aria-label="Close">✕</button></div>' +
    '<div class="ask-msgs" id="askMsgs"></div>' +
    '<div class="ask-chips" id="askChips"></div></div>' +
    '<form class="ask-bar" id="askForm" autocomplete="off">' +
    '<span class="ask-ic">🔍</span>' +
    '<input id="askInput" type="text" maxlength="200" placeholder="Ask about our website…" aria-label="Ask a question">' +
    '<button type="submit" aria-label="Send">➤</button></form>';
  document.body.appendChild(box);

  var panel = document.getElementById('askPanel'), msgs = document.getElementById('askMsgs'),
    input = document.getElementById('askInput'), chips = document.getElementById('askChips');

  function add(cls, html) {
    var d = document.createElement('div'); d.className = 'msg ' + cls; d.innerHTML = html;
    msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight; return d;
  }
  function open() {
    if (panel.classList.contains('open')) return;
    panel.classList.add('open');
    if (!msgs.children.length) add('bot', 'Hi! 👋 Ask me anything about A4MP TECH RIDE – services, projects, vision or how to get started.');
  }
  CHIPS.forEach(function (c) {
    var b = document.createElement('button'); b.type = 'button'; b.textContent = c;
    b.addEventListener('click', function () { ask(c); }); chips.appendChild(b);
  });
  function ask(q) {
    q = q.trim(); if (!q) return;
    open(); add('me', esc(q)); input.value = '';
    var t = add('bot typing', '<i></i><i></i><i></i>');
    setTimeout(function () {
      var r = answer(q);
      t.className = 'msg bot';
      t.innerHTML = esc(r.a).replace(/\n/g, '<br>') + (r.link ? '<br><a href="' + r.link[0] + '">' + r.link[1] + ' →</a>' : '');
      msgs.scrollTop = msgs.scrollHeight;
    }, 450);
  }
  document.getElementById('askForm').addEventListener('submit', function (e) { e.preventDefault(); ask(input.value); });
  input.addEventListener('focus', open);
  document.getElementById('askClose').addEventListener('click', function () { panel.classList.remove('open'); input.blur(); });
})();
