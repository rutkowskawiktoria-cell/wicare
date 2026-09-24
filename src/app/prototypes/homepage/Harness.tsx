'use client';
// Variant picker — Emil Kowalski's prototype PICKER spec, expressed in React.
// Keys 1–3 / ←→ switch, R replays, ?v= persists. The swap itself is instant.
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// Each direction is its own chunk (GSAP / Three.js load only for the one on screen).
const Film = dynamic(() => import('./variants/Film'), { ssr: false });
const Liquid = dynamic(() => import('./variants/Liquid'), { ssr: false });
const Aurora = dynamic(() => import('./variants/Aurora'), { ssr: false });

const VARIANTS = [
  { name: 'Cinematic', C: Film },
  { name: 'Liquid 3D', C: Liquid },
  { name: 'Aurora', C: Aurora },
];

export default function Harness() {
  const [ready, setReady] = useState(false);
  const [current, setCurrent] = useState(0);
  const [nonce, setNonce] = useState(0);
  // The call bar only occupies bottom-center on phones; that is the only time the picker moves to the top.
  const [phone, setPhone] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const on = () => setPhone(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  const pickerRef = useRef<HTMLElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const moveHighlight = useCallback(() => {
    const el = itemRefs.current[current];
    const hl = highlightRef.current;
    if (!el || !hl) return;
    hl.style.width = el.offsetWidth + 'px';
    hl.style.transform = `translateX(${el.offsetLeft}px)`;
  }, [current]);

  const { locale } = useLanguage();

  const setActive = useCallback((i: number) => {
    if (i < 0 || i >= VARIANTS.length) return;
    // Scroll-driven variants pin sections — start each one from the top.
    window.scrollTo(0, 0);
    setCurrent(i);
    setNonce((n) => n + 1);
    const url = new URL(window.location.href);
    url.searchParams.set('v', String(i + 1));
    window.history.replaceState(null, '', url);
  }, []);

  // Initial variant from ?v=, falling back to 1.
  useEffect(() => {
    const v = parseInt(new URLSearchParams(window.location.search).get('v') || '1', 10);
    setCurrent(v >= 1 && v <= VARIANTS.length ? v - 1 : 0);
    setReady(true);
  }, []);

  useLayoutEffect(() => {
    moveHighlight();
  }, [moveHighlight, ready]);

  // Enable the highlight slide only after first paint, so load doesn't animate.
  useEffect(() => {
    if (!ready) return;
    const r = requestAnimationFrame(() => requestAnimationFrame(() => pickerRef.current?.setAttribute('data-ready', '')));
    return () => cancelAnimationFrame(r);
  }, [ready]);

  useEffect(() => {
    window.addEventListener('resize', moveHighlight);
    return () => window.removeEventListener('resize', moveHighlight);
  }, [moveHighlight]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= VARIANTS.length) setActive(num - 1);
      else if (e.key === 'ArrowRight') setActive((current + 1) % VARIANTS.length);
      else if (e.key === 'ArrowLeft') setActive((current - 1 + VARIANTS.length) % VARIANTS.length);
      else if (e.key === 'r' || e.key === 'R') {
        window.scrollTo(0, 0);
        setNonce((n) => n + 1);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [current, setActive]);

  const Active = VARIANTS[current].C;

  return (
    <>
      {/* Re-mount on language change too: the split-letter headlines are rebuilt per locale. */}
      {ready && <Active key={`${current}-${nonce}-${locale}`} />}
      <nav ref={pickerRef} className="proto-picker" data-position={phone ? 'top' : undefined} aria-label="Prototype variants">
        <span ref={highlightRef} className="proto-picker-highlight" aria-hidden="true" />
        {VARIANTS.map((v, i) => (
          <button
            key={v.name}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            type="button"
            className="proto-picker-item"
            data-active={i === current ? '' : undefined}
            aria-current={i === current ? 'true' : undefined}
            onClick={() => setActive(i)}
          >
            {v.name}
          </button>
        ))}
        <span className="proto-picker-divider" aria-hidden="true" />
        <button type="button" className="proto-picker-item proto-picker-replay" aria-label="Replay animation (R)" onClick={() => {
            window.scrollTo(0, 0);
            setNonce((n) => n + 1);
          }}
        >
          ↻
        </button>
      </nav>
    </>
  );
}
