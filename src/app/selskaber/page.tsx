import LandingPage from '@/components/LandingPage';
import { landingSchemas } from '@/lib/landingMeta';

const title = 'Privat kok til fester & selskaber nord for København | WiCare';
const description =
  'Privat kok til fødselsdag, konfirmation, bryllup og havefest i Hellerup, Gentofte, Lyngby, Holte og Hørsholm. Maden laves hos jer – menu og pris aftales med jer. Ring +45 52 72 11 02.';

export const metadata = {
  title,
  description,
  keywords: [
    'privat kok til fest',
    'kok til fest',
    'catering til fest',
    'kok til konfirmation',
    'konfirmation catering',
    'kok til bryllup',
    'bryllup catering',
    'kok til fødselsdag',
    'catering fødselsdag',
    'havefest catering',
    'selskaber nord for København',
    'WiCare ApS',
  ],
  alternates: { canonical: '/selskaber/' },
  openGraph: {
    title,
    description,
    url: '/selskaber/',
    siteName: 'WiCare ApS',
    locale: 'da_DK',
    type: 'website',
    images: [{ url: '/og-chef.jpg', width: 1200, height: 630, alt: 'WiCare ApS' }],
  },
};

export default function Page() {
  const schemas = landingSchemas('selskaber', 'Privat kok til fester og selskaber', 'Catering til fester og selskaber', description);
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <LandingPage page="selskaber" />
    </>
  );
}
