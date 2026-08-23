import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import GrainOverlay from "@/components/GrainOverlay";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { mdxComponents } from "@/components/mdx-components";
import { getAllSlugs, getPostBySlug, formatPostDate } from "@/lib/posts";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const slugs = getAllSlugs();
  if (!slugs.includes(slug)) return {};
  const { meta } = getPostBySlug(slug);
  return {
    title: `${meta.title}, Jonathan Min`,
    description: meta.excerpt,
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const slugs = getAllSlugs();
  if (!slugs.includes(slug)) notFound();

  const { meta, content } = getPostBySlug(slug);

  return (
    <>
      <GrainOverlay />
      <Navbar />
      <main id="main">
        <article className="pt-36 pb-24 md:pt-44 md:pb-32">
          <div className="max-w-3xl mx-auto px-6 md:px-10">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {meta.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-medium text-[0.7rem] uppercase tracking-[0.1em] text-[#39FF8A]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-display font-medium text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.1] text-foreground">
              {meta.title}
            </h1>

            <span className="mt-5 block font-medium text-[0.7rem] uppercase tracking-[0.1em] text-foreground/35">
              {formatPostDate(meta.date)}
            </span>

            <div className="mt-12 max-w-[68ch]">
              <MDXRemote source={content} components={mdxComponents} />
            </div>
          </div>
        </article>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
