import BusinessCleaning from '@/components/BusinessCleaning';
import { businessCopy } from '@/lib/business';
import { areas } from '@/lib/areas';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wicare.vip';
const url = `${siteUrl}/erhvervsrengoering/`;
const title = 'Erhvervsrengøring & kontorrengøring nord for København | WiCare ApS';
const description =
  'Erhvervsrengøring af kontorer, klinikker og showrooms i Hellerup, Gentofte, Lyngby, Holte og Hørsholm. Fast team, uden for arbejdstid, pris aftales med jer. Ring +45 52 72 11 02.';

export const metadata = {
  title,
  description,
  keywords: [
    'erhvervsrengøring',
    'kontorrengøring',
    'erhvervsrengøring nord for København',
    'erhvervsrengøring Hellerup',
    'erhvervsrengøring Gentofte',
    'erhvervsrengøring Holte',
    'erhvervsrengøring Hørsholm',
    'erhvervsrengøring Kongens Lyngby',
    'klinikrengøring',
    'rengøringsfirma erhverv',
    'WiCare ApS',
  ],
  alternates: { canonical: '/erhvervsrengoering/' },
  openGraph: {
    title,
    description,
    url: '/erhvervsrengoering/',
    siteName: 'WiCare ApS',
    locale: 'da_DK',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'WiCare ApS' }],
  },
};

export default function Page() {
  const c = businessCopy.da;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            '@id': `${url}#service`,
            name: 'Erhvervsrengøring & kontorrengøring',
            serviceType: 'Erhvervsrengøring',
            url,
            description,
            provider: { '@type': 'LocalBusiness', name: 'WiCare ApS', url: siteUrl, telephone: '+4552721102', email: 'hello@wicare.vip' },
            areaServed: areas.map((a) => ({ '@type': 'City', name: a.name, postalCode: a.postal, addressCountry: 'DK' })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            '@id': `${url}#faq`,
            mainEntity: c.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
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
              { '@type': 'ListItem', position: 1, name: 'Forside', item: `${siteUrl}/` },
              { '@type': 'ListItem', position: 2, name: 'Erhvervsrengøring', item: url },
            ],
          }),
        }}
      />
      <BusinessCleaning />
    </>
  );
}
