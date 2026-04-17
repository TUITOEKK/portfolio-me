// ── Mobile nav toggle ──
var mobileToggle  = document.getElementById('mobileNavToggle');
var mobileNav     = document.getElementById('mobileNav');
var mobileOverlay = document.getElementById('mobileNavOverlay');
var mobileIcon    = document.getElementById('mobileNavIcon');

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

// ── Filter logic ──
var filterBtns   = document.querySelectorAll('.filter-btn');
var cards        = document.querySelectorAll('.proj-card');
var emptyState   = document.getElementById('emptyState');
var visibleCount = document.getElementById('visibleCount');

filterBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    // update active button
    filterBtns.forEach(function (b) { b.classList.remove('active'); });
    this.classList.add('active');

    var filter  = this.getAttribute('data-filter');
    var visible = 0;

    cards.forEach(function (card) {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.classList.remove('hidden');
        // re-trigger fade animation
        card.style.animation = 'none';
        card.offsetHeight;   // force reflow
        card.style.animation = '';
        visible++;
      } else {
        card.classList.add('hidden');
      }
    });

    visibleCount.textContent = visible;

    // show / hide empty state
    emptyState.style.display = visible === 0 ? 'block' : 'none';
  });
});
// Footer year
document.getElementById('footer-year').textContent = new Date().getFullYear();