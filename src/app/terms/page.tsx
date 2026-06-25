import LegalContent from '@/components/LegalContent';

export const metadata = {
  title: 'Terms of Service | WiCare Group',
  description: 'Terms and conditions for WiCare Group premium lifestyle services in Copenhagen.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms of Service | WiCare Group',
    description: 'Terms and conditions for WiCare Group premium lifestyle services in Copenhagen.',
    url: '/terms',
    siteName: 'WiCare Group',
    locale: 'en_DK',
    type: 'website',
  },
};

export default function TermsPage() {
  return <LegalContent kind="terms" />;
}
