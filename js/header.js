// Header component for KTP website
function createHeader() {
  return `
    <header>
      <div class="header-title" data-animation-role="header-element">
        <div class="header-title-logo">
          <a href="/" data-animation-role="header-element" class="logo-text">
            <div class="greek-letters">ΚΘΠ</div>
            <div class="chapter-text">RHO CHAPTER</div>
          </a>
        </div>
      </div>
        
      <nav class="nav-links">
        <a href="/about">About</a>
        <a href="/recruitment">Recruitment</a>
        <a href="/brothers">Brothers</a>
        <a href="/ktp-in-action">KTP in Action</a>
        <a href="/contact">Contact</a>
      </nav>
    </header>
  `;
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

  // Add header HTML at the beginning of body
  const headerHtml = createHeader();
  document.body.insertAdjacentHTML('afterbegin', headerHtml);
}

// Auto-inject header when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectHeader);
} else {
  injectHeader();
} 