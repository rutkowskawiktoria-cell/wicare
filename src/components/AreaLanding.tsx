'use client';
import Link from 'next/link';
import { Sparkles, ChefHat, Wrench, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { getArea, areas } from '@/lib/areas';
import { track } from '@/lib/track';

const serviceCards = [
  { slug: 'the-home', Icon: Sparkles, da: 'Hjemmerengøring', en: 'Home Cleaning' },
  { slug: 'the-table', Icon: ChefHat, da: 'Privat Kok & Catering', en: 'Private Chef & Catering' },
  { slug: 'the-estate', Icon: Wrench, da: 'Ejendoms- & Havepleje', en: 'Property & Garden Care' },
];

export default function AreaLanding({ slug }: { slug: string }) {
  const { locale, t } = useLanguage();
  const area = getArea(slug);
  if (!area) return null;
  const c = area[locale === 'da' ? 'da' : 'en'];
  const da = locale === 'da';

  const wa = `https://wa.me/4552721102?text=${encodeURIComponent(t.floating.whatsappMsg)}`;
  const nearby = area.nearby.map(getArea).filter(Boolean);

  const L = da
    ? {
        h1a: 'VIP Rengøring, Privat Kok & Havepleje i',
        servicesHeading: 'Vores services i',
        whyHeading: 'Hvorfor WiCare i',
        ctaTitle: 'Klar til at komme i gang i',
        ctaDesc: 'Ring til os i dag – vi svarer inden for 2 arbejdstimer.',
        learnMore: 'Læs mere',
        nearbyHeading: 'Vi betjener også',
        allAreas: 'Alle områder',
        trust1: 'Baggrundstjekket personale',
        trust2: 'Fleksibel planlægning',
        trust3: 'Fast team & klare priser',
      }
    : {
        h1a: 'VIP Cleaning, Private Chef & Garden Care in',
        servicesHeading: 'Our services in',
        whyHeading: 'Why WiCare in',
        ctaTitle: 'Ready to get started in',
        ctaDesc: 'Call us today — we respond within 2 business hours.',
        learnMore: 'Learn more',
        nearbyHeading: 'We also serve',
        allAreas: 'All areas',
        trust1: 'Background-checked staff',
        trust2: 'Flexible scheduling',
        trust3: 'Dedicated team & clear pricing',
      };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-primary pt-20 pb-16" style={{ paddingTop: '6.5rem' }}>
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <p className="inline-flex items-center gap-2 text-accent text-xs tracking-widest uppercase font-semibold mb-4">
              <MapPin size={15} /> {area.name} · {area.postal}
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-semibold mb-5 leading-tight">
              {L.h1a} {area.name}
            </h1>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8">{c.intro}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:+4552721102" onClick={() => track('phone')} className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-accent hover:bg-accent-deep text-primary font-semibold px-7 py-4 rounded-2xl transition-all text-lg">
                <Phone size={22} />+45 52 72 11 02
              </a>
              <a href={wa} onClick={() => track('whatsapp')} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium px-7 py-4 rounded-2xl transition-all text-lg">
                WhatsApp
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-white/70 text-sm">
              <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-accent" />{L.trust1}</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-accent" />{L.trust2}</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-accent" />{L.trust3}</span>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <h2 className="font-serif text-2xl md:text-3xl text-primary font-semibold text-center mb-10">
              {L.servicesHeading} {area.name}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {serviceCards.map(({ slug: s, Icon, da: nda, en: nen }) => (
                <Link key={s} href={`/services/${s}/`} className="group bg-light rounded-2xl p-7 hover:shadow-lg transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-accent/15 flex items-center justify-center mb-5">
                    <Icon size={28} className="text-accent-dark" />
                  </div>
                  <h3 className="font-serif text-xl text-primary font-semibold mb-2">{da ? nda : nen}</h3>
                  <span className="text-accent-dark font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    {L.learnMore} →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why / local body */}
        <section className="py-14 bg-light">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-serif text-2xl md:text-3xl text-primary font-semibold mb-5">
              {L.whyHeading} {area.name}
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">{c.body}</p>
          </div>
        </section>

        {/* Nearby areas */}
        {nearby.length > 0 && (
          <section className="py-12">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <p className="text-primary/60 text-xs tracking-widest uppercase font-semibold mb-4">{L.nearbyHeading}</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {nearby.map((n) => (
                  <Link key={n!.slug} href={`/omraader/${n!.slug}/`} className="px-4 py-2 rounded-full border border-primary/15 text-primary hover:border-accent hover:text-accent-dark transition-colors text-sm">
                    {n!.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-serif text-2xl md:text-3xl text-white font-semibold mb-3">
              {L.ctaTitle} {area.name}?
            </h2>
            <p className="text-white/75 text-lg mb-8">{L.ctaDesc}</p>
            <a href="tel:+4552721102" onClick={() => track('phone')} className="inline-flex items-center justify-center gap-3 bg-accent hover:bg-accent-deep text-primary font-semibold px-8 py-4 rounded-2xl transition-all text-lg">
              <Phone size={22} />+45 52 72 11 02
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

export const allAreaSlugs = areas.map((a) => a.slug);
