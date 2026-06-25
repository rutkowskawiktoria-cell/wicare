import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
};
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://wicare.vip";

export const metadata: Metadata = {
  title: "WiCare Group | Premium Home & Lifestyle Services Copenhagen",
  description: "WiCare Group offers premium home and lifestyle services in Copenhagen: WiClean, WiCook, and WiHelp.",
  keywords: ["luxury home services Copenhagen", "private chef Copenhagen", "premium cleaning Denmark", "executive lifestyle services", "WiCare", "concierge services Copenhagen", "high net worth services Denmark", "property care", "WiClean", "WiCook", "WiHelp"],
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", locale: "en_DK", siteName: "WiCare Group",
    title: "WiCare Group | Premium Home & Lifestyle Services",
    description: "Premium home and lifestyle services delivered with discretion, precision, and trust, across Copenhagen.",
    url: siteUrl,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "WiCare Group" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WiCare Group | Premium Home & Lifestyle Services",
    description: "Premium home and lifestyle services delivered with discretion, precision, and trust.",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "WiCare Group",
              url: siteUrl,
              logo: `${siteUrl}/logo.png`,
              description: "Premium home and lifestyle services for private residences and professionals across Copenhagen: cleaning, private dining, and property care.",
              address: { "@type": "PostalAddress", addressLocality: "Copenhagen", addressCountry: "DK" },
              telephone: "+4552721102",
              email: "wicare.cleaning@gmail.com",
              foundingDate: "2026",
              taxID: "46213270",
              vatID: "DK46213270",
              identifier: { "@type": "PropertyValue", propertyID: "CVR", value: "46213270" },
              founder: { "@type": "Person", name: "WiCare" },
              sameAs: [],
              brand: [
                { "@type": "Brand", name: "WiClean", description: "Executive Home Cleaning, tailored to your needs, from deep cleaning to specialized care" },
                { "@type": "Brand", name: "WiCook", description: "Private Dining & Catering" },
                { "@type": "Brand", name: "WiHelp", description: "Premier Property & Lifestyle Care" },
              ],
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
