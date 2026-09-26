'use client';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// "Mød kokken" — WiCare's chef, Wiktoria R. (owner-confirmed Sept 2026: she has 13+ years of
// experience incl. Michelin-starred restaurants and the Danish Parliament). No photo yet — the
// monogram is a placeholder; swap in a real portrait (public/chef-wiktoria.webp) when available.
export const chefCopy = {
  da: {
    badge: 'Mød kokken',
    name: 'Wiktoria R.',
    role: 'Kok hos WiCare',
    text: 'Wiktoria har mere end 13 års erfaring fra professionelle køkkener, blandt andet fra Michelin-restauranter og Folketinget. Hos WiCare sammensætter hun menuen ud fra jeres smag, anledningen og eventuelle kostbehov.',
  },
  en: {
    badge: 'Meet the chef',
    name: 'Wiktoria R.',
    role: 'Chef at WiCare',
    text: 'Wiktoria has more than 13 years of experience in professional kitchens, including Michelin-starred restaurants and the Danish Parliament. At WiCare she designs every menu around your taste, the occasion and any dietary needs.',
  },
};

export default function ChefIntro({ tone = 'light' }: { tone?: 'light' | 'white' }) {
  const { locale } = useLanguage();
  const c = chefCopy[locale === 'da' ? 'da' : 'en'];
  return (
    <section className={`py-16 ${tone === 'light' ? 'bg-light' : 'bg-white'}`} aria-labelledby="chef-h">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center gap-8 sm:gap-10 text-center sm:text-left">
        <div className="shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-full bg-primary flex items-center justify-center shadow-xl ring-4 ring-accent/30" aria-hidden="true">
          <span className="font-serif text-4xl md:text-5xl text-white">WR</span>
        </div>
        <div>
          <p className="text-accent-dark text-xs tracking-widest uppercase font-semibold mb-2">{c.badge}</p>
          <h2 id="chef-h" className="font-serif text-3xl md:text-4xl text-primary font-semibold">{c.name}</h2>
          <p className="text-gray-500 mt-1">{c.role}</p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">{c.text}</p>
        </div>
      </div>
    </section>
  );
}
