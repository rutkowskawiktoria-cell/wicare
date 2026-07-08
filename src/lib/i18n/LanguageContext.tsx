'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, type Locale } from './translations';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (typeof translations)['en'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children, initialLocale }: { children: ReactNode; initialLocale?: Locale }) {
  // Danish is the primary market, so the statically-rendered (crawlable) HTML
  // defaults to Danish. Non-Danish visitors are switched to English client-side below.
  const [locale, setLocaleState] = useState<Locale>(initialLocale || 'da');

  useEffect(() => {
    if (initialLocale) return;

    // 1. A manual choice always wins.
    const stored = localStorage.getItem('wicare-locale');
    if (stored === 'en' || stored === 'da') {
      setLocaleState(stored);
      return;
    }

    // 2. Fast first guess from the browser language while geo loads.
    const browserDanish = (navigator.language || '').toLowerCase().startsWith('da');
    setLocaleState(browserDanish ? 'da' : 'en');

    // 3. Refine by visitor country: Danish only inside Denmark, English elsewhere.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);
    fetch('https://ipapi.co/country/', { signal: controller.signal })
      .then((r) => (r.ok ? r.text() : ''))
      .then((country) => {
        const c = country.trim().toUpperCase();
        if (c === 'DK') setLocaleState('da');
        else if (c) setLocaleState('en');
      })
      .catch(() => {})
      .finally(() => clearTimeout(timeout));
  }, [initialLocale]);

  useEffect(() => {
    if (typeof document !== 'undefined') document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('wicare-locale', newLocale);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: translations[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
