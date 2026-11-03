'use client';
import Link from 'next/link';
import { Sparkles, ChefHat, Wrench, Phone, MapPin, CheckCircle2, Building2, TreePine } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { getArea, areas, areaBusiness, areaDining } from '@/lib/areas';
import ChefIntro from '@/components/ChefIntro';

// Private chef & catering is the main business (Nov 2026); cleaning + garden are additional services.
const diningCards = [
  { href: '/services/the-table/', Icon: ChefHat, da: 'Private middage', en: 'Private dinners' },
  { href: '/firmacatering/', Icon: Building2, da: 'Firmacatering', en: 'Corporate catering' },
  { href: '/julefrokost/', Icon: TreePine, da: 'Julefrokost', en: 'Christmas lunch' },
];
const extraCards = [
  { href: '/services/the-home/', Icon: Sparkles, da: 'Rengøring – hjem & erhverv', en: 'Cleaning – Homes & Businesses' },
  { href: '/services/the-estate/', Icon: Wrench, da: 'Have & byggeri', en: 'Garden & Construction' },
];

export default function AreaLanding({ slug }: { slug: string }) {
  const { locale, t } = useLanguage();
  const area = getArea(slug);
  if (!area) return null;
  const c = area[locale === 'da' ? 'da' : 'en'];
  const da = locale === 'da';

  const wa = `https://wa.me/4552721102?text=${encodeURIComponent(t.floating.whatsappMsg)}`;
  const nearby = area.nearby.map(getArea).filter(Boolean);
  const biz = areaBusiness[area.slug]?.[locale === 'da' ? 'da' : 'en'];
  const dining = areaDining[area.slug]?.[locale === 'da' ? 'da' : 'en'] ?? c.intro;

  const L = da
    ? {
        h1a: 'Privat kok & catering i',
        servicesHeading: 'Til enhver anledning i',
        whyHeading: 'Øvrige services i',
        ctaTitle: 'Planlægger du en middag eller et arrangement i',
        ctaDesc: 'Ring til os, så sammensætter vi en menu til din anledning.',
        learnMore: 'Læs mere',
        nearbyHeading: 'Vi betjener også',
        allAreas: 'Alle områder',
        trust1: 'Kok med 13+ års erfaring',
        trust2: 'Menu efter dine ønsker',
        trust3: 'Også aftener og weekender',
        bizBadge: 'Erhverv',
        bizHeading: 'Erhvervsrengøring i',
        bizMore: 'Læs mere om erhvervsrengøring',
        bizItems: ['Kontorrengøring', 'Klinikker', 'Showroom & butik', 'Fællesarealer', 'Uden for åbningstid', 'Fast aftale'],
      }
    : {
        h1a: 'Private Chef & Catering in',
        servicesHeading: 'For every occasion in',
        whyHeading: 'Additional services in',
        ctaTitle: 'Planning a dinner or an event in',
        ctaDesc: 'Call us and we will put together a menu for your occasion.',
        learnMore: 'Learn more',
        nearbyHeading: 'We also serve',
        allAreas: 'All areas',
        trust1: 'Chef with 13+ years of experience',
        trust2: 'Menu to your wishes',
        trust3: 'Evenings and weekends too',
        bizBadge: 'Business',
        bizHeading: 'Commercial cleaning in',
        bizMore: 'More about commercial cleaning',
        bizItems: ['Office cleaning', 'Clinics', 'Showroom & retail', 'Shared areas', 'Out-of-hours', 'Fixed agreement'],
      };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* Hero */}
        <section data-loc="hero" className="bg-primary pt-20 pb-16" style={{ paddingTop: '6.5rem' }}>
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <p className="inline-flex items-center gap-2 text-accent text-xs tracking-widest uppercase font-semibold mb-4">
              <MapPin size={15} /> {area.name} · {area.postal}
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-semibold mb-5 leading-tight">
              {L.h1a} {area.name}
            </h1>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8">{dining}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:+4552721102" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-accent hover:bg-accent-deep text-primary font-semibold px-7 py-4 rounded-2xl transition-all text-lg">
                <Phone size={22} />+45 52 72 11 02
              </a>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium px-7 py-4 rounded-2xl transition-all text-lg">
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
              {diningCards.map(({ href, Icon, da: nda, en: nen }) => (
                <Link key={href} href={href} className="group bg-light rounded-2xl p-7 hover:shadow-lg transition-all">
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

        <ChefIntro />

        {/* Additional services (cleaning, garden & construction) — unique local copy */}
        <section className="py-14">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-serif text-2xl md:text-3xl text-primary font-semibold mb-5">
              {L.whyHeading} {area.name}
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">{c.intro}</p>
            <p className="text-gray-700 text-lg leading-relaxed mt-4">{c.body}</p>
            <div className="grid sm:grid-cols-2 gap-4 mt-8 text-left">
              {extraCards.map(({ href, Icon, da: nda, en: nen }) => (
                <Link key={href} href={href} className="group flex items-center gap-3 rounded-xl border border-primary/10 px-5 py-4 hover:border-accent transition-colors">
                  <Icon size={20} className="text-accent-dark shrink-0" />
                  <span className="font-medium text-primary">{da ? nda : nen}</span>
                  <span className="ml-auto text-accent-dark group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Erhvervsrengøring — commercial / office cleaning */}
        {biz && (
          <section className="py-14 bg-light">
            <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
              <p className="text-accent-dark text-xs tracking-widest uppercase font-semibold mb-3">{L.bizBadge}</p>
              <h2 className="font-serif text-2xl md:text-3xl text-primary font-semibold mb-5">
                {L.bizHeading} {area.name}
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">{biz}</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {L.bizItems.map((i) => (
                  <span key={i} className="px-4 py-2 rounded-full bg-white text-primary text-sm font-medium">{i}</span>
                ))}
              </div>
              <Link href="/erhvervsrengoering/" className="inline-block mt-8 text-accent-dark font-semibold hover:text-primary transition-colors">
                {L.bizMore} →
              </Link>
            </div>
          </section>
        )}

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
        <section data-loc="cta" className="py-16 bg-primary">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-serif text-2xl md:text-3xl text-white font-semibold mb-3">
              {L.ctaTitle} {area.name}?
            </h2>
            <p className="text-white/75 text-lg mb-8">{L.ctaDesc}</p>
            <a href="tel:+4552721102" className="inline-flex items-center justify-center gap-3 bg-accent hover:bg-accent-deep text-primary font-semibold px-8 py-4 rounded-2xl transition-all text-lg">
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
