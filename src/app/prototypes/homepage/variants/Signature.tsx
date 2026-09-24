'use client';
// Flagship direction — Signature. Cinematic, directed: one WebGL stage renders every image
// (2.5D depth parallax on the villa, a portal that opens into the house, ink-wipe chapter
// transitions, a 3D glass wordmark, velocity-warped photos). Around it: a preloader, a film
// timecode + chapter rail, an illustrative coast map, end-credit testimonials, live opening
// status, a custom cursor and an optional generative sound bed.
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EMAIL, PHONE, TEL, serviceMeta, townGeo, towns, wa } from '../copy';
import { MobileBar, ProtoContactForm, ProtoFooter, ProtoNav, useCopy } from '../shared';
import { Chars, Cursor, Words, reducedMotion, useMagnetic, useSmoothScroll } from '../motion';
import { webglAvailable } from '../gl/noise';
import { createAmbient, type Ambient } from '../sound';

gsap.registerPlugin(ScrollTrigger);

const chapterImgs = ['/services/home-detail.webp', '/proto/dining-team-wide.webp', '/proto/garden.webp'];
const chapterAlt = ['home', 'diningTeam', 'estate'] as const;

// Illustrative coast: approximate Øresund shoreline (lat, lon), north → south.
const coast: [number, number][] = [
  [55.915, 12.528], [55.9, 12.54], [55.886, 12.552], [55.872, 12.566], [55.858, 12.574], [55.845, 12.578],
  [55.83, 12.582], [55.815, 12.592], [55.8, 12.598], [55.787, 12.604], [55.775, 12.606], [55.762, 12.603],
  [55.75, 12.598], [55.74, 12.594], [55.728, 12.59], [55.715, 12.598],
];
const LAT0 = 55.93;
const LON0 = 12.405;
const K = 4000;
const proj = ([lat, lon]: [number, number]) => [((lon - LON0) * Math.cos((55.8 * Math.PI) / 180) * K).toFixed(1), ((LAT0 - lat) * K).toFixed(1)] as const;

function useOpenStatus() {
  const [s, setS] = useState<{ open: boolean; time: string } | null>(null);
  useEffect(() => {
    const read = () => {
      const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Copenhagen', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
      const get = (t: string) => parts.find((p) => p.type === t)?.value || '';
      const h = Number(get('hour'));
      const m = Number(get('minute'));
      const wd = get('weekday');
      const weekday = !['Sat', 'Sun'].includes(wd);
      const mins = h * 60 + m;
      setS({ open: weekday && mins >= 8 * 60 && mins < 18 * 60, time: `${get('hour')}:${get('minute')}` });
    };
    read();
    const id = window.setInterval(read, 30000);
    return () => window.clearInterval(id);
  }, []);
  return s;
}

type HeroState = { scroll: number; reveal: number };

