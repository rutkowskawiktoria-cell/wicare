import BlogList from '@/components/BlogList';

export const metadata = {
  title: 'Indsigt & guides | WiCare ApS nord for København',
  description: 'Inspiration og praktiske råd om private middage, privat kok og catering – samt hjemmet og haven – i Københavns nordlige forstæder.',
  keywords: ['privat kok tips', 'middagsselskab guide', 'catering inspiration', 'WiCare ApS'],
  alternates: { canonical: '/blog/' },
  openGraph: {
    title: 'Indsigt & guides | WiCare ApS',
    description: 'Inspiration til private middage og catering nord for København.',
    url: '/blog/',
    siteName: 'WiCare ApS',
    locale: 'da_DK',
    type: 'website',
  },
};

export default function BlogPage() {
  return <BlogList />;
}
