'use client';
import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <a href="tel:+4552721102" className="flex items-center gap-2 text-white/80 hover:text-accent transition-colors">
                <Phone size={16} />
                +45 52 72 11 02
              </a>
              <a href="mailto:wicare.cleaning@gmail.com" className="flex items-center gap-2 text-white/80 hover:text-accent transition-colors">
                <Mail size={16} />
                wicare.cleaning@gmail.com
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/#services" className="block text-white/80 hover:text-accent transition-colors">Services</Link>
              <Link href="/#testimonials" className="block text-white/80 hover:text-accent transition-colors">Testimonials</Link>
              <Link href="/#booking" className="block text-white/80 hover:text-accent transition-colors">Book Now</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <div className="space-y-2">
              <Link href="/privacy" className="block text-white/80 hover:text-accent transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="block text-white/80 hover:text-accent transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/60 text-sm">© 2026 WiCare Cleaning ApS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
