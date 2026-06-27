'use client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6 py-32">
        <div className="text-center max-w-lg">
          <p className="font-serif text-7xl text-accent-dark font-bold mb-4">404</p>
          <h1 className="font-serif text-3xl md:text-4xl text-primary font-semibold mb-4">{t.notFound.title}</h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">{t.notFound.desc}</p>
          <Link href="/" className="inline-flex items-center justify-center bg-accent hover:bg-accent-deep text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 text-sm tracking-wide uppercase shadow-lg">
            {t.notFound.home}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
