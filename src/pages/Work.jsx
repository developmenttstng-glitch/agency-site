import { useEffect, useRef, useState } from 'react'

const projects = [
  { bg:'#1a1a1a', light:true,  client:'Velour Amsterdam', name:'Headless flagship store', desc:'Full Hydrogen storefront with custom product configurator, 3D hotspot room scenes, and real-time variant previews.', tags:['Hydrogen','Shopify Plus','Contentful'], result:'+41% conversion rate' },
  { bg:'#f0ebe2', light:false, client:'Maison Clair', name:'Beauty brand replatform', desc:'Editorial beauty brand moved from Magento to headless Shopify Plus. Zero SEO loss. Lighthouse 98.', tags:['Next.js','Shopify Plus','Sanity CMS'], result:'98 Lighthouse score' },
  { bg:'#2c1810', light:true,  client:'Norr Lifestyle', name:'Immersive room shopping', desc:'Scandinavian homewares brand with room-based product discovery — click any item in a styled scene to shop it.', tags:['Hydrogen','Custom Hotspots','Oxygen'], result:'3.2× avg session time' },
  { bg:'#e8e0d4', light:false, client:'Atelier Roux', name:'Multi-market fashion store', desc:'4 markets, 7 currencies, 1 codebase. Shopify Markets API with localised pricing and content per region.', tags:['Hydrogen','Markets API','Klaviyo'], result:'4 markets, 1 deploy' },
  { bg:'#0f1f2d', light:true,  client:'Kaia Streetwear', name:'Drop-culture launch store', desc:'High-traffic product drops with countdown mechanics, waitlist gating, and queue management for limited releases.', tags:['Next.js','Shopify Plus','Redis'], result:'12k concurrent users' },
  { bg:'#f5f0e8', light:false, client:'Botaniq', name:'DTC wellness brand', desc:'Subscription-first wellness brand built on Shopify with custom subscription logic and personalised reorder flows.', tags:['Hydrogen','Recharge','Klaviyo'], result:'+28% subscription LTV' },
]

