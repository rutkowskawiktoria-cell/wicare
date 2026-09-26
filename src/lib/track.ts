// Call / contact tracking for GA4 (Sept 2026).
// The owner wants calls, not forms, so every click on a phone, WhatsApp, SMS or e-mail link is sent
// to GA4 as the recommended `generate_lead` event (params: method, link_location, page_path).
// It is sent with gtag('event', …): GA4 is loaded through GTM's Google tag, which processes gtag()
// commands from the dataLayer. The GTM container has NO trigger for custom dataLayer events, so do not
// also add one for generate_lead or every lead will be counted twice.
// One delegated listener (ContactTracking.tsx, mounted in layout.tsx) covers every link on the site;
// add data-lead="false" to a link that should not count (e.g. job applications on /careers).

type Win = { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] };

export function contactMethod(href: string): string | null {
  if (href.startsWith('tel:')) return 'phone';
  if (href.startsWith('sms:')) return 'sms';
  if (href.startsWith('mailto:')) return 'email';
  if (href.includes('wa.me/') || href.includes('api.whatsapp.com')) return 'whatsapp';
  return null;
}

export function sendLead(method: string, linkLocation: string) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as Win;
  const params = { method, link_location: linkLocation, page_path: window.location.pathname };
  if (typeof w.gtag === 'function') {
    w.gtag('event', 'generate_lead', params);
  } else {
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: 'generate_lead', ...params });
  }
}
