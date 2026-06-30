type FooterLink = { label: string; href: string; external?: boolean };
type FooterCol = { heading: string; links: FooterLink[] };

const NAV_COLS: FooterCol[] = [
  {
    heading: 'Navigate',
    links: [
      { label: 'Work', href: '#work' },
      { label: 'About', href: '#stats' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'GitHub', href: 'https://github.com/jmin-clients', external: true },
      { label: 'LinkedIn', href: 'https://linkedin.com', external: true },
      { label: 'X / Twitter', href: 'https://twitter.com', external: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/[0.06]" aria-label="Site footer">

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-12 md:gap-20">

          {/* Left — blurb + contact */}
          <div className="max-w-[38ch]">
            <p className="font-black text-[1.5rem] tracking-tight text-[#f5f5f0] mb-4">JMIN</p>
            <p className="text-[#f5f5f0]/40 text-sm leading-relaxed mb-6">
              Full-stack web development for founders who want a digital product that
              works as hard as they do. US East Coast. Working remotely.
            </p>
            <a
              href="mailto:jmin.clients@gmail.com"
              className="text-[#f5f5f0]/50 text-sm hover:text-[#f5f5f0] transition-colors duration-200"
            >
              jmin.clients@gmail.com
            </a>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map(({ heading, links }) => (
            <div key={heading}>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[#f5f5f0]/25 mb-4">
                {heading}
              </p>
              <ul className="space-y-2.5" role="list">
                {links.map(({ label, href, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="text-sm text-[#f5f5f0]/50 hover:text-[#f5f5f0] transition-colors duration-200"
                    >
                      {label}
                      {external && (
                        <span aria-hidden className="ml-1 text-[#f5f5f0]/25">
                          &#8599;
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.05] px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-[0.55rem] tracking-[0.12em] text-[#f5f5f0]/20 uppercase">
            &copy;2026 Jonathan Min
          </p>
          <a
            href="#intake"
            className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[#f5f5f0]/30 hover:text-[#f5f5f0]/60 transition-colors duration-200"
          >
            Back to top
          </a>
        </div>
      </div>

      {/* Oversized wordmark — bottom bleed */}
      <div className="overflow-hidden border-t border-white/[0.04]">
        <p
          className="font-black text-[#f5f5f0]/[0.04] uppercase leading-none tracking-tight select-none px-4"
          style={{ fontSize: 'clamp(4rem, 16vw, 16rem)', marginBottom: '-0.1em' }}
          aria-hidden
        >
          JMIN
        </p>
      </div>

    </footer>
  );
}
