"use client";

import { Plus } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

const QUESTIONS = [
  {
    q: "How long does a typical project take?",
    a: "Most marketing sites take two to four weeks from kickoff to launch. Web apps and e-commerce builds run longer. I'll give you a real timeline after the intake call, not a guess.",
  },
  {
    q: "Do you write the copy too?",
    a: "I can. Content strategy is part of what I offer, though I work just as well from copy you already have.",
  },
  {
    q: "What happens after the site launches?",
    a: "Hosting and maintenance are included by default. I monitor uptime, keep dependencies current, and I'm the person you call when something breaks, not a ticket queue.",
  },
  {
    q: "Do you use AI tools to build sites?",
    a: "Yes, openly. Agentic tools speed up how I build and iterate. Every decision still gets reviewed by me, it's a faster process, not an unsupervised one.",
  },
  {
    q: "What if I don't have a logo or brand yet?",
    a: "Graphic design is part of the service. We can build the visual identity and the site together instead of bolting a website onto a brand that doesn't exist yet.",
  },
  {
    q: "How do payments work?",
    a: "A deposit to start, the remainder at launch. Larger projects can be split into milestones, we'll agree on the structure before any work begins.",
  },
];

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="border-t border-border last:border-b">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-6 py-6 text-left"
      >
        <span className="font-display font-medium text-[clamp(1.15rem,2.2vw,1.6rem)] text-foreground">
          {question}
        </span>
        <span
          className="shrink-0 flex items-center justify-center size-8 border border-foreground/15 text-foreground/60 transition-transform duration-300 rounded-sm"
          style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <Plus size={16} weight="bold" />
        </span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-foreground/50 max-w-[60ch]">{answer}</p>
      </motion.div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        <div className="md:col-span-4">
          <h2 className="font-display font-medium text-[clamp(1.75rem,3.5vw,3rem)] text-foreground md:sticky md:top-28">
            Questions
          </h2>
        </div>

        <div className="md:col-span-8">
          {QUESTIONS.map((item, i) => (
            <AccordionItem
              key={item.q}
              question={item.q}
              answer={item.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
