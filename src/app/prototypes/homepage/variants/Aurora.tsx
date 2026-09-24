'use client';
// Bold direction C — Aurora. Night-sky luxury: northern light in the brand blues drifts
// behind frosted glass, the headline is cut out of the villa photo, cards glow where the
// cursor touches them, buttons pull toward the pointer, and "Tillid" opens into the team.
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EMAIL, PHONE, TEL, serviceMeta, towns, wa } from '../copy';
import { MobileBar, ProtoContactForm, ProtoFooter, ProtoNav, useCopy } from '../shared';
import { Chars, Cursor, finePointer, useMagnetic, useSmoothScroll } from '../motion';

gsap.registerPlugin(ScrollTrigger);

const cardImg = {
  home: { src: '/services/home-detail.webp', alt: 'home' as const },
  dining: { src: '/proto/dining-team-wide.webp', alt: 'diningTeam' as const },
  estate: { src: '/proto/garden.webp', alt: 'estate' as const },
};

export default function Aurora() {
  const root = useRef<HTMLDivElement>(null);
  const { c, locale } = useCopy();
  const [oq, cq] = locale === 'da' ? ['»', '«'] : ['“', '”'];
  useSmoothScroll();
  useMagnetic(root, 0.3);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    // Cursor-following light across the page + photo parallax inside the headline.
    let offPointer = () => {};
    if (finePointer()) {
      const sx = gsap.quickTo(el, '--sx', { duration: 0.8, ease: 'power3.out' });
      const sy = gsap.quickTo(el, '--sy', { duration: 0.8, ease: 'power3.out' });
      const onMove = (e: PointerEvent) => {
        sx(e.clientX);
        sy(e.clientY);
        el.style.setProperty('--px', `${(e.clientX / window.innerWidth - 0.5).toFixed(3)}`);
        el.style.setProperty('--py', `${(e.clientY / window.innerHeight - 0.5).toFixed(3)}`);
      };
      window.addEventListener('pointermove', onMove, { passive: true });
      offPointer = () => window.removeEventListener('pointermove', onMove);
    }

    const mm = gsap.matchMedia(el);
    mm.add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 900px)' }, (ctx) => {
      const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
      if (!motion) return;

      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .from('.au-photo-text', { scale: 1.2, opacity: 0, letterSpacing: '0.04em', duration: 2.2 })
        .from('.au-giant-b .ch', { yPercent: 120, opacity: 0, duration: 1.3, stagger: 0.03 }, 0.5)
        .from('.au-meta, .au-kicker', { y: 20, opacity: 0, duration: 1, stagger: 0.08 }, 0.6)
        .from('.au-panel', { y: 60, opacity: 0, duration: 1.4 }, 0.8);

      // counters
      gsap.utils.toArray<HTMLElement>('.au-count b').forEach((b) => {
        const end = Number(b.dataset.value || 0);
        const o = { v: 0 };
        gsap.to(o, { v: end, duration: 2, ease: 'power3.out', scrollTrigger: { trigger: b, start: 'top 90%' }, onUpdate: () => (b.textContent = String(Math.round(o.v))) });
      });

      gsap.utils.toArray<HTMLElement>('.au-rise').forEach((h) => {
        gsap.from(h.querySelectorAll('.ch'), { yPercent: 115, stagger: 0.02, duration: 1.2, ease: 'expo.out', clearProps: 'transform', scrollTrigger: { trigger: h, start: 'top 85%' } });
      });
      gsap.from('.au-card', { y: 90, opacity: 0, stagger: 0.12, duration: 1.3, ease: 'expo.out', clearProps: 'transform', scrollTrigger: { trigger: '.au-bento', start: 'top 80%' } });

      // "Tillid" — the word is cut from the team photo, then the photo opens out of it.
      const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: '.au-trust', start: 'top top', end: desktop ? '+=160%' : '+=130%', scrub: 0.7, pin: true, anticipatePin: 1 } });
      tl.fromTo('.au-mask-word', { scale: 1 }, { scale: 1.12, duration: 0.35 }, 0)
        .fromTo('.au-trust-photo', { clipPath: 'circle(0% at 50% 52%)' }, { clipPath: 'circle(75% at 50% 52%)', duration: 0.45, ease: 'power2.in' }, 0.1)
        .to('.au-mask-word', { opacity: 0, duration: 0.15 }, 0.42)
        .fromTo('.au-trust-shade', { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.5)
        .from('.au-trust-copy > *', { y: 50, opacity: 0, stagger: 0.05, duration: 0.2 }, 0.55)
        .from('.au-trust-card', { y: 80, opacity: 0, stagger: 0.06, duration: 0.25 }, 0.65);

      gsap.fromTo('.au-book-phone', { backgroundPosition: '100% 0' }, { backgroundPosition: '0% 0', ease: 'none', scrollTrigger: { trigger: '.au-book', start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    return () => {
      offPointer();
      mm.revert();
    };
  }, [locale]);

  // Glow + tilt that follow the cursor inside a card.
  const glow = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return;
    const t = e.currentTarget;
    const r = t.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    t.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
    t.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
    t.style.setProperty('--rx', `${((0.5 - y) * 7).toFixed(2)}deg`);
    t.style.setProperty('--ry', `${((x - 0.5) * 9).toFixed(2)}deg`);
  };
  const unglow = (e: React.PointerEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty('--rx', '0deg');
    e.currentTarget.style.setProperty('--ry', '0deg');
  };

  return (
    <div ref={root} className="proto-root au">
      <div className="au-sky" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="au-spot" aria-hidden="true" />
      <div className="fx-grain" aria-hidden="true" />
      <Cursor />
      <ProtoNav tone="onDark" />
      <main>
        {/* id="booking" stays on the hero: the printed business-card QR lands here. */}
        <section id="booking" className="au-hero">
          <div className="au-wrap au-hero-inner">
            <p className="au-meta">
              <span>{c.hero.coords}</span>
              <span>{c.hero.eyebrow}</span>
            </p>
            <h1 className="au-h1">
              <span className="au-kicker">{c.fx.kicker}</span>
              <span className="fx-sr">{c.fx.srGiant}</span>
              <span className="au-giant" aria-hidden="true">
                <span className="au-photo-text" data-text={c.fx.giantA}>
                  {c.fx.giantA}
                </span>
                <Chars text={c.fx.giantB} className="au-giant-b" />
              </span>
            </h1>
            <div className="au-panel">
              <p className="au-panel-lede">{c.hero.lede}</p>
              <div className="au-actions">
                <a className="au-btn au-btn--glow" href={TEL} data-magnetic data-cursor={c.nav.call}>
                  <span>
                    {c.hero.call} {PHONE}
                  </span>
                </a>
                <a className="au-btn au-btn--glass" href={wa(c.waMsg)} target="_blank" rel="noopener noreferrer" data-magnetic data-cursor="Chat">
                  <span>WhatsApp</span>
                </a>
              </div>
              <p className="au-reply">{c.hero.reply}</p>
            </div>
          </div>
        </section>

        <section className="au-counts" aria-label={c.fx.partner}>
          <div className="au-wrap">
            <ul className="au-count-row">
              {c.fx.counters.map((k) => (
                <li key={k.label} className="au-count">
                  <span className="au-count-num">
                    <b data-value={k.value}>{k.value}</b>
                    {k.suffix}
                  </span>
                  <span className="au-count-label">{k.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="services" className="au-services">
          <div className="au-wrap">
            <header className="au-sec-head">
              <h2 className="au-h2 au-rise">
                <Chars text={c.services.heading} />
              </h2>
              <p className="au-lede">{c.services.lede}</p>
            </header>
            <div className="au-bento">
              {serviceMeta.map((s, i) => {
                const it = c.services.items[s.key];
                const img = cardImg[s.key];
                return (
                  <a key={s.key} href={`/services/${s.slug}/`} className={`au-card au-card--${s.key}`} onPointerMove={glow} onPointerLeave={unglow} data-cursor={c.services.more}>
                    <img src={img.src} width={1408} height={768} alt={c.img[img.alt]} loading="lazy" decoding="async" />
                    <span className="au-card-shade" />
                    <span className="au-card-body">
                      <span className="au-card-no">{String(i + 1).padStart(2, '0')}</span>
                      <span className="au-card-title">{it.title}</span>
                      <span className="au-card-desc">{it.desc}</span>
                      <span className="au-card-tags">
                        {it.includes.map((x) => (
                          <span key={x}>{x}</span>
                        ))}
                      </span>
                    </span>
                  </a>
                );
              })}
              <div className="au-card au-card--note" onPointerMove={glow} onPointerLeave={unglow}>
                <span className="au-card-body">
                  <span className="au-card-no">+</span>
                  <span className="au-card-desc">{c.services.note}</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="au-towns" aria-label={c.areas.heading}>
          <div className="fx-marquee">
            <div className="fx-marquee-track au-mq-track">
              {[0, 1].map((copy) =>
                towns.map((t) => (
                  <a key={`${copy}-${t.slug}`} href={`/omraader/${t.slug}/`} className="au-town" tabIndex={copy ? -1 : 0} aria-hidden={copy ? true : undefined}>
                    {t.name}
                    <i aria-hidden="true">✦</i>
                  </a>
                )),
              )}
            </div>
          </div>
        </section>

        <section id="trust" className="au-trust">
          <img className="au-trust-photo" src="/proto/team.webp" width={1408} height={768} alt={c.img.team} loading="lazy" decoding="async" />
          <div className="au-mask-word" aria-hidden="true">
            <span>{c.fx.trustWord}</span>
          </div>
          <div className="au-trust-shade" aria-hidden="true" />
          <div className="au-wrap au-trust-inner">
            <div className="au-trust-copy">
              <h2 className="au-h2">{c.trust.heading}</h2>
              <p className="au-lede">{c.fx.trustLine}</p>
            </div>
            <div className="au-trust-cards">
              {c.trust.items.map((r, i) => (
                <article key={r.title} className="au-trust-card">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <h3>{r.title}</h3>
                  <p>{r.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="au-reviews">
          <div className="au-wrap">
            <h2 className="au-h2 au-rise">
              <Chars text={c.reviews.heading} />
            </h2>
          </div>
          <div className="au-quote-rail">
            <div className="au-quote-track">
              {[0, 1, 2].map((copy) =>
                c.reviews.items.map((r) => (
                  <figure key={`${copy}-${r.who}`} className="au-quote" aria-hidden={copy ? true : undefined} onPointerMove={glow} onPointerLeave={unglow}>
                    <blockquote>
                      {oq}
                      {r.quote}
                      {cq}
                    </blockquote>
                    <figcaption>{r.who}</figcaption>
                  </figure>
                )),
              )}
            </div>
          </div>
        </section>

        <section id="contact" className="au-contact">
          <div className="au-wrap au-contact-grid">
            <div>
              <h2 className="au-h2 au-rise">
                <Chars text={c.contact.heading} />
              </h2>
              <p className="au-lede">{c.contact.intro}</p>
              <div className="au-direct">
                <p>{c.contact.direct}</p>
                <a href={TEL} data-cursor={c.nav.call}>
                  {PHONE}
                </a>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </div>
            </div>
            <div className="au-form">
              <ProtoContactForm />
            </div>
          </div>
        </section>

        <section id="book" className="au-book">
          <div className="au-wrap au-book-inner">
            <h2 className="au-h2 au-rise">
              <Chars text={c.book.heading} />
            </h2>
            <p className="au-lede">{c.book.lede}</p>
            <a href={TEL} className="au-book-phone" data-cursor={c.nav.call}>
              {PHONE}
            </a>
            <ul className="au-facts">
              {c.book.facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className="au-book-note">{c.book.note}</p>
          </div>
        </section>
      </main>
      <ProtoFooter />
      <MobileBar />
    </div>
  );
}
