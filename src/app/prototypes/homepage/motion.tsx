'use client';
// Motion helpers shared by the bold directions: Lenis smooth scroll wired to GSAP's
// ticker, React-safe text splitting, magnetic elements and a custom cursor.
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const finePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Inertial wheel scrolling (touch stays native). Anchor links scroll smoothly with a nav offset. */
export function useSmoothScroll() {
  useEffect(() => {
    if (reducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, anchors: { offset: -80 } });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}

/**
 * Splits text into per-character spans that React owns (unlike SplitText, which mutates
 * the DOM behind React's back). Screen readers get the plain text once.
 */
export function Chars({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(' ');
  let n = 0;
  return (
    <span className={`fx-split ${className}`}>
      <span className="fx-sr">{text}</span>
      <span aria-hidden="true">
        {words.map((w, wi) => (
          <span key={wi} className="fx-word">
            {Array.from(w).map((ch, ci) => (
              <span key={ci} className="fx-ch-mask">
                <span className="ch" style={{ '--n': n++ } as React.CSSProperties}>
                  {ch}
                </span>
              </span>
            ))}
            {wi < words.length - 1 ? <span className="fx-space"> </span> : null}
          </span>
        ))}
      </span>
    </span>
  );
}

export function Words({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <span className={`fx-split ${className}`}>
      <span className="fx-sr">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={i} className="w">
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
    </span>
  );
}

/** Elements with [data-magnetic] drift toward the cursor and spring back. Fine pointers only. */
export function useMagnetic(root: React.RefObject<HTMLElement | null>, strength = 0.35) {
  useEffect(() => {
    const el = root.current;
    if (!el || !finePointer() || reducedMotion()) return;
    const targets = Array.from(el.querySelectorAll<HTMLElement>('[data-magnetic]'));
    const offs = targets.map((t) => {
      const xTo = gsap.quickTo(t, 'x', { duration: 0.5, ease: 'power3.out' });
      const yTo = gsap.quickTo(t, 'y', { duration: 0.5, ease: 'power3.out' });
      const move = (e: PointerEvent) => {
        const r = t.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };
      t.addEventListener('pointermove', move);
      t.addEventListener('pointerleave', leave);
      return () => {
        t.removeEventListener('pointermove', move);
        t.removeEventListener('pointerleave', leave);
        gsap.set(t, { x: 0, y: 0 });
      };
    });
    return () => offs.forEach((f) => f());
  }, [root, strength]);
}

/** A dot + ring cursor. The ring grows over links and shows a short label from [data-cursor]. */
export function Cursor({ className = '' }: { className?: string }) {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!finePointer() || reducedMotion() || !dot.current || !ring.current) return;
    document.documentElement.classList.add('fx-has-cursor');
    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.08, ease: 'power3.out' });
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.08, ease: 'power3.out' });
    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3.out' });
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3.out' });
    const move = (e: PointerEvent) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>('a, button, [data-cursor], input, textarea, select');
      const r = ring.current!;
      if (t) {
        r.dataset.active = '';
        if (label.current) label.current.textContent = t.dataset.cursor || '';
        if (t.dataset.cursor) r.dataset.labelled = '';
        else delete r.dataset.labelled;
      } else {
        delete r.dataset.active;
        delete r.dataset.labelled;
        if (label.current) label.current.textContent = '';
      }
    };
    const leave = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.2 });
    const enter = () => gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.2 });
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    document.addEventListener('pointerenter', enter);
    return () => {
      document.documentElement.classList.remove('fx-has-cursor');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      document.removeEventListener('pointerenter', enter);
    };
  }, []);
  return (
    <>
      <div ref={ring} className={`fx-cursor-ring ${className}`} aria-hidden="true">
        <i className="fx-cursor-circle" />
        <span ref={label} />
      </div>
      <div ref={dot} className={`fx-cursor-dot ${className}`} aria-hidden="true" />
    </>
  );
}
