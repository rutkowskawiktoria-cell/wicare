'use client';
import { useEffect } from 'react';
import { contactMethod, sendLead } from '@/lib/track';

// One delegated listener for every phone / WhatsApp / SMS / e-mail link on the site (see src/lib/track.ts).
export default function ContactTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const a = target?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a || a.dataset.lead === 'false') return;
      const method = contactMethod(a.getAttribute('href') || '');
      if (!method) return;
      const area = a.closest('[data-loc], section[id], header, footer');
      const loc = area?.getAttribute('data-loc') || area?.id || area?.tagName.toLowerCase() || 'page';
      sendLead(method, loc);
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);
  return null;
}
