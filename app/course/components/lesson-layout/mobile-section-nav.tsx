"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { ChevronUp, X } from "lucide-react";

interface Section {
  id: string;
  label: string;
}

interface MobileSectionNavProps {
  sections: Section[];
}

const springTransition = {
  type: "spring" as const,
  damping: 32,
  stiffness: 400,
};

export function MobileSectionNav({ sections }: MobileSectionNavProps) {
  const [activeSection, setActiveSection] = useState<string>(
    sections[0]?.id || "",
  );
  const [isOpen, setIsOpen] = useState(false);
  const isClickScrolling = useRef(false);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeIndex = sections.findIndex((s) => s.id === activeSection);
  const activeSectionData = sections.find((s) => s.id === activeSection);
  const progress =
    sections.length > 0 ? ((activeIndex + 1) / sections.length) * 100 : 0;

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

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

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
    <LayoutGroup>
      <div ref={containerRef} className="fixed bottom-6 left-4 z-40 xl:hidden">
        <motion.div
          layout
          className="overflow-hidden border border-neutral-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-900"
          style={{ borderRadius: 24 }}
          transition={springTransition}
        >
          <AnimatePresence mode="popLayout">
            {isOpen ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="w-[280px] max-w-[calc(100vw-2rem)]"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3 dark:border-neutral-800">
                  <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                    On this page
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex h-6 w-6 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
                    aria-label="Close navigation"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Section List */}
                <nav
                  className="scrollbar-hide max-h-[50vh] overflow-y-auto p-2"
                  aria-label="Lesson sections"
                >
                  <div className="flex flex-col gap-0.5">
                    {sections.map((section, index) => {
                      const isActive = activeSection === section.id;
                      const isPast = index < activeIndex;

                      return (
                        <motion.button
                          key={section.id}
                          onClick={() => handleSectionClick(section.id)}
                          className="relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors"
                          whileHover={{
                            backgroundColor: "rgba(0, 0, 0, 0.03)",
                          }}
                          whileTap={{ scale: 0.98 }}
                          aria-label={`Go to ${section.label}`}
                          aria-current={isActive ? "true" : undefined}
                        >
                          {/* Active background */}
                          {isActive && (
                            <motion.div
                              layoutId="activeSectionBg"
                              className="absolute inset-0 rounded-lg bg-neutral-100 dark:bg-neutral-800"
                              transition={springTransition}
                            />
                          )}

                          {/* Dot indicator */}
                          <span
                            className={`relative z-10 h-2 w-2 shrink-0 rounded-full transition-all ${
                              isActive
                                ? "bg-swiss-red"
                                : isPast
                                  ? "bg-swiss-red/40"
                                  : "bg-neutral-300 dark:bg-neutral-600"
                            }`}
                          />

                          {/* Label */}
                          <span
                            className={`relative z-10 text-sm font-medium transition-colors ${
                              isActive
                                ? "text-neutral-900 dark:text-white"
                                : "text-neutral-500 dark:text-neutral-400"
                            }`}
                          >
                            {section.label}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </nav>
              </motion.div>
            ) : (
              <motion.button
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                onClick={() => setIsOpen(true)}
                className="relative flex h-12 items-center gap-3 px-4"
                aria-label="Open section navigation"
                aria-expanded={isOpen}
              >
                {/* Progress background fill */}
                <motion.div
                  className="bg-swiss-red/10 absolute inset-0 origin-left"
                  initial={false}
                  animate={{ scaleX: progress / 100 }}
                  transition={springTransition}
                />

                {/* Current section name */}
                <span className="relative z-10 max-w-[160px] truncate text-sm font-medium text-neutral-900 dark:text-white">
                  {activeSectionData?.label || "Sections"}
                </span>

                {/* Section count pill */}
                <span className="relative z-10 shrink-0 rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-500 tabular-nums dark:bg-neutral-800 dark:text-neutral-400">
                  {activeIndex + 1}/{sections.length}
                </span>

                {/* Chevron */}
                <ChevronUp className="relative z-10 h-4 w-4 shrink-0 text-neutral-400" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </LayoutGroup>
  );
}
