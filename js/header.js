// Ensure Bootstrap CSS/JS exist (for hamburger functionality)
function ensureBootstrap() {
  if (!document.querySelector('#bootstrap-css-link')) {
    const css = document.createElement('link');
    css.id = 'bootstrap-css-link';
    css.rel = 'stylesheet';
    css.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
    document.head.appendChild(css);
  }
  if (!document.querySelector('#bootstrap-js-bundle')) {
    const js = document.createElement('script');
    js.id = 'bootstrap-js-bundle';
    js.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js';
    js.defer = true;
    document.head.appendChild(js);
  }
}

// Header component for KTP website
function createHeader() {
  return `
    <header>
      <!-- Desktop / Tablet header (unchanged for ≥768px) -->
      <div class="header-left d-none d-md-flex" data-animation-role="header-element">
        <a href="/" data-animation-role="header-element" class="logo-text">
          <div class="greek-letters">ΚΘΠ</div>
          <div class="chapter-text">RHO CHAPTER</div>
        </a>
      </div>

      <nav class="nav-links d-none d-md-flex">
        <a href="/about">About</a>
        <a href="/recruitment">Recruitment</a>
        <a href="/brothers">Brothers</a>
        <a href="/ktp-in-action">KTP in Action</a>
        <a href="/contact">Contact</a>
      </nav>

      <!-- Mobile header (phones only) -->
      <div class="mobile-header d-md-none">
        <!-- Logo: top-left -->
        <a href="/" class="logo-text">
          <div class="greek-letters">ΚΘΠ</div>
          <div class="chapter-text">RHO CHAPTER</div>
        </a>

        <!-- Hamburger: top-right (dark 3 lines) -->
        <button
          class="navbar-toggler mobile-toggler navbar-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mobileMenu"
          aria-controls="mobileMenu"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Mobile dropdown panel (floating overlay) -->
        <div id="mobileMenu" class="collapse mobile-menu">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/recruitment">Recruitment</a>
          <a href="/brothers">Brothers</a>
          <a href="/ktp-in-action">KTP in Action</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
    </header>
  `;
}

// Close menu on link click or outside click
function enableMobileMenuDismiss() {
  const menu = document.getElementById('mobileMenu');
  const toggler = document.querySelector('.mobile-toggler');
  if (!menu || !toggler) return;

  // Close on menu link tap
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      const collapse = bootstrap.Collapse.getOrCreateInstance(menu);
      collapse.hide();
    });
  });

  // Close when clicking outside the menu/toggler
  document.addEventListener('click', (e) => {
    const isInside = menu.contains(e.target) || toggler.contains(e.target);
    if (!isInside && menu.classList.contains('show')) {
      const collapse = bootstrap.Collapse.getOrCreateInstance(menu);
      collapse.hide();
    }
  });
}

// Function to inject header into page
function injectHeader() {
  // Add header CSS link if not already present
  if (!document.querySelector('#header-css-link')) {
    const linkTag = document.createElement('link');
    linkTag.id = 'header-css-link';
    linkTag.rel = 'stylesheet';
    linkTag.href = 'css/header-styles/header.css';
    document.head.appendChild(linkTag);
  }

  // Add Bootstrap for mobile navbar
  ensureBootstrap();

  // Add header HTML at the beginning of body
  const headerHtml = createHeader();
  document.body.insertAdjacentHTML('afterbegin', headerHtml);

  // Enable dismiss behavior when Bootstrap is ready
  if (window.bootstrap) {
    enableMobileMenuDismiss();
  } else {
    window.addEventListener('load', enableMobileMenuDismiss);
  }
}

// Auto-inject header when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectHeader);
} else {
  injectHeader();
}
