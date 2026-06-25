import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | WiCare Group',
  description: 'Privacy policy for WiCare Group. How we collect, use, and protect your personal data.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-primary border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-accent transition-colors">
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Back to WiCare</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center">
              <span className="text-white font-bold text-xs">W</span>
            </div>
            <span className="font-serif text-lg font-semibold text-white">WiCare</span>
          </Link>
        </div>
      </header>
      <section className="bg-primary pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-white font-semibold">Privacy Policy</h1>
          <p className="text-white/60 mt-4">Last updated: June 2026</p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 prose prose-gray prose-lg">
          <h2>1. Information We Collect</h2>
          <p>We collect only the information necessary to provide our services: name, phone number, email address, and service address. We do not collect payment card details directly — transactions are processed through our secure payment partner.</p>
          <h2>2. How We Use Your Information</h2>
          <p>Your information is used solely to schedule and deliver services, communicate appointment details, and send service-related follow-ups. We do not sell, rent, or share your personal data with third parties for marketing purposes.</p>
          <h2>3. Data Storage & Security</h2>
          <p>Client data is stored securely and accessed only by authorized personnel. We retain records for the duration of the client relationship plus 24 months, after which data is anonymized or deleted.</p>
          <h2>4. Your Rights</h2>
          <p>Under GDPR, you have the right to access, rectify, or delete your personal data at any time. To exercise these rights, contact us at <a href="mailto:wicare.cleaning@gmail.com" className="text-accent">wicare.cleaning@gmail.com</a>.</p>
          <h2>5. Cookies</h2>
          <p>This website does not use tracking cookies or third-party analytics. No personal data is collected through browsing.</p>
          <h2>6. Third-Party Links</h2>
          <p>Our website may contain links to third-party sites (e.g., payment processors). We are not responsible for their privacy practices.</p>
          <h2>7. Contact</h2>
          <p>WiCare Cleaning ApS &bull; Copenhagen, Denmark<br/>Phone: <a href="tel:+4552721102" className="text-accent">+45 52 72 11 02</a><br/>Email: <a href="mailto:wicare.cleaning@gmail.com" className="text-accent">wicare.cleaning@gmail.com</a></p>
        </div>
      </section>
    </div>
  );
}
