import { landings, type LandingKey } from '@/lib/landings';
import { areas } from '@/lib/areas';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wicare.vip';

// JSON-LD for the catering landing pages (Danish text = what is rendered by default).
export function landingSchemas(page: LandingKey, serviceName: string, serviceType: string, description: string) {
  const url = `${siteUrl}/${page}/`;
  const c = landings[page].da;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: serviceName,
      serviceType,
      url,
      description,
      provider: { '@type': 'LocalBusiness', name: 'WiCare ApS', url: siteUrl, telephone: '+4552721102', email: 'hello@wicare.vip' },
      areaServed: areas.map((a) => ({ '@type': 'City', name: a.name, postalCode: a.postal, addressCountry: 'DK' })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: c.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Forside', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: c.h1, item: url },
      ],
    },
  ];
}