export default function Work({ onNav }) {
  const [active, setActive] = useState(null)
  const refs = useRef([])
  const r = i => el => { refs.current[i] = el }

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    refs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <style>{`
        .page-hero { padding: 140px 40px 80px; border-bottom: 1px solid var(--line); }
        .page-eyebrow { font-family: var(--f-mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); margin-bottom: 20px; }
        .page-h1 { font-family: var(--f-serif); font-size: clamp(44px, 7vw, 96px); font-weight: normal; line-height: 0.95; letter-spacing: -0.03em; color: var(--ink); margin-bottom: 32px; }
        .page-h1 em { font-style: italic; color: var(--accent); }
        .page-lead { font-size: 20px; line-height: 1.65; color: var(--muted); max-width: 560px; }

        .work-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
        .wc {
          position: relative; overflow: hidden;
          aspect-ratio: 4/3; cursor: pointer;
        }
        .wc-bg { position: absolute; inset: 0; transition: transform 0.5s ease; display: flex; align-items: center; justify-content: center; }
        .wc:hover .wc-bg { transform: scale(1.04); }
        .wc-overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0); transition: background 0.3s;
          display: flex; align-items: flex-end;
        }
        .wc:hover .wc-overlay { background: rgba(0,0,0,0.15); }
        .wc-info { padding: 28px 32px; z-index: 1; width: 100%; }
        .wc-client { font-family: var(--f-mono); font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 4px; }
        .wc-name { font-family: var(--f-serif); font-size: 20px; font-weight: normal; letter-spacing: -0.02em; line-height: 1.2; }
        .wc-result { font-family: var(--f-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); margin-top: 6px; }

        .work-detail-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.7);
          z-index: 300; display: flex; align-items: center; justify-content: center;
          padding: 40px;
        }
        .work-detail {
          background: var(--paper); max-width: 600px; width: 100%;
          padding: 48px; position: relative;
        }
        .work-detail-close {
          position: absolute; top: 20px; right: 20px;
          background: none; border: none; font-size: 24px; color: var(--muted); cursor: pointer;
        }
        .wd-client { font-family: var(--f-mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); margin-bottom: 12px; }
        .wd-name { font-family: var(--f-serif); font-size: 32px; font-weight: normal; letter-spacing: -0.02em; color: var(--ink); margin-bottom: 20px; line-height: 1.1; }
        .wd-desc { font-size: 15px; line-height: 1.75; color: var(--muted); margin-bottom: 28px; }
        .wd-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 28px; }
        .tag { font-family: var(--f-mono); font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); border: 1px solid var(--line); padding: 4px 10px; }
        .wd-result { background: var(--warm); padding: 20px 24px; }
        .wd-result-label { font-family: var(--f-mono); font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted); margin-bottom: 4px; }
        .wd-result-val { font-family: var(--f-serif); font-size: 28px; font-weight: normal; color: var(--ink); letter-spacing: -0.02em; }

        .reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .btn-primary { font-family: var(--f-mono); font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; background: var(--ink); color: var(--paper); border: none; padding: 14px 28px; transition: background 0.15s; }
        .btn-primary:hover { background: var(--accent); }

        @media (max-width: 768px) {
          .page-hero { padding: 120px 24px 56px; }
          .work-grid { grid-template-columns: 1fr; }
          .work-detail { padding: 32px 24px; }
        }
      `}</style>

      <section className="page-hero">
        <div className="container">
          <div className="page-eyebrow" ref={r(0)}>Our work</div>
          <h1 className="page-h1" ref={r(1)}>Selected<br /><em>projects.</em></h1>
          <p className="page-lead" ref={r(2)}>
            80+ storefronts launched since 2019. Here are six recent ones we're proud of.
            Click any project to see more detail.
          </p>
        </div>
      </section>

      <div className="work-grid">
        {projects.map((p, i) => (
          <div className="wc reveal" key={i} ref={r(10 + i)}
            style={{ background: p.bg, transitionDelay: `${(i % 2) * 0.1}s` }}
            onClick={() => setActive(p)}>
            <div className="wc-bg">
              <svg width="160" height="160" viewBox="0 0 160 160" opacity="0.06">
                <circle cx="80" cy="80" r="60" fill="none" stroke={p.light?'white':'#0e0e0e'} strokeWidth="0.8"/>
                <circle cx="80" cy="80" r="35" fill="none" stroke={p.light?'white':'#0e0e0e'} strokeWidth="0.5"/>
                <line x1="20" y1="80" x2="140" y2="80" stroke={p.light?'white':'#0e0e0e'} strokeWidth="0.5"/>
                <line x1="80" y1="20" x2="80" y2="140" stroke={p.light?'white':'#0e0e0e'} strokeWidth="0.5"/>
              </svg>
            </div>
            <div className="wc-overlay">
              <div className="wc-info">
                <div className="wc-client" style={{ color: p.light?'rgba(255,255,255,0.5)':'var(--muted)' }}>{p.client}</div>
                <div className="wc-name" style={{ color: p.light?'white':'var(--ink)' }}>{p.name}</div>
                <div className="wc-result">{p.result}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <section style={{ padding:'100px 0', textAlign:'center', borderTop:'1px solid var(--line)' }}>
        <div className="container" ref={r(20)}>
          <h2 style={{ fontFamily:'var(--f-serif)', fontSize:'clamp(36px,5vw,64px)', fontWeight:'normal', letterSpacing:'-0.03em', color:'var(--ink)', marginBottom:'24px', lineHeight:1 }}>
            Your store<br />could be <em style={{ fontStyle:'italic', color:'var(--accent)' }}>next.</em>
          </h2>
          <p style={{ color:'var(--muted)', marginBottom:'36px' }}>We're open for projects starting Q3 2025.</p>
          <button className="btn-primary" onClick={() => onNav('contact')}>Start a project →</button>
        </div>
      </section>

      {/* Detail modal */}
      {active && (
        <div className="work-detail-overlay" onClick={() => setActive(null)}>
          <div className="work-detail" onClick={e => e.stopPropagation()}>
            <button className="work-detail-close" onClick={() => setActive(null)}>×</button>
            <div className="wd-client">{active.client}</div>
            <div className="wd-name">{active.name}</div>
            <p className="wd-desc">{active.desc}</p>
            <div className="wd-tags">{active.tags.map(t => <span className="tag" key={t}>{t}</span>)}</div>
            <div className="wd-result">
              <div className="wd-result-label">Key result</div>
              <div className="wd-result-val">{active.result}</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
