'use client';
import { Star } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const meta = [
  { name: 'Sophie A.', initials: 'SA', rating: 5 },
  { name: 'Marcus V.', initials: 'MV', rating: 5 },
  { name: 'Henrik C.', initials: 'HC', rating: 5 },
];

// Rendered as the right-hand column of the Trust section.
export default function Testimonials() {
  const { t } = useLanguage();
  const testimonials = meta.map((m, i) => ({ ...m, profession: t.testimonials.short[i].profession, review: t.testimonials.short[i].review }));
  return (
    <div id="testimonials" className="scroll-mt-24">
      <div className="text-center lg:text-left mb-8">
        <p className="text-accent-dark text-xs tracking-widest uppercase font-semibold mb-3">{t.testimonials.badge}</p>
        <h2 className="font-serif text-3xl md:text-4xl text-primary font-semibold">{t.testimonials.heading}</h2>
      </div>

      <div className="space-y-4">
        {testimonials.map(({ name, profession, review, initials, rating }) => (
          <figure key={initials} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-1 mb-3" aria-label={`${rating}/5`}>
              {[...Array(rating)].map((_, i) => (
                <Star key={i} size={16} className="fill-accent text-accent" />
              ))}
            </div>
            <blockquote className="text-gray-700 leading-relaxed italic">&ldquo;{review}&rdquo;</blockquote>
            <figcaption className="flex items-center gap-3 mt-4">
              <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold text-xs">{initials}</span>
              <span>
                <span className="block font-semibold text-primary leading-tight">{name}</span>
                <span className="block text-gray-500 text-sm">{profession}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
