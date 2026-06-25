import { Star, Quote } from 'lucide-react';
const testimonials = [
  { name: 'Sophie', profession: 'Executive Director, Copenhagen', rating: 5, review: 'WiCare has been looking after our penthouse for two years. The level of discretion and attention to detail is genuinely unmatched.', initials: 'SA' },
  { name: 'Marcus', profession: 'Expat & Property Owner', rating: 5, review: 'Moving to Copenhagen with a family, I needed a cleaning team I could trust completely. WiCare deliver exactly what they promise: premium, reliable, and perfectly professional.', initials: 'MV' },
  { name: 'Ingrid', profession: 'Partner, Law Firm', rating: 5, review: 'Our office has never looked better. The team is discreet, punctual, and thorough. The eco-friendly products were important to us   WiCare ticked every box.', initials: 'IH' },
  { name: 'Thomas', profession: 'Tech Entrepreneur', rating: 5, review: 'I was sceptical about premium cleaning   until WiCare. My villa has never been cleaner, and the team works around my busy schedule without any disruption.', initials: 'TK' },
  { name: 'Camille', profession: 'French Expat, Finance Director', rating: 5, review: 'Three apartments managed, zero complaints. WiCare is the only team I trust with my properties.', initials: 'CD' },
  { name: 'Henrik', profession: 'Architect', rating: 5, review: 'As someone obsessed with detail in my own work, I had very high standards. WiCare not only met them   they exceeded them.', initials: 'HC' },
];
export default function Testimonials() {
  return (
    <section id="testimonials" className="section-padding bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-accent text-xs tracking-widest uppercase font-medium mb-3">Client Stories</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white font-semibold">What Our Clients Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(({ name, profession, rating, review, initials }) => (
            <div key={name} className="bg-white/5 border border-white/10 hover:border-accent/30 rounded-2xl p-8 transition-all duration-300 hover:bg-white/10">
              <Quote size={28} className="text-accent/40 mb-4" />
              <div className="flex items-center gap-1 mb-5">
                {Array.from({ length: rating }).map((_, i) => <Star key={i} size={14} className="fill-accent text-accent" />)}
              </div>
              <p className="text-white/75 text-sm leading-relaxed mb-6 italic">&ldquo;{review}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-accent text-xs font-bold">{initials}</span>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{name}</p>
                  <p className="text-white/45 text-xs">{profession}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
