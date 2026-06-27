import { services } from '@/lib/services';
import { notFound } from 'next/navigation';
import ServiceDetail from '@/components/ServiceDetail';

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.name} | WiCare Group North Copenhagen`,
    description: service.description,
    keywords: [`${service.name}`, `${service.subtitle}`, 'North Copenhagen', 'Hellerup', 'Gentofte', 'luxury home services', 'WiCare Group'],
    openGraph: {
      title: `${service.name} | WiCare Group`,
      description: service.description,
      url: `/services/${service.slug}/`,
      siteName: 'WiCare Group',
      locale: 'en_DK',
      type: 'website',
    },
    alternates: { canonical: `/services/${service.slug}/` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: `${service.name} - ${service.subtitle}`,
            description: service.description,
            provider: {
              '@type': 'Organization',
              name: 'WiCare Group',
              address: { '@type': 'PostalAddress', addressLocality: 'Hellerup', addressRegion: 'Capital Region of Denmark', addressCountry: 'DK' },
            },
            areaServed: [
              { '@type': 'City', name: 'Hellerup' },
              { '@type': 'City', name: 'Charlottenlund' },
              { '@type': 'City', name: 'Klampenborg' },
              { '@type': 'City', name: 'Gentofte' },
              { '@type': 'AdministrativeArea', name: 'Rudersdal' },
              { '@type': 'AdministrativeArea', name: 'Hørsholm' },
            ],
          }),
        }}
      />
      <ServiceDetail slug={slug as 'maison' | 'la-table' | 'le-domaine'} />
    </>
  );
}
