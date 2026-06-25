'use client';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { CheckCircle2 } from 'lucide-react';

export default function Trust() {
  const { t } = useLanguage();

  const keyReasons = [
    { title: '10+ Years', description: 'Trusted by Copenhagen elite since 2016' },
    { title: '100% Insured', description: 'Full liability coverage for peace of mind' },
    { title: 'Background Checked', description: 'Every team member vetted and trusted' },
    { title: 'White-Glove Service', description: 'Premium standards on every visit' },
  ];

  return (
    <section id="trust" className="section-padding bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-accent text-xs tracking-widest uppercase font-medium mb-3">Why Choose Us</p>
          <h2 className="font-serif text-4xl md:text-5xl text-primary font-semibold">The WiCare Difference</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {keyReasons.map(({ title, description }) => (
            <div key={title} className="text-center">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={28} className="text-accent" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-primary mb-2">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
