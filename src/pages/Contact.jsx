import { useState } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name:'', company:'', email:'', platform:'', budget:'', message:'' })

  function handleChange(e) { setForm(f => ({ ...f, [e.target.name]: e.target.value })) }
  async function handleSubmit(e) {
  e.preventDefault()
  const res = await fetch('https://formspree.io/f/meewyera', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form)
  })
  if (res.ok) setSent(true)
}

  return (
    <>
      <style>{`
        .contact-page { padding: 140px 0 0; }
        .contact-hero { padding: 0 40px 80px; border-bottom: 1px solid var(--line); }
        .page-eyebrow { font-family: var(--f-mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); margin-bottom: 20px; }
        .page-h1 { font-family: var(--f-serif); font-size: clamp(44px, 7vw, 96px); font-weight: normal; line-height: 0.95; letter-spacing: -0.03em; color: var(--ink); margin-bottom: 32px; }
        .page-h1 em { font-style: italic; color: var(--accent); }
        .page-lead { font-size: 20px; line-height: 1.65; color: var(--muted); max-width: 560px; }

        .contact-body { padding: 80px 40px; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 100px; align-items: start; }

        .contact-info-title { font-family: var(--f-serif); font-size: 28px; font-weight: normal; letter-spacing: -0.02em; color: var(--ink); margin-bottom: 20px; }
        .contact-info-title em { font-style: italic; color: var(--accent); }
        .contact-info-desc { font-size: 15px; line-height: 1.75; color: var(--muted); margin-bottom: 40px; }

        .info-block { margin-bottom: 28px; padding-bottom: 28px; border-bottom: 1px solid var(--line); }
        .info-label { font-family: var(--f-mono); font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); margin-bottom: 6px; }
        .info-val { font-family: var(--f-serif); font-size: 18px; font-weight: normal; color: var(--ink); letter-spacing: -0.01em; }
        .info-sub { font-size: 13px; color: var(--muted); margin-top: 2px; }

        .availability {
          background: var(--warm); padding: 24px 28px; margin-top: 40px;
          display: flex; align-items: center; gap: 14px;
        }
        .avail-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; flex-shrink: 0; animation: pulse-green 2s ease-in-out infinite; }
        @keyframes pulse-green { 0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); } 50% { box-shadow: 0 0 0 6px rgba(34,197,94,0); } }
        .avail-text { font-size: 13px; color: var(--muted); }
        .avail-text strong { color: var(--ink); font-weight: 500; }

        .contact-form { }
        .form-row { border-bottom: 1px solid var(--line); padding: 20px 0; }
        .form-label { font-family: var(--f-mono); font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); display: block; margin-bottom: 8px; }
        .form-input, .form-textarea, .form-select {
          width: 100%; background: transparent; border: none; outline: none;
          font-family: var(--f-sans); font-size: 15px; color: var(--ink);
          font-style: italic;
        }
        .form-input::placeholder, .form-textarea::placeholder { color: var(--muted); }
        .form-textarea { resize: none; height: 90px; }
        .form-select { color: var(--muted); }
        .form-select:focus { color: var(--ink); }

        .form-submit {
          margin-top: 36px; display: inline-flex; align-items: center; gap: 12px;
          font-family: var(--f-mono); font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;
          background: var(--ink); color: var(--paper); border: none; padding: 16px 32px;
          transition: background 0.15s;
        }
        .form-submit:hover { background: var(--accent); }
        .form-note { font-family: var(--f-mono); font-size: 10px; letter-spacing: 0.06em; color: var(--muted); margin-top: 12px; }

        .success-msg {
          background: var(--warm); padding: 48px; text-align: center;
        }
        .success-icon { font-size: 40px; margin-bottom: 20px; }
        .success-title { font-family: var(--f-serif); font-size: 28px; font-weight: normal; letter-spacing: -0.02em; color: var(--ink); margin-bottom: 12px; }
        .success-body { font-size: 15px; color: var(--muted); }

        @media (max-width: 900px) {
          .contact-hero { padding: 0 24px 56px; }
          .contact-body { padding: 56px 24px; }
          .contact-grid { grid-template-columns: 1fr; gap: 56px; }
        }
      `}</style>

      <div className="contact-page">
        <section className="contact-hero">
          <div className="container">
            <div className="page-eyebrow">Contact</div>
            <h1 className="page-h1">
              Let's talk about<br />your <em>store.</em>
            </h1>
            <p className="page-lead">
              We take on 4–6 new projects per year. Tell us what you're building
              and we'll let you know if we're the right fit.
            </p>
          </div>
        </section>

        <section className="contact-body">
          <div className="container">
            <div className="contact-grid">

              {/* LEFT */}
              <div>
                <h2 className="contact-info-title">
                  Come say<br /><em>hello.</em>
                </h2>
                <p className="contact-info-desc">
                  We respond to every enquiry within 2 business days.
                  If your project is a good fit we'll schedule a 30-minute
                  discovery call — no pitch deck, just a conversation.
                </p>

                <div className="info-block">
                  <div className="info-label">Email</div>
                  <div className="info-val">hello@forma.studio</div>
                  <div className="info-sub">For general enquiries</div>
                </div>
                <div className="info-block">
                  <div className="info-label">Phone</div>
                  <div className="info-val">+31 20 123 4567</div>
                  <div className="info-sub">Mon–Fri, 9:00–17:30 CET</div>
                </div>
                <div className="info-block">
                  <div className="info-label">Office</div>
                  <div className="info-val">Amsterdam, Netherlands</div>
                  <div className="info-sub">Remote-first · work with clients globally</div>
                </div>

                <div className="availability">
                  <div className="avail-dot" />
                  <div className="avail-text">
                    <strong>Currently accepting projects</strong> — next available start: August 2025
                  </div>
                </div>
              </div>

              {/* RIGHT — FORM */}
              <div>
                {sent ? (
                  <div className="success-msg">
                    <div className="success-icon">✓</div>
                    <h3 className="success-title">Message received.</h3>
                    <p className="success-body">
                      Thank you for reaching out. We will review your enquiry and
                      get back to you within 2 business days.
                    </p>
                  </div>
                ) : (
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                      <label className="form-label">Your full name *</label>
                      <input className="form-input" name="name" value={form.name}
                        onChange={handleChange} placeholder="Jane Smith" required />
                    </div>
                    <div className="form-row">
                      <label className="form-label">Company & website *</label>
                      <input className="form-input" name="company" value={form.company}
                        onChange={handleChange} placeholder="Brand Co — yourbrand.com" required />
                    </div>
                    <div className="form-row">
                      <label className="form-label">Email address *</label>
                      <input className="form-input" type="email" name="email" value={form.email}
                        onChange={handleChange} placeholder="jane@yourbrand.com" required />
                    </div>
                    <div className="form-row">
                      <label className="form-label">Current platform</label>
                      <select className="form-select" name="platform" value={form.platform} onChange={handleChange}>
                        <option value="">Select platform…</option>
                        <option>Shopify (standard theme)</option>
                        <option>Shopify Plus</option>
                        <option>Magento / Adobe Commerce</option>
                        <option>Salesforce Commerce Cloud</option>
                        <option>WooCommerce</option>
                        <option>Custom / Other</option>
                        <option>Starting from scratch</option>
                      </select>
                    </div>
                    <div className="form-row">
                      <label className="form-label">Budget range</label>
                      <select className="form-select" name="budget" value={form.budget} onChange={handleChange}>
                        <option value="">Select range…</option>
                        <option>Under €20,000</option>
                        <option>€20,000 – €50,000</option>
                        <option>€50,000 – €100,000</option>
                        <option>€100,000+</option>
                        <option>Not sure yet</option>
                      </select>
                    </div>
                    <div className="form-row">
                      <label className="form-label">Tell us about the project *</label>
                      <textarea className="form-textarea" name="message" value={form.message}
                        onChange={handleChange}
                        placeholder="What are you building? What's broken about your current store? What does success look like?"
                        required />
                    </div>
                    <button type="submit" className="form-submit">
                      Send enquiry <span>→</span>
                    </button>
                    <p className="form-note">
                      We respond within 2 business days. All enquiries are confidential.
                    </p>
                  </form>
                )}
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  )
}
