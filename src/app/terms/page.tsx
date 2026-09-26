import LegalContent from '@/components/LegalContent';

export const metadata = {
  title: 'Servicevilkår | WiCare ApS',
  description: 'Servicevilkår for WiCare ApS – VIP-services til hjem og virksomheder i Københavns nordlige forstæder.',
  alternates: { canonical: '/terms/' },
  openGraph: {
    title: 'Servicevilkår | WiCare ApS',
    description: 'Servicevilkår for WiCare ApS – VIP-services til hjem og virksomheder i Københavns nordlige forstæder.',
    url: '/terms/',
    siteName: 'WiCare ApS',
    locale: 'en_DK',
    type: 'website',
  },
};

export default function TermsPage() {
  return <LegalContent kind="terms" />;
}
