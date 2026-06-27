import BusinessCard from '@/components/BusinessCard';

export const metadata = {
  title: 'WiCare Group | Contact Card',
  description: 'WiCare Group digital business card: call, email, save our contact, or scan the QR code. Premium home and lifestyle services in North Copenhagen.',
  alternates: { canonical: '/card/' },
  robots: { index: false, follow: true },
};

export default function CardPage() {
  return <BusinessCard />;
}
