// Footer component for KTP website
function createFooter() {
  return `
    <footer>
      <div class="footer-container">
        <div class="footer-left">
          <h3>Kappa Theta Pi – Vanderbilt</h3>
          <p>© Kappa Theta Pi</p>
        </div>
        <div class="footer-right">
          <h4>Links</h4>
          <ul>
            <li><a href="about.html">About</a></li>
            <li><a href="recruitment.html">Recruitment</a></li>
            <li><a href="ktp_in_action.html">KTP in Action</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
      </div>
    </footer>
  `;
}

// Function to inject footer into page
function injectFooter() {
  // Add footer CSS link if not already present
  if (!document.querySelector('#footer-css-link')) {
    const linkTag = document.createElement('link');
    linkTag.id = 'footer-css-link';
    linkTag.rel = 'stylesheet';
    linkTag.href = 'css/footer-styles/footer.css';
    document.head.appendChild(linkTag);
  }

  // Add footer HTML
  const footerHtml = createFooter();
  document.body.insertAdjacentHTML('beforeend', footerHtml);
}

// Auto-inject footer when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectFooter);
} else {
  injectFooter();
} 