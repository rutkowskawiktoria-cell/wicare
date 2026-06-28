import Careers from '@/components/Careers';

export const metadata = {
  title: 'Careers | Join WiCare Group, North Copenhagen',
  description: 'WiCare welcomes unsolicited applications from exceptional home cleaning, private chef, and property care professionals in North Copenhagen. Apply by email.',
  alternates: { canonical: '/careers/' },
  openGraph: {
    title: 'Careers | Join WiCare Group',
    description: 'We welcome unsolicited applications from exceptional people across home cleaning, private dining, and property care in North Copenhagen.',
    url: '/careers/',
    siteName: 'WiCare Group',
    locale: 'en_DK',
    type: 'website',
  },
};

export default function CareersPage() {
  return <Careers />;
}
