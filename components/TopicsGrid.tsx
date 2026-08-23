import {
  Broadcast,
  Bug,
  Cloud,
  Code,
  Fingerprint,
  HardDrives,
  ShieldCheck,
  Terminal,
} from "@phosphor-icons/react/dist/ssr";

const TOPICS = [
  { name: "Networking", Icon: Broadcast },
  { name: "Cybersecurity", Icon: ShieldCheck },
  { name: "Linux", Icon: Terminal },
  { name: "Scripting", Icon: Code },
  { name: "Home Lab", Icon: HardDrives },
  { name: "Cloud", Icon: Cloud },
  { name: "Threat Modeling", Icon: Bug },
  { name: "Auth & Identity", Icon: Fingerprint },
];

export default function TopicsGrid() {
  return (
    <section id="topics" className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <span className="font-medium text-[0.7rem] uppercase tracking-[0.16em] text-foreground/40">
          Topics
        </span>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-border">
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
