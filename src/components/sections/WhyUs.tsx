import { CheckCircle2 } from 'lucide-react';
const reasons = [
  { title: 'Professional & Insured', desc: 'Every team member is fully insured and trained to a white-glove standard.' },
  { title: 'Eco-Friendly Products', desc: 'Certified green cleaning products   effective, safe, and kind to the environment.' },
  { title: 'Tailored Cleaning Plans', desc: 'We design every programme around your unique needs and lifestyle.' },
  { title: 'Flexible Scheduling', desc: 'We work around your calendar   mornings, evenings, weekends.' },
  { title: 'Exceptional Attention to Detail', desc: 'The details others miss are the ones we obsess over.' },
  { title: 'Trusted by Professionals', desc: "Copenhagen's most discerning clients rely on WiCare." },
];
export default function WhyUs() {
  return (
    <section id="why-us" className="section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]">
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85" alt="Premium cleaning service" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-2xl p-6 max-w-[200px]">
              <div className="text-4xl font-serif font-bold text-accent mb-1">10+</div>
              <div className="text-primary text-sm font-medium">Years of Premium Service in Copenhagen</div>
            </div>
          </div>
          <div>
            <p className="text-accent text-xs tracking-widest uppercase font-medium mb-3">The Difference</p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary font-semibold mb-6 leading-tight">Why Discerning Clients Choose WiCare</h2>
            <p className="text-gray-500 text-lg font-light mb-10 leading-relaxed">We are not a cleaning company. We are your trusted partner in maintaining the quality and elegance of your home or office.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {reasons.map(({ title, desc }) => (
                <div key={title} className="flex gap-3">
                  <CheckCircle2 size={20} className="text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-primary text-sm mb-1">{title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 flex items-center gap-6">
              <a href="#booking" className="bg-accent hover:bg-yellow-600 text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 text-sm tracking-wide uppercase shadow-lg">Book a Service</a>
              <a href="tel:+4552721102" className="text-primary hover:text-accent font-semibold text-sm transition-colors duration-200 underline underline-offset-4">Call +45 52 72 11 02</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
