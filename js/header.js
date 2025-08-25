// Ensure Bootstrap CSS/JS exist (for offcanvas)
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
        <!-- Logo: top-left (unchanged) -->
        <a href="/" class="logo-text">
          <div class="greek-letters">ΚΘΠ</div>
          <div class="chapter-text">RHO CHAPTER</div>
        </a>

        <!-- Hamburger: top-right — now triggers Offcanvas (operation change only) -->
        <button
          class="navbar-toggler mobile-toggler navbar-light"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileDrawer"
          aria-controls="mobileDrawer"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Offcanvas drawer (slides in from right) -->
        <div class="offcanvas offcanvas-end mobile-drawer"
             tabindex="-1"
             id="mobileDrawer"
             aria-labelledby="mobileDrawerLabel"
             data-bs-backdrop="true"
             data-bs-scroll="false">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="mobileDrawerLabel">Menu</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <nav class="mobile-nav">
              <a href="/">Home</a>
              <a href="/about">About</a>
              <a href="/recruitment">Recruitment</a>
              <a href="/brothers">Brothers</a>
              <a href="/ktp-in-action">KTP in Action</a>
              <a href="/contact">Contact</a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  `;
}

// Close drawer when a link is tapped (optional quality-of-life)
function enableMobileDrawerDismiss() {
  const drawerEl = document.getElementById('mobileDrawer');
  if (!drawerEl || !window.bootstrap) return;
  const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(drawerEl);
  drawerEl.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => offcanvas.hide());
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

  // Add Bootstrap for offcanvas
  ensureBootstrap();

  // Add header HTML at the beginning of body
  const headerHtml = createHeader();
  document.body.insertAdjacentHTML('afterbegin', headerHtml);

  // Enable link-tap dismiss when Bootstrap is ready
  if (window.bootstrap) {
    enableMobileDrawerDismiss();
  } else {
    window.addEventListener('load', enableMobileDrawerDismiss);
  }
}

// Auto-inject header when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectHeader);
} else {
  injectHeader();
}
