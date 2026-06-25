'use client';
import { Sparkles, ChefHat, Wrench, Car, Shirt, Flower2, Smartphone, Dog, Leaf, CheckCircle2 } from 'lucide-react';

const services = [
  {
    icon: Sparkles, title: 'WiClean', subtitle: 'Executive Home Cleaning',
    desc: 'Premium residential cleaning for CEOs and industry leaders. Discreet, meticulous, and tailored to the highest standards of luxury living.',
    features: ['Private residences & estates', 'CEO-ready workspaces', 'White-glove finish', 'Eco-friendly products'],
    highlight: true,
  },
  {
    icon: ChefHat, title: 'WiCook', subtitle: 'Private Dining & Catering',
    desc: '13+ years of Michelin-star and Danish Parliament culinary expertise. Private chef experiences, exclusive dinner parties, and executive catering.',
    features: ['Private chef dining', 'Corporate catering', 'Michelin pedigree', 'Bespoke menus'],
  },
  {
    icon: Wrench, title: 'WiHelp', subtitle: 'Premier Property Care',
    desc: 'Expert gardening, construction, and handyman services. Skilled professionals for every property need — from rooftop terraces to basement renovations.',
    features: ['Landscaping & gardening', 'Construction projects', 'Handyman services', 'Property maintenance'],
  },
  {
    icon: Car, title: 'WiShine', subtitle: 'Executive Vehicle Detailing',
    desc: 'On-site waterless car care while you work. Exterior wash, premium leather conditioning, dashboard sanitization, and interior vacuuming. Takes 30–45 minutes.',
    features: ['Waterless exterior wash', 'Leather conditioning', 'Dashboard sanitization', 'Interior vacuuming'],
  },
  {
    icon: Shirt, title: 'WiWardrobe', subtitle: 'Garment & Shoe Valet',
    desc: 'Professional shoe shining, luxury sneaker cleaning, lint-rolling bespoke suits, and dry-cleaning logistics. Your wardrobe, perfectly maintained in 15–20 minutes.',
    features: ['Shoe shining & care', 'Sneaker cleaning', 'Suit lint-rolling', 'Dry-cleaning logistics'],
  },
  {
    icon: Flower2, title: 'WiScent', subtitle: 'Ambient Atmosphere Management',
    desc: 'Luxury scent management for a 5-star home experience. Refilling premium reed diffusers, swapping essential oils, and replacing air purifier filters.',
    features: ['Reed diffuser refills', 'Essential oil swaps', 'Air purifier filters', '5-minute touch-up'],
  },
  {
    icon: Smartphone, title: 'WiDevice', subtitle: 'Tech Sanitization & Cable Management',
    desc: 'Medical-grade UV sanitization and microfiber screen-cleaning for all laptops, tablets, and remotes. Loose cables wrapped with premium leather ties.',
    features: ['UV device sanitization', 'Screen cleaning', 'Leather cable ties', '10-minute service'],
  },
  {
    icon: Dog, title: 'WiPaws', subtitle: 'Elite Pet Valet',
    desc: 'Premium 20–30 minute walks with full hygiene care. Paws wiped, water refreshed, and a photo update sent straight to your phone.',
    features: ['Brisk neighborhood walk', 'Paw wiping & hygiene', 'Hydration refill', 'Photo proof of life'],
  },
  {
    icon: Leaf, title: 'WiGreen', subtitle: 'Architectural Botanical Care',
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
          <p className="text-gray-500 max-w-xl mx-auto text-lg font-light">Nine distinct services. One trusted partner. Every detail handled with precision and care.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, subtitle, desc, features, highlight }) => (
            <div key={title} className={`group relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-default ${highlight ? 'bg-primary text-white shadow-xl' : 'bg-white text-primary shadow-md'}`}>
              {highlight && <div className="absolute top-4 right-4 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">Flagship</div>}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${highlight ? 'bg-accent/20' : 'bg-light'}`}>
                <Icon size={26} className="text-accent" />
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <h3 className={`font-serif text-xl font-semibold ${highlight ? 'text-white' : 'text-primary'}`}>{title}</h3>
                <span className="text-accent text-xs font-medium uppercase tracking-wider">{subtitle}</span>
              </div>
              <p className={`text-sm leading-relaxed mb-6 ${highlight ? 'text-white/70' : 'text-gray-500'}`}>{desc}</p>
              <ul className="space-y-2">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <CheckCircle2 size={15} className="text-accent" />
                    <span className={`text-sm font-medium ${highlight ? 'text-white/85' : 'text-gray-600'}`}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a href="#booking" className="inline-block bg-primary text-white font-semibold px-10 py-4 rounded-full hover:bg-secondary transition-colors duration-300 shadow-lg text-sm tracking-wide uppercase">Book Any Service</a>
        </div>
      </div>
    </section>
  );
}
