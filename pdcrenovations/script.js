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
  { keywords: ['plan', 'tier', 'include', 'offer', 'package', 'service'], answer: "We offer three plans: Foundation (your core website, hosting, and local listings), Growth (adds a chatbot, missed-call text-back, and monthly content), and Full Coverage (adds AI call answering, automated follow-up, and multi-location SEO). Want to walk through which one fits your business?" },
  { keywords: ['price', 'cost', 'much', 'fee', 'pricing'], answer: "Pricing depends on which plan fits your business, there's a one-time setup fee plus a monthly rate. Give us a call and we'll quote you based on what you actually need, not a one-size-fits-all number." },
  { keywords: ['contract', 'term', 'commit', 'lock in', 'length'], answer: "Plans run on a 6, 12, or 18 month term, your choice. Longer terms come with a lower monthly rate." },
  { keywords: ['cancel', 'quit', 'leave', 'end', 'out of contract'], answer: "After your minimum term, you can cancel anytime with 30 days' notice, no penalty. Canceling early carries a modest early termination fee, we'll walk you through the exact terms before you sign anything." },
  { keywords: ['own', 'ownership', 'keep', 'mine', 'belongs'], answer: "Your domain, your Google Business Profile, your reviews, and your content are always yours. The site itself is owned by us while you're an active client, but every plan has a date after which you can take it with you for free, sooner if you'd like to buy it out early." },
  { keywords: ['setup', 'upfront', 'start', 'begin', 'onboard'], answer: "There's a one-time setup fee that covers your custom site build, Google Business Profile setup, and directory listings. It's due before we start work. Call us for your exact quote." },
  { keywords: ['rank', 'ranking', 'seo', 'google', 'first page', 'top of google'], answer: "Real ranking movement usually takes 3 to 6 months, and it depends on your market and competition, not just us flipping a switch. We don't promise a specific spot on Google, but we do show you exactly what's moving every month." },
  { keywords: ['review', 'reviews', 'rating', 'stars'], answer: "We automatically text or email your customers after a completed job to make leaving a review as easy as possible. How many customers actually leave one depends on your service and relationships, we can't guarantee a number, but we do make it effortless." },
  { keywords: ['missed call', 'miss a call', 'text back', 'missed-call'], answer: "If a call to your business goes unanswered, the caller gets an automatic text so you don't lose the lead to silence. It's included starting on our Growth plan." },
  { keywords: ['ai', 'call answering', 'answer calls', 'virtual receptionist', 'phone answering'], answer: "Our Full Coverage plan includes AI call answering, it picks up calls you miss, answers common questions, and routes leads to you. It comes with a generous monthly minute allowance." },
  { keywords: ['chatbot', 'chat', 'bot', 'this thing', 'talking to'], answer: "This chatbot you're talking to right now is a real example of what we build for clients, it answers FAQs and captures leads 24/7. Higher plans can also add scheduling or pricing estimates." },
  { keywords: ['follow up', 'follow-up', 'lead follow', 'nurture'], answer: "On our Full Coverage plan, leads who don't book get a short automatic follow-up sequence over the next couple weeks, so fewer inquiries slip through the cracks." },
  { keywords: ['edit', 'change', 'update', 'modify', 'revise'], answer: "Every plan includes a monthly allowance of minor edits, think text and photo swaps, not full redesigns. Bigger changes get a quick separate quote." },
  { keywords: ['hosting', 'secure', 'security', 'maintenance', 'down', 'uptime'], answer: "Hosting, SSL, security, and maintenance are included on every plan, we handle the technical side so you don't have to think about it." },
  { keywords: ['directory', 'listing', 'yelp', 'citation', 'nextdoor', 'bbb'], answer: "We get your business listed consistently across major directories like Yelp, Apple Maps, Bing Places, and BBB, and review them annually to catch anything that's drifted out of sync." },
  { keywords: ['location', 'multiple locations', 'multi-location', 'another city'], answer: "If you operate in more than one city or service area, our Full Coverage plan includes multi-location SEO to build out pages for each." },
  { keywords: ['support', 'help', 'response time', 'contact you'], answer: "Standard support responds within a few business days for routine requests, faster for anything urgent. Full Coverage clients get priority response times." },
  { keywords: ['start', 'get started', 'sign up', 'how do i', 'next step'], answer: "Easiest way is to give us a call or fill out the contact form, we'll ask a few quick questions about your business and get you a plan and quote that actually fits." },
  { keywords: ['demo', 'example', 'see it', 'like this site'], answer: "This site you're looking at is a live example of what we build, website, chatbot, and all. We can build the same thing around your business." }
];
  var fallback = "I don't have that answer handy, but our team definitely does. Contact us at www.rankonsite.com/contact/";

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