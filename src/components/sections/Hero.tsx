'use client';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

const brandSlugs: Record<string, string> = {
  WiClean: '/services/wi-clean',
  WiCook: '/services/wi-cook',
  WiHelp: '/services/wi-help',
  WiPet: '/services/wi-pet',
  WiGarden: '/services/wi-garden',
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=1920&q=90')" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/75 to-primary/95" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center text-white">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-sm text-white/90 tracking-widest uppercase font-medium">Denmark&apos;s Premier Luxury Lifestyle Group</span>
        </div>
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-6">
          Elite Home &amp; Lifestyle Services{' '}
          <span className="text-accent italic">for Those Who Demand the Best</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/75 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
          Discretion. Precision. Trust. One trusted partner managing every aspect of your home, lifestyle, and private residence — executing your vision with flawless precision.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link href="#booking" className="bg-accent hover:bg-yellow-600 text-white font-semibold px-10 py-4 rounded-full transition-all duration-300 shadow-xl hover:scale-105 text-sm tracking-wide uppercase">Request a Consultation</Link>
          <Link href="/#services" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold px-10 py-4 rounded-full transition-all duration-300 text-sm tracking-wide uppercase">Our Services</Link>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {['WiClean','WiCook','WiHelp','WiPet','WiGarden'].map((brand) => (
            <Link key={brand} href={brandSlugs[brand]} className="bg-white/10 border border-white/15 text-white/70 text-xs px-3 py-1.5 rounded-full tracking-wide font-medium hover:bg-white/20 hover:text-white transition-colors duration-200">{brand}</Link>
          ))}
        </div>
      </div>
      <a href="#trust" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-accent transition-colors duration-300 animate-bounce">
        <ChevronDown size={28} />
      </a>
    </section>
  );
}
