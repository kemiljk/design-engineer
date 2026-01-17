"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

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
