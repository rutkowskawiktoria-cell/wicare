import Link from 'next/link';
import { services } from '@/lib/services';
import { notFound } from 'next/navigation';
import { Sparkles, ChefHat, Wrench, Car, Shirt, Flower2, Smartphone, Phone, CheckCircle2, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';

const iconMap: Record<string, React.ElementType> = {
  'wi-clean': Sparkles,
  'wi-cook': ChefHat,
  'wi-help': Wrench,
  'wi-shine': Car,
  'wi-wardrobe': Shirt,
  'wi-scent': Flower2,
  'wi-device': Smartphone,
};

const subServices = [
  { slug: 'wi-shine', icon: Car, name: 'WiShine', subtitle: 'Executive Vehicle Detailing' },
  { slug: 'wi-wardrobe', icon: Shirt, name: 'WiWardrobe', subtitle: 'Garment & Shoe Valet' },
  { slug: 'wi-scent', icon: Flower2, name: 'WiScent', subtitle: 'Ambient Atmosphere Management' },
  { slug: 'wi-device', icon: Smartphone, name: 'WiDevice', subtitle: 'Tech Sanitization & Cable Management' },
];

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.name} — ${service.subtitle} | WiCare Group Copenhagen`,
    description: service.description,
    keywords: [`${service.name}`, `${service.subtitle}`, 'Copenhagen', 'luxury home services', 'WiCare Group'],
    openGraph: {
      title: `${service.name} — ${service.subtitle} | WiCare Group`,
      description: service.description,
      url: `/services/${service.slug}`,
      siteName: 'WiCare Group',
      locale: 'en_DK',
      type: 'website',
    },
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const Icon = iconMap[service.slug];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: `${service.name} — ${service.subtitle}`,
            description: service.description,
            provider: {
              '@type': 'Organization',
              name: 'WiCare Group',
              address: { '@type': 'PostalAddress', addressLocality: 'Copenhagen', addressCountry: 'DK' },
            },
            areaServed: { '@type': 'City', name: 'Copenhagen' },
          }),
        }}
      />
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
              <div className="flex items-baseline justify-center gap-3 mb-4">
                <h1 className="font-serif text-4xl md:text-5xl text-white font-semibold">{service.name}</h1>
                <span className="text-accent text-sm font-medium uppercase tracking-wider">{service.subtitle}</span>
              </div>
              <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
                {service.longDescription}
              </p>
            </div>
          </section>

          <section className="py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl text-primary font-semibold mb-8">What&apos;s Included</h2>
                  <ul className="space-y-4">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <CheckCircle2 size={20} className="text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-base">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl text-primary font-semibold mb-8">Why Choose {service.name}</h2>
                  <ul className="space-y-4">
                    {service.details.map((d) => (
                      <li key={d} className="flex items-start gap-3">
                        <CheckCircle2 size={20} className="text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-base">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {slug === 'wi-clean' && (
            <section className="py-16 bg-white border-t border-gray-100">
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="font-serif text-3xl md:text-4xl text-primary font-semibold mb-4">Also Available with WiClean</h2>
                  <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                    While your home is being serviced, your WiCare team can handle these additional services — tailored to your agreement, never pre-bundled.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {subServices.map(({ slug: sSlug, icon: SubIcon, name, subtitle }) => (
                    <Link key={sSlug} href={`/services/${sSlug}`} className="group bg-light rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                        <SubIcon size={22} className="text-accent" />
                      </div>
                      <div className="flex items-baseline gap-2 mb-2">
                        <h3 className="font-serif text-lg font-semibold text-primary">{name}</h3>
                        <span className="text-accent text-xs font-medium uppercase tracking-wider">{subtitle}</span>
                      </div>
                      <p className="text-gray-500 text-sm">{services.find((s) => s.slug === sSlug)?.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          <section className="bg-light py-20">
            <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-primary font-semibold mb-4">
                Book {service.name} Today
              </h2>
              <p className="text-gray-500 text-lg mb-8">
                All services are defined based on your agreement — choose what you need, nothing is pre-bundled. Call us to schedule your {service.name.toLowerCase()} service. We respond within 2 business hours.
              </p>
              <a
                href="tel:+4552721102"
                className="inline-flex items-center gap-3 bg-accent hover:bg-yellow-600 text-white font-bold text-xl md:text-2xl px-10 py-5 rounded-full transition-all duration-300 shadow-xl hover:scale-105"
              >
                <Phone size={28} />+45 52 72 11 02
              </a>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
              <Link href="/#services" className="inline-flex items-center gap-2 text-primary hover:text-accent font-medium transition-colors">
                <ArrowLeft size={16} />
                View all WiCare services
              </Link>
            </div>
          </section>
        </main>
        <Footer />
        <FloatingActions />
      </div>
    </>
  );
}
