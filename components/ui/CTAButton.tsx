import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

// Single CTA treatment used everywhere ("Read the blog" in nav, hero, and
// footer): solid accent fill, sharp corners, the arrow icon boxed in its own
// inset square chip rather than a bare inline glyph.
export function CTAButton({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "inline-flex w-fit items-center gap-3 bg-[#39FF8A] text-[#0d0d0d] pl-5 pr-2 py-2 font-semibold text-[0.85rem] rounded-sm hover:bg-[#39FF8A]/88 active:translate-y-px transition-all",
        className
      )}
    >
      {children}
      <span className="flex items-center justify-center size-7 bg-[#0d0d0d] text-[#39FF8A] rounded-sm shrink-0">
        <ArrowUpRight size={14} weight="bold" />
      </span>
    </a>
  );
}
