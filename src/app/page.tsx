import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Booking from '@/components/sections/Booking';
import AreasMap from '@/components/sections/AreasMap';
import SeasonalBanner from '@/components/sections/SeasonalBanner';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SeasonalBanner />
        <Services />
        <AreasMap />
        <Booking />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
