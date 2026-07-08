import { services } from '@/lib/services';
import { notFound } from 'next/navigation';
import ServiceDetail from '@/components/ServiceDetail';

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

const daMeta: Record<string, { title: string; description: string; keywords: string[] }> = {
  'the-home': {
    title: 'Hjemmerengøring i Nord for København | WiCare ApS',
    description: 'VIP hjemmerengøring i Hellerup, Gentofte, Charlottenlund og resten af Københavns nordlige forstæder. Diskret white-glove service med baggrundstjekket personale. Ring +45 52 72 11 02.',
    keywords: ['rengøring Hellerup', 'hjemmerengøring Gentofte', 'rengøringsfirma nord for København', 'vinduespudsning Klampenborg', 'rengøringshjælp Charlottenlund', 'VIP rengøring Strandvejen', 'WiCare ApS'],
  },
  'the-table': {
    title: 'Privat Kok & Catering i Nord for København | WiCare ApS',
    description: 'Privat madlavning og catering til middage, fejringer og firmafrokoster i Hellerup, Gentofte og omegn. Erfarne kokke, skræddersyede menuer. Ring +45 52 72 11 02.',
    keywords: ['privat kok København', 'privat kok Hellerup', 'catering Gentofte', 'privat madlavning Rudersdal', 'firmacatering nord for København', 'middagsselskab kok Vedbæk', 'WiCare ApS'],
  },
  'the-estate': {
    title: 'Havepleje & Ejendomsservice i Nord for København | WiCare ApS',
    description: 'Havearbejde, handyman, byggeri og ejendomspleje i Rudersdal, Hørsholm, Hellerup og omegn. Én betroet partner til det hele. Ring +45 52 72 11 02.',
    keywords: ['havepleje Rudersdal', 'havearbejde Hørsholm', 'handyman Hellerup', 'ejendomsservice Charlottenlund', 'anlægsgartner nord for København', 'vedligeholdelse villa Rungsted', 'WiCare ApS'],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  const m = daMeta[slug] ?? { title: `${service.name} | WiCare ApS`, description: service.description, keywords: [] };
  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    openGraph: {
      title: m.title,
      description: m.description,
      url: `/services/${service.slug}/`,
      siteName: 'WiCare ApS',
      locale: 'da_DK',
      type: 'website',
    },
    alternates: { canonical: `/services/${service.slug}/` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wicare.vip';
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
              { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteUrl}/#services` },
              { '@type': 'ListItem', position: 3, name: service.name, item: `${siteUrl}/services/${service.slug}/` },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: service.name,
            description: service.description,
            provider: {
              '@type': 'Organization',
              name: 'WiCare ApS',
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
      <ServiceDetail slug={slug as 'the-home' | 'the-table' | 'the-estate'} />
    </>
  );
}
