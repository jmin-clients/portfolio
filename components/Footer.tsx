import LiveClock from "@/components/LiveClock";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { label: "GitHub ↗", href: "https://github.com" },
  { label: "LinkedIn ↗", href: "https://linkedin.com" },
  { label: "X / Twitter ↗", href: "https://twitter.com" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] hairline" aria-label="Site footer">

      {/* Upper footer grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-12 md:gap-20">

          {/* Left — mega nav links with hairlines */}
          <nav aria-label="Footer navigation">
            <p className="font-mono text-[0.5rem] uppercase tracking-[0.22em] text-[#f0efe9]/25 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f0efe9]/25 inline-block" aria-hidden />
              Navigation
            </p>
            <ul role="list">
              {navLinks.map(({ label, href }) => (
                <li key={label} className="border-t border-[#f0efe9]/06 first:border-t-0">
                  <a
                    href={href}
                    className="flex items-center justify-between py-5 font-sans font-medium text-[clamp(1.5rem,4vw,2.5rem)] text-[#f0efe9]/70 hover:text-[#f0efe9] transition-colors duration-200 tracking-tight group"
                  >
                    {label}
                    <svg
                      width="16" height="16" viewBox="0 0 16 16" fill="none"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0"
                      aria-hidden
                    >
                      <path d="M3 13L13 3M13 3H5.5M13 3V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right — contact details */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="font-mono text-[0.5rem] uppercase tracking-[0.22em] text-[#f0efe9]/25 mb-4">
                (Studio Details)
              </p>
              <ul className="space-y-1.5" role="list">
                {socials.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-sm text-[#f0efe9]/50 hover:text-[#f0efe9] transition-colors duration-200"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <a
                href="mailto:jmin.personal@gmail.com"
                className="font-sans text-sm text-[#f0efe9]/50 hover:text-[#f0efe9] transition-colors duration-200 flex items-center gap-1.5"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
                  <rect x="1" y="2.5" width="10" height="7" rx="0.5"/>
                  <path d="M1 4l5 3.5L11 4" strokeLinejoin="round"/>
                </svg>
                jmin.personal@gmail.com
              </a>
            </div>

            <div>
              <p className="font-sans text-sm text-[#f0efe9]/35 leading-relaxed">
                US East Coast.<br />
                Working with clients remotely.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar — clock, back to top, copyright */}
      <div className="border-t border-[#f0efe9]/06 px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-end justify-between gap-6">

          {/* Live clock */}
          <LiveClock />

          {/* Back to top + availability */}
          <div className="text-right">
            <a
              href="#"
              className="font-sans text-xs text-[#f0efe9]/35 hover:text-[#f0efe9]/60 transition-colors duration-200 block mb-1"
            >
              Back to top ↑
            </a>
            <p className="font-sans text-xs text-[#f0efe9]/25">
              Available for new projects
            </p>
          </div>

          {/* Copyright */}
          <p className="font-mono text-[0.5rem] tracking-[0.1em] text-[#f0efe9]/20">
            ©2026 Jonathan Min
          </p>
        </div>
      </div>

      {/* Oversized wordmark on grain — very bottom */}
      <div
        className="relative overflow-hidden border-t border-[#f0efe9]/06"
        style={{
          background: `
            radial-gradient(ellipse 60% 80% at 80% 50%, rgba(38,37,35,0.4) 0%, transparent 65%),
            #0a0a0a
          `,
        }}
      >
        {/* Grain overlay */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23g)'/%3E%3C/svg%3E")`,
            opacity: 0.08,
            mixBlendMode: "overlay",
          }}
        />
        <div className="relative px-6 pt-10 pb-0 overflow-hidden flex items-end justify-between">
          <p
            className="font-display uppercase text-[#f0efe9]/10 leading-none tracking-tight select-none"
            style={{ fontSize: "clamp(4rem, 16vw, 16rem)", marginBottom: "-0.12em" }}
            aria-hidden
          >
            JM
          </p>
          <p className="font-sans text-xs text-[#f0efe9]/20 mb-8 max-w-[20ch] text-right leading-snug">
            Building for the web, one line at a time.
          </p>
        </div>
      </div>

    </footer>
  );
}
