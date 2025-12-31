"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { NavArrowDown as ChevronDown, Check, Combine as Layers } from "iconoir-react";
import { cn } from "@/lib/utils";
import { formatBreadcrumb } from "@/lib/format";

interface Module {
  slug: string;
  title: string;
  lessonCount: number;
  firstLessonPath: string;
}

interface ModuleJumperProps {
  modules: Module[];
  currentModule: string;
  trackSlug: string;
  platformSlug: string;
}

export function ModuleJumper({ modules, currentModule, trackSlug, platformSlug }: ModuleJumperProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentModuleData = modules.find(m => m.slug === currentModule);
  const currentIndex = modules.findIndex(m => m.slug === currentModule);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
      
      // Keyboard shortcuts: Alt+1 through Alt+9 to jump to modules
      if (e.altKey && !e.ctrlKey && !e.metaKey) {
        const num = parseInt(e.key, 10);
        if (num >= 1 && num <= 9 && num <= modules.length) {
          e.preventDefault();
          const targetModule = modules[num - 1];
          window.location.href = `/course/${targetModule.firstLessonPath}`;
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [modules]);

  if (modules.length === 0) return null;

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
          "bg-neutral-100 text-neutral-700 hover:bg-neutral-200",
          "dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700",
          isOpen && "bg-neutral-200 dark:bg-neutral-700"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Layers className="size-4" />
        <span className="hidden sm:inline">
          Module {currentIndex + 1}: {currentModuleData?.title || formatBreadcrumb(currentModule)}
        </span>
        <span className="sm:hidden">
          Module {currentIndex + 1}
        </span>
        <ChevronDown className={cn("size-4 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
          <div className="border-b border-neutral-100 px-3 py-2 dark:border-neutral-800">
            <p className="text-xs font-medium text-neutral-500">
              Jump to module <span className="text-neutral-400">(Alt+1-9)</span>
            </p>
          </div>
          <div className="max-h-80 overflow-y-auto p-1">
            {modules.map((module, index) => {
              const isCurrent = module.slug === currentModule;
              
              return (
                <Link
                  key={module.slug}
                  href={`/course/${module.firstLessonPath}`}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
                    isCurrent
                      ? "bg-swiss-red/10 text-swiss-red"
                      : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                  )}
                >
                  <span className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-md text-xs font-bold",
                    isCurrent
                      ? "bg-swiss-red text-white"
                      : "bg-neutral-200 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400"
                  )}>
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className={cn(
                      "truncate text-sm font-medium",
                      isCurrent && "text-swiss-red"
                    )}>
                      {module.title}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {module.lessonCount} lesson{module.lessonCount !== 1 ? "s" : ""}
                    </p>
                  </div>
                  {isCurrent && <Check className="size-4 shrink-0 text-swiss-red" />}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

