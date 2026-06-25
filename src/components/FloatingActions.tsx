'use client';
import { Phone } from 'lucide-react';
import Link from 'next/link';
export default function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <Link href="#booking" className="bg-accent text-white text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-full shadow-2xl hover:bg-yellow-600 hover:scale-105 transition-all duration-200 hidden sm:block">Book Now</Link>
      <a href="tel:+4552721102" className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-secondary hover:scale-110 transition-all duration-200 self-end" aria-label="Call WiCare">
        <Phone size={22} />
      </a>
    </div>
  );
}
