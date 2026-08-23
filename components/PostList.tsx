"use client";

import type { PostMeta } from "@/lib/posts-shared";
import { formatPostDate } from "@/lib/posts-shared";
import { ArrowUpRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

export default function PostList({ posts }: { posts: PostMeta[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <ul className="list-none" role="list">
      {posts.map((post, i) => (
        <motion.li
          key={post.slug}
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="group border-t border-border last:border-b"
        >
          <Link href={`/blog/${post.slug}`} className="block py-8 md:py-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center">
              <span
                style={{ fontFamily: "var(--font-tanker)" }}
                className="hidden md:block md:col-span-1 text-[0.85rem] text-[#39FF8A]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="md:col-span-6 flex flex-col gap-2">
                <h3 className="font-display font-medium text-[clamp(1.25rem,2.3vw,1.7rem)] leading-snug text-foreground">
                  {post.title}
                </h3>
                <span className="font-medium text-[0.7rem] uppercase tracking-[0.1em] text-foreground/35">
                  {post.tags.join(", ")} &middot; {formatPostDate(post.date)}
                </span>
              </div>

              <p className="md:col-span-4 text-foreground/50 text-sm">{post.excerpt}</p>

              <div className="md:col-span-1 flex justify-end">
                <ArrowUpRight
                  size={18}
                  weight="bold"
                  className="text-foreground/30 transition-all duration-300 group-hover:text-[#39FF8A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
            </div>
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}
