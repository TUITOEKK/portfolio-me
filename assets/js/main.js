new Typed('.typing', {
  strings: ["Data Analyst", "Developer", "ICT Technician", "AI Enthusiast"],
  loop: true,
  typeSpeed: 65,
  backSpeed: 88,
  backDelay: 1500
});

(function () {
  "use strict";

  document.querySelectorAll('.nav-menu a, .mobile-nav a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var hash = this.getAttribute('href');
      if (!hash || hash.charAt(0) !== '#') return;

      var target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();

      document.querySelectorAll('.nav-menu li').forEach(function (li) {
        li.classList.remove('active');
      });

      if (this.closest('li')) this.closest('li').classList.add('active');

      window.scrollTo({
        top: target.getBoundingClientRect().top + window.pageYOffset - 70,
        behavior: 'smooth'
      });

      closeMobileNav();
    });
  });

  var sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', function () {
    var scrollY = window.pageYOffset + 100;

    sections.forEach(function (section) {
      var id = section.getAttribute('id');

      if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
        document.querySelectorAll('.nav-menu li').forEach(function (li) {
          li.classList.remove('active');
        });

        var a = document.querySelector('.nav-menu a[href="#' + id + '"]');
        if (a && a.closest('li')) a.closest('li').classList.add('active');
      }
    });
  });

  var mobileToggle = document.getElementById('mobileNavToggle');
  var mobileNav = document.getElementById('mobileNav');
  var mobileOverlay = document.getElementById('mobileNavOverlay');
  var mobileIcon = document.getElementById('mobileNavIcon');

  function closeMobileNav() {
    mobileNav.classList.remove('open');
    mobileOverlay.classList.remove('open');
    mobileIcon.className = 'icofont-navigation-menu';
  }

  mobileToggle.addEventListener('click', function () {
    var isOpen = mobileNav.classList.toggle('open');
    mobileOverlay.classList.toggle('open', isOpen);
    mobileIcon.className = isOpen ? 'icofont-close' : 'icofont-navigation-menu';
  });

  mobileOverlay.addEventListener('click', closeMobileNav);
})();
// ===== SERVICES READMORE BUTTON =====
(function () {
  let activeService = null;

  function collapseService(card) {
    if (!card) return;
    const p = card.querySelector('.service-body p');
    const btn = card.querySelector('.service-read-btn');
    p.classList.remove('expanded');
    btn.textContent = 'Read more ↓';
    card.classList.remove('expanded');
    activeService = null;
  }

  document.querySelectorAll('.service-card').forEach(function (card) {
    const btn = card.querySelector('.service-read-btn');
    const p = card.querySelector('.service-body p');

    // Auto-hide button if text fits in 3 lines
    const lineHeight = parseFloat(getComputedStyle(p).lineHeight);
    if (p.scrollHeight <= Math.ceil(lineHeight * 3) + 2) {
      btn.classList.add('hidden');
      p.style.webkitLineClamp = 'unset';
      p.style.overflow = 'visible';
      p.style.display = 'block';
    }

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const isExpanded = p.classList.contains('expanded');

      if (activeService && activeService !== card) collapseService(activeService);

      if (isExpanded) {
        collapseService(card);
      } else {
        p.classList.add('expanded');
        btn.textContent = 'Read less ↑';
        card.classList.add('expanded');
        activeService = card;
      }
    });

    card.addEventListener('mouseleave', function () {
      collapseService(card);
    });
  });

  document.addEventListener('click', function () {
    collapseService(activeService);
  });

  window.addEventListener('scroll', function () {
    collapseService(activeService);
  }, { passive: true });
})();

// ===== POPUP CLOSE BUTTONS =====
function closePopup() {
  document.getElementById('popupOverlay').style.display = 'none';
}

document.getElementById('popupCloseX').addEventListener('click', closePopup);
document.getElementById('popupCloseDone').addEventListener('click', closePopup);

document.getElementById('popupCloseX').addEventListener('mouseover', function () {
  this.style.color = '#12d640';
});
document.getElementById('popupCloseX').addEventListener('mouseout', function () {
  this.style.color = '#dee2e6';
});

document.getElementById('popupCloseDone').addEventListener('mouseover', function () {
  this.style.background = '#1c7d32';
  this.style.color = '#fff';
});
document.getElementById('popupCloseDone').addEventListener('mouseout', function () {
  this.style.background = '#12d640';
  this.style.color = '#010e1b';
});


// ===== EMAIL VALIDATION =====
function isValidEmail(email) {
  var regex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  return regex.test(email.trim());
}

var emailInput = document.querySelector('#contactForm input[name="email"]');
var formError = document.getElementById('formError');

// Real-time feedback as user types
emailInput.addEventListener('input', function () {
  if (this.value && !isValidEmail(this.value)) {
    this.style.borderColor = '#e80303';
    formError.textContent = '❌ Please enter a valid email address.';
    formError.style.display = 'block';
  } else {
    this.style.borderColor = '#12d640';
    formError.style.display = 'none';
  }
});


// ===== CONTACT FORM — Popup on Success =====
document.getElementById('popupOverlay').addEventListener('click', function (e) {
  if (e.target === this) closePopup();
});

document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  var btn = document.getElementById('submitBtn');
  var email = emailInput.value;

  // Block submission if email is invalid
  if (!isValidEmail(email)) {
    emailInput.style.borderColor = '#e80303';
    formError.textContent = '❌ Please enter a valid email address.';
    formError.style.display = 'block';
    emailInput.focus();
    return;
  }

  btn.innerHTML = 'Sending... <i class="bx bx-loader-alt"></i>';
  btn.disabled = true;
  formError.style.display = 'none';

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: new FormData(this)
    });

    const data = await res.json();

    if (data.success) {
      this.reset();
      emailInput.style.borderColor = '';
      var overlay = document.getElementById('popupOverlay');
      overlay.style.display = 'flex';
    } else {
      formError.textContent = '❌ Something went wrong. Please try again.';
      formError.style.display = 'block';
    }
  } catch (err) {
    formError.textContent = '❌ Network error. Please try again.';
    formError.style.display = 'block';
  }

  btn.innerHTML = 'Send Message &nbsp;<i class="bx bx-send"></i>';
  btn.disabled = false;
});
// Footer year
document.getElementById('footer-year').textContent = new Date().getFullYear();