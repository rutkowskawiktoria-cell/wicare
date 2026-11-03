import { areas, getArea } from '@/lib/areas';
import { notFound } from 'next/navigation';
import AreaLanding from '@/components/AreaLanding';

export async function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) return {};
  const title = `Privat kok & catering i ${area.name} | WiCare`;
  const description = `Privat kok og catering i ${area.name} (${area.postal}) – private middage, fester, firmaarrangementer og julefrokost ved en kok med 13+ års erfaring. Også rengøring og erhvervsrengøring. Ring +45 52 72 11 02.`;
  return {
    title,
    description,
    keywords: [
      `privat kok ${area.name}`,
      `catering ${area.name}`,
      `kok ud af huset ${area.name}`,
      `firmacatering ${area.name}`,
      `julefrokost ${area.name}`,
      `kok til fest ${area.name}`,
      `privat middag ${area.name}`,
      `rengøring ${area.name}`,
      `erhvervsrengøring ${area.name}`,
      `havepleje ${area.name}`,
      'nord for København',
      'WiCare ApS',
    ],
    alternates: { canonical: `/omraader/${area.slug}/` },
    openGraph: {
      title,
      description,
      url: `/omraader/${area.slug}/`,
      siteName: 'WiCare ApS',
      locale: 'da_DK',
      type: 'website',
      images: [{ url: '/og-chef.jpg', width: 1200, height: 630, alt: 'WiCare ApS' }],
    },
  };
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wicare.vip';
  const url = `${siteUrl}/omraader/${area.slug}/`;
  const serviceNames = ['Privat kok', 'Catering & firmacatering', 'Fester & selskaber', 'Julefrokost', 'Rengøring & erhvervsrengøring', 'Have & byggeri'];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            '@id': `${url}#business`,
            name: `WiCare ApS – ${area.name}`,
            url,
            telephone: '+4552721102',
            email: 'hello@wicare.vip',
            image: `${siteUrl}/og-chef.jpg`,
            priceRange: '$$$',
            areaServed: { '@type': 'City', name: area.name, postalCode: area.postal, addressCountry: 'DK' },
            address: { '@type': 'PostalAddress', addressLocality: area.name, postalCode: area.postal, addressRegion: 'Hovedstaden', addressCountry: 'DK' },
            makesOffer: serviceNames.map((n) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: `${n} i ${area.name}` } })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
              { '@type': 'ListItem', position: 2, name: 'Områder', item: `${siteUrl}/#services` },
              { '@type': 'ListItem', position: 3, name: area.name, item: url },
            ],
          }),
        }}
      />
      <AreaLanding slug={area.slug} />
    </>
  );
}
