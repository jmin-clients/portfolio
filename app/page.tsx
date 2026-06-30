import GrainOverlay from '@/components/GrainOverlay';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Statement from '@/components/Statement';
import WorkShowcase from '@/components/WorkShowcase';
import Testimonials from '@/components/Testimonials';
import LogoMarquee from '@/components/LogoMarquee';
import WhySection from '@/components/WhySection';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <GrainOverlay />
      <Navbar />
      <main id="main">
        <Hero />
        <Statement />
        <WorkShowcase />
        <Testimonials />
        <LogoMarquee />
        <WhySection />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
