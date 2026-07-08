'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { critidaProducts } from '@/lib/partners';

export default function PartnersTeaser() {
  const { t } = useLanguage();
  const p = t.partners;
  const preview = critidaProducts.slice(0, 4);

  return (
    <section id="partners" className="section-padding bg-light">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-accent-dark text-xs tracking-widest uppercase font-semibold mb-3">{p.teaserBadge}</p>
          <h2 className="font-serif text-3xl md:text-4xl text-primary font-semibold mb-4 break-words">{p.teaserHeading}</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">{p.teaserText}</p>
          <Link href="/partners/" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-deep text-black font-semibold px-7 py-3.5 rounded-full transition-all duration-300 text-sm tracking-wide uppercase shadow-lg">
            {p.teaserCta} <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {preview.map((prod) => (
            <Link key={prod.name} href="/partners/" className="block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={prod.img} alt={prod.name} className="w-full aspect-square object-cover" width={600} height={600} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
