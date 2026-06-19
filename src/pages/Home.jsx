import { useEffect, useRef } from 'react'

export default function Home({ onNav }) {
  const revealRefs = useRef([])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    revealRefs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const r = (i) => (el) => { revealRefs.current[i] = el }

  return (
    <>
      <style>{`
        .home-hero {
          min-height: 100vh;
          display: flex; flex-direction: column; justify-content: flex-end;
          padding: 140px 40px 64px;
          border-bottom: 1px solid var(--line);
        }
        .hero-eyebrow {
          font-family: var(--f-mono);
          font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--muted); margin-bottom: 28px;
          display: flex; align-items: center; gap: 14px;
        }
        .hero-eyebrow::before {
          content: ''; display: block; width: 32px; height: 1px; background: var(--accent);
        }
        .hero-h1 {
          font-family: var(--f-serif);
          font-size: clamp(52px, 8.5vw, 116px);
          font-weight: normal; line-height: 0.93;
          letter-spacing: -0.03em; color: var(--ink);
          max-width: 960px; margin-bottom: 56px;
        }
        .hero-h1 em { font-style: italic; color: var(--accent); }
        .hero-bottom {
          display: flex; align-items: flex-end;
          justify-content: space-between; gap: 40px; flex-wrap: wrap;
        }
        .hero-desc {
          font-size: 17px; line-height: 1.7;
          color: var(--muted); max-width: 400px;
        }
        .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
        .btn-primary {
          font-family: var(--f-mono);
          font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;
          background: var(--ink); color: var(--paper);
          border: none; padding: 14px 28px; transition: background 0.15s;
        }
        .btn-primary:hover { background: var(--accent); }
        .btn-ghost {
          font-family: var(--f-mono);
          font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;
          background: transparent; color: var(--ink);
          border: 1px solid var(--line); padding: 14px 28px;
          transition: all 0.15s;
        }
        .btn-ghost:hover { border-color: var(--ink); }

        .ticker {
          overflow: hidden; border-bottom: 1px solid var(--line);
          padding: 14px 0; background: var(--warm);
        }
        .ticker-inner { display: flex; animation: ticker 24s linear infinite; width: max-content; }
        .ticker-item {
          font-family: var(--f-mono); font-size: 11px;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--muted); padding: 0 28px; white-space: nowrap;
        }
        .ticker-dot { color: var(--accent); margin: 0 4px; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        .home-stats {
          padding: 80px 0; border-bottom: 1px solid var(--line);
          display: grid; grid-template-columns: repeat(4, 1fr);
        }
        .stat {
          padding: 40px; border-right: 1px solid var(--line); text-align: center;
        }
        .stat:last-child { border-right: none; }
        .stat-num {
          font-family: var(--f-serif);
          font-size: 56px; font-weight: normal;
          letter-spacing: -0.04em; color: var(--ink); line-height: 1;
          margin-bottom: 8px;
        }
        .stat-num span { color: var(--accent); }
        .stat-label {
          font-family: var(--f-mono); font-size: 10px;
          letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted);
        }

        .home-intro { padding: 100px 0; border-bottom: 1px solid var(--line); }
        .home-intro-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
        }
        .home-intro-title {
          font-family: var(--f-serif);
          font-size: clamp(32px, 3.5vw, 48px); font-weight: normal;
          letter-spacing: -0.025em; line-height: 1.1; color: var(--ink);
          margin-bottom: 24px;
        }
        .home-intro-title em { color: var(--accent); font-style: italic; }
        .home-intro-body { font-size: 16px; line-height: 1.75; color: var(--muted); margin-bottom: 32px; }

        .home-services { padding: 100px 0; border-bottom: 1px solid var(--line); }
        .section-eyebrow {
          font-family: var(--f-mono); font-size: 10px;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--accent); margin-bottom: 16px;
        }
        .section-title {
          font-family: var(--f-serif);
          font-size: clamp(30px, 3.5vw, 48px); font-weight: normal;
          letter-spacing: -0.025em; line-height: 1.1; color: var(--ink);
          margin-bottom: 56px; max-width: 560px;
        }
        .section-title em { font-style: italic; color: var(--accent); }
        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; }
        .service-card {
          padding: 40px 36px 40px 0;
          border-right: 1px solid var(--line);
        }
        .service-card:last-child { border-right: none; padding-right: 0; }
        .service-card:not(:first-child) { padding-left: 36px; }
        .service-num {
          font-family: var(--f-mono); font-size: 10px;
          letter-spacing: 0.15em; color: var(--accent); margin-bottom: 18px;
        }
        .service-name {
          font-family: var(--f-serif); font-size: 22px; font-weight: normal;
          letter-spacing: -0.02em; color: var(--ink);
          margin-bottom: 12px; line-height: 1.2;
        }
        .service-desc { font-size: 14px; line-height: 1.7; color: var(--muted); margin-bottom: 20px; }
        .service-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .tag {
          font-family: var(--f-mono); font-size: 9px; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--muted);
          border: 1px solid var(--line); padding: 4px 10px;
        }

        .home-work { padding: 100px 0; border-bottom: 1px solid var(--line); }
        .work-grid-home { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; margin-top: 0; }
        .work-card {
          position: relative; overflow: hidden; aspect-ratio: 4/3; cursor: pointer;
        }
        .work-card-bg {
          position: absolute; inset: 0;
          transition: transform 0.5s ease;
          display: flex; align-items: center; justify-content: center;
        }
        .work-card:hover .work-card-bg { transform: scale(1.04); }
        .work-card-info {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 28px 32px;
          background: linear-gradient(transparent, rgba(0,0,0,0.5));
          z-index: 1;
        }
        .work-card-client {
          font-family: var(--f-mono); font-size: 10px;
          letter-spacing: 0.15em; text-transform: uppercase;
          margin-bottom: 4px;
        }
        .work-card-name {
          font-family: var(--f-serif); font-size: 20px; font-weight: normal;
          letter-spacing: -0.02em; line-height: 1.2;
        }
        .work-card-type {
          font-family: var(--f-mono); font-size: 9px;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--accent); margin-top: 6px;
        }

        .home-cta {
          padding: 100px 0;
          text-align: center;
        }
        .cta-title {
          font-family: var(--f-serif);
          font-size: clamp(40px, 6vw, 80px); font-weight: normal;
          letter-spacing: -0.03em; line-height: 1; color: var(--ink);
          margin-bottom: 32px;
        }
        .cta-title em { font-style: italic; color: var(--accent); }
        .cta-sub { font-size: 16px; color: var(--muted); margin-bottom: 40px; }

        .reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        @media (max-width: 768px) {
          .home-hero { padding: 120px 24px 48px; }
          .home-stats { grid-template-columns: 1fr 1fr; }
          .stat { border-bottom: 1px solid var(--line); }
          .home-intro-grid { grid-template-columns: 1fr; gap: 40px; }
          .services-grid { grid-template-columns: 1fr; }
          .service-card { border-right: none; border-bottom: 1px solid var(--line); padding: 32px 0; }
          .service-card:not(:first-child) { padding-left: 0; }
          .work-grid-home { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* HERO */}
      <section className="home-hero">
        <div className="hero-eyebrow">Headless Shopify Agency — Est. 2019</div>
        <h1 className="hero-h1">
          We build stores<br />
          that <em>move</em><br />
          faster.
        </h1>
        <div className="hero-bottom">
          <p className="hero-desc">
            Custom headless storefronts for fashion, lifestyle, and beauty brands
            ready to outgrow what standard themes allow.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => onNav('contact')}>Start a project</button>
            <button className="btn-ghost" onClick={() => onNav('work')}>See our work</button>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-inner">
          {['Headless Shopify','Hydrogen','Next.js','Storefront API','Shopify Plus',
            'Design Systems','Platform Migration','Oxygen','Sanity CMS','React',
            'Performance-first','Fashion & Lifestyle','Headless Shopify','Hydrogen',
            'Next.js','Storefront API','Shopify Plus','Design Systems','Platform Migration',
            'Oxygen','Sanity CMS','React','Performance-first','Fashion & Lifestyle'
          ].map((item, i) => (
            <span key={i} className="ticker-item">
              {item}<span className="ticker-dot">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div className="home-stats">
        {[
          { num: '80', suffix: '+', label: 'Stores launched' },
          { num: '6',  suffix: 'yr', label: 'On Shopify' },
          { num: '3',  suffix: '×', label: 'Avg speed gain' },
          { num: '98', suffix: '%', label: 'Client retention' },
        ].map((s, i) => (
          <div className="stat" key={i} ref={r(i)}>
            <div className="stat-num">{s.num}<span>{s.suffix}</span></div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* INTRO */}
      <section className="home-intro">
        <div className="container">
          <div className="home-intro-grid">
            <div ref={r(10)}>
              <div className="section-eyebrow">Who we are</div>
              <h2 className="home-intro-title">
                A small agency.<br /><em>Outsized</em> results.
              </h2>
              <p className="home-intro-body">
                We are a team of 8 specialists — strategists, designers, and engineers —
                focused exclusively on Shopify headless. No juniors, no outsourcing.
                Every person on your project is the person who scoped it.
              </p>
              <p className="home-intro-body">
                We started in 2019 when headless commerce was still a buzzword.
                Today it is our entire practice, and we have shipped more Hydrogen
                storefronts than any agency in the Benelux.
              </p>
              <button className="btn-ghost" onClick={() => onNav('about')}
                style={{ marginTop: '8px' }}>
                Read our story →
              </button>
            </div>
            <div ref={r(11)} style={{
              background: 'var(--warm)', aspectRatio: '4/5',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <svg width="120" height="120" viewBox="0 0 120 120" opacity="0.2">
                <circle cx="60" cy="60" r="50" fill="none" stroke="var(--ink)" strokeWidth="0.8"/>
                <circle cx="60" cy="60" r="30" fill="none" stroke="var(--ink)" strokeWidth="0.5"/>
                <circle cx="60" cy="60" r="10" fill="var(--accent)" opacity="0.4"/>
                <line x1="10" y1="60" x2="110" y2="60" stroke="var(--ink)" strokeWidth="0.5"/>
                <line x1="60" y1="10" x2="60" y2="110" stroke="var(--ink)" strokeWidth="0.5"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="home-services">
        <div className="container">
          <div ref={r(12)}>
            <div className="section-eyebrow">What we do</div>
            <h2 className="section-title">Three things.<br /><em>Done right.</em></h2>
          </div>
          <div className="services-grid">
            {[
              { num:'01', name:'Headless Storefronts', desc:'Custom React frontends on Shopify\'s Storefront API. Built with Hydrogen or Next.js for blazing performance and total design freedom.', tags:['Hydrogen','Next.js','React','Oxygen'] },
              { num:'02', name:'Design Systems', desc:'End-to-end design from brand identity to component libraries. We hand engineers a complete system, not a collection of screens.', tags:['Figma','UI/UX','Design tokens'] },
              { num:'03', name:'Platform Migrations', desc:'Moving from Magento, Salesforce, or WooCommerce. Clean data migration, zero SEO loss, built for the next decade.', tags:['Replatform','Data migration','SEO'] },
            ].map((s, i) => (
              <div className="service-card" key={i} ref={r(20 + i)}
                style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="service-num">{s.num}</div>
                <div className="service-name">{s.name}</div>
                <p className="service-desc">{s.desc}</p>
                <div className="service-tags">
                  {s.tags.map(t => <span className="tag" key={t}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '48px' }} ref={r(30)}>
            <button className="btn-ghost" onClick={() => onNav('services')}>
              All services →
            </button>
          </div>
        </div>
      </section>

      {/* WORK PREVIEW */}
      <section className="home-work">
        <div className="container" style={{ marginBottom: '40px' }}>
          <div ref={r(31)}>
            <div className="section-eyebrow">Selected work</div>
            <h2 className="section-title">Recent <em>projects</em></h2>
          </div>
        </div>
        <div className="work-grid-home">
          {[
            { bg:'#1a1a1a', client:'Velour Amsterdam', name:'Headless flagship with product configurator', type:'Hydrogen · Shopify Plus', light: true },
            { bg:'#f0ebe2', client:'Maison Clair', name:'Beauty brand replatform from Magento', type:'Next.js · Shopify Plus · Sanity', light: false },
            { bg:'#2c1810', client:'Norr Lifestyle', name:'Scandinavian homewares — immersive room shopping', type:'Hydrogen · Custom Hotspots', light: true },
            { bg:'#e8e0d4', client:'Atelier Roux', name:'Multi-currency fashion — 4 markets, 1 codebase', type:'Hydrogen · Markets API · Klaviyo', light: false },
          ].map((w, i) => (
            <div className="work-card" key={i} ref={r(40 + i)}
              style={{ background: w.bg }}
              onClick={() => onNav('work')}>
              <div className="work-card-bg">
                <svg width="160" height="160" viewBox="0 0 160 160" opacity="0.07">
                  <circle cx="80" cy="80" r="60" fill="none" stroke={w.light ? 'white' : '#0e0e0e'} strokeWidth="0.8"/>
                  <circle cx="80" cy="80" r="35" fill="none" stroke={w.light ? 'white' : '#0e0e0e'} strokeWidth="0.5"/>
                  <line x1="20" y1="80" x2="140" y2="80" stroke={w.light ? 'white' : '#0e0e0e'} strokeWidth="0.5"/>
                  <line x1="80" y1="20" x2="80" y2="140" stroke={w.light ? 'white' : '#0e0e0e'} strokeWidth="0.5"/>
                </svg>
              </div>
              <div className="work-card-info">
                <div className="work-card-client" style={{ color: w.light ? 'rgba(255,255,255,0.5)' : 'var(--muted)' }}>{w.client}</div>
                <div className="work-card-name" style={{ color: w.light ? 'white' : 'var(--ink)' }}>{w.name}</div>
                <div className="work-card-type">{w.type}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="container" style={{ marginTop: '40px' }} ref={r(50)}>
          <button className="btn-ghost" onClick={() => onNav('work')}>View all projects →</button>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="home-cta" ref={r(51)}>
        <div className="container">
          <h2 className="cta-title">Ready to go<br /><em>headless?</em></h2>
          <p className="cta-sub">We take on 4–6 new projects per year. Let's see if we're a fit.</p>
          <button className="btn-primary" onClick={() => onNav('contact')}>
            Start a conversation →
          </button>
        </div>
      </section>
    </>
  )
}
