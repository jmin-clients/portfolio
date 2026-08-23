import { CTAButton } from "@/components/ui/CTAButton";
import { GithubLogo, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com", Icon: GithubLogo },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: LinkedinLogo },
  { label: "Instagram", href: "https://instagram.com", Icon: InstagramLogo },
];

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-7 flex flex-col gap-6">
          <span style={{ fontFamily: "var(--font-tanker)" }} className="text-xl text-foreground">
            JMIN
          </span>
          <p className="text-foreground/45 max-w-[38ch]">
            Networking and cybersecurity notes from someone learning them in
            public: protocols, home lab builds, and the occasional mistake
            worth writing down.
          </p>
          <CTAButton href="/blog" className="mt-2">
            Read the blog
          </CTAButton>
        </div>

        <div className="md:col-span-5 flex flex-col gap-3 md:items-end">
          <a
            href="mailto:jmin.clients@gmail.com"
            className="text-foreground/60 hover:text-foreground transition-colors text-sm"
          >
            jmin.clients@gmail.com
          </a>
          <div className="flex items-center gap-4">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/40 hover:text-foreground transition-colors"
              >
                <Icon size={18} weight="fill" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-medium text-[0.7rem] uppercase tracking-[0.1em] text-foreground/35">
            &copy; 2026 Jonathan Min
          </span>
          <span className="font-medium text-[0.7rem] uppercase tracking-[0.1em] text-foreground/35">
            Based in Atlanta, GA
          </span>
        </div>
      </div>
    </footer>
  );
}
