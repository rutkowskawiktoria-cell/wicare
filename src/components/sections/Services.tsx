'use client';
import Link from 'next/link';
import { Sparkles, ChefHat, Wrench, Dog, Leaf, CheckCircle2, ExternalLink, Car, Shirt, Flower2, Smartphone } from 'lucide-react';

const wicleanExtras = [
  { icon: Car, name: 'WiShine', subtitle: 'Vehicle Detailing' },
  { icon: Shirt, name: 'WiWardrobe', subtitle: 'Garment & Shoe Valet' },
  { icon: Flower2, name: 'WiScent', subtitle: 'Ambient Atmosphere' },
  { icon: Smartphone, name: 'WiDevice', subtitle: 'Tech Sanitization' },
];

const services = [
  {
    slug: 'wi-clean',
    icon: Sparkles,
    title: 'WiClean',
    subtitle: 'Executive Home Cleaning',
    desc: 'Premium residential cleaning for CEOs and industry leaders. Discreet, meticulous, and tailored to the highest standards of luxury living.',
    features: ['Private residences & estates', 'CEO-ready workspaces', 'White-glove finish', 'Smart product selection'],
    highlight: true,
    hasSubs: true,
  },
  {
    slug: 'wi-cook',
    icon: ChefHat,
    title: 'WiCook',
    subtitle: 'Private Dining & Catering',
    desc: '13+ years of Michelin-star and Danish Parliament culinary expertise. Private chef experiences, exclusive dinner parties, and executive catering.',
    features: ['Private chef dining', 'Corporate catering', 'Michelin pedigree', 'Bespoke menus'],
  },
  {
    slug: 'wi-help',
    icon: Wrench,
    title: 'WiHelp',
    subtitle: 'Premier Property Care',
    desc: 'Expert gardening, construction, and handyman services. Skilled professionals for every property need — from rooftop terraces to basement renovations.',
    features: ['Landscaping & gardening', 'Construction projects', 'Handyman services', 'Property maintenance'],
  },
  {
    slug: 'wi-paws',
    icon: Dog,
    title: 'WiPaws',
    subtitle: 'Elite Pet Valet',
    desc: 'Premium walks with full hygiene care. Paws wiped, water refreshed, and a photo update sent straight to your phone.',
    features: ['Brisk neighborhood walk', 'Paw wiping & hygiene', 'Hydration refill', 'Photo proof of life'],
  },
  {
    slug: 'wi-green',
    icon: Leaf,
    title: 'WiGreen',
    subtitle: 'Architectural Botanical Care',
    desc: 'Expert care for luxury indoor plants. Leaf dusting, soil moisture checks, precision watering, dead leaf removal, and rotation for even sunlight.',
    features: ['Leaf dusting & cleaning', 'Moisture meter check', 'Precision watering', 'Aesthetic pruning'],
  },
];

export default function Services() {
  return (
    <section id="services" className="section-padding bg-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-accent text-xs tracking-widest uppercase font-medium mb-3">Our Services</p>
          <h2 className="font-serif text-4xl md:text-5xl text-primary font-semibold mb-5">Everything We Offer</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg font-light">Every service is defined based on your agreement. Choose what you need — nothing is pre-bundled.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ slug, icon: Icon, title, subtitle, desc, features, highlight, hasSubs }) => (
            <Link key={title} href={`/services/${slug}`} className={`group relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${highlight ? 'bg-primary text-white shadow-xl' : 'bg-white text-primary shadow-md'}`}>
              {highlight && <div className="absolute top-4 right-4 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">Flagship</div>}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${highlight ? 'bg-accent/20' : 'bg-light'}`}>
                <Icon size={26} className="text-accent" />
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <h3 className={`font-serif text-xl font-semibold ${highlight ? 'text-white' : 'text-primary'}`}>{title}</h3>
                <span className="text-accent text-xs font-medium uppercase tracking-wider">{subtitle}</span>
              </div>
              <p className={`text-sm leading-relaxed mb-6 ${highlight ? 'text-white/70' : 'text-gray-500'}`}>{desc}</p>
              <ul className="space-y-2 mb-6">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <CheckCircle2 size={15} className="text-accent" />
                    <span className={`text-sm font-medium ${highlight ? 'text-white/85' : 'text-gray-600'}`}>{f}</span>
                  </li>
                ))}
              </ul>
              {hasSubs && (
                <div className={`border-t ${highlight ? 'border-white/20' : 'border-gray-100'} pt-4 mb-4`}>
                  <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${highlight ? 'text-white/50' : 'text-gray-400'}`}>Also available</p>
                  <div className="grid grid-cols-2 gap-2">
                    {wicleanExtras.map(({ icon: SubIcon, name, subtitle: sub }) => (
                      <div key={name} className={`flex items-center gap-2 rounded-lg px-3 py-2 ${highlight ? 'bg-white/10' : 'bg-light'}`}>
                        <SubIcon size={14} className="text-accent flex-shrink-0" />
                        <div className="min-w-0">
                          <p className={`text-xs font-semibold ${highlight ? 'text-white' : 'text-primary'}`}>{name}</p>
                          <p className={`text-[10px] ${highlight ? 'text-white/50' : 'text-gray-400'} truncate`}>{sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider ${highlight ? 'text-accent' : 'text-accent'} group-hover:underline`}>
                Learn More <ExternalLink size={12} />
              </span>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <a href="#booking" className="inline-block bg-primary text-white font-semibold px-10 py-4 rounded-full hover:bg-secondary transition-colors duration-300 shadow-lg text-sm tracking-wide uppercase">Book Any Service</a>
        </div>
      </div>
    </section>
  );
}
