"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  PaperPlaneTilt,
  GithubLogo,
  LinkedinLogo,
  XLogo,
  Envelope,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ease = [0.16, 1, 0.3, 1] as const;

const socials: { href: string; label: string; icon: Icon }[] = [
  { href: "https://github.com", label: "GitHub", icon: GithubLogo },
  { href: "https://linkedin.com", label: "LinkedIn", icon: LinkedinLogo },
  { href: "https://twitter.com", label: "X / Twitter", icon: XLogo },
  { href: "mailto:jmin.personal@gmail.com", label: "Email Jonathan Min", icon: Envelope },
];

export default function Contact() {
  const reduce = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
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
      className="bg-zinc-50 py-28"
      aria-labelledby="contact-title"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-[680px] mx-auto text-center">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease }}
          >
            <h2
              className="text-3xl md:text-4xl lg:text-[3rem] font-extrabold tracking-[-0.025em] text-zinc-950 mb-4"
              id="contact-title"
            >
              Let&apos;s build something together.
            </h2>
            <p className="text-[1.0625rem] text-zinc-500 leading-[1.7] mb-12">
              Whether you have a project in mind, want to collaborate, or just
              want to say hi, my inbox is always open.
            </p>
          </motion.div>

          <motion.form
            className="bg-white border border-zinc-200 rounded-[20px] p-10 shadow-md text-left"
            onSubmit={handleSubmit}
            noValidate
            aria-label="Contact form"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.1, ease }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-zinc-950"
                >
                  Name{" "}
                  <span className="text-blue-600" aria-hidden>
                    *
                  </span>
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Jane Smith"
                  required
                  autoComplete="name"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-zinc-950"
                >
                  Email{" "}
                  <span className="text-blue-600" aria-hidden>
                    *
                  </span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane@company.com"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 mb-5">
              <label
                htmlFor="subject"
                className="text-sm font-semibold text-zinc-950"
              >
                Subject
              </label>
              <Input
                id="subject"
                name="subject"
                placeholder="Project inquiry, collaboration..."
              />
            </div>

            <div className="flex flex-col gap-1.5 mb-5">
              <label
                htmlFor="message"
                className="text-sm font-semibold text-zinc-950"
              >
                Message{" "}
                <span className="text-blue-600" aria-hidden>
                  *
                </span>
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell me about your project..."
                required
                className="min-h-32 resize-y"
              />
            </div>

            <Button
              type="submit"
              className="w-full gap-2 text-[0.9375rem] font-semibold py-6 cursor-pointer"
              disabled={submitted}
            >
              <PaperPlaneTilt size={18} aria-hidden />
              {submitted ? "Message Sent!" : "Send Message"}
            </Button>
          </motion.form>

          <motion.div
            className="flex items-center justify-center gap-3 mt-8"
            aria-label="Social links"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.2, ease }}
          >
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  href.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
                className="w-11 h-11 inline-flex items-center justify-center rounded-md border border-zinc-200 text-zinc-500 bg-white hover:bg-zinc-100 hover:border-zinc-400 hover:text-zinc-950 hover:-translate-y-0.5 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
                aria-label={label}
              >
                <Icon size={20} aria-hidden />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
