'use client';
import { ShieldCheck, Leaf, Clock, Star, Award, Users } from 'lucide-react';
const trustItems = [
  { icon: Award, label: '10+ Years Experience', desc: 'A decade of premium service' },
  { icon: ShieldCheck, label: '100% Insured', desc: 'Full liability coverage' },
  { icon: Leaf, label: 'Smart Product Selection', desc: 'Balanced for safety & efficacy' },
  { icon: Users, label: 'Background Checked', desc: 'Vetted & trusted staff' },
  { icon: Clock, label: 'Reliable Scheduling', desc: 'Always on time' },
  { icon: Star, label: 'Premium Service', desc: 'White-glove standard' },
];
export default function Trust() {
  return (
    <section id="trust" className="section-padding bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-accent text-xs tracking-widest uppercase font-medium mb-3">Why Clients Choose Us</p>
          <h2 className="font-serif text-3xl md:text-4xl text-white font-semibold">The WiCare Standard</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {trustItems.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="group flex flex-col items-center text-center p-6 rounded-2xl border border-white/10 hover:border-accent/40 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors duration-300">
                <Icon size={22} className="text-accent" />
              </div>
              <p className="text-white text-sm font-semibold mb-1 leading-snug">{label}</p>
              <p className="text-white/45 text-xs">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
