"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronUp, X } from "lucide-react";

interface Section {
  id: string;
  label: string;
}

interface MobileSectionNavProps {
  sections: Section[];
}

export function MobileSectionNav({ sections }: MobileSectionNavProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "");
  const [isOpen, setIsOpen] = useState(false);
  const isClickScrolling = useRef(false);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeIndex = sections.findIndex((s) => s.id === activeSection);
  const activeSectionData = sections.find((s) => s.id === activeSection);

  const updateActiveSection = useCallback((sectionsList: Section[]) => {
    if (isClickScrolling.current || sectionsList.length === 0) return;

    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const isAtBottom = scrollPosition + windowHeight >= documentHeight - 50;

    if (isAtBottom) {
      setActiveSection(sectionsList[sectionsList.length - 1].id);
      return;
    }

    const checkPoint = scrollPosition + windowHeight / 3;
    let currentSection = sectionsList[0].id;

    for (const section of sectionsList) {
      const element = document.getElementById(section.id);
      if (!element) continue;

      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrollPosition;

      if (elementTop <= checkPoint) {
        currentSection = section.id;
      }
    }

    setActiveSection(currentSection);
  }, []);

  useEffect(() => {
    if (sections.length === 0) return;

    updateActiveSection(sections);

    const handleScroll = () => {
      requestAnimationFrame(() => updateActiveSection(sections));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, [sections, updateActiveSection]);

  const handleSectionClick = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    isClickScrolling.current = true;
    setActiveSection(id);
    setIsOpen(false);

    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    const offset = 100;

    window.scrollTo({
      top: elementTop - offset,
      behavior: "smooth",
    });

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrolling.current = false;
      updateActiveSection(sections);
    }, 800);
  };

  if (sections.length === 0) return null;

  return (
    <>
      {/* Floating Pill - visible on mobile only */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-4 right-20 z-40 flex h-12 items-center gap-3 overflow-hidden border border-neutral-200 bg-white px-4 shadow-lg xl:hidden dark:border-neutral-700 dark:bg-neutral-900"
        style={{ borderRadius: "9999px" }}
        whileTap={{ scale: 0.97 }}
        aria-label="Open section navigation"
        aria-expanded={isOpen}
      >
        {/* Current section name */}
        <span className="flex-1 truncate text-sm font-medium text-neutral-900 dark:text-white">
          {activeSectionData?.label || "Sections"}
        </span>

        {/* Section count */}
        <span className="shrink-0 text-xs text-neutral-400">
          {activeIndex + 1}/{sections.length}
        </span>

        {/* Chevron */}
        <ChevronUp className="h-4 w-4 shrink-0 text-neutral-400" />

        {/* Progress bar at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-200 dark:bg-neutral-700">
          <motion.div
            className="h-full bg-swiss-red"
            initial={false}
            animate={{ width: `${((activeIndex + 1) / sections.length) * 100}%` }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          />
        </div>
      </motion.button>

      {/* Bottom Sheet */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm xl:hidden"
              aria-hidden="true"
            />

            {/* Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
              }}
              className="fixed bottom-0 left-0 right-0 z-50 max-h-[60vh] overflow-hidden border-t border-neutral-200 bg-white xl:hidden dark:border-neutral-700 dark:bg-neutral-900"
            >
              {/* Handle bar */}
              <div className="flex justify-center py-2">
                <div className="h-1 w-10 rounded-full bg-neutral-300 dark:bg-neutral-600" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between border-b border-neutral-200 px-5 pb-3 dark:border-neutral-800">
                <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                  Sections
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center text-neutral-400 transition-colors hover:text-neutral-600 dark:hover:text-neutral-300"
                  aria-label="Close section navigation"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Section List */}
              <nav
                className="scrollbar-hide overflow-y-auto px-5 py-4"
                style={{ maxHeight: "calc(60vh - 80px)" }}
                aria-label="Lesson sections"
              >
                <div className="relative flex flex-col gap-1">
                  {/* Vertical connecting line */}
                  <div
                    className="absolute left-[5px] top-4 w-px bg-neutral-200 dark:bg-neutral-800"
                    style={{ height: `calc(100% - 32px)` }}
                  />

                  {sections.map((section, index) => {
                    const isActive = activeSection === section.id;
                    const isPast = index < activeIndex;

                    return (
                      <motion.button
                        key={section.id}
                        onClick={() => handleSectionClick(section.id)}
                        className={`group relative z-10 flex items-center gap-4 py-3 text-left transition-all ${
                          isActive
                            ? "bg-neutral-100 dark:bg-neutral-800/50"
                            : "hover:bg-neutral-50 dark:hover:bg-neutral-800/30"
                        }`}
                        whileTap={{ scale: 0.98 }}
                        aria-label={`Go to ${section.label}`}
                        aria-current={isActive ? "true" : undefined}
                      >
                        {/* Dot */}
                        <span
                          className={`h-[11px] w-[11px] shrink-0 rounded-full border-2 transition-all ${
                            isActive
                              ? "border-swiss-red bg-swiss-red"
                              : isPast
                                ? "border-swiss-red bg-white dark:bg-neutral-900"
                                : "border-neutral-300 bg-white dark:border-neutral-600 dark:bg-neutral-900"
                          }`}
                        />

                        {/* Label */}
                        <span
                          className={`text-sm font-medium transition-colors ${
                            isActive
                              ? "text-neutral-900 dark:text-white"
                              : "text-neutral-600 dark:text-neutral-400"
                          }`}
                        >
                          {section.label}
                        </span>

                        {/* Active indicator line */}
                        {isActive && (
                          <motion.div
                            layoutId="activeSection"
                            className="absolute right-0 h-full w-1 bg-swiss-red"
                            transition={{
                              type: "spring",
                              damping: 25,
                              stiffness: 300,
                            }}
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

