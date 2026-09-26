'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// Seasonal strip under the hero linking to /julefrokost/. Rendered in the static HTML and hidden
// client-side outside September–December, so it disappears by itself after the season.
// Update the year in the copy (and in src/lib/landings.ts) before next season.
const copy = {
  da: { lead: 'Julefrokost 2026', text: 'Privat kok til firmaets eller familiens julefrokost.', cta: 'Se mere' },
  en: { lead: 'Christmas lunch 2026', text: 'A private chef for your company or family Christmas lunch.', cta: 'Learn more' },
};

export default function SeasonalBanner() {
  const { locale } = useLanguage();
  const [inSeason, setInSeason] = useState(true);
  useEffect(() => {
    const m = new Date().getMonth(); // 0 = January
    setInSeason(m >= 8 && m <= 11);
  }, []);
  if (!inSeason) return null;
  const c = copy[locale === 'da' ? 'da' : 'en'];
  return (
    <div className="bg-accent text-primary">
      <Link href="/julefrokost/" className="block max-w-7xl mx-auto px-6 lg:px-8 py-3 text-center text-sm md:text-base hover:underline underline-offset-4">
        <strong className="font-semibold">{c.lead}</strong>
        <span className="mx-2" aria-hidden="true">·</span>
        {c.text} <span className="font-semibold whitespace-nowrap">{c.cta} →</span>
      </Link>
    </div>
  );
}
