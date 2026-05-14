/* SKIELD — main.js */

// Mobile navigation toggle
(function () {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('siteNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    const open = nav.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
    });
  });

  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
    }
  });
})();

// Active nav link
(function () {
  const links = document.querySelectorAll('.site-nav a');
  const path = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html') ||
        (path === '/' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// Product filter (products.html)
(function () {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.product-detail-card');
  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      cards.forEach(function (card) {
        if (filter === 'all' || card.dataset.series === filter) {
          card.style.display = '';
          setTimeout(function () { card.style.opacity = '1'; card.style.transform = ''; }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(function () { card.style.display = 'none'; }, 250);
        }
      });
    });
  });
})();

// Contact form — mailto fallback
(function () {
  const form = document.getElementById('inquiryForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = form.querySelector('[name="fullname"]').value.trim();
    const company = form.querySelector('[name="company"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const whatsapp = form.querySelector('[name="whatsapp"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      showFormMsg('Please fill in Name, Email, and Message.', 'error');
      return;
    }

    const subject = encodeURIComponent('SKIELD Product Inquiry from ' + name);
    const body = encodeURIComponent(
      'Name: ' + name + '\n' +
      'Company: ' + company + '\n' +
      'Email: ' + email + '\n' +
      'WhatsApp: ' + whatsapp + '\n\n' +
      'Message:\n' + message
    );

    window.location.href = 'mailto:zhangwtao@163.com?subject=' + subject + '&body=' + body;
    showFormMsg('Opening your email client... Thank you for your inquiry!', 'success');
  });

  function showFormMsg(msg, type) {
    let el = document.getElementById('formMsg');
    if (!el) {
      el = document.createElement('p');
      el.id = 'formMsg';
      el.style.cssText = 'margin-top:14px;padding:12px 16px;border-radius:6px;font-size:.88rem;font-weight:600;';
      form.appendChild(el);
    }
    el.textContent = msg;
    el.style.background = type === 'success' ? '#e6f4ea' : '#fdecea';
    el.style.color = type === 'success' ? '#2e7d32' : '#c62828';
  }
})();

// Scroll-reveal: simple fade-in for cards
(function () {
  if (!('IntersectionObserver' in window)) return;

  const els = document.querySelectorAll('.product-card, .product-detail-card, .feature-card, .app-card, .value-card, .contact-item');
  els.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = '';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(function (el) { observer.observe(el); });
})();
