'use client';
import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import Logo from './Logo';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-primary text-white py-14 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <Link href="/" className="flex items-center gap-3" aria-label="WiCare Group home">
            <Logo size={44} />
            <div className="text-left">
              <span className="font-serif text-2xl font-semibold tracking-wide">WiCare</span>
              <span className="block text-xs tracking-[0.25em] uppercase text-accent">Group</span>
            </div>
          </Link>
          <p className="text-white/70 text-base max-w-md mt-5 leading-relaxed">{t.footer.tagline}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-center md:text-left">
          <div>
            <h3 className="font-semibold mb-4">{t.footer.contactTitle}</h3>
            <div className="space-y-2">
              <a href="tel:+4552721102" className="flex items-center gap-2 text-white/85 hover:text-accent transition-colors">
                <Phone size={16} />
                +45 52 72 11 02
              </a>
              <a href="mailto:wicare.cleaning@gmail.com" className="flex items-center gap-2 text-white/85 hover:text-accent transition-colors">
                <Mail size={16} />
                wicare.cleaning@gmail.com
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t.footer.quickLinksTitle}</h3>
            <div className="space-y-2">
              <Link href="/#services" className="block text-white/85 hover:text-accent transition-colors">{t.nav.services}</Link>
              <Link href="/blog/" className="block text-white/85 hover:text-accent transition-colors">{t.blog.nav}</Link>
              <Link href="/#testimonials" className="block text-white/85 hover:text-accent transition-colors">{t.nav.testimonials}</Link>
              <Link href="/#booking" className="block text-white/85 hover:text-accent transition-colors">{t.footer.bookNow}</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t.footer.legalTitle}</h3>
            <div className="space-y-2">
              <Link href="/privacy" className="block text-white/85 hover:text-accent transition-colors">{t.footer.privacy}</Link>
              <Link href="/terms" className="block text-white/85 hover:text-accent transition-colors">{t.footer.terms}</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-accent text-xs tracking-widest uppercase font-semibold mb-2">{t.footer.areasTitle}</p>
          <p className="text-white/70 text-sm max-w-3xl mx-auto mb-8 leading-relaxed whitespace-pre-line">{t.footer.areas}</p>
        </div>
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/75 text-sm">{t.footer.copyright}</p>
          <p className="text-white/60 text-sm mt-1">{t.footer.cvr}</p>
        </div>
      </div>
    </footer>
  );
}
