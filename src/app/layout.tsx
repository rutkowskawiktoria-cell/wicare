import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#12302A",
  width: "device-width",
  initialScale: 1,
};
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import ConsentBanner from "@/components/ConsentBanner";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://wicare.vip";

export const metadata: Metadata = {
  title: "WiCare ApS | VIP Rengøring, Privat Kok & Havepleje – Nord for København",
  description: "VIP hjemmerengøring, privat madlavning & catering og ejendoms- & havepleje i Københavns nordlige forstæder: Hellerup, Gentofte, Charlottenlund, Rudersdal, Hørsholm m.fl. Diskret, professionel service. Ring +45 52 72 11 02.",
  keywords: ["rengøring Hellerup", "hjemmerengøring Gentofte", "rengøringsfirma nord for København", "privat kok København", "catering Hellerup", "havepleje Rudersdal", "vinduespudsning Klampenborg", "ejendomsservice Charlottenlund", "handyman Hørsholm", "VIP rengøring Strandvejen", "rengøringshjælp Rungsted", "privat madlavning Vedbæk", "WiCare"],
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", locale: "da_DK", alternateLocale: "en_DK", siteName: "WiCare ApS",
    title: "WiCare ApS | VIP Rengøring, Privat Kok & Havepleje – Nord for København",
    description: "Diskret VIP hjemmerengøring, privat madlavning & catering og havepleje i Hellerup, Gentofte, Rudersdal og resten af Københavns nordlige forstæder.",
    url: siteUrl,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "WiCare ApS" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WiCare ApS | VIP Rengøring, Privat Kok & Havepleje",
    description: "Diskret VIP hjem- og livsstilsservice i Københavns nordlige forstæder.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da" suppressHydrationWarning>
      <head>
        {/* Fonts — non-blocking, self-swapping to avoid render-block */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap" />
        {/* Preload LCP hero image */}
        <link rel="preload" as="image" href="/hero-bg.webp" fetchPriority="high" />
        {/* Consent Mode v2 — deny non-essential storage until the visitor opts in (GDPR) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
var __c=null;try{__c=localStorage.getItem('wicare-consent');}catch(e){}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
if(__c==='granted'){gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});}`,
          }}
        />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TXV53GK8');`,
          }}
        />
        {/* End Google Tag Manager */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": `${siteUrl}/#business`,
              name: "WiCare ApS",
              url: siteUrl,
              logo: `${siteUrl}/logo.png`,
              image: `${siteUrl}/og-image.png`,
              priceRange: "$$$",
              slogan: "Discretion. Precision. Trust.",
              description: "VIP home and lifestyle services for private residences and professionals across the northern suburbs of Copenhagen: cleaning, private dining, and property care.",
              address: { "@type": "PostalAddress", addressLocality: "Hellerup", addressRegion: "Capital Region of Denmark", addressCountry: "DK" },
              geo: { "@type": "GeoCoordinates", latitude: 55.7320, longitude: 12.5640 },
              openingHoursSpecification: [
                { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
              ],
              areaServed: [
                { "@type": "City", name: "Hellerup" },
                { "@type": "City", name: "Charlottenlund" },
                { "@type": "City", name: "Klampenborg" },
                { "@type": "City", name: "Gentofte" },
                { "@type": "AdministrativeArea", name: "Rudersdal" },
                { "@type": "AdministrativeArea", name: "Hørsholm" },
                { "@type": "City", name: "Rungsted" },
                { "@type": "City", name: "Vedbæk" },
              ],
              telephone: "+4552721102",
              email: "wicareaps@gmail.com",
              foundingDate: "2026",
              taxID: "46213270",
              vatID: "DK46213270",
              identifier: { "@type": "PropertyValue", propertyID: "CVR", value: "46213270" },
              founder: { "@type": "Person", name: "WiCare" },
              sameAs: [],
              brand: [
                { "@type": "Brand", name: "Home Cleaning", description: "VIP home cleaning, tailored to your needs, from deep cleaning to specialized care" },
                { "@type": "Brand", name: "Private Dining & Catering", description: "Private chef dining and executive catering" },
                { "@type": "Brand", name: "Property & Garden Care", description: "Gardening, handyman, and property maintenance" },
              ],
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TXV53GK8"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <LanguageProvider>
          {children}
          <ConsentBanner />
        </LanguageProvider>
      </body>
    </html>
  );
}
