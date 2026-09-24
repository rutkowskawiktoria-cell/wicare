'use client';
// Direction 3 — Concierge. Axis: interaction model / conversion.
// A hotel-lobby modernism: the first viewport asks "what can we take care of?"
// and answers with the matching service, photo and one-tap call/WhatsApp.
// Jost geometric type, key-tag selectors, directory-board lists.
import { useState } from 'react';
import { EMAIL, PHONE, TEL, serviceMeta, towns, wa } from '../copy';
import { MobileBar, ProtoContactForm, ProtoFooter, ProtoNav, useCopy } from '../shared';

const panelImg = {
  home: { src: '/services/home-detail.webp', w: 1408, h: 768, alt: 'home' as const },
  dining: { src: '/services/dining-detail.webp', w: 1408, h: 768, alt: 'dining' as const },
  estate: { src: '/services/garden-detail.webp', w: 1408, h: 768, alt: 'team' as const },
};

export default function Concierge() {
  const { c, locale } = useCopy();
  const [sel, setSel] = useState(0);
  const [formService, setFormService] = useState(0);
  const [oq, cq] = locale === 'da' ? ['»', '«'] : ['“', '”'];
  const active = serviceMeta[sel];
  const item = c.services.items[active.key];

  return (
    <div className="proto-root cc">
      <ProtoNav tone="onLight" />
      <main>
        {/* id="booking" stays on the hero: the printed business-card QR lands here. */}
        <section id="booking" className="cc-hero">
          <div className="cc-wrap">
            <div className="cc-hero-head cc-in" style={{ '--d': '0ms' } as React.CSSProperties}>
              <p className="cc-kicker">{c.hero.eyebrow}</p>
              <h1 className="cc-h1">
                {c.hero.title}, <span>{c.hero.highlight}</span>
              </h1>
            </div>

            <div className="cc-desk cc-in" style={{ '--d': '90ms' } as React.CSSProperties}>
              <div className="cc-keys-col">
                <p className="cc-prompt" id="cc-prompt">
                  {c.concierge.prompt}
                </p>
                <div className="cc-keys" role="group" aria-labelledby="cc-prompt">
                  {serviceMeta.map((s, i) => (
                    <button key={s.key} type="button" className="cc-key" aria-pressed={sel === i} onClick={() => setSel(i)}>
                      <span className="cc-key-hole" aria-hidden="true" />
                      <span className="cc-key-no">{String(i + 1).padStart(2, '0')}</span>
                      <span className="cc-key-title">
                        <span className="cc-key-long">{c.services.items[s.key].title}</span>
                        <span className="cc-key-short">{c.concierge.short[s.key]}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="cc-panel">
                <div className="cc-panel-media">
                  {serviceMeta.map((s, i) => {
                    const img = panelImg[s.key];
                    return (
                      <img
                        key={s.key}
                        src={img.src}
                        width={img.w}
                        height={img.h}
                        alt={i === sel ? c.img[img.alt] : ''}
                        aria-hidden={i !== sel}
                        data-active={i === sel || undefined}
                        loading={i === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                    );
                  })}
                </div>
                <div className="cc-panel-body" key={`${sel}-${locale}`} aria-live="polite">
                  <h2 className="cc-panel-title">{item.title}</h2>
                  <p className="cc-panel-desc">{item.desc}</p>
                  <ul className="cc-inc" aria-label={c.concierge.includes}>
                    {item.includes.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  <div className="cc-panel-actions">
                    <a className="cc-btn cc-btn--navy" href={TEL}>
                      {c.hero.call} {PHONE}
                    </a>
                    <a className="cc-btn cc-btn--line" href={wa(c.concierge.waFor(item.title))} target="_blank" rel="noopener noreferrer">
                      WhatsApp
                    </a>
                  </div>
                  <a className="cc-textlink" href="#contact" onClick={() => setFormService(sel)}>
                    {c.concierge.request} <span aria-hidden="true">→</span>
                  </a>
                  <p className="cc-reply">{c.hero.reply}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cc-steps" aria-labelledby="cc-steps-h">
          <div className="cc-wrap">
            <h2 id="cc-steps-h" className="cc-h2">
              {c.concierge.stepsHeading}
            </h2>
            <ol className="cc-step-list">
              {c.concierge.steps.map((s, i) => (
                <li key={s.title} className="rv">
                  <span className="cc-step-no">{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="services" className="cc-services">
          <div className="cc-wrap">
            <div className="cc-sec-head">
              <h2 className="cc-h2">{c.services.heading}</h2>
              <p className="cc-sec-lede">{c.services.lede}</p>
            </div>
            <ul className="cc-dir">
              {serviceMeta.map((s, i) => {
                const it = c.services.items[s.key];
                return (
                  <li key={s.key}>
                    <a href={`/services/${s.slug}/`} className="cc-dir-row">
                      <span className="cc-dir-no">{String(i + 1).padStart(2, '0')}</span>
                      <span className="cc-dir-title">{it.title}</span>
                      <span className="cc-dir-desc">{it.desc}</span>
                      <span className="cc-dir-more">
                        {c.services.more} <span aria-hidden="true">→</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="cc-note">{c.services.note}</p>
          </div>
        </section>

        <section id="trust" className="cc-trust">
          <div className="cc-wrap">
            <div className="cc-trust-head">
              <h2 className="cc-h2">{c.trust.heading}</h2>
              <p className="cc-motto">{c.hero.motto}</p>
            </div>
            <dl className="cc-board">
              {c.trust.items.map((r) => (
                <div key={r.title} className="cc-board-cell">
                  <dt>{r.title}</dt>
                  <dd>{r.desc}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="testimonials" className="cc-reviews">
          <div className="cc-wrap">
            <h2 className="cc-h2">{c.reviews.heading}</h2>
            <div className="cc-quotes">
              {c.reviews.items.map((r) => (
                <figure key={r.who} className="cc-quote rv">
                  <blockquote>
                    {oq}
                    {r.quote}
                    {cq}
                  </blockquote>
                  <figcaption>{r.who}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="cc-areas" aria-labelledby="cc-areas-h">
          <div className="cc-wrap cc-areas-grid">
            <div className="cc-areas-board">
              <h2 id="cc-areas-h" className="cc-h2">
                {c.areas.heading}
              </h2>
              <p className="cc-sec-lede">{c.areas.lede}</p>
              <ul className="cc-towns">
                {towns.map((t) => (
                  <li key={t.slug}>
                    <a href={`/omraader/${t.slug}/`}>
                      <span className="cc-town">{t.name}</span>
                      <span className="cc-leader" aria-hidden="true" />
                      <span className="cc-postal">{t.postal}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <figure className="cc-areas-fig rv">
              <img src="/services/van.webp" width={1408} height={768} alt={c.img.van} loading="lazy" decoding="async" />
            </figure>
          </div>
        </section>

        <section id="contact" className="cc-contact">
          <div className="cc-wrap cc-contact-grid">
            <div>
              <h2 className="cc-h2">{c.contact.heading}</h2>
              <p className="cc-sec-lede">{c.contact.intro}</p>
              <div className="cc-direct">
                <p>{c.contact.direct}</p>
                <a href={TEL}>{PHONE}</a>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </div>
            </div>
            <div className="cc-form-card">
              <ProtoContactForm serviceIndex={formService} />
            </div>
          </div>
        </section>

        <section id="book" className="cc-book">
          <div className="cc-wrap cc-book-grid">
            <div>
              <h2 className="cc-h2">{c.book.heading}</h2>
              <p className="cc-sec-lede">{c.book.lede}</p>
            </div>
            <div>
              <a href={TEL} className="cc-book-phone">
                {PHONE}
              </a>
              <ul className="cc-facts">
                {c.book.facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
            <p className="cc-book-note">{c.book.note}</p>
          </div>
        </section>
      </main>
      <ProtoFooter />
      <MobileBar />
    </div>
  );
}
