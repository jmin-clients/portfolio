import GrainOverlay from '@/components/GrainOverlay';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import IntakeSection from '@/components/IntakeSection';
import Services from '@/components/Services';
import WorkShowcase from '@/components/WorkShowcase';
import Statement from '@/components/Statement';
import ClientLogos from '@/components/ClientLogos';
import Testimonials from '@/components/Testimonials';
import WhySection from '@/components/WhySection';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default function Home() {
  return (
    <>
      <GrainOverlay />
      <Navbar />
      <main id="main">
        <Hero />
        <IntakeSection />
        {/* Temporarily hidden while other sections are being reworked */}
        {/* <Services /> */}
        {/* <WorkShowcase /> */}
        {/* <Statement /> */}
        {/* <ClientLogos /> */}
        {/* <Testimonials /> */}
        {/* <WhySection /> */}
        {/* <FAQ /> */}
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
