"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface Section {
  id: string;
  label: string;
}

interface SideNavProps {
  sections: Section[];
}

export function SideNav({ sections }: SideNavProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "");
  const isClickScrolling = useRef(false);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateActiveSection = useCallback((sectionsList: Section[]) => {
    if (isClickScrolling.current || sectionsList.length === 0) return;

    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Check if we're at the bottom of the page (within 50px)
    const isAtBottom = scrollPosition + windowHeight >= documentHeight - 50;
    
    if (isAtBottom) {
      // At bottom, activate last section
      setActiveSection(sectionsList[sectionsList.length - 1].id);
      return;
    }

    // Find the section that's currently in view
    // We use a point 1/3 down from the top of the viewport
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

    // Initial update
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

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    // Immediately set active and prevent scroll updates
    isClickScrolling.current = true;
    setActiveSection(id);

    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    const offset = 100;
    
    window.scrollTo({
      top: elementTop - offset,
      behavior: "smooth",
    });

    // Re-enable scroll detection after animation completes
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrolling.current = false;
      // Update based on actual scroll position
      updateActiveSection(sections);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(id);
    }
  };

  if (sections.length === 0) return null;

  return (
    <nav
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
      aria-label="Lesson sections"
    >
      <div className="relative flex flex-col gap-0.5">
        {/* Vertical connecting line */}
        <div 
          className="absolute left-[5px] top-3 w-px bg-neutral-200 dark:bg-neutral-800" 
          style={{ height: `calc(100% - 24px)` }}
        />
        
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          
          return (
            <button
              key={section.id}
              onClick={() => handleClick(section.id)}
              onKeyDown={(e) => handleKeyDown(e, section.id)}
              className={`group relative z-10 flex items-center gap-3 rounded-r-sm py-1.5 pr-3 text-left transition-all duration-150 ${
                isActive 
                  ? "bg-neutral-100 dark:bg-neutral-800/50" 
                  : "hover:bg-neutral-50 dark:hover:bg-neutral-800/30"
              }`}
              aria-label={`Go to ${section.label}`}
              aria-current={isActive ? "true" : undefined}
            >
              <span
                className={`h-[11px] w-[11px] flex-shrink-0 rounded-full border-2 transition-all duration-150 ${
                  isActive
                    ? "border-swiss-red bg-swiss-red"
                    : "border-neutral-300 bg-white dark:border-neutral-600 dark:bg-neutral-900"
                }`}
              />
              <span
                className={`max-w-[180px] truncate whitespace-nowrap text-xs font-medium transition-colors duration-150 ${
                  isActive
                    ? "text-neutral-900 dark:text-white"
                    : "text-neutral-500 dark:text-neutral-400"
                }`}
              >
                {section.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
