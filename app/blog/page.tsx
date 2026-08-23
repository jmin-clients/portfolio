import type { Metadata } from "next";
import GrainOverlay from "@/components/GrainOverlay";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import PostList from "@/components/PostList";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog, Jonathan Min",
  description: "Networking and cybersecurity notes, written while learning them in public.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <GrainOverlay />
      <Navbar />
      <main id="main">
        <section className="pt-36 pb-16 md:pt-44 md:pb-20">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <span className="font-medium text-[0.7rem] uppercase tracking-[0.16em] text-foreground/40">
              Blog
            </span>
            <h1 className="mt-4 font-display font-medium text-[clamp(2rem,5.5vw,3.5rem)] leading-[1.05] text-foreground max-w-3xl">
              Networking, cybersecurity, and whatever the home lab breaks this week.
            </h1>
            <p className="mt-5 text-foreground/50 max-w-[52ch]">
              Written while learning it, not after mastering it. Expect corrections
              and the occasional post that ages badly.
            </p>
          </div>
        </section>

        <section className="pb-24 md:pb-32 border-t border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <PostList posts={posts} />
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
