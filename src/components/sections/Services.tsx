'use client';
import Link from 'next/link';
import { Sparkles, ChefHat, Wrench, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const serviceMeta = [
  { slug: 'the-home', icon: Sparkles, highlight: true },
  { slug: 'the-table', icon: ChefHat },
  { slug: 'the-estate', icon: Wrench },
];

export default function Services() {
  const { t } = useLanguage();
  const services = serviceMeta.map((s, i) => ({ ...s, title: t.services.cards[i].subtitle, desc: t.services.cards[i].desc }));
  return (
    <section id="services" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-accent-dark text-xs tracking-widest uppercase font-semibold mb-3">{t.services.sectionBadge}</p>
          <h2 className="font-serif text-4xl md:text-5xl text-primary font-semibold">{t.services.heading}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map(({ slug, icon: Icon, title, desc, highlight }) => (
            <Link key={title} href={`/services/${slug}`} className={`group relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${highlight ? 'bg-primary text-white shadow-xl' : 'bg-light text-primary shadow-md hover:shadow-xl'}`}>
              {highlight && <div className="absolute top-4 right-4 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">{t.services.flagship}</div>}
              
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${highlight ? 'bg-accent/20' : 'bg-white'}`}>
                <Icon size={28} className="text-accent" />
              </div>

              <div className="mb-4">
                <h3 className={`font-serif text-2xl font-semibold ${highlight ? 'text-white' : 'text-primary'}`}>{title}</h3>
              </div>

              <p className={`text-base leading-relaxed mb-6 break-words hyphens-auto whitespace-pre-line ${highlight ? 'text-white/85' : 'text-gray-600'}`}>{desc}</p>

              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider group-hover:underline ${highlight ? 'text-accent' : 'text-accent-dark'}`}>
                {t.services.learnMore} <ExternalLink size={12} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
