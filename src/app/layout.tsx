import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#12302A",
  width: "device-width",
  initialScale: 1,
};
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://wicare.vip";

export const metadata: Metadata = {
  title: "WiCare ApS | VIP Home & Lifestyle Services, North Copenhagen",
  description: "WiCare ApS offers VIP home and lifestyle services in the northern suburbs of Copenhagen: The Home, The Table, and The Estate.",
  keywords: ["VIP home services North Copenhagen", "private chef Hellerup", "premium cleaning Gentofte", "executive lifestyle services Rudersdal", "WiCare", "concierge services Hellerup", "home services Hørsholm", "property care Charlottenlund", "Strandvejen luxury services", "The Home", "The Table", "The Estate"],
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", locale: "en_DK", siteName: "WiCare ApS",
    title: "WiCare ApS | VIP Home & Lifestyle Services",
    description: "VIP home and lifestyle services delivered with discretion, precision, and trust, across the northern suburbs of Copenhagen.",
    url: siteUrl,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "WiCare ApS" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WiCare ApS | VIP Home & Lifestyle Services",
    description: "VIP home and lifestyle services delivered with discretion, precision, and trust.",
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
    <html lang="en" suppressHydrationWarning>
      <head>
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
                { "@type": "Brand", name: "The Home", description: "Executive Home Cleaning, tailored to your needs, from deep cleaning to specialized care" },
                { "@type": "Brand", name: "The Table", description: "Private Dining & Catering" },
                { "@type": "Brand", name: "The Estate", description: "VIP Property & Lifestyle Care" },
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
        </LanguageProvider>
      </body>
    </html>
  );
}
