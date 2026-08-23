import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="font-display font-medium text-[clamp(1.4rem,3vw,2rem)] text-foreground mt-12 mb-4"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="font-display font-medium text-[clamp(1.15rem,2.2vw,1.5rem)] text-foreground mt-9 mb-3"
      {...props}
    />
  ),
  p: (props) => <p className="text-foreground/70 leading-relaxed mb-5" {...props} />,
  a: (props) => (
    <a
      className="text-[#39FF8A] underline underline-offset-4 decoration-[#39FF8A]/40 hover:decoration-[#39FF8A] transition-colors"
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="list-disc pl-5 text-foreground/70 leading-relaxed mb-5 flex flex-col gap-2" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal pl-5 text-foreground/70 leading-relaxed mb-5 flex flex-col gap-2" {...props} />
  ),
  li: (props) => <li className="marker:text-foreground/30" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-l border-[#39FF8A] pl-5 my-8 text-foreground/60 text-lg leading-relaxed [&>p]:mb-0"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="font-mono text-[0.85em] bg-foreground/[0.06] border border-border px-1.5 py-0.5 rounded-sm"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="font-mono text-[0.85rem] leading-relaxed bg-foreground/[0.04] border border-border rounded-sm p-4 md:p-5 overflow-x-auto my-6 [&>code]:bg-transparent [&>code]:border-0 [&>code]:p-0"
      {...props}
    />
  ),
  hr: () => <hr className="border-border my-12" />,
  strong: (props) => <strong className="text-foreground font-semibold" {...props} />,
};
