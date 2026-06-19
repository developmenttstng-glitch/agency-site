export default function Footer({ onNav }) {
  const year = new Date().getFullYear()

  return (
    <>
      <style>{`
        .footer {
          border-top: 1px solid var(--line);
          padding: 64px 0 40px;
          margin-top: 0;
        }
        .footer-top {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px;
          margin-bottom: 64px;
        }
        .footer-brand-name {
          font-family: var(--f-serif);
          font-size: 28px; font-weight: normal;
          letter-spacing: -0.02em; color: var(--ink);
          margin-bottom: 14px; cursor: pointer;
        }
        .footer-brand-name span { color: var(--accent); }
        .footer-tagline {
          font-size: 14px; line-height: 1.7;
          color: var(--muted); max-width: 260px;
          margin-bottom: 24px;
        }
        .footer-social { display: flex; gap: 12px; }
        .footer-social a {
          font-family: var(--f-mono);
          font-size: 10px; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--muted);
          border: 1px solid var(--line); padding: 6px 12px;
          transition: all 0.15s;
        }
        .footer-social a:hover {
          background: var(--ink); color: var(--paper);
          border-color: var(--ink);
        }
        .footer-col-title {
          font-family: var(--f-mono);
          font-size: 10px; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--muted);
          margin-bottom: 20px;
        }
        .footer-col-links {
          display: flex; flex-direction: column; gap: 12px;
          list-style: none;
        }
        .footer-col-links button {
          font-size: 14px; color: var(--muted);
          background: none; border: none;
          text-align: left; padding: 0;
          transition: color 0.15s;
        }
        .footer-col-links button:hover { color: var(--ink); }
        .footer-bottom {
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 16px;
          padding-top: 32px; border-top: 1px solid var(--line);
        }
        .footer-copy {
          font-family: var(--f-mono);
          font-size: 10px; letter-spacing: 0.08em; color: var(--muted);
        }
        .footer-legal { display: flex; gap: 24px; }
        .footer-legal a {
          font-family: var(--f-mono);
          font-size: 10px; letter-spacing: 0.08em;
          color: var(--muted); transition: color 0.15s;
        }
        .footer-legal a:hover { color: var(--ink); }

        @media (max-width: 768px) {
          .footer-top { grid-template-columns: 1fr 1fr; gap: 32px; }
          .footer-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 480px) {
          .footer-top { grid-template-columns: 1fr; }
        }
      `}</style>

      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-brand-name" onClick={() => onNav('home')}>
                Forma<span>.</span>
              </div>
              <p className="footer-tagline">
                Headless Shopify storefronts for fashion, lifestyle, and beauty brands
                ready to outgrow what standard themes allow.
              </p>
              <div className="footer-social">
                <a href="#">LinkedIn</a>
                <a href="#">Twitter</a>
                <a href="#">Dribbble</a>
              </div>
            </div>

            <div>
              <div className="footer-col-title">Company</div>
              <ul className="footer-col-links">
                <li><button onClick={() => onNav('about')}>About Us</button></li>
                <li><button onClick={() => onNav('work')}>Our Work</button></li>
                <li><button onClick={() => onNav('blog')}>Blog</button></li>
                <li><button onClick={() => onNav('contact')}>Contact</button></li>
              </ul>
            </div>

            <div>
              <div className="footer-col-title">Services</div>
              <ul className="footer-col-links">
                <li><button onClick={() => onNav('services')}>Headless Storefronts</button></li>
                <li><button onClick={() => onNav('services')}>Design Systems</button></li>
                <li><button onClick={() => onNav('services')}>Platform Migration</button></li>
                <li><button onClick={() => onNav('services')}>Retainer & Support</button></li>
              </ul>
            </div>

            <div>
              <div className="footer-col-title">Contact</div>
              <ul className="footer-col-links">
                <li><button>hello@forma.studio</button></li>
                <li><button>+31 20 123 4567</button></li>
                <li><button>Amsterdam, NL</button></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copy">
              © {year} Forma Studio BV — Amsterdam · Remote-first
            </div>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms</a>
              <a href="#">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
