export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 py-9">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <p className="text-sm text-zinc-500">
            &copy; 2026{" "}
            <strong className="text-zinc-950 font-semibold">Jonathan Min</strong>{" "}
            - Designed &amp; built with care.
          </p>
          <ul className="flex gap-6 list-none" role="list">
            <li>
              <a
                href="#about"
                className="text-sm text-zinc-500 hover:text-zinc-950 transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:rounded-sm"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="text-sm text-zinc-500 hover:text-zinc-950 transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:rounded-sm"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-sm text-zinc-500 hover:text-zinc-950 transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:rounded-sm"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
