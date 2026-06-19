import { useState, useEffect } from 'react'

const links = [
  { label: 'Home',       page: 'home' },
  { label: 'About Us',   page: 'about' },
  { label: 'Services',   page: 'services' },
  { label: 'Work',       page: 'work' },
  { label: 'Blog',       page: 'blog' },
  { label: 'Contact',    page: 'contact' },
]

export default function Nav({ currentPage, onNav }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function go(page) {
    onNav(page)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <style>{`
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          background: var(--paper);
          border-bottom: 1px solid ${scrolled ? 'var(--line)' : 'transparent'};
          transition: border-color 0.3s;
          padding: 0 40px;
          display: flex; align-items: center; justify-content: space-between;
          height: 64px;
        }
        .nav-logo {
          font-family: var(--f-serif);
          font-size: 22px; font-weight: normal;
          letter-spacing: -0.02em; color: var(--ink);
          cursor: pointer;
        }
        .nav-logo span { color: var(--accent); }
        .nav-links {
          display: flex; gap: 4px; list-style: none;
          align-items: center;
        }
        .nav-link-btn {
          font-size: 13px; color: var(--muted);
          background: none; border: none;
          padding: 6px 14px;
          letter-spacing: 0.02em;
          transition: color 0.15s;
          position: relative;
        }
        .nav-link-btn:hover { color: var(--ink); }
        .nav-link-btn.active { color: var(--ink); font-weight: 500; }
        .nav-link-btn.active::after {
          content: '';
          position: absolute; bottom: -2px; left: 14px; right: 14px;
          height: 1.5px; background: var(--accent);
        }
        .nav-cta {
          font-size: 11px; font-family: var(--f-mono);
          letter-spacing: 0.12em; text-transform: uppercase;
          background: var(--ink); color: var(--paper);
          border: none; padding: 11px 22px;
          margin-left: 12px;
          transition: background 0.15s;
        }
        .nav-cta:hover { background: var(--accent); }
        .hamburger {
          display: none; flex-direction: column;
          gap: 5px; background: none; border: none;
          padding: 4px;
        }
        .hamburger span {
          display: block; width: 24px; height: 1.5px;
          background: var(--ink);
          transition: all 0.2s;
        }
        .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(4.5px, 4.5px); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(4.5px, -4.5px); }

        /* Mobile drawer */
        .mobile-menu {
          display: none; position: fixed;
          top: 64px; left: 0; right: 0; bottom: 0;
          background: var(--paper);
          border-top: 1px solid var(--line);
          flex-direction: column;
          padding: 32px 24px;
          z-index: 199;
        }
        .mobile-menu.open { display: flex; }
        .mobile-link {
          font-family: var(--f-serif);
          font-size: 32px; font-weight: normal;
          letter-spacing: -0.02em;
          background: none; border: none;
          color: var(--ink); padding: 14px 0;
          border-bottom: 1px solid var(--line);
          text-align: left;
          transition: color 0.15s;
        }
        .mobile-link:hover, .mobile-link.active { color: var(--accent); }
        .mobile-cta {
          margin-top: 32px;
          font-size: 11px; font-family: var(--f-mono);
          letter-spacing: 0.15em; text-transform: uppercase;
          background: var(--ink); color: var(--paper);
          border: none; padding: 16px;
          text-align: center;
        }

        @media (max-width: 900px) {
          .nav { padding: 0 24px; }
          .nav-links { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>

      <nav className="nav">
        <div className="nav-logo" onClick={() => go('home')}>
          Forma<span>.</span>
        </div>

        <ul className="nav-links">
          {links.map(l => (
            <li key={l.page}>
              <button
                className={`nav-link-btn ${currentPage === l.page ? 'active' : ''}`}
                onClick={() => go(l.page)}
              >
                {l.label}
              </button>
            </li>
          ))}
          <li>
            <button className="nav-cta" onClick={() => go('contact')}>
              Start a project
            </button>
          </li>
        </ul>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {links.map(l => (
          <button
            key={l.page}
            className={`mobile-link ${currentPage === l.page ? 'active' : ''}`}
            onClick={() => go(l.page)}
          >
            {l.label}
          </button>
        ))}
        <button className="mobile-cta" onClick={() => go('contact')}>
          Start a project →
        </button>
      </div>
    </>
  )
}
