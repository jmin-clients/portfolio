import {
  Broadcast,
  BookOpen,
  HardDrives,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";

// Kept to the tags actually used across content/posts/*.mdx, not an
// aspirational list. Add a tile only once a post exists to back it.
const TOPICS = [
  { name: "Networking", Icon: Broadcast },
  { name: "Cybersecurity", Icon: ShieldCheck },
  { name: "Home Lab", Icon: HardDrives },
  { name: "Fundamentals", Icon: BookOpen },
];

export default function TopicsGrid() {
  return (
    <section id="topics" className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <span className="font-medium text-[0.7rem] uppercase tracking-[0.16em] text-foreground/40">
          Topics
        </span>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-px bg-border">
          {TOPICS.map((topic) => (
            <div
              key={topic.name}
              className="bg-background flex flex-col items-center justify-center gap-3 py-10 px-4"
            >
              <div className="size-11 border border-foreground/15 flex items-center justify-center">
                <topic.Icon size={18} weight="bold" className="text-foreground/80" />
              </div>
              <span className="font-medium text-[0.65rem] uppercase tracking-[0.1em] text-foreground/35 text-center">
                {topic.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
