'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Plus, Minus } from '@phosphor-icons/react';

const FAQS = [
  {
    q: 'Who will actually be working on my project?',
    a: "Just me, Jonathan Min, directly. No handoffs, no juniors, no disappearing behind a team. You get one person with full context on your project from brief to launch.",
  },
  {
    q: 'How long do projects usually take?',
    a: "Typically 2-6 weeks depending on scope and complexity. A focused marketing site or landing page moves faster than a full product build with a custom back-end. I'll give you a realistic timeline estimate after we talk through your brief.",
  },
  {
    q: 'How do you communicate and manage work?',
    a: "Async-first. I default to Notion or Linear for project tracking and Loom for async walkthroughs, with scheduled check-ins at key milestones. You'll always know what I'm working on and what's coming next.",
  },
  {
    q: 'What do you need to get started?',
    a: "A clear brief, rough content direction, and a signed agreement. You don't need a finished design or complete copy. Part of what I do is help you figure that out. Having a sense of your goals and audience makes everything faster.",
  },
  {
    q: 'What happens after launch?',
    a: "30 days of post-launch support is included on every project. Real users always surface edge cases that testing misses. I stay available to fix, tune, and iterate in that window.",
  },
  {
    q: "What's the investment?",
    a: "Scope and complexity set the price, not a fixed menu. Fill out the brief form above and I'll give you a straight answer. No ballpark until I understand what you actually need.",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div className="border-b border-white/[0.08]">
      <button
        className="w-full flex items-start justify-between py-5 text-left gap-6 group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-[#f5f5f0]/75 group-hover:text-[#f5f5f0] text-base leading-snug transition-colors duration-200 font-medium">
          {question}
        </span>
        <span className="flex-shrink-0 mt-0.5 text-[#f5f5f0]/30 group-hover:text-[#f5f5f0]/60 transition-colors duration-200">
          {open ? <Minus size={16} weight="bold" /> : <Plus size={16} weight="bold" />}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease }}
            className="overflow-hidden"
          >
            <p className="text-sm text-[#f5f5f0]/45 leading-relaxed pb-6 max-w-2xl">
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
      id="faq"
      className="py-24 bg-[#0a0a0a] border-t border-white/[0.06]"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-16 lg:gap-24">

          {/* Left col */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease }}
          >
            <h2
              id="faq-heading"
              className="font-bold text-[clamp(1.75rem,3.5vw,2.5rem)] text-[#f5f5f0] leading-[1.1] tracking-tight mb-6"
            >
              What to know before we work together.
            </h2>
            <p className="text-[#f5f5f0]/40 text-sm leading-relaxed mb-8">
              Still have questions? Reach out directly.
            </p>
            <a
              href="mailto:jmin.clients@gmail.com"
              className="inline-flex items-center gap-2 bg-[#E8C547] text-[#0a0a0a] font-bold text-sm px-5 py-2.5 hover:bg-[#E8C547]/88 active:scale-[0.98] transition-all duration-200"
            >
              Send an email
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                <path
                  d="M2 9L9 2M9 2H3.5M9 2V7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </motion.div>

          {/* Right col — accordion */}
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
          >
            <div className="border-t border-white/[0.08]">
              {FAQS.map(({ q, a }) => (
                <FAQItem key={q} question={q} answer={a} />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
