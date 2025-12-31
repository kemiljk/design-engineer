"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { NavArrowDown as ChevronDown } from "iconoir-react";
import { cn } from "@/lib/utils";

interface Question {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  questions: Question[];
}

export function FAQAccordion({ questions }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-neutral-200 border-y border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
      {questions.map((item, index) => (
        <div key={index}>
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex w-full items-center justify-between py-4 text-left"
          >
            <span className="pr-4 font-medium">{item.q}</span>
            <ChevronDown
              className={cn(
                "h-5 w-5 shrink-0 text-neutral-500 transition-transform",
                openIndex === index && "rotate-180"
              )}
            />
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="pb-4 text-neutral-600 dark:text-neutral-400">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
