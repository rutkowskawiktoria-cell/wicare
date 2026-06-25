'use client';
import { Phone, Mail, MapPin } from 'lucide-react';
export default function Contact() {
  return (
    <section id="contact" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-accent text-xs tracking-widest uppercase font-medium mb-3">Contact</p>
          <h2 className="font-serif text-4xl md:text-5xl text-primary font-semibold">Get in Touch</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div>
              <h3 className="font-serif text-2xl text-primary font-semibold mb-4">We&apos;d love to hear from you</h3>
              <p className="text-gray-500 text-lg font-light leading-relaxed">Our team responds to every enquiry within 2 business hours.</p>
            </div>
            <div className="space-y-5">
              <a href="tel:+4552721102" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-light flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-200"><Phone size={20} className="text-accent" /></div>
                <div><p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-0.5">Phone</p><p className="text-primary font-semibold group-hover:text-accent transition-colors duration-200">+45 52 72 11 02</p></div>
              </a>
              <a href="mailto:wicare.cleaning@gmail.com" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-light flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-200"><Mail size={20} className="text-accent" /></div>
                <div><p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-0.5">Email</p><p className="text-primary font-semibold group-hover:text-accent transition-colors duration-200">wicare.cleaning@gmail.com</p></div>
              </a>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-light flex items-center justify-center"><MapPin size={20} className="text-accent" /></div>
                <div><p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-0.5">Location</p><p className="text-primary font-semibold">Copenhagen, Denmark</p></div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a href="tel:+4552721102" className="flex items-center justify-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-secondary transition-colors duration-200"><Phone size={16} />Call Now</a>
              <a href="mailto:wicare.cleaning@gmail.com" className="flex items-center justify-center gap-2 border-2 border-primary text-primary font-semibold px-6 py-3 rounded-full text-sm hover:border-accent hover:text-accent transition-colors duration-200"><Mail size={16} />Send Email</a>
            </div>
          </div>
          <div className="bg-light rounded-3xl p-10 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
              <Phone size={32} className="text-accent" />
            </div>
            <h3 className="font-serif text-2xl text-primary font-semibold mb-2">Call Us Directly</h3>
            <p className="text-gray-500 text-sm mb-6 max-w-xs">Our team is ready to help. No forms, no waiting   just a conversation.</p>
            <a href="tel:+4552721102" className="text-accent hover:text-yellow-600 font-bold text-3xl md:text-4xl transition-colors duration-200 tracking-tight">
              +45 52 72 11 02
            </a>
            <p className="text-gray-400 text-xs mt-4">Available 5 days a week · Response within 2 hours</p>
          </div>
        </div>
      </div>
    </section>
  );
}
