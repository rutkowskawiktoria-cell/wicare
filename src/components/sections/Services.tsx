'use client';
import Link from 'next/link';
import { Sparkles, ChefHat, Wrench, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const serviceMeta = [
  { slug: 'the-home', icon: Sparkles, img: '/services/home.webp', highlight: true },
  { slug: 'the-table', icon: ChefHat, img: '/services/dining.webp' },
  { slug: 'the-estate', icon: Wrench, img: '/services/garden.webp' },
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
          {services.map(({ slug, icon: Icon, img, title, desc, highlight }) => (
            <Link key={title} href={`/services/${slug}`} className={`group relative rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${highlight ? 'bg-primary text-white shadow-xl' : 'bg-light text-primary shadow-md hover:shadow-xl'}`}>
              <div className="relative h-52 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={title} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" width={800} height={520} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                {highlight && <div className="absolute top-4 right-4 bg-accent text-primary text-xs font-semibold px-3 py-1 rounded-full">{t.services.flagship}</div>}
                <div className="absolute bottom-3 left-4 w-11 h-11 rounded-xl bg-primary/85 backdrop-blur-sm flex items-center justify-center">
                  <Icon size={22} className="text-accent" />
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <h3 className={`font-serif text-2xl font-semibold mb-3 ${highlight ? 'text-white' : 'text-primary'}`}>{title}</h3>
                <p className={`text-base leading-relaxed mb-6 break-words hyphens-auto whitespace-pre-line flex-1 ${highlight ? 'text-white/85' : 'text-gray-600'}`}>{desc}</p>
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider group-hover:underline ${highlight ? 'text-accent' : 'text-accent-dark'}`}>
                  {t.services.learnMore} <ExternalLink size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
