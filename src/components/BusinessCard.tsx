'use client';
import { Phone, Mail, Globe, UserPlus, MapPin, MessageSquare } from 'lucide-react';
import Logo from '@/components/Logo';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/lib/i18n/LanguageContext';

function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function BusinessCard() {
  const { t } = useLanguage();
  const wa = `https://wa.me/4552721102?text=${encodeURIComponent(t.floating.whatsappMsg)}`;

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
          <a href="tel:+4552721102" className="flex items-center justify-center gap-3 bg-accent hover:bg-accent-deep text-black font-bold text-2xl py-5 rounded-2xl shadow-lg transition-colors">
            <Phone size={28} />+45 52 72 11 02
          </a>
          <p className="text-center text-gray-500 text-base">{t.card.call}</p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white py-5 rounded-2xl transition-colors">
              <WhatsAppIcon size={26} /><span className="font-semibold text-base">{t.card.whatsapp}</span>
            </a>
            <a href="sms:+4552721102" className="flex flex-col items-center justify-center gap-2 bg-primary hover:bg-secondary text-white py-5 rounded-2xl transition-colors">
              <MessageSquare size={26} /><span className="font-semibold text-base">{t.card.sms}</span>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <a href="mailto:wicareaps@gmail.com" className="flex flex-col items-center justify-center gap-2 border-2 border-primary text-primary hover:border-accent hover:text-accent-dark py-5 rounded-2xl transition-colors">
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
