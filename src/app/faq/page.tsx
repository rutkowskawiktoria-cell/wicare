import FaqPage from '@/components/FaqPage';
import { translations } from '@/lib/i18n/translations';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wicare.vip';

export const metadata = {
  title: 'Ofte Stillede Spørgsmål | WiCare ApS Nord for København',
  description: 'Svar på almindelige spørgsmål om WiCares VIP rengøring, private madlavning og havepleje i Hellerup, Gentofte, Rudersdal og Københavns nordlige forstæder.',
  keywords: ['rengøring nord for København', 'privat kok Hellerup', 'havepleje Gentofte', 'WiCare ApS'],
  alternates: { canonical: '/faq/' },
  openGraph: {
    title: 'Ofte Stillede Spørgsmål | WiCare ApS',
    description: 'Almindelige spørgsmål om WiCares VIP hjem- og livsstilsservice i Københavns nordlige forstæder.',
    url: '/faq/',
    siteName: 'WiCare ApS',
    locale: 'da_DK',
    type: 'website',
  },
};

export default function Page() {
  const faq = translations.en.faq;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            '@id': `${siteUrl}/faq/#faq`,
            mainEntity: faq.items.map((it) => ({
              '@type': 'Question',
              name: it.q,
              acceptedAnswer: { '@type': 'Answer', text: it.a },
            })),
          }),
        }}
      />
      <FaqPage />
    </>
  );
}
