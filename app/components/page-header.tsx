"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";

interface PageHeaderProps {
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="border-b border-neutral-200 bg-white py-24 dark:border-neutral-800 dark:bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="mb-6 text-4xl font-bold tracking-tight md:text-6xl"
            variants={itemVariants}
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              className="mx-auto max-w-2xl text-lg text-pretty text-neutral-600 dark:text-neutral-400"
              variants={itemVariants}
            >
              {description}
            </motion.p>
          )}
          {children && (
            <motion.div variants={itemVariants}>{children}</motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
