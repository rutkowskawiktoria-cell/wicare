import BlogList from '@/components/BlogList';

export const metadata = {
  title: 'Indsigt & Guides | WiCare ApS Nord for København',
  description: 'Praktiske råd om VIP rengøring, privat madlavning og havepleje i Københavns nordlige forstæder: Hellerup, Gentofte, Rudersdal og flere.',
  keywords: ['rengøring guide København', 'privat kok tips', 'havepleje råd nord for København', 'WiCare ApS'],
  alternates: { canonical: '/blog/' },
  openGraph: {
    title: 'Indsigt & Guides | WiCare ApS',
    description: 'Praktiske råd om hjem, livsstil og ejendomspleje i Københavns nordlige forstæder.',
    url: '/blog/',
    siteName: 'WiCare ApS',
    locale: 'da_DK',
    type: 'website',
  },
};

export default function BlogPage() {
  return <BlogList />;
}
