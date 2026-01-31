"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "section" | "div" | "article";
  variant?: "primary" | "secondary";
}

const variantClasses: Record<string, string> = {
  primary:
    "w-full border-b border-neutral-200 py-16 md:py-24 dark:border-neutral-800",
  secondary:
    "w-full border-b border-neutral-200 bg-neutral-50 py-16 md:py-24 dark:border-neutral-800 dark:bg-neutral-900/50",
};

export function AnimatedSection({
  children,
  className,
  delay = 0,
  as = "section",
  variant,
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const Component = as;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay * 1000);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay]);

  return (
    <Component
      ref={ref as never}
      className={cn(
        "transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]",
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-6 opacity-0",
        variant && variantClasses[variant],
        className
      )}
      style={{
        transitionDelay: delay > 0 ? `${delay * 1000}ms` : undefined,
        transitionProperty: "opacity, transform",
      }}
    >
      {children}
    </Component>
  );
}
