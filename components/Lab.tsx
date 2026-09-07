import { Carousel } from "@/components/ui/Carousel";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const NODES = [
  {
    title: "Proxmox cluster",
    description:
      "Three Dell OptiPlex nodes running Proxmox VE, the compute layer for every VM in the lab: detection tools, test targets, and anything else that needs to get rebuilt without touching the host.",
  },
  {
    title: "OPNsense",
    description:
      "The perimeter firewall and router, and where Suricata runs as the IDS layer, inspecting traffic between VLANs before any of it reaches the Proxmox hosts.",
    href: "/blog/home-network-segmentation",
  },
  {
    title: "MikroTik switch",
    description:
      "A managed switch trunking VLANs between OPNsense and the Proxmox nodes, the piece that turned network segmentation from a diagram into something that actually enforces itself.",
    href: "/blog/home-network-segmentation",
  },
  {
    title: "Tailscale",
    description:
      "A WireGuard-based mesh overlay for reaching the lab remotely without opening a single port on the home network.",
  },
  {
    title: "Detection stack",
    description:
      "Wazuh and Suricata, running as VMs on the Proxmox cluster, the SIEM and IDS pairing that turns raw traffic and host logs into something worth triaging.",
    href: "/blog/home-soc-wazuh-suricata",
  },
];

function LabSlide({
  index,
  title,
  description,
  href,
}: {
  index: number;
  title: string;
  description: string;
  href?: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <span
        style={{ fontFamily: "var(--font-tanker)" }}
        className="text-[clamp(1.75rem,3.5vw,2.5rem)] text-[#39FF8A] leading-none"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="font-display font-medium text-[clamp(1.5rem,3vw,2.25rem)] text-foreground">
        {title}
      </h3>
      <p className="text-foreground/50 max-w-[52ch]">{description}</p>
      {href && (
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground transition-colors w-fit"
        >
          Read the write-up
          <ArrowUpRight size={14} weight="bold" />
        </Link>
      )}
    </div>
  );
}

export default function Lab() {
  return (
    <section id="lab" className="py-24 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        <div className="md:col-span-4 flex flex-col gap-8">
          <span className="font-medium text-[0.7rem] uppercase tracking-[0.16em] text-foreground/40">
            The lab
          </span>
          <p className="text-foreground/60 text-lg leading-relaxed max-w-[32ch]">
            A physical SOC-style lab, not a diagram: three nodes, a real
            firewall, real VLANs, and a detection stack that actually
            generates alerts to triage.
          </p>
        </div>

        <div className="md:col-span-8">
          <Carousel
            slides={NODES.map((node, i) => (
              <LabSlide key={node.title} index={i} {...node} />
            ))}
          />
        </div>
      </div>
    </section>
  );
}
