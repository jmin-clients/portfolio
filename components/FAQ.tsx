"use client";

import { Plus } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

const QUESTIONS = [
  {
    q: "What is this blog about?",
    a: "Networking and cybersecurity, mostly from a hands-on, home-lab angle: how protocols actually work, how to harden a home network, and what I learn building and breaking things.",
  },
  {
    q: "Who is this for?",
    a: "People who like to understand the how, not just follow a checklist. Some posts assume basic IT knowledge, most don't require much beyond curiosity.",
  },
  {
    q: "Are you a security professional?",
    a: "Not yet. I'm working toward a degree in cybersecurity and building a home lab as I learn. I'll always say when something is a beginner's take rather than expert advice.",
  },
  {
    q: "Do you post tutorials or just notes?",
    a: "Both. Some posts are structured walkthroughs, others are closer to a lab notebook, rougher, but usually more honest about what actually happened.",
  },
  {
    q: "Is there an RSS feed?",
    a: "Not yet, it's on the list. For now the blog page is the best way to keep up with new posts.",
  },
  {
    q: "Can I suggest a topic?",
    a: "Yes. Email is in the footer, if enough people ask about the same thing I'll probably end up writing about it.",
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
