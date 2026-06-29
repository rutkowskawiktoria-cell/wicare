'use client';
import Link from 'next/link';
import { ChevronDown, Phone } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Hero() {
  const { t } = useLanguage();
  const wa = `https://wa.me/4552721102?text=${encodeURIComponent(t.floating.whatsappMsg)}`;

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
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-3 sm:mb-5">
          {t.hero.title}
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl text-accent italic font-light mb-7">
          {t.hero.titleHighlight}
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 max-w-xl mx-auto">
          <a href="tel:+4552721102" className="w-full sm:flex-1 inline-flex items-center justify-center gap-3 bg-accent hover:bg-accent-deep text-black font-bold px-6 py-5 rounded-2xl transition-all duration-300 shadow-xl hover:scale-[1.02] text-xl md:text-2xl">
            <Phone size={26} />+45 52 72 11 02
          </a>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-7 py-5 rounded-2xl transition-all duration-300 shadow-xl hover:scale-[1.02] text-lg">
            <WhatsAppIcon size={24} />WhatsApp
          </a>
        </div>
        <p className="text-white/80 text-base mt-4">
          <Link href="/#services" className="underline underline-offset-4 hover:text-accent">{t.hero.ctaServices}</Link>
        </p>
        <p className="text-lg md:text-2xl text-white/70 max-w-3xl mx-auto mt-8 leading-relaxed font-light whitespace-pre-line">
          {t.hero.subtitle}
        </p>
      </div>
      <a href="#trust" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-accent transition-colors duration-300 animate-bounce">
        <ChevronDown size={28} />
      </a>
    </section>
  );
}
