'use client';
import { useState } from 'react';
import { Mail, Plus, Minus, X, Copy, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { critidaProducts } from '@/lib/partners';

export default function Partners() {
  const { t, locale } = useLanguage();
  const p = t.partners;
  const [qty, setQty] = useState<Record<string, number>>({});
  const [showSend, setShowSend] = useState(false);
  const [copied, setCopied] = useState(false);

  const setQ = (name: string, n: number) =>
    setQty((prev) => {
      const next = { ...prev };
      if (n <= 0) delete next[name];
      else next[name] = Math.min(n, 99);
      return next;
    });

  const items = Object.entries(qty); // [name, count][]
  const totalUnits = items.reduce((s, [, n]) => s + n, 0);

  const TO = 'wicareaps@gmail.com';
  const orderList = items.map(([n, c]) => `- ${c} × ${n}`).join('\n');
  const bodyText = p.emailBody
    .replace('Product(s):', `Product(s):\n${orderList}`)
    .replace('Produkt(er):', `Produkt(er):\n${orderList}`);

  const mailtoHref = `mailto:${TO}?subject=${encodeURIComponent(p.emailSubject)}&body=${encodeURIComponent(bodyText)}`;
  const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(TO)}&su=${encodeURIComponent(p.emailSubject)}&body=${encodeURIComponent(bodyText)}`;

  const copyOrder = async () => {
    const text = `To: ${TO}\nSubject: ${p.emailSubject}\n\n${bodyText}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <section className="bg-primary pt-20 pb-14" style={{ paddingTop: '6.5rem' }}>
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <p className="text-accent text-xs tracking-widest uppercase font-semibold mb-3">{p.badge}</p>
            <h1 className="font-serif text-4xl md:text-5xl text-white font-semibold mb-5 break-words">{p.heading}</h1>
            <p className="text-white/75 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">{p.intro}</p>
          </div>
          <div className="max-w-4xl mx-auto px-6 lg:px-8 mt-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/partners/critida/banner.png" alt="Critida — Cretan olive oil and delicacies" className="w-full rounded-2xl shadow-xl" width={1600} height={600} />
          </div>
        </section>

        <section className="py-16 pb-44">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl text-primary font-semibold mb-3">{p.productsTitle}</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">{p.productsIntro}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {critidaProducts.map((prod) => {
                const q = qty[prod.name] || 0;
                return (
                  <div key={prod.name} className={`bg-light rounded-2xl overflow-hidden shadow-md transition-all duration-300 flex flex-col ${q > 0 ? 'ring-2 ring-accent' : 'hover:shadow-xl'}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={prod.img} alt={prod.name} className="w-full aspect-square object-cover" width={600} height={600} />
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-serif text-xl text-primary font-semibold mb-2 break-words">{prod.name}</h3>
                      <p className="text-gray-600 text-base leading-relaxed mb-5 break-words flex-1">{prod[locale]}</p>
                      {q === 0 ? (
                        <button
                          type="button"
                          onClick={() => setQ(prod.name, 1)}
                          className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-deep text-black font-semibold px-5 py-3 rounded-full transition-all duration-200 text-sm tracking-wide uppercase"
                        >
                          <Plus size={16} />{p.add}
                        </button>
                      ) : (
                        <div className="flex items-center justify-between bg-primary text-white rounded-full px-2 py-1.5">
                          <button type="button" onClick={() => setQ(prod.name, q - 1)} aria-label="Decrease" className="w-9 h-9 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors">
                            <Minus size={18} />
                          </button>
                          <span className="font-bold text-lg tabular-nums">{q}</span>
                          <button type="button" onClick={() => setQ(prod.name, q + 1)} aria-label="Increase" className="w-9 h-9 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors">
                            <Plus size={18} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-gray-500 text-sm text-center mt-10 max-w-2xl mx-auto leading-relaxed">{p.note}</p>
          </div>
        </section>
      </main>

      {/* Selection / order bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-primary/95 backdrop-blur-md border-t border-white/10 shadow-2xl">
        <div className="max-w-6xl mx-auto px-5 py-4 flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <p className="text-white font-semibold text-sm mb-0.5">{p.selectedTitle} · {totalUnits} {totalUnits === 1 ? p.unit : p.units}</p>
            <p className="text-white/60 text-xs truncate">
              {items.length ? items.map(([n, c]) => `${c}× ${n}`).join('  ·  ') : p.empty}
            </p>
          </div>
          {items.length > 0 && (
            <button type="button" onClick={() => setQty({})} className="text-white/60 hover:text-white text-xs inline-flex items-center gap-1 shrink-0">
              <X size={14} />{p.clear}
            </button>
          )}
          <button
            type="button"
            onClick={() => items.length && setShowSend(true)}
            disabled={items.length === 0}
            className={`inline-flex items-center justify-center gap-2 font-bold px-7 py-3.5 rounded-full text-sm tracking-wide uppercase shrink-0 transition-all ${items.length ? 'bg-accent hover:bg-accent-deep text-black' : 'bg-white/15 text-white/40 cursor-not-allowed'}`}
          >
            <Mail size={18} />{p.send}
          </button>
        </div>
      </div>

      {/* Send options modal */}
      {showSend && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowSend(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-7 relative" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setShowSend(false)} aria-label={p.close} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
              <X size={22} />
            </button>
            <h3 className="font-serif text-2xl text-primary font-semibold mb-2 pr-8">{p.sendTitle}</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-5">{p.sendHint}</p>

            <div className="bg-light rounded-xl p-4 mb-6 max-h-40 overflow-y-auto">
              {items.map(([n, c]) => (
                <div key={n} className="flex justify-between text-sm text-gray-800 py-0.5">
                  <span className="break-words pr-3">{n}</span>
                  <span className="font-semibold tabular-nums shrink-0">× {c}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={gmailHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-deep text-black font-bold px-6 py-3.5 rounded-full transition-all text-sm tracking-wide uppercase"
              >
                <ExternalLink size={17} />{p.gmail}
              </a>
              <a
                href={mailtoHref}
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white font-semibold px-6 py-3.5 rounded-full transition-all text-sm tracking-wide uppercase"
              >
                <Mail size={17} />{p.mailApp}
              </a>
              <button
                type="button"
                onClick={copyOrder}
                className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-accent text-gray-700 font-semibold px-6 py-3 rounded-full transition-all text-sm tracking-wide uppercase"
              >
                <Copy size={16} />{copied ? p.copied : p.copyOrder}
              </button>
            </div>

            <p className="text-gray-400 text-xs text-center mt-5 break-words">{TO}</p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
