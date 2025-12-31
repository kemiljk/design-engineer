"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Copy } from "iconoir-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-bash";

export interface CodeTab {
  label: string;
  language: "css" | "tsx" | "typescript" | "javascript" | "jsx" | "bash" | "html";
  code: string;
}

interface CodePanelProps {
  tabs: CodeTab[];
  className?: string;
}

export function CodePanel({ tabs, className }: CodePanelProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(0);

  const currentCode = tabs[activeTab]?.code ?? "";
  const currentLanguage = tabs[activeTab]?.language ?? "typescript";

  const highlightCode = (code: string, language: string) => {
    const grammar = Prism.languages[language] || Prism.languages.plain || {};
    try {
      return Prism.highlight(code, grammar, language);
    } catch {
      return code;
    }
  };

  const handleCopy = () => {
    window.clearTimeout(timerRef.current);
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    toast.success("Copied to clipboard");
    timerRef.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "w-full max-w-full overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900",
        className
      )}
    >
      {/* Tab bar */}
      <div className="flex min-w-0 items-center justify-between gap-2 border-b border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
        <div className="flex min-w-0 flex-1 overflow-x-auto">
          {tabs.map((tab, index) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(index)}
              className={cn(
                "relative shrink-0 px-3 py-2.5 text-xs font-medium transition-colors sm:px-4",
                activeTab === index
                  ? "text-neutral-900 dark:text-white"
                  : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
              )}
            >
              {tab.label}
              {activeTab === index && (
                <motion.div
                  layoutId="code-tab-indicator"
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-swiss-red"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="mr-2 flex shrink-0 items-center gap-1.5 rounded px-2 py-1.5 text-xs font-medium text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-neutral-900 sm:px-2.5 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
          aria-label="Copy code to clipboard"
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="check"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1.5 text-green-600 dark:text-green-400"
              >
                <Check className="size-3.5" />
                <span className="hidden sm:inline">Copied</span>
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1.5"
              >
                <Copy className="size-3.5" />
                <span className="hidden sm:inline">Copy</span>
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Code content */}
      <div className="overflow-x-auto">
        <pre className="p-3 text-xs leading-relaxed sm:p-4 sm:text-sm">
          <code
            className={cn(
              `language-${currentLanguage}`,
              "text-neutral-800 dark:text-neutral-200"
            )}
            dangerouslySetInnerHTML={{
              __html: highlightCode(currentCode, currentLanguage),
            }}
          />
        </pre>
      </div>
    </div>
  );
}

export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-sm text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
      {children}
    </code>
  );
}

