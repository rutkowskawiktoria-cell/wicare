'use client';
import { Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// "Klar til at komme i gang?" — call-first (the owner prefers phone calls, so there is no form).
// id="book" is the target of every on-site "Book Now" link; id="contact" keeps old /#contact links working.
export default function Booking() {
  const { t } = useLanguage();
  const b = t.booking;
  const wa = `https://wa.me/4552721102?text=${encodeURIComponent(t.floating.whatsappMsg)}`;

  return (
    <section id="book" className="py-16 md:py-24 bg-light">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div id="contact" className="scroll-mt-24 text-center lg:text-left">
          <h2 className="font-serif text-4xl md:text-5xl text-primary font-semibold mb-4">{b.heading}</h2>
          <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0">{b.subheading}</p>

          <a
            href="tel:+4552721102"
           
            className="inline-flex items-center gap-3 bg-primary hover:bg-secondary text-white font-bold text-xl md:text-2xl px-8 py-4 rounded-full transition-all duration-300 shadow-xl hover:scale-105"
          >
            <Phone size={26} />
            +45 52 72 11 02
          </a>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 mt-6 text-sm">
            <span className="text-gray-500">{b.or}:</span>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent-dark underline underline-offset-4 decoration-primary/30 transition-colors">
              {b.whatsapp}
            </a>
            <a href="mailto:hello@wicare.vip" className="inline-flex items-center gap-1.5 text-primary hover:text-accent-dark underline underline-offset-4 decoration-primary/30 transition-colors">
              <Mail size={14} aria-hidden="true" />
              hello@wicare.vip
            </a>
          </div>

        </div>

        <div className="rounded-2xl bg-white shadow-xl border border-primary/5 p-7 md:p-9">
          <p className="text-accent-dark text-xs tracking-widest uppercase font-semibold mb-6">{b.stepsTitle}</p>
          <ol className="space-y-7">
            {b.steps.map((s, i) => (
              <li key={s.title} className="flex gap-5">
                <span className="shrink-0 w-10 h-10 rounded-full border border-accent-dark/40 text-accent-dark font-serif text-lg flex items-center justify-center" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-primary font-semibold text-lg">{s.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-1">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
