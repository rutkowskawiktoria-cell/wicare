'use client';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-white/10 rounded-lg p-1">
      <button
        onClick={() => setLocale('en')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
          locale === 'en'
            ? 'bg-accent text-white'
            : 'text-gray-600 hover:text-gray-900'
        }`}
        title="English"
      >
        <span>🇬🇧</span>
        <span>EN</span>
      </button>
      <button
        onClick={() => setLocale('da')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
          locale === 'da'
            ? 'bg-accent text-white'
            : 'text-gray-600 hover:text-gray-900'
        }`}
        title="Dansk"
      >
        <span>🇩🇰</span>
        <span>DK</span>
      </button>
    </div>
  );
}
