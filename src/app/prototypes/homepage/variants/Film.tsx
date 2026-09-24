'use client';
// Bold direction A — Cinematic. Scroll-driven film: the camera flies through the villa's
// lit glass wall into the house, services pan sideways while the page is pinned, town names
// race past faster the harder you scroll, and testimonials stack like cards on a table.
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EMAIL, PHONE, TEL, serviceMeta, towns, wa } from '../copy';
import { MobileBar, ProtoContactForm, ProtoFooter, ProtoNav, useCopy } from '../shared';
import { Chars, Words, useSmoothScroll } from '../motion';

gsap.registerPlugin(ScrollTrigger);

const panelImg = {
  home: { src: '/services/home-detail.webp', alt: 'home' as const },
  dining: { src: '/proto/dining-team-wide.webp', alt: 'diningTeam' as const },
  estate: { src: '/proto/garden.webp', alt: 'estate' as const },
};

export default function Film() {
  const root = useRef<HTMLDivElement>(null);
  const { c, locale } = useCopy();
  const [oq, cq] = locale === 'da' ? ['»', '«'] : ['“', '”'];
  useSmoothScroll();

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);
    mm.add(
      { motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 900px)' },
      (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
        if (!motion) return;

        // ── Intro: curtains part, the villa settles, the title rises letter by letter.
        const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
        intro
          .from('.fm-hero-img', { scale: 1.35, duration: 2.4 }, 0)
          .from('.fm-giant-a .ch', { yPercent: 115, rotate: 8, duration: 1.3, stagger: 0.05 }, 0.45)
          .from('.fm-giant-b .ch', { yPercent: 115, duration: 1.1, stagger: 0.02 }, 0.65)
          .from('.fm-hero-meta > span, .fm-hero-kicker > span, .fm-hero-lede, .fm-hero-actions', { y: 24, opacity: 0, duration: 1, stagger: 0.07 }, 0.8);

        // ── Hero: pinned fly-through into the house.
        const hero = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: '.fm-hero', start: 'top top', end: desktop ? '+=170%' : '+=120%', scrub: 0.6, pin: true, anticipatePin: 1 },
        });
        hero
          .to('.fm-hero-zoom', { scale: desktop ? 2.6 : 2.1, duration: 0.55, ease: 'power2.in' }, 0)
          .to('.fm-letterbox i', { scaleY: 1, duration: 0.2 }, 0)
          .to('.fm-giant-a .fx-ch-mask', { yPercent: -120, opacity: 0, stagger: 0.012, duration: 0.2 }, 0)
          .to('.fm-giant-b .fx-ch-mask', { yPercent: -120, opacity: 0, stagger: 0.006, duration: 0.2 }, 0.03)
          .to('.fm-hero-meta, .fm-hero-kicker, .fm-hero-foot, .fm-cue', { opacity: 0, y: -40, duration: 0.14 }, 0)
          .fromTo('.fm-hero-inside', { opacity: 0, scale: 1.35 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }, 0.36)
          .fromTo('.fm-motto .w', { opacity: 0, yPercent: 50, filter: 'blur(14px)' }, { opacity: 1, yPercent: 0, filter: 'blur(0px)', stagger: 0.1, duration: 0.14 }, 0.58)
          .to('.fm-letterbox i', { scaleY: 0, duration: 0.12 }, 0.88);

        // ── Services: pinned horizontal pan (desktop) with parallax inside each photo.
        if (desktop) {
          const track = el.querySelector<HTMLElement>('.fm-track');
          if (track) {
            const dist = () => track.scrollWidth - window.innerWidth;
            const pan = gsap.to(track, {
              x: () => -dist(),
              ease: 'none',
              scrollTrigger: { trigger: '.fm-hwrap', start: 'top top', end: () => '+=' + dist(), scrub: 0.8, pin: true, invalidateOnRefresh: true, anticipatePin: 1 },
            });
            gsap.to('.fm-progress i', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.fm-hwrap', start: 'top top', end: () => '+=' + dist(), scrub: true } });
            gsap.utils.toArray<HTMLElement>('.fm-panel').forEach((p) => {
              gsap.fromTo(p.querySelector('.fm-panel-media img'), { xPercent: -6 }, { xPercent: 6, ease: 'none', scrollTrigger: { trigger: p, containerAnimation: pan, start: 'left right', end: 'right left', scrub: true } });
              gsap.from(p.querySelectorAll('.fm-panel-body > *'), { y: 40, opacity: 0, stagger: 0.06, ease: 'power3.out', scrollTrigger: { trigger: p, containerAnimation: pan, start: 'left 70%', end: 'left 30%', scrub: true } });
            });
          }
        } else {
          gsap.utils.toArray<HTMLElement>('.fm-panel').forEach((p) => {
            gsap.from(p.querySelector('.fm-panel-media'), { clipPath: 'inset(18% 10% 18% 10%)', ease: 'none', scrollTrigger: { trigger: p, start: 'top 90%', end: 'top 35%', scrub: true } });
          });
        }
        gsap.from('.fm-services-head .ch', { yPercent: 110, stagger: 0.025, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.fm-services-head', start: 'top 80%' } });

        // ── Towns: endless marquee that speeds up and leans with scroll velocity.
        const loops = gsap.utils.toArray<HTMLElement>('.fm-mq-track').map((row, i) =>
          gsap.fromTo(row, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, duration: 38 + i * 6, ease: 'none', repeat: -1 }),
        );
        const skewTo = gsap.quickTo('.fm-towns-inner', 'skewX', { duration: 0.4, ease: 'power3.out' });
        ScrollTrigger.create({
          trigger: '.fm-towns',
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const v = self.getVelocity();
            const boost = 1 + Math.min(Math.abs(v) / 180, 7);
            loops.forEach((t) => gsap.to(t, { timeScale: boost, duration: 0.25, overwrite: true, onComplete: () => { gsap.to(t, { timeScale: 1, duration: 1.2 }); } }));
            skewTo(gsap.utils.clamp(-12, 12, v / -220));
          },
          onLeave: () => skewTo(0),
          onLeaveBack: () => skewTo(0),
        });

        // ── Trust: words light up as you read; team photo opens from a keyhole.
        gsap.fromTo('.fm-reveal .w', { opacity: 0.14 }, { opacity: 1, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: '.fm-reveal', start: 'top 80%', end: 'bottom 40%', scrub: true } });
        gsap.from('.fm-reasons li', { y: 50, opacity: 0, stagger: 0.1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.fm-reasons', start: 'top 85%' } });
        gsap.fromTo('.fm-team-clip', { clipPath: 'inset(22% 28% 22% 28% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: '.fm-team', start: 'top 85%', end: 'center center', scrub: true } });
        gsap.fromTo('.fm-team-clip img', { scale: 1.35 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.fm-team', start: 'top bottom', end: 'bottom top', scrub: true } });

        // ── Testimonials: each card pushes the previous one back into the stack.
        const cards = gsap.utils.toArray<HTMLElement>('.fm-card');
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card, { scale: 0.93 - (cards.length - i) * 0.01, filter: 'brightness(0.72)', ease: 'none', scrollTrigger: { trigger: next, start: 'top 75%', end: 'top 15%', scrub: true } });
        });

        // ── Headings rise letter by letter; the finale phone number too.
        gsap.utils.toArray<HTMLElement>('.fm-rise').forEach((h) => {
          gsap.from(h.querySelectorAll('.ch'), { yPercent: 110, stagger: 0.018, duration: 1, ease: 'expo.out', clearProps: 'transform', scrollTrigger: { trigger: h, start: 'top 85%' } });
        });
        gsap.fromTo('.fm-book-img', { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.fm-book', start: 'top bottom', end: 'bottom bottom', scrub: true } });
      },
    );
    return () => mm.revert();
  }, [locale]);

  return (
    <div ref={root} className="proto-root fm">
      <div className="fx-grain" aria-hidden="true" />
      <ProtoNav tone="onDark" />
      <main>
        {/* id="booking" stays on the hero: the printed business-card QR lands here. */}
        <section id="booking" className="fm-hero">
          <div className="fm-hero-stage">
            <div className="fm-hero-zoom">
              <img className="fm-hero-img" src="/proto/hero.webp" width={1408} height={768} alt={c.img.hero} fetchPriority="high" decoding="async" />
            </div>
            <div className="fm-hero-inside">
              <img src="/proto/interior.webp" width={1408} height={768} alt={c.img.interior} decoding="async" />
            </div>
            <div className="fm-hero-shade" />
            <div className="fm-motto" aria-hidden="true">
              {c.fx.motto.map((m) => (
                <span key={m} className="w">
                  {m}
                </span>
              ))}
            </div>
            <div className="fm-letterbox" aria-hidden="true">
              <i />
              <i />
            </div>
          </div>

          <div className="fm-hero-content">
            <p className="fm-hero-meta">
              <span>{c.hero.coords}</span>
              <span>{c.hero.eyebrow}</span>
            </p>
            <h1 className="fm-h1">
              <span className="fm-hero-kicker">
                <span>{c.fx.kicker}</span>
              </span>
              <span className="fx-sr">{c.fx.srGiant}</span>
              <span className="fm-giant" aria-hidden="true">
                <Chars text={c.fx.giantA} className="fm-giant-a" />
                <Chars text={c.fx.giantB} className="fm-giant-b" />
              </span>
            </h1>
            <div className="fm-hero-foot">
              <p className="fm-hero-lede">{c.hero.lede}</p>
              <div className="fm-hero-actions">
                <a className="fm-btn fm-btn--solid" href={TEL}>
                  {c.hero.call} <span>{PHONE}</span>
                </a>
                <a className="fm-btn fm-btn--ghost" href={wa(c.waMsg)} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </div>
            </div>
            <span className="fm-cue" aria-hidden="true">
              {c.fx.scroll}
              <i />
            </span>
          </div>

          <div className="fm-curtain" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </div>
        </section>

        <section id="services" className="fm-services">
          <div className="fm-hwrap">
            <div className="fm-track">
              <header className="fm-services-head">
                <h2 className="fm-h2">
                  <Chars text={c.services.heading} />
                </h2>
                <p className="fm-lede">{c.services.lede}</p>
                <p className="fm-note">{c.services.note}</p>
              </header>
              {serviceMeta.map((s, i) => {
                const it = c.services.items[s.key];
                const img = panelImg[s.key];
                return (
                  <article key={s.key} className="fm-panel">
                    <div className="fm-panel-media">
                      <img src={img.src} width={1408} height={768} alt={c.img[img.alt]} loading="lazy" decoding="async" />
                    </div>
                    <span className="fm-panel-num" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="fm-panel-body">
                      <h3>{it.title}</h3>
                      <p>{it.desc}</p>
                      <ul>
                        {it.includes.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                      <a href={`/services/${s.slug}/`} className="fm-more">
                        {c.services.more} <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="fm-progress" aria-hidden="true">
              <i />
            </div>
          </div>
        </section>

        <section className="fm-towns" aria-label={c.areas.heading}>
          <div className="fm-towns-inner">
            {[0, 1].map((row) => (
              <div key={row} className={`fx-marquee fm-mq ${row ? 'fm-mq--outline' : ''}`}>
                <div className="fx-marquee-track fm-mq-track">
                  {[0, 1].map((copy) =>
                    towns.map((t) => (
                      <a key={`${copy}-${t.slug}`} href={`/omraader/${t.slug}/`} className="fm-town" tabIndex={copy || row ? -1 : 0} aria-hidden={copy || row ? true : undefined}>
                        {t.name}
                        <sup>{t.postal}</sup>
                        <span className="fm-town-sep" aria-hidden="true" />
                      </a>
                    )),
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="trust" className="fm-trust">
          <div className="fm-wrap">
            <h2 className="fm-h2 fm-rise">
              <Chars text={c.trust.heading} />
            </h2>
            <p className="fm-reveal">
              <Words text={c.fx.trustLine} />
            </p>
            <ol className="fm-reasons">
              {c.trust.items.map((r, i) => (
                <li key={r.title}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <h3>{r.title}</h3>
                  <p>{r.desc}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="fm-team">
            <div className="fm-team-clip">
              <img src="/proto/team.webp" width={1408} height={768} alt={c.img.team} loading="lazy" decoding="async" />
            </div>
          </div>
        </section>

        <section id="testimonials" className="fm-reviews">
          <div className="fm-wrap">
            <h2 className="fm-h2 fm-rise">
              <Chars text={c.reviews.heading} />
            </h2>
            <div className="fm-stack">
              {c.reviews.items.map((r, i) => (
                <figure key={r.who} className="fm-card" style={{ '--i': i } as React.CSSProperties}>
                  <span className="fm-card-num">{String(i + 1).padStart(2, '0')} / 03</span>
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

        <section id="contact" className="fm-contact">
          <div className="fm-wrap fm-contact-grid">
            <div>
              <h2 className="fm-h2 fm-rise">
                <Chars text={c.contact.heading} />
              </h2>
              <p className="fm-lede">{c.contact.intro}</p>
              <div className="fm-direct">
                <p>{c.contact.direct}</p>
                <a href={TEL}>{PHONE}</a>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </div>
            </div>
            <div className="fm-form">
              <ProtoContactForm />
            </div>
          </div>
        </section>

        <section id="book" className="fm-book">
          <img className="fm-book-img" src="/proto/van.webp" width={1408} height={768} alt={c.img.van} loading="lazy" decoding="async" />
          <div className="fm-book-shade" />
          <div className="fm-wrap fm-book-inner">
            <h2 className="fm-book-h fm-rise">
              <Chars text={c.book.heading} />
            </h2>
            <p className="fm-lede">{c.book.lede}</p>
            <a href={TEL} className="fm-book-phone fm-rise">
              <Chars text={PHONE} />
            </a>
            <ul className="fm-facts">
              {c.book.facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className="fm-book-note">{c.book.note}</p>
          </div>
        </section>
      </main>
      <ProtoFooter />
      <MobileBar />
    </div>
  );
}
