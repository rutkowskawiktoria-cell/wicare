'use client';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// "Mød kokken" — WiCare's chef, Wiktoria R. Claims: 13+ years (owner-confirmed Sept 2026),
// Michelin-starred restaurants, and sous-chef at the Danish Parliament (her own public Instagram
// bio @wiki.foodie, Nov 2026). Never "Michelin-star chef".
// PORTRAIT: set to e.g. '/chef-wiktoria.webp' once a real photo of her exists — until then the
// "WR" monogram is shown. INSTAGRAM: only link it once the account is public (it is private now,
// so visitors would just see "This profile is private").
const PORTRAIT: string | null = null;
const INSTAGRAM: string | null = null; // 'https://www.instagram.com/wiki.foodie/'

export const chefCopy = {
  da: {
    badge: 'Mød kokken',
    name: 'Wiktoria R.',
    role: 'Privat kok hos WiCare',
    text: 'Wiktoria har mere end 13 års erfaring fra professionelle køkkener – bl.a. som souschef i Folketinget og i Michelin-restauranter. Hos WiCare tager hun fine dining med hjem til dig og sammensætter hver menu ud fra jeres smag, anledningen og eventuelle kostbehov.',
    facts: [
      { big: '13+ år', small: 'i professionelle køkkener' },
      { big: 'Souschef', small: 'i Folketinget' },
      { big: 'Michelin', small: 'erfaring fra stjernekøkkener' },
    ],
    instagram: 'Følg Wiktoria på Instagram',
  },
  en: {
    badge: 'Meet the chef',
    name: 'Wiktoria R.',
    role: 'Private chef at WiCare',
    text: 'Wiktoria has more than 13 years of experience in professional kitchens – including as sous-chef at the Danish Parliament and in Michelin-starred restaurants. At WiCare she brings fine dining to your home, designing every menu around your taste, the occasion and any dietary needs.',
    facts: [
      { big: '13+ years', small: 'in professional kitchens' },
      { big: 'Sous-chef', small: 'at the Danish Parliament' },
      { big: 'Michelin', small: 'starred-kitchen experience' },
    ],
    instagram: 'Follow Wiktoria on Instagram',
  },
};

export default function ChefIntro({ tone = 'light' }: { tone?: 'light' | 'white' }) {
  const { locale } = useLanguage();
  const c = chefCopy[locale === 'da' ? 'da' : 'en'];
  const chip = tone === 'light' ? 'bg-white' : 'bg-light';
  return (
    <section className={`py-16 md:py-20 ${tone === 'light' ? 'bg-light' : 'bg-white'}`} aria-labelledby="chef-h">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8 md:gap-12 text-center md:text-left">
        {PORTRAIT ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={PORTRAIT} alt={c.name} loading="lazy" decoding="async" width={320} height={400} className="shrink-0 w-48 h-60 md:w-64 md:h-80 rounded-2xl object-cover shadow-xl ring-4 ring-accent/20" />
        ) : (
          <div className="shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-full bg-primary flex items-center justify-center shadow-xl ring-4 ring-accent/30" aria-hidden="true">
            <span className="font-serif text-4xl md:text-5xl text-white">WR</span>
          </div>
        )}
        <div className="min-w-0">
          <p className="text-accent-dark text-xs tracking-widest uppercase font-semibold mb-2">{c.badge}</p>
          <h2 id="chef-h" className="font-serif text-3xl md:text-4xl text-primary font-semibold">{c.name}</h2>
          <p className="text-gray-500 mt-1">{c.role}</p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">{c.text}</p>
          <ul className="grid grid-cols-3 gap-2 sm:gap-3 mt-6">
            {c.facts.map((f) => (
              <li key={f.big} className={`${chip} rounded-xl border border-primary/10 px-2 py-3 sm:px-4 text-center md:text-left`}>
                <span className="block font-serif text-lg sm:text-xl text-primary font-semibold leading-tight">{f.big}</span>
                <span className="block text-[11px] sm:text-xs text-gray-500 mt-1 leading-snug">{f.small}</span>
              </li>
            ))}
          </ul>
          {INSTAGRAM && (
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="inline-block mt-5 text-accent-dark font-semibold hover:text-primary transition-colors">
              {c.instagram} →
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
