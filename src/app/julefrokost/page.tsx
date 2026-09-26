import LandingPage from '@/components/LandingPage';
import { landingSchemas } from '@/lib/landingMeta';

const title = 'Julefrokost med privat kok & catering nord for København | WiCare';
const description =
  'Firmajulefrokost eller julefrokost derhjemme i Hellerup, Gentofte, Lyngby, Holte og Hørsholm. Vores kok laver maden hos jer – menu og pris aftales med jer. Ring +45 52 72 11 02.';

export const metadata = {
  title,
  description,
  keywords: [
    'julefrokost catering',
    'firmajulefrokost',
    'julefrokost privat kok',
    'julefrokost Hellerup',
    'julefrokost Gentofte',
    'julefrokost Kongens Lyngby',
    'julefrokost Holte',
    'julefrokost Hørsholm',
    'julefrokost nord for København',
    'WiCare ApS',
  ],
  alternates: { canonical: '/julefrokost/' },
  openGraph: {
    title,
    description,
    url: '/julefrokost/',
    siteName: 'WiCare ApS',
    locale: 'da_DK',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'WiCare ApS' }],
  },
};

export default function Page() {
  const schemas = landingSchemas('julefrokost', 'Julefrokost med privat kok', 'Julefrokost catering', description);
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <LandingPage page="julefrokost" />
    </>
  );
}
