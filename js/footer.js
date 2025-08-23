// Footer: Desktop = 3 cols (Menu | Follow Us | Beep).
// Phone = 2 cols (Menu left | Follow Us right), Beep sits BELOW under the right column.
function createFooter() {
  return `
    <footer>
      <style>
        :root {
          --ktp-blue: #1f4f8b;
          --text: #ffffff;
          --text-dim: rgba(255,255,255,0.88);
          --line: rgba(255,255,255,0.22);
          --icon: 24px;
          --sw: 1.8;
        }
        footer {
          background: var(--ktp-blue);
          color: var(--text);
          padding: 28px 0 22px;
          font-family: "Roboto", Arial, sans-serif;
          font-size: 16px;
        }
        .footer-wrap { max-width: 1200px; margin: 0 auto; padding: 0 22px; }

        /* ---------- Desktop/Tablet: 3 columns ---------- */
        .footer-top {
          display: grid;
          grid-template-columns: minmax(200px, 1fr) auto minmax(200px, 1fr);
          grid-template-areas: "left middle right";
          gap: 36px;
          padding-bottom: 16px;
          align-items: start;
        }
        .footer-col--left   { grid-area: left;   padding-left: 20px; }
        .footer-col--middle { grid-area: middle; justify-self: center; }
        .footer-col--brand  { grid-area: right;  padding-right: 20px; justify-self: end; }

        .footer-col h4 {
          margin: 0 0 10px;
          font-weight: 700;
          font-size: 18px;
          color: var(--text);
        }

        /* Menu */
        .footer-list { list-style: none; padding: 0; margin: 0; }
        .footer-list li { margin: 6px 0; }
        .footer-list a { color: var(--text-dim); text-decoration: none; }
        .footer-list a:hover { text-decoration: underline; }

        /* Follow Us */
        .social-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-top: 6px;
        }
        .social-linkRow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--text);
          text-decoration: none;
          line-height: 1;
          border-radius: 6px;
          padding: 2px 0;
        }
        .social-icon { width: var(--icon); height: var(--icon); display: block; }
        .social-icon--outline {
          stroke: currentColor; fill: none; stroke-width: var(--sw);
          stroke-linecap: round; stroke-linejoin: round;
        }
        .social-icon--fill { fill: currentColor; }
        .social-title {
          font-size: 15px; font-weight: 500; color: var(--text); transform: translateY(1px);
        }

        /* Beep doodle */
        .footer-beep { margin-top: auto; }
        .beep-img {
          height: 100px; width: 100px; transform: rotate(10deg);
          display: block; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.25));
        }

        /* Bottom */
        .footer-bottom {
          border-top: 1px solid var(--line);
          padding-top: 12px;
          text-align: center; /* always centered */
        }
        .footer-bottom p { margin: 3px 0; font-size: 15px; color: var(--text-dim); }

        /* ---------- PHONE: two divisions on first row; doodle below right ---------- */
        @media (max-width: 767.98px) {
          .footer-top {
            /* Two columns on the first row; second row reserved for the doodle */
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-areas:
              "left right"   /* row 1: Menu | Follow Us */
              ".    beep";   /* row 2: doodle under right column */
            gap: 16px;
            padding-bottom: 10px;
            align-items: start;
          }

          /* Left column (Menu) */
          .footer-col--left {
            grid-area: left;
            padding-left: 0;
            justify-self: start;
            text-align: left;
          }

          /* Right column (Follow Us) */
          .footer-col--middle {
            grid-area: right;
            justify-self: end;
            text-align: right;
            display: flex;
            flex-direction: column;
            align-items: flex-end; /* title directly above IG/Git rows */
          }

          /* Doodle goes below, aligned under right column */
          .footer-col--brand {
            grid-area: beep;
            display: block;
            justify-self: end;   /* sits under the right column */
            padding-right: 0;
            text-align: right;
          }
          .footer-col--brand h4 { display: none; } /* hide extra title on phone */
          .beep-img { height: 72px; width: 72px; transform: rotate(8deg); }

          /* Tighten bottom text a bit on phones, still centered */
          .footer-bottom p { font-size: 14px; }
        }

        /* ---------- Optional: very small phones ---------- */
        @media (max-width: 360px) {
          .social-title { display: none; } /* icons only if space is tight */
        }
      </style>

      <div class="footer-wrap">
        <div class="footer-top">
          <!-- Left: Menu -->
          <div class="footer-col footer-col--left">
            <h4>Menu</h4>
            <ul class="footer-list">
              <li><a href="index.html">Home</a></li>
              <li><a href="about.html">About</a></li>
              <li><a href="brothers.html">Brothers</a></li>
              <li><a href="recruitment.html">Recruitment</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>

          <!-- Right: Follow Us -->
          <div class="footer-col footer-col--middle">
            <h4>Follow Us</h4>
            <div class="social-grid" aria-label="Social links">
              <!-- Instagram -->
              <a class="social-linkRow" href="https://instagram.com/ktpvandy" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" class="social-icon social-icon--outline" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4.2"/>
                  <circle cx="17" cy="7" r="1.3" fill="currentColor"/>
                </svg>
                <span class="social-title">Instagram</span>
              </a>

              <!-- GitHub (brand-accurate) -->
              <a class="social-linkRow" href="https://github.com/ktpvandy" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg viewBox="0 0 16 16" class="social-icon social-icon--fill" aria-hidden="true">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.292 6.533 5.47 7.594.4.074.546-.174.546-.386
                           0-.19-.007-.693-.01-1.36-2.226.483-2.695-1.073-2.695-1.073-.364-.924-.89-1.17-.89-1.17
                           -.727-.497.055-.487.055-.487.803.056 1.225.825 1.225.825.714 1.223 1.872.87 2.329.665
                           .072-.517.28-.87.508-1.07-1.777-.202-3.644-.888-3.644-3.953 0-.873.312-1.588.823-2.148
                           -.083-.202-.357-1.017.078-2.12 0 0 .672-.215 2.2.82A7.68 7.68 0 0 1 8 4.868
                           c.68.003 1.366.092 2.005.27 1.527-1.035 2.198-.82 2.198-.82.437 1.103.163 1.918.08 2.12
                           .513.56.823 1.275.823 2.148 0 3.073-1.87 3.748-3.65 3.946.287.247.543.734.543 1.48
                           0 1.07-.01 1.933-.01 2.195 0 .214.144.463.55.384C13.71 14.53 16 11.54 16 8
                           c0-4.42-3.58-8-8-8z"/>
                </svg>
                <span class="social-title">GitHub</span>
              </a>
            </div>
          </div>

          <!-- Beep doodle: below right column on phones; right column on desktop -->
          <div class="footer-col footer-col--brand">
            <h4>Kappa Theta Pi Vandy</h4>
            <div class="footer-beep">
              <img src="/images/beep doodle.png" alt="Beep" class="beep-img">
            </div>
          </div>
        </div>

        <!-- Bottom (always centered) -->
        <div class="footer-bottom">
          <p>Developed and maintained by Rho Chapter</p>
          <p>© Kappa Theta Pi - KTP 2025. All rights reserved.</p>
          
        </div>
      </div>
    </footer>
  `;
}

// Inject footer
function injectFooter() {
  const footerHtml = createFooter();
  document.body.insertAdjacentHTML('beforeend', footerHtml);
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectFooter);
} else {
  injectFooter();
}
