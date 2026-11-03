'use client';
import Link from 'next/link';
import { Sparkles, Wrench, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// Additional services (Nov 2026): cleaning and garden & construction, secondary to private dining.
// t.services.cards keeps the order home / table / estate.
export default function ExtraServices() {
  const { t } = useLanguage();
  const s = t.services;
  const items = [
    { href: '/services/the-home/', Icon: Sparkles, img: '/services/home.webp', ...s.cards[0] },
    { href: '/services/the-estate/', Icon: Wrench, img: '/services/garden.webp', ...s.cards[2] },
  ];
  return (
    <section id="additional" className="py-16 md:py-20 bg-white scroll-mt-20">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-accent-dark text-xs tracking-widest uppercase font-semibold mb-3">{s.extraBadge}</p>
          <h2 className="font-serif text-3xl md:text-4xl text-primary font-semibold">{s.extraHeading}</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">{s.extraSub}</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {items.map(({ href, Icon, img, subtitle, desc }) => (
            <Link key={href} href={href} className="group flex gap-5 items-start rounded-2xl border border-primary/10 p-5 hover:border-accent hover:shadow-lg transition-all">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt={subtitle} loading="lazy" decoding="async" className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover shrink-0" width={224} height={224} />
              <div className="min-w-0">
                <h3 className="font-serif text-xl text-primary font-semibold flex items-center gap-2">
                  <Icon size={18} className="text-accent-dark shrink-0" />
                  {subtitle}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mt-2">{desc}</p>
                <span className="inline-flex items-center gap-1.5 text-accent-dark text-xs font-semibold uppercase tracking-wider mt-3 group-hover:gap-2.5 transition-all">
                  {s.learnMore} <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
        <p className="text-center mt-8">
          <Link href="/erhvervsrengoering/" className="text-accent-dark font-semibold hover:text-primary transition-colors">
            {s.bizLink} →
          </Link>
        </p>
      </div>
    </section>
  );
}
