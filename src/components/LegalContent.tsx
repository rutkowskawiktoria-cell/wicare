'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function LegalContent({ kind }: { kind: 'privacy' | 'terms' }) {
  const { t } = useLanguage();
  const doc = t.legal[kind];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <section className="bg-primary pt-20 pb-16" style={{ paddingTop: '5.5rem' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="font-serif text-4xl md:text-5xl text-white font-semibold">{doc.title}</h1>
            <p className="text-white/60 mt-4">{doc.updated}</p>
          </div>
        </section>
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 prose prose-gray prose-lg">
            {doc.sections.map((s) => (
              <div key={s.h}>
                <h2>{s.h}</h2>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
