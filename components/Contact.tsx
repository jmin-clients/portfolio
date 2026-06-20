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

const socials: { href: string; label: string; icon: Icon; code: string }[] = [
  { href: "https://github.com", label: "GitHub", icon: GithubLogo, code: "GH" },
  { href: "https://linkedin.com", label: "LinkedIn", icon: LinkedinLogo, code: "LI" },
  { href: "https://twitter.com", label: "X / Twitter", icon: XLogo, code: "TW" },
  { href: "mailto:jmin.personal@gmail.com", label: "Email", icon: Envelope, code: "ML" },
];

const fieldClass =
  "w-full bg-transparent border border-[#EAEAEA]/12 text-[#EAEAEA] font-mono text-[0.5625rem] tracking-[0.08em] uppercase placeholder:text-[#EAEAEA]/18 px-4 py-3.5 focus:outline-none focus:border-[#EAEAEA]/40 transition-colors duration-150";

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
      className="bg-[#0A0A0A] border-t border-[#EAEAEA]/10 py-24"
      aria-labelledby="contact-title"
    >
      <div className="max-w-[1600px] mx-auto px-6">

        {/* Section header */}
        <motion.div
          className="flex items-center gap-0 mb-16 border-b border-[#EAEAEA]/10 pb-5"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, ease }}
        >
          <span className="font-mono text-[0.5rem] tracking-[0.25em] text-[#EAEAEA]/20 uppercase">
            // 05 — INITIATE CONTACT
          </span>
          <div className="flex-1 h-px bg-[#EAEAEA]/8 mx-6" aria-hidden />
          <span className="font-mono text-[0.45rem] tracking-[0.2em] text-[#EAEAEA]/15 uppercase">
            D-05 / ACTIVE
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-px bg-[#EAEAEA]/8">

          {/* Left: Heading + social links */}
          <motion.div
            className="bg-[#0A0A0A] p-8 lg:p-12 flex flex-col justify-between"
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.05, ease }}
          >
            <div>
              <h2
                className="font-heading text-[#EAEAEA] uppercase leading-[0.9] tracking-[-0.03em] mb-8"
                id="contact-title"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
              >
                LET&apos;S BUILD
                <br />
                SOMETHING.
              </h2>

              <div className="h-[2px] bg-[#E61919] mb-8 w-16" aria-hidden />

              <p className="font-mono text-[0.6025rem] text-[#EAEAEA]/40 leading-[1.85] tracking-[0.04em] uppercase max-w-sm">
                Whether you have a project in mind, want to collaborate, or just
                want to say hi — my inbox is always open.
              </p>
            </div>

            {/* Social links */}
            <div className="mt-12">
              <samp className="font-mono text-[0.45rem] tracking-[0.2em] text-[#EAEAEA]/20 uppercase block mb-4">
                // CHANNELS
              </samp>
              <div className="grid-borders" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
                {socials.map(({ href, label, icon: SocialIcon, code }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    className="bg-[#0A0A0A] flex items-center gap-3 px-4 py-3.5 text-[#EAEAEA]/30 hover:text-[#EAEAEA] hover:bg-[#111111] transition-all duration-150 group"
                    aria-label={label}
                  >
                    <SocialIcon size={14} aria-hidden />
                    <span className="font-mono text-[0.45rem] tracking-[0.18em] uppercase">
                      {code}
                    </span>
                    <span className="ml-auto font-mono text-[0.4rem] tracking-[0.15em] text-[#EAEAEA]/15 group-hover:text-[#EAEAEA]/30 uppercase">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            className="bg-[#0A0A0A] p-8 lg:p-12"
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4, delay: 0.1, ease }}
          >
            {/* Form header */}
            <div className="border-b border-[#EAEAEA]/8 pb-4 mb-8 flex items-center justify-between">
              <samp className="font-mono text-[0.45rem] tracking-[0.22em] text-[#EAEAEA]/20 uppercase">
                // SECURE CHANNEL — TRANSMISSION FORM
              </samp>
              <samp className="font-mono text-[0.4rem] tracking-[0.18em] text-[#4AF626] uppercase">
                ● OPEN
              </samp>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              aria-label="Contact form"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px mb-px bg-[#EAEAEA]/8">
                <div className="bg-[#0A0A0A] p-0 flex flex-col gap-1.5 pb-4">
                  <label
                    htmlFor="name"
                    className="font-mono text-[0.45rem] uppercase tracking-[0.2em] text-[#EAEAEA]/25 px-4 pt-4"
                  >
                    // NAME <span className="text-[#E61919]" aria-hidden>*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="JANE SMITH"
                    required
                    autoComplete="name"
                    className={fieldClass}
                  />
                </div>
                <div className="bg-[#0A0A0A] p-0 flex flex-col gap-1.5 pb-4">
                  <label
                    htmlFor="email"
                    className="font-mono text-[0.45rem] uppercase tracking-[0.2em] text-[#EAEAEA]/25 px-4 pt-4"
                  >
                    // EMAIL <span className="text-[#E61919]" aria-hidden>*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="JANE@COMPANY.COM"
                    required
                    autoComplete="email"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 mb-px">
                <label
                  htmlFor="subject"
                  className="font-mono text-[0.45rem] uppercase tracking-[0.2em] text-[#EAEAEA]/25"
                >
                  // SUBJECT
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="PROJECT INQUIRY, COLLABORATION..."
                  className={fieldClass}
                />
              </div>

              <div className="flex flex-col gap-1.5 mb-6">
                <label
                  htmlFor="message"
                  className="font-mono text-[0.45rem] uppercase tracking-[0.2em] text-[#EAEAEA]/25 mt-4"
                >
                  // MESSAGE <span className="text-[#E61919]" aria-hidden>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="DESCRIBE YOUR PROJECT OR INQUIRY..."
                  required
                  rows={5}
                  className={`${fieldClass} resize-y min-h-[120px]`}
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full font-mono text-[0.5625rem] uppercase tracking-[0.22em] py-4 transition-all duration-150 disabled:cursor-not-allowed border border-[#E61919] bg-[#E61919] text-[#0A0A0A] hover:bg-transparent hover:text-[#E61919] disabled:opacity-40"
              >
                {submitted
                  ? "[ ✓ TRANSMISSION SENT ]"
                  : "[>>> TRANSMIT MESSAGE ↗]"}
              </button>
            </form>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
