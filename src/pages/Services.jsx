import { useEffect, useRef } from 'react'

export default function Services({ onNav }) {
  const refs = useRef([])
  const r = i => el => { refs.current[i] = el }

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    refs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const services = [
    {
      num: '01', name: 'Headless Storefronts',
      tagline: 'Your storefront, unchained.',
      desc: 'We build custom React frontends on Shopify\'s Storefront API using Hydrogen or Next.js. The result is a store that loads in under a second, looks exactly like your brand vision, and can scale without re-platforming.',
      includes: ['Hydrogen or Next.js frontend','Shopify Storefront API integration','Custom cart & checkout flow','Oxygen or Vercel deployment','Lighthouse 95+ performance score','6-month post-launch support'],
      tags: ['Hydrogen','Next.js','React','Storefront API','Oxygen','Vercel'],
      timeline: '8 – 14 weeks',
      from: '€35,000',
    },
    {
      num: '02', name: 'Design Systems',
      tagline: 'Design that scales.',
      desc: 'A complete design system built in Figma — type scale, colour tokens, component library, motion spec, and responsive layout grid. We hand engineers a locked spec, not a mood board.',
      includes: ['Brand identity (if needed)','Full Figma component library','Design token documentation','Motion & interaction spec','Responsive layout system','Design-to-code handover session'],
      tags: ['Figma','UI/UX','Design tokens','Motion design','Accessibility'],
      timeline: '4 – 8 weeks',
      from: '€18,000',
    },
    {
      num: '03', name: 'Platform Migrations',
      tagline: 'Move without losing ground.',
      desc: 'We migrate brands from Magento, Salesforce Commerce Cloud, WooCommerce, or custom platforms to Shopify Plus headless. Zero SEO loss. Full data integrity. Architecture built for the next decade.',
      includes: ['Pre-migration audit & mapping','Product & customer data migration','301 redirect strategy','SEO parity verification','Parallel run testing','Staff training on Shopify admin'],
      tags: ['Replatform','Data migration','SEO','Shopify Plus','Magento','Salesforce'],
      timeline: '10 – 16 weeks',
      from: '€45,000',
    },
    {
      num: '04', name: 'Retainer & Support',
      tagline: 'We do not disappear after launch.',
      desc: 'Monthly retainer for ongoing development, A/B testing, CRO work, and feature shipping. Your dedicated team stays familiar with the codebase and keeps the store improving week over week.',
      includes: ['Dedicated 2-person team','Monthly sprint planning','CRO testing & analysis','Feature development','Performance monitoring','Priority Slack access'],
      tags: ['CRO','A/B testing','Analytics','Feature dev','Support'],
      timeline: 'Ongoing monthly',
      from: '€4,500 / mo',
    },
  ]

  return (
    <>
      <style>{`
        .page-hero { padding: 140px 40px 80px; border-bottom: 1px solid var(--line); }
        .page-eyebrow { font-family: var(--f-mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); margin-bottom: 20px; }
        .page-h1 { font-family: var(--f-serif); font-size: clamp(44px, 7vw, 96px); font-weight: normal; line-height: 0.95; letter-spacing: -0.03em; color: var(--ink); margin-bottom: 32px; max-width: 800px; }
        .page-h1 em { font-style: italic; color: var(--accent); }
        .page-lead { font-size: 20px; line-height: 1.65; color: var(--muted); max-width: 560px; }

        .services-list { }
        .service-row {
          display: grid; grid-template-columns: 200px 1fr 280px;
          gap: 60px; padding: 80px 0;
          border-bottom: 1px solid var(--line);
          align-items: start;
        }
        .service-row:first-child { border-top: none; }
        .service-left { padding-top: 4px; }
        .service-row-num { font-family: var(--f-mono); font-size: 10px; letter-spacing: 0.15em; color: var(--accent); margin-bottom: 12px; }
        .service-row-name { font-family: var(--f-serif); font-size: 28px; font-weight: normal; letter-spacing: -0.02em; color: var(--ink); line-height: 1.1; margin-bottom: 8px; }
        .service-row-tagline { font-size: 13px; font-style: italic; color: var(--muted); }
        .service-row-desc { font-size: 15px; line-height: 1.75; color: var(--muted); margin-bottom: 24px; }
        .service-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 24px; }
        .tag { font-family: var(--f-mono); font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); border: 1px solid var(--line); padding: 4px 10px; }
        .service-includes-title { font-family: var(--f-mono); font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted); margin-bottom: 14px; }
        .service-includes { list-style: none; display: flex; flex-direction: column; gap: 8px; }
        .service-includes li { font-size: 13px; color: var(--muted); display: flex; gap: 10px; align-items: baseline; }
        .service-includes li::before { content: '—'; color: var(--accent); flex-shrink: 0; font-size: 11px; }
        .service-meta { background: var(--warm); padding: 28px; }
        .service-meta-row { padding: 14px 0; border-bottom: 1px solid var(--line); }
        .service-meta-row:last-of-type { border-bottom: none; }
        .meta-label { font-family: var(--f-mono); font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted); margin-bottom: 4px; }
        .meta-val { font-family: var(--f-serif); font-size: 22px; font-weight: normal; color: var(--ink); letter-spacing: -0.02em; }
        .meta-cta { margin-top: 20px; width: 100%; font-family: var(--f-mono); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; background: var(--ink); color: var(--paper); border: none; padding: 14px; transition: background 0.15s; }
        .meta-cta:hover { background: var(--accent); }

        .reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        @media (max-width: 900px) {
          .page-hero { padding: 120px 24px 56px; }
          .service-row { grid-template-columns: 1fr; gap: 32px; padding: 56px 0; }
        }
      `}</style>

      <section className="page-hero">
        <div className="container">
          <div className="page-eyebrow" ref={r(0)}>Services</div>
          <h1 className="page-h1" ref={r(1)}>What we<br /><em>build.</em></h1>
          <p className="page-lead" ref={r(2)}>
            Four focused services. Each one scoped to your brand's actual needs —
            not a package, not a template.
          </p>
        </div>
      </section>

      <div>
        {services.map((s, i) => (
          <div key={i} ref={r(10 + i)}>
            <div className="container">
              <div className="service-row reveal">
                <div className="service-left">
                  <div className="service-row-num">{s.num}</div>
                  <div className="service-row-name">{s.name}</div>
                  <div className="service-row-tagline">{s.tagline}</div>
                </div>
                <div>
                  <p className="service-row-desc">{s.desc}</p>
                  <div className="service-tags">
                    {s.tags.map(t => <span className="tag" key={t}>{t}</span>)}
                  </div>
                  <div className="service-includes-title">What's included</div>
                  <ul className="service-includes">
                    {s.includes.map((inc, j) => <li key={j}>{inc}</li>)}
                  </ul>
                </div>
                <div>
                  <div className="service-meta">
                    <div className="service-meta-row">
                      <div className="meta-label">Timeline</div>
                      <div className="meta-val">{s.timeline}</div>
                    </div>
                    <div className="service-meta-row">
                      <div className="meta-label">Starting from</div>
                      <div className="meta-val">{s.from}</div>
                    </div>
                    <button className="meta-cta" onClick={() => onNav('contact')}>
                      Discuss this service →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
