// Placeholder clients (this business is new, real logos replace these as
// clients come on). Names are fictional, marks are generated monograms
// rather than invented "real" brand logos.
const CLIENTS = [
  { name: "Ridgeline Coffee Co.", mark: "RC" },
  { name: "Marrow & Oak", mark: "M&O" },
  { name: "Hazel Grove Dental", mark: "HG" },
  { name: "Fernbank Studio", mark: "FS" },
  { name: "Union Yards", mark: "UY" },
  { name: "Lowcountry Provisions", mark: "LP" },
  { name: "Voss & Rye", mark: "V&R" },
  { name: "Briarwood Legal", mark: "BL" },
];

export default function ClientLogos() {
  return (
    <section id="clients" className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-border">
          {CLIENTS.map((client) => (
            <div
              key={client.name}
              className="bg-background flex flex-col items-center justify-center gap-3 py-10 px-4"
            >
              <div className="size-11 border border-foreground/15 flex items-center justify-center">
                <span className="font-display font-medium text-[0.85rem] text-foreground/80">
                  {client.mark}
                </span>
              </div>
              <span className="font-medium text-[0.65rem] uppercase tracking-[0.1em] text-foreground/35 text-center">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
