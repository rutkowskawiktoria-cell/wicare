'use client';
// Direction 2 — Kystlys. Axis: immersive photography / cinematic.
// Navy-drenched, full-bleed real photos, Familjen Grotesk poster type,
// scroll-driven clip reveals (CSS only, content visible without them).
import { EMAIL, PHONE, TEL, serviceMeta, towns, wa } from '../copy';
import { MobileBar, ProtoContactForm, ProtoFooter, ProtoNav, useCopy } from '../shared';

const chapterImg = {
  home: { src: '/services/home-detail2.webp', w: 1408, h: 768, alt: 'home2' as const },
  dining: { src: '/services/dining-detail.webp', w: 1408, h: 768, alt: 'dining' as const },
  estate: { src: '/services/garden-detail.webp', w: 1408, h: 768, alt: 'team' as const },
};

export default function Coast() {
  const { c, locale } = useCopy();
  const [oq, cq] = locale === 'da' ? ['»', '«'] : ['“', '”'];

  return (
    <div className="proto-root kl">
      <ProtoNav tone="onDark" />
      <main>
        {/* id="booking" stays on the hero: the printed business-card QR lands here. */}
        <section id="booking" className="kl-hero">
          <div className="kl-hero-media">
            <img
              src="/hero-bg.webp"
              srcSet="/hero-bg-sm.webp 768w, /hero-bg.webp 1280w"
              sizes="100vw"
              width={1280}
              height={714}
              alt={c.img.hero}
              fetchPriority="high"
              decoding="async"
            />
            <div className="kl-hero-scrim" aria-hidden="true" />
          </div>
          <div className="kl-wrap kl-hero-inner">
            <p className="kl-coords kl-in" style={{ '--d': '100ms' } as React.CSSProperties}>
              {c.hero.coords} — {c.hero.eyebrow}
            </p>
            <h1 className="kl-h1">
              <span className="kl-h1-kicker kl-in" style={{ '--d': '160ms' } as React.CSSProperties}>
                {c.hero.title}
              </span>{' '}
              <span className="kl-h1-big kl-in" style={{ '--d': '220ms' } as React.CSSProperties}>
                {c.hero.big}
              </span>
            </h1>
            <div className="kl-hero-foot kl-in" style={{ '--d': '320ms' } as React.CSSProperties}>
              <p className="kl-lede">
                <strong>{c.hero.motto}</strong> {c.hero.lede}
              </p>
              <div className="kl-actions">
                <a className="kl-btn kl-btn--solid" href={TEL}>
                  {c.hero.call} {PHONE}
                </a>
                <a className="kl-btn kl-btn--ghost" href={wa(c.waMsg)} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="kl-services">
          <div className="kl-wrap kl-sec-head">
            <h2 className="kl-h2">{c.services.heading}</h2>
            <p className="kl-sec-lede">{c.services.lede}</p>
          </div>
          {serviceMeta.map((s, i) => {
            const item = c.services.items[s.key];
            const img = chapterImg[s.key];
            return (
              <article key={s.key} className="kl-chapter" data-flip={i % 2 === 1 || undefined}>
                <div className="kl-chapter-media">
                  <img src={img.src} width={img.w} height={img.h} alt={c.img[img.alt]} loading="lazy" decoding="async" />
                </div>
                <div className="kl-chapter-text">
                  <span className="kl-chapter-num">
                    {String(i + 1).padStart(2, '0')} / 03
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <ul className="kl-tags">
                    {item.includes.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  <a className="kl-more" href={`/services/${s.slug}/`}>
                    {c.services.more} <span aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            );
          })}
          <div className="kl-wrap">
            <p className="kl-note">{c.services.note}</p>
          </div>
        </section>

        <section className="kl-towns" aria-labelledby="kl-towns-h">
          <div className="kl-wrap">
            <h2 id="kl-towns-h" className="kl-towns-h">
              {c.areas.heading}
            </h2>
            <ul className="kl-town-list">
              {towns.map((t) => (
                <li key={t.slug}>
                  <a href={`/omraader/${t.slug}/`}>
                    {t.name}
                    <span className="kl-postal">{t.postal}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="trust" className="kl-trust">
          <div className="kl-wrap">
            <h2 className="kl-h2">{c.trust.heading}</h2>
            <p className="kl-statement">{c.hero.motto}</p>
            <ol className="kl-reasons">
              {c.trust.items.map((r, i) => (
                <li key={r.title} className="rv">
                  <span className="kl-r-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{r.title}</h3>
                  <p>{r.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="testimonials" className="kl-reviews">
          <div className="kl-wrap">
            <h2 className="kl-h2">{c.reviews.heading}</h2>
          </div>
          <ul className="kl-quote-track">
            {c.reviews.items.map((r) => (
              <li key={r.who} className="kl-quote">
                <blockquote>
                  {oq}
                  {r.quote}
                  {cq}
                </blockquote>
                <p className="kl-who">{r.who}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="contact" className="kl-contact">
          <div className="kl-wrap kl-contact-grid">
            <div>
              <h2 className="kl-h2">{c.contact.heading}</h2>
              <p className="kl-sec-lede">{c.contact.intro}</p>
              <div className="kl-direct">
                <p>{c.contact.direct}</p>
                <a href={TEL}>{PHONE}</a>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </div>
            </div>
            <ProtoContactForm />
          </div>
        </section>

        <section id="book" className="kl-book">
          <div className="kl-book-media">
            <img src="/services/van.webp" width={1408} height={768} alt={c.img.van} loading="lazy" decoding="async" />
            <div className="kl-book-scrim" aria-hidden="true" />
          </div>
          <div className="kl-wrap kl-book-inner">
            <h2 className="kl-h2">{c.book.heading}</h2>
            <p className="kl-sec-lede">{c.book.lede}</p>
            <a href={TEL} className="kl-book-phone">
              {PHONE}
            </a>
            <ul className="kl-facts">
              {c.book.facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className="kl-book-note">{c.book.note}</p>
          </div>
        </section>
      </main>
      <ProtoFooter />
      <MobileBar />
    </div>
  );
}