export default function Signature() {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const heroEl = useRef<HTMLElement>(null);
  const chapEl = useRef<HTMLDivElement>(null);
  const glassEl = useRef<HTMLDivElement>(null);
  const teamEl = useRef<HTMLDivElement>(null);
  const vanEl = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const timecode = useRef<HTMLSpanElement>(null);
  const introTl = useRef<gsap.core.Timeline | null>(null);
  const heroState = useRef<HeroState>({ scroll: 0, reveal: 0 });
  const chapState = useRef({ progress: 0 });
  const glassState = useRef({ progress: 0 });
  const imgReveal = useRef({ team: 0, van: 0 });
  const ambient = useRef<Ambient | null>(null);
  const [gl, setGl] = useState(false);
  const [assets, setAssets] = useState(false);
  const [intro, setIntro] = useState<'run' | 'out' | 'done'>('run');
  const [skipped, setSkipped] = useState(false);
  const [glassOk, setGlassOk] = useState(false);
  const climb = useRef<gsap.core.Tween | null>(null);
  const introMin = useRef({ start: 0, min: 1500 });
  const [chapter, setChapter] = useState(0);
  const [sound, setSound] = useState(false);
  const status = useOpenStatus();
  const { c, locale } = useCopy();
  const [oq, cq] = locale === 'da' ? ['»', '«'] : ['“', '”'];
  useSmoothScroll();
  useMagnetic(root, 0.28);

  // ── WebGL stage
  useEffect(() => {
    if (reducedMotion() || !webglAvailable() || !canvas.current) {
      setAssets(true);
      return;
    }
    let disposed = false;
    let stage: import('../gl/stage').Stage | null = null;
    (async () => {
      const m = await import('../gl/stage');
      if (disposed || !canvas.current) return;
      stage = new m.Stage(canvas.current);
      setGl(true);
      const lite = window.matchMedia('(max-width: 800px)').matches;
      const hero = m.heroView(stage, heroEl.current!, { a: '/proto/hero.webp', depth: '/proto/hero-depth.png', b: '/proto/interior.webp' });
      const heroUpdate = hero.update;
      hero.update = (ctx) => {
        hero.uniforms.uScroll.value = heroState.current.scroll;
        hero.uniforms.uReveal.value = heroState.current.reveal;
        heroUpdate?.(ctx);
      };
      const chap = m.chapterView(stage, chapEl.current!, chapterImgs);
      const chapUpdate = chap.update;
      chap.update = (ctx) => {
        chap.uniforms.uProgress.value = chapState.current.progress;
        chapUpdate?.(ctx);
      };
      const team = m.imageView(stage, teamEl.current!, '/proto/team.webp', { order: 12 });
      const teamUpdate = team.update;
      team.update = (ctx) => {
        team.uniforms.uReveal.value = imgReveal.current.team;
        teamUpdate?.(ctx);
      };
      const van = m.imageView(stage, vanEl.current!, '/proto/van.webp', { order: 12, dim: 0.35 });
      const vanUpdate = van.update;
      van.update = (ctx) => {
        van.uniforms.uReveal.value = imgReveal.current.van;
        vanUpdate?.(ctx);
      };
      await Promise.race([hero.ready, new Promise((r) => setTimeout(r, 4000))]);
      if (disposed) return;
      setAssets(true);
      try {
        const glass = await m.glassView(stage, glassEl.current!, { font: '/proto/inter-bold-wicare.json', backdrop: '/proto/hero-blur.webp', lite });
        if (disposed) return;
        setGlassOk(true);
        const gUpdate = glass.update;
        glass.update = (ctx) => {
          glass.state.progress = glassState.current.progress;
          gUpdate?.(ctx);
        };
      } catch {
        /* the section keeps its DOM wordmark */
      }
      ScrollTrigger.refresh();
    })();
    return () => {
      disposed = true;
      stage?.dispose();
    };
  }, []);

  // ── Preloader: count up while the stage loads, then open the curtain into the hero.
  useEffect(() => {
    if (reducedMotion()) {
      setIntro('done');
      heroState.current.reveal = 1;
      return;
    }
    let seen = false;
    try {
      seen = sessionStorage.getItem('wc-sig-intro') === '1' && !location.search.includes('intro=1');
      sessionStorage.setItem('wc-sig-intro', '1');
    } catch {}
    introMin.current = { start: performance.now(), min: seen ? 400 : 1500 };
    const obj = { v: 0 };
    const paint = () => counter.current && (counter.current.textContent = String(Math.round(obj.v)).padStart(3, '0'));
    climb.current = gsap.to(obj, { v: 86, duration: seen ? 0.4 : 1.4, ease: 'power2.out', onUpdate: paint });
    // never hold visitors longer than this, whatever the network does
    const cap = window.setTimeout(() => setSkipped(true), 3200);
    return () => {
      climb.current?.kill();
      window.clearTimeout(cap);
    };
  }, []);

  useEffect(() => {
    if ((!assets && !skipped) || intro !== 'run') return;
    const finish = () => {
      climb.current?.kill();
      const obj = { v: Number(counter.current?.textContent || 86) };
      gsap.to(obj, {
        v: 100,
        duration: 0.35,
        ease: 'power2.out',
        onUpdate: () => counter.current && (counter.current.textContent = String(Math.round(obj.v)).padStart(3, '0')),
        onComplete: () => {
          setIntro('out');
          gsap.to(heroState.current, { reveal: 1, duration: 1.8, ease: 'power2.inOut', delay: 0.35 });
          introTl.current?.play(0);
          window.setTimeout(() => setIntro('done'), 1300);
        },
      });
    };
    const waited = performance.now() - introMin.current.start;
    const id = window.setTimeout(finish, skipped ? 0 : Math.max(200, introMin.current.min - waited));
    return () => window.clearTimeout(id);
  }, [assets, skipped, intro]);

  const skip = () => {
    if (intro === 'run') setSkipped(true);
  };

  // ── Scroll choreography
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);
    mm.add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 900px)' }, (ctx) => {
      const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
      if (!motion) {
        heroState.current.reveal = 1;
        imgReveal.current.team = 1;
        imgReveal.current.van = 1;
        glassState.current.progress = 1;
        return;
      }

      // hero intro (played by the preloader)
      introTl.current = gsap
        .timeline({ paused: true, defaults: { ease: 'expo.out' } })
        .from('.sg-giant-a .ch', { yPercent: 118, rotate: 7, duration: 1.4, stagger: 0.05 }, 0.2)
        .from('.sg-giant-b .ch', { yPercent: 118, duration: 1.2, stagger: 0.02 }, 0.4)
        .from('.sg-meta > *, .sg-kicker > span, .sg-hero-lede, .sg-hero-actions', { y: 26, opacity: 0, duration: 1.1, stagger: 0.06 }, 0.55);

      // hero: dolly into the lit glass, the portal opens, the motto rises
      gsap
        .timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: '.sg-hero', start: 'top top', end: desktop ? '+=220%' : '+=160%', scrub: 0.7, pin: true, anticipatePin: 1 } })
        .to(heroState.current, { scroll: 1, duration: 1 }, 0)
        .to('.sg-letterbox i', { scaleY: 1, duration: 0.14 }, 0)
        .to('.sg-giant-a .fx-ch-mask', { yPercent: -130, opacity: 0, stagger: 0.012, duration: 0.2 }, 0)
        .to('.sg-giant-b .fx-ch-mask', { yPercent: -130, opacity: 0, stagger: 0.006, duration: 0.2 }, 0.03)
        .to('.sg-meta, .sg-kicker, .sg-hero-foot, .sg-cue', { opacity: 0, y: -40, duration: 0.14 }, 0)
        .fromTo('.sg-hero-inside', { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.4)
        .fromTo('.sg-motto .w', { opacity: 0, yPercent: 60, filter: 'blur(16px)' }, { opacity: 1, yPercent: 0, filter: 'blur(0px)', stagger: 0.09, duration: 0.14 }, 0.66)
        .to('.sg-letterbox i', { scaleY: 0, duration: 0.1 }, 0.92);

      // glass wordmark turns to face you
      gsap
        .timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: '.sg-glass', start: 'top top', end: '+=110%', scrub: 0.8, pin: true, anticipatePin: 1 } })
        .fromTo(glassState.current, { progress: 0 }, { progress: 1, duration: 0.7, ease: 'power2.out' }, 0)
        .from('.sg-glass-copy > *', { y: 40, opacity: 0, stagger: 0.08, duration: 0.3 }, 0.45);

      // chapters: one frame, three services
      const chaps = gsap.utils.toArray<HTMLElement>('.sg-chap');
      const ct = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: '.sg-chapters', start: 'top top', end: desktop ? '+=320%' : '+=260%', scrub: 0.8, pin: true, anticipatePin: 1 } });
      ct.to(chapState.current, { progress: 2, duration: 2 }, 0);
      [1, 2].forEach((i) => {
        ct.to(chaps[i - 1], { autoAlpha: 0, y: -50, duration: 0.18, ease: 'power2.in' }, i - 1 + 0.42)
          .fromTo(chaps[i], { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.24, ease: 'power3.out' }, i - 1 + 0.58)
          .fromTo(`.sg-chap-media img:nth-child(${i + 1})`, { opacity: 0 }, { opacity: 1, duration: 0.3 }, i - 1 + 0.45);
      });
      gsap.utils.toArray<HTMLElement>('.sg-chap-bar i').forEach((bar, i) => {
        ct.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: i === 2 ? 0.34 : 1 }, i === 2 ? 1.66 : i);
      });

      // coast map draws itself
      gsap.fromTo('.sg-coast', { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '.sg-map', start: 'top 80%', end: 'center center', scrub: true } });
      gsap.from('.sg-pin', { scale: 0, transformOrigin: '50% 50%', opacity: 0, stagger: 0.07, duration: 0.8, ease: 'back.out(3)', scrollTrigger: { trigger: '.sg-map', start: 'top 60%' } });

      // trust: words light up; the team photo arrives
      gsap.fromTo('.sg-reveal .w', { opacity: 0.14 }, { opacity: 1, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: '.sg-reveal', start: 'top 80%', end: 'bottom 45%', scrub: true } });
      gsap.to(imgReveal.current, { team: 1, duration: 2, ease: 'power2.out', scrollTrigger: { trigger: '.sg-team', start: 'top 80%' } });
      gsap.from('.sg-reasons li', { y: 50, opacity: 0, stagger: 0.09, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.sg-reasons', start: 'top 85%' } });

      // end credits roll
      const roll = el.querySelector<HTMLElement>('.sg-roll');
      if (roll) {
        gsap.fromTo(roll, { y: () => window.innerHeight * 0.55 }, { y: () => -(roll.offsetHeight - window.innerHeight * 0.45), ease: 'none', scrollTrigger: { trigger: '.sg-credits', start: 'top top', end: () => '+=' + (roll.offsetHeight + window.innerHeight * 0.3), scrub: true, pin: true, invalidateOnRefresh: true, anticipatePin: 1 } });
      }

      // finale
      gsap.to(imgReveal.current, { van: 1, duration: 2.2, ease: 'power2.out', scrollTrigger: { trigger: '.sg-book', start: 'top 70%' } });
      gsap.utils.toArray<HTMLElement>('.sg-rise').forEach((h) => {
        gsap.from(h.querySelectorAll('.ch'), { yPercent: 115, stagger: 0.018, duration: 1.1, ease: 'expo.out', clearProps: 'transform', scrollTrigger: { trigger: h, start: 'top 85%' } });
      });

      // HUD: timecode + active chapter
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const frames = Math.floor(window.scrollY / 5);
          const ff = frames % 24;
          const s = Math.floor(frames / 24);
          const pad = (n: number) => String(n).padStart(2, '0');
          if (timecode.current) timecode.current.textContent = `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(ff)}`;
          ambient.current?.swell(self.getVelocity() / 1500);
        },
      });
      ScrollTrigger.create({ trigger: '.sg-trust', start: 'top center', endTrigger: '.sg-credits', end: 'bottom center', onToggle: (s) => s.isActive && setChapter(3) });
      ScrollTrigger.create({ trigger: '.sg-contact', start: 'top center', end: 'bottom center', onToggle: (s) => s.isActive && setChapter(4) });
      ScrollTrigger.create({
        trigger: '.sg-chapters',
        start: 'top top',
        end: desktop ? '+=320%' : '+=260%',
        onUpdate: (s) => setChapter(Math.min(2, Math.floor(s.progress * 3))),
      });
    });
    return () => {
      mm.revert();
      introTl.current = null;
    };
  }, [locale]);

  // ── Sound
  useEffect(() => {
    ambient.current = createAmbient();
    const el = root.current;
    let last = 0;
    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement | null)?.closest('a, button');
      const now = performance.now();
      if (t && now - last > 90) {
        last = now;
        ambient.current?.tick();
      }
    };
    el?.addEventListener('pointerover', over);
    return () => {
      el?.removeEventListener('pointerover', over);
      ambient.current?.dispose();
      ambient.current = null;
    };
  }, []);
  const toggleSound = () => {
    const next = !sound;
    setSound(next);
    ambient.current?.setOn(next);
  };

  const go = (sel: string) => document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth' });
  const statusLine = status ? (status.open ? c.sg.openLine : c.sg.closedLine) : c.sg.openLine;

  return (
    <div ref={root} className="proto-root sg" data-gl={gl || undefined} data-glass={glassOk || undefined} data-intro={intro}>
      <canvas ref={canvas} className="sg-stage" aria-hidden="true" />
      <div className="fx-grain" aria-hidden="true" />
      <Cursor />

      {intro !== 'done' && (
        <div className="sg-loader" data-state={intro} onClick={skip} role="presentation">
          <div className="sg-loader-top" />
          <div className="sg-loader-bottom" />
          <div className="sg-loader-inner">
            <span className="wm sg-loader-wm" data-tone="onDark">
              Wi<span className="wm-care">Care</span>
            </span>
            <span className="sg-loader-count">
              <span ref={counter}>000</span>
            </span>
            <span className="sg-loader-line" />
            <span className="sg-loader-meta">
              <span>{c.hero.eyebrow}</span>
              <button type="button" className="sg-loader-skip" onClick={skip}>
                {c.sg.skip}
              </button>
            </span>
          </div>
        </div>
      )}

      <ProtoNav tone="onDark" />

      {/* HUD — desktop only */}
      <div className="sg-hud" aria-hidden="true">
        <span className="sg-tc">
          <i />
          TC <span ref={timecode}>00:00:00:00</span>
        </span>
        <span className="sg-hud-chap">
          {c.sg.chapter} {chapter + 1} — {c.sg.chapters[chapter]}
        </span>
      </div>
      <nav className="sg-rail" aria-label={c.sg.chapter}>
        {c.sg.chapters.map((label, i) => (
          <button key={label} type="button" data-active={chapter === i || undefined} onClick={() => go(['#services', '#services', '#services', '#trust', '#contact'][i])}>
            <span>{label}</span>
            <i />
          </button>
        ))}
      </nav>
      <button type="button" className="sg-sound" data-on={sound || undefined} onClick={toggleSound} aria-pressed={sound}>
        <span className="sg-eq" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        {c.sg.sound}
      </button>

      <main>
        {/* id="booking" stays on the hero: the printed business-card QR lands here. */}
        <section id="booking" ref={heroEl} className="sg-hero">
          <div className="sg-hero-fallback">
            <img src="/proto/hero.webp" width={1376} height={768} alt={c.img.hero} fetchPriority="high" decoding="async" />
            <img className="sg-hero-inside" src="/proto/interior.webp" width={1408} height={768} alt="" decoding="async" />
          </div>
          <div className="sg-hero-shade" />
          <div className="sg-motto" aria-hidden="true">
            {c.fx.motto.map((m) => (
              <span key={m} className="w">
                {m}
              </span>
            ))}
          </div>
          <div className="sg-letterbox" aria-hidden="true">
            <i />
            <i />
          </div>
          <div className="sg-hero-content">
            <p className="sg-meta">
              <span>{c.hero.coords}</span>
              <span>{c.hero.eyebrow}</span>
              {status && (
                <span className="sg-status" data-open={status.open || undefined}>
                  <i /> {status.open ? c.sg.open : c.sg.closed} · {c.sg.city} {status.time}
                </span>
              )}
            </p>
            <h1 className="sg-h1">
              <span className="sg-kicker">
                <span>{c.fx.kicker}</span>
              </span>
              <span className="fx-sr">{c.fx.srGiant}</span>
              <span className="sg-giant" aria-hidden="true">
                <Chars text={c.fx.giantA} className="sg-giant-a" />
                <Chars text={c.fx.giantB} className="sg-giant-b" />
              </span>
            </h1>
            <div className="sg-hero-foot">
              <p className="sg-hero-lede">{c.hero.lede}</p>
              <div className="sg-hero-actions">
                <a className="sg-btn sg-btn--solid" href={TEL} data-magnetic data-cursor={c.nav.call}>
                  {c.hero.call} <span>{PHONE}</span>
                </a>
                <a className="sg-btn sg-btn--ghost" href={wa(c.waMsg)} target="_blank" rel="noopener noreferrer" data-magnetic data-cursor="Chat">
                  WhatsApp
                </a>
              </div>
            </div>
            <span className="sg-cue" aria-hidden="true">
              {c.fx.scroll}
              <i />
            </span>
          </div>
        </section>

        <section className="sg-glass" aria-label={c.fx.partner}>
          <div ref={glassEl} className="sg-glass-stage">
            <p className="sg-glass-fallback" aria-hidden="true">
              Wi<span>Care</span>
            </p>
          </div>
          <div className="sg-glass-copy">
            <p className="sg-label">{c.fx.partner}</p>
            <p className="sg-glass-motto">{c.hero.motto}</p>
            <p className="sg-glass-lede">{c.hero.lede}</p>
          </div>
        </section>

        <section id="services" className="sg-chapters">
          <div className="sg-chap-media" ref={chapEl}>
            {chapterImgs.map((src, i) => (
              <img key={src} src={src} width={1408} height={768} alt={c.img[chapterAlt[i]]} loading="lazy" decoding="async" />
            ))}
          </div>
          <div className="sg-chap-shade" aria-hidden="true" />
          <div className="sg-chap-text">
            <p className="sg-label">{c.services.heading}</p>
            <div className="sg-chap-stack">
              {serviceMeta.map((s, i) => {
                const it = c.services.items[s.key];
                return (
                  <article key={s.key} className="sg-chap" data-i={i}>
                    <span className="sg-numeral" aria-hidden="true">
                      {c.sg.numerals[i]}
                    </span>
                    <p className="sg-chap-kicker">
                      {c.sg.chapter} {c.sg.numerals[i]} — {c.sg.chapters[i]}
                    </p>
                    <h2 className="sg-chap-title">{it.title}</h2>
                    <p className="sg-chap-desc">{it.desc}</p>
                    <ul className="sg-chap-tags">
                      {it.includes.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                    <a className="sg-more" href={`/services/${s.slug}/`} data-cursor={c.services.more}>
                      {c.services.more} <span aria-hidden="true">→</span>
                    </a>
                  </article>
                );
              })}
            </div>
            <div className="sg-chap-bar" aria-hidden="true">
              <span>
                <i />
              </span>
              <span>
                <i />
              </span>
              <span>
                <i />
              </span>
            </div>
            <p className="sg-chap-note">{c.services.note}</p>
          </div>
        </section>

        <section className="sg-map" aria-labelledby="sg-map-h">
          <div className="sg-wrap sg-map-grid">
            <div>
              <h2 id="sg-map-h" className="sg-h2 sg-rise">
                <Chars text={c.areas.heading} />
              </h2>
              <p className="sg-lede">{c.areas.lede}</p>
              <ul className="sg-town-list">
                {towns.map((t) => (
                  <li key={t.slug}>
                    <a href={`/omraader/${t.slug}/`}>
                      <span>{t.name}</span>
                      <i />
                      <span>{t.postal}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <figure className="sg-map-fig">
              <svg viewBox="0 0 560 880" role="img" aria-label={c.sg.mapNote}>
                <defs>
                  <pattern id="sg-water" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
                    <line x1="0" y1="0" x2="0" y2="10" stroke="rgba(107,168,206,0.34)" strokeWidth="1.2" />
                  </pattern>
                  <radialGradient id="sg-fade" cx="0.62" cy="0.5" r="0.6">
                    <stop offset="55%" stopColor="#fff" />
                    <stop offset="100%" stopColor="#000" />
                  </radialGradient>
                  <mask id="sg-mask">
                    <rect width="560" height="880" fill="url(#sg-fade)" />
                  </mask>
                  <radialGradient id="sg-glow">
                    <stop offset="0%" stopColor="#9CC6E2" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#9CC6E2" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <g mask="url(#sg-mask)">
                  <path d={`M ${coast.map((p) => proj(p).join(' ')).join(' L ')} L 0 880 L 0 0 Z`} fill="rgba(234,241,248,0.05)" />
                  <path d={`M ${coast.map((p) => proj(p).join(' ')).join(' L ')} L 560 880 L 560 0 Z`} fill="url(#sg-water)" />
                </g>
                <path className="sg-coast" d={`M ${coast.map((p) => proj(p).join(' ')).join(' L ')}`} pathLength={1} fill="none" stroke="#6BA8CE" strokeWidth="1.6" strokeDasharray="1" />
                <text x="470" y="420" className="sg-sea">Øresund</text>
                {towns.map((t) => {
                  const g = townGeo[t.slug];
                  if (!g) return null;
                  const [x, y] = proj(g);
                  const left = t.slug === 'holte' || t.slug === 'hoersholm' || t.slug === 'gentofte';
                  return (
                    <a key={t.slug} href={`/omraader/${t.slug}/`} className="sg-pin" data-cursor={t.postal}>
                      <circle cx={x} cy={y} r="18" fill="url(#sg-glow)" className="sg-pin-glow" />
                      <circle cx={x} cy={y} r="4.5" fill="#EAF1F8" />
                      <text x={Number(x) + (left ? -12 : 12)} y={Number(y) + 4} textAnchor={left ? 'end' : 'start'}>
                        {t.name}
                      </text>
                    </a>
                  );
                })}
              </svg>
              <figcaption>{c.sg.mapNote}</figcaption>
            </figure>
          </div>
        </section>

        <section id="trust" className="sg-trust">
          <div className="sg-wrap">
            <h2 className="sg-h2 sg-rise">
              <Chars text={c.trust.heading} />
            </h2>
            <p className="sg-reveal">
              <Words text={c.fx.trustLine} />
            </p>
            <ol className="sg-reasons">
              {c.trust.items.map((r, i) => (
                <li key={r.title}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <h3>{r.title}</h3>
                  <p>{r.desc}</p>
                </li>
              ))}
            </ol>
          </div>
          <div ref={teamEl} className="sg-team" data-cursor="WiCare">
            <img src="/proto/team.webp" width={1408} height={768} alt={c.img.team} loading="lazy" decoding="async" />
          </div>
        </section>

        <section id="testimonials" className="sg-credits">
          <div className="sg-roll">
            <p className="sg-label">{c.sg.credits}</p>
            <h2 className="sg-credits-h">{c.reviews.heading}</h2>
            {c.reviews.items.map((r) => (
              <figure key={r.who} className="sg-credit">
                <blockquote>
                  {oq}
                  {r.quote}
                  {cq}
                </blockquote>
                <figcaption>{r.who}</figcaption>
              </figure>
            ))}
            <p className="sg-credits-end">WiCare ApS · {c.hero.eyebrow}</p>
          </div>
        </section>

        <section id="contact" className="sg-contact">
          <div className="sg-wrap sg-contact-grid">
            <div>
              <h2 className="sg-h2 sg-h2--sm sg-rise">
                <Chars text={c.contact.heading} />
              </h2>
              <p className="sg-lede">{c.contact.intro}</p>
              {status && (
                <p className="sg-status sg-status--block" data-open={status.open || undefined}>
                  <i /> {status.open ? c.sg.open : c.sg.closed} — {statusLine}. {c.sg.hours}.
                </p>
              )}
              <div className="sg-direct">
                <p>{c.contact.direct}</p>
                <a href={TEL} data-cursor={c.nav.call}>
                  {PHONE}
                </a>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </div>
            </div>
            <div className="sg-form">
              <ProtoContactForm />
            </div>
          </div>
        </section>

        <section id="book" className="sg-book">
          <div ref={vanEl} className="sg-book-media">
            <img src="/proto/van.webp" width={1408} height={768} alt={c.img.van} loading="lazy" decoding="async" />
          </div>
          <div className="sg-book-shade" />
          <div className="sg-wrap sg-book-inner">
            <h2 className="sg-book-h sg-rise">
              <Chars text={c.book.heading} />
            </h2>
            <p className="sg-lede">{c.book.lede}</p>
            <a href={TEL} className="sg-book-phone sg-rise" data-cursor={c.nav.call}>
              <Chars text={PHONE} />
            </a>
            <ul className="sg-facts">
              {c.book.facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className="sg-book-note">{c.book.note}</p>
          </div>
        </section>
      </main>
      <ProtoFooter />
      <MobileBar />
    </div>
  );
}
