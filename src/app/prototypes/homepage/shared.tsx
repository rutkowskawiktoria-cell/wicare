'use client';
// Structure shared by all three directions. Each direction styles these
// class names under its own root (.pz / .kl / .cc) — no visual opinions here.
import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { copy, EMAIL, PHONE, TEL, towns, wa } from './copy';

// Same key as the live ContactForm: empty = open a pre-filled Gmail compose to hello@.
const WEB3FORMS_KEY = '';

export function useCopy() {
  const { locale, setLocale } = useLanguage();
  const c = copy[locale === 'en' ? 'en' : 'da'];
  return { c, locale, toggleLocale: () => setLocale(locale === 'da' ? 'en' : 'da') };
}

/** The WiCare wordmark, identical to the live navbar (Inter bold, "Care" in steel blue). */
export function Wordmark({ tone }: { tone: 'onLight' | 'onDark' }) {
  return (
    <span className="wm" data-tone={tone}>
      Wi<span className="wm-care">Care</span>
    </span>
  );
}

function useScrolled(threshold: number) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      setScrolled(window.scrollY > threshold);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [threshold]);
  return scrolled;
}

export function ProtoNav({ tone }: { tone: 'onLight' | 'onDark' }) {
  const { c, toggleLocale } = useCopy();
  const scrolled = useScrolled(24);
  return (
    <header className="pn" data-scrolled={scrolled || undefined}>
      <div className="pn-inner">
        <a href="#booking" className="pn-brand" aria-label="WiCare ApS">
          <Wordmark tone={tone} />
        </a>
        <nav className="pn-links" aria-label="Sektioner">
          <a href="#services">{c.nav.services}</a>
          <a href="#trust">{c.nav.why}</a>
          <a href="#testimonials">{c.nav.reviews}</a>
          <a href="#contact">{c.nav.contact}</a>
        </nav>
        <div className="pn-end">
          <button type="button" className="pn-lang" onClick={toggleLocale} aria-label={c.nav.langAria}>
            {c.nav.lang}
          </button>
          <a href={TEL} className="pn-call">
            <span className="pn-call-label">{c.nav.call}</span>
            <span className="pn-call-num">{PHONE}</span>
          </a>
        </div>
      </div>
    </header>
  );
}

/** Thumb-zone call/WhatsApp bar on phones, shown once the hero's own buttons scroll away. */
export function MobileBar() {
  const { c } = useCopy();
  const [show, setShow] = useState(false);
  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      setShow(window.scrollY > window.innerHeight * 0.7);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="pmb" data-show={show || undefined} aria-hidden={!show}>
      <a href={TEL} className="pmb-call" tabIndex={show ? 0 : -1}>
        {c.mobile.call} <span>{PHONE}</span>
      </a>
      <a href={wa(c.waMsg)} target="_blank" rel="noopener noreferrer" className="pmb-wa" tabIndex={show ? 0 : -1}>
        {c.mobile.whatsapp}
      </a>
    </div>
  );
}

type Field = 'name' | 'email' | 'phone' | 'service' | 'message';

/** Same behaviour as the live ContactForm (Web3Forms → Gmail compose fallback, honeypot), with visible labels. */
export function ProtoContactForm({ serviceIndex = 0 }: { serviceIndex?: number }) {
  const { c } = useCopy();
  const f = c.contact;
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
  const [trap, setTrap] = useState('');
  const [form, setForm] = useState<Record<Field, string>>({
    name: '',
    email: '',
    phone: '',
    service: f.serviceOptions[serviceIndex] ?? f.serviceOptions[0],
    message: '',
  });

  // Keep the chosen service in sync when another section preselects one, or the language flips.
  useEffect(() => {
    setForm((p) => ({ ...p, service: f.serviceOptions[serviceIndex] ?? f.serviceOptions[0] }));
  }, [serviceIndex, f.serviceOptions]);

  const set = (k: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (trap) {
      setStatus('ok');
      return;
    }
    if (!WEB3FORMS_KEY) {
      const body = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${form.service}\n\n${form.message}`;
      const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent('Consultation request — ' + form.name)}&body=${encodeURIComponent(body)}`;
      window.open(url, '_blank', 'noopener');
      setStatus('ok');
      return;
    }
    try {
      setStatus('sending');
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: 'New consultation request — WiCare', from_name: 'WiCare website', ...form }),
      });
      const data = await res.json();
      setStatus(data.success ? 'ok' : 'err');
    } catch {
      setStatus('err');
    }
  };

  if (status === 'ok') {
    return (
      <p className="pf-success" role="status">
        {f.success}
      </p>
    );
  }

  return (
    <form className="pf" onSubmit={submit}>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} aria-hidden="true" className="pf-trap" />
      <div className="pf-row">
        <label className="pf-field">
          <span className="pf-label">{f.name}</span>
          <input className="pf-input" required autoComplete="name" value={form.name} onChange={set('name')} />
        </label>
        <label className="pf-field">
          <span className="pf-label">{f.email}</span>
          <input className="pf-input" required type="email" autoComplete="email" value={form.email} onChange={set('email')} />
        </label>
      </div>
      <div className="pf-row">
        <label className="pf-field">
          <span className="pf-label">{f.phone}</span>
          <input className="pf-input" type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} />
        </label>
        <label className="pf-field">
          <span className="pf-label">{f.service}</span>
          <select className="pf-input pf-select" value={form.service} onChange={set('service')}>
            {f.serviceOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="pf-field">
        <span className="pf-label">{f.message}</span>
        <textarea className="pf-input pf-textarea" required rows={4} value={form.message} onChange={set('message')} />
      </label>
      <button type="submit" className="pf-submit" disabled={status === 'sending'}>
        {status === 'sending' ? f.sending : f.send}
      </button>
      {status === 'err' && (
        <p className="pf-error" role="alert">
          {f.error}
        </p>
      )}
    </form>
  );
}

export function ProtoFooter() {
  const { c } = useCopy();
  return (
    <footer className="pft">
      <div className="pft-inner">
        <div className="pft-brand">
          <Wordmark tone="onDark" />
          <p className="pft-tagline">{c.footer.tagline}</p>
        </div>
        <div className="pft-contact">
          <a href={TEL}>{PHONE}</a>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a href={wa(c.waMsg)} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </div>
        <nav className="pft-areas" aria-label={c.footer.areas}>
          <p className="pft-heading">{c.footer.areas}</p>
          <ul>
            {towns.map((t) => (
              <li key={t.slug}>
                <a href={`/omraader/${t.slug}/`}>{t.name}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="pft-base">
          <ul className="pft-links">
            {c.footer.links.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
          <p className="pft-legal">
            {c.footer.copyright} · {c.footer.cvr}
          </p>
        </div>
      </div>
    </footer>
  );
}
