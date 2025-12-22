"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";
import { ease, duration, viewportOnce } from "@/lib/motion";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "section" | "div" | "article";
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  as = "section",
}: AnimatedSectionProps) {
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: duration.slow + 0.1, ease: ease.outQuint, delay }}
    >
      {children}
    </Component>
  );
}
