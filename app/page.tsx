import GrainOverlay from "@/components/GrainOverlay";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatCarousel from "@/components/StatCarousel";
import StackRow from "@/components/StackRow";
import StatementBreak from "@/components/StatementBreak";
import FeaturedProject from "@/components/FeaturedProject";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <GrainOverlay />
      <Navbar />
      <main id="main">
        <Hero />
        <StatCarousel />
        <StackRow />
        <StatementBreak />
        <FeaturedProject />
        <Process />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
