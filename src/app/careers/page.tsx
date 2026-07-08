import Careers from '@/components/Careers';

export const metadata = {
  title: 'Karriere | Bliv en del af WiCare ApS – Nord for København',
  description: 'WiCare modtager gerne uopfordrede ansøgninger fra dygtige fagfolk inden for rengøring, privat madlavning og havepleje i Københavns nordlige forstæder. Ansøg via e-mail.',
  keywords: ['job rengøring nord for København', 'kok job Hellerup', 'gartner job Gentofte', 'WiCare ApS karriere'],
  alternates: { canonical: '/careers/' },
  openGraph: {
    title: 'Karriere hos WiCare ApS',
    description: 'Vi modtager gerne uopfordrede ansøgninger fra dygtige fagfolk inden for rengøring, privat madlavning og havepleje i Københavns nordlige forstæder.',
    url: '/careers/',
    siteName: 'WiCare ApS',
    locale: 'da_DK',
    type: 'website',
  },
};

export default function CareersPage() {
  return <Careers />;
}
