'use client';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { posts } from '@/lib/blog';

export default function BlogList() {
  const { t, locale } = useLanguage();
  const ordered = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <section className="bg-primary pt-20 pb-16" style={{ paddingTop: '6.5rem' }}>
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <p className="text-accent text-xs tracking-widest uppercase font-semibold mb-3">{t.blog.badge}</p>
            <h1 className="font-serif text-4xl md:text-5xl text-white font-semibold mb-4">{t.blog.heading}</h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">{t.blog.subheading}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {ordered.map((post) => {
              const c = post[locale];
              return (
                <Link key={post.slug} href={`/blog/${post.slug}/`} className="group block bg-light rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4 text-xs">
                    <span className="text-accent-dark font-semibold uppercase tracking-wider">{post.category}</span>
                    <span className="text-gray-400 flex items-center gap-1"><Clock size={12} />{post.readingMins} {t.blog.minRead}</span>
                  </div>
                  <h2 className="font-serif text-xl md:text-2xl text-primary font-semibold mb-3 leading-snug group-hover:text-accent-dark transition-colors">{c.title}</h2>
                  <p className="text-gray-600 text-base leading-relaxed mb-5 break-words">{c.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-dark group-hover:gap-2.5 transition-all">
                    {t.blog.readMore} <ArrowRight size={15} />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
