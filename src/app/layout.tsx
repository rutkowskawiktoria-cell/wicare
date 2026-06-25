import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://wicare.vip";

export const metadata: Metadata = {
  title: "WiCare Group | Elite Home & Lifestyle Services Copenhagen",
  description: "WiCare Group — Denmark’s premier luxury services: WiClean, WiCook, WiHelp, WiPet, WiGarden. Serving CEOs and executives across Copenhagen.",
  keywords: ["luxury home services Copenhagen", "private chef Copenhagen", "premium cleaning Denmark", "executive lifestyle services", "WiCare", "concierge services Copenhagen", "high net worth services Denmark", "vehicle detailing Copenhagen", "pet valet", "plant care", "WiClean", "WiCook", "WiHelp", "WiPet", "WiGarden"],
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", locale: "en_DK", siteName: "WiCare Group",
    title: "WiCare Group | Elite Home & Lifestyle Services",
    description: "Elite home and lifestyle services delivered with discretion, precision, and trust. Five core services serving Copenhagen.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "WiCare Group | Elite Home & Lifestyle Services",
    description: "Elite home and lifestyle services delivered with discretion, precision, and trust.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
              description: "Denmark’s premier luxury lifestyle services group. Five core services serving CEOs, executives, and high-net-worth families across Copenhagen.",
              address: { "@type": "PostalAddress", addressLocality: "Copenhagen", addressCountry: "DK" },
              telephone: "+4552721102",
              email: "wicare.cleaning@gmail.com",
              foundingDate: "2016",
              founder: { "@type": "Person", name: "WiCare" },
              sameAs: [],
              brand: [
                { "@type": "Brand", name: "WiClean", description: "Executive Home Cleaning — tailored to your needs, from deep cleaning to specialized care" },
                { "@type": "Brand", name: "WiCook", description: "Private Dining & Catering" },
                { "@type": "Brand", name: "WiHelp", description: "Premier Property Care" },
                { "@type": "Brand", name: "WiPet", description: "Elite Pet Valet" },
                { "@type": "Brand", name: "WiGarden", description: "Architectural Botanical Care" },
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
