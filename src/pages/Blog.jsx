import { useEffect, useRef, useState } from 'react'

const posts = [
  { tag:'Headless', date:'12 May 2025', title:'Why we stopped recommending Hydrogen for every project', excerpt:'Hydrogen is a fantastic framework. It is not always the right one. Here is how we think about the decision now, after 40+ headless builds.', readTime:'6 min read' },
  { tag:'Design', date:'28 Apr 2025', title:'Building a design system for a Shopify store in 4 weeks', excerpt:'A behind-the-scenes look at how we scoped, designed, and delivered a complete Figma component library for a beauty brand in one month.', readTime:'9 min read' },
  { tag:'Performance', date:'14 Apr 2025', title:'From 42 to 98: how we fixed a Shopify store Lighthouse score', excerpt:'Real steps, real numbers. The Maison Clair case study — what was broken, how we fixed it, and what changed in revenue.', readTime:'11 min read' },
  { tag:'Migration', date:'02 Apr 2025', title:'Migrating from Magento to Shopify Plus — without losing SEO', excerpt:'301 redirects, content mapping, structured data — the full playbook we use for every platform migration to avoid traffic loss.', readTime:'14 min read' },
  { tag:'Strategy', date:'18 Mar 2025', title:'Is headless commerce right for your brand? An honest checklist', excerpt:'We turn down headless projects when the budget or traffic level does not justify it. Here is the exact checklist we use internally.', readTime:'5 min read' },
  { tag:'Engineering', date:'04 Mar 2025', title:'Using Shopify Markets API with Hydrogen — a practical guide', excerpt:'Multi-currency, multi-language, one codebase. Everything we learned shipping a 4-market storefront on Hydrogen v2.', readTime:'18 min read' },
]

const tags = ['All', 'Headless', 'Design', 'Performance', 'Migration', 'Strategy', 'Engineering']

