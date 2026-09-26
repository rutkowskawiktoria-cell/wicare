'use client';
import Link from 'next/link';
import { Phone, Building2, Stethoscope, Store, UtensilsCrossed, DoorOpen, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { businessCopy } from '@/lib/business';
import { areas } from '@/lib/areas';
import { track } from '@/lib/track';

const icons = [Building2, Stethoscope, Store, UtensilsCrossed, DoorOpen];

export default function BusinessCleaning() {
  const { locale } = useLanguage();
  const c = businessCopy[locale === 'da' ? 'da' : 'en'];

  const phone = (
    <a
      href="tel:+4552721102"
      onClick={() => track('phone')}
      className="inline-flex items-center justify-center gap-3 bg-accent hover:bg-accent-deep text-primary font-semibold px-7 py-4 rounded-2xl transition-all text-lg"
    >
      <Phone size={22} />
      +45 52 72 11 02
    </a>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-primary pb-16" style={{ paddingTop: '6.5rem' }}>
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <p className="text-accent text-xs tracking-widest uppercase font-semibold mb-4">{c.badge}</p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-semibold mb-5 leading-tight">{c.h1}</h1>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8">{c.intro}</p>
            {phone}
            <p className="text-white/60 text-sm mt-4">{c.ctaSecondary}</p>
          </div>
        </section>

        {/* What we clean */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="font-serif text-2xl md:text-3xl text-primary font-semibold text-center mb-10">{c.whatHeading}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {c.what.map((w, i) => {
                const Icon = icons[i] ?? Building2;
                return (
                  <div key={w.title} className="bg-light rounded-2xl p-6">
                    <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center mb-4">
                      <Icon size={24} className="text-accent-dark" />
                    </div>
                    <h3 className="font-serif text-lg text-primary font-semibold mb-2">{w.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{w.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How we work */}
        <section className="py-16 bg-light">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <h2 className="font-serif text-2xl md:text-3xl text-primary font-semibold text-center mb-10">{c.howHeading}</h2>
            <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-7">
              {c.how.map((h) => (
                <li key={h.title} className="flex gap-3">
                  <CheckCircle2 size={22} className="text-accent-dark shrink-0 mt-1" />
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-primary">{h.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{h.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Cross-sell */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <h2 className="font-serif text-2xl md:text-3xl text-primary font-semibold text-center mb-10">{c.moreHeading}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {c.more.map((m) => (
                <Link key={m.href} href={m.href} className="group rounded-2xl border border-primary/10 p-7 hover:border-accent hover:shadow-lg transition-all">
                  <h3 className="font-serif text-xl text-primary font-semibold mb-2">{m.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{m.desc}</p>
                  <span className="inline-block mt-4 text-accent-dark font-medium text-sm group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Areas */}
        <section className="py-14 bg-light">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-serif text-2xl md:text-3xl text-primary font-semibold mb-8">{c.areasHeading}</h2>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {areas.map((a) => (
                <Link key={a.slug} href={`/omraader/${a.slug}/`} className="px-4 py-2 rounded-full bg-white border border-primary/10 text-primary hover:border-accent hover:text-accent-dark transition-colors text-sm">
                  {a.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="font-serif text-2xl md:text-3xl text-primary font-semibold text-center mb-8">{c.faqHeading}</h2>
            <div className="divide-y divide-primary/10 border-y border-primary/10">
              {c.faq.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-semibold text-primary">
                    {f.q}
                    <span className="text-accent-dark text-xl leading-none transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="text-gray-600 leading-relaxed mt-3">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-serif text-2xl md:text-3xl text-white font-semibold mb-3">{c.ctaTitle}</h2>
            <p className="text-white/75 text-lg mb-8">{c.ctaDesc}</p>
            {phone}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
