'use client';
import { Phone } from 'lucide-react';
export default function Booking() {
  return (
    <section id="booking" className="section-padding bg-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <p className="text-accent text-xs tracking-widest uppercase font-medium mb-3">Book Now</p>
        <h2 className="font-serif text-4xl md:text-5xl text-primary font-semibold mb-4">Ready to Experience WiCare?</h2>
        <p className="text-gray-500 max-w-xl mx-auto text-lg font-light mb-10">
          Call us today to schedule any of our nine premium services. We answer within 2 business hours.
        </p>
        <a href="tel:+4552721102" className="inline-flex items-center gap-4 bg-accent hover:bg-yellow-600 text-white font-bold text-2xl md:text-3xl px-10 py-5 md:px-14 md:py-6 rounded-full transition-all duration-300 shadow-xl hover:scale-105 hover:shadow-2xl">
          <Phone size={32} strokeWidth={2.5} />
          +45 52 72 11 02
        </a>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <p className="text-accent text-2xl font-bold font-serif">9</p>
            <p className="text-primary text-sm font-semibold mt-1">Premium Services</p>
            <p className="text-gray-400 text-xs mt-1">From cleaning to pet valet</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <p className="text-accent text-2xl font-bold font-serif">10+</p>
            <p className="text-primary text-sm font-semibold mt-1">Years Experience</p>
            <p className="text-gray-400 text-xs mt-1">Serving Copenhagen elite</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <p className="text-accent text-2xl font-bold font-serif">2h</p>
            <p className="text-primary text-sm font-semibold mt-1">Response Time</p>
            <p className="text-gray-400 text-xs mt-1">Fast, personal service</p>
          </div>
        </div>
      </div>
    </section>
  );
}
