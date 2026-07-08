'use client';
import { Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function FaqPage() {
  const { t } = useLanguage();
  const f = t.faq;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <section className="bg-primary pt-20 pb-16" style={{ paddingTop: '6.5rem' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <p className="text-accent text-xs tracking-widest uppercase font-semibold mb-3">{f.badge}</p>
            <h1 className="font-serif text-4xl md:text-5xl text-white font-semibold mb-5">{f.heading}</h1>
            <p className="text-white/75 text-lg md:text-xl leading-relaxed">{f.intro}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 space-y-4">
            {f.items.map((item) => (
              <details key={item.q} className="group bg-light rounded-2xl px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-serif text-lg md:text-xl text-primary font-semibold">
                  {item.q}
                  <Plus size={22} className="text-accent-dark shrink-0 transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <p className="text-gray-700 text-base leading-relaxed mt-4 break-words">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
