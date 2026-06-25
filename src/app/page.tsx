import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import Brands from '@/components/sections/Brands';
import Trust from '@/components/sections/Trust';
import Services from '@/components/sections/Services';
import WhyUs from '@/components/sections/WhyUs';
import Booking from '@/components/sections/Booking';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Brands />
        <Trust />
        <Services />
        <WhyUs />
        <Testimonials />
        <Booking />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
