import GrainOverlay from '@/components/GrainOverlay';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedPosts from '@/components/FeaturedPosts';
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
            through every section below it.

            Lab, Path, Statement, About, and TopicsGrid are built and still
            live as files (see DESIGN.md), just not imported here for now,
            same "parked, not deleted" treatment as IntakeSection. */}
        <div
          className="relative z-10"
          style={{
            background: "linear-gradient(180deg, var(--surface) 0%, var(--surface-2) 100%)",
            backgroundAttachment: "fixed",
          }}
        >
          <FeaturedPosts />
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