export default function Blog() {
  const [filter, setFilter] = useState('All')
  const refs = useRef([])
  const r = i => el => { refs.current[i] = el }

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    refs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [filter])

  const filtered = filter === 'All' ? posts : posts.filter(p => p.tag === filter)

  return (
    <>
      <style>{`
        .page-hero { padding: 140px 40px 80px; border-bottom: 1px solid var(--line); }
        .page-eyebrow { font-family: var(--f-mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); margin-bottom: 20px; }
        .page-h1 { font-family: var(--f-serif); font-size: clamp(44px, 7vw, 96px); font-weight: normal; line-height: 0.95; letter-spacing: -0.03em; color: var(--ink); margin-bottom: 32px; }
        .page-h1 em { font-style: italic; color: var(--accent); }
        .page-lead { font-size: 20px; line-height: 1.65; color: var(--muted); max-width: 560px; }

        .blog-filters { padding: 32px 0; border-bottom: 1px solid var(--line); display: flex; gap: 8px; flex-wrap: wrap; }
        .filter-btn {
          font-family: var(--f-mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase;
          background: none; border: 1px solid var(--line); color: var(--muted); padding: 7px 16px;
          transition: all 0.15s;
        }
        .filter-btn:hover { border-color: var(--ink); color: var(--ink); }
        .filter-btn.active { background: var(--ink); color: var(--paper); border-color: var(--ink); }

        .blog-grid { padding: 64px 0; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 40px; }
        .post-card { border-top: 1px solid var(--line); padding-top: 24px; cursor: pointer; }
        .post-card:hover .post-title { color: var(--accent); }
        .post-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
        .post-tag { font-family: var(--f-mono); font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); }
        .post-date { font-family: var(--f-mono); font-size: 9px; letter-spacing: 0.1em; color: var(--muted); }
        .post-sep { width: 1px; height: 12px; background: var(--line); }
        .post-title { font-family: var(--f-serif); font-size: 20px; font-weight: normal; letter-spacing: -0.02em; line-height: 1.25; color: var(--ink); margin-bottom: 12px; transition: color 0.15s; }
        .post-excerpt { font-size: 13px; line-height: 1.7; color: var(--muted); margin-bottom: 16px; }
        .post-read { font-family: var(--f-mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }

        .blog-featured { padding: 64px 0; border-bottom: 1px solid var(--line); }
        .featured-card {
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
          background: var(--warm); padding: 56px;
        }
        .featured-label { font-family: var(--f-mono); font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); margin-bottom: 20px; }
        .featured-title { font-family: var(--f-serif); font-size: 32px; font-weight: normal; letter-spacing: -0.025em; color: var(--ink); margin-bottom: 16px; line-height: 1.15; }
        .featured-title em { font-style: italic; color: var(--accent); }
        .featured-excerpt { font-size: 15px; line-height: 1.75; color: var(--muted); margin-bottom: 28px; }
        .featured-read { font-family: var(--f-mono); font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--ink); }
        .featured-visual { background: var(--paper); aspect-ratio: 4/3; display: flex; align-items: center; justify-content: center; }

        .newsletter { padding: 80px 0; border-top: 1px solid var(--line); }
        .newsletter-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .newsletter-title { font-family: var(--f-serif); font-size: 36px; font-weight: normal; letter-spacing: -0.025em; color: var(--ink); margin-bottom: 12px; }
        .newsletter-title em { font-style: italic; color: var(--accent); }
        .newsletter-sub { font-size: 15px; color: var(--muted); line-height: 1.65; }
        .newsletter-form { display: flex; border-bottom: 1.5px solid var(--ink); }
        .newsletter-input { flex: 1; background: none; border: none; font-size: 15px; color: var(--ink); padding: 12px 0; outline: none; font-style: italic; }
        .newsletter-input::placeholder { color: var(--muted); }
        .newsletter-btn { font-family: var(--f-mono); font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; background: none; border: none; color: var(--ink); padding: 12px 0 12px 16px; transition: color 0.15s; }
        .newsletter-btn:hover { color: var(--accent); }

        .reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        @media (max-width: 900px) {
          .page-hero { padding: 120px 24px 56px; }
          .blog-grid { grid-template-columns: 1fr 1fr; }
          .featured-card { grid-template-columns: 1fr; gap: 32px; padding: 32px; }
          .newsletter-inner { grid-template-columns: 1fr; gap: 32px; }
        }
        @media (max-width: 600px) {
          .blog-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="page-hero">
        <div className="container">
          <div className="page-eyebrow" ref={r(0)}>Blog</div>
          <h1 className="page-h1" ref={r(1)}>Thinking out<br /><em>loud.</em></h1>
          <p className="page-lead" ref={r(2)}>
            Writing on headless commerce, Shopify engineering, and how we think
            about building stores that last.
          </p>
        </div>
      </section>

      {/* Featured */}
      <section className="blog-featured">
        <div className="container" ref={r(3)}>
          <div className="featured-card reveal">
            <div>
              <div className="featured-label">Featured post</div>
              <h2 className="featured-title">
                Why we stopped recommending<br />
                <em>Hydrogen for every project</em>
              </h2>
              <p className="featured-excerpt">
                Hydrogen is a fantastic framework. It is not always the right one.
                After 40+ headless builds we have developed a clear decision tree —
                and the answer is not always headless.
              </p>
              <div className="featured-read">Read article — 6 min →</div>
            </div>
            <div className="featured-visual">
              <svg width="120" height="100" viewBox="0 0 120 100" opacity="0.12">
                <rect x="10" y="10" width="100" height="80" fill="none" stroke="var(--ink)" strokeWidth="0.8"/>
                <line x1="10" y1="40" x2="110" y2="40" stroke="var(--ink)" strokeWidth="0.5"/>
                <line x1="10" y1="60" x2="110" y2="60" stroke="var(--ink)" strokeWidth="0.5"/>
                <line x1="40" y1="10" x2="40" y2="90" stroke="var(--ink)" strokeWidth="0.5"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="container">
        <div className="blog-filters">
          {tags.map(t => (
            <button key={t} className={`filter-btn ${filter === t ? 'active' : ''}`}
              onClick={() => setFilter(t)}>{t}</button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="container">
        <div className="blog-grid">
          {filtered.map((p, i) => (
            <div className="post-card reveal" key={i} ref={r(10 + i)}
              style={{ transitionDelay: `${(i % 3) * 0.08}s` }}>
              <div className="post-meta">
                <span className="post-tag">{p.tag}</span>
                <div className="post-sep"/>
                <span className="post-date">{p.date}</span>
              </div>
              <h3 className="post-title">{p.title}</h3>
              <p className="post-excerpt">{p.excerpt}</p>
              <div className="post-read">{p.readTime} →</div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-inner" ref={r(20)}>
            <div>
              <h3 className="newsletter-title">
                Read more,<br /><em>less often.</em>
              </h3>
              <p className="newsletter-sub">
                One email per month. New articles, project case studies,
                and honest takes on headless commerce. No noise.
              </p>
            </div>
            <div>
              <div className="newsletter-form">
                <input className="newsletter-input" type="email" placeholder="Your email address" />
                <button className="newsletter-btn">Subscribe →</button>
              </div>
              <p style={{ fontSize:'11px', color:'var(--muted)', marginTop:'10px', fontFamily:'var(--f-mono)', letterSpacing:'0.06em' }}>
                No spam. Unsubscribe any time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
