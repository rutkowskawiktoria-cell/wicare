'use client';
// Variant picker — Emil Kowalski's prototype PICKER spec, expressed in React.
// Keys 1–3 / ←→ switch, R replays, ?v= persists. The swap itself is instant.
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Porcelain from './variants/Porcelain';
import Coast from './variants/Coast';
import Concierge from './variants/Concierge';

const VARIANTS = [
  { name: 'Porcelæn', C: Porcelain },
  { name: 'Kystlys', C: Coast },
  { name: 'Concierge', C: Concierge },
];

export default function Harness() {
  const [ready, setReady] = useState(false);
  const [current, setCurrent] = useState(0);
  const [nonce, setNonce] = useState(0);
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

  const setActive = useCallback((i: number) => {
    if (i < 0 || i >= VARIANTS.length) return;
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
      else if (e.key === 'r' || e.key === 'R') setNonce((n) => n + 1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [current, setActive]);

  const Active = VARIANTS[current].C;

  return (
    <>
      {ready && <Active key={`${current}-${nonce}`} />}
      {/* Variants use a bottom-center call bar on phones, so the picker sits at the top. */}
      <nav ref={pickerRef} className="proto-picker" data-position="top" aria-label="Prototype variants">
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
        <button type="button" className="proto-picker-item proto-picker-replay" aria-label="Replay animation (R)" onClick={() => setNonce((n) => n + 1)}>
          ↻
        </button>
      </nav>
    </>
  );
}
