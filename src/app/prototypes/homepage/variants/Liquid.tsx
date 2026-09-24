'use client';
// Bold direction B — Liquid 3D. Real-time WebGL: the villa behaves like water under the
// cursor, thousands of particles drift in like sea spray and assemble into the WiCare
// wordmark, and service photos melt and bend as they trail the cursor over the list.
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EMAIL, PHONE, TEL, serviceMeta, towns, wa } from '../copy';
import { MobileBar, ProtoContactForm, ProtoFooter, ProtoNav, useCopy } from '../shared';
import { Chars, finePointer, reducedMotion, useSmoothScroll } from '../motion';
import { webglAvailable } from '../gl/noise';

gsap.registerPlugin(ScrollTrigger);

const rowImg = {
  home: { src: '/services/home-detail.webp', alt: 'home' as const },
  dining: { src: '/proto/chef.webp', alt: 'dining' as const },
  estate: { src: '/proto/garden.webp', alt: 'estate' as const },
};

export default function Liquid() {
  const root = useRef<HTMLDivElement>(null);
  const heroCanvas = useRef<HTMLCanvasElement>(null);
  const brandCanvas = useRef<HTMLCanvasElement>(null);
  const revealCanvas = useRef<HTMLCanvasElement>(null);
  const reveal = useRef<{ show: (i: number) => void; hide: () => void } | null>(null);
  const [gl, setGl] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const [quote, setQuote] = useState(0);
  const [paused, setPaused] = useState(false);
  const { c, locale } = useCopy();
  const [oq, cq] = locale === 'da' ? ['»', '«'] : ['“', '”'];
  useSmoothScroll();

  // ── WebGL scenes (skipped for reduced motion or no WebGL: the photos stay as plain images).
  useEffect(() => {
    if (reducedMotion() || !webglAvailable()) return;
    setGl(true);
    let disposed = false;
    const cleanups: (() => void)[] = [];
    (async () => {
      const [{ createLiquidHero }, { createParticleLogo }, { createHoverReveal }] = await Promise.all([
        import('../gl/liquidHero'),
        import('../gl/particleLogo'),
        import('../gl/hoverReveal'),
      ]);
      if (disposed) return;
      if (heroCanvas.current) {
        const hero = createLiquidHero(heroCanvas.current, '/proto/hero.webp', () => {
          setHeroReady(true);
          gsap.to(hero.uniforms.uReveal, { value: 1, duration: 2.2, ease: 'power2.inOut', delay: 0.15 });
        });
        const st = ScrollTrigger.create({
          trigger: '.lq-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            hero.uniforms.uScroll.value = self.progress;
          },
        });
        cleanups.push(() => {
          st.kill();
          hero.dispose();
        });
      }
      if (brandCanvas.current) {
        await document.fonts.ready;
        const wm = document.querySelector('.wm');
        const family = wm ? getComputedStyle(wm).fontFamily : 'Inter, system-ui, sans-serif';
        const logo = createParticleLogo(brandCanvas.current, {
          fontFamily: family,
          parts: [
            { text: 'Wi', color: '#FFFFFF' },
            { text: 'Care', color: '#6BA8CE' },
          ],
        });
        const st = ScrollTrigger.create({
          trigger: '.lq-brand',
          start: 'top 65%',
          end: 'bottom bottom',
          scrub: 0.8,
          onUpdate: (self) => logo.setProgress(self.progress),
        });
        cleanups.push(() => {
          st.kill();
          logo.dispose();
        });
      }
      if (revealCanvas.current && finePointer()) {
        const r = createHoverReveal(
          revealCanvas.current,
          serviceMeta.map((s) => rowImg[s.key].src),
        );
        reveal.current = r;
        cleanups.push(() => {
          reveal.current = null;
          r.dispose();
        });
      }
      ScrollTrigger.refresh();
    })();
    return () => {
      disposed = true;
      cleanups.forEach((f) => f());
    };
  }, []);

  // ── DOM choreography.
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);
    mm.add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 900px)' }, (ctx) => {
      const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
      if (!motion) return;
      gsap.timeline({ delay: 0.5, defaults: { ease: 'expo.out' } })
        .from('.lq-giant .ch', { yPercent: 120, rotateX: -80, transformOrigin: '50% 100%', duration: 1.4, stagger: 0.035 })
        .from('.lq-meta, .lq-kicker, .lq-hero-lede, .lq-hero-actions > *, .lq-hint', { y: 24, opacity: 0, duration: 1, stagger: 0.07 }, 0.5);
      gsap.to('.lq-hero-content', { yPercent: -18, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: '.lq-hero', start: 'top top', end: 'bottom top', scrub: true } });

      // brand section: pin while the particles assemble, then the motto lands
      ScrollTrigger.create({ trigger: '.lq-brand', start: 'top top', end: desktop ? '+=70%' : '+=50%', pin: '.lq-brand-sticky', pinSpacing: true });
      gsap.from('.lq-motto .w', { opacity: 0, y: 30, filter: 'blur(10px)', stagger: 0.12, ease: 'power2.out', scrollTrigger: { trigger: '.lq-brand', start: 'top top', end: '+=60%', scrub: true } });

      gsap.utils.toArray<HTMLElement>('.lq-rise').forEach((h) => {
        gsap.from(h.querySelectorAll('.ch'), { yPercent: 110, stagger: 0.02, duration: 1.1, ease: 'expo.out', clearProps: 'transform', scrollTrigger: { trigger: h, start: 'top 85%' } });
      });
      gsap.from('.lq-row', { y: 60, opacity: 0, stagger: 0.1, duration: 1.1, ease: 'expo.out', clearProps: 'transform', scrollTrigger: { trigger: '.lq-list', start: 'top 80%' } });
      gsap.from('.lq-glass', { y: 80, opacity: 0, rotateX: -18, transformOrigin: '50% 0%', stagger: 0.1, duration: 1.2, ease: 'expo.out', clearProps: 'transform,transformOrigin', scrollTrigger: { trigger: '.lq-glass-grid', start: 'top 82%' } });

      const loops = gsap.utils.toArray<HTMLElement>('.lq-mq-track').map((row, i) =>
        gsap.fromTo(row, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, duration: 46 + i * 8, ease: 'none', repeat: -1 }),
      );
      ScrollTrigger.create({
        trigger: '.lq-towns',
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 200, 6);
          loops.forEach((t) => gsap.to(t, { timeScale: boost, duration: 0.25, overwrite: true, onComplete: () => { gsap.to(t, { timeScale: 1, duration: 1.2 }); } }));
        },
      });
    });
    return () => mm.revert();
  }, [locale]);

  // ── Testimonials autoplay.
  useEffect(() => {
    if (paused || reducedMotion()) return;
    const id = window.setTimeout(() => setQuote((q) => (q + 1) % c.reviews.items.length), 7000);
    return () => window.clearTimeout(id);
  }, [quote, paused, c.reviews.items.length]);

  // Tilt the glass cards toward the cursor.
  const tilt = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return;
    const t = e.currentTarget;
    const r = t.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    t.style.setProperty('--rx', `${(-y * 10).toFixed(2)}deg`);
    t.style.setProperty('--ry', `${(x * 12).toFixed(2)}deg`);
    t.style.setProperty('--mx', `${((x + 0.5) * 100).toFixed(1)}%`);
    t.style.setProperty('--my', `${((y + 0.5) * 100).toFixed(1)}%`);
  };
  const untilt = (e: React.PointerEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty('--rx', '0deg');
    e.currentTarget.style.setProperty('--ry', '0deg');
  };

  return (
    <div ref={root} className="proto-root lq" data-gl={gl || undefined}>
      <ProtoNav tone="onDark" />
      <main>
        {/* id="booking" stays on the hero: the printed business-card QR lands here. */}
        <section id="booking" className="lq-hero">
          <img className="lq-hero-fallback" src="/proto/hero.webp" width={1408} height={768} alt={c.img.hero} fetchPriority="high" decoding="async" data-hidden={heroReady || undefined} />
          <canvas ref={heroCanvas} className="lq-hero-canvas" aria-hidden="true" />
          <div className="lq-hero-shade" />
          <div className="lq-hero-content">
            <p className="lq-meta">
              <span>{c.hero.coords}</span>
              <span>{c.hero.eyebrow}</span>
            </p>
            <h1 className="lq-h1">
              <span className="lq-kicker">{c.fx.kicker}</span>
              <span className="fx-sr">{c.fx.srGiant}</span>
              <span className="lq-giant" aria-hidden="true">
                <Chars text={c.fx.giantA} />
                <br />
                <Chars text={c.fx.giantB} />
              </span>
            </h1>
            <div className="lq-hero-foot">
              <p className="lq-hero-lede">{c.hero.lede}</p>
              <div className="lq-hero-actions">
                <a className="lq-btn lq-btn--solid" href={TEL}>
                  {c.hero.call} <span>{PHONE}</span>
                </a>
                <a className="lq-btn lq-btn--glass" href={wa(c.waMsg)} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </div>
            </div>
            <p className="lq-hint" aria-hidden="true">
              <i />
              {c.fx.hint}
            </p>
          </div>
        </section>

        <section className="lq-brand" aria-label={c.fx.partner}>
          <div className="lq-brand-sticky">
            <canvas ref={brandCanvas} className="lq-brand-canvas" aria-hidden="true" />
            <p className="lq-brand-fallback" aria-hidden="true">
              Wi<span>Care</span>
            </p>
            <div className="lq-brand-copy">
              <p className="lq-label">{c.fx.partner}</p>
              <p className="lq-motto">
                {c.fx.motto.map((m) => (
                  <span key={m} className="w">
                    {m}{' '}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </section>

        <section id="services" className="lq-services">
          <div className="lq-wrap">
            <header className="lq-sec-head">
              <h2 className="lq-h2 lq-rise">
                <Chars text={c.services.heading} />
              </h2>
              <div>
                <p className="lq-lede">{c.services.lede}</p>
                <p className="lq-hint2">{c.fx.servicesHint}</p>
              </div>
            </header>
            <ul className="lq-list" onPointerLeave={() => reveal.current?.hide()}>
              {serviceMeta.map((s, i) => {
                const it = c.services.items[s.key];
                const img = rowImg[s.key];
                return (
                  <li key={s.key}>
                    <a href={`/services/${s.slug}/`} className="lq-row" onPointerEnter={() => reveal.current?.show(i)}>
                      <span className="lq-row-no">{String(i + 1).padStart(2, '0')}</span>
                      <span className="lq-row-title">{it.title}</span>
                      <span className="lq-row-desc">{it.desc}</span>
                      <span className="lq-row-arrow" aria-hidden="true">
                        →
                      </span>
                      <img className="lq-row-img" src={img.src} width={1408} height={768} alt={c.img[img.alt]} loading="lazy" decoding="async" />
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="lq-note">{c.services.note}</p>
          </div>
          <canvas ref={revealCanvas} className="lq-reveal-canvas" aria-hidden="true" />
        </section>

        <section id="trust" className="lq-trust">
          <div className="lq-caustics" aria-hidden="true" />
          <div className="lq-wrap">
            <h2 className="lq-h2 lq-rise">
              <Chars text={c.trust.heading} />
            </h2>
            <p className="lq-trust-line">{c.fx.trustLine}</p>
            <div className="lq-glass-grid">
              {c.trust.items.map((r, i) => (
                <article key={r.title} className="lq-glass" onPointerMove={tilt} onPointerLeave={untilt}>
                  <span className="lq-glass-no">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{r.title}</h3>
                  <p>{r.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lq-towns" aria-label={c.areas.heading}>
          {[0, 1].map((row) => (
            <div key={row} className={`fx-marquee lq-mq ${row ? 'lq-mq--outline' : ''}`}>
              <div className="fx-marquee-track lq-mq-track">
                {[0, 1].map((copy) =>
                  towns.map((t) => (
                    <a key={`${copy}-${t.slug}`} href={`/omraader/${t.slug}/`} className="lq-town" tabIndex={copy || row ? -1 : 0} aria-hidden={copy || row ? true : undefined}>
                      {t.name}
                      <span className="lq-town-dot" aria-hidden="true" />
                    </a>
                  )),
                )}
              </div>
            </div>
          ))}
        </section>

        <section id="testimonials" className="lq-reviews" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
          <div className="lq-wrap">
            <h2 className="lq-h2 lq-rise">
              <Chars text={c.reviews.heading} />
            </h2>
            <div className="lq-quote-stage" aria-live="polite">
              {c.reviews.items.map((r, i) => (
                <figure key={r.who} className="lq-quote" data-active={i === quote || undefined} aria-hidden={i !== quote}>
                  <blockquote>
                    {oq}
                    {r.quote}
                    {cq}
                  </blockquote>
                  <figcaption>{r.who}</figcaption>
                </figure>
              ))}
            </div>
            <div className="lq-quote-ctrl">
              <button type="button" className="lq-round" onClick={() => setQuote((q) => (q + c.reviews.items.length - 1) % c.reviews.items.length)} aria-label={c.fx.prev}>
                ←
              </button>
              <div className="lq-bars">
                {c.reviews.items.map((r, i) => (
                  <button key={r.who} type="button" className="lq-bar" data-active={i === quote || undefined} data-done={i < quote || undefined} data-paused={paused || undefined} onClick={() => setQuote(i)} aria-label={`${i + 1}`}>
                    <i key={`${quote}-${i}`} />
                  </button>
                ))}
              </div>
              <button type="button" className="lq-round" onClick={() => setQuote((q) => (q + 1) % c.reviews.items.length)} aria-label={c.fx.next}>
                →
              </button>
            </div>
          </div>
        </section>

        <section id="contact" className="lq-contact">
          <div className="lq-wrap lq-contact-grid">
            <div>
              <h2 className="lq-h2 lq-rise">
                <Chars text={c.contact.heading} />
              </h2>
              <p className="lq-lede">{c.contact.intro}</p>
              <div className="lq-direct">
                <p>{c.contact.direct}</p>
                <a href={TEL}>{PHONE}</a>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </div>
            </div>
            <div className="lq-form">
              <ProtoContactForm />
            </div>
          </div>
        </section>

        <section id="book" className="lq-book">
          <div className="lq-book-orb" aria-hidden="true" />
          <div className="lq-wrap lq-book-inner">
            <h2 className="lq-book-h lq-rise">
              <Chars text={c.book.heading} />
            </h2>
            <p className="lq-lede">{c.book.lede}</p>
            <a href={TEL} className="lq-book-phone">
              {PHONE}
            </a>
            <ul className="lq-facts">
              {c.book.facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className="lq-book-note">{c.book.note}</p>
          </div>
        </section>
      </main>
      <ProtoFooter />
      <MobileBar />
    </div>
  );
}
