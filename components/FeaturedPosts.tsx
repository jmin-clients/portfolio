import { getAllPosts } from "@/lib/posts";
import PostList from "@/components/PostList";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function FeaturedPosts() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section id="notebook" className="py-24 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-baseline justify-between gap-6">
          <span className="font-medium text-[0.7rem] uppercase tracking-[0.16em] text-foreground/40">
            Lab notebook
          </span>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground transition-colors"
          >
            View all posts
            <ArrowUpRight size={14} weight="bold" />
          </Link>
        </div>

        <div className="mt-8">
          <PostList posts={posts} />
        </div>

        <Link
          href="/blog"
          className="sm:hidden mt-8 inline-flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground transition-colors"
        >
          View all posts
          <ArrowUpRight size={14} weight="bold" />
        </Link>
      </div>
    </section>
  );
}
