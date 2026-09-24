'use client';
// Direction 1 — Porcelæn. Axis: material / editorial calm.
// Cool porcelain-white ground, Bodoni display over Albert Sans, hairline rules,
// a fluted-porcelain ornament, photographs framed like objects. Motion is minimal.
import { EMAIL, PHONE, TEL, serviceMeta, towns, wa } from '../copy';
import { MobileBar, ProtoContactForm, ProtoFooter, ProtoNav, useCopy } from '../shared';

const serviceImg = {
  home: { src: '/services/home-detail.webp', w: 1408, h: 768, alt: 'home' as const },
  dining: { src: '/services/dining-detail.webp', w: 1408, h: 768, alt: 'dining' as const },
  estate: { src: '/services/garden.webp', w: 900, h: 491, alt: 'estate' as const },
};

function Flute() {
  return <div className="pz-flute" aria-hidden="true" />;
}

export default function Porcelain() {
  const { c, locale } = useCopy();
  const [oq, cq] = locale === 'da' ? ['»', '«'] : ['“', '”'];
  const [lead, ...rest] = c.reviews.items;

  return (
    <div className="proto-root pz">
      <ProtoNav tone="onLight" />
      <main>
        {/* id="booking" stays on the hero: the printed business-card QR lands here. */}
        <section id="booking" className="pz-hero">
          <div className="pz-wrap pz-hero-grid">
            <div className="pz-hero-text">
              <p className="pz-kicker pz-in" style={{ '--d': '0ms' } as React.CSSProperties}>
                {c.hero.eyebrow}
              </p>
              <h1 className="pz-h1 pz-in" style={{ '--d': '60ms' } as React.CSSProperties}>
                {c.hero.title}, <em>{c.hero.highlight}</em>
              </h1>
              <p className="pz-motto pz-in" style={{ '--d': '120ms' } as React.CSSProperties}>
                {c.hero.motto}
              </p>
              <p className="pz-lede pz-in" style={{ '--d': '160ms' } as React.CSSProperties}>
                {c.hero.lede}
              </p>
              <div className="pz-actions pz-in" style={{ '--d': '220ms' } as React.CSSProperties}>
                <a className="pz-btn" href={TEL}>
                  {c.hero.call} <span className="pz-btn-num">{PHONE}</span>
                </a>
                <a className="pz-link" href={wa(c.waMsg)} target="_blank" rel="noopener noreferrer">
                  {c.hero.whatsapp} <span aria-hidden="true">→</span>
                </a>
              </div>
              <p className="pz-reply pz-in" style={{ '--d': '260ms' } as React.CSSProperties}>
                {c.hero.reply}
              </p>
            </div>
            <figure className="pz-hero-fig">
              <div className="pz-hero-frame">
                <img
                  src="/hero-bg.webp"
                  srcSet="/hero-bg-sm.webp 768w, /hero-bg.webp 1280w"
                  sizes="(min-width: 960px) 55vw, 100vw"
                  width={1280}
                  height={714}
                  alt={c.img.hero}
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
              <figcaption>
                <span>{c.hero.caption}</span>
                <span>{c.hero.coords}</span>
              </figcaption>
            </figure>
          </div>
          <Flute />
        </section>

        <section id="services" className="pz-services">
          <div className="pz-wrap">
            <header className="pz-sec-head">
              <h2 className="pz-h2">{c.services.heading}</h2>
              <p className="pz-sec-lede">{c.services.lede}</p>
            </header>
            <ol className="pz-index">
              {serviceMeta.map((s, i) => {
                const item = c.services.items[s.key];
                const img = serviceImg[s.key];
                return (
                  <li key={s.key} className="pz-entry">
                    <a className="pz-entry-link" href={`/services/${s.slug}/`}>
                      <div className="pz-entry-body">
                        <span className="pz-num">{String(i + 1).padStart(2, '0')}</span>
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                        <span className="pz-more">
                          {c.services.more} <span className="pz-arrow" aria-hidden="true">→</span>
                        </span>
                      </div>
                      <figure className="pz-entry-fig rv">
                        <img src={img.src} width={img.w} height={img.h} alt={c.img[img.alt]} loading="lazy" decoding="async" />
                      </figure>
                    </a>
                  </li>
                );
              })}
            </ol>
            <p className="pz-note">{c.services.note}</p>
          </div>
        </section>

        <section id="trust" className="pz-trust">
          <div className="pz-wrap pz-trust-grid">
            <figure className="pz-trust-fig rv">
              <img src="/services/garden-detail.webp" width={1408} height={768} alt={c.img.team} loading="lazy" decoding="async" />
            </figure>
            <div>
              <h2 className="pz-h2">{c.trust.heading}</h2>
              <dl className="pz-dl">
                {c.trust.items.map((r) => (
                  <div key={r.title} className="pz-dl-row">
                    <dt>{r.title}</dt>
                    <dd>{r.desc}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section id="testimonials" className="pz-reviews">
          <div className="pz-wrap">
            <h2 className="pz-h2">{c.reviews.heading}</h2>
            <div className="pz-quotes">
              <figure className="pz-quote pz-quote--lead rv">
                <blockquote>
                  <p>
                    {oq}
                    {lead.quote}
                    {cq}
                  </p>
                </blockquote>
                <figcaption>{lead.who}</figcaption>
              </figure>
              <div className="pz-quote-side">
                {rest.map((r) => (
                  <figure key={r.who} className="pz-quote rv">
                    <blockquote>
                      <p>
                        {oq}
                        {r.quote}
                        {cq}
                      </p>
                    </blockquote>
                    <figcaption>{r.who}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="pz-contact">
          <div className="pz-wrap pz-contact-grid">
            <div>
              <h2 className="pz-h2">{c.contact.heading}</h2>
              <p className="pz-sec-lede">{c.contact.intro}</p>
              <div className="pz-direct">
                <p>{c.contact.direct}</p>
                <a href={TEL} className="pz-direct-phone">
                  {PHONE}
                </a>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                <a href={wa(c.waMsg)} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </div>
            </div>
            <ProtoContactForm />
          </div>
        </section>

        <section id="book" className="pz-book">
          <Flute />
          <div className="pz-wrap pz-book-inner">
            <h2 className="pz-book-h">{c.book.heading}</h2>
            <p className="pz-book-lede">{c.book.lede}</p>
            <a href={TEL} className="pz-book-phone">
              {PHONE}
            </a>
            <ul className="pz-book-facts">
              {c.book.facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <div className="pz-book-areas">
              <p>{c.areas.heading}</p>
              <ul>
                {towns.map((t) => (
                  <li key={t.slug}>
                    <a href={`/omraader/${t.slug}/`}>{t.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <p className="pz-book-note">{c.book.note}</p>
          </div>
        </section>
      </main>
      <ProtoFooter />
      <MobileBar />
    </div>
  );
}
