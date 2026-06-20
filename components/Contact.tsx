"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  GithubLogo,
  LinkedinLogo,
  XLogo,
  Envelope,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

const ease = [0.16, 1, 0.3, 1] as const;

const socials: { href: string; label: string; icon: Icon }[] = [
  { href: "https://github.com", label: "GitHub", icon: GithubLogo },
  { href: "https://linkedin.com", label: "LinkedIn", icon: LinkedinLogo },
  { href: "https://twitter.com", label: "X / Twitter", icon: XLogo },
  {
    href: "mailto:jmin.personal@gmail.com",
    label: "Email Jonathan Min",
    icon: Envelope,
  },
];

const inputClass =
  "w-full bg-transparent border border-ink-fg/20 text-ink-fg text-sm font-sans placeholder:text-ink-fg/25 px-3.5 py-3 focus:outline-none focus:border-ink-fg/55 transition-colors duration-200";

export default function Contact() {
  const reduce = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      (e.target as HTMLFormElement).reset();
    }, 3000);
  };

  return (
    <section
      id="contact"
      className="bg-ink-bg border-t border-dashed border-ink-fg/10 py-28"
      aria-labelledby="contact-title"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mx-auto">

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease }}
          >
            <h2
              className="font-sans font-medium text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.12] tracking-[-0.02em] text-ink-fg mb-4"
              id="contact-title"
            >
              Let&apos;s build something together.
            </h2>
            <p className="font-sans text-[1.0625rem] text-ink-fg/50 leading-[1.75] mb-12">
              Whether you have a project in mind, want to collaborate, or just
              want to say hi, my inbox is always open.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            noValidate
            aria-label="Contact form"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-fg/40">
                  Name <span className="text-ink-fg/60" aria-hidden>*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jane Smith"
                  required
                  autoComplete="name"
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-fg/40">
                  Email <span className="text-ink-fg/60" aria-hidden>*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane@company.com"
                  required
                  autoComplete="email"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 mb-3">
              <label htmlFor="subject" className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-fg/40">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Project inquiry, collaboration..."
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1.5 mb-6">
              <label htmlFor="message" className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-fg/40">
                Message <span className="text-ink-fg/60" aria-hidden>*</span>
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell me about your project..."
                required
                rows={5}
                className={`${inputClass} resize-y min-h-[128px]`}
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="w-full font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-bg bg-ink-fg hover:bg-ink-fg/85 py-4 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitted ? "Message Sent" : "Send Message ↗"}
            </button>
          </motion.form>

          <motion.div
            className="flex items-center gap-3 mt-10"
            aria-label="Social links"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
          >
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  href.startsWith("mailto:") ? undefined : "noopener noreferrer"
                }
                className="w-10 h-10 inline-flex items-center justify-center border border-ink-fg/20 text-ink-fg/40 hover:border-ink-fg/60 hover:text-ink-fg transition-all duration-200"
                aria-label={label}
              >
                <Icon size={18} aria-hidden />
              </a>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
