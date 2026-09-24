import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import Trust from '@/components/sections/Trust';
import Services from '@/components/sections/Services';
import Booking from '@/components/sections/Booking';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Trust />
        <Booking />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
