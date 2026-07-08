import Partners from '@/components/Partners';

export const metadata = {
  title: 'Partners | Critida Cretan Olive Oil & Delicacies | WiCare ApS',
  description: 'WiCare partners with Critida, an award-winning Cretan producer of extra virgin olive oil and delicacies. WiCare clients can register interest and pre-order.',
  alternates: { canonical: '/partners/' },
  openGraph: {
    title: 'Partners | Critida × WiCare ApS',
    description: 'Pre-order award-winning Cretan extra virgin olive oil and delicacies from our partner Critida.',
    url: '/partners/',
    siteName: 'WiCare ApS',
    locale: 'en_DK',
    type: 'website',
  },
};

export default function PartnersPage() {
  return <Partners />;
}
