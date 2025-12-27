"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { formatBreadcrumb } from "@/lib/format";

interface BreadcrumbNavProps {
  slug: string[];
}

export function BreadcrumbNav({ slug }: BreadcrumbNavProps) {
  const scrollRef = useRef<HTMLElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const checkScroll = () => {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
    };

    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll, { passive: true });

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  return (
    <div className="relative mb-2">
      {/* Left shadow */}
      <div
        className={`pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-white to-transparent transition-opacity dark:from-neutral-900 ${
          canScrollLeft ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Right shadow */}
      <div
        className={`pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-white to-transparent transition-opacity dark:from-neutral-900 ${
          canScrollRight ? "opacity-100" : "opacity-0"
        }`}
      />

      <nav
        ref={scrollRef}
        className="flex items-center gap-1.5 overflow-x-auto text-sm scrollbar-hide"
        aria-label="Breadcrumb"
      >
        <BookOpen className="h-4 w-4 shrink-0 text-neutral-400" />
        {slug.map((segment, index) => {
          const href = `/course/${slug.slice(0, index + 1).join("/")}`;
          const isLast = index === slug.length - 1;

          return (
            <span key={segment} className="flex shrink-0 items-center gap-1.5">
              {index > 0 && (
                <span className="text-neutral-300 dark:text-neutral-600">›</span>
              )}
              {isLast ? (
                <span className="whitespace-nowrap text-neutral-500">
                  {formatBreadcrumb(segment)}
                </span>
              ) : (
                <Link
                  href={href}
                  className="whitespace-nowrap text-neutral-500 transition-colors hover:text-swiss-red"
                >
                  {formatBreadcrumb(segment)}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </div>
  );
}

