const links = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const meta = [
  { label: "UNIT", value: "JM-01" },
  { label: "REV", value: "3.0" },
  { label: "STACK", value: "NEXT.JS + TAILWIND" },
  { label: "BUILT", value: "2026" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] border-t border-[#EAEAEA]/10">

      {/* Top EOF marker */}
      <div className="border-b border-[#EAEAEA]/8 px-6 py-3 flex items-center justify-between max-w-[1600px] mx-auto">
        <samp className="font-mono text-[0.45rem] tracking-[0.25em] text-[#EAEAEA]/18 uppercase">
          // EOF — JM PORTFOLIO © 2026
        </samp>
        <samp className="font-mono text-[0.45rem] tracking-[0.2em] text-[#EAEAEA]/15 uppercase">
          ALL SYSTEMS NOMINAL
        </samp>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-16">
        <div className="grid-borders" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>

          {/* Logo + nav */}
          <div className="bg-[#0D0D0D] p-8">
            <div className="inline-flex items-center gap-2.5 mb-10">
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-[#EAEAEA]/20"
                aria-hidden
              >
                <line x1="5" y1="0" x2="5" y2="10" />
                <line x1="0" y1="5" x2="10" y2="5" />
              </svg>
              <span className="font-mono text-[0.5625rem] tracking-[0.2em] text-[#EAEAEA]/50 uppercase">
                JM <span className="text-[#EAEAEA]/20">®</span>
              </span>
            </div>

            <ul role="list" className="space-y-0">
              {links.map(({ label, href }) => (
                <li key={label} className="border-t border-[#EAEAEA]/8 first:border-t-0">
                  <a
                    href={href}
                    className="flex items-center justify-between py-3.5 font-mono text-[0.5rem] uppercase tracking-[0.2em] text-[#EAEAEA]/30 hover:text-[#EAEAEA] transition-colors duration-150 group"
                  >
                    <span>— {label}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-[#E61919]">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Description */}
          <div className="bg-[#0D0D0D] p-8 flex flex-col justify-between">
            <p className="font-mono text-[0.5625rem] text-[#EAEAEA]/30 leading-[1.9] tracking-[0.04em] uppercase">
              Full-stack web developer crafting precision-engineered digital
              systems — from pixel-perfect interfaces to robust back-end
              architectures.
            </p>
            <div className="h-[2px] bg-[#E61919]/30 mt-8 w-8" aria-hidden />
          </div>

          {/* Technical metadata */}
          <div className="bg-[#0D0D0D] p-8">
            <samp className="font-mono text-[0.45rem] tracking-[0.22em] text-[#EAEAEA]/15 uppercase block mb-5">
              // SYSTEM METADATA
            </samp>
            <dl className="space-y-0">
              {meta.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 border-t border-[#EAEAEA]/6 py-2.5 first:border-t-0"
                >
                  <dt className="font-mono text-[0.4rem] tracking-[0.18em] text-[#EAEAEA]/20 uppercase w-12 flex-shrink-0">
                    {label}
                  </dt>
                  <dd className="font-mono text-[0.5rem] tracking-[0.12em] text-[#EAEAEA]/40 uppercase">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="border-t border-[#EAEAEA]/8 mt-px pt-5 flex items-center justify-between flex-wrap gap-4">
          <p className="font-mono text-[0.4rem] tracking-[0.2em] text-[#EAEAEA]/18 uppercase">
            © 2026 <strong className="font-mono text-[#EAEAEA]/30">Jonathan Min</strong> — Designed &amp; built with precision.
          </p>
          <p className="font-mono text-[0.4rem] tracking-[0.2em] text-[#EAEAEA]/12 uppercase">
            48°52&apos;N 2°20&apos;W
          </p>
        </div>
      </div>
    </footer>
  );
}
