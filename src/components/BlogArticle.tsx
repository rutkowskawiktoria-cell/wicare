'use client';
import Link from 'next/link';
import { ArrowLeft, Clock, Phone } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { getPost } from '@/lib/blog';

export default function BlogArticle({ slug }: { slug: string }) {
  const { t, locale } = useLanguage();
  const post = getPost(slug);
  if (!post) return null;
  const c = post[locale];
  const dateStr = new Date(post.date).toLocaleDateString(locale === 'da' ? 'da-DK' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <article>
          <header className="bg-primary pt-20 pb-16" style={{ paddingTop: '6.5rem' }}>
            <div className="max-w-3xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-5 text-xs">
                <span className="text-accent font-semibold uppercase tracking-wider">{post.category}</span>
                <span className="text-white/50 flex items-center gap-1"><Clock size={12} />{post.readingMins} {t.blog.minRead}</span>
                <span className="text-white/50">{dateStr}</span>
              </div>
              <h1 className="font-serif text-3xl md:text-5xl text-white font-semibold leading-tight">{c.title}</h1>
            </div>
          </header>

          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
            <p className="text-xl text-gray-700 leading-relaxed mb-10 font-light">{c.intro}</p>
            {c.sections.map((s, i) => (
              <div key={i} className="mb-9">
                {s.h && <h2 className="font-serif text-2xl text-primary font-semibold mb-3 break-words">{s.h}</h2>}
                <p className="text-gray-700 text-lg leading-relaxed break-words">{s.p}</p>
              </div>
            ))}

            <div className="mt-12 bg-light rounded-2xl p-8 text-center">
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">{c.cta}</p>
              <a href="tel:+4552721102" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-deep text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 text-sm tracking-wide uppercase shadow-lg">
                <Phone size={18} />+45 52 72 11 02
              </a>
            </div>

            <div className="mt-12 text-center">
              <Link href="/blog/" className="inline-flex items-center gap-2 text-primary hover:text-accent-dark font-medium transition-colors">
                <ArrowLeft size={16} />{t.blog.backToBlog}
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
