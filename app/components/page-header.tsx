"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";

interface PageHeaderProps {
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}

// Ease-out-quint: quick initial response, long gentle deceleration
// This curve feels premium — it acknowledges user input quickly,
// then settles gracefully into place
const easeOutQuint: [number, number, number, number] = [0.23, 1, 0.32, 1];

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="border-b border-neutral-200 bg-white py-24 dark:border-neutral-800 dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
            className="mb-6 text-4xl font-bold tracking-tight md:text-6xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOutQuint }}
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              className="mx-auto max-w-2xl text-lg text-pretty text-neutral-600 dark:text-neutral-400"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOutQuint, delay: 0.06 }}
            >
              {description}
            </motion.p>
          )}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOutQuint, delay: 0.12 }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
