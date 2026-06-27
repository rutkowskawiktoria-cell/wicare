import BlogList from '@/components/BlogList';

export const metadata = {
  title: 'Insights & Guides | WiCare Group North Copenhagen',
  description: 'Practical advice on luxury home cleaning, private dining and property care in the northern suburbs of Copenhagen: Hellerup, Gentofte, Rudersdal and more.',
  alternates: { canonical: '/blog/' },
  openGraph: {
    title: 'Insights & Guides | WiCare Group',
    description: 'Practical advice on home, lifestyle and property care in the northern suburbs of Copenhagen.',
    url: '/blog/',
    siteName: 'WiCare Group',
    locale: 'en_DK',
    type: 'website',
  },
};

export default function BlogPage() {
  return <BlogList />;
}
