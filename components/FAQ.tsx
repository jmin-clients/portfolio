"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const faqs = [
  {
    q: "Who will actually be working on my project?",
    a: "Just me — Jonathan Min, directly. No handoffs, no juniors, no disappearing behind a team. You get one person with full context on your project from brief to launch.",
  },
  {
    q: "How long do projects usually take?",
    a: "Typically 2–6 weeks depending on scope and complexity. A focused marketing site or landing page moves faster than a full product build with custom back-end. I'll give you a realistic timeline estimate after we talk through your brief.",
  },
  {
    q: "How do you communicate and manage work?",
    a: "Async-first — I default to Notion or Linear for project tracking and Loom for async walkthroughs, with scheduled check-ins at key milestones. You'll always know what I'm working on and what's coming next.",
  },
  {
    q: "What do you need to start working together?",
    a: "A clear brief, rough content direction, and a signed agreement. You don't need a finished design or complete copy — part of what I do is help you figure that out. But having a sense of your goals and audience makes everything faster.",
  },
  {
    q: "What happens after launch?",
    a: "30 days of post-launch support is included on every project. Real users always surface edge cases that testing misses — I stay available to fix, tune, and iterate in that window.",
  },
  {
    q: "What's the project investment?",
    a: "Scope and complexity set the price, not a fixed menu. Get in touch with a brief and I'll give you a straight answer. No ballpark until I understand what you actually need.",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div className="border-b border-[#f0efe9]/08">
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-sans text-base text-[#f0efe9]/80 hover:text-[#f0efe9] transition-colors duration-200 leading-snug">
          {question}
        </span>
        <span
          className={`flex-shrink-0 w-1.5 h-1.5 rounded-full border border-[#f0efe9]/30 transition-all duration-200 ${open ? "bg-[#f0efe9] border-[#f0efe9]" : "bg-transparent"}`}
          aria-hidden
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease }}
            className="overflow-hidden"
          >
            <p className="font-sans text-sm text-[#f0efe9]/45 leading-relaxed pb-6 max-w-2xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const reduce = useReducedMotion();

  return (
    <section
      id="contact"
      className="bg-[#0a0a0a] hairline py-24"
      aria-labelledby="faq-title"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-16 lg:gap-24">

          {/* Left — heading + photo + CTA */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease }}
          >
            <p className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-[#f0efe9]/30 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f0efe9]/30 inline-block" aria-hidden />
              FAQs
            </p>
            <h2
              id="faq-title"
              className="font-sans font-semibold text-[clamp(1.75rem,3.5vw,2.75rem)] text-[#f0efe9] leading-[1.1] tracking-tight mb-10"
            >
              Here&apos;s what to know before working together.
            </h2>

            {/* Photo placeholder */}
            <div className="w-24 h-24 bg-[#1c1c1a] border border-[#f0efe9]/08 mb-4 flex items-center justify-center">
              {/* [PLACEHOLDER: Headshot photo of Jonathan Min] */}
              <span className="font-mono text-[0.4rem] tracking-widest text-[#f0efe9]/15 uppercase text-center leading-loose px-1">
                [PHOTO]
              </span>
            </div>

            <p className="font-sans text-sm text-[#f0efe9]/45 mb-2">Got more questions?</p>
            <p className="font-sans text-sm text-[#f0efe9]/45 mb-5">Reach out directly.</p>
            <a
              href="mailto:jmin.personal@gmail.com"
              className="inline-flex items-center gap-1.5 font-sans text-sm font-medium bg-[#f0efe9] text-[#0a0a0a] px-5 py-2.5 rounded-full hover:bg-[#f0efe9]/85 transition-colors duration-200"
            >
              Send an email
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                <path d="M2 9L9 2M9 2H3.5M9 2V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </motion.div>

          {/* Right — accordion */}
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
          >
            <div className="border-t border-[#f0efe9]/08">
              {faqs.map(({ q, a }) => (
                <FAQItem key={q} question={q} answer={a} />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
