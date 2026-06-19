import { useEffect, useRef } from 'react'

export default function About({ onNav }) {
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

  return (
    <>
      <style>{`
        .page-hero { padding: 140px 40px 80px; border-bottom: 1px solid var(--line); }
        .page-eyebrow {
          font-family: var(--f-mono); font-size: 10px;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--accent); margin-bottom: 20px;
        }
        .page-h1 {
          font-family: var(--f-serif);
          font-size: clamp(44px, 7vw, 96px);
          font-weight: normal; line-height: 0.95;
          letter-spacing: -0.03em; color: var(--ink);
          margin-bottom: 32px; max-width: 800px;
        }
        .page-h1 em { font-style: italic; color: var(--accent); }
        .page-lead {
          font-size: 20px; line-height: 1.65;
          color: var(--muted); max-width: 560px;
        }
        .about-story { padding: 100px 0; border-bottom: 1px solid var(--line); }
        .story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        .story-title {
          font-family: var(--f-serif); font-size: 36px; font-weight: normal;
          letter-spacing: -0.02em; color: var(--ink); margin-bottom: 24px;
          line-height: 1.1;
        }
        .story-title em { font-style: italic; color: var(--accent); }
        .story-body { font-size: 15px; line-height: 1.8; color: var(--muted); margin-bottom: 20px; }
        .timeline { margin-top: 48px; }
        .timeline-item {
          display: grid; grid-template-columns: 60px 1fr;
          gap: 20px; padding: 20px 0;
          border-bottom: 1px solid var(--line);
        }
        .timeline-year {
          font-family: var(--f-mono); font-size: 11px;
          letter-spacing: 0.1em; color: var(--accent);
          padding-top: 2px;
        }
        .timeline-text { font-size: 14px; line-height: 1.6; color: var(--muted); }
        .timeline-text strong { color: var(--ink); font-weight: 500; }

        .about-values { padding: 100px 0; border-bottom: 1px solid var(--line); }
        .values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
        .value-card { padding: 40px 0; border-top: 2px solid var(--line); }
        .value-card:first-child, .value-card:nth-child(2), .value-card:nth-child(3) {
          border-top-color: var(--accent);
        }
        .value-num {
          font-family: var(--f-mono); font-size: 10px;
          letter-spacing: 0.15em; color: var(--muted); margin-bottom: 16px;
        }
        .value-title {
          font-family: var(--f-serif); font-size: 22px; font-weight: normal;
          letter-spacing: -0.02em; color: var(--ink); margin-bottom: 12px;
        }
        .value-desc { font-size: 14px; line-height: 1.7; color: var(--muted); }

        .about-team { padding: 100px 0; border-bottom: 1px solid var(--line); }
        .team-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .team-card {}
        .team-avatar {
          width: 100%; aspect-ratio: 3/4; background: var(--warm);
          margin-bottom: 16px; display: flex; align-items: center; justify-content: center;
        }
        .team-name {
          font-family: var(--f-serif); font-size: 17px; font-weight: normal;
          letter-spacing: -0.02em; color: var(--ink); margin-bottom: 2px;
        }
        .team-role {
          font-family: var(--f-mono); font-size: 10px; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--muted); margin-bottom: 8px;
        }
        .team-bio { font-size: 13px; line-height: 1.6; color: var(--muted); }

        .section-eyebrow {
          font-family: var(--f-mono); font-size: 10px;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--accent); margin-bottom: 16px;
        }
        .section-title-lg {
          font-family: var(--f-serif);
          font-size: clamp(30px, 3.5vw, 44px); font-weight: normal;
          letter-spacing: -0.025em; line-height: 1.1; color: var(--ink);
          margin-bottom: 56px;
        }
        .section-title-lg em { font-style: italic; color: var(--accent); }
        .reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .btn-primary {
          font-family: var(--f-mono); font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;
          background: var(--ink); color: var(--paper); border: none; padding: 14px 28px; transition: background 0.15s;
        }
        .btn-primary:hover { background: var(--accent); }

        @media (max-width: 768px) {
          .page-hero { padding: 120px 24px 56px; }
          .story-grid { grid-template-columns: 1fr; gap: 48px; }
          .values-grid { grid-template-columns: 1fr; }
          .team-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container">
          <div className="page-eyebrow" ref={r(0)}>About us</div>
          <h1 className="page-h1" ref={r(1)}>
            We are<br /><em>Forma.</em>
          </h1>
          <p className="page-lead" ref={r(2)}>
            A focused team of Shopify headless specialists. Small by design,
            precise by habit, and obsessed with commerce performance.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="about-story">
        <div className="container">
          <div className="story-grid">
            <div ref={r(3)}>
              <h2 className="story-title">Where we<br /><em>came from</em></h2>
              <p className="story-body">
                Forma started in 2019 in Amsterdam as a two-person studio with a single belief:
                the best commerce experiences are built with the same craft as editorial design.
                Speed, structure, and story working together.
              </p>
              <p className="story-body">
                We spent our first two years exclusively on Shopify theme work — learning
                the platform from its foundations before taking on headless. Today every
                project we take runs on the Storefront API.
              </p>
              <p className="story-body">
                Eight people. No juniors. No outsourcing. Every person you meet in the
                pitch is the person who builds your store.
              </p>
            </div>
            <div ref={r(4)}>
              <div className="timeline">
                {[
                  { year: '2019', text: '<strong>Founded</strong> in Amsterdam by Sander Vliet and Ines Carvalho. First 3 clients were fashion DTC brands.' },
                  { year: '2020', text: '<strong>Expanded</strong> into Shopify Plus. First platform migration from Magento — completed 6 weeks ahead of schedule.' },
                  { year: '2021', text: '<strong>Went headless</strong> full-time. Launched first Hydrogen storefront in public beta. Team grew to 5.' },
                  { year: '2022', text: '<strong>Named</strong> Shopify Plus Partner of the Year (Benelux). Opened retainer practice for post-launch support.' },
                  { year: '2023', text: '<strong>Launched</strong> design system practice. First engagement in the US market with a New York streetwear brand.' },
                  { year: '2024', text: '<strong>Today:</strong> 8 people, 80+ stores launched, offices in Amsterdam and remote-first globally.' },
                ].map((t, i) => (
                  <div className="timeline-item" key={i}>
                    <div className="timeline-year">{t.year}</div>
                    <div className="timeline-text" dangerouslySetInnerHTML={{ __html: t.text }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="about-values">
        <div className="container">
          <div ref={r(5)}>
            <div className="section-eyebrow">What we believe</div>
            <h2 className="section-title-lg">Our <em>values</em></h2>
          </div>
          <div className="values-grid">
            {[
              { num:'01', title:'Craft over speed', desc:'We would rather take one extra week than ship something that embarrasses the client. Good work takes the time it takes.' },
              { num:'02', title:'No surprises', desc:'Weekly demos on staging. Honest scoping. If something is going to be late or cost more, you hear it from us first.' },
              { num:'03', title:'Small is intentional', desc:'We cap at 6 projects per year. Not because we cannot grow, but because growth without quality is just noise.' },
              { num:'04', title:'Teach, do not just deliver', desc:'Every handover includes a recorded walkthrough and 90-day support. Your team should be able to own the codebase.' },
              { num:'05', title:'Honest advice first', desc:'If headless is not right for your budget or traffic level, we will tell you. We have turned down projects for this reason.' },
              { num:'06', title:'Long relationships', desc:'Our longest client relationship is 5 years. We measure success in repeat business, not case study logos.' },
            ].map((v, i) => (
              <div className="value-card reveal" key={i} ref={r(10 + i)}
                style={{ transitionDelay: `${(i % 3) * 0.1}s` }}>
                <div className="value-num">{v.num}</div>
                <div className="value-title">{v.title}</div>
                <p className="value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="about-team">
        <div className="container">
          <div ref={r(20)}>
            <div className="section-eyebrow">The team</div>
            <h2 className="section-title-lg">The people behind<br /><em>the work</em></h2>
          </div>
          <div className="team-grid">
            {[
              { name:'Sander Vliet', role:'Founder & Strategy', bio:'Ex-Shopify solutions architect. Scopes every project personally and leads client strategy.' },
              { name:'Ines Carvalho', role:'Head of Design', bio:'Former lead designer at a major Amsterdam fashion house. Figma nerd, typography obsessive.' },
              { name:'Luca Ferretti', role:'Lead Engineer', bio:'10 years React experience, Hydrogen early adopter. Speaks in performance metrics.' },
              { name:'Mara Osei', role:'Commerce Strategist', bio:'CRO and analytics specialist. Finds the conversion leak in every funnel within 48 hours.' },
            ].map((p, i) => (
              <div className="team-card reveal" key={i} ref={r(30 + i)}
                style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="team-avatar">
                  <svg width="70" height="80" viewBox="0 0 70 80" opacity="0.25">
                    <circle cx="35" cy="26" r="16" fill="none" stroke="var(--muted)" strokeWidth="0.8"/>
                    <path d="M5 72 Q35 52 65 72" fill="none" stroke="var(--muted)" strokeWidth="0.8"/>
                  </svg>
                </div>
                <div className="team-name">{p.name}</div>
                <div className="team-role">{p.role}</div>
                <p className="team-bio">{p.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 0', textAlign: 'center', borderTop: '1px solid var(--line)' }}>
        <div className="container" ref={r(40)}>
          <h2 style={{ fontFamily:'var(--f-serif)', fontSize:'clamp(36px,5vw,64px)', fontWeight:'normal', letterSpacing:'-0.03em', color:'var(--ink)', marginBottom:'24px', lineHeight:1 }}>
            Work with <em style={{ fontStyle:'italic', color:'var(--accent)' }}>us.</em>
          </h2>
          <p style={{ color:'var(--muted)', marginBottom:'36px' }}>
            We are taking on new projects from Q3 2025.
          </p>
          <button className="btn-primary" onClick={() => onNav('contact')}>
            Start a conversation →
          </button>
        </div>
      </section>
    </>
  )
}
