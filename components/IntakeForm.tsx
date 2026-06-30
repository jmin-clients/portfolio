'use client';

import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowLeft, Check } from '@phosphor-icons/react';

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
  type: 'text' | 'options' | 'textarea';
  options?: string[];
  placeholder?: string;
  required: boolean;
};

const STEPS: StepConfig[] = [
  {
    field: 'businessName',
    question: "What's your business called?",
    type: 'text',
    placeholder: 'Your company or project name',
    required: true,
  },
  {
    field: 'projectType',
    question: 'What kind of project is this?',
    type: 'options',
    options: ['New website', 'Redesign', 'Web application', 'E-commerce', 'Something else'],
    required: true,
  },
  {
    field: 'situation',
    question: "What's your current situation?",
    type: 'options',
    options: [
      'No website yet',
      'Have a site that needs work',
      'Have a site, need new features',
    ],
    required: true,
  },
  {
    field: 'timeline',
    question: 'When do you need this live?',
    type: 'options',
    options: ['ASAP', 'Within 2 months', '3-6 months', 'No rush yet'],
    required: true,
  },
  {
    field: 'budget',
    question: "What's your budget range?",
    type: 'options',
    options: ['Under $2k', '$2k - $5k', '$5k - $15k', '$15k+'],
    required: true,
  },
  {
    field: 'goals',
    question: 'What does success look like for you?',
    type: 'textarea',
    placeholder:
      'Optional. Describe your goals, target audience, or anything else relevant.',
    required: false,
  },
];

const TOTAL = STEPS.length;
const ease = [0.16, 1, 0.3, 1] as const;

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 28 : -28, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -28 : 28, opacity: 0 }),
};

// ---- Sub-components ----

function TextInput({
  value,
  onChange,
  onEnter,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  onEnter?: () => void;
  placeholder?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <input
      ref={ref}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && onEnter?.()}
      placeholder={placeholder ?? 'Type here...'}
      className="w-full bg-transparent border-b border-white/20 focus:border-white/50 text-[#f5f5f0] text-lg py-2 mt-4 outline-none placeholder:text-white/20 transition-colors duration-200"
    />
  );
}

function OptionButtons({
  options,
  value,
  onSelect,
}: {
  options: string[];
  value: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2 mt-4">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onSelect(opt)}
          className={`text-left px-4 py-3 border text-sm transition-all duration-150 ${
            value === opt
              ? 'border-[#E8C547] text-[#E8C547] bg-[#E8C547]/[0.07]'
              : 'border-white/[0.12] text-[#f5f5f0]/65 hover:border-white/25 hover:text-[#f5f5f0]'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function TextareaInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={4}
      placeholder={placeholder ?? 'Optional'}
      className="w-full bg-transparent border border-white/10 focus:border-white/30 text-[#f5f5f0] text-sm py-3 px-4 mt-4 outline-none placeholder:text-white/20 transition-colors duration-200 resize-none leading-relaxed"
    />
  );
}

function SuccessState({ name }: { name: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="flex flex-col items-start py-2"
    >
      <div className="w-9 h-9 border border-[#E8C547] flex items-center justify-center mb-6">
        <Check weight="bold" size={16} className="text-[#E8C547]" />
      </div>
      <h3 className="text-[#f5f5f0] font-bold text-xl mb-3 leading-tight">
        {name ? `Thanks, ${name}.` : 'Received.'}
      </h3>
      <p className="text-[#f5f5f0]/45 text-sm leading-relaxed max-w-[28ch]">
        I'll review your project details and follow up within 24 hours.
      </p>
    </motion.div>
  );
}

// ---- Main component ----

export default function IntakeForm() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    projectType: '',
    situation: '',
    timeline: '',
    budget: '',
    goals: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const current = STEPS[step];
  const progress = ((step + 1) / TOTAL) * 100;
  const value = formData[current.field];
  const canProceed = !current.required || Boolean(value.trim());

  const update = (v: string) =>
    setFormData((d) => ({ ...d, [current.field]: v }));

  const advance = () => {
    if (step < TOTAL - 1) {
      setDir(1);
      setStep((s) => s + 1);
    } else {
      submit();
    }
  };

  const retreat = () => {
    setDir(-1);
    setStep((s) => s - 1);
  };

  // Option steps: select and auto-advance after brief visual feedback delay
  const selectAndAdvance = (v: string) => {
    update(v);
    if (step < TOTAL - 1) {
      setTimeout(() => {
        setDir(1);
        setStep((s) => s + 1);
      }, 220);
    }
  };

  const submit = async () => {
    setSubmitting(true);
    setSubmitError(false);
    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('submission failed');
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  // ---- Success state ----
  if (submitted) {
    return (
      <div className="p-8">
        <SuccessState name={formData.businessName} />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col">
      {/* Progress bar — 1px, fills proportionally */}
      <div className="relative h-[1px] bg-white/[0.07]" role="progressbar" aria-valuenow={step + 1} aria-valuemax={TOTAL}>
        <motion.div
          className="absolute inset-y-0 left-0 bg-[#E8C547]"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.38, ease }}
        />
      </div>

      <div className="p-8">
        {/* Step count */}
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#f5f5f0]/28 mb-8 select-none">
          {step + 1}&nbsp;/&nbsp;{TOTAL}
        </p>

        {/* Step content — minimum height prevents layout jump between steps */}
        <div className="min-h-[230px]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={reduce ? {} : slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease }}
            >
              <h3 className="text-[#f5f5f0] font-bold text-[1.1rem] leading-snug">
                {current.question}
              </h3>

              {current.type === 'text' && (
                <TextInput
                  value={value}
                  onChange={update}
                  onEnter={canProceed ? advance : undefined}
                  placeholder={current.placeholder}
                />
              )}

              {current.type === 'options' && current.options && (
                <OptionButtons
                  options={current.options}
                  value={value}
                  onSelect={selectAndAdvance}
                />
              )}

              {current.type === 'textarea' && (
                <TextareaInput
                  value={value}
                  onChange={update}
                  placeholder={current.placeholder}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Error message */}
        {submitError && (
          <p className="text-red-400/80 text-xs mt-2 mb-2 font-mono">
            Something went wrong. Please try again.
          </p>
        )}

        {/* Navigation row */}
        <div className="flex items-center justify-between mt-6 pt-5 border-t border-white/[0.06]">
          {step > 0 ? (
            <button
              type="button"
              onClick={retreat}
              className="flex items-center gap-1.5 text-[#f5f5f0]/35 hover:text-[#f5f5f0]/70 text-sm transition-colors duration-200"
            >
              <ArrowLeft size={13} />
              Back
            </button>
          ) : (
            <span />
          )}

          {/* Show Next/Submit only for text and textarea steps — options auto-advance */}
          {(current.type === 'text' || current.type === 'textarea') && (
            <button
              type="button"
              onClick={advance}
              disabled={!canProceed || submitting}
              className="flex items-center gap-2 bg-[#E8C547] text-[#0a0a0a] font-bold text-sm px-5 py-2.5 hover:bg-[#E8C547]/88 active:scale-[0.98] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {submitting
                ? 'Sending...'
                : step === TOTAL - 1
                ? 'Submit'
                : 'Next'}
              {!submitting && <ArrowRight size={13} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
