'use client';
import { useState } from 'react';
import { Mail, Plus, Check, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { critidaProducts } from '@/lib/partners';

export default function Partners() {
  const { t, locale } = useLanguage();
  const p = t.partners;
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (name: string) =>
    setSelected((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));

  const mailto = () => {
    const list = selected.length ? selected.map((s) => `- ${s}`).join('\n') : '';
    const body = p.emailBody
      .replace('Product(s):', `Product(s):\n${list}`)
      .replace('Produkt(er):', `Produkt(er):\n${list}`);
    return `mailto:wicareaps@gmail.com?subject=${encodeURIComponent(p.emailSubject)}&body=${encodeURIComponent(body)}`;
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

        <section className="py-16 pb-40">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl text-primary font-semibold mb-3">{p.productsTitle}</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">{p.productsIntro}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {critidaProducts.map((prod) => {
                const isSel = selected.includes(prod.name);
                return (
                  <div key={prod.name} className={`bg-light rounded-2xl overflow-hidden shadow-md transition-all duration-300 flex flex-col ${isSel ? 'ring-2 ring-accent' : 'hover:shadow-xl'}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={prod.img} alt={prod.name} className="w-full aspect-square object-cover" width={600} height={600} />
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-serif text-xl text-primary font-semibold mb-2 break-words">{prod.name}</h3>
                      <p className="text-gray-600 text-base leading-relaxed mb-5 break-words flex-1">{prod[locale]}</p>
                      <button
                        type="button"
                        onClick={() => toggle(prod.name)}
                        className={`inline-flex items-center justify-center gap-2 font-semibold px-5 py-3 rounded-full transition-all duration-200 text-sm tracking-wide uppercase ${isSel ? 'bg-primary text-white hover:bg-secondary' : 'bg-accent hover:bg-accent-deep text-black'}`}
                      >
                        {isSel ? <><Check size={16} />{p.added}</> : <><Plus size={16} />{p.add}</>}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-gray-500 text-sm text-center mt-10 max-w-2xl mx-auto leading-relaxed">{p.note}</p>
          </div>
        </section>
      </main>

      {/* Selection bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-primary/95 backdrop-blur-md border-t border-white/10 shadow-2xl">
        <div className="max-w-6xl mx-auto px-5 py-4 flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <p className="text-white font-semibold text-sm mb-0.5">{p.selectedTitle} ({selected.length})</p>
            <p className="text-white/60 text-xs truncate">
              {selected.length ? selected.join(' · ') : p.empty}
            </p>
          </div>
          {selected.length > 0 && (
            <button type="button" onClick={() => setSelected([])} className="text-white/60 hover:text-white text-xs inline-flex items-center gap-1 shrink-0">
              <X size={14} />{p.clear}
            </button>
          )}
          <a
            href={mailto()}
            aria-disabled={selected.length === 0}
            className={`inline-flex items-center justify-center gap-2 font-bold px-7 py-3.5 rounded-full text-sm tracking-wide uppercase shrink-0 transition-all ${selected.length ? 'bg-accent hover:bg-accent-deep text-black' : 'bg-white/15 text-white/40 pointer-events-none'}`}
          >
            <Mail size={18} />{p.send}
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
