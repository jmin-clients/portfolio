"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Check } from "@phosphor-icons/react";
import { useState } from "react";

type FormData = {
  businessName: string;
  projectType: string;
  situation: string;
  timeline: string;
  budget: string;
  goals: string;
};

type StepConfig = {
  field: keyof FormData;
  question: string;
  type: "text" | "options" | "textarea";
  options?: string[];
  placeholder?: string;
  required: boolean;
};

const STEPS: StepConfig[] = [
  {
    field: "businessName",
    question: "What's your business called?",
    type: "text",
    placeholder: "Your company or project name",
    required: true,
  },
  {
    field: "projectType",
    question: "What kind of project is this?",
    type: "options",
    options: ["New website", "Redesign", "Web application", "E-commerce", "Something else"],
    required: true,
  },
  {
    field: "situation",
    question: "What's your current situation?",
    type: "options",
    options: ["No website yet", "Have a site that needs work", "Have a site, need new features"],
    required: true,
  },
  {
    field: "timeline",
    question: "When do you need this live?",
    type: "options",
    options: ["ASAP", "Within 2 months", "3 to 6 months", "No rush yet"],
    required: true,
  },
  {
    field: "budget",
    question: "What's your budget range?",
    type: "options",
    options: ["Under $2k", "$2k to $5k", "$5k to $10k", "$10k+"],
    required: true,
  },
  {
    field: "goals",
    question: "What does success look like for you?",
    type: "textarea",
    placeholder: "Optional. Describe your goals, target audience, or anything else relevant.",
    required: false,
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-[2px] flex-1 transition-colors duration-300 ${
            i <= step ? "bg-[#39FF8A]" : "bg-foreground/10"
          }`}
        />
      ))}
    </div>
  );
}

export default function IntakeSection() {
  const reduceMotion = useReducedMotion();
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  // Gates autoFocus on the step inputs. False on cold mount so a page load
  // doesn't yank scroll down to this section via the browser's native
  // focus-follows-scroll behavior, true once the user starts stepping
  // through the form so the keyboard-first flow between steps still works.
  const [hasInteracted, setHasInteracted] = useState(false);
  const [data, setData] = useState<FormData>({
    businessName: "",
    projectType: "",
    situation: "",
    timeline: "",
    budget: "",
    goals: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const step = STEPS[stepIndex];
  const isLastStep = stepIndex === STEPS.length - 1;
  const canAdvance = !step.required || Boolean(data[step.field]?.trim());

  const goNext = async () => {
    if (!canAdvance) return;
    setHasInteracted(true);
    if (!isLastStep) {
      setDirection(1);
      setStepIndex((i) => i + 1);
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Submission failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const goBack = () => {
    if (stepIndex === 0) return;
    setDirection(-1);
    setStepIndex((i) => i - 1);
  };

  const setField = (value: string) => setData((d) => ({ ...d, [step.field]: value }));

  const slideVariants = {
    enter: (dir: number) => (reduceMotion ? {} : { x: dir > 0 ? 24 : -24, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => (reduceMotion ? {} : { x: dir > 0 ? -24 : 24, opacity: 0 }),
  };

  return (
    <section id="intake" className="py-24 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        <div className="md:col-span-5 flex flex-col gap-6">
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] font-medium text-foreground">
            Start a project
          </h2>
          <p className="text-foreground/50 max-w-[42ch]">
            A few quick questions, then I&apos;ll follow up personally within
            one business day. No sales call required to get an answer.
          </p>
          <p className="text-foreground/35 text-sm max-w-[42ch]">
            Your answers go straight to my inbox and a private log, nothing is
            shared or sold.
          </p>
        </div>

        <div className="md:col-span-7">
          <div className="border border-border p-8 md:p-10 min-h-[340px] flex flex-col">
            {status === "success" ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-8">
                <div className="flex items-center justify-center size-12 bg-[#39FF8A] text-[#0d0d0d] rounded-sm">
                  <Check size={22} weight="bold" />
                </div>
                <h3 className="font-display text-xl font-medium text-foreground">
                  Got it, thanks.
                </h3>
                <p className="text-foreground/50 max-w-[36ch]">
                  Your project details are logged and I&apos;ve been notified
                  by email. I&apos;ll reply within one business day.
                </p>
              </div>
            ) : (
              <>
                <ProgressBar step={stepIndex} total={STEPS.length} />
                <div className="mt-3 font-medium text-[0.7rem] uppercase tracking-[0.1em] text-foreground/35">
                  Step {stepIndex + 1} of {STEPS.length}
                </div>

                <div className="flex-1 mt-8 overflow-hidden relative">
                  <AnimatePresence mode="wait" custom={direction} initial={false}>
                    <motion.div
                      key={step.field}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: reduceMotion ? 0 : 0.22, ease: EASE }}
                    >
                      <h3 className="font-display text-xl md:text-2xl font-medium text-foreground mb-6">
                        {step.question}
                      </h3>

                      {step.type === "text" && (
                        <input
                          autoFocus={hasInteracted}
                          type="text"
                          value={data[step.field]}
                          onChange={(e) => setField(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && canAdvance && goNext()}
                          placeholder={step.placeholder}
                          className="w-full bg-transparent border-b border-foreground/15 focus:border-[#39FF8A] outline-none py-3 text-foreground placeholder:text-foreground/30 transition-colors"
                        />
                      )}

                      {step.type === "textarea" && (
                        <textarea
                          autoFocus={hasInteracted}
                          value={data[step.field]}
                          onChange={(e) => setField(e.target.value)}
                          placeholder={step.placeholder}
                          rows={4}
                          className="w-full bg-transparent border border-foreground/15 focus:border-[#39FF8A] outline-none p-3 text-foreground placeholder:text-foreground/30 transition-colors resize-none"
                        />
                      )}

                      {step.type === "options" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {step.options?.map((option) => {
                            const selected = data[step.field] === option;
                            return (
                              <button
                                key={option}
                                type="button"
                                onClick={() => setField(option)}
                                className={`text-left px-4 py-3 border text-sm transition-colors rounded-sm ${
                                  selected
                                    ? "border-[#39FF8A] text-[#39FF8A]"
                                    : "border-foreground/15 text-foreground/70 hover:border-foreground/30 hover:text-foreground"
                                }`}
                              >
                                {option}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {status === "error" && (
                  <p className="mt-4 text-sm text-[#ff6b6b]">
                    Something went wrong submitting that. Mind trying again?
                  </p>
                )}

                <div className="mt-8 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={stepIndex === 0}
                    className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground disabled:opacity-0 transition-colors"
                  >
                    <ArrowLeft size={14} weight="bold" />
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={goNext}
                    disabled={!canAdvance || status === "submitting"}
                    className="inline-flex items-center gap-3 bg-[#39FF8A] text-[#0d0d0d] pl-5 pr-2 py-2 font-semibold text-[0.85rem] rounded-sm hover:bg-[#39FF8A]/88 active:translate-y-px transition-all disabled:opacity-40 disabled:pointer-events-none"
                  >
                    {status === "submitting" ? "Sending" : isLastStep ? "Submit" : "Next"}
                    <span className="flex items-center justify-center size-7 bg-[#0d0d0d] text-[#39FF8A] rounded-sm shrink-0">
                      <ArrowRight size={14} weight="bold" />
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
