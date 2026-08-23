import GrainOverlay from '@/components/GrainOverlay';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedPosts from '@/components/FeaturedPosts';
import FocusAreas from '@/components/FocusAreas';
import Statement from '@/components/Statement';
import TopicsGrid from '@/components/TopicsGrid';
import About from '@/components/About';
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
        {/* Everything after the hero rides above it: the hero is a sticky
            pinned panel (z-0), and this wrapper sits at a higher z-index
            with an opaque background, so it slides up and covers the hero
            as you scroll instead of pushing it off screen. The background
            reproduces body's exactly (same gradient, same fixed
            attachment, so it's viewport-anchored rather than restarting
            here) — without an opaque layer the pinned hero would show
            through every section below it. */}
        <div
          className="relative z-10"
          style={{
            background: "linear-gradient(180deg, var(--surface) 0%, var(--surface-2) 100%)",
            backgroundAttachment: "fixed",
          }}
        >
          <FeaturedPosts />
          <FocusAreas />
          <Statement />
          <TopicsGrid />
          <About />
          <FAQ />
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
