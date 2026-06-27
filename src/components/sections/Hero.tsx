'use client';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-start sm:items-center justify-center overflow-hidden pt-28 sm:pt-24 lg:pt-0">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=1920&q=90')" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/75 to-primary/95" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center text-white">
        <div className="inline-flex items-center gap-2 max-w-[88vw] bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 sm:px-5 py-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" />
          <span className="text-[11px] sm:text-sm text-white/90 tracking-[0.12em] sm:tracking-widest uppercase font-medium leading-snug">{t.hero.badge}</span>
        </div>
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-6">
          {t.hero.title}
        </h1>
        <p className="text-2xl md:text-3xl text-accent italic font-light mb-8">
          {t.hero.titleHighlight}
        </p>
        <p className="text-xl md:text-2xl text-white/75 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
          {t.hero.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
          <Link href="/#booking" className="w-full sm:w-auto text-center bg-accent hover:bg-yellow-600 text-white font-semibold px-10 sm:px-12 py-4 rounded-full transition-all duration-300 shadow-xl hover:scale-105 text-sm tracking-wide uppercase">
            {t.hero.ctaConsultation}
          </Link>
          <Link href="/#services" className="w-full sm:w-auto text-center bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold px-10 sm:px-12 py-4 rounded-full transition-all duration-300 text-sm tracking-wide uppercase">
            {t.hero.ctaServices}
          </Link>
        </div>
      </div>
      <a href="#trust" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-accent transition-colors duration-300 animate-bounce">
        <ChevronDown size={28} />
      </a>
    </section>
  );
}
