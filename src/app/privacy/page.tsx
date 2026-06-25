import LegalContent from '@/components/LegalContent';

export const metadata = {
  title: 'Privacy Policy | WiCare Group',
  description: 'Privacy policy for WiCare Group. How we collect, use, and protect your personal data.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy Policy | WiCare Group',
    description: 'Privacy policy for WiCare Group. How we collect, use, and protect your personal data.',
    url: '/privacy',
    siteName: 'WiCare Group',
    locale: 'en_DK',
    type: 'website',
  },
};

export default function PrivacyPage() {
  return <LegalContent kind="privacy" />;
}
