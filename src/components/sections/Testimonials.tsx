'use client';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sophie',
    profession: 'Executive Director, Copenhagen',
    review: 'Two years of impeccable service. Zero complaints. Best team in Copenhagen.',
    initials: 'SA',
    rating: 5,
  },
  {
    name: 'Marcus',
    profession: 'Property Owner',
    review: 'The team delivers exactly what they promise. Premium, reliable, and perfectly professional.',
    initials: 'MV',
    rating: 5,
  },
  {
    name: 'Henrik',
    profession: 'Architect',
    review: 'I had very high standards. WiCare not only met them, they exceeded them.',
    initials: 'HC',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-padding bg-light">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-accent text-xs tracking-widest uppercase font-medium mb-3">Client Stories</p>
          <h2 className="font-serif text-4xl md:text-5xl text-primary font-semibold">What Our Clients Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(({ name, profession, review, initials, rating }) => (
            <div key={initials} className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="text-gray-700 text-base leading-relaxed mb-6 italic">"{review}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold text-sm">{initials}</span>
                </div>
                <div>
                  <p className="font-semibold text-primary">{name}</p>
                  <p className="text-gray-500 text-sm">{profession}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
