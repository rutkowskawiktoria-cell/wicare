import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary border-t border-white/5">
      <div className="h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center"><span className="text-white font-bold text-sm">W</span></div>
              <div><span className="font-serif text-xl font-semibold text-white">WiCare</span><span className="block text-xs tracking-widest uppercase text-accent">Cleaning</span></div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">Premium cleaning for private residences and professional environments across Copenhagen.</p>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold tracking-widest uppercase mb-5">Navigate</h4>
            <ul className="space-y-3">
              {[{label:'Services',href:'/#services'},{label:'Why WiCare',href:'/#why-us'},{label:'Testimonials',href:'/#testimonials'},{label:'Book Now',href:'/#booking'},{label:'Contact',href:'/#contact'}].map(({ label, href }) => (
                <li key={label}><Link href={href} className="text-white/50 hover:text-accent text-sm transition-colors duration-200">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold tracking-widest uppercase mb-5">Contact</h4>
            <ul className="space-y-3">
              <li><a href="tel:+4552721102" className="flex items-center gap-2.5 text-white/50 hover:text-accent text-sm transition-colors duration-200"><Phone size={14} />+45 52 72 11 02</a></li>
              <li><a href="mailto:wicare.cleaning@gmail.com" className="flex items-center gap-2.5 text-white/50 hover:text-accent text-sm transition-colors duration-200"><Mail size={14} />wicare.cleaning@gmail.com</a></li>
              <li className="flex items-center gap-2.5 text-white/50 text-sm"><MapPin size={14} className="flex-shrink-0" />Copenhagen, Denmark</li>
            </ul>
          </div>
        </div>
        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">© 2026 WiCare Cleaning ApS. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-white/30 hover:text-white/60 text-xs transition-colors duration-200">Privacy Policy</Link>
            <Link href="/terms" className="text-white/30 hover:text-white/60 text-xs transition-colors duration-200">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
