'use client';
import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { track } from '@/lib/track';

// To enable direct submissions (no email client needed), create a free access
// key at https://web3forms.com and paste it below. Until then, the form opens a
// pre-filled Gmail compose window as a fallback.
const WEB3FORMS_KEY = '';

type Field = 'name' | 'email' | 'phone' | 'service' | 'message';

export default function ContactForm() {
  const { t } = useLanguage();
  const f = t.contactForm;
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
  const [form, setForm] = useState<Record<Field, string>>({ name: '', email: '', phone: '', service: f.serviceOptions[0], message: '' });

  const set = (k: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const [trap, setTrap] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (trap) { setStatus('ok'); return; } // honeypot: silently drop bots
    track('contact_form', 'generate_lead');

    if (!WEB3FORMS_KEY) {
      const body = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${form.service}\n\n${form.message}`;
      const url = `https://mail.google.com/mail/?view=cm&fs=1&to=wicareaps@gmail.com&su=${encodeURIComponent('Consultation request — ' + form.name)}&body=${encodeURIComponent(body)}`;
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

  const inputCls = 'w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none transition';

  return (
    <section id="contact" className="section-padding bg-light">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-accent-dark text-xs tracking-widest uppercase font-semibold mb-3">{f.badge}</p>
          <h2 className="font-serif text-3xl md:text-4xl text-primary font-semibold mb-3">{f.heading}</h2>
          <p className="text-gray-600 text-lg leading-relaxed">{f.intro}</p>
        </div>

        {status === 'ok' ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-md">
            <CheckCircle2 size={44} className="text-accent-dark mx-auto mb-4" />
            <p className="text-primary text-lg font-medium">{f.success}</p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <input type="text" name="company" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} aria-hidden="true" className="hidden" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input required aria-label={f.name} placeholder={f.name} value={form.name} onChange={set('name')} className={inputCls} />
              <input required type="email" aria-label={f.email} placeholder={f.email} value={form.email} onChange={set('email')} className={inputCls} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input aria-label={f.phone} placeholder={f.phone} value={form.phone} onChange={set('phone')} className={inputCls} />
              <select aria-label={f.service} value={form.service} onChange={set('service')} className={inputCls}>
                {f.serviceOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <textarea required aria-label={f.message} placeholder={f.message} value={form.message} onChange={set('message')} rows={5} className={inputCls} />
            <button type="submit" disabled={status === 'sending'} className="w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-deep text-primary font-bold px-8 py-4 rounded-full transition-all text-base tracking-wide uppercase shadow-lg disabled:opacity-60">
              <Send size={18} />{status === 'sending' ? f.sending : f.send}
            </button>
            {status === 'err' && <p className="text-red-600 text-sm text-center">{f.error}</p>}
          </form>
        )}
      </div>
    </section>
  );
}
