'use client';
import Link from 'next/link';
import { Sparkles, ChefHat, Wrench, Phone, CheckCircle2, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const iconMap: Record<string, React.ElementType> = {
  'wi-clean': Sparkles,
  'wi-cook': ChefHat,
  'wi-help': Wrench,
};

type Slug = 'wi-clean' | 'wi-cook' | 'wi-help';

export default function ServiceDetail({ slug }: { slug: Slug }) {
  const { t } = useLanguage();
  const service = t.serviceDetail[slug];
  const sp = t.servicePage;
  const Icon = iconMap[slug];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <section className="bg-primary pt-20 pb-24" style={{ paddingTop: '5.5rem' }}>
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            {Icon && (
              <div className="w-16 h-16 rounded-2xl bg-accent/15 flex items-center justify-center mx-auto mb-6">
                <Icon size={34} className="text-accent" />
              </div>
            )}
            <div className="flex items-baseline justify-center gap-3 mb-4 flex-wrap">
              <h1 className="font-serif text-4xl md:text-5xl text-white font-semibold">{service.name}</h1>
              <span className="text-accent text-sm font-medium uppercase tracking-wider">{service.subtitle}</span>
            </div>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
              {service.longDescription}
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="font-serif text-3xl text-primary font-semibold mb-10">{sp.included}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.features.map((f) => (
                <div key={f} className="flex items-start gap-3 p-4 bg-light rounded-xl hover:bg-gray-100 transition-colors">
                  <CheckCircle2 size={24} className="text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-base font-medium break-words hyphens-auto">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-light py-20">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl text-primary font-semibold mb-6">{sp.readyToBook}</h2>
            <p className="text-gray-600 text-lg mb-8">
              {sp.callSchedulePre} {service.name} {sp.callSchedulePost}
            </p>
            <a
              href="tel:+4552721102"
              className="inline-flex items-center gap-3 bg-accent hover:bg-accent-deep text-primary font-bold text-2xl px-10 py-5 rounded-full transition-all duration-300 shadow-xl hover:scale-105"
            >
              <Phone size={28} />+45 52 72 11 02
            </a>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <Link href="/#services" className="inline-flex items-center gap-2 text-primary hover:text-accent font-medium transition-colors">
              <ArrowLeft size={16} />
              {sp.backToServices}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
