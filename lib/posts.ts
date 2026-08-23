import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { PostMeta } from "@/lib/posts-shared";

export type { PostMeta } from "@/lib/posts-shared";
export { formatPostDate } from "@/lib/posts-shared";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

function readSlugs(): string[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getAllPosts(): PostMeta[] {
  const posts = readSlugs().map((slug) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.mdx`), "utf8");
    const { data } = matter(raw);
    return {
      slug,
      title: data.title as string,
      date: data.date as string,
      excerpt: data.excerpt as string,
      tags: (data.tags as string[]) ?? [],
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllSlugs(): string[] {
  return readSlugs();
}

export function getPostBySlug(slug: string): { meta: PostMeta; content: string } {
  const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: data.title as string,
      date: data.date as string,
      excerpt: data.excerpt as string,
      tags: (data.tags as string[]) ?? [],
    },
    content,
  };
}
