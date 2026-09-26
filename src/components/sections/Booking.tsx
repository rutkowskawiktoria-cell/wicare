'use client';
import { Phone } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { track } from '@/lib/track';
import ContactForm from '@/components/sections/ContactForm';

// "Klar til at komme i gang?" + the consultation form, side by side.
// id="book" is the target of every on-site "Book Now" link; the form card carries id="contact".
export default function Booking() {
  const { t } = useLanguage();

  return (
    <section id="book" className="py-16 md:py-24 bg-primary">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div className="text-white text-center lg:text-left">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4">{t.booking.heading}</h2>
          <p className="text-white/80 text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0">{t.booking.subheading}</p>

          <a
            href="tel:+4552721102"
            onClick={() => track('phone')}
            className="inline-flex items-center gap-3 bg-accent hover:bg-accent-deep text-primary font-bold text-xl md:text-2xl px-8 py-4 rounded-full transition-all duration-300 shadow-xl hover:scale-105"
          >
            <Phone size={26} />
            +45 52 72 11 02
          </a>

          <p className="text-white/60 text-sm mt-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">{t.booking.note}</p>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
