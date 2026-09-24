'use client';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { CheckCircle2 } from 'lucide-react';
import Testimonials from '@/components/sections/Testimonials';

// "Why choose us" and "What our clients say", side by side.
// The section keeps id="trust"; the testimonials column carries id="testimonials" for the nav links.
export default function Trust() {
  const { t } = useLanguage();
  const keyReasons = t.trust.keyReasons;

  return (
    <section id="trust" className="py-16 md:py-24 bg-light">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">
        <div className="lg:col-span-5 text-center lg:text-left">
          <p className="text-accent-dark text-xs tracking-widest uppercase font-semibold mb-3">{t.trust.badge}</p>
          <h2 className="font-serif text-3xl md:text-4xl text-primary font-semibold">{t.trust.heading}</h2>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-6 lg:gap-y-8 mt-8 lg:mt-10 text-left max-w-xl mx-auto lg:mx-0">
            {keyReasons.map(({ title, description }) => (
              <li key={title} className="flex gap-3">
                <CheckCircle2 size={22} className="text-accent-dark shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif text-lg font-semibold text-primary break-words">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed break-words hyphens-auto">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <Testimonials />
        </div>
      </div>
    </section>
  );
}
