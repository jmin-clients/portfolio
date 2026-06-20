const links = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-paper-bg border-t border-dashed border-paper-fg/15">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">

          <div>
            <div className="inline-flex items-center gap-2 text-paper-fg mb-8">
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-paper-fg/30"
                aria-hidden
              >
                <rect x="0.75" y="0.75" width="9.5" height="9.5" />
              </svg>
              <span className="font-mono text-sm tracking-tight text-paper-fg/70">JM</span>
            </div>
            <ul role="list" className="flex flex-col">
              {links.map(({ label, href }) => (
                <li key={label} className="border-t border-dashed border-paper-fg/15 first:border-t-0">
                  <a
                    href={href}
                    className="flex items-center justify-between py-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-paper-fg/45 hover:text-paper-fg transition-colors duration-200 group"
                  >
                    {label}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-between">
            <p className="font-sans text-sm text-paper-fg/40 leading-relaxed max-w-xs">
              Full-stack web developer crafting fast, accessible, and
              beautifully designed digital experiences.
            </p>
            <p className="font-mono text-[0.6875rem] text-paper-fg/30 mt-12">
              &copy; 2026{" "}
              <strong className="font-mono text-paper-fg/50">Jonathan Min</strong>{" "}
              &mdash; Designed &amp; built with care.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
