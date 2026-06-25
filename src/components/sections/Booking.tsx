'use client';
import { Phone } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Booking() {
  const { t } = useLanguage();

  const stats = t.booking.stats;

  return (
    <section id="booking" className="section-padding bg-primary">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-white font-semibold mb-4">{t.booking.heading}</h2>
        <p className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
          {t.booking.subheading}
        </p>

        <a
          href="tel:+4552721102"
          className="inline-flex items-center gap-4 bg-accent hover:bg-yellow-600 text-white font-bold text-2xl md:text-3xl px-12 py-6 rounded-full transition-all duration-300 shadow-xl hover:scale-105 mb-16"
        >
          <Phone size={32} />
          +45 52 72 11 02
        </a>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map(({ number, label, desc }) => (
            <div key={label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <p className="text-accent text-4xl font-bold mb-2">{number}</p>
              <p className="text-white font-semibold mb-1">{label}</p>
              <p className="text-white/60 text-sm">{desc}</p>
            </div>
          ))}
        </div>

        <p className="text-white/60 text-sm mt-10 max-w-xl mx-auto leading-relaxed">{t.booking.note}</p>
      </div>
    </section>
  );
}
