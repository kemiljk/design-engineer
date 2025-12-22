"use client";

import { motion } from "motion/react";
import { ReactNode, Children, isValidElement, cloneElement, ReactElement } from "react";
import { ease, duration, viewportOnce } from "@/lib/motion";

interface AnimatedGridProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: ease.outQuint,
    },
  },
};

export function AnimatedGrid({
  children,
  className,
  staggerDelay = 0.08,
}: AnimatedGridProps) {
  const customContainerVariants = {
    ...containerVariants,
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={customContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return (
            <motion.div variants={itemVariants}>
              {cloneElement(child as ReactElement)}
            </motion.div>
          );
        }
        return child;
      })}
    </motion.div>
  );
}

export function AnimatedGridItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
