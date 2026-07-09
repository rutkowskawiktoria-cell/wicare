'use client';
import { Mail, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Careers() {
  const { t } = useLanguage();
  const c = t.careers;
  const mailto = `mailto:wicareaps@gmail.com?subject=${encodeURIComponent(c.emailSubject)}&body=${encodeURIComponent(c.emailBody)}`;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <section className="bg-primary pt-20 pb-16" style={{ paddingTop: '6.5rem' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <p className="text-accent text-xs tracking-widest uppercase font-semibold mb-3">{c.badge}</p>
            <h1 className="font-serif text-4xl md:text-5xl text-white font-semibold mb-5">{c.heading}</h1>
            <p className="text-white/75 text-lg md:text-xl leading-relaxed">{c.intro}</p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6 lg:px-8 -mt-10 relative z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/careers.webp" alt="A WiCare professional at work" className="w-full h-56 md:h-80 object-cover rounded-2xl shadow-2xl" width={1200} height={520} />
        </div>

        <section className="py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="font-serif text-2xl md:text-3xl text-primary font-semibold mb-6">{c.lookingTitle}</h2>
            <ul className="space-y-3 mb-14">
              {c.looking.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={22} className="text-accent-dark mt-1 flex-shrink-0" />
                  <span className="text-gray-700 text-lg leading-relaxed break-words">{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="font-serif text-2xl md:text-3xl text-primary font-semibold mb-3">{c.howTitle}</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">{c.howIntro}</p>
            <ol className="space-y-4 mb-12">
              {c.items.map((item, i) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-primary font-bold flex items-center justify-center text-sm">{i + 1}</span>
                  <span className="text-gray-800 text-lg leading-relaxed break-words pt-0.5">{item}</span>
                </li>
              ))}
            </ol>

            <div className="bg-light rounded-2xl p-8 text-center">
              <a href={mailto} className="inline-flex items-center justify-center gap-3 bg-accent hover:bg-accent-deep text-primary font-bold px-8 py-4 rounded-full transition-all duration-300 text-base tracking-wide uppercase shadow-lg">
                <Mail size={20} />{c.applyCta}
              </a>
              <p className="text-gray-600 text-base mt-5">
                {c.emailNote.split('wicareaps@gmail.com')[0]}
                <a href={mailto} className="text-accent-dark font-semibold underline underline-offset-2 break-words">wicareaps@gmail.com</a>
                {c.emailNote.split('wicareaps@gmail.com')[1] || ''}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
