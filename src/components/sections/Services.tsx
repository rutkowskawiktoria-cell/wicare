'use client';
import Link from 'next/link';
import { Sparkles, ChefHat, Wrench, ExternalLink } from 'lucide-react';

const services = [
  {
    slug: 'wi-clean',
    icon: Sparkles,
    title: 'WiClean',
    subtitle: 'Executive Home Cleaning',
    desc: 'Premium cleaning for your home and workspace. White-glove service, carefully selected products, flexible scheduling.',
    highlight: true,
  },
  {
    slug: 'wi-cook',
    icon: ChefHat,
    title: 'WiCook',
    subtitle: 'Private Dining & Catering',
    desc: '13+ years Michelin-star expertise. Private chef dinners, corporate catering, exclusive events.',
  },
  {
    slug: 'wi-help',
    icon: Wrench,
    title: 'WiHelp',
    subtitle: 'Property & Lifestyle Care',
    desc: 'Gardening, construction, handyman services, pet care, and plant expertise. One trusted partner for everything.',
  },
];

export default function Services() {
  return (
    <section id="services" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-accent text-xs tracking-widest uppercase font-medium mb-3">Our Services</p>
          <h2 className="font-serif text-4xl md:text-5xl text-primary font-semibold">What We Offer</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map(({ slug, icon: Icon, title, subtitle, desc, highlight }) => (
            <Link key={title} href={`/services/${slug}`} className={`group relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${highlight ? 'bg-primary text-white shadow-xl' : 'bg-light text-primary shadow-md hover:shadow-xl'}`}>
              {highlight && <div className="absolute top-4 right-4 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">Flagship</div>}
              
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${highlight ? 'bg-accent/20' : 'bg-white'}`}>
                <Icon size={28} className="text-accent" />
              </div>

              <div className="mb-4">
                <h3 className={`font-serif text-2xl font-semibold mb-1 ${highlight ? 'text-white' : 'text-primary'}`}>{title}</h3>
                <p className="text-accent text-xs font-medium uppercase tracking-wider">{subtitle}</p>
              </div>

              <p className={`text-base leading-relaxed mb-6 ${highlight ? 'text-white/85' : 'text-gray-600'}`}>{desc}</p>

              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent group-hover:underline`}>
                Learn More <ExternalLink size={12} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
