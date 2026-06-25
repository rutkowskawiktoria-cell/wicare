import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'WiCare Group | Elite Home & Lifestyle Services Copenhagen',
  description: 'WiCare Group — Denmark\'s premier luxury lifestyle services group. WiClean, WiCook, WiHelp, WiShine, WiWardrobe, WiScent, WiDevice, WiPaws, WiGreen. Serving CEOs, executives, and high-net-worth families across Copenhagen.',
  keywords: ['luxury home services Copenhagen','private chef Copenhagen','premium cleaning Denmark','executive lifestyle services','WiCare','concierge services Copenhagen','high net worth services Denmark'],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002'),
  openGraph: {
    type: 'website', locale: 'en_DK', siteName: 'WiCare Group',
    title: 'WiCare Group | Elite Home & Lifestyle Services',
    description: 'Elite home and lifestyle services delivered with discretion, precision, and trust.',
  },
  robots: { index: true, follow: true },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context':'https://schema.org','@type':'LocalBusiness',
          name:'WiCare Group',
          description:'Elite home and lifestyle services for high-net-worth individuals in Copenhagen',
          telephone:'+4552721102',email:'wicare.cleaning@gmail.com',
          address:{'@type':'PostalAddress',addressLocality:'Copenhagen',addressCountry:'DK'},
          priceRange:'$$$$'
        })}} />
      </head>
      <body>{children}</body>
    </html>
  );
}
