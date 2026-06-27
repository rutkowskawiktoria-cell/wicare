'use client';
import { Phone, Mail, Globe, UserPlus, MapPin } from 'lucide-react';
import Logo from '@/components/Logo';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function BusinessCard() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-primary flex flex-col items-center justify-center px-5 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-primary px-6 pt-10 pb-8 text-center">
          <div className="flex justify-center mb-4">
            <Logo size={84} />
          </div>
          <h1 className="font-serif text-4xl text-white font-semibold tracking-wide">WiCare</h1>
          <p className="text-accent text-base tracking-wider mt-1">wicare.vip</p>
          <p className="text-white/85 text-lg mt-4 leading-snug">{t.card.tagline}</p>
          <p className="text-white/60 text-base mt-3 flex items-center justify-center gap-2">
            <MapPin size={18} className="text-accent" />{t.card.area}
          </p>
        </div>

        {/* Actions */}
        <div className="px-6 py-8 space-y-4">
          <a href="tel:+4552721102" className="flex items-center justify-center gap-3 bg-accent hover:bg-yellow-600 text-white font-bold text-2xl py-5 rounded-2xl shadow-lg transition-colors">
            <Phone size={28} />+45 52 72 11 02
          </a>
          <p className="text-center text-gray-500 text-base">{t.card.call}</p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <a href="mailto:wicare.cleaning@gmail.com" className="flex flex-col items-center justify-center gap-2 border-2 border-primary text-primary hover:border-accent hover:text-accent-dark py-5 rounded-2xl transition-colors">
              <Mail size={26} /><span className="font-semibold text-base">{t.card.email}</span>
            </a>
            <a href="/wicare.vcf" download className="flex flex-col items-center justify-center gap-2 border-2 border-primary text-primary hover:border-accent hover:text-accent-dark py-5 rounded-2xl transition-colors">
              <UserPlus size={26} /><span className="font-semibold text-base">{t.card.save}</span>
            </a>
          </div>

          <a href="https://wicare.vip/" className="flex items-center justify-center gap-3 bg-primary hover:bg-secondary text-white font-semibold text-lg py-4 rounded-2xl transition-colors mt-2">
            <Globe size={22} />{t.card.website}
          </a>

          {/* QR */}
          <div className="flex flex-col items-center pt-6">
            <div className="bg-white p-3 rounded-2xl border-2 border-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/qr-wicare.png" alt="QR code to wicare.vip" width={180} height={180} />
            </div>
            <p className="text-gray-500 text-base mt-3 text-center">{t.card.scan}</p>
          </div>
        </div>

        <div className="px-6 pb-6 flex flex-col items-center gap-3 border-t border-gray-100 pt-5">
          <LanguageSwitcher />
          <p className="text-gray-400 text-sm">CVR-nummer: 46213270</p>
        </div>
      </div>
    </main>
  );
}
