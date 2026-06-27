import { posts, getPost } from '@/lib/blog';
import { notFound } from 'next/navigation';
import BlogArticle from '@/components/BlogArticle';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wicare.vip';

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const c = post.en;
  return {
    title: `${c.title} | WiCare Group`,
    description: c.description,
    keywords: [post.category, 'North Copenhagen', 'Hellerup', 'Gentofte', 'WiCare Group'],
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      title: c.title,
      description: c.description,
      url: `/blog/${post.slug}/`,
      siteName: 'WiCare Group',
      locale: 'en_DK',
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const c = post.en;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: c.title,
            description: c.description,
            datePublished: post.date,
            dateModified: post.date,
            inLanguage: 'en',
            url: `${siteUrl}/blog/${post.slug}/`,
            mainEntityOfPage: `${siteUrl}/blog/${post.slug}/`,
            image: `${siteUrl}/og-image.png`,
            author: { '@type': 'Organization', name: 'WiCare Group' },
            publisher: {
              '@type': 'Organization',
              name: 'WiCare Group',
              logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` },
            },
          }),
        }}
      />
      <BlogArticle slug={slug} />
    </>
  );
}
