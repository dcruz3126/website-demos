/* ============================================
   Gulfside Plumbing Co. — Site Script
   ============================================ */

// ---------- Mobile nav toggle ----------
(function () {
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
})();

// ---------- Contact form (static demo, no backend) ----------
(function () {
  var form = document.getElementById('contactForm');
  var success = document.getElementById('formSuccess');
  if (!form || !success) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    success.classList.add('show');
    form.reset();
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
})();

// ---------- FAQ chat widget ----------
(function () {
  var faq = [
    { keywords: ['hour', 'open', 'close', 'time'], answer: "We're open Monday to Friday 7am to 7pm, and Saturday 8am to 4pm. Our emergency line runs 24/7." },
    { keywords: ['area', 'serve', 'hillsborough', 'tampa', 'brandon', 'riverview', 'plant city', 'temple terrace', 'valrico', 'lutz', 'ruskin'], answer: "We serve all of Hillsborough County: Tampa, Brandon, Riverview, Plant City, Temple Terrace, Valrico, Lutz, and Ruskin." },
    { keywords: ['emergency', 'burst', 'flood', 'urgent', 'asap'], answer: "Emergencies get top priority. Call us right now at (813) 555-0199, we answer 24/7." },
    { keywords: ['heater', 'tankless', 'hot water'], answer: "We repair and install both tank and tankless water heaters, gas or electric." },
    { keywords: ['drain', 'clog', 'slow', 'backed up', 'backup'], answer: "We clear clogged and slow drains without harsh chemicals, and check for the root cause so it stays clear." },
    { keywords: ['price', 'cost', 'quote', 'estimate', 'much'], answer: "We give upfront pricing before any work starts, no surprise fees. Call for a free estimate." },
    { keywords: ['license', 'insured', 'insurance'], answer: "We're fully licensed and insured in the State of Florida." },
    { keywords: ['book', 'appointment', 'schedule'], answer: "Call (813) 555-0199 or fill out the form on our Contact page and we'll get back to you fast." },
    { keywords: ['leak'], answer: "We track down hidden leaks before they turn into a bigger repair. Call (813) 555-0199 to get one checked out." }
  ];
  var fallback = "I don't have that answer handy, but our team definitely does. Call (813) 555-0199 or visit the Contact page.";

  var toggleBtn = document.getElementById('chatToggle');
  var panel = document.getElementById('chatPanel');
  var closeBtn = document.getElementById('chatClose');
  var form = document.getElementById('chatForm');
  var input = document.getElementById('chatInput');
  var log = document.getElementById('chatLog');
  var chips = document.querySelectorAll('.chat-chip');

  if (!toggleBtn || !panel || !form || !input || !log) return;

  function addMessage(text, from) {
    var msg = document.createElement('div');
    msg.className = 'chat-msg chat-msg--' + from;
    msg.textContent = text;
    log.appendChild(msg);
    log.scrollTop = log.scrollHeight;
  }

  function getAnswer(question) {
    var q = question.toLowerCase();
    for (var i = 0; i < faq.length; i++) {
      for (var j = 0; j < faq[i].keywords.length; j++) {
        if (q.indexOf(faq[i].keywords[j]) !== -1) return faq[i].answer;
      }
    }
    return fallback;
  }

  function ask(question) {
    if (!question.trim()) return;
    addMessage(question, 'user');
    setTimeout(function () {
      addMessage(getAnswer(question), 'bot');
    }, 350);
  }

  toggleBtn.addEventListener('click', function () {
    var isOpen = panel.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (isOpen) input.focus();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      panel.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    ask(input.value);
    input.value = '';
  });

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      ask(chip.textContent);
    });
  });
})();