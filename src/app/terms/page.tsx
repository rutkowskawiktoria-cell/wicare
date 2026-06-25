import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | WiCare Group',
  description: 'Terms and conditions for WiCare Group premium lifestyle services in Copenhagen.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
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
          <h1 className="font-serif text-4xl md:text-5xl text-white font-semibold">Terms of Service</h1>
          <p className="text-white/60 mt-4">Last updated: June 2026</p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 prose prose-gray prose-lg">
          <h2>1. Booking & Confirmation</h2>
          <p>All services are booked via telephone at <strong>+45 52 72 11 02</strong>. A booking is confirmed once WiCare Group confirms availability. Services are subject to scheduler availability.</p>
          <h2>2. Pricing & Payment</h2>
          <p>Prices are quoted per hour and may vary by service tier. Payment is due upon completion unless otherwise agreed in writing. WiCare Group accepts bank transfer and major credit cards.</p>
          <h2>3. Cancellation Policy</h2>
          <p>Cancellations made less than 24 hours before the scheduled appointment may incur a fee of 50% of the estimated service value. WiCare Group reserves the right to cancel or reschedule due to unforeseen circumstances.</p>
          <h2>4. Liability</h2>
          <p>WiCare Group carries professional liability insurance. Clients are responsible for securing valuable items prior to service. WiCare Group is not liable for pre-existing damage or wear and tear.</p>
          <h2>5. Privacy</h2>
          <p>Client information is handled in accordance with our <Link href="/privacy" className="text-accent underline">Privacy Policy</Link>. We never share personal data without explicit consent.</p>
          <h2>6. Amendments</h2>
          <p>WiCare Group reserves the right to amend these terms at any time. Clients will be notified of material changes.</p>
          <h2>Contact</h2>
          <p>WiCare Cleaning ApS &bull; Copenhagen, Denmark<br/>Phone: <a href="tel:+4552721102" className="text-accent">+45 52 72 11 02</a><br/>Email: <a href="mailto:wicare.cleaning@gmail.com" className="text-accent">wicare.cleaning@gmail.com</a></p>
        </div>
      </section>
    </div>
  );
}
