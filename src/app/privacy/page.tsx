import LegalContent from '@/components/LegalContent';

export const metadata = {
  title: 'Privatlivspolitik | WiCare ApS',
  description: 'Privatlivspolitik for WiCare ApS: hvordan vi indsamler, bruger og beskytter dine personoplysninger.',
  alternates: { canonical: '/privacy/' },
  openGraph: {
    title: 'Privatlivspolitik | WiCare ApS',
    description: 'Privatlivspolitik for WiCare ApS: hvordan vi indsamler, bruger og beskytter dine personoplysninger.',
    url: '/privacy/',
    siteName: 'WiCare ApS',
    locale: 'en_DK',
    type: 'website',
  },
};

export default function PrivacyPage() {
  return <LegalContent kind="privacy" />;
}
