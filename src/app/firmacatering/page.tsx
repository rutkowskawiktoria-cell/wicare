import LandingPage from '@/components/LandingPage';
import { landingSchemas } from '@/lib/landingMeta';

const title = 'Firmacatering nord for København – møder, receptioner & events | WiCare';
const description =
  'Firmacatering til møder, frokoster, receptioner og kundearrangementer i Hellerup, Gentofte, Lyngby, Holte og Hørsholm. Vores kok har 13+ års erfaring, bl.a. fra Michelin-restauranter og Folketinget. Ring +45 52 72 11 02.';

export const metadata = {
  title,
  description,
  keywords: [
    'firmacatering',
    'firmacatering nord for København',
    'catering til møder',
    'reception catering',
    'firmafrokost',
    'catering Hellerup',
    'catering Gentofte',
    'catering Kongens Lyngby',
    'privat kok firmaarrangement',
    'WiCare ApS',
  ],
  alternates: { canonical: '/firmacatering/' },
  openGraph: {
    title,
    description,
    url: '/firmacatering/',
    siteName: 'WiCare ApS',
    locale: 'da_DK',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'WiCare ApS' }],
  },
};

export default function Page() {
  const schemas = landingSchemas('firmacatering', 'Firmacatering', 'Catering', description);
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <LandingPage page="firmacatering" />
    </>
  );
}
