'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// Main offer (Nov 2026): WiCare is first and foremost a private chef & catering business.
// Three dining offers with real event photos; cleaning + garden live in ExtraServices.tsx.
const diningMeta = [
  { href: '/services/the-table/', img: '/services/dining-event.webp' },
  { href: '/firmacatering/', img: '/services/dining-spread.webp' },
  { href: '/selskaber/', img: '/services/dining-seafood.webp' },
];

export default function Services() {
  const { t } = useLanguage();
  const s = t.services;
  return (
    <section id="services" className="section-padding bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <p className="text-accent-dark text-xs tracking-widest uppercase font-semibold mb-3">{s.sectionBadge}</p>
          <h2 className="font-serif text-4xl md:text-5xl text-primary font-semibold">{s.heading}</h2>
          <p className="text-gray-600 text-lg leading-relaxed mt-5">{s.subheading}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {s.dining.map((d, i) => (
            <Link
              key={d.title}
              href={diningMeta[i].href}
              className={`group relative rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${i === 0 ? 'bg-primary text-white shadow-xl' : 'bg-light text-primary shadow-md'}`}
            >
              <div className="relative h-64 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={diningMeta[i].img} alt={d.title} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" width={800} height={600} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h3 className={`font-serif text-2xl font-semibold mb-3 ${i === 0 ? 'text-white' : 'text-primary'}`}>{d.title}</h3>
                <p className={`text-base leading-relaxed mb-6 flex-1 ${i === 0 ? 'text-white/85' : 'text-gray-600'}`}>{d.desc}</p>
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider group-hover:gap-2.5 transition-all ${i === 0 ? 'text-accent' : 'text-accent-dark'}`}>
                  {s.learnMore} <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
