import BusinessCard from '@/components/BusinessCard';

export const metadata = {
  title: 'WiCare ApS | Kontaktkort',
  description: 'WiCare ApS digitalt visitkort: ring, skriv, gem kontakten eller scan QR-koden. Privat kok & catering nord for København.',
  alternates: { canonical: '/card/' },
  robots: { index: false, follow: true },
};

export default function CardPage() {
  return <BusinessCard />;
}
