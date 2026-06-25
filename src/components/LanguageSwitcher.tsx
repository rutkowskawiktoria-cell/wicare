'use client';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLocale('en')}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
          locale === 'en'
            ? 'bg-accent text-white'
            : 'bg-light text-gray-600 hover:bg-gray-200'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLocale('da')}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
          locale === 'da'
            ? 'bg-accent text-white'
            : 'bg-light text-gray-600 hover:bg-gray-200'
        }`}
      >
        DK
      </button>
    </div>
  );
}
