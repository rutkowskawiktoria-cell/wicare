'use client';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { CheckCircle2 } from 'lucide-react';

export default function Trust() {
  const { t } = useLanguage();

  const keyReasons = t.trust.keyReasons;

  return (
    <section id="trust" className="section-padding bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-accent text-xs tracking-widest uppercase font-medium mb-3">{t.trust.badge}</p>
          <h2 className="font-serif text-4xl md:text-5xl text-primary font-semibold">{t.trust.heading}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {keyReasons.map(({ title, description }) => (
            <div key={title} className="text-center">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={28} className="text-accent" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-primary mb-2 break-words">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed break-words hyphens-auto">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
