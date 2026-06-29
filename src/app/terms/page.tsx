import LegalContent from '@/components/LegalContent';

export const metadata = {
  title: 'Terms of Service | WiCare ApS',
  description: 'Terms and conditions for WiCare ApS VIP lifestyle services in the northern suburbs of Copenhagen.',
  alternates: { canonical: '/terms/' },
  openGraph: {
    title: 'Terms of Service | WiCare ApS',
    description: 'Terms and conditions for WiCare ApS VIP lifestyle services in the northern suburbs of Copenhagen.',
    url: '/terms/',
    siteName: 'WiCare ApS',
    locale: 'en_DK',
    type: 'website',
  },
};

export default function TermsPage() {
  return <LegalContent kind="terms" />;
}
