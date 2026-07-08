'use client';
import { Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { critidaProducts } from '@/lib/partners';

export default function Partners() {
  const { t, locale } = useLanguage();
  const p = t.partners;
  const mailtoFor = (product?: string) => {
    const subject = product ? `${p.emailSubject} — ${product}` : p.emailSubject;
    const body = product ? p.emailBody.replace('Product(s):', `Product(s): ${product}`).replace('Produkt(er):', `Produkt(er): ${product}`) : p.emailBody;
    return `mailto:wicareaps@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl text-primary font-semibold mb-3">{p.productsTitle}</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">{p.productsIntro}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {critidaProducts.map((prod) => (
                <div key={prod.name} className="bg-light rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={prod.img} alt={prod.name} className="w-full aspect-square object-cover" width={600} height={600} />
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-serif text-xl text-primary font-semibold mb-2 break-words">{prod.name}</h3>
                    <p className="text-gray-600 text-base leading-relaxed mb-5 break-words flex-1">{prod[locale]}</p>
                    <a href={mailtoFor(prod.name)} className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-deep text-black font-semibold px-5 py-3 rounded-full transition-all duration-300 text-sm tracking-wide uppercase">
                      <Mail size={16} />{p.interest}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-14 bg-light rounded-2xl p-8 text-center max-w-3xl mx-auto">
              <a href={mailtoFor()} className="inline-flex items-center justify-center gap-3 bg-primary hover:bg-secondary text-white font-bold px-8 py-4 rounded-full transition-all duration-300 text-base tracking-wide uppercase shadow-lg">
                <Mail size={20} />{p.interest}
              </a>
              <p className="text-gray-600 text-base mt-5 leading-relaxed">{p.note}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
