'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Navbar() {
  const { t } = useLanguage();
  const navLinks = [
    { label: t.nav.services, href: '/#services' },
    { label: t.nav.whyWiCare, href: '/#why-us' },
    { label: t.nav.testimonials, href: '/#testimonials' },
    { label: t.nav.contact, href: '/#contact' },
  ];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <div>
              <span className={`font-serif text-xl font-semibold tracking-wide transition-colors duration-300 ${scrolled ? 'text-primary' : 'text-white'}`}>WiCare</span>
              <span className="block text-xs tracking-widest uppercase text-accent">Group</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={`text-sm font-medium tracking-wide transition-colors duration-300 ${scrolled ? 'text-primary hover:text-accent' : 'text-white/90 hover:text-white'}`}>{link.label}</Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <a href="tel:+4552721102" className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${scrolled ? 'text-primary hover:text-accent' : 'text-white/90 hover:text-white'}`}>
              <Phone size={16} /><span>+45 52 72 11 02</span>
            </a>
            <Link href="/#booking" className="bg-accent text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-yellow-600 transition-colors duration-200 shadow-md">{t.nav.bookNow}</Link>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className={`md:hidden transition-colors duration-300 ${scrolled ? 'text-primary' : 'text-white'}`}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="block text-primary font-medium py-2 border-b border-gray-50">{link.label}</Link>
            ))}
            <div className="py-3">
              <LanguageSwitcher />
            </div>
            <Link href="/#booking" onClick={() => setMenuOpen(false)} className="block w-full text-center bg-accent text-white font-medium px-6 py-3 rounded-full mt-4">{t.nav.getStarted}</Link>
          </div>
        </div>
      )}
    </header>
  );
}
