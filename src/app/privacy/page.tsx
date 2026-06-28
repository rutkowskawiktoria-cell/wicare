import LegalContent from '@/components/LegalContent';

export const metadata = {
  title: 'Privacy Policy | WiCare ApS',
  description: 'Privacy policy for WiCare ApS. How we collect, use, and protect your personal data.',
  alternates: { canonical: '/privacy/' },
  openGraph: {
    title: 'Privacy Policy | WiCare ApS',
    description: 'Privacy policy for WiCare ApS. How we collect, use, and protect your personal data.',
    url: '/privacy/',
    siteName: 'WiCare ApS',
    locale: 'en_DK',
    type: 'website',
  },
};

export default function PrivacyPage() {
  return <LegalContent kind="privacy" />;
}
