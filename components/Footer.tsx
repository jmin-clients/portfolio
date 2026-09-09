import { CTAButton } from "@/components/ui/CTAButton";
import { LiveClock } from "@/components/ui/LiveClock";
import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";

// TODO(jonathan): contact email (jmin.clients@gmail.com) is still the
// prior client-facing address, replace with a public one before this ships.
const SOCIALS = [
  { label: "GitHub", href: "https://github.com/jmin-clients", Icon: GithubLogo },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jmin-work", Icon: LinkedinLogo },
];

const SITE_LINKS = [{ label: "Blog", href: "/blog" }];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5 flex flex-col gap-6">
          <span style={{ fontFamily: "var(--font-tanker)" }} className="text-xl text-foreground">
            JMIN
          </span>
          <p className="text-foreground/45 max-w-[38ch]">
            A home SOC lab and the coursework, certs, and mistakes behind it,
            documented on the way to a cybersecurity career.
          </p>
          <CTAButton href="/blog" className="mt-2">
            Read the blog
          </CTAButton>
        </div>

        <nav aria-label="Site sections" className="md:col-span-3 flex flex-col gap-3">
          <span className="font-medium text-[0.7rem] uppercase tracking-[0.16em] text-foreground/40 mb-1">
            Site
          </span>
          {SITE_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-foreground/55 hover:text-foreground transition-colors text-sm w-fit"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#top"
            className="text-foreground/35 hover:text-foreground transition-colors text-sm w-fit mt-2"
          >
            Back to top
          </a>
        </nav>

        <div className="md:col-span-4 flex flex-col gap-4 md:items-end">
          <span className="font-medium text-[0.7rem] uppercase tracking-[0.16em] text-foreground/40 md:text-right">
            Contact
          </span>
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
          <span className="text-foreground/35 text-xs max-w-[26ch] md:text-right">
            Open to SOC analyst and security-adjacent roles.
          </span>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-medium text-[0.7rem] uppercase tracking-[0.1em] text-foreground/35">
            &copy; {currentYear} jmin.work
          </span>
          <span className="font-medium text-[0.7rem] uppercase tracking-[0.1em] text-foreground/35 flex items-center gap-2">
            Chattanooga, TN <LiveClock />
          </span>
        </div>
      </div>
    </footer>
  );
}
