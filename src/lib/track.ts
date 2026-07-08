// Lightweight dataLayer event helper for GTM/GA4 conversion tracking.
export function track(method: string, event = 'cta_click') {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, method });
}
