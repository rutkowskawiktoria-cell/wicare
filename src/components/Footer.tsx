'use client';
import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { areas } from '@/lib/areas';

// Compact footer: brand + contact | quick links | areas, with legal links in the bottom bar.
export default function Footer() {
  const { t } = useLanguage();
  const link = 'text-white/80 hover:text-accent transition-colors';
  const quickLinks = [
    { href: '/#services', label: t.nav.services },
    { href: '/erhvervsrengoering/', label: t.nav.business },
    { href: '/blog/', label: t.blog.nav },
    { href: '/careers/', label: t.careers.nav },
    { href: '/faq/', label: t.faq.nav },
    { href: '/card/', label: t.card.nav },
    { href: '/#book', label: t.footer.bookNow },
  ];

  return (
    <footer className="bg-primary text-white pt-12 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 text-center md:text-left">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center" aria-label="WiCare ApS home">
              <span className="font-sans text-2xl font-bold tracking-tight text-white">
                Wi<span className="text-[#6BA8CE]">Care</span>
              </span>
            </Link>
            <p className="text-white/70 text-sm max-w-sm mt-3 leading-relaxed mx-auto md:mx-0">{t.footer.tagline}</p>
            <div className="mt-5 space-y-2 text-sm">
              <a href="tel:+4552721102" className={`flex items-center justify-center md:justify-start gap-2 ${link}`}>
                <Phone size={15} />
                +45 52 72 11 02
              </a>
              <a href="mailto:hello@wicare.vip" className={`flex items-center justify-center md:justify-start gap-2 ${link}`}>
                <Mail size={15} />
                hello@wicare.vip
              </a>
            </div>
          </div>

          <div className="lg:col-span-4">
            <h3 className="font-semibold text-sm mb-3">{t.footer.quickLinksTitle}</h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm max-w-xs mx-auto md:mx-0">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 lg:col-span-4">
            <h3 className="font-semibold text-sm mb-3">{t.footer.areasTitle}</h3>
            <div className="flex flex-wrap justify-center md:justify-start gap-x-3 gap-y-2 text-sm">
              {areas.map((a) => (
                <Link key={a.slug} href={`/omraader/${a.slug}/`} className="text-white/70 hover:text-accent transition-colors">
                  {a.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-white/60 text-center md:text-left">
          <p>
            {t.footer.copyright} · {t.footer.cvr}
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className={link}>
              {t.footer.privacy}
            </Link>
            <Link href="/terms" className={link}>
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
