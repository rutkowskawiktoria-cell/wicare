'use client';
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { Locale } from './translations';
import { translations } from './translations';

type I18nContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: string) => string;
};

const I18nContext = createContext<I18nContextType | null>(null);

function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'en';
  const saved = localStorage.getItem('wicare-locale') as Locale | null;
  if (saved === 'en' || saved === 'da') return saved;
  const lang = navigator.language || '';
  if (lang.startsWith('da')) return 'da';
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz === 'Europe/Copenhagen') return 'da';
  } catch {}
  return 'en';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLocaleState(detectLocale());
    setReady(true);
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try { localStorage.setItem('wicare-locale', l); } catch {}
  }, []);

  const t = useCallback((path: string): string => {
    const keys = path.split('.');
    let value: any = translations[locale];
    for (const key of keys) {
      if (value == null) return path;
      value = value[key as keyof typeof value];
    }
    return typeof value === 'string' ? value : path;
  }, [locale]);

  useEffect(() => {
    if (ready) document.documentElement.lang = locale === 'da' ? 'da' : 'en';
  }, [locale, ready]);

  if (!ready) return <>{children}</>;

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
