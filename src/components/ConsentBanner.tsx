'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';

declare global {
  interface Window { dataLayer: unknown[]; }
}

export default function ConsentBanner() {
  const { t } = useLanguage();
  const c = t.consent;
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('wicare-consent');
      if (stored !== 'granted' && stored !== 'denied') setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  const decide = (granted: boolean) => {
    try { localStorage.setItem('wicare-consent', granted ? 'granted' : 'denied'); } catch {}
    if (granted) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(['consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted',
      }]);
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-primary/97 backdrop-blur-md border-t border-white/15 shadow-2xl">
      <div className="max-w-5xl mx-auto px-5 py-4 flex flex-col sm:flex-row items-center gap-4">
        <p className="text-white/85 text-sm leading-relaxed flex-1 text-center sm:text-left">
          {c.text}{' '}
          <Link href="/privacy/" className="text-accent underline underline-offset-2 hover:text-accent/80">{c.privacy}</Link>
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button type="button" onClick={() => decide(false)} className="text-white/70 hover:text-white text-sm font-medium px-4 py-2.5">
            {c.decline}
          </button>
          <button type="button" onClick={() => decide(true)} className="bg-accent hover:bg-accent-deep text-primary font-semibold text-sm px-6 py-2.5 rounded-full transition-colors">
            {c.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
