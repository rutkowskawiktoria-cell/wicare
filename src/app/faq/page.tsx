import FaqPage from '@/components/FaqPage';
import { translations } from '@/lib/i18n/translations';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wicare.vip';

export const metadata = {
  title: 'FAQ | WiCare ApS North Copenhagen',
  description: "Frequently asked questions about WiCare's VIP home cleaning, private dining and property care in the northern suburbs of Copenhagen.",
  alternates: { canonical: '/faq/' },
  openGraph: {
    title: 'FAQ | WiCare ApS',
    description: 'Common questions about WiCare VIP home and lifestyle services in North Copenhagen.',
    url: '/faq/',
    siteName: 'WiCare ApS',
    locale: 'en_DK',
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
