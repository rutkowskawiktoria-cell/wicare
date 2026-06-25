'use client';
import { Sparkles, ChefHat, Wrench, Car, Shirt, Flower2, Smartphone, Dog, Leaf } from 'lucide-react';

const brands = [
  { icon: Sparkles, name: 'WiClean', tagline: 'Executive Home Cleaning', desc: 'Premium residential cleaning for CEOs and industry leaders. Discreet, meticulous, and tailored to the highest standards.' },
  { icon: ChefHat, name: 'WiCook', tagline: 'Private Dining & Catering', desc: '13+ years of Michelin-star and Danish Parliament culinary expertise. Private chef experiences and executive catering.' },
  { icon: Wrench, name: 'WiHelp', tagline: 'Premier Property Care', desc: 'Expert gardening, construction, and handyman services. Skilled professionals for every property need.' },
  { icon: Car, name: 'WiShine', tagline: 'Executive Vehicle Detailing', desc: 'On-site waterless car care — exterior wash, leather conditioning, and interior detailing while you work.' },
  { icon: Shirt, name: 'WiWardrobe', tagline: 'Garment & Shoe Valet', desc: 'Professional shoe shining, garment care, and dry-cleaning logistics. Your wardrobe, perfectly maintained.' },
  { icon: Flower2, name: 'WiScent', tagline: 'Ambient Atmosphere', desc: 'Luxury scent management — premium diffusers, essential oils, and air purification for a 5-star home experience.' },
  { icon: Smartphone, name: 'WiDevice', tagline: 'Tech Sanitization & Care', desc: 'UV sanitization, screen cleaning, and premium cable management for all your devices.' },
  { icon: Dog, name: 'WiPaws', tagline: 'Elite Pet Valet', desc: 'Premium dog walks, hygiene care, and real-time updates with photo proof of life.' },
  { icon: Leaf, name: 'WiGreen', tagline: 'Architectural Botanicals', desc: 'Expert plant care — leaf dusting, precision watering, and aesthetic pruning for your luxury greenery.' },
];

export default function Brands() {
  return (
    <section id="brands" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-accent text-xs tracking-widest uppercase font-medium mb-3">Our Brands</p>
          <h2 className="font-serif text-4xl md:text-5xl text-primary font-semibold mb-5">The WiCare Group</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light">A collection of elite home and lifestyle services, each built with the same precision, discretion, and uncompromising quality.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {brands.map(({ icon: Icon, name, tagline, desc }) => (
            <div key={name} className="group p-6 rounded-2xl border border-gray-100 hover:border-accent/30 hover:shadow-lg transition-all duration-300 bg-white">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                <Icon size={22} className="text-accent" />
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <h3 className="font-serif text-xl font-semibold text-primary">{name}</h3>
                <span className="text-accent text-xs font-medium uppercase tracking-wider">{tagline}</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
